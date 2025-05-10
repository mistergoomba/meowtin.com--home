export const metadata = {
  title: "Who Is Meowtin? - Meowtin's Domain",
  description: 'A collection of works by Meowtin, a software engineer and artist',
  openGraph: {
    title: "Who Is Meowtin? - Meowtin's Domain",
    description: 'A collection of works by Meowtin, a software engineer and artist',
    url: 'https://meowtin.com/bio',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image.png',
        width: 1200,
        height: 630,
        alt: 'Who Is Meowtin?',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Who Is Meowtin? - Meowtin's Domain",
    description: 'A collection of works by Meowtin, a software engineer and artist',
    images: ['https://meowtin.com/share-image.png'],
  },
};

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
