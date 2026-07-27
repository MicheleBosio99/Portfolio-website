/*
  Vercel Serverless Function — GitHub activity proxy.

  WHY THIS EXISTS
  ---------------
  The contribution calendar (the little squares) is only available through
  GitHub's GraphQL API, and GraphQL *always* requires a token — there is no
  anonymous access. A token must never be shipped to the browser, so the call
  has to happen server-side. This function is that server side.

  The browser only ever sees the sanitised JSON returned at the bottom.

  WHY NOT THE EVENTS API
  ----------------------
  The obvious source for "latest updates" is /users/{login}/events, but it is
  unreliable here: fine-grained tokens routinely return only *public* events
  from it, and the feed lags behind reality. Pushes to private repos simply
  never showed up. Commit history via GraphQL is authoritative instead — it
  reflects a push immediately and always includes private repositories the
  token can read.

  SETUP — see README.md. The token needs repository read access, not just
  read:user, or private work will be missing.

  PRIVACY
  -------
  Private repositories are reduced to a commit count and an anonymous label.
  Repo names and commit messages from private repos never reach the browser.
  Public repos can be anonymised or hidden too, via the lists below.
*/

/*
  Activity is still listed, but the repository is not named — it appears as
  "a private project", exactly like a genuinely private repo.
  Names are matched case-insensitively, without the owner prefix.
*/
const ANONYMISE_REPOS = [
  // 'some-public-repo',
];

/* Omitted from the feed entirely, as if it did not exist. */
const HIDDEN_REPOS = [
  // 'scratch-repo',
];

/** Env vars win over the arrays above, so lists can change without a code deploy. */
function listFromEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback.map(entry => entry.toLowerCase());
  return raw
    .split(',')
    .map(entry => entry.trim().toLowerCase())
    .filter(Boolean);
}

const ACTIVITY_WINDOW_DAYS = 90;

const ACTIVITY_QUERY = `
  query($since: GitTimestamp!) {
    viewer {
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
      repositories(
        first: 50
        orderBy: { field: PUSHED_AT, direction: DESC }
        affiliations: [OWNER]
        isFork: false
      ) {
        nodes {
          name
          isPrivate
          pushedAt
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1, since: $since) {
                  totalCount
                  nodes { committedDate }
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function queryGitHub(token, since) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio-website',
    },
    body: JSON.stringify({ query: ACTIVITY_QUERY, variables: { since } }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL responded ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message);
  }
  if (!payload.data?.viewer) {
    throw new Error('No viewer in GraphQL response');
  }

  return payload.data.viewer;
}

function buildCalendar(viewer) {
  const calendar = viewer.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

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

function buildActivity(viewer) {
  const anonymise = listFromEnv('ACTIVITY_ANONYMISE', ANONYMISE_REPOS);
  const hidden = listFromEnv('ACTIVITY_HIDDEN', HIDDEN_REPOS);

  const nodes = viewer.repositories?.nodes ?? [];

  return nodes
    .map(repo => {
      const history = repo.defaultBranchRef?.target?.history;
      const commits = history?.totalCount ?? 0;
      if (commits === 0) return null;

      const key = repo.name.toLowerCase();
      if (hidden.includes(key)) return null;

      // Anonymised public repos are indistinguishable from real private ones.
      const treatAsPrivate = repo.isPrivate || anonymise.includes(key);

      return {
        type: 'PushEvent',
        date: history?.nodes?.[0]?.committedDate ?? repo.pushedAt,
        isPrivate: treatAsPrivate,
        repo: treatAsPrivate ? null : repo.name,
        commits,
        refType: null,
        action: null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 12);
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

  const since = new Date(
    Date.now() - ACTIVITY_WINDOW_DAYS * 86_400_000
  ).toISOString();

  try {
    const viewer = await queryGitHub(token, since);

    /*
      Short cache. Long enough that GitHub is hit a handful of times an hour
      no matter the traffic, short enough that a push shows up promptly —
      the whole point of the panel is that it looks live.
    */
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=86400'
    );

    res.status(200).json({
      calendar: buildCalendar(viewer),
      activity: buildActivity(viewer),
      windowDays: ACTIVITY_WINDOW_DAYS,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(502).json({
      error: 'upstream_failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
