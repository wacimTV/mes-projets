import React from "react";
import type { Metadata } from "next";
import { GARAGE_CONFIG } from "@/config/garage";

export const metadata: Metadata = {
  title: "Mentions Légales | Run Auto Marseille",
  description: "Mentions légales officielles et informations administratives du garage Run Auto à Marseille.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-12 pb-24 bg-[#0A0A0B] text-[#A7A9AE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
            Informations Juridiques
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] mb-4">
            Mentions Légales
          </h1>
          <p className="text-sm">
            Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (L.C.E.N.).
          </p>
        </div>

        <section className="space-y-4 p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
          <h2 className="text-xl font-bold text-[#F5F4F0]">1. Présentation de l'Entreprise</h2>
          <ul className="space-y-2 text-sm">
            <li><strong>Dénomination commerciale :</strong> {GARAGE_CONFIG.name}</li>
            <li><strong>Activité :</strong> {GARAGE_CONFIG.activity}</li>
            <li><strong>Adresse de l'établissement :</strong> {GARAGE_CONFIG.contact.fullAddress}</li>
            <li><strong>Téléphone :</strong> {GARAGE_CONFIG.contact.phoneDisplay}</li>
            <li><strong>E-mail de contact :</strong> {GARAGE_CONFIG.contact.email}</li>
            <li><strong>Numéro SIRET :</strong> {GARAGE_CONFIG.legal.siret} <span className="text-xs text-[#C6A875]">(information à confirmer par le gérant avant mise en ligne)</span></li>
            <li><strong>Numéro RCS :</strong> {GARAGE_CONFIG.legal.rcs}</li>
            <li><strong>Numéro TVA Intracommunautaire :</strong> {GARAGE_CONFIG.legal.tvaIntracommunautaire}</li>
            <li><strong>Responsable de publication :</strong> {GARAGE_CONFIG.legal.directeurPublication}</li>
          </ul>
        </section>

        <section className="space-y-4 p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
          <h2 className="text-xl font-bold text-[#F5F4F0]">2. Hébergement du Site Internet</h2>
          <p className="text-sm leading-relaxed">
            Le site est hébergé par Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, États-Unis) ou serveur cloud sécurisé en Union Européenne, garantissant un niveau élevé de sécurité et de conformité aux standards européens.
          </p>
        </section>

        <section className="space-y-4 p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
          <h2 className="text-xl font-bold text-[#F5F4F0]">3. Propriété Intellectuelle</h2>
          <p className="text-sm leading-relaxed">
            L'ensemble des éléments constituant ce site (textes, visuels, charte graphique, logo RUN AUTO, architecture logicielle) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation ou exploitation non expressément autorisée est strictement interdite.
          </p>
        </section>

        <section className="space-y-4 p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
          <h2 className="text-xl font-bold text-[#F5F4F0]">4. Garantie Constructeur & Cadre Européen</h2>
          <p className="text-sm leading-relaxed">
            Conformément au règlement européen n° 461/2010 de la Commission du 27 mai 2010, les prestations de révision et d'entretien effectuées chez Run Auto selon les préconisations du carnet constructeur préservent intégralement la garantie commerciale d'origine du constructeur automobile.
          </p>
        </section>
      </div>
    </div>
  );
}
