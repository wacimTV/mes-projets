import 'server-only';
import { publicEnv, serverEnv } from '@/lib/env';

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

/** Gabarit d'email transactionnel aux couleurs de CALAME. */
export function renderEmail(opts: { title: string; body: string; ctaLabel?: string; ctaUrl?: string }): { html: string; text: string } {
  const cta = opts.ctaUrl && opts.ctaLabel
    ? `<p style="margin:28px 0"><a href="${escapeHtml(opts.ctaUrl)}" style="background:#405C43;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:600;display:inline-block">${escapeHtml(opts.ctaLabel)}</a></p>`
    : '';
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif;color:#1f2a22">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:12px;overflow:hidden">
<tr><td style="background:#405C43;padding:20px 28px;color:#fff;font-size:22px;letter-spacing:2px">CALAME <span style="opacity:.8;font-size:20px">· قَلَم</span></td></tr>
<tr><td style="padding:28px"><h1 style="font-size:20px;margin:0 0 16px">${escapeHtml(opts.title)}</h1>
<div style="font-size:15px;line-height:1.6">${opts.body}</div>${cta}</td></tr>
<tr><td style="padding:16px 28px;background:#f4f1ea;font-size:12px;color:#5a665d">CALAME – Apprenez | Parlez | Échangez<br>Vous recevez cet email car vous avez un compte ou une demande en cours auprès de CALAME.</td></tr>
</table></td></tr></table></body></html>`;
  const text = `${opts.title}\n\n${opts.body.replace(/<[^>]+>/g, '')}\n${opts.ctaUrl ? `\n${opts.ctaLabel}: ${opts.ctaUrl}\n` : ''}\nCALAME – Apprenez | Parlez | Échangez`;
  return { html, text };
}

export type EmailResult = { ok: true; id?: string } | { ok: false; error: string; skipped?: boolean };

/** Envoi via l'API Resend (côté serveur uniquement). */
export async function sendEmail(to: string, subject: string, content: { html: string; text: string }): Promise<EmailResult> {
  const { resendKey, emailFrom } = serverEnv();
  if (!resendKey || !emailFrom) return { ok: false, skipped: true, error: 'email_not_configured' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: emailFrom, to: [to], subject, html: content.html, text: content.text }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return { ok: false, error: `resend_${res.status}` };
    const json = (await res.json()) as { id?: string };
    return { ok: true, id: json.id };
  } catch {
    return { ok: false, error: 'network_error' };
  }
}

export const absoluteUrl = (path: string) => new URL(path, publicEnv.siteUrl).toString();
