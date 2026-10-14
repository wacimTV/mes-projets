import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Card, Placeholder } from '@/components/ui';

export const metadata: Metadata = { title: 'Programme des trois mois', description: 'Structure du programme de la formation CALAME sur trois mois.' };

export default function Page() {
  return (
    <InfoPage eyebrow="Programme" title="Programme des trois mois" intro="Le contenu est organisé par séances et par chapitres ; chaque classe suit les textes et exercices correspondant à son niveau.">
      <Card title="Structure">
        <ul>
          <li>Trois mois, six heures de cours par semaine</li>
          <li>Contenus répartis par séance et par chapitre</li>
          <li>Un parcours adapté au niveau de chaque classe (A, B ou C)</li>
          <li>Supports et exercices publiés par l&apos;administration avant et pendant la formation</li>
        </ul>
      </Card>
      <Placeholder>Le détail du programme (chapitres, objectifs précis, progression semaine par semaine) n&apos;a pas été fourni : le PDF de présentation de la formation est manquant. Aucun chapitre ni objectif n&apos;est inventé ici.</Placeholder>
    </InfoPage>
  );
}
