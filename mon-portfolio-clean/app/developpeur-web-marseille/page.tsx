import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Code,
  Globe,
  Smartphone,
  Zap,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
  BadgeCheck,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: {
    absolute:
      "Création de site internet à Marseille | Développeur web freelance",
  },
  description:
    "Création de sites vitrines, e-commerce et applications web à Marseille. Développeur web freelance, sites rapides et bien référencés. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://www.wacimammouche.fr/developpeur-web-marseille",
  },
  openGraph: {
    title:
      "Création de site internet à Marseille | Développeur web freelance",
    description:
      "Création de sites vitrines, e-commerce et applications web à Marseille. Développeur web freelance, sites rapides et bien référencés. Devis gratuit sous 24h.",
    type: "website",
    locale: "fr_FR",
    url: "https://www.wacimammouche.fr/developpeur-web-marseille",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Création de site internet à Marseille | Développeur web freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Création de site internet à Marseille | Développeur web freelance",
    description:
      "Création de sites vitrines, e-commerce et applications web à Marseille. Développeur web freelance, sites rapides et bien référencés. Devis gratuit sous 24h.",
    images: ["/og-image.jpg"],
  },
}

function PageJsonLd() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création de site internet à Marseille",
    description:
      "Création de sites vitrines, e-commerce et applications web à Marseille. Développeur web freelance, sites rapides et bien référencés. Devis gratuit sous 24h.",
    url: "https://www.wacimammouche.fr/developpeur-web-marseille",
    provider: {
      "@type": "Person",
      name: "Wacim Ammouche",
      url: "https://www.wacimammouche.fr",
    },
    areaServed: [
      { "@type": "City", name: "Marseille" },
      { "@type": "AdministrativeArea", name: "Bouches-du-Rhône" },
      { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
    ],
    knowsLanguage: ["fr", "en"],
    serviceType: [
      "Création de sites internet",
      "Développement web",
      "E-commerce",
      "Applications web",
      "Refonte de sites web",
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
        name: "Création de sites internet à Marseille",
        item: "https://www.wacimammouche.fr/developpeur-web-marseille",
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

const services = [
  {
    icon: Globe,
    title: "Site vitrine",
    description:
      "Un site internet professionnel qui présente votre activité, vos services et vos coordonnées. Idéal pour gagner en visibilité à Marseille et dans les Bouches-du-Rhône.",
    link: "/#contact",
    linkText: "Demander un devis site vitrine",
  },
  {
    icon: ShoppingCart,
    title: "Site e-commerce",
    description:
      "Vendez vos produits en ligne avec une boutique rapide, sécurisée et facile à gérer. Paiement par carte bancaire intégré.",
    link: "/#contact",
    linkText: "Créer une boutique en ligne",
  },
  {
    icon: Smartphone,
    title: "Commande en ligne restaurant",
    description:
      "Permettez à vos clients de commander directement depuis votre site web. Solution Click & Collect adaptée aux restaurants, snacks et commerces à Marseille.",
    link: "/commande-en-ligne-restaurant-marseille",
    linkText: "Découvrir la commande en ligne pour restaurant",
  },
  {
    icon: RefreshCw,
    title: "Refonte de site internet",
    description:
      "Modernisez votre site vieillissant : vitesse de chargement accrue, refonte graphique contemporaine et optimisation de votre référencement naturel à Marseille.",
    link: "/refonte-site-internet-marseille",
    linkText: "En savoir plus sur la refonte de site web",
  },
  {
    icon: Zap,
    title: "Community Management & Réseaux Sociaux",
    description:
      "Gestion de vos réseaux sociaux Instagram et TikTok, création de contenus et stratégie de visibilité en ligne pour développer votre audience locale.",
    link: "/formules-reseaux-sociaux",
    linkText: "Consulter nos formules de community management",
  },
  {
    icon: Code,
    title: "Application web sur-mesure",
    description:
      "Développement d'applications web complexes et d'outils métier spécifiques bâtis avec Next.js, React et TypeScript.",
    link: "/#contact",
    linkText: "Étudier votre projet d'application web",
  },
]

const advantages = [
  "Développeur basé à Marseille, disponible pour des rendez-vous en personne",
  "Déplacement dans tout le département des Bouches-du-Rhône (13)",
  "Sites optimisés pour le référencement naturel (SEO)",
  "Design responsive adapté mobile, tablette et ordinateur",
  "Performances et vitesse de chargement optimisées",
  "Devis gratuit et sans engagement",
  "Réponse sous 24h garantie",
  "Accompagnement de A à Z, de la conception à la mise en ligne",
]

export default function DeveloppeurWebMarseillePage() {
  return (
    <>
      <PageJsonLd />
      <Navigation />
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 pt-24 pb-16">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Breadcrumb */}
            <nav
              aria-label="Fil d'Ariane"
              className="mb-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Accueil
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-foreground">
                Création de sites internet
              </span>
            </nav>

            <h1 className="mb-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Création de sites internet</span>
              <span className="block text-gradient">à Marseille</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Développeur web freelance basé à Marseille, je conçois des sites internet
              sur-mesure, des boutiques e-commerce et des solutions web rapides,
              soignées et optimisées pour le référencement naturel.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group px-8" asChild>
                <a href="/#contact">
                  Demander un devis gratuit
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-transparent"
                asChild
              >
                <Link href="/refonte-site-internet-marseille">
                  Découvrir la refonte de site
                </Link>
              </Button>
            </div>

            {/* Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: MapPin, text: "Marseille & Bouches-du-Rhône" },
                { icon: Clock, text: "Réponse sous 24h" },
                { icon: BadgeCheck, text: "Devis gratuit" },
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

        {/* Services Section */}
        <section className="py-24 px-6 bg-secondary/30">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Mes services
              </span>
              <h2 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
                Création de sites internet à Marseille
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Du site vitrine à l&apos;application web complexe, je
                développe des solutions adaptées à vos besoins et à votre
                budget. Chaque projet est pensé pour être rapide, moderne et
                bien référencé sur Google.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent"
                >
                  <div>
                    <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-3 font-serif text-xl font-medium">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href={service.link}
                    className="inline-flex items-center text-sm font-medium text-accent hover:underline mt-auto"
                  >
                    {service.linkText}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi me choisir */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
                Pourquoi me choisir
              </span>
              <h2 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
                Un développeur web freelance proche de vous à Marseille
              </h2>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {advantages.map((adv) => (
                <li
                  key={adv}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm">{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-secondary/30">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Vous cherchez un développeur web à Marseille&nbsp;?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Je m&apos;appelle{" "}
              <Link
                href="/"
                className="font-medium text-foreground underline underline-offset-4 hover:text-accent transition-colors"
              >
                Wacim Ammouche
              </Link>
              , développeur web freelance à Marseille. Décrivez-moi votre projet et recevez un devis gratuit sous
              24h. Je me déplace à Marseille et dans les Bouches-du-Rhône
              pour les rendez-vous en personne.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group px-8" asChild>
                <a href="/#contact">
                  Me contacter
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-transparent"
                asChild
              >
                <Link href="/formules-reseaux-sociaux">
                  Community Management
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
