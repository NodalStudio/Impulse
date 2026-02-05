import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://communaute-impulse.com";

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
    "https://www.linkedin.com/company/impulse-barcelone/",
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Impulse - Communauté business femmes entrepreneures",
  "description": "Événements mensuels de networking, ateliers et masterclass pour femmes entrepreneures et dirigeantes à Barcelone.",
  "url": siteUrl,
  "logo": `${siteUrl}/images/logo.png`,
  "image": `${siteUrl}/images/og-image.jpg`,
  "email": "impulse.rdv@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barcelone",
    "addressRegion": "Catalogne",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.3874,
    "longitude": 2.1686
  },
  "areaServed": [
    { "@type": "City", "name": "Barcelone" },
    { "@type": "AdministrativeArea", "name": "Catalogne" }
  ],
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.linkedin.com/company/impulse-barcelone/",
    "https://www.instagram.com/impulse_women"
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "À qui s'adresse Impulse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Impulse s'adresse aux femmes qui entreprennent ou dirigent, sont engagées dans leur développement business, veulent s'entourer intelligemment, et recherchent autant la stimulation intellectuelle que la qualité des relations humaines."
      }
    },
    {
      "@type": "Question",
      "name": "Comment fonctionne Impulse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Impulse propose 1 rendez-vous mensuel avec un format clair et structuré (accueil, intervention, échanges), des intervenantes internes et externes, des livrables concrets et actionnables, ainsi qu'un suivi et des ressources entre les sessions."
      }
    },
    {
      "@type": "Question",
      "name": "Où ont lieu les événements Impulse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les événements Impulse ont lieu à Barcelone, en Catalogne (Espagne). Chaque rendez-vous mensuel se déroule dans un lieu soigneusement sélectionné pour favoriser les échanges professionnels."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les bénéfices de rejoindre Impulse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rejoindre Impulse permet d'élargir sa manière de penser, renforcer sa posture professionnelle, apprendre autrement par le partage d'expériences et l'intelligence collective, ne plus porter seule ses questionnements, et grandir dans un cadre exigeant et sécurisant."
      }
    },
    {
      "@type": "Question",
      "name": "Comment rejoindre la communauté Impulse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour rejoindre Impulse, remplissez le formulaire de contact sur notre site en indiquant votre nom, email, profession, et localisation. Notre équipe vous recontactera rapidement pour discuter de votre intégration dans la communauté."
      }
    }
  ]
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
        <script
          type="application/ld+json"
          /* eslint-disable-next-line react/no-danger -- Static JSON-LD is safe */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          /* eslint-disable-next-line react/no-danger -- Static JSON-LD is safe */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
