export const metadata = {
  title: "Wellness - Meowtin's Domain",
  description:
    "Meowtin's healing journey — from a hardcore recovery through the dark side to a balanced practice as a massage therapist and bodyworker.",
  openGraph: {
    title: "Wellness - Meowtin's Domain",
    description:
      "Meowtin's healing journey — from a hardcore recovery through the dark side to a balanced practice as a massage therapist and bodyworker.",
    url: 'https://meowtin.com/wellness',
    siteName: "Meowtin's Domain",
    images: [
      {
        url: 'https://meowtin.com/share-image.png',
        width: 1200,
        height: 630,
        alt: "Meowtin's Wellness",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wellness - Meowtin's Domain",
    description:
      "Meowtin's healing journey — from a hardcore recovery through the dark side to a balanced practice as a massage therapist.",
    images: ['https://meowtin.com/share-image.png'],
  },
};

export default function WellnessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
