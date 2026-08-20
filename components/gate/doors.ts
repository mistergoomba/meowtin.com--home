// The three doors of the homepage gate.
//
// Every door renders identically whether it points at an internal route or a
// separate site — `external` only decides how navigation happens. That is
// deliberate: each of these is expected to graduate to its own subdomain
// eventually (massage already has), and when one does, the only edit is the
// `href` + `external` pair on that entry. Nothing else in the gate knows or
// cares where a door leads.
//
// Order is not arbitrary. The shared portrait behind the panels has teal
// circuitry on its left edge and an anatomical/botanical figure on its right,
// with Martin's face in the middle — so machine → person → body maps the doors
// onto the parts of the image that already mean what they mean. Reordering this
// array reorders the panels, but breaks that alignment.

export type Door = {
  id: string;
  /** Small label above the statement. */
  label: string;
  /** The headline, split so the last word can carry a gradient. */
  statement: { pre: string; word: string };
  href: string;
  /** True when the door leaves meowtin.com. Drives navigation, not styling. */
  external: boolean;
  /** Ground color of this door's world — veils the portrait, and is the color
   *  the screen washes to on the way out, so the arrival feels continuous. */
  ground: string;
  /** How much of the ground color sits over the portrait (0–1). Tuned per door
   *  so roughly the same amount of photo reads through each panel. */
  veil: number;
  /** Primary accent — the bloom behind the content, and the "Enter" rule. */
  accent: string;
  /** Text colors, since one of these worlds is light and two are dark. */
  ink: string;
  inkMuted: string;
  /** CSS gradient for the highlighted word. */
  wordGradient: string;
  /** Type of this door's world — one per category, so the three doors read as
   *  three voices: machine (mono), gallery (display), hand (serif). The massage
   *  site is genuinely set in Cormorant, so that one is borrowed rather than
   *  chosen; type signals "different place" faster than color alone. */
  font: string;
  /** Optional override for the statement's size, weight, and tracking. Three
   *  faces this different do not balance at identical settings — a condensed
   *  black and a light mono at the same size read as different loudnesses, and
   *  no door should be louder than another. */
  headingClass?: string;
};

/** Statement treatment every door uses unless it overrides. */
export const HEADING_CLASS =
  'text-2xl font-bold tracking-tight sm:text-4xl md:text-[2.6rem] lg:text-5xl';

export const DOORS: Door[] = [
  {
    id: 'development',
    label: 'Development',
    statement: { pre: 'I build ', word: 'software.' },
    href: '/development',
    external: false,
    // Deep teal — the cool corner. Its slice of the portrait is already the
    // circuit-board side, so the tint deepens what is behind it.
    ground: '#0d2a30',
    veil: 0.72,
    accent: '#2dd4bf',
    ink: '#ffffff',
    inkMuted: 'rgba(255,255,255,0.5)',
    wordGradient: 'linear-gradient(90deg, #5eead4, #34d399)',
    font: 'font-share-tech',
  },
  {
    id: 'creative',
    label: 'Creative',
    statement: { pre: 'I create ', word: 'experiences.' },
    href: '/creative',
    external: false,
    // Deep bronze — the warm corner, and the third point of an even split with
    // teal and plum so no two panels read as the same room. It also sits over
    // the brightest part of the portrait (Martin's face, lit warm), so a warm
    // tint deepens it where a cool one would go muddy. Carried a little heavier
    // than its neighbors for the same reason: the face fights the veil.
    ground: '#2e2010',
    veil: 0.76,
    accent: '#a855f7',
    ink: '#ffffff',
    inkMuted: 'rgba(255,255,255,0.5)',
    wordGradient: 'linear-gradient(90deg, #c084fc, #f59e0b)',
    font: 'font-anton',
    // Anton is condensed, so "experiences" — the longest word on the gate —
    // fits a third-width panel easily. But its single weight is already black:
    // asking for font-bold would make the browser fake a heavier one, and at
    // matching sizes it would shout over its neighbors. Normal weight, looser
    // tracking, and a step down buy back the parity.
    headingClass:
      'text-[1.6rem] font-normal tracking-normal sm:text-[2.1rem] md:text-[2.35rem] lg:text-[2.8rem]',
  },
  {
    id: 'massage',
    label: 'Massage',
    statement: { pre: 'I heal ', word: 'bodies.' },
    href: 'https://massage.meowtin.com',
    external: true,
    // Sampled from meowtin-massage's dark theme: --cream #2b1a38 (its page
    // field), --gold, --gold-soft. Its light theme is cream, but a near-white
    // panel between two dark ones dominates the gate — no door should outrank
    // the others. The plum ground carries the same warmth at the same weight,
    // and it is still a real color from that site rather than an invention.
    ground: '#2b1a38',
    veil: 0.74,
    accent: '#c9a227',
    ink: '#f5ece0',
    inkMuted: 'rgba(245,236,224,0.5)',
    wordGradient: 'linear-gradient(90deg, #e8cf93, #c9a227)',
    font: 'font-cormorant',
  },
];
