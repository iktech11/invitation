import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

interface OpeningGateProps {
  onOpenComplete: () => void;
}

export const OpeningGate: React.FC<OpeningGateProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const bowContainerRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const lightGlowRef = useRef<HTMLDivElement>(null);
  const palaceAuraRef = useRef<HTMLDivElement>(null);

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

    // 1. Untie & burst the satin bow & fade the prompt
    tl.to(promptRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.in'
    })
    .to(bowContainerRef.current, {
      scale: 1.35,
      opacity: 0,
      rotation: 15,
      filter: 'blur(10px)',
      duration: 0.7,
      ease: 'power3.inOut'
    }, '-=0.2')
    // 2. Light flare burst from behind gate
    .to(lightGlowRef.current, {
      opacity: 1,
      scale: 2.2,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .to(palaceAuraRef.current, {
      opacity: 0.9,
      duration: 1.0,
      ease: 'power2.out'
    }, '-=0.6')
    // 3. Doors swing open in 3D perspective
    .to(leftDoorRef.current, {
      rotateY: -115,
      x: -60,
      opacity: 0,
      duration: 1.8,
      ease: 'power3.inOut'
    }, '-=0.6')
    .to(rightDoorRef.current, {
      rotateY: 115,
      x: 60,
      opacity: 0,
      duration: 1.8,
      ease: 'power3.inOut'
    }, '-=1.8')
    // 4. Smoothly fade out the entire gate overlay
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '-=0.5');
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100dvh',
        backgroundColor: '#070B14',
        perspective: '1400px',
        zIndex: 9999
      }}
      onClick={handleOpen}
      onTouchStart={(e) => {
        // Prevent default double-tap zoom, trigger opening
        e.currentTarget.style.cursor = 'grabbing';
      }}
    >
      {/* Background Palace Night Silhouette Glow */}
      <div
        ref={palaceAuraRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, rgba(212, 175, 55, 0.28) 0%, rgba(13, 22, 40, 0.8) 50%, #070B14 100%)',
          opacity: 0.2,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }}
      />

      {/* Central Radiant Warm Light Flare */}
      <div
        ref={lightGlowRef}
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 230, 150, 0.85) 0%, rgba(212, 175, 55, 0.35) 45%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: 0.3,
          pointerEvents: 'none'
        }}
      />

      {/* 3D Gate Wrapper */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          height: '100dvh',
          display: 'flex',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Left Gate Door */}
        <div
          ref={leftDoorRef}
          style={{
            flex: 1,
            height: '100%',
            transformOrigin: 'left center',
            background: 'linear-gradient(135deg, #121A2C 0%, #0A0F1D 50%, #151D2E 100%)',
            borderRight: '1px solid rgba(212, 175, 55, 0.6)',
            boxShadow: 'inset -8px 0 25px rgba(0,0,0,0.8), 5px 0 15px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 16px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ornate Gold Filigree Pattern Left */}
          <div style={{ position: 'absolute', inset: '12px', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '16px 0 0 16px', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: '8px', border: '1px dashed rgba(212, 175, 55, 0.25)', borderRadius: '12px 0 0 12px' }} />
          </div>

          <svg className="w-full h-full" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} viewBox="0 0 300 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Royal Arch Left */}
            <path d="M0 40 Q150 40 280 160 V760 Q150 760 0 760" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="150" cy="220" r="70" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M150 150 L150 290 M80 220 L220 220" stroke="#D4AF37" strokeWidth="0.8" />
            <path d="M50 350 C120 380 180 430 280 460" stroke="#D4AF37" strokeWidth="1.2" />
            <path d="M50 550 C120 580 180 630 280 660" stroke="#D4AF37" strokeWidth="1.2" />
          </svg>

        </div>

        {/* Right Gate Door */}
        <div
          ref={rightDoorRef}
          style={{
            flex: 1,
            height: '100%',
            transformOrigin: 'right center',
            background: 'linear-gradient(225deg, #121A2C 0%, #0A0F1D 50%, #151D2E 100%)',
            borderLeft: '1px solid rgba(212, 175, 55, 0.6)',
            boxShadow: 'inset 8px 0 25px rgba(0,0,0,0.8), -5px 0 15px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 16px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ornate Gold Filigree Pattern Right */}
          <div style={{ position: 'absolute', inset: '12px', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '0 16px 16px 0', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: '8px', border: '1px dashed rgba(212, 175, 55, 0.25)', borderRadius: '0 12px 12px 0' }} />
          </div>

          <svg className="w-full h-full" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} viewBox="0 0 300 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Royal Arch Right */}
            <path d="M300 40 Q150 40 20 160 V760 Q150 760 300 760" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6" />
            <circle cx="150" cy="220" r="70" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M150 150 L150 290 M80 220 L220 220" stroke="#D4AF37" strokeWidth="0.8" />
            <path d="M250 350 C180 380 120 430 20 460" stroke="#D4AF37" strokeWidth="1.2" />
            <path d="M250 550 C180 580 120 630 20 660" stroke="#D4AF37" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Central Satin Ribbon & Ornate Medallion */}
        <div
          ref={bowContainerRef}
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
            cursor: 'pointer'
          }}
        >
          {/* Realistic Royal Gold Satin Bow & Seal */}
          <div
            style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Satin Ribbon Loops */}
            <div
              style={{
                position: 'absolute',
                width: '140px',
                height: '42px',
                background: 'linear-gradient(135deg, #FDE68A 0%, #D4AF37 40%, #8B6514 80%, #F59E0B 100%)',
                borderRadius: '50px',
                transform: 'rotate(-25deg)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.6)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '140px',
                height: '42px',
                background: 'linear-gradient(225deg, #FDE68A 0%, #D4AF37 40%, #8B6514 80%, #F59E0B 100%)',
                borderRadius: '50px',
                transform: 'rotate(25deg)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.6)'
              }}
            />

            {/* Hanging Satin Ribbon Tails */}
            <div
              style={{
                position: 'absolute',
                top: '55px',
                left: '25px',
                width: '28px',
                height: '75px',
                background: 'linear-gradient(180deg, #D4AF37 0%, #A47716 70%, #684807 100%)',
                clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 0% 85%)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '55px',
                right: '25px',
                width: '28px',
                height: '75px',
                background: 'linear-gradient(180deg, #D4AF37 0%, #A47716 70%, #684807 100%)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 20% 100%)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
              }}
            />

            {/* Center Royal Wax / Gold Seal Knot */}
            <div
              style={{
                position: 'relative',
                zIndex: 3,
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #FFF6D0 0%, #D4AF37 40%, #7D5710 100%)',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.7), 0 8px 16px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.8)',
                border: '2px solid #FFF1A8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulseGlow 2.5s infinite alternate'
              }}
            >
              <span style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.25rem', fontWeight: 900, color: '#2B1A00' }}>
                I&A
              </span>
            </div>
          </div>
        </div>

        {/* Tap to Open Prompt */}
        <div
          ref={promptRef}
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 15,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '9999px',
              background: 'rgba(14, 21, 37, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.25)',
              animation: 'bounceSoft 2s infinite ease-in-out'
            }}
          >
            <Sparkles size={16} color="#D4AF37" />
            <span
              style={{
                fontFamily: 'var(--font-serif-sub)',
                fontSize: '0.9rem',
                letterSpacing: '0.15em',
                color: '#FFF6D0',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              Tap to Open
            </span>
            <Sparkles size={16} color="#D4AF37" />
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>
            Touch anywhere to unlock the invitation
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.5), 0 6px 12px rgba(0,0,0,0.5); }
          100% { box-shadow: 0 0 35px rgba(255, 230, 150, 0.9), 0 8px 20px rgba(0,0,0,0.7); }
        }
        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};
