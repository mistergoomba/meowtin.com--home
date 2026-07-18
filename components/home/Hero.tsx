'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

import { HEADLINE, ROLES } from './accent';
import IdentityRotator from './IdentityRotator';
import ScrollCue from './ScrollCue';

// WebGL atmosphere is client-only + lazy, exactly like the existing TronGrid.
const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false });

const ROTATE_MS = 4200;

// Temporary toggle — hiding the WebGL particle field to preview the hero without it.
const SHOW_PARTICLES = false;

export default function Hero({ onExplore }: { onExplore: () => void }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const role = ROLES[active];

  // Auto-advance the identity rotator (paused on hover / reduced motion).
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => {
      setActive((i) => (i + 1) % ROLES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [reduce, paused]);

  // Pointer parallax — different depths for background / portrait / copy.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 18, mass: 0.6 };
  const bgX = useSpring(mx, springCfg);
  const bgY = useSpring(my, springCfg);

  const portraitX = useSpring(useMotionValue(0), springCfg);
  const portraitY = useSpring(useMotionValue(0), springCfg);
  const copyX = useSpring(useMotionValue(0), springCfg);

  // shared, normalized cursor (-0.5..0.5) read by the WebGL particle field —
  // fed via a ref so it works even though the canvas is pointer-events-none.
  const pointerRef = useRef({ x: 0, y: 0 });

  // cursor-following spotlight position (percent of the hero), softly sprung
  const glowX = useSpring(useMotionValue(58), { stiffness: 70, damping: 22, mass: 0.7 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 70, damping: 22, mass: 0.7 });
  const glowLeft = useMotionTemplate`${glowX}%`;
  const glowTop = useMotionTemplate`${glowY}%`;

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerRef.current.x = nx;
    pointerRef.current.y = ny;
    glowX.set((nx + 0.5) * 100);
    glowY.set((ny + 0.5) * 100);
    mx.set(nx * 24);
    my.set(ny * 24);
    portraitX.set(nx * 16);
    portraitY.set(ny * 16);
    copyX.set(nx * -8);
  };

  return (
    <section
      onMouseMove={handleMouse}
      className='relative flex min-h-[100svh] w-full items-start overflow-hidden pt-10 md:items-center'
    >
      {/* Layer 0: base gradient wash (renders instantly, before WebGL) */}
      <div
        className='pointer-events-none absolute inset-0 transition-[background] duration-1000'
        style={{
          background: `radial-gradient(80% 70% at 72% 42%, ${role.nebula}22, transparent 60%), radial-gradient(60% 60% at 30% 80%, ${role.accent}12, transparent 60%), #000`,
        }}
      />

      {/* Layer 1: WebGL particle atmosphere with parallax */}
      {SHOW_PARTICLES && (
        <motion.div className='pointer-events-none absolute inset-0' style={{ x: bgX, y: bgY }}>
          <HeroBackground colorHex={role.accent} reduced={!!reduce} pointer={pointerRef} />
        </motion.div>
      )}

      {/* Layer 1.5: the hero portrait. */}
      <div className='pointer-events-none absolute inset-0 z-[1]'>
        {/* MOBILE: photo anchored to the bottom of the hero, sized to cover the
            lower area so it sits mostly behind the skills list; fades up out of
            black so the headline block above it stays on black. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/me-hero.webp'
          alt='Martin Boynton'
          className='absolute inset-x-0 bottom-0 h-[70%] w-full object-cover object-[52%_20%] md:hidden'
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, #000 26%, #000 92%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, #000 26%, #000 92%, transparent 100%)',
          }}
        />

        {/* DESKTOP: anchored inside the SAME centered max-w-[1400px] frame as the
            content grid, so it keeps a fixed position relative to the identity
            list on the right at any window width. */}
        <motion.div
          style={{ x: portraitX, y: portraitY }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className='relative mx-auto hidden h-full max-w-[1400px] md:block'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/me-hero.webp'
            alt='Martin Boynton'
            className='absolute right-[240px] top-1/2 w-[860px] max-w-none -translate-y-1/2'
            style={{
              // fade all four edges so the photo dissolves into the background
              // (intersect a horizontal + vertical gradient — no hard rectangle)
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, #000 20%, #000 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 84%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, #000 20%, #000 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 84%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
            }}
          />
        </motion.div>
      </div>

      {/* DESKTOP left scrim (keeps the headline readable over the photo) */}
      <div
        className='pointer-events-none absolute inset-0 z-[2] hidden md:block'
        style={{
          background:
            'linear-gradient(to right, #000 0%, rgba(0,0,0,0.85) 26%, rgba(0,0,0,0.25) 46%, transparent 62%)',
        }}
      />
      {/* MOBILE vertical scrim: gentle — just enough to keep the list legible
          while the photo stays clearly visible behind it. */}
      <div
        className='pointer-events-none absolute inset-0 z-[2] md:hidden'
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 42%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.72) 100%)',
        }}
      />
      {/* bottom fade into the page */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-black to-transparent' />

      {/* Layer 2.5: calm atmosphere — a soft accent spotlight that trails the
          cursor, plus a one-shot bloom each time the active role changes.
          Additive (screen) so it only adds light and never muddies the black. */}
      <div className='pointer-events-none absolute inset-0 z-[3] overflow-hidden mix-blend-screen'>
        {/* cursor-following spotlight */}
        <motion.div
          className='absolute h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] transition-[background] duration-1000'
          style={{
            left: glowLeft,
            top: glowTop,
            background: `radial-gradient(circle, ${role.accent}47, transparent 70%)`,
          }}
        />
        {/* bloom on role change (skipped under reduced motion) */}
        {!reduce && (
          <motion.div
            key={role.id}
            className='absolute left-[58%] top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]'
            style={{ background: `radial-gradient(circle, ${role.accent}55, transparent 70%)` }}
            initial={{ scale: 0.55, opacity: 0.6 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* Layer 2: content grid */}
      <div className='relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-28 px-6 pb-14 pt-28 md:gap-10 md:grid-cols-[45fr_55fr] md:px-10 md:py-0'>
        {/* LEFT — copy */}
        <motion.div style={{ x: copyX }} className='max-w-xl'>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className='mb-6 text-sm uppercase tracking-[0.35em]'
            style={{ color: role.accent }}
          >
            Hi, I&#39;m Martin.
          </motion.p>

          <h1 className='font-share-tech text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white sm:text-6xl sm:leading-[1.05] md:text-7xl'>
            {HEADLINE.map((line, i) => (
              <motion.span
                key={line.word}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='block'
              >
                {line.pre}
                <span className={`bg-gradient-to-r ${line.gradient} bg-clip-text text-transparent`}>
                  {line.word}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='mt-8 text-base tracking-[0.2em] text-white/50 md:text-lg'
          >
            Technology <span className='text-white/30'>×</span> Wellness{' '}
            <span className='text-white/30'>×</span> Creativity
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className='hidden md:block'
          >
            <button
              type='button'
              onClick={onExplore}
              className='group mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08]'
              style={{ boxShadow: `0 0 0 0 ${role.accent}` }}
            >
              Explore My Work
              <span className='transition-transform duration-300 group-hover:translate-y-0.5'>
                ↓
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT — identity rotator (the photo is a full layer behind everything).
            Sits at the far right on xl where the masked photo edge is darkest. */}
        <div
          className='hidden items-center justify-end xl:flex'
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className='w-[220px]'>
            <IdentityRotator active={active} onSelect={setActive} accent={role.accent} />
          </div>
        </div>

        {/* identity rotator for smaller screens (below the copy, until xl) */}
        <div
          className='xl:hidden'
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <IdentityRotator active={active} onSelect={setActive} accent={role.accent} />
        </div>
      </div>

      {/* Scroll cue */}
      <div className='absolute inset-x-0 bottom-8 z-10 flex justify-center'>
        <ScrollCue onClick={onExplore} />
      </div>
    </section>
  );
}
