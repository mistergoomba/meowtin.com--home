import { CardProject } from '../types/projects';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function Slide({
  slide,
  project,
}: {
  slide: { type: 'meta' | 'image' | 'video'; src?: string };
  project: CardProject;
}) {
  if (slide.type === 'meta') {
    // Meta slide styled like a clean poster card
    return (
      <div className='absolute inset-0 flex items-center justify-center p-6 md:p-12'>
        <div className='w-full max-w-4xl h-screen rounded-2xl border border-white/15 bg-black/70 p-6 md:p-10 text-white shadow-2xl backdrop-blur-md'>
          <h3 className='mb-4 text-center text-2xl md:text-3xl font-bold'>{project.title}</h3>
          <p
            className='mx-auto max-w-3xl text-sm md:text-base text-white/90'
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          {project.technologies?.length ? (
            <div className='mt-6 flex flex-wrap justify-center gap-2'>
              {project.technologies.map((t, i) => (
                <span
                  key={i}
                  className='rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs md:text-sm text-white/90'
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {project.url && (
            <div className='mt-8 flex justify-center'>
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30'
              >
                <span>Visit website</span>
                <ExternalLink className='h-4 w-4' />
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Video slide (fullscreen contain)
  if (slide.type === 'video') {
    return (
      <div className='absolute inset-0 flex items-center justify-center bg-black'>
        <video
          src={slide.src}
          controls
          autoPlay
          loop
          muted
          playsInline
          className='max-h-full max-w-full object-contain'
        />
      </div>
    );
  }

  // Image slide (fullscreen contain)
  return (
    <div className='absolute inset-0'>
      <Image
        src={slide.src!}
        alt='Project screenshot'
        fill
        className='object-contain'
        sizes='100vw'
        priority
      />
    </div>
  );
}
