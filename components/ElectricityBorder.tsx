'use client';

import { useEffect, useState, useRef } from 'react';

interface ElectricityBorderProps {
  cardId: number;
  isHovered: boolean;
  borderColor?: string;
}

export default function ElectricityBorder({
  cardId,
  isHovered,
  borderColor = '#00aaff',
}: ElectricityBorderProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const requestRef = useRef<number | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(0.01);

  // Random activation logic
  useEffect(() => {
    const randomActivation = () => {
      // Only activate if not already active and not hovered
      if (!isActive && !isHovered) {
        const shouldActivate = Math.random() < 0.3; // 30% chance to activate

        if (shouldActivate) {
          setIsActive(true);

          // Random starting position
          setPosition(Math.random());
          setOpacity(1);

          // Randomize direction and speed
          setDirection(Math.random() > 0.5 ? 1 : -1);
          speedRef.current = 0.005 + Math.random() * 0.015; // Speed between 0.005 and 0.02

          // Deactivate after a random duration (1-3 seconds)
          const duration = 200 + Math.random() * 550;
          setTimeout(() => {
            setOpacity(0);
            setTimeout(() => setIsActive(false), 300); // Wait for fade out
          }, duration);
        }
      }
    };

    // Check for random activation every 1-3 seconds
    const interval = setInterval(randomActivation, 1000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isActive, isHovered, cardId]);

  // Animation loop
  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setPosition((prev) => {
        const newPos = prev + speedRef.current * direction;

        // Keep position within bounds (0 to 1)
        if (newPos > 1) return newPos - 1; // Loop around
        if (newPos < 0) return newPos + 1; // Loop around
        return newPos;
      });

      setGlowIntensity((Math.sin(Date.now() / 100) + 1) / 2); // Faster pulsing effect

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, direction]);

  // Calculate which segment of the border should glow
  const getGlowSegment = () => {
    if (position < 0.25) {
      return {
        top: '0px',
        right: 'auto',
        bottom: 'auto',
        left: `${position * 400}%`,
        width: '25%',
        height: '3px',
      };
    } else if (position < 0.5) {
      return {
        top: `${(position - 0.25) * 400}%`,
        right: '0px',
        bottom: 'auto',
        left: 'auto',
        width: '3px',
        height: '25%',
      };
    } else if (position < 0.75) {
      return {
        top: 'auto',
        right: 'auto',
        bottom: '0px',
        left: `${(1 - (position - 0.5) * 4) * 75}%`,
        width: '25%',
        height: '3px',
      };
    } else {
      return {
        top: `${(1 - (position - 0.75) * 4) * 75}%`,
        right: 'auto',
        bottom: 'auto',
        left: '0px',
        width: '3px',
        height: '25%',
      };
    }
  };

  // Don't render anything if not active
  if (!isActive) return null;

  const glowSegment = getGlowSegment();
  const glowSize = 10 + Math.round(glowIntensity * 15);

  return (
    <div className='absolute inset-0 pointer-events-none overflow-visible' style={{ zIndex: 100 }}>
      {/* Glowing segment */}
      <div
        ref={glowRef}
        className='absolute'
        style={{
          ...glowSegment,
          backgroundColor: borderColor,
          boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${borderColor}`,
          opacity: opacity * (0.7 + glowIntensity * 0.3),
          transition: 'opacity 0.3s ease-out',
        }}
      ></div>
    </div>
  );
}
