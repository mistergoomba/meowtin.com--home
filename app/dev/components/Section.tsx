import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';

import { timing } from '../config/timing';

type SectionProps = {
  children: ReactNode | ((progress: MotionValue<number>) => ReactNode);
  scrollYProgress: MotionValue<number>;
  visibilityParams: [number, number, number, number];
  progressParams: [number, number];
  isIntroSection?: boolean;
  isOutroSection?: boolean;
};

export default function Section({
  children,
  scrollYProgress,
  visibilityParams,
  progressParams,
  isIntroSection = false,
  isOutroSection = false,
}: SectionProps) {
  const introOpacity = useTransform(
    scrollYProgress,
    [timing.intro.fadeInStart / 8, timing.intro.fadeOutEnd / 8],
    [1, 0]
  );

  const outroOpacity = useTransform(
    scrollYProgress,
    [timing.intro.endFadeInStart, timing.intro.endFadeInEnd],
    [0, 1]
  );
  const outroZIndex = useTransform(
    scrollYProgress,
    [timing.intro.endFadeInStart, timing.intro.endFadeInEnd],
    [0, 20]
  );

  const sectionOpacity = useTransform(scrollYProgress, visibilityParams, [0, 1, 1, 0]);

  const progress = useTransform(scrollYProgress, progressParams, [0, 1], { clamp: true });

  const opacity = isIntroSection ? introOpacity : isOutroSection ? outroOpacity : sectionOpacity;

  const zIndex = isIntroSection
    ? useTransform(
        scrollYProgress,
        [timing.intro.fadeInStart / 8, timing.intro.fadeOutEnd / 8],
        [10, 0]
      )
    : isOutroSection
    ? outroZIndex
    : useTransform(progress, [0, 0.5, 1], [0, 10, 0]);

  return (
    <motion.div style={{ opacity, zIndex }} className='h-screen relative pointer-events-auto'>
      {typeof children === 'function' ? children(progress) : children}
    </motion.div>
  );
}
