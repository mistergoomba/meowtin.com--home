'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Configuration for the Tron grid effect
const CONFIG = {
  // Number of active lines
  LINE_COUNT: 20,

  // Line lifespan in milliseconds
  LINE_LIFESPAN: 3000,

  // Primary color
  PRIMARY_COLOR: new THREE.Color(0x00aaff),

  // Secondary color for variation
  SECONDARY_COLOR: new THREE.Color(0x00ffaa),

  // Bloom intensity
  BLOOM_INTENSITY: 1.8,

  // Bloom threshold
  BLOOM_THRESHOLD: 0.1,

  // Probability of making a turn (0-1)
  TURN_PROBABILITY: 0.3,

  // Minimum distance between turns
  MIN_TURN_DISTANCE: 0.5,

  // Maximum number of segments per line
  MAX_SEGMENTS: 10,

  // Line speed (units per second)
  LINE_SPEED: 8,

  // Line opacity
  LINE_OPACITY: 0.9,

  // Background image opacity
  BACKGROUND_OPACITY: 0.01,
};

// Possible directions (90 and 45 degree angles)
const DIRECTIONS = {
  UP: new THREE.Vector2(0, 1),
  RIGHT: new THREE.Vector2(1, 0),
  DOWN: new THREE.Vector2(0, -1),
  LEFT: new THREE.Vector2(-1, 0),
  UP_RIGHT: new THREE.Vector2(1, 1).normalize(),
  UP_LEFT: new THREE.Vector2(-1, 1).normalize(),
  DOWN_RIGHT: new THREE.Vector2(1, -1).normalize(),
  DOWN_LEFT: new THREE.Vector2(-1, -1).normalize(),
};

// Edge types
enum Edge {
  TOP = 0,
  RIGHT = 1,
  BOTTOM = 2,
  LEFT = 3,
}

// Line state
interface LineState {
  id: number;
  points: THREE.Vector3[];
  direction: THREE.Vector2;
  speed: number;
  color: THREE.Color;
  startTime: number;
  lastTurnTime: number;
  lastTurnPosition: THREE.Vector2;
  isDiagonal: boolean;
  needsCompletion: boolean;
  completionDirection: THREE.Vector2 | null;
  isComplete: boolean;
}

// Function to get perpendicular direction from edge
function getPerpendicularDirection(edge: Edge): THREE.Vector2 {
  switch (edge) {
    case Edge.TOP:
      return DIRECTIONS.DOWN;
    case Edge.RIGHT:
      return DIRECTIONS.LEFT;
    case Edge.BOTTOM:
      return DIRECTIONS.UP;
    case Edge.LEFT:
      return DIRECTIONS.RIGHT;
  }
}

// Function to get random position on edge
function getRandomPositionOnEdge(
  edge: Edge,
  viewport: { width: number; height: number }
): THREE.Vector2 {
  const halfWidth = viewport.width / 2;
  const halfHeight = viewport.height / 2;

  switch (edge) {
    case Edge.TOP:
      return new THREE.Vector2((Math.random() * viewport.width - halfWidth) * 0.9, halfHeight);
    case Edge.RIGHT:
      return new THREE.Vector2(halfWidth, (Math.random() * viewport.height - halfHeight) * 0.9);
    case Edge.BOTTOM:
      return new THREE.Vector2((Math.random() * viewport.width - halfWidth) * 0.9, -halfHeight);
    case Edge.LEFT:
      return new THREE.Vector2(-halfWidth, (Math.random() * viewport.height - halfHeight) * 0.9);
  }
}

// Function to check if point is outside viewport
function isOutsideViewport(
  point: THREE.Vector2,
  viewport: { width: number; height: number }
): boolean {
  const margin = 0.1; // Small margin to ensure lines fully exit
  const halfWidth = viewport.width / 2 + margin;
  const halfHeight = viewport.height / 2 + margin;

  return (
    point.x < -halfWidth || point.x > halfWidth || point.y < -halfHeight || point.y > halfHeight
  );
}

