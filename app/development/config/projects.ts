// Project data for the development portfolio (/development) and its detail pages.
//
// Structure (see MISSING-ASSETS.md for the imagery backlog):
//   - `flagship` + `flagshipRank` promote a project into the large case-study
//     cards under "Work you can go look at". These cover deep custom platform
//     ownership and proven scale; the third reason to hire — AI capability — is
//     carried by the spotlight block above them, which links to /development/ai.
//   - `section` files a project under one of the three capability sections below.
//     Order within a section is `order`, sorted by proof strength (a hard number +
//     named client + live URL) rather than recency.
//   - `thumbnail` omitted => AssetSlot renders a red MISSING IMAGE square.
//
// THE AI WORK IS NOT IN THIS FILE, ON PURPOSE.
// Three AI engagements (an enterprise agent platform, a clinical assessment
// product, an ML casino simulation) were subcontracted and stay unbranded at the
// client's request. None has a public URL, a named client, or an NDA-safe
// screenshot — so none can keep the promise a project card makes, which is "go
// look at this." They live on /development/ai as capability with evidence
// attached instead; the content is in ./ai.ts. Do not re-add them here.
//
// The organizing split for this page is therefore not AI vs. not-AI. It is
// WORK YOU CAN GO LOOK AT (below) vs. WORK I CAN TELL YOU ABOUT (/development/ai).

export type SectionId = 'platforms' | 'commerce' | 'sites';

export type Project = {
  slug: string;
  title: string; // may contain \n for card display
  navTitle: string;
  category: string;
  section: SectionId;
  order: number;
  flagship?: boolean;
  flagshipRank?: number;
  /** Short client/context line shown under the title. */
  client?: string;
  /** One hard number, shown on cards. Keep it short enough to read at a glance. */
  metric?: string;
  /** Flagship-only: the one-line problem and the one-line outcome. */
  problem?: string;
  result?: string;
  url?: string;
  description: string; // HTML
  technologies: string[];
  /** Heading over the image grid. Defaults to "Screenshots" — override when the
   *  images are diagrams or concept art rather than UI captures. */
  imagesLabel?: string;
  thumbnail?: string;
  preview?: string; // legacy site-capture video — not shown on the redesigned pages
  screenshots: string[]; // may include .mp4 — detail page filters these out
};

export const SECTIONS: { id: SectionId; label: string; blurb: string }[] = [
  {
    id: 'platforms',
    label: 'Platforms & Internal Tools',
    blurb:
      'Systems that carry real load and real operators — high-traffic web platforms, back-office tooling, and the infrastructure underneath.',
  },
  {
    id: 'commerce',
    label: 'Commerce',
    blurb:
      'Shopify, WooCommerce, and WordPress builds — storefronts, product configurators, and getting sites off page-builder apps and back onto maintainable code.',
  },
  {
    id: 'sites',
    label: 'Brand & Product Sites',
    blurb:
      'Fast, well-built sites for bands, boutique makers, venues, and my own practice — plus a couple of things I built for myself.',
  },
];

