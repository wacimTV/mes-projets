import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Alert, Card, Placeholder } from '@/components/ui';

export const metadata: Metadata = { title: 'Politique de confidentialité' };

export default function Page() {
  return (
    <InfoPage eyebrow="Légal" title="Politique de confidentialité">
      <Alert tone="warn">Document provisoire de travail, non validé juridiquement. Il doit être relu et complété par le responsable de CALAME (et idéalement un juriste) avant la mise en production.</Alert>
      <Card title="Données collectées">
        <ul>
          <li>Demande de rendez-vous : nom, email, téléphone (facultatif), âge, message.</li>
          <li>Compte élève ou professeur : nom, email, téléphone (facultatif), niveau, classe.</li>
          <li>Suivi pédagogique : présences, durées de connexion, rendus d&apos;exercices, corrections, appréciations, messages.</li>
          <li>Paiement : état et montant des échéances. Les numéros de carte sont traités par le prestataire de paiement et ne sont jamais stockés par CALAME.</li>
        </ul>
      </Card>
      <Card title="Finalités et accès">
        <p>Les données servent uniquement à organiser les tests de niveau, dispenser la formation, suivre l&apos;assiduité, gérer les paiements et communiquer avec les élèves. Un élève ne peut consulter que ses propres données ; un professeur uniquement celles de sa classe.</p>
      </Card>
      <Card title="Vos droits">
        <p>Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en écrivant à l&apos;académie via la page Contact. Les mineurs (à partir de 15 ans) peuvent nécessiter l&apos;accord d&apos;un représentant légal.</p>
      </Card>
      <Placeholder>Identité du responsable de traitement, adresse, contact DPO éventuel, durées de conservation, sous-traitants (hébergeur, base de données, paiement, visioconférence, emails) et transferts hors UE.</Placeholder>
    </InfoPage>
  );
}
