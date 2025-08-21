'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';

function Particles({ isMobile }: { isMobile: boolean }) {
  const mesh = useRef<THREE.Points>(null);
  const { camera } = useThree();

  // ----- Config -----
  const STAR_SIZE_FACTOR = 1.2; // base size multiplier
  const STAR_COUNT = 200;
  const influenceRadius = 3.0;

  const baseOpacity = 0.6;
  const maxOpacity = 0.9;

  // Pop config
  const HIT_RADIUS_PX = 5; // click leeway in pixels
  const POP_SPEED = 0.25; // higher = faster pop
  const POP_SCALE = 2.0; // how big it grows during pop

  const timeRef = useRef(0);
  const phaseRef = useRef<number[]>([]);

  // Per-star pop state
  // popProgress: -1 = inactive; 0..1 animating; >1 finished
  const popProgressRef = useRef<Float32Array>(new Float32Array(STAR_COUNT).fill(-1));
  const poppedRef = useRef<Uint8Array>(new Uint8Array(STAR_COUNT)); // 0/1 flags

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [starTexture, setStarTexture] = useState<THREE.Texture | null>(null);

  const starColorPalettes = useMemo(
    () => [
      new THREE.Color(0xcae1ff),
      new THREE.Color(0xa2c0ff),
      new THREE.Color(0x8db9ff),
      new THREE.Color(0xffffff),
      new THREE.Color(0xf8f7ff),
      new THREE.Color(0xfff4e8),
      new THREE.Color(0xfff2dd),
      new THREE.Color(0xffe4b5),
      new THREE.Color(0xffd700),
      new THREE.Color(0xffb347),
      new THREE.Color(0xffa500),
      new THREE.Color(0xff6b4a),
      new THREE.Color(0xff4500),
    ],
    []
  );

  // Load texture (fallback to circle if needed)
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/star.png',
      (tex) => setStarTexture(tex),
      undefined,
      () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(32, 32, 16, 0, Math.PI * 2);
          ctx.fill();
          setStarTexture(new THREE.CanvasTexture(canvas));
        }
      }
    );
  }, []);

  // Geometry attributes
  const { positions, alphas, sizes, colors } = useMemo(() => {
    const posArray = new Float32Array(STAR_COUNT * 3);
    const alphaArray = new Float32Array(STAR_COUNT);
    const sizeArray = new Float32Array(STAR_COUNT);
    const colorArray = new Float32Array(STAR_COUNT * 3);

    phaseRef.current = Array(STAR_COUNT)
      .fill(0)
      .map(() => Math.random() * Math.PI * 2);

    for (let i = 0; i < STAR_COUNT; i++) {
      posArray[i * 3 + 0] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;

      alphaArray[i] = baseOpacity;

      const sizeFactor = isMobile ? STAR_SIZE_FACTOR * 0.8 : STAR_SIZE_FACTOR;
      const baseSize = 0.2 * sizeFactor;
      const randomVariation = 0.1 * sizeFactor;
      sizeArray[i] = baseSize + Math.random() * randomVariation;

      const randomColor = starColorPalettes[Math.floor(Math.random() * starColorPalettes.length)];
      colorArray[i * 3 + 0] = randomColor.r;
      colorArray[i * 3 + 1] = randomColor.g;
      colorArray[i * 3 + 2] = randomColor.b;
    }

    return { positions: posArray, alphas: alphaArray, sizes: sizeArray, colors: colorArray };
  }, [starColorPalettes, isMobile]);

  const alphaRef = useRef<THREE.BufferAttribute>(new THREE.BufferAttribute(new Float32Array(0), 1));
  const sizeRef = useRef<THREE.BufferAttribute>(new THREE.BufferAttribute(new Float32Array(0), 1));
  const positionAttrRef = useRef<THREE.BufferAttribute>(
    new THREE.BufferAttribute(new Float32Array(0), 3)
  );

  // Mouse/touch movement (for the subtle world rotation & opacity)
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX: number, clientY: number;
      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      setMouse({
        x: (clientX / window.innerWidth - 0.5) * 2 * 5,
        y: -(clientY / window.innerHeight - 0.5) * 2 * 5,
      });
    };

    window.addEventListener('mousemove', handlePointerMove as any);
    window.addEventListener('touchmove', handlePointerMove as any);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove as any);
      window.removeEventListener('touchmove', handlePointerMove as any);
    };
  }, []);

  // Click-to-pop: project each star to screen and test 5px radius
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!mesh.current) return;

      const positionsArr = mesh.current.geometry.attributes.position.array as Float32Array;
      const alphaArray = alphaRef.current.array as Float32Array;
      const sizeArray = sizeRef.current.array as Float32Array;

      const clickX = e.clientX;
      const clickY = e.clientY;

      // Find first star within HIT_RADIUS_PX
      const v = new THREE.Vector3();
      const sp = new THREE.Vector3(); // screen projection
      for (let i = 0; i < STAR_COUNT; i++) {
        // skip already popped
        if (poppedRef.current[i]) continue;
        // Skip fully transparent
        if (alphaArray[i] <= 0) continue;

        v.set(positionsArr[i * 3 + 0], positionsArr[i * 3 + 1], positionsArr[i * 3 + 2]);

        // Project to NDC
        sp.copy(v).project(camera);
        // Convert to pixels
        const sx = (sp.x * 0.5 + 0.5) * window.innerWidth;
        const sy = (-sp.y * 0.5 + 0.5) * window.innerHeight;

        const dx = sx - clickX;
        const dy = sy - clickY;
        const dist = Math.hypot(dx, dy);

        if (dist <= HIT_RADIUS_PX) {
          // Start pop
          popProgressRef.current[i] = 0.0;
          break; // single hit per click
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [camera]);

  useFrame(() => {
    if (!mesh.current || !alphaRef.current || !sizeRef.current) return;

    timeRef.current += 0.008;

    const positionsArr = mesh.current.geometry.attributes.position.array as Float32Array;
    const alphaArray = alphaRef.current.array as Float32Array;
    const sizeArray = sizeRef.current.array as Float32Array;

    const mouseXPos = mouse.x;
    const mouseYPos = mouse.y;
    const influenceRadiusSq = influenceRadius * influenceRadius;
    const opacityRange = maxOpacity - baseOpacity;
    const proximityIncrease = 0.15 * STAR_SIZE_FACTOR;

    for (let i = 0; i < alphaArray.length; i++) {
      // If popped, hold at zero & skip behavior
      if (poppedRef.current[i]) {
        alphaArray[i] = 0;
        sizeArray[i] = 0;
        continue;
      }

      // Pop animation
      const p = popProgressRef.current[i];
      if (p >= 0 && p <= 1.2) {
        const next = p + POP_SPEED; // fast advance
        popProgressRef.current[i] = next;

        // Scale up and fade out quickly
        const scaleUp = 1.0 + Math.min(next, 1.0) * POP_SCALE;
        sizeArray[i] = sizes[i] * scaleUp;
        alphaArray[i] = Math.max(0, 1.0 - next);

        if (next >= 1.0) {
          // Mark dead
          poppedRef.current[i] = 1;
          alphaArray[i] = 0;
          sizeArray[i] = 0;
        }

        // No other effects while popping
        continue;
      }

      // Normal behavior: subtle opacity & size with mouse proximity (no pulsating)
      const x = positionsArr[i * 3 + 0];
      const y = positionsArr[i * 3 + 1];
      const dx = mouseXPos - x;
      const dy = mouseYPos - y;
      const distSq = dx * dx + dy * dy;

      const t = Math.max(0, Math.min(1, 1 - distSq / influenceRadiusSq));

      // No sine-based throbbing; steady response only
      alphaArray[i] = baseOpacity + t * opacityRange;
      sizeArray[i] = sizes[i] + t * proximityIncrease;
    }

    alphaRef.current.needsUpdate = true;
    sizeRef.current.needsUpdate = true;

    // Gentle rotation influenced by mouse
    mesh.current.rotation.x += 0.00002 + mouseYPos * 0.0003;
    mesh.current.rotation.y += 0.00002 + mouseXPos * 0.0003;
  });

  const uniforms = useMemo(
    () => ({
      pointTexture: { value: starTexture },
      pointBase: { value: 7.5 * STAR_SIZE_FACTOR },
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
        uniform float pointBase;

        void main() {
          vAlpha = alpha;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = pointBase * size * (1.0 / -mvPosition.z);
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
          gl_FragColor = vec4(texColor.rgb * vColor, vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, [uniforms, starTexture]);

  if (!starTexture || !material) return null;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
          ref={positionAttrRef}
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

export default function MouseParticles({ isMobile }: { isMobile: boolean }) {
  return (
    <Canvas
      className='absolute inset-0 z-0'
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color('black'));
      }}
    >
      <Particles isMobile={isMobile} />
    </Canvas>
  );
}
