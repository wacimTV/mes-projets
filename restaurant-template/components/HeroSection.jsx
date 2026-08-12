'use client';
import React from 'react';
import Link from 'next/link';

function HeroSection() {
  return (
    <>
      <Link href="#menu">
        <button className="bg-[#FEBF00] text-black font-bold px-4 py-3">
          EXPLORE MENU
        </button>
      </Link>
    </>
  );
}

export default HeroSection;
