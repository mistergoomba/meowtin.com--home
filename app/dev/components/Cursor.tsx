'use client';

import { motion, type MotionValue, useTransform } from 'framer-motion';

type CursorProps = {
  sectionProgress: MotionValue<number>;
  cursor: {
    start: { x: string; y: string };
    mid: { x: string; y: string };
    end: { x: string; y: string };
  };
  appearAt: number;
  moveUntil: number;
  fadeOutAt: number;
};

export default function Cursor({
  sectionProgress,
  cursor,
  appearAt,
  moveUntil,
  fadeOutAt,
}: CursorProps) {
  // Cursor position - Moves in an arc using project-specific coordinates
  const cursorX = useTransform(
    sectionProgress,
    [appearAt, (appearAt + moveUntil) / 2, moveUntil],
    [cursor.start.x, cursor.mid.x, cursor.end.x]
  );

  const cursorY = useTransform(
    sectionProgress,
    [appearAt, (appearAt + moveUntil) / 2, moveUntil],
    [cursor.start.y, cursor.mid.y, cursor.end.y]
  );

  // Cursor opacity - SIMPLIFIED to ensure it stays visible
  const cursorOpacity = useTransform(
    sectionProgress,
    [
      appearAt, // Start appearing
      appearAt + 0.02, // Fully visible
      fadeOutAt, // Stay fully visible until this point
      fadeOutAt + 0.02, // Fade out completely
    ],
    [0, 1, 1, 0]
  );

  // Cursor display - Only show when opacity > 0
  const cursorDisplay = useTransform(sectionProgress, (progress) => {
    return progress >= appearAt && progress < fadeOutAt + 0.02 ? 'block' : 'none';
  });

  return (
    <motion.div
      style={{
        display: cursorDisplay,
        opacity: 0, // hide temporarily cursorOpacity,
        position: 'absolute',
        left: '50%',
        top: '50%',
        x: cursorX,
        y: cursorY,
        zIndex: 100,
      }}
      className='pointer-events-none'
    >
      <img src='/hand-cursor.png' alt='Hand cursor' width='32' height='32' />
    </motion.div>
  );
}
