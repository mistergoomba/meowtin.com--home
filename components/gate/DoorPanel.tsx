'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { HEADING_CLASS, type Door } from './doors';

/** Three-way state so a panel knows whether it is the one being looked at, the
 *  one being looked away from, or nobody is looking yet. */
export type PanelState = 'idle' | 'active' | 'recede';

// At rest every door shows its own world, muted. Pointing at one brings it to
// full strength and pushes the other two back — dimmer and desaturated, so the
// chosen world is the only saturated thing on screen.
const ATMOSPHERE: Record<PanelState, { dim: number; bloom: number; gray: number }> = {
  idle: { dim: 0.34, bloom: 0.38, gray: 0.35 },
  active: { dim: 0, bloom: 1, gray: 0 },
  recede: { dim: 0.58, bloom: 0.12, gray: 0.75 },
};

const CONTENT_OPACITY: Record<PanelState, number> = { idle: 0.85, active: 1, recede: 0.45 };

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DoorPanel({
  door,
  state,
  onEnter,
  onPoint,
  onUnpoint,
}: {
  door: Door;
  state: PanelState;
  onEnter: () => void;
  onPoint: () => void;
  onUnpoint: () => void;
}) {
  const reduce = useReducedMotion();
  const atmos = ATMOSPHERE[state];
  const duration = reduce ? 0 : 0.55;

  return (
    <a
      href={door.href}
      onClick={(e) => {
        // Let the browser handle modified clicks (new tab, new window) so the
        // door still behaves like a link.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onEnter();
      }}
      onMouseEnter={onPoint}
      onMouseLeave={onUnpoint}
      onFocus={onPoint}
      onBlur={onUnpoint}
      aria-label={`${door.label} — ${door.statement.pre}${door.statement.word}`}
      className='group relative flex flex-1 items-center overflow-hidden border-b border-white/10 outline-none last:border-b-0 md:items-end md:border-b-0 md:border-r md:last:border-r-0'
    >
      {/* Atmosphere: the ground color veiling the shared portrait, plus this
          world's accent bloom. Filtered as one group so grayscale never touches
          the text sitting above it. */}
      <motion.div
        className='pointer-events-none absolute inset-0'
        animate={{ filter: `grayscale(${atmos.gray})` }}
        transition={{ duration, ease: EASE }}
      >
        <div className='absolute inset-0' style={{ background: door.ground, opacity: door.veil }} />
        <motion.div
          className='absolute inset-0'
          style={{
            background: `radial-gradient(70% 55% at 50% 62%, ${door.accent}59, transparent 70%)`,
          }}
          animate={{ opacity: atmos.bloom }}
          transition={{ duration, ease: EASE }}
        />
      </motion.div>

      {/* Dimmer — what makes "at rest" read as muted and "receding" as pushed
          back. Sits above the atmosphere but below the content. */}
      <motion.div
        className='pointer-events-none absolute inset-0 bg-black'
        animate={{ opacity: atmos.dim }}
        transition={{ duration, ease: EASE }}
      />

      {/* Legibility scrim, in this door's own ground color so the cream panel
          darkens toward warm rather than toward black. Reaches high enough to
          cover the copy whether it is centered (mobile) or on the baseline. */}
      <div
        className='pointer-events-none absolute inset-0'
        style={{
          background: `linear-gradient(to top, ${door.ground}cc 0%, ${door.ground}66 45%, transparent 80%)`,
        }}
      />

      <motion.div
        className={`relative z-10 w-full px-6 py-6 text-center md:px-9 md:pb-12 md:pt-10 md:text-left ${door.font}`}
        animate={{ opacity: CONTENT_OPACITY[state] }}
        transition={{ duration, ease: EASE }}
      >
        <p
          className='text-[10px] uppercase tracking-[0.4em] md:text-xs'
          style={{ color: door.accent }}
        >
          {door.label}
        </p>

        <h2
          className={`mt-2.5 leading-[1.1] md:mt-4 ${door.headingClass ?? HEADING_CLASS}`}
          style={{ color: door.ink }}
        >
          {door.statement.pre}
          <span
            className='bg-clip-text text-transparent'
            style={{ backgroundImage: door.wordGradient }}
          >
            {door.statement.word}
          </span>
        </h2>

        <span
          className='mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] transition-opacity duration-500 md:mt-7 md:text-xs'
          style={{ color: door.inkMuted, opacity: state === 'active' ? 1 : 0.5 }}
        >
          Enter
          <span
            className='block h-px w-6 transition-all duration-500 group-hover:w-12'
            style={{ background: door.accent }}
          />
        </span>
      </motion.div>
    </a>
  );
}
