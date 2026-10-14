import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { NfcSection } from "@/components/nfc-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
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
