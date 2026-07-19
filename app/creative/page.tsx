import { AudioLines, SquarePlay, Eye, Mic2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/home/Reveal';

const WORLDS: {
  title: string;
  body: string;
  href: string;
  external?: boolean;
  accent: string;
  Icon: LucideIcon;
}[] = [
  {
    title: 'Music',
    body: 'Metal, grind, dubstep, and dark electronica — bands, projects, and productions spanning decades.',
    href: '/music',
    accent: '#a855f7',
    Icon: AudioLines,
  },
  {
    title: 'Videos',
    body: 'Music videos, live moments, and AI‑driven animation experiments, edited and directed.',
    href: '/videos',
    accent: '#f59e0b',
    Icon: SquarePlay,
  },
  {
    title: 'Art',
    body: 'Drawings and doodles reimagined — visual journaling brought to life, available on merch.',
    href: '/art',
    accent: '#eab308',
    Icon: Eye,
  },
  {
    title: 'Karaoke',
    body: 'Okie Dokie Karaoke — the weekly community sing‑along. Voices of all ranges welcome.',
    href: 'https://kj.meowtin.com',
    external: true,
    accent: '#38bdf8',
    Icon: Mic2,
  },
];

export default function CreativePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Creative Work"
        title={
          <>
            I create <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">experiences.</span>
          </>
        }
        intro="Music, video, art, and karaoke — the creative side of the universe. Pick a doorway."
        accent="#a855f7"
      />

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {WORLDS.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.06}>
              <a
                href={w.href}
                target={w.external ? '_blank' : undefined}
                rel={w.external ? 'noopener noreferrer' : undefined}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 md:p-10"
                style={{ boxShadow: `inset 0 0 80px -55px ${w.accent}` }}
              >
                <w.Icon
                  className="h-14 w-14 text-white transition-transform duration-300 group-hover:scale-105"
                  strokeWidth={1.25}
                />
                <h2 className="mt-6 text-2xl font-semibold uppercase tracking-wide text-white">
                  {w.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{w.body}</p>
                <span
                  className="mt-6 text-xs uppercase tracking-[0.2em]"
                  style={{ color: w.accent }}
                >
                  {w.external ? 'Visit ↗' : 'Enter →'}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
