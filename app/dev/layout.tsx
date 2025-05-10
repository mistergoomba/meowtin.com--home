export const metadata = {
  title: "Meowtin's Developer Portfolio - Meowtin's Domain",
  description: 'A collection of projects by Meowtin, a software engineer and artist',
  openGraph: {
    title: "Meowtin's Developer Portfolio - Meowtin's Domain",
    description: 'A collection of projects by Meowtin, a software engineer and artist',
    url: 'https://meowtin.com/dev',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image.png',
        width: 1200,
        height: 630,
        alt: "Meowtin's Developer Portfolio",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Meowtin's Developer Portfolio - Meowtin's Domain",
    description: 'A collection of projects by Meowtin, a software engineer and artist',
    images: ['https://meowtin.com/share-image.png'],
  },
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
