'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import dynamic from 'next/dynamic';

import PortfolioLink from '@/components/PortfolioLink';

const EyeAnimation = dynamic(() => import('@/components/EyeAnimation'), { ssr: false });
const MouseParticles = dynamic(() => import('@/components/MouseParticles'), { ssr: false });

export default function Home() {
  // Check if the device is mobile for responsive behavior
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Raw motion values for tracking cursor/touch position
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring animations for natural movement
  // Different stiffness and damping for mobile vs desktop
  const springX = useSpring(rawX, { stiffness: isMobile ? 30 : 250, damping: isMobile ? 20 : 30 });
  const springY = useSpring(rawY, { stiffness: isMobile ? 30 : 250, damping: isMobile ? 20 : 30 });

  useEffect(() => {
    let idleTimeout: NodeJS.Timeout | null = null;
    let driftInterval: NodeJS.Timeout | null = null;

    // Function to create subtle random movement when idle
    const startDrift = () => {
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

    // Handle touch events for mobile devices
    const handleTap = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = touch.clientX / window.innerWidth - 0.5;
      const y = touch.clientY / window.innerHeight - 0.5;
      rawX.set(x);
      rawY.set(y);
    };

    if (typeof window !== 'undefined') {
      if (isMobile) {
        // Mobile-specific behavior: start idle drift and handle touch
        startDrift();
        window.addEventListener('touchstart', handleTap);
      } else {
        // Desktop behavior: track mouse movement and manage idle state
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

        window.addEventListener('mousemove', handleMouseMove);
      }
    }

    // Cleanup event listeners and intervals
    return () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      if (driftInterval) clearInterval(driftInterval);
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('touchstart', handleTap);
    };
  }, []);

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
              icon: FaFacebookF,
              style: 'top-0 left-0',
              depth: 1.5,
            },
            {
              href: 'https://www.instagram.com/mistergoomba',
              icon: FaInstagram,
              style: 'top-10 left-20',
              depth: 2,
            },
            {
              href: 'https://www.tiktok.com/@mrgoomba',
              icon: FaTiktok,
              style: 'bottom-12 right-10',
              depth: 1.2,
            },
            {
              href: 'https://www.youtube.com/@mistergoomba',
              icon: FaYoutube,
              style: 'bottom-10 left-5',
              depth: 1.8,
            },
          ].map((link, i) => (
            <div key={i} className={`absolute ${link.style}`}>
              <PortfolioLink
                href={link.href}
                position=''
                mouseX={rawX}
                mouseY={rawY}
                depth={link.depth}
                Icon={link.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
