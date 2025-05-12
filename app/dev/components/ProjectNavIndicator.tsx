'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo, useState, useEffect } from 'react';
import { projects } from '../config/projects';
import { timing } from '../config/timing';
import { useIsMobile } from '@/hooks/use-mobile';

export default function ProjectNavIndicator({
  projectScrollRanges,
}: {
  projectScrollRanges: { start: number; end: number }[];
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const isMobile = useIsMobile();

  // Timing boundaries (fully configurable for fade speed)
  const fadeInStart = timing.projectNav.fadeInStart;
  const fadeInEnd = timing.projectNav.fadeInEnd;
  const fadeOutStart = timing.projectNav.fadeOutStart;
  const fadeOutEnd = timing.projectNav.fadeOutEnd;

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );

  // Calculate the scroll percentage ranges for each project
  const projectRanges = projectScrollRanges;

  // Update active project index based on current scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      // If we're before the projects section, don't highlight any project
      if (value < timing.projects.startAt) {
        setActiveProjectIndex(-1);
        return;
      }

      // If we're at the very end, don't highlight any project
      if (value > fadeOutStart) {
        setActiveProjectIndex(-1);
        return;
      }

      // Find which project range we're currently in
      for (let i = 0; i < projectRanges.length; i++) {
        const { start, end } = projectRanges[i];
        if (value >= start && value < end) {
          setActiveProjectIndex(i);
          return;
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, projectRanges, fadeOutStart]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className='fixed top-4 left-0 right-0 z-30 flex flex-col items-center'
    >
      {/* Dots row */}
      <div className='flex gap-3 mb-2'>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className='w-3 h-3 rounded-full transition-colors duration-300'
            style={{
              backgroundColor: activeProjectIndex === index ? '#b38bfc' : '#555',
            }}
            title={project.navTitle || project.title.split('\n')[0]}
          />
        ))}
      </div>

      {/* Active project title */}
      {activeProjectIndex >= 0 && activeProjectIndex < projects.length && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          key={`title-${activeProjectIndex}`}
          className='text-white text-sm font-medium'
        >
          {projects[activeProjectIndex].navTitle ||
            projects[activeProjectIndex].title.split('\n')[0]}
        </motion.div>
      )}
    </motion.div>
  );
}
