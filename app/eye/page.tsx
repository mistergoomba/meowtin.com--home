'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import FallingSocialRain from '@/components/FallingSocialRain';

// Eye is client-side only
const EyeAnimation = dynamic(() => import('@/components/EyeAnimation'), {
  ssr: false,
  loading: () => (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='relative w-[200px] h-[100px]'>
        <div className='absolute top-[50px] left-0 h-[3px] w-[200px] bg-white' />
      </div>
    </div>
  ),
});

export default function EyePage() {
  const router = useRouter();

  const [redVisible, setRedVisible] = useState(false);
  const [redMelt, setRedMelt] = useState(false);
  const [eyeHovering, setEyeHovering] = useState(false);

  useEffect(() => {
    const onMelt = () => {
      setRedVisible(true); // instantly hides rain
      const t1 = setTimeout(() => setRedMelt(true), 200);
      const t2 = setTimeout(() => router.push('/'), 1400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };
    const onEyeHover = (e: Event) => setEyeHovering(Boolean((e as CustomEvent<boolean>).detail));

    window.addEventListener('eyeMeltComplete', onMelt);
    window.addEventListener('eyeHover', onEyeHover);
    return () => {
      window.removeEventListener('eyeMeltComplete', onMelt);
      window.removeEventListener('eyeHover', onEyeHover);
    };
  }, [router]);

  // Cursor values for EyeAnimation
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 30, mass: 0.8 });

  const [isClient, setIsClient] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    setIsClient(true);
    isMounted.current = true;

    let idleTimeout: NodeJS.Timeout | null = null;
    let driftInterval: NodeJS.Timeout | null = null;
    let lastUpdateTime = 0;

    const startDrift = () => {
      driftInterval = setInterval(() => {
        const dx = (Math.random() - 0.5) * 0.2;
        const dy = (Math.random() - 0.5) * 0.2;
        rawX.set(rawX.get() + dx);
        rawY.set(rawY.get() + dy);
      }, 1200);
    };
    const stopDrift = () => {
      if (driftInterval) clearInterval(driftInterval);
    };
    const updateMouse = (clientX: number, clientY: number) => {
      const now = Date.now();
      if (now - lastUpdateTime < 16) return;
      lastUpdateTime = now;
      const x = clientX / window.innerWidth - 0.5;
      const y = clientY / window.innerHeight - 0.5;
      springX.set(x);
      springY.set(y);
      rawX.set(x);
      rawY.set(y);
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => startDrift(), 5000);
      stopDrift();
    };

    const onMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => startDrift(), 5000);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });

    setTimeout(() => {
      updateMouse(window.innerWidth / 2 + 10, window.innerHeight / 2 + 10);
    }, 100);
    idleTimeout = setTimeout(() => startDrift(), 5000);

    return () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      if (driftInterval) clearInterval(driftInterval);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      isMounted.current = false;
    };
  }, [rawX, rawY, springX, springY]);

  return (
    <div className='w-full min-h-screen'>
      <section className='relative h-screen w-full bg-black overflow-hidden'>
        {/* Red overlay with MELT animation */}
        {redVisible && (
          <div
            className={`absolute inset-0 z-10 bg-red-800 pointer-events-none ${
              redMelt ? 'animate-red-melt' : ''
            }`}
          />
        )}

        {/* Social rain (hidden immediately when red overlay appears) */}
        {!redVisible && <FallingSocialRain eyeHovering={eyeHovering} />}

        {/* Centered Eye */}
        {isClient && <EyeAnimation mouseX={springX} mouseY={springY} />}

        {/* Overlay melt */}
        <style jsx global>{`
          @keyframes redMelt {
            0% {
              opacity: 1;
              transform: scaleY(1) translateY(0);
            }
            100% {
              opacity: 0;
              transform: scaleY(5) translateY(120px);
            }
          }
          .animate-red-melt {
            animation: redMelt 1s ease-out forwards;
          }
        `}</style>
      </section>
    </div>
  );
}
