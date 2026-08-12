"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const isWished = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-zinc-100 dark:border-zinc-800"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        
        {/* Badges & Actions Overlay */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-end">
            <button 
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
              }}
              className="p-3 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-zinc-900 dark:text-white hover:text-[var(--color-gold)] dark:hover:text-[var(--color-gold)] transition-colors shadow-lg"
            >
              <Heart size={18} fill={isWished ? "var(--color-gold)" : "none"} color={isWished ? "var(--color-gold)" : "currentColor"} />
            </button>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-[var(--color-gold)] text-white text-sm font-medium uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[var(--color-copper)] transition-colors translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <ShoppingBag size={16} />
            Ajouter
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-[var(--color-gold)] text-xs uppercase tracking-widest font-medium mb-2">
          {product.category}
        </div>
        
        <h3 className="font-serif text-xl font-medium mb-3 group-hover:text-[var(--color-gold)] transition-colors">
          {product.name}
        </h3>
        
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 line-clamp-2 font-light flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-medium">{product.price} €</span>
          
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-zinc-400">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
