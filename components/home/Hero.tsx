'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

import { HEADLINE, ROLES } from './accent';
import IdentityRotator from './IdentityRotator';
import ScrollCue from './ScrollCue';

// WebGL atmosphere is client-only + lazy, exactly like the existing TronGrid.
const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false });

const ROTATE_MS = 4200;

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

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerRef.current.x = nx;
    pointerRef.current.y = ny;
    mx.set(nx * 24);
    my.set(ny * 24);
    portraitX.set(nx * 16);
    portraitY.set(ny * 16);
    copyX.set(nx * -8);
  };

  return (
    <section
      onMouseMove={handleMouse}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* Layer 0: base gradient wash (renders instantly, before WebGL) */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-1000"
        style={{
          background: `radial-gradient(80% 70% at 72% 42%, ${role.nebula}22, transparent 60%), radial-gradient(60% 60% at 30% 80%, ${role.accent}12, transparent 60%), #050506`,
        }}
      />

      {/* Layer 1: WebGL particle atmosphere with parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ x: bgX, y: bgY }}
      >
        <HeroBackground colorHex={role.accent} reduced={!!reduce} pointer={pointerRef} />
      </motion.div>

      {/* Layer 1.5: the full hero portrait, sitting behind the copy. The whole
          photo stays visible; its left/right edges are masked and a scrim + bottom
          fade dissolve it into the page and keep the headline readable. */}
      <motion.div
        style={{ x: portraitX, y: portraitY }}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/me-hero.webp"
          alt="Martin Boynton"
          className="absolute right-0 top-1/2 w-[min(860px,70vw)] max-w-none -translate-y-1/2 lg:right-[2%] lg:-translate-x-[200px]"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, #000 22%, #000 82%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, #000 22%, #000 82%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* left scrim (keeps the headline readable) + bottom fade into the page */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(to right, #050506 0%, rgba(5,5,6,0.85) 26%, rgba(5,5,6,0.25) 46%, transparent 62%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-[#050506] to-transparent" />

      {/* Layer 2: content grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-28 md:grid-cols-[45fr_55fr] md:px-10 md:py-0">
        {/* LEFT — copy */}
        <motion.div style={{ x: copyX }} className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-sm uppercase tracking-[0.35em]"
            style={{ color: role.accent }}
          >
            Hi, I&#39;m Martin.
          </motion.p>

          <h1 className="font-share-tech text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
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
                className="block"
              >
                {line.pre}
                <span
                  className={`bg-gradient-to-r ${line.gradient} bg-clip-text text-transparent`}
                >
                  {line.word}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-base tracking-[0.2em] text-white/50 md:text-lg"
          >
            Technology <span className="text-white/30">×</span> Wellness{' '}
            <span className="text-white/30">×</span> Creativity
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onExplore}
              className="group mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08]"
              style={{ boxShadow: `0 0 0 0 ${role.accent}` }}
            >
              Explore My Work
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT — identity rotator (the photo is a full layer behind everything).
            Sits at the far right on xl where the masked photo edge is darkest. */}
        <div
          className="hidden items-center justify-end xl:flex"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="w-[220px]">
            <IdentityRotator active={active} onSelect={setActive} accent={role.accent} />
          </div>
        </div>

        {/* identity rotator for smaller screens (below the copy, until xl) */}
        <div
          className="xl:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <IdentityRotator active={active} onSelect={setActive} accent={role.accent} />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <ScrollCue onClick={onExplore} />
      </div>
    </section>
  );
}
