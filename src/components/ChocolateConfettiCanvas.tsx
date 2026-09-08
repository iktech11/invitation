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
  shape: 'circle' | 'rod' | 'heart' | 'dot' | 'sparkle';
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
  const intensityRef = useRef<number>(1.0);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    let width = (canvas.width = parent ? parent.clientWidth : window.innerWidth);
    let height = (canvas.height = parent ? parent.clientHeight : window.innerHeight * 2);

    const handleResize = () => {
      if (!canvas) return;
      const p = canvas.parentElement;
      width = canvas.width = p ? p.clientWidth : window.innerWidth;
      height = canvas.height = p ? p.clientHeight : window.innerHeight * 2;
    };

    window.addEventListener('resize', handleResize);

    // Warm luxury palette: Chocolate, terracotta, cinnamon bronze, rose gold, shimmer gold, champagne
    const palette = [
      '#63321F', // Deep chocolate
      '#783E28', // Rich cocoa
      '#9C573C', // Warm terracotta
      '#B87353', // Cinnamon bronze
      '#D49B80', // Soft rosy bronze
      '#E8C6B5', // Creamy mocha
      '#F7E9E1', // Ivory cream
      '#D4AF37', // Royal gold
      '#F0D290', // Pale champagne
      '#FFE58F', // Radiant gold highlight
      '#FFFDF0'  // Pure sparkling gold
    ];

    const shapes: ('circle' | 'rod' | 'heart' | 'dot' | 'sparkle')[] = [
      'circle', 'circle', 'circle',
      'rod', 'rod',
      'heart',
      'dot', 'dot',
      'sparkle', 'sparkle'
    ];

    const createParticle = (startY = -20, isBurst = false): Particle => {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      let size = Math.random() * 14 + 8;
      if (shape === 'dot') size = Math.random() * 6 + 3;
      if (shape === 'rod') size = Math.random() * 18 + 10;
      if (shape === 'heart') size = Math.random() * 14 + 9;
      if (shape === 'sparkle') size = Math.random() * 10 + 6;

      // Burst particles have higher initial velocity
      const speedY = isBurst
        ? Math.random() * 4.5 + 2.8
        : Math.random() * 1.8 + 1.1;

      const speedX = isBurst
        ? (Math.random() - 0.5) * 3.5
        : (Math.random() - 0.5) * 0.9;

      return {
        x: Math.random() * width,
        y: startY,
        size,
        speedY,
        speedX,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.06,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: Math.random() * 0.4 + 0.6,
        shape,
        aspectRatio: Math.random() * 0.5 + 0.75,
        swingOffset: Math.random() * 100,
        swingSpeed: Math.random() * 0.035 + 0.015
      };
    };

    // 1. Massive 2X initial burst wave on scratch! (350 particles showering down together)
    const initialBurstCount = 350;
    particlesRef.current = [];
    intensityRef.current = 1.0;

    for (let i = 0; i < initialBurstCount; i++) {
      // Stagger burst from upper area downwards so screen fills with a lush royal cascade
      const startY = Math.random() * (height * 0.6) - 40;
      particlesRef.current.push(createParticle(startY, true));
    }

    let time = 0;

    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(-size / 2, -size / 3, -size, topCurveHeight, 0, size);
      c.bezierCurveTo(size, topCurveHeight, size / 2, -size / 3, 0, topCurveHeight);
      c.fill();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.025;

      // Smoothly taper off intensity over time with high persistent richness
      if (intensityRef.current > 0.35) {
        intensityRef.current *= 0.996; // gentle decay
      }

      const particles = particlesRef.current;
      const targetActiveCount = Math.max(80, Math.floor(initialBurstCount * intensityRef.current));

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += Math.sin(time + p.swingOffset) * (0.8 + intensityRef.current * 0.5) + p.speedX;
        p.angle += p.angularSpeed;

        // When particle falls below countdown boundary
        if (p.y > height + 25) {
          if (particles.length > targetActiveCount) {
            particles.splice(i, 1);
            continue;
          } else {
            // Respawn at top with gentler speed
            particles[i] = createParticle(-20, false);
          }
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
        } else if (p.shape === 'sparkle') {
          ctx.scale(flipY * 0.5 + 0.5, flipY * 0.5 + 0.5);
          drawSparkle(ctx, p.size);
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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
      }}
    />
  );
};
