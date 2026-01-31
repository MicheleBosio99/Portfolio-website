import React from 'react';
import './Timeline.css';
import { timelineItems } from '../data/timeline';

const Timeline: React.FC = () => {
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
        <div className='under-construction'>This page is currently under construction...</div>
      </p>

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
    </div>
  );
};

export default Timeline;