import React, { useState, useRef, useEffect } from 'react';
import { weddingData } from '../data/invitation';
import { Calendar } from 'lucide-react';
import { Toast } from './Toast';

interface InvitationProps {
  onScratchStart?: () => void;
}

export const Invitation: React.FC<InvitationProps> = ({ onScratchStart }) => {
  const [isScratched, setIsScratched] = useState(false);
  const [scratchStarted, setScratchStarted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', sub: '' });
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  // Initialize Scratch Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(canvas.offsetWidth || 270, canvas.offsetHeight || 270) || 270;
    const width = (canvas.width = size);
    const height = (canvas.height = size);

    // Draw rich chocolate metallic circular overlay
    const drawCover = () => {
      ctx.clearRect(0, 0, width, height);

      // Circular clip path for smooth rendering
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      ctx.clip();

      const grad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width / 2);
      grad.addColorStop(0, '#6A3720');
      grad.addColorStop(0.5, '#4E2413');
      grad.addColorStop(1, '#33150A');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold outer ring
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2 - 8, 0, Math.PI * 2);
      ctx.stroke();

      // Delicate inner dotted ring
      ctx.strokeStyle = 'rgba(251, 240, 185, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2 - 16, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Golden foil decorative stars within circular bounds
      ctx.fillStyle = 'rgba(251, 240, 185, 0.45)';
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (width / 2 - 25);
        const x = width / 2 + Math.cos(angle) * dist;
        const y = height / 2 + Math.sin(angle) * dist;
        const r = Math.random() * 2 + 0.8;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center Circular Medallion Accent
      ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 48, 0, Math.PI * 2);
      ctx.fill();

      // Chocolate Seal Text
      ctx.fillStyle = '#FFF8EB';
      ctx.font = 'bold 13px Montserrat, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ SCRATCH HERE ✨', width / 2, height / 2 - 10);

      ctx.fillStyle = '#E5C158';
      ctx.font = 'italic 12px Cormorant Garamond, serif';
      ctx.fillText('Rub with finger to reveal', width / 2, height / 2 + 12);

      ctx.restore();
    };

    drawCover();
  }, []);

  // Scratch handler
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    if (!scratchStarted) {
      setScratchStarted(true);
      onScratchStart?.();
    }

    // Check scratch percentage
    checkScratchPercent();
  };

  const checkScratchPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      const totalPixels = imgData.data.length / 4;

      // Sample every 8th pixel for speed
      for (let i = 3; i < imgData.data.length; i += 32) {
        if (imgData.data[i] === 0) {
          transparentPixels += 8;
        }
      }

      if (transparentPixels / totalPixels > 0.28) {
        setIsScratched(true);
      }
    } catch {
      // Fallback
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !e.touches[0]) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  const revealAll = () => {
    setIsScratched(true);
    setScratchStarted(true);
    onScratchStart?.();
  };

  // Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${weddingData.groom.firstName} & ${weddingData.bride.firstName}'s Wedding`);
    const details = encodeURIComponent(
      `Celebrating the wedding of ${weddingData.groom.firstName} (${weddingData.groom.parentTitle}) & ${weddingData.bride.firstName} (${weddingData.bride.parentTitle}) at ${weddingData.venue.name}, ${weddingData.venue.city}.`
    );
    const location = encodeURIComponent(`${weddingData.venue.fullAddress}`);
    const dates = '20261122T060000Z/20261122T180000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${weddingData.groom.firstName} & ${weddingData.bride.firstName}//Wedding//EN`,
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Wedding of ${weddingData.groom.firstName} & ${weddingData.bride.firstName}`,
      'UID:imran-anam-wedding-2026@wedding.invitation',
      'DTSTART:20261122T060000Z',
      'DTEND:20261122T180000Z',
      `DESCRIPTION:Wedding ceremony of ${weddingData.groom.firstName} & ${weddingData.bride.firstName}`,
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
      sub: 'Event file downloaded. We look forward to seeing you!'
    });
    setToastVisible(true);
    setShowCalendarModal(false);
  };

  return (
    <section
      id="invitation-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1.25rem',
        background: 'linear-gradient(180deg, #F9F4EE 0%, #F1E5D8 45%, #ECE1D4 100%)',
        color: '#2A1F18',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: '460px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Top Blessing Line */}
        <p
          className="reveal-on-scroll reveal-text"
          style={{
            fontFamily: 'var(--font-serif-body)',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#704B38',
            marginBottom: '0.4rem',
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          we thank you for being part of this blessed occasion 🤍
        </p>

        {/* Delicate Heart Divider */}
        <div className="reveal-on-scroll reveal-scale delay-100" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px', margin: '4px auto 14px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #B88568)' }} />
          <span style={{ fontSize: '10px', color: '#8C5A40' }}>♥</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #B88568, transparent)' }} />
        </div>

        {/* Script Title */}
        <h2
          className="reveal-on-scroll reveal-fade-up delay-150"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.6rem, 8vw, 3.4rem)',
            color: '#703E2D',
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: '0.4rem'
          }}
        >
          Our forever begins
        </h2>

        {/* Delicate Heart Divider */}
        <div className="reveal-on-scroll reveal-scale delay-200" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px', margin: '4px auto 20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #B88568)' }} />
          <span style={{ fontSize: '10px', color: '#8C5A40' }}>♥</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #B88568, transparent)' }} />
        </div>

        {/* Luxury Circular Card with Interactive Chocolate Scratch */}
        <div
          className="reveal-on-scroll reveal-scale delay-250"
          style={{
            position: 'relative',
            width: '260px',
            height: '260px',
            margin: '0 auto 1.75rem',
            background: 'linear-gradient(145deg, #FFFDF9 0%, #FAF3EB 100%)',
            border: '2.5px solid #C89A7A',
            borderRadius: '50%',
            boxShadow: '0 16px 40px rgba(112, 62, 45, 0.18), inset 0 0 24px rgba(255, 255, 255, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            overflow: 'hidden',
            boxSizing: 'border-box',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
        >
          {/* Inner Circular Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 1
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif-body)',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: '#8C5A40',
                marginBottom: '0.35rem'
              }}
            >
              You're Invited!
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#382318',
                letterSpacing: '0.03em',
                lineHeight: 1.2,
                marginBottom: '0.25rem'
              }}
            >
              {weddingData.weddingDate.displayDate}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-serif-sub)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#703E2D',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.35rem'
              }}
            >
              {weddingData.weddingDate.dayOfWeek}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-serif-body)',
                fontSize: '0.98rem',
                fontWeight: 700,
                color: '#523122',
                letterSpacing: '0.04em'
              }}
            >
              {weddingData.weddingDate.time}
            </p>
          </div>

          {/* Interactive Chocolate Scratch Canvas Overlay */}
          {!isScratched && (
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 4,
                cursor: 'grab',
                touchAction: 'none',
                borderRadius: '50%',
                transition: 'opacity 0.4s ease'
              }}
            />
          )}

          {/* Quick Reveal Helper if user wants direct reveal */}
          {!isScratched && (
            <button
              onClick={revealAll}
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 5,
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid #703E2D',
                borderRadius: '9999px',
                padding: '3px 12px',
                fontSize: '0.65rem',
                fontWeight: 600,
                color: '#703E2D',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                whiteSpace: 'nowrap'
              }}
            >
              Reveal ✨
            </button>
          )}
        </div>

        {/* Rich Chocolate SAVE THE DATE Button */}
        <button
          onClick={() => {
            setToastMessage({
              title: 'Date Reserved!',
              sub: `${weddingData.weddingDate.displayDate} marked on calendar.`
            });
            setToastVisible(true);
            setShowCalendarModal(!showCalendarModal);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: '#703E2D',
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif-sub)',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '14px 32px',
            borderRadius: '9999px',
            border: 'none',
            boxShadow: '0 6px 20px rgba(112, 62, 45, 0.35)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            width: '100%',
            maxWidth: '260px'
          }}
        >
          <Calendar size={18} color="#FCE7D6" />
          <span>Save The Date</span>
        </button>

        {/* Calendar Dropdown Options Modal */}
        {showCalendarModal && (
          <div
            style={{
              marginTop: '1rem',
              width: '100%',
              maxWidth: '300px',
              background: '#FFFDF9',
              border: '1.5px solid #C89A7A',
              borderRadius: '16px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 10px 25px rgba(112, 62, 45, 0.15)',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif-sub)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#703E2D',
                textTransform: 'uppercase'
              }}
            >
              Add to your calendar:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowCalendarModal(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '9px',
                  background: '#703E2D',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)'
                }}
              >
                Google Cal
              </a>

              <button
                onClick={downloadIcsFile}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '9px',
                  background: 'transparent',
                  border: '1px solid #703E2D',
                  color: '#703E2D',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer'
                }}
              >
                Apple / iCal
              </button>
            </div>
          </div>
        )}
      </div>

      <Toast
        message={toastMessage.title}
        subMessage={toastMessage.sub}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </section>
  );
};
