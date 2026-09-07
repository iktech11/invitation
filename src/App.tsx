import React, { useState, useEffect } from 'react';
import { OpeningGate } from './components/OpeningGate';
import { Hero } from './components/Hero';
import { Invitation } from './components/Invitation';
import { SaveTheDate } from './components/SaveTheDate';
import { Events } from './components/Events';
import { Venue } from './components/Venue';
import { Story } from './components/Story';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { ChocolateConfettiCanvas } from './components/ChocolateConfettiCanvas';
import { InteractiveSparkleCursor } from './components/InteractiveSparkleCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { useScrollReveal } from './hooks/useScrollReveal';

export const App: React.FC = () => {
  const [gateOpened, setGateOpened] = useState(false);
  const [scratchStarted, setScratchStarted] = useState(false);

  // Hook to activate smooth luxury scroll animations on all sections
  useScrollReveal([gateOpened]);

  useEffect(() => {
    if (!gateOpened) {
      document.body.classList.add('gate-closed');
    } else {
      document.body.classList.remove('gate-closed');
    }

    return () => {
      document.body.classList.remove('gate-closed');
    };
  }, [gateOpened]);

  return (
    <div className="invitation-wrapper">
      {/* 0. CLAUDE-TIER SHINY TOUCH/CURSOR SPARKLE EFFECT & SCROLL PROGRESS */}
      <InteractiveSparkleCursor />
      <ScrollProgressBar />

      {/* 1. OPENING SCREEN ROYAL GATE */}
      <OpeningGate onOpenComplete={() => setGateOpened(true)} />

      {/* 2. HERO SECTION */}
      <Hero gateOpened={gateOpened} />

      {/* 3 & 4. INVITATION & COUNTDOWN ZONE 
          (Scratch particles are strictly contained within this zone and DO NOT fall into Events or below) */}
      <div
        id="invitation-countdown-zone"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Celebration Particles Canvas - bound strictly up to the SaveTheDate countdown */}
        <ChocolateConfettiCanvas active={scratchStarted} />

        {/* 3. INVITATION SECTION WITH SCRATCH CARD */}
        <Invitation onScratchStart={() => setScratchStarted(true)} />

        {/* 4. SAVE THE DATE & LIVE COUNTDOWN TIMER */}
        <SaveTheDate />
      </div>

      {/* 5. EVENTS CELEBRATION SECTION */}
      <Events />

      {/* 6. AUSPICIOUS VENUE SECTION */}
      <Venue />

      {/* 7. LOVE STORY MILESTONE SECTION */}
      <Story />

      {/* 8. PHOTO GALLERY SECTION */}
      <Gallery />

      {/* 9. ROYAL FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
