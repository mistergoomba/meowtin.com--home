'use client';

import { useState } from 'react';

export default function ArtGallery({ images }: { images: any[] }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const toggleImage = (key: string) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10">
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-white/50">
        Click any image to view the original drawing. Hit <span className="text-emerald-400">Buy Now</span>{' '}
        to grab the artwork on a shirt, tapestry, or other merch.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map(({ key, img1, img2, exists, buy }, index) => (
          <div key={key} className="flex flex-col items-center">
            <div
              className="relative aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/25"
              onClick={() => toggleImage(key)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/art/${img1}`}
                alt=""
                loading={index < 3 ? 'eager' : 'lazy'}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  activeKey === key || !exists ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {exists && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/art/${img2}`}
                  alt=""
                  loading={index < 3 ? 'eager' : 'lazy'}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    activeKey === key ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </div>

            {buy && (
              <a
                href={buy}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-emerald-400/50 hover:bg-white/[0.08]"
              >
                Buy Now →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
