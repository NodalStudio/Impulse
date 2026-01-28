import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://impulse-women.com";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e3a5f',
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Impulse | Le rendez-vous business mensuel des femmes d'impact",
    template: "%s | Impulse"
  },
  description: "Rejoignez la communauté Impulse : des événements mensuels pour les femmes entrepreneures qui veulent apprendre, s'entraider et réussir ensemble. Networking, ateliers pratiques et entraide bienveillante.",
  keywords: [
    "entrepreneuriat féminin",
    "networking femmes",
    "business women",
    "communauté entrepreneures",
    "événements business",
    "femmes d'affaires",
    "réseau professionnel femmes",
    "ateliers entrepreneuriat",
    "masterclass business",
    "femmes d'impact",
    "entraide entrepreneures",
    "formation entrepreneuriat"
  ],
  authors: [{ name: "Impulse" }],
  creator: "Impulse",
  publisher: "Impulse",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Manifest (PWA)
  manifest: '/manifest.json',

  // Open Graph
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Impulse",
    title: "Impulse | Le rendez-vous business mensuel des femmes d'impact",
    description: "Rejoignez la communauté Impulse : des événements mensuels pour les femmes entrepreneures qui veulent apprendre, s'entraider et réussir ensemble.",
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Impulse - Communauté de femmes entrepreneures",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Impulse | Le rendez-vous business mensuel des femmes d'impact",
    description: "Rejoignez la communauté Impulse : des événements mensuels pour les femmes entrepreneures.",
    images: [`${siteUrl}/images/og-image.jpg`],
    creator: "@impulse_women",
    site: "@impulse_women",
  },

  // Alternates
  alternates: {
    canonical: siteUrl,
  },

  // Verification (update with actual IDs when available)
  verification: {
    // google: 'your-google-verification-id',
    // yandex: 'your-yandex-verification-id',
  },

  // Category
  category: "business",

  // Other meta
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Impulse',
    'format-detection': 'telephone=no',
  },
};

// JSON-LD Structured Data (hardcoded, safe to use with dangerouslySetInnerHTML)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Impulse",
  "description": "Le rendez-vous business mensuel des femmes d'impact",
  "url": siteUrl,
  "logo": `${siteUrl}/images/logo.png`,
  "sameAs": [
    "https://www.linkedin.com/company/impulse-women",
    "https://www.instagram.com/impulse_women"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@impulse-women.com",
    "contactType": "customer service"
  },
  "founder": [
    { "@type": "Person", "name": "Sophie Martin" },
    { "@type": "Person", "name": "Marie Dubois" },
    { "@type": "Person", "name": "Julie Bernard" }
  ],
  "event": {
    "@type": "EventSeries",
    "name": "Événements mensuels Impulse",
    "description": "Ateliers et networking pour femmes entrepreneures",
    "organizer": {
      "@type": "Organization",
      "name": "Impulse"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          /* eslint-disable-next-line react/no-danger -- Static JSON-LD is safe */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
