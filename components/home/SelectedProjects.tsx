'use client';

import Reveal from './Reveal';
import AssetSlot from './AssetSlot';

// Leads with the flagship dev work, then the creative pieces. Slugs must match
// app/development/config/projects.ts. `src` omitted => red MISSING IMAGE square.
//
// The first tile points at the AI capability page rather than a project page.
// The AI engagements are unbranded with no public URL, so they have no project
// pages to link to — see the note at the top of app/development/config/ai.ts.
const PROJECTS = [
  { title: 'AI & Agent Engineering', desc: 'Tools, Skills & Trust', focus: 'Current Focus', href: '/development/ai', external: false, accent: '#38bdf8', src: '/projects/agent-platform-portrait.webp', label: 'AI & Agent Engineering' },
  { title: 'Petition Platform', desc: 'Viral-Scale Rebuild', focus: 'Web Platform', href: '/development/petition-platform', external: false, accent: '#2dd4bf', src: '/projects/petition-thumb.webp', label: 'Petition Platform' },
  { title: 'Roswell Pro Audio', desc: 'Storefront & Fulfillment Tools', focus: 'Ecommerce', href: '/development/roswell-pro-audio', external: false, accent: '#00ffaa', src: '/projects/custom-mics-thumb.webp', label: 'Roswell Pro Audio' },
  { title: 'Apocalyptic Times', desc: 'Music Video', focus: 'Video Production', href: 'https://youtu.be/AHwqPe_nC2A', external: true, accent: '#f59e0b', src: '/projects/apocalyptic-times.webp', label: 'Apocalyptic Times' },
  { title: 'Aittala – Ashes', desc: 'Animated Music Video', focus: 'Animation / Video', href: 'https://youtu.be/7ZEgBegWVV4', external: true, accent: '#a855f7', src: '/projects/aittala-ashes.webp', label: 'Aittala – Ashes' },
  { title: 'Warboy Guitars', desc: 'Custom Shop Website', focus: 'Web Development', href: '/development/warboy-guitars', external: false, accent: '#00ffaa', src: '/projects/warboy-site.webp', label: 'Warboy Guitars' },
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
              target={p.external ? '_blank' : undefined}
              rel={p.external ? 'noopener noreferrer' : undefined}
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
            href="/development"
            className="inline-flex items-center gap-3 rounded-2xl border border-white/15 px-7 py-3.5 text-sm uppercase tracking-[0.25em] text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            View All Projects →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
