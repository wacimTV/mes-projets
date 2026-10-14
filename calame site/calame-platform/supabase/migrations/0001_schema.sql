-- CALAME – migration 0001 : schéma
-- Appliquer avec `supabase db push` ou via l'éditeur SQL Supabase (dans l'ordre).

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create schema if not exists app;

-- ───────────── Types ─────────────
create type public.user_role as enum ('admin', 'teacher', 'student');
create type public.account_status as enum ('invited', 'active', 'suspended', 'archived');
create type public.appointment_status as enum ('requested','confirmed','done','cancelled','refused','pending_validation');
create type public.session_status as enum ('scheduled','cancelled','done');
create type public.attendance_status as enum ('present','partial','absent');
create type public.exercise_kind as enum ('qcm','written','fill_blank','reading','audio','file_upload');
create type public.submission_status as enum ('draft','submitted','in_correction','corrected','returned');
create type public.enrollment_status as enum ('pending_payment','active','suspended','expired','cancelled');
create type public.installment_status as enum ('pending','paid','failed','refunded','cancelled');
create type public.conversation_kind as enum ('student_teacher','teacher_admin');
create type public.resource_kind as enum ('pdf','image','audio','video','document','other');

-- ───────────── Utilitaires ─────────────
create or replace function app.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

-- ───────────── Profils ─────────────
create table public.levels (
  code text primary key check (code in ('A','B','C')),
  label text not null,
  description text not null
);
insert into public.levels (code, label, description) values
 ('A','Niveau A','Ne connaît pas l''alphabet, ne sait ni lire ni écrire en arabe et ne parle pas arabe.'),
 ('B','Niveau B','Sait lire et écrire difficilement, mais ne parle pas arabe.'),
 ('C','Niveau C','Sait lire et écrire (niveau débutant) et possède quelques notions d''arabe parlé.');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'student',
  status public.account_status not null default 'invited',
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null,
  phone text,
  email_notifications boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index profiles_email_key on public.profiles (lower(email));
create index profiles_role_idx on public.profiles (role, status);
create trigger profiles_touch before update on public.profiles for each row execute function app.touch_updated_at();

create table public.student_profiles (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  level_code text references public.levels(code),
  birth_date date,
  guardian_contact text,
  admin_notes text
);

create table public.teacher_profiles (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  presentation text   -- « À valider par le responsable de CALAME »
);

create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  role public.user_role not null,
  level_code text references public.levels(code),
  user_id uuid references auth.users(id) on delete set null,  -- l'invitation réelle est gérée par Supabase Auth
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  check (role <> 'admin' or created_by is not null)
);
create index invitations_email_idx on public.invitations (lower(email));

-- ───────────── Rendez-vous et tests de niveau ─────────────
create table public.appointment_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  evaluator_id uuid references public.profiles(id),
  is_booked boolean not null default false,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);
create unique index appointment_slots_unique on public.appointment_slots (starts_at, coalesce(evaluator_id, '00000000-0000-0000-0000-000000000000'));

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  visitor_name text not null check (char_length(visitor_name) between 1 and 120),
  visitor_email text not null,
  visitor_phone text,
  visitor_age int check (visitor_age between 10 and 99),
  message text check (char_length(message) <= 2000),
  slot_id uuid references public.appointment_slots(id) on delete set null,
  status public.appointment_status not null default 'requested',
  evaluator_id uuid references public.profiles(id),
  scheduled_at timestamptz,
  room_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index appointments_status_idx on public.appointments (status, created_at desc);
create trigger appointments_touch before update on public.appointments for each row execute function app.touch_updated_at();

create table public.appointment_history (
  id bigint generated always as identity primary key,
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

create table public.level_tests (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null unique references public.appointments(id) on delete cascade,
  teacher_id uuid references public.profiles(id),
  report text,                                   -- compte rendu du professeur
  proposed_level text references public.levels(code),
  validated_level text references public.levels(code),
  validated_by uuid references public.profiles(id),
  validated_at timestamptz,
  created_at timestamptz not null default now()
);

-- ───────────── Classes ─────────────
create table public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level_code text not null references public.levels(code),
  teacher_id uuid references public.profiles(id),
  capacity int not null default 12 check (capacity between 1 and 30),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
-- Règle actuelle : un professeur ne gère qu'une classe active (assouplissable en supprimant cet index)
create unique index classes_one_per_teacher on public.classes (teacher_id) where is_active and teacher_id is not null;

create table public.class_enrollments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active','ended')),
  created_at timestamptz not null default now()
);
-- Un élève = une seule classe active
create unique index class_enrollments_one_active on public.class_enrollments (student_id) where status = 'active';
create index class_enrollments_class_idx on public.class_enrollments (class_id) where status = 'active';

