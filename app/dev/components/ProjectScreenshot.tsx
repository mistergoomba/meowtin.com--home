'use client';

import { useRef } from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import Cursor from './Cursor';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  // Define cursor timing points
  const cursorAppearAt = 0.4;
  const cursorMoveUntil = 0.8;
  const cursorFadeOutAt = 0.9;

  // Screenshot animations - limit max scale on mobile
  const maxScale = isMobile ? 1.0 : 1.5;

  // Grow from 0.2 to maxScale in the first 40% of the section
  const screenshotScale = useTransform(
    sectionProgress,
    [0, cursorAppearAt, cursorFadeOutAt, 1],
    [0.2, maxScale, maxScale, 0.5]
  );

  // Screenshot opacity - full opacity until cursor fade out
  const screenshotOpacity = useTransform(
    sectionProgress,
    [0, cursorFadeOutAt, cursorFadeOutAt + 0.05],
    [1, 1, 0]
  );

  // Calculate dimensions to ensure screenshots don't exceed screen size
  const width = isMobile ? '90vw' : '500px';
  const height = isMobile ? 'auto' : '300px';
  const marginLeft = isMobile ? '-45vw' : '-250px';
  const marginTop = isMobile ? '-25vw' : '-150px';

  return (
    <div ref={ref} className='fixed top-0 left-0 w-full h-screen flex items-center justify-center'>
      {/* Screenshot with Growth Animation */}
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

      {/* Cursor - Using our new component */}
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
