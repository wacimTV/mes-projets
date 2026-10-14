import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { attendanceFromSeconds } from '@/lib/domain';

/** Vérifie la signature Daily : HMAC-SHA256 de `${timestamp}.${corps}` avec le secret décodé en base64. */
export function verifyDailySignature(rawBody: string, timestamp: string | null, signature: string | null, secret: string, nowMs = Date.now()): boolean {
  if (!timestamp || !signature || !secret) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(nowMs - ts * (ts < 1e12 ? 1000 : 1)) > 5 * 60_000) return false; // anti-rejeu
  const expected = createHmac('sha256', Buffer.from(secret, 'base64')).update(`${timestamp}.${rawBody}`).digest('base64');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

interface DailyEvent {
  id?: string;
  type?: string;
  payload?: { room?: string; user_id?: string; duration?: number; joined_at?: number; session_id?: string };
  event_ts?: number;
}

/** Enregistre les arrivées/départs et recalcule la présence. Idempotent grâce à provider_event_id. */
export async function processDailyEvent(event: DailyEvent): Promise<'processed' | 'duplicate' | 'ignored'> {
  const kind = event.type === 'participant.joined' ? 'joined' : event.type === 'participant.left' ? 'left' : null;
  const room = event.payload?.room;
  const userId = event.payload?.user_id;
  if (!kind || !room || !userId || !event.id) return 'ignored';

  const admin = createSupabaseAdmin();
  const { data: session } = await admin.from('sessions').select('id, class_id, starts_at, ends_at').eq('room_name', room).maybeSingle();
  if (!session) return 'ignored';
  const { data: member } = await admin.from('class_enrollments').select('id').eq('class_id', session.class_id).eq('student_id', userId).eq('status', 'active').maybeSingle();
  if (!member) return 'ignored'; // professeur ou participant inconnu

  const { error } = await admin.from('attendance_events').insert({ session_id: session.id, student_id: userId, event: kind, provider_event_id: event.id, occurred_at: new Date((event.event_ts ?? Date.now() / 1000) * 1000).toISOString() });
  if (error) return error.code === '23505' ? 'duplicate' : 'ignored';

  const { data: att } = await admin.from('attendance').select('id, connected_seconds, source').eq('session_id', session.id).eq('student_id', userId).maybeSingle();
  if (att?.source === 'admin') return 'processed'; // correction administrative : ne pas écraser
  const sessionSeconds = (new Date(session.ends_at).getTime() - new Date(session.starts_at).getTime()) / 1000;
  const seconds = (att?.connected_seconds ?? 0) + (kind === 'left' ? Math.max(0, Math.floor(event.payload?.duration ?? 0)) : 0);
  const status = kind === 'joined' && seconds === 0 ? 'partial' : attendanceFromSeconds(seconds, sessionSeconds);
  await admin.from('attendance').upsert({ session_id: session.id, student_id: userId, connected_seconds: seconds, status, source: 'video_events', updated_at: new Date().toISOString() }, { onConflict: 'session_id,student_id' });
  return 'processed';
}
