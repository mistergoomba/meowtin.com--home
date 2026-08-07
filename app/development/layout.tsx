const title = 'Development & AI Engineering - Meowtin';
const description =
  'Freelance full-stack development: AI agent tooling, machine learning, Shopify and WordPress builds, and custom internal tools. 25+ years, shipped end to end.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://meowtin.com/development',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image-dev.png',
        width: 1200,
        height: 630,
        alt: "Meowtin's Development Portfolio",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://meowtin.com/share-image-dev.png'],
  },
};

export default function DevelopmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
