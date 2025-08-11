// app/videos/page.tsx
import MiniHeader from '@/components/MiniHeader';

type Vid = {
  id: string;
  title: string;
  blurb: string;
};

const videos: Vid[] = [
  {
    id: 'DgExa19NJFI',
    title: 'Short Fuse - Toxic Graveyard',
    blurb:
      'Shot in the depths of the Short Fuse studio, stitched together with razor-sharp edits in Adobe Premiere to match the track’s menacing pulse.',
  },
  {
    id: 'Hs3LX3FaM9E',
    title: 'None More Negative - RUINS Creepy Green Light',
    blurb:
      'A gloomy trek through the NMN studio and Cypress Hill Cemetery in Colma, CA — equal parts tribute, parody, and pure Type O Negative worship.',
  },
  {
    id: 'JQPAnbyp9V4',
    title: 'Short Fuse - Haunted',
    blurb:
      'Captured on Halloween night at a friend’s haunted house with extra shots from the Short Fuse studio — all stitched into a delightfully eerie cut.',
  },
  {
    id: 'rJDDaxmc3To',
    title: "Fart Bubble - You Haven't Eaten My Ass Lately",
    blurb:
      'An unapologetically absurd fever dream starring Scara Darling, filmed in Las Vegas and loaded with the band’s signature filth-core charm.',
  },
  {
    id: 'h_po9Gq1Dec',
    title: 'Vampire Mermaid from Outer Space',
    blurb:
      'A self-produced Bay Area cult oddity — campy, chaotic, and impossible to look away from once the first fangs appear.',
  },
  {
    id: 'R8ClUsHqUMM',
    title: 'Short Fuse - Straight to the Guillotine',
    blurb:
      'Commissioned for pro wrestler Jack Banning, this cut fuses brutal riffs with in-your-face wrestling promo chaos.',
  },
  {
    id: '9QnQig_ak3U',
    title: 'Short Fuse - Terrible Embraces',
    blurb:
      'Filmed on the road in 2019 with Six Feet Under — a gritty European tour memory captured outside Rock Cafe Southock in the Czech Republic.',
  },
  {
    id: 'SLLWJnrsQC8',
    title: 'Short Fuse - Funeral March',
    blurb:
      'Fan-shot footage from the Short Fuse / Skinlab tour’s final show at Sinwave in Las Vegas — raw, loud, and unfiltered.',
  },
  {
    id: 'Gdavt-vJ-3Q',
    title: 'Short Fuse - Violent Riot',
    blurb:
      'A barrage of riot footage cut to pounding riffs — chaotic energy with a political snarl.',
  },
  {
    id: 'dgdwznrtYNo',
    title: "Fart Bubble - Surfin' on a Turd",
    blurb:
      'The grind-punk beach party no one asked for — pure toilet humor set to blast beats and distortion.',
  },
  {
    id: 'U2Y0uUMs1eo',
    title: 'WWE #ToughEnough - Michael Johnson aka Drugz Bunny',
    blurb:
      'A hype reel built to make waves — promo for pro wrestler Drugz Bunny’s run at WWE’s Tough Enough competition.',
  },
  {
    id: 'dGKgQy82zEA',
    title: 'Short Fuse - Swallowed Earth',
    blurb:
      'The very first Short Fuse video (2013), filmed at the Media Center in Palo Alto and pieced together in Final Cut Pro with pure DIY grit.',
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
