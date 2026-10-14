import 'server-only';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { HOME_BY_ROLE, type Role } from '@/lib/auth';

/** Active les comptes invités (première connexion vérifiée) et retourne le rôle, ou null si le compte est bloqué. */
export async function finalizeLogin(userId: string): Promise<Role | null> {
  const admin = createSupabaseAdmin();
  const { data: p } = await admin.from('profiles').select('role, status').eq('id', userId).maybeSingle();
  if (!p || p.status === 'suspended' || p.status === 'archived') return null;
  if (p.status === 'invited') {
    // Les élèves restent bloqués côté pédagogique tant que le paiement n'est pas confirmé (voir getStudentAccess).
    await admin.from('profiles').update({ status: 'active' }).eq('id', userId);
  }
  return p.role as Role;
}

/** Empêche les redirections ouvertes : uniquement des chemins internes autorisés pour le rôle. */
export function resolveNext(next: string, role: Role): string {
  const home = HOME_BY_ROLE[role];
  if (!next.startsWith('/') || next.startsWith('//') || next.includes('\\')) return home;
  return next === home || next.startsWith(home + '/') ? next : home;
}
