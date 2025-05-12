import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://meowtin.com'),
  title: "Meowtin's Domain",
  description:
    "Welcome to Meowtin's Domain, the home page and personal portfolio of Martin Boynton...",
  openGraph: {
    title: "Meowtin's Domain",
    description:
      "Welcome to Meowtin's Domain, the home page and personal portfolio of Martin Boynton...",
    url: 'https://meowtin.com',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image.jpg',
        width: 1200,
        height: 630,
        alt: "Meowtin's Domain",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Meowtin's Domain",
    description:
      "Welcome to Meowtin's Domain, the home page and personal portfolio of Martin Boynton...",
    images: ['https://meowtin.com/share-image.jpg'],
  },
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='bg-black text-white'>{children}</body>
    </html>
  );
}
