'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring, useMotionTemplate, motion } from 'framer-motion';
import Image from 'next/image';
import EyeAnimation from '@/components/eye-animation';

export default function Home() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Raw motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth values (used by Eye and Links)
  const springX = useSpring(rawX, { stiffness: isMobile ? 30 : 250, damping: isMobile ? 20 : 30 });
  const springY = useSpring(rawY, { stiffness: isMobile ? 30 : 250, damping: isMobile ? 20 : 30 });

  useEffect(() => {
    let idleTimeout: NodeJS.Timeout | null = null;
    let driftInterval: NodeJS.Timeout | null = null;

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

    const handleTap = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = touch.clientX / window.innerWidth - 0.5;
      const y = touch.clientY / window.innerHeight - 0.5;
      rawX.set(x);
      rawY.set(y);
    };

    if (typeof window !== 'undefined') {
      if (isMobile) {
        // Idle look-around
        startDrift();

        window.addEventListener('touchstart', handleTap);
      } else {
        const handleMouseMove = (e: MouseEvent) => {
          const x = e.clientX / window.innerWidth - 0.5;
          const y = e.clientY / window.innerHeight - 0.5;

          rawX.set(x);
          rawY.set(y);

          // Restart idle drift timer
          if (idleTimeout) clearTimeout(idleTimeout);
          idleTimeout = setTimeout(() => startDrift(), 5000);
          stopDrift();
        };

        window.addEventListener('mousemove', handleMouseMove);
      }
    }

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
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='grid grid-cols-3 gap-x-40 gap-y-20'>
          {[
            { href: 'https://github.com', label: 'GitHub', pos: 'top-20 left-20', depth: 1.5 },
            {
              href: 'https://kj.meowtin.com',
              pos: 'top-10 right-40',
              depth: 2,
              imageUrl: '/okie-dokie-karaoke-logo.png',
              imageAlt: 'Okie Dokie Karaoke',
            },
            {
              href: 'https://dribbble.com',
              label: 'Dribbble',
              pos: 'bottom-40 left-10',
              depth: 1.2,
            },
            {
              href: 'https://behance.net',
              label: 'Behance',
              pos: 'bottom-20 right-20',
              depth: 1.8,
            },
            { href: '/projects', label: 'Projects', pos: 'top-40 left-40', depth: 2.2 },
            { href: '/contact', label: 'Contact', pos: 'bottom-10 right-40', depth: 1.3 },
          ].map((link, i) => (
            <PortfolioLink
              key={i}
              href={link.href}
              label={link.label}
              position={link.pos}
              mouseX={springX}
              mouseY={springY}
              depth={link.depth}
              imageUrl={link.imageUrl}
              imageAlt={link.imageAlt}
              imageSize={200}
              imageBg='bg-white'
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function PortfolioLink({
  href,
  label,
  position,
  mouseX,
  mouseY,
  depth,
  imageUrl,
  imageAlt,
  imageSize = 200,
  imageBg,
}: {
  href: string;
  label?: string;
  position: string;
  mouseX: any;
  mouseY: any;
  depth: number;
  imageUrl?: string;
  imageAlt?: string;
  imageSize?: number;
  imageBg?: string;
}) {
  const transform = useMotionTemplate`
  translate3d(${mouseX} * ${-20 * depth}px, ${mouseY} * ${-20 * depth}px, 0)
  rotateX(${mouseY} * 10deg)
  rotateY(${mouseX} * -10deg)
`;

  const animationDelay = position.includes('top') ? '0.5s' : '1s';

  return (
    <motion.a
      href={href}
      className={`absolute ${position} ${
        !imageUrl ? 'rounded-full border border-black px-4 py-2' : ''
      } text-sm font-medium text-black opacity-0 transition-opacity duration-1000 hover:scale-105 animate-fade-in`}
      style={{
        animationDelay,
        transform,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {imageUrl ? (
        <div
          className={`relative overflow-hidden ${imageBg || ''}`}
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
        label
      )}
    </motion.a>
  );
}
