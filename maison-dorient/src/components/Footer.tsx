"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-zinc-950 text-white pt-24 pb-10 border-t border-zinc-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 oriental-pattern opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6 flex flex-col items-start">
              <span className="font-serif text-3xl tracking-widest text-[var(--color-gold)]">
                MAISON
              </span>
              <span className="font-serif text-sm tracking-[0.3em] uppercase opacity-80">
                d'Orient
              </span>
            </div>
            <p className="text-zinc-400 font-light leading-relaxed mb-8">
              L'art de la pâtisserie orientale élevée au rang de haute gastronomie.
              Une expérience sensorielle inoubliable au cœur d'Arles.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Découvrir</h4>
            <ul className="space-y-4 text-zinc-400 font-light">
              <li><a href="#" className="hover:text-[var(--color-gold)] transition-colors">Nos créations</a></li>
              <li><a href="#" className="hover:text-[var(--color-gold)] transition-colors">Notre Histoire</a></li>
              <li><a href="#" className="hover:text-[var(--color-gold)] transition-colors">Coffrets Cadeaux</a></li>
              <li><a href="#" className="hover:text-[var(--color-gold)] transition-colors">Événements & Mariages</a></li>
              <li><a href="#" className="hover:text-[var(--color-gold)] transition-colors">Journal</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Contact & Visite</h4>
            <ul className="space-y-6 text-zinc-400 font-light">
              <li className="flex items-start gap-4">
                <MapPin className="text-[var(--color-gold)] flex-shrink-0 mt-1" size={20} />
                <div>
                  <span className="block text-white mb-1">La Boutique</span>
                  <p>15 Rue de la République<br />13200 Arles, France</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-[var(--color-gold)] flex-shrink-0" size={20} />
                <a href="tel:+33490000000" className="hover:text-[var(--color-gold)] transition-colors">+33 4 90 00 00 00</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-[var(--color-gold)] flex-shrink-0" size={20} />
                <a href="mailto:contact@maisondorient.fr" className="hover:text-[var(--color-gold)] transition-colors">contact@maisondorient.fr</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-white">Newsletter</h4>
            <p className="text-zinc-400 font-light mb-6">
              Inscrivez-vous pour recevoir nos offres exclusives et découvrir nos nouveautés en avant-première.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 pr-12 rounded-none focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 text-[var(--color-gold)] hover:text-white transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-900 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} Maison d'Orient. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Missing icon imports fallback
function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}

function Instagram({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function Facebook({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

function Twitter({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  );
}
