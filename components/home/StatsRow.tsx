'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { FileCode2, Mic2, Music, Clapperboard, Globe2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STATS: {
  value: number | null;
  display: string;
  suffix?: string;
  label: string;
  accent: string;
  Icon: LucideIcon;
}[] = [
  { value: 30, display: '30', label: 'Years Building Software', accent: '#2dd4bf', Icon: FileCode2 },
  { value: 1000, suffix: '+', display: '1000+', label: 'Live Shows Performed', accent: '#6ee7b7', Icon: Mic2 },
  { value: 20, suffix: '+', display: '20+', label: 'Years Producing Music', accent: '#a855f7', Icon: Music },
  { value: 100, suffix: '+', display: '100+', label: 'Songs & Videos Produced', accent: '#f59e0b', Icon: Clapperboard },
  { value: null, display: 'Millions', label: 'Users Reached', accent: '#eab308', Icon: Globe2 },
];

function CountUp({ target, suffix, active }: { target: number; suffix?: string; active: boolean }) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduce]);

  return (
    <>
      {n.toLocaleString()}
      {suffix}
    </>
  );
}

export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-10">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:grid-cols-3 lg:grid-cols-5"
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex items-start gap-3">
            <span className="mt-1 shrink-0 text-white/30">
              <s.Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="text-2xl font-bold md:text-3xl" style={{ color: s.accent }}>
                {s.value === null ? (
                  s.display
                ) : (
                  <CountUp target={s.value} suffix={s.suffix} active={inView} />
                )}
              </div>
              <div className="mt-1 text-xs leading-tight text-white/50">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
