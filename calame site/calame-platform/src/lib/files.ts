import 'server-only';
import { randomUUID } from 'node:crypto';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { safeFileName, sniffMatches, validateUpload } from '@/lib/validation';

export type Bucket = 'resources' | 'submissions' | 'culture';

export interface StoredFile {
  path: string;
  mime: string;
  size: number;
  kind: 'pdf' | 'image' | 'audio' | 'video' | 'document' | 'other';
  name: string;
}

/** Valide (type, extension, taille, signature) puis stocke un fichier dans un bucket privé. */
export async function storeFile(bucket: Bucket, prefix: string, file: File, who: 'student' | 'admin'): Promise<{ ok: true; file: StoredFile } | { ok: false; error: string }> {
  const check = validateUpload({ name: file.name, type: file.type, size: file.size }, who);
  if (!check.ok) return check;
  const buf = new Uint8Array(await file.arrayBuffer());
  if (!sniffMatches(buf.subarray(0, 8), file.type)) return { ok: false, error: "Le contenu du fichier ne correspond pas à son type déclaré." };
  const path = `${prefix}/${randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await createSupabaseAdmin().storage.from(bucket).upload(path, buf, { contentType: file.type, upsert: false });
  if (error) return { ok: false, error: "Le fichier n'a pas pu être enregistré." };
  return { ok: true, file: { path, mime: file.type, size: file.size, kind: check.kind, name: file.name } };
}

export async function removeFile(bucket: Bucket, path: string): Promise<void> {
  await createSupabaseAdmin().storage.from(bucket).remove([path]);
}

/** URL signée valable 60 secondes. À n'appeler qu'après vérification des droits. */
export async function signedUrl(bucket: Bucket, path: string, downloadName?: string): Promise<string | null> {
  const { data } = await createSupabaseAdmin().storage.from(bucket).createSignedUrl(path, 60, downloadName ? { download: downloadName } : undefined);
  return data?.signedUrl ?? null;
}
