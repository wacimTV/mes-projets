import 'server-only';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { deliverEmail, notify, notifyAdmins } from '@/lib/notify';
import { getSettings } from '@/lib/auth';
import { fmtDateTime, fmtShortDate } from '@/lib/time';
import { parisDate } from '@/lib/domain';

interface Summary {
  sessionReminders: number;
  exerciseReminders: number;
  endReminders: number;
  expiredEnrollments: number;
  absencesMarked: number;
  emailRetries: number;
}

/** Tâches planifiées : à appeler toutes les 15 minutes (voir docs/deployment.md). Toutes idempotentes. */
export async function runScheduledJobs(now = new Date()): Promise<Summary> {
  const admin = createSupabaseAdmin();
  const settings = await getSettings();
  const out: Summary = { sessionReminders: 0, exerciseReminders: 0, endReminders: 0, expiredEnrollments: 0, absencesMarked: 0, emailRetries: 0 };

  // 1. Rappels de cours
  const horizon = new Date(now.getTime() + settings.reminderHours * 3600_000).toISOString();
  const { data: upcoming } = await admin.from('sessions').select('id, class_id, title, starts_at').eq('status', 'scheduled').gt('starts_at', now.toISOString()).lte('starts_at', horizon);
  for (const s of (upcoming ?? []) as Array<{ id: string; class_id: string; title: string; starts_at: string }>) {
    const { data: members } = await admin.from('class_enrollments').select('student_id').eq('class_id', s.class_id).eq('status', 'active');
    for (const m of (members ?? []) as Array<{ student_id: string }>) {
      const ok = await notify({ userId: m.student_id, type: 'session_reminder', title: 'Rappel de cours', body: `${s.title} — ${fmtDateTime(s.starts_at)}`, link: '/eleve/planning', dedupeKey: `reminder-${s.id}` });
      if (ok) out.sessionReminders++;
    }
  }

  // 2. Travaux bientôt à rendre (échéance dans les 24 h, rendu absent ou brouillon)
  const in24h = new Date(now.getTime() + 24 * 3600_000).toISOString();
  const { data: exs } = await admin.from('exercises').select('id, class_id, title, due_at').eq('is_published', true).gt('due_at', now.toISOString()).lte('due_at', in24h);
  for (const e of (exs ?? []) as Array<{ id: string; class_id: string; title: string; due_at: string }>) {
    const { data: members } = await admin.from('class_enrollments').select('student_id').eq('class_id', e.class_id).eq('status', 'active');
    const { data: subs } = await admin.from('submissions').select('student_id, status').eq('exercise_id', e.id);
    const done = new Set(((subs ?? []) as Array<{ student_id: string; status: string }>).filter((x) => x.status !== 'draft').map((x) => x.student_id));
    for (const m of (members ?? []) as Array<{ student_id: string }>) {
      if (done.has(m.student_id)) continue;
      const ok = await notify({ userId: m.student_id, type: 'exercise_due_soon', title: 'Travail bientôt à rendre', body: `${e.title} — à rendre avant le ${fmtDateTime(e.due_at)}`, link: `/eleve/exercices/${e.id}`, dedupeKey: `due-${e.id}` });
      if (ok) out.exerciseReminders++;
    }
  }

  // 3. Fin prochaine de formation
  const today = parisDate(now);
  const limit = new Date(now.getTime() + settings.endReminderDays * 86400_000);
  const { data: ending } = await admin.from('enrollments').select('id, student_id, end_date').eq('status', 'active').gt('end_date', today).lte('end_date', parisDate(limit));
  for (const e of (ending ?? []) as Array<{ id: string; student_id: string; end_date: string }>) {
    const ok = await notify({ userId: e.student_id, type: 'training_ending', title: 'Fin prochaine de la formation', body: `Votre formation se termine le ${fmtShortDate(e.end_date + 'T12:00:00Z')}. L'accès aux documents et à la bibliothèque sera alors retiré.`, link: '/eleve/paiement', dedupeKey: `ending-${e.id}` });
    if (ok) out.endReminders++;
  }

  // 4. Expiration des inscriptions (les données historiques sont conservées)
  const { data: expired } = await admin.from('enrollments').update({ status: 'expired' }).eq('status', 'active').lte('end_date', today).select('id');
  out.expiredEnrollments = expired?.length ?? 0;

  // 5. Absences : séances terminées sans enregistrement de présence pour un élève de la classe
  const { data: done } = await admin.from('sessions').select('id, class_id').eq('status', 'scheduled').lt('ends_at', new Date(now.getTime() - 30 * 60_000).toISOString()).gt('ends_at', new Date(now.getTime() - 7 * 86400_000).toISOString());
  for (const s of (done ?? []) as Array<{ id: string; class_id: string }>) {
    const { data: members } = await admin.from('class_enrollments').select('student_id').eq('class_id', s.class_id).eq('status', 'active');
    const rows = ((members ?? []) as Array<{ student_id: string }>).map((m) => ({ session_id: s.id, student_id: m.student_id, status: 'absent', source: 'video_events' }));
    if (rows.length) {
      const { data: ins } = await admin.from('attendance').upsert(rows, { onConflict: 'session_id,student_id', ignoreDuplicates: true }).select('id');
      out.absencesMarked += ins?.length ?? 0;
    }
  }

  // 6. Relance des emails échoués / en attente (max 5 tentatives)
  const { data: pending } = await admin.from('notifications').select('id').in('email_status', ['pending', 'failed']).lt('email_attempts', 5).limit(50);
  for (const n of (pending ?? []) as Array<{ id: string }>) {
    await deliverEmail(n.id);
    out.emailRetries++;
  }

  // 7. Alerte admin : évaluations finales à produire pour les formations proches de leur fin
  if ((ending?.length ?? 0) > 0) {
    await notifyAdmins({ type: 'trainings_ending', title: 'Formations proches de leur échéance', body: `${ending?.length} formation(s) se terminent bientôt.`, link: '/admin/eleves', dedupeKey: `admin-ending-${today}` });
  }
  return out;
}
