import fs from 'fs';
import path from 'path';
import MiniHeader from '@/components/MiniHeader';
import ArtGallery from '@/components/ArtGallery';

export default function ArtPage() {
  const jsonPath = path.join(process.cwd(), 'public', 'art-index.json');
  const images = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  return (
    <main className='min-h-screen bg-gradient-to-b from-[#0e001a] via-purple-950 to-purple-900 text-white font-sans space-y-12'>
      <MiniHeader />
      <ArtGallery images={images} />
      <footer className='text-center text-sm text-gray-500 py-6'>© 2025 MEOWTIN</footer>
    </main>
  );
}
