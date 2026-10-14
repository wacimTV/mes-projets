import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';
import { getCurrentProfile, getStudentAccess } from '@/lib/auth';
import { signedUrl } from '@/lib/files';


/**
 * Téléchargement protégé : le droit de lecture est vérifié via la RLS (client de l'utilisateur) ;
 * l'URL signée (60 s) n'est émise que si la ligne est visible par l'utilisateur.
 * GET /api/download?kind=resource|submission|culture&id=<uuid>[&inline=1]
 */
export async function GET(request: NextRequest) {
  const kind = request.nextUrl.searchParams.get('kind');
  const id = request.nextUrl.searchParams.get('id') ?? '';
  const inline = request.nextUrl.searchParams.get('inline') === '1';
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });

  const profile = await getCurrentProfile();
  if (!profile || profile.status !== 'active') return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (profile.role === 'student' && !(await getStudentAccess(profile.id)).allowed) return NextResponse.json({ error: 'access_expired' }, { status: 403 });

  const supabase = await createSupabaseServer();
  let bucket: 'resources' | 'submissions' | 'culture';
  let path: string | null = null;
  let name: string | undefined;

  if (kind === 'resource') {
    bucket = 'resources';
    const { data } = await supabase.from('resources').select('storage_path, title').eq('id', id).maybeSingle();
    path = data?.storage_path ?? null;
    name = data?.title;
  } else if (kind === 'culture') {
    bucket = 'culture';
    const { data } = await supabase.from('cultural_items').select('storage_path, title, allow_download').eq('id', id).maybeSingle();
    path = data?.storage_path ?? null;
    name = data?.title;
    // Téléchargement (pièce jointe) uniquement si autorisé ; la consultation en ligne reste possible
    if (data && !inline && !data.allow_download && profile.role === 'student') return NextResponse.json({ error: 'download_not_allowed' }, { status: 403 });
  } else if (kind === 'submission') {
    bucket = 'submissions';
    const { data } = await supabase.from('submission_files').select('storage_path, file_name').eq('id', id).maybeSingle();
    path = data?.storage_path ?? null;
    name = data?.file_name;
  } else {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  if (!path) return NextResponse.json({ error: 'not_found' }, { status: 404 }); // inexistant OU non autorisé : même réponse
  const url = await signedUrl(bucket, path, inline ? undefined : name);
  if (!url) return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  return NextResponse.redirect(url, { status: 302, headers: { 'Cache-Control': 'private, no-store' } });
}
