"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, ArrowUp, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Navigation",
    className: "sm:col-span-3 lg:col-span-2",
    links: [
      { name: "Accueil", href: "/" },
      { name: "À Propos", href: "/#about" },
      { name: "Contact & Devis", href: "/#contact" },
      { name: "Mentions Légales", href: "/mentions-legales" },
    ],
  },
  {
    title: "Services & Solutions",
    className: "sm:col-span-5 lg:col-span-4",
    links: [
      { name: "Création Sites Internet", href: "/developpeur-web-marseille" },
      { name: "Community Management Marseille", href: "/formules-reseaux-sociaux" },
      { name: "Commande en Ligne Restaurant", href: "/commande-en-ligne-restaurant-marseille" },
      { name: "Refonte de Site Internet", href: "/refonte-site-internet-marseille" },
      { name: "Carte NFC Avis Google", href: "/carte-nfc-avis-google-marseille" },
    ],
  },
  {
    title: "Réseaux",
    className: "sm:col-span-4 lg:col-span-2",
    links: [
      { name: "LinkedIn", href: "https://www.linkedin.com/in/wacim-ammouche-4a20031b1/", icon: Linkedin },
      { name: "Instagram", href: "https://www.instagram.com/wacim.digital/?hl=fr", icon: Instagram },
    ],
  },
];

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative border-t border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid gap-12 sm:grid-cols-12"
        >
          {/* Brand */}
          <div className="sm:col-span-12 lg:col-span-4">
            <a
              href="/"
              className="font-serif text-2xl font-medium tracking-tight"
            >
              WA
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Développeur web freelance et community manager à Marseille. Création de sites internet, commande en ligne pour restaurants et gestion des réseaux sociaux dans les Bouches-du-Rhône et à distance à l'international.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className={section.className}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`Accéder à ${link.name}`}
                    >
                      {"icon" in link && link.icon && (
                        <link.icon className="h-4 w-4" aria-hidden="true" />
                      )}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row text-xs text-muted-foreground"
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
            <p>
              © {new Date().getFullYear()} Wacim AMMOUCHE. Tous droits réservés.
            </p>
            <span aria-hidden="true">·</span>
            <a
              href="/mentions-legales"
              className="transition-colors hover:text-foreground"
            >
              Mentions Légales
            </a>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="group bg-transparent shrink-0"
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}