// Function to get a random direction that's either 90 or 45 degrees from current
function getRandomTurnDirection(
  currentDirection: THREE.Vector2,
  needsCompletion: boolean,
  completionDirection: THREE.Vector2 | null
): {
  direction: THREE.Vector2;
  isDiagonal: boolean;
  needsCompletion: boolean;
  completionDirection: THREE.Vector2 | null;
} {
  // If we need to complete a diagonal turn, use the completion direction
  if (needsCompletion && completionDirection) {
    return {
      direction: completionDirection,
      isDiagonal: false,
      needsCompletion: false,
      completionDirection: null,
    };
  }

  // Get current direction as normalized vector
  const current = new THREE.Vector2(currentDirection.x, currentDirection.y).normalize();

  // Determine if we're currently moving diagonally
  const isCurrentDiagonal = Math.abs(Math.abs(current.x) - Math.abs(current.y)) < 0.1;

  // Possible new directions
  let possibleDirections: THREE.Vector2[] = [];
  let isDiagonal = false;
  let newCompletionDirection: THREE.Vector2 | null = null;

  if (isCurrentDiagonal) {
    // If we're moving diagonally, we can only make 45-degree turns
    // This means moving horizontally or vertically
    if (current.equals(DIRECTIONS.UP_RIGHT) || current.equals(DIRECTIONS.UP_LEFT)) {
      possibleDirections = [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.LEFT];
    } else if (current.equals(DIRECTIONS.DOWN_RIGHT) || current.equals(DIRECTIONS.DOWN_LEFT)) {
      possibleDirections = [DIRECTIONS.DOWN, DIRECTIONS.RIGHT, DIRECTIONS.LEFT];
    }
    isDiagonal = false;
  } else {
    // If we're moving straight, we can make 90-degree or 45-degree turns
    const makeDiagonalTurn = Math.random() < 0.5;

    if (makeDiagonalTurn) {
      // Make a 45-degree turn
      if (current.equals(DIRECTIONS.UP)) {
        possibleDirections = [DIRECTIONS.UP_RIGHT, DIRECTIONS.UP_LEFT];
      } else if (current.equals(DIRECTIONS.RIGHT)) {
        possibleDirections = [DIRECTIONS.UP_RIGHT, DIRECTIONS.DOWN_RIGHT];
      } else if (current.equals(DIRECTIONS.DOWN)) {
        possibleDirections = [DIRECTIONS.DOWN_RIGHT, DIRECTIONS.DOWN_LEFT];
      } else if (current.equals(DIRECTIONS.LEFT)) {
        possibleDirections = [DIRECTIONS.UP_LEFT, DIRECTIONS.DOWN_LEFT];
      }
      isDiagonal = true;

      // Determine completion direction for later
      const selectedDirection =
        possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
      if (selectedDirection.equals(DIRECTIONS.UP_RIGHT)) {
        newCompletionDirection = Math.random() < 0.5 ? DIRECTIONS.UP : DIRECTIONS.RIGHT;
      } else if (selectedDirection.equals(DIRECTIONS.UP_LEFT)) {
        newCompletionDirection = Math.random() < 0.5 ? DIRECTIONS.UP : DIRECTIONS.LEFT;
      } else if (selectedDirection.equals(DIRECTIONS.DOWN_RIGHT)) {
        newCompletionDirection = Math.random() < 0.5 ? DIRECTIONS.DOWN : DIRECTIONS.RIGHT;
      } else if (selectedDirection.equals(DIRECTIONS.DOWN_LEFT)) {
        newCompletionDirection = Math.random() < 0.5 ? DIRECTIONS.DOWN : DIRECTIONS.LEFT;
      }
    } else {
      // Make a 90-degree turn
      if (current.equals(DIRECTIONS.UP) || current.equals(DIRECTIONS.DOWN)) {
        possibleDirections = [DIRECTIONS.RIGHT, DIRECTIONS.LEFT];
      } else {
        possibleDirections = [DIRECTIONS.UP, DIRECTIONS.DOWN];
      }
      isDiagonal = false;
    }
  }

  // Select a random direction from the possible ones
  const newDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

  return {
    direction: newDirection,
    isDiagonal,
    needsCompletion: isDiagonal,
    completionDirection: newCompletionDirection,
  };
}

