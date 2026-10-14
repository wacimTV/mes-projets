import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const siteUrl = "https://www.wacimammouche.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Wacim Ammouche — Développeur Web Freelance à Marseille | Création de Sites Internet",
    template: "%s | Wacim Ammouche",
  },
  description:
    "Développeur web freelance à Marseille. Création de sites internet, applications web, e-commerce et commande en ligne pour restaurants et commerces. Devis gratuit.",
  keywords: [
    "développeur Marseille",
    "développeur web Marseille",
    "développeur web freelance Marseille",
    "freelance développeur Marseille",
    "création site internet Marseille",
    "création site web Marseille",
    "community manager Marseille",
    "gestion réseaux sociaux Marseille",
    "communication digitale Marseille",
    "site internet restaurant Marseille",
    "commande en ligne restaurant Marseille",
    "création site e-commerce Marseille",
    "site vitrine Marseille",
    "carte NFC avis Google",
    "QR Code avis Google",
    "développeur full-stack Marseille",
    "Bouches-du-Rhône",
  ],
  authors: [{ name: "Wacim Ammouche", url: siteUrl }],
  creator: "Wacim Ammouche",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wacim Ammouche — Développeur Web Freelance à Marseille",
    description:
      "Création de sites internet modernes, performants et optimisés SEO. Développeur web freelance à Marseille, disponible dans les Bouches-du-Rhône.",
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Wacim Ammouche — Développeur Web",
    images: [
      {
        url: "/IMG_4611.jpeg",
        width: 1400,
        height: 1050,
        alt: "Wacim Ammouche — Développeur Web Freelance à Marseille",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wacim Ammouche — Développeur Web Freelance à Marseille",
    description:
      "Création de sites internet, e-commerce et commande en ligne à Marseille. Devis gratuit.",
    images: ["/IMG_4611.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data
function JsonLd() {
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Wacim Ammouche — Développeur Web Freelance",
    description:
      "Développeur web freelance à Marseille. Création de sites internet, applications web, e-commerce, commande en ligne et gestion des réseaux sociaux.",
    url: siteUrl,
    email: "w.ammouche13@gmail.com",
    image: `${siteUrl}/IMG_4611.jpeg`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marseille",
      postalCode: "13000",
      addressRegion: "Bouches-du-Rhône",
      addressCountry: "FR",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Marseille",
      },
      {
        "@type": "AdministrativeArea",
        name: "Bouches-du-Rhône",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.2965,
      longitude: 5.3698,
    },
    sameAs: [
      "https://www.linkedin.com/in/wacim-ammouche-4a20031b1/",
      "https://www.instagram.com/wacim.digital/",
    ],
    knowsLanguage: ["fr", "en"],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Création de sites internet",
          description:
            "Conception et développement de sites web modernes, rapides et optimisés SEO à Marseille.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commande en ligne pour restaurants et commerces",
          description:
            "Système de commande en ligne sécurisé pour restaurants, snacks, boulangeries et commerces alimentaires.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Community Management & Gestion des réseaux sociaux",
          description:
            "Gestion des réseaux sociaux Instagram et TikTok à Marseille. Création de contenus et stratégie de communication digitale.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Carte NFC & QR Code pour avis Google",
          description:
            "Installation de cartes NFC et QR Code pour faciliter la collecte d'avis Google.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "50",
          priceCurrency: "EUR",
          valueAddedTaxIncluded: true,
        },
      },
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wacim Ammouche — Développeur Web Freelance à Marseille",
    url: siteUrl,
    inLanguage: "fr-FR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
