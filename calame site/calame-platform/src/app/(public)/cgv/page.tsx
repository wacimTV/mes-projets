import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Alert, Card, Placeholder } from '@/components/ui';

export const metadata: Metadata = { title: 'Conditions générales et remboursement' };

export default function Page() {
  return (
    <InfoPage eyebrow="Légal" title="Conditions générales, paiement et remboursement">
      <Alert tone="warn">Document provisoire, non validé juridiquement. La politique de paiement et de remboursement doit être définie et validée par le responsable de CALAME.</Alert>
      <Card title="Éléments connus">
        <ul>
          <li>Formation de trois mois, six heures de cours par semaine.</li>
          <li>Prix : 430 €, payable en une, deux ou trois fois.</li>
          <li>L&apos;accès est activé après confirmation du paiement, selon la règle définie par l&apos;académie.</li>
          <li>En cas d&apos;échec de paiement, l&apos;élève contacte l&apos;académie.</li>
          <li>À la fin des trois mois, l&apos;accès aux documents et à la bibliothèque culturelle est retiré.</li>
        </ul>
      </Card>
      <Placeholder>Droit de rétractation, conditions de remboursement, absences, report de séances, règles de conduite en cours, propriété intellectuelle des supports, médiateur de la consommation, identité du vendeur.</Placeholder>
    </InfoPage>
  );
}
