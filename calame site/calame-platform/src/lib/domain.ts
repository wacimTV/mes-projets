/** Logique métier pure (sans I/O) : testable unitairement. Reflète les fonctions SQL app.student_has_access / app.split_amount. */

export type AccessRule = 'first_installment' | 'full_payment';
export type InstallmentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled';

export interface InstallmentLite {
  seq: number;
  amount_cents: number;
  status: InstallmentStatus;
}

export interface EnrollmentLite {
  status: 'pending_payment' | 'active' | 'suspended' | 'expired' | 'cancelled';
  start_date: string | null; // YYYY-MM-DD (Europe/Paris)
  end_date: string | null;
}

export interface AccessSettings {
  accessRule: AccessRule;
  suspendOnFailedInstallment: boolean;
}

export type AccessReason =
  | 'ok'
  | 'no_enrollment'
  | 'not_active'
  | 'not_started'
  | 'expired'
  | 'payment_incomplete'
  | 'payment_failed';

/** Date du jour au format YYYY-MM-DD dans le fuseau Europe/Paris. */
export function parisDate(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Répartit un montant en n échéances ; l'ajustement des centimes est porté par la dernière. */
export function splitAmount(totalCents: number, n: number): number[] {
  if (!Number.isInteger(totalCents) || totalCents <= 0) throw new Error('invalid_total');
  if (!Number.isInteger(n) || n < 1 || n > 3) throw new Error('invalid_installments');
  const base = Math.floor(totalCents / n);
  return Array.from({ length: n }, (_, i) => (i === n - 1 ? totalCents - base * (n - 1) : base));
}

/** Dates d'échéance : une par mois à partir de la date de départ. */
export function installmentDueDates(start: Date, n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + i, start.getUTCDate()));
    return d.toISOString().slice(0, 10);
  });
}

export function addMonths(isoDate: string, months: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = new Date(Date.UTC(y, m - 1 + months, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(d, lastDay));
  return target.toISOString().slice(0, 10);
}

/** Calcule l'accès pédagogique d'un élève. Source de vérité côté serveur, jamais côté navigateur. */
export function computeAccess(
  enrollment: EnrollmentLite | null,
  installments: InstallmentLite[],
  settings: AccessSettings,
  now: Date = new Date(),
): { allowed: boolean; reason: AccessReason } {
  if (!enrollment) return { allowed: false, reason: 'no_enrollment' };
  if (enrollment.status !== 'active') return { allowed: false, reason: 'not_active' };
  const today = parisDate(now);
  if (!enrollment.start_date || enrollment.start_date > today) return { allowed: false, reason: 'not_started' };
  if (!enrollment.end_date || enrollment.end_date <= today) return { allowed: false, reason: 'expired' };
  if (settings.suspendOnFailedInstallment && installments.some((i) => i.status === 'failed')) {
    return { allowed: false, reason: 'payment_failed' };
  }
  const paid = installments.filter((i) => i.status === 'paid');
  const ok = settings.accessRule === 'full_payment' ? installments.length > 0 && paid.length === installments.length : paid.length > 0;
  return ok ? { allowed: true, reason: 'ok' } : { allowed: false, reason: 'payment_incomplete' };
}

export const ACCESS_MESSAGES: Record<AccessReason, string> = {
  ok: 'Accès actif.',
  no_enrollment: "Aucune inscription à la formation n'est enregistrée pour votre compte.",
  not_active: "Votre inscription n'est pas encore active. Elle sera activée après confirmation du paiement.",
  not_started: "Votre formation n'a pas encore commencé.",
  expired: 'Votre formation est terminée : les documents et la bibliothèque ne sont plus accessibles.',
  payment_incomplete: "Le paiement n'est pas encore confirmé.",
  payment_failed: "Une échéance de paiement a échoué. Contactez l'académie pour résoudre le problème.",
};

export function formatEuros(cents: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

/** Taux d'assiduité en pourcentage : une présence partielle compte pour la moitié. */
export function attendanceRate(statuses: Array<'present' | 'partial' | 'absent'>): number | null {
  if (statuses.length === 0) return null;
  const score = statuses.reduce((s, x) => s + (x === 'present' ? 1 : x === 'partial' ? 0.5 : 0), 0);
  return Math.round((score / statuses.length) * 100);
}

/** Statut de présence à partir de la durée connectée (estimation, pas une mesure d'attention). */
export function attendanceFromSeconds(connectedSeconds: number, sessionSeconds: number): 'present' | 'partial' | 'absent' {
  if (connectedSeconds <= 0 || sessionSeconds <= 0) return 'absent';
  const ratio = connectedSeconds / sessionSeconds;
  if (ratio >= 0.75) return 'present';
  if (ratio >= 0.15) return 'partial';
  return 'absent';
}

/** Temps d'activité : plafonne l'écart entre deux pulsations pour ne pas compter une page inactive. */
export const ACTIVITY_MAX_GAP_SECONDS = 90;
export function addActivity(currentSeconds: number, lastActivity: Date, now: Date): number {
  const gap = Math.max(0, Math.round((now.getTime() - lastActivity.getTime()) / 1000));
  return currentSeconds + Math.min(gap, ACTIVITY_MAX_GAP_SECONDS);
}
