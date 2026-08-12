"use client";

import { MapPin, Phone, Mail } from "lucide-react";

const Facebook = ({ size = 24, className = "", ...props }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Instagram = ({ size = 24, className = "", ...props }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

export default function ReservationFooter() {
  return (
    <>
      {/* Reservation Section */}
      <section id="reservation" className="py-24 bg-deepblack relative border-t border-sand-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info & Form */}
            <div>
              <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-semibold mb-4">Réservation</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-sand-light italic mb-8">
                Votre Table
              </h3>
              <p className="text-sand-dark font-light mb-10 max-w-md">
                Nous sommes ouverts du mardi au samedi, de 19h30 à 22h00. Pour les tables de plus de 6 personnes, merci de nous contacter directement.
              </p>

              <form className="space-y-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sand-dark text-xs uppercase tracking-widest mb-2">Date</label>
                    <input type="date" className="w-full bg-transparent border-b border-sand-dark/30 py-2 text-sand-light focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sand-dark text-xs uppercase tracking-widest mb-2">Personnes</label>
                    <select className="w-full bg-transparent border-b border-sand-dark/30 py-2 text-sand-light focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option className="bg-deepblack">2 Personnes</option>
                      <option className="bg-deepblack">3 Personnes</option>
                      <option className="bg-deepblack">4 Personnes</option>
                      <option className="bg-deepblack">5 Personnes</option>
                      <option className="bg-deepblack">6 Personnes</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sand-dark text-xs uppercase tracking-widest mb-2">Heure</label>
                    <select className="w-full bg-transparent border-b border-sand-dark/30 py-2 text-sand-light focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option className="bg-deepblack">19:30</option>
                      <option className="bg-deepblack">20:00</option>
                      <option className="bg-deepblack">20:30</option>
                      <option className="bg-deepblack">21:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sand-dark text-xs uppercase tracking-widest mb-2">Téléphone</label>
                    <input type="tel" placeholder="+33 6 00 00 00 00" className="w-full bg-transparent border-b border-sand-dark/30 py-2 text-sand-light focus:outline-none focus:border-gold transition-colors placeholder:text-sand-dark/30" />
                  </div>
                </div>

                <button className="w-full mt-8 py-4 bg-gold text-deepblack font-medium tracking-wide transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  Demander une réservation
                </button>
              </form>
            </div>

            {/* Contact & Map Placeholder */}
            <div className="flex flex-col justify-between">
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 text-sand-light">
                  <MapPin className="text-gold mt-1" size={20} />
                  <div>
                    <p className="font-serif text-xl mb-1">L&apos;Affenage</p>
                    <p className="text-sand-dark font-light">12 Rue Gastronomique<br/>13200 Arles, France</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sand-light">
                  <Phone className="text-gold" size={20} />
                  <p className="font-light hover:text-gold cursor-pointer transition-colors">+33 4 90 00 00 00</p>
                </div>
                <div className="flex items-center gap-4 text-sand-light">
                  <Mail className="text-gold" size={20} />
                  <p className="font-light hover:text-gold cursor-pointer transition-colors">contact@lafenage.fr</p>
                </div>
              </div>

              {/* Minimalist Map Frame */}
              <div className="h-64 border border-sand-dark/20 relative group overflow-hidden">
                {/* Fallback pattern for map */}
                <div className="absolute inset-0 bg-[#0c0c0c] flex items-center justify-center">
                  <p className="text-sand-dark/50 uppercase tracking-widest text-sm">Interactive Map</p>
                </div>
                {/* Real map iframe can be added here */}
                <div className="absolute inset-0 bg-deepblack/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] py-12 border-t border-sand-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl text-sand-light mb-1">L&apos;Affenage</h2>
            <p className="text-sand-dark text-sm font-light">© {new Date().getFullYear()} Tous droits réservés.</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-sand-dark hover:text-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-sand-dark hover:text-gold transition-colors">
              <Facebook size={20} />
            </a>
          </div>

          <div className="text-center md:text-right flex gap-4 text-sm text-sand-dark font-light">
            <a href="#" className="hover:text-gold transition-colors">Mentions légales</a>
            <span>|</span>
            <a href="#" className="hover:text-gold transition-colors">Politique de confidentialité</a>
          </div>

        </div>
      </footer>
    </>
  );
}
