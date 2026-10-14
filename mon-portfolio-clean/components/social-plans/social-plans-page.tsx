"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion, MotionConfig } from "framer-motion"
import { ArrowRight, Check, Crown, Instagram, Star, Video } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { QuoteDialog, type FormulaChoice } from "@/components/social-plans/quote-dialog"
import { benefits, faqs, plans, sectors, steps } from "@/components/social-plans-data"

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: string; id: string }) {
  return (
    <Reveal className="mx-auto mb-12 text-center md:mb-16">
      <span className="sp-eyebrow">{eyebrow}</span>
      <h2 id={id} className="sp-title">{title}</h2>
      <span className="sp-rule" aria-hidden="true" />
      {lead && <p className="sp-lead mx-auto mt-5">{lead}</p>}
    </Reveal>
  )
}

export function SocialPlansPage() {
  const [open, setOpen] = useState(false)
  const [formula, setFormula] = useState<FormulaChoice>("standard")

  const openQuote = (f: FormulaChoice) => {
    setFormula(f)
    setOpen(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="sp-root min-h-screen">
        <Navigation />
        <main id="contenu">
          {/* ── 1. Hero ─────────────────────────────────────── */}
          <section className="sp-hero" aria-labelledby="hero-title">
            <div className="sp-container">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <nav
                  aria-label="Fil d'Ariane"
                  className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  <Link
                    href="/"
                    className="transition-colors hover:text-foreground"
                  >
                    Accueil
                  </Link>
                  <span aria-hidden="true">›</span>
                  <span className="text-foreground">
                    Community Management
                  </span>
                </nav>
                <span className="sp-eyebrow">
                  <Link href="/" className="hover:underline transition-colors">
                    Wacim Ammouche
                  </Link>{" "}
                  · Community Manager Freelance à Marseille
                </span>
                <h1 id="hero-title" className="mx-auto max-w-4xl">
                  Community Manager à Marseille &amp; <span className="sp-gold-text">Gestion des Réseaux Sociaux</span>
                </h1>
                <p className="sp-lead mx-auto mt-6 text-base md:text-lg">
                  Des formules claires et sur-mesure pour développer votre visibilité sur Instagram et TikTok. Basé à Marseille, j&apos;accompagne les commerces, restaurants et entreprises dans la gestion de leurs réseaux sociaux, la création de contenus visuels et leur stratégie de communication digitale. Sur place dans le 13 ou à distance à l&apos;international.
                </p>
                <p className="mx-auto mt-3 text-xs text-muted-foreground">
                  Besoin d&apos;un site web en parallèle ? Découvrez mes prestations de{" "}
                  <a href="/#services" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    création de site internet
                  </a>
                  .
                </p>
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <a href="#formules" className="sp-btn sp-btn--gold">
                    Découvrir les formules <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button type="button" className="sp-btn sp-btn--ghost" onClick={() => openQuote("a-definir")}>
                    Demander un devis gratuit
                  </button>
                </div>
                <ul className="sp-chips" aria-label="Plateformes concernées">
                  <li className="sp-chip"><Instagram className="h-4 w-4 sp-gold-text" aria-hidden="true" /> Instagram</li>
                  <li className="sp-chip"><Video className="h-4 w-4 sp-gold-text" aria-hidden="true" /> TikTok</li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* ── 2. Formules ─────────────────────────────────── */}
          <section id="formules" className="sp-section scroll-mt-20" aria-labelledby="plans-title">
            <div className="sp-container">
              <SectionHeading
                id="plans-title"
                eyebrow="Mes formules"
                title="Choisissez la formule adaptée à votre entreprise"
                lead="Tous les tarifs sont mensuels et indiqués TTC."
              />
              <div className="sp-plans">
                {plans.map((plan, i) => (
                  <Reveal key={plan.id} delay={i * 0.1} className="flex">
                    <article
                      className={`sp-card sp-plan w-full ${plan.featured ? "sp-plan--featured" : ""} ${plan.id === "premium" ? "sp-plan--premium" : ""}`}
                      aria-labelledby={`plan-${plan.id}`}
                    >
                      {plan.featured && (
                        <span className="sp-badge"><Star className="h-3.5 w-3.5" aria-hidden="true" /> La plus populaire</span>
                      )}
                      {plan.id === "premium" && (
                        <span className="sp-crest" aria-hidden="true"><Crown className="h-4 w-4" /></span>
                      )}
                      <h3 id={`plan-${plan.id}`} className="sp-plan-name">{plan.name}</h3>
                      <p className="sp-price">
                        <strong>{plan.price}</strong>
                        <span>/ mois TTC</span>
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
                      <ul className="sp-features" aria-label={`Inclus dans la ${plan.name}`}>
                        {plan.features.map((f) => (
                          <li key={f}>
                            <Check className="h-4 w-4" aria-hidden="true" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        className={`sp-btn w-full ${plan.featured || plan.id === "premium" ? "sp-btn--gold" : "sp-btn--ghost"} ${plan.id === "premium" ? "sp-btn--premium" : ""}`}
                        onClick={() => openQuote(plan.id)}
                      >
                        {plan.cta}
                        {plan.id === "premium" && <ArrowRight className="sp-btn-arrow h-4 w-4" aria-hidden="true" />}
                      </button>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. Bénéfices ────────────────────────────────── */}
          <section className="sp-section sp-section--alt" aria-labelledby="benefits-title">
            <div className="sp-container">
              <SectionHeading
                id="benefits-title"
                eyebrow="Mon accompagnement"
                title="Ce que je peux faire pour votre entreprise"
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map(({ icon: Icon, title, text }, i) => (
                  <Reveal key={title} delay={(i % 4) * 0.08}>
                    <div className="sp-card h-full">
                      <span className="sp-icon mb-4"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                      <h3 className="mb-2 font-serif text-lg font-medium leading-snug">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── 4. Étapes ───────────────────────────────────── */}
          <section className="sp-section" aria-labelledby="steps-title">
            <div className="sp-container">
              <SectionHeading id="steps-title" eyebrow="Méthode" title="Mon accompagnement en 4 étapes" />
              <ol className="sp-steps list-none p-0">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="sp-step">
                    <Reveal delay={i * 0.1}>
                      <span className="sp-step-num" aria-hidden="true">{i + 1}</span>
                      <div className="sp-card text-left md:text-center">
                        <Icon className="sp-gold-text mb-3 h-5 w-5 md:mx-auto" aria-hidden="true" />
                        <h3 className="mb-2 font-serif text-xl font-medium">
                          <span className="sr-only">Étape {i + 1} : </span>{title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── 5. Pour qui ─────────────────────────────────── */}
          <section className="sp-section sp-section--alt" aria-labelledby="sectors-title">
            <div className="sp-container">
              <SectionHeading
                id="sectors-title"
                eyebrow="Pour qui ?"
                title="Pour quels professionnels ?"
                lead="Les contenus sont adaptés au secteur d'activité, aux objectifs et à l'identité de chaque entreprise."
              />
              <ul className="sp-sectors list-none p-0">
                {sectors.map(({ icon: Icon, label }, i) => (
                  <li key={label}>
                    <Reveal delay={(i % 4) * 0.06} className="h-full">
                      <div className="sp-card sp-sector h-full">
                        <span className="sp-icon"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                        {label}
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── 6. FAQ ──────────────────────────────────────── */}
          <section className="sp-section" aria-labelledby="faq-title">
            <div className="sp-container max-w-3xl">
              <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions fréquentes" />
              <Reveal>
                <Accordion type="single" collapsible>
                  {faqs.map((item, i) => (
                    <AccordionItem key={item.q} value={`faq-${i}`} className="sp-faq-item">
                      <AccordionTrigger className="py-5 text-base hover:no-underline">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          </section>

          {/* ── 7. CTA final ────────────────────────────────── */}
          <section className="sp-section pt-0 md:pt-0" aria-labelledby="cta-title">
            <div className="sp-container">
              <Reveal>
                <div className="sp-card sp-plan--featured px-6 py-14 text-center md:px-12 md:py-20">
                  <h2 id="cta-title" className="sp-title mx-auto max-w-3xl">
                    Prêt à développer votre présence sur les réseaux sociaux ?
                  </h2>
                  <p className="sp-lead mx-auto mt-5">
                    Parlons de votre projet et trouvons ensemble la formule adaptée à votre entreprise.
                  </p>
                  <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                    <button type="button" className="sp-btn sp-btn--gold" onClick={() => openQuote("a-definir")}>
                      Demander mon devis gratuit
                    </button>
                    <a href="/#contact" className="sp-btn sp-btn--ghost">Me contacter</a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>
        <Footer />
        <QuoteDialog open={open} onOpenChange={setOpen} formula={formula} onFormulaChange={setFormula} />
      </div>
    </MotionConfig>
  )
}
