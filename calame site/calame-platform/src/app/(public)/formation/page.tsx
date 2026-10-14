import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPage } from '@/components/info-page';
import { Card } from '@/components/ui';

export const metadata: Metadata = { title: 'La formation', description: 'Formation en arabe de trois mois : six heures par semaine, classes de 10 à 12 élèves, niveaux A, B et C.' };

export default function Page() {
  return (
    <InfoPage eyebrow="La formation" title="Formation en arabe en trois mois" intro="Six heures de cours par semaine, soit 72 heures, en visioconférence avec un professeur et une classe de 10 à 12 élèves.">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Organisation">
          <ul>
            <li>Durée : 3 mois</li>
            <li>Volume : 6 heures par semaine (72 heures)</li>
            <li>Classes organisées par niveau, avec un professeur par classe</li>
            <li>Cours en direct en visioconférence, caméra active</li>
            <li>Exercices à réaliser directement sur la plateforme</li>
          </ul>
        </Card>
        <Card title="Suivi pédagogique">
          <ul>
            <li>Suivi de la présence et de la durée de connexion</li>
            <li>Corrections manuelles et appréciations du professeur</li>
            <li>Observations sur la participation orale</li>
            <li>Évaluation finale à l&apos;issue des trois mois</li>
          </ul>
        </Card>
      </div>
      <Card title="Accès à la formation">
        <p>L&apos;entrée se fait après un test de niveau (oral et écrit, environ 30 minutes), la validation du niveau par l&apos;administration pédagogique, la création de votre compte puis le paiement.</p>
        <p>À la fin des trois mois, l&apos;accès aux documents et à la bibliothèque culturelle est retiré. La suite éventuelle (autre formation) reste à définir.</p>
        <Link href="/rendez-vous" className="btn btn-primary mt-2">Prendre rendez-vous</Link>
      </Card>
    </InfoPage>
  );
}
