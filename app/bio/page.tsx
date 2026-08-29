'use client';

import { useEffect, useState } from 'react';

import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/home/Reveal';

function ArtPreview() {
  const [previewImages, setPreviewImages] = useState<Array<{ key: string; img1: string }>>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('/art-index.json');
        const allImages = await res.json();
        const shuffled = allImages.sort(() => 0.5 - Math.random());
        setPreviewImages(shuffled.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch art images:', error);
        setPreviewImages([]);
      }
    }
    fetchImages();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {previewImages.map(({ key, img1 }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            src={`/art/${img1}`}
            alt="Art preview"
            className="w-full rounded-2xl border border-white/10 object-cover"
          />
        ))}
      </div>
      <a
        href="/art"
        className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 px-7 py-3.5 text-sm uppercase tracking-[0.25em] text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
      >
        See All Art →
      </a>
    </div>
  );
}

const DEV_LINKS = [
  { label: 'Short Fuse official band website', href: 'https://shortfusemusic.com' },
  { label: 'Sinwave Live Music Venue official site', href: 'https://sinwavevegas.com' },
  { label: 'Ukulele tabs site', href: 'https://uke.meowtin.com' },
  { label: 'Fart Bubble official band website', href: 'https://fartxbubble.com' },
  { label: 'WARBOY Guitars official site', href: 'https://warboyguitars.com' },
];

const DEV_LOGOS = [
  { src: '/kink-logo.webp', alt: 'Kink.com', href: 'https://kink.com' },
  { src: '/care2-logo.webp', alt: 'Care2.com', href: 'https://care2.com' },
  { src: '/yahoo-logo.webp', alt: 'Yahoo.com', href: 'https://yahoo.com' },
];

const sectionClass = 'mx-auto w-full max-w-[1200px] px-6 py-14 md:px-10';
const cardClass = 'rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12';

export default function BioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Bio"
        title={
          <>
            Who is <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">Meowtin?</span>
          </>
        }
        intro="The home base of Martin Boynton — creative professional, massage therapist, musician, karaoke host, DJ, producer, developer, and all-around good guy."
      />

      {/* ABOUT */}
      <section className={sectionClass}>
        <Reveal>
          <div className={`grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr] ${cardClass}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/me.webp"
              alt="Meowtin"
              className="h-[28rem] w-72 justify-self-center rounded-2xl object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">About Me</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Meowtin&#39;s Domain
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/60">
                Welcome to Meowtin&#39;s Domain, the personal portfolio of Martin Boynton. Who is
                Meowtin besides someone who refers to himself in the third person? A creative
                professional and massage therapist with a passion for performance, music, and visual
                storytelling — an accomplished musician, karaoke host, emcee, DJ, music producer,
                video producer, web &amp; mobile app builder, and music venue owner. Aside from the
                professional accomplishments, Meowtin is well travelled, a lover of people and life,
                a yoga and meditation enthusiast, pro wrestling connoisseur, video game devotee, and
                all-around good guy.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* MASSAGE */}
      <section className={sectionClass}>
        <Reveal>
          <div className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${cardClass}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/massage-card.webp"
              alt="Massage Therapy"
              className="w-full max-w-sm justify-self-center rounded-2xl object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Wellness</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Licensed Massage Therapist
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                Swedish, deep tissue, and myofascial release — intentional bodywork to ease
                tension and support easier movement. CAMTC certified.
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
          </div>
        </Reveal>
      </section>

      {/* KARAOKE */}
      <section className={sectionClass}>
        <Reveal>
          <div className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${cardClass}`}>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Karaoke</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/okie-dokie-logo.webp"
                alt="Okie Dokie Karaoke"
                className="mt-5 w-full max-w-md"
              />
              <p className="mt-6 text-2xl font-semibold text-white md:text-3xl">
                Every Thursday at the DIVE BAR
              </p>
            </div>
            <video
              src="/okie-dokie-reel.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-[42rem] w-80 justify-self-center rounded-2xl object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* DJ */}
      <section className={sectionClass}>
        <Reveal>
          <div className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 ${cardClass}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dj-flyer.webp"
              alt="DJ Flyer"
              className="w-full max-w-sm justify-self-center rounded-2xl object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">DJ / Producer</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Mister Goomba
              </h2>
              <p className="mt-5 text-sm uppercase tracking-[0.15em] text-white/40">DJ Styles</p>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-white/60">
                Dubstep, Trap, Chillstep, Dark Electro, EBSM, and Industrial.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* MUSIC */}
      <section className={sectionClass}>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Music</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">Bands &amp; Projects</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              logo: '/short-fuse-logo.webp',
              alt: 'Short Fuse',
              href: 'https://shortfusemusic.com',
              list: 'PLnegzC5lUH_c55bne_g0ui2KIjizTfkQj',
            },
            {
              logo: '/fart-bubble-logo.webp',
              alt: 'Fart Bubble',
              href: 'https://fartxbubble.com/',
              list: 'PLKKmm8SuBRnMununJdexGWuz19NW48MPU',
            },
          ].map((m, i) => (
            <Reveal key={m.alt} delay={i * 0.06}>
              <div className={`flex flex-col items-center gap-6 ${cardClass}`}>
                <a href={m.href} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.logo}
                    alt={m.alt}
                    className="w-full max-w-xs transition-transform duration-300 hover:scale-105"
                  />
                </a>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/videoseries?list=${m.list}`}
                  title={`${m.alt} Playlist`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full rounded-xl"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ART */}
      <section className={sectionClass}>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Art</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            <a href="/art" className="hover:text-emerald-300">My Art, Enhanced</a>
          </h2>
          <div className="mt-8">
            <ArtPreview />
          </div>
        </Reveal>
      </section>

      {/* DEVELOPMENT */}
      <section className={sectionClass}>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">Development</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Past &amp; Present Projects
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 items-center gap-8 sm:grid-cols-3">
          {DEV_LOGOS.map((l) => (
            <a key={l.alt} href={l.href} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.src}
                alt={l.alt}
                className="mx-auto w-full max-w-[280px] rounded-2xl object-contain transition-transform duration-300 hover:scale-105"
              />
            </a>
          ))}
        </div>
        <ul className="mt-10 space-y-2 text-white/60">
          {DEV_LINKS.map((d) => (
            <li key={d.href}>
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 hover:underline"
              >
                {d.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/development"
          className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/15 px-7 py-3.5 text-sm uppercase tracking-[0.25em] text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
        >
          View Full Portfolio →
        </a>
      </section>
    </PageShell>
  );
}
