'use client';

import Image from 'next/legacy/image';
import { ExternalLink } from 'lucide-react';

type Project = {
  title: string;
  logo: string; // path under /public
  url: string;
  blurb: string;
};

const projects: Project[] = [
  {
    title: 'Okie Dokie Karaoke',
    logo: '/okie-dokie-karaoke-logo.png',
    url: 'https://kj.meowtin.com',
    blurb: `Okie Dokie Karaoke is more than just a weekly sing-along—it’s a full-blown community experience where voices of all ranges collide in glorious harmony (and sometimes hilarious chaos). Hosted with infectious energy, quick wit, and a knack for turning any song choice into a crowd favorite, every show celebrates the joy of music in all its forms. From power ballads to punk screams, deep-cut anthems to guilty-pleasure pop, the crowd cheers every performance like it’s the headliner. Whether you’re there to belt, laugh, or just soak up the vibes, Okie Dokie delivers a night of music and unapologetic self-expression.`,
  },
  {
    title: 'Short Fuse',
    logo: '/short-fuse-logo.png',
    url: 'https://shortfusemusic.com',
    blurb: `Short Fuse® is a six-piece, Melodic Death Metal act from the San Francisco area who craft their compositions by skillfully combining melodic riffs with powerful driving beats augmented with electronic background scores and savage upfront vocals. With an arsenal consisting of screamer and intense guttural vocalist Myke "Death" DiBattista, the eerie leads of Scott "Beef" Chavez, Frank Casares' distorted rhythm static, low end thud producer Jim Pegram, the relentless beatings slammed by Dan "Zaffle" Hartnet, and Martin "Meowtin" Boynton's insane symphonic spasms, the musical world is being taken by storm. So turn your stereos up, leave the weak behind, and prepare for the impending blood-bath. There is an epidemic hitting your town; the Short Fuse disease is spreading fast!'`,
  },
  {
    title: 'Fart Bubble',
    logo: '/fart-bubble-logo.png',
    url: 'https://fartxbubble.com',
    blurb: `Fart Bubble is a filthy, irreverent plunge into the bowels of the porno-gore-grind underground—a sonic sewer where blast beats collide with bowel movements and every riff is smeared with unapologetic absurdity. Equal parts offensive and hilarious, the music is laced with fart samples, toilet humor, and lyrical depravity that would make your grandma faint (or laugh—depending on the grandma). It’s chaotic, abrasive, and deliberately disgusting, crafted for those who like their grindcore raw, rancid, and impossible to play in polite company.`,
  },
  {
    title: 'Mister Goomba',
    logo: '/mistergoomba-logo.png',
    url: 'https://soundcloud.com/mistergoomba',
    blurb: `Mister Goomba is my DJ/producer persona—where deep bass, sharp drops, and moody atmospheres collide. Specializing in dubstep, trap, and darker shades of chillstep, I blend my own original productions with carefully curated tracks to create sets that hit as hard emotionally as they do physically. Every mix is built for late-night minds and restless feet, moving seamlessly from hypnotic grooves to chest-rattling drops. It’s a space where melody meets menace, and the dancefloor meets the void.`,
  },
  {
    title: 'Grimslug',
    logo: '/grimslug-logo.png',
    url: 'https://soundcloud.com/mistergoomba/sets/grimslug',
    blurb: `Grimslug is the unholy alliance of Myke “Death” DiBattista and Mister Goomba—a brutally heavy dubstep assault reinforced with the raw power of live drums. Equal parts precision and chaos, Grimslug drops hit like a sledgehammer to the chest, blending face-melting basslines with the physical impact of on-stage percussion. It’s electronic mayhem with a heartbeat, designed to shake walls, melt faces, and leave nothing standing.`,
  },
  {
    title: 'None More Negative',
    logo: '/nmn-logo.png',
    url: 'https://none-more-negative.com',
    blurb: `None More Negative is my tongue-in-cheek tribute to Type O Negative—a band we proudly billed as “the worst Type O Negative tribute” and “equal opportunity annoyers.” Equal parts homage and parody, we channel the doom-laden riffs, brooding atmosphere, and sardonic wit of the originals while adding our own brand of irreverence. Expect deep, droning grooves, playful banter, and a healthy disregard for taking ourselves too seriously.`,
  },
];

export default function MusicProjects() {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold mb-4 text-center'>My Music Projects</h1>

      {projects.map((p) => (
        <article
          key={p.title}
          className='rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-lg overflow-hidden hover:shadow-purple-500/20 transition-shadow'
        >
          <div className='grid grid-cols-1 md:grid-cols-4'>
            {/* Logo (25%) */}
            <div className='relative md:col-span-1 bg-black flex items-center justify-center p-6'>
              <div className='relative w-56 h-56'>
                <Image
                  src={p.logo}
                  alt={`${p.title} logo`}
                  layout='fill'
                  objectFit='contain'
                  priority={false}
                />
              </div>
            </div>

            {/* Content (75%) */}
            <div className='md:col-span-3 p-6 flex items-center'>
              <div className='w-full flex flex-col md:flex-row md:items-center gap-4 md:gap-6'>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold tracking-wide'>{p.title}</h3>
                  <p className='mt-2 text-sm text-gray-300 leading-relaxed'>{p.blurb}</p>
                </div>

                <div className='flex-shrink-0'>
                  <a
                    href={p.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-purple-600/20 hover:bg-purple-600/30 px-4 py-2 text-sm font-semibold transition-colors'
                  >
                    Visit
                    <ExternalLink className='w-4 h-4' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
