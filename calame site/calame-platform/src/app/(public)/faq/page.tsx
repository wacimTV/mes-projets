import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Placeholder } from '@/components/ui';

export const metadata: Metadata = { title: 'FAQ', description: 'Questions fréquentes sur la formation en arabe CALAME.' };

const FAQ: Array<[string, string]> = [
  ['À qui s\'adresse la formation ?', 'Aux adolescents à partir de 15 ans et aux adultes, principalement débutants.'],
  ['Combien de temps dure-t-elle ?', 'Trois mois, à raison de six heures de cours par semaine (72 heures).'],
  ['Combien coûte-t-elle ?', '430 €, payables en une, deux ou trois fois.'],
  ['Comment s\'inscrire ?', 'Demandez un rendez-vous pour un test de niveau (oral et écrit, environ 30 minutes, en visioconférence). Après validation de votre niveau, l\'académie crée votre compte ; l\'accès est activé après paiement.'],
  ['Quels sont les niveaux ?', 'A : débutant complet ; B : lecture et écriture difficiles, sans arabe parlé ; C : lecture et écriture débutantes avec quelques notions d\'arabe parlé.'],
  ['Combien d\'élèves par classe ?', 'Dix à douze élèves, avec un professeur.'],
  ['Puis-je suivre les cours depuis mon téléphone ?', 'Oui, la plateforme et la visioconférence sont adaptées aux ordinateurs, tablettes et téléphones.'],
  ['Les cours sont-ils enregistrés ?', 'Non, aucun enregistrement n\'est effectué par défaut.'],
  ['Comment me connecter ?', 'Sans mot de passe : un code à usage unique est envoyé à votre adresse email.'],
  ['Que se passe-t-il à la fin des trois mois ?', 'Une évaluation finale est effectuée ; l\'accès aux documents et à la bibliothèque culturelle est retiré. La possibilité de poursuivre avec une autre formation reste à définir.'],
  ['Que faire si mon paiement échoue ?', 'Contactez l\'académie pour résoudre le problème ; vous pouvez aussi réessayer depuis votre espace.'],
];

export default function Page() {
  return (
    <InfoPage eyebrow="FAQ" title="Questions fréquentes">
      <div className="grid gap-3">
        {FAQ.map(([q, a]) => (
          <details key={q} className="card group">
            <summary className="cursor-pointer font-semibold">{q}</summary>
            <p className="mt-2 muted">{a}</p>
          </details>
        ))}
      </div>
      <Placeholder>Cette FAQ est construite à partir des réponses du questionnaire ; elle sera complétée et validée par le responsable.</Placeholder>
    </InfoPage>
  );
}
