'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timing } from '../config/timing';
import { wordPositions, mobileWordPositions } from '../config/wordPositions';
import { useIsMobile } from '@/hooks/use-mobile';

export default function WordCloud() {
  const ref = useRef<HTMLElement>(null);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [wordOffsets, setWordOffsets] = useState<Array<{ x: number; y: number }>>([]);
  const isMobile = useIsMobile();

  // Use the appropriate word positions based on device
  const currentWordPositions = isMobile ? mobileWordPositions : wordPositions;

  // Track global scroll progress for entry and exit
  const { scrollYProgress: globalProgress } = useScroll();

  // Update current scroll position and calculate word offsets
  useEffect(() => {
    const unsubscribe = globalProgress.onChange((value) => {
      setCurrentScrollY(value);

      // Calculate new offsets for all words
      const newOffsets = currentWordPositions.map((word, index) => {
        const xFrequency = 2 + (index % 3);
        const yFrequency = 1.5 + (index % 2);
        const xPhase = index * 0.5;
        const yPhase = index * 0.3;

        const xOffset = Math.sin(value * xFrequency + xPhase) * 5000 * (word.z / 5000);
        const yOffset = Math.cos(value * yFrequency + yPhase) * 3000 * (word.z / 5000);

        return { x: xOffset, y: yOffset };
      });

      setWordOffsets(newOffsets);
    });

    return () => unsubscribe();
  }, [globalProgress, currentWordPositions]);

  // Section visibility based on global scroll
  const sectionVisibility = useTransform(
    globalProgress,
    [timing.wordCloud.fadeInStart, timing.wordCloud.fadeInEnd],
    [0, 1]
  );

  // Section exit based on global scroll
  const sectionExit = useTransform(
    globalProgress,
    [timing.wordCloud.fadeOutStart, timing.wordCloud.fadeOutEnd],
    [1, 0]
  );

  // Combined section opacity
  const sectionOpacity = useTransform(
    [sectionVisibility, sectionExit],
    ([visibility, exit]) => (visibility as number) * (exit as number)
  );

  // Get color based on word size
  const getColor = (size: number) => {
    switch (size) {
      case 2.5:
        return '#00ffaa';
      case 1.8:
        return '#00e69d';
      case 1.4:
        return '#00cc8a';
      default:
        return '#00b377';
    }
  };

  // Calculate word scale and opacity based on current scroll position
  const getWordAnimation = (index: number) => {
    const startScroll = timing.wordCloud.wordsAnimStart;
    const endScroll = timing.wordCloud.wordsAnimEnd;
    const wordScrollRangePerWord = (endScroll - startScroll) / currentWordPositions.length;

    const wordStartScroll = startScroll + index * wordScrollRangePerWord;
    const wordEndScroll = wordStartScroll + 0.005;

    let scale = 0;
    let opacity = 0;

    if (currentScrollY < wordStartScroll) {
      scale = 0;
      opacity = 0;
    } else if (currentScrollY >= wordStartScroll && currentScrollY < wordEndScroll) {
      scale = (currentScrollY - wordStartScroll) / (wordEndScroll - wordStartScroll);
      opacity = scale;
    } else if (
      currentScrollY >= wordEndScroll &&
      currentScrollY < timing.wordCloud.wordsFadeOutStart
    ) {
      scale = 1;
      opacity = 1;
    } else if (
      currentScrollY >= timing.wordCloud.wordsFadeOutStart &&
      currentScrollY < timing.wordCloud.wordsFadeOutEnd
    ) {
      scale =
        1 -
        (currentScrollY - timing.wordCloud.wordsFadeOutStart) /
          (timing.wordCloud.wordsFadeOutEnd - timing.wordCloud.wordsFadeOutStart);
      opacity = scale;
    } else {
      scale = 0;
      opacity = 0;
    }

    return { scale, opacity };
  };

  return (
    <section ref={ref} className='h-screen w-full'>
      <motion.div
        style={{
          opacity: sectionOpacity,
        }}
        className='fixed top-0 left-0 w-full h-screen flex items-center justify-center'
      >
        <div className='word-cloud-container relative'>
          {currentWordPositions.map((word, index) => {
            const { scale, opacity } = getWordAnimation(index);
            const offset = wordOffsets[index] || { x: 0, y: 0 };

            const textShadow =
              word.size === 2.5
                ? '0 0 15px rgba(0, 255, 170, 0.8)'
                : '0 0 10px rgba(0, 255, 170, 0.5)';

            const fontSize = isMobile ? `${word.size * 0.7}rem` : `${word.size}rem`;

            return (
              <motion.div
                key={`${word.text}-${index}`}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${word.x + offset.x}px)`,
                  top: `calc(50% + ${word.y + offset.y}px)`,
                  fontSize,
                  color: getColor(word.size),
                  textShadow,
                  fontWeight: word.size === 2.5 ? 'bold' : 'normal',
                  transform: `translateZ(${word.z}px)`,
                  scale,
                  opacity,
                  zIndex: Math.round(word.z) + 1000,
                  transformStyle: 'preserve-3d',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, left, top',
                }}
              >
                {word.text}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
