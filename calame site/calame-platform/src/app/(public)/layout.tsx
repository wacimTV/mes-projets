import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

const NAV = [
  { href: '/academie', label: "L'académie" },
  { href: '/formation', label: 'La formation' },
  { href: '/methode', label: 'Méthode' },
  { href: '/programme', label: 'Programme' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/professeurs', label: 'Professeurs' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur">
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3 no-underline" aria-label="CALAME – accueil">
            <Image src="/assets/logo-calame.jpeg" alt="" width={48} height={32} className="h-8 w-12 rounded object-cover" priority />
            <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.18em] text-[var(--green-800)]">CALAME</span>
            <span className="ar text-xl text-[var(--magenta-600)]" lang="ar">قَلَم</span>
          </Link>
          <nav aria-label="Navigation du site" className="hidden items-center gap-5 text-sm lg:flex">
            {NAV.map((n) => <Link key={n.href} href={n.href} className="no-underline text-[var(--ink)] hover:text-[var(--magenta-600)]">{n.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/connexion" className="btn btn-secondary btn-sm">Connexion</Link>
            <Link href="/rendez-vous" className="btn btn-primary btn-sm">Test de niveau</Link>
          </div>
        </div>
        <nav aria-label="Navigation mobile" className="container-page flex gap-4 overflow-x-auto pb-2 text-sm lg:hidden">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="whitespace-nowrap no-underline text-[var(--ink)]">{n.label}</Link>)}
        </nav>
      </header>
      <main id="contenu">{children}</main>
      <footer className="mt-20 bg-[var(--green-900)] text-[#dfe9df]">
        <div className="container-page grid gap-8 py-10 md:grid-cols-3">
          <div>
            <div className="font-[family-name:var(--font-display)] text-2xl tracking-[0.2em] text-white">CALAME</div>
            <p className="ar text-xl">قَلَم</p>
            <p className="mt-2 text-sm">Apprenez | Parlez | Échangez</p>
          </div>
          <nav aria-label="Pied de page" className="grid gap-1 text-sm">
            <Link href="/rendez-vous" className="text-[#dfe9df]">Prendre rendez-vous</Link>
            <Link href="/connexion" className="text-[#dfe9df]">Connexion</Link>
            <Link href="/contact" className="text-[#dfe9df]">Contact</Link>
            <Link href="/faq" className="text-[#dfe9df]">FAQ</Link>
          </nav>
          <nav aria-label="Informations légales" className="grid gap-1 text-sm">
            <Link href="/mentions-legales" className="text-[#dfe9df]">Mentions légales</Link>
            <Link href="/confidentialite" className="text-[#dfe9df]">Politique de confidentialité</Link>
            <Link href="/cgv" className="text-[#dfe9df]">Conditions générales et remboursement</Link>
            <Link href="/cookies" className="text-[#dfe9df]">Cookies et traceurs</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
