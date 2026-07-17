'use client';

import { useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type PointerRef = MutableRefObject<{ x: number; y: number }>;

/**
 * Calm, drifting atmosphere behind the hero. Two particle shells tinted toward
 * the active role's accent (lerped, so the shift is barely perceptible).
 *
 * Cursor magnetism: while the pointer is moving, nearby particles are pulled
 * toward it (falloff by distance); when it stops, they ease back to their home
 * positions. The pull ramps with pointer movement, so a still cursor leaves the
 * field at rest — no permanent clump at center.
 */

function makePositions(count: number, spread: [number, number, number]) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * spread[0];
    arr[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
    arr[i * 3 + 2] = (Math.random() - 0.5) * spread[2];
  }
  return arr;
}

function ParticleShell({
  colorHex,
  count,
  spread,
  size,
  opacity,
  pull,
  radius,
  drift,
  reduced,
  pointer,
}: {
  colorHex: string;
  count: number;
  spread: [number, number, number];
  size: number;
  opacity: number;
  pull: number;
  radius: number;
  drift: number;
  reduced: boolean;
  pointer: PointerRef;
}) {
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const home = useMemo(() => makePositions(count, spread), [count, spread]);
  const live = useMemo(() => home.slice(), [home]);
  const target = useMemo(() => new THREE.Color(colorHex), [colorHex]);

  // how strongly the cursor is currently "active" (ramps up on move, decays at rest)
  const intensity = useRef(0);
  const prevPointer = useRef(new THREE.Vector2());

  useFrame((state) => {
    if (matRef.current) matRef.current.color.lerp(target, 0.02);

    const posAttr = geoRef.current?.attributes.position as THREE.BufferAttribute | undefined;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;

    // normalized cursor (-0.5..0.5) → world units on the z=0 plane.
    // screen-y grows downward, so flip it for world space.
    const px = pointer.current.x;
    const py = pointer.current.y;
    const cx = px * state.viewport.width;
    const cy = -py * state.viewport.height;

    // ramp intensity with pointer movement, decay when idle
    const moved = Math.hypot(px - prevPointer.current.x, py - prevPointer.current.y);
    prevPointer.current.set(px, py);
    if (reduced) {
      intensity.current = 0;
    } else if (moved > 0.0006) {
      intensity.current = 1;
    } else {
      intensity.current = THREE.MathUtils.lerp(intensity.current, 0, 0.04);
    }
    const active = intensity.current;

    const r2 = radius * radius;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      // gentle ambient drift around the home position (keeps the field alive)
      const hx = home[ix] + (reduced ? 0 : Math.sin(t * 0.2 + home[iz]) * drift);
      const hy = home[iy] + (reduced ? 0 : Math.cos(t * 0.18 + home[ix]) * drift);
      const hz = home[iz];

      let tx = hx;
      let ty = hy;
      if (active > 0.001) {
        const dx = cx - hx;
        const dy = cy - hy;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          // smooth falloff: 1 at the cursor, 0 at the radius edge
          const f = 1 - Math.sqrt(d2) / radius;
          const k = f * f * pull * active;
          tx = hx + dx * k;
          ty = hy + dy * k;
        }
      }

      // ease live position toward the target
      arr[ix] += (tx - arr[ix]) * 0.12;
      arr[iy] += (ty - arr[iy]) * 0.12;
      arr[iz] += (hz - arr[iz]) * 0.12;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[live, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroBackground({
  colorHex,
  reduced = false,
  pointer,
}: {
  colorHex: string;
  reduced?: boolean;
  pointer: PointerRef;
}) {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 7], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ParticleShell
        colorHex={colorHex}
        count={1400}
        spread={[22, 14, 9]}
        size={0.028}
        opacity={0.55}
        pull={0.5}
        radius={4.5}
        drift={0.12}
        reduced={reduced}
        pointer={pointer}
      />
      <ParticleShell
        colorHex={colorHex}
        count={500}
        spread={[14, 10, 6]}
        size={0.06}
        opacity={0.75}
        pull={0.8}
        radius={5}
        drift={0.18}
        reduced={reduced}
        pointer={pointer}
      />
    </Canvas>
  );
}
