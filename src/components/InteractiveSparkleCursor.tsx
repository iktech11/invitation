import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  scale: number;
  type: 'star' | 'circle' | 'diamond';
}

export const InteractiveSparkleCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

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

    const particles: SparkleParticle[] = [];
    const maxParticles = 90;

    // Luxury gold & champagne palette for sparkles
    const colors = [
      '#FFFDF0', // Pure gold white
      '#FFEAA7', // Light gold
      '#FDCB6E', // Warm champagne
      '#D4AF37', // Royal gold
      '#F39C12', // Amber glow
      '#FFFFFF'  // Diamond white
    ];

    const types: ('star' | 'circle' | 'diamond')[] = ['star', 'star', 'circle', 'diamond'];

    let mouseX = -100;
    let mouseY = -100;
    let targetX = -100;
    let targetY = -100;

    const createSparkle = (x: number, y: number, count = 1, speedMultiplier = 1) => {
      for (let i = 0; i < count; i++) {
        if (particles.length > maxParticles) {
          particles.shift();
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2.2 + 0.6) * speedMultiplier;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const type = types[Math.floor(Math.random() * types.length)];

        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3, // slight upward float
          size: Math.random() * 4.5 + 2.5,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          color,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          scale: 1,
          type
        });
      }
    };

    const handlePointerMove = (x: number, y: number) => {
      targetX = x;
      targetY = y;

      if (cursorDotRef.current && cursorGlowRef.current) {
        cursorDotRef.current.style.opacity = '1';
        cursorGlowRef.current.style.opacity = '1';
      }

      // Emit subtle trail sparkles
      if (Math.random() < 0.6) {
        createSparkle(x, y, 1, 0.7);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
        // On mobile swipe emit a sparkling fairy dust effect
        if (Math.random() < 0.75) {
          createSparkle(touch.clientX, touch.clientY, 2, 1.1);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
        createSparkle(touch.clientX, touch.clientY, 8, 1.8);
      }
    };

    const handleClick = (e: MouseEvent) => {
      createSparkle(e.clientX, e.clientY, 10, 2.2);
    };

    const handleMouseLeave = () => {
      if (cursorDotRef.current && cursorGlowRef.current) {
        cursorDotRef.current.style.opacity = '0';
        cursorGlowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Draw 4-point sparkle star
    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();
    };

    // Draw diamond
    const drawDiamond = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.lineTo(size * 0.7, 0);
      c.lineTo(0, size);
      c.lineTo(-size * 0.7, 0);
      c.closePath();
      c.fill();
    };

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp for desktop cursor dot
      mouseX += (targetX - mouseX) * 0.22;
      mouseY += (targetY - mouseY) * 0.22;

      if (cursorDotRef.current && cursorGlowRef.current && mouseX > 0) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorGlowRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Render sparkles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;
        p.scale = Math.max(0, p.alpha);

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scale, p.scale);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 8;

        if (p.type === 'star') {
          drawStar(ctx, p.size);
        } else if (p.type === 'diamond') {
          drawDiamond(ctx, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Dynamic Sparkle Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          width: '100vw',
          height: '100vh'
        }}
      />

      {/* Desktop Custom Glowing Cursor Follower */}
      <div
        ref={cursorGlowRef}
        className="luxury-cursor-glow"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '42px',
          height: '42px',
          marginLeft: '-21px',
          marginTop: '-21px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 230, 150, 0.45) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transition: 'opacity 0.3s ease, transform 0.08s ease-out',
          willChange: 'transform, opacity'
        }}
      />

      <div
        ref={cursorDotRef}
        className="luxury-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFFDF0 0%, #E5C158 70%, #D4AF37 100%)',
          boxShadow: '0 0 10px #FFF4C2, 0 0 18px #D4AF37',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform, opacity'
        }}
      />
    </>
  );
};
