import { Flower2, Sparkles, Wind } from 'lucide-react';

import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/home/Reveal';

// NOTE: draft narrative — to be rewritten in Martin's voice.
const CHAPTERS = [
  {
    era: 'Late 2010s',
    title: 'The Ascent',
    accent: '#6ee7b7',
    body: 'A hardcore healing journey — obsessive, all‑in, disciplined to a fault. Diet, movement, breath, cold, everything dialed to eleven. It rebuilt me from the ground up and taught me what the body is capable of when you actually listen to it.',
  },
  {
    era: 'Early 2020s',
    title: 'The Descent',
    accent: '#a855f7',
    body: 'Then the dip into the dark side. The pendulum swung — the same intensity turned inward and downward. It was a necessary shadow to walk through, and it taught me as much as the climb did: that healing without balance is just another kind of extreme.',
  },
  {
    era: 'Now',
    title: 'The Return',
    accent: '#34d399',
    body: 'And now, a new beginning — stepping into the role of healer, fully balanced. Not chasing the extremes anymore, but holding the middle. Bringing everything I learned on both ends to help other people move better, feel better, and find their own equilibrium.',
  },
];

export default function WellnessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Wellness"
        title={
          <>
            The healing <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">path.</span>
          </>
        }
        intro="Three chapters of a journey — the hardcore climb, the shadow, and the balance I hold now as a healer. A library of exercises and breathing techniques is on the way; for now, this is where I've been."
        accent="#34d399"
      />

      {/* Journey chapters */}
      <section className="mx-auto w-full max-w-[1000px] px-6 py-10 md:px-10">
        <div className="space-y-6">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <article
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
                style={{ boxShadow: `inset 0 0 90px -60px ${c.accent}` }}
              >
                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: c.accent }}
                >
                  {c.era}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {c.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Massage / book a session */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-10">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">
                Massage &amp; Bodywork
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Bodywork by Meowtin
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                Therapeutic massage is the through‑line of this whole journey — the place where all
                of it becomes hands‑on. Deeply relaxing, intentional bodywork to ease tension,
                support easier movement, and bring you back to your body.
              </p>
              <a
                href="https://massage.meowtin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-emerald-400/50 hover:bg-white/[0.08]"
              >
                Book a Session →
              </a>
            </div>
            <div className="flex justify-center md:justify-end">
              <Flower2 className="h-40 w-40 text-emerald-300/80 md:h-52 md:w-52" strokeWidth={1} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Coming soon: exercises & breathing library */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-16 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Coming Soon</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            A Living Library
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            {
              Icon: Sparkles,
              title: 'Exercises',
              body: 'A growing, searchable database of movement and mobility work — the exact practices that rebuilt me, organized so you can actually use them.',
              accent: '#34d399',
            },
            {
              Icon: Wind,
              title: 'Breathing Techniques',
              body: 'Breathwork for calm, focus, and recovery — from simple daily resets to deeper protocols, with guidance on when and why to reach for each.',
              accent: '#38bdf8',
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8"
                style={{ boxShadow: `inset 0 0 80px -55px ${f.accent}` }}
              >
                <f.Icon className="h-12 w-12" strokeWidth={1.25} style={{ color: f.accent }} />
                <h3 className="mt-5 text-lg font-semibold uppercase tracking-wide text-white">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
