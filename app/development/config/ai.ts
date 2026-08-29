// Content for the AI capability page (/development/ai) and the spotlight block
// that links to it from /development.
//
// WHY THIS IS A CAPABILITY PAGE AND NOT PROJECT CARDS
// ---------------------------------------------------
// The three AI engagements behind this page (an enterprise agent platform, a
// clinical assessment product, an ML simulation for a casino operator) were all
// subcontracted, and all three remain unbranded at the client's request. None of
// them has a public URL, a named client, or an NDA-safe screenshot — which means
// none of them can keep the promise a project card makes, which is "go look at
// this." So the work is presented as capability with evidence attached instead.
//
// WHAT THIS PAGE IS SELLING
// --------------------------
// A PERSON, not a technology. Every card is phrased as something Martin can do,
// in his voice, with a number attached where one exists. If a card starts
// reading like a description of a system rather than a description of an
// engineer, rewrite it.
//
// THE RULE FOR EDITING THIS FILE
// -------------------------------
// Every claim here must be an ENGINEERING fact, not a CLIENT fact. Numbers,
// architecture, and decisions are fair game and are what make the page credible.
// Client names, product names, and branding are not. Never add VeloXP, Mindora,
// TableTrac, or Imagination Guild to any string in this file.
//
// DON'T LET ONE STORY EAT THE PAGE
// ---------------------------------
// The render-from-payload fix (moving tool results out of LLM prose) is a strong
// story, but it is ONE change inside a much larger body of work. An earlier draft
// of this file referenced it in eight places and the page read like that was all
// he did. It now gets ONE card — `dependable-data`, which carries the whole theme
// including anomaly detection and the ground-truth rule — plus the "0" stat.
// Do not give it a second card. If the theme needs more room, make that one card
// better rather than adding another.
//
// All numbers below are sourced from the career knowledge base
// (04-projects/*.md) as of the 2026-08-01 snapshot.

import type { GlyphName } from '@/components/development/CapabilityGlyph';

/** One hard number, shown in the evidence band on both pages. */
export type Stat = { value: string; label: string };

export type Capability = {
  id: string;
  glyph: GlyphName;
  /** The card title — phrased as a thing I can do, not a technology name. */
  title: string;
  /** The body. Plain text; keep it to 2–4 sentences. */
  body: string;
  /** Optional hard number or concrete detail, set small under the body. */
  evidence?: string;
};

export type CapabilityGroup = {
  id: string;
  label: string;
  blurb: string;
  capabilities: Capability[];
};

// ──────────────────────────────────────────────────────────────────────────
// The numbers. These do the persuading — put them everywhere.
// Ordered to lead with the workforce, not with the bug fix.
// ──────────────────────────────────────────────────────────────────────────

export const AI_STATS: Stat[] = [
  { value: '10', label: 'specialized agents in one workforce' },
  { value: '205', label: 'tool methods across 37 groups' },
  { value: '21', label: 'skills teaching them when to act' },
  { value: '100', label: 'neural networks training in parallel' },
  { value: '0', label: 'fabricated rows in agent-facing data' },
];

/** The shorter band used in the /development spotlight, where space is tighter. */
export const AI_SPOTLIGHT_STATS: Stat[] = AI_STATS.slice(0, 4);

// ──────────────────────────────────────────────────────────────────────────
// Positioning. Sells the engineer, not the architecture.
// ──────────────────────────────────────────────────────────────────────────

export const AI_POSITIONING =
  'Somebody has to build the robot army. That’s the job I do — the fleet of agents, the tools they run on, the skills that teach them judgment, and the brakes that keep them from doing damage. One engineer, data model to deploy.';

/**
 * Said once, plainly, this reads as professionalism. Repeated on three project
 * cards as "under NDA," it reads as evasion — which is why the cards are gone.
 */
export const AI_CONFIDENTIALITY =
  'These engagements were subcontracted and stay unbranded at the client’s request. The architecture, the decisions, and the numbers are mine to discuss — the logos aren’t.';

