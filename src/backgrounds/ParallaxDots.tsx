import React, { useEffect, useRef } from 'react';
import './ParallaxDots.css';

const ParallaxDots: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const layers = [
      { count: 500, class: 'dots-layer layer-back' },
      { count: 400, class: 'dots-layer layer-mid' },
      { count: 320, class: 'dots-layer layer-front' }
    ];

    const nodes: HTMLDivElement[] = [];

    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${layer.class}`;

        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;

        containerRef.current!.appendChild(dot);
        nodes.push(dot);
      }
    });

    // Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      containerRef.current!.style.setProperty('--parallax-x', `${x}`);
      containerRef.current!.style.setProperty('--parallax-y', `${y}`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      nodes.forEach(n => n.remove());
    };
  }, []);

  return <div ref={containerRef} className="parallax-dots-background" />;
};

export default ParallaxDots;