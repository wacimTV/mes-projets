import Link from 'next/link';
import { addDaysYmd, fmtDay, fmtTime, monthGrid, parisYmd, weekStart } from '@/lib/time';
import { Empty, StatusBadge } from '@/components/ui';

export interface CalendarSession {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  status: string;
  description?: string | null;
  class_name?: string | null;
  teacher_name?: string | null;
}

export type CalendarView = 'jour' | 'semaine' | 'mois';

export function parseView(v: string | undefined): CalendarView {
  return v === 'jour' || v === 'mois' ? v : 'semaine';
}

export function rangeFor(view: CalendarView, ymd: string): { from: string; to: string } {
  if (view === 'jour') return { from: ymd, to: addDaysYmd(ymd, 1) };
  if (view === 'semaine') {
    const s = weekStart(ymd);
    return { from: s, to: addDaysYmd(s, 7) };
  }
  const grid = monthGrid(ymd);
  return { from: grid[0], to: addDaysYmd(grid[grid.length - 1], 1) };
}

const DOW = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function shift(view: CalendarView, ymd: string, dir: -1 | 1): string {
  if (view === 'jour') return addDaysYmd(ymd, dir);
  if (view === 'semaine') return addDaysYmd(ymd, 7 * dir);
  const [y, m] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1 + dir, 1)).toISOString().slice(0, 10);
}

/** Planning jour / semaine / mois (rendu serveur, fuseau Europe/Paris). Les séances arrivent déjà filtrées par la RLS. */
export function Calendar({ sessions, view, ymd, basePath, eventHref, showClass }: {
  sessions: CalendarSession[]; view: CalendarView; ymd: string; basePath: string; eventHref: (s: CalendarSession) => string; showClass?: boolean;
}) {
  const today = parisYmd(new Date());
  const byDay = new Map<string, CalendarSession[]>();
  for (const s of sessions) {
    // Une séance qui traverse minuit apparaît sur chaque jour parisien concerné
    let d = parisYmd(s.starts_at);
    const last = parisYmd(new Date(new Date(s.ends_at).getTime() - 1));
    for (let guard = 0; d <= last && guard < 3; guard++) {
      byDay.set(d, [...(byDay.get(d) ?? []), s]);
      d = addDaysYmd(d, 1);
    }
  }
  const link = (v: CalendarView, date: string) => `${basePath}?vue=${v}&date=${date}`;
  const title = view === 'mois'
    ? new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(ymd + 'T12:00:00Z'))
    : view === 'jour' ? fmtDay(ymd + 'T12:00:00Z')
    : `Semaine du ${fmtDay(weekStart(ymd) + 'T12:00:00Z')}`;

  const Event = ({ s }: { s: CalendarSession }) => (
    <Link href={eventHref(s)} className={`cal-event ${s.status === 'cancelled' ? 'cancelled' : ''}`}>
      <strong>{fmtTime(s.starts_at)}–{fmtTime(s.ends_at)}</strong> {s.title}
      {showClass && s.class_name ? <span className="block opacity-80">{s.class_name}</span> : null}
      {s.status === 'cancelled' ? <span className="sr-only"> (annulée)</span> : null}
    </Link>
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link className="btn btn-secondary btn-sm" href={link(view, shift(view, ymd, -1))} aria-label="Période précédente">←</Link>
          <Link className="btn btn-secondary btn-sm" href={link(view, today)}>Aujourd&apos;hui</Link>
          <Link className="btn btn-secondary btn-sm" href={link(view, shift(view, ymd, 1))} aria-label="Période suivante">→</Link>
          <h2 className="ml-2 text-lg capitalize">{title}</h2>
        </div>
        <div className="flex gap-1" role="group" aria-label="Changer de vue">
          {(['jour', 'semaine', 'mois'] as const).map((v) => (
            <Link key={v} href={link(v, ymd)} className={`btn btn-sm ${v === view ? 'btn-primary' : 'btn-secondary'}`} aria-current={v === view ? 'page' : undefined}>
              {v[0].toUpperCase() + v.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {view === 'jour' ? (
        (byDay.get(ymd) ?? []).length === 0 ? <Empty title="Aucune séance ce jour" /> : (
          <ul className="grid gap-3">
            {(byDay.get(ymd) ?? []).map((s) => (
              <li key={s.id} className="card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3>{s.title}</h3><StatusBadge status={s.status} />
                </div>
                <p className="muted text-sm">{fmtTime(s.starts_at)} – {fmtTime(s.ends_at)} (heure de Paris){s.class_name ? ` · ${s.class_name}` : ''}{s.teacher_name ? ` · ${s.teacher_name}` : ''}</p>
                {s.description ? <p className="mt-2 text-sm">{s.description}</p> : null}
                <Link href={eventHref(s)} className="btn btn-secondary btn-sm mt-3">Ouvrir la séance</Link>
              </li>
            ))}
          </ul>
        )
      ) : null}

      {view === 'semaine' ? (
        <div className="grid gap-2 md:grid-cols-7">
          {Array.from({ length: 7 }, (_, i) => addDaysYmd(weekStart(ymd), i)).map((d, i) => (
            <section key={d} className={`card !p-3 ${d === today ? 'ring-2 ring-[var(--sun-500)]' : ''}`} aria-label={fmtDay(d + 'T12:00:00Z')}>
              <h3 className="!text-sm">{DOW[i]} {d.slice(8)}</h3>
              {(byDay.get(d) ?? []).length === 0 ? <p className="muted mt-2 text-xs">—</p> : (byDay.get(d) ?? []).map((s) => <Event key={s.id} s={s} />)}
            </section>
          ))}
        </div>
      ) : null}

      {view === 'mois' ? (
        <div className="cal-grid month">
          {DOW.map((d) => <div key={d} className="cal-head">{d}</div>)}
          {monthGrid(ymd).map((d) => (
            <div key={d} className={`cal-cell ${d.slice(0, 7) !== ymd.slice(0, 7) ? 'out' : ''} ${d === today ? 'today' : ''}`}>
              <Link href={link('jour', d)} className="font-bold no-underline">{Number(d.slice(8))}</Link>
              {(byDay.get(d) ?? []).map((s) => <Event key={s.id} s={s} />)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
