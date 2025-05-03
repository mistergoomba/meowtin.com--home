'use client';

import { useState } from 'react';

export default function ArtGallery({ images }: { images: any[] }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const toggleImage = (key: string) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <section className='px-4 sm:px-8 py-8'>
      <h1 className='text-3xl font-bold mb-4 text-center'>My Art, Enhanced</h1>

      <div className='max-w-3xl mx-auto text-center text-gray-300 mb-8'>
        <p>
          Over the years, drawing, doodling, and painting have been one of my purest forms of
          <span className='text-purple-300 font-semibold'> expression</span>—a kind of visual
          journaling where I let my
          <span className='text-purple-300 font-semibold'> subconscious</span> speak freely. I
          always imagined turning these sketches into more elaborate works, but time and talent
          constraints often got in the way. With the help of
          <span className='text-purple-300 font-semibold'> AI</span>, I was able to bring these
          ideas to life. Some pieces captured the exact vision I had in mind, while others missed a
          few of my more personal, quirky details. Either way, it's been a joy to see them
          reimagined. Click on any image to view the
          <span className='text-purple-300 font-semibold'> original drawing</span>.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {images.map(({ key, img1, img2, exists }, index) => (
          <div
            key={key}
            className='relative overflow-hidden rounded shadow-lg cursor-pointer aspect-[2/3]'
            onClick={() => toggleImage(key)}
          >
            <img
              src={`/art/${img1}`}
              alt=''
              loading={index < 3 ? 'eager' : 'lazy'}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                activeKey === key || !exists ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {exists && (
              <img
                src={`/art/${img2}`}
                alt=''
                loading={index < 3 ? 'eager' : 'lazy'}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  activeKey === key ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
