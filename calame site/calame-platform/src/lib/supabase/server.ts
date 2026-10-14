import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { publicEnv, serverEnv } from '@/lib/env';

/** Client lié à la session de l'utilisateur : la RLS s'applique. */
export async function createSupabaseServer(): Promise<SupabaseClient> {
  const cookieStore = await cookies();
  return createServerClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Appel depuis un Server Component : le rafraîchissement est géré par le proxy.
        }
      },
    },
  });
}

/** Client privilégié (service_role) : contourne la RLS. À n'utiliser qu'après vérification des droits. */
export function createSupabaseAdmin(): SupabaseClient {
  const key = serverEnv().supabaseServiceKey;
  if (!publicEnv.supabaseUrl || !key) throw new Error('supabase_not_configured');
  return createClient(publicEnv.supabaseUrl, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
