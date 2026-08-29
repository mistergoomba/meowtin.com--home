import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/home/Reveal';
import AssetSlot from '@/components/home/AssetSlot';
import CapabilityGlyph from '@/components/development/CapabilityGlyph';
import { SECTIONS, flagships, sectionProjects, type Project } from './config/projects';
import {
  AI_CONFIDENTIALITY,
  AI_POSITIONING,
  AI_SPOTLIGHT_STATS,
  CAPABILITY_GROUPS,
} from './config/ai';

/**
 * The page is organized around one split: work a visitor can go look at, and
 * work I can only tell them about. The AI engagements are all unbranded with no
 * public URL and no shareable screenshot, so they get a spotlight that leads
 * with capability and evidence, and the shipped client work keeps the cards.
 */

/** Large case-study card. */
function FlagshipCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;

  return (
    <Reveal delay={0.05}>
      <a
        href={`/development/${project.slug}`}
        className="group grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-emerald-400/40 md:grid-cols-2"
      >
        <div
          className={`relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[340px] ${
            flip ? 'md:order-2' : ''
          }`}
        >
          <AssetSlot
            src={project.thumbnail}
            alt={project.navTitle}
            label={project.navTitle}
            objectPosition="top"
          />
        </div>

        <div className="flex flex-col justify-center p-7 md:p-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/80">
            {project.category}
          </p>
          <h3 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-wide text-white md:text-3xl">
            {project.navTitle}
          </h3>
          {project.client && (
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/40">
              {project.client}
            </p>
          )}

          {project.problem && (
            <div className="mt-6 border-l-2 border-white/15 pl-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">The problem</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{project.problem}</p>
            </div>
          )}
          {project.result && (
            <div className="mt-4 border-l-2 border-emerald-400/50 pl-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/80">
                The result
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{project.result}</p>
            </div>
          )}

          {project.metric && (
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-300">
              {project.metric}
            </p>
          )}

          <span className="mt-6 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-emerald-400">
            Read the case study →
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/** Compact card — everything in the capability grids. */
function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay}>
      <a
        href={`/development/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <AssetSlot
            src={project.thumbnail}
            alt={project.navTitle}
            label={project.navTitle}
            objectPosition="top"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/80">
            {project.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold uppercase leading-tight tracking-wide text-white">
            {project.navTitle}
          </h3>
          {project.metric && (
            <p className="mt-2 text-xs font-semibold tracking-wide text-emerald-300/90">
              {project.metric}
            </p>
          )}
          <div className="mt-4 flex flex-1 flex-wrap content-end gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-emerald-400">
            View Project →
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export default function DevelopmentPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Development"
        title={
          <>
            I build{' '}
            <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
              software.
            </span>
          </>
        }
        intro="25+ years of full-stack work, shipped end to end — AI agent tooling and machine learning, commerce platforms, and internal tools that people use every day. Available for freelance and contract work."
      >
        {/* Nav. The first chip leaves for the AI page; the rest are anchors. */}
        <div className="flex flex-wrap gap-2">
          <a
            href="/development/ai"
            className="rounded-full border border-emerald-400/40 bg-emerald-400/[0.08] px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-emerald-200 transition-colors hover:border-emerald-400 hover:text-white"
          >
            AI &amp; Agent Engineering
          </a>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:border-emerald-400/50 hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      </PageHero>

      {/* ── AI spotlight ──────────────────────────────────────────────────
          The biggest block on the page, and the one place the AI work
          appears here. The numbers live on this page rather than behind the
          click, because most visitors will never click. */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-12 md:px-10">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-400/[0.06] via-transparent to-transparent">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
              {/* Left: the argument */}
              <div className="p-8 md:p-12">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">
                  Current Focus
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  AI &amp; Agent Engineering
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
                  {AI_POSITIONING}
                </p>

                {/* Capability clusters — the shape of what's behind the click. */}
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {CAPABILITY_GROUPS.map((g) => (
                    <div
                      key={g.id}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center text-emerald-300/80">
                        <CapabilityGlyph name={g.capabilities[0].glyph} className="h-5 w-5" />
                      </span>
                      <span className="text-xs uppercase leading-snug tracking-[0.12em] text-white/70">
                        {g.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-7 max-w-xl text-xs leading-relaxed text-white/40">
                  {AI_CONFIDENTIALITY}
                </p>

                <a
                  href="/development/ai"
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-emerald-400/50 bg-emerald-400/10 px-7 py-4 text-sm uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-400/20"
                >
                  See what I can build →
                </a>
              </div>

              {/* Right: the evidence, then the visual. */}
              <div className="flex flex-col border-t border-white/10 lg:border-l lg:border-t-0">
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  {AI_SPOTLIGHT_STATS.map((s) => (
                    <div key={s.label} className="bg-[#08080a] p-6 text-center">
                      <p className="text-3xl font-bold tracking-tight text-emerald-300">
                        {s.value}
                      </p>
                      <p className="mt-2 text-[10px] uppercase leading-snug tracking-[0.12em] text-white/45">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="relative min-h-[220px] flex-1 overflow-hidden border-t border-white/10">
                  <AssetSlot
                    src="/projects/agent-platform-thumb.webp"
                    alt="Agent platform architecture illustration"
                    label="AI architecture"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Flagship case studies ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-12 md:px-10">
        <Reveal>
          <div className="border-t border-white/10 pt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">
              Work you can go look at
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Selected Case Studies
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              Named clients, live URLs, and a hard number each — one for owning a whole custom
              platform end to end, one for doing it at scale for millions of people.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8">
          {flagships.map((p, i) => (
            <FlagshipCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── Capability sections ───────────────────────────────────────── */}
      {SECTIONS.map((section) => {
        const items = sectionProjects(section.id);
        if (items.length === 0) return null;

        return (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-12 md:px-10"
          >
            <Reveal>
              <div className="border-t border-white/10 pt-10">
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {section.label}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
                  {section.blurb}
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <ProjectCard key={p.slug} project={p} delay={(i % 3) * 0.06} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ── Hire me ───────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 md:px-10">
        <Reveal>
          <div className="rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-400/[0.07] to-transparent p-10 text-center md:p-14">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">
              Available for work
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Got something that needs building?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
              Whether it&#39;s AI tooling, a Shopify or WordPress rescue, a custom internal tool, or a
              site that finally loads fast — I take projects end to end, solo, from data model to
              deploy.
            </p>
            <a
              href="mailto:meowtin@meowtin.com"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-emerald-400/50 bg-emerald-400/10 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-400/20"
            >
              Get in touch →
            </a>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
