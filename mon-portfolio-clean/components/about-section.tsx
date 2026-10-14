"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Award, Briefcase, Code2, Sparkles } from "lucide-react"

const stats = [
  { value: "8+", label: "Ans d'expérience", icon: Briefcase },

]

const experiences = [
  {
    period: "Actuellement",
    role: "Créateur de sites web et communication digitale",
    company: "Indépendant",
    description: "Création de sites web pour des clients et accompagnement des entreprises dans leur communication sur les réseaux sociaux.",
  },
  {
    period: "2026 — actuel",
    role: "BTS CCST, conseil et commercialisation de solutions techniques",
    company: "Lycée rempart",
    description: "étudiant en filière BTS CCST, conseil et commercialisation de solutions techniques.",
  },

  {
    period: "2022 — 2025",
    role: "Bac STI2D spécialité système d'information et numérique",
    company: "Lycée Pasquet",
    description: "étudiant en filière STI2D spécialité SIN.",
  },
  {
    period: "2019 — actuel",
    role: "Développeur Web & Mobile Full-Stack",
    company: "Indépendant",
    description: "Conception et développement de sites web et d'applications mobiles iOS & Android.",
  },
  {
    period: "2026",
    role: "Missions d'intérim",
    company: "Haribo (Beaucaire) · Aéroport de Vatry",
    description: "Missions d'intérim à l'usine Haribo de Beaucaire et à l'aéroport de Vatry.",
  },
  {
    period: "2026",
    role: "Stage",
    company: "Rexel · Arles",
    description: "Stage en entreprise chez Rexel, à Arles.",
  },
  {
    period: "2025",
    role: "Équipier polyvalent",
    company: "McDonald's",
    description: "Poste d'équipier polyvalent en restauration rapide.",
  },
  {
    period: "Juillet — août 2025",
    role: "Animateur en centre aéré",
    company: "Centre aéré",
    description: "Animation auprès des enfants pendant la période estivale.",
  },
  {
    period: "2024",
    role: "Vendeur en marché alimentaire",
    company: "Arles",
    description: "Vente de produits alimentaires sur un marché, à Arles.",
  },
  {
    period: "Décembre 2022",
    role: "Stage",
    company: "LERM",
    description: "Stage en entreprise au sein du LERM.",
  },
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">À Propos</span>
            <h2 className="mb-6 font-serif text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Développeur web freelance à Marseille depuis 2019
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Basé à Marseille, je conçois des sites internet, des applications web et des solutions e-commerce soignées, rapides et optimisées pour le référencement. Mon approche associe rigueur technique et sens du détail, avec une attention constante portée à l'expérience utilisateur.
              </p>
              <p>
                J'accompagne les entreprises, les commerces et les indépendants des Bouches-du-Rhône — et partout en France — de la conception jusqu'à la mise en ligne.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
                  <div className="font-serif text-3xl font-medium">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Experience */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
              Parcours
            </span>
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={`${exp.role}-${exp.company}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="group relative border-l-2 border-border pl-6 transition-colors hover:border-accent"
                >
                  <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-border transition-colors group-hover:bg-accent" />
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {exp.period}
                  </span>
                  <h3 className="mt-1 font-medium">
                    {exp.role} · <span className="text-accent">{exp.company}</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 overflow-hidden rounded-2xl bg-secondary"
            >
              <Image
                src="/IMG_4611.jpeg"
                alt="Wacim Ammouche, développeur web freelance à Marseille"
                width={600}
                height={750}
                className="w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
