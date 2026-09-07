import React from 'react';
import { Heart } from 'lucide-react';
import { weddingData } from '../data/invitation';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        padding: '4rem 1.5rem 3rem',
        background: '#05070D',
        borderTop: '1px solid rgba(212, 175, 55, 0.25)',
        textAlign: 'center',
        color: '#FFFFFF'
      }}
    >
      <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Heart Seal */}
        <div
          className="reveal-on-scroll reveal-scale"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF4C2 0%, #D4AF37 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            marginBottom: '1rem'
          }}
        >
          <Heart size={20} color="#2A1A04" fill="#2A1A04" />
        </div>

        <p
          className="reveal-on-scroll reveal-text delay-100"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.2rem, 7vw, 2.8rem)',
            color: '#FFF6D0',
            lineHeight: 1.1,
            marginBottom: '0.25rem'
          }}
        >
          With love,
        </p>

        <h3
          className="text-gold-gradient reveal-on-scroll reveal-fade-up delay-150"
          style={{
            fontFamily: 'var(--font-serif-title)',
            fontSize: '1.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            marginBottom: '1rem'
          }}
        >
          {weddingData.groom.firstName} & {weddingData.bride.firstName}
        </h3>

        <div className="ornate-divider reveal-on-scroll reveal-scale delay-200" style={{ maxWidth: '180px', margin: '0.5rem auto 1.5rem' }}>
          <span className="ornate-divider-icon">✦</span>
        </div>

        <p
          className="reveal-on-scroll reveal-fade-up delay-250"
          style={{
            fontFamily: 'var(--font-serif-body)',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#CBD5E1',
            lineHeight: 1.5,
            marginBottom: '1.75rem'
          }}
        >
          "In the presence of our beloved family and dear friends, two lives join into one timeless destiny."
        </p>

        {/* IMRAN TECH Branding & Credits */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-sans)',
            color: '#94A3B8',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            width: '100%'
          }}
        >
          <p style={{ fontWeight: 600, color: '#F1F5F9', letterSpacing: '0.05em' }}>
            © 2026 IMRAN TECH
          </p>
          <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
            All Rights Reserved.
          </p>
          <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>
            Made by{' '}
            <a
              href="https://imran-tech-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#D4AF37',
                textDecoration: 'none',
                fontWeight: 700,
                borderBottom: '1px dashed #D4AF37',
                paddingBottom: '1px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFF4C2')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#D4AF37')}
            >
              IMRAN TECH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
