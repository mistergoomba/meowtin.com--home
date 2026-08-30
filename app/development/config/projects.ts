// Project data for the development portfolio (/development) and its detail pages.
//
// Structure (see MISSING-ASSETS.md for the imagery backlog):
//   - `flagship` + `flagshipRank` promote a project into the large case-study
//     cards under "Work you can go look at". Flagships are DELIBERATELY EXCLUDED
//     from the section grids below (see `sectionProjects`) so no project is shown
//     twice on one page.
//   - `section` files a non-flagship project under one of the three capability
//     sections below. Order within a section is `order`.
//   - `thumbnail` omitted => AssetSlot renders a red MISSING IMAGE square.
//   - `status: 'in-progress'` marks work that is not shipped yet, and renders an
//     IN PROGRESS badge. Anything unshipped MUST carry it — a portfolio that
//     describes planned work in the past tense is just a lie with a nice layout.
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

export type SectionId = 'commerce' | 'brands' | 'tools';

export type Project = {
  slug: string;
  title: string; // may contain \n for card display
  navTitle: string;
  category: string;
  /** Omitted on a flagship that belongs to no grid (e.g. the petition platform,
   *  which is neither commerce, a brand site, nor an internal tool). */
  section?: SectionId;
  order: number;
  flagship?: boolean;
  flagshipRank?: number;
  /** Not shipped yet. Renders an IN PROGRESS badge; never describe it as done. */
  status?: 'in-progress';
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
    id: 'commerce',
    label: 'Commerce',
    blurb:
      'Storefronts that have to take money reliably — Shopify, WooCommerce, and WordPress builds, plus the work of getting a store off third-party page-builder apps and back onto maintainable code.',
  },
  {
    id: 'brands',
    label: 'Brand & Product Sites',
    blurb:
      'Fast, well-built sites where the job is to make something feel like itself — boutique makers, bands, a venue, and my own practice.',
  },
  {
    id: 'tools',
    label: 'Internal Tools',
    blurb:
      'The software people use to actually run the thing: back-office systems, operator dashboards, and the unglamorous data plumbing that turns a spreadsheet workflow into something queryable.',
  },
];

