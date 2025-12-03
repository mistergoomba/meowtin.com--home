// app/videos/page.tsx
import MiniHeader from '@/components/MiniHeader';

type Vid = {
  id: string;
  title: string;
  blurb: string;
};

const videos: Vid[] = [
  {
    id: 'AHwqPe_nC2A',
    title: 'Short Fuse - Apocalyptic Times',
    blurb:
      'Manually stitched together in Premiere using 122 AI-generated clips derived from Short Fuse artwork, my own photos, and meticulously curated images.',
  },
  {
    id: 'DgExa19NJFI',
    title: 'Short Fuse - Toxic Graveyard',
    blurb:
      'Shot at the old Short Fuse studio in Redwood City, this is a horror-themed video for the track from the 2018 album Our Darkest Future.',
  },
  {
    id: 'Hs3LX3FaM9E',
    title: 'None More Negative - RUINS Creepy Green Light',
    blurb:
      'A video from my former Type O Negative tribute band, None More Negative, shot at Cypress Lawn Cemetery in Colma.',
  },
  {
    id: 'JQPAnbyp9V4',
    title: 'Short Fuse - Haunted',
    blurb:
      'Captured on Halloween night at a friend’s haunted house, with additional shots from the Short Fuse studio, stitched together in Adobe Premiere.',
  },
  {
    id: 'rJDDaxmc3To',
    title: "Fart Bubble - You Haven't Eaten My Ass Lately",
    blurb:
      'Starring Scara Darling, this heartbreak song by Fart Bubble was recorded in Las Vegas, NV.',
  },
  {
    id: 'h_po9Gq1Dec',
    title: 'Vampire Mermaid from Outer Space',
    blurb: 'A cult classic in which I participated as both editor and the evil clown.',
  },
  {
    id: 'R8ClUsHqUMM',
    title: 'Short Fuse - Straight to the Guillotine',
    blurb:
      'A song created for pro wrestler and longtime Short Fuse fan Jack Banning, with promotional footage used as the backdrop to the music.',
  },
  {
    id: '9QnQig_ak3U',
    title: 'Short Fuse - Terrible Embraces',
    blurb:
      'Filmed on the road in 2019 with Six Feet Under, in the dead of winter outside Rock Café Southock in the Czech Republic.',
  },
  {
    id: 'SLLWJnrsQC8',
    title: 'Short Fuse - Funeral March',
    blurb:
      'Compiled fan-shot footage from the final show of the Short Fuse/Skinlab tour at my music venue, Sinwave, in Las Vegas.',
  },
  {
    id: 'Gdavt-vJ-3Q',
    title: 'Short Fuse - Violent Riot',
    blurb: 'A video created with impact, using stock footage and news outlet material.',
  },
  {
    id: 'dgdwznrtYNo',
    title: "Fart Bubble - Surfin' on a Turd",
    blurb:
      'The grind beach party no one asked for — pure toilet humor set to blast beats and distortion.',
  },
  {
    id: 'U2Y0uUMs1eo',
    title: 'WWE #ToughEnough - Michael Johnson aka Drugz Bunny',
    blurb:
      'A hype reel built to make waves. I helped produce this promo for pro wrestler Drugz Bunny’s run at WWE’s Tough Enough competition.',
  },
  {
    id: 'dGKgQy82zEA',
    title: 'Short Fuse - Swallowed Earth',
    blurb:
      'The very first Short Fuse video (2013), filmed at the Media Center in Palo Alto and pieced together in Final Cut Pro.',
  },
];

export default function VideosPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-[#0e001a] via-purple-950 to-purple-900 text-white font-sans'>
      <MiniHeader />

      <section className='max-w-6xl mx-auto px-4 pb-16 pt-6'>
        <h1 className='text-3xl md:text-4xl font-extrabold tracking-wide mb-6'>Video Production</h1>
        <p className='text-gray-300 mb-10'>
          A growing collection of music videos, live moments, promos, and experiments. More coming
          soon.
        </p>

        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {videos.map((v) => (
            <article
              key={v.id}
              className='rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-lg overflow-hidden hover:shadow-purple-500/20 transition-shadow'
            >
              <div className='aspect-video w-full overflow-hidden'>
                <iframe
                  className='w-full h-full'
                  src={`https://www.youtube.com/embed/${v.id}?rel=0`}
                  title={v.title}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                />
              </div>

              <div className='p-4'>
                <h3 className='text-lg font-semibold'>{v.title}</h3>
                <p className='mt-2 text-sm text-gray-300 leading-relaxed'>{v.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className='text-center text-sm text-gray-400 py-6'>© 2025 MEOWTIN</footer>
    </main>
  );
}