export const projects: Project[] = [
  // ────────────────────────────────────────────────────────────────────────
  // Platforms & Internal Tools
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'petition-platform',
    title: 'Viral Petition\nPlatform Rebuild',
    navTitle: 'Petition Platform',
    category: 'Web Platform',
    section: 'platforms',
    order: 1,
    flagship: true,
    flagshipRank: 2,
    client: 'Care2 / ThePetitionSite',
    metric: 'Millions of users · 12 years',
    problem:
      'A form-based site that had to survive petitions going viral without falling over — while still converting signatures.',
    result:
      'Rebuilt as a modern web application and led its front end for 12 years, serving millions of people worldwide.',
    url: 'https://thepetitionsite.com',
    description: `
      Led the transformation of <strong>ThePetitionSite.com</strong> from a simple form-based flow into a modern, scalable web application used by millions of people worldwide.<br/><br/>
      Built a modular JavaScript frontend backed by a <strong>REST API</strong>, with a <strong>Webpack</strong>-driven build for code splitting and long‑term caching, and a <strong>Gulp</strong> pipeline for asset processing (compiling <strong>SASS</strong>, image optimization, and fingerprinting).<br/><br/>
      Engineered backend resilience for <em>viral‑scale</em> petition traffic: caching and CDN strategies, defensive rate limiting, and performance profiling to keep page loads fast during peak share spikes.<br/><br/>
      Developed embeddable petition widgets for third‑party sites, significantly expanding reach. Implemented analytics and A/B testing to improve conversion, tightened accessibility and SEO, and shipped UI/UX improvements that lifted signature completion rates while keeping the platform maintainable and secure.
    `,
    technologies: ['JavaScript', 'Node.js', 'REST API', 'SASS', 'PHP', 'MySQL', 'Gulp', 'Webpack'],
    thumbnail: '/projects/petition-thumb.webp',
    preview: '/projects/petition-video-small.mp4',
    screenshots: [
      '/projects/petition-video.mp4',
      '/projects/petition-1.webp',
      '/projects/petition-2.webp',
      '/projects/petition-3.webp',
    ],
  },
  {
    slug: 'smart-broadcast',
    title: 'Radio Station\nManagement Platform',
    navTitle: 'Smart Broadcast',
    category: 'Platform / DevOps',
    section: 'platforms',
    order: 2,
    metric: 'Multi-tenant · unlimited stations',
    description: `
      A <strong>multi-tenant platform for running radio stations</strong> — built to modernize day-to-day broadcast operations without throwing away the expensive legacy equipment already in the rack.<br/><br/>
      The architecture is <strong>microservices in Node.js and TypeScript</strong>, with <strong>DNS-based station routing</strong> giving every station its own address and complete data isolation from every other tenant. One deployment serves an unlimited number of stations, and no station can see another&#39;s data.<br/><br/>
      Operations happen in real time over <strong>Socket.IO</strong>: commands report live 0–100% execution progress rather than leaving an operator guessing whether a thing worked. Access is controlled by <strong>JWT auth with access/refresh tokens</strong> and three roles (Admin, User, Viewer), with full audit logging behind it.<br/><br/>
      The piece I&#39;m most pleased with is the <strong>dynamic command framework</strong>: commands are defined as JSON-schema-validated definitions (button, form, toggle, slider), and the interface builds itself from those definitions. That&#39;s what makes integrating a new piece of legacy hardware a configuration change instead of a development cycle.<br/><br/>
      Solo-developed and fully containerized with Docker Compose — custom Docker networks for service discovery, health checks, persistent volumes, and structured logging with automatic restart on failure.
    `,
    technologies: [
      'Node.js',
      'TypeScript',
      'Socket.IO',
      'Docker',
      'Microservices',
      'JWT Auth',
      'SQLite',
    ],
    screenshots: [],
  },
  {
    slug: 'video-platform',
    title: 'Custom Video\nPlatform Features',
    navTitle: 'Video Platform',
    category: 'Web Development',
    section: 'platforms',
    order: 3,
    client: 'San Francisco studio — under NDA',
    description: `
      Contributed to the video platform of an independent, San Francisco–based studio with a long reputation for professional standards and performer care — by upgrading the video player and building modular, production‑ready UI components.<br/><br/>
      We worked in a highly collaborative environment with <strong>paired programming</strong>, rigorous <strong>code reviews</strong>, and comprehensive <strong>unit testing</strong>. Within a complex service architecture, I shipped interactive flows, advanced filtering, and seamless player integrations while focusing on performance, accessibility, and maintainability.<br/><br/>
      Deployments and local environments ran on <strong>Node.js</strong> + <strong>Docker</strong>, enabling reproducible builds and smooth CI/CD across teams.
    `,
    technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Docker', 'Testing', 'Multimedia'],
    thumbnail: '/projects/video-thumb.webp',
    screenshots: ['/projects/video-1.webp'],
  },

  // ────────────────────────────────────────────────────────────────────────
  // Commerce
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'roswell-pro-audio',
    title: 'Roswell Pro Audio\nStorefront & Fulfillment',
    navTitle: 'Roswell Pro Audio',
    category: 'Ecommerce / Internal Tools',
    section: 'commerce',
    order: 1,
    flagship: true,
    flagshipRank: 1,
    client: 'Roswell Pro Audio',
    metric: '15 internal tools · 7 sales channels',
    problem:
      'Staff were handwriting microphone serial numbers at the shipping bench and typing them into spreadsheets.',
    result:
      'A queryable lifecycle record for every mic they build, reconciled across all seven places they sell.',
    url: 'https://register.roswellproaudio.com/cs/',
    description: `
      An ongoing solo engagement for a professional microphone manufacturer, in two halves — both in production, and connected to each other.<br/><br/>
      <strong>The storefront.</strong> A <strong>custom microphone builder</strong> that lets customers design their own mic and see it as they go: real-time <strong>Canvas image composition</strong> merges layers at full resolution as options change, with live pricing that handles add-ons, modifications, and matched pairs. It plugs straight into <strong>Shopify</strong> for cart and checkout, and encodes the whole configuration in the URL so a customer can share or come back to a build. <strong>6 models, 50+ options, 10+ colors each.</strong> Plus an interactive video browser covering 31 episodes across 23 artists and 39 pedals.<br/><br/>
      <strong>The back office.</strong> When I started, staff were <strong>handwriting serial numbers at fulfillment and transcribing them into spreadsheets</strong> — at exactly the point where an error is most expensive, because a wrong serial breaks warranty lookup for the life of the microphone. I replaced that with a <strong>suite of 15 internal tools</strong> (~7,900 lines of PHP against a 20+ table MySQL schema) that pulls the live order from <strong>ShipStation across 7 sales channels</strong> — Shopify, Amazon, eBay, Reverb, and more — identifies which line items are actually mics, prompts for serials, and writes a full lifecycle record.<br/><br/>
      Most of the real work was the <strong>long tail of messy order data</strong> that separates a demo from a tool people use every day: Reverb never returns a customer email and the database required one; merged orders delete the number you searched for; cancelled shipping labels zero out a line&#39;s quantity so nothing renders; matched pairs arrive as two line items for the same two physical mics. Each one now has a visible, reversible prompt rather than a silent guess — the governing rule is <strong>suggest, never silently expand</strong>.<br/><br/>
      Non-developers can now manage the entire Custom Shop catalog themselves and publish to the live storefront, behind a <strong>field-level diff</strong> that shows exactly what will change before anything overwrites production.
    `,
    technologies: [
      'Shopify',
      'JavaScript',
      'HTML5 Canvas',
      'PHP',
      'MySQL',
      'ShipStation API',
      'REST APIs',
    ],
    thumbnail: '/projects/custom-mics-thumb.webp',
    preview: '/projects/custom-mics-video-small.mp4',
    screenshots: [
      '/projects/custom-mics-video.mp4',
      '/projects/custom-mics-1.webp',
      '/projects/custom-mics-2.webp',
    ],
  },
  {
    slug: 'sage-and-madison',
    title: 'Sage & Madison\nShopify Rebuild',
    navTitle: 'Sage & Madison',
    category: 'Shopify',
    section: 'commerce',
    order: 2,
    client: 'Sage & Madison, Sag Harbor NY',
    metric: '~$690/yr of app cost removed',
    url: 'https://sageandmadison.com',
    description: `
      A Shopify rebuild for an upscale lifestyle gift boutique in Sag Harbor, housed in a restored 1797 property on the National Registry of Historic Places.<br/><br/>
      The store was running the <strong>deprecated Debut theme</strong>, and almost nothing visible on the site actually lived in the theme — the homepage was built in <strong>PageFly</strong>, with GemPages, two Globo apps, and qikify handling the rest. That&#39;s the trap: you can&#39;t improve a theme that isn&#39;t rendering your site. The real job was <strong>reverse-engineering app-rendered HTML back into native Liquid sections</strong> on the premium Online Store 2.0 theme the client had already bought.<br/><br/>
      I ported the <strong>full homepage (9 sections) and 10 content pages</strong> — editorial, history timeline, biography, press, gift baskets, events, and more — matching each to its original template suffix so the store&#39;s existing page bindings kept working with <strong>no admin changes at all</strong>. The press page in particular got rebuilt natively: six publication mastheads, each over a horizontal-scrolling row of clipping cards.<br/><br/>
      Along the way I found <strong>~$690/yr in removable recurring app cost</strong> — the paid filter app they were running can be replaced by Shopify&#39;s free native Search &amp; Discovery — and documented the migration against the renewal date so they can act on it on schedule.<br/><br/>
      The entire rebuild ran on an <strong>unpublished theme</strong> via the Shopify CLI, so the revenue-generating live store was never touched. <strong>Zero downtime</strong>, and content that&#39;s now editable by the client in the theme editor instead of locked inside third-party page builders.
    `,
    technologies: [
      'Shopify',
      'Liquid',
      'Shopify CLI',
      'Online Store 2.0',
      'CSS',
      'Theme Development',
    ],
    screenshots: [],
  },
  {
    slug: 'a-handmade-story',
    title: 'A Handmade Story\nWordPress Rescue',
    navTitle: 'A Handmade Story',
    category: 'WordPress',
    section: 'commerce',
    order: 3,
    client: 'A Handmade Story',
    metric: '3 page builders → 1 · 31 → 22 plugins',
    url: 'https://ahandmadestory.com',
    description: `
      A rescue job on a self-hosted lifestyle and craft blog, and a good illustration of what years of accumulated plugins do to a WordPress site.<br/><br/>
      What I walked into: <strong>three page builders running at once</strong>, 31 active plugins, <strong>no child theme</strong> (so every update wiped her customizations — which is why the site kept breaking), a blank site title that made every page and social share render as a stray hyphen, and every post filed under a category literally misspelled <em>Uncatorgized</em>. Two competing mail plugins were producing <strong>72 failed emails a month</strong>, and open registration had been farmed into <strong>~530 spam accounts</strong> alongside ~3,100 blocked login attempts.<br/><br/>
      The constraint that shaped everything: <strong>WordPress admin access only</strong> — no SSH, no SFTP, no control panel, so none of the usual tooling was available. Everything had to be deliverable through the admin screen.<br/><br/>
      So I built a proper <strong>child theme</strong> (~3,700 lines of PHP, CSS, and JS) deployed as a ZIP, drove all the bulk content work through the <strong>WordPress REST API</strong>, and wrote a <strong>909-line idempotent migration</strong> for the ~19 database changes the API can&#39;t reach — resolving categories by slug and pages by path so IDs from my local mirror could never leak into production. Safe to re-run.<br/><br/>
      Then the actual diagnosis: her complaint was &ldquo;my posts don&#39;t show up in their category,&rdquo; and the cause wasn&#39;t a broken link — <strong>18 hand-built Pages were standing in for category archives</strong> that never listed anything. I replaced them with real archives and a proper <strong>30-category hierarchy</strong>, refiled 29 posts, and rewired 30 nav items to taxonomy objects so the menu survives a domain change.<br/><br/>
      Every change was proven on a full local mirror of the live site before it went anywhere near production. The goal was never just a redesign — it was <strong>handing the site back in a state she can edit herself</strong>, so she never has to hire this out again.
    `,
    technologies: [
      'WordPress',
      'PHP',
      'Child Theme',
      'WP REST API',
      'CSS',
      'Accessibility (WCAG)',
      'Performance',
    ],
    screenshots: [],
  },
  {
    slug: 'machine-gun-experience',
    title: 'Machine Gun\nExperience',
    navTitle: 'Machine Gun Experience',
    category: 'WooCommerce',
    section: 'commerce',
    order: 4,
    url: 'https://machinegunexperience.com',
    description: `
      Maintained and optimized the <strong>Machine Gun Experience</strong> WordPress/WooCommerce site used for ecommerce bookings in Las Vegas.<br/><br/>
      Improved cross‑browser compatibility, streamlined the booking flow, and ensured payment reliability across devices (Stripe/PayPal). Implemented safe plugin/theme updates, tightened core web vitals, and resolved edge‑case checkout issues that impacted conversions.<br/><br/>
      Result: smoother UX, fewer failed transactions, and a more dependable revenue flow for day‑to‑day operations.
    `,
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'Payment Integration'],
    thumbnail: '/projects/mge-thumb.webp',
    screenshots: ['/projects/mge-1.webp', '/projects/mge-2.webp'],
  },

  // ────────────────────────────────────────────────────────────────────────
  // Brand & Product Sites
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'warboy-guitars',
    title: 'Warboy Guitars\nCustom Shop',
    navTitle: 'Warboy Guitars',
    category: 'Web Development',
    section: 'sites',
    order: 1,
    url: 'https://warboyguitars.com',
    description: `
      Designed and developed the official site for <strong>Warboy Guitars</strong>, a boutique builder crafting post‑apocalyptic, battle‑scarred instruments with serious stage presence.<br/><br/>
      Translated a bold, metal‑forward brand into a clean, performant web experience with responsive galleries, artist showcases, and clear calls to commission custom builds. Focused on fast loads, crisp imagery, and an intuitive path to inquiries and social discovery.<br/><br/>
      Delivered a site that highlights craftsmanship and attitude in equal measure while keeping maintenance simple and predictable.
    `,
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
    thumbnail: '/projects/warboy-thumb.webp',
    preview: '/projects/warboy-video-small.mp4',
    screenshots: [
      '/projects/warboy-video.mp4',
      '/projects/warboy-1.webp',
      '/projects/warboy-2.webp',
      '/projects/warboy-3.webp',
    ],
  },
  {
    slug: 'sinwave-vegas',
    title: 'Sinwave\nVegas Venue',
    navTitle: 'Sinwave',
    category: 'Web Development',
    section: 'sites',
    order: 2,
    url: 'https://sinwavevegas.com',
    description: `
      Founded, owned, and operated <strong>Sinwave</strong>, a Las Vegas venue for underground electronic, metal, and alternative events — handling bookings, production, and daily operations.<br/><br/>
      Built and maintained <strong>sinwavevegas.com</strong> as the hub for event listings, photo/video galleries, and promotions, while running all digital marketing (social campaigns, email, and creative assets).<br/><br/>
      Engineered custom <strong>digital signage</strong> for in‑venue screens and integrated <strong>point‑of‑sale (POS) systems</strong> to streamline front‑of‑house and bar workflows. This blend of technical and creative work helped establish Sinwave as a distinctive, independent space in the Vegas scene.
    `,
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Digital Signage', 'POS Systems', 'WordPress'],
    thumbnail: '/projects/sinwave-thumb.webp',
    preview: '/projects/sinwave-video-small.mp4',
    screenshots: [
      '/projects/sinwave-video.mp4',
      '/projects/sinwave-1.webp',
      '/projects/sinwave-2.webp',
    ],
  },
  {
    slug: 'short-fuse',
    title: 'Metal Band\nWebsite',
    navTitle: 'Short Fuse',
    category: 'Web Development',
    section: 'sites',
    order: 3,
    url: 'https://shortfusemusic.com',
    description: `
      Designed and developed a high‑impact website for <strong>Short Fuse</strong> — my band of 20+ years, where I handle <strong>electronics</strong> and <strong>keyboards</strong> — to centralize music, videos, and updates in a bold, immersive format.<br/><br/>
      Built with <strong>React</strong> + <strong>Next.js</strong>, the site features embedded music videos, fast navigation, gothic styling, and responsive layouts that hold up on stage-side phones and big desktop screens alike. The UI focuses on legibility and punch while keeping performance tight.<br/><br/>
      Beyond the site itself, I&#39;ve led <strong>album production</strong>, <strong>video production</strong>, and much of the band&#39;s <strong>album &amp; flyer art</strong> over the years — so the design language mirrors our sound and visual identity across releases, flyers, and social promos.
    `,
    technologies: ['React', 'Next.js', 'Ecommerce', 'Video Editing', 'Music Production'],
    thumbnail: '/projects/sites-thumb.webp',
    preview: '/projects/sites-video-small.mp4',
    screenshots: ['/projects/sites-video.mp4', '/projects/sites-1.webp', '/projects/sites-2.webp'],
  },
  {
    slug: 'meowtin-massage',
    title: 'Bodywork by Meowtin\nPractice Site',
    navTitle: 'Bodywork by Meowtin',
    category: 'Web Development',
    section: 'sites',
    order: 4,
    client: 'My own practice',
    url: 'https://massage.meowtin.com',
    description: `
      Designed and built <strong>massage.meowtin.com</strong>, the home for my licensed massage therapy practice — which also makes it the one project where I was simultaneously the developer, the client, and the person answering the phone when the booking flow doesn&#39;t work.<br/><br/>
      Built with <strong>React</strong> and <strong>Next.js</strong>, mobile-first, because essentially everyone books a massage from their phone. Three sessions&#39; worth of decisions on one page: what the work is (Swedish, deep tissue, myofascial release), what it costs, and a short path from landing to a request — plus imagery that sets a calm tone rather than a clinical one.<br/><br/>
      The copy was the harder half. A bodywork site has to describe real benefit without <em>promising outcomes</em> — so every line names what I do rather than what will happen to you: <em>ease tension, support easier movement, bring you back to your body</em>. That constraint shaped the whole voice, and it&#39;s the same discipline that governs the rest of this site.<br/><br/>
      Fast, accessible, and deliberately simple to maintain — I run the practice, so the site had to be something I could update between appointments rather than a project of its own.
    `,
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
    thumbnail: '/projects/massage-site.webp',
    screenshots: ['/projects/massage-site.webp'],
  },
  {
    slug: 'tabs-formatter',
    title: 'Tabs Database and\nLyrics Formatter',
    navTitle: 'Tabs Formatter',
    category: 'Mobile App',
    section: 'sites',
    order: 5,
    description: `
      I&#39;m an avid ukulele player, so I built a lightweight system to organize my songbook and make it easy to play anywhere — whether that&#39;s solo in the woods or with friends.<br/><br/>
      The mobile app (built with <strong>React Native</strong> + <strong>Expo</strong>) displays lyrics with chord cues, supports <strong>randomized sets</strong>, fast <strong>filter/search</strong>, and <strong>artist‑based filtering</strong> from within song views. It&#39;s designed for <strong>offline use</strong> so I can rely on it on the road.<br/><br/>
      There&#39;s also a web companion with a dedicated <strong>Lyrics Formatter</strong> tool: paste raw lyrics, place chords inline, and instantly generate clean <strong>JSON</strong> for the app. I&#39;ve been migrating legacy data to JSON for easier automation and bulk updates, with <strong>SQLite on mobile</strong> and a <strong>local web fallback</strong> for saving/loading edits in the browser.<br/><br/>
      The result is a simple, fast workflow from idea → formatted song → ready‑to‑play setlists.
    `,
    technologies: ['React Native', 'Expo', 'React', 'JavaScript', 'JSON', 'SQLite'],
    thumbnail: '/projects/chords-thumb.webp',
    preview: '/projects/chords-video-small.mp4',
    screenshots: [
      '/projects/chords-video.mp4',
      '/projects/chords-1.webp',
      '/projects/chords-2.webp',
    ],
  },
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The large case-study cards, in rank order. Both have a named client, a live
 *  URL, and a hard number — that combination is the entry fee for this list. */
export const flagships = projects
  .filter((p) => p.flagship)
  .sort((a, b) => (a.flagshipRank ?? 99) - (b.flagshipRank ?? 99));

/** Projects for a section, sorted by proof strength. */
export function sectionProjects(id: SectionId): Project[] {
  return projects.filter((p) => p.section === id).sort((a, b) => a.order - b.order);
}

/** Static screenshots only — the redesigned pages drop the legacy .mp4 captures. */
export function projectImages(p: Project): string[] {
  return p.screenshots.filter((s) => !s.endsWith('.mp4'));
}
