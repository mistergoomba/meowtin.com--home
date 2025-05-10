'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timing } from '../config/timing';
import { wordPositions } from '../config/wordPositions';

export default function WordCloud() {
  const ref = useRef(null);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  // Track global scroll progress for entry and exit
  const { scrollYProgress: globalProgress } = useScroll();

  // Update current scroll position
  useEffect(() => {
    const unsubscribe = globalProgress.onChange(setCurrentScrollY);
    return () => unsubscribe();
  }, [globalProgress]);

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

  // Get color based on word size - CHANGED BACK TO GREEN
  const getColor = (size: number) => {
    switch (size) {
      case 2.5:
        return '#00ffaa'; // Pure green for primary
      case 1.8:
        return '#00e69d'; // Slightly darker green for secondary
      case 1.4:
        return '#00cc8a'; // Even darker green for tertiary
      default:
        return '#00b377'; // Darkest green for quaternary
    }
  };

  // Calculate word scale and opacity based on current scroll position
  const getWordAnimation = (index: number) => {
    // Animation timing parameters
    const startScroll = timing.wordCloud.wordsAnimStart;
    const endScroll = timing.wordCloud.wordsAnimEnd;
    const wordScrollRangePerWord = (endScroll - startScroll) / wordPositions.length;

    // Calculate the scroll range for this specific word
    const wordStartScroll = startScroll + index * wordScrollRangePerWord;
    const wordEndScroll = wordStartScroll + 0.005; // Slightly wider range for each word

    // Calculate scale based on current scroll position
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
        <div className='word-cloud-container'>
          {wordPositions.map((word, index) => {
            const { scale, opacity } = getWordAnimation(index);

            // Add a subtle glow effect for green text
            const textShadow =
              word.size === 2.5
                ? '0 0 15px rgba(0, 255, 170, 0.8)'
                : '0 0 10px rgba(0, 255, 170, 0.5)';

            return (
              <motion.div
                key={`${word.text}-${index}`}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${word.x}px)`,
                  top: `calc(50% + ${word.y}px)`,
                  fontSize: `${word.size}rem`,
                  color: getColor(word.size),
                  textShadow,
                  fontWeight: word.size === 2.5 ? 'bold' : 'normal',
                  transform: `translateZ(${word.z}px)`,
                  scale,
                  opacity,
                  zIndex: Math.round(word.z) + 1000,
                  transformStyle: 'preserve-3d',
                  whiteSpace: 'nowrap',
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
