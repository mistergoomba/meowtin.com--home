'use client';

import { useEffect, useState } from 'react';

import HomePage from '@/components/HomePage';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showHomePage, setShowHomePage] = useState(false);
  const [redOverlayVisible, setRedOverlayVisible] = useState(false);
  const [redOverlayFadingOut, setRedOverlayFadingOut] = useState(false);

  useEffect(() => {
    const handleSceneTrigger = () => {
      setRedOverlayVisible(true);
      setTimeout(() => {
        setShowHomePage(true);
        setRedOverlayFadingOut(true);
      }, 1000);
      setTimeout(() => {
        setRedOverlayVisible(false);
        setRedOverlayFadingOut(false);
        setShowLandingPage(false);
      }, 2000); // allow fade-out to complete
    };

    window.addEventListener('eyeMeltComplete', handleSceneTrigger);
    return () => window.removeEventListener('eyeMeltComplete', handleSceneTrigger);
  }, []);

  return (
    <div className='w-full min-h-screen'>
      <section className='relative h-screen w-full bg-black'>
        {redOverlayVisible && (
          <div
            className={`absolute inset-0 z-10 bg-red-800 transition-opacity duration-1000 pointer-events-none ${
              redOverlayFadingOut ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        {showLandingPage && <LandingPage showHomePage={showHomePage} />}
        {showHomePage && <HomePage />}
      </section>
    </div>
  );
}
