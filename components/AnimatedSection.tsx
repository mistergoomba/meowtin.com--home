'use client';

import type React from 'react';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, memo } from 'react';

// Memoize the component to prevent unnecessary re-renders
const AnimatedSection = memo(function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Lower threshold for earlier triggering
    rootMargin: '50px', // Start animation slightly before element comes into view
  });

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
        hidden: { opacity: 0, y: 100 }, // Reduced y distance for smoother animation
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6, // Slightly faster animation
            delay,
            ease: [0.25, 0.1, 0.25, 1], // Custom easing function for smoother motion
          },
        },
      }}
      className='w-full'
    >
      {children}
    </motion.section>
  );
});

export default AnimatedSection;
