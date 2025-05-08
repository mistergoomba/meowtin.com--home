'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Code,
  MicVocal,
  ClipboardPenLine,
  Smartphone,
  Server,
  Database,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileMusic,
  MonitorPlayIcon as TvMinimalPlay,
} from 'lucide-react';
import ElectricityBorder from './ElectricityBorder';
import MiniEye from './MiniEye';

const TronGrid = dynamic(() => import('./TronGrid'), { ssr: false });

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Petition Platform',
    icon: <ClipboardPenLine className='w-5 h-5 text-[#00ffaa]' />,
    screenshots: [
      '/projects/petition-1.png',
      '/projects/petition-2.png',
      '/projects/petition-3.png',
    ],
    technologies: ['JavaScript', 'Node.js', 'Redis', 'REST API', 'PHP', 'MySQL'],
    description:
      'Led the transformation of ThePetitionSite.com from a simple form-based system to a modern, scalable web application. Built a fully custom JavaScript frontend powered by a REST API, engineered backend resilience for viral-scale petition traffic, and developed embeddable petition widgets for widespread sharing across third-party sites. Delivered massive UX and performance improvements used by millions of global users.',
    url: 'https://care2.com',
  },
  {
    id: 2,
    title: 'Custom Microphone Builder',
    icon: <MicVocal className='w-5 h-5 text-[#00ffaa]' />,
    screenshots: ['/projects/custom-mics-1.png'],
    technologies: ['JavaScript', 'Shopify', 'Liquid', 'HTML', 'CSS'],
    description:
      'Built an interactive product configurator for Roswell Audio that allowed users to design custom microphones by selecting components and visual options. The original tool used native JavaScript and HTML5, enabling real-time visual feedback for audio gear customers. This works as a custom page in Shopify.',
    url: 'https://register.roswellproaudio.com/cs/',
  },
  {
    id: 3,
    title: 'AI-Driven Casino Simulator',
    icon: <Server className='w-5 h-5 text-[#00ffaa]' />,
    screenshots: ['/projects/casino-simulator-1.png'],
    technologies: ['React Native', 'Expo', 'NPC Behavior', 'JSON'],
    description:
      'Currently building a private casino simulator in React Native, designed for internal use by a simulation-focused client. Features include a custom JSON scripting engine to control NPC behavior, drag-and-drop tables, play vs edit modes, simulated betting logic, and dynamic UI animations. This project highlights my strengths in game logic design, state management, and building intuitive yet complex interfaces for mobile platforms.',
  },
  {
    id: 4,
    title: 'Chords Database & Lyrics Formatter',
    icon: <FileMusic className='w-5 h-5 text-[#00ffaa]' />,
    screenshots: ['/projects/chords-1.png', '/projects/chords-2.png'],
    technologies: ['React Native', 'Expo', 'JSON', 'Android', 'IOS'],
    description:
      "I'm an avid ukulele player, so I wanted to build a tool to keep track of all the songs I know in order to go play them out in the woods or with friends. The application can display lyrics, randomize, and filter/search. I also built a formatting tool so I can paste in the lyrics and add the chords in the appropriate places. This was build in React Native so I can install it to my phone as an app for offline use.",
  },
  {
    id: 5,
    title: 'Various Music & Product Websites',
    icon: <FileMusic className='w-5 h-5 text-[#00ffaa]' />,
    screenshots: ['/projects/sites-1.png', '/projects/sites-2.png'],
    technologies: ['React', 'Tailwind', 'Node.js', 'MongoDB', 'Express'],
    description:
      'Designed and developed a high-impact band website using React and Next.js for many project including most recently Short Fuse, a melodic death metal band from the San Francisco Bay Area. The site includes embedded YouTube music videos, logo integration, gothic styling, and responsive design that adapts across devices. Built to showcase music, branding, and updates in a bold, immersive format while maintaining performance and maintainability.',
    url: 'https://shortfusemusic.com',
  },
  {
    id: 6,
    title: 'Custom Video Platform Features',
    icon: <TvMinimalPlay className='w-5 h-5 text-[#00ffaa]' />,
    screenshots: ['/projects/video-1.png'],
    technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Docker'],
    description:
      'Designed and developed a high-impact band website using React and Next.js for many project including most recently Short Fuse, a melodic death metal band from the San Francisco Bay Area. The site includes embedded YouTube music videos, logo integration, gothic styling, and responsive design that adapts across devices. Built to showcase music, branding, and updates in a bold, immersive format while maintaining performance and maintainability.',
  },
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [animateCards, setAnimateCards] = useState([false, false, false, false]);
  const [animateFooter, setAnimateFooter] = useState(false);
  const [devOverlayActive, setDevOverlayActive] = useState(false);
  const [devOverlayFadedIn, setDevOverlayFadedIn] = useState(false);
  const [devOverlayExpanded, setDevOverlayExpanded] = useState(false);
  const [artOverlayActive, setArtOverlayActive] = useState(false);
  const [artOverlayFadedIn, setArtOverlayFadedIn] = useState(false);
  const [artOverlayExpanded, setArtOverlayExpanded] = useState(false);
  const [karaokeOverlayActive, setKaraokeOverlayActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // State for tracking hovered cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // State for project detail view
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const devCardRef = useRef<HTMLDivElement>(null);
  const staticVideoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  // Add a ref for the developer overlay container
  const devOverlayRef = useRef<HTMLDivElement>(null);

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

  // Handle image navigation
  const nextImage = () => {
    if (selectedProject !== null) {
      const project = projects.find((p) => p.id === selectedProject);
      if (project) {
        setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length);
      }
    }
  };

  const prevImage = () => {
    if (selectedProject !== null) {
      const project = projects.find((p) => p.id === selectedProject);
      if (project) {
        setCurrentImageIndex((prev) => (prev === 0 ? project.screenshots.length - 1 : prev - 1));
      }
    }
  };

  // Handle card clicks
  const handleDevCardClick = () => {
    // First, position the overlay over the developer card but keep it invisible
    setDevOverlayExpanded(false);
    setDevOverlayFadedIn(false);

    // After a short delay, fade it in
    setTimeout(() => {
      setDevOverlayFadedIn(true);

      // After fade-in completes, expand it
      setTimeout(() => {
        setDevOverlayActive(true);
        setDevOverlayExpanded(true);
      }, 300);
    }, 50);
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
          {/* Overlay Card for Developer */}
          {devOverlayActive && (
            <div
              ref={devOverlayRef}
              className={`bg-black text-white p-6 transition-all ease-in-out border-gray-700 border-2 ${
                devOverlayFadedIn ? 'opacity-100 duration-300' : 'opacity-0 duration-300'
              } ${
                devOverlayExpanded
                  ? 'duration-1000 w-full md:absolute md:h-full md:top-0 md:left-0 md:overflow-y-auto'
                  : isMobile
                  ? 'absolute w-full h-full top-0 left-0'
                  : 'absolute w-[calc(50%-0.75rem)] h-[calc(50%-0.75rem)] top-0 left-0'
              } ${isMobile && devOverlayExpanded ? 'relative' : 'absolute'}`}
              style={{
                zIndex: 30,
                overflowY: isMobile && devOverlayExpanded ? 'visible' : 'auto',
                minHeight: isMobile && devOverlayExpanded ? '100%' : 'auto',
                transition:
                  'opacity 0.3s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out',
              }}
            >
              <div
                className='absolute top-3 right-4 text-2xl cursor-pointer'
                onClick={() => {
                  setSelectedProject(null);
                  setDevOverlayActive(false);
                }}
              >
                ×
              </div>

              {devOverlayExpanded && selectedProject === null && (
                <div className='mt-4'>
                  <h2 className='text-3xl font-bold mb-6 text-center'>My Projects</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className='bg-black/30 p-4 rounded-lg cursor-pointer hover:bg-black/50 transition-colors'
                        onClick={() => {
                          setSelectedProject(project.id);
                          setCurrentImageIndex(0);

                          // Scroll to top of window on mobile
                          if (isMobile) {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }
                        }}
                      >
                        <div className='flex items-center mb-3'>
                          <div className='mr-2'>{project.icon}</div>
                          <h3 className='text-xl font-semibold'>{project.title}</h3>
                        </div>
                        <div className='aspect-video bg-gray-800 mb-3 overflow-hidden rounded'>
                          <Image
                            src={
                              project.screenshots[0] ||
                              '/placeholder.svg?height=200&width=400&query=project screenshot' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg'
                            }
                            alt={project.title}
                            width={400}
                            height={225}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {project.technologies.map((tech, index) => (
                            <span key={index} className='text-[#00ffaa] text-sm'>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Detail View */}
              {devOverlayExpanded && selectedProject !== null && (
                <div
                  className={`${
                    isMobile ? 'relative' : 'absolute inset-0'
                  } bg-black p-0 md:p-6 z-40 ${isMobile ? '' : 'overflow-y-auto'}`}
                >
                  {projects
                    .filter((p) => p.id === selectedProject)
                    .map((project) => (
                      <div key={project.id} className='h-full flex flex-col'>
                        <div className='flex justify-between items-center mb-4'>
                          <div className='flex items-center'>
                            <div className='mr-2'>{project.icon}</div>
                            <h2 className='text-2xl font-bold'>{project.title}</h2>
                          </div>
                          <div className='flex items-center'>
                            {project.url && (
                              <a
                                href={project.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='mr-4 hover:text-[#00ffaa] transition-colors'
                              >
                                <ExternalLink className='w-5 h-5' />
                              </a>
                            )}
                            <div
                              className='cursor-pointer text-2xl absolute top-[-12px] right-[-8px]'
                              onClick={() => setSelectedProject(null)}
                            >
                              ×
                            </div>
                          </div>
                        </div>

                        {/* Screenshot Gallery */}
                        <div className='relative aspect-video bg-gray-800 mb-4 rounded overflow-hidden'>
                          <Image
                            src={
                              project.screenshots[currentImageIndex] ||
                              '/placeholder.svg?height=400&width=800&query=project screenshot' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg'
                            }
                            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                            width={800}
                            height={450}
                            className='w-full h-full object-cover'
                          />

                          {project.screenshots.length > 1 && (
                            <>
                              {/* Navigation Arrows */}
                              <button
                                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevImage();
                                }}
                              >
                                <ChevronLeft className='w-5 h-5 text-white' />
                              </button>
                              <button
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextImage();
                                }}
                              >
                                <ChevronRight className='w-5 h-5 text-white' />
                              </button>

                              {/* Image Counter */}
                              <div className='absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-sm'>
                                {currentImageIndex + 1} / {project.screenshots.length}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Description */}
                        <div className='mb-4'>
                          <h3 className='text-lg font-semibold mb-2'>About</h3>
                          <p className='text-gray-300'>{project.description}</p>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h3 className='text-lg font-semibold mb-2'>Technologies</h3>
                          <div className='flex flex-wrap gap-2'>
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className='bg-[#00ffaa]/10 text-[#00ffaa] px-3 py-1 rounded-full text-sm'
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

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
    ${devOverlayActive ? 'hidden md:block' : ''} 
    ${animateCards[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            {/* The ElectricityBorder component with very high z-index */}
            <div className='absolute inset-0 overflow-visible' style={{ zIndex: 20 }}>
              <ElectricityBorder cardId={0} isHovered={hoveredCard === 0} borderColor='#00ffaa' />
            </div>

            <div className='p-6 h-full flex flex-col relative z-10'>
              <h2 className='text-3xl font-bold text-white mb-6 text-center'>DEVELOPER</h2>
              <div className='grid grid-cols-4 gap-6 flex-grow'>
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
            <div className='p-6 flex flex-col h-full'>
              <h2 className='text-3xl font-bold text-white mb-2'>MUSIC</h2>
              <p className='text-gray-300'>Coming soon...</p>
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
    </div>
  );
}
