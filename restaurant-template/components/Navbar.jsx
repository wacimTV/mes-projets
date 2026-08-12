'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#BD1F17] to-[#A51D13]">
      <nav className="flex justify-between items-center text-white max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center space-x-6">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          <Link href="/home" className="text-3xl font-bold">
            Restaurant
          </Link>
          <div className="space-x-6 hidden lg:flex">
            <Link href="#home" className="text-md hover:text-[#FEBF00]">
              Home
            </Link>
            <Link href="#about" className="text-md hover:text-[#FEBF00]">
              About
            </Link>
            <Link href="#menu" className="text-md hover:text-[#FEBF00]">
              Menu
            </Link>
            <Link href="#booking" className="text-md hover:text-[#FEBF00]">
              Book
            </Link>
            <Link href="#review" className="text-md hover:text-[#FEBF00]">
              Review
            </Link>
            <Link href="#contact" className="text-md hover:text-[#FEBF00]">
              Contact
            </Link>
          </div>
        </div>

        <button onClick={toggleMenu} className="lg:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <Link
          href="#booking"
          className="bg-[#FEBF00] text-black font-bold px-4 py-2 hidden lg:flex"
        >
          BOOK A TABLE
        </Link>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100
 text-white text-center space-y-4 py-10"
        >
          <Link href="#home" className="block" onClick={closeMenu}>
            Home
          </Link>
          <Link href="#about" className="block" onClick={closeMenu}>
            About
          </Link>
          <Link href="#menu" className="block" onClick={closeMenu}>
            Menu
          </Link>
          <Link href="#booking" className="block" onClick={closeMenu}>
            Book
          </Link>
          <Link href="#review" className="block" onClick={closeMenu}>
            Review
          </Link>
          <Link href="#contact" className="block" onClick={closeMenu}>
            Contact
          </Link>
          <Link
            href="#booking"
            className="bg-[#FEBF00] text-black font-bold px-4 py-2 inline-block mt-4"
            onClick={closeMenu}
          >
            BOOK A TABLE
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
