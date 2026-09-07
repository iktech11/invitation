import React from 'react';
import { weddingData } from '../data/invitation';

export const Story: React.FC = () => {
  return (
    <section
      id="story-section"
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #121A2A 0%, #0A0E18 50%, #161D2B 100%)',
        color: '#FFFFFF'
      }}
    >
      {/* Section Header */}
      <div className="section-title-wrap">
        <p className="section-tagline reveal-on-scroll reveal-text">How it all unfolded</p>
        <h2 className="section-heading text-gold-gradient reveal-on-scroll reveal-fade-up delay-100">Our Love Story</h2>
        <div className="ornate-divider reveal-on-scroll reveal-scale delay-150">
          <span className="ornate-divider-icon">✦</span>
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div
        style={{
          position: 'relative',
          maxWidth: '520px',
          margin: '0 auto',
          padding: '1rem 0 2rem'
        }}
      >
        {/* Central Vertical Golden String Line */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '24px',
            width: '2px',
            background: 'linear-gradient(180deg, transparent, #D4AF37 15%, #D4AF37 85%, transparent)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.4)'
          }}
        />

        {/* Milestone Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {weddingData.story.map((milestone, idx) => (
            <div
              key={idx}
              className="reveal-on-scroll reveal-in-right"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                paddingLeft: '60px'
              }}
            >
              {/* Glowing Timeline Node */}
              <div
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '8px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #FFF6D0 0%, #D4AF37 60%, #916815 100%)',
                  boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
                  border: '2px solid #0A0E18',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  zIndex: 2
                }}
              >
                {milestone.icon}
              </div>

              {/* Milestone Card */}
              <div
                className="glass-card-night"
                style={{
                  width: '100%',
                  padding: '20px 18px',
                  border: '1px solid rgba(212, 175, 55, 0.28)',
                  borderRadius: '18px',
                  position: 'relative',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
              >
                {/* Year Pill */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    fontFamily: 'var(--font-serif-sub)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#FFF6D0',
                    letterSpacing: '0.1em',
                    marginBottom: '8px'
                  }}
                >
                  {milestone.year}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif-title)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFDF0',
                    letterSpacing: '0.03em',
                    lineHeight: 1.2
                  }}
                >
                  {milestone.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.2rem',
                    color: '#D4AF37',
                    marginBottom: '0.5rem',
                    lineHeight: 1.2
                  }}
                >
                  {milestone.subtitle}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: '#CBD5E1',
                    lineHeight: 1.55
                  }}
                >
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
