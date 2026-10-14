import 'server-only';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabase/server';
import { computeAccess, type AccessReason, type AccessRule, type EnrollmentLite, type InstallmentLite } from '@/lib/domain';

export type Role = 'admin' | 'teacher' | 'student';

export interface Profile {
  id: string;
  role: Role;
  status: 'invited' | 'active' | 'suspended' | 'archived';
  full_name: string;
  email: string;
  phone: string | null;
  email_notifications: boolean;
}

export const HOME_BY_ROLE: Record<Role, string> = { admin: '/admin', teacher: '/prof', student: '/eleve' };

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data } = await supabase.from('profiles').select('id, role, status, full_name, email, phone, email_notifications').eq('id', auth.user.id).maybeSingle();
  return (data as Profile | null) ?? null;
}

/** Exige un utilisateur connecté, actif, ayant l'un des rôles autorisés. Redirige sinon. */
export async function requireRole(...roles: Role[]): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect('/connexion?error=session');
  if (profile.status === 'suspended' || profile.status === 'archived') redirect('/connexion?error=suspended');
  if (profile.status !== 'active') redirect('/connexion?error=inactive');
  if (!roles.includes(profile.role)) redirect(HOME_BY_ROLE[profile.role] + '?forbidden=1');
  return profile;
}

/** Variante pour les Server Actions : lève une erreur au lieu de rediriger. */
export async function assertRole(...roles: Role[]): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile || profile.status !== 'active' || !roles.includes(profile.role)) throw new ForbiddenError();
  return profile;
}

export class ForbiddenError extends Error {
  constructor() {
    super('forbidden');
  }
}

export interface PlatformSettings {
  accessRule: AccessRule;
  suspendOnFailedInstallment: boolean;
  notifySessionUpdate: boolean;
  recordingEnabled: boolean;
  minAge: number;
  reminderHours: number;
  endReminderDays: number;
}

export async function getSettings(): Promise<PlatformSettings> {
  const admin = createSupabaseAdmin();
  const { data } = await admin.from('platform_settings').select('key, value');
  const m = new Map((data ?? []).map((r: { key: string; value: unknown }) => [r.key, r.value]));
  return {
    accessRule: m.get('access_rule') === 'full_payment' ? 'full_payment' : 'first_installment',
    suspendOnFailedInstallment: m.get('suspend_on_failed_installment') !== false,
    notifySessionUpdate: m.get('notify_session_update') === true,
    recordingEnabled: m.get('recording_enabled') === true,
    minAge: Number(m.get('min_age') ?? 15),
    reminderHours: Number(m.get('reminder_hours_before_session') ?? 24),
    endReminderDays: Number(m.get('end_reminder_days') ?? 14),
  };
}

export interface StudentAccess {
  allowed: boolean;
  reason: AccessReason;
  enrollment: (EnrollmentLite & { id: string; payment_plan: number; amount_due_cents: number }) | null;
  installments: Array<InstallmentLite & { id: string; due_date: string; paid_at: string | null }>;
}

/** Accès pédagogique d'un élève, calculé côté serveur à partir des données de paiement enregistrées. */
export async function getStudentAccess(studentId: string): Promise<StudentAccess> {
  const admin = createSupabaseAdmin();
  const { data: enr } = await admin
    .from('enrollments')
    .select('id, status, start_date, end_date, payment_plan, amount_due_cents')
    .eq('student_id', studentId)
    .in('status', ['pending_payment', 'active', 'suspended', 'expired'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!enr) return { allowed: false, reason: 'no_enrollment', enrollment: null, installments: [] };
  const { data: inst } = await admin
    .from('payment_installments')
    .select('id, seq, amount_cents, status, due_date, paid_at')
    .eq('enrollment_id', enr.id)
    .order('seq');
  const settings = await getSettings();
  const installments = (inst ?? []) as StudentAccess['installments'];
  const res = computeAccess(enr as EnrollmentLite, installments, settings);
  return { ...res, enrollment: enr as StudentAccess['enrollment'], installments };
}

/** Exige un élève avec accès pédagogique actif (documents, bibliothèque, exercices, cours). */
export async function requireStudentAccess(): Promise<{ profile: Profile; access: StudentAccess }> {
  const profile = await requireRole('student');
  const access = await getStudentAccess(profile.id);
  if (!access.allowed) redirect('/eleve/paiement?locked=' + access.reason);
  return { profile, access };
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
}

export async function audit(actorId: string | null, action: string, entity: string, entityId?: string | null, details?: Record<string, unknown>) {
  const admin = createSupabaseAdmin();
  await admin.from('admin_audit_log').insert({ actor_id: actorId, action, entity, entity_id: entityId ?? null, details: details ?? null });
}
