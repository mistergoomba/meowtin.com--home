'use client';

import { useRef } from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import { timing } from '../config/timing';

type ProjectTitleProps = {
  title: string;
  sectionProgress: MotionValue<number>;
};

export default function ProjectTitle({ title, sectionProgress }: ProjectTitleProps) {
  const ref = useRef(null);

  // Title animations
  // Fade in during the first part of the animation
  const titleOpacity = useTransform(
    sectionProgress,
    [
      timing.projects.title.fillStart, // Start fading in
      timing.projects.title.fillEnd * 0.5, // Fully visible
      timing.projects.title.unfillStart, // Start fading out
      timing.projects.title.unfillEnd, // Completely gone
    ],
    [0, 1, 1, 0]
  );

  // Scale from small to normal, then grow larger when fading out
  const titleScale = useTransform(
    sectionProgress,
    [
      timing.projects.title.fillStart, // Start small
      timing.projects.title.fillEnd * 0.5, // Normal size
      timing.projects.title.unfillStart, // Start growing
      timing.projects.title.unfillEnd, // End size (larger)
    ],
    [0.5, 1, 1, 1.5]
  );

  return (
    <div ref={ref} className='fixed inset-0 flex items-center justify-center'>
      <motion.div
        className='w-full max-w-4xl px-4'
        style={{
          opacity: titleOpacity,
          scale: titleScale,
        }}
      >
        {/* Simple title with consistent styling */}
        <h1 className='text-6xl font-bold text-center text-white whitespace-pre-line'>{title}</h1>
      </motion.div>
    </div>
  );
}
