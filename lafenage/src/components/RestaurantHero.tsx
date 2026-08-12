"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RestaurantHero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder gradient in case image doesn't load */}
        <div className="absolute inset-0 bg-deepblack z-0"></div>
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338988a2e8c0?q=80&w=2070&auto=format&fit=crop"
          alt="L'Affenage - Plat Gastronomique"
          fill
          priority
          className="object-cover opacity-70 scale-105"
          sizes="100vw"
          quality={100}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-deepblack/40 via-deepblack/20 to-deepblack/90 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-6">
            Arles, Provence
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-sand-light leading-tight mb-8"
        >
          Une expérience<br />culinaire <span className="text-gold italic">d&apos;exception</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-sand-dark text-lg md:text-xl max-w-2xl mb-12 font-light"
        >
          Découvrez une gastronomie moderne et audacieuse, inspirée par les terroirs de la Méditerranée et sublimée par l&apos;élégance de notre Chef.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#reservation"
            className="group relative px-8 py-4 bg-gold text-deepblack font-medium tracking-wide overflow-hidden transition-all duration-500 hover:bg-gold-light hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            <span className="relative z-10">Réserver une table</span>
          </a>
          <a
            href="#menu"
            className="px-8 py-4 border border-sand-dark/30 text-sand-light font-medium tracking-wide transition-all duration-500 hover:border-gold hover:text-gold"
          >
            Découvrir la carte
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-xs uppercase tracking-widest text-sand-dark">Scroll</span>
        <div className="w-[1px] h-12 bg-sand-dark/30 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
