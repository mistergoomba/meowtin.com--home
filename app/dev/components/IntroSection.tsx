'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { timing } from '../config/timing';

export default function IntroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Use transform to scale and fade but keep position fixed
  const scale = useTransform(
    scrollYProgress,
    [timing.intro.fadeInStart, timing.intro.fadeOutEnd],
    [1, 0.6]
  );

  const opacity = useTransform(
    scrollYProgress,
    [timing.intro.fadeInStart, timing.intro.fadeOutEnd],
    [1, 0]
  );

  return (
    <section ref={ref} className='h-screen w-full'>
      <div className='fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center z-10'>
        <motion.div
          style={{ scale, opacity }}
          className='flex flex-col items-center'
          initial={{ opacity: 1, scale: 1 }} // Ensure it's visible on initial render
        >
          <a href='/'>
            <img src='/logo.png' alt='Meowtin Logo' className='w-[50vw] max-w-[600px] mb-6' />
          </a>
          <div className='flex justify-center gap-6 flex-wrap mb-10'>
            <a
              href='https://www.facebook.com/mistergoombaremix'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebookF className='w-12 h-12 text-gray-400 hover:text-white transition' />
            </a>
            <a
              href='https://www.instagram.com/mistergoomba'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram className='w-14 h-14 text-gray-400 hover:text-white transition' />
            </a>
            <a href='https://www.tiktok.com/@mrgoomba' target='_blank' rel='noopener noreferrer'>
              <FaTiktok className='w-12 h-12 text-gray-400 hover:text-white transition' />
            </a>
            <a
              href='https://www.youtube.com/@mistergoomba'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaYoutube className='w-14 h-14 text-gray-400 hover:text-white transition' />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
