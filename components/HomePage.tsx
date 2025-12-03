'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import { Code, Smartphone, Database, Gamepad2 } from 'lucide-react';

import MiniEye from './MiniEye';
import SocialIcons from './SocialIcons';
import HomePageCard from './HomePageCard';

const TronGrid = dynamic(() => import('./TronGrid'), { ssr: false });

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [animateHeroImage, setAnimateHeroImage] = useState(false);
  const [animateHeroText, setAnimateHeroText] = useState(false);
  const [animateSpotlightHeader, setAnimateSpotlightHeader] = useState(false);
  const [animateSpotlightVideo, setAnimateSpotlightVideo] = useState(false);
  const [animateSpotlightProject, setAnimateSpotlightProject] = useState(false);
  const [animateCardsHeader, setAnimateCardsHeader] = useState(false);
  const [animateCards, setAnimateCards] = useState([false, false, false, false]);
  const [animateFooter, setAnimateFooter] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => setAnimateHeader(true), 500);
    setTimeout(() => setAnimateHeroImage(true), 800);
    setTimeout(() => setAnimateHeroText(true), 1000);
    setTimeout(() => setAnimateSpotlightHeader(true), 1050);
    setTimeout(() => setAnimateSpotlightVideo(true), 1100);
    setTimeout(() => setAnimateSpotlightProject(true), 1300);
    setTimeout(() => setAnimateCardsHeader(true), 1400);
    setTimeout(() => setAnimateCards((prev) => [true, prev[1], prev[2], prev[3]]), 1500);
    setTimeout(() => setAnimateCards((prev) => [prev[0], true, prev[2], prev[3]]), 1900);
    setTimeout(() => setAnimateCards((prev) => [prev[0], prev[1], true, prev[3]]), 2300);
    setTimeout(() => setAnimateCards((prev) => [prev[0], prev[1], prev[2], true]), 2700);
    setTimeout(() => setAnimateFooter(true), 3100);

    // Preload the static video
    if (typeof window !== 'undefined') {
      const preloadVideo = document.createElement('video');
      preloadVideo.src = '/static.mp4';
      preloadVideo.muted = true;
      preloadVideo.preload = 'auto';
      preloadVideo.load();
    }
  }, []);

  return (
    <div className='relative w-full bg-black flex flex-col font-share-tech'>
      {isLoaded && <TronGrid backgroundImageUrl='/background.png' />}

      <div className='relative z-10 flex flex-col w-full px-4 py-0'>
        <div
          className={`mb-1 grid grid-cols-3 items-start w-full max-w-[1200px] mx-auto relative transition-all duration-1000 ease-out transform ${
            animateHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left: Social Media Icons */}
          <div className='flex items-start justify-start pt-6'>
            <SocialIcons className='hidden md:flex space-x-4' />
          </div>

          {/* Center: Logo */}
          <div className='flex flex-col items-center justify-center pt-2'>
            <a href='/'>
              <Image
                src='/logo.png'
                alt='Meowtin Logo'
                width={200}
                height={120}
                className='drop-shadow-lg max-w-xs md:max-w-md'
              />
            </a>

            {/* Mobile: Social Icons Below Logo */}
            <div className='mt-4 md:hidden'>
              <SocialIcons className='flex justify-center space-x-4' />
            </div>
          </div>

          {/* Right: MiniEye */}
          <div className='flex justify-end'>
            <MiniEye />
          </div>
        </div>

        {/* Hero Section */}
        <section className='flex flex-col md:flex-row items-center justify-center py-8 md:py-12 px-4 text-left max-w-6xl mx-auto'>
          <img
            src='/me.png'
            alt='Meowtin'
            className={`w-72 h-[16.8rem] object-cover object-top rounded-2xl mb-6 md:mb-0 md:mr-12 shadow-xl transition-all duration-1000 ease-out transform ${
              animateHeroImage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          />
          <div
            className={`transition-all duration-1000 ease-out transform ${
              animateHeroText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <p className='text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl'>
              Welcome to Meowtin&#39;s Domain, the home page and personal portfolio of Martin
              Boynton. Who is Meowtin besides someone who refers to himself in the third person?
              Well, he is a creative professional with a passion for performance, music, and visual
              storytelling. He is an accomplished musician, karaoke host, emcee, DJ, music producer,
              video producer, web site and mobile app builder, and music venue owner. Aside from his
              professional accomplishments, Meowtin prides himself as well travelled, a lover of
              people and life, yoga and meditation enthusiast, pro wrestling connoisseur, video game
              devotee, and all around good guy.
            </p>
          </div>
        </section>

        {/* Spotlight Section */}
        <section className='py-8 md:py-12 px-4 max-w-6xl mx-auto w-full'>
          <h2
            className={`text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-8 text-center transition-all duration-1000 ease-out transform ${
              animateSpotlightHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            Recent Projects
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Video Spotlight */}
            <div
              className={`rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-1000 ease-out transform ${
                animateSpotlightVideo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <div className='aspect-video w-full overflow-hidden'>
                <iframe
                  className='w-full h-full'
                  src='https://www.youtube.com/embed/AHwqPe_nC2A?rel=0'
                  title='Short Fuse - Apocalyptic Times'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  Short Fuse - Apocalyptic Times
                </h3>
                <p className='text-base text-gray-300 leading-relaxed mb-4'>
                  Manually stitched together in Premiere using 122 AI-generated clips derived from
                  Short Fuse artwork, my own photos, and meticulously curated images.
                </p>
                <a
                  href='/videos'
                  className='text-base text-purple-400 hover:text-purple-300 transition-colors underline'
                >
                  View All Videos →
                </a>
              </div>
            </div>

            {/* Project Spotlight */}
            <div
              className={`rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-1000 ease-out transform ${
                animateSpotlightProject ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <div className='relative aspect-video w-full overflow-hidden'>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className='w-full h-full object-cover opacity-90'
                >
                  <source src='/projects/warboy-video-small.mp4' type='video/mp4' />
                </video>
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-white mb-2'>
                  Warboy Guitars Custom Shop
                </h3>
                <p className='text-base text-gray-300 leading-relaxed mb-4'>
                  Designed and developed the official site for Warboy Guitars, a boutique builder
                  crafting post‑apocalyptic, battle‑scarred instruments with serious stage presence.
                </p>
                <div className='flex gap-4'>
                  <a
                    href='https://warboyguitars.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-base text-purple-400 hover:text-purple-300 transition-colors underline'
                  >
                    Visit Site →
                  </a>
                  <a
                    href='/dev'
                    className='text-base text-purple-400 hover:text-purple-300 transition-colors underline'
                  >
                    View All Projects →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Cards Section */}
        <section className='py-8 md:py-12 px-4 max-w-[1200px] mx-auto w-full'>
          <h2
            className={`text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-8 text-center transition-all duration-1000 ease-out transform ${
              animateCardsHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            What I Do
          </h2>
          <div
            ref={containerRef}
            className='relative grid grid-cols-1 md:grid md:grid-cols-2 md:grid-rows-2 gap-6 pb-8'
          >
            {/* DEVELOPER Card */}
            <HomePageCard
              onClick={() => router.push('/dev')}
              hoverShadowColor='hover:shadow-[0_0_25px_rgba(0,255,170,0.3)]'
              animateCards={animateCards}
              cardId={0}
              laserColor='#00ffaa'
            >
              <div className='p-6 h-full flex flex-col relative z-10'>
                <h2 className='text-3xl font-bold text-white mb-6 text-center'>DEVELOPER</h2>
                <div className='grid grid-cols-4 gap-6 flex-grow'>
                  <div className='flex flex-col items-center justify-center text-center'>
                    <Code className='w-12 h-12 text-[#00ffaa] mb-2' />
                    <span className='text-white text-sm'>React</span>
                  </div>
                  <div className='flex flex-col items-center justify-center text-center'>
                    <Smartphone className='w-12 h-12 text-[#00ffaa] mb-2' />
                    <span className='text-white text-sm'>React Native</span>
                  </div>
                  <div className='flex flex-col items-center justify-center text-center'>
                    <Database className='w-12 h-12 text-[#00ffaa] mb-2' />
                    <span className='text-white text-sm'>Full Stack</span>
                  </div>
                  <div className='flex flex-col items-center justify-center text-center'>
                    <Gamepad2 className='w-12 h-12 text-[#00ffaa] mb-2' />
                    <span className='text-white text-sm'>Game Dev</span>
                  </div>
                </div>
              </div>
            </HomePageCard>

            {/* VIDEO PRODUCTION Card */}
            <HomePageCard
              onClick={() => router.push('/videos')}
              hoverShadowColor='hover:shadow-[0_0_25px_rgba(255,200,0,0.3)]'
              animateCards={animateCards}
              cardId={2}
              laserColor='#ffc800'
            >
              <div className='absolute inset-0 w-full h-full flex items-center justify-center'>
                <video autoPlay muted loop playsInline className='w-full h-full object-cover'>
                  <source src='/reel.mp4' type='video/mp4' />
                </video>
              </div>
              <div className='relative z-10 flex items-center justify-center h-full p-6 bg-black/40'>
                <h2 className='text-3xl font-bold text-white text-center'>VIDEO PRODUCTION</h2>
              </div>
            </HomePageCard>

            {/* MUSIC Card */}
            <HomePageCard
              onClick={() => router.push('/music')}
              hoverShadowColor='hover:shadow-[0_0_25px_rgba(255,100,255,0.3)]'
              animateCards={animateCards}
              cardId={3}
              laserColor='#ff64ff'
            >
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  src='/music-card.webp'
                  alt='Music'
                  layout='fill'
                  objectFit='cover'
                  className='opacity-90'
                />
              </div>
              <div className='p-6 flex flex-col h-full relative z-10 mt-auto bg-gradient-to-t from-black/80 to-transparent justify-end'>
                <h2 className='text-3xl font-bold text-white text-center w-full mb-2'>
                  MUSICIAN / KARAOKE HOST
                </h2>
              </div>
            </HomePageCard>

            {/* ART Card */}
            <HomePageCard
              onClick={() => router.push('/art')}
              hoverShadowColor='hover:shadow-[0_0_25px_rgba(0,170,255,0.3)]'
              animateCards={animateCards}
              cardId={1}
              laserColor='#00aaff'
            >
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  src='/art/02 learn to swim-1.webp'
                  alt='Art'
                  layout='fill'
                  objectFit='cover'
                  objectPosition='top'
                  className='opacity-90'
                />
              </div>
              <div className='p-6 flex flex-col h-full relative z-10 mt-auto bg-gradient-to-t from-black/80 to-transparent'>
                <h2 className='text-3xl font-bold text-white mb-2 mt-auto'>ART</h2>
              </div>
            </HomePageCard>
          </div>
        </section>

        {/* Footer */}
        <div
          className={`text-center text-gray-500 py-4 transition-all duration-1000 ease-out transform ${
            animateFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          © 2025 MEOWTIN
        </div>
      </div>
    </div>
  );
}
