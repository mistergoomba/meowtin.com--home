// Project data for the developer portfolio (/dev) and its detail pages.
export type Project = {
  slug: string;
  title: string; // may contain \n for card display
  navTitle: string;
  category: string;
  url?: string;
  description: string; // HTML
  technologies: string[];
  thumbnail: string;
  preview?: string; // legacy site-capture video — not shown on the redesigned pages
  screenshots: string[]; // may include .mp4 — detail page filters these out
};

export const projects: Project[] = [
  {
    slug: 'warboy-guitars',
    title: 'Warboy Guitars\nCustom Shop',
    navTitle: 'Warboy Guitars',
    category: 'Web Development',
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
    slug: 'ai-interview-avatar',
    title: 'AI Interview\nAvatar',
    navTitle: 'AI Interview Avatar',
    category: 'AI Development',
    // TODO(Martin): confirm/replace description + add a live demo url if there is one.
    description: `
      An <strong>AI interview assistant</strong> that puts a talking avatar in front of candidates — asking questions, listening, and adapting the conversation in real time.<br/><br/>
      Built around a large‑language‑model core wired to speech‑to‑text and text‑to‑speech, with an animated avatar that lip‑syncs responses so the exchange feels human rather than form‑like. The system scores answers, keeps context across the session, and hands back a structured summary.<br/><br/>
      <em>Placeholder copy — to be rewritten in Martin's voice, and screenshots added.</em>
    `,
    technologies: ['AI / LLM', 'React', 'Speech-to-Text', 'Text-to-Speech', 'Avatars'],
    thumbnail: '/projects/ai-avatar.webp',
    screenshots: ['/projects/ai-avatar.webp'],
  },
  {
    slug: 'ai-casino-simulator',
    title: 'AI-Driven Casino\nSimulator',
    navTitle: 'Casino Simulator',
    category: 'AI / Simulation',
    description: `
      A private simulator built in <strong>React Native</strong> with <strong>Expo</strong> for rapid iteration and offline-friendly testing.<br/><br/>
      Core to the app is a custom <strong>JSON behavior engine</strong> that scripts NPCs (dealers/players), table rules, and floor dynamics. The simulation models <strong>player budgets, emotions, and preferences</strong> (e.g., risk tolerance, game affinity, pacing, churn risk) to <strong>optimize casino flow</strong> by testing layouts, staffing, and pacing to increase engagement and dwell time while reducing friction. All scenarios run on synthetic data and are kept deliberately high‑level for confidentiality.<br/><br/>
      A robust <strong>Edit Mode</strong> empowers non‑dev users to lay out the casino floor: <strong>drag‑and‑drop tables</strong>, snapping + validity checks, seat maps with precise placement, add/remove flows, and animated confirmations for destructive actions. <strong>Quality-of-life features</strong> were added throughout to make the workflow smoother and more efficient for users.<br/><br/>
      <strong>Play Mode</strong> simulates betting rounds, dealer logic, table states, and AI movement/choices. A centralized <strong>activity log</strong> captures state transitions for debugging and analysis, while consolidated rule modules keep the system extensible and maintainable.<br/><br/>
      The project showcases strengths in <strong>game logic design</strong>, <strong>state management</strong>, and crafting <strong>intuitive, high‑fidelity UI</strong> with smooth, performant animations on mobile.
    `,
    technologies: ['React Native', 'Expo', 'JSON', 'State Management', 'Animations', 'Testing'],
    thumbnail: '/projects/casino-simulator-thumb.webp',
    screenshots: ['/projects/casino-simulator-1.webp'],
  },
  {
    slug: 'meowtin-massage',
    title: 'Meowtin Massage\nWebsite',
    navTitle: 'Meowtin Massage',
    category: 'Web Development',
    url: 'https://massage.meowtin.com',
    // TODO(Martin): confirm description + refresh screenshots from the live site.
    description: `
      Designed and built <strong>massage.meowtin.com</strong>, the home for my licensed massage therapy practice — a calm, trustworthy booking site that reflects the work itself.<br/><br/>
      Focused on a clean, mobile‑first experience: clear service descriptions, easy booking, and imagery that sets the right tone. Fast, accessible, and simple to maintain.<br/><br/>
      <em>Placeholder copy — to be rewritten in Martin's voice, and screenshots refreshed.</em>
    `,
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
    thumbnail: '/projects/massage-site.webp',
    screenshots: ['/projects/massage-site.webp'],
  },
  {
    slug: 'petition-platform',
    title: 'Viral Petition\nPlatform Rebuild',
    navTitle: 'Petition Platform',
    category: 'Web Application',
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
    slug: 'mic-builder',
    title: 'Custom Microphone\nBuilder',
    navTitle: 'Customization Tool',
    category: 'Interactive Tool',
    url: 'https://register.roswellproaudio.com/cs/',
    description: `
      Developed an interactive <strong>product configurator</strong> for <strong>Roswell Audio</strong> that let customers design their own microphones by selecting bodies, capsules, finishes, and visual options.<br/><br/>
      Built with native <strong>JavaScript</strong> and <strong>HTML5</strong>, the tool delivered real-time visual feedback, updating the microphone’s appearance instantly as options were chosen. This gave audio enthusiasts a more engaging, hands-on buying experience and reduced guesswork before purchase.<br/><br/>
      Integrated directly into <strong>Shopify</strong> as a custom page, ensuring a smooth checkout flow. Enhanced with <strong>CSS3</strong> styling and responsive layouts so the builder worked seamlessly across devices, from desktop studio setups to mobile shoppers on the go.
    `,
    technologies: ['JavaScript', 'Shopify', 'HTML5', 'CSS3'],
    thumbnail: '/projects/custom-mics-thumb.webp',
    preview: '/projects/custom-mics-video-small.mp4',
    screenshots: [
      '/projects/custom-mics-video.mp4',
      '/projects/custom-mics-1.webp',
      '/projects/custom-mics-2.webp',
    ],
  },
  {
    slug: 'sinwave-vegas',
    title: 'Sinwave\nVegas Venue',
    navTitle: 'Sinwave',
    category: 'Web Development',
    url: 'https://sinwavevegas.com',
    description: `
      Founded, owned, and operated <strong>Sinwave</strong>, a Las Vegas venue for underground electronic, metal, and alternative events — handling bookings, production, and daily operations.<br/><br/>
      Built and maintained <strong>sinwavevegas.com</strong> as the hub for event listings, photo/video galleries, and promotions, while running all digital marketing (social campaigns, email, and creative assets).<br/><br/>
      Engineered custom <strong>digital signage</strong> for in‑venue screens and integrated <strong>point‑of‑sale (POS) systems</strong> to streamline front‑of‑house and bar workflows. This blend of technical and creative work helped establish Sinwave as a distinctive, independent space in the Vegas scene.
    `,
    technologies: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Digital Signage',
      'POS Systems',
      'WordPress',
    ],
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
    navTitle: 'Band Website',
    category: 'Web Development',
    url: 'https://shortfusemusic.com',
    description: `
      Designed and developed a high‑impact website for <strong>Short Fuse</strong>—my band of 20+ years where I handle <strong>electronics</strong> and <strong>keyboards</strong>—to centralize music, videos, and updates in a bold, immersive format.<br/><br/>
      Built with <strong>React</strong> + <strong>Next.js</strong>, the site features embedded music videos, fast navigation, gothic styling, and responsive layouts that hold up on stage-side phones and big desktop screens alike. The UI focuses on legibility and punch while keeping performance tight.<br/><br/>
      Beyond the site itself, I’ve led <strong>album production</strong>, <strong>video production</strong>, and much of the band’s <strong>album & flyer art</strong> over the years—so the design language mirrors our sound and visual identity across releases, flyers, and social promos.
    `,
    technologies: ['React', 'Next.js', 'Ecommerce', 'Video Editing', 'Music Production'],
    thumbnail: '/projects/sites-thumb.webp',
    preview: '/projects/sites-video-small.mp4',
    screenshots: ['/projects/sites-video.mp4', '/projects/sites-1.webp', '/projects/sites-2.webp'],
  },
  {
    slug: 'tabs-formatter',
    title: 'Tabs Database and\nLyrics Formatter',
    navTitle: 'Tabs Formatter',
    category: 'Mobile App',
    description: `
      I’m an avid ukulele player, so I built a lightweight system to organize my songbook and make it easy to play anywhere, wheter it's solo in the woods or with friends.<br/><br/>
      The mobile app (built with <strong>React Native</strong> + <strong>Expo</strong>) displays lyrics with chord cues, supports <strong>randomized sets</strong>, fast <strong>filter/search</strong>, and <strong>artist‑based filtering</strong> from within song views. It’s designed for <strong>offline use</strong> so I can rely on it on the road.<br/><br/>
      There’s also a web companion with a dedicated <strong>Lyrics Formatter</strong> tool: paste raw lyrics, place chords inline, and instantly generate clean <strong>JSON</strong> for the app. I’ve been migrating legacy data to JSON for easier automation and bulk updates, with <strong>SQLite on mobile</strong> and a <strong>local web fallback</strong> for saving/loading edits in the browser.<br/><br/>
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
  {
    slug: 'video-platform',
    title: 'Custom Video\nPlatform Features',
    navTitle: 'Video Platform',
    category: 'Web Development',
    description: `
      Contributed to the video platform an independent, San Francisco–based studio with a long reputation for professional standards and performer care—by upgrading the video player and building modular, production‑ready UI components.<br/><br/>
      We worked in a highly collaborative environment with <strong>paired programming</strong>, rigorous <strong>code reviews</strong>, and comprehensive <strong>unit testing</strong>. Within a complex service architecture, I shipped interactive flows, advanced filtering, and seamless player integrations while focusing on performance, accessibility, and maintainability.<br/><br/>
      Deployments and local environments ran on <strong>Node.js</strong> + <strong>Docker</strong>, enabling reproducible builds and smooth CI/CD across teams.
    `,
    technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Docker', 'Testing', 'Multimedia'],
    thumbnail: '/projects/video-thumb.webp',
    screenshots: ['/projects/video-1.webp'],
  },
  {
    slug: 'machine-gun-experience',
    title: 'Machine Gun\nExperience',
    navTitle: 'Machine Gun Experience',
    category: 'Ecommerce',
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
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Static screenshots only — the redesigned pages drop the legacy .mp4 captures. */
export function projectImages(p: Project): string[] {
  return p.screenshots.filter((s) => !s.endsWith('.mp4'));
}
