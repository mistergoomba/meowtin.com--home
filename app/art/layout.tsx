export const metadata = {
  title: "My Art, Enhanced - Meowtin's Domain",
  description:
    'A collection of my artwork, doodles, and drawings over the years, reimagined with the help of AI',
  openGraph: {
    title: "My Art, Enhanced - Meowtin's Domain",
    description:
      'A collection of my artwork, doodles, and drawings over the years, reimagined with the help of AI',
    url: 'https://meowtin.com/art',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image-art.png',
        width: 1200,
        height: 630,
        alt: 'AI-enhanced artwork by Meowtin',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "My Art, Enhanced - Meowtin's Domain",
    description:
      'A collection of my artwork, doodles, and drawings over the years, reimagined with the help of AI',
    images: ['https://meowtin.com/share-image-art.png'],
  },
};

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
