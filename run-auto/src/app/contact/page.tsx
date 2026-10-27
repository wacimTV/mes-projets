import React from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { GARAGE_CONFIG } from "@/config/garage";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Localisation | Run Auto Marseille 13004",
  description:
    "Contactez le garage automobile Run Auto à Marseille : téléphone (06 18 31 89 15), adresse (52 boulevard de Roux, 13004), horaires d'ouverture et formulaire de devis.",
};

export default function ContactPage() {
  return (
    <div className="pt-12 pb-24 bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
            Nous Contacter
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F4F0] mb-4">
            Prendre Contact avec Run Auto
          </h1>
          <p className="text-base text-[#A7A9AE]">
            Une question technique, une demande de devis ou un besoin particulier ? Notre atelier à Marseille vous répond dans les meilleurs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Details & Practical Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#17191D] border border-[#292C32] space-y-6 shadow-xl">
              <h2 className="text-xl font-bold text-[#F5F4F0] border-b border-[#23272F] pb-4">
                Coordonnées de l'Atelier
              </h2>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C6A875] shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A7A9AE] mb-1">
                    Adresse
                  </p>
                  <p className="text-sm font-semibold text-[#F5F4F0]">
                    {GARAGE_CONFIG.contact.address}
                  </p>
                  <p className="text-xs text-[#A7A9AE]">
                    {GARAGE_CONFIG.contact.postalCode} {GARAGE_CONFIG.contact.city}, France
                  </p>
                  <a
                    href={GARAGE_CONFIG.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#C6A875] hover:underline mt-2 inline-flex items-center gap-1 font-semibold"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Ouvrir l'itinéraire GPS</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-[#23272F]">
                <Phone className="w-5 h-5 text-[#C6A875] shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A7A9AE] mb-1">
                    Téléphone Direct
                  </p>
                  <a
                    href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                    className="text-lg font-bold text-[#F5F4F0] hover:text-[#C6A875] transition-colors"
                  >
                    {GARAGE_CONFIG.contact.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-[#A7A9AE]">Appel direct vers le chef d'atelier</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-[#23272F]">
                <Clock className="w-5 h-5 text-[#C6A875] shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A7A9AE] mb-1">
                    Horaires d'Ouverture
                  </p>
                  <p className="text-xs text-[#F5F4F0] font-medium">
                    Lundi au Vendredi : 09:00 - 19:00
                  </p>
                  <p className="text-xs text-neutral-500">Samedi & Dimanche : Fermé</p>
                </div>
              </div>
            </div>

            {/* Embedded Dark Map */}
            <div className="rounded-2xl overflow-hidden border border-[#292C32] h-64 shadow-xl">
              <iframe
                title="Localisation GPS Run Auto 13004 Marseille"
                src={GARAGE_CONFIG.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(100%)" }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
