import React from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  image: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, image, link }) => {
  return (
    <div className="project-card">
      <a href={link} className="card-image" target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} />
      </a>
      <h3 className="card-title">{title}</h3>
    </div>
  );
};

export default ProjectCard;
