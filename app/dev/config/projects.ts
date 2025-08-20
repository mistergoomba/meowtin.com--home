// Project data for multiple sections
export const projects = [
  {
    title: 'Viral Petition\nPlatform Rebuild',
    navTitle: 'Petition Platform',
    description: `
      Led the transformation of <strong>ThePetitionSite.com</strong> from a simple form-based flow into a modern, scalable web application used by millions of people worldwide.<br/><br/>
      Built a modular JavaScript frontend backed by a <strong>REST API</strong>, with a <strong>Webpack</strong>-driven build for code splitting and long‑term caching, and a <strong>Gulp</strong> pipeline for asset processing (compiling <strong>SASS</strong>, image optimization, and fingerprinting).<br/><br/>
      Engineered backend resilience for <em>viral‑scale</em> petition traffic: caching and CDN strategies, defensive rate limiting, and performance profiling to keep page loads fast during peak share spikes.<br/><br/>
      Developed embeddable petition widgets for third‑party sites, significantly expanding reach. Implemented analytics and A/B testing to improve conversion, tightened accessibility and SEO, and shipped UI/UX improvements that lifted signature completion rates while keeping the platform maintainable and secure.
    `,
    technologies: ['JavaScript', 'Node.js', 'REST API', 'SASS', 'PHP', 'MySQL', 'Gulp', 'Webpack'],
    screenshots: [
      '/projects/petition-1.png',
      '/projects/petition-2.png',
      '/projects/petition-3.png',
    ],
  },
  {
    title: 'Custom Microphone\nBuilder',
    navTitle: 'Customization Tool',
    description: `
      Developed an interactive <strong>product configurator</strong> for <strong>Roswell Audio</strong> that let customers design their own microphones by selecting bodies, capsules, finishes, and visual options.<br/><br/>
      Built with native <strong>JavaScript</strong> and <strong>HTML5</strong>, the tool delivered real-time visual feedback, updating the microphone’s appearance instantly as options were chosen. This gave audio enthusiasts a more engaging, hands-on buying experience and reduced guesswork before purchase.<br/><br/>
      Integrated directly into <strong>Shopify</strong> as a custom page, ensuring a smooth checkout flow. Enhanced with <strong>CSS3</strong> styling and responsive layouts so the builder worked seamlessly across devices, from desktop studio setups to mobile shoppers on the go.
    `,
    technologies: ['JavaScript', 'Shopify', 'HTML5', 'CSS3'],
    screenshots: ['/projects/custom-mics-1.png', '/projects/custom-mics-2.png'],
  },
  {
    title: 'AI-Driven Casino\nSimulator',
    navTitle: 'Casino Simulator',
    description: `
      A private simulator built in <strong>React Native</strong> with <strong>Expo</strong> for rapid iteration and offline-friendly testing.<br/><br/>
      Core to the app is a custom <strong>JSON behavior engine</strong> that scripts NPCs (dealers/players), table rules, and floor dynamics. The simulation models <strong>player budgets, emotions, and preferences</strong> (e.g., risk tolerance, game affinity, pacing, churn risk) to <strong>optimize casino flow</strong> by testing layouts, staffing, and pacing to increase engagement and dwell time while reducing friction. All scenarios run on synthetic data and are kept deliberately high‑level for confidentiality.<br/><br/>
      A robust <strong>Edit Mode</strong> empowers non‑dev users to lay out the casino floor: <strong>drag‑and‑drop tables</strong>, snapping + validity checks, seat maps with precise placement, add/remove flows, and animated confirmations for destructive actions. <strong>Quality-of-life features</strong> were added throughout to make the workflow smoother and more efficient for users.<br/><br/>
      <strong>Play Mode</strong> simulates betting rounds, dealer logic, table states, and AI movement/choices. A centralized <strong>activity log</strong> captures state transitions for debugging and analysis, while consolidated rule modules keep the system extensible and maintainable.<br/><br/>
      The project showcases strengths in <strong>game logic design</strong>, <strong>state management</strong>, and crafting <strong>intuitive, high‑fidelity UI</strong> with smooth, performant animations on mobile.
    `,
    technologies: ['React Native', 'Expo', 'JSON', 'State Management', 'Animations', 'Testing'],
    screenshots: ['/projects/casino-simulator-1.png'],
  },
  {
    title: 'Tabs Database and\nLyrics Formatter',
    navTitle: 'Tabs Formatter',
    description: `
      I’m an avid ukulele player, so I built a lightweight system to organize my songbook and make it easy to play anywhere, wheter it's solo in the woods or with friends.<br/><br/>
      The mobile app (built with <strong>React Native</strong> + <strong>Expo</strong>) displays lyrics with chord cues, supports <strong>randomized sets</strong>, fast <strong>filter/search</strong>, and <strong>artist‑based filtering</strong> from within song views. It’s designed for <strong>offline use</strong> so I can rely on it on the road.<br/><br/>
      There’s also a web companion with a dedicated <strong>Lyrics Formatter</strong> tool: paste raw lyrics, place chords inline, and instantly generate clean <strong>JSON</strong> for the app. I’ve been migrating legacy data to JSON for easier automation and bulk updates, with <strong>SQLite on mobile</strong> and a <strong>local web fallback</strong> for saving/loading edits in the browser.<br/><br/>
      The result is a simple, fast workflow from idea → formatted song → ready‑to‑play setlists.
    `,
    technologies: ['React Native', 'Expo', 'React', 'JavaScript', 'JSON', 'SQLite'],
    screenshots: ['/projects/chords-1.png', '/projects/chords-2.png'],
  },
  {
    title: 'Custom Video\nPlatform Features',
    navTitle: 'Video Platform',
    description: `
      Contributed to the video platform for <strong>Kink.com</strong>—an independent, San Francisco–based studio with a long reputation for professional standards and performer care—by upgrading the video player and building modular, production‑ready UI components.<br/><br/>
      We worked in a highly collaborative environment with <strong>paired programming</strong>, rigorous <strong>code reviews</strong>, and comprehensive <strong>unit testing</strong>. Within a complex service architecture, I shipped interactive flows, advanced filtering, and seamless player integrations while focusing on performance, accessibility, and maintainability.<br/><br/>
      Deployments and local environments ran on <strong>Node.js</strong> + <strong>Docker</strong>, enabling reproducible builds and smooth CI/CD across teams.
    `,
    technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Docker', 'Testing', 'Multimedia'],
    screenshots: ['/projects/video-1.png'],
  },
  {
    title: 'Warboy Guitars\nCustom Shop',
    navTitle: 'Warboy Guitars',
    description: `
      Designed and developed the official site for <strong>Warboy Guitars</strong>, a boutique builder crafting post‑apocalyptic, battle‑scarred instruments with serious stage presence.<br/><br/>
      Translated a bold, metal‑forward brand into a clean, performant web experience with responsive galleries, artist showcases, and clear calls to commission custom builds. Focused on fast loads, crisp imagery, and an intuitive path to inquiries and social discovery.<br/><br/>
      Delivered a site that highlights craftsmanship and attitude in equal measure while keeping maintenance simple and predictable.
    `,
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
    screenshots: ['/projects/warboy-1.png', '/projects/warboy-2.png'],
  },
  {
    title: 'Machine Gun\nExperience',
    navTitle: 'Machine Gun Experience',
    description: `
      Maintained and optimized the <strong>Machine Gun Experience</strong> WordPress/WooCommerce site used for ecommerce bookings in Las Vegas.<br/><br/>
      Improved cross‑browser compatibility, streamlined the booking flow, and ensured payment reliability across devices (Stripe/PayPal). Implemented safe plugin/theme updates, tightened core web vitals, and resolved edge‑case checkout issues that impacted conversions.<br/><br/>
      Result: smoother UX, fewer failed transactions, and a more dependable revenue flow for day‑to‑day operations.
    `,
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'Payment Integration'],
    screenshots: ['/projects/mge-1.png'],
  },
  {
    title: 'Sinwave\nVegas Venue',
    navTitle: 'Sinwave',
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
    screenshots: ['/projects/sinwave-1.png', '/projects/sinwave-2.png'],
  },
  {
    title: 'Metal Band\nWebsite',
    navTitle: 'Band Website',
    description: `
      Designed and developed a high‑impact website for <strong>Short Fuse</strong>—my band of 20+ years where I handle <strong>electronics</strong> and <strong>keyboards</strong>—to centralize music, videos, and updates in a bold, immersive format.<br/><br/>
      Built with <strong>React</strong> + <strong>Next.js</strong>, the site features embedded music videos, fast navigation, gothic styling, and responsive layouts that hold up on stage-side phones and big desktop screens alike. The UI focuses on legibility and punch while keeping performance tight.<br/><br/>
      Beyond the site itself, I’ve led <strong>album production</strong>, <strong>video production</strong>, and much of the band’s <strong>album & flyer art</strong> over the years—so the design language mirrors our sound and visual identity across releases, flyers, and social promos.
    `,
    technologies: ['React', 'Next.js', 'Ecommerce', 'Video Editing', 'Music Production'],
    screenshots: ['/projects/sites-1.png', '/projects/sites-2.png'],
  },
];
