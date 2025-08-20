'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { projects } from '../config/projects';
import ProjectOverlay from './ProjectOverlay';
import { CardProject } from '../types/projects';

export default function ProjectsSection() {
  const items: CardProject[] = projects.map((p) => ({
    ...p,
    // prefer an explicit thumbnail; otherwise fall back to first screenshot/placeholder
    thumbnail: p.thumbnail ?? p.screenshots?.[0] ?? '/placeholder.svg',
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
  // Build the cycle list: images only (no videos), then skip the first image
  const imagesOnly = (p.screenshots ?? []).filter((src) => /\.(png|jpe?g|webp)$/i.test(src));
  const cycleList = imagesOnly.slice(1); // ignore the first image
  const canCycle = cycleList.length > 0;

  // Two-layer crossfade
  const [frontSrc, setFrontSrc] = useState(p.thumbnail!);
  const [backSrc, setBackSrc] = useState<string | null>(null);
  const [showFront, setShowFront] = useState(true);

  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const showFrontRef = useRef(showFront);

  useEffect(() => {
    showFrontRef.current = showFront;
  }, [showFront]);

  // Reset to the provided thumbnail if data changes
  useEffect(() => {
    setFrontSrc(p.thumbnail!);
    setBackSrc(null);
    setShowFront(true);
  }, [p.thumbnail]);

  const startCycle = () => {
    if (!canCycle) return;

    // Thumbnail first, then other screenshots (images only)
    const order = [p.thumbnail!, ...cycleList];
    stepRef.current = 0;

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
    // Reset to thumbnail
    setBackSrc(null);
    setFrontSrc(p.thumbnail!);
    setShowFront(true);
  };

  // Clean up on unmount
  useEffect(() => stopCycle, []);

  return (
    <button
      className='group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/50 text-left shadow-lg backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/20'
      onClick={onClick}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <div className='relative aspect-[4/3] w-full overflow-hidden'>
        {/* Front layer */}
        <Image
          src={frontSrc}
          alt={`${p.title} thumbnail`}
          fill
          className={`absolute inset-0 object-cover transition-opacity duration-500 ${
            showFront ? 'opacity-100' : 'opacity-0'
          }`}
          sizes='(max-width: 640px) 100vw, (max-width: 1536px) 33vw, 300px'
          priority={false}
        />
        {/* Back layer */}
        {backSrc && (
          <Image
            src={backSrc}
            alt={`${p.title} preview`}
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-500 ${
              showFront ? 'opacity-0' : 'opacity-100'
            }`}
            sizes='(max-width: 640px) 100vw, (max-width: 1536px) 33vw, 300px'
            priority={false}
          />
        )}

        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
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
    </button>
  );
}
