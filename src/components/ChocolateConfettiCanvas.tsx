import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  color: string;
  opacity: number;
  shape: 'circle' | 'rod' | 'heart' | 'dot';
  aspectRatio: number;
  swingOffset: number;
  swingSpeed: number;
}

interface ChocolateConfettiCanvasProps {
  active: boolean;
}

export const ChocolateConfettiCanvas: React.FC<ChocolateConfettiCanvasProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm chocolate, terracotta, caramel, rose gold, and cream palette matching photo 2
    const palette = [
      '#63321F', // Deep chocolate
      '#783E28', // Rich cocoa
      '#9C573C', // Warm terracotta
      '#B87353', // Cinnamon bronze
      '#D49B80', // Soft rosy bronze
      '#E8C6B5', // Creamy mocha
      '#F7E9E1', // Ivory cream
      '#D4AF37', // Shimmer gold
      '#F0D290'  // Pale champagne
    ];

    const shapes: ('circle' | 'rod' | 'heart' | 'dot')[] = [
      'circle', 'circle', 'circle',
      'rod', 'rod',
      'heart',
      'dot', 'dot'
    ];

    const createParticle = (startY = -20): Particle => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      let size = Math.random() * 14 + 10; // Large particles
      if (shape === 'dot') size = Math.random() * 6 + 4;
      if (shape === 'rod') size = Math.random() * 16 + 12;
      if (shape === 'heart') size = Math.random() * 12 + 10;

      return {
        x: Math.random() * width,
        y: startY,
        size,
        speedY: Math.random() * 1.8 + 1.2,
        speedX: (Math.random() - 0.5) * 0.8,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.04,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: Math.random() * 0.35 + 0.65,
        shape,
        aspectRatio: Math.random() * 0.5 + 0.75,
        swingOffset: Math.random() * 100,
        swingSpeed: Math.random() * 0.03 + 0.015
      };
    };

    // Initialize initial shower
    const totalParticles = 65;
    particlesRef.current = [];
    for (let i = 0; i < totalParticles; i++) {
      particlesRef.current.push(createParticle(Math.random() * height * 0.8));
    }

    let time = 0;

    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // Left curve
      c.bezierCurveTo(-size / 2, -size / 3, -size, topCurveHeight, 0, size);
      // Right curve
      c.bezierCurveTo(size, topCurveHeight, size / 2, -size / 3, 0, topCurveHeight);
      c.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.025;

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += Math.sin(time + p.swingOffset) * 0.9 + p.speedX;
        p.angle += p.angularSpeed;

        if (p.y > height + 30) {
          particles[i] = createParticle(-20);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // 3D flipping simulation
        const flipY = Math.cos(p.angle * 0.75);

        if (p.shape === 'circle' || p.shape === 'dot') {
          ctx.scale(1, flipY * 0.6 + 0.4);
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'rod') {
          ctx.scale(1, flipY * 0.8 + 0.2);
          ctx.beginPath();
          ctx.roundRect(-p.size * 0.8, -p.size * 0.18, p.size * 1.6, p.size * 0.36, 4);
          ctx.fill();
        } else if (p.shape === 'heart') {
          ctx.scale(flipY * 0.6 + 0.4, 1);
          drawHeart(ctx, p.size);
        }

        ctx.restore();
      }

      animIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        width: '100vw',
        height: '100vh'
      }}
    />
  );
};
