'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import SocialIcons from '@/components/SocialIcons';

const NAV = [
  { label: 'Developer', href: '/dev' },
  { label: 'Videos', href: '/videos' },
  { label: 'Music', href: '/music' },
  { label: 'Art', href: '/art' },
  { label: 'Massage', href: 'https://massage.meowtin.com' },
  { label: 'Bio', href: '/bio' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        {/* Left: wordmark */}
        <a href="/" className="shrink-0" aria-label="Meowtin home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt="Meowtin"
            className="h-auto w-[120px] drop-shadow-[0_0_12px_rgba(0,0,0,0.8)] md:w-[150px]"
          />
        </a>

        {/* Right: socials + menu toggle */}
        <div className="flex items-center gap-5">
          <SocialIcons className="hidden items-center gap-4 md:flex" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Slide-down menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[1400px] px-6 md:px-10"
          >
            <div className="rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl">
              <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-center border-t border-white/10 pt-4 md:hidden">
                <SocialIcons className="flex items-center gap-5" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
