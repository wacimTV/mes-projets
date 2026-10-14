import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPage } from '@/components/info-page';
import { Card } from '@/components/ui';
import { formatEuros, splitAmount } from '@/lib/domain';

export const metadata: Metadata = { title: 'Tarifs', description: 'Formation en arabe de trois mois : 430 €, payable en une, deux ou trois fois.' };

export default function Page() {
  const total = 43000;
  return (
    <InfoPage eyebrow="Tarifs" title="430 € pour trois mois de formation" intro="Une seule formule, payable en une, deux ou trois fois. L'accès est activé après confirmation du paiement.">
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <Card key={n} title={n === 1 ? 'Paiement unique' : `${n} fois`} className="card-hover">
            <p className="stat">{formatEuros(total)}</p>
            <ul className="mt-3 text-sm">
              {splitAmount(total, n).map((a, i) => <li key={i}>Échéance {i + 1} : {formatEuros(a)}</li>)}
            </ul>
          </Card>
        ))}
      </div>
      <Card title="Modalités">
        <p>Paiement sécurisé en ligne par carte bancaire ; Apple Pay et Google Pay selon votre appareil. Aucun numéro de carte n&apos;est stocké par CALAME.</p>
        <p>En cas d&apos;échec de paiement, contactez l&apos;académie pour résoudre le problème. Les conditions de remboursement sont précisées dans les <Link href="/cgv">conditions générales</Link>.</p>
        <Link href="/rendez-vous" className="btn btn-primary mt-2">Commencer par le test de niveau</Link>
      </Card>
    </InfoPage>
  );
}
