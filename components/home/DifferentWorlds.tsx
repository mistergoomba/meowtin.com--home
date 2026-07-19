'use client';

import { CodeXml, Flower2, AudioLines, SquarePlay, Eye } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import Reveal from './Reveal';

const WORLDS: { title: string; body: string; href: string; accent: string; Icon: LucideIcon }[] = [
  { title: 'Developer', body: 'Building systems, web apps, and AI solutions.', href: '/dev', accent: '#2dd4bf', Icon: CodeXml },
  { title: 'Wellness', body: 'Helping people move better and feel better.', href: '/wellness', accent: '#6ee7b7', Icon: Flower2 },
  { title: 'Music', body: 'Creating sound, atmosphere, and emotion.', href: '/music', accent: '#a855f7', Icon: AudioLines },
  { title: 'Video', body: 'Telling stories through motion and visuals.', href: '/videos', accent: '#f59e0b', Icon: SquarePlay },
  { title: 'Art', body: 'Exploring the visual language of ideas.', href: '/art', accent: '#eab308', Icon: Eye },
];

export default function DifferentWorlds() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Explore My World</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Different Worlds. <span className="text-white/50">One Vision.</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {WORLDS.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06}>
            <a
              href={w.href}
              className="group flex h-full flex-col items-center rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
              style={{ boxShadow: `inset 0 0 60px -40px ${w.accent}` }}
            >
              <w.Icon
                className="h-16 w-16 text-white transition-transform duration-300 group-hover:scale-105"
                strokeWidth={1.25}
              />
              <h3 className="mt-5 text-lg font-semibold uppercase tracking-wide text-white">{w.title}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-white/55">{w.body}</p>
              <span className="mt-4 text-xs uppercase tracking-[0.2em]" style={{ color: w.accent }}>
                Enter →
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
