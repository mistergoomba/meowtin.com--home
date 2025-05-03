// components/AnimatedSection.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial='hidden'
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 250 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } },
      }}
      className='w-full'
    >
      {children}
    </motion.section>
  );
}
