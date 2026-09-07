import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { weddingData } from '../data/invitation';
import { Lightbox } from './Lightbox';

export const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) > 0 ? (prev ?? 0) - 1 : weddingData.gallery.length - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) < weddingData.gallery.length - 1 ? (prev ?? 0) + 1 : 0));
    }
  };

  return (
    <section
      id="gallery-section"
      className="section-container"
      style={{
        background: 'radial-gradient(circle at 50% 20%, #15223A 0%, #0A0F1D 60%, #070B14 100%)',
        color: '#FFFFFF'
      }}
    >
      {/* Section Header */}
      <div className="section-title-wrap">
        <p className="section-tagline reveal-on-scroll reveal-text">Cherished Moments</p>
        <h2 className="section-heading text-gold-gradient reveal-on-scroll reveal-fade-up delay-100">Photo Gallery</h2>
        <div className="ornate-divider reveal-on-scroll reveal-scale delay-150">
          <span className="ornate-divider-icon">✦</span>
        </div>
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          maxWidth: '520px',
          margin: '0 auto'
        }}
      >
        {weddingData.gallery.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(idx)}
            className={`reveal-on-scroll ${idx % 2 === 0 ? 'reveal-in-left' : 'reveal-in-right'}`}
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
              aspectRatio: photo.aspect === 'landscape' ? '16/10' : photo.aspect === 'portrait' ? '4/5' : '1/1',
              gridColumn: photo.aspect === 'landscape' && idx === 1 ? 'span 2' : 'span 1',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            <img
              src={photo.url}
              alt={photo.caption}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            />

            {/* Hover / Tap Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(5, 8, 15, 0.85) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '12px',
                opacity: 0.9
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-serif-body)',
                    fontSize: '0.85rem',
                    color: '#FFF6D0',
                    lineHeight: 1.2,
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)'
                  }}
                >
                  {photo.caption}
                </p>
                <ZoomIn size={16} color="#D4AF37" style={{ flexShrink: 0, marginLeft: '6px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photos={weddingData.gallery}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
