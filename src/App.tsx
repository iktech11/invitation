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
import { useScrollReveal } from './hooks/useScrollReveal';

export const App: React.FC = () => {
  const [gateOpened, setGateOpened] = useState(false);

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
      {/* 1. OPENING SCREEN ROYAL GATE */}
      <OpeningGate onOpenComplete={() => setGateOpened(true)} />

      {/* 2. HERO SECTION */}
      <Hero gateOpened={gateOpened} />

      {/* 3. INVITATION SECTION */}
      <Invitation />

      {/* 4. SAVE THE DATE */}
      <SaveTheDate />

      {/* 5. EVENTS SECTION */}
      <Events />

      {/* 6. VENUE SECTION */}
      <Venue />

      {/* 7. STORY SECTION */}
      <Story />

      {/* 8. GALLERY SECTION */}
      <Gallery />

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
