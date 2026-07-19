// app/videos/page.tsx
import PageShell from '@/components/site/PageShell';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/home/Reveal';

type Vid = {
  id: string;
  title: string;
  blurb: string;
};

const videos: Vid[] = [
  {
    id: '7ZEgBegWVV4',
    title: 'AITTALA - Ashes',
    blurb:
      'A fully animated music video channeling the dark, stylized energy of Batman: The Animated Series and Heavy Metal, built through a hand-curated AI animation pipeline.',
  },
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
    <PageShell>
      <PageHero
        eyebrow="Video Production"
        title={
          <>
            Stories in <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">motion.</span>
          </>
        }
        intro="A growing collection of music videos, live moments, promos, and AI‑animation experiments. More coming soon."
        accent="#f59e0b"
      />

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 0.06}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/25">
                <div className="aspect-video w-full overflow-hidden">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.id}?rel=0`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold uppercase tracking-wide text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{v.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
