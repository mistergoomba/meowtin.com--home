'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type SlideKind = 'bio' | 'massage' | 'video' | 'dev';

type Slide = {
  kind: SlideKind;
  bg: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
  accent: string; // hex color for CTA glow
};

const SLIDES: Slide[] = [
  {
    kind: 'bio',
    bg: '/spotlight/bio.webp',
    title: '',
    body:
      "Welcome! I'm Martin Boynton aka Meowtin, a creative professional and massage therapist with a passion for performance, music, and visual storytelling. My many hats include accomplished musician, karaoke host, emcee, DJ, music producer, video producer, web site and mobile app builder, and music venue owner. I am well travelled, a lover of people and life, yoga and meditation enthusiast, pro wrestling connoisseur, video game devotee, and all around good guy.",
    cta: 'Learn More',
    href: '#what-i-do',
    accent: '#ffffff',
  },
  {
    kind: 'massage',
    bg: '/spotlight/massage.webp',
    title: 'MASSAGE THERAPIST',
    body:
      'Licensed massage therapist offering deep tissue, Swedish, and therapeutic bodywork. Melt away the stress and reset your body.',
    cta: 'Book a Session',
    href: 'https://massage.meowtin.com',
    external: true,
    accent: '#ff8866',
  },
  {
    kind: 'video',
    bg: '/spotlight/video.webp',
    title: 'VIDEO PRODUCTION',
    body:
      'From AI-driven animated music videos to high-energy artist reels — cinematic stories built frame by frame.',
    cta: 'See the Reel',
    href: '/videos',
    accent: '#ffc800',
  },
  {
    kind: 'dev',
    bg: '/spotlight/dev.webp',
    title: 'DEVELOPER',
    body:
      'Full-stack web and mobile developer. React, React Native, Node. Polished, interactive experiences that ship.',
    cta: 'Browse Projects',
    href: '/development',
    accent: '#00ffaa',
  },
];

const AUTO_ADVANCE_MS = 6000;

type Props = {
  animate?: boolean;
};

export default function SpotlightHero({ animate = true }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, isPaused]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleCta = useCallback(
    (slide: Slide, e: React.MouseEvent<HTMLAnchorElement>) => {
      if (slide.external) return; // let browser handle external
      if (slide.href.startsWith('#')) return; // let browser handle anchor
      e.preventDefault();
      router.push(slide.href);
    },
    [router]
  );

  const active = SLIDES[activeIndex];

  return (
    <section
      className={`relative w-full max-w-6xl mx-auto my-6 md:my-10 overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-1000 ease-out transform ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription='carousel'
      aria-label='Meowtin spotlight'
    >
      <div className='relative min-h-[640px] md:min-h-[560px] w-full'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={active.kind}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' }}
            className='absolute inset-0'
          >
            {/* Background image */}
            <div
              className='absolute inset-0 bg-cover bg-center bg-neutral-900'
              style={{ backgroundImage: `url(${active.bg})` }}
            />
            {/* Dark gradient overlay for legibility */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30' />

            {/* Content */}
            <div className='relative z-10 h-full w-full flex items-center justify-center px-6 py-12 md:py-16'>
              {active.kind === 'bio' ? (
                <div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-5xl w-full'>
                  <img
                    src='/me.webp'
                    alt='Meowtin'
                    className='w-80 h-[20rem] object-cover object-top rounded-2xl shadow-xl shrink-0'
                  />
                  <div className='flex flex-col items-start'>
                    <p className='text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl'>
                      {active.body}
                    </p>
                    <CtaButton slide={active} onClick={handleCta} />
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center text-center max-w-3xl'>
                  <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6'>
                    {active.title}
                  </h2>
                  <p className='text-lg md:text-xl text-gray-200 leading-relaxed mb-8'>
                    {active.body}
                  </p>
                  <CtaButton slide={active} onClick={handleCta} />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div className='absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-3'>
        {SLIDES.map((slide, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={slide.kind}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive ? 'true' : undefined}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3.5 h-3.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}

function CtaButton({
  slide,
  onClick,
}: {
  slide: Slide;
  onClick: (slide: Slide, e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={slide.href}
      target={slide.external ? '_blank' : undefined}
      rel={slide.external ? 'noopener noreferrer' : undefined}
      onClick={(e) => onClick(slide, e)}
      className='mt-6 inline-block px-8 py-3 rounded-full border-2 font-semibold text-white tracking-wide transition-all duration-300 hover:scale-105'
      style={{
        borderColor: slide.accent,
        boxShadow: `0 0 20px ${slide.accent}55`,
      }}
    >
      {slide.cta}
    </a>
  );
}
