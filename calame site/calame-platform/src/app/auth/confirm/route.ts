import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';
import { finalizeLogin, resolveNext } from '@/lib/login';


/** Lien magique : échange le token_hash de l'email contre une session. */
export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  const type = request.nextUrl.searchParams.get('type');
  const fail = () => NextResponse.redirect(new URL('/connexion?error=link', request.url));
  if (!tokenHash || (type !== 'email' && type !== 'magiclink')) return fail();

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'email' });
  if (error || !data.user) return fail();
  const role = await finalizeLogin(data.user.id);
  if (!role) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL('/connexion?error=suspended', request.url));
  }
  return NextResponse.redirect(new URL(resolveNext(request.nextUrl.searchParams.get('next') ?? '', role), request.url));
}
