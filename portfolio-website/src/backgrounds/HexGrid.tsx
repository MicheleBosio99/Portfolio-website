import React, { useEffect, useRef } from 'react';
import './HexGrid.css';

const HexGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hexagons: Array<{ x: number; y: number; value: string; opacity: number }> = [];
    const hexSize = 30;
    const cols = Math.ceil(canvas.width / (hexSize * 1.5)) + 1;
    const rows = Math.ceil(canvas.height / (hexSize * Math.sqrt(3))) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexSize * 1.5;
        const y = row * hexSize * Math.sqrt(3) + (col % 2) * hexSize * Math.sqrt(3) / 2;
        hexagons.push({
          x,
          y,
          value: Math.random() > 0.5 ? Math.floor(Math.random() * 16).toString(16).toUpperCase() : '',
          opacity: Math.random() * 0.3
        });
      }
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      hexagons.forEach(hex => {
        const dist = Math.sqrt((hex.x - mouseX) ** 2 + (hex.y - mouseY) ** 2);
        const glow = Math.max(0, 1 - dist / 200);

        ctx.save();
        ctx.translate(hex.x, hex.y);
        
        ctx.strokeStyle = `rgba(74, 158, 255, ${hex.opacity + glow * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = hexSize * 0.5 * Math.cos(angle);
          const y = hexSize * 0.5 * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        if (hex.value) {
          ctx.fillStyle = `rgba(176, 176, 176, ${hex.opacity})`;
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(hex.value, 0, 0);
        }

        ctx.restore();
      });

      // Random flips
      if (Math.random() < 0.01) {
        const hex = hexagons[Math.floor(Math.random() * hexagons.length)];
        hex.value = Math.floor(Math.random() * 16).toString(16).toUpperCase();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hex-grid-background" />;
};

export default HexGrid;
