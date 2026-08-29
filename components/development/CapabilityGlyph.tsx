/**
 * Line-art glyphs for the capability cards on /development/ai.
 *
 * These are drawn rather than photographed on purpose. The AI work is unbranded,
 * so there are no UI captures to use — and a page of red MISSING IMAGE squares
 * would be worse than no imagery at all. Every glyph is stroke-only and inherits
 * `currentColor`, so the card controls the accent and nothing here needs an asset.
 *
 * House style, matching the architecture diagrams in public/projects/:
 * thin linework, geometric, generous negative space, no text.
 */

export type GlyphName =
  | 'fleet'
  | 'tools'
  | 'skills'
  | 'widgets'
  | 'boundary'
  | 'authority'
  | 'payload'
  | 'anomaly'
  | 'failure'
  | 'groundtruth'
  | 'board'
  | 'network'
  | 'chip'
  | 'dialogue'
  | 'handoff'
  | 'stack'
  | 'deploy'
  | 'workflow';

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Eight points evenly spaced on a circle — used by the `network` glyph. */
const RING = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
  return { x: 24 + Math.cos(a) * 16, y: 24 + Math.sin(a) * 16 };
});

const GLYPHS: Record<GlyphName, React.ReactNode> = {
  // A fleet of specialists that talk to each other, not one big assistant.
  fleet: (
    <>
      <path d="M19.1 15 H28.9 M16.5 21 L21 28 M31.5 21 L27 28" {...STROKE} opacity={0.5} />
      <path d="M13 8 L19.1 11.5 V18.5 L13 22 L6.9 18.5 V11.5 Z" {...STROKE} />
      <path d="M35 8 L41.1 11.5 V18.5 L35 22 L28.9 18.5 V11.5 Z" {...STROKE} />
      <path d="M24 27 L30.1 30.5 V37.5 L24 41 L17.9 37.5 V30.5 Z" {...STROKE} />
      <circle cx={13} cy={15} r={1.8} fill="currentColor" opacity={0.7} />
      <circle cx={35} cy={15} r={1.8} fill="currentColor" opacity={0.7} />
      <circle cx={24} cy={34} r={1.8} fill="currentColor" opacity={0.7} />
    </>
  ),

  // A tool library: many discrete capabilities, one of them lit.
  tools: (
    <>
      {[6, 19, 32].map((y) =>
        [6, 19, 32].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={10} height={10} rx={1.5} {...STROKE} />
        )),
      )}
      <rect x={19} y={19} width={10} height={10} rx={1.5} fill="currentColor" opacity={0.35} />
    </>
  ),

  // A skill sitting above the tools it grants: judgment on top of capability.
  skills: (
    <>
      <path d="M24 5 L31 12 L24 19 L17 12 Z" {...STROKE} />
      <path d="M24 19 V24 M24 24 H11 V30 M24 24 H37 V30 M24 24 V30" {...STROKE} />
      <rect x={6} y={30} width={10} height={10} rx={1.5} {...STROKE} />
      <rect x={19} y={30} width={10} height={10} rx={1.5} {...STROKE} />
      <rect x={32} y={30} width={10} height={10} rx={1.5} {...STROKE} />
    </>
  ),

  // A dashboard assembled from the same tools the agents call.
  widgets: (
    <>
      <rect x={5} y={8} width={22} height={15} rx={2} {...STROKE} />
      <path d="M10 18 L14 14 L18 17 L22 12" {...STROKE} opacity={0.7} />
      <rect x={31} y={8} width={12} height={15} rx={2} {...STROKE} opacity={0.8} />
      <rect x={5} y={27} width={12} height={14} rx={2} {...STROKE} opacity={0.8} />
      <rect x={21} y={27} width={22} height={14} rx={2} {...STROKE} />
      <path d="M26 34 H38 M26 37.5 H34" {...STROKE} opacity={0.6} />
    </>
  ),

  // A malformed call arriving at a validated boundary and being stopped.
  boundary: (
    <>
      <path d="M5 24 H23" {...STROKE} />
      <path d="M19 19 L24 24 L19 29" {...STROKE} />
      <path d="M31 7 V41" {...STROKE} strokeDasharray="3 3" />
      <circle cx={31} cy={24} r={6} {...STROKE} />
      <path d="M27 20 L35 28 M35 20 L27 28" {...STROKE} />
    </>
  ),

  // Nested organizations with authority falling downward and never sideways.
  authority: (
    <>
      <path d="M24 3 V9" {...STROKE} />
      <path d="M20 7 L24 11 L28 7" {...STROKE} />
      <rect x={5} y={12} width={38} height={31} rx={3} {...STROKE} />
      <rect x={11} y={18} width={26} height={19} rx={2.5} {...STROKE} opacity={0.75} />
      <rect x={17} y={24} width={14} height={8} rx={1.5} {...STROKE} opacity={0.5} />
    </>
  ),

  // A structured payload rendered straight through as rows — no prose in between.
  payload: (
    <>
      <path d="M14 8 H7 V40 H14" {...STROKE} />
      <rect x={20} y={9} width={22} height={9} rx={1.5} {...STROKE} />
      <rect x={20} y={20} width={22} height={9} rx={1.5} {...STROKE} />
      <rect x={20} y={31} width={22} height={9} rx={1.5} {...STROKE} />
      <circle cx={24.5} cy={13.5} r={1.4} fill="currentColor" />
      <circle cx={24.5} cy={24.5} r={1.4} fill="currentColor" />
      <circle cx={24.5} cy={35.5} r={1.4} fill="currentColor" />
    </>
  ),

  // A flat signal with one anomaly, ringed.
  anomaly: (
    <>
      <path d="M3 30 H15 L19 12 L25 36 L29 30 H45" {...STROKE} />
      <circle cx={22} cy={24} r={10} {...STROKE} strokeDasharray="2.5 3" opacity={0.7} />
    </>
  ),

  // A failure that reads as a failure: a broken frame, not an empty one.
  failure: (
    <>
      <path d="M24 6 L43 40 H5 Z" {...STROKE} />
      <path d="M24 18 V27" {...STROKE} />
      <circle cx={24} cy={33} r={1.6} fill="currentColor" />
    </>
  ),

  // The database as ground truth, not the chat transcript.
  groundtruth: (
    <>
      <ellipse cx={24} cy={12} rx={14} ry={5} {...STROKE} />
      <path d="M10 12 V34 A14 5 0 0 0 38 34 V12" {...STROKE} />
      <path d="M10 23 A14 5 0 0 0 38 23" {...STROKE} opacity={0.5} />
      <path d="M18 31 L22 35 L31 25" {...STROKE} />
    </>
  ),

  // A floor being rearranged: the game both a person and a machine can play.
  board: (
    <>
      <rect x={4} y={7} width={40} height={34} rx={2.5} {...STROKE} />
      <path d="M17 7 V41 M31 7 V41 M4 24 H44" {...STROKE} opacity={0.25} />
      <circle cx={10.5} cy={15.5} r={3.5} {...STROKE} />
      <circle cx={24} cy={32.5} r={3.5} {...STROKE} />
      <circle cx={37.5} cy={15.5} r={3.5} {...STROKE} opacity={0.45} strokeDasharray="2.5 2.5" />
      <path d="M27.5 30 L34 18.5" {...STROKE} opacity={0.7} />
      <path d="M30.5 18.5 L34.5 17.5 L33.5 21.5" {...STROKE} opacity={0.7} />
    </>
  ),

  // Many independent learners compiling into one consensus network.
  network: (
    <>
      {RING.map((p, i) => (
        <path key={`l${i}`} d={`M24 24 L${p.x.toFixed(1)} ${p.y.toFixed(1)}`} {...STROKE} opacity={0.45} />
      ))}
      {RING.map((p, i) => (
        <circle key={`n${i}`} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={3} {...STROKE} />
      ))}
      <circle cx={24} cy={24} r={6} {...STROKE} />
      <circle cx={24} cy={24} r={2.5} fill="currentColor" opacity={0.6} />
    </>
  ),

  // A model running on hardware you control.
  chip: (
    <>
      <rect x={13} y={13} width={22} height={22} rx={2.5} {...STROKE} />
      <rect x={19} y={19} width={10} height={10} rx={1.5} {...STROKE} opacity={0.6} />
      <path
        d="M19 13 V6 M24 13 V6 M29 13 V6 M19 35 V42 M24 35 V42 M29 35 V42 M13 19 H6 M13 24 H6 M13 29 H6 M35 19 H42 M35 24 H42 M35 29 H42"
        {...STROKE}
      />
    </>
  ),

  // A directed interview: the follow-up is the point.
  dialogue: (
    <>
      <path d="M5 9 H31 A2.5 2.5 0 0 1 33.5 11.5 V22 A2.5 2.5 0 0 1 31 24.5 H14 L8 30 V24.5 H5 A2.5 2.5 0 0 1 2.5 22 V11.5 A2.5 2.5 0 0 1 5 9 Z" {...STROKE} />
      <path d="M20 27 H43 A2.5 2.5 0 0 1 45.5 29.5 V38 A2.5 2.5 0 0 1 43 40.5 H26 L20 45.5 V40.5 A2.5 2.5 0 0 1 17.5 38 V29.5 A2.5 2.5 0 0 1 20 27 Z" {...STROKE} opacity={0.6} />
    </>
  ),

  // An irreversible action stopping at a gate for a person to approve.
  handoff: (
    <>
      <rect x={3} y={17} width={13} height={14} rx={2} {...STROKE} />
      <path d="M18 24 H26" {...STROKE} />
      <path d="M22.5 20.5 L26 24 L22.5 27.5" {...STROKE} />
      <path d="M30 8 V40" {...STROKE} strokeDasharray="3 3" opacity={0.8} />
      <circle cx={38} cy={24} r={7} {...STROKE} />
      <path d="M34.8 24 L37.2 26.4 L41.4 21.6" {...STROKE} />
    </>
  ),

  // Full stack: UI, API, data — one person carrying all three.
  stack: (
    <>
      <rect x={7} y={8} width={34} height={9} rx={2} {...STROKE} />
      <rect x={7} y={20} width={34} height={9} rx={2} {...STROKE} opacity={0.8} />
      <rect x={7} y={32} width={34} height={9} rx={2} {...STROKE} opacity={0.6} />
      <path d="M24 17 V20 M24 29 V32" {...STROKE} />
    </>
  ),

  // The deploy path.
  deploy: (
    <>
      <path d="M24 4 L40 13 V31 L24 40 L8 31 V13 Z" {...STROKE} />
      <path d="M24 30 V16" {...STROKE} />
      <path d="M18 22 L24 16 L30 22" {...STROKE} />
    </>
  ),

  // Spec first, then drive execution — a plan with a loop around it.
  workflow: (
    <>
      <rect x={5} y={8} width={20} height={32} rx={2.5} {...STROKE} />
      <path d="M10 16 H20 M10 22 H20 M10 28 H16" {...STROKE} />
      <path d="M32 15 A10 10 0 1 1 32 33" {...STROKE} />
      <path d="M27 11 L32 15 L27 19" {...STROKE} />
    </>
  ),
};

export default function CapabilityGlyph({
  name,
  className = '',
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={className}
      role="presentation"
    >
      {GLYPHS[name]}
    </svg>
  );
}
