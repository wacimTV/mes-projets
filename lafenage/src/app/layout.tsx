import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'Affenage | Expérience Culinaire d'Exception à Arles",
  description: "Découvrez L'Affenage à Arles. Une cuisine gastronomique moderne dans un cadre élégant et chaleureux. Réservez votre table pour une expérience inoubliable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} h-full antialiased bg-[#0a0a0a] text-[#FAF7F2]`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0a0a0a]">{children}</body>
    </html>
  );
}
