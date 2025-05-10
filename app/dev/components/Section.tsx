'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode | ((progress: MotionValue<number>) => ReactNode);
  scrollYProgress: MotionValue<number>;
  visibilityParams: [number, number, number, number];
  progressParams: [number, number];
  isIntroSection?: boolean;
};

export default function Section({
  children,
  scrollYProgress,
  visibilityParams,
  progressParams,
  isIntroSection = false,
}: SectionProps) {
  // Create transform values for this specific section
  // For the intro section, start with opacity 1
  const introOpacity = useTransform(
    scrollYProgress,
    [0, visibilityParams[2], visibilityParams[3]],
    [1, 1, 0]
  );
  const sectionOpacity = useTransform(scrollYProgress, visibilityParams, [0, 1, 1, 0]);

  const opacity = isIntroSection ? introOpacity : sectionOpacity;

  const progress = useTransform(scrollYProgress, progressParams, [0, 1], { clamp: true });

  return (
    <motion.div style={{ opacity }} className='h-screen relative'>
      {typeof children === 'function' ? children(progress) : children}
    </motion.div>
  );
}
