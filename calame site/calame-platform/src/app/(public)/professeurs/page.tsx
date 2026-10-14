import type { Metadata } from 'next';
import { InfoPage } from '@/components/info-page';
import { Card, Placeholder } from '@/components/ui';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { publicEnv } from '@/lib/env';

export const metadata: Metadata = { title: 'Les professeurs', description: "L'équipe pédagogique de CALAME." };

export default async function Page() {
  let teachers: Array<{ id: string; full_name: string; presentation: string | null }> = [];
  if (publicEnv.supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Seuls les noms et présentations validés sont publiés ; aucune coordonnée.
    const admin = createSupabaseAdmin();
    const { data } = await admin.from('teacher_profiles').select('presentation, profiles!inner(id, full_name, status)').not('presentation', 'is', null);
    teachers = (data ?? [])
      .map((t) => {
        const p = Array.isArray(t.profiles) ? t.profiles[0] : t.profiles;
        return { id: p.id as string, full_name: p.full_name as string, presentation: t.presentation as string | null, status: p.status as string };
      })
      .filter((t) => t.status === 'active');
  }
  return (
    <InfoPage eyebrow="Professeurs" title="L'équipe pédagogique" intro="Chaque classe est confiée à un professeur qui assure les cours en direct, corrige les exercices et rédige les appréciations.">
      {teachers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {teachers.map((t) => <Card key={t.id} title={t.full_name}><p>{t.presentation}</p></Card>)}
        </div>
      ) : (
        <Placeholder>Aucune présentation de professeur n&apos;a encore été publiée. Les noms, parcours et présentations seront renseignés par l&apos;administration (aucune information n&apos;est inventée).</Placeholder>
      )}
    </InfoPage>
  );
}
