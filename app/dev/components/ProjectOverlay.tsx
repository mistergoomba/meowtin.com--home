import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CardProject } from '../types/projects';
import Slide from './Slide';

export default function ProjectOverlay({
  project,
  onClose,
}: {
  project: CardProject;
  onClose: () => void;
}) {
  // Build a gallery where the first slide is a meta slide with title/description/tags
  const baseImages = project.screenshots?.length ? project.screenshots : [project.thumbnail!];
  const slides: Array<{ type: 'meta' | 'image'; src?: string }> = [
    { type: 'meta' },
    ...baseImages.map((src) => ({ type: 'image' as const, src })),
  ];

  // --- Simplified z-order flow ---
  // current = top card
  // queued = card that appears UNDERNEATH right as the exit starts
  const [current, setCurrent] = useState(0);
  const [queued, setQueued] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isExiting, setIsExiting] = useState(false);
  const total = slides.length;

  // Keys for AnimatePresence (optional but stable)
  const frontKey = `front-${current}`;
  const backKey = queued != null ? `back-${queued}` : 'back-none';

  // Close on ESC + navigate with arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, queued, isExiting, total]);

  const beginTransition = useCallback(
    (dir: 1 | -1, target?: number) => {
      if (isExiting) return; // ignore if an exit is in progress
      const nextIndex =
        typeof target === 'number'
          ? ((target % total) + total) % total
          : (current + (dir === 1 ? 1 : -1) + total) % total;
      if (nextIndex === current) return;

      setDirection(dir);
      setQueued(nextIndex); // make the next slide appear UNDERNEATH immediately
      setIsExiting(true); // start exit of the current top card
    },
    [current, total, isExiting]
  );

  const next = useCallback(() => beginTransition(1), [beginTransition]);
  const prev = useCallback(() => beginTransition(-1), [beginTransition]);

  // Swipe
  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40 && !isExiting) {
      dx < 0 ? next() : prev();
    }
    startX.current = null;
  };

  // Foreground exit animation (photo flick)
  const foregroundVariants = {
    initial: { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 20 },
    exitLeft: {
      x: '-120%',
      y: 40,
      rotate: -12,
      scale: 0.98,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
    exitRight: {
      x: '120%',
      y: 40,
      rotate: 12,
      scale: 0.98,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  // No animation for the back card; it just exists under the front during exit
  // (We still keep it in a motion.div for consistency, but no variants applied.)

  // Prevent body scroll when overlay is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const activeForDots = queued ?? current;

  return (
    <motion.div
      className='fixed inset-0 z-[100] flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/90' onClick={onClose} aria-hidden />

      {/* Fullscreen gallery layer */}
      <motion.div
        className='relative z-[101] inset-0 w-full h-full'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 z-[103] rounded-full bg-black/60 p-2 text-white/90 backdrop-blur hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/30'
          aria-label='Close'
        >
          <X className='h-7 w-7' />
        </button>

        {/* Stage */}
        <div
          className='absolute inset-0 select-none touch-pan-y'
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {/* Back (queued) shows up ONLY during transition and sits under the exiting front */}
          {queued !== null && (
            <motion.div key={backKey} className='absolute inset-0 z-10'>
              <Slide slide={slides[queued]} project={project} />
            </motion.div>
          )}

          {/* Front (current) – removed to trigger exit, then we swap indices on exit complete */}
          <AnimatePresence
            initial={false}
            onExitComplete={() => {
              if (queued !== null) {
                setCurrent(queued);
                setQueued(null);
                setIsExiting(false);
              }
            }}
          >
            {!isExiting && (
              <motion.div
                key={frontKey}
                className='absolute inset-0 z-20'
                variants={foregroundVariants}
                initial='initial'
                exit={direction === 1 ? 'exitLeft' : 'exitRight'}
              >
                <Slide slide={slides[current]} project={project} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={() => !isExiting && prev()}
                className='absolute left-3 top-1/2 -translate-y-1/2 z-[103] rounded-full bg-black/50 p-2 text-white/90 backdrop-blur hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30'
                aria-label='Previous'
              >
                <ChevronLeft className='h-7 w-7' />
              </button>
              <button
                onClick={() => !isExiting && next()}
                className='absolute right-3 top-1/2 -translate-y-1/2 z-[103] rounded-full bg-black/50 p-2 text-white/90 backdrop-blur hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30'
                aria-label='Next'
              >
                <ChevronRight className='h-7 w-7' />
              </button>
            </>
          )}

          {/* Dots */}
          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-[103] flex gap-2'>
            {slides.map((_, i) => {
              const isActive = i === activeForDots;
              return (
                <button
                  key={i}
                  onClick={() => beginTransition(i > current ? 1 : -1, i)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    isActive ? 'bg-white' : 'bg-gray-500 hover:bg-gray-600'
                  } ${isActive && 'filter drop-shadow-[0_0_10px_rgba(0,0,0,.9)]'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
