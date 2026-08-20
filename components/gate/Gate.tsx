'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import SocialIcons from '@/components/SocialIcons';

import { DOORS, type Door } from './doors';
import DoorPanel, { type PanelState } from './DoorPanel';

// How long the ground-color wash covers the screen before navigation fires.
// Short enough not to feel like a loading screen, long enough that the arrival
// on the other side reads as the same motion continuing.
const WASH_MS = 420;

export default function Gate() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [pointed, setPointed] = useState<string | null>(null);
  const [leaving, setLeaving] = useState<Door | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const go = (door: Door) => {
    if (door.external) window.location.href = door.href;
    else router.push(door.href);
  };

  const enter = (door: Door) => {
    if (reduce) return go(door);
    setLeaving(door);
    timer.current = window.setTimeout(() => go(door), WASH_MS);
  };

  const stateFor = (door: Door): PanelState =>
    pointed === null ? 'idle' : pointed === door.id ? 'active' : 'recede';

  return (
    <main className='relative flex h-[100svh] w-full flex-col overflow-hidden bg-black'>
      {/* The shared portrait. One continuous image under all three panels —
          each panel veils its own slice of it, which is why the doors are
          ordered to match what is behind them. */}
      <div className='absolute inset-0'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/me-hero.webp'
          alt=''
          aria-hidden='true'
          fetchPriority='high'
          className='h-full w-full object-cover object-[52%_18%] md:object-[center_28%]'
        />
      </div>

      {/* Doors. Row on desktop, column on mobile — the panels themselves are
          identical in both, only the axis changes. */}
      <div className='relative z-10 flex min-h-0 flex-1 flex-col md:flex-row'>
        {DOORS.map((door) => (
          <DoorPanel
            key={door.id}
            door={door}
            state={stateFor(door)}
            onEnter={() => enter(door)}
            onPoint={() => setPointed(door.id)}
            onUnpoint={() => setPointed((cur) => (cur === door.id ? null : cur))}
          />
        ))}
      </div>

      {/* The fourth door, kept quiet: a signature rather than a button. Doubles
          as the page's h1, since three one-word panels tell a crawler nothing. */}
      <footer className='relative z-20 flex shrink-0 flex-col items-center gap-3 border-t border-white/10 bg-black px-6 py-4 md:flex-row md:justify-between md:gap-6 md:px-10 md:py-5'>
        <a
          href='/martin'
          className='group flex flex-col items-center gap-1 font-share-tech md:flex-row md:items-baseline md:gap-4'
        >
          <h1 className='inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/80 transition-colors group-hover:text-white md:text-base'>
            Martin Boynton
            <span className='text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/70'>
              →
            </span>
          </h1>
          <p className='text-[10px] uppercase tracking-[0.3em] text-white/35 transition-colors group-hover:text-white/55 md:text-xs'>
            three lives · one person
          </p>
        </a>

        <SocialIcons className='flex items-center gap-5' />
      </footer>

      {/* Search engines and screen readers get the full picture; the visible
          page stays down to three words and a name. */}
      <p className='sr-only'>
        Martin Boynton — massage therapist, software developer, and creative in Northern
        California. Therapeutic bodywork at massage.meowtin.com, AI and full-stack development,
        and music, video, and art.
      </p>

      {/* Exit wash: the screen fills with the chosen world's ground color before
          the navigation lands, so entering a door feels like the panel opening
          rather than a page swap. */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            key='wash'
            className='pointer-events-none fixed inset-0 z-50'
            style={{ background: leaving.ground }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: WASH_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
