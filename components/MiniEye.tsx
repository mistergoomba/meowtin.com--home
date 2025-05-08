import { useSpring } from 'framer-motion';
import { useMotionValue } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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

export default function MiniEye() {
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 });
  const [blinkStage, setBlinkStage] = useState(0);
  const pupilSizeRef = useRef(HOVER_CONFIG.NORMAL_PUPIL_SIZE);
  const [pupilSize, _setPupilSize] = useState(HOVER_CONFIG.NORMAL_PUPIL_SIZE);

  // Hover effect states
  const [isEyeHovered, setIsEyeHovered] = useState(false);
  const [eyeShake, setEyeShake] = useState({ x: 0, y: 0 });
  const pupilGrowthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const eyeShakeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const eyeRef = useRef<SVGSVGElement>(null);
  const eyeContainerRef = useRef<HTMLDivElement>(null);
  const autoAnimateRef = useRef<NodeJS.Timeout | null>(null);

  // Raw motion values for tracking cursor/touch position
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring animations for natural movement
  const mouseX = useSpring(rawX, {
    stiffness: 120, // Further reduced for gentler movement
    damping: 10, // Increased damping for less oscillation
    mass: 0.8, // Increased mass for more inertia
  });

  const mouseY = useSpring(rawY, {
    stiffness: 120, // Further reduced for gentler movement
    damping: 10, // Increased damping for less oscillation
    mass: 0.8, // Increased mass for more inertia
  });

  const router = useRouter();
  const pathname = usePathname();

  // Get eyelid paths based on blink stage - with pointed ends
  const getEyelidPaths = () => {
    // Define the clip path for the eye opening - with pointed ends
    const clipPaths = [
      'M15,40 Q100,0 185,40 L185,60 Q100,100 15,60 Z', // Fully open
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z', // Half closed
      'M15,50 Q100,50 185,50 L185,50 Q100,50 15,50 Z', // Fully closed (a line)
      'M15,45 Q100,20 185,45 L185,55 Q100,80 15,55 Z', // Half open
    ];

    return clipPaths[blinkStage];
  };

  const eyelidPaths = getEyelidPaths();

  const handleEyeClick = () => {
    const path = pathname.replace(/\/+$/, ''); // remove trailing slashes
    if (path === '/eye') {
      // Reload the page if already on /eye
      window.location.reload();
    } else {
      router.push('/eye');
    }
  };

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

  // Clear all hover-related timers
  const clearHoverTimers = () => {
    if (pupilGrowthTimerRef.current) clearTimeout(pupilGrowthTimerRef.current);
    if (eyeShakeTimerRef.current) clearInterval(eyeShakeTimerRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
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

  // Handle hover detection for eye
  useEffect(() => {
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
  }, [isEyeHovered]);

  // Handle blinking
  useEffect(() => {
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
  }, []);

  // Track if touch is active
  const [isTouchActive, setIsTouchActive] = useState(false);

  // Track screen size for responsive positioning
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  // Track if component is mounted
  const isMounted = useRef(false);

  // Update screen size state
  useEffect(() => {
    setIsClient(true);
    isMounted.current = true;

    const handleResize = () => {
      if (!isMounted.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setIsMobile(width < 768); // Standard mobile breakpoint
    };

    // Initial check
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      isMounted.current = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Set up mouse/touch events
  useEffect(() => {
    if (!isMounted.current || !isClient) return;

    let idleTimeout: NodeJS.Timeout | null = null;
    let driftInterval: NodeJS.Timeout | null = null;
    let lastUpdateTime = 0;
    const throttleTime = 16; // ~60fps

    // Function to create subtle random movement when idle
    const startDrift = () => {
      if (isTouchActive) return; // Don't drift if touch is active

      driftInterval = setInterval(() => {
        const driftX = (Math.random() - 0.5) * 0.2; // Reduced drift amount
        const driftY = (Math.random() - 0.5) * 0.2; // Reduced drift amount
        rawX.set(rawX.get() + driftX);
        rawY.set(rawY.get() + driftY);
      }, 1200); // Slower drift interval
    };

    const stopDrift = () => {
      if (driftInterval) clearInterval(driftInterval);
    };

    // Throttled function to update mouse position
    const updateMousePosition = (clientX: number, clientY: number) => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleTime) return;

      lastUpdateTime = now;

      if (typeof window === 'undefined') return;

      const x = clientX / window.innerWidth - 0.5;
      const y = clientY / window.innerHeight - 0.5;

      // Use spring.set() for smoother transitions
      mouseX.set(x);
      mouseY.set(y);

      // Set raw values for other components
      rawX.set(x);
      rawY.set(y);

      // Reset idle timer on mouse movement
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => startDrift(), 5000);
      stopDrift();
    };

    // Handle mouse movement for desktop
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      // Always prevent default on touch to prevent scrolling
      e.preventDefault();

      setIsTouchActive(true);
      stopDrift(); // Stop any drift when touch starts

      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Always prevent default on touch to prevent scrolling
      e.preventDefault();

      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Always prevent default on touch to prevent scrolling
      e.preventDefault();

      setIsTouchActive(false);
      // Start idle drift after touch ends
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => startDrift(), 5000);
    };

    // Add event listeners only if window is available
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: false }); // passive: false to allow preventDefault
      window.addEventListener('touchmove', handleTouchMove, { passive: false }); // passive: false to allow preventDefault
      window.addEventListener('touchend', handleTouchEnd, { passive: false }); // passive: false to allow preventDefault

      // Start with idle drift
      idleTimeout = setTimeout(() => startDrift(), 5000);

      // Initialize with a small movement to ensure animation starts
      setTimeout(() => {
        updateMousePosition(window.innerWidth / 2 + 10, window.innerHeight / 2 + 10);
      }, 100);
    }

    // Cleanup event listeners and intervals
    return () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      if (driftInterval) clearInterval(driftInterval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [rawX, rawY, mouseX, mouseY, isTouchActive, isClient]);

  // Direct DOM-based approach for eye movement
  useEffect(() => {
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
  }, [mouseX, mouseY]);

  // Calculate the pupil radius based on current pupilSize (percentage of iris)
  const pupilRadius = 25 * (pupilSize / 100);

  return (
    <div
      className={`relative w-[200px] h-[100px] cursor-pointer`}
      onClick={handleEyeClick}
      ref={eyeContainerRef}
      style={{
        transform: isEyeHovered ? `translate(${eyeShake.x}px, ${eyeShake.y}px)` : 'none',
        transition: isEyeHovered ? 'none' : 'transform 0.1s ease-out',
      }}
    >
      {/* Eye SVG */}
      <svg
        width='200'
        height={'100'}
        viewBox={'0 0 200 100'}
        ref={eyeRef}
        className='absolute top-0 left-0 z-20'
      >
        {/* Define the clip path for the eye opening */}
        <defs>
          <clipPath id='eyeClip'>
            <path d={eyelidPaths} />
          </clipPath>
        </defs>

        {/* White sclera (background of the eye) */}
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
      </svg>
    </div>
  );
}
