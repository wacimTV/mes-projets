import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { ActionForm, Checkbox, Field, Select, SubmitButton, TextArea } from '@/components/forms';
import { Alert } from '@/components/ui';
import { requestAppointment } from '@/app/actions/public';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { fmtDay, fmtTime } from '@/lib/time';
import { publicEnv } from '@/lib/env';

export const metadata: Metadata = { title: 'Prendre rendez-vous', description: 'Demandez un rendez-vous pour votre test de niveau en arabe (oral et écrit, environ 30 minutes, en visioconférence).' };

export default async function Page() {
  let slots: Array<{ value: string; label: string }> = [];
  const configured = Boolean(publicEnv.supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (configured) {
    const admin = createSupabaseAdmin();
    const { data } = await admin.from('appointment_slots').select('id, starts_at').eq('is_booked', false).gt('starts_at', new Date().toISOString()).order('starts_at').limit(60);
    slots = (data ?? []).map((s: { id: string; starts_at: string }) => ({ value: s.id, label: `${fmtDay(s.starts_at)} à ${fmtTime(s.starts_at)} (heure de Paris)` }));
  }
  return (
    <InfoPage eyebrow="Test de niveau" title="Prendre rendez-vous" intro="Le test de niveau dure environ 30 minutes (ou moins), en visioconférence, avec une partie orale et une partie écrite. Il est obligatoire avant l'inscription.">
      {!configured ? <Alert tone="warn">La prise de rendez-vous nécessite la configuration de la base de données (voir README).</Alert> : null}
      <div className="card max-w-xl">
        <ActionForm action={requestAppointment} resetOnSuccess>
          <Field name="visitor_name" label="Nom et prénom" required autoComplete="name" />
          <Field name="visitor_email" label="Adresse email" type="email" required autoComplete="email" inputMode="email" />
          <Field name="visitor_phone" label="Téléphone (facultatif)" type="tel" autoComplete="tel" inputMode="tel" />
          <Field name="visitor_age" label="Âge" type="number" required min={15} max={99} hint="La formation est ouverte à partir de 15 ans." inputMode="numeric" />
          {slots.length > 0
            ? <Select name="slot_id" label="Créneau souhaité" options={slots} hint="Sans créneau, l'administration vous proposera une date." />
            : <p className="hint mb-4">Aucun créneau n&apos;est publié pour le moment : l&apos;administration vous proposera une date.</p>}
          <TextArea name="message" label="Message (facultatif)" maxLength={2000} hint="Votre niveau approximatif, vos disponibilités…" />
          <div aria-hidden="true" className="hidden"><label>Ne pas remplir<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <Checkbox name="consent" required label={<>J&apos;accepte que mes données soient utilisées pour organiser mon test de niveau (voir la <a href="/confidentialite">politique de confidentialité</a>).</>} />
          <SubmitButton>Envoyer ma demande</SubmitButton>
        </ActionForm>
      </div>
    </InfoPage>
  );
}
