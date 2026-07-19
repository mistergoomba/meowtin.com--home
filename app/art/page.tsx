import fs from 'fs';
import path from 'path';

import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import ArtGallery from '@/components/ArtGallery';

export default function ArtPage() {
  const jsonPath = path.join(process.cwd(), 'public', 'art-index.json');
  const images = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  return (
    <PageShell>
      <PageHero
        eyebrow="Art"
        title={
          <>
            My art, <span className="bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">enhanced.</span>
          </>
        }
        intro="Years of drawing, doodling, and painting — my purest form of expression, a kind of visual journaling — reimagined with the help of AI. Click any piece to reveal the original drawing."
        accent="#eab308"
      />
      <ArtGallery images={images} />
    </PageShell>
  );
}
