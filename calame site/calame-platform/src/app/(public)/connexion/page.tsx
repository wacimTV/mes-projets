import type { Metadata } from 'next';
import { LoginPanel } from '@/components/login-panel';

export const metadata: Metadata = { title: 'Connexion', robots: { index: false } };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return <LoginPanel error={sp.error} signedOut={sp.signedout === '1'} next={sp.next} />;
}
