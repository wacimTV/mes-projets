import { ActionForm, Field, SubmitButton } from '@/components/forms';
import { Alert } from '@/components/ui';
import { requestLoginCode, verifyLoginCode } from '@/app/actions/auth';

const ERRORS: Record<string, string> = {
  session: 'Votre session a expiré ou vous devez vous connecter pour accéder à cette page.',
  suspended: "Ce compte est suspendu ou archivé. Contactez l'académie.",
  inactive: "Ce compte n'est pas encore activé. Utilisez le code reçu par email.",
  link: 'Ce lien de connexion est invalide ou expiré. Demandez un nouveau code.',
  config: "La plateforme n'est pas encore configurée (base de données).",
};

export function LoginPanel({ error, signedOut, next, activation }: { error?: string; signedOut?: boolean; next?: string; activation?: boolean }) {
  return (
    <div className="container-page grid min-h-[70vh] items-start gap-8 py-12 md:grid-cols-2">
      <div className="reveal">
        <p className="eyebrow">{activation ? 'Activation du compte' : 'Connexion'}</p>
        <h1>{activation ? 'Activez votre compte' : 'Accédez à votre espace'}</h1>
        <p className="muted mt-3 max-w-[48ch]">
          {activation
            ? "Vous avez reçu une invitation de l'académie. Saisissez l'adresse email de l'invitation : nous vous envoyons un code de vérification qui active votre compte."
            : "Il n'y a pas de mot de passe à retenir : un code à usage unique est envoyé à votre adresse email. Les comptes sont créés par l'académie."}
        </p>
        {signedOut ? <div className="mt-4"><Alert tone="ok">Vous êtes déconnecté.</Alert></div> : null}
        {error && ERRORS[error] ? <div className="mt-4"><Alert tone="warn">{ERRORS[error]}</Alert></div> : null}
      </div>
      <div className="grid gap-5">
        <section className="card" aria-labelledby="step1">
          <h2 id="step1" style={{ fontSize: '1.1rem' }} className="mb-3">1. Recevoir un code</h2>
          <ActionForm action={requestLoginCode}>
            <Field name="email" label="Adresse email" type="email" required autoComplete="email" inputMode="email" />
            <SubmitButton pendingLabel="Envoi…">Envoyer le code</SubmitButton>
          </ActionForm>
        </section>
        <section className="card" aria-labelledby="step2">
          <h2 id="step2" style={{ fontSize: '1.1rem' }} className="mb-3">2. Saisir le code reçu</h2>
          <ActionForm action={verifyLoginCode}>
            <Field name="email" label="Adresse email" type="email" required autoComplete="email" inputMode="email" />
            <Field name="code" label="Code à usage unique" required inputMode="numeric" autoComplete="one-time-code" maxLength={8} hint="Code numérique reçu par email." />
            <input type="hidden" name="next" value={next ?? ''} />
            <SubmitButton pendingLabel="Vérification…">Se connecter</SubmitButton>
          </ActionForm>
        </section>
      </div>
    </div>
  );
}
