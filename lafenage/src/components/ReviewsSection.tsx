"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reviews = [
  {
    name: "Jean-Pierre R.",
    role: "Guide Gastronomique",
    text: "Une maîtrise parfaite des cuissons et un équilibre des saveurs qui frôle l'excellence. Le cadre est somptueux et le service irréprochable.",
  },
  {
    name: "Sophie M.",
    role: "Épicurienne",
    text: "L'Affenage n'est pas seulement un restaurant, c'est une véritable expérience sensorielle. Le pigeon rôti est tout simplement inoubliable.",
  },
  {
    name: "Marc & Élise",
    role: "Clients fidèles",
    text: "Notre adresse préférée à Arles. Chaque nouveau menu est une découverte qui témoigne du génie créatif du Chef. Un joyau caché.",
  }
];

export default function ReviewsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (containerRef.current) {
        gsap.fromTo(
          ".review-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      }
    });
  }, []);

  return (
    <section className="py-24 bg-[#080808] relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex gap-1 mb-6 text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-sand-light italic">
            Ce qu&apos;ils disent de nous
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card bg-deepblack border border-sand-dark/10 p-8 hover:border-gold/30 transition-colors duration-300">
              <p className="text-sand-dark font-light leading-relaxed mb-8 italic">
                &quot;{review.text}&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-sand-light font-serif text-lg">{review.name}</span>
                <span className="text-gold text-sm tracking-wider uppercase">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
