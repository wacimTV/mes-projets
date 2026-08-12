"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Briefcase, Code2, Sparkles } from "lucide-react"

const stats = [
  { value: "8+", label: "Ans d'expérience", icon: Briefcase },

]

const experiences = [
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
              Concevoir des expériences web qui allient design et performance.
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Développeur web depuis 2019, je conçois des sites et des applications web soignés, rapides et faciles à prendre en main. Mon approche associe rigueur technique et sens du détail, avec une attention constante portée à l'expérience utilisateur.
              </p>
              <p>
                J'accompagne entreprises et indépendants de la conception jusqu'à la mise en ligne avec des solutions adaptées à chaque besoin.
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
                  key={exp.role}
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
              <img
                src="/IMG_4611.jpeg"
                alt="Wacim AMMOUCHE"
                className="w-full rounded-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
