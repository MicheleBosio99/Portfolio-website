import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects, ProjectCategory } from '../data/projects';
import './Projects.css';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = ['All', 'Games', 'App', 'Web', 'ML/AI', 'Others'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="projects">
      <h1>My Projects</h1>
      
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="project-fade-wrapper fade-in"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <ProjectCard
              title={project.title}
              image={project.image}
              link={project.link}
              description={project.description}
              tech={project.tech}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
