'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function EyeAnimation({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const [animationStage, setAnimationStage] = useState(0);
  const eyeRef = useRef<SVGSVGElement>(null);
  const [blinkStage, setBlinkStage] = useState(0);
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 });
  const [isHydrated, setIsHydrated] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const autoAnimateRef = useRef<NodeJS.Timeout | null>(null);

  // Get eyelid paths based on blink stage - with pointed ends
  const getEyelidPaths = () => {
    // Top eyelid paths for different blink stages - with pointed ends
    const topPaths = [
      'M15,40 Q100,0 185,40', // Fully open - pointed at both ends
      'M15,45 Q100,20 185,45', // Half closed - pointed at both ends
      'M15,50 Q100,50 185,50', // Fully closed - pointed at both ends
      'M15,45 Q100,20 185,45', // Half open - pointed at both ends
    ];

    // Bottom eyelid paths for different blink stages - with pointed ends
    const bottomPaths = [
      'M15,60 Q100,100 185,60', // Fully open - pointed at both ends
      'M15,55 Q100,80 185,55', // Half closed - pointed at both ends
      'M15,50 Q100,50 185,50', // Fully closed - pointed at both ends
      'M15,55 Q100,80 185,55', // Half open - pointed at both ends
    ];

    // Define the clip path for the eye opening - with pointed ends
    const clipPaths = [
      'M15,40 Q100,0 185,40 L185,60 Q100,100 15,60 Z', // Fully open
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z', // Half closed
      'M15,50 Q100,50 185,50 L185,50 Q100,50 15,50 Z', // Fully closed (a line)
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z', // Half open
    ];

    return {
      topPath: topPaths[blinkStage],
      bottomPath: bottomPaths[blinkStage],
      clipPath: clipPaths[blinkStage],
    };
  };

  const eyelidPaths = getEyelidPaths();

  // Mark component as hydrated after mount
  useEffect(() => {
    setIsHydrated(true);

    // Start with a small movement to ensure animation starts
    setTimeout(() => {
      setIrisOffset({ x: 5, y: 2 });
    }, 2000);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoAnimateRef.current) {
        clearInterval(autoAnimateRef.current);
      }
    };
  }, []);

  // Start animation sequence
  useEffect(() => {
    if (!isHydrated) return;

    const timer1 = setTimeout(() => setAnimationStage(1), 600); // Show line
    const timer2 = setTimeout(() => setAnimationStage(2), 1500); // Open eye

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isHydrated]);

  // Handle blinking
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    let blinkTimeoutId: NodeJS.Timeout | null = null;

    // Function to handle a single blink cycle
    const doBlink = () => {
      // Start blink - half closed
      setBlinkStage(1);

      // After a short delay, fully close
      setTimeout(() => {
        setBlinkStage(2);

        // After another short delay, half open
        setTimeout(() => {
          setBlinkStage(3);

          // Finally, fully open
          setTimeout(() => {
            setBlinkStage(0);
          }, 60); // Time to fully open
        }, 40); // Time to stay fully closed
      }, 60); // Time to half close
    };

    // Schedule random blinks
    const scheduleBlink = () => {
      const nextBlinkDelay = Math.random() * 4000 + 2000; // Random delay between 2-6 seconds
      blinkTimeoutId = setTimeout(() => {
        doBlink();
        blinkTimeoutId = scheduleBlink();
      }, nextBlinkDelay);

      return blinkTimeoutId;
    };

    // Start the blinking cycle
    blinkTimeoutId = scheduleBlink();

    return () => {
      if (blinkTimeoutId) clearTimeout(blinkTimeoutId);
    };
  }, [animationStage, isHydrated]);

  // Direct DOM-based approach for eye movement
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    // Function to update iris position
    const updateIrisPosition = () => {
      if (!eyeRef.current) return;

      try {
        // Get current mouse position from props
        const currentX = mouseX.get();
        const currentY = mouseY.get();

        // Store last valid mouse position
        if (
          currentX !== undefined &&
          currentY !== undefined &&
          !isNaN(currentX) &&
          !isNaN(currentY)
        ) {
          lastMousePosRef.current = { x: currentX, y: currentY };
        }

        const x = lastMousePosRef.current.x;
        const y = lastMousePosRef.current.y;

        // Get eye dimensions
        const eye = eyeRef.current.getBoundingClientRect();
        if (eye.width === 0 || eye.height === 0) return;

        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        // Calculate direction vector
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        const dx = x * window.innerWidth + windowCenterX - eyeCenterX;
        const dy = y * window.innerHeight + windowCenterY - eyeCenterY;

        // Calculate distance for normalization
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Set maximum movement distances
        const maxDistanceX = Math.min(eye.width, eye.height) / 2.8;
        const maxDistanceY = Math.min(eye.width, eye.height) / 6.0;

        // Calculate normalized offsets
        let offsetX = 0;
        let offsetY = 0;

        if (distance > 0) {
          offsetX = (dx / distance) * Math.min(Math.abs(dx), maxDistanceX);
          offsetY = (dy / distance) * Math.min(Math.abs(dy), maxDistanceY);
        }

        // Update iris position with smooth transition
        setIrisOffset((prev) => ({
          x: prev.x + (offsetX - prev.x) * 0.1,
          y: prev.y + (offsetY - prev.y) * 0.1,
        }));
      } catch (error) {
        console.error('Error updating iris position:', error);
      }

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(updateIrisPosition);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateIrisPosition);

    // Fallback animation if no mouse movement is detected
    let lastOffsetX = 0;
    let lastOffsetY = 0;
    let noMovementCounter = 0;

    autoAnimateRef.current = setInterval(() => {
      // Check if iris has moved
      const currentOffsetX = irisOffset.x;
      const currentOffsetY = irisOffset.y;

      if (
        Math.abs(currentOffsetX - lastOffsetX) < 0.1 &&
        Math.abs(currentOffsetY - lastOffsetY) < 0.1
      ) {
        noMovementCounter++;

        // If no movement for 3 checks (3 seconds), start auto animation
        if (noMovementCounter >= 3) {
          // Generate random eye movement
          const randomX = (Math.random() - 0.5) * 0.4;
          const randomY = (Math.random() - 0.5) * 0.2;

          // Update last mouse position
          lastMousePosRef.current = { x: randomX, y: randomY };

          // Reset counter after applying movement
          noMovementCounter = 0;
        }
      } else {
        // Reset counter if movement detected
        noMovementCounter = 0;
      }

      // Update last position
      lastOffsetX = currentOffsetX;
      lastOffsetY = currentOffsetY;
    }, 1000);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoAnimateRef.current) {
        clearInterval(autoAnimateRef.current);
      }
    };
  }, [isHydrated, animationStage, mouseX, mouseY]);

  // Add direct mouse event listener as a fallback
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined') return;

      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      lastMousePosRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHydrated, animationStage]);

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='relative w-[200px] h-[100px]'>
        {/* Initial straight line */}
        {animationStage === 1 && (
          <motion.div
            initial={{ width: 0, x: -100 }}
            animate={{ width: 200, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='absolute top-[50px] left-0 h-[3px] bg-white'
          />
        )}

        {/* Eye SVG */}
        {animationStage === 2 && (
          <svg
            width='200'
            height='100'
            viewBox='0 0 200 100'
            ref={eyeRef}
            className='absolute top-0 left-0'
          >
            {/* Define the clip path for the eye opening */}
            <defs>
              <clipPath id='eyeClip'>
                <path d={eyelidPaths.clipPath} />
              </clipPath>
            </defs>

            {/* White sclera (background of the eye) */}
            <path d={eyelidPaths.clipPath} fill='white' />

            {/* Iris group - clipped by the eye opening */}
            <g clipPath='url(#eyeClip)'>
              <g style={{ transform: `translate(${irisOffset.x}px, ${irisOffset.y}px)` }}>
                {/* Iris (colored part) */}
                <circle cx='100' cy='50' r='25' fill='#5b8fb9' stroke='none' />

                {/* Pupil (black center) */}
                <circle cx='100' cy='50' r='12' fill='black' stroke='none' />

                {/* Light reflection */}
                <circle cx='110' cy='40' r='5' fill='white' stroke='none' opacity='0.7' />
              </g>
            </g>

            {/* Eye outline (top lid) - drawn on top */}
            <path d={eyelidPaths.topPath} stroke='white' strokeWidth='3' fill='none' />

            {/* Eye outline (bottom lid) - drawn on top */}
            <path d={eyelidPaths.bottomPath} stroke='white' strokeWidth='3' fill='none' />
          </svg>
        )}
      </div>
    </div>
  );
}
