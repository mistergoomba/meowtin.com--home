'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { wordPositions, mobileWordPositions } from '../config/wordPositions';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    y: 24,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 22,
      mass: 0.6,
    },
  },
};

// Slight randomization so the pop order feels organic but deterministic per mount
function shuffleStable<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  let seed = 1337; // deterministic seed
  const rand = () => {
    // xorshift-ish
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return Math.abs(seed) / 0x7fffffff;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WordCloud() {
  const isMobile = useIsMobile();
  const words = isMobile ? mobileWordPositions : wordPositions; // [{ text, x, y, z, size }]

  const ordered = useMemo(() => shuffleStable(words), [words]);

  const getColor = (size: number) => {
    switch (size) {
      case 2.5:
        return '#00ffaa';
      case 1.8:
        return '#00e69d';
      case 1.4:
        return '#00cc8a';
      default:
        return '#00b377';
    }
  };

  return (
    <section className='relative w-full h-screen overflow-hidden'>
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className='relative w-full h-full'>
          {ordered.map((word, idx) => {
            const fontSize = isMobile ? `${word.size * 0.7}rem` : `${word.size}rem`;
            const textShadow =
              word.size === 2.5
                ? '0 0 15px rgba(0, 255, 170, 0.8)'
                : '0 0 10px rgba(0, 255, 170, 0.5)';

            return (
              <motion.span
                key={`${word.text}-${idx}`}
                variants={item}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${word.x}px)`,
                  top: `calc(50% + ${word.y}px)`,
                  transform: 'translate(-50%, -50%)',
                  fontSize,
                  color: getColor(word.size),
                  textShadow,
                  fontWeight: word.size === 2.5 ? 'bold' : 'normal',
                  zIndex: Math.round(word.z) + 1000,
                  whiteSpace: 'nowrap',
                  willChange: 'transform, opacity, filter',
                  pointerEvents: 'none',
                }}
              >
                {word.text}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
