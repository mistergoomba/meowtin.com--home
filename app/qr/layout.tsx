export const metadata = {
  title: "Tip Meowtin - Meowtin's Domain",
  description: 'Send a tip to Meowtin via Venmo, PayPal, Cash App, or Zelle',
  openGraph: {
    title: "Tip Meowtin - Meowtin's Domain",
    description: 'Send a tip to Meowtin via Venmo, PayPal, Cash App, or Zelle',
    url: 'https://meowtin.com/qr',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tip Meowtin',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tip Meowtin - Meowtin's Domain",
    description: 'Send a tip to Meowtin via Venmo, PayPal, Cash App, or Zelle',
    images: ['https://meowtin.com/share-image.jpg'],
  },
};

export default function QrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
