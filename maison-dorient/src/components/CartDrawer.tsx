"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-zinc-950 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[var(--color-gold)]" size={24} />
                <h2 className="font-serif text-2xl">Votre Panier</h2>
                <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs px-2 py-1 rounded-full font-medium">
                  {totalItems} {totalItems > 1 ? "articles" : "article"}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-300 dark:text-zinc-700 mb-4">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-xl font-medium">Votre panier est vide</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-light">
                    Découvrez nos créations orientales et laissez-vous tenter.
                  </p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-[var(--color-gold)] font-medium uppercase tracking-wider text-sm hover:underline"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium text-sm lg:text-base line-clamp-1">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-zinc-500 text-xs mb-3">{item.price} €</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-medium">{item.price * item.quantity} €</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-500">Sous-total</span>
                  <span className="font-medium">{subtotal} €</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-zinc-500">Livraison</span>
                  <span className="text-xs text-zinc-400">Calculée à l'étape suivante</span>
                </div>
                
                <button className="w-full py-4 bg-[var(--color-gold)] text-white font-medium uppercase tracking-widest hover:bg-[var(--color-copper)] transition-colors flex justify-center items-center gap-2 group">
                  Commander
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-2 group-hover:bg-white/30 transition-colors">
                    {subtotal} €
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
