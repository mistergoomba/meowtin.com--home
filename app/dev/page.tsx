// FILE UPDATED: Scroll timing recalibrated for longer project titles & screenshots

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
import { useIsMobile } from '@/hooks/use-mobile';

import SocialIcons from '@/components/SocialIcons';
import { projects } from './config/projects';
import { timing } from './config/timing';

type SectionType = {
  type: 'intro' | 'bio' | 'wordcloud' | 'title' | 'screenshot' | 'description' | 'intro-end';
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
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });

  const endProgress = useTransform(
    scrollYProgress,
    [timing.intro.endFadeInStart, timing.intro.endFadeInEnd],
    [0, 1]
  );

  const backgroundOpacity = useTransform([scrollYProgress, endProgress], (values) => {
    const [progress, end] = values as [number, number];
    if (progress < timing.background.gradientFadeEnd)
      return 1 - progress / timing.background.gradientFadeEnd;
    if (end > 0) return end;
    return 0;
  });

  const gridBackgroundOpacity = useTransform([scrollYProgress, endProgress], (values) => {
    const [progress, end] = values as [number, number];
    if (progress < timing.background.gridAppearStart) return 0;
    if (progress < timing.background.gridAppearEnd) {
      return (
        (progress - timing.background.gridAppearStart) /
        (timing.background.gridAppearEnd - timing.background.gridAppearStart)
      );
    }
    if (end > 0) return 1 - end;
    return 1;
  });

  const sections = useMemo(() => {
    const sectionsArray: SectionType[] = [
      { type: 'intro', id: 'intro' },
      { type: 'bio', id: 'bio' },
      { type: 'wordcloud', id: 'wordcloud' },
    ];

    projects.forEach((project, projectIndex) => {
      sectionsArray.push({
        type: 'title',
        project,
        projectIndex,
        id: `project-${projectIndex}-title`,
      });
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
      sectionsArray.push({
        type: 'description',
        project,
        projectIndex,
        id: `project-${projectIndex}-description`,
      });
    });

    sectionsArray.push({ type: 'intro-end', id: 'intro-end' });
    return sectionsArray;
  }, []);

  const totalHeight = `${sections.length * 100}vh`;

  const sectionRanges = useMemo(() => {
    const ranges = [
      { start: 0, end: timing.intro.fadeOutEnd },
      { start: timing.bio.fadeInStart, end: timing.bio.fadeOutEnd },
      { start: timing.wordCloud.fadeInStart, end: timing.wordCloud.fadeOutEnd },
    ];

    const start = timing.projects.startAt;
    const end = 1.0;
    const weights = projects.map((p) => 1.5 + 1.5 * p.screenshots.length + 1.2);
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    let acc = start;
    projects.forEach((project, index) => {
      const weight = weights[index];
      const span = (weight / totalWeight) * (end - start);
      const partCount = 1 + project.screenshots.length + 1;
      const partSpan = span / partCount;

      ranges.push({ start: acc, end: acc + partSpan });
      acc += partSpan;
      project.screenshots.forEach(() => {
        ranges.push({ start: acc, end: acc + partSpan });
        acc += partSpan;
      });
      ranges.push({ start: acc, end: acc + partSpan });
      acc += partSpan;
    });

    ranges.push({ start: timing.intro.endFadeInStart, end: timing.intro.endFadeInEnd });
    return ranges;
  }, [sections.length]);

  const projectScrollRanges = useMemo(() => {
    const ranges: { start: number; end: number }[] = [];
    let index = 3;
    projects.forEach((p) => {
      const count = 1 + p.screenshots.length + 1;
      ranges.push({ start: sectionRanges[index].start, end: sectionRanges[index + count - 1].end });
      index += count;
    });
    return ranges;
  }, [sectionRanges]);

  const sectionParams = useMemo(() => {
    return sections.map((_, index) => {
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

  const chevronOpacity = useTransform(
    scrollYProgress,
    [
      timing.intro.endFadeInStart,
      timing.intro.endFadeInStart + 0.5 * (timing.intro.endFadeInEnd - timing.intro.endFadeInStart),
    ],
    [1, 0]
  );

  return (
    <main ref={scrollRef} className='relative'>
      <DebugOverlay />
      <ProjectNavIndicator projectScrollRanges={projectScrollRanges} />
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
      <motion.div
        className='fixed bottom-0 left-0 right-0 z-50 flex justify-center'
        style={{ opacity: chevronOpacity }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4], y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='pb-[5px]'
        >
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
                  case 'intro-end':
                    return (
                      <motion.div className='flex flex-col items-center px-4'>
                        <a href='/'>
                          <img
                            src='/logo.png'
                            alt='Meowtin Logo'
                            className={`${isMobile ? 'w-[90vw]' : 'w-[50vw]'} max-w-[600px] mb-6`}
                          />
                        </a>
                        <SocialIcons
                          size='big'
                          className='flex justify-center gap-6 flex-wrap mb-10'
                        />
                      </motion.div>
                    );
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
