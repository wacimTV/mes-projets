"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Star,
  MapPin,
  Smartphone,
  Rocket,
  ArrowRight,
  Check,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Arguments / Bénéfices ────────────────────────────────────────────────────
const benefits = [
  {
    icon: Star,
    title: "Plus d'avis Google",
    description:
      "Facilitez le dépôt d'avis en quelques secondes directement depuis votre établissement.",
  },
  {
    icon: MapPin,
    title: "Plus de visibilité locale",
    description:
      "Les avis Google jouent un rôle important dans la confiance des clients et peuvent contribuer à améliorer votre visibilité dans les recherches locales.",
  },
  {
    icon: MessageSquare,
    title: "Une meilleure réputation",
    description:
      "Donnez à vos clients satisfaits un moyen simple de partager leur expérience et de renforcer votre présence en ligne.",
  },
  {
    icon: Smartphone,
    title: "Simple & sans application",
    description:
      "Le client approche son smartphone de la carte NFC ou scanne le QR Code — la fiche Google s'ouvre instantanément.",
  },
  {
    icon: Rocket,
    title: "Transformez vos clients en ambassadeurs",
    description:
      "Un client satisfait peut devenir votre meilleur outil de communication. Facilitez-lui simplement la tâche.",
  },
]

// ─── Étapes ───────────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Le client approche son téléphone",
    description:
      "En approchant son smartphone de la carte NFC ou en scannant le QR Code, le processus démarre instantanément.",
  },
  {
    number: "02",
    title: "La fiche Google s'ouvre",
    description:
      "La page Google de votre établissement s'affiche directement, sans recherche, sans effort.",
  },
  {
    number: "03",
    title: "L'avis est déposé en quelques secondes",
    description:
      "Au moment où la satisfaction est encore fraîche, votre client peut partager son expérience facilement.",
  },
]

// ─── Inclus dans l'offre ──────────────────────────────────────────────────────
const includes = [
  "Configuration avec votre fiche Google",
  "Personnalisation du support",
  "Test du NFC et du QR Code",
  "Installation sur place",
  "Mise en service",
  "Explications d'utilisation",
]

// ─── Composant Principal ──────────────────────────────────────────────────────
export function NfcSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section
      id="nfc-avis-google"
      className="relative py-32 px-6 overflow-hidden bg-secondary/30"
      ref={ref}
      aria-label="Service carte NFC et QR Code pour avis Google"
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.6 0.18 180), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative z-10">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Nouveau Service
          </span>
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl mb-6">
            Boostez votre visibilité grâce aux{" "}
            <span className="text-gradient">avis Google</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Transformez chaque client satisfait en nouvel avis Google grâce à une carte NFC &amp; QR Code{" "}
            <strong className="text-foreground font-medium">simple, rapide et efficace.</strong>
          </p>
        </motion.div>

        {/* ── Question Accroche ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-20"
        >
          <div className="rounded-2xl border border-accent/30 bg-accent/5 px-8 py-10 text-center relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, oklch(0.6 0.18 180), transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.6 0.18 180), transparent 60%)",
              }}
              aria-hidden="true"
            />
            <h3 className="relative font-serif text-2xl font-medium md:text-3xl mb-4">
              Combien de clients satisfaits repartent chaque jour{" "}
              <em className="text-accent not-italic">sans laisser d&apos;avis ?</em>
            </h3>
            <p className="relative mx-auto max-w-xl text-muted-foreground leading-relaxed">
              Avec une carte NFC &amp; QR Code placée au bon endroit, vos clients peuvent laisser leur avis en quelques secondes,{" "}
              <strong className="text-foreground font-medium">au moment où leur satisfaction est encore fraîche.</strong>
            </p>
          </div>
        </motion.div>

        {/* ── Bénéfices ────────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-accent">
              Pourquoi c&apos;est utile
            </span>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent"
                data-cursor-hover
              >
                <motion.div
                  className="absolute inset-0 bg-accent/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3">
                    <benefit.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-medium">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* 6th card : accroche marketing */}
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-accent/40 bg-accent/5 p-6 transition-all duration-300 hover:border-accent sm:col-span-2 lg:col-span-1"
              data-cursor-hover
            >
              <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                <blockquote className="font-serif text-xl font-medium leading-snug">
                  &ldquo;Vos clients sont satisfaits. Facilitez-leur simplement la tâche.&rdquo;
                </blockquote>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Plus il est simple pour vos clients de laisser un avis, plus vous augmentez vos
                  chances de récolter régulièrement de nouveaux avis Google.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Fonctionnement en 3 étapes ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
              Comment ça fonctionne
            </span>
            <h3 className="font-serif text-3xl font-medium md:text-4xl">
              En 3 étapes, c&apos;est tout
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="rounded-2xl border border-border bg-card p-6 h-full"
              >
                <div className="mb-5 font-serif text-5xl font-medium text-accent/20 leading-none select-none">
                  {step.number}
                </div>
                <h4 className="mb-3 font-serif text-lg font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Offre Tarifaire + CTA ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center"
        >
          {/* Left: pricing card */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
              L&apos;offre
            </span>
            <h3 className="mb-2 font-serif text-2xl font-medium">
              Installation de votre carte NFC &amp; QR Code
            </h3>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-serif text-4xl font-medium">À partir de 59 €</span>
              <span className="text-muted-foreground text-sm">TTC</span>
            </div>

            <ul className="space-y-3 mb-8">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Button size="lg" className="group w-full" asChild>
              <a href="#contact" id="nfc-cta-button">
                Je veux booster mes avis Google
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Devis gratuit · Sans engagement · Déplacement dans le 13
            </p>
          </div>

          {/* Right: pour qui + contexte */}
          <div className="space-y-6">
            <div>
              <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Pour qui ?
              </span>
              <h3 className="mb-4 font-serif text-2xl font-medium leading-snug">
                Idéal pour les commerces, restaurants, salons et artisans
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Je propose cette solution aux commerçants, restaurants, salons de coiffure, hôtels,
                artisans et tout professionnel souhaitant faciliter la collecte d&apos;avis clients
                et renforcer leur présence en ligne.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;objectif n&apos;est pas simplement de vous vendre une carte. Je vous
                accompagne dans la mise en place d&apos;une solution concrète qui peut vous aider à{" "}
                <strong className="text-foreground font-medium">
                  augmenter le nombre d&apos;avis Google
                </strong>
                , améliorer la confiance des futurs clients et renforcer votre réputation locale.
              </p>
            </div>

            {/* Cibles */}
            <div className="flex flex-wrap gap-2">
              {[
                "Restaurants",
                "Salons de coiffure",
                "Hôtels",
                "Artisans",
                "Commerces",
                "Boulangeries",
                "Snacks",
                "Prestataires de services",
              ].map((target) => (
                <span
                  key={target}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {target}
                </span>
              ))}
            </div>

            {/* Secondary CTA */}
            <Button size="lg" variant="outline" className="group bg-transparent" asChild>
              <a href="mailto:w.ammouche13@gmail.com" id="nfc-email-button">
                Me contacter par email
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
