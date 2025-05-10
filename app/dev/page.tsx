'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useMemo } from 'react';

import IntroSection from './components/IntroSection';
import BioSection from './components/BioSection';
import WordCloud from './components/WordCloud';
import ProjectTitle from './components/ProjectTitle';
import ProjectScreenshot from './components/ProjectScreenshot';
import ProjectDescription from './components/ProjectDescription';
import Section from './components/Section';
import DebugOverlay from './components/DebugOverlay';
import ProjectNavIndicator from './components/ProjectNavIndicator';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { useIsMobile } from '@/hooks/use-mobile';

import { projects } from './config/projects';
import { timing } from './config/timing';

type SectionType = {
  type: 'intro' | 'bio' | 'wordcloud' | 'title' | 'screenshot' | 'description';
  id: string;
  project?: (typeof projects)[0];
  projectIndex?: number;
  screenshot?: string;
  screenshotIndex?: number;
  cursor?: (typeof projects)[0]['cursors'][0];
};

export default function DevPage() {
  const scrollRef = useRef(null);
  const isMobile = useIsMobile();

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  // Track when we're at the end of all projects to show intro again and hide chevron
  // Now using the configurable timing values
  const endProgress = useTransform(
    scrollYProgress,
    [timing.intro.endFadeInStart, timing.intro.endFadeInEnd],
    [0, 1]
  );

  // Background transitions
  // At the beginning, show the gradient background
  // At the middle, show the grid background
  // At the end, show the gradient background again
  const backgroundOpacity = useTransform([scrollYProgress, endProgress], (values: number[]) => {
    const [progress, end] = values;
    // At the beginning (0-0.3)
    if (progress < timing.background.gradientFadeEnd) {
      return 1 - progress / timing.background.gradientFadeEnd;
    }
    // At the end (when endProgress > 0)
    if (end > 0) {
      return end;
    }
    // Middle
    return 0;
  });

  const gridBackgroundOpacity = useTransform([scrollYProgress, endProgress], (values: number[]) => {
    const [progress, end] = values;
    // At the beginning
    if (progress < timing.background.gridAppearStart) {
      return 0;
    }
    // Fade in
    if (progress < timing.background.gridAppearEnd) {
      return (
        (progress - timing.background.gridAppearStart) /
        (timing.background.gridAppearEnd - timing.background.gridAppearStart)
      );
    }
    // Fade out at the end
    if (end > 0) {
      return 1 - end;
    }
    // Middle - fully visible
    return 1;
  });

  // Calculate total sections
  const totalSections = useMemo(() => {
    // Start with the base sections: IntroSection, BioSection, WordCloud
    let total = 3;

    // For each project, add:
    // 1 section for title + 1 section per screenshot + 1 section for description
    projects.forEach((project) => {
      total += 1 + project.screenshots.length + 1;
    });

    return total;
  }, []);

  const totalHeight = `${totalSections * 100}vh`;

  // Create an array of all sections for easier mapping
  const sections = useMemo(() => {
    const sectionsArray: SectionType[] = [
      { type: 'intro', id: 'intro' },
      { type: 'bio', id: 'bio' },
      { type: 'wordcloud', id: 'wordcloud' },
    ];

    projects.forEach((project, projectIndex) => {
      // Add title section
      sectionsArray.push({
        type: 'title',
        project,
        projectIndex,
        id: `project-${projectIndex}-title`,
      });

      // Add screenshot sections
      project.screenshots.forEach((screenshot, screenshotIndex) => {
        sectionsArray.push({
          type: 'screenshot',
          project,
          projectIndex,
          screenshot,
          screenshotIndex,
          cursor: project.cursors[screenshotIndex] || project.cursors[0],
          id: `project-${projectIndex}-screenshot-${screenshotIndex}`,
        });
      });

      // Add description section
      sectionsArray.push({
        type: 'description',
        project,
        projectIndex,
        id: `project-${projectIndex}-description`,
      });
    });

    return sectionsArray;
  }, []);

  // Calculate section ranges with adjusted timing for Bio section
  const sectionRanges = useMemo(() => {
    const ranges = [];

    // Intro section
    ranges.push({
      start: 0,
      end: timing.intro.fadeOutEnd,
    });

    // Bio section (overlapping with intro and word cloud)
    ranges.push({
      start: timing.bio.fadeInStart,
      end: timing.bio.fadeOutEnd,
    });

    // Word cloud
    ranges.push({
      start: timing.wordCloud.fadeInStart,
      end: timing.wordCloud.fadeOutEnd,
    });

    // Project sections take up the remaining scroll after word cloud
    const projectSectionsCount = sections.length - 3;
    const projectSectionsStart = timing.projects.startAt;

    for (let i = 0; i < projectSectionsCount; i++) {
      const sectionStart =
        projectSectionsStart + (i / projectSectionsCount) * (1 - projectSectionsStart);
      const sectionEnd =
        projectSectionsStart + ((i + 1) / projectSectionsCount) * (1 - projectSectionsStart);
      ranges.push({ start: sectionStart, end: sectionEnd });
    }

    return ranges;
  }, [sections.length]);

  // Pre-calculate visibility and progress parameters
  const sectionParams = useMemo(() => {
    return sections.map((section, index) => {
      const { start, end } = sectionRanges[index];
      const fadeInStart = start;
      const fadeInEnd = start + (end - start) * 0.2;
      const fadeOutStart = end - (end - start) * 0.2;
      const fadeOutEnd = end;

      return {
        visibility: [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] as [
          number,
          number,
          number,
          number
        ],
        progress: [start, end] as [number, number],
      };
    });
  }, [sections, sectionRanges]);

  // Chevron visibility - visible throughout except at the very end
  // Using the same timing values as the end intro fade in
  const chevronOpacity = useTransform(
    scrollYProgress,
    [
      timing.intro.endFadeInStart,
      timing.intro.endFadeInStart + (timing.intro.endFadeInEnd - timing.intro.endFadeInStart) / 2,
    ],
    [1, 0]
  );

  return (
    <main ref={scrollRef} className='relative'>
      {/* Debug Overlay */}
      <DebugOverlay />

      {/* Project Nav Indicator */}
      <ProjectNavIndicator />

      {/* Fixed Backgrounds */}
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className='fixed inset-0 z-0 bg-gradient-to-b from-[#0c0018] to-[#18032d]'
      />
      <motion.div
        style={{
          opacity: gridBackgroundOpacity,
          backgroundImage: "url('/grid-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className='fixed inset-0 z-0'
      />

      {/* Floating Chevron - visible throughout except at the end */}
      <motion.div
        className='fixed bottom-0 left-0 right-0 z-50 flex justify-center'
        style={{ opacity: chevronOpacity }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className='pb-[5px]' // Position the point 5px from bottom
        >
          {/* Custom wider-angled chevron */}
          <svg
            width='24'
            height='14'
            viewBox='0 0 24 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2 2L12 12L22 2'
              stroke='white'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Intro section that appears at the end - using inline implementation instead of component */}
      <motion.div
        className='fixed inset-0 flex flex-col justify-center items-center pointer-events-auto'
        style={{
          opacity: endProgress,
          zIndex: useTransform(endProgress, [0, 1], [0, 30]), // lift to top when visible
        }}
      >
        <motion.div className='flex flex-col items-center px-4'>
          <a href='/'>
            <img
              src='/logo.png'
              alt='Meowtin Logo'
              className={`${isMobile ? 'w-[90vw]' : 'w-[50vw]'} max-w-[600px] mb-6`}
            />
          </a>
          <div className='flex justify-center gap-6 flex-wrap mb-10'>
            <a
              href='https://www.facebook.com/mistergoombaremix'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebookF className='w-12 h-12 text-gray-400 hover:text-white transition' />
            </a>
            <a
              href='https://www.instagram.com/mistergoomba'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram className='w-14 h-14 text-gray-400 hover:text-white transition' />
            </a>
            <a href='https://www.tiktok.com/@mrgoomba' target='_blank' rel='noopener noreferrer'>
              <FaTiktok className='w-12 h-12 text-gray-400 hover:text-white transition' />
            </a>
            <a
              href='https://www.youtube.com/@mistergoomba'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaYoutube className='w-14 h-14 text-gray-400 hover:text-white transition' />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scrollable Content - Linear sequence of all sections */}
      <div style={{ height: totalHeight }}>
        {sections.map((section, index) => {
          const params = sectionParams[index];
          const isIntroSection = section.type === 'intro';

          return (
            <Section
              key={section.id}
              scrollYProgress={scrollYProgress}
              visibilityParams={params.visibility}
              progressParams={params.progress}
              isIntroSection={isIntroSection}
            >
              {(progress) => {
                switch (section.type) {
                  case 'intro':
                    return <IntroSection />;
                  case 'bio':
                    return <BioSection />;
                  case 'wordcloud':
                    return <WordCloud />;
                  case 'title':
                    return section.project ? (
                      <ProjectTitle title={section.project.title} sectionProgress={progress} />
                    ) : null;
                  case 'screenshot':
                    return section.screenshot && section.cursor ? (
                      <ProjectScreenshot
                        screenshot={section.screenshot}
                        index={section.screenshotIndex ?? 0}
                        cursor={section.cursor}
                        sectionProgress={progress}
                      />
                    ) : null;
                  case 'description':
                    return section.project ? (
                      <ProjectDescription project={section.project} sectionProgress={progress} />
                    ) : null;
                  default:
                    return null;
                }
              }}
            </Section>
          );
        })}
      </div>
    </main>
  );
}
