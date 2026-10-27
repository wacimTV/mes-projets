import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { GARAGE_CONFIG } from "@/config/garage";
import {
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Calendar,
  FileText,
  Cpu,
  Clock,
  Sparkles,
  MapPin,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Le Garage | Run Auto Marseille 13004 – Philosophie, Atelier & Engagements",
  description:
    "Découvrez l'atelier Run Auto à Marseille : notre méthode de travail rigoureuse, nos engagements de transparence et les 5 étapes de prise en charge de votre véhicule.",
};

export default function LeGaragePage() {
  return (
    <div className="pt-12 pb-24 bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
            Identité & Savoir-Être
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F4F0] mb-6">
            L'Atelier Run Auto à Marseille
          </h1>
          <p className="text-base text-[#A7A9AE] leading-relaxed">
            Situé au 52 boulevard de Roux dans le 4ème arrondissement de Marseille, Run Auto est né d'une conviction simple : l'entretien et la réparation automobile doivent reposer sur une transparence totale, une rigueur technique irréprochable et un accompagnement humain bienveillant.
          </p>
        </div>

        {/* Cinematic Atelier Visual and Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative h-[440px] rounded-3xl overflow-hidden border border-[#292C32] shadow-2xl">
            <Image
              src="/images/diagnostic-engine.jpg"
              alt="Technologie de diagnostic électronique et compartiment moteur chez Run Auto Marseille"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0A0A0B]/85 backdrop-blur-md border border-[#C6A875]/30 text-xs">
              <p className="font-bold text-[#F5F4F0]">Banc & Valise de Diagnostic Multimarque</p>
              <p className="text-[#A7A9AE] text-[11px]">Interrogation approfondie des calculateurs électroniques</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875]">
              Notre Démarche Métier
            </span>
            <h2 className="text-3xl font-bold text-[#F5F4F0] leading-tight">
              Une mécanique moderne qui respecte votre véhicule et votre budget
            </h2>
            <p className="text-sm text-[#A7A9AE] leading-relaxed">
              L'automobile d'aujourd'hui ne se répare plus à l'aveugle. Entre multiplexage, calculateurs d'injection et capteurs de dépollution, chaque intervention nécessite une analyse méthodique. Chez Run Auto, nous ne remplaçons aucune pièce sans avoir identifié la cause première du dysfonctionnement.
            </p>
            <p className="text-sm text-[#A7A9AE] leading-relaxed">
              Nous privilégions toujours la communication : nos explications sont claires, documentées et sans jargon hermétique, afin que vous puissiez décider en toute connaissance de cause.
            </p>

            <div className="pt-2">
              <Link
                href="/prendre-rendez-vous"
                className="btn-champagne px-7 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre rendez-vous à l'atelier</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Les 5 Étapes de Prise en Charge */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
              Parcours Client
            </span>
            <h2 className="text-3xl font-extrabold text-[#F5F4F0] mb-4">
              Les 5 étapes de votre prise en charge
            </h2>
            <p className="text-sm text-[#A7A9AE]">
              Une méthodologie éprouvée pour garantir une qualité constante et zéro mauvaise surprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {GARAGE_CONFIG.processSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-[#17191D] border border-[#23272F] flex flex-col justify-between relative hover:border-[#C6A875]/40 transition-colors"
              >
                <div>
                  <span className="text-3xl font-black text-[#C6A875] font-serif block mb-3">
                    {step.number}
                  </span>
                  <h3 className="text-base font-bold text-[#F5F4F0] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#A7A9AE] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nos 4 Engagements Formels */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#17191D] border border-[#292C32] mb-16">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
              Nos Valeurs
            </span>
            <h2 className="text-3xl font-extrabold text-[#F5F4F0]">
              Les engagements Run Auto envers chaque client
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {GARAGE_CONFIG.commitments.map((c, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#292C32] border border-[#C6A875]/30 flex items-center justify-center text-[#C6A875] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F4F0] mb-1">{c.title}</h3>
                  <p className="text-xs text-[#A7A9AE] leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Localisation & Invitation */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#17191D] via-[#1E2229] to-[#17191D] border border-[#C6A875]/40 text-center space-y-4">
          <MapPin className="w-8 h-8 text-[#C6A875] mx-auto" />
          <h3 className="text-2xl font-bold text-[#F5F4F0]">
            Une question ou une intervention à planifier ?
          </h3>
          <p className="text-xs text-[#A7A9AE] max-w-lg mx-auto">
            Nous vous accueillons du lundi au vendredi au 52 boulevard de Roux, 13004 Marseille.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/prendre-rendez-vous"
              className="btn-champagne px-7 py-3 rounded-xl text-xs font-bold"
            >
              Prendre rendez-vous en ligne
            </Link>
            <a
              href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
              className="btn-outline-champagne px-7 py-3 rounded-xl text-xs font-semibold"
            >
              Appeler l'atelier ({GARAGE_CONFIG.contact.phoneDisplay})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
