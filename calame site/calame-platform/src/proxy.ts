import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const ROLE_PREFIX: Record<string, string> = { admin: '/admin', teacher: '/prof', student: '/eleve' };
const PRIVATE_PREFIXES = ['/admin', '/prof', '/eleve'];

/**
 * Proxy (ex-middleware) : rafraîchit la session et fait une vérification « optimiste » des routes privées.
 * L'autorisation réelle est refaite côté serveur dans chaque page/action (requireRole) et par la RLS.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivate = PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));
  const response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    if (isPrivate) return NextResponse.redirect(new URL('/connexion?error=config', request.url));
    return response;
  }

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  if (isPrivate && !data.user) {
    const login = new URL('/connexion', request.url);
    login.searchParams.set('next', pathname);
    login.searchParams.set('error', 'session');
    return NextResponse.redirect(login);
  }

  // En-têtes de sécurité complémentaires
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=()');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/|api/webhooks/|api/cron/).*)'],
};

export { ROLE_PREFIX };
