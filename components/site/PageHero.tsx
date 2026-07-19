import type { ReactNode } from 'react';

import Reveal from '@/components/home/Reveal';

/**
 * Interior-page hero. Top padding clears the absolute SiteHeader; renders an
 * emerald eyebrow, a large title, an optional intro paragraph, and any extra
 * children (e.g. a CTA button row).
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  accent = '#34d399',
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-10 pt-40 md:px-10 md:pt-48">
      <Reveal>
        <p
          className="text-xs uppercase tracking-[0.3em]"
          style={{ color: `${accent}cc` }}
        >
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {intro}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
    </section>
  );
}
