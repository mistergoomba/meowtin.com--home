'use client';

import { useRef } from 'react';

import SiteHeader from './home/SiteHeader';
import Hero from './home/Hero';
import CurrentFocus from './home/CurrentFocus';
import SelectedProjects from './home/SelectedProjects';
import DifferentWorlds from './home/DifferentWorlds';
import JourneyTimeline from './home/JourneyTimeline';
import StatsRow from './home/StatsRow';
import ContactFooter from './home/ContactFooter';

export default function HomePage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-[#050506] font-share-tech text-white">
      <SiteHeader />
      <Hero onExplore={scrollToContent} />

      <div ref={contentRef}>
        <CurrentFocus />
        <SelectedProjects />
        <DifferentWorlds />
        <JourneyTimeline />
        <StatsRow />
        <ContactFooter />
      </div>
    </div>
  );
}
