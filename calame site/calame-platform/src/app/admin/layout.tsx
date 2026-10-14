import type { ReactNode } from 'react';
import { AppShell, type NavItem } from '@/components/app-shell';
import { requireRole } from '@/lib/auth';
import { createSupabaseServer } from '@/lib/supabase/server';
import { signOut } from '@/app/actions/auth';


export default async function AdminLayout({ children }: { children: ReactNode }) {
  const profile = await requireRole('admin');
  const supabase = await createSupabaseServer();
  const [{ count: appts }, { count: unread }] = await Promise.all([
    supabase.from('appointments').select('id', { count: 'exact', head: true }).in('status', ['requested', 'pending_validation']),
    supabase.from('notifications').select('id', { count: 'exact', head: true }).is('read_at', null),
  ]);
  const items: NavItem[] = [
    { href: '/admin', label: 'Tableau de bord' },
    { href: '/admin/rendez-vous', label: 'Rendez-vous', badge: appts ?? 0 },
    { href: '/admin/tests', label: 'Tests de niveau' },
    { href: '/admin/eleves', label: 'Élèves' },
    { href: '/admin/professeurs', label: 'Professeurs' },
    { href: '/admin/classes', label: 'Classes' },
    { href: '/admin/planning', label: 'Planning' },
    { href: '/admin/exercices', label: 'Exercices' },
    { href: '/admin/ressources', label: 'Ressources' },
    { href: '/admin/bibliotheque', label: 'Bibliothèque culturelle' },
    { href: '/admin/presences', label: 'Présences' },
    { href: '/admin/paiements', label: 'Paiements' },
    { href: '/admin/messages', label: 'Messages' },
    { href: '/admin/notifications', label: 'Notifications', badge: unread ?? 0 },
    { href: '/admin/parametres', label: 'Paramètres' },
    { href: '/admin/journal', label: 'Journal' },
  ];
  return <AppShell items={items} userName={profile.full_name} roleLabel="Administration" signOut={signOut}>{children}</AppShell>;
}
