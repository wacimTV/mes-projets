"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Phone } from "lucide-react";
import Link from "next/link";
import { GARAGE_CONFIG } from "@/config/garage";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment se déroule la confirmation de mon rendez-vous en ligne ?",
      answer:
        "Lorsque vous réservez un créneau sur le site, votre demande est immédiatement enregistrée dans notre atelier avec le statut 'En attente'. Notre équipe étudie la nature de l'intervention et votre modèle de véhicule, puis vous confirme le rendez-vous sous 2 heures ouvrées par téléphone, SMS ou e-mail selon votre préférence.",
    },
    {
      question: "Mon véhicule est récent : puis-je le faire réviser sans perdre la garantie constructeur ?",
      answer:
        "Oui, sans aucune restriction. En vertu de la directive européenne n° 461/2010, les constructeurs automobiles ne peuvent pas subordonner le maintien de leur garantie contractuelle à la réalisation des entretiens au sein de leur réseau exclusif. Run Auto respecte rigoureusement le carnet d'entretien officiel et utilise des pièces homologuées d'origine.",
    },
    {
      question: "Comment obtenir un devis avant le début des travaux ?",
      answer:
        "Chez Run Auto, aucun frais n'est engagé sans votre validation préalable. Pour les entretiens courants (vidange, révision, disques/plaquettes), nous vous communiquons une estimation claire lors de votre demande. Pour les recherches de panne complexe, un premier bilan diagnostic est réalisé afin d'établir un devis chiffré précis avant réparation.",
    },
    {
      question: "Quels types de véhicules prenez-vous en charge dans votre atelier de Marseille ?",
      answer:
        "Nous intervenons sur les véhicules particuliers (citadines, berlines, SUV, monospaces) et utilitaires légers, essence, diesel, hybrides et hybrides rechargeables, de la grande majorité des marques européennes et asiatiques (Renault, Peugeot, Citroën, Volkswagen, BMW, Audi, Mercedes, Toyota, Ford, etc.). Pour des motorisations spécifiques ou supercars, contactez-nous au préalable.",
    },
    {
      question: "Quels sont les délais moyens d'intervention ?",
      answer:
        "Pour un entretien périodique, une révision ou un remplacement de plaquettes de frein, l'intervention dure généralement entre 1h et 2h. Vous pouvez déposer votre véhicule le matin et le récupérer à l'heure convenue. Pour les réparations plus lourdes (distribution, embrayage, diagnostic poussé), un délai précis vous est indiqué dès la prise en charge.",
    },
    {
      question: "Quels sont les horaires d'ouverture et comment accéder à l'atelier ?",
      answer:
        "L'atelier vous accueille du lundi au vendredi de 09h00 à 19h00 en continu (fermé le samedi et le dimanche). Nous sommes situés au 52 boulevard de Roux, 13004 Marseille, à proximité immédiate des transports en commun et des axes principaux du 4ème arrondissement.",
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0B] border-t border-[#1F2228] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191D] border border-[#C6A875]/30 text-xs text-[#D7BC8C] mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#C6A875]" />
            <span>Foire Aux Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] mb-4">
            Tout savoir sur nos interventions
          </h2>
          <p className="text-sm text-[#A7A9AE]">
            Des réponses claires pour aborder l'entretien de votre véhicule avec sérénité.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#17191D] border border-[#23272F] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-base text-[#F5F4F0] hover:text-[#C6A875] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C6A875] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#A7A9AE] leading-relaxed border-t border-[#23272F] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-[#17191D] border border-[#292C32] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-sm font-bold text-[#F5F4F0]">Une question particulière pour votre voiture ?</p>
            <p className="text-xs text-[#A7A9AE]">Notre équipe technique vous répond directement au téléphone.</p>
          </div>
          <a
            href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
            className="btn-champagne px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{GARAGE_CONFIG.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
