const title = 'Martin Boynton - Meowtin';
const description =
  'The whole picture: developer, massage therapist, musician, video producer, and artist. 25+ years of building things, and the journey that connects them.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://meowtin.com/martin',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Martin Boynton',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://meowtin.com/share-image.jpg'],
  },
};

export default function MartinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