create or replace function app.enforce_class_rules() returns trigger
language plpgsql security definer set search_path = '' as $$
declare cap int; cnt int; lvl text; student_lvl text;
begin
  if new.status <> 'active' then return new; end if;
  -- verrou de ligne : sérialise les inscriptions concurrentes sur la même classe
  select capacity, level_code into cap, lvl from public.classes where id = new.class_id for update;
  select count(*) into cnt from public.class_enrollments
    where class_id = new.class_id and status = 'active' and id <> new.id;
  if cnt >= cap then raise exception 'class_full' using errcode = 'P0001'; end if;
  select level_code into student_lvl from public.student_profiles where profile_id = new.student_id;
  if student_lvl is not null and student_lvl <> lvl then raise exception 'level_mismatch' using errcode = 'P0001'; end if;
  return new;
end $$;
create trigger class_enrollments_rules before insert or update on public.class_enrollments
  for each row execute function app.enforce_class_rules();

-- ───────────── Séances ─────────────
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  teacher_id uuid references public.profiles(id),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.session_status not null default 'scheduled',
  room_name text unique,          -- salle côté fournisseur, créée côté serveur
  video_link text,                -- lien externe optionnel ajouté par le professeur
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at and ends_at - starts_at <= interval '12 hours')
);
create index sessions_class_start_idx on public.sessions (class_id, starts_at);
create index sessions_start_idx on public.sessions (starts_at);
create trigger sessions_touch before update on public.sessions for each row execute function app.touch_updated_at();

create table public.session_history (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.sessions(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

create table public.board_documents (
  session_id uuid primary key references public.sessions(id) on delete cascade,
  content jsonb not null default '{"type":"doc","content":[]}',
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

-- ───────────── Ressources ─────────────
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  kind public.resource_kind not null,
  storage_path text not null unique,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  class_id uuid references public.classes(id) on delete cascade,
  level_code text references public.levels(code),
  session_id uuid references public.sessions(id) on delete set null,
  chapter text,
  position int not null default 0,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
create index resources_class_idx on public.resources (class_id, chapter, position);
create index resources_session_idx on public.resources (session_id);

create table public.cultural_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  kind text not null check (kind in ('text','poem','book_excerpt','biography','article','pdf','image','audio','video')),
  body text,
  storage_path text,
  mime_type text,
  allow_download boolean not null default false,
  tags text[] not null default '{}',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  search tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(title,'')), 'A') ||
    setweight(to_tsvector('simple', coalesce(author,'')), 'B') ||
    setweight(to_tsvector('simple', coalesce(body,'')), 'C')
  ) stored,
  check (body is not null or storage_path is not null)
);
create index cultural_items_search_idx on public.cultural_items using gin (search);
create index cultural_items_title_trgm on public.cultural_items using gin (title gin_trgm_ops);

-- ───────────── Présences ─────────────
create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status public.attendance_status not null default 'absent',
  connected_seconds int not null default 0 check (connected_seconds >= 0),
  source text not null default 'video_events' check (source in ('video_events','admin')),
  updated_at timestamptz not null default now(),
  unique (session_id, student_id)
);
create index attendance_student_idx on public.attendance (student_id);

create table public.attendance_events (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.sessions(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  event text not null check (event in ('joined','left')),
  provider_event_id text unique,
  occurred_at timestamptz not null default now()
);
create index attendance_events_idx on public.attendance_events (session_id, student_id, occurred_at);

create table public.attendance_corrections (
  id uuid primary key default gen_random_uuid(),
  attendance_id uuid not null references public.attendance(id) on delete cascade,
  requested_by uuid not null references public.profiles(id),
  reason text not null check (char_length(reason) between 5 and 1000),
  status text not null default 'open' check (status in ('open','accepted','rejected')),
  old_status public.attendance_status,
  new_status public.attendance_status,
  resolved_by uuid references public.profiles(id),
  resolution_note text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- ───────────── Exercices ─────────────
create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  session_id uuid references public.sessions(id) on delete set null,
  title text not null,
  instructions text not null default '',
  kind public.exercise_kind not null,
  due_at timestamptz,
  is_published boolean not null default false,
  allow_edit_after_submit boolean not null default false,  -- règle explicite : modification après soumission
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  published_at timestamptz
);
create index exercises_class_idx on public.exercises (class_id, due_at);

create table public.exercise_questions (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  position int not null default 0,
  kind public.exercise_kind not null,
  prompt text not null,
  options jsonb,          -- QCM : [{"id":"a","label":"..."}]
  resource_id uuid references public.resources(id) on delete set null
);
create index exercise_questions_idx on public.exercise_questions (exercise_id, position);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status public.submission_status not null default 'draft',
  answers jsonb not null default '{}',
  submitted_at timestamptz,
  is_late boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (exercise_id, student_id)
);
create index submissions_status_idx on public.submissions (status);
create trigger submissions_touch before update on public.submissions for each row execute function app.touch_updated_at();

