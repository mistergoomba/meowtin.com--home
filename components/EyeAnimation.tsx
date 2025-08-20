'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Laser beam configuration parameters
const LASER_CONFIG = {
  COLOR: '#ff0000',
  THICKNESS: 4,
  GROW_DURATION: 150,
  FADE_DURATION: 200,
  PULSE_RATE: 100,
  MIN_OPACITY: 0.7,
  MAX_OPACITY: 1.0,
  SHAKE_RATE: 50,
  SHAKE_DISTANCE: 2,
  GLOW_SIZE: 8,
  GLOW_INTENSITY: 0.7,
};

// Hover effect configuration parameters
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
  const lastMousePosRef = useRef({ x: 0, y: 0 }); // normalized for iris movement (-0.5..0.5)
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 }); // freshest screen coords
  const autoAnimateRef = useRef<NodeJS.Timeout | null>(null);

  // Laser beam states
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [laserTarget, setLaserTarget] = useState({ x: 0, y: 0 });
  const [laserProgress, setLaserProgress] = useState(0);
  const [laserOpacity, setLaserOpacity] = useState(LASER_CONFIG.MAX_OPACITY);
  const [laserShake, setLaserShake] = useState({ x: 0, y: 0 });
  const laserGrowthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const laserPulseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const laserShakeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const laserFadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Eye center position
  const [eyeCenter, setEyeCenter] = useState({ x: 0, y: 0 });

  // Hover effect states
  const [isEyeHovered, setIsEyeHovered] = useState(false);
  const [eyeShake, setEyeShake] = useState({ x: 0, y: 0 });
  const pupilGrowthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const eyeShakeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get eyelid paths based on blink stage - with pointed ends
  const getEyelidPaths = () => {
    const clipPaths = [
      'M15,40 Q100,0 185,40 L185,60 Q100,100 15,60 Z', // Fully open
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z', // Half closed
      'M15,50 Q100,50 185,50 L185,50 Q100,50 15,50 Z', // Fully closed (a line)
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z', // Half open
    ];
    return clipPaths[blinkStage];
  };
  const eyelidPaths = getEyelidPaths();

  // Clear all timers
  const clearAllTimers = () => {
    clearLaserTimers();
    clearHoverTimers();
  };
  const clearLaserTimers = () => {
    if (laserGrowthTimerRef.current) clearTimeout(laserGrowthTimerRef.current);
    if (laserPulseTimerRef.current) clearInterval(laserPulseTimerRef.current);
    if (laserShakeTimerRef.current) clearInterval(laserShakeTimerRef.current);
    if (laserFadeTimerRef.current) clearTimeout(laserFadeTimerRef.current);
  };
  const clearHoverTimers = () => {
    if (pupilGrowthTimerRef.current) clearTimeout(pupilGrowthTimerRef.current);
    if (eyeShakeTimerRef.current) clearInterval(eyeShakeTimerRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  // Mark component as hydrated after mount
  useEffect(() => {
    setIsHydrated(true);

    // Start with a small movement to ensure animation starts
    setTimeout(() => {
      setIrisOffset({ x: 5, y: 2 });
    }, 2000);

    if (pupilAnimRef.current !== null) {
      cancelAnimationFrame(pupilAnimRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoAnimateRef.current) {
        clearInterval(autoAnimateRef.current);
      }
      clearAllTimers();
    };
  }, []);

  // Start animation sequence
  useEffect(() => {
    if (!isHydrated) return;
    const timer1 = setTimeout(() => setAnimationStage(1), 600);
    const timer2 = setTimeout(() => setAnimationStage(2), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isHydrated]);

  // Handle blinking
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
      const nextBlinkDelay = Math.random() * 4000 + 2000; // 2–6s
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

  // Eye movement (uses normalized props + freshest pointer for fallback)
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    const updateIrisPosition = () => {
      if (!eyeRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateIrisPosition);
        return;
      }

      try {
        // Read normalized mouse positions from props (Framer Motion values)
        const currentX = mouseX.get();
        const currentY = mouseY.get();

        if (
          currentX !== undefined &&
          currentY !== undefined &&
          !isNaN(currentX) &&
          !isNaN(currentY)
        ) {
          lastMousePosRef.current = { x: currentX, y: currentY };
        }

        const { x, y } = lastMousePosRef.current;

        // Eye rect & center
        const eye = eyeRef.current.getBoundingClientRect();
        if (eye.width === 0 || eye.height === 0) {
          animationFrameRef.current = requestAnimationFrame(updateIrisPosition);
          return;
        }
        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        setEyeCenter({ x: eyeCenterX, y: eyeCenterY });

        // Map normalized mouse to screen coords relative to eye center
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        const dx = x * window.innerWidth + windowCenterX - eyeCenterX;
        const dy = y * window.innerHeight + windowCenterY - eyeCenterY;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistanceX = Math.min(eye.width, eye.height) / 2.8;
        const maxDistanceY = Math.min(eye.width, eye.height) / 6.0;

        let offsetX = 0;
        let offsetY = 0;
        if (distance > 0) {
          offsetX = (dx / distance) * Math.min(Math.abs(dx), maxDistanceX);
          offsetY = (dy / distance) * Math.min(Math.abs(dy), maxDistanceY);
        }

        setIrisOffset((prev) => ({
          x: prev.x + (offsetX - prev.x) * 0.1,
          y: prev.y + (offsetY - prev.y) * 0.1,
        }));
      } catch (error) {
        console.error('Error updating iris position:', error);
      }

      animationFrameRef.current = requestAnimationFrame(updateIrisPosition);
    };

    animationFrameRef.current = requestAnimationFrame(updateIrisPosition);

    // Auto animate if idle
    let lastOffsetX = 0;
    let lastOffsetY = 0;
    let noMovementCounter = 0;

    autoAnimateRef.current = setInterval(() => {
      const currentOffsetX = irisOffset.x;
      const currentOffsetY = irisOffset.y;

      if (
        Math.abs(currentOffsetX - lastOffsetX) < 0.1 &&
        Math.abs(currentOffsetY - lastOffsetY) < 0.1
      ) {
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

      lastOffsetX = currentOffsetX;
      lastOffsetY = currentOffsetY;
    }, 1000);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (autoAnimateRef.current) clearInterval(autoAnimateRef.current);
    };
  }, [isHydrated, animationStage, mouseX, mouseY, irisOffset.x, irisOffset.y]);

  // Freshest pointer tracking (Pointer Events)
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    const handlePointerMove = (e: PointerEvent) => {
      lastPointerRef.current = { x: e.clientX, y: e.clientY };

      // also keep normalized values for iris logic so pupil still follows
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      lastMousePosRef.current = { x: nx, y: ny };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isHydrated, animationStage]);

  // Laser activation/deactivation using freshest position
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    const handlePointerDown = (e: PointerEvent) => {
      // Use the freshest known pointer position (fallback to event)
      const freshest = lastPointerRef.current;
      const x = freshest.x || e.clientX;
      const y = freshest.y || e.clientY;

      // Snap target immediately before growth begins
      updateLaserTargetImmediate(x, y);
      activateLaser(x, y);

      // Snap once more next frame in case of batched events
      requestAnimationFrame(() => {
        const lp = lastPointerRef.current;
        updateLaserTargetImmediate(lp.x, lp.y);
      });
    };

    const handlePointerUp = () => {
      deactivateLaser();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isHydrated, animationStage]);

  // While laser is active, continuously retarget on pointermove
  useEffect(() => {
    if (!isHydrated || animationStage !== 2 || !isLaserActive) return;

    const handlePointerMove = (e: PointerEvent) => {
      updateLaserTarget(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isHydrated, animationStage, isLaserActive]);

  // Hover detection (leave as mouse/touch for now; could also be pointermove)
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
      const isHovering = isPointInEye(e.clientX, e.clientY);
      if (isHovering && !isEyeHovered) startHoverEffects();
      else if (!isHovering && isEyeHovered) stopHoverEffects();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const isHovering = isPointInEye(t.clientX, t.clientY);
        if (isHovering && !isEyeHovered) startHoverEffects();
        else if (!isHovering && isEyeHovered) stopHoverEffects();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isHydrated, animationStage, isEyeHovered]);

  // Hover effects
  const startHoverEffects = () => {
    clearHoverTimers();
    setIsEyeHovered(true);
    startPupilGrowth();
    startEyeShake();
  };

  const stopHoverEffects = () => {
    clearHoverTimers();
    setIsEyeHovered(false);
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
  const [showRedOverlay, setShowRedOverlay] = useState(false);
  const [useCircularEye, setUseCircularEye] = useState(false);

  const setPupilSize = (value: number) => {
    pupilSizeRef.current = value;
    _setPupilSize(value);
  };

  const pupilAnimRef = useRef<number | null>(null);

  const animatePupilSize = (targetSize: number, duration: number) => {
    if (pupilAnimRef.current !== null) cancelAnimationFrame(pupilAnimRef.current);

    const startTime = performance.now();
    const initialSize = pupilSizeRef.current;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newSize = initialSize + (targetSize - initialSize) * progress;

      setPupilSize(newSize);

      if (progress < 1) {
        pupilAnimRef.current = requestAnimationFrame(animate);
      } else {
        pupilAnimRef.current = null;
      }
    };

    pupilAnimRef.current = requestAnimationFrame(animate);
  };

  const startPupilGrowth = () => {
    animatePupilSize(HOVER_CONFIG.EXPANDED_PUPIL_SIZE, HOVER_CONFIG.PUPIL_GROW_DURATION);
  };
  const startPupilShrink = () => {
    animatePupilSize(HOVER_CONFIG.NORMAL_PUPIL_SIZE, HOVER_CONFIG.PUPIL_GROW_DURATION);
  };

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
      if (eyeEl) {
        eyeEl.classList.add('melting');
      }
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

  // Laser helpers
  const updateLaserTargetImmediate = (clientX: number, clientY: number) => {
    setLaserTarget({ x: clientX, y: clientY });
  };

  const updateLaserTarget = (clientX: number, clientY: number) => {
    if (isLaserActive) {
      setLaserTarget({ x: clientX, y: clientY });
    }
  };

  const activateLaser = (clientX: number, clientY: number) => {
    clearLaserTimers();

    // Ensure target is set from the freshest position before growth begins
    updateLaserTargetImmediate(clientX, clientY);

    setLaserProgress(0);
    setIsLaserActive(true);

    let progress = 0;
    const growthInterval = 10;
    const steps = LASER_CONFIG.GROW_DURATION / growthInterval;
    const increment = 1 / steps;

    const growLaser = () => {
      progress += increment;
      if (progress >= 1) {
        progress = 1;
        setLaserProgress(1);
        startLaserEffects();
      } else {
        setLaserProgress(progress);
        laserGrowthTimerRef.current = setTimeout(growLaser, growthInterval);
      }
    };

    laserGrowthTimerRef.current = setTimeout(growLaser, growthInterval);
  };

  const startLaserEffects = () => {
    let pulseDirection = -1;
    laserPulseTimerRef.current = setInterval(() => {
      setLaserOpacity((prev) => {
        let next = prev + pulseDirection * 0.05;
        if (next <= LASER_CONFIG.MIN_OPACITY) {
          next = LASER_CONFIG.MIN_OPACITY;
          pulseDirection = 1;
        } else if (next >= LASER_CONFIG.MAX_OPACITY) {
          next = LASER_CONFIG.MAX_OPACITY;
          pulseDirection = -1;
        }
        return next;
      });
    }, LASER_CONFIG.PULSE_RATE);

    laserShakeTimerRef.current = setInterval(() => {
      const shakeX = (Math.random() * 2 - 1) * LASER_CONFIG.SHAKE_DISTANCE;
      const shakeY = (Math.random() * 2 - 1) * LASER_CONFIG.SHAKE_DISTANCE;
      setLaserShake({ x: shakeX, y: shakeY });
    }, LASER_CONFIG.SHAKE_RATE);
  };

  const deactivateLaser = () => {
    if (laserGrowthTimerRef.current) clearTimeout(laserGrowthTimerRef.current);
    if (laserPulseTimerRef.current) clearInterval(laserPulseTimerRef.current);
    if (laserShakeTimerRef.current) clearInterval(laserShakeTimerRef.current);

    let opacity = laserOpacity;
    const fadeInterval = 10;
    const steps = LASER_CONFIG.FADE_DURATION / fadeInterval;
    const decrement = opacity / steps;

    const fadeLaser = () => {
      opacity -= decrement;
      if (opacity <= 0) {
        opacity = 0;
        setLaserOpacity(0);
        setIsLaserActive(false);
      } else {
        setLaserOpacity(opacity);
        laserFadeTimerRef.current = setTimeout(fadeLaser, fadeInterval);
      }
    };

    laserFadeTimerRef.current = setTimeout(fadeLaser, fadeInterval);
  };

  // Pupil radius based on iris size %
  const pupilRadius = 25 * (pupilSize / 100);

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      {showRedOverlay && (
        <div
          className='absolute inset-0 z-10 bg-red-800 transition-opacity duration-1000'
          style={{ opacity: eyeClicked ? 1 : 0 }}
        />
      )}
      <div
        ref={eyeContainerRef}
        className={`relative ${
          useCircularEye ? 'w-[200px] h-[200px]' : 'w-[200px] h-[100px]'
        } cursor-pointer ${eyeClicked ? 'rounded-full overflow-hidden' : ''}`}
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
              <filter id='laserGlow' x='-20%' y='-20%' width='140%' height='140%'>
                <feGaussianBlur stdDeviation={LASER_CONFIG.GLOW_SIZE} result='blur' />
                <feComposite in='SourceGraphic' in2='blur' operator='over' />
              </filter>
            </defs>

            {useCircularEye ? (
              <>
                <svg width='200' height='200'>
                  <image href='/eye.png' width='200' height='200' />
                </svg>

                <g style={{ transform: `translate(0px, 50px)` }}>
                  <circle cx='100' cy='50' r='25' fill='#5b8fb9' stroke='none' />
                  <circle cx='100' cy='50' r='20' fill='black' stroke='none' />
                  <circle cx='110' cy='40' r='5' fill='white' stroke='none' opacity='0.7' />
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
                    <circle cx='100' cy='50' r='25' fill='#5b8fb9' stroke='none' />
                    <circle cx='100' cy='50' r={pupilRadius} fill='black' stroke='none' />
                    <circle cx='110' cy='40' r='5' fill='white' stroke='none' opacity='0.7' />
                  </g>
                </g>
              </>
            )}
          </svg>
        )}

        {/* Laser beam */}
        {isLaserActive && !eyeClicked && animationStage === 2 && (
          <div
            className='absolute pointer-events-none'
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 21,
              overflow: 'hidden',
            }}
          >
            <svg width='100%' height='100%' style={{ position: 'absolute' }}>
              {/* Laser glow */}
              <line
                x1={eyeCenter.x + irisOffset.x}
                y1={eyeCenter.y + irisOffset.y}
                x2={
                  eyeCenter.x +
                  irisOffset.x +
                  (laserTarget.x - eyeCenter.x - irisOffset.x) * laserProgress +
                  laserShake.x
                }
                y2={
                  eyeCenter.y +
                  irisOffset.y +
                  (laserTarget.y - eyeCenter.y - irisOffset.y) * laserProgress +
                  laserShake.y
                }
                stroke={LASER_CONFIG.COLOR}
                strokeWidth={LASER_CONFIG.THICKNESS + 4}
                strokeOpacity={laserOpacity * LASER_CONFIG.GLOW_INTENSITY}
                filter='url(#laserGlow)'
              />
              {/* Main beam */}
              <line
                x1={eyeCenter.x + irisOffset.x}
                y1={eyeCenter.y + irisOffset.y}
                x2={
                  eyeCenter.x +
                  irisOffset.x +
                  (laserTarget.x - eyeCenter.x - irisOffset.x) * laserProgress +
                  laserShake.x
                }
                y2={
                  eyeCenter.y +
                  irisOffset.y +
                  (laserTarget.y - eyeCenter.y - irisOffset.y) * laserProgress +
                  laserShake.y
                }
                stroke={LASER_CONFIG.COLOR}
                strokeWidth={LASER_CONFIG.THICKNESS}
                strokeOpacity={laserOpacity}
              />
            </svg>
          </div>
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
