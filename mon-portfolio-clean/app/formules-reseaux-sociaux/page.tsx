import type { Metadata } from "next"
import { SocialPlansPage } from "@/components/social-plans/social-plans-page"
import "./social-plans.css"

export const metadata: Metadata = {
  title: "Gestion des réseaux sociaux Instagram & TikTok – Formules dès 250 €/mois | Wacim Ammouche",
  description:
    "Formules de gestion des réseaux sociaux pour Instagram et TikTok : création de contenus, visuels, stories et stratégie de communication. Devis gratuit – Wacim Ammouche, Marseille.",
  alternates: { canonical: "/formules-reseaux-sociaux" },
  openGraph: {
    title: "Formules réseaux sociaux Instagram & TikTok | Wacim Ammouche",
    description:
      "Trois formules claires pour développer votre présence sur Instagram et TikTok. Demandez votre devis gratuit.",
    type: "website",
    locale: "fr_FR",
    url: "/formules-reseaux-sociaux",
  },
}

export default function FormulesReseauxSociauxPage() {
  return <SocialPlansPage />
}
