import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { StarCanvas } from './StarCanvas';
import { ScrollIndicator } from './ScrollIndicator';
import { weddingData } from '../data/invitation';

interface HeroProps {
  gateOpened: boolean;
}

export const Hero: React.FC<HeroProps> = ({ gateOpened }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const palaceRef = useRef<SVGSVGElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLHeadingElement>(null);
  const groomParentRef = useRef<HTMLParagraphElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const brideRef = useRef<HTMLHeadingElement>(null);
  const brideParentRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gateOpened) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        moonRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 0.95, y: 0, duration: 2.0, ease: 'power2.out' }
      )
      .fromTo(
        palaceRef.current,
        { opacity: 0, y: 40 },
        { opacity: 0.85, y: 0, duration: 2.0 },
        '-=1.8'
      )
      .fromTo(
        tagRef.current,
        { opacity: 0, y: -20, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 1.4 },
        '-=1.5'
      )
      .fromTo(
        groomRef.current,
        { opacity: 0, scale: 0.9, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5 },
        '-=1.2'
      )
      .fromTo(
        groomParentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.1'
      )
      .fromTo(
        ampersandRef.current,
        { opacity: 0, scale: 0.4, rotation: -20 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.2 },
        '-=1.0'
      )
      .fromTo(
        brideRef.current,
        { opacity: 0, scale: 0.9, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5 },
        '-=1.0'
      )
      .fromTo(
        brideParentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=0.9'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.7'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [gateOpened]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 1.25rem 1.5rem',
        background: 'radial-gradient(ellipse at 50% 20%, #152238 0%, #0B111E 55%, #050811 100%)',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Background Star Canvas */}
      <StarCanvas />

      {/* Radiant Golden Moonlight Sky Aura */}
      <div
        style={{
          position: 'absolute',
          top: '2%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(251, 240, 185, 0.08) 40%, transparent 75%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Glowing Full Moon - positioned gracefully higher */}
      <div
        ref={moonRef}
        style={{
          position: 'absolute',
          top: '2%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '135px',
          height: '135px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFFDF2 0%, #FDF3CD 45%, #E4C374 85%, #B38E33 100%)',
          boxShadow: '0 0 50px rgba(255, 246, 208, 0.7), 0 0 100px rgba(212, 175, 55, 0.35)',
          opacity: 0,
          zIndex: 1
        }}
      >
        {/* Soft Moon Crater Texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            opacity: 0.25,
            background: 'radial-gradient(circle at 60% 40%, #A8863A 0%, transparent 20%), radial-gradient(circle at 30% 70%, #A8863A 0%, transparent 25%)'
          }}
        />
      </div>

      {/* Architectural Palace Silhouette Layer at Base */}
      <svg
        ref={palaceRef}
        viewBox="0 0 1200 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '850px',
          minWidth: '500px',
          height: 'auto',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0
        }}
      >
        <defs>
          <linearGradient id="palaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E2B45" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#111B2C" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#080D18" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="domeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FFF4C2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Palace Domes & Minarets */}
        {/* Central Grand Dome */}
        <path d="M540 280 C540 200 600 160 600 130 C600 160 660 200 660 280 Z" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="1.2" />
        <path d="M600 130 L600 95 M595 105 L605 105" stroke="#FDE68A" strokeWidth="2" />

        {/* Side Domes */}
        <path d="M430 300 C430 230 475 200 475 175 C475 200 520 230 520 300 Z" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="1" />
        <path d="M680 300 C680 230 725 200 725 175 C725 200 770 230 770 300 Z" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="1" />

        {/* Outer Pavilion Domes */}
        <path d="M310 320 C310 260 350 240 350 215 C350 240 390 260 390 320 Z" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="1" />
        <path d="M810 320 C810 260 850 240 850 215 C850 240 890 260 890 320 Z" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="1" />

        {/* Outer Towers */}
        <rect x="230" y="270" width="30" height="180" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="0.8" />
        <path d="M225 270 C225 245 245 230 245 220 C245 230 265 245 265 270 Z" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="1" />

        <rect x="940" y="270" width="30" height="180" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="0.8" />
        <path d="M935 270 C935 245 955 230 955 220 C955 230 975 245 975 270 Z" fill="url(#palaceGrad)" stroke="url(#domeGlow)" strokeWidth="1" />

        {/* Arches & Main Facade */}
        <rect x="200" y="320" width="800" height="130" fill="url(#palaceGrad)" />
        {/* Warm Lit Jharokha Windows */}
        <path d="M575 310 Q600 295 625 310 V345 H575 Z" fill="#FFE58F" fillOpacity="0.6" filter="drop-shadow(0 0 8px #F59E0B)" />
        <path d="M455 325 Q475 315 495 325 V355 H455 Z" fill="#FFE58F" fillOpacity="0.45" />
        <path d="M705 325 Q725 315 745 325 V355 H705 Z" fill="#FFE58F" fillOpacity="0.45" />
        <path d="M335 340 Q350 330 365 340 V365 H335 Z" fill="#FFE58F" fillOpacity="0.35" />
        <path d="M835 340 Q850 330 865 340 V365 H835 Z" fill="#FFE58F" fillOpacity="0.35" />

        {/* Base Water / Courtyard Silhouette */}
        <rect x="0" y="410" width="1200" height="40" fill="#060912" />
        <line x1="0" y1="410" x2="1200" y2="410" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
      </svg>

      {/* Top Header Tag - Placed under the moon */}
      <div
        ref={tagRef}
        style={{
          zIndex: 6,
          textAlign: 'center',
          marginTop: '155px',
          opacity: 0
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif-sub)',
            fontSize: '0.85rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#FBF0B9',
            textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 15px rgba(212,175,55,0.4)'
          }}
        >
          We're Getting Married
        </span>
        <div className="ornate-divider" style={{ margin: '8px auto 0', maxWidth: '160px' }}>
          <span className="ornate-divider-icon">✦</span>
        </div>
      </div>

      {/* Central Couple Royal Typography */}
      <div
        style={{
          zIndex: 6,
          textAlign: 'center',
          marginTop: '1rem',
          marginBottom: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem'
        }}
      >
        {/* Groom Name */}
        <h1
          ref={groomRef}
          className="text-gold-gradient"
          style={{
            fontFamily: 'var(--font-serif-title)',
            fontSize: 'clamp(2.8rem, 11vw, 4.4rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 35px rgba(212, 175, 55, 0.45)',
            opacity: 0
          }}
        >
          {weddingData.groom.firstName}
        </h1>

        {/* Groom Parents */}
        <p
          ref={groomParentRef}
          style={{
            fontFamily: 'var(--font-serif-body)',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#FDE68A',
            letterSpacing: '0.04em',
            opacity: 0,
            marginBottom: '0.2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
          }}
        >
          {weddingData.groom.parentTitle}
        </p>

        {/* Ampersand */}
        <span
          ref={ampersandRef}
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.6rem, 8vw, 3.8rem)',
            color: '#FDE68A',
            lineHeight: 0.85,
            filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))',
            margin: '0.15rem 0',
            opacity: 0
          }}
        >
          &
        </span>

        {/* Bride Name */}
        <h1
          ref={brideRef}
          className="text-gold-gradient"
          style={{
            fontFamily: 'var(--font-serif-title)',
            fontSize: 'clamp(2.8rem, 11vw, 4.4rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 35px rgba(212, 175, 55, 0.45)',
            opacity: 0
          }}
        >
          {weddingData.bride.firstName}
        </h1>

        {/* Bride Parents */}
        <p
          ref={brideParentRef}
          style={{
            fontFamily: 'var(--font-serif-body)',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#FDE68A',
            letterSpacing: '0.04em',
            opacity: 0,
            marginBottom: '0.2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
          }}
        >
          {weddingData.bride.parentTitle}
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div ref={scrollRef} style={{ zIndex: 6, marginBottom: '0.5rem', opacity: 0 }}>
        <ScrollIndicator targetId="invitation-section" />
      </div>
    </section>
  );
};
