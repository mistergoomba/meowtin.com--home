import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/home/Reveal';
import AssetSlot from '@/components/home/AssetSlot';
import { projects } from './config/projects';

export default function DevPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Developer Portfolio"
        title={
          <>
            I build <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">software.</span>
          </>
        }
        intro="25+ years of full‑stack work — web apps, mobile apps, AI tools, and the occasional casino simulator. A selection of projects across the years."
      />

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <a
                href={`/dev/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <AssetSlot
                    src={p.thumbnail}
                    alt={p.navTitle}
                    label={p.navTitle}
                    objectPosition="top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/80">
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold uppercase leading-tight tracking-wide text-white">
                    {p.navTitle}
                  </h3>
                  <div className="mt-4 flex flex-1 flex-wrap content-end gap-1.5">
                    {p.technologies.slice(0, 4).map((t) => (
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
          ))}
        </div>
      </section>
    </PageShell>
  );
}
