import React, { useEffect, useRef } from 'react';
import './NoiseField.css';

const NoiseField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const layers = [
      { count: 500, sizeMin: 5, sizeMax: 8, opacity: [0.03, 0.08], class: 'layer1' },
      { count: 500, sizeMin: 8, sizeMax: 12, opacity: [0.05, 0.12], class: 'layer2' },
      { count: 520, sizeMin: 12, sizeMax: 18, opacity: [0.08, 0.18], class: 'layer3' }
    ];

    const chars = ['.', '-', '=', '+', '*', '#', '%', '@'];

    const nodes: HTMLSpanElement[] = [];

    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const el = document.createElement('span');
        el.className = `ascii-noise-char ${layer.class}`;

        el.textContent = chars[Math.floor(Math.random() * chars.length)];

        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;

        const opacity = layer.opacity[0] + Math.random() * (layer.opacity[1] - layer.opacity[0]);
        el.style.opacity = `${opacity}`;

        const size = layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin);
        el.style.fontSize = `${size}px`;

        el.style.transform = `rotate(${Math.random() * 360}deg)`;

        containerRef.current!.appendChild(el);
        nodes.push(el);
      }
    });

    return () => nodes.forEach(n => n.remove());
  }, []);

  return <div ref={containerRef} className="ascii-noise-background" />;
};

export default NoiseField;
