import { NextResponse } from 'next/server';
import { stripe, processStripeEvent } from '@/lib/payments';
import { serverEnv } from '@/lib/env';


/** Webhook Stripe : signature vérifiée sur le corps brut, traitement idempotent. */
export async function POST(request: Request) {
  const { stripeWebhookSecret, stripeSecret } = serverEnv();
  if (!stripeSecret || !stripeWebhookSecret) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'missing_signature' }, { status: 400 });

  const raw = await request.text();
  let event;
  try {
    event = await stripe().webhooks.constructEventAsync(raw, signature, stripeWebhookSecret);
  } catch {
    return NextResponse.json({ error: 'invalid_signature' }, { status: 400 });
  }

  const outcome = await processStripeEvent(event);
  // 500 → Stripe retentera ; les doublons et événements ignorés répondent 200.
  if (outcome === 'error') return NextResponse.json({ error: 'processing_failed' }, { status: 500 });
  return NextResponse.json({ received: true, outcome });
}
