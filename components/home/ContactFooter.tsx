'use client';

import { Mail, MapPin, Globe } from 'lucide-react';

import Reveal from './Reveal';
import SocialIcons from '@/components/SocialIcons';

export default function ContactFooter() {
  return (
    <footer className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-6 py-24 md:px-10">
      {/* sacred-geometry eye, centered behind the content (black bg blends in) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/footer-eye.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-0 w-[clamp(340px,44vw,560px)] -translate-x-1/2 -translate-y-1/2 select-none opacity-90 mix-blend-screen"
      />

      <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            Let&#39;s Build Something
            <br />
            Meaningful Together.
          </h2>
          <a
            href="mailto:meowtin@meowtin.com"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-emerald-400/50 hover:bg-white/[0.08]"
          >
            Get in Touch →
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="space-y-4 text-white/70 md:justify-self-end">
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-emerald-400/80" />
              <a href="mailto:meowtin@meowtin.com" className="hover:text-white">
                meowtin@meowtin.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-emerald-400/80" />
              Northern California
            </li>
            <li className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-emerald-400/80" />
              Available for projects worldwide
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="relative z-10 mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">© 2026 Meowtin</p>
        <SocialIcons className="flex items-center gap-5" />
      </div>
    </footer>
  );
}
