'use client';

import Reveal from './Reveal';
import AssetSlot from './AssetSlot';

const PROJECTS = [
  { title: 'AI Interview Avatar', desc: 'AI Interview Assistant', focus: 'AI Development', href: '/dev', accent: '#38bdf8', src: '/projects/ai-avatar.webp', label: 'AI Interview Avatar' },
  { title: 'AI Casino Simulator', desc: 'AI Reinforcement Learning', focus: 'AI Development', href: '/dev', accent: '#2dd4bf', src: '/projects/ai-casino.webp', label: 'AI Casino Simulator' },
  { title: 'Warboy Guitars', desc: 'Custom Shop Website', focus: 'Web Development', href: 'https://warboyguitars.com', accent: '#00ffaa', src: '/projects/warboy-site.webp', label: 'Warboy Guitars' },
  { title: 'Apocalyptic Times', desc: 'Music Video', focus: 'Video Production', href: 'https://youtu.be/AHwqPe_nC2A', accent: '#f59e0b', src: '/projects/apocalyptic-times.webp', label: 'Apocalyptic Times' },
  { title: 'Aittala – Ashes', desc: 'Animated Music Video', focus: 'Animation / Video', href: 'https://youtu.be/7ZEgBegWVV4', accent: '#a855f7', src: '/projects/aittala-ashes.webp', label: 'Aittala – Ashes' },
  { title: 'Meowtin Massage', desc: 'Massage Therapy Website', focus: 'Web Development', href: 'https://massage.meowtin.com', accent: '#facc7a', src: '/projects/massage-site.webp', label: 'Meowtin Massage' },
] as const;

export default function SelectedProjects() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Recent Work</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Selected Projects
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <AssetSlot
                  src={p.src}
                  alt={p.title}
                  label={p.label}
                  accent={p.accent}
                  objectPosition="top"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold uppercase leading-tight tracking-wide text-white">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs leading-snug text-white/55">{p.desc}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">{p.focus}</p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <a
            href="/dev"
            className="inline-flex items-center gap-3 rounded-2xl border border-white/15 px-7 py-3.5 text-sm uppercase tracking-[0.25em] text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            View All Projects →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
