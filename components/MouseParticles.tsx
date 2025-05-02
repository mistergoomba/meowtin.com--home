'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  let starTexture: THREE.Texture;
  try {
    starTexture = useLoader(THREE.TextureLoader, '/star.png');
  } catch (err) {
    starTexture = new THREE.Texture(); // empty fallback
  }

  const [positions] = useState(() => {
    const arr = new Float32Array(100 * 3);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  });

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.0002 + mouse.y * 0.004;
      mesh.current.rotation.y += 0.0002 + mouse.x * 0.004;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        map={starTexture}
        size={0.25}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

const MouseParticles = () => {
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
};

export default MouseParticles;
