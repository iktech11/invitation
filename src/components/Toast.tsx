import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        width: '90%',
        maxWidth: '420px',
        background: 'linear-gradient(135deg, #182236 0%, #0D1424 100%)',
        border: '1px solid rgba(212, 175, 55, 0.6)',
        borderRadius: '16px',
        padding: '14px 18px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.25)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        animation: 'slideUpBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF4C2 0%, #D4AF37 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Sparkles size={18} color="#2A1A04" />
        </div>
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-serif-sub)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#FFF6D0',
              lineHeight: 1.2
            }}
          >
            {message}
          </h4>
          {subMessage && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                color: '#CBD5E1',
                marginTop: '2px'
              }}
            >
              {subMessage}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#94A3B8',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={18} />
      </button>

      <style>{`
        @keyframes slideUpBounce {
          0% { opacity: 0; transform: translate(-50%, 30px) scale(0.95); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
      `}</style>
    </div>
  );
};
