'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Import the component with the correct path and name
import PortfolioLink from '@/components/PortfolioLink';

// Use dynamic imports for components that need to be client-side only
const EyeAnimation = dynamic(() => import('@/components/EyeAnimation'), { ssr: false });
const MouseParticles = dynamic(() => import('@/components/MouseParticles'), { ssr: false });

export default function Home() {
  // Raw motion values for tracking cursor/touch position
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring animations for natural movement
  const springX = useSpring(rawX, { stiffness: 250, damping: 30 });
  const springY = useSpring(rawY, { stiffness: 250, damping: 30 });

  // Track if touch is active
  const [isTouchActive, setIsTouchActive] = useState(false);

  useEffect(() => {
    let idleTimeout: NodeJS.Timeout | null = null;
    let driftInterval: NodeJS.Timeout | null = null;

    // Function to create subtle random movement when idle
    const startDrift = () => {
      if (isTouchActive) return; // Don't drift if touch is active

      driftInterval = setInterval(() => {
        const driftX = (Math.random() - 0.5) * 0.3;
        const driftY = (Math.random() - 0.5) * 0.3;
        rawX.set(rawX.get() + driftX);
        rawY.set(rawY.get() + driftY);
      }, 1000);
    };

    const stopDrift = () => {
      if (driftInterval) clearInterval(driftInterval);
    };

    // Handle mouse movement for desktop
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      rawX.set(x);
      rawY.set(y);

      // Reset idle timer on mouse movement
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => startDrift(), 5000);
      stopDrift();
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setIsTouchActive(true);
      stopDrift(); // Stop any drift when touch starts

      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = touch.clientX / window.innerWidth - 0.5;
        const y = touch.clientY / window.innerHeight - 0.5;
        rawX.set(x);
        rawY.set(y);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = touch.clientX / window.innerWidth - 0.5;
        const y = touch.clientY / window.innerHeight - 0.5;
        rawX.set(x);
        rawY.set(y);
      }
    };

    const handleTouchEnd = () => {
      setIsTouchActive(false);
      // Start idle drift after touch ends
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => startDrift(), 5000);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Start with idle drift
    idleTimeout = setTimeout(() => startDrift(), 5000);

    // Cleanup event listeners and intervals
    return () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      if (driftInterval) clearInterval(driftInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [rawX, rawY, isTouchActive]);

  return (
    <main className='relative h-screen w-full overflow-hidden bg-black'>
      <MouseParticles />
      <EyeAnimation mouseX={springX} mouseY={springY} />

      {/* Okie Dokie Karaoke Logo - Upper Right */}
      <div className='absolute top-10 right-60 z-10'>
        <PortfolioLink
          href='https://kj.meowtin.com'
          position=''
          mouseX={rawX}
          mouseY={rawY}
          depth={2.2}
          imageUrl='/okie-dokie-karaoke-logo.png'
          imageAlt='Okie Dokie Karaoke'
          imageSize={150}
        />
      </div>

      {/* Social Icons Cluster - Lower Left */}
      <div className='absolute bottom-10 left-10 z-10'>
        <div className='relative w-[250px] h-[250px]'>
          {[
            {
              href: 'https://www.facebook.com/mistergoombaremix',
              Icon: FaFacebookF,
              position: 'top-0 left-0',
              depth: 1.5,
            },
            {
              href: 'https://www.instagram.com/mistergoomba',
              Icon: FaInstagram,
              position: 'top-10 left-20',
              depth: 2,
            },
            {
              href: 'https://www.tiktok.com/@mrgoomba',
              Icon: FaTiktok,
              position: 'bottom-12 right-10',
              depth: 1.2,
            },
            {
              href: 'https://www.youtube.com/@mistergoomba',
              Icon: FaYoutube,
              position: 'bottom-10 left-5',
              depth: 1.8,
            },
          ].map((link, i) => (
            <div key={i} className={`absolute ${link.position}`}>
              <PortfolioLink
                href={link.href}
                position=''
                mouseX={rawX}
                mouseY={rawY}
                depth={link.depth}
                Icon={link.Icon}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
