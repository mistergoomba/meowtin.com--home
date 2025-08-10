// app/music/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Music & Karaoke — Meowtin's Domain",
  description: 'My music projects, bands, and karaoke hosting.',
  openGraph: {
    title: "Music & Karaoke — Meowtin's Domain",
    description: 'My music projects, bands, and karaoke hosting.',
    url: 'https://meowtin.com/music',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image-music.png',
        width: 1200,
        height: 630,
        alt: 'Music projects by Meowtin',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Music & Karaoke — Meowtin's Domain",
    description: 'My music projects, bands, and karaoke hosting.',
    images: ['https://meowtin.com/share-image-music.png'],
  },
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
