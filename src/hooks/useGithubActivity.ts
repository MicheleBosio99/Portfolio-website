import { useEffect, useState } from 'react';

export interface ContributionDay {
  date: string;
  count: number;
  weekday: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ActivityEvent {
  type: string;
  date: string;
  isPrivate: boolean;
  repo: string | null;
  commits: number;
  refType: string | null;
  action: string | null;
}

export interface GithubActivity {
  calendar: ContributionCalendar | null;
  activity: ActivityEvent[];
  /** Size of the commit-history window the activity list covers, in days. */
  windowDays?: number;
  generatedAt: string;
}

type Status = 'loading' | 'ready' | 'unavailable';

interface State {
  status: Status;
  data: GithubActivity | null;
}

/*
  Reads the sanitised payload from our own /api/contributions function.

  The endpoint only exists on Vercel — running `npm run dev` locally serves the
  Vite dev server, which has no /api routes, so this resolves to 'unavailable'
  and the page falls back to its static content. That is expected in local dev,
  not an error worth shouting about.
*/
export function useGithubActivity(): State {
  const [state, setState] = useState<State>({ status: 'loading', data: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/contributions', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<GithubActivity>;
      })
      .then(data => setState({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setState({ status: 'unavailable', data: null });
      });

    return () => controller.abort();
  }, []);

  return state;
}
