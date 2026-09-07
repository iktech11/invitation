import React, { useState, useEffect } from 'react';
import { Calendar, Download, CalendarPlus, Bell } from 'lucide-react';
import { weddingData } from '../data/invitation';
import { Toast } from './Toast';

export const SaveTheDate: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', sub: '' });
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Target Date: November 22, 2026 at 11:30:00 AM IST
  const targetTime = new Date('2026-11-22T11:30:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isCompleted: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: false });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${weddingData.groom.firstName} & ${weddingData.bride.firstName}'s Wedding`);
    const details = encodeURIComponent(
      `Celebrating the wedding of ${weddingData.groom.firstName} (${weddingData.groom.parentTitle}) & ${weddingData.bride.firstName} (${weddingData.bride.parentTitle}) at ${weddingData.venue.name}, ${weddingData.venue.city}.`
    );
    const location = encodeURIComponent(`${weddingData.venue.fullAddress}`);
    // 20261122T060000Z to 20261122T180000Z (approx UTC for 11:30 AM IST)
    const dates = '20261122T060000Z/20261122T180000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Generate and Download .ics File for Apple / Outlook
  const downloadIcsFile = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${weddingData.groom.firstName} & ${weddingData.bride.firstName}//Wedding Invitation//EN`,
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Wedding of ${weddingData.groom.firstName} & ${weddingData.bride.firstName}`,
      'UID:imran-anam-wedding-2026@invitation.wedding',
      'DTSTART:20261122T060000Z',
      'DTEND:20261122T180000Z',
      `DESCRIPTION:Join us to celebrate the wedding of ${weddingData.groom.firstName} & ${weddingData.bride.firstName} at ${weddingData.venue.name}.`,
      `LOCATION:${weddingData.venue.fullAddress}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${weddingData.groom.firstName}-${weddingData.bride.firstName}-Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage({
      title: 'Date Saved to Calendar!',
      sub: 'Event file downloaded. We cannot wait to celebrate with you!'
    });
    setToastVisible(true);
    setShowCalendarModal(false);
  };

  const handleSaveClick = () => {
    setToastMessage({
      title: 'Date Saved!',
      sub: `${weddingData.weddingDate.displayDate} marked in your heart.`
    });
    setToastVisible(true);
    setShowCalendarModal(true);
  };

  return (
    <section
      id="save-the-date-section"
      style={{
        position: 'relative',
        width: '100%',
        padding: '3.5rem 1.25rem',
        background: 'linear-gradient(180deg, #ECE1D4 0%, #151D2C 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="glass-card-night reveal-on-scroll reveal-scale"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '2.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 15px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.15)'
        }}
      >
        <div
          className="reveal-on-scroll reveal-scale delay-100"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF4C2 0%, #D4AF37 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
            marginBottom: '1rem'
          }}
        >
          <Calendar size={28} color="#2A1A04" />
        </div>

        <h3
          className="reveal-on-scroll reveal-fade-up delay-150"
          style={{
            fontFamily: 'var(--font-serif-title)',
            fontSize: '1.45rem',
            color: '#FFF6D0',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}
        >
          Reserve Your Presence
        </h3>

        <p
          className="reveal-on-scroll reveal-fade-up delay-200"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            color: '#D1D5DB',
            lineHeight: 1.5,
            maxWidth: '340px',
            marginBottom: '1.75rem'
          }}
        >
          Add this milestone to your calendar so you don't miss a single moment of the festivities.
        </p>

        {/* The Luxury Save The Date Button */}
        <button
          className="btn-gold-shimmer reveal-on-scroll reveal-fade-up delay-250"
          onClick={handleSaveClick}
          style={{
            width: '100%',
            maxWidth: '300px',
            fontSize: '1rem',
            padding: '16px 24px'
          }}
        >
          <Bell size={18} />
          <span>Save The Date</span>
        </button>

        {/* Modal / Options Card if expanded */}
        {showCalendarModal && (
          <div
            style={{
              marginTop: '1.5rem',
              width: '100%',
              background: 'rgba(9, 14, 25, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif-sub)',
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                color: '#FBF0B9',
                textTransform: 'uppercase'
              }}
            >
              Choose Calendar Option:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setToastMessage({
                    title: 'Opening Google Calendar',
                    sub: 'Add the wedding event to your schedule.'
                  });
                  setToastVisible(true);
                  setShowCalendarModal(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '10px',
                  color: '#FFF',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)'
                }}
              >
                <CalendarPlus size={15} color="#D4AF37" />
                <span>Google Cal</span>
              </a>

              <button
                onClick={downloadIcsFile}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '10px',
                  color: '#FFF',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer'
                }}
              >
                <Download size={15} color="#D4AF37" />
                <span>Apple / iCal</span>
              </button>
            </div>
          </div>
        )}

        {/* Ornate Divider */}
        <div className="ornate-divider" style={{ width: '85%', margin: '2rem auto 1.25rem' }}>
          <span className="ornate-divider-icon">✦</span>
        </div>

        {/* -------------------------------------------------------------
            CIRCULAR LIVE REAL-TIME COUNTDOWN TIMER
        ------------------------------------------------------------- */}
        <div
          className="reveal-on-scroll reveal-fade-up delay-300"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Cursive Tagline */}
          <p
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '1.9rem',
              color: '#FFF6D0',
              lineHeight: 1.2,
              marginBottom: '0.25rem',
              textShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
            }}
          >
            Counting down to the sacred moment...
          </p>

          <p
            style={{
              fontFamily: 'var(--font-serif-sub)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '#D4AF37',
              textTransform: 'uppercase',
              marginBottom: '1.4rem'
            }}
          >
            November 22, 2026 • 11:30 AM
          </p>

          {/* 4 Circular Countdown Rings */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              width: '100%',
              maxWidth: '380px'
            }}
          >
            {/* Days Circle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: 'clamp(62px, 18vw, 76px)',
                  height: 'clamp(62px, 18vw, 76px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(212, 175, 55, 0.22) 0%, rgba(10, 15, 26, 0.9) 100%)',
                  border: '1.5px solid rgba(212, 175, 55, 0.55)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.5), inset 0 0 14px rgba(212, 175, 55, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.25s ease'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif-title)',
                    fontSize: 'clamp(1.25rem, 4vw, 1.55rem)',
                    fontWeight: 800,
                    color: '#FFF6D0',
                    lineHeight: 1
                  }}
                >
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.25rem',
                  color: '#E5C158',
                  lineHeight: 1
                }}
              >
                Days
              </span>
            </div>

            {/* Hours Circle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: 'clamp(62px, 18vw, 76px)',
                  height: 'clamp(62px, 18vw, 76px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(212, 175, 55, 0.22) 0%, rgba(10, 15, 26, 0.9) 100%)',
                  border: '1.5px solid rgba(212, 175, 55, 0.55)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.5), inset 0 0 14px rgba(212, 175, 55, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.25s ease'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif-title)',
                    fontSize: 'clamp(1.25rem, 4vw, 1.55rem)',
                    fontWeight: 800,
                    color: '#FFF6D0',
                    lineHeight: 1
                  }}
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.25rem',
                  color: '#E5C158',
                  lineHeight: 1
                }}
              >
                Hours
              </span>
            </div>

            {/* Minutes Circle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: 'clamp(62px, 18vw, 76px)',
                  height: 'clamp(62px, 18vw, 76px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(212, 175, 55, 0.22) 0%, rgba(10, 15, 26, 0.9) 100%)',
                  border: '1.5px solid rgba(212, 175, 55, 0.55)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.5), inset 0 0 14px rgba(212, 175, 55, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.25s ease'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif-title)',
                    fontSize: 'clamp(1.25rem, 4vw, 1.55rem)',
                    fontWeight: 800,
                    color: '#FFF6D0',
                    lineHeight: 1
                  }}
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.25rem',
                  color: '#E5C158',
                  lineHeight: 1
                }}
              >
                Minutes
              </span>
            </div>

            {/* Seconds Circle (Pulsing Real-time) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: 'clamp(62px, 18vw, 76px)',
                  height: 'clamp(62px, 18vw, 76px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, rgba(212, 175, 55, 0.3) 0%, rgba(10, 15, 26, 0.95) 100%)',
                  border: '1.5px solid #D4AF37',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif-title)',
                    fontSize: 'clamp(1.25rem, 4vw, 1.55rem)',
                    fontWeight: 800,
                    color: '#FFFDF0',
                    lineHeight: 1
                  }}
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.25rem',
                  color: '#FFEAA7',
                  lineHeight: 1
                }}
              >
                Seconds
              </span>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage.title}
        subMessage={toastMessage.sub}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

