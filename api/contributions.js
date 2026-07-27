/*
  Vercel Serverless Function — GitHub activity proxy.

  WHY THIS EXISTS
  ---------------
  The contribution calendar (the little squares) is only available through
  GitHub's GraphQL API, and GraphQL *always* requires a token — there is no
  anonymous access. A token must never be shipped to the browser, so the call
  has to happen server-side. This function is that server side.

  The browser only ever sees the sanitised JSON returned at the bottom.

  SETUP (done once, by you, in the Vercel dashboard)
  -------------------------------------------------
    1. GitHub → Settings → Developer settings → Personal access tokens
       → Fine-grained token, with the "read:user" account permission.
    2. Vercel → your project → Settings → Environment Variables
       → add GITHUB_TOKEN = <the token>.
    3. Redeploy.

  Never commit the token to the repo. If it is ever exposed, revoke it on
  GitHub immediately — a leaked token is not fixable by deleting the commit.

  For private contributions to appear in the totals, also enable
  GitHub → Settings → Profile → "Include private contributions on my profile".

  PRIVACY
  -------
  Private repositories are reduced to a count and an anonymous label. Repo
  names and commit messages from private repos are never returned.
*/

const GITHUB_LOGIN = process.env.GITHUB_LOGIN || 'MicheleBosio99';

const CALENDAR_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }
`;

/** Events we can describe in plain language. Anything else is dropped. */
const EVENT_LABELS = {
  PushEvent: 'Pushed',
  CreateEvent: 'Created',
  PullRequestEvent: 'Pull request',
  IssuesEvent: 'Issue',
  ReleaseEvent: 'Released',
  ForkEvent: 'Forked',
  WatchEvent: 'Starred',
};

async function fetchCalendar(token) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio-website',
    },
    body: JSON.stringify({
      query: CALENDAR_QUERY,
      variables: { login: GITHUB_LOGIN },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL responded ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message);
  }

  const calendar =
    payload.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error('No contribution calendar in response');

  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map(week => ({
      days: week.contributionDays.map(day => ({
        date: day.date,
        count: day.contributionCount,
        weekday: day.weekday,
      })),
    })),
  };
}

async function fetchActivity(token) {
  // Authenticated: this includes private events, which we redact below.
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_LOGIN}/events?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio-website',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub events responded ${response.status}`);
  }

  const events = await response.json();
  if (!Array.isArray(events)) return [];

  return events
    .filter(event => EVENT_LABELS[event.type])
    .map(event => {
      const isPrivate = event.public === false;

      return {
        type: event.type,
        date: event.created_at,
        isPrivate,
        // Redaction: private repo names never leave this function.
        repo: isPrivate ? null : event.repo?.name?.split('/').pop() ?? null,
        commits:
          event.type === 'PushEvent'
            ? event.payload?.size ?? event.payload?.commits?.length ?? 0
            : 0,
        // Only ever a coarse ref TYPE ("branch"/"tag"), never the branch name,
        // which can itself describe unreleased private work.
        refType: event.type === 'CreateEvent' ? event.payload?.ref_type ?? null : null,
        action: event.payload?.action ?? null,
      };
    })
    .slice(0, 30);
}

export default async function handler(_req, res) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    res.status(503).json({
      error: 'not_configured',
      message: 'GITHUB_TOKEN is not set on this deployment.',
    });
    return;
  }

  try {
    // One failing half shouldn't blank the whole panel.
    const [calendarResult, activityResult] = await Promise.allSettled([
      fetchCalendar(token),
      fetchActivity(token),
    ]);

    if (calendarResult.status === 'rejected' && activityResult.status === 'rejected') {
      throw calendarResult.reason;
    }

    // Cached at the edge: GitHub is hit about twice an hour, not once per visitor.
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1800, stale-while-revalidate=86400'
    );

    res.status(200).json({
      calendar: calendarResult.status === 'fulfilled' ? calendarResult.value : null,
      activity: activityResult.status === 'fulfilled' ? activityResult.value : [],
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(502).json({
      error: 'upstream_failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
