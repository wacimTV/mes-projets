"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop", alt: "Plat gastronomique", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", alt: "Ambiance restaurant", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?q=80&w=800&auto=format&fit=crop", alt: "Dressage élégant", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop", alt: "Steak gastronomique", aspect: "aspect-[4/5]" },
  { src: "https://images.unsplash.com/photo-1581184953963-d15972933fc1?q=80&w=800&auto=format&fit=crop", alt: "Table dressée", aspect: "aspect-[3/4]" },
];

export default function GalleryMasonry() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (containerRef.current) {
        const images = gsap.utils.toArray('.gallery-item') as HTMLElement[];
        
        images.forEach((img, i) => {
          // Parallax effect based on index to create asymmetrical scrolling
          const speed = i % 2 === 0 ? 50 : 100;
          
          gsap.fromTo(img,
            { y: speed },
            {
              y: -speed,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });
      }
    });
  }, []);

  return (
    <section className="py-24 bg-deepblack overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4">L&apos;Atmosphère</h2>
          <h3 className="font-serif text-4xl text-sand-light italic">Galerie</h3>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryImages.map((img, idx) => (
            <div key={idx} className={`gallery-item relative overflow-hidden group ${img.aspect} w-full break-inside-avoid`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-deepblack/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
