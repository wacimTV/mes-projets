import { NextResponse } from 'next/server';
import { processDailyEvent, verifyDailySignature } from '@/lib/attendance';
import { serverEnv } from '@/lib/env';


/** Webhook Daily : arrivées et départs des participants → présences. */
export async function POST(request: Request) {
  const { dailyWebhookSecret } = serverEnv();
  if (!dailyWebhookSecret) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  const raw = await request.text();
  const ok = verifyDailySignature(raw, request.headers.get('x-webhook-timestamp'), request.headers.get('x-webhook-signature'), dailyWebhookSecret);
  if (!ok) return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const outcome = await processDailyEvent(body);
  return NextResponse.json({ received: true, outcome });
}
