import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Impulse - Communauté de femmes entrepreneures à Barcelone, networking et ateliers pour femmes d'impact",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Impulse | Le rendez-vous business mensuel des femmes d'impact",
    description: "Rejoignez la communauté Impulse : des événements mensuels pour les femmes entrepreneures.",
    images: [`${siteUrl}/images/og-image.png`],
  },

  // Alternates & hreflang
  alternates: {
    canonical: siteUrl,
    languages: {
      'fr-ES': siteUrl,
      'fr': siteUrl,
    },
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
    "https://www.instagram.com/impulse_communaute"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "impulse.rdv@gmail.com",
    "contactType": "customer service"
  },
  "founder": [
    { "@type": "Person", "name": "Anaïs Derenne" },
    { "@type": "Person", "name": "Marina Serr" },
    { "@type": "Person", "name": "Sophie Bernicke" }
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
  "image": `${siteUrl}/images/og-image.png`,
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
    "https://www.instagram.com/impulse_communaute"
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

// Breadcrumb structured data for navigation
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": siteUrl
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Notre Mission",
      "item": `${siteUrl}/#mission`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Les 3 Piliers",
      "item": `${siteUrl}/#piliers`
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Calendrier",
      "item": `${siteUrl}/#calendrier`
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Équipe",
      "item": `${siteUrl}/#equipe`
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Contact",
      "item": `${siteUrl}/#contact`
    }
  ]
};

// Reviews and aggregate rating for testimonials
const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  "name": "Impulse",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "5",
    "reviewCount": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Maud"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Je chéris ces rdv qui ne sont pas networking mais concrets, axés vers la productivité et le développement personnel."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Laure"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "J'aime particulièrement l'efficacité des ateliers de codéveloppement et l'utilisation de l'intelligence collective. Une révélation!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Isabelle"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Un cercle intime de femmes bienveillantes et inspirantes, dédié au partage d'outils précieux pour faire grandir son business!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Laurita"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Ce groupe de femmes entrepreneuses est vraiment différent de tout ce que j'avais pu expérimenter avant. Bravo d'avoir apporté la touche du collectif (le vrai) !"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Maud"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Je suis particulièrement enthousiaste à cette idée de pouvoir contribuer en proposant mon sujet."
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KQTG5KY0YZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KQTG5KY0YZ');
          `}
        </Script>

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
        <script
          type="application/ld+json"
          /* eslint-disable-next-line react/no-danger -- Static JSON-LD is safe, hardcoded breadcrumb data */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          /* eslint-disable-next-line react/no-danger -- Static JSON-LD is safe, hardcoded review data */
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
