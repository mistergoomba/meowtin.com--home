'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Code, Smartphone, Database, Gamepad2 } from 'lucide-react';

import ElectricityBorder from './ElectricityBorder';
import MiniEye from './MiniEye';
import SocialIcons from './SocialIcons';
import HomePageCard from './HomePageCard';

const TronGrid = dynamic(() => import('./TronGrid'), { ssr: false });

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [animateCards, setAnimateCards] = useState([false, false, false, false]);
  const [animateFooter, setAnimateFooter] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => setAnimateHeader(true), 500);
    setTimeout(() => setAnimateCards((prev) => [true, prev[1], prev[2], prev[3]]), 1200);
    setTimeout(() => setAnimateCards((prev) => [prev[0], true, prev[2], prev[3]]), 1600);
    setTimeout(() => setAnimateCards((prev) => [prev[0], prev[1], true, prev[3]]), 2000);
    setTimeout(() => setAnimateCards((prev) => [prev[0], prev[1], prev[2], true]), 2400);
    setTimeout(() => setAnimateFooter(true), 2800);

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
    <div className='relative min-h-screen w-full overflow-hidden bg-black flex flex-col'>
      {isLoaded && <TronGrid backgroundImageUrl='/background.png' />}

      <div className='relative z-10 flex flex-col w-full px-4 pt-6 pb-0 flex-grow h-full'>
        <div
          className={`mb-4 grid grid-cols-3 items-start w-full max-w-[1200px] mx-auto relative transition-all duration-1000 ease-out transform ${
            animateHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left: Social Media Icons */}
          <div className='flex items-start justify-start'>
            <SocialIcons className='hidden md:flex space-x-4' />
          </div>

          {/* Center: Logo */}
          <div className='flex flex-col items-center justify-center'>
            <a href='/'>
              <Image
                src='/logo.png'
                alt='Meowtin Logo'
                width={200}
                height={50}
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

        <div
          ref={containerRef}
          className='flex-grow relative grid grid-cols-1 md:grid md:grid-cols-2 md:grid-rows-2 gap-6 max-w-[1200px] w-full mx-auto h-full'
        >
          {/* DEVELOPER Card */}
          <HomePageCard
            onClick={() => router.push('/dev')}
            hoverShadowColor='0,255,170,0.3'
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

          {/* ART Card */}
          <HomePageCard
            onClick={() => router.push('/art')}
            hoverShadowColor='0,170,255,0.3'
            animateCards={animateCards}
            cardId={1}
            laserColor='#00aaff'
          >
            <div className='absolute inset-0 w-full h-full'>
              <Image
                src='/art/02 learn to swim-1.png'
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

          {/* KARAOKE Card (Bottom Left) */}
          <HomePageCard
            onClick={() => (window.location.href = 'https://kj.meowtin.com')}
            hoverShadowColor='255,100,255,0.3'
            animateCards={animateCards}
            cardId={2}
            laserColor='#ff64ff'
          >
            <div className='absolute inset-0 overflow-visible' style={{ zIndex: 20 }}>
              <ElectricityBorder cardId={2} borderColor='#ff64ff' />
            </div>
            <div className='absolute inset-0 w-full h-full flex items-center justify-center'>
              <video autoPlay muted loop playsInline className='w-full h-full object-cover'>
                <source src='/reel.mp4' type='video/mp4' />
              </video>
            </div>
            <div className='relative z-10 flex items-center justify-center h-full p-6'>
              <Image
                src='/okie-dokie-logo.png'
                alt='Okie Dokie Karaoke'
                width={300}
                height={150}
                className='drop-shadow-lg max-w-[80%]'
              />
            </div>
          </HomePageCard>

          {/* MUSIC Card (Bottom Right) - Blank for now */}
          <HomePageCard
            onClick={() => (window.location.href = 'https://grave.meowtin.com')}
            hoverShadowColor='255,200,0,0.3'
            animateCards={animateCards}
            cardId={3}
            laserColor='#ffc800'
          >
            <div className='absolute inset-0 overflow-visible' style={{ zIndex: 20 }}>
              <ElectricityBorder cardId={3} borderColor='#ffc800' />
            </div>
            <div className='absolute inset-0 w-full h-full'>
              <Image
                src='/music-card.png'
                alt='Music'
                layout='fill'
                objectFit='cover'
                className='opacity-90'
              />
            </div>
            <div className='p-6 flex flex-col h-full relative z-10 mt-auto bg-gradient-to-t from-black/80 to-transparent justify-end'>
              <h2 className='text-3xl font-bold text-white text-center w-full mb-2'>MUSIC</h2>
            </div>
          </HomePageCard>
        </div>

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
