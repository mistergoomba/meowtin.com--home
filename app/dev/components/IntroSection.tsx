'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timing } from '../config/timing';
import { Code, Smartphone, Server, Database, Gamepad2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ICONS = [
  { Icon: Code, label: 'React' },
  { Icon: Smartphone, label: 'React Native' },
  { Icon: Server, label: 'Node.js' },
  { Icon: Database, label: 'Full Stack' },
  { Icon: Gamepad2, label: 'Game Dev' },
];

export default function IntroSection() {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [timing.intro.fadeInStart, timing.intro.fadeOutEnd],
    [1, 0.6]
  );

  return (
    <section ref={ref} className='h-screen w-full'>
      <div className='fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center pointer-events-auto'>
        <motion.div
          style={{ scale }}
          className='flex flex-col items-center w-full px-4'
          initial={{ scale: 1 }}
        >
          <a href='/'>
            <img
              src='/logo.png'
              alt='Meowtin Logo'
              className={`${isMobile ? 'w-[90vw]' : 'w-[50vw]'} max-w-[600px] mb-6`}
            />
          </a>

          {isMobile ? (
            <>
              <div className='w-full max-w-[300px]'>
                <div className='grid grid-cols-2 gap-6 mb-6'>
                  {ICONS.slice(0, 4).map(({ Icon, label }) => (
                    <div key={label} className='flex flex-col items-center justify-center'>
                      <Icon className='w-12 h-12 text-[#b38bfc] mb-2' />
                      <span className='text-white text-sm'>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                  <Gamepad2 className='w-12 h-12 text-[#b38bfc] mb-2' />
                  <span className='text-white text-sm'>Game Dev</span>
                </div>
              </div>
            </>
          ) : (
            <div className='grid grid-cols-5 gap-6'>
              {ICONS.map(({ Icon, label }) => (
                <div key={label} className='flex flex-col items-center justify-center'>
                  <Icon className='w-12 h-12 text-[#b38bfc] mb-2' />
                  <span className='text-white text-sm'>{label}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
