import React from 'react';
import type { ActivityEvent } from '../hooks/useGithubActivity';
import './ActivityFeed.css';

interface Props {
  events: ActivityEvent[];
  limit?: number;
}

function relativeTime(iso: string, now: Date = new Date()): string {
  const days = Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
  const months = Math.max(1, Math.floor(days / 30.44));
  return months === 1 ? '1 month ago' : `${months} months ago`;
}

/*
  The API already stripped private repo names; this only decides wording.
  "a private project" is deliberately vague — it shows momentum without
  disclosing what is being worked on.
*/
function describe(event: ActivityEvent): string {
  const where = event.isPrivate ? 'a private project' : event.repo ?? 'a repository';

  switch (event.type) {
    case 'PushEvent': {
      const n = event.commits;
      const commits = n === 1 ? '1 commit' : `${n} commits`;
      return `Pushed ${commits} to ${where}`;
    }
    case 'CreateEvent':
      return `Created a ${event.refType ?? 'repository'} in ${where}`;
    case 'PullRequestEvent':
      return `${event.action === 'closed' ? 'Merged' : 'Opened'} a pull request in ${where}`;
    case 'IssuesEvent':
      return `${event.action === 'closed' ? 'Closed' : 'Opened'} an issue in ${where}`;
    case 'ReleaseEvent':
      return `Published a release in ${where}`;
    case 'ForkEvent':
      return `Forked ${where}`;
    case 'WatchEvent':
      return `Starred ${where}`;
    default:
      return `Activity in ${where}`;
  }
}

const ActivityFeed: React.FC<Props> = ({ events, limit = 8 }) => {
  if (events.length === 0) {
    return (
      <p className="activity-empty">No public activity recorded in the last 90 days.</p>
    );
  }

  return (
    <ul className="activity-feed">
      {events.slice(0, limit).map((event, index) => (
        <li className="activity-item" key={`${event.date}-${index}`}>
          <span
            className={`activity-dot${event.isPrivate ? ' is-private' : ''}`}
            aria-hidden="true"
          />
          <span className="activity-text">{describe(event)}</span>
          <time className="activity-time" dateTime={event.date}>
            {relativeTime(event.date)}
          </time>
        </li>
      ))}
    </ul>
  );
};

export default ActivityFeed;
