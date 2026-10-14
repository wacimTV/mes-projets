import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Alert, Placeholder } from '@/components/ui';

export const metadata: Metadata = { title: 'Mentions légales' };

export default function Page() {
  return (
    <InfoPage eyebrow="Légal" title="Mentions légales">
      <Alert tone="warn">Document provisoire, non validé juridiquement.</Alert>
      <Placeholder>Raison sociale, forme juridique, adresse, SIRET, directeur de la publication, hébergeur du site, contact. Ces informations n&apos;ont pas été fournies.</Placeholder>
    </InfoPage>
  );
}
