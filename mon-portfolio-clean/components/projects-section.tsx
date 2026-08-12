"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, Wrench, Sparkles } from "lucide-react"

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="relative py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Sélection de projets
          </span>
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
            Projets Phares
          </h2>
        </motion.div>

        {/* En cours block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-card"
        >
          {/* Animated background grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center justify-center gap-8 px-8 py-24 text-center">

            {/* Animated icon cluster */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute h-24 w-24 rounded-full border border-dashed border-accent/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute h-16 w-16 rounded-full border border-dashed border-accent/20"
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
                <Wrench className="h-6 w-6 text-accent" />
              </div>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-amber-400">
                En cours de construction
              </span>
            </div>

            {/* Text */}
            <div className="max-w-xl space-y-3">
              <h3 className="font-serif text-2xl font-medium md:text-3xl">
                Des projets concrets arrivent bientôt.
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Je travaille actuellement sur plusieurs réalisations clients que je ne peux pas encore divulguer.
                Cette section sera mise à jour dès que les projets seront livrés et validés.
              </p>
            </div>

            {/* Decorative feature list */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Clock, label: "Livraison en cours", sub: "Projets actifs" },
                { icon: Sparkles, label: "Mise en ligne prévue", sub: "Prochainement" },
                { icon: Wrench, label: "En développement", sub: "Plusieurs clients" },
              ].map(({ icon: Icon, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border/40 bg-secondary/40 px-6 py-5"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-xs text-muted-foreground">{sub}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
