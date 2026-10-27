"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X, ShieldCheck, MapPin } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Calcul de l'état ouvert/fermé en temps réel à Marseille
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const min = now.getMinutes();
      const currentTime = hour * 60 + min;

      // Lun-Ven: 09h00 (540m) à 19h00 (1140m) en continu
      if (day >= 1 && day <= 5) {
        if (currentTime >= 540 && currentTime < 1140) {
          setIsOpenNow(true);
          return;
        }
      }
      setIsOpenNow(false);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/prestations", label: "Nos prestations" },
    { href: "/le-garage", label: "Le garage" },
    { href: "/prendre-rendez-vous", label: "Prendre rendez-vous" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Banner subtil */}
      <div className="bg-[#0A0A0B] border-b border-[#23272F] text-xs py-2 px-4 sm:px-8 text-[#A7A9AE] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"}`} />
              {isOpenNow ? "Atelier actuellement ouvert" : "Atelier fermé (ouvre à 09h00)"}
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#F5F4F0] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#C6A875]" />
              {GARAGE_CONFIG.contact.address}, {GARAGE_CONFIG.contact.postalCode} {GARAGE_CONFIG.contact.city}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#D7BC8C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A875]" />
              Garantie constructeur préservée
            </span>
            <a
              href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-[#F5F4F0] hover:text-[#C6A875] font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A875]" />
              {GARAGE_CONFIG.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0B]/90 backdrop-blur-md border-b border-[#23272F] py-3.5 shadow-2xl"
            : "bg-[#0A0A0B]/60 backdrop-blur-sm border-b border-white/5 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo Automobile Premium */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#292C32] to-[#17191D] border border-[#C6A875]/40 flex items-center justify-center shadow-lg group-hover:border-[#C6A875] transition-all duration-300">
              <span className="text-[#C6A875] font-black tracking-widest text-lg font-serif">R</span>
              <div className="absolute -inset-0.5 rounded-lg bg-[#C6A875]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.2em] text-[#F5F4F0] uppercase font-sans leading-none">
                RUN <span className="text-[#C6A875]">AUTO</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#A7A9AE] uppercase mt-1">
                Atelier Marseille 13004
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-[#C6A875] font-semibold"
                      : "text-[#A7A9AE] hover:text-[#F5F4F0]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A875] to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-[#F5F4F0] px-4 py-2.5 rounded-lg border border-[#292C32] hover:border-[#C6A875]/40 hover:bg-[#17191D] transition-all"
            >
              <Phone className="w-4 h-4 text-[#C6A875]" />
              <span>{GARAGE_CONFIG.contact.phoneDisplay}</span>
            </a>

            <Link
              href="/prendre-rendez-vous"
              className="btn-champagne px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre rendez-vous</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#F5F4F0] bg-[#17191D] border border-[#292C32] focus:outline-none"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-xl lg:hidden pt-28 px-6 pb-12 flex flex-col justify-between">
          <nav className="flex flex-col gap-6 text-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 border-b border-[#23272F] flex items-center justify-between ${
                    isActive ? "text-[#C6A875] font-bold" : "text-[#F5F4F0]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#C6A875]">→</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#23272F]">
            <a
              href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 text-base text-[#F5F4F0] py-3 rounded-lg border border-[#292C32] bg-[#17191D]"
            >
              <Phone className="w-4 h-4 text-[#C6A875]" />
              <span>Appeler le {GARAGE_CONFIG.contact.phoneDisplay}</span>
            </a>

            <Link
              href="/prendre-rendez-vous"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-champagne text-center py-3.5 rounded-lg text-base font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre rendez-vous</span>
            </Link>

            <p className="text-xs text-center text-[#A7A9AE] mt-2">
              52 boulevard de Roux, 13004 Marseille
            </p>
          </div>
        </div>
      )}
    </>
  );
}
