"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={ref} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero.png)' }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-950/90" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[var(--color-gold)] tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block"
        >
          L'Excellence depuis 1985
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight"
        >
          L'Art de la<br />
          <span className="italic font-light">Pâtisserie Orientale</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          Une fusion parfaite entre l'héritage des palais d'Orient et l'élégance contemporaine. 
          Des créations uniques confectionnées avec les ingrédients les plus nobles.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a 
            href="#products"
            className="group relative px-8 py-4 bg-[var(--color-gold)] text-white font-medium uppercase tracking-wider text-sm overflow-hidden flex items-center gap-3 transition-transform hover:scale-105"
          >
            <span className="relative z-10">Commander</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          
          <a 
            href="#story"
            className="group px-8 py-4 border border-white/30 text-white font-medium uppercase tracking-wider text-sm flex items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <span>Découvrir</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase mb-4">Défiler</span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ 
              y: ["-100%", "100%"]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "linear" 
            }}
            className="absolute inset-0 w-full h-1/2 bg-[var(--color-gold)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
