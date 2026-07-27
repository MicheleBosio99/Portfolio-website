import React, { useEffect, useRef } from 'react';
import './HexGrid.css';

type Hexagon = { x: number; y: number; value: string; opacity: number };

const HexGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let hexagons: Hexagon[] = [];
    let hexSize = 30;
    let width = 0;
    let height = 0;

    const randomHexDigit = () =>
      Math.floor(Math.random() * 16).toString(16).toUpperCase();

    /*
      Size the canvas to its CSS box and rebuild the grid.

      The old version resized the backing store on window resize but kept the
      hexagon list from the original size, so enlarging the window left an
      unfilled band. It also ignored devicePixelRatio, which made the grid
      blurry on high-DPI laptops and phones.
    */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // Setting canvas.width resets the transform, so re-apply it here.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      hexSize = width < 768 ? 20 : 30;

      const cols = Math.ceil(width / (hexSize * 1.5)) + 1;
      const rows = Math.ceil(height / (hexSize * Math.sqrt(3))) + 1;

      hexagons = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          hexagons.push({
            x: col * hexSize * 1.5,
            y:
              row * hexSize * Math.sqrt(3) +
              (col % 2) * hexSize * Math.sqrt(3) / 2,
            value: Math.random() > 0.5 ? randomHexDigit() : '',
            opacity: Math.random() * 0.3,
          });
        }
      }
    };

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let frameId = 0;

    const animate = () => {
      const glowRadius = hexSize * 6.5;

      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, width, height);

      hexagons.forEach(hex => {
        const dist = Math.sqrt((hex.x - mouseX) ** 2 + (hex.y - mouseY) ** 2);
        const glow = Math.max(0, 1 - dist / glowRadius);

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
          ctx.font = `${Math.round(hexSize / 3)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(hex.value, 0, 0);
        }

        ctx.restore();
      });

      // Random flips
      if (hexagons.length && Math.random() < 0.01) {
        const hex = hexagons[Math.floor(Math.random() * hexagons.length)];
        hex.value = randomHexDigit();
      }

      frameId = requestAnimationFrame(animate);
    };

    // Coalesce resize bursts (and mobile address-bar show/hide) into one rebuild.
    let resizeId = 0;
    const handleResize = () => {
      cancelAnimationFrame(resizeId);
      resizeId = requestAnimationFrame(resize);
    };

    resize();
    animate();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      // Without these the loop kept running after unmount — and under
      // React StrictMode that meant two loops drawing at once in dev.
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(resizeId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hex-grid-background" />;
};

export default HexGrid;
