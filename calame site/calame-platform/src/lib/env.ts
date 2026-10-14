/** Accès centralisé aux variables d'environnement. Les secrets ne sont lus que côté serveur. */

export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
};

export function serverEnv() {
  return {
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    stripeSecret: process.env.STRIPE_SECRET_KEY ?? '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    dailyApiKey: process.env.DAILY_API_KEY ?? '',
    dailyDomain: process.env.DAILY_DOMAIN ?? '',
    dailyWebhookSecret: process.env.DAILY_WEBHOOK_SECRET ?? '',
    resendKey: process.env.RESEND_API_KEY ?? '',
    emailFrom: process.env.EMAIL_FROM ?? '',
    cronSecret: process.env.CRON_SECRET ?? '',
  };
}

/** État de configuration des services externes (affiché à l'administration, sans jamais révéler de valeur). */
export function integrationStatus() {
  const e = serverEnv();
  return {
    database: Boolean(publicEnv.supabaseUrl && publicEnv.supabaseAnonKey && e.supabaseServiceKey),
    stripe: Boolean(e.stripeSecret && e.stripeWebhookSecret),
    video: Boolean(e.dailyApiKey && e.dailyDomain),
    videoWebhook: Boolean(e.dailyWebhookSecret),
    email: Boolean(e.resendKey && e.emailFrom),
    cron: Boolean(e.cronSecret),
  };
}

export const SITE_NAME = 'CALAME';
export const PLACEHOLDER_NOTICE = 'À valider par le responsable de CALAME';