// ──────────────────────────────────────────────────────────────────────────
// Where the work came from. Unbranded shape, so the page has provenance
// without a single client name.
// ──────────────────────────────────────────────────────────────────────────

export const AI_ENGAGEMENTS: { kind: string; summary: string }[] = [
  {
    kind: 'Enterprise agent platform',
    summary:
      'A virtual workforce: a fleet of specialized agents with shared memory and real authority to act, running a company’s coordination layer continuously through its own systems. I built the tool and skill layers they operate through, the chat surface people manage them from, and the dashboard they all report into.',
  },
  {
    kind: 'Clinical assessment product',
    summary:
      'An AI-guided ADHD and autism assessment: a conversational avatar conducts a directed interview across roughly twelve domains, drafts a report overview, and surfaces patterns worth a clinician’s attention — suggestions for the reviewing doctor, never diagnoses. Delivered end to end as a configurable multi-clinic product running on a local LLM.',
  },
  {
    kind: 'Machine learning simulation',
    summary:
      'A casino-floor game built on the real operating data of casinos the client ran, where the objective is arranging a floor to earn the most. A person can play it and so can the machine — a hundred reinforcement-learning agents train against the same board and get measurably better at it.',
  },
];

// ──────────────────────────────────────────────────────────────────────────
// The capabilities. This is the substance of the page.
// ──────────────────────────────────────────────────────────────────────────

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: 'workforce',
    label: 'Building an AI Workforce',
    blurb:
      'The product isn’t a chatbot, it’s a set of coworkers — and somebody has to build them. A company ends up with a fleet of agents that each own a function, share what they know, and act through the systems the business already runs on. I build that whole layer: what the agents can do, how they know when to do it, and the surface people manage them from.',
    capabilities: [
      {
        id: 'fleet',
        glyph: 'fleet',
        title: 'Stand up a fleet of agents that each own a job',
        body: 'Not one general-purpose assistant but specialists — revenue and pipeline, operations, marketing, finance, customer success, executive assistant, communications, and a QA agent whose whole job is watching the others’ output. They hold persistent memory, hand work between each other, and run continuously rather than waiting to be asked. People talk to them in a dashboard, watch what they’re doing, and set what each one is allowed to touch.',
        evidence: '10 specialized agents operating as one workforce',
      },
      {
        id: 'tool-layer',
        glyph: 'tools',
        title: 'Build the tool layer the workforce runs on',
        body: 'Tools are the APIs — the concrete things an agent is actually capable of doing. I design and build them in three kinds: the company’s internal operating surface (tasks, tickets, deals, metrics), integrations with what the business already runs on (Google Workspace, Salesforce, Intuit, calendar and mail), and creative tools that let an agent produce something rather than only report on it — video, voice, brand assets.',
        evidence: '37 tool groups · 205 methods',
      },
      {
        id: 'skills',
        glyph: 'skills',
        title: 'Turn raw capability into judgment',
        body: 'The distinction that matters most in this work: tools are what an agent can do, skills are how and when to do it. An agent with a tool can technically call it; an agent with the matching skill knows that it should. Writing skills has more in common with onboarding a new hire than with programming — and I keep a test asserting every tool method has a skill granting it, so nothing an agent can reach is something nobody taught it to use.',
        evidence: '21 skills across 10 agents',
      },
      {
        id: 'widgets',
        glyph: 'widgets',
        title: 'Let people build their own interface by asking for it',
        body: 'The dashboard people read is assembled from the same tools the agents call, so someone can ask the system for a view — a pipeline board, a KPI tile, a live feed — and get a working widget instead of a request in a backlog. Collapsing the human and agent data paths into one has a second payoff: a capability built for agents shows up for people free, and the reverse.',
        evidence: '12 widget types on one shared, org-scoped renderer',
      },
    ],
  },

  {
    id: 'trust',
    label: 'Trust & Verification',
    blurb:
      'Autonomous software is only worth deploying if people believe what it tells them. Two versions of that problem, and I’ve shipped answers to both: models invent things, and an agent should never be able to see data that isn’t its own.',
    capabilities: [
      {
        id: 'dependable-data',
        glyph: 'payload',
        title: 'Make the numbers dependable',
        body: 'A model that narrates its own tool results in prose will miscount rows and invent entries. Rather than prompt-engineer around that, I moved the data out of the model’s hands: the server captures the structured payload the tool actually returned, the client renders it one-to-one, and the model gets a caption — so a count is a literal array length. A turn-anomaly watcher flags drift on top of that, and the rule underneath both is that the database is ground truth and the transcript never is. An agent will cheerfully tell you it fixed something it didn’t, so “done” means a real row exists.',
        evidence: 'A class of data error to zero — and 330+ test files holding it there',
      },
      {
        id: 'authority',
        glyph: 'authority',
        title: 'Scope authority at the data layer, not the interface',
        body: 'On a platform scoped to an organization hierarchy, authority inherits downward: a parent org’s agent can act across its children, a child’s can’t see sideways or upward. I inject that scope where data is fetched rather than enforcing it in the UI, so an agent cannot request another organization’s records even if it tries. When you’re handing autonomous software real access to a business, that boundary is what makes it adoptable.',
      },
    ],
  },

  {
    id: 'models',
    label: 'Model & ML Systems',
    blurb:
      'Beyond calling a hosted API. I’ve built environments that learn from playing, run models on hardware the client controls, and design conversations that actually gather evidence rather than just taking turns.',
    capabilities: [
      {
        id: 'simulation',
        glyph: 'board',
        title: 'Build environments where people and machines play the same game',
        body: 'A casino-floor simulator where the objective is arranging a floor to earn the most — which tables, which mix, placed where — built on the real operating data of casinos the client ran. A person can sit down and play it, and so can the machine: the AI rearranges the floor, sees what it earned, and gets measurably better at the game. Because the whole system is API-first, agents play through the exact interfaces a human plays through, which is the only reason the two are comparable at all.',
        evidence: 'Trained on real operating data from working casinos',
      },
      {
        id: 'reinforcement',
        glyph: 'network',
        title: 'Train distributed reinforcement-learning systems',
        body: 'A hundred PyTorch deep Q-network agents training in parallel, each exploring a different strategy, compiling into a master consensus network that then plays live. Trained models sit in object storage with a queue pushing updates, so a running system picks up new learning without a restart — all while the simulation itself holds 100+ concurrent players across 50+ tables at 60 frames a second.',
        evidence: '100 DQN networks + a consensus network, in production on AWS',
      },
      {
        id: 'local-llm',
        glyph: 'chip',
        title: 'Run models on infrastructure the client controls',
        body: 'Not every product can send its data to a third party. I’ve shipped local LLM deployments — running an entire clinical interview engine and its report generation on self-hosted infrastructure, which keeps sensitive conversation off someone else’s servers, and driving live analysis inside a simulation. Hosted versus local is an architecture decision with real consequences, and I make it deliberately rather than by default.',
      },
      {
        id: 'directed-interview',
        glyph: 'dialogue',
        title: 'Design conversations that gather real evidence',
        body: 'The difference between a chatbot and an intake instrument is the follow-up. I built a directed interview engine that steers a conversation until it has what a given domain actually requires and only then moves on, so an incomplete answer gets pursued instead of merely recorded. Downstream it drafts a report overview for the reviewing clinician and surfaces patterns worth a second look. The line the product does not cross: those are suggestions for a doctor, never diagnoses.',
        evidence: '~12 domains, branching across two clinical assessment paths',
      },
    ],
  },

  {
    id: 'shipping',
    label: 'Shipping & Safety',
    blurb:
      'An AI feature that never reaches production is a demo; one that reaches production without brakes is a liability. I handle both ends — getting it live, and making sure a confused agent can’t do real damage once it’s there.',
    capabilities: [
      {
        id: 'guardrails',
        glyph: 'handoff',
        title: 'Keep a person in the loop where the stakes are',
        body: 'Agents get authority in proportion to how reversible their actions are. Reads are free, routine writes are logged, and anything destructive or irreversible stops and waits for a human. In practice that means scoped credentials rather than blanket access, an audit trail on every action, and a strong bias toward suggest-and-confirm over silent execution. The design goal is simple: the worst outcome of a confused agent should be a rejected suggestion, not a restored backup.',
        evidence: 'Suggest, never silently expand',
      },
      {
        id: 'boundaries',
        glyph: 'boundary',
        title: 'Fail loudly at the boundary',
        body: 'Every agent call gets parsed and validated where it enters the system — identifiers, dates, assignees, malformed arguments — so a bad call fails visibly instead of quietly writing garbage into a live business system. I also made mis-addressed calls visible rather than invisible: a class of bug where the agent believed it had acted and nobody had any way to know it hadn’t.',
      },
      {
        id: 'full-stack',
        glyph: 'stack',
        title: 'Take it from data model to deploy',
        body: 'UI, API surface, data model, and the deploy path — Next.js and React with TypeScript, Node and Fastify services, PostgreSQL behind a typed data layer, running on Kubernetes and AWS with real CI/CD. I build the team-facing side too: a per-tier hot-mount development loop that took the edit-to-live cycle from rebuild-and-wait down to nothing, plus the runbook for the failure that kept re-breaking it.',
      },
      {
        id: 'workflow',
        glyph: 'workflow',
        title: 'Build with AI, deliberately',
        body: 'I plan the architecture and write the spec first, then drive execution with an AI pair — owning every design decision and reviewing every line that comes back. That’s how one experienced engineer delivers at closer to team scale, and it means I have production experience on both sides of this technology: building with it, and building it.',
        evidence: '134 commits in three weeks ramping into an unfamiliar monorepo',
      },
    ],
  },
];

