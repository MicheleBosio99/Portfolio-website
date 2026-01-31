import React from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  image: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, image, link }) => {
  const children = <img src={image} alt={title} />
  return (
    <div className="project-card">
      {link ? (
        <a href={link} className="card-image" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <div className="card-image">
          {children}
        </div>
      )}
      <h3 className="card-title">{title}</h3>
    </div>
  );
};

export default ProjectCard;
