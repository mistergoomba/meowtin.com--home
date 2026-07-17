'use client';

import { Code2, Guitar, Disc3, Briefcase, Sprout, HandHeart, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import Reveal from './Reveal';

const MILESTONES: { year: string; body: string; Icon: LucideIcon }[] = [
  { year: '1999', body: 'Started coding and building websites.', Icon: Code2 },
  { year: '2000', body: 'My first band.', Icon: Guitar },
  { year: '2005', body: 'Produced my first album.', Icon: Disc3 },
  { year: '2006', body: 'Started at Care2.', Icon: Briefcase },
  { year: '2016', body: 'Started my healing journey.', Icon: Sprout },
  { year: '2026', body: 'Became massage therapist.', Icon: HandHeart },
  { year: 'Today', body: 'Building, creating, and helping people.', Icon: Star },
];

export default function JourneyTimeline() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">My Journey</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          The Path So Far
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="relative mt-14">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent lg:block" />
          <ol className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 lg:grid-cols-7 lg:gap-y-0">
            {MILESTONES.map((m) => (
              <li key={m.year} className="flex flex-col items-center px-2 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-emerald-400/40 bg-black text-emerald-300 shadow-[0_0_20px_-6px_rgba(52,211,153,0.6)]">
                  <m.Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 text-sm font-semibold text-emerald-300">{m.year}</span>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
