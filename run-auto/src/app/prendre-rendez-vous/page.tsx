"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingWizard from "@/components/BookingWizard";
import { Calendar, ShieldCheck, Phone, Clock, Loader2 } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service") || undefined;

  return (
    <div className="pt-12 pb-24 bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191D] border border-[#C6A875]/30 text-xs text-[#D7BC8C] mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#C6A875]" />
            <span>Service Officiel de Réservation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F4F0] mb-4 tracking-tight">
            Prendre Rendez-vous à l'Atelier
          </h1>
          <p className="text-sm text-[#A7A9AE]">
            Complétez les 5 étapes simples ci-dessous pour réserver votre créneau chez Run Auto Marseille (13004). Confirmation garantie sous 2h ouvrées.
          </p>
        </div>

        {/* Wizard */}
        <BookingWizard initialServiceId={serviceId} />

        {/* Reassurance notes below wizard */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#A7A9AE]">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#17191D] border border-[#23272F]">
            <ShieldCheck className="w-5 h-5 text-[#C6A875] shrink-0" />
            <span>Devis systématique et accord préalable avant tout début de travaux.</span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#17191D] border border-[#23272F]">
            <Clock className="w-5 h-5 text-[#C6A875] shrink-0" />
            <span>Créneaux organisés pour réduire au minimum votre temps d'immobilisation.</span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#17191D] border border-[#23272F]">
            <Phone className="w-5 h-5 text-[#C6A875] shrink-0" />
            <span>Une urgence immédiate ? Joignez l'atelier en direct au {GARAGE_CONFIG.contact.phoneDisplay}.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrendreRendezVousPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-[#C6A875]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
