import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '../data/invitation';

interface LightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.95)',
        backdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeInLightbox 0.3s ease'
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF6D0',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <X size={22} />
      </button>

      {/* Main Image Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            borderRadius: '16px',
            border: '2px solid rgba(212, 175, 55, 0.5)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2)'
          }}
        />

        {/* Caption & Counter */}
        <div
          style={{
            marginTop: '16px',
            textAlign: 'center',
            maxWidth: '480px'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif-body)',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: '#FFF6D0',
              lineHeight: 1.4
            }}
          >
            "{currentPhoto.caption}"
          </p>
          <span
            style={{
              fontFamily: 'var(--font-serif-sub)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: '#94A3B8',
              marginTop: '4px',
              display: 'inline-block'
            }}
          >
            {currentIndex + 1} OF {photos.length}
          </span>
        </div>
      </div>

      {/* Navigation Arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(14, 21, 37, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '50%',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF6D0',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(14, 21, 37, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '50%',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF6D0',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <style>{`
        @keyframes fadeInLightbox {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
