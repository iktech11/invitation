import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ targetId = 'invitation-section' }) => {
  const handleScrollClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={handleScrollClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '10px 0',
        zIndex: 5
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-serif-sub)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#FBF0B9',
          opacity: 0.85
        }}
      >
        Scroll to Begin
      </span>

      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(14, 21, 37, 0.4)',
          backdropFilter: 'blur(4px)',
          animation: 'scrollPulse 2.2s infinite ease-in-out'
        }}
      >
        <ChevronDown size={16} color="#D4AF37" />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% {
            transform: translateY(0);
            box-shadow: 0 0 0 rgba(212, 175, 55, 0);
          }
          50% {
            transform: translateY(6px);
            box-shadow: 0 0 12px rgba(212, 175, 55, 0.35);
          }
        }
      `}</style>
    </div>
  );
};
