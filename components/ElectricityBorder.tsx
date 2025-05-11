'use client';

import { useEffect, useState, useRef } from 'react';

interface ElectricityBorderProps {
  cardId: number;
  borderColor?: string;
}

export default function ElectricityBorder({
  cardId,
  borderColor = '#00aaff',
}: ElectricityBorderProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const requestRef = useRef<number | null>(null);
  const speedRef = useRef(0.01);

  useEffect(() => {
    const randomActivation = () => {
      if (!isActive) {
        const shouldActivate = Math.random() < 0.3;
        if (shouldActivate) {
          setIsActive(true);
          setPosition(Math.random());
          setOpacity(1);
          setDirection(Math.random() > 0.5 ? 1 : -1);
          speedRef.current = 0.005 + Math.random() * 0.015;

          const duration = 200 + Math.random() * 550;
          setTimeout(() => {
            setOpacity(0);
            setTimeout(() => setIsActive(false), 300);
          }, duration);
        }
      }
    };

    const interval = setInterval(randomActivation, 1000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [isActive, cardId]);

  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setPosition((prev) => {
        const newPos = prev + speedRef.current * direction;
        if (newPos > 1) return newPos - 1;
        if (newPos < 0) return newPos + 1;
        return newPos;
      });

      setGlowIntensity((Math.sin(Date.now() / 100) + 1) / 2);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, direction]);

  const getGlowSegment = () => {
    if (position < 0.25) {
      return {
        top: '0px',
        left: `${position * 400}%`,
        width: '25%',
        height: '3px',
      };
    } else if (position < 0.5) {
      return {
        top: `${(position - 0.25) * 400}%`,
        right: '0px',
        width: '3px',
        height: '25%',
      };
    } else if (position < 0.75) {
      return {
        bottom: '0px',
        left: `${(1 - (position - 0.5) * 4) * 75}%`,
        width: '25%',
        height: '3px',
      };
    } else {
      return {
        top: `${(1 - (position - 0.75) * 4) * 75}%`,
        left: '0px',
        width: '3px',
        height: '25%',
      };
    }
  };

  if (!isActive) return null;

  const glowSegment = getGlowSegment();
  const glowSize = 10 + Math.round(glowIntensity * 15);

  return (
    <div className='absolute inset-0 pointer-events-none overflow-visible' style={{ zIndex: 100 }}>
      <div
        className='absolute'
        style={{
          ...glowSegment,
          backgroundColor: borderColor,
          boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${borderColor}`,
          opacity: opacity * (0.7 + glowIntensity * 0.3),
          transition: 'opacity 0.3s ease-out',
        }}
      />
    </div>
  );
}
