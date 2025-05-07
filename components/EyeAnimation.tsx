'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Laser beam configuration parameters
const LASER_CONFIG = {
  // Base color of the laser beam
  COLOR: '#ff0000',

  // Thickness of the laser beam in pixels
  THICKNESS: 4,

  // How quickly the laser grows from eye to target (ms)
  GROW_DURATION: 150,

  // How quickly the laser fades when released (ms)
  FADE_DURATION: 200,

  // How rapidly the laser pulses (lower = faster)
  PULSE_RATE: 100,

  // Minimum opacity during pulse
  MIN_OPACITY: 0.7,

  // Maximum opacity during pulse
  MAX_OPACITY: 1.0,

  // How rapidly the laser shakes (lower = faster)
  SHAKE_RATE: 50,

  // Maximum distance the laser can shake from center
  SHAKE_DISTANCE: 2,

  // Glow effect size (0 = no glow)
  GLOW_SIZE: 8,

  // Glow effect intensity (0-1)
  GLOW_INTENSITY: 0.7,
};

// Hover effect configuration parameters
const HOVER_CONFIG = {
  // How quickly the pupil grows (ms)
  PUPIL_GROW_DURATION: 500,

  // Normal pupil size (percentage of iris)
  NORMAL_PUPIL_SIZE: 48, // 48% of iris size

  // Expanded pupil size (percentage of iris)
  EXPANDED_PUPIL_SIZE: 90, // 90% of iris size

  // How rapidly the eye shakes (ms)
  SHAKE_INTERVAL: 50,

  // Maximum shake distance (px)
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
    // Top eyelid paths for different blink stages - with pointed ends
    const topPaths = [
      'M15,40 Q100,0 185,40', // Fully open - pointed at both ends
      'M15,45 Q100,20 185,45', // Half closed - pointed at both ends
      'M15,50 Q100,50 185,50', // Fully closed - pointed at both ends
      'M15,45 Q100,20 185,45', // Half open - pointed at both ends
    ];

    // Bottom eyelid paths for different blink stages - with pointed ends
    const bottomPaths = [
      'M15,60 Q100,100 185,60', // Fully open - pointed at both ends
      'M15,55 Q100,80 185,55', // Half closed - pointed at both ends
      'M15,50 Q100,50 185,50', // Fully closed - pointed at both ends
      'M15,55 Q100,80 185,55', // Half open - pointed at both ends
    ];

    // Define the clip path for the eye opening - with pointed ends
    const clipPaths = [
      'M15,40 Q100,0 185,40 L185,60 Q100,100 15,60 Z', // Fully open
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z', // Half closed
      'M15,50 Q100,50 185,50 L185,50 Q100,50 15,50 Z', // Fully closed (a line)
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z', // Half open
    ];

    return {
      topPath: topPaths[blinkStage],
      bottomPath: bottomPaths[blinkStage],
      clipPath: clipPaths[blinkStage],
    };
  };

  const eyelidPaths = getEyelidPaths();

  // Clear all timers
  const clearAllTimers = () => {
    clearLaserTimers();
    clearHoverTimers();
  };

  // Clear all laser-related timers
  const clearLaserTimers = () => {
    if (laserGrowthTimerRef.current) clearTimeout(laserGrowthTimerRef.current);
    if (laserPulseTimerRef.current) clearInterval(laserPulseTimerRef.current);
    if (laserShakeTimerRef.current) clearInterval(laserShakeTimerRef.current);
    if (laserFadeTimerRef.current) clearTimeout(laserFadeTimerRef.current);
  };

  // Clear all hover-related timers
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

    const timer1 = setTimeout(() => setAnimationStage(1), 600); // Show line
    const timer2 = setTimeout(() => setAnimationStage(2), 1500); // Open eye

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isHydrated]);

  // Handle blinking
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    let blinkTimeoutId: NodeJS.Timeout | null = null;

    // Function to handle a single blink cycle
    const doBlink = () => {
      // Start blink - half closed
      setBlinkStage(1);

      // After a short delay, fully close
      setTimeout(() => {
        setBlinkStage(2);

        // After another short delay, half open
        setTimeout(() => {
          setBlinkStage(3);

          // Finally, fully open
          setTimeout(() => {
            setBlinkStage(0);
          }, 60); // Time to fully open
        }, 40); // Time to stay fully closed
      }, 60); // Time to half close
    };

    // Schedule random blinks
    const scheduleBlink = () => {
      const nextBlinkDelay = Math.random() * 4000 + 2000; // Random delay between 2-6 seconds
      blinkTimeoutId = setTimeout(() => {
        doBlink();
        blinkTimeoutId = scheduleBlink();
      }, nextBlinkDelay);

      return blinkTimeoutId;
    };

    // Start the blinking cycle
    blinkTimeoutId = scheduleBlink();

    return () => {
      if (blinkTimeoutId) clearTimeout(blinkTimeoutId);
    };
  }, [animationStage, isHydrated]);

  // Direct DOM-based approach for eye movement
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    // Function to update iris position
    const updateIrisPosition = () => {
      if (!eyeRef.current) return;

      try {
        // Get current mouse position from props
        const currentX = mouseX.get();
        const currentY = mouseY.get();

        // Store last valid mouse position
        if (
          currentX !== undefined &&
          currentY !== undefined &&
          !isNaN(currentX) &&
          !isNaN(currentY)
        ) {
          lastMousePosRef.current = { x: currentX, y: currentY };
        }

        const x = lastMousePosRef.current.x;
        const y = lastMousePosRef.current.y;

        // Get eye dimensions
        const eye = eyeRef.current.getBoundingClientRect();
        if (eye.width === 0 || eye.height === 0) return;

        const eyeCenterX = eye.left + eye.width / 2;
        const eyeCenterY = eye.top + eye.height / 2;

        // Update eye center for laser calculations
        setEyeCenter({ x: eyeCenterX, y: eyeCenterY });

        // Calculate direction vector
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        const dx = x * window.innerWidth + windowCenterX - eyeCenterX;
        const dy = y * window.innerHeight + windowCenterY - eyeCenterY;

        // Calculate distance for normalization
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Set maximum movement distances
        const maxDistanceX = Math.min(eye.width, eye.height) / 2.8;
        const maxDistanceY = Math.min(eye.width, eye.height) / 6.0;

        // Calculate normalized offsets
        let offsetX = 0;
        let offsetY = 0;

        if (distance > 0) {
          offsetX = (dx / distance) * Math.min(Math.abs(dx), maxDistanceX);
          offsetY = (dy / distance) * Math.min(Math.abs(dy), maxDistanceY);
        }

        // Update iris position with smooth transition
        setIrisOffset((prev) => ({
          x: prev.x + (offsetX - prev.x) * 0.1,
          y: prev.y + (offsetY - prev.y) * 0.1,
        }));
      } catch (error) {
        console.error('Error updating iris position:', error);
      }

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(updateIrisPosition);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateIrisPosition);

    // Fallback animation if no mouse movement is detected
    let lastOffsetX = 0;
    let lastOffsetY = 0;
    let noMovementCounter = 0;

    autoAnimateRef.current = setInterval(() => {
      // Check if iris has moved
      const currentOffsetX = irisOffset.x;
      const currentOffsetY = irisOffset.y;

      if (
        Math.abs(currentOffsetX - lastOffsetX) < 0.1 &&
        Math.abs(currentOffsetY - lastOffsetY) < 0.1
      ) {
        noMovementCounter++;

        // If no movement for 3 checks (3 seconds), start auto animation
        if (noMovementCounter >= 3) {
          // Generate random eye movement
          const randomX = (Math.random() - 0.5) * 0.4;
          const randomY = (Math.random() - 0.5) * 0.2;

          // Update last mouse position
          lastMousePosRef.current = { x: randomX, y: randomY };

          // Reset counter after applying movement
          noMovementCounter = 0;
        }
      } else {
        // Reset counter if movement detected
        noMovementCounter = 0;
      }

      // Update last position
      lastOffsetX = currentOffsetX;
      lastOffsetY = currentOffsetY;
    }, 1000);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoAnimateRef.current) {
        clearInterval(autoAnimateRef.current);
      }
    };
  }, [isHydrated, animationStage, mouseX, mouseY]);

  // Add direct mouse event listener as a fallback
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined') return;

      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      lastMousePosRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHydrated, animationStage]);

  // Handle mouse/touch press for laser activation
  useEffect(() => {
    if (!isHydrated || animationStage !== 2) return;

    const handleMouseDown = (e: MouseEvent) => {
      activateLaser(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        activateLaser(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseUp = () => {
      deactivateLaser();
    };

    const handleTouchEnd = () => {
      deactivateLaser();
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isHydrated, animationStage, eyeCenter]);

  // Handle mouse/touch movement for laser targeting
  useEffect(() => {
    if (!isHydrated || animationStage !== 2 || !isLaserActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateLaserTarget(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateLaserTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Add event listeners for tracking movement while laser is active
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isHydrated, animationStage, isLaserActive]);

  // Handle hover detection for eye
  useEffect(() => {
    if (!isHydrated || animationStage !== 2 || !eyeContainerRef.current) return;

    const eyeContainer = eyeContainerRef.current;

    // Function to check if point is inside the eye
    const isPointInEye = (clientX: number, clientY: number) => {
      if (!eyeRef.current) return false;

      const eyeRect = eyeRef.current.getBoundingClientRect();

      // Check if point is within the eye's bounding box
      if (
        clientX >= eyeRect.left &&
        clientX <= eyeRect.right &&
        clientY >= eyeRect.top &&
        clientY <= eyeRect.bottom
      ) {
        // For more precise detection, we could check if the point is within the eye shape
        // But for simplicity, we'll use the bounding box
        return true;
      }

      return false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isHovering = isPointInEye(e.clientX, e.clientY);

      if (isHovering && !isEyeHovered) {
        startHoverEffects();
      } else if (!isHovering && isEyeHovered) {
        stopHoverEffects();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const isHovering = isPointInEye(touch.clientX, touch.clientY);

        if (isHovering && !isEyeHovered) {
          startHoverEffects();
        } else if (!isHovering && isEyeHovered) {
          stopHoverEffects();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isHydrated, animationStage, isEyeHovered]);

  // Function to start hover effects
  const startHoverEffects = () => {
    // Clear any existing hover timers
    clearHoverTimers();

    // Set eye as hovered
    setIsEyeHovered(true);

    // Start pupil growth animation
    startPupilGrowth();

    // Start eye shake animation
    startEyeShake();
  };

  // Function to stop hover effects
  const stopHoverEffects = () => {
    // Clear hover timers
    clearHoverTimers();

    // Set eye as not hovered
    setIsEyeHovered(false);

    // Start pupil shrink animation
    startPupilShrink();

    // Stop eye shake with a small delay to make it look more natural
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
    if (pupilAnimRef.current !== null) {
      cancelAnimationFrame(pupilAnimRef.current);
    }

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

    // Notify parent
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

  // Function to start eye shake animation
  const startEyeShake = () => {
    // Clear any existing shake timer
    if (eyeShakeTimerRef.current) {
      clearInterval(eyeShakeTimerRef.current);
    }

    // Start shaking effect
    eyeShakeTimerRef.current = setInterval(() => {
      const shakeX = (Math.random() * 2 - 1) * HOVER_CONFIG.SHAKE_DISTANCE;
      const shakeY = (Math.random() * 2 - 1) * HOVER_CONFIG.SHAKE_DISTANCE;
      setEyeShake({ x: shakeX, y: shakeY });
    }, HOVER_CONFIG.SHAKE_INTERVAL);
  };

  // Function to update the laser target position
  const updateLaserTarget = (clientX: number, clientY: number) => {
    if (isLaserActive) {
      setLaserTarget({ x: clientX, y: clientY });
    }
  };

  // Function to activate the laser
  const activateLaser = (clientX: number, clientY: number) => {
    // Clear any existing timers
    clearLaserTimers();

    // Set initial target point
    updateLaserTarget(clientX, clientY);

    // Reset laser progress
    setLaserProgress(0);

    // Activate laser
    setIsLaserActive(true);

    // Start laser growth animation
    let progress = 0;
    const growthInterval = 10; // Update every 10ms
    const steps = LASER_CONFIG.GROW_DURATION / growthInterval;
    const increment = 1 / steps;

    const growLaser = () => {
      progress += increment;
      if (progress >= 1) {
        progress = 1;
        setLaserProgress(1);

        // Start pulsing and shaking once fully grown
        startLaserEffects();
      } else {
        setLaserProgress(progress);
        laserGrowthTimerRef.current = setTimeout(growLaser, growthInterval);
      }
    };

    // Start growth animation
    laserGrowthTimerRef.current = setTimeout(growLaser, growthInterval);
  };

  // Function to start laser visual effects (pulsing and shaking)
  const startLaserEffects = () => {
    // Start pulsing effect
    let pulseDirection = -1; // Start by decreasing opacity

    laserPulseTimerRef.current = setInterval(() => {
      setLaserOpacity((prev) => {
        let newOpacity = prev + pulseDirection * 0.05;

        // Reverse direction at min/max
        if (newOpacity <= LASER_CONFIG.MIN_OPACITY) {
          newOpacity = LASER_CONFIG.MIN_OPACITY;
          pulseDirection = 1;
        } else if (newOpacity >= LASER_CONFIG.MAX_OPACITY) {
          newOpacity = LASER_CONFIG.MAX_OPACITY;
          pulseDirection = -1;
        }

        return newOpacity;
      });
    }, LASER_CONFIG.PULSE_RATE);

    // Start shaking effect
    laserShakeTimerRef.current = setInterval(() => {
      const shakeX = (Math.random() * 2 - 1) * LASER_CONFIG.SHAKE_DISTANCE;
      const shakeY = (Math.random() * 2 - 1) * LASER_CONFIG.SHAKE_DISTANCE;
      setLaserShake({ x: shakeX, y: shakeY });
    }, LASER_CONFIG.SHAKE_RATE);
  };

  // Function to deactivate the laser
  const deactivateLaser = () => {
    // Clear growth and effect timers
    if (laserGrowthTimerRef.current) clearTimeout(laserGrowthTimerRef.current);
    if (laserPulseTimerRef.current) clearInterval(laserPulseTimerRef.current);
    if (laserShakeTimerRef.current) clearInterval(laserShakeTimerRef.current);

    // Start fade out animation
    let opacity = laserOpacity;
    const fadeInterval = 10; // Update every 10ms
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

    // Start fade animation
    laserFadeTimerRef.current = setTimeout(fadeLaser, fadeInterval);
  };

  // Calculate the pupil radius based on current pupilSize (percentage of iris)
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
            {/* Define the clip path for the eye opening */}
            <defs>
              <clipPath id='eyeClip'>
                <path d={eyelidPaths.clipPath} />
              </clipPath>

              {/* Filter for laser glow effect */}
              <filter id='laserGlow' x='-20%' y='-20%' width='140%' height='140%'>
                <feGaussianBlur stdDeviation={LASER_CONFIG.GLOW_SIZE} result='blur' />
                <feComposite in='SourceGraphic' in2='blur' operator='over' />
              </filter>
            </defs>

            {useCircularEye ? (
              <>
                <circle cx='100' cy='100' r='80' fill='white' />
                <g style={{ transform: `translate(0px, 50px)` }}>
                  <circle cx='100' cy='50' r='25' fill='#5b8fb9' stroke='none' />
                  <circle cx='100' cy='50' r='20' fill='black' stroke='none' />
                  <circle cx='110' cy='40' r='5' fill='white' stroke='none' opacity='0.7' />
                </g>
              </>
            ) : (
              <>
                {/* White sclera (background of the eye) */}
                <path d={eyelidPaths.clipPath} fill='white' />

                {/* Iris group - clipped by the eye opening */}
                <g clipPath='url(#eyeClip)'>
                  <g style={{ transform: `translate(${irisOffset.x}px, ${irisOffset.y}px)` }}>
                    {/* Iris (colored part) */}
                    <circle cx='100' cy='50' r='25' fill='#5b8fb9' stroke='none' />

                    {/* Pupil (black center) - size changes on hover */}
                    <circle cx='100' cy='50' r={pupilRadius} fill='black' stroke='none' />

                    {/* Light reflection */}
                    <circle cx='110' cy='40' r='5' fill='white' stroke='none' opacity='0.7' />
                  </g>
                </g>

                {/* Eye outline (top lid) - drawn on top */}
                <path d={eyelidPaths.topPath} stroke='white' strokeWidth='3' fill='none' />

                {/* Eye outline (bottom lid) - drawn on bottom */}
                <path d={eyelidPaths.bottomPath} stroke='white' strokeWidth='3' fill='none' />
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
              {/* Laser glow effect */}
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

              {/* Main laser beam */}
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
