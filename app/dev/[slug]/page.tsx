import { notFound } from 'next/navigation';

import PageShell from '@/components/site/PageShell';
import Reveal from '@/components/home/Reveal';
import AssetSlot from '@/components/home/AssetSlot';
import { getProject, projectSlugs, projectImages } from '../config/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project ? `${project.navTitle} - Meowtin's Domain` : "Project - Meowtin's Domain";
  return {
    title,
    description: project?.category
      ? `${project.navTitle} — ${project.category} by Meowtin.`
      : 'A project by Meowtin.',
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const images = projectImages(project);
  const displayTitle = project.title.replace(/\n/g, ' ');

  return (
    <PageShell>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pb-10 pt-40 md:px-10 md:pt-48">
        <Reveal>
          <a
            href="/dev"
            className="text-xs uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
          >
            ← Back to Portfolio
          </a>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-emerald-400/80">
            {project.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            {displayTitle}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-white/50"
              >
                {t}
              </span>
            ))}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-emerald-400/50 hover:bg-white/[0.08]"
            >
              Visit Site →
            </a>
          )}
        </Reveal>
      </section>

      {/* Description */}
      <section className="mx-auto w-full max-w-[760px] px-6 py-6 md:px-10">
        <Reveal>
          <div
            className="text-base leading-relaxed text-white/70 [&_em]:text-white/45 [&_strong]:font-semibold [&_strong]:text-emerald-300"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </Reveal>
      </section>

      {/* Screenshots */}
      {images.length > 0 && (
        <section className="mx-auto w-full max-w-[1100px] px-6 py-12 md:px-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Screenshots</p>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {images.map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="relative aspect-[16/10] w-full">
                    <AssetSlot src={src} alt={`${project.navTitle} screenshot ${i + 1}`} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Footer nav */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pb-8 pt-4 md:px-10">
        <a
          href="/dev"
          className="inline-flex items-center gap-3 rounded-2xl border border-white/15 px-7 py-3.5 text-sm uppercase tracking-[0.25em] text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
        >
          ← All Projects
        </a>
      </section>
    </PageShell>
  );
}
