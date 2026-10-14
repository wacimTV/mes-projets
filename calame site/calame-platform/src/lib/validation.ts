import { z } from 'zod';

/** Types MIME autorisés pour les dépôts (liste blanche) avec extension attendue. */
export const ALLOWED_FILES: Record<string, { ext: string[]; kind: 'pdf' | 'image' | 'audio' | 'video' | 'document' | 'other' }> = {
  'application/pdf': { ext: ['pdf'], kind: 'pdf' },
  'image/jpeg': { ext: ['jpg', 'jpeg'], kind: 'image' },
  'image/png': { ext: ['png'], kind: 'image' },
  'image/webp': { ext: ['webp'], kind: 'image' },
  'audio/mpeg': { ext: ['mp3'], kind: 'audio' },
  'audio/mp4': { ext: ['m4a'], kind: 'audio' },
  'audio/wav': { ext: ['wav'], kind: 'audio' },
  'audio/webm': { ext: ['webm', 'weba'], kind: 'audio' },
  'audio/ogg': { ext: ['ogg'], kind: 'audio' },
  'video/mp4': { ext: ['mp4'], kind: 'video' },
  'video/webm': { ext: ['webm'], kind: 'video' },
  'application/msword': { ext: ['doc'], kind: 'document' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { ext: ['docx'], kind: 'document' },
  'text/plain': { ext: ['txt'], kind: 'other' },
};

export const MAX_STUDENT_FILE_BYTES = 25 * 1024 * 1024;
export const MAX_RESOURCE_FILE_BYTES = 200 * 1024 * 1024;
/** Les élèves ne déposent pas de vidéo (taille/stockage) : documents, images, audio. */
const STUDENT_KINDS = new Set(['pdf', 'image', 'audio', 'document', 'other']);

export type FileCheck = { ok: true; kind: 'pdf' | 'image' | 'audio' | 'video' | 'document' | 'other'; ext: string } | { ok: false; error: string };

export function validateUpload(file: { name: string; type: string; size: number }, who: 'student' | 'admin'): FileCheck {
  const spec = ALLOWED_FILES[file.type];
  if (!spec) return { ok: false, error: "Ce type de fichier n'est pas autorisé." };
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!spec.ext.includes(ext)) return { ok: false, error: "L'extension du fichier ne correspond pas à son type." };
  if (file.size <= 0) return { ok: false, error: 'Le fichier est vide.' };
  const max = who === 'student' ? MAX_STUDENT_FILE_BYTES : MAX_RESOURCE_FILE_BYTES;
  if (file.size > max) return { ok: false, error: `Le fichier dépasse la taille maximale (${Math.round(max / 1024 / 1024)} Mo).` };
  if (who === 'student' && !STUDENT_KINDS.has(spec.kind)) return { ok: false, error: "Ce format n'est pas accepté pour un rendu." };
  return { ok: true, kind: spec.kind, ext };
}

/** Vérifie la signature binaire (magic bytes) pour les formats courants. */
export function sniffMatches(bytes: Uint8Array, mime: string): boolean {
  const startsWith = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  switch (mime) {
    case 'application/pdf': return startsWith([0x25, 0x50, 0x44, 0x46]);
    case 'image/png': return startsWith([0x89, 0x50, 0x4e, 0x47]);
    case 'image/jpeg': return startsWith([0xff, 0xd8, 0xff]);
    case 'image/webp': return startsWith([0x52, 0x49, 0x46, 0x46]);
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return startsWith([0x50, 0x4b, 0x03, 0x04]);
    case 'application/msword': return startsWith([0xd0, 0xcf, 0x11, 0xe0]);
    default: return true; // formats sans signature fiable : contrôle MIME + extension uniquement
  }
}

export function safeFileName(name: string): string {
  return name.normalize('NFKD').replace(/[^\w.\-]+/g, '_').replace(/_+/g, '_').slice(-100) || 'fichier';
}

// ───────────── Schémas de validation (côté serveur) ─────────────
const email = z.string().trim().toLowerCase().email('Adresse email invalide').max(254);
const uuid = z.string().uuid('Identifiant invalide');

export const loginEmailSchema = z.object({ email });
export const otpSchema = z.object({ email, code: z.string().trim().regex(/^\d{6,8}$/, 'Le code doit contenir uniquement des chiffres') });

export const appointmentSchema = z.object({
  visitor_name: z.string().trim().min(2, 'Indiquez votre nom').max(120),
  visitor_email: email,
  visitor_phone: z.string().trim().max(30).optional().or(z.literal('')),
  visitor_age: z.coerce.number().int('Âge invalide').min(15, "L'âge minimum est de 15 ans").max(99, 'Âge invalide'),
  slot_id: uuid.optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  consent: z.literal('on', { message: 'Vous devez accepter le traitement de vos données' }),
  website: z.string().max(0).optional(), // champ piège anti-robots
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Indiquez votre nom').max(120),
  email,
  message: z.string().trim().min(10, 'Message trop court').max(3000),
  consent: z.literal('on', { message: 'Vous devez accepter le traitement de vos données' }),
  website: z.string().max(0).optional(),
});

export const inviteSchema = z.object({
  email,
  full_name: z.string().trim().min(2).max(120),
  role: z.enum(['student', 'teacher']),
  level_code: z.enum(['A', 'B', 'C']).optional().or(z.literal('')),
});

export const classSchema = z.object({
  name: z.string().trim().min(2).max(80),
  level_code: z.enum(['A', 'B', 'C']),
  teacher_id: uuid.optional().or(z.literal('')),
  capacity: z.coerce.number().int().min(1).max(30).default(12),
});

export const sessionSchema = z.object({
  class_id: uuid,
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(4000).optional().or(z.literal('')),
  starts_at: z.string().min(1),
  ends_at: z.string().min(1),
});

export const exerciseSchema = z.object({
  class_id: uuid,
  title: z.string().trim().min(2).max(160),
  instructions: z.string().trim().max(8000).default(''),
  kind: z.enum(['qcm', 'written', 'fill_blank', 'reading', 'audio', 'file_upload']),
  due_at: z.string().optional().or(z.literal('')),
  allow_edit_after_submit: z.string().optional(),
});

export const appreciationSchema = z.object({
  student_id: uuid,
  context: z.string().trim().min(2).max(200),
  skill: z.enum(['oral_comprehension', 'speaking', 'reading', 'writing', 'participation', 'personal_work', 'other']),
  appreciation: z.string().trim().min(2).max(2000),
  comment: z.string().trim().max(2000).optional().or(z.literal('')),
  publish: z.string().optional(),
});

export const messageSchema = z.object({ conversation_id: uuid, body: z.string().trim().min(1, 'Message vide').max(4000) });

export const SKILL_LABELS: Record<string, string> = {
  oral_comprehension: 'Compréhension orale',
  speaking: 'Expression orale / dialogue',
  reading: 'Lecture',
  writing: 'Écriture',
  participation: 'Participation orale',
  personal_work: 'Travail personnel',
  other: 'Autre',
};

export type ActionState = { ok?: boolean; error?: string; message?: string; fieldErrors?: Record<string, string> } | null;

export function zodFieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
