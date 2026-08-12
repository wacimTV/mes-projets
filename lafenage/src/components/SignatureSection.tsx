"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SignatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (textRef.current && imageRef.current && sectionRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );

        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} id="signature" className="relative py-24 md:py-32 bg-deepblack overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div ref={textRef} className="order-2 lg:order-1 flex flex-col justify-center">
            <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4">
              Notre Signature
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl text-sand-light leading-tight mb-8">
              L&apos;Art de <span className="italic">sublimer</span> la simplicité
            </h3>
            <p className="text-sand-dark text-lg mb-6 leading-relaxed font-light">
              Situé au cœur historique d&apos;Arles, L&apos;Affenage réinvente la gastronomie provençale. Notre Chef sélectionne chaque matin les meilleurs produits locaux pour créer une carte qui évolue au rythme des saisons.
            </p>
            <p className="text-sand-dark text-lg mb-10 leading-relaxed font-light">
              Chaque plat raconte une histoire, un hommage aux saveurs méditerranéennes, avec une touche de modernité audacieuse.
            </p>
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop" 
                alt="Signature du chef" 
                width={150} 
                height={50} 
                className="opacity-50 sepia contrast-150 grayscale invert mix-blend-screen"
                unoptimized
              />
            </div>
          </div>

          {/* Image Content */}
          <div ref={imageRef} className="order-1 lg:order-2 relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
            <div className="absolute inset-0 border border-gold/30 translate-x-4 -translate-y-4 z-0"></div>
            <div className="relative z-10 w-full h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop"
                alt="Intérieur du restaurant L'Affenage"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-8 -left-8 z-20 bg-deepblack border border-gold/40 p-6 hidden md:block">
              <p className="font-serif text-3xl text-gold mb-1">2026</p>
              <p className="text-sand-light uppercase tracking-widest text-xs">Excellence</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
