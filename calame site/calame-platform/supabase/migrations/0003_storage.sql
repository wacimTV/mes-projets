-- CALAME – migration 0003 : stockage privé
-- Buckets privés : aucun accès direct client. Les téléversements passent par le serveur (validation
-- type/taille/signature) et les téléchargements par des URLs signées de courte durée, émises après
-- contrôle des droits (route /api/download).

insert into storage.buckets (id, name, public, file_size_limit)
values
  ('resources',   'resources',   false, 209715200),
  ('submissions', 'submissions', false, 26214400),
  ('culture',     'culture',     false, 209715200)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

-- Aucune politique sur storage.objects pour anon/authenticated : accès refusé par défaut (RLS activée par Supabase).
