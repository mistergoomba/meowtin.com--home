'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';

export default function EyeAnimation({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const [animationStage, setAnimationStage] = useState(0);
  const eyeRef = useRef<SVGSVGElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 600); // Show line
    const timer2 = setTimeout(() => setAnimationStage(2), 1500); // Open eye
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const scheduleBlink = () => {
      const delay = Math.random() * 4000 + 3000;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 150);
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

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

    const maxX = Math.min(eye.width, eye.height) / 3;
    const maxY = Math.min(eye.width, eye.height) / 3;
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
            initial={{ width: 0, x: -100 }}
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

            <motion.path
              initial={false}
              animate={{
                d: isBlinking ? 'M0,0 L200,0 L200,50 L0,50 Z' : 'M0,0 L200,0 L200,30 Q100,0 0,30 Z',
              }}
              transition={{ duration: 0.15 }}
              fill='white'
            />
            <motion.path
              initial={false}
              animate={{
                d: isBlinking
                  ? 'M0,50 L200,50 L200,100 L0,100 Z'
                  : 'M0,70 Q100,100 200,70 L200,100 L0,100 Z',
              }}
              transition={{ duration: 0.15 }}
              fill='white'
            />
            <motion.path
              initial={false}
              animate={{
                d: isBlinking ? 'M20,50 L180,50' : 'M20,30 Q100,0 180,30',
              }}
              transition={{ duration: 0.15 }}
              stroke='black'
              strokeWidth='3'
              fill='none'
            />
            <motion.path
              initial={false}
              animate={{
                d: isBlinking ? 'M20,50 L180,50' : 'M20,70 Q100,100 180,70',
              }}
              transition={{ duration: 0.15 }}
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
