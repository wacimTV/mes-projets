import React from "react";
import Link from "next/link";
import { Clock, MapPin, Phone, Navigation, Calendar, ShieldCheck } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export default function OpeningHoursAndMap() {
  return (
    <section className="py-24 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
            Accès & Informations Pratiques
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] mb-4">
            Venir à l'atelier Run Auto
          </h2>
          <p className="text-sm text-[#A7A9AE]">
            Facilement accessible dans le 4ème arrondissement de Marseille, à deux pas des boulevards de Roux et Chave.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card Horaires & Coordonnées */}
          <div className="lg:col-span-5 bg-[#17191D] border border-[#292C32] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#292C32] flex items-center justify-center text-[#C6A875]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F5F4F0]">Horaires de l'Atelier</h3>
                  <p className="text-xs text-[#A7A9AE]">Ouvert du lundi au vendredi</p>
                </div>
              </div>

              {/* Table des horaires */}
              <div className="space-y-3 mb-8">
                {GARAGE_CONFIG.openingHours.map((day) => (
                  <div
                    key={day.dayName}
                    className="flex items-center justify-between py-2 border-b border-[#23272F] text-sm"
                  >
                    <span className="font-medium text-[#F5F4F0]">{day.dayName}</span>
                    {day.isOpen ? (
                      <span className="text-[#D7BC8C] font-semibold text-xs">
                        {day.slots.map((s) => `${s.open} - ${s.close}`).join(" & ")}
                      </span>
                    ) : (
                      <span className="text-neutral-500 text-xs font-medium">Fermé</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Coordonnées */}
              <div className="space-y-4 pt-4 border-t border-[#23272F]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C6A875] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#F5F4F0]">
                      {GARAGE_CONFIG.contact.address}
                    </p>
                    <p className="text-xs text-[#A7A9AE]">
                      {GARAGE_CONFIG.contact.postalCode} {GARAGE_CONFIG.contact.city}, France
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C6A875] shrink-0" />
                  <div>
                    <a
                      href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
                      className="text-base font-bold text-[#F5F4F0] hover:text-[#C6A875] transition-colors"
                    >
                      {GARAGE_CONFIG.contact.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-[#A7A9AE] block">Ligne directe atelier</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="pt-8 border-t border-[#23272F] flex flex-col sm:flex-row gap-3">
              <a
                href={GARAGE_CONFIG.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-champagne flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-[#C6A875]" />
                <span>Itinéraire GPS</span>
              </a>

              <Link
                href="/prendre-rendez-vous"
                className="btn-champagne flex-1 py-3 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre RDV</span>
              </Link>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#292C32] shadow-2xl relative min-h-[420px] bg-[#17191D]">
            <iframe
              title="Carte localisation Run Auto Marseille 13004"
              src={GARAGE_CONFIG.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px", filter: "invert(90%) hue-rotate(180deg) contrast(100%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Overlay badge on map */}
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0A0A0B]/90 backdrop-blur-md border border-[#C6A875]/40 text-xs text-[#F5F4F0] shadow-xl">
              <p className="font-bold text-[#C6A875]">RUN AUTO MARSEILLE</p>
              <p className="text-[11px] text-[#A7A9AE]">52 bd de Roux, 13004</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
