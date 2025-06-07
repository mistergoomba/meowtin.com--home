'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { timing } from '../config/timing';
import { useIsMobile } from '@/hooks/use-mobile';
import { Shadows_Into_Light } from 'next/font/google';

const shadowsIntoLight = Shadows_Into_Light({
  weight: '400',
  subsets: ['latin'],
});

export default function BioSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  // Track global scroll progress for entry animations
  const { scrollYProgress: globalProgress } = useScroll();

  // Calculate when this section should start appearing (sooner than before)
  const sectionVisibility = useTransform(
    globalProgress,
    [timing.bio.fadeInStart - 0.05, timing.bio.fadeInEnd - 0.05],
    [0, 1]
  );

  // Calculate when this section should disappear (before word cloud)
  const sectionOpacity = useTransform(
    globalProgress,
    [timing.bio.fadeOutStart, timing.bio.fadeOutEnd],
    [1, 0]
  );

  const sectionScale = useTransform(
    globalProgress,
    [timing.bio.fadeOutStart, timing.bio.fadeOutEnd],
    [1, 0.6]
  );

  // Entry animations with delays - adjusted for mobile
  const imageY = useTransform(
    sectionVisibility,
    [timing.bio.imageAnimStart, timing.bio.imageAnimEnd],
    [isMobile ? 150 : 300, 0]
  );

  const imageOpacity = useTransform(
    sectionVisibility,
    [timing.bio.imageAnimStart, timing.bio.imageAnimEnd],
    [0, 1]
  );

  const headingY = useTransform(
    sectionVisibility,
    [
      isMobile ? timing.bio.headingAnimStart : timing.bio.headingAnimStart,
      isMobile ? timing.bio.headingAnimStart + 0.05 : timing.bio.headingAnimEnd,
    ],
    [isMobile ? 150 : 300, 0]
  );

  const headingOpacity = useTransform(
    sectionVisibility,
    [
      isMobile ? timing.bio.headingAnimStart : timing.bio.headingAnimStart,
      isMobile ? timing.bio.headingAnimStart + 0.05 : timing.bio.headingAnimEnd,
    ],
    [0, 1]
  );

  const bioTextY = useTransform(
    sectionVisibility,
    [
      isMobile ? timing.bio.textAnimStart : timing.bio.textAnimStart,
      isMobile ? timing.bio.textAnimStart + 0.05 : timing.bio.textAnimEnd,
    ],
    [isMobile ? 150 : 300, 0]
  );

  const bioTextOpacity = useTransform(
    sectionVisibility,
    [
      isMobile ? timing.bio.textAnimStart : timing.bio.textAnimStart,
      isMobile ? timing.bio.textAnimStart + 0.05 : timing.bio.textAnimEnd,
    ],
    [0, 1]
  );

  return (
    <section ref={ref} className='h-screen w-full'>
      <motion.div
        style={{
          scale: sectionScale,
          opacity: sectionOpacity,
        }}
        className={`${
          isMobile ? 'relative' : 'fixed'
        } top-0 left-0 w-full h-screen flex items-center justify-center`}
      >
        <div
          className={`flex flex-col ${
            isMobile ? 'px-6' : 'md:flex-row'
          } items-start justify-center max-w-6xl mx-auto`}
        >
          <motion.img
            style={{
              y: imageY,
              opacity: imageOpacity,
            }}
            src='/me.png'
            alt='Meowtin'
            className={`w-60 md:w-72 h-auto object-cover rounded-2xl mb-6 md:mb-0 ${
              isMobile ? '' : 'md:mr-12'
            } shadow-xl mx-auto md:mx-0`}
          />
          <div className={`pt-0 ${isMobile ? 'text-center' : 'text-left'}`}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-4xl md:text-5xl mb-4 font-handwritten'
            >
              Martin Boynton - Creative Developer
            </motion.h1>
            <motion.p
              style={{
                y: bioTextY,
                opacity: bioTextOpacity,
              }}
              className='text-base md:text-xl text-gray-300 leading-relaxed max-w-2xl'
            >
              I'm Meowtin — a creative, experienced full-stack developer with over 25 years in the
              game, specializing in JavaScript, React, React Native, and Node.js. I build artistic,
              immersive, and technically sound websites and apps that stand out both visually and
              functionally. Whether you need a modern custom-designed site, a scalable backend, a
              mobile app, or someone to untangle your messy JavaScript repo — I'm your guy.
              <br />
              <br />
              Beyond the code, I'm a multidisciplinary creative with a passion for performance,
              music, and visual storytelling. I'm an internationally touring musician, karaoke host,
              emcee, DJ, music producer, video editor, and former music venue owner. I'm also a
              world traveler, yoga and meditation enthusiast, pro wrestling connoisseur, video game
              devotee, and all-around good guy.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
