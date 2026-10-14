import 'server-only';
import Stripe from 'stripe';
import { serverEnv } from '@/lib/env';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { addMonths, installmentDueDates, parisDate, splitAmount, formatEuros } from '@/lib/domain';
import { notify, notifyAdmins } from '@/lib/notify';
import { getSettings } from '@/lib/auth';
import { absoluteUrl } from '@/lib/email';

export const stripeConfigured = () => Boolean(serverEnv().stripeSecret);

let client: Stripe | null = null;
export function stripe(): Stripe {
  const key = serverEnv().stripeSecret;
  if (!key) throw new Error('stripe_not_configured');
  client ??= new Stripe(key);
  return client;
}

/** Crée l'inscription à la formation et son échéancier. Montants lus en base (jamais depuis le navigateur). */
export async function createEnrollmentWithPlan(studentId: string, plan: 1 | 2 | 3, actorId: string): Promise<{ ok: true; enrollmentId: string } | { ok: false; error: string }> {
  const admin = createSupabaseAdmin();
  const { data: formation } = await admin.from('formations').select('id, price_cents').eq('is_active', true).order('name').limit(1).maybeSingle();
  if (!formation) return { ok: false, error: 'Aucune formation active.' };
  const { data: existing } = await admin.from('enrollments').select('id').eq('student_id', studentId).in('status', ['pending_payment', 'active', 'suspended']).maybeSingle();
  if (existing) return { ok: false, error: 'Une inscription est déjà en cours pour cet élève.' };

  const { data: enr, error } = await admin
    .from('enrollments')
    .insert({ student_id: studentId, formation_id: formation.id, payment_plan: plan, amount_due_cents: formation.price_cents })
    .select('id')
    .single();
  if (error || !enr) return { ok: false, error: "Impossible de créer l'inscription." };

  const amounts = splitAmount(formation.price_cents, plan);
  const dues = installmentDueDates(new Date(), plan);
  const { error: e2 } = await admin
    .from('payment_installments')
    .insert(amounts.map((amount_cents, i) => ({ enrollment_id: enr.id, seq: i + 1, amount_cents, due_date: dues[i] })));
  if (e2) {
    await admin.from('enrollments').delete().eq('id', enr.id);
    return { ok: false, error: "Impossible de créer l'échéancier." };
  }
  await admin.from('admin_audit_log').insert({ actor_id: actorId, action: 'enrollment.create', entity: 'enrollment', entity_id: enr.id, details: { plan, studentId } });
  return { ok: true, enrollmentId: enr.id };
}

/** Session Stripe Checkout pour une échéance. Le montant vient de la base de données. */
export async function createCheckoutForInstallment(installmentId: string, studentId: string): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!stripeConfigured()) return { ok: false, error: "Le paiement en ligne n'est pas encore configuré. Contactez l'académie." };
  const admin = createSupabaseAdmin();
  const { data: inst } = await admin
    .from('payment_installments')
    .select('id, seq, amount_cents, status, enrollment_id, enrollments!inner(student_id, payment_plan)')
    .eq('id', installmentId)
    .maybeSingle();
  const enr = inst ? (Array.isArray(inst.enrollments) ? inst.enrollments[0] : inst.enrollments) : null;
  if (!inst || !enr || enr.student_id !== studentId) return { ok: false, error: 'Échéance introuvable.' };
  if (inst.status === 'paid') return { ok: false, error: 'Cette échéance est déjà réglée.' };

  const { data: profile } = await admin.from('profiles').select('email').eq('id', studentId).single();
  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    customer_email: profile?.email,
    client_reference_id: studentId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: inst.amount_cents,
          product_data: { name: `Formation CALAME – échéance ${inst.seq}/${enr.payment_plan}` },
        },
      },
    ],
    metadata: { installment_id: inst.id, student_id: studentId },
    payment_intent_data: { metadata: { installment_id: inst.id, student_id: studentId } },
    success_url: absoluteUrl('/eleve/paiement?status=returned'),
    cancel_url: absoluteUrl('/eleve/paiement?status=cancelled'),
  });
  await admin.from('payment_installments').update({ checkout_session_id: session.id }).eq('id', inst.id);
  if (!session.url) return { ok: false, error: 'Session de paiement indisponible.' };
  return { ok: true, url: session.url };
}

/** Active (ou réactive) l'inscription si la règle d'accès configurée est satisfaite. */
export async function reconcileEnrollment(enrollmentId: string): Promise<void> {
  const admin = createSupabaseAdmin();
  const settings = await getSettings();
  const { data: enr } = await admin.from('enrollments').select('id, student_id, status, start_date, end_date, formation_id').eq('id', enrollmentId).single();
  if (!enr || enr.status === 'cancelled' || enr.status === 'expired') return;
  const { data: inst } = await admin.from('payment_installments').select('status').eq('enrollment_id', enrollmentId);
  const list = (inst ?? []) as Array<{ status: string }>;
  const paid = list.filter((i) => i.status === 'paid').length;
  const satisfied = settings.accessRule === 'full_payment' ? list.length > 0 && paid === list.length : paid > 0;
  if (!satisfied) return;

  if (enr.status === 'pending_payment' || enr.status === 'suspended' || !enr.start_date) {
    const { data: formation } = await admin.from('formations').select('duration_months').eq('id', enr.formation_id).single();
    const start = enr.start_date ?? parisDate(new Date());
    const end = enr.end_date ?? addMonths(start, formation?.duration_months ?? 3);
    await admin.from('enrollments').update({ status: 'active', start_date: start, end_date: end }).eq('id', enr.id);
    await admin.from('profiles').update({ status: 'active' }).eq('id', enr.student_id).eq('status', 'invited');
  }
}

export type WebhookOutcome = 'processed' | 'duplicate' | 'ignored' | 'error';

