import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Utensils,
  Smartphone,
  CreditCard,
  TrendingUp,
  Clock,
  MapPin,
  BadgeCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Commande en Ligne pour Restaurant à Marseille | Click & Collect",
  description:
    "Solution de commande en ligne et Click & Collect pour restaurants à Marseille. Réduisez les commissions des plateformes et fidélisez vos clients. Devis gratuit sous 24h.",
  alternates: { canonical: "https://www.wacimammouche.fr/commande-en-ligne-restaurant-marseille" },
  openGraph: {
    title: "Commande en Ligne pour Restaurant à Marseille | Solution Sans Commission",
    description:
      "Installez votre propre système de commande en ligne pour votre restaurant à Marseille. Click & collect direct, paiement sécurisé et zéro intermédiaire.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.wacimammouche.fr/commande-en-ligne-restaurant-marseille",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Commande en ligne pour restaurant à Marseille",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commande en Ligne pour Restaurant à Marseille",
    description:
      "Système de commande Click & Collect sur-mesure pour les restaurateurs marseillais. Devis gratuit sous 24h.",
    images: ["/og-image.jpg"],
  },
}

function PageJsonLd() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Commande en ligne et Click & Collect pour restaurant à Marseille",
    description:
      "Mise en place d'un système de commande en ligne direct pour restaurants, snacks et commerces de bouche à Marseille et dans les Bouches-du-Rhône.",
    provider: {
      "@type": "ProfessionalService",
      name: "Wacim Ammouche",
      url: "https://www.wacimammouche.fr",
    },
    areaServed: [
      { "@type": "City", name: "Marseille" },
      { "@type": "AdministrativeArea", name: "Bouches-du-Rhône" },
    ],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://www.wacimammouche.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Commande en ligne restaurant Marseille",
        item: "https://www.wacimammouche.fr/commande-en-ligne-restaurant-marseille",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

const keyBenefits = [
  {
    icon: TrendingUp,
    title: "Économisez les commissions élevées",
    description:
      "Les agrégateurs de livraison prélèvent souvent entre 20% et 30% sur chaque commande. Avec votre propre module de commande directe, vous conservez l'intégralité de votre chiffre d'affaires.",
  },
  {
    icon: Smartphone,
    title: "Expérience fluide sur smartphone",
    description:
      "Plus de 80% des commandes à emporter se font sur mobile. L'interface est rapide, intuitive et permet à vos clients de commander leur repas en moins d'une minute.",
  },
  {
    icon: CreditCard,
    title: "Paiement en ligne & sur place",
    description:
      "Intégration bancaire sécurisée (carte bancaire, Apple Pay, Google Pay) ou encaissement direct au comptoir lors du retrait de la commande.",
  },
  {
    icon: Utensils,
    title: "Gestion facile de votre carte et menus",
    description:
      "Modifiez vos plats du jour, formules midi, options de cuisson ou ruptures de stock en quelques clics depuis une interface d'administration claire.",
  },
]

export default function CommandeEnLignePage() {
  return (
    <>
      <PageJsonLd />
      <Navigation />
      <main id="main-content" className="relative">
        {/* Hero */}
        <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden px-6 pt-24 pb-16">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Breadcrumb */}
            <nav
              aria-label="Fil d'Ariane"
              className="mb-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Link href="/" className="transition-colors hover:text-foreground">
                Accueil
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-foreground">Commande en ligne restaurant</span>
            </nav>

            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
              Restauration & Commerces de bouche
            </span>

            <h1 className="mb-6 font-serif text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
              Commande en Ligne pour Restaurants à Marseille
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
              Propulsez votre établissement marseillais avec une solution de Click & Collect rapide, élégante et sans commission par commande. Reprenez le contrôle direct de votre fichier client et de votre rentabilité.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group px-8" asChild>
                <a href="/#contact">
                  Demander un devis gratuit
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-transparent" asChild>
                <Link href="/developpeur-web-marseille">
                  Nos offres de création de sites
                </Link>
              </Button>
            </div>

            {/* Badges de réassurance */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: MapPin, text: "Marseille & Bouches-du-Rhône" },
                { icon: Clock, text: "Accompagnement et mise en place sur-mesure" },
                { icon: ShieldCheck, text: "Vente en direct sans commission de plateforme" },
                { icon: BadgeCheck, text: "Devis gratuit et sans engagement" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contenu éditorial & Avantages */}
        <section className="py-20 px-6 bg-secondary/30">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Pourquoi installer votre propre système ?
              </span>
              <h2 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
                Une alternative rentable aux plateformes de livraison
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-muted-foreground leading-relaxed">
                À Marseille, du Vieux-Port au quartier de La Timone, de nombreux restaurateurs voient leurs marges rognées par les applications de livraison tierces. En tant que{" "}
                <Link href="/" className="text-accent underline underline-offset-4 hover:text-foreground">
                  développeur web et community manager à Marseille
                </Link>
                , je conçois des plateformes de commande en ligne dédiées qui appartiennent à 100% à votre établissement.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {keyBenefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Détails techniques & Fonctionnalités */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-4xl space-y-12">
            <div>
              <h2 className="font-serif text-2xl font-medium md:text-3xl mb-4">
                Comment fonctionne la commande Click & Collect pour votre restaurant ?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vos clients scannent votre QR code en salle ou accèdent directement à votre adresse web depuis leur smartphone. Ils sélectionnent leurs entrées, plats, formules midi et boissons, choisissent leur créneau de retrait souhaité et règlent en toute simplicité.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                De votre côté, chaque commande arrive instantanément sur votre tablette, téléphone ou imprimante de caisse thermique. Vous gagnez du temps au standard téléphonique pendant les heures de coup de feu et éliminez les erreurs de commande.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-serif text-xl font-medium mb-4">
                Accompagnement complet pour les restaurateurs marseillais
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>
                    Synchronisation avec votre offre de{" "}
                    <Link href="/developpeur-web-marseille" className="text-accent hover:underline">
                      création de site internet à Marseille
                    </Link>{" "}
                    ou intégration directe sur votre site existant.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>
                    Collecte d'avis facilitée grâce à nos{" "}
                    <Link href="/carte-nfc-avis-google-marseille" className="text-accent hover:underline">
                      cartes NFC pour avis Google à Marseille
                    </Link>{" "}
                    posées sur votre comptoir.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>
                    Visibilité accrue sur les réseaux avec nos{" "}
                    <Link href="/formules-reseaux-sociaux" className="text-accent hover:underline">
                      formules de community management pour Instagram et TikTok
                    </Link>
                    .
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-secondary/30">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-medium md:text-4xl">
              Prêt à lancer votre commande en ligne sans commission ?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Contactez-moi pour étudier votre carte et vos besoins. Devis gratuit et échange personnalisé sans engagement.
            </p>
            <Button size="lg" className="group px-8" asChild>
              <a href="/#contact">
                Demander mon devis restaurant gratuit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
