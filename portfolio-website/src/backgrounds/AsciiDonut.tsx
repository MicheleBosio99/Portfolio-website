import React, { useEffect, useRef } from 'react';
import './AsciiDonut.css';

const AsciiDonut: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- 1. Precompute frames at different angles ---
    const frames: string[] = [];
    const frameCount = 16; // different angles

    for (let f = 0; f < frameCount; f++) {
      const A = f * (Math.PI * 2 / frameCount);
      const B = f * (Math.PI * 2 / frameCount) * 0.5;

      const output: string[] = [];
      const zbuffer: number[] = [];

      for (let k = 0; k < 1760; k++) {
        zbuffer[k] = 0;
        output[k] = k % 80 === 79 ? '\n' : ' ';
      }

      for (let j = 0; j < 6.28; j += 0.3) {
        for (let i = 0; i < 6.28; i += 0.1) {
          const c = Math.sin(i);
          const d = Math.cos(j) + 2;
          const e = Math.sin(A);
          const f2 = Math.sin(j);
          const g = Math.cos(A);
          const h = d + 2;
          const D = 1 / (c * h * e + f2 * g + 5);
          const l = Math.cos(i);
          const m = Math.cos(B);
          const n = Math.sin(B);
          const t = c * h * g - f2 * e;

          const x = Math.floor(40 + 30 * D * (l * h * m - t * n));
          const y = Math.floor(12 + 15 * D * (l * h * n + t * m));
          const o = x + 80 * y;
          const N = Math.floor(
            8 * ((f2 * e - c * d * g) * m - c * d * e - f2 * g - l * d * n)
          );

          if (22 > y && y > 0 && x > 0 && 80 > x && D > zbuffer[o]) {
            zbuffer[o] = D;
            output[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
          }
        }
      }

      frames.push(output.join(''));
    }

    // --- 2. Create static donuts ---
    const donutCount = 30;
    const donuts: HTMLPreElement[] = [];

    for (let i = 0; i < donutCount; i++) {
      const el = document.createElement('pre');
      el.className = 'ascii-donut-static';

      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.opacity = `${0.05 + Math.random() * 0.15}`;
      el.style.transform = `translate(-50%, -50%) scale(${0.5 + Math.random() * 1.5})`;

      // pick a random frame
      el.textContent = frames[Math.floor(Math.random() * frameCount)];

      canvasRef.current.appendChild(el);
      donuts.push(el);
    }

    return () => {
      donuts.forEach(d => d.remove());
    };
  }, []);

  return <div ref={canvasRef} className="ascii-donut-background" />;
};

export default AsciiDonut;