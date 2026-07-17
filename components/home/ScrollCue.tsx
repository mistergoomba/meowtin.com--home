'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Minimal animated mouse + label, pinned bottom-center of the hero. */
export default function ScrollCue({ onClick }: { onClick?: () => void }) {
  const reduce = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to explore"
      className="flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/70"
    >
      <span className="relative flex h-8 w-5 justify-center rounded-full border border-current pt-1.5">
        <motion.span
          className="h-1.5 w-1 rounded-full bg-current"
          animate={reduce ? undefined : { y: [0, 8, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
      <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to Explore</span>
    </button>
  );
}
