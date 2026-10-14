import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = "https://www.wacimammouche.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Développeur Web & Community Manager à Marseille | Wacim Ammouche",
    template: "%s | Wacim Ammouche",
  },
  description:
    "Développeur web freelance et community manager à Marseille. Sites internet, e-commerce, commande en ligne et réseaux sociaux. Devis gratuit sous 24h.",
  authors: [{ name: "Wacim Ammouche", url: siteUrl }],
  creator: "Wacim Ammouche",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Développeur Web & Community Manager à Marseille | Wacim Ammouche",
    description:
      "Développeur web freelance et community manager à Marseille. Sites internet, e-commerce, commande en ligne et réseaux sociaux. Devis gratuit sous 24h.",
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Wacim Ammouche",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Développeur Web & Community Manager à Marseille | Wacim Ammouche",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur Web & Community Manager à Marseille | Wacim Ammouche",
    description:
      "Développeur web freelance et community manager à Marseille. Sites internet, e-commerce, commande en ligne et réseaux sociaux. Devis gratuit sous 24h.",
    images: ["/og-image.jpg"],
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
    name: "Wacim Ammouche — Développeur Web & Community Manager à Marseille",
    description:
      "Développeur web freelance et community manager à Marseille. Sites internet, e-commerce, commande en ligne et réseaux sociaux. Devis gratuit sous 24h.",
    url: siteUrl,
    email: "w.ammouche13@gmail.com",
    telephone: "+33782135483",
    image: `${siteUrl}/og-image.jpg`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marseille",
      postalCode: "13000",
      addressRegion: "Provence-Alpes-Côte d'Azur",
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
    />
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
        suppressHydrationWarning
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
