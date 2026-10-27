import React from "react";
import HeroSection from "@/components/HeroSection";
import GaragePresentation from "@/components/GaragePresentation";
import ServicesCatalogue from "@/components/ServicesCatalogue";
import BookingWizard from "@/components/BookingWizard";
import ReviewsSection from "@/components/ReviewsSection";
import OpeningHoursAndMap from "@/components/OpeningHoursAndMap";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import { Phone, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section Spectaculaire */}
      <HeroSection />

      {/* 2. Présentation du Garage & Valeurs */}
      <GaragePresentation />

      {/* 3. Catalogue des Prestations */}
      <ServicesCatalogue />

      {/* 4. Section Prise de Rendez-vous Interactive */}
      <section id="reservation" className="py-24 bg-[#0A0A0B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191D] border border-[#C6A875]/30 text-xs text-[#D7BC8C] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A875]" />
              <span>Réservation Sans Attente</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F4F0] mb-4 tracking-tight">
              Prenez rendez-vous en ligne
            </h2>
            <p className="text-base text-[#A7A9AE]">
              Choisissez votre intervention, votre véhicule et votre créneau. Notre chef d'atelier valide personnellement chaque demande sous 2h ouvrées.
            </p>
          </div>

          <BookingWizard />
        </div>
      </section>

      {/* 5. Avis Clients Certifiés */}
      <ReviewsSection />

      {/* 6. Horaires & Accès Géographique */}
      <OpeningHoursAndMap />

      {/* 7. FAQ */}
      <FAQSection />

      {/* 8. Call-to-Action Final de Prestige */}
      <section className="py-20 bg-gradient-to-b from-[#0A0A0B] via-[#17191D] to-[#0A0A0B] border-t border-[#1F2228] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-3 block">
            Votre Partenaire Automobile à Marseille 13004
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] mb-6">
            Confiez votre véhicule à un atelier qui partage votre exigence.
          </h2>
          <p className="text-base text-[#A7A9AE] max-w-xl mx-auto mb-8">
            Devis clair sans surprise, diagnostic électronique de pointe et respect scrupuleux du plan d'entretien constructeur.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/prendre-rendez-vous"
              className="btn-champagne px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl shadow-[#C6A875]/25"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre rendez-vous en ligne</span>
            </Link>

            <a
              href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
              className="btn-outline-champagne px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C6A875]" />
              <span>{GARAGE_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
