"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Twitter, Dribbble, ArrowUp, Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "À Propos", href: "#about" },
      { name: "Projets", href: "#projects" },
      { name: "Services", href: "#services" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Réseaux",
    links: [
      { name: "GitHub", href: "https://github.com/wacimTV", icon: Github },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/wacim-ammouche-4a20031b1/", icon: Linkedin },
      { name: "Instagram", href: "https://www.instagram.com/wacim.11/?hl=fr#", icon: Instagram },
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
          className="grid gap-12 md:grid-cols-4"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <a
              href="#"
              className="font-serif text-2xl font-medium tracking-tight"
            >
              WA
            </a>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Développeur web créatif concevant des expériences digitales d'exception. Créons quelque chose d'incroyable ensemble.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
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
                    >
                      {"icon" in link && link.icon && (
                        <link.icon className="h-4 w-4" />
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
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wacim AMMOUCHE. Tous droits réservés.
          </p>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="group bg-transparent"
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}
