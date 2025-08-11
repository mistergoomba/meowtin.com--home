// app/videos/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Production — Meowtin',
  description: 'Music videos, live clips, promos, and experiments.',
  openGraph: {
    title: 'Video Production — Meowtin',
    description: 'Music videos, live clips, promos, and experiments.',
    url: 'https://meowtin.com/videos',
    siteName: "Meowtin's Domain",
    images: [{ url: 'https://meowtin.com/share-image-videos.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Production — Meowtin',
    description: 'Music videos, live clips, promos, and experiments.',
    images: ['https://meowtin.com/share-image-videos.png'],
  },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