/** The stack, listed once at the bottom of the AI page. */
export const AI_STACK: { group: string; items: string[] }[] = [
  {
    group: 'AI & ML',
    items: [
      'LLM agent runtimes',
      'Tool & skill systems',
      'PyTorch',
      'Deep Q-Networks',
      'Ollama (local LLM)',
      'Anti-fabrication verification',
      'Prompt & context design',
    ],
  },
  {
    group: 'Application',
    items: ['Next.js (App Router)', 'React', 'TypeScript (strict)', 'Node.js', 'Fastify', 'Tailwind CSS', 'Zustand'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'Drizzle ORM', 'Zod boundary parsing', 'REST APIs', 'WebSocket'],
  },
  {
    group: 'Infrastructure',
    items: ['Kubernetes', 'AWS', 'Docker', 'Argo Rollouts', 'Terraform', 'CI/CD'],
  },
  {
    group: 'Quality',
    items: ['Vitest', 'Playwright', 'Regression-test discipline', 'Shared ESLint rule sets'],
  },
];

/**
 * The existing architecture illustrations. These are AI-generated concept art,
 * not UI captures — the caption on the page says so, because implying they are
 * screenshots of confidential software would be the exact wrong move on a page
 * whose whole argument is that this person is careful with the truth.
 */
export const AI_DIAGRAMS: { src: string; caption: string }[] = [
  {
    src: '/projects/agent-platform-thumb.webp',
    caption:
      'A virtual workforce: specialized agents around a shared memory core, with people at the outer ring doing the judgment work.',
  },
  {
    src: '/projects/agent-platform-tools.webp',
    caption:
      'The tool and skill layers — an agent on top, skills teaching it when, and a wide tool library branching into internal, integration, and creative capabilities.',
  },
  {
    src: '/projects/agent-platform-orgs.webp',
    caption:
      'Organizations and inherited authority: light falls into the chambers nested inside, and the glass never lets it escape sideways.',
  },
];
