import React from "react";
import type { Metadata } from "next";
import { GARAGE_CONFIG } from "@/config/garage";

export const metadata: Metadata = {
  title: "Politique de Confidentialité & RGPD | Run Auto Marseille",
  description: "Politique de protection des données personnelles et respect du RGPD pour le site Run Auto Marseille.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="pt-12 pb-24 bg-[#0A0A0B] text-[#A7A9AE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-2 block">
            Données Personnelles & RGPD
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-sm">
            Run Auto s'engage à protéger la vie privée des utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD n° 2016/679) et à la loi Informatique et Libertés.
          </p>
        </div>

        <section className="space-y-4 p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
          <h2 className="text-xl font-bold text-[#F5F4F0]">1. Données collectées et finalités</h2>
          <p className="text-sm leading-relaxed">
            Dans le cadre de l'utilisation de nos modules de réservation et formulaires de contact, nous collectons strictement les données nécessaires au traitement de votre demande :
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1.5">
            <li><strong>Identité du client :</strong> Nom, prénom, téléphone et adresse e-mail (pour la confirmation et le suivi du rendez-vous).</li>
            <li><strong>Informations du véhicule :</strong> Marque, modèle, motorisation, immatriculation facultative (pour préparer les outillages et les pièces détachées requises).</li>
            <li><strong>Message ou motif :</strong> Descriptif du problème rencontré.</li>
          </ul>
        </section>

        <section className="space-y-4 p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
          <h2 className="text-xl font-bold text-[#F5F4F0]">2. Destinataires et conservation des données</h2>
          <p className="text-sm leading-relaxed">
            Vos données personnelles sont strictement destinées au personnel technique et administratif de l'atelier Run Auto. Elles ne sont <strong>en aucun cas vendues, louées ou cédées</strong> à des tiers publicitaires.
          </p>
          <p className="text-sm leading-relaxed">
            Les données relatives aux demandes de devis et rendez-vous sont conservées pendant la durée nécessaire à la gestion de la relation client et aux obligations légales de facturation (jusqu'à 3 ans à compter du dernier contact pour les prospects).
          </p>
        </section>

        <section className="space-y-4 p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
          <h2 className="text-xl font-bold text-[#F5F4F0]">3. Vos droits d'accès, de rectification et d'effacement</h2>
          <p className="text-sm leading-relaxed">
            Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles. Vous pouvez exercer ce droit à tout moment en adressant un e-mail à <strong>{GARAGE_CONFIG.legal.donneesPersonnellesDPO}</strong> ou par courrier postal adressé au 52 boulevard de Roux, 13004 Marseille.
          </p>
        </section>

        <section className="space-y-4 p-6 rounded-2xl bg-[#17191D] border border-[#23272F]">
          <h2 className="text-xl font-bold text-[#F5F4F0]">4. Cookies & Traçabilité</h2>
          <p className="text-sm leading-relaxed">
            Ce site n'utilise aucun traceur publicitaire intrusif. Seuls des cookies strictement techniques essentiels au bon fonctionnement de la navigation, à la sécurité des sessions administratives et à la prévention des attaques automatisées peuvent être déposés.
          </p>
        </section>
      </div>
    </div>
  );
}
