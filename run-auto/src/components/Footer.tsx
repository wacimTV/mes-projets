import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight, Lock } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0B] border-t border-[#23272F] text-[#A7A9AE] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Marque & Valeurs */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#292C32] to-[#17191D] border border-[#C6A875]/40 flex items-center justify-center shadow-lg">
                <span className="text-[#C6A875] font-black tracking-widest text-lg font-serif">R</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-[0.2em] text-[#F5F4F0] uppercase">
                  RUN <span className="text-[#C6A875]">AUTO</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#A7A9AE] uppercase">
                  Marseille 13004
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-[#A7A9AE]">
              Atelier automobile indépendant de référence à Marseille. Entretien périodique, diagnostic électronique de précision et réparation mécanique multimarque selon les normes constructeurs les plus strictes.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D7BC8C] bg-[#17191D] p-3 rounded-lg border border-[#292C32]">
              <ShieldCheck className="w-4 h-4 text-[#C6A875] shrink-0" />
              <span>Garantie constructeur préservée (Loi européenne 461/2010).</span>
            </div>
          </div>

          {/* Col 2: Prestations Clés */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-[#F5F4F0] uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A875]" />
              Nos Interventions
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {GARAGE_CONFIG.services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/prestations/${service.slug}`}
                    className="hover:text-[#F5F4F0] transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C6A875] group-hover:translate-x-0.5 transition-transform" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/prestations"
                  className="text-[#C6A875] hover:text-[#D7BC8C] font-medium text-xs flex items-center gap-1 mt-2"
                >
                  Voir l'intégralité du catalogue →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Horaires d'ouverture */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-[#F5F4F0] uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A875]" />
              Horaires d'Ouverture
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between pb-2 border-b border-[#1F2228]">
                <span>Lundi - Vendredi</span>
                <span className="text-[#F5F4F0] font-medium">09:00 - 19:00</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1F2228] text-neutral-500">
                <span>Samedi</span>
                <span>Fermé</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Dimanche</span>
                <span>Fermé</span>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-[#17191D] border border-[#23272F] text-xs">
                <p className="flex items-center gap-2 text-[#F5F4F0]">
                  <Clock className="w-3.5 h-3.5 text-[#C6A875]" />
                  Prise en charge rapide sur rendez-vous
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Atelier & Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-[#F5F4F0] uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A875]" />
              Coordonnées de l'Atelier
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6A875] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F5F4F0] font-medium">{GARAGE_CONFIG.contact.address}</p>
                  <p className="text-xs text-[#A7A9AE]">
                    {GARAGE_CONFIG.contact.postalCode} {GARAGE_CONFIG.contact.city}
                  </p>
                  <a
                    href={GARAGE_CONFIG.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#C6A875] hover:underline mt-1 inline-block"
                  >
                    Obtenir l'itinéraire GPS →
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C6A875] shrink-0" />
                <a
                  href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                  className="text-[#F5F4F0] hover:text-[#C6A875] font-semibold transition-colors"
                >
                  {GARAGE_CONFIG.contact.phoneDisplay}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C6A875] shrink-0" />
                <Link
                  href="/contact"
                  className="hover:text-[#F5F4F0] text-xs transition-colors"
                >
                  Formulaire de contact & devis
                </Link>
              </li>

              <li className="pt-2">
                <Link
                  href="/prendre-rendez-vous"
                  className="btn-champagne w-full py-2.5 px-4 rounded-lg text-center text-xs font-semibold block"
                >
                  Prendre rendez-vous en ligne
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Mentions Légales & Droits */}
        <div className="pt-8 border-t border-[#1F2228] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 RUN AUTO MARSEILLE. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-6 text-[#A7A9AE]">
            <Link href="/mentions-legales" className="hover:text-[#F5F4F0] transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-[#F5F4F0] transition-colors">
              Politique de confidentialité (RGPD)
            </Link>
            <Link href="/faq" className="hover:text-[#F5F4F0] transition-colors">
              FAQ
            </Link>
            <Link
              href="/admin/login"
              className="text-[#555A64] hover:text-[#C6A875] transition-colors flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              Espace Garage
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
