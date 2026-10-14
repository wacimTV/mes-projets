'use server';

import { randomUUID } from 'node:crypto';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { appointmentSchema, contactSchema, zodFieldErrors, type ActionState } from '@/lib/validation';
import { clientIp } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { notifyAdmins } from '@/lib/notify';
import { escapeHtml, renderEmail, sendEmail } from '@/lib/email';
import { fmtDateTime } from '@/lib/time';
import { publicEnv } from '@/lib/env';

const NOT_CONFIGURED = "Le service n'est pas encore configuré. Merci de réessayer plus tard ou de contacter l'académie.";

export async function requestAppointment(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = appointmentSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { fieldErrors: zodFieldErrors(parsed.error), error: 'Veuillez corriger les champs signalés.' };
  if (parsed.data.website) return { ok: true, message: 'Merci, votre demande a été envoyée.' }; // robot : réponse neutre
  if (!publicEnv.supabaseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) return { error: NOT_CONFIGURED };

  const ip = await clientIp();
  if (!rateLimit(`appt:${ip}`, 5, 3600_000).allowed) return { error: 'Trop de demandes. Réessayez plus tard.' };

  const admin = createSupabaseAdmin();
  const d = parsed.data;
  let slotId: string | null = null;
  let scheduledAt: string | null = null;
  let evaluatorId: string | null = null;
  if (d.slot_id) {
    // Réservation atomique du créneau : un seul visiteur peut l'obtenir
    const { data: slot } = await admin.from('appointment_slots').update({ is_booked: true }).eq('id', d.slot_id).eq('is_booked', false).gt('starts_at', new Date().toISOString()).select('id, starts_at, evaluator_id').maybeSingle();
    if (!slot) return { fieldErrors: { slot_id: "Ce créneau n'est plus disponible." }, error: 'Choisissez un autre créneau.' };
    slotId = slot.id;
    scheduledAt = slot.starts_at;
    evaluatorId = slot.evaluator_id;
  }

  const { data: appt, error } = await admin
    .from('appointments')
    .insert({
      visitor_name: d.visitor_name, visitor_email: d.visitor_email, visitor_phone: d.visitor_phone || null, visitor_age: d.visitor_age,
      message: d.message || null, slot_id: slotId, scheduled_at: scheduledAt, evaluator_id: evaluatorId, status: 'requested',
    })
    .select('id')
    .single();
  if (error || !appt) {
    if (slotId) await admin.from('appointment_slots').update({ is_booked: false }).eq('id', slotId);
    return { error: "Impossible d'enregistrer votre demande. Réessayez dans un instant." };
  }
  await admin.from('appointment_history').insert({ appointment_id: appt.id, action: 'requested', details: { slot: slotId } });

  await notifyAdmins({ type: 'appointment_requested', title: 'Nouvelle demande de rendez-vous', body: `${d.visitor_name} (${d.visitor_age} ans)${scheduledAt ? ` — ${fmtDateTime(scheduledAt)}` : ''}`, link: '/admin/rendez-vous', dedupeKey: `appt-${appt.id}` });
  await sendEmail(d.visitor_email, 'Votre demande de rendez-vous – CALAME', renderEmail({
    title: 'Demande de rendez-vous reçue',
    body: `<p>Bonjour ${escapeHtml(d.visitor_name)},</p><p>Nous avons bien reçu votre demande de test de niveau${scheduledAt ? ` pour le <strong>${escapeHtml(fmtDateTime(scheduledAt))}</strong>` : ''}. Elle sera examinée par l'administration, qui vous confirmera le rendez-vous par email.</p>`,
  }));
  return { ok: true, message: 'Merci ! Votre demande a été enregistrée. Vous recevrez une confirmation par email après examen.' };
}

export async function sendContactMessage(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { fieldErrors: zodFieldErrors(parsed.error), error: 'Veuillez corriger les champs signalés.' };
  if (parsed.data.website) return { ok: true, message: 'Merci, votre message a été envoyé.' };
  if (!publicEnv.supabaseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) return { error: NOT_CONFIGURED };
  const ip = await clientIp();
  if (!rateLimit(`contact:${ip}`, 5, 3600_000).allowed) return { error: 'Trop de messages envoyés. Réessayez plus tard.' };

  const d = parsed.data;
  await notifyAdmins({ type: 'contact', title: `Message de ${d.name}`, body: `${d.email} — ${d.message}`.slice(0, 1500), link: '/admin', dedupeKey: `contact-${randomUUID()}` });
  return { ok: true, message: 'Merci ! Votre message a été transmis à l\'académie.' };
}
