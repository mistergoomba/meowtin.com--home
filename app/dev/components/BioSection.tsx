'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { timing } from '../config/timing';

export default function BioSection() {
  const ref = useRef(null);

  // Track global scroll progress for entry animations
  const { scrollYProgress: globalProgress } = useScroll();

  // Calculate when this section should start appearing (when intro is almost done)
  const sectionVisibility = useTransform(
    globalProgress,
    [timing.bio.fadeInStart, timing.bio.fadeInEnd],
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

  // Entry animations with delays
  const imageY = useTransform(
    sectionVisibility,
    [timing.bio.imageAnimStart, timing.bio.imageAnimEnd],
    [300, 0]
  );

  const imageOpacity = useTransform(
    sectionVisibility,
    [timing.bio.imageAnimStart, timing.bio.imageAnimEnd],
    [0, 1]
  );

  const headingY = useTransform(
    sectionVisibility,
    [timing.bio.headingAnimStart, timing.bio.headingAnimEnd],
    [300, 0]
  );

  const headingOpacity = useTransform(
    sectionVisibility,
    [timing.bio.headingAnimStart, timing.bio.headingAnimEnd],
    [0, 1]
  );

  const bioTextY = useTransform(
    sectionVisibility,
    [timing.bio.textAnimStart, timing.bio.textAnimEnd],
    [300, 0]
  );

  const bioTextOpacity = useTransform(
    sectionVisibility,
    [timing.bio.textAnimStart, timing.bio.textAnimEnd],
    [0, 1]
  );

  return (
    <section ref={ref} className='h-screen w-full'>
      <motion.div
        style={{
          scale: sectionScale,
          opacity: sectionOpacity,
        }}
        className='fixed top-0 left-0 w-full h-screen flex items-center justify-center'
      >
        <div className='flex flex-col md:flex-row items-start justify-center max-w-6xl mx-auto px-4'>
          <motion.img
            style={{
              y: imageY,
              opacity: imageOpacity,
            }}
            src='/me.png'
            alt='Meowtin'
            className='w-72 h-auto object-cover rounded-2xl mb-6 md:mb-0 md:mr-12 shadow-xl'
          />
          <div className='pt-0'>
            <motion.h1
              style={{
                y: headingY,
                opacity: headingOpacity,
              }}
              className='text-3xl md:text-[2.8rem] font-bold mb-6'
            >
              Welcome to Meowtin&#39;s Domain
            </motion.h1>
            <motion.p
              style={{
                y: bioTextY,
                opacity: bioTextOpacity,
              }}
              className='text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl'
            >
              I'm Martin—a creative, experienced full-stack developer with over 25 years in the game
              and a deep focus on JavaScript, React, React Native, and Node.js. I specialize in
              building artistic, immersive, and technically sound websites and apps that stand out
              visually and functionally. Whether you need a modern site with a custom design, a
              scalable backend, a mobile app, or just someone to step in and untangle your messy
              JavaScript repo I'm your guy.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
