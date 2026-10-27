"use client";

import React from "react";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { GARAGE_CONFIG } from "@/config/garage";

export default function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-lg border-t border-[#23272F] p-3 px-4 flex items-center gap-3 lg:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <a
        href={`tel:${GARAGE_CONFIG.contact.phone.replace(/\s/g, "")}`}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#17191D] border border-[#292C32] text-[#F5F4F0] text-sm font-semibold hover:border-[#C6A875]/40 transition-colors"
        aria-label="Appeler le garage Run Auto"
      >
        <Phone className="w-4 h-4 text-[#C6A875]" />
        <span>Appeler</span>
      </a>

      <Link
        href="/prendre-rendez-vous"
        className="flex-[1.5] btn-champagne flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold"
      >
        <Calendar className="w-4 h-4" />
        <span>Rendez-vous</span>
      </Link>
    </div>
  );
}
