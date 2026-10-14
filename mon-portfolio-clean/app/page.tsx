import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { NfcSection } from "@/components/nfc-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
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

