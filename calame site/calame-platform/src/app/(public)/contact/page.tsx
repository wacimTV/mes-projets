import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { ActionForm, Checkbox, Field, SubmitButton, TextArea } from '@/components/forms';
import { sendContactMessage } from '@/app/actions/public';

export const metadata: Metadata = { title: 'Contact', description: "Contacter l'académie CALAME." };

export default function Page() {
  return (
    <InfoPage eyebrow="Contact" title="Écrivez-nous" intro="Une question sur la formation ? Envoyez-nous un message, l'académie vous répondra par email.">
      <div className="card max-w-xl">
        <ActionForm action={sendContactMessage} resetOnSuccess>
          <Field name="name" label="Nom" required autoComplete="name" />
          <Field name="email" label="Adresse email" type="email" required autoComplete="email" inputMode="email" />
          <TextArea name="message" label="Message" required maxLength={3000} />
          <div aria-hidden="true" className="hidden"><label>Ne pas remplir<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <Checkbox name="consent" required label={<>J&apos;accepte que mes données soient utilisées pour répondre à ma demande (voir la <a href="/confidentialite">politique de confidentialité</a>).</>} />
          <SubmitButton>Envoyer le message</SubmitButton>
        </ActionForm>
      </div>
    </InfoPage>
  );
}
