'use client';

import { useRef } from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import Cursor from './Cursor';
import { useScreenCategory } from '@/hooks/useScreenCategory'; // <- new import

type ProjectScreenshotProps = {
  screenshot: string;
  index: number;
  cursor: {
    start: { x: string; y: string };
    mid: { x: string; y: string };
    end: { x: string; y: string };
  };
  sectionProgress: MotionValue<number>;
};

export default function ProjectScreenshot({
  screenshot,
  index,
  cursor,
  sectionProgress,
}: ProjectScreenshotProps) {
  const ref = useRef(null);
  const screenCategory = useScreenCategory();

  // Define cursor timing points
  const cursorAppearAt = 0.4;
  const cursorMoveUntil = 0.8;
  const cursorFadeOutAt = 0.9;

  // Tailwind-style screen breakpoints for scaling
  const maxScale = {
    xs: 1.0,
    sm: 1.1,
    md: 1.3,
    lg: 1.6,
    xl: 1.8,
    '2xl': 2.0,
  }[screenCategory];

  // Grow from 0.2 to maxScale in the first 40% of the section
  const screenshotScale = useTransform(
    sectionProgress,
    [0, cursorAppearAt, cursorFadeOutAt, 1],
    [0.2, maxScale, maxScale, 0.5]
  );

  const screenshotOpacity = useTransform(
    sectionProgress,
    [0, cursorFadeOutAt, cursorFadeOutAt + 0.05],
    [1, 1, 0]
  );

  const isSmallScreen = screenCategory === 'xs' || screenCategory === 'sm';
  const width = isSmallScreen ? '90vw' : '500px';
  const height = isSmallScreen ? 'auto' : '300px';
  const marginLeft = isSmallScreen ? '-45vw' : '-250px';
  const marginTop = isSmallScreen ? '-25vw' : '-150px';

  return (
    <div ref={ref} className='fixed top-0 left-0 w-full h-screen flex items-center justify-center'>
      <motion.div
        style={{
          scale: screenshotScale,
          opacity: screenshotOpacity,
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft,
          marginTop,
          width,
          height,
          maxWidth: '90vw',
          maxHeight: '70vh',
        }}
      >
        <img
          src={screenshot || '/placeholder.svg'}
          alt={`Screenshot ${index + 1}`}
          className='w-full h-full object-contain'
        />
      </motion.div>

      <Cursor
        sectionProgress={sectionProgress}
        cursor={cursor}
        appearAt={cursorAppearAt}
        moveUntil={cursorMoveUntil}
        fadeOutAt={cursorFadeOutAt}
      />
    </div>
  );
}
