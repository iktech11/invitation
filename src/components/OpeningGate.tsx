import React, { useRef, useState } from 'react';
import gsap from 'gsap';

interface OpeningGateProps {
  onOpenComplete: () => void;
}

export const OpeningGate: React.FC<OpeningGateProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const lightGlowRef = useRef<HTMLDivElement>(null);
  const centerBeamRef = useRef<HTMLDivElement>(null);
  const promptBadgeRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = 'none';
        }
        onOpenComplete();
      }
    });

    // 1. Fade prompt highlight
    tl.to(promptBadgeRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.35,
      ease: 'power2.in'
    })
    // 2. Center beam & radiant flare burst
    .to(lightGlowRef.current, {
      opacity: 1,
      scale: 3.5,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.2')
    .to(centerBeamRef.current, {
      opacity: 0,
      duration: 0.35
    }, '-=0.5')
    // 3. 3D Swing open both left and right doors
    .to(leftDoorRef.current, {
      rotateY: -115,
      x: -60,
      opacity: 0,
      duration: 1.8,
      ease: 'power3.inOut'
    }, '-=0.7')
    .to(rightDoorRef.current, {
      rotateY: 115,
      x: 60,
      opacity: 0,
      duration: 1.8,
      ease: 'power3.inOut'
    }, '-=1.8')
    // 4. Fade gate backdrop smoothly
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut'
    }, '-=0.4');
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none cursor-pointer"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100dvh',
        backgroundColor: '#02050D',
        perspective: '1600px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={handleOpen}
      onTouchStart={(e) => {
        e.currentTarget.style.cursor = 'grabbing';
      }}
    >
      {/* Dark Ambient Vignette Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(10, 20, 42, 0.75) 0%, rgba(2, 4, 10, 0.98) 85%)',
          pointerEvents: 'none'
        }}
      />

      {/* Central Radiant Warm Light Flare for the burst */}
      <div
        ref={lightGlowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 238, 175, 0.95) 0%, rgba(229, 193, 88, 0.55) 40%, transparent 70%)',
          filter: 'blur(35px)',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* 3D Gate Wrapper Frame (Proportionally centered on all screen sizes) */}
      <div
        style={{
          position: 'relative',
          width: 'min(100vw, calc(100dvh * 9 / 16))',
          height: '100dvh',
          display: 'flex',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
          boxShadow: '0 0 70px rgba(0, 0, 0, 0.95), 0 0 30px rgba(212, 175, 55, 0.15)',
          zIndex: 5
        }}
      >
        {/* Left Gate Door Panel */}
        <div
          ref={leftDoorRef}
          style={{
            width: '50%',
            height: '100%',
            transformOrigin: 'left center',
            backgroundImage: 'url(/door_gate.jpg)',
            backgroundSize: '200% 100%',
            backgroundPosition: '0% center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            borderRight: '1px solid rgba(255, 225, 130, 0.6)',
            boxShadow: 'inset -8px 0 25px rgba(0,0,0,0.85), 4px 0 16px rgba(0,0,0,0.7)',
            willChange: 'transform, opacity'
          }}
        >
          {/* Subtle warm animated candle glow over left lantern */}
          <div
            style={{
              position: 'absolute',
              bottom: '5.5%',
              left: '6%',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 220, 50, 0.7) 0%, rgba(245, 158, 11, 0.35) 50%, transparent 75%)',
              filter: 'blur(5px)',
              pointerEvents: 'none',
              animation: 'candleFlickerLeft 2.2s infinite ease-in-out'
            }}
          />

          {/* Golden floating micro sparkles along left roses */}
          <div
            style={{
              position: 'absolute',
              top: '12%',
              left: '12%',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#FFF8D6',
              boxShadow: '0 0 10px #FFD700',
              animation: 'sparkleFloat 3s infinite ease-in-out'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '38%',
              left: '8%',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#FFF8D6',
              boxShadow: '0 0 8px #FFD700',
              animation: 'sparkleFloat 2.6s 1s infinite ease-in-out'
            }}
          />
        </div>

        {/* Right Gate Door Panel */}
        <div
          ref={rightDoorRef}
          style={{
            width: '50%',
            height: '100%',
            transformOrigin: 'right center',
            backgroundImage: 'url(/door_gate.jpg)',
            backgroundSize: '200% 100%',
            backgroundPosition: '100% center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            borderLeft: '1px solid rgba(255, 225, 130, 0.6)',
            boxShadow: 'inset 8px 0 25px rgba(0,0,0,0.85), -4px 0 16px rgba(0,0,0,0.7)',
            willChange: 'transform, opacity'
          }}
        >
          {/* Subtle warm animated candle glow over right lantern */}
          <div
            style={{
              position: 'absolute',
              bottom: '5.5%',
              right: '6%',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 220, 50, 0.7) 0%, rgba(245, 158, 11, 0.35) 50%, transparent 75%)',
              filter: 'blur(5px)',
              pointerEvents: 'none',
              animation: 'candleFlickerRight 2.5s 0.5s infinite ease-in-out'
            }}
          />

          {/* Golden floating micro sparkles along right roses */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '12%',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#FFF8D6',
              boxShadow: '0 0 10px #FFD700',
              animation: 'sparkleFloat 3.2s 0.5s infinite ease-in-out'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '40%',
              right: '8%',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#FFF8D6',
              boxShadow: '0 0 8px #FFD700',
              animation: 'sparkleFloat 2.8s 1.4s infinite ease-in-out'
            }}
          />
        </div>

        {/* Dynamic Center Light Seam between doors */}
        <div
          ref={centerBeamRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            background: 'linear-gradient(180deg, transparent 0%, #FFF8D6 18%, #F5D061 50%, #FFF8D6 82%, transparent 100%)',
            boxShadow: '0 0 14px rgba(255, 225, 120, 0.95), 0 0 28px rgba(212, 175, 55, 0.65)',
            zIndex: 10,
            pointerEvents: 'none',
            animation: 'beamPulse 2.8s infinite alternate ease-in-out'
          }}
        />

        {/* Pulsing Highlight Aura over the Tap to Open pill */}
        <div
          ref={promptBadgeRef}
          style={{
            position: 'absolute',
            top: '63%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '260px',
            height: '75px',
            borderRadius: '9999px',
            background: 'radial-gradient(ellipse at center, rgba(255, 225, 130, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 20,
            animation: 'auraPulse 2.4s infinite ease-in-out'
          }}
        />
      </div>

      {/* Global Embedded Styles for Animations */}
      <style>{`
        @keyframes candleFlickerLeft {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          30% { opacity: 0.95; transform: scale(1.15); }
          70% { opacity: 0.6; transform: scale(0.92); }
        }
        @keyframes candleFlickerRight {
          0%, 100% { opacity: 0.7; transform: scale(0.95); }
          40% { opacity: 0.98; transform: scale(1.18); }
          80% { opacity: 0.55; transform: scale(0.9); }
        }
        @keyframes beamPulse {
          0% { opacity: 0.65; filter: blur(0.5px); }
          100% { opacity: 1; filter: blur(1.5px); }
        }
        @keyframes auraPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.35; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0) scale(0.8); opacity: 0.3; }
          50% { transform: translateY(-8px) scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
