import React, { useEffect, useRef } from 'react';
import './AsciiDonut.css';

const AsciiDonut: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const donuts: Array<{
      element: HTMLPreElement;
      angle: number;
      speed: number;
    }> = [];

    // Create 20 ASCII donuts
    for (let i = 0; i < 20; i++) {
      const donut = document.createElement('pre');
      donut.className = 'ascii-donut';
      donut.style.left = `${Math.random() * 100}%`;
      donut.style.top = `${Math.random() * 100}%`;
      donut.style.opacity = `${0.1 + Math.random() * 0.2}`;
      
      canvasRef.current.appendChild(donut);
      
      donuts.push({
        element: donut,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.02
      });
    }

    const animate = () => {
      donuts.forEach(d => {
        d.angle += d.speed;
        const A = d.angle;
        const B = d.angle * 0.5;
        
        const output: string[] = [];
        const zbuffer: number[] = [];
        
        for (let k = 0; k < 1760; k++) {
          zbuffer[k] = 0;
          output[k] = k % 80 === 79 ? '\n' : ' ';
        }
        
        for (let j = 0; j < 6.28; j += 0.3) {
          for (let i = 0; i < 6.28; i += 0.1) {
            const c = Math.sin(i);
            const d_local = Math.cos(j) + 2;
            const e = Math.sin(A);
            const f = Math.sin(j);
            const g = Math.cos(A);
            const h = d_local + 2;
            const D = 1 / (c * h * e + f * g + 5);
            const l = Math.cos(i);
            const m = Math.cos(B);
            const n = Math.sin(B);
            const t = c * h * g - f * e;
            
            const x = Math.floor(40 + 30 * D * (l * h * m - t * n));
            const y = Math.floor(12 + 15 * D * (l * h * n + t * m));
            const o = x + 80 * y;
            const N = Math.floor(8 * ((f * e - c * d_local * g) * m - c * d_local * e - f * g - l * d_local * n));
            
            if (22 > y && y > 0 && x > 0 && 80 > x && D > zbuffer[o]) {
              zbuffer[o] = D;
              output[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
            }
          }
        }
        
        d.element.textContent = output.join('');
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      donuts.forEach(d => d.element.remove());
    };
  }, []);

  return <div ref={canvasRef} className="ascii-donut-background" />;
};

export default AsciiDonut;
