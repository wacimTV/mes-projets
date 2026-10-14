import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { NfcSection } from "@/components/nfc-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Développeur Web & Community Manager à Marseille | Wacim Ammouche",
  description:
    "Développeur web freelance et community manager à Marseille. Sites internet, e-commerce, commande en ligne et réseaux sociaux. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://www.wacimammouche.fr",
  },
  openGraph: {
    title: "Développeur Web & Community Manager à Marseille | Wacim Ammouche",
    description:
      "Développeur web freelance et community manager à Marseille. Sites internet, e-commerce, commande en ligne et réseaux sociaux. Devis gratuit sous 24h.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.wacimammouche.fr",
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
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wacim Ammouche",
  alternateName: "Wacim Ammouche - Développeur Web & Community Manager",
  url: "https://www.wacimammouche.fr",
  inLanguage: "fr-FR",
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wacim Ammouche",
  jobTitle: "Développeur web et community manager",
  url: "https://www.wacimammouche.fr",
  sameAs: [
    "https://www.linkedin.com/in/wacim-ammouche-4a20031b1/",
    "https://www.instagram.com/wacim.digital/",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marseille",
    addressCountry: "FR",
  },
}

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le prix d'un site internet pour un restaurant à Marseille ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le prix dépend de votre projet : site vitrine ou commande en ligne, nombre de pages, paiement en ligne, gestion des produits et des stocks. Je vous propose un devis gratuit, détaillé et sans engagement, sous 24h, après un échange sur vos besoins.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le délai de création d'un site web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En moyenne, comptez 1 à 3 semaines pour un site vitrine professionnel ou un site de restaurant après réception de vos contenus. Pour un projet e-commerce ou sur-mesure plus complexe, prévoyez entre 3 et 6 semaines.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre un site vitrine et un site e-commerce ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un site vitrine présente votre activité, vos réalisations et vos coordonnées pour inciter vos visiteurs à vous contacter ou visiter votre établissement. Un site e-commerce intègre en plus un catalogue produit complet, un panier et le paiement sécurisé en ligne.",
      },
    },
    {
      "@type": "Question",
      name: "En combien de temps recevez-vous une réponse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je réponds à chaque demande sous 24 heures, souvent bien plus tôt.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous un devis gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, entièrement gratuit et sans engagement. Après analyse de votre projet, je vous transmets une proposition claire et détaillée.",
      },
    },
    {
      "@type": "Question",
      name: "Travaillez-vous à distance ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolument. Je collabore en visioconférence avec des clients partout en France.",
      },
    },
    {
      "@type": "Question",
      name: "Vous déplacez-vous chez vos clients ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, je me déplace à Marseille, dans les communes voisines et dans l'ensemble des Bouches-du-Rhône (13).",
      },
    },
  ],
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
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>
      <Navigation />
      <main id="main-content" className="relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <NfcSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

