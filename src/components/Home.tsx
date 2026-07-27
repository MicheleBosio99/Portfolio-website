import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero-content">
        <h1>Michele Bosio's Portfolio</h1>
        <p className="subtitle">Computer Scientist & Software Engineer</p>
        <div className="description">
          <p className='profile-description'>
            Recently finished up my Master Thesis focused on the implementation of a XR Multiplayer Application for Quest 3 using Unity engine.
            Passionate about immersive technologies, creative problem solving, and building systems that are reliable, well-tought and consistent.
            Background in Software Development, Machine Learning, and Data Science, with a evergreen interest in the videogames industry.
            Always eager to learn new tools and technologies when the challenge demands it.
            <br/><br/>
            <b>Currently looking for opportunities to contribute to innovative teams solving complex problems.</b>
          </p>
          <div className="home-divider"></div>
          <p>
            Explore my projects to see what I've built, check out my skills 
            to learn about my expertise, or get in touch to discuss your next project.
          </p>

          <div className='under-construction'>
            Note: this web page is still under development, some features are not available or not complete.
          </div>
        </div>
        {/* <div className="stats">
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
        </div> */}
      </div>
    </div>
  );
};

export default Home;
