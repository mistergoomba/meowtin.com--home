'use client';

import Reveal from './Reveal';
import AssetSlot from './AssetSlot';

const CARDS = [
  {
    title: 'AI Development',
    body: 'Building AI tools, agents, and simulations that solve real-world problems.',
    cta: 'Explore AI Projects',
    href: '/dev',
    accent: '#38bdf8',
    src: '/focus/ai.webp',
    label: 'AI Development',
  },
  {
    title: 'Meowtin Massage',
    body: 'Therapeutic massage for pain relief, mobility, and whole-body wellness.',
    cta: 'Visit meowtin.com',
    href: 'https://massage.meowtin.com',
    accent: '#facc7a',
    src: '/focus/massage.webp',
    label: 'Massage',
  },
  {
    title: 'Creative Work',
    body: 'Music, videos, art, and visual experiences that inspire and connect.',
    cta: 'View Creative Work',
    href: '/videos',
    accent: '#a855f7',
    src: '/focus/creative.webp',
    label: 'Creative Work',
  },
] as const;

export default function CurrentFocus() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">
          What I&#39;m Focused On
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Current Focus
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.08}>
            <a
              href={card.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] transition-colors duration-300 hover:border-white/25"
            >
              {/* image ~top half, fading into the card's dark interior at the bottom */}
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <AssetSlot src={card.src} alt={card.title} label={card.label} accent={card.accent} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/85 to-transparent" />
              </div>
              {/* text ~bottom half, pulled up so it bleeds into the image */}
              <div className="relative z-10 -mt-[50px] flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-white">
                  {card.title}
                </h3>
                <p className="mt-3 w-1/2 flex-1 text-sm leading-relaxed text-white/60">{card.body}</p>
                <span className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-400 transition-colors group-hover:text-emerald-300">
                  {card.cta} →
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
