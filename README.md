# MEOWTIN.COM

> **Personal Portfolio & Creative Showcase** — A sophisticated digital experience showcasing web development, 3D graphics, music production, and creative work.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.176.0-green)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18.2-purple)](https://www.framer.com/motion/)

## 🎨 Overview

MEOWTIN.COM is a comprehensive personal portfolio and creative showcase website that demonstrates expertise across web development, 3D graphics programming, interactive design, and creative content management. The site features an immersive experience with advanced 3D animations, interactive UI components, and comprehensive showcases of professional projects, music production, video editing, and digital art.

### Key Features

- **3D Graphics Integration** - Custom Tron Grid animation with Three.js and post-processing effects
- **Interactive Eye Animation** - Mouse-tracking 3D eye with hover effects and morphing transitions
- **Dynamic Project Showcase** - Comprehensive portfolio with video previews and technology tags
- **Art Gallery** - Before/after AI-enhanced artwork with e-commerce integration
- **Music Projects** - Showcase of musical endeavors and creative collaborations
- **Video Production** - YouTube-integrated portfolio of music videos and creative work
- **Responsive Design** - Mobile-first approach with custom breakpoints and touch interactions
- **Performance Optimized** - Static generation, image optimization, and code splitting
- **SEO Optimized** - Complete meta tags, Open Graph, and Twitter Card support

## 🚀 Live Site

Visit the live site: **[meowtin.com](https://meowtin.com)**

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4 with App Router and static export
- **Frontend**: React 19.1.0 with TypeScript 5.0
- **3D Graphics**: Three.js 0.176.0 with React Three Fiber
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **Animations**: Framer Motion 11.18.2 and custom CSS animations
- **Icons**: Lucide React 0.454.0 & React Icons 5.5.0
- **Fonts**: Google Fonts (Shadows Into Light)
- **Deployment**: Static hosting with CDN
- **Image Optimization**: Next.js Image component with WebP support

## 📁 Project Structure

```
meowtin.com--home/
├── app/
│   ├── art/                 # Digital art gallery
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── bio/                 # Biography page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── dev/                 # Developer portfolio
│   │   ├── components/      # Dev page components
│   │   │   ├── BioSection.tsx
│   │   │   ├── Chevron.tsx
│   │   │   ├── EndSection.tsx
│   │   │   ├── IntroSection.tsx
│   │   │   ├── ProjectOverlay.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── Slide.tsx
│   │   │   └── WordCloud.tsx
│   │   ├── config/          # Project configuration
│   │   │   ├── projects.ts
│   │   │   └── wordPositions.ts
│   │   ├── types/           # TypeScript definitions
│   │   │   └── projects.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── eye/                 # Interactive eye page
│   │   └── page.tsx
│   ├── music/               # Music projects showcase
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── videos/              # Video production portfolio
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage
├── components/
│   ├── AnimatedSection.tsx  # Reusable animation wrapper
│   ├── ArtGallery.tsx       # Art gallery component
│   ├── ElectricityBorder.tsx # Custom border animation
│   ├── EyeAnimation.tsx     # Interactive eye component
│   ├── FallingSocialRain.tsx # Social media rain effect
│   ├── HomePage.tsx         # Main homepage component
│   ├── HomePageCard.tsx     # Portfolio card component
│   ├── MiniEye.tsx          # Mini eye animation
│   ├── MiniHeader.tsx       # Navigation header
│   ├── MusicProjects.tsx    # Music projects display
│   ├── SocialIcons.tsx      # Social media icons
│   └── TronGrid.tsx         # 3D Tron grid animation
├── hooks/
│   ├── use-mobile.tsx       # Mobile detection hook
│   └── useScreenCategory.ts # Responsive breakpoint hook
├── lib/
│   └── utils.ts             # Utility functions
├── public/
│   ├── art/                 # Digital art assets
│   │   ├── [artwork files]
│   │   └── art-index.json   # Art gallery configuration
│   ├── projects/            # Project showcase assets
│   │   └── [project images and videos]
│   ├── [static assets]      # Images, videos, logos
│   └── [background assets]  # Background images and videos
├── scripts/
│   └── convert-art-to-webp.sh # Image optimization script
└── styles/
    └── globals.css          # Additional global styles
```

## 🎯 Portfolio Sections

### Developer Portfolio

- **Professional Projects** - Showcase of web development work including viral petition platform, casino simulator, and custom e-commerce solutions
- **Technology Stack** - Comprehensive display of technical skills and tools
- **Interactive Project Cards** - Hover effects with video previews and technology tags
- **Word Cloud** - Dynamic visualization of skills and technologies

### Digital Art Gallery

- **AI-Enhanced Artwork** - Before/after comparisons of original drawings enhanced with AI
- **E-commerce Integration** - Direct links to purchase artwork on merchandise
- **Interactive Gallery** - Click-to-reveal original artwork functionality
- **Responsive Grid** - Optimized display across all device sizes

### Music Projects

- **Okie Dokie Karaoke** - Community karaoke hosting and management
- **Short Fuse** - Melodic Death Metal band with 20+ year history
- **Fart Bubble** - Experimental grindcore project
- **Mister Goomba** - DJ/producer persona and electronic music
- **Grimslug** - Heavy dubstep collaboration
- **None More Negative** - Type O Negative tribute band

### Video Production

- **Music Videos** - YouTube-integrated portfolio of music video production
- **Live Performances** - Concert footage and behind-the-scenes content
- **Creative Projects** - Experimental video work and promotional content
- **Professional Work** - Commercial video production and editing

## 🎨 Customization

### Adding New Content

1. **Projects**: Update `app/development/config/projects.ts` with new project data
2. **Art Gallery**: Add images to `public/art/` and update `public/art-index.json`
3. **Music Projects**: Modify `components/MusicProjects.tsx` with new projects
4. **Videos**: Update video data in `app/videos/page.tsx`
5. **Social Links**: Modify social media links in `components/SocialIcons.tsx`

### Styling

The project uses Tailwind CSS 3.4.17 with custom utilities:

- `.font-handwritten` - Custom handwritten font styling
- `.bg-black/80` - Semi-transparent black overlays
- Custom 3D transforms and perspective effects
- Dynamic CSS variables for theming

### 3D Graphics

- **Tron Grid**: Customizable line count, colors, and animation parameters
- **Eye Animation**: Mouse tracking, hover effects, and morphing capabilities
- **Electricity Borders**: Procedural animation with customizable colors and timing

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices with touch interactions
- **Custom Breakpoints**: Tailored responsive behavior with `useScreenCategory` hook
- **3D Graphics**: Responsive 3D scenes that adapt to screen size
- **Touch Friendly**: Optimized for touch interactions and gestures

## 🚀 Deployment

### Static Export

The project is configured for static export:

```bash
npm run build
npm run start
```

### Build Configuration

- **Static Export**: Configured in `next.config.mjs`
- **Image Optimization**: Unoptimized for static hosting
- **Trailing Slash**: Enabled for better hosting compatibility

## 🔧 Configuration

### Next.js Configuration

```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

### TypeScript Configuration

- **Strict Mode**: Enabled for type safety
- **Path Mapping**: `@/*` alias for clean imports
- **ESNext Target**: Modern JavaScript features

### Tailwind Configuration

- **Custom Colors**: Extended color palette with CSS variables
- **Custom Fonts**: Shadows Into Light handwritten font
- **Custom Animations**: Fade-in and accordion animations
- **Dark Mode**: Class-based dark mode support

## 📊 Performance

- **Core Web Vitals**: Optimized for Google's Core Web Vitals
- **3D Graphics**: 60 FPS performance with efficient rendering
- **Image Optimization**: WebP format and responsive sizing
- **Code Splitting**: Dynamic imports for reduced bundle size
- **Lazy Loading**: Components and images load on demand

## 🎵 Creative Integration

### Music Projects

- **Multiple Genres**: Metal, electronic, experimental, and tribute projects
- **Social Media**: Integrated links to SoundCloud, social platforms
- **Visual Identity**: Custom logos and branding for each project
- **Community Building**: Karaoke hosting and event management

### Digital Art

- **AI Enhancement**: Original drawings enhanced with AI technology
- **E-commerce**: Direct integration with merchandise platforms
- **Before/After**: Interactive comparison of original and enhanced artwork
- **Creative Process**: Documentation of artistic journey and techniques

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Modern browser with WebGL support

### Installation

```bash
git clone [repository-url]
cd meowtin.com--home
npm install
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is private and proprietary. All rights reserved.

## 📞 Contact

- **Website**: [meowtin.com](https://meowtin.com)
- **Email**: [Contact through website](https://meowtin.com)
- **Social Media**: [LinkedIn](https://linkedin.com/in/martinboynton) | [GitHub](https://github.com/mistergoomba)

---

**MEOWTIN.COM** — _Where creativity meets technology in a symphony of digital innovation._

