"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { products, categories, Category } from "@/data/products";

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState<Category | "Tous">("Tous");

  const filteredProducts = activeCategory === "Tous" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-[var(--color-offwhite)] dark:bg-zinc-950 oriental-pattern dark:oriental-pattern-dark relative">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--color-gold)] tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block"
          >
            Nos Créations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Collection Signature
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-600 dark:text-zinc-400 font-light"
          >
            Découvrez nos pâtisseries confectionnées chaque jour par nos maîtres artisans, 
            respectant des recettes ancestrales transmises de génération en génération.
          </motion.p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          <button
            onClick={() => setActiveCategory("Tous")}
            className={`px-5 py-2 text-sm uppercase tracking-wider transition-all duration-300 rounded-full border ${
              activeCategory === "Tous" 
                ? "bg-[var(--color-gold)] text-white border-[var(--color-gold)]" 
                : "border-zinc-300 dark:border-zinc-700 hover:border-[var(--color-gold)] dark:hover:border-[var(--color-gold)]"
            }`}
          >
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm uppercase tracking-wider transition-all duration-300 rounded-full border ${
                activeCategory === cat 
                  ? "bg-[var(--color-gold)] text-white border-[var(--color-gold)]" 
                  : "border-zinc-300 dark:border-zinc-700 hover:border-[var(--color-gold)] dark:hover:border-[var(--color-gold)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </section>
  );
}
