import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero-content">
        <h1>Welcome to My Portfolio</h1>
        <p className="subtitle">Building Amazing Digital Experiences</p>
        <div className="description">
          <p>
            I'm a passionate developer specializing in creating modern, 
            responsive, and user-friendly web applications. With a focus on 
            clean code and exceptional design, I bring ideas to life.
          </p>
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
