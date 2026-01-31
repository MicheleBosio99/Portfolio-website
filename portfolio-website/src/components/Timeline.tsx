import React from 'react';
import './Timeline.css';
import { timelineItems } from '../data/timeline';

const Timeline: React.FC = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return '#4a9eff';
      case 'work':
        return '#10b981';
      case 'achievement':
        return '#f59e0b';
      default:
        return '#4a9eff';
    }
  };

  return (
    <div className="timeline">
      <h1>My Timeline</h1>
      <p className="timeline-intro">
        A journey through my professional and educational milestones.
      </p>
      <div className="timeline-container">
        {timelineItems.map((item, index) => (
          <div key={index} className="timeline-item">
            <div 
              className="timeline-marker" 
              style={{ backgroundColor: getCategoryColor(item.category) }}
            ></div>
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
              <span className="timeline-category">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