create table public.submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  storage_path text not null unique,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 26214400),
  created_at timestamptz not null default now()
);

create table public.corrections (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references public.submissions(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id),
  feedback text not null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger corrections_touch before update on public.corrections for each row execute function app.touch_updated_at();

create table public.appreciations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id),
  session_id uuid references public.sessions(id) on delete set null,
  exercise_id uuid references public.exercises(id) on delete set null,
  context text not null,
  skill text not null check (skill in ('oral_comprehension','speaking','reading','writing','participation','personal_work','other')),
  appreciation text not null,
  comment text,
  visible_to_student boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);
create index appreciations_student_idx on public.appreciations (student_id, created_at desc);

create table public.final_evaluations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null unique references public.profiles(id) on delete cascade,
  teacher_id uuid references public.profiles(id),
  teacher_report text,
  sent_to_admin_at timestamptz,
  admin_feedback text,
  published_at timestamptz,
  student_feedback text,
  created_at timestamptz not null default now()
);

create table public.activity_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now(),
  active_seconds int not null default 0 check (active_seconds >= 0),
  ended boolean not null default false
);
create index activity_sessions_idx on public.activity_sessions (student_id, exercise_id);

-- ───────────── Messagerie ─────────────
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  kind public.conversation_kind not null,
  student_id uuid references public.profiles(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  check ((kind = 'student_teacher' and student_id is not null) or (kind = 'teacher_admin' and student_id is null))
);
create unique index conversations_st_unique on public.conversations (student_id, teacher_id) where kind = 'student_teacher';
create unique index conversations_ta_unique on public.conversations (teacher_id) where kind = 'teacher_admin';

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null check (char_length(body) between 1 and 4000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index messages_conv_idx on public.messages (conversation_id, created_at);

-- ───────────── Notifications ─────────────
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  link text,
  dedupe_key text not null,
  email_status text not null default 'pending' check (email_status in ('pending','sent','failed','skipped')),
  email_attempts int not null default 0,
  email_error text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, dedupe_key)
);
create index notifications_user_idx on public.notifications (user_id, read_at, created_at desc);
create index notifications_email_idx on public.notifications (email_status) where email_status in ('pending','failed');

-- ───────────── Formation et paiements ─────────────
create table public.formations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_cents int not null check (price_cents > 0),
  duration_months int not null default 3 check (duration_months > 0),
  weekly_hours int not null default 6,
  is_active boolean not null default true
);
insert into public.formations (name, price_cents, duration_months, weekly_hours)
values ('Formation en arabe – 3 mois', 43000, 3, 6);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  formation_id uuid not null references public.formations(id),
  status public.enrollment_status not null default 'pending_payment',
  payment_plan int not null default 1 check (payment_plan between 1 and 3),
  amount_due_cents int not null check (amount_due_cents > 0),
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date > start_date)
);
create unique index enrollments_one_open on public.enrollments (student_id) where status in ('pending_payment','active','suspended');
create index enrollments_end_idx on public.enrollments (end_date) where status = 'active';

create table public.payment_installments (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  seq int not null check (seq between 1 and 3),
  amount_cents int not null check (amount_cents > 0),
  due_date date not null,
  status public.installment_status not null default 'pending',
  checkout_session_id text unique,
  paid_at timestamptz,
  failure_reason text,
  unique (enrollment_id, seq)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  installment_id uuid not null references public.payment_installments(id) on delete cascade,
  provider text not null check (provider in ('stripe','paypal','manual')),
  provider_ref text not null,
  amount_cents int not null,
  status text not null check (status in ('succeeded','failed','refunded')),
  created_at timestamptz not null default now(),
  unique (provider, provider_ref, status)
);

