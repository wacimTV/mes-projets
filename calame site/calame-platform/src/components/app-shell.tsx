'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';

export interface NavItem { href: string; label: string; badge?: number }

export function AppShell({ items, userName, roleLabel, signOut, children }: { items: NavItem[]; userName: string; roleLabel: string; signOut: () => Promise<void>; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const homes = ['/admin', '/prof', '/eleve'];
  return (
    <div className="app-shell">
      <div className="mobile-bar">
        <span className="font-[family-name:var(--font-display)] text-lg tracking-widest">CALAME</span>
        <button className="btn btn-sm btn-secondary" aria-expanded={open} aria-controls="sidebar" onClick={() => setOpen((v) => !v)}>Menu</button>
      </div>
      <aside id="sidebar" className={`sidebar ${open ? 'open' : ''}`} aria-label="Navigation principale">
        <div className="mb-5 px-2">
          <div className="font-[family-name:var(--font-display)] text-2xl tracking-[0.2em] text-white">CALAME</div>
          <div className="ar text-lg text-[#cfe0d0]">قَلَم</div>
        </div>
        <nav className="grid gap-1">
          {items.map((it) => {
            const active = homes.includes(it.href) ? pathname === it.href : pathname === it.href || pathname.startsWith(it.href + '/');
            return (
              <Link key={it.href} href={it.href} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>
                <span>{it.label}</span>
                {it.badge ? <span className="ml-auto rounded-full bg-[#d9803f] px-2 text-xs font-bold text-[#1d1408]" aria-label={`${it.badge} à traiter`}>{it.badge}</span> : null}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 border-t border-white/15 pt-4 text-sm">
          <div className="font-semibold text-white">{userName}</div>
          <div className="text-[#cfe0d0]">{roleLabel}</div>
          <form action={signOut} className="mt-3"><LogoutButton /></form>
        </div>
      </aside>
      <main id="contenu" className="app-main">{children}</main>
    </div>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();
  return <button className="btn btn-sm w-full border-white/40 bg-transparent text-white hover:bg-white/10" disabled={pending}>{pending ? 'Déconnexion…' : 'Se déconnecter'}</button>;
}

/** Bouton d'action simple (formulaire POST) avec confirmation optionnelle. */
export function ActionButton({ action, children, confirm, className = 'btn btn-secondary btn-sm', fields }: {
  action: (formData: FormData) => Promise<void>;
  children: ReactNode;
  confirm?: string;
  className?: string;
  fields?: Record<string, string>;
}) {
  return (
    <form action={action} onSubmit={(e) => { if (confirm && !window.confirm(confirm)) e.preventDefault(); }} className="inline">
      {Object.entries(fields ?? {}).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <ActionSubmit className={className}>{children}</ActionSubmit>
    </form>
  );
}

function ActionSubmit({ children, className }: { children: ReactNode; className: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" className={className} disabled={pending}>{pending ? '…' : children}</button>;
}
