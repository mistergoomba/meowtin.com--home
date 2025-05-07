import { useEffect, useState, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';

// Use dynamic imports for components that need to be client-side only
const EyeAnimation = dynamic(() => import('@/components/EyeAnimation'), {
  ssr: false,
  loading: () => (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='relative w-[200px] h-[100px]'>
        <div className='absolute top-[50px] left-0 h-[3px] w-[200px] bg-white'></div>
      </div>
    </div>
  ),
});
const MouseParticles = dynamic(() => import('@/components/MouseParticles'), { ssr: false });

export default function LandingPage({ showHomePage }: { showHomePage: boolean }) {
  // Raw motion values for tracking cursor/touch position
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring animations for natural movement
  const springX = useSpring(rawX, {
    stiffness: 120, // Further reduced for gentler movement
    damping: 30, // Increased damping for less oscillation
    mass: 0.8, // Increased mass for more inertia
  });

  const springY = useSpring(rawY, {
    stiffness: 120, // Further reduced for gentler movement
    damping: 30, // Increased damping for less oscillation
    mass: 0.8, // Increased mass for more inertia
  });

  // Track if touch is active
  const [isTouchActive, setIsTouchActive] = useState(false);

  // Track screen size for responsive positioning
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  // Track if component is mounted
  const isMounted = useRef(false);

  // Update screen size state
  useEffect(() => {
    setIsClient(true);
    isMounted.current = true;

    const handleResize = () => {
      if (!isMounted.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setIsMobile(width < 768); // Standard mobile breakpoint
    };

    // Initial check
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      isMounted.current = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Set up mouse/touch events
  useEffect(() => {
    if (!isMounted.current || !isClient) return;

    let idleTimeout: NodeJS.Timeout | null = null;
    let driftInterval: NodeJS.Timeout | null = null;
    let lastUpdateTime = 0;
    const throttleTime = 16; // ~60fps

    // Function to create subtle random movement when idle
    const startDrift = () => {
      if (isTouchActive) return; // Don't drift if touch is active

      driftInterval = setInterval(() => {
        const driftX = (Math.random() - 0.5) * 0.2; // Reduced drift amount
        const driftY = (Math.random() - 0.5) * 0.2; // Reduced drift amount
        rawX.set(rawX.get() + driftX);
        rawY.set(rawY.get() + driftY);
      }, 1200); // Slower drift interval
    };

    const stopDrift = () => {
      if (driftInterval) clearInterval(driftInterval);
    };

    // Throttled function to update mouse position
    const updateMousePosition = (clientX: number, clientY: number) => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleTime) return;

      lastUpdateTime = now;

      if (typeof window === 'undefined') return;

      const x = clientX / window.innerWidth - 0.5;
      const y = clientY / window.innerHeight - 0.5;

      // Use spring.set() for smoother transitions
      springX.set(x);
      springY.set(y);

      // Set raw values for other components
      rawX.set(x);
      rawY.set(y);

      // Reset idle timer on mouse movement
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => startDrift(), 5000);
      stopDrift();
    };

    // Handle mouse movement for desktop
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      // Always prevent default on touch to prevent scrolling
      e.preventDefault();

      setIsTouchActive(true);
      stopDrift(); // Stop any drift when touch starts

      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Always prevent default on touch to prevent scrolling
      e.preventDefault();

      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Always prevent default on touch to prevent scrolling
      e.preventDefault();

      setIsTouchActive(false);
      // Start idle drift after touch ends
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => startDrift(), 5000);
    };

    // Add event listeners only if window is available
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: false }); // passive: false to allow preventDefault
      window.addEventListener('touchmove', handleTouchMove, { passive: false }); // passive: false to allow preventDefault
      window.addEventListener('touchend', handleTouchEnd, { passive: false }); // passive: false to allow preventDefault

      // Start with idle drift
      idleTimeout = setTimeout(() => startDrift(), 5000);

      // Initialize with a small movement to ensure animation starts
      setTimeout(() => {
        updateMousePosition(window.innerWidth / 2 + 10, window.innerHeight / 2 + 10);
      }, 100);
    }

    // Cleanup event listeners and intervals
    return () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      if (driftInterval) clearInterval(driftInterval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [rawX, rawY, springX, springY, isTouchActive, isClient]);

  return (
    <>
      {!showHomePage && <MouseParticles isMobile={isMobile} />}
      {isClient && <EyeAnimation mouseX={springX} mouseY={springY} />}
    </>
  );
}
