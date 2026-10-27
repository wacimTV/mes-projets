import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { GARAGE_CONFIG } from "@/config/garage";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://runauto-marseille.fr"),
  title: {
    default: "Run Auto | Garage Automobile Premium à Marseille 13004 – Entretien, Diagnostic & Réparation",
    template: "%s | Run Auto Marseille",
  },
  description:
    "Garage automobile indépendant à Marseille (13004). Entretien, révision constructeur, diagnostic électronique et réparation mécanique multimarque au 52 boulevard de Roux. Devis clair et prise de rendez-vous en ligne.",
  keywords: [
    "Garage automobile Marseille",
    "Garage auto Marseille 13004",
    "Entretien automobile Marseille",
    "Réparation voiture Marseille",
    "Diagnostic automobile Marseille",
    "Prise de rendez-vous garage Marseille",
    "Vidange Marseille",
    "Courroie de distribution Marseille 13004",
    "Changement plaquettes de frein Marseille",
  ],
  authors: [{ name: "Run Auto Marseille" }],
  creator: "Run Auto",
  publisher: "Run Auto",
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
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://runauto-marseille.fr",
    title: "Run Auto | Garage Automobile d'Excellence à Marseille (13004)",
    description:
      "Entretien, révision et diagnostic automobile à Marseille 13004. Prenez rendez-vous en ligne dans notre atelier de précision au 52 boulevard de Roux.",
    siteName: "Run Auto Marseille",
    images: [
      {
        url: "/images/hero-car.jpg",
        width: 1200,
        height: 630,
        alt: "Run Auto - Garage Automobile Premium à Marseille 13004",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Run Auto | Garage Automobile Marseille 13004",
    description: "Entretien, révision et diagnostic automobile à Marseille 13004. Prenez rendez-vous en ligne.",
    images: ["/images/hero-car.jpg"],
  },
  alternates: {
    canonical: "https://runauto-marseille.fr",
  },
};

// JSON-LD Schema.org pour le SEO Local Automobile
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: GARAGE_CONFIG.name,
  image: "https://runauto-marseille.fr/images/hero-car.jpg",
  "@id": "https://runauto-marseille.fr/#garage",
  url: "https://runauto-marseille.fr",
  telephone: GARAGE_CONFIG.contact.phoneInternational,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: GARAGE_CONFIG.contact.address,
    addressLocality: GARAGE_CONFIG.contact.city,
    postalCode: GARAGE_CONFIG.contact.postalCode,
    addressRegion: GARAGE_CONFIG.contact.region,
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GARAGE_CONFIG.contact.coordinates.latitude,
    longitude: GARAGE_CONFIG.contact.coordinates.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: GARAGE_CONFIG.reviewsSummary.verifiedAverageRating,
    reviewCount: 42,
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [GARAGE_CONFIG.partner.idGaragesUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0A0A0B] text-[#F5F4F0] font-sans antialiased selection:bg-[#C6A875] selection:text-[#0A0A0B] min-h-screen flex flex-col pb-16 lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
