import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/home/Reveal';
import AssetSlot from '@/components/home/AssetSlot';
import CapabilityGlyph from '@/components/development/CapabilityGlyph';
import {
  AI_CONFIDENTIALITY,
  AI_DIAGRAMS,
  AI_ENGAGEMENTS,
  AI_POSITIONING,
  AI_STACK,
  AI_STATS,
  CAPABILITY_GROUPS,
  type Capability,
} from '../config/ai';

const title = 'AI & Agent Engineering - Meowtin';
const description =
  'Agent tooling and skills, anti-fabrication verification, distributed reinforcement learning, and local LLM deployment — what I can build, with the numbers behind it.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://meowtin.com/development/ai',
    siteName: "Meowtin's Domain",
    locale: 'en_US',
    type: 'website',
  },
};

/** One ability card: glyph, claim, explanation, and a number where there is one. */
function CapabilityCard({ capability, delay }: { capability: Capability; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-emerald-400/35 md:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300/90 transition-colors duration-300 group-hover:border-emerald-400/50 group-hover:text-emerald-300">
            <CapabilityGlyph name={capability.glyph} className="h-6 w-6" />
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug tracking-wide text-white">
            {capability.title}
          </h3>
        </div>

        <p className="mt-5 flex-1 text-sm leading-relaxed text-white/60">{capability.body}</p>

        {capability.evidence && (
          <p className="mt-5 border-t border-white/[0.08] pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300/85">
            {capability.evidence}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export default function AiCapabilityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Development / AI"
        title={
          <>
            AI &amp; Agent{' '}
            <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Engineering.
            </span>
          </>
        }
        intro={AI_POSITIONING}
      >
        <div className="flex flex-wrap gap-2">
          {CAPABILITY_GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:border-emerald-400/50 hover:text-white"
            >
              {g.label}
            </a>
          ))}
        </div>
      </PageHero>

      {/* ── Evidence band ──────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-5">
            {AI_STATS.map((s) => (
              <div key={s.label} className="bg-[#08080a] p-6 text-center">
                <p className="text-3xl font-bold tracking-tight text-emerald-300 md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] uppercase leading-snug tracking-[0.12em] text-white/45">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Where the work came from ───────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
        <Reveal>
          <div className="border-t border-white/10 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Where this comes from
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
              {AI_CONFIDENTIALITY}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AI_ENGAGEMENTS.map((e, i) => (
            <Reveal key={e.kind} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/80">
                  {e.kind}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{e.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Capability groups ──────────────────────────────────────────── */}
      {CAPABILITY_GROUPS.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-10 md:px-10"
        >
          <Reveal>
            <div className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {group.label}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">{group.blurb}</p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {group.capabilities.map((c, i) => (
              <CapabilityCard key={c.id} capability={c} delay={(i % 2) * 0.06} />
            ))}
          </div>
        </section>
      ))}

      {/* ── Architecture illustrations ─────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
        <Reveal>
          <div className="border-t border-white/10 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Architecture
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
              Illustrations of the ideas, not captures of the software — the products are
              unbranded, and passing concept art off as a screenshot would be a strange move on a
              page about being careful with the truth.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AI_DIAGRAMS.map((d, i) => (
            <Reveal key={d.src} delay={i * 0.06}>
              <figure className="h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="relative aspect-[16/10] w-full">
                  <AssetSlot src={d.src} alt={d.caption} label="Architecture diagram" />
                </div>
                <figcaption className="p-5 text-xs leading-relaxed text-white/45">
                  {d.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Stack ──────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
        <Reveal>
          <div className="border-t border-white/10 pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">The stack</h2>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {AI_STACK.map((s, i) => (
            <Reveal key={s.group} delay={(i % 3) * 0.05}>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/80">
                  {s.group}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-10 md:px-10">
        <Reveal>
          <div className="rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-400/[0.07] to-transparent p-10 text-center md:p-14">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">
              Available for work
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Every robot army needs a human.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
              I&#39;m the one who builds it, teaches it the job, and makes sure it can&#39;t knock
              anything over. Agent fleets, tool and skill layers, ML systems, or the whole product
              end to end — happy to walk through any of it in detail.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/development"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/15 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                ← All development work
              </a>
              <a
                href="mailto:meowtin@meowtin.com"
                className="inline-flex items-center gap-3 rounded-2xl border border-emerald-400/50 bg-emerald-400/10 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-400/20"
              >
                Get in touch →
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
