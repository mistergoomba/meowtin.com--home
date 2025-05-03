'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
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

  // State for throbbing/pulsing effect
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0.8);

  // State for autonomous floating
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [rotateZ, setRotateZ] = useState(0);

  // Track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  // Refs for animation
  const timeRef = useRef(0);
  const phaseRef = useRef(Math.random() * Math.PI * 2); // Random starting phase
  const floatPhaseX = useRef(Math.random() * Math.PI * 2); // Random phase for X floating
  const floatPhaseY = useRef(Math.random() * Math.PI * 2); // Random phase for Y floating
  const rotatePhase = useRef(Math.random() * Math.PI * 2); // Random phase for rotation
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Influence radius for mouse proximity (larger than stars for slower falloff)
  const influenceRadius = 600;

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

  // Autonomous floating amplitude (how far it moves) - reduced on mobile
  const floatAmplitudeX = (isMobile ? 8 : 20) + Math.random() * (isMobile ? 8 : 15);
  const floatAmplitudeY = (isMobile ? 8 : 20) + Math.random() * (isMobile ? 8 : 15);
  const rotateAmplitude = (isMobile ? 3 : 8) + Math.random() * (isMobile ? 4 : 8);

  // Update transform and effects when mouse position changes
  useEffect(() => {
    let animationFrame: number;

    const updateEffects = () => {
      if (!linkRef.current) return;

      // Get mouse position in page coordinates
      const mouseXPage = mouseX.get() * window.innerWidth + window.innerWidth / 2;
      const mouseYPage = mouseY.get() * window.innerHeight + window.innerHeight / 2;

      // Get link position
      const linkRect = linkRef.current.getBoundingClientRect();
      const linkCenterX = linkRect.left + linkRect.width / 2;
      const linkCenterY = linkRect.top + linkRect.height / 2;

      // Calculate distance to mouse
      const dx = mouseXPage - linkCenterX;
      const dy = mouseYPage - linkCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Update time for animations
      timeRef.current += 0.008;

      // Calculate autonomous floating movement
      const newOffsetX = Math.sin(timeRef.current * 0.7 + floatPhaseX.current) * floatAmplitudeX;
      const newOffsetY = Math.sin(timeRef.current * 0.6 + floatPhaseY.current) * floatAmplitudeY;
      const newRotateZ = Math.sin(timeRef.current * 0.4 + rotatePhase.current) * rotateAmplitude;

      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
      setRotateZ(newRotateZ);

      // Calculate 3D transform based on mouse position (more exaggerated)
      // Reduce movement on mobile
      const mouseMultiplier = isMobile ? -20 : -40;
      const rotateMultiplier = isMobile ? 12 : 25;

      const x = mouseX.get() * mouseMultiplier * depth + newOffsetX;
      const y = mouseY.get() * mouseMultiplier * depth + newOffsetY;
      const rotateX = mouseY.get() * rotateMultiplier;
      const rotateY = mouseX.get() * -rotateMultiplier;

      setTransform(
        `translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${newRotateZ}deg)`
      );

      // Calculate influence factor (0 to 1) with smoother falloff
      const t = Math.max(
        0,
        Math.min(1, 1 - (distance * distance) / (influenceRadius * influenceRadius))
      );

      // Calculate throbbing effect - more dramatic
      const throb = t * Math.sin(timeRef.current * 2 + phaseRef.current) * 0.4 + 0.8;

      // Update scale and opacity based on proximity and throbbing
      const baseScale = 1.0;
      const baseOpacity = 0.8;
      const maxOpacity = 1.0;

      // Increased scale effect
      const scaleEffect = isMobile ? 0.15 : 0.3;
      setScale(baseScale + t * scaleEffect * throb);
      setOpacity(baseOpacity + t * (maxOpacity - baseOpacity) * throb);

      // Continue animation loop
      animationFrame = requestAnimationFrame(updateEffects);
    };

    // Start animation loop
    animationFrame = requestAnimationFrame(updateEffects);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [mouseX, mouseY, depth, isMobile]);

  return (
    <a
      ref={linkRef}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`absolute ${position} ${
        !imageUrl && !Icon ? 'rounded-full border border-white px-4 py-2' : ''
      } text-sm font-medium text-white opacity-0 transition-opacity duration-1000 animate-fade-in`}
      style={{
        animationDelay: `3s`,
        transform,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'transform 0.2s ease-out',
        scale: scale.toString(),
        opacity: opacity,
      }}
    >
      {Icon ? (
        <Icon className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} text-white transition`} />
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
