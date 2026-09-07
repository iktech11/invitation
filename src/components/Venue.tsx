import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Car } from 'lucide-react';
import { weddingData } from '../data/invitation';

export const Venue: React.FC = () => {
  return (
    <section
      id="venue-section"
      className="section-container"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #17243B 0%, #0C1220 70%, #060911 100%)',
        color: '#FFFFFF'
      }}
    >
      {/* Section Header */}
      <div className="section-title-wrap">
        <p className="section-tagline reveal-on-scroll reveal-text">The Auspicious Destination</p>
        <h2 className="section-heading text-gold-gradient reveal-on-scroll reveal-fade-up delay-100">The Venue</h2>
        <div className="ornate-divider reveal-on-scroll reveal-scale delay-150">
          <span className="ornate-divider-icon">✦</span>
        </div>
      </div>

      {/* Main Luxury Venue Card */}
      <div
        className="glass-card-night reveal-on-scroll reveal-scale"
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          padding: '28px 20px',
          border: '1.5px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Badge Icon */}
        <div
          className="reveal-on-scroll reveal-scale delay-100"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF4C2 0%, #D4AF37 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)',
            marginBottom: '1.25rem'
          }}
        >
          <Compass size={28} color="#2A1A04" />
        </div>

        <h3
          className="reveal-on-scroll reveal-fade-up delay-150"
          style={{
            fontFamily: 'var(--font-serif-title)',
            fontSize: '1.65rem',
            fontWeight: 700,
            color: '#FFF6D0',
            letterSpacing: '0.04em',
            marginBottom: '0.25rem'
          }}
        >
          {weddingData.venue.name}
        </h3>

        <p
          className="reveal-on-scroll reveal-fade-up delay-200"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.35rem',
            color: '#D4AF37',
            marginBottom: '1rem'
          }}
        >
          {weddingData.venue.subHeading}
        </p>

        {/* Map Art / Satellite Preview Card */}
        <div
          style={{
            width: '100%',
            height: '180px',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            marginBottom: '1.5rem',
            background: 'radial-gradient(circle at 60% 40%, #223555 0%, #111A2C 100%)'
          }}
        >
          {/* Aesthetic Stylized Map Grid & Location SVG */}
          <svg
            viewBox="0 0 400 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            {/* Garden Lawns Contour */}
            <path
              d="M0 70 C100 50 160 110 240 70 C310 35 360 80 400 60 V180 H0 Z"
              fill="#0F2432"
              fillOpacity="0.75"
            />
            {/* Contour Lines */}
            <path d="M0 75 Q150 110 400 110" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="4 4" strokeOpacity="0.4" />
            <path d="M0 115 Q200 140 400 135" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="4 4" strokeOpacity="0.3" />
            
            {/* Gayatri Lawns Marker */}
            <g transform="translate(195, 65)">
              <circle cx="5" cy="5" r="22" fill="rgba(212, 175, 55, 0.2)" />
              <circle cx="5" cy="5" r="12" fill="rgba(212, 175, 55, 0.45)" />
              <circle cx="5" cy="5" r="6" fill="#FFF4C2" />
            </g>

            {/* Label */}
            <text x="200" y="120" fill="#FFF6D0" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              Gayatri Lawns • Jalna
            </text>
          </svg>

          {/* Floating Map Pin Badge */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '9999px',
              background: 'rgba(9, 14, 25, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <MapPin size={12} color="#D4AF37" />
            <span style={{ fontSize: '0.72rem', color: '#FDE68A', fontFamily: 'var(--font-sans)' }}>
              Jalna, Maharashtra
            </span>
          </div>
        </div>

        {/* Address */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.92rem',
            color: '#E2E8F0',
            lineHeight: 1.6,
            marginBottom: '1rem',
            maxWidth: '420px',
            fontWeight: 500
          }}
        >
          {weddingData.venue.fullAddress}
        </p>

        {/* Directions / Arrival Note */}
        <div
          style={{
            width: '100%',
            padding: '12px 14px',
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px dashed rgba(212, 175, 55, 0.35)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            textAlign: 'left',
            marginBottom: '1.75rem'
          }}
        >
          <Car size={18} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.8rem', color: '#CBD5E1', fontFamily: 'var(--font-sans)', lineHeight: 1.45 }}>
            {weddingData.venue.directionsNote}
          </p>
        </div>

        {/* View on Map Button */}
        <a
          href={weddingData.venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-shimmer"
          style={{
            textDecoration: 'none',
            width: '100%',
            maxWidth: '280px',
            fontSize: '0.9rem'
          }}
        >
          <Navigation size={16} />
          <span>View on Map</span>
          <ExternalLink size={14} style={{ opacity: 0.7 }} />
        </a>
      </div>
    </section>
  );
};
