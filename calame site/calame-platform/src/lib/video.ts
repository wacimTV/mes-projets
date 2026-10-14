import 'server-only';
import { serverEnv } from '@/lib/env';

/**
 * Visioconférence : Daily (daily.co). Choix documenté dans docs/video.md.
 * Les salles sont PRIVÉES : l'accès exige un jeton temporaire généré côté serveur après contrôle des droits.
 */
const API = 'https://api.daily.co/v1';

function headers() {
  return { Authorization: `Bearer ${serverEnv().dailyApiKey}`, 'Content-Type': 'application/json' };
}

export const videoConfigured = () => Boolean(serverEnv().dailyApiKey && serverEnv().dailyDomain);

export function roomNameForSession(sessionId: string): string {
  return `calame-${sessionId.replace(/-/g, '').slice(0, 24)}`;
}

/** Crée la salle privée (idempotent). Pas d'enregistrement par défaut. */
export async function ensureRoom(roomName: string, startsAt: Date, endsAt: Date, recording = false): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!videoConfigured()) return { ok: false, error: 'video_not_configured' };
  const exp = Math.floor(endsAt.getTime() / 1000) + 3 * 3600;
  const nbf = Math.floor(startsAt.getTime() / 1000) - 3600;
  const res = await fetch(`${API}/rooms`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      name: roomName,
      privacy: 'private',
      properties: {
        exp,
        nbf,
        max_participants: 20,
        enable_chat: true,
        enable_screenshare: true,
        enable_knocking: false,
        enable_prejoin_ui: true,
        enable_recording: recording ? 'cloud' : undefined,
        eject_at_room_exp: true,
        lang: 'fr',
      },
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (res.ok) return { ok: true };
  const body = (await res.json().catch(() => ({}))) as { info?: string };
  if (res.status === 400 && /already exists/i.test(body.info ?? '')) return { ok: true };
  return { ok: false, error: `daily_${res.status}` };
}

export async function deleteRoom(roomName: string): Promise<void> {
  if (!videoConfigured()) return;
  await fetch(`${API}/rooms/${roomName}`, { method: 'DELETE', headers: headers(), signal: AbortSignal.timeout(10000) }).catch(() => undefined);
}

/** Jeton d'accès temporaire, lié à l'utilisateur. Seul le professeur est propriétaire (peut couper les micros). */
export async function createMeetingToken(args: {
  roomName: string;
  userId: string;
  userName: string;
  isOwner: boolean;
  expiresAt: Date;
}): Promise<{ ok: true; token: string; url: string } | { ok: false; error: string }> {
  if (!videoConfigured()) return { ok: false, error: 'video_not_configured' };
  const res = await fetch(`${API}/meeting-tokens`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      properties: {
        room_name: args.roomName,
        user_id: args.userId,
        user_name: args.userName,
        is_owner: args.isOwner,
        exp: Math.floor(args.expiresAt.getTime() / 1000),
        enable_screenshare: true,
        start_video_off: false,
        start_audio_off: !args.isOwner,
      },
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return { ok: false, error: `daily_${res.status}` };
  const json = (await res.json()) as { token: string };
  return { ok: true, token: json.token, url: `https://${serverEnv().dailyDomain}.daily.co/${args.roomName}` };
}

export type SessionPhase = 'unavailable' | 'upcoming' | 'live' | 'ended' | 'cancelled';

/** Phase d'une séance : ouverture 10 min avant le début, fermeture 30 min après la fin. */
export function sessionPhase(s: { status: string; starts_at: string; ends_at: string; room_name: string | null }, now = new Date()): SessionPhase {
  if (s.status === 'cancelled') return 'cancelled';
  const start = new Date(s.starts_at).getTime();
  const end = new Date(s.ends_at).getTime();
  const t = now.getTime();
  if (t > end + 30 * 60_000) return 'ended';
  if (t >= start - 10 * 60_000) return s.room_name ? 'live' : 'unavailable';
  return 'upcoming';
}