/** Traitement idempotent des événements Stripe déjà vérifiés (signature contrôlée par l'appelant). */
export async function processStripeEvent(event: Stripe.Event): Promise<WebhookOutcome> {
  const admin = createSupabaseAdmin();
  const { error: insErr } = await admin.from('payment_events').insert({ provider: 'stripe', event_id: event.id, event_type: event.type, payload: event as unknown as Record<string, unknown> });
  if (insErr) {
    if (insErr.code === '23505') {
      const { data: prev } = await admin.from('payment_events').select('processed_at').eq('provider', 'stripe').eq('event_id', event.id).single();
      if (prev?.processed_at) return 'duplicate';
    } else {
      return 'error';
    }
  }

  try {
    let outcome: WebhookOutcome = 'ignored';
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const s = event.data.object as Stripe.Checkout.Session;
        if (s.payment_status === 'paid') outcome = await markPaid(s);
        break;
      }
      case 'checkout.session.async_payment_failed': {
        const s = event.data.object as Stripe.Checkout.Session;
        outcome = await markFailed(s.metadata?.installment_id, 'Paiement différé refusé');
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        outcome = await markFailed(pi.metadata?.installment_id, pi.last_payment_error?.message ?? 'Paiement refusé');
        break;
      }
      case 'charge.refunded': {
        const c = event.data.object as Stripe.Charge;
        outcome = await markRefunded(typeof c.payment_intent === 'string' ? c.payment_intent : c.payment_intent?.id);
        break;
      }
      default:
        break;
    }
    await admin.from('payment_events').update({ processed_at: new Date().toISOString(), error: null }).eq('provider', 'stripe').eq('event_id', event.id);
    return outcome;
  } catch (e) {
    await admin.from('payment_events').update({ error: e instanceof Error ? e.message : 'unknown' }).eq('provider', 'stripe').eq('event_id', event.id);
    return 'error';
  }
}

async function markPaid(s: Stripe.Checkout.Session): Promise<WebhookOutcome> {
  const admin = createSupabaseAdmin();
  const installmentId = s.metadata?.installment_id;
  if (!installmentId) return 'ignored';
  const { data: inst } = await admin.from('payment_installments').select('id, seq, amount_cents, status, enrollment_id, enrollments!inner(student_id)').eq('id', installmentId).maybeSingle();
  if (!inst) return 'ignored';
  // Le montant et la devise sont vérifiés par rapport à la base, jamais à la métadonnée du navigateur
  if (s.amount_total !== inst.amount_cents || s.currency !== 'eur') throw new Error('amount_mismatch');
  const enr = Array.isArray(inst.enrollments) ? inst.enrollments[0] : inst.enrollments;
  const ref = typeof s.payment_intent === 'string' ? s.payment_intent : (s.payment_intent?.id ?? s.id);

  if (inst.status !== 'paid') {
    await admin.from('payment_installments').update({ status: 'paid', paid_at: new Date().toISOString(), failure_reason: null }).eq('id', inst.id);
    await admin.from('payments').upsert({ installment_id: inst.id, provider: 'stripe', provider_ref: ref, amount_cents: inst.amount_cents, status: 'succeeded' }, { onConflict: 'provider,provider_ref,status', ignoreDuplicates: true });
    await reconcileEnrollment(inst.enrollment_id);
    await notify({
      userId: enr.student_id, type: 'payment_succeeded', title: 'Paiement reçu', link: '/eleve/paiement', dedupeKey: `pay-ok-${inst.id}`,
      body: `Votre paiement de ${formatEuros(inst.amount_cents)} a bien été enregistré.`,
    });
  }
  return 'processed';
}

async function markFailed(installmentId: string | undefined, reason: string): Promise<WebhookOutcome> {
  if (!installmentId) return 'ignored';
  const admin = createSupabaseAdmin();
  const { data: inst } = await admin.from('payment_installments').select('id, status, amount_cents, enrollments!inner(student_id)').eq('id', installmentId).maybeSingle();
  if (!inst || inst.status === 'paid') return 'ignored';
  const enr = Array.isArray(inst.enrollments) ? inst.enrollments[0] : inst.enrollments;
  await admin.from('payment_installments').update({ status: 'failed', failure_reason: reason.slice(0, 300) }).eq('id', inst.id);
  await notify({
    userId: enr.student_id, type: 'payment_failed', title: 'Paiement échoué', link: '/eleve/paiement', dedupeKey: `pay-ko-${inst.id}-${Date.now().toString().slice(0, 8)}`,
    body: "Votre paiement n'a pas abouti. Vous pouvez réessayer depuis votre espace ou contacter l'académie pour résoudre le problème.",
  });
  await notifyAdmins({ type: 'payment_failed', title: 'Paiement échoué', body: `Une échéance de ${formatEuros(inst.amount_cents)} a échoué.`, link: '/admin/paiements', dedupeKey: `admin-pay-ko-${inst.id}` });
  return 'processed';
}

async function markRefunded(paymentIntentId: string | undefined | null): Promise<WebhookOutcome> {
  if (!paymentIntentId) return 'ignored';
  const admin = createSupabaseAdmin();
  const { data: pay } = await admin.from('payments').select('id, installment_id, amount_cents').eq('provider', 'stripe').eq('provider_ref', paymentIntentId).eq('status', 'succeeded').maybeSingle();
  if (!pay) return 'ignored';
  await admin.from('payment_installments').update({ status: 'refunded' }).eq('id', pay.installment_id);
  await admin.from('payments').upsert({ installment_id: pay.installment_id, provider: 'stripe', provider_ref: paymentIntentId, amount_cents: pay.amount_cents, status: 'refunded' }, { onConflict: 'provider,provider_ref,status', ignoreDuplicates: true });
  return 'processed';
}
