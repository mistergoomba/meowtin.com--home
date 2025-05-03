'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';

// ===== STAR SIZE CONTROL =====
// Adjust this value to control the overall size of stars
// Lower values = smaller stars, Higher values = larger stars
// Try values between 0.1 (tiny stars) and 1.0 (large stars)
const STAR_SIZE_FACTOR = 0.6;

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const { scene } = useThree();

  // Increased influence radius for mouse
  const influenceRadius = 3.0;

  // Reduced base opacity to make stars dimmer by default
  const baseOpacity = 0.3;
  const maxOpacity = 0.9;

  // Store time for throbbing effect
  const timeRef = useRef(0);

  // Store individual star throbbing phases
  const phaseRef = useRef<number[]>([]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [starTexture, setStarTexture] = useState<THREE.Texture | null>(null);

  // Define star color palettes - these are common star colors in astronomy
  const starColorPalettes = useMemo(
    () => [
      // Blue-white hot stars (O, B type)
      new THREE.Color(0xcae1ff),
      new THREE.Color(0xa2c0ff),
      new THREE.Color(0x8db9ff),

      // White stars (A type)
      new THREE.Color(0xffffff),
      new THREE.Color(0xf8f7ff),

      // Yellow-white stars (F type)
      new THREE.Color(0xfff4e8),
      new THREE.Color(0xfff2dd),

      // Yellow stars like our Sun (G type)
      new THREE.Color(0xffe4b5),
      new THREE.Color(0xffd700),

      // Orange stars (K type)
      new THREE.Color(0xffb347),
      new THREE.Color(0xffa500),

      // Red stars (M type)
      new THREE.Color(0xff6b4a),
      new THREE.Color(0xff4500),
    ],
    []
  );

  // Load texture with error handling
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous'; // Important for CORS

    // Try to load the texture with absolute URL
    textureLoader.load(
      '/star.png',
      (texture) => {
        setStarTexture(texture);
      },
      undefined, // onProgress callback not needed
      (err) => {
        console.error('Error loading star texture:', err);
        // Create a fallback texture - a simple white circle
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(32, 32, 16, 0, Math.PI * 2);
          ctx.fill();

          const fallbackTexture = new THREE.CanvasTexture(canvas);
          setStarTexture(fallbackTexture);
        }
      }
    );
  }, []);

  const { positions, alphas, sizes, colors } = useMemo(() => {
    const count = 100;
    const posArray = new Float32Array(count * 3);
    const alphaArray = new Float32Array(count);
    const sizeArray = new Float32Array(count);
    const colorArray = new Float32Array(count * 3);

    // Initialize random phases for each star
    phaseRef.current = Array(count)
      .fill(0)
      .map(() => Math.random() * Math.PI * 2);

    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 0] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
      alphaArray[i] = baseOpacity;

      // Base size scaled by STAR_SIZE_FACTOR
      const baseSize = 0.1 * STAR_SIZE_FACTOR;
      const randomVariation = 0.05 * STAR_SIZE_FACTOR;
      sizeArray[i] = baseSize + Math.random() * randomVariation;

      // Assign a random color from our palette
      const randomColor = starColorPalettes[Math.floor(Math.random() * starColorPalettes.length)];
      colorArray[i * 3 + 0] = randomColor.r;
      colorArray[i * 3 + 1] = randomColor.g;
      colorArray[i * 3 + 2] = randomColor.b;
    }

    return {
      positions: posArray,
      alphas: alphaArray,
      sizes: sizeArray,
      colors: colorArray,
    };
  }, [starColorPalettes]);

  const alphaRef = useRef<THREE.BufferAttribute>(new THREE.BufferAttribute(new Float32Array(0), 1));
  const sizeRef = useRef<THREE.BufferAttribute>(new THREE.BufferAttribute(new Float32Array(0), 1));

  useEffect(() => {
    // Handle both mouse and touch events with the same function
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;

      if ('touches' in e) {
        // Touch event
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Mouse event
        clientX = e.clientX;
        clientY = e.clientY;
      }

      setMouse({
        x: (clientX / window.innerWidth - 0.5) * 2 * 5,
        y: -(clientY / window.innerHeight - 0.5) * 2 * 5,
      });
    };

    // Add event listeners for both mouse and touch
    window.addEventListener('mousemove', handlePointerMove as any);
    window.addEventListener('touchmove', handlePointerMove as any);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove as any);
      window.removeEventListener('touchmove', handlePointerMove as any);
    };
  }, []);

  useFrame((state) => {
    if (!mesh.current || !alphaRef.current || !sizeRef.current) return;

    // Update time for throbbing effect
    timeRef.current += 0.01;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < alphas.length; i++) {
      const x = positions[i * 3 + 0];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      // Calculate distance to mouse in 3D space
      const dx = mouse.x - x;
      const dy = mouse.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Calculate influence factor (0 to 1)
      // Smoother falloff with quadratic easing
      const t = Math.max(0, Math.min(1, 1 - (dist * dist) / (influenceRadius * influenceRadius)));

      // Calculate throbbing effect - stronger when closer to mouse
      const throb = t * Math.sin(timeRef.current * 3 + phaseRef.current[i]) * 0.3 + 0.7;

      // Combine base opacity, proximity effect, and throbbing
      const a = baseOpacity + t * (maxOpacity - baseOpacity) * throb;

      // Size increase on proximity scaled by STAR_SIZE_FACTOR
      const baseSize = sizes[i];
      const proximityIncrease = 0.15 * STAR_SIZE_FACTOR;
      const s = baseSize + t * proximityIncrease * throb;

      alphaRef.current.setX(i, a);
      sizeRef.current.setX(i, s);
    }

    alphaRef.current.needsUpdate = true;
    sizeRef.current.needsUpdate = true;

    // SLOWED DOWN ROTATION SPEED
    mesh.current.rotation.x += 0.00002 + mouse.y * 0.0004;
    mesh.current.rotation.y += 0.00002 + mouse.x * 0.0004;
  });

  const uniforms = useMemo(
    () => ({
      pointTexture: { value: starTexture },
    }),
    [starTexture]
  );

  const material = useMemo(() => {
    if (!starTexture) return null;

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        attribute float alpha;
        attribute float size;
        attribute vec3 color;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vAlpha = alpha;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Base shader size scaled by STAR_SIZE_FACTOR
          gl_PointSize = ${7.5 * STAR_SIZE_FACTOR} * size * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          if (texColor.a < 0.1) discard;
          // Apply the star's color to the texture
          gl_FragColor = vec4(texColor.rgb * vColor, vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, [uniforms, starTexture]);

  // Don't render until texture is loaded
  if (!starTexture || !material) return null;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach='attributes-alpha'
          array={alphas}
          count={alphas.length}
          itemSize={1}
          ref={alphaRef}
          args={[alphas, 1]}
        />
        <bufferAttribute
          attach='attributes-size'
          array={sizes}
          count={sizes.length}
          itemSize={1}
          ref={sizeRef}
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach='attributes-color'
          array={colors}
          count={colors.length / 3}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <primitive object={material} attach='material' />
    </points>
  );
}

export default function MouseParticles() {
  return (
    <Canvas
      className='absolute inset-0 z-0'
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('black'));
      }}
    >
      <Particles />
    </Canvas>
  );
}
