import React from 'react';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  image: string;
  link: string;
  description: string;
  tech: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({title, image, link, description, tech}) => {
  const content = (
    <div className="project-card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} />

        {/* Overlay */}
        <div className="card-overlay">
          <p className="overlay-description">{description}</p>
          <div className="overlay-divider"></div>
          <ul className="overlay-tech">
            {tech.map(t => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="card-title">{title}</h3>
    </div>
  );

  return link ? (
  <a href={link} target="_blank" rel="noopener noreferrer" className="project-card-link">{content}</a>) :
  (content);
};

export default ProjectCard;