// Background component that fills the screen
function Background({
  backgroundImageUrl,
  opacity,
}: {
  backgroundImageUrl: string;
  opacity: number;
}) {
  const { viewport } = useThree();

  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    loader.load(
      backgroundImageUrl,
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
  }, [backgroundImageUrl]);

  if (!texture) return null;

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width + 2, viewport.height + 2]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Main scene component
function Scene({ backgroundImageUrl }: { backgroundImageUrl: string }) {
  const { viewport } = useThree();
  const linesRef = useRef<LineState[]>([]);
  const nextIdRef = useRef(0);
  const linesMeshRef = useRef<THREE.LineSegments>(null);
  const positionsRef = useRef<Float32Array>(
    new Float32Array(CONFIG.LINE_COUNT * CONFIG.MAX_SEGMENTS * 6)
  );
  const colorsRef = useRef<Float32Array>(
    new Float32Array(CONFIG.LINE_COUNT * CONFIG.MAX_SEGMENTS * 6)
  );

  // Initialize lines
  useEffect(() => {
    linesRef.current = [];
    nextIdRef.current = 0;
  }, []);

  // Create a new line
  const createLine = () => {
    // Select random edge to start from
    const startEdge = Math.floor(Math.random() * 4) as Edge;

    // Get random position on that edge
    const startPosition = getRandomPositionOnEdge(startEdge, viewport);

    // Get direction perpendicular to the edge
    const direction = getPerpendicularDirection(startEdge);

    // Create initial point
    const initialPoint = new THREE.Vector3(startPosition.x, startPosition.y, 0);

    // Create line state
    const line: LineState = {
      id: nextIdRef.current++,
      points: [initialPoint],
      direction,
      speed: CONFIG.LINE_SPEED * (0.8 + Math.random() * 0.4), // Slight speed variation
      color: Math.random() > 0.5 ? CONFIG.PRIMARY_COLOR : CONFIG.SECONDARY_COLOR,
      startTime: Date.now(),
      lastTurnTime: Date.now(),
      lastTurnPosition: new THREE.Vector2(startPosition.x, startPosition.y),
      isDiagonal: false,
      needsCompletion: false,
      completionDirection: null,
      isComplete: false,
    };

    return line;
  };

  // Animation loop
  useFrame((_, delta) => {
    if (!linesMeshRef.current) return;

    const currentTime = Date.now();
    const positions = positionsRef.current;
    const colors = colorsRef.current;

    // Add new lines if needed
    while (linesRef.current.length < CONFIG.LINE_COUNT) {
      linesRef.current.push(createLine());
    }

    // Update each line
    linesRef.current.forEach((line, lineIndex) => {
      // Check if line has expired
      const age = currentTime - line.startTime;
      if (age > CONFIG.LINE_LIFESPAN || line.isComplete) {
        // Replace with a new line
        linesRef.current[lineIndex] = createLine();
        return;
      }

      // Get the last point
      const lastPoint = line.points[line.points.length - 1];
      const lastPointVec2 = new THREE.Vector2(lastPoint.x, lastPoint.y);

      // Check if we need to make a turn
      const distanceFromLastTurn = lastPointVec2.distanceTo(line.lastTurnPosition);
      const shouldTurn =
        distanceFromLastTurn > CONFIG.MIN_TURN_DISTANCE &&
        Math.random() < CONFIG.TURN_PROBABILITY * delta * 60;

      // Make a turn if needed
      if (shouldTurn || line.needsCompletion) {
        const turnResult = getRandomTurnDirection(
          line.direction,
          line.needsCompletion,
          line.completionDirection
        );

        line.direction = turnResult.direction;
        line.isDiagonal = turnResult.isDiagonal;
        line.needsCompletion = turnResult.needsCompletion;
        line.completionDirection = turnResult.completionDirection;
        line.lastTurnTime = currentTime;
        line.lastTurnPosition = lastPointVec2.clone();

        // Add a point at the turn location
        line.points.push(new THREE.Vector3(lastPoint.x, lastPoint.y, 0));

        // Limit the number of points
        if (line.points.length > CONFIG.MAX_SEGMENTS) {
          line.points.shift();
        }
      }

      // Move in the current direction
      const moveDistance = line.speed * delta;
      const newX = lastPoint.x + line.direction.x * moveDistance;
      const newY = lastPoint.y + line.direction.y * moveDistance;
      const newPoint = new THREE.Vector3(newX, newY, 0);

      // Add the new point
      line.points.push(newPoint);

      // Limit the number of points
      if (line.points.length > CONFIG.MAX_SEGMENTS) {
        line.points.shift();
      }

      // Check if the line has left the viewport
      if (isOutsideViewport(new THREE.Vector2(newX, newY), viewport)) {
        line.isComplete = true;
      }

      // Update the geometry
      for (let i = 0; i < line.points.length - 1; i++) {
        const p1 = line.points[i];
        const p2 = line.points[i + 1];

        const baseIdx = lineIndex * CONFIG.MAX_SEGMENTS * 6 + i * 6;

        // Set positions
        positions[baseIdx] = p1.x;
        positions[baseIdx + 1] = p1.y;
        positions[baseIdx + 2] = p1.z;

        positions[baseIdx + 3] = p2.x;
        positions[baseIdx + 4] = p2.y;
        positions[baseIdx + 5] = p2.z;

        // Set colors with fade effect
        const alpha = (1 - i / (line.points.length - 1)) * CONFIG.LINE_OPACITY; // Fade out older segments

        colors[baseIdx] = line.color.r;
        colors[baseIdx + 1] = line.color.g;
        colors[baseIdx + 2] = line.color.b;
        colors[baseIdx + 3] = line.color.r;
        colors[baseIdx + 4] = line.color.g;
        colors[baseIdx + 5] = line.color.b;
      }
    });

    // Update the geometry
    const geometry = linesMeshRef.current.geometry;
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      {/* Background image with fixed low opacity */}
      <Background backgroundImageUrl={backgroundImageUrl} opacity={CONFIG.BACKGROUND_OPACITY} />

      {/* Tron grid lines */}
      <lineSegments ref={linesMeshRef} position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            count={CONFIG.LINE_COUNT * CONFIG.MAX_SEGMENTS * 2}
            array={positionsRef.current}
            itemSize={3}
            args={[positionsRef.current, 3]}
          />
          <bufferAttribute
            attach='attributes-color'
            count={CONFIG.LINE_COUNT * CONFIG.MAX_SEGMENTS * 2}
            array={colorsRef.current}
            itemSize={3}
            args={[colorsRef.current, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach='material'
          vertexColors
          transparent={true}
          opacity={CONFIG.LINE_OPACITY}
        />
      </lineSegments>

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={CONFIG.BLOOM_INTENSITY}
          luminanceThreshold={CONFIG.BLOOM_THRESHOLD}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
}

// Main component
export default function TronGrid({
  backgroundImageUrl = '/background.png',
}: {
  backgroundImageUrl?: string;
}) {
  return (
    <div className='fixed inset-0 z-0 bg-black'>
      <Canvas>
        <Scene backgroundImageUrl={backgroundImageUrl} />
      </Canvas>
    </div>
  );
}
