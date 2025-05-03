'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PortfolioLinkProps {
  href: string;
  position: string;
  mouseX: any;
  mouseY: any;
  depth: number;
  imageUrl?: string;
  imageAlt?: string;
  imageSize?: number;
  Icon?: React.ComponentType<any>;
  label?: string;
}

export default function PortfolioLink({
  href,
  position,
  mouseX,
  mouseY,
  depth,
  imageUrl,
  imageAlt,
  imageSize = 200,
  Icon,
  label,
}: PortfolioLinkProps) {
  // State to track this element's 3D transform
  const [transform, setTransform] = useState('');

  // Update transform when mouse position changes
  useEffect(() => {
    const updateTransform = () => {
      const x = mouseX.get() * -20 * depth;
      const y = mouseY.get() * -20 * depth;
      const rotateX = mouseY.get() * 10;
      const rotateY = mouseX.get() * -10;

      setTransform(`translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    // Set up listeners for motion value changes
    const unsubscribeX = mouseX.on('change', updateTransform);
    const unsubscribeY = mouseY.on('change', updateTransform);

    // Initial update
    updateTransform();

    // Cleanup
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, depth]);

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`absolute ${position} ${
        !imageUrl && !Icon ? 'rounded-full border border-white px-4 py-2' : ''
      } text-sm font-medium text-white opacity-0 transition-opacity duration-1000 hover:scale-105 animate-fade-in`}
      style={{
        animationDelay: `3s`,
        transform,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'transform 0.2s ease-out, scale 0.2s ease-out',
      }}
    >
      {Icon ? (
        <Icon className='w-12 h-12 text-white transition' />
      ) : imageUrl ? (
        <div
          className='relative overflow-hidden'
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            maxWidth: '200px',
            maxHeight: '200px',
          }}
        >
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={imageAlt || ''}
            fill
            style={{ objectFit: 'contain' }}
            sizes={`${imageSize}px`}
          />
        </div>
      ) : (
        label || ''
      )}
    </a>
  );
}
