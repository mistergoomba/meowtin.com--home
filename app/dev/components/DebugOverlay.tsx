'use client';

import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';

export default function DebugOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollYProgress } = useScroll();

  // Toggle visibility with the 'd' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setScrollPosition(value);
    });
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  if (!isVisible) return null;

  return (
    <div className='fixed top-0 left-0 z-50 bg-black/80 text-white p-4 m-4 rounded-lg font-mono text-sm'>
      <div>Scroll Progress: {(scrollPosition * 100).toFixed(2)}%</div>
      <div className='mt-2'>
        <div className='text-xs text-gray-400'>Press 'd' to toggle debug overlay</div>
      </div>
    </div>
  );
}
