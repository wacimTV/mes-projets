"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code, Palette, Smartphone, Zap, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Développement Web",
    description:
      "Création d'applications web rapides, évolutives et faciles à maintenir en utilisant les technologies modernes et les meilleures pratiques.",
    features: ["Applications sur-mesure", "E-commerce & Boutiques", "Intégration de CMS", "Développement d'API"],
  },
  {
    icon: Palette,
    title: "Mise a jour de sites web",
    description: "Je mets à jour votre site web existant pour y ajouter les nouveautés.",
    features: ["Ajout de pages", "Ajout de fonctionnalités", "Mise a jour des technologies", "Ajout de contenu"],
  },
  {
    icon: Zap,
    title: "Prise de commandes en ligne",
    description: "Permettez à vos clients de commander directement depuis votre site web grâce à un système de commande simple, rapide et sécurisé. Idéal pour les restaurants, snacks, boulangeries, boucheries, commerces alimentaires et bien d'autres.",
    features: ["Commande en ligne 24h/24", "Paiement sécurisé par CB", "Gestion des produits et des stocks", "Notifications automatiques des commandes"],
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="relative py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">Ce que je fais</span>
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">Mes Services</h2>
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

                <h3 className="mb-3 font-serif text-xl font-medium">{service.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
