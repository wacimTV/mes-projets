import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { GARAGE_CONFIG } from "@/config/garage";
import {
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Calendar,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export async function generateStaticParams() {
  return GARAGE_CONFIG.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = GARAGE_CONFIG.services.find((s) => s.slug === slug);
  if (!service) return { title: "Prestation non trouvée" };

  return {
    title: `${service.title} à Marseille 13004 | Run Auto`,
    description: `${service.shortDescription} Devis transparent et prise de rendez-vous en ligne chez Run Auto Marseille.`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = GARAGE_CONFIG.services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-10 pb-24 bg-[#0A0A0B]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb navigation */}
        <Link
          href="/prestations"
          className="inline-flex items-center gap-1.5 text-xs text-[#A7A9AE] hover:text-[#C6A875] mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour au catalogue des prestations</span>
        </Link>

        {/* Hero Card of the Service */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#17191D] border border-[#292C32] relative overflow-hidden shadow-2xl mb-12">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0A0B] border border-[#C6A875]/30 text-xs text-[#D7BC8C] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A875]" />
              <span>{service.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F4F0] mb-6 leading-tight">
              {service.title}
            </h1>

            <p className="text-base text-[#A7A9AE] leading-relaxed mb-8">
              {service.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#23272F] text-xs">
              <div className="flex items-center gap-2 text-[#A7A9AE]">
                <Clock className="w-4 h-4 text-[#C6A875]" />
                <span>Durée indicative atelier : ~{service.estimatedDurationMinutes} min</span>
              </div>
              <div className="flex items-center gap-2 text-[#D7BC8C] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#C6A875]" />
                <span>{service.priceNotice}</span>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href={`/prendre-rendez-vous?service=${service.id}`}
                className="btn-champagne px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 shadow-xl shadow-[#C6A875]/25"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre rendez-vous pour cette prestation</span>
              </Link>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6A875]/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Two-Column Deep-Dive: Symptoms vs Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Column 1: Symptoms */}
          <div className="p-8 rounded-2xl bg-[#17191D] border border-[#23272F]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#F5F4F0]">Signes d'alerte & Symptômes</h2>
            </div>
            <p className="text-xs text-[#A7A9AE] mb-6">
              Quand devez-vous prendre rendez-vous pour cette intervention ?
            </p>
            <ul className="space-y-4 text-sm text-[#F5F4F0]/90">
              {service.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A875] shrink-0 mt-2" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Benefits */}
          <div className="p-8 rounded-2xl bg-[#17191D] border border-[#23272F]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#F5F4F0]">Avantages de notre Atelier</h2>
            </div>
            <p className="text-xs text-[#A7A9AE] mb-6">
              Ce que garantit l'intervention réalisée chez Run Auto :
            </p>
            <ul className="space-y-4 text-sm text-[#F5F4F0]/90">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A875] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dedicated Service FAQ */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="p-8 rounded-2xl bg-[#17191D] border border-[#23272F] mb-12">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-5 h-5 text-[#C6A875]" />
              <h3 className="text-xl font-bold text-[#F5F4F0]">Questions fréquentes sur cette intervention</h3>
            </div>
            <div className="space-y-6">
              {service.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="pb-4 border-b border-[#23272F] last:border-none last:pb-0">
                  <h4 className="text-sm font-bold text-[#D7BC8C] mb-2">{faq.question}</h4>
                  <p className="text-xs text-[#A7A9AE] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#17191D] via-[#1E2229] to-[#17191D] border border-[#C6A875]/40 text-center space-y-4 shadow-2xl">
          <h3 className="text-2xl font-bold text-[#F5F4F0]">
            Besoin d'un devis chiffré pour votre voiture ?
          </h3>
          <p className="text-xs text-[#A7A9AE] max-w-lg mx-auto">
            Sélectionnez votre créneau en ligne ou contactez-nous directement par téléphone au {GARAGE_CONFIG.contact.phoneDisplay}.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/prendre-rendez-vous?service=${service.id}`}
              className="btn-champagne px-7 py-3 rounded-xl text-xs font-bold"
            >
              Prendre rendez-vous en ligne
            </Link>
            <Link
              href="/prestations"
              className="btn-outline-champagne px-7 py-3 rounded-xl text-xs font-semibold"
            >
              Découvrir les autres prestations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
