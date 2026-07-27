import React from 'react';
import './Timeline.css';
import { timelineItems } from '../data/timeline';
import { useGithubActivity } from '../hooks/useGithubActivity';
import ContributionHeatmap from './ContributionHeatmap';
import ActivityFeed from './ActivityFeed';

const Timeline: React.FC = () => {
  const { status, data } = useGithubActivity();

  const sortedItems = [...timelineItems].sort(
    (a, b) => b.start.localeCompare(a.start)
  );

  const groupedByYear = sortedItems.reduce((acc, item) => {
    const year = item.start.split('-')[0];
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, typeof timelineItems>);

  return (
    <div className="timeline">
      <h1>My Timeline</h1>
      <p className="timeline-intro">
        A journey through my professional, technical, and personal milestones.
      </p>

      {/* ---------- LIVE GITHUB ACTIVITY ---------- */}
      <section className="timeline-live">
        <h2 className="timeline-section-heading">Recent activity</h2>

        {status === 'loading' && (
          <div className="timeline-live-state">Loading activity from GitHub…</div>
        )}

        {status === 'unavailable' && (
          <div className="timeline-live-state">
            Live GitHub activity is unavailable right now.
          </div>
        )}

        {status === 'ready' && data && (
          <>
            {data.calendar ? (
              <ContributionHeatmap calendar={data.calendar} />
            ) : (
              <div className="timeline-live-state">
                Contribution calendar unavailable.
              </div>
            )}

            <div className="timeline-activity">
              <h3 className="timeline-activity-heading">Latest updates</h3>
              <ActivityFeed events={data.activity} />
              <p className="timeline-activity-note">
                Commit activity from the last {data.windowDays ?? 90} days.
                Work in private repositories is shown without naming the project.
              </p>
            </div>
          </>
        )}
      </section>

      {/* ---------- MILESTONES ---------- */}
      {sortedItems.length > 0 && (
        <section className="timeline-milestones">
          <h2 className="timeline-section-heading">Milestones</h2>

          <div className="timeline-container">
            {Object.entries(groupedByYear)
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([year, items]) => (
                <div key={year} className="timeline-year-block">
                  <div className="timeline-year-label">{year}</div>

                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="timeline-item fade-in"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div
                        className="timeline-marker"
                        style={{ backgroundColor: item.color }}
                      >
                        <span className="timeline-icon">{item.icon}</span>
                      </div>

                      <div className="timeline-content">
                        <h3 className="timeline-title">{item.title}</h3>

                        <div className="timeline-dates">
                          {item.start}
                          {item.end ? ` → ${item.end}` : ' → Present'}
                        </div>

                        <p className="timeline-description">{item.description}</p>

                        {item.technologies && (
                          <div className="timeline-tech">
                            {item.technologies.map(tech => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>
                        )}

                        {item.projectLink && (
                          <a href={item.projectLink} className="timeline-link">
                            View related project →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Timeline;
