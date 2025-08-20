'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { projects } from '../config/projects';
import ProjectOverlay from './ProjectOverlay';
import { CardProject } from '../types/projects';

export default function ProjectsSection() {
  const items: CardProject[] = projects.map((p) => ({
    ...p,
    thumbnail: p.screenshots?.[0] ?? '/placeholder.svg',
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
            <button
              key={i}
              className='group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/50 text-left shadow-lg backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/20'
              onClick={() => setActive(i)}
            >
              <div className='relative aspect-[4/3] w-full overflow-hidden'>
                <Image
                  src={p.thumbnail!}
                  alt={`${p.title} thumbnail`}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-[1.06]'
                  sizes='(max-width: 640px) 100vw, (max-width: 1536px) 33vw, 300px'
                />
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
