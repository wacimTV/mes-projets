import React from "react";
import type { Metadata } from "next";
import ServicesCatalogue from "@/components/ServicesCatalogue";
import Link from "next/link";
import { ShieldCheck, Award, Wrench, CheckCircle } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export const metadata: Metadata = {
  title: "Nos Prestations Mécaniques & Électroniques | Run Auto Marseille 13004",
  description:
    "Découvrez l'ensemble de nos prestations d'entretien, révision constructeur, diagnostic valise, freinage, distribution et pneumatiques chez Run Auto à Marseille.",
};

export default function PrestationsPage() {
  return (
    <div className="pt-12 pb-24 bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
            Excellence & Précision
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F4F0] mb-6">
            Prestations Automobiles à Marseille
          </h1>
          <p className="text-base text-[#A7A9AE] leading-relaxed">
            De la révision périodique conforme au carnet constructeur jusqu'à la recherche de pannes électroniques complexes, nous intervenons sur l'ensemble des marques du marché avec un niveau d'exigence sans compromis.
          </p>
        </div>

        {/* Reassurance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#1F2228]">
          <div className="p-4 rounded-xl bg-[#17191D] border border-[#23272F] flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C6A875] shrink-0" />
            <span className="text-xs text-[#F5F4F0] font-medium">Garantie constructeur préservée dès le 1er jour</span>
          </div>
          <div className="p-4 rounded-xl bg-[#17191D] border border-[#23272F] flex items-center gap-3">
            <Award className="w-5 h-5 text-[#C6A875] shrink-0" />
            <span className="text-xs text-[#F5F4F0] font-medium">Pièces de qualité équivalente origine certifiées</span>
          </div>
          <div className="p-4 rounded-xl bg-[#17191D] border border-[#23272F] flex items-center gap-3">
            <Wrench className="w-5 h-5 text-[#C6A875] shrink-0" />
            <span className="text-xs text-[#F5F4F0] font-medium">Devis préalable sans aucun frais masqué</span>
          </div>
        </div>
      </div>

      <ServicesCatalogue />
    </div>
  );
}
