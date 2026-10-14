import 'server-only';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { absoluteUrl, escapeHtml, renderEmail, sendEmail } from '@/lib/email';

export interface NotifyInput {
  userId: string;
  type: string;
  title: string;
  body?: string;
  link?: string;
  /** Clé d'idempotence : (userId, dedupeKey) est unique, ce qui évite les doublons. */
  dedupeKey: string;
}

/** Enregistre une notification dans la plateforme et tente l'envoi d'email. Retourne false si doublon. */
export async function notify(input: NotifyInput): Promise<boolean> {
  const admin = createSupabaseAdmin();
  const { data: inserted, error } = await admin
    .from('notifications')
    .upsert(
      { user_id: input.userId, type: input.type, title: input.title, body: input.body ?? null, link: input.link ?? null, dedupe_key: input.dedupeKey },
      { onConflict: 'user_id,dedupe_key', ignoreDuplicates: true },
    )
    .select('id');
  if (error) throw new Error('notification_insert_failed');
  if (!inserted || inserted.length === 0) return false; // déjà notifié
  await deliverEmail(inserted[0].id as string);
  return true;
}

/** Tente (ou retente) l'envoi d'email d'une notification. Les échecs sont enregistrés pour relance. */
export async function deliverEmail(notificationId: string): Promise<void> {
  const admin = createSupabaseAdmin();
  const { data: n } = await admin.from('notifications').select('id, user_id, title, body, link, email_attempts').eq('id', notificationId).maybeSingle();
  if (!n) return;
  const { data: p } = await admin.from('profiles').select('email, email_notifications').eq('id', n.user_id).maybeSingle();
  if (!p || !p.email_notifications) {
    await admin.from('notifications').update({ email_status: 'skipped' }).eq('id', n.id);
    return;
  }
  const content = renderEmail({
    title: n.title,
    body: n.body ? `<p>${escapeHtml(n.body)}</p>` : '',
    ctaLabel: n.link ? 'Ouvrir CALAME' : undefined,
    ctaUrl: n.link ? absoluteUrl(n.link) : undefined,
  });
  const res = await sendEmail(p.email, n.title, content);
  if (res.ok) await admin.from('notifications').update({ email_status: 'sent', email_attempts: n.email_attempts + 1, email_error: null }).eq('id', n.id);
  else if (res.skipped) await admin.from('notifications').update({ email_status: 'pending', email_error: res.error }).eq('id', n.id);
  else await admin.from('notifications').update({ email_status: 'failed', email_attempts: n.email_attempts + 1, email_error: res.error }).eq('id', n.id);
}

/** Notifie tous les élèves actifs d'une classe. */
export async function notifyClass(classId: string, make: (studentId: string) => Omit<NotifyInput, 'userId'>): Promise<number> {
  const admin = createSupabaseAdmin();
  const { data } = await admin.from('class_enrollments').select('student_id').eq('class_id', classId).eq('status', 'active');
  let count = 0;
  for (const row of (data ?? []) as Array<{ student_id: string }>) {
    if (await notify({ userId: row.student_id, ...make(row.student_id) })) count++;
  }
  return count;
}

export async function notifyAdmins(input: Omit<NotifyInput, 'userId'>): Promise<void> {
  const admin = createSupabaseAdmin();
  const { data } = await admin.from('profiles').select('id').eq('role', 'admin').eq('status', 'active');
  for (const row of (data ?? []) as Array<{ id: string }>) await notify({ userId: row.id, ...input });
}
