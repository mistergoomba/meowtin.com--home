// app/music/page.tsx
import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import MusicProjects from '@/components/MusicProjects';

export default function MusicPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Music"
        title={
          <>
            I create <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">sound.</span>
          </>
        }
        intro="Metal, grind, dubstep, and dark electronica — a lifetime of bands, projects, and productions. Plus the weekly karaoke night."
        accent="#a855f7"
      />
      <MusicProjects />
    </PageShell>
  );
}
