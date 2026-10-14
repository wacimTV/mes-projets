import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Card, Placeholder } from '@/components/ui';

export const metadata: Metadata = { title: 'Méthode pédagogique', description: "La méthode pédagogique de CALAME : dialogue oral, lecture, écriture et travail personnel." };

export default function Page() {
  return (
    <InfoPage eyebrow="Méthode" title="Une pédagogie centrée sur le dialogue" intro="Des cours proches d'un cours en présentiel : caméra active, interaction entre les participants et exercices réalisés entre les séances.">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="En cours"><p>Compréhension orale, dialogue, lecture et écriture. Le professeur partage l&apos;écran pour projeter la page du cours et utilise un tableau d&apos;écriture adapté à l&apos;arabe.</p></Card>
        <Card title="Entre les cours"><p>Les cours et exercices sélectionnés sont mis à disposition : vous les téléchargez, travaillez dessus et répondez directement sur la plateforme.</p></Card>
        <Card title="Accompagnement"><p>Corrections manuelles, appréciations personnalisées et échanges individuels avec votre professeur.</p></Card>
        <Card title="Évaluation"><p>Pas de notes ni de moyennes : des remarques pédagogiques et une évaluation finale à la fin des trois mois.</p></Card>
      </div>
      <Placeholder>La description détaillée de la méthode (déroulé d&apos;une séance, supports, techniques) doit être rédigée ou validée par le responsable.</Placeholder>
    </InfoPage>
  );
}
