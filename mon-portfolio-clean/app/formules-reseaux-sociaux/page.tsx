import type { Metadata } from "next"
import { SocialPlansPage } from "@/components/social-plans/social-plans-page"
import { faqs, plans } from "@/components/social-plans-data"
import "./social-plans.css"

export const metadata: Metadata = {
  title: "Community Manager Marseille & Gestion Réseaux Sociaux | Dès 250 €/mois",
  description:
    "Community manager freelance à Marseille : gestion de vos réseaux sociaux Instagram & TikTok. Création de contenus, stratégie et formules dès 250 €/mois. Devis gratuit.",
  alternates: {
    canonical: "https://www.wacimammouche.fr/formules-reseaux-sociaux",
  },
  openGraph: {
    title: "Community Manager Marseille & Gestion des Réseaux Sociaux | Wacim Ammouche",
    description:
      "Formules de community management pour commerces, restaurants et entreprises à Marseille. Création de contenus et stratégie Instagram & TikTok.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.wacimammouche.fr/formules-reseaux-sociaux",
    images: [
      {
        url: "/wacim-ammouche.jpg",
        width: 1000,
        height: 1333,
        alt: "Community Manager à Marseille - Wacim Ammouche",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Manager Marseille & Gestion des Réseaux Sociaux",
    description:
      "Formules de community management à Marseille pour Instagram & TikTok dès 250 €/mois. Devis gratuit sous 24h.",
    images: ["/wacim-ammouche.jpg"],
  },
}

const socialFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.wacimammouche.fr",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Community Manager & Réseaux Sociaux Marseille",
      item: "https://www.wacimammouche.fr/formules-reseaux-sociaux",
    },
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Community Manager & Gestion des réseaux sociaux à Marseille",
  description:
    "Gestion professionnelle des réseaux sociaux Instagram et TikTok pour entreprises, commerces et restaurants à Marseille et dans les Bouches-du-Rhône.",
  provider: {
    "@type": "ProfessionalService",
    name: "Wacim Ammouche",
    url: "https://www.wacimammouche.fr",
  },
  areaServed: {
    "@type": "City",
    name: "Marseille",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Formules Community Management",
    itemListElement: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.tagline,
      price: plan.price.replace(/[^0-9]/g, ""),
      priceCurrency: "EUR",
      valueAddedTaxIncluded: true,
    })),
  },
}

export default function FormulesReseauxSociauxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(socialFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SocialPlansPage />
    </>
  )
}

