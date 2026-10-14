'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
import { clientIp } from '@/lib/auth';
import { finalizeLogin, resolveNext } from '@/lib/login';
import { rateLimit } from '@/lib/rate-limit';
import { loginEmailSchema, otpSchema, zodFieldErrors, type ActionState } from '@/lib/validation';
import { publicEnv } from '@/lib/env';

const GENERIC_SENT = 'Si cette adresse correspond à un compte CALAME, un code de connexion vient de lui être envoyé. Il est valable quelques minutes.';

/** Étape 1 : envoi d'un code à usage unique. La réponse est identique que le compte existe ou non. */
export async function requestLoginCode(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = loginEmailSchema.safeParse({ email: fd.get('email') });
  if (!parsed.success) return { fieldErrors: zodFieldErrors(parsed.error), error: 'Vérifiez votre adresse email.' };
  if (!publicEnv.supabaseUrl) return { error: "La connexion n'est pas encore configurée (base de données manquante). Contactez l'académie." };

  const ip = await clientIp();
  const byIp = rateLimit(`otp-ip:${ip}`, 10, 15 * 60_000);
  const byEmail = rateLimit(`otp-mail:${parsed.data.email}`, 3, 10 * 60_000);
  if (!byIp.allowed || !byEmail.allowed) {
    return { error: `Trop de tentatives. Réessayez dans ${Math.max(byIp.retryAfterSec, byEmail.retryAfterSec)} secondes.` };
  }

  const supabase = await createSupabaseServer();
  // shouldCreateUser:false → aucun compte n'est créé par l'auto-inscription ; les erreurs ne sont pas divulguées.
  await supabase.auth.signInWithOtp({ email: parsed.data.email, options: { shouldCreateUser: false, emailRedirectTo: `${publicEnv.siteUrl}/auth/confirm` } });
  return { ok: true, message: GENERIC_SENT };
}

/** Étape 2 : vérification du code. Active un compte invité à la première connexion réussie. */
export async function verifyLoginCode(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = otpSchema.safeParse({ email: fd.get('email'), code: fd.get('code') });
  if (!parsed.success) return { fieldErrors: zodFieldErrors(parsed.error), error: 'Vérifiez les informations saisies.' };

  const ip = await clientIp();
  const limit = rateLimit(`verify:${ip}:${parsed.data.email}`, 8, 15 * 60_000);
  if (!limit.allowed) return { error: `Trop de tentatives. Réessayez dans ${limit.retryAfterSec} secondes.` };

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.verifyOtp({ email: parsed.data.email, token: parsed.data.code, type: 'email' });
  if (error || !data.user) return { error: 'Code invalide ou expiré. Demandez un nouveau code.' };

  const role = await finalizeLogin(data.user.id);
  if (!role) {
    await supabase.auth.signOut();
    return { error: "Ce compte n'est pas autorisé à accéder à la plateforme. Contactez l'académie." };
  }
  redirect(resolveNext(String(fd.get('next') ?? ''), role));
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect('/connexion?signedout=1');
}
