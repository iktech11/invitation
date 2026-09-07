import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 99990,
        pointerEvents: 'none',
        background: 'rgba(212, 175, 55, 0.08)'
      }}
    >
      <div
        style={{
          width: `${scrollProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #916815 0%, #D4AF37 50%, #FFF4C2 100%)',
          boxShadow: '0 0 12px rgba(255, 235, 160, 0.8), 0 0 4px #D4AF37',
          transition: 'width 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
          position: 'relative'
        }}
      >
        {/* Shimmering Leading Edge Dot */}
        {scrollProgress > 1 && (
          <div
            style={{
              position: 'absolute',
              right: '-3px',
              top: '-2px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#FFFDF0',
              boxShadow: '0 0 8px #FFF, 0 0 14px #D4AF37',
              animation: 'pulse 1.5s infinite'
            }}
          />
        )}
      </div>
    </div>
  );
};
