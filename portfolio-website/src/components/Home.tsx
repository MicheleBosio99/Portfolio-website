import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero-content">
        <h1>Michele Bosio's Portfolio</h1>
        <p className="subtitle">AAA</p>
        <div className="description">
          <p>
            <div className='profile-description'>
              Currently wrapping up my Master Thesis focused on an XR Multiplayer Application. Passionate about immersive technologies, creative problem‑
              solving, and building systems that scale. Background in Software Development, Machine Learning, and Data Science, with a evergreen interest
              in the Videogames industry. Always eager to learn new tools and technologies when the challenge demands it. Looking for opportunities to
              contribute to innovative teams solving complex problems.
            </div>
          </p>
          <div className="divider"></div>
          <p>
            Explore my projects to see what I've built, check out my skills 
            to learn about my expertise, or get in touch to discuss your next project.
          </p>
        </div>
        <div className="stats">
          <div className="stat-item">
            <h3>5+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3>30+</h3>
            <p>Happy Clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
