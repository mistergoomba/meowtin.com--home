export const metadata = {
  title: "Creative Work - Meowtin's Domain",
  description: "Music, video, art, and karaoke — Meowtin's creative universe, all in one place.",
  openGraph: {
    title: "Creative Work - Meowtin's Domain",
    description: "Music, video, art, and karaoke — Meowtin's creative universe, all in one place.",
    url: 'https://meowtin.com/creative',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image.png',
        width: 1200,
        height: 630,
        alt: "Meowtin's Creative Work",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Creative Work - Meowtin's Domain",
    description: "Music, video, art, and karaoke — Meowtin's creative universe, all in one place.",
    images: ['https://meowtin.com/share-image.png'],
  },
};

export default function CreativeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
