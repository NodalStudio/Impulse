'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Pillars from '@/components/Pillars';
import Audience from '@/components/Audience';
import HowItWorks from '@/components/HowItWorks';
import Calendar from '@/components/Calendar';
import Benefits from '@/components/Benefits';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import IntroAnimation from '@/components/IntroAnimation';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const headerLogoRef = useRef<HTMLAnchorElement>(null);

  // Skip intro for returning visitors (same browser session)
  useEffect(() => {
    if (sessionStorage.getItem('impulse-intro-seen') === 'true') {
      setIntroComplete(true);
      setShowOverlay(false);
    }
  }, []);

  const handleLogoLanded = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const handleComplete = useCallback(() => {
    setShowOverlay(false);
    sessionStorage.setItem('impulse-intro-seen', 'true');
  }, []);

  return (
    <>
      {showOverlay && (
        <IntroAnimation
          onLogoLanded={handleLogoLanded}
          onComplete={handleComplete}
          headerLogoRef={headerLogoRef}
        />
      )}
      <Header introComplete={introComplete} logoRef={headerLogoRef} />
      <main>
        <Hero />
        <Mission />
        <Problem />
        <Solution />
        <Pillars />
        <Audience />
        <HowItWorks />
        <Calendar />
        <Benefits />
        <Team />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
