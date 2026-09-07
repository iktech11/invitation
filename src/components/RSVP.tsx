import React, { useState, useEffect } from 'react';
import { CheckCircle2, Send, Users, MessageSquare, HeartHandshake, User, RefreshCw } from 'lucide-react';
import { weddingData } from '../data/invitation';
import confetti from 'canvas-confetti';

interface RSVPRecord {
  name: string;
  attendance: 'accept' | 'decline';
  guestCount: number;
  message: string;
  submittedAt: string;
}

export const RSVP: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'accept' | 'decline'>('accept');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedRSVP, setSavedRSVP] = useState<RSVPRecord | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('imran_anam_wedding_rsvp');
      if (stored) {
        setSavedRSVP(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage not accessible', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const record: RSVPRecord = {
        name: name.trim(),
        attendance,
        guestCount: attendance === 'accept' ? guestCount : 0,
        message: message.trim(),
        submittedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('imran_anam_wedding_rsvp', JSON.stringify(record));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }

      setSavedRSVP(record);
      setIsSubmitting(false);

      if (attendance === 'accept') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#FFF4C2', '#C59B27', '#E5C158']
        });
      }
    }, 600);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('imran_anam_wedding_rsvp');
    } catch (err) {
      console.warn(err);
    }
    setSavedRSVP(null);
    setName('');
    setMessage('');
    setGuestCount(1);
    setAttendance('accept');
  };

  return (
    <section
      id="rsvp-section"
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #070B14 0%, #151D2F 60%, #0B1120 100%)',
        color: '#FFFFFF'
      }}
    >
      {/* Section Header */}
      <div className="section-title-wrap">
        <p className="section-tagline">Join Our Joy</p>
        <h2 className="section-heading text-gold-gradient">Kindly RSVP</h2>
        <div className="ornate-divider">
          <span className="ornate-divider-icon">✦</span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: '#94A3B8',
            maxWidth: '380px',
            margin: '0 auto'
          }}
        >
          Please respond by <strong style={{ color: '#FFF6D0' }}>{weddingData.rsvpConfig.deadline}</strong> so we can ensure royal hospitality for you.
        </p>
      </div>

      {/* Main Form or Confirmation Card */}
      <div
        className="glass-card-night"
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '28px 22px',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
        }}
      >
        {savedRSVP ? (
          /* Success / Submitted Confirmation State */
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.5rem 0.5rem',
              animation: 'fadeIn 0.5s ease'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: savedRSVP.attendance === 'accept'
                  ? 'radial-gradient(circle, #FFF4C2 0%, #D4AF37 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)',
                marginBottom: '1rem'
              }}
            >
              <CheckCircle2 size={36} color={savedRSVP.attendance === 'accept' ? '#2A1A04' : '#FFF6D0'} />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: '1.45rem',
                color: '#FFF6D0',
                marginBottom: '0.4rem'
              }}
            >
              {savedRSVP.attendance === 'accept' ? 'RSVP Received With Joy!' : 'Response Received'}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.5rem',
                color: '#D4AF37',
                marginBottom: '1rem'
              }}
            >
              Thank you, {savedRSVP.name}
            </p>

            <div
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '16px',
                textAlign: 'left',
                marginBottom: '1.5rem'
              }}
            >
              <p style={{ fontSize: '0.85rem', color: '#E2E8F0', marginBottom: '6px' }}>
                <strong>Status:</strong>{' '}
                <span style={{ color: savedRSVP.attendance === 'accept' ? '#86EFAC' : '#FCA5A5' }}>
                  {savedRSVP.attendance === 'accept' ? 'Joyfully Accepting' : 'Regretfully Declining'}
                </span>
              </p>

              {savedRSVP.attendance === 'accept' && (
                <p style={{ fontSize: '0.85rem', color: '#E2E8F0', marginBottom: '6px' }}>
                  <strong>Number of Guests:</strong> {savedRSVP.guestCount}
                </p>
              )}

              {savedRSVP.message && (
                <p style={{ fontSize: '0.85rem', color: '#E2E8F0', fontStyle: 'italic' }}>
                  "{savedRSVP.message}"
                </p>
              )}
            </div>

            <button
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '9999px',
                padding: '8px 18px',
                color: '#FFF6D0',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} />
              <span>Update RSVP Details</span>
            </button>
          </div>
        ) : (
          /* Interactive Form */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Full Name */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-serif-sub)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.1em',
                  color: '#FFF6D0',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}
              >
                <User size={14} color="#D4AF37" />
                <span>Your Full Name *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Advait & Family"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(10, 15, 28, 0.75)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Attendance Choice */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-serif-sub)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.1em',
                  color: '#FFF6D0',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                <HeartHandshake size={14} color="#D4AF37" />
                <span>Will You Attend?</span>
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setAttendance('accept')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '12px',
                    border: attendance === 'accept' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.15)',
                    background: attendance === 'accept' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(10, 15, 28, 0.5)',
                    color: attendance === 'accept' ? '#FFF6D0' : '#94A3B8',
                    fontFamily: 'var(--font-serif-sub)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Joyfully Accepts
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('decline')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '12px',
                    border: attendance === 'decline' ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.15)',
                    background: attendance === 'decline' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(10, 15, 28, 0.5)',
                    color: attendance === 'decline' ? '#FFF6D0' : '#94A3B8',
                    fontFamily: 'var(--font-serif-sub)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Regretfully Declines
                </button>
              </div>
            </div>

            {/* Number of Guests (if accepting) */}
            {attendance === 'accept' && (
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-serif-sub)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.1em',
                    color: '#FFF6D0',
                    textTransform: 'uppercase',
                    marginBottom: '6px'
                  }}
                >
                  <Users size={14} color="#D4AF37" />
                  <span>Number of Guests Attending</span>
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      style={{
                        flex: 1,
                        padding: '10px 0',
                        borderRadius: '10px',
                        border: guestCount === num ? '1.5px solid #D4AF37' : '1px solid rgba(255,255,255,0.15)',
                        background: guestCount === num ? 'rgba(212, 175, 55, 0.25)' : 'rgba(10, 15, 28, 0.5)',
                        color: guestCount === num ? '#FFF6D0' : '#94A3B8',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wishes / Message */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-serif-sub)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.1em',
                  color: '#FFF6D0',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}
              >
                <MessageSquare size={14} color="#D4AF37" />
                <span>Wishes for the Couple (Optional)</span>
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your warm blessings and wishes..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(10, 15, 28, 0.75)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold-shimmer"
              style={{
                width: '100%',
                marginTop: '0.5rem',
                fontSize: '0.95rem'
              }}
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Submitting...' : 'Send RSVP'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
