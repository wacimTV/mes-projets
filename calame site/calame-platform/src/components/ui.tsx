import type { ReactNode } from 'react';
import Link from 'next/link';

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3 reveal">
      <div>
        <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>{title}</h1>
        {subtitle ? <p className="muted mt-1 max-w-[70ch]">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export function Card({ title, children, actions, className = '' }: { title?: string; children: ReactNode; actions?: ReactNode; className?: string }) {
  return (
    <section className={`card ${className}`}>
      {title || actions ? (
        <div className="mb-3 flex items-center justify-between gap-2">
          {title ? <h2 style={{ fontSize: '1.15rem' }}>{title}</h2> : <span />}
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Stat({ label, value, href, tone }: { label: string; value: number | string; href?: string; tone?: 'warn' | 'bad' }) {
  const inner = (
    <div className={`card card-hover h-full ${tone === 'bad' ? 'border-[#e2b4b4]' : tone === 'warn' ? 'border-[#ecc9a0]' : ''}`}>
      <div className="stat">{value}</div>
      <div className="muted mt-1 text-sm">{label}</div>
    </div>
  );
  return href ? <Link href={href} className="no-underline text-inherit">{inner}</Link> : inner;
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-[#c9c4b6] bg-white/60 p-8 text-center">
      <p className="font-semibold">{title}</p>
      {children ? <div className="muted mt-1 text-sm">{children}</div> : null}
    </div>
  );
}

export function Alert({ tone = 'info', children }: { tone?: 'info' | 'ok' | 'error' | 'warn'; children: ReactNode }) {
  return <div role={tone === 'error' ? 'alert' : 'status'} className={`alert alert-${tone}`}>{children}</div>;
}

type Tone = 'ok' | 'warn' | 'bad' | 'info' | 'neutral';
export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export const STATUS_LABELS: Record<string, { label: string; tone: Tone }> = {
  requested: { label: 'Demandé', tone: 'warn' },
  confirmed: { label: 'Confirmé', tone: 'info' },
  done: { label: 'Effectué', tone: 'neutral' },
  cancelled: { label: 'Annulé', tone: 'bad' },
  refused: { label: 'Refusé', tone: 'bad' },
  pending_validation: { label: 'En attente de validation pédagogique', tone: 'warn' },
  scheduled: { label: 'Prévue', tone: 'info' },
  present: { label: 'Présent', tone: 'ok' },
  partial: { label: 'Présence partielle', tone: 'warn' },
  absent: { label: 'Absent', tone: 'bad' },
  draft: { label: 'Brouillon', tone: 'neutral' },
  submitted: { label: 'Soumis', tone: 'info' },
  in_correction: { label: 'En correction', tone: 'warn' },
  corrected: { label: 'Corrigé', tone: 'ok' },
  returned: { label: 'Renvoyé pour nouvelle soumission', tone: 'warn' },
  todo: { label: 'À faire', tone: 'neutral' },
  late: { label: 'En retard', tone: 'bad' },
  pending: { label: 'En attente', tone: 'warn' },
  paid: { label: 'Payé', tone: 'ok' },
  failed: { label: 'Échoué', tone: 'bad' },
  refunded: { label: 'Remboursé', tone: 'neutral' },
  pending_payment: { label: 'Paiement en attente', tone: 'warn' },
  active: { label: 'Actif', tone: 'ok' },
  suspended: { label: 'Suspendu', tone: 'bad' },
  expired: { label: 'Terminé', tone: 'neutral' },
  invited: { label: 'Invité', tone: 'warn' },
  archived: { label: 'Archivé', tone: 'neutral' },
  open: { label: 'Ouverte', tone: 'warn' },
  accepted: { label: 'Acceptée', tone: 'ok' },
  rejected: { label: 'Rejetée', tone: 'bad' },
  sent: { label: 'Envoyé', tone: 'ok' },
  skipped: { label: 'Non envoyé (préférence)', tone: 'neutral' },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] ?? { label: status, tone: 'neutral' as Tone };
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

export function Placeholder({ children }: { children?: ReactNode }) {
  return (
    <p className="placeholder-note" role="note">
      <strong>À valider par le responsable de CALAME.</strong> {children ?? 'Contenu provisoire, non issu des documents du projet.'}
    </p>
  );
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Notice({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const forbidden = searchParams.forbidden;
  if (forbidden) return <Alert tone="warn">Vous n&apos;avez pas accès à cette page.</Alert>;
  return null;
}
