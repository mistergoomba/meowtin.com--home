'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const HOVER_CONFIG = {
  PUPIL_GROW_DURATION: 500,
  NORMAL_PUPIL_SIZE: 48,
  EXPANDED_PUPIL_SIZE: 90,
  SHAKE_INTERVAL: 50,
  SHAKE_DISTANCE: 3,
};

export default function EyeAnimation({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const [animationStage, setAnimationStage] = useState(0);
  const eyeRef = useRef<SVGSVGElement>(null);
  const eyeContainerRef = useRef<HTMLDivElement>(null);
  const [blinkStage, setBlinkStage] = useState(0);
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 });
  const [isHydrated, setIsHydrated] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const autoAnimateRef = useRef<NodeJS.Timeout | null>(null);

  // Hover state
  const [isEyeHovered, setIsEyeHovered] = useState(false);
  const [eyeShake, setEyeShake] = useState({ x: 0, y: 0 });
  const pupilGrowthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const eyeShakeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getEyelidPaths = () => {
    const clipPaths = [
      'M15,40 Q100,0 185,40 L185,60 Q100,100 15,60 Z',
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z',
      'M15,50 Q100,50 185,50 L185,50 Q100,50 15,50 Z',
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z',
    ];
    return clipPaths[blinkStage];
  };
  const eyelidPaths = getEyelidPaths();

  const clearHoverTimers = () => {
    if (pupilGrowthTimerRef.current) clearTimeout(pupilGrowthTimerRef.current);
    if (eyeShakeTimerRef.current) clearInterval(eyeShakeTimerRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  useEffect(() => {
    setIsHydrated(true);
    setTimeout(() => setIrisOffset({ x: 5, y: 2 }), 2000);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (autoAnimateRef.current) clearInterval(autoAnimateRef.current);
      clearHoverTimers();
    };
  }, []);

  // intro staging
  useEffect(() => {
    if (!isHydrated) return;
    const t1 = setTimeout(() => setAnimationStage(1), 600);
    const t2 = setTimeout(() => setAnimationStage(2), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isHydrated]);

  // blink loop
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;
    let blinkTimeoutId: NodeJS.Timeout | null = null;
    const doBlink = () => {
      setBlinkStage(1);
      setTimeout(() => {
        setBlinkStage(2);
        setTimeout(() => {
          setBlinkStage(3);
          setTimeout(() => setBlinkStage(0), 60);
        }, 40);
      }, 60);
    };
    const scheduleBlink = () => {
      const nextBlinkDelay = Math.random() * 4000 + 2000;
      blinkTimeoutId = setTimeout(() => {
        doBlink();
        blinkTimeoutId = scheduleBlink();
      }, nextBlinkDelay);
      return blinkTimeoutId;
    };
    blinkTimeoutId = scheduleBlink();
    return () => {
      if (blinkTimeoutId) clearTimeout(blinkTimeoutId);
    };
  }, [animationStage, isHydrated]);

  // iris follows normalized mouse
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;
    const updateIrisPosition = () => {
      if (!eyeRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateIrisPosition);
        return;
      }
      try {
        const currentX = mouseX.get?.();
        const currentY = mouseY.get?.();
        if (
          currentX !== undefined &&
          currentY !== undefined &&
          !isNaN(currentX) &&
          !isNaN(currentY)
        ) {
          lastMousePosRef.current = { x: currentX, y: currentY };
        }
        const { x, y } = lastMousePosRef.current;
        const eye = eyeRef.current.getBoundingClientRect();
        if (eye.width === 0 || eye.height === 0) {
          animationFrameRef.current = requestAnimationFrame(updateIrisPosition);
          return;
        }
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        const dx = x * window.innerWidth + windowCenterX - eyeCenterX;
        const dy = y * window.innerHeight + windowCenterY - eyeCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistanceX = Math.min(eye.width, eye.height) / 2.8;
        const maxDistanceY = Math.min(eye.width, eye.height) / 6.0;
        let offsetX = 0,
          offsetY = 0;
        if (distance > 0) {
          offsetX = (dx / distance) * Math.min(Math.abs(dx), maxDistanceX);
          offsetY = (dy / distance) * Math.min(Math.abs(dy), maxDistanceY);
        }
        setIrisOffset((prev) => ({
          x: prev.x + (offsetX - prev.x) * 0.1,
          y: prev.y + (offsetY - prev.y) * 0.1,
        }));
      } catch {
        /* noop */
      }
      animationFrameRef.current = requestAnimationFrame(updateIrisPosition);
    };
    animationFrameRef.current = requestAnimationFrame(updateIrisPosition);

    // idle micro-movements
    let lastOffsetX = 0,
      lastOffsetY = 0,
      noMovementCounter = 0;
    autoAnimateRef.current = setInterval(() => {
      const { x: ox, y: oy } = irisOffset;
      if (Math.abs(ox - lastOffsetX) < 0.1 && Math.abs(oy - lastOffsetY) < 0.1) {
        noMovementCounter++;
        if (noMovementCounter >= 3) {
          const randomX = (Math.random() - 0.5) * 0.4;
          const randomY = (Math.random() - 0.5) * 0.2;
          lastMousePosRef.current = { x: randomX, y: randomY };
          noMovementCounter = 0;
        }
      } else {
        noMovementCounter = 0;
      }
      lastOffsetX = ox;
      lastOffsetY = oy;
    }, 1000);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (autoAnimateRef.current) clearInterval(autoAnimateRef.current);
    };
  }, [isHydrated, animationStage, mouseX, mouseY, irisOffset.x, irisOffset.y]);

  // hover detection
  useEffect(() => {
    if (!isHydrated || animationStage !== 2 || !eyeContainerRef.current) return;

    const isPointInEye = (clientX: number, clientY: number) => {
      if (!eyeRef.current) return false;
      const eyeRect = eyeRef.current.getBoundingClientRect();
      return (
        clientX >= eyeRect.left &&
        clientX <= eyeRect.right &&
        clientY >= eyeRect.top &&
        clientY <= eyeRect.bottom
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      const hovering = isPointInEye(e.clientX, e.clientY);
      if (hovering && !isEyeHovered) startHoverEffects();
      else if (!hovering && isEyeHovered) stopHoverEffects();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const hovering = isPointInEye(t.clientX, t.clientY);
        if (hovering && !isEyeHovered) startHoverEffects();
        else if (!hovering && isEyeHovered) stopHoverEffects();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isHydrated, animationStage, isEyeHovered]);

  const startHoverEffects = () => {
    clearHoverTimers();
    setIsEyeHovered(true);
    // NEW: notify page about hover start (turn icons red & pause)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eyeHover', { detail: true }));
    }
    startPupilGrowth();
    startEyeShake();
  };

  const stopHoverEffects = () => {
    clearHoverTimers();
    setIsEyeHovered(false);
    // NEW: notify page about hover end (restore colors & resume)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eyeHover', { detail: false }));
    }
    startPupilShrink();
    hoverTimeoutRef.current = setTimeout(() => {
      if (eyeShakeTimerRef.current) {
        clearInterval(eyeShakeTimerRef.current);
        setEyeShake({ x: 0, y: 0 });
      }
    }, 100);
  };

  const pupilSizeRef = useRef(HOVER_CONFIG.NORMAL_PUPIL_SIZE);
  const [pupilSize, _setPupilSize] = useState(HOVER_CONFIG.NORMAL_PUPIL_SIZE);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [useCircularEye, setUseCircularEye] = useState(false);

  const setPupilSize = (v: number) => {
    pupilSizeRef.current = v;
    _setPupilSize(v);
  };

  const pupilAnimRef = useRef<number | null>(null);
  const animatePupilSize = (target: number, duration: number) => {
    if (pupilAnimRef.current !== null) cancelAnimationFrame(pupilAnimRef.current);
    const startTime = performance.now();
    const initial = pupilSizeRef.current;
    const step = (t: number) => {
      const p = Math.min((t - startTime) / duration, 1);
      const next = initial + (target - initial) * p;
      setPupilSize(next);
      if (p < 1) pupilAnimRef.current = requestAnimationFrame(step);
      else pupilAnimRef.current = null;
    };
    pupilAnimRef.current = requestAnimationFrame(step);
  };
  const startPupilGrowth = () =>
    animatePupilSize(HOVER_CONFIG.EXPANDED_PUPIL_SIZE, HOVER_CONFIG.PUPIL_GROW_DURATION);
  const startPupilShrink = () =>
    animatePupilSize(HOVER_CONFIG.NORMAL_PUPIL_SIZE, HOVER_CONFIG.PUPIL_GROW_DURATION);

  const handleEyeClick = () => {
    if (eyeClicked) return;
    setEyeClicked(true);
    setUseCircularEye(true);
    setPupilSize(HOVER_CONFIG.EXPANDED_PUPIL_SIZE);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eyeMeltComplete'));
    }
    setTimeout(() => {
      const eyeEl = eyeRef.current;
      if (eyeEl) eyeEl.classList.add('melting');
    }, 1000);
  };

  const startEyeShake = () => {
    if (eyeShakeTimerRef.current) clearInterval(eyeShakeTimerRef.current);
    eyeShakeTimerRef.current = setInterval(() => {
      const shakeX = (Math.random() * 2 - 1) * HOVER_CONFIG.SHAKE_DISTANCE;
      const shakeY = (Math.random() * 2 - 1) * HOVER_CONFIG.SHAKE_DISTANCE;
      setEyeShake({ x: shakeX, y: shakeY });
    }, HOVER_CONFIG.SHAKE_INTERVAL);
  };

  const pupilRadius = 25 * (pupilSize / 100);

  return (
    // IMPORTANT: let clicks pass through full-screen wrapper except the eye
    <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
      <div
        ref={eyeContainerRef}
        className={`relative ${
          useCircularEye ? 'w-[200px] h-[200px]' : 'w-[200px] h-[100px]'
        } cursor-pointer ${eyeClicked ? 'rounded-full overflow-hidden' : ''} pointer-events-auto`}
        onClick={handleEyeClick}
        style={{
          transform:
            isEyeHovered && !eyeClicked ? `translate(${eyeShake.x}px, ${eyeShake.y}px)` : 'none',
          transition: isEyeHovered ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* Initial straight line */}
        {animationStage === 1 && (
          <motion.div
            initial={{ width: 0, x: -100 }}
            animate={{ width: 200, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='absolute top-[50px] left-0 h-[3px] bg-white'
          />
        )}

        {/* Eye SVG */}
        {animationStage === 2 && (
          <svg
            width='200'
            height={useCircularEye ? '200' : '100'}
            viewBox={useCircularEye ? '0 0 200 200' : '0 0 200 100'}
            ref={eyeRef}
            className='absolute top-0 left-0 z-20'
          >
            <defs>
              <clipPath id='eyeClip'>
                <path d={eyelidPaths} />
              </clipPath>
            </defs>

            {useCircularEye ? (
              <>
                <svg width='200' height='200'>
                  <image href='/eye.png' width='200' height='200' />
                </svg>
                <g style={{ transform: `translate(0px, 50px)` }}>
                  <circle cx='100' cy='50' r='25' fill='#5b8fb9' />
                  <circle cx='100' cy='50' r='20' fill='black' />
                  <circle cx='110' cy='40' r='5' fill='white' opacity='0.7' />
                </g>
              </>
            ) : (
              <>
                <svg width='200' height='200'>
                  <defs>
                    <clipPath id='eyelidClip'>
                      <path d={eyelidPaths} />
                    </clipPath>
                  </defs>
                  <image
                    href='/eye.png'
                    width='200'
                    height='200'
                    y='-10'
                    clipPath='url(#eyelidClip)'
                    preserveAspectRatio='xMidYMid slice'
                  />
                </svg>

                <g clipPath='url(#eyeClip)'>
                  <g style={{ transform: `translate(${irisOffset.x}px, ${irisOffset.y}px)` }}>
                    <circle cx='100' cy='50' r='25' fill='#5b8fb9' />
                    <circle cx='100' cy='50' r={pupilRadius} fill='black' />
                    <circle cx='110' cy='40' r='5' fill='white' opacity='0.7' />
                  </g>
                </g>
              </>
            )}
          </svg>
        )}
      </div>

      <style jsx global>{`
        .melting {
          animation: melt 1s forwards;
        }
        @keyframes melt {
          0% {
            opacity: 1;
            transform: scaleY(1);
          }
          100% {
            opacity: 0;
            transform: scaleY(5) translateY(100px);
          }
        }
      `}</style>
    </div>
  );
}
