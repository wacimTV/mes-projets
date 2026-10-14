"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { Code, Palette, Zap, ArrowRight, FileImage, Share2, Wifi } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Création de Sites Internet",
    description:
      "Conception et développement de sites vitrines, e-commerce et applications web sur-mesure à Marseille. Des réalisations rapides, fluides sur mobile et optimisées pour le référencement naturel.",
    features: ["Sites vitrines & corporate", "E-commerce & Boutiques", "Applications web sur-mesure", "Optimisation SEO & Performance"],
  },
  {
    icon: Palette,
    title: "Refonte & Mise à jour de sites",
    description: "Modernisation de votre site internet existant, amélioration de la vitesse d'affichage, mise à jour des technologies et ajout de fonctionnalités.",
    features: ["Refonte graphique & mobile-first", "Ajout de fonctionnalités", "Amélioration du référencement", "Maintenance & évolutions"],
  },
  {
    icon: Zap,
    title: "Prise de commandes en ligne",
    description: "Permettez à vos clients de commander directement depuis votre site web grâce à un système de commande simple, rapide et sécurisé. Idéal pour les restaurants, snacks, boulangeries, boucheries, commerces alimentaires et bien d'autres.",
    features: ["Commande en ligne 24h/24", "Paiement sécurisé par CB", "Gestion des produits et des stocks", "Notifications automatiques des commandes"],
  },
  {
    icon: FileImage,
    title: "Création de Flyers",
    description: "Un flyer efficace ne se contente pas d'être beau — il capte l'attention, transmet votre message et incite à l'action. Je conçois des flyers imprimés et digitaux qui donnent envie d'être lus.",
    features: ["Flyers promotionnels & événementiels", "Restaurants, commerces & services", "Print-ready + version numérique", "Rendu professionnel, délai rapide"],
  },
  {
    icon: Share2,
    title: "Community Management",
    href: "/formules-reseaux-sociaux",
    linkLabel: "Voir les formules Community Manager",
    description:
      "Gestion professionnelle de vos réseaux sociaux Instagram & TikTok à Marseille. De la création de contenus visuels à la publication, je valorise votre entreprise pour booster votre visibilité.",
    features: ["Gestion des réseaux sociaux", "Création de contenus & visuels", "Stratégie de communication locale", "Formules mensuelles dès 250 €/mois"],
  },
  {
    icon: Wifi,
    title: "Carte NFC & QR Code — Avis Google",
    price: "À partir de 50€ TTC",
    description:
      "Transformez chaque client satisfait en nouvel avis Google grâce à une carte NFC & QR Code simple, rapide et efficace. Idéal pour les commerces, restaurants, salons et artisans. Configuration, test et mise en service inclus.",
    features: ["NFC + QR Code configurés sur votre fiche Google", "Installation & mise en service sur place", "Déplacement dans le 13 pour l'installation", "Envoi à l'international · Devis gratuit"],
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="relative py-32 px-6 bg-secondary/30" ref={ref} aria-label="Services de création web et communication digitale à Marseille">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">Ce que je fais</span>
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">Création de Sites Internet &amp; Services Web à Marseille</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-hover
            >
              <motion.div
                className="absolute inset-0 bg-accent/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>

                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="font-serif text-xl font-medium leading-snug">{service.title}</h3>
                  {"price" in service && service.price && (
                    <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">{service.price}</span>
                  )}
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {"href" in service && service.href && (
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[oklch(0.8_0.125_85)] px-5 py-3 text-sm font-semibold text-[oklch(0.14_0.01_85)] shadow-lg shadow-[oklch(0.8_0.125_85/0.35)] ring-1 ring-[oklch(0.8_0.125_85/0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[oklch(0.8_0.125_85/0.5)]"
                  >
                    {service.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
