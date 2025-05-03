'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';

export default function EyeAnimation({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const [animationStage, setAnimationStage] = useState(0);
  const eyeRef = useRef<SVGSVGElement>(null);
  const [blinkStage, setBlinkStage] = useState(0);
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 });
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);

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

  // Update iris position based on mouse position
  const updateIris = () => {
    if (!eyeRef.current || typeof window === 'undefined') return;

    const eye = eyeRef.current.getBoundingClientRect();
    if (eye.width === 0 || eye.height === 0) return; // Prevents NaN offsets
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    // Get normalized mouse position (-0.5 to 0.5)
    const x = mouseX.get();
    const y = mouseY.get();

    // Calculate direction vector
    // We're using window coordinates for better positioning
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;
    const dx = x * window.innerWidth + windowCenterX - eyeCenterX;
    const dy = y * window.innerHeight + windowCenterY - eyeCenterY;

    // Calculate distance for normalization
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Set maximum movement distances - REDUCED for less exaggerated movement
    const maxDistanceX = Math.min(eye.width, eye.height) / 2.5;
    const maxDistanceY = Math.min(eye.width, eye.height) / 4.0;

    // Calculate normalized offsets with reduced horizontal exaggeration
    let offsetX = 0;
    let offsetY = 0;

    if (distance > 0) {
      // Base movement with limits
      offsetX = (dx / distance) * Math.min(Math.abs(dx), maxDistanceX);
      offsetY = (dy / distance) * Math.min(Math.abs(dy), maxDistanceY);

      // Reduced horizontal exaggeration
      offsetX *= 1.2;
    }

    setIrisOffset({ x: offsetX, y: offsetY });
  };

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Start animation sequence
  useEffect(() => {
    if (!isMounted) return;

    const timer1 = setTimeout(() => setAnimationStage(1), 600); // Show line
    const timer2 = setTimeout(() => setAnimationStage(2), 1500); // Open eye

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isMounted]);

  // Set up blinking
  useEffect(() => {
    if (!isMounted || animationStage !== 2) return; // Only start blinking after eye is open

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
      return setTimeout(() => {
        doBlink();
        if (blinkTimeoutRef.current) {
          clearTimeout(blinkTimeoutRef.current);
        }
        blinkTimeoutRef.current = scheduleBlink() as NodeJS.Timeout;
      }, nextBlinkDelay);
    };

    // Start the blinking cycle
    blinkTimeoutRef.current = scheduleBlink() as NodeJS.Timeout;

    return () => {
      if (blinkTimeoutRef.current) {
        clearTimeout(blinkTimeoutRef.current);
      }
    };
  }, [animationStage, isMounted]);

  // Update iris position when mouse moves
  useEffect(() => {
    if (!isMounted || animationStage !== 2) return;

    const unsubscribeX = mouseX.onChange(updateIris);
    const unsubscribeY = mouseY.onChange(updateIris);

    // Trigger once on open
    setTimeout(() => updateIris(), 100);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [isMounted, animationStage, mouseX, mouseY]);

  if (!isMounted) return null;

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
              <motion.g
                animate={{ x: irisOffset.x, y: irisOffset.y }}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 22,
                  mass: 0.35,
                }}
              >
                {/* Iris (colored part) */}
                <circle cx='100' cy='50' r='25' fill='#5b8fb9' stroke='none' />

                {/* Pupil (black center) */}
                <circle cx='100' cy='50' r='12' fill='black' stroke='none' />

                {/* Light reflection */}
                <circle cx='110' cy='40' r='5' fill='white' stroke='none' opacity='0.7' />
              </motion.g>
            </g>

            {/* Eye outline (top lid) - drawn on top */}
            <motion.path
              d={eyelidPaths.topPath}
              transition={{ duration: 0.1 }}
              stroke='white'
              strokeWidth='3'
              fill='none'
            />

            {/* Eye outline (bottom lid) - drawn on top */}
            <motion.path
              d={eyelidPaths.bottomPath}
              transition={{ duration: 0.1 }}
              stroke='white'
              strokeWidth='3'
              fill='none'
            />
          </svg>
        )}
      </div>
    </div>
  );
}
