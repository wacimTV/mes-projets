import React from "react";
import { Star, ShieldCheck, ExternalLink, Award } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export default function ReviewsSection() {
  const { verifiedAverageRating, sourceName, sourceUrl, notice, testimonials } =
    GARAGE_CONFIG.reviewsSummary;

  return (
    <section className="py-24 bg-[#0A0A0B] border-t border-[#1F2228] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191D] border border-[#C6A875]/30 text-xs text-[#D7BC8C] mb-4">
            <Award className="w-3.5 h-3.5 text-[#C6A875]" />
            <span>Retours d'Expérience Certifiés</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] mb-4">
            La confiance de nos automobilistes
          </h2>

          <p className="text-sm text-[#A7A9AE]">
            {notice} Consultez également notre fiche officielle sur la plateforme de référence idGarages.
          </p>
        </div>

        {/* Global Rating Hero Card */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-[#17191D] to-[#1F2228] border border-[#292C32] max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="text-center sm:text-left">
              <span className="text-5xl font-extrabold text-[#F5F4F0] font-sans">
                {verifiedAverageRating}
              </span>
              <span className="text-xl text-[#C6A875] font-bold"> / 5</span>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-[#C6A875]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C6A875]" />
                ))}
              </div>
            </div>

            <div className="h-12 w-px bg-[#292C32] hidden sm:block" />

            <div>
              <p className="text-sm font-bold text-[#F5F4F0]">{GARAGE_CONFIG.partner.badgeText}</p>
              <p className="text-xs text-[#A7A9AE]">
                Référencé idGarages sous le matricule <strong>{GARAGE_CONFIG.partner.idGaragesRef}</strong>
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#D7BC8C] mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A875]" />
                <span>Interventions couvertes par la charte qualité</span>
              </div>
            </div>
          </div>

          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-champagne px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0"
          >
            <span>Consulter la fiche idGarages</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#17191D] border border-[#23272F] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C6A875]">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s < Math.floor(testi.rating) ? "fill-[#C6A875]" : "fill-neutral-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#555A64]">{testi.date}</span>
                </div>

                <p className="text-sm text-[#F5F4F0]/90 italic leading-relaxed mb-6">
                  « {testi.comment} »
                </p>
              </div>

              <div className="pt-4 border-t border-[#23272F]">
                <p className="text-xs font-bold text-[#F5F4F0]">{testi.author}</p>
                <p className="text-[11px] text-[#A7A9AE]">{testi.vehicle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
