import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  petalType: 'rose' | 'blush' | 'marigold' | 'goldLeaf';
  opacity: number;
  swingOffset: number;
  swingSpeed: number;
}

export const PetalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petals: Petal[] = [];
    const count = 32;

    const petalColors = {
      rose: ['#D64560', '#B92B45', '#981831'],
      blush: ['#F5B7B1', '#E8A39E', '#FADBD8'],
      marigold: ['#F59E0B', '#D97706', '#FBBF24'],
      goldLeaf: ['#FDE68A', '#D4AF37', '#B48A18']
    };

    const types: ('rose' | 'blush' | 'marigold' | 'goldLeaf')[] = ['rose', 'blush', 'blush', 'marigold', 'goldLeaf'];

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 7,
        speedY: Math.random() * 0.9 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        petalType: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.45 + 0.4,
        swingOffset: Math.random() * 100,
        swingSpeed: Math.random() * 0.02 + 0.01
      });
    }

    let time = 0;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(1, Math.cos(p.angle * 0.8) * 0.5 + 0.7); // 3D flipping illusion

      const colors = petalColors[p.petalType];
      const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(0.5, colors[1]);
      grad.addColorStop(1, colors[2]);

      ctx.fillStyle = grad;
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      // Curved organic petal path
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.8, p.size * 0.9, p.size * 0.6, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.6, -p.size * 0.9, -p.size * 0.8, 0, -p.size);
      ctx.fill();

      // Delicate petal vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.lineTo(0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.03;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time + p.swingOffset) * 0.8 + p.speedX;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};
