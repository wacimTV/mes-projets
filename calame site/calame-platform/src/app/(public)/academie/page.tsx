import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Card, Placeholder } from '@/components/ui';

export const metadata: Metadata = { title: "L'académie", description: "Présentation de CALAME – قَلَم, académie de formation en langue arabe à distance." };

export default function Page() {
  return (
    <InfoPage eyebrow="CALAME – قَلَم" title="Une académie de langue arabe à distance" intro="Apprenez | Parlez | Échangez. CALAME propose une formation en arabe en visioconférence, pour adolescents (à partir de 15 ans) et adultes.">
      <Card title="Notre démarche">
        <p>La formation initiale dure trois mois, à raison de six heures de cours par semaine. Elle s&apos;adresse principalement à des débutants et place le dialogue oral au cœur des séances, avec la lecture, l&apos;écriture et le travail personnel.</p>
        <p>Chaque élève bénéficie d&apos;un suivi : assiduité, travaux réalisés, participation orale et appréciations personnalisées de son professeur.</p>
      </Card>
      <Card title="Une plateforme complète">
        <p>Cours en direct, planning, exercices à réaliser en ligne, ressources pédagogiques, messagerie avec le professeur, et une bibliothèque culturelle privée consacrée à la langue, à la littérature et à la culture arabes.</p>
      </Card>
      <Placeholder>Le texte de présentation détaillé de l&apos;académie (histoire, équipe, valeurs) doit être fourni par le responsable.</Placeholder>
    </InfoPage>
  );
}
