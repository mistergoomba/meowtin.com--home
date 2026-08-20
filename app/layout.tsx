import type { Metadata } from 'next';
import { Anton, Cormorant_Garamond, Shadows_Into_Light, Share_Tech } from 'next/font/google';
import './globals.css';

const shareTech = Share_Tech({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-share-tech',
});

// The massage world is set in Cormorant on massage.meowtin.com. The gate's
// massage panel borrows it so the door looks like the room behind it.
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
});

// The creative world's voice: condensed, heavy, gig-poster. Ships one weight —
// its 400 is already black — so the statement must not ask for font-bold on top
// or the browser will synthesize a smear. See HEADING_CLASS in doors.ts.
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
});

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
      <body
        className={`bg-black text-white ${shareTech.variable} ${cormorant.variable} ${anton.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
