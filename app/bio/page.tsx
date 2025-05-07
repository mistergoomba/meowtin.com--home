'use client';

import { useEffect, useState } from 'react';

import AnimatedSection from '@/components/AnimatedSection';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

/*export const metadata = {
  title: "Who Is Meowtin? - Meowtin's Domain",
  description: 'A collection of works by Meowtin, a software engineer and artist',
  openGraph: {
    title: "Who Is Meowtin? - Meowtin's Domain",
    description: 'A collection of works by Meowtin, a software engineer and artist',
    url: 'https://meowtin.com/bio',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image.png',
        width: 1200,
        height: 630,
        alt: 'Who Is Meowtin?',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Who Is Meowtin? - Meowtin's Domain",
    description: 'A collection of works by Meowtin, a software engineer and artist',
    images: ['https://meowtin.com/share-image.png'],
  },
};
*/

function ArtPreview() {
  const [previewImages, setPreviewImages] = useState<Array<{ key: string; img1: string }>>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('/art-index.json');
        const allImages = await res.json();

        const shuffled = allImages.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setPreviewImages(selected);
      } catch (error) {
        console.error('Failed to fetch art images:', error);
        setPreviewImages([]);
      }
    }

    fetchImages();
  }, []);

  return (
    <section className='flex flex-col items-center justify-center py-20 px-4 max-w-7xl mx-auto w-full space-y-12 rounded-2xl shadow-inner shadow-purple-900/60 bg-[linear-gradient(to_right,_#111827,_#000000,_#111827)]'>
      <div className='text-center'>
        <h2 className='text-3xl md:text-5xl font-bold text-gray-100'>
          <a href='/art'>My Art, Enhanced</a>
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl justify-items-center'>
        {previewImages.map(({ key, img1 }) => (
          <img
            key={key}
            src={`/art/${img1}`}
            alt='Art preview'
            className='w-full max-w-[400px] object-cover rounded-2xl transition-transform duration-300 drop-shadow-lg'
          />
        ))}
      </div>

      <a
        href='/art'
        className='inline-block px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 font-semibold rounded-full transition'
      >
        See All Images
      </a>
    </section>
  );
}

