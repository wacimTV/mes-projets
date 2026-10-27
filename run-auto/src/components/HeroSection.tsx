"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  ChevronDown,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0A0A0B]">
      {/* Background Image with Dark Automotive Grading */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-car.jpg"
          alt="Véhicule de prestige et atelier mécanique Run Auto Marseille"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-10000 motion-safe:hover:scale-100"
        />
        {/* Layered cinematic gradients for deep black contrast and readable typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-[#0A0A0B]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0B]/50 to-[#0A0A0B]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 flex flex-col items-start justify-center">
        {/* Location & Brand Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#17191D]/80 border border-[#C6A875]/30 backdrop-blur-md mb-6 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#C6A875] animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#D7BC8C]">
            Atelier Indépendant de Précision • Marseille 13004
          </span>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F5F4F0] max-w-4xl leading-[1.1] mb-6">
          L'exigence automobile. <br />
          <span className="text-gradient-champagne">La confiance en plus.</span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="text-lg sm:text-xl text-[#A7A9AE] max-w-2xl leading-relaxed font-normal mb-10">
          Entretien périodique, diagnostic électronique et réparations mécaniques multimarque : Run Auto prend soin de votre véhicule avec sérieux, précision et transparence absolue.
        </p>

        {/* Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
          <Link
            href="/prendre-rendez-vous"
            className="btn-champagne px-8 py-4 rounded-xl text-base font-bold text-center flex items-center justify-center gap-3 shadow-2xl shadow-[#C6A875]/30"
          >
            <Calendar className="w-5 h-5" />
            <span>Prendre rendez-vous</span>
          </Link>

          <Link
            href="/prestations"
            className="btn-outline-champagne px-8 py-4 rounded-xl text-base font-semibold text-center flex items-center justify-center gap-2"
          >
            <span>Découvrir nos prestations</span>
            <span className="text-xs">→</span>
          </Link>
        </div>

        {/* Verified Reassurance Ribbon */}
        <div className="pt-8 border-t border-white/10 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#A7A9AE]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#17191D] border border-[#292C32] flex items-center justify-center text-[#C6A875] shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[#F5F4F0] font-semibold">Devis clair avant travaux</p>
              <p className="text-[11px] text-[#A7A9AE]">Aucune surprise, validation préalable systématique</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#17191D] border border-[#292C32] flex items-center justify-center text-[#C6A875] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[#F5F4F0] font-semibold">Garantie constructeur préservée</p>
              <p className="text-[11px] text-[#A7A9AE]">Respect strict du carnet d'entretien constructeur</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#17191D] border border-[#292C32] flex items-center justify-center text-[#C6A875] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[#F5F4F0] font-semibold">Proximité & disponibilité</p>
              <p className="text-[11px] text-[#A7A9AE]">52 bd de Roux, 13004 Marseille (06 18 31 89 15)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discrete Scroll Indicator */}
      <a
        href="#presentation"
        aria-label="Faire défiler vers la suite"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-xs text-[#A7A9AE] hover:text-[#C6A875] transition-colors group"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium opacity-70 group-hover:opacity-100">
          Découvrir l'atelier
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#C6A875]" />
      </a>
    </section>
  );
}
