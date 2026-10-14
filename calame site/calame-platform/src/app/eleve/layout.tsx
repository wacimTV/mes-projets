import type { ReactNode } from 'react';
import { AppShell, type NavItem } from '@/components/app-shell';
import { requireRole } from '@/lib/auth';
import { createSupabaseServer } from '@/lib/supabase/server';
import { signOut } from '@/app/actions/auth';


export default async function StudentLayout({ children }: { children: ReactNode }) {
  const profile = await requireRole('student');
  const supabase = await createSupabaseServer();
  const { count: unread } = await supabase.from('notifications').select('id', { count: 'exact', head: true }).is('read_at', null);
  const items: NavItem[] = [
    { href: '/eleve', label: 'Tableau de bord' },
    { href: '/eleve/planning', label: 'Planning' },
    { href: '/eleve/exercices', label: 'Exercices' },
    { href: '/eleve/ressources', label: 'Ressources' },
    { href: '/eleve/bibliotheque', label: 'Bibliothèque culturelle' },
    { href: '/eleve/appreciations', label: 'Appréciations' },
    { href: '/eleve/presences', label: 'Présences' },
    { href: '/eleve/messages', label: 'Messages' },
    { href: '/eleve/paiement', label: 'Formation et paiement' },
    { href: '/eleve/notifications', label: 'Notifications', badge: unread ?? 0 },
  ];
  return <AppShell items={items} userName={profile.full_name} roleLabel="Élève" signOut={signOut}>{children}</AppShell>;
}
