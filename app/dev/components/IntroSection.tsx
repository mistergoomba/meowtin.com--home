'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timing } from '../config/timing';
import { Code, Smartphone, Server, Database, Gamepad2 } from 'lucide-react';
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
          <div className='grid grid-cols-5 gap-6'>
            <div className='flex flex-col items-center justify-center'>
              <Code className='w-12 h-12 text-[#b38bfc] mb-2' />
              <span className='text-white text-sm'>React</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <Smartphone className='w-12 h-12 text-[#b38bfc] mb-2' />
              <span className='text-white text-sm'>React Native</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <Server className='w-12 h-12 text-[#b38bfc] mb-2' />
              <span className='text-white text-sm'>Node.js</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <Database className='w-12 h-12 text-[#b38bfc] mb-2' />
              <span className='text-white text-sm'>Full Stack</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <Gamepad2 className='w-12 h-12 text-[#b38bfc] mb-2' />
              <span className='text-white text-sm'>Game Dev</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
