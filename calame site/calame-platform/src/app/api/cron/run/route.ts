import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { runScheduledJobs } from '@/lib/cron';
import { serverEnv } from '@/lib/env';


function authorized(header: string | null, secret: string): boolean {
  if (!secret || !header) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const given = Buffer.from(header);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Déclenché par le planificateur de l'hébergeur avec `Authorization: Bearer $CRON_SECRET`. */
export async function GET(request: Request) {
  if (!authorized(request.headers.get('authorization'), serverEnv().cronSecret)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const summary = await runScheduledJobs();
  return NextResponse.json({ ok: true, summary });
}
