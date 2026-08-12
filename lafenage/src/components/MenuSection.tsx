"use client";

import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const menuItems = [
  {
    category: "Entrées",
    items: [
      { name: "Foie Gras poêlé", description: "Figues rôties au romarin, réduction de vinaigre balsamique", price: "28€" },
      { name: "Tartare de Saint-Jacques", description: "Agrumes de Provence, huile de sésame noir et caviar osciètre", price: "32€" },
    ]
  },
  {
    category: "Plats",
    items: [
      { name: "Pigeon de Rocamadour", description: "Cuit sur le coffre, mousseline de céleri rave, jus corsé à la truffe", price: "45€" },
      { name: "Turbot sauvage", description: "Asperges vertes grillées, émulsion au beurre blanc et yuzu", price: "48€" },
    ]
  },
  {
    category: "Desserts",
    items: [
      { name: "Le Chocolat Grand Cru", description: "Croustillant praliné, mousse légère au chocolat noir 72%, glace fève tonka", price: "18€" },
      { name: "Soufflé à la Vanille de Madagascar", description: "Cœur coulant caramel beurre salé, sorbet poire", price: "20€" },
    ]
  }
];

export default function MenuSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (containerRef.current) {
        const categories = gsap.utils.toArray('.menu-category') as HTMLElement[];
        
        categories.forEach((category) => {
          gsap.fromTo(
            category,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: category,
                start: "top 85%",
              }
            }
          );
        });
      }
    });
  }, []);

  return (
    <section id="menu" className="py-24 bg-[#050505] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="text-center mb-20">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4">À la carte</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-sand-light italic">Dégustation</h3>
        </div>

        <div className="space-y-20">
          {menuItems.map((category, idx) => (
            <div key={idx} className="menu-category">
              <h4 className="font-serif text-2xl text-sand-light border-b border-sand-dark/20 pb-4 mb-8">
                {category.category}
              </h4>
              <ul className="space-y-8">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="group cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xl text-sand-light group-hover:text-gold transition-colors duration-300">
                        {item.name}
                      </h5>
                      <div className="flex-1 mx-4 border-b border-dotted border-sand-dark/30 relative top-[-6px]"></div>
                      <span className="text-gold font-serif text-xl">{item.price}</span>
                    </div>
                    <p className="text-sand-dark text-sm font-light max-w-lg">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a href="#reservation" className="inline-block px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-deepblack transition-colors duration-300 tracking-widest text-sm uppercase">
            Menu Dégustation - 120€
          </a>
        </div>
      </div>
    </section>
  );
}
