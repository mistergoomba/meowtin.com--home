// app/music/page.tsx
import MiniHeader from '@/components/MiniHeader';
import MusicProjects from '@/components/MusicProjects';

export default function MusicPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-[#0e001a] via-purple-950 to-purple-900 text-white font-sans space-y-12'>
      <MiniHeader />
      <div className='max-w-5xl mx-auto px-4'>
        <MusicProjects />
      </div>
      <footer className='text-center text-sm text-gray-400 py-6'>© 2025 MEOWTIN</footer>
    </main>
  );
}
