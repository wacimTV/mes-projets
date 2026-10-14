import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Alert, Card } from '@/components/ui';

export const metadata: Metadata = { title: 'Cookies et traceurs' };

export default function Page() {
  return (
    <InfoPage eyebrow="Légal" title="Cookies et traceurs">
      <Alert tone="warn">Document provisoire à valider. À réviser si des outils de mesure d&apos;audience ou des services tiers sont ajoutés.</Alert>
      <Card title="Ce que le site utilise">
        <p>CALAME n&apos;utilise que des cookies strictement nécessaires : la session de connexion sécurisée. Aucun traceur publicitaire ni outil de mesure d&apos;audience n&apos;est installé ; aucun bandeau de consentement n&apos;est donc requis en l&apos;état.</p>
        <p>Lors d&apos;un cours en direct, le service de visioconférence peut utiliser ses propres mécanismes techniques pour établir l&apos;appel.</p>
      </Card>
    </InfoPage>
  );
}
