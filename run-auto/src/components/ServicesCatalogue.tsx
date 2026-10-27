"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Cpu,
  Disc,
  CircleDot,
  BatteryCharging,
  Cog,
  Activity,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Cpu,
  Disc,
  CircleDot,
  BatteryCharging,
  Cog,
  Activity,
};

export default function ServicesCatalogue() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Toutes les interventions" },
    { id: "Entretien périodique", label: "Entretien & Révision" },
    { id: "Diagnostic & Électronique", label: "Diagnostic Valise" },
    { id: "Sécurité & Organes de roulement", label: "Freinage & Liaison au sol" },
    { id: "Moteur & Mécanique lourde", label: "Mécanique & Moteur" },
  ];

  const filteredServices =
    activeCategory === "all"
      ? GARAGE_CONFIG.services
      : GARAGE_CONFIG.services.filter((s) => {
          if (activeCategory === "Sécurité & Organes de roulement") {
            return (
              s.category === "Sécurité & Organes de roulement" || s.category === "Liaison au sol"
            );
          }
          if (activeCategory === "Moteur & Mécanique lourde") {
            return (
              s.category === "Moteur & Mécanique lourde" ||
              s.category === "Dépollution & Échappement" ||
              s.category === "Démarrage & Électrique"
            );
          }
          return s.category === activeCategory;
        });

  return (
    <section id="prestations" className="py-24 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
              Prestations & Savoir-Faire
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] leading-tight">
              Catalogue de nos interventions <br />
              <span className="text-gradient-champagne">mécaniques & électroniques</span>
            </h2>
          </div>
          <p className="text-sm text-[#A7A9AE] max-w-md">
            Des interventions réalisées dans le respect absolu des préconisations constructeurs avec pièces certifiées et devis préalable systématique.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#C6A875] text-[#0A0A0B] font-bold shadow-md shadow-[#C6A875]/20"
                  : "bg-[#17191D] border border-[#292C32] text-[#A7A9AE] hover:text-[#F5F4F0] hover:border-[#353941]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.iconName] || Wrench;

            return (
              <div
                key={service.id}
                className="group p-6 rounded-2xl bg-[#17191D] border border-[#23272F] hover:border-[#C6A875]/40 transition-all duration-300 flex flex-col justify-between relative shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#292C32]/80 border border-[#C6A875]/30 flex items-center justify-center text-[#C6A875] group-hover:bg-[#C6A875] group-hover:text-[#0A0A0B] transition-colors duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C6A875]/10 text-[#D7BC8C] border border-[#C6A875]/30">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A7A9AE] block mb-1">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#F5F4F0] mb-3 group-hover:text-[#D7BC8C] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#A7A9AE] leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>

                  {/* Key symptoms snippet */}
                  <div className="space-y-1.5 mb-6 pt-4 border-t border-[#23272F]">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A7A9AE] block">
                      Quand intervenir ?
                    </span>
                    {service.symptoms.slice(0, 2).map((symptom, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-[#F5F4F0]/80">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C6A875] shrink-0" />
                        <span className="line-clamp-1">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="pt-4 border-t border-[#23272F] flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A7A9AE] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C6A875]" />
                      ~{service.estimatedDurationMinutes} min
                    </span>
                    <span className="text-[#D7BC8C] font-semibold text-xs">{service.priceNotice}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/prestations/${service.slug}`}
                      className="px-3 py-2 rounded-lg bg-[#0A0A0B] border border-[#292C32] text-xs font-semibold text-center text-[#F5F4F0] hover:border-[#C6A875]/40 transition-colors"
                    >
                      Détails
                    </Link>

                    <Link
                      href={`/prendre-rendez-vous?service=${service.id}`}
                      className="btn-champagne px-3 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1"
                    >
                      <span>Réserver</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic reassurance banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#17191D] via-[#1E2229] to-[#17191D] border border-[#C6A875]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-base font-bold text-[#F5F4F0] mb-1">
              Votre besoin mécanique n'apparaît pas dans cette liste ?
            </h4>
            <p className="text-xs text-[#A7A9AE]">
              Embrayage, boîte de vitesses, amortisseurs, injection : nous réalisons un diagnostic ciblé sur rendez-vous.
            </p>
          </div>
          <Link
            href="/prendre-rendez-vous?service=custom"
            className="btn-champagne px-6 py-3 rounded-xl text-xs font-bold shrink-0"
          >
            Demander un diagnostic personnalisé
          </Link>
        </div>
      </div>
    </section>
  );
}
