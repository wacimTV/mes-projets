import type { ReactNode } from 'react';
import { AppShell, type NavItem } from '@/components/app-shell';
import { requireRole } from '@/lib/auth';
import { createSupabaseServer } from '@/lib/supabase/server';
import { signOut } from '@/app/actions/auth';


export default async function TeacherLayout({ children }: { children: ReactNode }) {
  const profile = await requireRole('teacher');
  const supabase = await createSupabaseServer();
  const { count: unread } = await supabase.from('notifications').select('id', { count: 'exact', head: true }).is('read_at', null);
  const items: NavItem[] = [
    { href: '/prof', label: 'Tableau de bord' },
    { href: '/prof/planning', label: 'Planning' },
    { href: '/prof/classe', label: 'Ma classe' },
    { href: '/prof/corrections', label: 'Corrections' },
    { href: '/prof/appreciations', label: 'Appréciations' },
    { href: '/prof/presences', label: 'Présences' },
    { href: '/prof/tests', label: 'Tests de niveau' },
    { href: '/prof/ressources', label: 'Ressources' },
    { href: '/prof/bibliotheque', label: 'Bibliothèque culturelle' },
    { href: '/prof/messages', label: 'Messages' },
    { href: '/prof/notifications', label: 'Notifications', badge: unread ?? 0 },
  ];
  return <AppShell items={items} userName={profile.full_name} roleLabel="Professeur" signOut={signOut}>{children}</AppShell>;
}
