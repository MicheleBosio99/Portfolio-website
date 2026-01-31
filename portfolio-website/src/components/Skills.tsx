import React, { useRef, useEffect } from 'react';
import { skillCategories } from '../data/skills';
import './Skills.css';

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('skill-tag')) return;

      createParticles(e.clientX, e.clientY);

      const allTags = container.querySelectorAll('.skill-tag');
      const targetRect = target.getBoundingClientRect();
      
      allTags.forEach((tag) => {
        if (tag === target) return;
        
        const tagRect = tag.getBoundingClientRect();
        const dx = targetRect.left - tagRect.left;
        const dy = targetRect.top - tagRect.top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const delay = (distance / 200) * 100; // Max 100ms delay based on distance
          
          setTimeout(() => {
            (tag as HTMLElement).classList.add('wave-active');
            setTimeout(() => {
              (tag as HTMLElement).classList.remove('wave-active');
            }, 500);
          }, delay);
        }
      });
    };

    const createParticles = (x: number, y: number) => {
      const particleCount = 8;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, []);

  return (
    <div className="skills" ref={containerRef}>
      <h1>Skills & Technologies</h1>
      <p className="skills-intro">
        Here are the technologies and tools I work with regularly.
      </p>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="skill-category"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="category-header">
              <div 
                className="category-icon"
                style={{ backgroundColor: category.color }}
              ></div>
              <h2>{category.title}</h2>
            </div>
            <div className="skill-tags">
              {category.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="skill-tag"
                  style={{ 
                    animationDelay: `${(index * 0.1) + (idx * 0.05)}s`,
                    '--hover-color': category.color 
                  } as React.CSSProperties}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
