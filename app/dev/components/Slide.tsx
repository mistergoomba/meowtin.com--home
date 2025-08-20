import { CardProject } from '../types/projects';
import Image from 'next/image';

export default function Slide({
  slide,
  project,
}: {
  slide: { type: 'meta' | 'image'; src?: string };
  project: CardProject;
}) {
  if (slide.type === 'meta') {
    // Meta slide styled like a clean poster card
    return (
      <div className='absolute inset-0 flex items-center justify-center p-6 md:p-12'>
        <div className='w-full max-w-4xl h-screen rounded-2xl border border-white/15 bg-black/70 p-6 md:p-10 text-white shadow-2xl backdrop-blur-md'>
          <h3 className='mb-4 text-center text-2xl md:text-3xl font-bold'>{project.title}</h3>
          <p className='mx-auto max-w-3xl text-sm md:text-base text-white/90'>
            {project.description}
          </p>
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
        </div>
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
