'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';

export default function EyeAnimation({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const [animationStage, setAnimationStage] = useState(0);
  const eyeRef = useRef<SVGSVGElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkStage, setBlinkStage] = useState(0);
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 });
  const blinkTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Get eyelid paths based on blink stage
  const getEyelidPaths = () => {
    // Top eyelid paths for different blink stages
    const topPaths = [
      'M20,30 Q100,0 180,30', // Fully open
      'M20,40 Q100,20 180,40', // Half closed
      'M20,50 Q100,50 180,50', // Fully closed
      'M20,40 Q100,20 180,40', // Half open (same as half closed)
    ];

    // Bottom eyelid paths for different blink stages
    const bottomPaths = [
      'M20,70 Q100,100 180,70', // Fully open
      'M20,60 Q100,80 180,60', // Half closed
      'M20,50 Q100,50 180,50', // Fully closed
      'M20,60 Q100,80 180,60', // Half open (same as half closed)
    ];

    // Top eyelid fill paths for different blink stages
    const topFillPaths = [
      'M0,0 L200,0 L200,30 Q100,0 0,30 Z', // Fully open
      'M0,0 L200,0 L200,40 Q100,20 0,40 Z', // Half closed
      'M0,0 L200,0 L200,50 Q100,50 0,50 Z', // Fully closed
      'M0,0 L200,0 L200,40 Q100,20 0,40 Z', // Half open
    ];

    // Bottom eyelid fill paths for different blink stages
    const bottomFillPaths = [
      'M0,70 Q100,100 200,70 L200,100 L0,100 Z', // Fully open
      'M0,60 Q100,80 200,60 L200,100 L0,100 Z', // Half closed
      'M0,50 Q100,50 200,50 L200,100 L0,100 Z', // Fully closed
      'M0,60 Q100,80 200,60 L200,100 L0,100 Z', // Half open
    ];

    return {
      topPath: topPaths[blinkStage],
      bottomPath: bottomPaths[blinkStage],
      topFillPath: topFillPaths[blinkStage],
      bottomFillPath: bottomFillPaths[blinkStage],
    };
  };

  const eyelidPaths = getEyelidPaths();

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 600); // Show line
    const timer2 = setTimeout(() => setAnimationStage(2), 1500); // Open eye
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (animationStage !== 2) return; // Only start blinking after eye is open

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
        blinkTimeoutRef.current = scheduleBlink();
      }, nextBlinkDelay);
    };

    // Keep reference to timeout for cleanup

    blinkTimeoutRef.current = scheduleBlink();

    return () => {
      if (blinkTimeoutRef.current) {
        clearTimeout(blinkTimeoutRef.current);
      }
    };
  }, [animationStage]);

  // Update irisOffset when motion values change
  useMotionValueEvent(mouseX, 'change', () => updateIris());
  useMotionValueEvent(mouseY, 'change', () => updateIris());

  const updateIris = () => {
    if (!eyeRef.current) return;
    const eye = eyeRef.current.getBoundingClientRect();
    const centerX = eye.left + eye.width / 2;
    const centerY = eye.top + eye.height / 2;

    let x = mouseX.get();
    let y = mouseY.get();

    if (Math.abs(x) <= 1 && Math.abs(y) <= 1) {
      x = centerX + x * eye.width;
      y = centerY + y * eye.height;
    }

    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxX = Math.min(eye.width, eye.height) / 2;
    const maxY = Math.min(eye.width, eye.height) / 1.5;
    const dampen = Math.min(1, distance / 100);

    const offsetX = (dx / distance) * maxX * dampen || 0;
    const offsetY = (dy / distance) * maxY * dampen || 0;

    setIrisOffset({ x: offsetX, y: offsetY });
  };

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='relative w-[200px] h-[100px]'>
        {animationStage === 1 && (
          <motion.div
            initial={{ width: 0, x: -300 }}
            animate={{ width: 200, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='absolute top-[50px] left-0 h-[3px] bg-black'
          />
        )}

        {animationStage === 2 && (
          <svg
            width='200'
            height='100'
            viewBox='0 0 200 100'
            ref={eyeRef}
            className='absolute top-0 left-0'
          >
            <rect x='0' y='0' width='200' height='100' fill='white' />

            {/* Iris */}
            <motion.g
              animate={{ x: irisOffset.x, y: irisOffset.y }}
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 22,
                mass: 0.35,
              }}
            >
              <circle cx='100' cy='50' r='25' fill='#5b8fb9' />
              <circle cx='100' cy='50' r='12' fill='black' />
              <circle cx='110' cy='40' r='5' fill='white' opacity='0.7' />
            </motion.g>

            {/* Top eyelid - filled shape that covers the iris */}
            <motion.path d={eyelidPaths.topFillPath} transition={{ duration: 0.1 }} fill='white' />

            {/* Bottom eyelid - filled shape that covers the iris */}
            <motion.path
              d={eyelidPaths.bottomFillPath}
              transition={{ duration: 0.1 }}
              fill='white'
            />

            {/* Eye outline (top lid) - drawn on top */}
            <motion.path
              d={eyelidPaths.topPath}
              transition={{ duration: 0.1 }}
              stroke='black'
              strokeWidth='3'
              fill='none'
            />

            {/* Eye outline (bottom lid) - drawn on top */}
            <motion.path
              d={eyelidPaths.bottomPath}
              transition={{ duration: 0.1 }}
              stroke='black'
              strokeWidth='3'
              fill='none'
            />
          </svg>
        )}
      </div>
    </div>
  );
}
