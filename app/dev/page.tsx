'use client';

import IntroSection from './components/IntroSection';
import BioSection from './components/BioSection';
import WordCloud from './components/WordCloud';
import ProjectsSection from './components/ProjectsSection';
import EndSection from './components/EndSection';
import Chevron from './components/Chevron';

export default function DevPage() {
  const backgroundGradient = 'bg-gradient-to-b from-[#0c0018] to-[#18032d]';

  return (
    <main
      style={{
        backgroundImage: "url('/grid-background.png')",
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Chevron */}
      <Chevron />

      {/* Stack sections */}
      <div className={backgroundGradient}>
        <IntroSection />
        <BioSection />
      </div>
      <WordCloud />
      <ProjectsSection />
      <div className={backgroundGradient}>
        <EndSection />
      </div>
    </main>
  );
}
