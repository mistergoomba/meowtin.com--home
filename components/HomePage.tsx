'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Code, Smartphone, Server, Database, Gamepad2 } from 'lucide-react';
import ElectricityBorder from './ElectricityBorder';
import MiniEye from './MiniEye';

const TronGrid = dynamic(() => import('./TronGrid'), { ssr: false });

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [animateCards, setAnimateCards] = useState([false, false, false, false]);
  const [animateFooter, setAnimateFooter] = useState(false);
  const [artOverlayActive, setArtOverlayActive] = useState(false);
  const [artOverlayFadedIn, setArtOverlayFadedIn] = useState(false);
  const [artOverlayExpanded, setArtOverlayExpanded] = useState(false);
  const [karaokeOverlayActive, setKaraokeOverlayActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [musicOverlayActive, setMusicOverlayActive] = useState(false);

  // State for tracking hovered cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const devCardRef = useRef<HTMLDivElement>(null);
  const staticVideoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  // Handle karaoke card redirect
  useEffect(() => {
    if (karaokeOverlayActive) {
      // Redirect after 1 second
      const redirectTimer = setTimeout(() => {
        window.location.href = 'https://kj.meowtin.com';
      }, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [karaokeOverlayActive]);

  const handleMusicCardClick = () => {
    setMusicOverlayActive(true);
    setTimeout(() => {
      window.location.href = 'https://grave.meowtin.com';
    }, 1000); // Delay to allow fade animation
  };

  // Handle card clicks
  const handleDevCardClick = () => {
    const container = containerRef.current;
    if (!container) return;

    container.classList.add('melting');

    setTimeout(() => {
      router.push('/dev');
    }, 1500); // Wait for melt animation
  };

  const handleArtCardClick = () => {
    // First, position the overlay over the art card but keep it invisible
    setArtOverlayActive(true);
    setArtOverlayExpanded(false);
    setArtOverlayFadedIn(false);

    // After a short delay, fade it in
    setTimeout(() => {
      setArtOverlayFadedIn(true);

      // After fade-in completes, expand it
      setTimeout(() => {
        setArtOverlayExpanded(true);

        // Start navigation to art page during expansion
        // Wait a bit so the expansion is visible before page changes
        setTimeout(() => {
          router.push('/art');
        }, 1000);
      }, 300);
    }, 50);
  };

  const handleKaraokeCardClick = () => {
    // Immediately show the static video overlay
    setKaraokeOverlayActive(true);
  };

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-black flex flex-col'>
      {isLoaded && <TronGrid backgroundImageUrl='/background.png' />}

      {/* Karaoke Static Video Overlay */}
      {karaokeOverlayActive && (
        <div
          className='fixed inset-0 z-50 bg-black m-0 p-0 overflow-hidden'
          style={{ width: '200vw', height: '200vh', top: '-50vh', left: '-50vw' }}
        >
          <video
            ref={staticVideoRef}
            className='absolute inset-0 w-full h-full object-fill'
            style={{ width: '200vw', height: '200vh' }}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src='/static.mp4' type='video/mp4' />
          </video>
        </div>
      )}

      {musicOverlayActive && (
        <div
          className='fixed inset-0 bg-black z-50 opacity-0 animate-fadeIn'
          style={{ animationDuration: '1s', animationFillMode: 'forwards' }}
        />
      )}

      <div className='relative z-10 flex flex-col w-full px-4 pt-6 pb-0 flex-grow h-full'>
        <div
          className={`mb-4 flex justify-center transition-all duration-1000 ease-out transform max-w-[1200px] w-full mx-auto relative ${
            animateHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a href='/'>
            <Image
              src='/logo.png'
              alt='Meowtin Logo'
              width={200}
              height={50}
              className='drop-shadow-lg max-w-xs md:max-w-md'
            />
          </a>
          <div className='absolute top-0 right-0'>
            <MiniEye />
          </div>
        </div>

        <div
          ref={containerRef}
          className='flex-grow relative grid grid-cols-1 md:grid md:grid-cols-2 md:grid-rows-2 gap-6 max-w-[1200px] w-full mx-auto h-full'
        >
          {/* DEVELOPER Card */}
          <div
            ref={devCardRef}
            onMouseEnter={() => !isMobile && setHoveredCard(0)}
            onMouseLeave={() => !isMobile && setHoveredCard(null)}
            onClick={handleDevCardClick}
            className={`relative bg-black/80 border border-gray-700 backdrop-blur-sm shadow-lg 
    flex flex-col transform transition-all duration-1000 ease-out
    hover:shadow-[0_0_25px_rgba(0,255,170,0.3)] hover:scale-[1.02] hover:z-10
    perspective-[1000px] hover:rotate-y-2 hover:rotate-x-2 cursor-pointer
    md:h-auto md:flex-1 md:aspect-auto aspect-square
    ${animateCards[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            {/* The ElectricityBorder component with very high z-index */}
            <div className='absolute inset-0 overflow-visible' style={{ zIndex: 20 }}>
              <ElectricityBorder cardId={0} isHovered={hoveredCard === 0} borderColor='#00ffaa' />
            </div>

            <div className='p-6 h-full flex flex-col relative z-10'>
              <h2 className='text-3xl font-bold text-white mb-6 text-center'>DEVELOPER</h2>
              <div className='grid grid-cols-5 gap-6 flex-grow'>
                <div className='flex flex-col items-center justify-center'>
                  <Code className='w-12 h-12 text-[#00ffaa] mb-2' />
                  <span className='text-white text-sm'>React</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Smartphone className='w-12 h-12 text-[#00ffaa] mb-2' />
                  <span className='text-white text-sm'>React Native</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Server className='w-12 h-12 text-[#00ffaa] mb-2' />
                  <span className='text-white text-sm'>Node.js</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Database className='w-12 h-12 text-[#00ffaa] mb-2' />
                  <span className='text-white text-sm'>Full Stack</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <Gamepad2 className='w-12 h-12 text-[#00ffaa] mb-2' />
                  <span className='text-white text-sm'>Game Dev</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay for Art Card */}
          {artOverlayActive && (
            <div
              className={`absolute overflow-hidden transition-all ease-in-out ${
                artOverlayFadedIn ? 'opacity-100 duration-300' : 'opacity-0 duration-300'
              } ${
                artOverlayExpanded
                  ? 'duration-[3s] w-[1000vw] h-[1000vh] top-[-500vh] right-[-500vh]'
                  : isMobile
                  ? 'w-full h-full top-0 left-0'
                  : 'w-[calc(50%-0.75rem)] h-[calc(50%-0.75rem)] top-0 right-0 md:right-0 md:top-0'
              }`}
              style={{
                zIndex: 30,
                transition:
                  'opacity 0.3s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out',
              }}
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
              <div className='absolute inset-0 bg-black/50'></div>
            </div>
          )}

          {/* ART Card */}
          <div
            onMouseEnter={() => !isMobile && setHoveredCard(1)}
            onMouseLeave={() => !isMobile && setHoveredCard(null)}
            onClick={handleArtCardClick}
            id='artCard'
            className={`relative bg-black/80 border border-gray-700 backdrop-blur-sm shadow-lg 
    flex flex-col transform transition-all duration-1000 ease-out
    hover:shadow-[0_0_25px_rgba(0,170,255,0.3)] hover:scale-[1.02] hover:z-10
    perspective-[1000px] hover:rotate-y-[-2deg] hover:rotate-x-2
    overflow-hidden cursor-pointer
    md:h-auto md:flex-1 md:aspect-auto aspect-square
    ${artOverlayActive ? 'hidden md:block' : ''}
    ${animateCards[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <div className='absolute inset-0 overflow-visible' style={{ zIndex: 20 }}>
              <ElectricityBorder cardId={1} isHovered={hoveredCard === 1} borderColor='#00aaff' />
            </div>
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
          </div>

          {/* KARAOKE Card (Bottom Left) */}
          <div
            onMouseEnter={() => !isMobile && setHoveredCard(2)}
            onMouseLeave={() => !isMobile && setHoveredCard(null)}
            onClick={handleKaraokeCardClick}
            className={`relative bg-black/80 border border-gray-700 backdrop-blur-sm shadow-lg 
              flex flex-col transform transition-all duration-1000 ease-out
              hover:shadow-[0_0_25px_rgba(255,100,255,0.3)] hover:scale-[1.02] hover:z-10
              perspective-[1000px] hover:rotate-y-2 hover:rotate-x-[-2deg]
              overflow-hidden cursor-pointer
              md:h-auto md:flex-1 md:aspect-auto aspect-square
              ${animateCards[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <div className='absolute inset-0 overflow-visible' style={{ zIndex: 20 }}>
              <ElectricityBorder cardId={2} isHovered={hoveredCard === 2} borderColor='#ff64ff' />
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
          </div>

          {/* MUSIC Card (Bottom Right) - Blank for now */}
          <div
            onMouseEnter={() => !isMobile && setHoveredCard(3)}
            onMouseLeave={() => !isMobile && setHoveredCard(null)}
            onClick={handleMusicCardClick}
            className={`relative bg-black/80 border border-gray-700 backdrop-blur-sm shadow-lg 
    flex flex-col transform transition-all duration-1000 ease-out
    hover:shadow-[0_0_25px_rgba(255,200,0,0.3)] hover:scale-[1.02] hover:z-10
    perspective-[1000px] hover:rotate-y-[-2deg] hover:rotate-x-[-2deg] cursor-pointer
    md:h-auto md:flex-1 md:aspect-auto aspect-square
    ${animateCards[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <div className='absolute inset-0 overflow-visible' style={{ zIndex: 20 }}>
              <ElectricityBorder cardId={3} isHovered={hoveredCard === 3} borderColor='#ffc800' />
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
          </div>
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

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
        }

        @keyframes meltDown {
          0% {
            transform: scaleY(1) skewY(0deg);
            opacity: 1;
          }
          50% {
            transform: scaleY(1.2) skewY(5deg);
            opacity: 0.8;
          }
          100% {
            transform: scaleY(5) skewY(30deg);
            opacity: 0;
          }
        }
        .melting {
          animation: meltDown 1.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
