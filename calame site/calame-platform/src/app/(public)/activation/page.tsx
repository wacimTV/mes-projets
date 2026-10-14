import type { Metadata } from 'next';
import { LoginPanel } from '@/components/login-panel';

export const metadata: Metadata = { title: 'Activation du compte', robots: { index: false } };

export default function Page() {
  return <LoginPanel activation />;
}