export const projects: Project[] = [
  // ────────────────────────────────────────────────────────────────────────
  // Flagship — shown only in "Selected Case Studies", never in a grid below.
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'petition-platform',
    title: 'Viral Petition\nPlatform Rebuild',
    navTitle: 'Petition Platform',
    category: 'Web Platform',
    order: 0,
    flagship: true,
    flagshipRank: 1,
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
    slug: 'video-platform',
    title: 'Custom Video\nPlatform Features',
    navTitle: 'Video Platform',
    category: 'Web Development',
    section: 'tools',
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
  // Internal Tools
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'roswell-back-office',
    title: 'Roswell Pro Audio\nOrder & Fulfillment Tools',
    navTitle: 'Roswell Back Office',
    category: 'Internal Tools',
    section: 'tools',
    order: 1,
    client: 'Roswell Pro Audio',
    metric: '15 internal tools · 7 sales channels',
    description: `
      The operations half of an ongoing solo engagement for a professional microphone manufacturer. (The customer-facing half is the <a href="/development/roswell-mic-builder" class="underline decoration-emerald-400/40 underline-offset-4">custom mic builder</a>.)<br/><br/>
      When I started, staff were <strong>handwriting serial numbers at the shipping bench and transcribing them into spreadsheets</strong> — at exactly the point where an error is most expensive, because a wrong serial breaks warranty lookup for the entire life of the microphone.<br/><br/>
      I replaced that with a <strong>suite of 15 internal tools</strong> (~7,900 lines of PHP against a 20+ table MySQL schema) that pulls the live order from <strong>ShipStation across 7 sales channels</strong> — Shopify, Amazon, eBay, Reverb, and more — identifies which line items are actually microphones, prompts for serials at the bench, and writes a full lifecycle record. Every mic they build is now a queryable row instead of a line of handwriting.<br/><br/>
      Most of the real work was the <strong>long tail of messy order data</strong> that separates a demo from a tool people use every day: Reverb never returns a customer email and the database required one; merged orders delete the number you searched for; cancelled shipping labels zero out a line&#39;s quantity so nothing renders; matched pairs arrive as two line items for the same two physical microphones. Each one now has a visible, reversible prompt rather than a silent guess — the governing rule is <strong>suggest, never silently expand</strong>.<br/><br/>
      That rule is the whole design philosophy here. Software that quietly corrects messy data on a person&#39;s behalf is software they eventually stop trusting, and an operations tool nobody trusts gets replaced by a spreadsheet again.
    `,
    technologies: [
      'PHP',
      'MySQL',
      'ShipStation API',
      'JavaScript',
      'REST APIs',
      'Shopify API',
    ],
    // BOTH IMAGES ARE REDACTED, and the fills are painted into the files
    // themselves — never re-export from the raw captures. `-1` covers every mic
    // serial, every order number, and the ShipStation/owner/shipto ids on the
    // edited entry: a serial paired with its order number is exactly the
    // warranty-lookup key this whole project exists to protect. `-2` covers the
    // RM8 rows, which are unreleased product. Solid fill, never blur — blurred
    // short numeric strings can be recovered.
    thumbnail: '/projects/roswell-back-office-thumb.webp',
    screenshots: [
      '/projects/roswell-back-office-1.webp',
      '/projects/roswell-back-office-2.webp',
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // Commerce
  // ────────────────────────────────────────────────────────────────────────
  // Short Fuse is TWO projects for the same reason Roswell is: a brand site and a
  // commerce build, in separate repos, sharing one set of design tokens. Each
  // description links the other so the relationship is never hidden. If the tokens
  // ever stop being shared, delete that claim from BOTH entries.
  {
    slug: 'short-fuse-shop',
    title: 'Short Fuse\nMerch Store',
    navTitle: 'Short Fuse Shop',
    category: 'Ecommerce',
    section: 'commerce',
    order: 1,
    client: 'Short Fuse',
    metric: '30 products · 110 tests',
    url: 'https://shop.shortfusemusic.com',
    description: `
      A custom merch store for <strong>Short Fuse</strong>, replacing the band&#39;s Big Cartel shop. (The band&#39;s <a href="/development/short-fuse" class="underline decoration-emerald-400/40 underline-offset-4">official site</a> is a separate codebase that shares this one&#39;s design system.)<br/><br/>
      Hosted platforms charge a monthly subscription plus a cut of every sale, and on the volumes an independent band actually moves that is a meaningful share of what a shirt earns — for a 30-product catalog that uses almost none of what the subscription buys.<br/><br/>
      Built as a <strong>pnpm workspace</strong>: a Next.js storefront and admin, Drizzle over Postgres, and a framework-free <code>core</code> package holding every calculation that decides what a customer is charged. The route handlers are thin wrappers over it, and it is unit-tested on its own. <strong>110 tests, ~13,000 lines of TypeScript, 11 tables.</strong><br/><br/>
      <strong>The browser never sends a price.</strong> It sends product ids, sizes, quantities and a country; <code>/api/cart</code> and <code>/api/checkout</code> both reload every product from the database and recompute the total through the same function, and the Stripe line items are built from that result. A tampered cart in <code>localStorage</code> changes what the customer sees and never what they are charged — there is a test for exactly that.<br/><br/>
      <strong>Shipping had to be quoted before payment.</strong> Stripe Checkout collects the address <em>after</em> the session is created, so it cannot pick a destination-based rate for you. The review step asks for the country first, quotes the flat rate from it, and locks the session to that one country — otherwise a customer is quoted the US rate and ships to Australia.<br/><br/>
      <strong>An order only becomes paid from a signature-verified webhook.</strong> Reaching the success page proves nothing — the customer could navigate there directly. Every Stripe event id is inserted under a unique index before the event is handled, so a redelivery is a no-op, verified with a concurrency test; orders whose webhook never arrived are reconciled against the Stripe API rather than left pending forever. Line items snapshot the product name, size and price at purchase, so a later price change cannot rewrite an old receipt.<br/><br/>
      Behind it, an admin the band runs themselves: products and per-size availability, categories, cart offers with four fixed trigger types, order status, and store settings. The Big Cartel importer is idempotent and refuses to clobber fields the admin has since edited.<br/><br/>
      Two things are deliberately not done. <strong>Tax is off</strong> — the band is not registered to collect anywhere; orders still carry a tax field and the webhook records whatever Stripe reports, so turning on Stripe Tax later is a config change rather than a migration. And <strong>per-size stock could not be recovered from Big Cartel</strong>, whose export marks every option as available including on products the store itself shows as sold out — so size availability is derived from the product, and low stock is set by hand.
    `,
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Drizzle',
      'Stripe',
      'Zod',
      'Vitest',
      'Vercel',
    ],
    thumbnail: '/projects/short-fuse-shop-thumb.webp',
    // Order is deliberate: storefront, then the two screens that carry the
    // engineering claims (the offer strip and the country-before-payment step),
    // then a product page, then the admin. `-5` is a REAL order and its customer
    // name, email and shipping address are redacted in the image itself — do not
    // replace it with an unredacted capture.
    screenshots: [
      '/projects/short-fuse-shop-1.webp',
      '/projects/short-fuse-shop-2.webp',
      '/projects/short-fuse-shop-3.webp',
      '/projects/short-fuse-shop-4.webp',
      '/projects/short-fuse-shop-5.webp',
    ],
  },
  // Roswell is ONE ongoing engagement presented as TWO projects, because they
  // sell to different readers: the builder is a customer-facing configurator, the
  // back office is operations software. Both descriptions point at each other so
  // the relationship is never hidden.
  {
    slug: 'roswell-mic-builder',
    title: 'Roswell Pro Audio\nCustom Mic Builder',
    // The product being sold here is the builder app, not Roswell's "Custom Shop"
    // product line — so the nav label names the app. (The phrase "Custom Shop"
    // still appears in the description below, where it correctly refers to
    // Roswell's own line that the catalog manager administers.)
    navTitle: 'Roswell Mic Builder',
    category: 'Ecommerce / Product Configurator',
    section: 'commerce',
    order: 0,
    flagship: true,
    flagshipRank: 2,
    client: 'Roswell Pro Audio',
    metric: '6 models · 50+ options · 10+ colors each',
    problem:
      'A boutique microphone company whose whole appeal is customization, selling through a checkout that could only show a customer a fixed photo of a finished product.',
    result:
      'A builder where customers design their own mic and watch it assemble in real time, priced live and handed straight to Shopify checkout.',
    url: 'https://roswellproaudio.com',
    description: `
      The customer-facing half of an ongoing solo engagement for a professional microphone manufacturer. (The other half — the <a href="/development/roswell-back-office" class="underline decoration-emerald-400/40 underline-offset-4">order and fulfillment tools</a> behind the shipping bench — is a separate project.)<br/><br/>
      <strong>A custom microphone builder</strong> that lets customers design their own mic and see it as they go. Real-time <strong>HTML5 Canvas image composition</strong> merges layers at full resolution as options change, so the mic on screen is the mic being ordered rather than an approximation of it. Live pricing handles add-ons, modifications, and matched pairs as the configuration changes.<br/><br/>
      It plugs straight into <strong>Shopify</strong> for cart and checkout, and encodes the entire configuration <strong>in the URL</strong> — so a customer can send a build to a bandmate, sleep on it, and come back to exactly what they left. <strong>6 models, 50+ options, 10+ colors each.</strong><br/><br/>
      Alongside it, an interactive video browser covering <strong>31 episodes across 23 artists and 39 pedals</strong>, and — the piece that made the whole thing sustainable — a catalog manager that lets <strong>non-developers run the entire Custom Shop</strong> and publish to the live storefront themselves, behind a <strong>field-level diff</strong> that shows exactly what will change before anything overwrites production.
    `,
    technologies: [
      'Shopify',
      'JavaScript',
      'HTML5 Canvas',
      'PHP',
      'MySQL',
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
    order: 3,
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
    thumbnail: '/projects/sage-madison-thumb.webp',
    // Order follows the description: the homepage that was rebuilt out of
    // PageFly first, then three of the ported content pages.
    screenshots: [
      '/projects/sage-madison-1.webp',
      '/projects/sage-madison-2.webp',
      '/projects/sage-madison-3.webp',
      '/projects/sage-madison-4.webp',
    ],
  },
  {
    slug: 'a-handmade-story',
    title: 'A Handmade Story\nWordPress Rescue',
    navTitle: 'A Handmade Story',
    category: 'WordPress',
    section: 'commerce',
    order: 2,
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
    thumbnail: '/projects/handmade-story-thumb.webp',
    // The handed-back site: the homepage with the rewired nav, a post, and the
    // recipe card. These are AFTER captures only — there is no before shot, so
    // the rescue story is carried by the description, not by the images.
    screenshots: [
      '/projects/handmade-story-1.webp',
      '/projects/handmade-story-2.webp',
      '/projects/handmade-story-3.webp',
    ],
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
    section: 'brands',
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
    section: 'brands',
    order: 4,
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
    section: 'brands',
    order: 2,
    client: 'Short Fuse — my band',
    url: 'https://shortfusemusic.com',
    description: `
      The official site for <strong>Short Fuse</strong> — my band of 20+ years, where I play <strong>electronics</strong> and <strong>keyboards</strong> — rebuilt as a single landing page plus an electronic press kit.<br/><br/>
      Built with <strong>Next.js 15</strong> and <strong>React 19</strong>, statically exported: no server components with runtime data, no API routes, nothing to keep running. <strong>Tailwind 4</strong> configured entirely in CSS through <code>@theme</code>, with a palette of three colors — ink, bone, blood — because artwork and photography supply everything else.<br/><br/>
      <strong>The design tokens are shared with the <a href="/development/short-fuse-shop" class="underline decoration-emerald-400/40 underline-offset-4">merch store</a></strong>, which is a separate codebase on its own subdomain. That is what makes the two sites read as one brand instead of two projects that happen to share a logo.<br/><br/>
      <strong>Every piece of swappable content lives in one file.</strong> The section components hold layout and no copy at all, so changing a show, a release, a video or a merch link never means editing JSX. Adding a show is an object and a flyer image — and the flyer strip measures whether its contents overflow their track and renders carousel arrows only if they do, so one flyer and five flyers both look deliberate with nothing to configure.<br/><br/>
      Show details are repeated as text fields even though they are printed on the poster: <strong>a flyer image is invisible to search engines and screen readers</strong>, and the alt text is assembled from those fields. Videos are click-to-load, so nothing is requested from YouTube until someone presses play. Reduced motion is honoured globally, and the film grain is an inline SVG rather than a network request.<br/><br/>
      Beyond the site, I have led <strong>album production</strong>, <strong>video production</strong>, and much of the band&#39;s <strong>album &amp; flyer art</strong> over the years — so the design language mirrors the sound rather than being applied to it.
    `,
    technologies: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'Static Export',
      'Vercel',
      'Accessibility',
    ],
    // The old sites-*.webp captures were of the pre-redesign site and have been
    // retired. These are the rebuilt page: hero, the release block, and the show
    // strip above the merch handoff into the store.
    thumbnail: '/projects/short-fuse-thumb.webp',
    screenshots: [
      '/projects/short-fuse-1.webp',
      '/projects/short-fuse-2.webp',
      '/projects/short-fuse-3.webp',
    ],
  },
  {
    slug: 'meowtin-massage',
    title: 'Bodywork by Meowtin\nPractice Site',
    navTitle: 'Bodywork by Meowtin',
    category: 'Web Development',
    section: 'brands',
    order: 3,
    client: 'My own practice',
    url: 'https://massage.meowtin.com',
    description: `
      Designed and built <strong>massage.meowtin.com</strong>, the home for my licensed massage therapy practice — which also makes it the one project where I was simultaneously the developer, the client, and the person answering the phone when the booking flow doesn&#39;t work.<br/><br/>
      Built with <strong>React 19</strong>, <strong>Vite</strong> and <strong>Tailwind 4</strong>, mobile-first, because essentially everyone books a massage from their phone. Three sessions&#39; worth of decisions on one page: what the work is (Swedish, deep tissue, myofascial release), what it costs, and a short path from landing to a request — plus imagery that sets a calm tone rather than a clinical one.<br/><br/>
      <strong>The site takes its theme from you, not from me.</strong> There are two full palettes — warm parchment by day, deep aubergine and gold by night — and which one you get is resolved <em>before first paint</em> by a blocking script in the document head: your own explicit choice if you have made one, otherwise <code>prefers-color-scheme</code>. That ordering is why a dark-mode visitor never gets a flash of the cream page on load. React then reads the applied value back off the document rather than working it out again, so the first render can&#39;t disagree with what is already on screen.<br/><br/>
      The part worth defending is what <em>doesn&#39;t</em> get saved: <strong>only an explicit tap of the toggle writes to storage.</strong> Persisting the resolved default would quietly pin a visitor to whatever their OS happened to say the first time they landed, and every later change to their system setting would stop reaching them. Someone who never touches the toggle keeps following their own preference — including when it flips at sunset.<br/><br/>
      The copy was the harder half. A bodywork site has to describe real benefit without <em>promising outcomes</em> — so every line names what I do rather than what will happen to you: <em>ease tension, support easier movement, bring you back to your body</em>. That constraint shaped the whole voice, and it&#39;s the same discipline that governs the rest of this site.<br/><br/>
      Fast, accessible, and deliberately simple to maintain — I run the practice, so the site had to be something I could update between appointments rather than a project of its own.
    `,
    // Verified against the repo at ~/dev/meowtin-massage, not from memory: this
    // entry claimed Next.js, and the site is React 19 on Vite 6.
    technologies: [
      'React 19',
      'Vite',
      'TypeScript',
      'Tailwind CSS 4',
      'Framer Motion',
      'Responsive Design',
    ],
    // Captures of the rebuilt site; the single massage-site.webp shot of the old
    // design has been deleted. `-1` and `-2` are the SAME view in the dark and
    // light themes and are adjacent on purpose — the grid is 2-up, so they sit
    // side by side in one row and read as a theme toggle rather than a
    // duplicate. Do not separate them or insert anything between them.
    thumbnail: '/projects/meowtin-massage-thumb.webp',
    screenshots: [
      '/projects/meowtin-massage-1.webp',
      '/projects/meowtin-massage-2.webp',
      '/projects/meowtin-massage-3.webp',
    ],
  },
  {
    slug: 'tabs-formatter',
    title: 'Tabs Database and\nLyrics Formatter',
    navTitle: 'Tabs Formatter',
    category: 'Mobile App',
    section: 'tools',
    order: 4,
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

/** Projects for a section, in `order`. Flagships are excluded — they already have
 *  a large card at the top of the page, and showing the same project twice makes
 *  a short portfolio look padded. */
export function sectionProjects(id: SectionId): Project[] {
  return projects
    .filter((p) => p.section === id && !p.flagship)
    .sort((a, b) => a.order - b.order);
}

/** Static screenshots only — the redesigned pages drop the legacy .mp4 captures. */
export function projectImages(p: Project): string[] {
  return p.screenshots.filter((s) => !s.endsWith('.mp4'));
}
