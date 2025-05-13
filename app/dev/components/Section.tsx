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
  const introOpacity = useTransform(
    scrollYProgress,
    [0, visibilityParams[2], visibilityParams[3]],
    [1, 1, 0]
  );
  const sectionOpacity = useTransform(scrollYProgress, visibilityParams, [0, 1, 1, 0]);
  const opacity = isIntroSection ? introOpacity : sectionOpacity;

  const progress = useTransform(scrollYProgress, progressParams, [0, 1], { clamp: true });

  // Boost z-index for the intro section to ensure interactivity
  const zIndex = useTransform(progress, [0, 0.5, 1], [0, 10, 0]);

  return (
    <motion.div style={{ opacity, zIndex }} className='h-screen relative pointer-events-auto'>
      {typeof children === 'function' ? children(progress) : children}
    </motion.div>
  );
}
