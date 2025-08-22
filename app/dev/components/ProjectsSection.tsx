'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../config/projects';
import ProjectOverlay from './ProjectOverlay';
import { CardProject } from '../types/projects';

function isVideo(src: string) {
  return /\.(mp4|mov|webm)$/i.test(src);
}

function MediaLayer({ src, alt, visible }: { src: string; alt: string; visible: boolean }) {
  const common = `absolute inset-0 transition-opacity duration-500 ${
    visible ? 'opacity-100' : 'opacity-0'
  }`;

  if (isVideo(src)) {
    return (
      <video
        key={`vid-${src}`} // ensure fresh playback on swap
        src={src}
        muted
        loop
        playsInline
        autoPlay
        className={`${common} w-full h-full object-cover`}
      />
    );
  }

  return (
    <Image
      key={`img-${src}`}
      src={src}
      alt={alt}
      fill
      className={`${common} object-cover`}
      sizes='(max-width: 640px) 100vw, (max-width: 1536px) 33vw, 300px'
      priority={false}
    />
  );
}

export default function ProjectsSection() {
  const items: CardProject[] = projects.map((p) => ({
    ...p,
    // prefer explicit thumbnail[0]; fallback remains safe
    thumbnail: p.thumbnails?.[0] ?? p.screenshots?.[0] ?? '/placeholder.svg',
  }));

  const [active, setActive] = useState<number | null>(null);

  return (
    <section className='w-full pb-24 md:pb-40'>
      <div className='w-full mx-auto px-4'>
        <h2 className='mb-10 text-center text-3xl font-extrabold tracking-tight text-white md:mb-12 md:text-4xl'>
          Projects
        </h2>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {items.map((p, i) => (
            <ProjectCard key={i} p={p} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <ProjectOverlay project={items[active]} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ p, onClick }: { p: CardProject; onClick: () => void }) {
  // 🚀 New: cycle through p.thumbnails (can include images or videos)
  const order = (p.thumbnails ?? []).filter(Boolean);
  const canCycle = order.length > 1;

  // Two-layer crossfade
  const [frontSrc, setFrontSrc] = useState(order[0] ?? p.thumbnails?.[0]!);
  const [backSrc, setBackSrc] = useState<string | null>(null);
  const [showFront, setShowFront] = useState(true);

  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const showFrontRef = useRef(showFront);

  useEffect(() => {
    showFrontRef.current = showFront;
  }, [showFront]);

  // Reset to the provided primary thumbnail if data changes
  useEffect(() => {
    const initial = order[0] ?? p.thumbnails?.[0]!;
    setFrontSrc(initial);
    setBackSrc(null);
    setShowFront(true);
    stepRef.current = 1 % Math.max(order.length, 1);
  }, [p.thumbnails, p.thumbnails?.[0]]); // re-run if thumbnails change

  const startCycle = () => {
    if (!canCycle) return;

    // Start at the next item after the first
    stepRef.current = 1 % order.length;

    // Prime first fade
    setBackSrc(order[stepRef.current]);
    setShowFront(false);
    stepRef.current = (stepRef.current + 1) % order.length;

    timerRef.current = window.setInterval(() => {
      const next = order[stepRef.current];
      if (showFrontRef.current) {
        // Front is visible → prepare back and fade to it
        setBackSrc(next);
        setShowFront(false);
      } else {
        // Back is visible → update front and fade back
        setFrontSrc(next);
        setShowFront(true);
      }
      stepRef.current = (stepRef.current + 1) % order.length;
    }, 1500);
  };

  const stopCycle = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    // Reset to first thumbnail
    const initial = order[0] ?? p.thumbnails?.[0]!;
    setBackSrc(null);
    setFrontSrc(initial);
    setShowFront(true);
  };

  // Clean up on unmount
  useEffect(() => stopCycle, []);

  // keyboard support
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      className='group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/50 text-left shadow-lg backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/20'
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <div className='relative aspect-[4/3] w-full overflow-hidden'>
        {/* Front layer (image or video) */}
        <MediaLayer src={frontSrc} alt={`${p.title} thumbnail`} visible={showFront} />

        {/* Back layer (image or video) */}
        {backSrc && <MediaLayer src={backSrc} alt={`${p.title} preview`} visible={!showFront} />}

        {/* Gradient overlay */}
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />

        {/* Optional external link icon */}
        {p.url && (
          <a
            href={p.url}
            target='_blank'
            rel='noopener noreferrer'
            title='Open website'
            onClick={(e) => e.stopPropagation()}
            className='absolute right-2 top-2 z-20 inline-flex items-center justify-center rounded-full bg-black/60 p-2 text-white/90 backdrop-blur hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/30'
          >
            <ExternalLink className='h-5 w-5' />
            <span className='sr-only'>Open {p.title} website</span>
          </a>
        )}
      </div>

      <div className='flex flex-1 flex-col gap-3 p-4'>
        <h3 className='line-clamp-2 text-base font-semibold text-white'>{p.title}</h3>
        <p className='line-clamp-3 text-sm text-white/80'>
          {p.description.replace(/<[^>]+>/g, '')}
        </p>
        {p.technologies?.length ? (
          <div className='mt-auto flex flex-wrap gap-2'>
            {p.technologies.map((t, idx) => (
              <span
                key={idx}
                className='rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/85'
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
