/**
 * Limiteur de débit en mémoire (fenêtre glissante).
 * Limite : l'état est local à chaque instance serverless. Pour une protection forte en production
 * multi-instances, brancher un stockage partagé (Upstash Redis, etc.) — voir docs/security.md.
 * La protection d'authentification de Supabase (limites d'envoi d'OTP) s'ajoute à celle-ci.
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number, now = Date.now()): { allowed: boolean; retryAfterSec: number } {
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    buckets.set(key, hits);
    return { allowed: false, retryAfterSec: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
  }
  return { allowed: true, retryAfterSec: 0 };
}

export function resetRateLimits() {
  buckets.clear();
}
