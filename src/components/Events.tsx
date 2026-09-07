import React from 'react';
import { Sparkles, Music, Flame, Crown, Clock, MapPin, Shirt } from 'lucide-react';
import { weddingData, EventDetails } from '../data/invitation';

export const Events: React.FC = () => {
  const getEventIcon = (name: EventDetails['iconName']) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles size={24} color="#D4AF37" />;
      case 'Music':
        return <Music size={24} color="#D4AF37" />;
      case 'Flame':
        return <Flame size={24} color="#D4AF37" />;
      case 'Crown':
        return <Crown size={24} color="#D4AF37" />;
      default:
        return <Sparkles size={24} color="#D4AF37" />;
    }
  };

  return (
    <section
      id="events-section"
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #151D2C 0%, #0A0F1D 50%, #121A2A 100%)',
        color: '#FFFFFF'
      }}
    >
      {/* Section Header */}
      <div className="section-title-wrap">
        <p className="section-tagline reveal-on-scroll reveal-text">Celebrate with Us</p>
        <h2 className="section-heading text-gold-gradient reveal-on-scroll reveal-fade-up delay-100">The Celebrations</h2>
        <div className="ornate-divider reveal-on-scroll reveal-scale delay-150">
          <span className="ornate-divider-icon">✦</span>
        </div>
        <p
          className="reveal-on-scroll reveal-fade-up delay-200"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: '#94A3B8',
            maxWidth: '380px',
            margin: '0 auto'
          }}
        >
          Four enchanting gatherings filled with traditions, music, sacred rites, and royal splendor.
        </p>
      </div>

      {/* Events Cards Grid / Stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          maxWidth: '520px',
          margin: '0 auto'
        }}
      >
        {weddingData.events.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={event.id}
              className={`glass-card-night reveal-on-scroll ${isEven ? 'reveal-in-left' : 'reveal-in-right'}`}
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '24px 20px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '20px',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease'
              }}
            >
              {/* Ambient Watermark Number */}
              <span
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '15px',
                  fontFamily: 'var(--font-serif-title)',
                  fontSize: '4.5rem',
                  fontWeight: 900,
                  color: 'rgba(212, 175, 55, 0.07)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
              >
                0{index + 1}
              </span>

              {/* Top Bar: Icon & Date Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  {getEventIcon(event.iconName)}
                </div>

                <div
                  style={{
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.4)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-sub)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#FFF4C2',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {event.date} • {event.day}
                  </span>
                </div>
              </div>

              {/* Event Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif-title)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: '#FFF6D0',
                  letterSpacing: '0.04em',
                  lineHeight: 1.2,
                  marginBottom: '1rem'
                }}
              >
                {event.title}
              </h3>

              {event.subTitle ? (
                <p
                  style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.25rem',
                    color: '#D4AF37',
                    marginBottom: '0.75rem',
                    lineHeight: 1.1
                  }}
                >
                  {event.subTitle}
                </p>
              ) : null}

              {event.description ? (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: '#CBD5E1',
                    lineHeight: 1.55,
                    marginBottom: '1.25rem'
                  }}
                >
                  {event.description}
                </p>
              ) : null}

              {/* Time, Venue & Dress Code Chips */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(212, 175, 55, 0.15)'
                }}
              >
                {event.time ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={15} color="#D4AF37" />
                    <span style={{ fontSize: '0.82rem', color: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>
                      {event.time}
                    </span>
                  </div>
                ) : null}

                {event.venue ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={15} color="#D4AF37" />
                    <span style={{ fontSize: '0.82rem', color: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>
                      {event.venue}
                    </span>
                  </div>
                ) : null}

                {event.dressCode ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shirt size={15} color="#D4AF37" />
                    <span style={{ fontSize: '0.82rem', color: '#D4AF37', fontFamily: 'var(--font-sans)' }}>
                      Attire: <strong style={{ color: '#FFF6D0' }}>{event.dressCode}</strong>
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
