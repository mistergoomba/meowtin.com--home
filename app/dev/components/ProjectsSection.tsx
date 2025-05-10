'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type ProjectsSectionProps = {
  project: {
    title: string;
    description: string;
    technologies: string[];
    screenshots: string[];
    cursors: {
      start: { x: string; y: string };
      mid: { x: string; y: string };
      end: { x: string; y: string };
    }[];
  };
};

export default function ProjectsSection({ project }: ProjectsSectionProps) {
  const ref = useRef(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Track global scroll progress
  const { scrollYProgress: globalProgress } = useScroll();

  // Section visibility based on global scroll
  const sectionVisibility = useTransform(globalProgress, [0.7, 0.75], [0, 1]);

  // Section exit based on global scroll
  const sectionExit = useTransform(globalProgress, [0.95, 1], [1, 0]);

  // Combined section opacity
  const sectionOpacity = useTransform(
    [sectionVisibility, sectionExit],
    ([visibility, exit]) => (visibility as number) * (exit as number)
  );

  // Title animations
  // Fill animation (0-10% of scroll)
  const titleFillProgress = useTransform(scrollYProgress, [0, 0.1], [0, 100]);

  // Un-fill animation (15-25% of scroll)
  const titleUnfillProgress = useTransform(scrollYProgress, [0.15, 0.25], [0, 100]);

  // Title visibility (show/hide without changing opacity)
  const titleDisplay = useTransform(scrollYProgress, (progress) => {
    return progress > 0.25 ? 'none' : 'block';
  });

  // CURSOR APPEARANCE POINTS - EXPLICITLY DEFINED
  const cursor1Start = 0.31;
  const cursor1End = 0.38;
  const cursor1FadeOut = 0.4; // Increased to ensure cursor stays visible longer

  const cursor2Start = 0.46;
  const cursor2End = 0.53;
  const cursor2FadeOut = 0.55; // Increased to ensure cursor stays visible longer

  const cursor3Start = 0.61;
  const cursor3End = 0.68;
  const cursor3FadeOut = 0.7; // Increased to ensure cursor stays visible longer

  // Screenshot 1 animations
  const screenshot1Scale = useTransform(
    scrollYProgress,
    [
      0.25, // Start growing
      cursor1Start - 0.01, // Just before cursor appears
      cursor1Start, // Cursor appears - STOP growing
      cursor1FadeOut, // Hold until this point
      cursor1FadeOut + 0.02, // Complete shrink/fade
    ],
    [
      0.2, // Start size
      1.5, // Size just before cursor appears
      1.5, // FIXED SIZE during cursor animation
      1.5, // Same size when cursor ends
      0.5, // Shrink at the end
    ]
  );

  // Screenshot 1 opacity - full opacity until cursor fade out
  const screenshot1Opacity = useTransform(
    scrollYProgress,
    [
      0.25, // Start
      cursor1FadeOut, // Hold until this point
      cursor1FadeOut + 0.02, // Complete fade
    ],
    [
      1, // Full opacity
      1, // Still full opacity until fade out
      0, // Fade out
    ]
  );

  // Screenshot 1 visibility
  const screenshot1Display = useTransform(scrollYProgress, (progress) =>
    progress >= 0.25 && progress < cursor1FadeOut + 0.02 ? 'block' : 'none'
  );

  // Screenshot 2 animations
  const screenshot2Scale = useTransform(
    scrollYProgress,
    [
      0.4, // Start growing
      cursor2Start - 0.01, // Just before cursor appears
      cursor2Start, // Cursor appears - STOP growing
      cursor2FadeOut, // Hold until this point
      cursor2FadeOut + 0.02, // Complete shrink/fade
    ],
    [
      0.2, // Start size
      1.5, // Size just before cursor appears
      1.5, // FIXED SIZE during cursor animation
      1.5, // Same size when cursor ends
      0.5, // Shrink at the end
    ]
  );

  // Screenshot 2 opacity - full opacity until cursor fade out
  const screenshot2Opacity = useTransform(
    scrollYProgress,
    [
      0.4, // Start
      cursor2FadeOut, // Hold until this point
      cursor2FadeOut + 0.02, // Complete fade
    ],
    [
      1, // Full opacity
      1, // Still full opacity until fade out
      0, // Fade out
    ]
  );

  // Screenshot 2 visibility
  const screenshot2Display = useTransform(scrollYProgress, (progress) =>
    progress >= 0.4 && progress < cursor2FadeOut + 0.02 ? 'block' : 'none'
  );

  // Screenshot 3 animations
  const screenshot3Scale = useTransform(
    scrollYProgress,
    [
      0.55, // Start growing
      cursor3Start - 0.01, // Just before cursor appears
      cursor3Start, // Cursor appears - STOP growing
      cursor3FadeOut, // Hold until this point
      cursor3FadeOut + 0.02, // Complete shrink/fade
    ],
    [
      0.2, // Start size
      1.5, // Size just before cursor appears
      1.5, // FIXED SIZE during cursor animation
      1.5, // Same size when cursor ends
      0.5, // Shrink at the end
    ]
  );

  // Screenshot 3 opacity - full opacity until cursor fade out
  const screenshot3Opacity = useTransform(
    scrollYProgress,
    [
      0.55, // Start
      cursor3FadeOut, // Hold until this point
      cursor3FadeOut + 0.02, // Complete fade
    ],
    [
      1, // Full opacity
      1, // Still full opacity until fade out
      0, // Fade out
    ]
  );

  // Screenshot 3 visibility
  const screenshot3Display = useTransform(scrollYProgress, (progress) =>
    progress >= 0.55 && progress < cursor3FadeOut + 0.02 ? 'block' : 'none'
  );

  // CURSOR ANIMATIONS - Now using project-specific coordinates
  // Cursor 1 - Appears when screenshot 1 reaches a certain size
  const cursor1Display = useTransform(scrollYProgress, (progress) =>
    progress >= cursor1Start && progress < cursor1FadeOut + 0.02 ? 'block' : 'none'
  );

  // Cursor 1 position - Moves in an arc using project-specific coordinates
  const cursor1X = useTransform(
    scrollYProgress,
    [cursor1Start, (cursor1Start + cursor1End) / 2, cursor1End],
    [project.cursors[0].start.x, project.cursors[0].mid.x, project.cursors[0].end.x]
  );
  const cursor1Y = useTransform(
    scrollYProgress,
    [cursor1Start, (cursor1Start + cursor1End) / 2, cursor1End],
    [project.cursors[0].start.y, project.cursors[0].mid.y, project.cursors[0].end.y]
  );

  // Cursor 1 opacity - SIMPLIFIED to ensure it stays visible
  const cursor1Opacity = useTransform(
    scrollYProgress,
    [
      cursor1Start, // Start appearing
      cursor1Start + 0.02, // Fully visible
      cursor1FadeOut, // Stay fully visible until this point
      cursor1FadeOut + 0.02, // Fade out completely
    ],
    [0, 1, 1, 0]
  );

  // Cursor 2 - Appears when screenshot 2 reaches a certain size
  const cursor2Display = useTransform(scrollYProgress, (progress) =>
    progress >= cursor2Start && progress < cursor2FadeOut + 0.02 ? 'block' : 'none'
  );

  // Cursor 2 position - Using project-specific coordinates
  const cursor2X = useTransform(
    scrollYProgress,
    [cursor2Start, (cursor2Start + cursor2End) / 2, cursor2End],
    project.cursors.length > 1
      ? [project.cursors[1].start.x, project.cursors[1].mid.x, project.cursors[1].end.x]
      : ['0px', '0px', '0px']
  );
  const cursor2Y = useTransform(
    scrollYProgress,
    [cursor2Start, (cursor2Start + cursor2End) / 2, cursor2End],
    project.cursors.length > 1
      ? [project.cursors[1].start.y, project.cursors[1].mid.y, project.cursors[1].end.y]
      : ['0px', '0px', '0px']
  );

  // Cursor 2 opacity - SIMPLIFIED to ensure it stays visible
  const cursor2Opacity = useTransform(
    scrollYProgress,
    [
      cursor2Start, // Start appearing
      cursor2Start + 0.02, // Fully visible
      cursor2FadeOut, // Stay fully visible until this point
      cursor2FadeOut + 0.02, // Fade out completely
    ],
    [0, 1, 1, 0]
  );

  // Cursor 3 - Appears when screenshot 3 reaches a certain size
  const cursor3Display = useTransform(scrollYProgress, (progress) =>
    progress >= cursor3Start && progress < cursor3FadeOut + 0.02 ? 'block' : 'none'
  );

  // Cursor 3 position - Using project-specific coordinates
  const cursor3X = useTransform(
    scrollYProgress,
    [cursor3Start, (cursor3Start + cursor3End) / 2, cursor3End],
    project.cursors.length > 2
      ? [project.cursors[2].start.x, project.cursors[2].mid.x, project.cursors[2].end.x]
      : ['0px', '0px', '0px']
  );
  const cursor3Y = useTransform(
    scrollYProgress,
    [cursor3Start, (cursor3Start + cursor3End) / 2, cursor3End],
    project.cursors.length > 2
      ? [project.cursors[2].start.y, project.cursors[2].mid.y, project.cursors[2].end.y]
      : ['0px', '0px', '0px']
  );

  // Cursor 3 opacity - SIMPLIFIED to ensure it stays visible
  const cursor3Opacity = useTransform(
    scrollYProgress,
    [
      cursor3Start, // Start appearing
      cursor3Start + 0.02, // Fully visible
      cursor3FadeOut, // Stay fully visible until this point
      cursor3FadeOut + 0.02, // Fade out completely
    ],
    [0, 1, 1, 0]
  );

  // Description and technologies animations - now appear together
  const contentDisplay = useTransform(scrollYProgress, (progress) =>
    progress >= 0.7 ? 'flex' : 'none'
  );
  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.75], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.7, 0.75], [50, 0]);

  return (
    <section ref={ref} className='h-screen w-full'>
      <motion.div
        style={{
          opacity: sectionOpacity,
        }}
        className='fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center'
      >
        {/* Project Title with Fill Effect */}
        <motion.div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl'
          style={{ display: titleDisplay }}
        >
          {/* Base title (transparent text) */}
          <h1 className='text-6xl font-bold text-center text-transparent whitespace-pre-line relative'>
            {project.title}

            {/* Fill overlay with gradient edge */}
            <div className='absolute inset-0 overflow-hidden'>
              <div
                className='text-6xl font-bold text-center text-white whitespace-pre-line relative'
                style={{
                  clipPath: `inset(0 ${100 - titleFillProgress.get()}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - titleFillProgress.get()}% 0 0)`,
                }}
              >
                {project.title}
                <div
                  className='absolute top-0 right-0 h-full w-20 pointer-events-none'
                  style={{
                    background:
                      'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                  }}
                />
              </div>
            </div>

            {/* Un-fill overlay */}
            <div className='absolute inset-0 overflow-hidden'>
              <div
                className='text-6xl font-bold text-center text-white whitespace-pre-line relative'
                style={{
                  clipPath: `inset(0 0 0 ${titleUnfillProgress.get()}%)`,
                  WebkitClipPath: `inset(0 0 0 ${titleUnfillProgress.get()}%)`,
                }}
              >
                {project.title}
                <div
                  className='absolute top-0 left-0 h-full w-20 pointer-events-none'
                  style={{
                    background:
                      'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                  }}
                />
              </div>
            </div>
          </h1>
        </motion.div>

        {/* Project Screenshots with Growth Animation - Explicitly centered */}
        <div className='absolute inset-0 flex items-center justify-center'>
          {/* Screenshot 1 */}
          <motion.div
            style={{
              scale: screenshot1Scale,
              opacity: screenshot1Opacity,
              display: screenshot1Display,
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: '-250px', // Half of width
              marginTop: '-150px', // Half of height
              width: '500px',
              height: '300px',
            }}
          >
            <img
              src={project.screenshots[0] || '/placeholder.svg'}
              alt={`Screenshot 1 of ${project.title}`}
              className='w-full h-full object-contain'
            />
          </motion.div>

          {/* Screenshot 2 */}
          {project.screenshots.length > 1 && (
            <motion.div
              style={{
                scale: screenshot2Scale,
                opacity: screenshot2Opacity,
                display: screenshot2Display,
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: '-250px', // Half of width
                marginTop: '-150px', // Half of height
                width: '500px',
                height: '300px',
              }}
            >
              <img
                src={project.screenshots[1] || '/placeholder.svg'}
                alt={`Screenshot 2 of ${project.title}`}
                className='w-full h-full object-contain'
              />
            </motion.div>
          )}

          {/* Screenshot 3 */}
          {project.screenshots.length > 2 && (
            <motion.div
              style={{
                scale: screenshot3Scale,
                opacity: screenshot3Opacity,
                display: screenshot3Display,
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: '-250px', // Half of width
                marginTop: '-150px', // Half of height
                width: '500px',
                height: '300px',
              }}
            >
              <img
                src={project.screenshots[2] || '/placeholder.svg'}
                alt={`Screenshot 3 of ${project.title}`}
                className='w-full h-full object-contain'
              />
            </motion.div>
          )}

          {/* CURSORS - Using the hand cursor image */}
          {/* Cursor 1 */}
          <motion.div
            style={{
              display: cursor1Display,
              opacity: cursor1Opacity,
              position: 'absolute',
              left: '50%',
              top: '50%',
              x: cursor1X,
              y: cursor1Y,
              zIndex: 100,
            }}
            className='pointer-events-none'
          >
            <img src='/hand-cursor.png' alt='Hand cursor' width='32' height='32' />
          </motion.div>

          {/* Cursor 2 */}
          {project.screenshots.length > 1 && (
            <motion.div
              style={{
                display: cursor2Display,
                opacity: cursor2Opacity,
                position: 'absolute',
                left: '50%',
                top: '50%',
                x: cursor2X,
                y: cursor2Y,
                zIndex: 100,
              }}
              className='pointer-events-none'
            >
              <img src='/hand-cursor.png' alt='Hand cursor' width='32' height='32' />
            </motion.div>
          )}

          {/* Cursor 3 */}
          {project.screenshots.length > 2 && (
            <motion.div
              style={{
                display: cursor3Display,
                opacity: cursor3Opacity,
                position: 'absolute',
                left: '50%',
                top: '50%',
                x: cursor3X,
                y: cursor3Y,
                zIndex: 100,
              }}
              className='pointer-events-none'
            >
              <img src='/hand-cursor.png' alt='Hand cursor' width='32' height='32' />
            </motion.div>
          )}
        </div>

        {/* Project Description and Technologies - Now with card styling */}
        <motion.div
          className='absolute inset-0 flex flex-col items-center justify-center'
          style={{
            display: contentDisplay,
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          {/* Content Container with Card Styling */}
          <div
            className="flex flex-col items-center justify-center gap-12 max-w-4xl px-8 py-10 mx-4 
               bg-black/80 backdrop-blur-sm
               border border-gray-600
               rounded-xl
               shadow-[0_0_25px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.3)]
               relative
               before:content-[''] before:absolute before:inset-0 before:border-t before:border-l before:border-gray-500/30 before:rounded-xl
               after:content-[''] after:absolute before:inset-0 after:border-b after:border-r after:border-gray-800/50 after:rounded-xl"
          >
            {/* Description */}
            <div className='w-full'>
              <p className='text-lg text-white/90 leading-relaxed whitespace-pre-line text-center'>
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className='w-full'>
              <h3 className='text-xl font-semibold text-center text-[#00ffaa] mb-4'>
                Technologies Used
              </h3>
              <div className='flex flex-wrap justify-center gap-3'>
                {project.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className='px-4 py-2 bg-white/10 rounded-full text-white backdrop-blur-sm border border-gray-700/50'
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
