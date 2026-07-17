// Shared theme system for the homepage hero.
//
// Each role in the identity rotator carries its own accent + a short description.
// Changing the active role shifts the accent color used by the WebGL background,
// the portrait treatment, and the rotator UI — so the whole hero "environment"
// reinforces whichever facet of Martin is currently in focus.

export type Role = {
  id: string;
  label: string;
  /** One-line descriptive copy shown under the active role. */
  description: string;
  /** Primary accent (drives text glow, active bar, particle tint). */
  accent: string;
  /** Secondary tint used for the soft nebula wash behind the portrait. */
  nebula: string;
  /** Short name of the visual "treatment" — documented for future portrait work. */
  treatment: string;
};

export const ROLES: Role[] = [
  {
    id: 'developer',
    label: 'Developer',
    description:
      'Building AI systems, frontend architecture, automation, and interactive experiences.',
    accent: '#2dd4bf', // teal
    nebula: '#0d9488',
    treatment: 'circuit traces brighten, teal accents, subtle network nodes',
  },
  {
    id: 'ai-builder',
    label: 'AI Builder',
    description: 'Designing agents, pipelines, and tools that turn raw models into real products.',
    accent: '#38bdf8', // sky/cyan
    nebula: '#0ea5e9',
    treatment: 'data-flow particles, cool blue circuitry, luminous nodes',
  },
  {
    id: 'massage-therapist',
    label: 'Massage Therapist',
    description: 'Helping people move better, feel better, and reconnect with their bodies.',
    accent: '#facc7a', // warm gold
    nebula: '#6ee7b7',
    treatment: 'circuitry fades into flowing fascia, contour lines, warm gold/green',
  },
  {
    id: 'video-producer',
    label: 'Video Producer',
    description: 'Turning ideas into cinematic stories.',
    accent: '#f59e0b', // cinematic amber
    nebula: '#b45309',
    treatment: 'soft film grain, cinematic light streaks, depth-of-field',
  },
  {
    id: 'musician',
    label: 'Musician',
    description: 'Brutal metal, glitchy electronics, and ukulele vibes.',
    accent: '#a855f7', // purple
    nebula: '#7c3aed',
    treatment: 'faint sound-wave particles and purple nebulas emerge',
  },
  {
    id: 'creative',
    label: 'Creative',
    description: 'Connecting technology with humanity.',
    accent: '#eab308', // gold
    nebula: '#c026d3',
    treatment: 'sacred geometry and abstract art become more prominent',
  },
];

/** Fixed brand headline — the three permanent lines, each with one highlighted word. */
export const HEADLINE: { pre: string; word: string; gradient: string }[] = [
  { pre: 'I build ', word: 'software.', gradient: 'from-teal-300 to-emerald-400' },
  { pre: 'I solve ', word: 'problems.', gradient: 'from-purple-400 to-fuchsia-400' },
  { pre: 'I create ', word: 'experiences.', gradient: 'from-amber-300 to-yellow-500' },
];
