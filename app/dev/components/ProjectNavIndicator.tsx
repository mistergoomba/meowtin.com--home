'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo, useState, useEffect } from 'react';
import { projects } from '../config/projects';
import { timing } from '../config/timing';

export default function ProjectNavIndicator() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

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

  // Calculate section structure for determining active project
  const totalSections = useMemo(() => {
    let total = 3; // intro, bio, wordcloud
    projects.forEach((p) => {
      total += 1 + p.screenshots.length + 1; // title + screenshots + description
    });
    return total;
  }, []);

  // Calculate the scroll percentage ranges for each project
  const projectRanges = useMemo(() => {
    const ranges = [];
    const startPosition = timing.projects.startAt;
    const remainingScrollSpace = 1 - startPosition;

    // Calculate how much scroll space each project should take
    const projectScrollSpace = remainingScrollSpace / projects.length;

    for (let i = 0; i < projects.length; i++) {
      const projectStart = startPosition + i * projectScrollSpace;
      const projectEnd = startPosition + (i + 1) * projectScrollSpace;
      ranges.push({ start: projectStart, end: projectEnd });
    }

    return ranges;
  }, []);

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
      className='fixed top-1/2 left-4 -translate-y-1/2 z-30 flex flex-col gap-4'
    >
      {projects.map((project, index) => (
        <motion.div key={index} className='flex items-center gap-2'>
          <motion.div
            className='w-3 h-3 rounded-full transition-colors duration-300'
            style={{
              backgroundColor: activeProjectIndex === index ? '#b38bfc' : '#555',
            }}
          />
          <motion.span
            className='text-sm transition-colors duration-300'
            style={{
              color: activeProjectIndex === index ? '#fff' : '#aaa',
            }}
          >
            {project.navTitle || project.title.split('\n')[0]}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
}
