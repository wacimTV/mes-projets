import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Amiri } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const fraunces = Fraunces({ variable: '--font-fraunces', subsets: ['latin'], display: 'swap' });
const amiri = Amiri({ variable: '--font-amiri', subsets: ['arabic'], weight: ['400', '700'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'CALAME – قَلَم · Académie de langue arabe à distance', template: '%s · CALAME' },
  description: 'CALAME, formation en arabe à distance : trois mois, six heures de cours par semaine, dialogue oral et accompagnement pédagogique personnalisé.',
  openGraph: { title: 'CALAME – قَلَم', description: 'Apprenez | Parlez | Échangez — formation en arabe à distance.', locale: 'fr_FR', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#405C43', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable} ${amiri.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        {children}
      </body>
    </html>
  );
}
