'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import EyeAnimation from '@/components/eye-animation';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

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
    <main className='relative h-screen w-full overflow-hidden bg-white'>
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

// PortfolioLink component for individual portfolio items

function PortfolioLink({
  href,
  position,
  mouseX,
  mouseY,
  depth,
  imageUrl,
  imageAlt,
  imageSize = 200,
  Icon,
}: {
  href: string;
  position: string;
  mouseX: any;
  mouseY: any;
  depth: number;
  imageUrl?: string;
  imageAlt?: string;
  imageSize?: number;
  Icon?: any;
}) {
  // State to track this element's 3D transform
  const [transform, setTransform] = useState('');

  // Update transform when mouse position changes
  useEffect(() => {
    const updateTransform = () => {
      const x = mouseX.get() * -20 * depth;
      const y = mouseY.get() * -20 * depth;
      const rotateX = mouseY.get() * 10;
      const rotateY = mouseX.get() * -10;

      setTransform(`translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    // Set up listeners for motion value changes
    const unsubscribeX = mouseX.on('change', updateTransform);
    const unsubscribeY = mouseY.on('change', updateTransform);

    // Initial update
    updateTransform();

    // Cleanup
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, depth]);

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`absolute ${position} ${
        !imageUrl && !Icon ? 'rounded-full border border-black px-4 py-2' : ''
      } text-sm font-medium text-black opacity-0 transition-opacity duration-1000 hover:scale-105 animate-fade-in`}
      style={{
        animationDelay: `3s`,
        transform,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'transform 0.2s ease-out, scale 0.2s ease-out',
      }}
    >
      {Icon ? (
        <Icon className='w-12 h-12 text-black transition' />
      ) : imageUrl ? (
        <div
          className={`relative overflow-hidden`}
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            maxWidth: '200px',
            maxHeight: '200px',
          }}
        >
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={imageAlt || ''}
            fill
            style={{ objectFit: 'contain' }}
            sizes={`${imageSize}px`}
          />
        </div>
      ) : (
        ''
      )}
    </a>
  );
}
