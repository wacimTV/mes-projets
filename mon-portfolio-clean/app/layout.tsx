import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Wacim AMMOUCHE | Développeur & Designer d'expériences digitales exceptionnelles.",
  description:
    "Wacim AMMOUCHE, développeur & designer d'expériences digitales exceptionnelles.",
  keywords: [
    "développeur",
    "designer",
    "portfolio",
    "créatif",
    "développement web",
    "UI/UX",
  ],
  authors: [{ name: "Wacim AMMOUCHE" }],
  openGraph: {
    title: "Wacim AMMOUCHE | Développeur & Designer d'expériences digitales exceptionnelles.",
    description:
      "Wacim AMMOUCHE, développeur & designer d'expériences digitales exceptionnelles.",
    type: "website",
  },
  generator: "wacimammouche.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
