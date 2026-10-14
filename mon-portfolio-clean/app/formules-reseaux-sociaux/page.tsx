import type { Metadata } from "next"
import { SocialPlansPage } from "@/components/social-plans/social-plans-page"
import "./social-plans.css"

export const metadata: Metadata = {
  title: "Community Management Instagram & TikTok à Marseille – Formules dès 250 €/mois",
  description:
    "Formules de community management et gestion des réseaux sociaux Instagram et TikTok à Marseille. Création de contenus, visuels, stories et stratégie de communication. Devis gratuit.",
  alternates: { canonical: "/formules-reseaux-sociaux" },
  openGraph: {
    title: "Community Management Instagram & TikTok à Marseille | Wacim Ammouche",
    description:
      "Trois formules claires pour développer votre présence sur Instagram et TikTok. Création de contenus et stratégie digitale à Marseille.",
    type: "website",
    locale: "fr_FR",
    url: "/formules-reseaux-sociaux",
  },
}

export default function FormulesReseauxSociauxPage() {
  return <SocialPlansPage />
}
