"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Moon, Sun } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#" },
    { name: "Nos Créations", href: "#products" },
    { name: "Notre Histoire", href: "#story" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex flex-col items-center">
            <span className="font-serif text-2xl tracking-widest text-[var(--color-gold)] font-bold">
              MAISON
            </span>
            <span className="font-serif text-xs tracking-[0.3em] uppercase opacity-80">
              d'Orient
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-wider font-medium hover:text-[var(--color-gold)] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="hover:text-[var(--color-gold)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-[var(--color-gold)] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-gold)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center space-y-8">
              <div className="mb-8 flex flex-col items-center">
                <span className="font-serif text-3xl tracking-widest text-[var(--color-gold)]">
                  MAISON
                </span>
                <span className="font-serif text-sm tracking-[0.3em] uppercase opacity-80">
                  d'Orient
                </span>
              </div>
              
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl hover:text-[var(--color-gold)] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
