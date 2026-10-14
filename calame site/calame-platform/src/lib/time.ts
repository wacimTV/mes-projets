const PARIS = 'Europe/Paris';

const dayFmt = new Intl.DateTimeFormat('fr-FR', { timeZone: PARIS, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const timeFmt = new Intl.DateTimeFormat('fr-FR', { timeZone: PARIS, hour: '2-digit', minute: '2-digit' });
const dateTimeFmt = new Intl.DateTimeFormat('fr-FR', { timeZone: PARIS, day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
const shortDateFmt = new Intl.DateTimeFormat('fr-FR', { timeZone: PARIS, day: '2-digit', month: '2-digit', year: 'numeric' });
const ymdFmt = new Intl.DateTimeFormat('en-CA', { timeZone: PARIS, year: 'numeric', month: '2-digit', day: '2-digit' });

export const fmtDay = (d: string | Date) => dayFmt.format(new Date(d));
export const fmtTime = (d: string | Date) => timeFmt.format(new Date(d));
export const fmtDateTime = (d: string | Date) => dateTimeFmt.format(new Date(d));
export const fmtShortDate = (d: string | Date) => shortDateFmt.format(new Date(d));
/** Jour calendaire (YYYY-MM-DD) d'un instant dans le fuseau Europe/Paris. */
export const parisYmd = (d: string | Date) => ymdFmt.format(new Date(d));

/** Décalage (ms) entre UTC et Paris à un instant donné (gère l'heure d'été/hiver). */
function parisOffsetMs(at: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: PARIS, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(at);
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute'), g('second'));
  return asUtc - Math.floor(at.getTime() / 1000) * 1000;
}

/**
 * Convertit une saisie « datetime-local » (heure de Paris, ex. 2026-10-26T18:30) en ISO UTC.
 * Les heures inexistantes (passage à l'heure d'été) sont rejetées via un aller-retour de vérification.
 */
export function parisLocalToIso(local: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!m) return null;
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const naive = Date.UTC(y, mo - 1, d, h, mi);
  let guess = naive - parisOffsetMs(new Date(naive));
  guess = naive - parisOffsetMs(new Date(guess));
  const iso = new Date(guess);
  const back = ymdFmt.format(iso) + 'T' + timeFmt.format(iso).replace(':', ':');
  const expected = `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}`;
  return back === expected ? iso.toISOString() : null;
}

/** Valeur pour <input type="datetime-local"> (heure de Paris). */
export function isoToParisLocal(iso: string): string {
  const d = new Date(iso);
  return `${ymdFmt.format(d)}T${timeFmt.format(d)}`;
}

export function addDaysYmd(ymd: string, days: number): string {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

/** Bornes UTC [début, fin[ d'un jour calendaire parisien. */
export function parisDayBounds(ymd: string): { start: string; end: string } {
  const start = parisLocalToIso(`${ymd}T00:00`) ?? new Date(`${ymd}T00:00:00Z`).toISOString();
  const next = addDaysYmd(ymd, 1);
  const end = parisLocalToIso(`${next}T00:00`) ?? new Date(`${next}T00:00:00Z`).toISOString();
  return { start, end };
}

/** Jours de la grille d'un mois (lundi → dimanche), semaines complètes. */
export function monthGrid(ymd: string): string[] {
  const [y, m] = ymd.split('-').map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const dow = (first.getUTCDay() + 6) % 7; // lundi = 0
  const start = new Date(Date.UTC(y, m - 1, 1 - dow));
  const last = new Date(Date.UTC(y, m, 0));
  const total = Math.ceil((dow + last.getUTCDate()) / 7) * 7;
  return Array.from({ length: total }, (_, i) => new Date(start.getTime() + i * 86400000).toISOString().slice(0, 10));
}

export function weekStart(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return addDaysYmd(ymd, -((dt.getUTCDay() + 6) % 7));
}