create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz,
  error text,
  created_at timestamptz not null default now(),
  unique (provider, event_id)    -- idempotence des webhooks
);

-- ───────────── Administration ─────────────
create table public.admin_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id),
  action text not null,
  entity text not null,
  entity_id text,
  details jsonb,
  created_at timestamptz not null default now()
);
create index admin_audit_idx on public.admin_audit_log (created_at desc);

create table public.platform_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_at timestamptz not null default now()
);
insert into public.platform_settings (key, value, description) values
 ('access_rule', '"first_installment"', 'Activation de l''accès : first_installment | full_payment (à confirmer)'),
 ('suspend_on_failed_installment', 'true', 'Suspendre l''accès si une échéance échoue'),
 ('notify_session_update', 'false', 'Notifier la simple modification d''une séance (contradiction du questionnaire)'),
 ('recording_enabled', 'false', 'Enregistrement des cours (non confirmé)'),
 ('min_age', '15', 'Âge minimum'),
 ('reminder_hours_before_session', '24', 'Rappel avant séance (heures)'),
 ('end_reminder_days', '14', 'Rappel avant fin de formation (jours)');

-- ───────────── Fonctions d'autorisation ─────────────
create or replace function app.current_role() returns public.user_role
language sql stable security definer set search_path = '' as
$$ select role from public.profiles where id = auth.uid() and status in ('active','invited') $$;

create or replace function app.is_admin() returns boolean
language sql stable security definer set search_path = '' as
$$ select coalesce((select role = 'admin' and status = 'active' from public.profiles where id = auth.uid()), false) $$;

create or replace function app.is_teacher() returns boolean
language sql stable security definer set search_path = '' as
$$ select coalesce((select role = 'teacher' and status = 'active' from public.profiles where id = auth.uid()), false) $$;

create or replace function app.teacher_class_ids() returns setof uuid
language sql stable security definer set search_path = '' as
$$ select id from public.classes where teacher_id = auth.uid() $$;

create or replace function app.student_class_id() returns uuid
language sql stable security definer set search_path = '' as
$$ select class_id from public.class_enrollments where student_id = auth.uid() and status = 'active' limit 1 $$;

create or replace function app.setting(k text) returns jsonb
language sql stable security definer set search_path = '' as
$$ select value from public.platform_settings where key = k $$;

-- Accès pédagogique d'un élève, calculé côté serveur (source de vérité unique)
create or replace function app.student_has_access(uid uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from public.enrollments e
    join public.profiles p on p.id = e.student_id and p.status = 'active'
    where e.student_id = uid
      and e.status = 'active'
      and e.start_date <= (now() at time zone 'Europe/Paris')::date
      and e.end_date   >  (now() at time zone 'Europe/Paris')::date
      and case when app.setting('access_rule') = '"full_payment"'::jsonb
               then not exists (select 1 from public.payment_installments i where i.enrollment_id = e.id and i.status <> 'paid')
               else exists (select 1 from public.payment_installments i where i.enrollment_id = e.id and i.status = 'paid') end
      and not (coalesce(app.setting('suspend_on_failed_installment') = 'true'::jsonb, true)
               and exists (select 1 from public.payment_installments i where i.enrollment_id = e.id and i.status = 'failed'))
  )
$$;

create or replace function app.has_access() returns boolean
language sql stable security definer set search_path = '' as
$$ select app.is_admin() or app.is_teacher() or app.student_has_access(auth.uid()) $$;

create or replace function app.teaches_student(uid uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.class_enrollments ce join public.classes c on c.id = ce.class_id
                 where ce.student_id = uid and ce.status = 'active' and c.teacher_id = auth.uid())
$$;

-- Calcul des échéances (centimes ajustés sur la dernière) : 43000 / 3 -> 14333, 14333, 14334
create or replace function app.split_amount(total int, n int) returns int[]
language plpgsql immutable as $$
declare base int := total / n; res int[] := '{}'; i int;
begin
  for i in 1..n loop
    res := res || (case when i = n then total - base * (n - 1) else base end);
  end loop;
  return res;
end $$;

grant usage on schema app to authenticated, anon, service_role;
grant execute on all functions in schema app to authenticated, service_role;
revoke execute on function app.student_has_access(uuid) from anon;
