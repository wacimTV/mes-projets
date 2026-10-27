import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Wrench, Eye, HeartHandshake } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export default function GaragePresentation() {
  const pillars = [
    {
      icon: HeartHandshake,
      title: "L'écoute & le conseil",
      text: "Nous prenons le temps d'écouter vos observations et d'analyser vos besoins sans jargon inutile.",
    },
    {
      icon: Eye,
      title: "Transparence absolue",
      text: "Chaque anomalie vous est expliquée et documentée avec un devis chiffré avant tout engagement de frais.",
    },
    {
      icon: Wrench,
      title: "Rigueur d'intervention",
      text: "Outillage adapté, couples de serrage respectés et pièces de rechange sélectionnées pour leur fiabilité.",
    },
    {
      icon: ShieldCheck,
      title: "Accompagnement continu",
      text: "Du bilan électronique initial jusqu'à la restitution du véhicule, votre sérénité reste notre priorité.",
    },
  ];

  return (
    <section id="presentation" className="py-24 bg-[#0A0A0B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual with dark luxury automotive detail */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden border border-[#292C32] shadow-2xl group">
              <Image
                src="/images/workshop-brakes.jpg"
                alt="Précision mécanique et contrôle des organes de freinage chez Run Auto"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-80" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#17191D]/90 backdrop-blur-md border border-[#C6A875]/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C6A875]/20 flex items-center justify-center text-[#C6A875] shrink-0 font-bold">
                    13004
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F5F4F0] uppercase tracking-wider">
                      Atelier de proximité à Marseille
                    </p>
                    <p className="text-[11px] text-[#A7A9AE]">52 boulevard de Roux • Quartier des Chutes-Lavie</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient gold glow */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#C6A875]/10 rounded-full blur-2xl -z-10" />
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-bold tracking-widest uppercase text-[#C6A875] mb-3">
              Notre Approche
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F4F0] leading-tight mb-6">
              L'expertise automobile, <br />
              <span className="text-gradient-champagne">en toute confiance.</span>
            </h2>

            <p className="text-[#A7A9AE] leading-relaxed mb-8 text-base">
              Implanté au cœur du 4ème arrondissement de Marseille, le garage <strong>Run Auto</strong> vous propose une prise en charge mécanique rigoureuse et bienveillante. Face à la complexité croissante des technologies embarquées, nous allions matériel de diagnostic moderne et savoir-faire mécanique traditionnel pour garantir la pérennité de votre véhicule.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-10">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#17191D] border border-[#23272F] hover:border-[#C6A875]/30 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#292C32] flex items-center justify-center text-[#C6A875]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-[#F5F4F0]">{pillar.title}</h3>
                    </div>
                    <p className="text-xs text-[#A7A9AE] leading-relaxed">{pillar.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/le-garage"
                className="btn-outline-champagne px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>En savoir plus sur le garage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/prendre-rendez-vous"
                className="text-xs text-[#C6A875] hover:text-[#D7BC8C] font-semibold flex items-center gap-1.5 p-2"
              >
                <span>Prendre rendez-vous en ligne →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