export default function BioPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-[#0e001a] via-purple-950 to-purple-900 text-white font-sans space-y-12'>
      <div className='w-full bg-gradient-to-b from-[#0e001a] via-purple-950 to-purple-900 text-white font-sans space-y-12'>
        {/* HEADER */}
        <AnimatedSection delay={0.1}>
          <header className='flex flex-col items-center justify-center py-8 space-y-8'>
            <a href='/'>
              <img
                src='/logo.png'
                alt='Meowtin Logo'
                className='w-96 h-auto object-contain drop-shadow-lg max-w-xs md:max-w-none'
              />
            </a>

            <div className='flex space-x-6 mt-4'>
              <a
                href='https://www.facebook.com/mistergoombaremix'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebookF className='w-12 h-12 text-gray-400 hover:text-white transition' />
              </a>
              <a
                href='https://www.instagram.com/mistergoomba'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram className='w-14 h-14 text-gray-400 hover:text-white transition' />
              </a>
              <a href='https://www.tiktok.com/@mrgoomba' target='_blank' rel='noopener noreferrer'>
                <FaTiktok className='w-12 h-12 text-gray-400 hover:text-white transition' />
              </a>
              <a
                href='https://www.youtube.com/@mistergoomba'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube className='w-14 h-14 text-gray-400 hover:text-white transition' />
              </a>
            </div>
          </header>
        </AnimatedSection>

        {/* ABOUT ME */}
        <AnimatedSection delay={0.1}>
          <section className='flex flex-col md:flex-row items-center justify-center py-0 md:py-8 px-4 text-left max-w-6xl mx-auto'>
            <img
              src='/me.png'
              alt='Meowtin'
              className='w-72 h-[28rem] object-cover rounded-2xl mb-6 md:mb-0 md:mr-12 shadow-xl'
            />
            <div>
              <h1 className='text-4xl md:text-6xl font-bold mb-6'>
                Welcome to Meowtin&#39;s Domain
              </h1>
              <p className='text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl'>
                Welcome to Meowtin&#39;s Domain, the home page and personal portfolio of Martin
                Boynton. Who is Meowtin besides someone who refers to himself in the third person?
                Well, he is a creative professional with a passion for performance, music, and
                visual storytelling. He is an accomplished musician, karaoke host, emcee, DJ, music
                producer, video producer, web site and mobile app builder, and music venue owner.
                Aside from his professional accomplishments, Meowtin prides himself as well
                travelled, a lover of people and life, yoga and meditation enthusiast, pro wrestling
                connoisseur, video game devotee, and all around good guy.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* KARAOKE */}
        <AnimatedSection delay={0.1}>
          <section className='flex flex-col md:flex-row items-start justify-between py-16 px-4 max-w-7xl mx-auto w-full space-y-6 md:space-y-0 rounded-2xl shadow-inner shadow-purple-900/60 bg-[linear-gradient(to_right,_#111827,_#000000,_#111827)]'>
            <div className='flex flex-col items-center flex-grow'>
              <img
                src='/okie-dokie-logo.png'
                alt='Okie Dokie Karaoke Logo'
                className='w-[700px] max-w-full mb-6 drop-shadow-lg'
              />
              <p className='text-3xl md:text-5xl text-gray-300 font-semibold text-center'>
                Every Thursday at the DIVE BAR
              </p>
            </div>
            <div className='flex justify-center w-full md:w-auto md:ml-8'>
              <video
                src='/okie-dokie-reel.mp4'
                autoPlay
                muted
                loop
                playsInline
                className='w-80 h-[42rem] object-cover rounded-2xl shadow-xl'
              />
            </div>
          </section>
        </AnimatedSection>

        {/* DJ */}
        <AnimatedSection delay={0.1}>
          <section className='flex flex-col-reverse md:flex-row items-center justify-between py-20 px-4 max-w-7xl mx-auto w-full gap-12 md:gap-0 rounded-2xl shadow-inner shadow-purple-900/60 bg-[linear-gradient(to_right,_#111827,_#000000,_#111827)]'>
            <div className='flex justify-center w-full md:w-1/2'>
              <img
                src='/dj-flyer.png'
                alt='DJ Flyer'
                className='w-full max-w-xs md:max-w-sm rounded-2xl shadow-xl object-cover'
              />
            </div>
            <div className='flex flex-col items-center text-center w-full md:w-1/2'>
              <img
                src='/logo.png'
                alt='Meowtin DJ Logo'
                className='w-[500px] max-w-full mb-8 drop-shadow-lg'
              />
              <p className='text-2xl md:text-4xl font-semibold text-gray-200'>DJ Styles:</p>
              <p className='text-xl md:text-2xl text-gray-300 mt-4 max-w-xl'>
                Dubstep, Trap, Chillstep, Dark Electro, EBSM, and Industrial
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* MUSIC */}
        <AnimatedSection delay={0.1}>
          <section className='flex flex-col md:flex-row items-end justify-between py-10 px-4 max-w-7xl mx-auto w-full space-y-12 md:space-y-0 md:space-x-12 rounded-2xl shadow-inner shadow-purple-900/60 bg-[linear-gradient(to_right,_#111827,_#000000,_#111827)]'>
            <div className='flex flex-col items-center text-center w-full md:w-1/2 space-y-6'>
              <a href='https://shortfusemusic.com' target='_blank' rel='noopener noreferrer'>
                <img
                  src='/short-fuse-logo.png'
                  alt='Short Fuse Logo'
                  className='w-full max-w-full drop-shadow-lg hover:scale-105 transition-transform duration-300'
                />
              </a>
              <iframe
                width='100%'
                height='315'
                src='https://www.youtube.com/embed/videoseries?list=PLnegzC5lUH_c55bne_g0ui2KIjizTfkQj'
                title='Short Fuse Playlist'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                className='rounded-xl shadow-lg'
              ></iframe>
            </div>

            <div className='flex flex-col items-center text-center w-full md:w-1/2 space-y-6'>
              <a href='https://fartxbubble.com/' target='_blank' rel='noopener noreferrer'>
                <img
                  src='/fart-bubble-logo.png'
                  alt='Fart Bubble Logo'
                  className='w-full max-w-full drop-shadow-lg hover:scale-105 transition-transform duration-300'
                />
              </a>
              <iframe
                width='100%'
                height='315'
                src='https://www.youtube.com/embed/videoseries?list=PLKKmm8SuBRnMununJdexGWuz19NW48MPU'
                title='Fart Bubble Playlist'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                className='rounded-xl shadow-lg'
              ></iframe>
            </div>
          </section>
        </AnimatedSection>

        {/* ART */}
        <AnimatedSection delay={0.1}>
          <ArtPreview />
        </AnimatedSection>

        {/* DEVELOPMENT */}
        <AnimatedSection delay={0.1}>
          <section className='flex flex-col items-center justify-center py-20 px-4 max-w-7xl mx-auto w-full space-y-12 rounded-2xl shadow-inner shadow-purple-900/60 bg-[linear-gradient(to_right,_#111827,_#000000,_#111827)]'>
            <h2 className='text-3xl md:text-5xl font-bold text-center text-gray-100'>
              Past and Present Development Projects
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl'>
              <a href='https://kink.com' target='_blank' rel='noopener noreferrer'>
                <img
                  src='/kink-logo.png'
                  alt='Kink.com'
                  className='w-full max-w-[400px] object-contain rounded-2xl hover:scale-105 transition-transform duration-300 drop-shadow-lg mx-auto'
                />
              </a>
              <a href='https://care2.com' target='_blank' rel='noopener noreferrer'>
                <img
                  src='/care2-logo.png'
                  alt='Care2.com'
                  className='w-full max-w-[400px] object-contain rounded-2xl hover:scale-105 transition-transform duration-300 drop-shadow-lg mx-auto'
                />
              </a>
              <a href='https://yahoo.com' target='_blank' rel='noopener noreferrer'>
                <img
                  src='/yahoo-logo.png'
                  alt='Yahoo.com'
                  className='w-full max-w-[400px] object-contain rounded-2xl hover:scale-105 transition-transform duration-300 drop-shadow-lg mx-auto'
                />
              </a>
            </div>

            <ul className='text-gray-300 text-lg space-y-2 text-center'>
              <li>
                <a
                  href='https://shortfusemusic.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Short Fuse official band website
                </a>
              </li>
              <li>
                <a
                  href='https://sinwavevegas.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Sinwave Live Music Venue official site
                </a>
              </li>
              <li>
                <a
                  href='https://uke.meowtin.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Ukulele tabs site
                </a>
              </li>
              <li>
                <a
                  href='https://fartxbubble.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Fart Bubble official band website
                </a>
              </li>
              <li>
                <a
                  href='https://warboyguitars.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  WARBOY Guitars official site
                </a>
              </li>
            </ul>
          </section>
        </AnimatedSection>
      </div>

      <footer className='text-center text-sm text-gray-500 py-6'>© 2025 MEOWTIN</footer>
    </main>
  );
}
