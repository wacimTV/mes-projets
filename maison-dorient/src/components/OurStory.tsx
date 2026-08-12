"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function OurStory() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="story" ref={sectionRef} className="py-24 md:py-32 bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Images */}
          <div className="relative h-[600px] hidden md:block">
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-0 left-0 w-2/3 h-[400px] z-10"
            >
              <img 
                src="/images/baklava.png" 
                alt="Savoir-faire artisanal" 
                className="w-full h-full object-cover rounded-sm shadow-2xl"
              />
            </motion.div>
            
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-0 right-0 w-2/3 h-[350px] z-20 border-8 border-white dark:border-black"
            >
              <img 
                src="/images/zlabia.png" 
                alt="Ingrédients nobles" 
                className="w-full h-full object-cover rounded-sm"
              />
            </motion.div>
            
            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[var(--color-gold)] rounded-full blur-[100px] opacity-20 -z-10" />
          </div>

          {/* Mobile Image (Static) */}
          <div className="md:hidden w-full h-[400px] relative mb-10">
            <img 
              src="/images/baklava.png" 
              alt="Savoir-faire artisanal" 
              className="w-full h-full object-cover rounded-sm"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-gold)] tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block"
            >
              Héritage & Tradition
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight"
            >
              L'Âme de l'Orient <br />
              <span className="italic font-light text-zinc-500">au Cœur d'Arles</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-600 dark:text-zinc-400 font-light mb-6 text-lg leading-relaxed"
            >
              Depuis plus de trois générations, la Maison d'Orient perpétue le savoir-faire ancestral 
              de la haute pâtisserie orientale. Chaque création est une ode aux palais d'antan, 
              où le temps suspend son vol.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-zinc-600 dark:text-zinc-400 font-light mb-10 text-lg leading-relaxed"
            >
              Nous sélectionnons avec la plus grande rigueur nos ingrédients : des amandes 
              de la vallée de l'Ourika, du miel pur d'oranger, et de véritables pistaches d'Alep. 
              Une symphonie de saveurs qui invite au voyage.
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl font-serif text-[var(--color-gold)] mb-2">1985</div>
                <div className="text-sm uppercase tracking-wider font-medium text-zinc-500">Fondation</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-4xl font-serif text-[var(--color-gold)] mb-2">40+</div>
                <div className="text-sm uppercase tracking-wider font-medium text-zinc-500">Recettes</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-4xl font-serif text-[var(--color-gold)] mb-2">100%</div>
                <div className="text-sm uppercase tracking-wider font-medium text-zinc-500">Artisanal</div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
