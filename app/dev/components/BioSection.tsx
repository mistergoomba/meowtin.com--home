'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Shadows_Into_Light } from 'next/font/google';
import Image from 'next/image';

const shadowsIntoLight = Shadows_Into_Light({
  weight: '400',
  subsets: ['latin'],
});

const TITLE = 'Martin Boynton - Creative Developer';

// --- Variants ---
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.92, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.45, ease: 'easeOut' },
  }),
};

// Helper to split paragraph into display lines (simple sentence split)
function splitIntoLines(text: string) {
  return text
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s, i, arr) => (i < arr.length - 1 ? s + '.' : s));
}

export default function BioSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });
  const isMobile = useIsMobile();

  const bio = `I'm Meowtin — a creative, experienced full-stack developer with over 25 years in the game, specializing in JavaScript, React, React Native, and Node.js. I build artistic, immersive, and technically sound websites and apps that stand out both visually and functionally. Whether you need a modern custom-designed site, a scalable backend, a mobile app, or someone to untangle your messy JavaScript repo — I'm your guy.

Beyond the code, I'm a multidisciplinary creative with a passion for performance, music, and visual storytelling. I'm an internationally touring musician, karaoke host, emcee, DJ, music producer, video editor, and former music venue owner. I'm also a world traveler, yoga and meditation enthusiast, pro wrestling connoisseur, video game devotee, and all-around good guy.`;

  const lines = useMemo(() => splitIntoLines(bio), [bio]);

  // Compute ch width for typing effect (fallback to length)
  const chWidth = useMemo(() => `${Math.max(8, TITLE.length) + 10}ch`, []);

  return (
    <section className='min-h-screen w-full flex flex-col justify-center items-center pointer-events-auto'>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'show' : 'hidden'}
        className={`flex flex-col ${
          isMobile ? 'px-6' : 'md:flex-row'
        } items-start justify-center max-w-6xl mx-auto`}
      >
        {/* Avatar / Image pop-in */}
        <motion.div variants={imageVariants} className='mx-auto md:mx-0'>
          <Image
            src='/me.png'
            alt='Meowtin'
            width={288}
            height={288}
            className={`w-60 md:w-72 h-auto object-cover rounded-2xl mb-6 md:mb-0 ${
              isMobile ? '' : 'md:mr-12'
            } shadow-xl`}
            priority={false}
          />
        </motion.div>

        {/* Text block */}
        <div className={`pt-0 ${isMobile ? 'text-center' : 'text-left'}`}>
          {/* Typing title */}
          <motion.h1
            className={`text-4xl md:text-5xl mb-4 ${shadowsIntoLight.className} font-handwritten relative inline-block overflow-hidden whitespace-nowrap align-bottom`}
            style={{
              width: isInView ? chWidth : '0ch',
            }}
            animate={{ width: isInView ? chWidth : '0ch' }}
            transition={{ delay: 0.35, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {TITLE}
          </motion.h1>

          {/* Bio lines in a wave */}
          <div
            className={`${
              isMobile ? 'mx-auto' : ''
            } max-w-2xl text-gray-300 text-base md:text-xl leading-relaxed`}
          >
            {lines.map((line, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={lineVariants}
                className='mb-3'
                initial='hidden'
                animate={isInView ? 'show' : 'hidden'}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
