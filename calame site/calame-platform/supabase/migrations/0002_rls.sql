-- CALAME – migration 0002 : Row Level Security
-- Principe : refus par défaut. Les écritures sensibles (paiements, invitations, présences automatiques,
-- notifications, journaux) passent uniquement par le serveur (clé service_role, qui contourne la RLS).

do $$
declare t text;
begin
  for t in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- Aucun accès anonyme aux tables (les pages publiques passent par des routes serveur validées)
revoke all on all tables in schema public from anon;

-- ───────── Protection contre l'escalade de privilèges ─────────
create or replace function app.guard_profile_update() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or app.is_admin() then return new; end if;   -- service_role / admin
  if new.role is distinct from old.role or new.status is distinct from old.status
     or new.email is distinct from old.email or new.id is distinct from old.id then
    raise exception 'forbidden_profile_change' using errcode = '42501';
  end if;
  return new;
end $$;
create trigger profiles_guard before update on public.profiles for each row execute function app.guard_profile_update();

create or replace function app.guard_admin_creation() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  -- Un rôle admin ne peut être attribué que par le serveur (service_role) ou un admin existant.
  if new.role = 'admin' and auth.uid() is not null and not app.is_admin() then
    raise exception 'forbidden_admin_creation' using errcode = '42501';
  end if;
  return new;
end $$;
create trigger profiles_guard_ins before insert on public.profiles for each row execute function app.guard_admin_creation();

-- Le professeur ne modifie que description / lien visio de ses séances (jamais horaires, état, classe)
create or replace function app.guard_session_update() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or app.is_admin() then return new; end if;
  if new.starts_at is distinct from old.starts_at or new.ends_at is distinct from old.ends_at
     or new.status is distinct from old.status or new.class_id is distinct from old.class_id
     or new.teacher_id is distinct from old.teacher_id or new.title is distinct from old.title
     or new.room_name is distinct from old.room_name then
    raise exception 'forbidden_session_change' using errcode = '42501';
  end if;
  return new;
end $$;
create trigger sessions_guard before update on public.sessions for each row execute function app.guard_session_update();

-- Règles de soumission d'un devoir (élève)
create or replace function app.guard_submission() returns trigger
language plpgsql security definer set search_path = '' as $$
declare ex public.exercises;
begin
  select * into ex from public.exercises where id = new.exercise_id;
  if auth.uid() is not null and not app.is_admin() and not app.is_teacher() then
    if tg_op = 'INSERT' and new.status not in ('draft','submitted') then
      raise exception 'invalid_status' using errcode = '42501';
    end if;
    if tg_op = 'UPDATE' then
      if old.status = 'submitted' and not ex.allow_edit_after_submit then
        raise exception 'submission_locked' using errcode = '42501';
      end if;
      if old.status in ('in_correction','corrected') then
        raise exception 'submission_locked' using errcode = '42501';
      end if;
      if new.status not in ('draft','submitted') then
        raise exception 'invalid_status' using errcode = '42501';
      end if;
    end if;
  end if;
  if new.status = 'submitted' and (tg_op = 'INSERT' or old.status is distinct from 'submitted') then
    new.submitted_at := now();
    new.is_late := ex.due_at is not null and now() > ex.due_at;
  end if;
  return new;
end $$;
create trigger submissions_guard before insert or update on public.submissions for each row execute function app.guard_submission();

-- ───────── profiles ─────────
create policy profiles_self_select on public.profiles for select using (id = auth.uid());
create policy profiles_admin_all on public.profiles for all using (app.is_admin()) with check (app.is_admin());
create policy profiles_teacher_students on public.profiles for select using (app.is_teacher() and app.teaches_student(id));
create policy profiles_student_teacher on public.profiles for select using (
  role = 'teacher' and exists (select 1 from public.classes c where c.teacher_id = profiles.id and c.id = app.student_class_id()));
create policy profiles_teacher_admins on public.profiles for select using (app.is_teacher() and role = 'admin');
create policy profiles_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy student_profiles_self on public.student_profiles for select using (profile_id = auth.uid());
create policy student_profiles_teacher on public.student_profiles for select using (app.is_teacher() and app.teaches_student(profile_id));
create policy student_profiles_admin on public.student_profiles for all using (app.is_admin()) with check (app.is_admin());

create policy teacher_profiles_read on public.teacher_profiles for select using (app.is_admin() or profile_id = auth.uid());
create policy teacher_profiles_admin on public.teacher_profiles for all using (app.is_admin()) with check (app.is_admin());

create policy levels_read on public.levels for select to authenticated using (true);
create policy invitations_admin on public.invitations for all using (app.is_admin()) with check (app.is_admin());

-- ───────── rendez-vous (écriture publique via serveur uniquement) ─────────
create policy slots_admin on public.appointment_slots for all using (app.is_admin()) with check (app.is_admin());
create policy appointments_admin on public.appointments for all using (app.is_admin()) with check (app.is_admin());
create policy appointments_teacher on public.appointments for select using (app.is_teacher() and evaluator_id = auth.uid());
create policy appointment_history_admin on public.appointment_history for select using (app.is_admin());
create policy level_tests_admin on public.level_tests for all using (app.is_admin()) with check (app.is_admin());
create policy level_tests_teacher_select on public.level_tests for select using (app.is_teacher() and teacher_id = auth.uid());
create policy level_tests_teacher_update on public.level_tests for update using (app.is_teacher() and teacher_id = auth.uid() and validated_by is null)
  with check (app.is_teacher() and teacher_id = auth.uid() and validated_by is null and validated_level is null);

-- ───────── classes ─────────
create policy classes_admin on public.classes for all using (app.is_admin()) with check (app.is_admin());
create policy classes_teacher on public.classes for select using (teacher_id = auth.uid());
create policy classes_student on public.classes for select using (id = app.student_class_id());

create policy class_enroll_admin on public.class_enrollments for all using (app.is_admin()) with check (app.is_admin());
create policy class_enroll_teacher on public.class_enrollments for select using (class_id in (select app.teacher_class_ids()));
create policy class_enroll_self on public.class_enrollments for select using (student_id = auth.uid());

-- ───────── séances ─────────
create policy sessions_admin on public.sessions for all using (app.is_admin()) with check (app.is_admin());
create policy sessions_teacher_select on public.sessions for select using (class_id in (select app.teacher_class_ids()));
create policy sessions_teacher_update on public.sessions for update using (class_id in (select app.teacher_class_ids()))
  with check (class_id in (select app.teacher_class_ids()));
create policy sessions_student on public.sessions for select using (class_id = app.student_class_id() and app.student_has_access(auth.uid()));
create policy session_history_admin on public.session_history for select using (app.is_admin());

create policy board_admin on public.board_documents for all using (app.is_admin()) with check (app.is_admin());
create policy board_teacher on public.board_documents for all
  using (session_id in (select id from public.sessions where class_id in (select app.teacher_class_ids())))
  with check (session_id in (select id from public.sessions where class_id in (select app.teacher_class_ids())));
create policy board_student on public.board_documents for select
  using (app.student_has_access(auth.uid()) and session_id in (select id from public.sessions where class_id = app.student_class_id()));

-- ───────── ressources ─────────
create policy resources_admin on public.resources for all using (app.is_admin()) with check (app.is_admin());
create policy resources_teacher on public.resources for select using (app.is_teacher() and (class_id in (select app.teacher_class_ids())
  or (class_id is null and level_code in (select level_code from public.classes where teacher_id = auth.uid()))));
create policy resources_student on public.resources for select using (app.student_has_access(auth.uid()) and
  (class_id = app.student_class_id() or (class_id is null and level_code = (select level_code from public.classes where id = app.student_class_id()))));

create policy culture_admin on public.cultural_items for all using (app.is_admin()) with check (app.is_admin());
create policy culture_read on public.cultural_items for select using (app.is_teacher() or app.student_has_access(auth.uid()));

-- ───────── présences ─────────
create policy attendance_admin on public.attendance for all using (app.is_admin()) with check (app.is_admin());
create policy attendance_teacher on public.attendance for select using (session_id in (select id from public.sessions where class_id in (select app.teacher_class_ids())));
create policy attendance_student on public.attendance for select using (student_id = auth.uid());
create policy attendance_events_admin on public.attendance_events for select using (app.is_admin());
create policy attendance_corr_admin on public.attendance_corrections for all using (app.is_admin()) with check (app.is_admin());
create policy attendance_corr_teacher_sel on public.attendance_corrections for select using (requested_by = auth.uid());
create policy attendance_corr_teacher_ins on public.attendance_corrections for insert with check (
  requested_by = auth.uid() and status = 'open' and app.is_teacher() and attendance_id in (
    select a.id from public.attendance a join public.sessions s on s.id = a.session_id where s.class_id in (select app.teacher_class_ids())));

-- ───────── exercices ─────────
create policy exercises_admin on public.exercises for all using (app.is_admin()) with check (app.is_admin());
create policy exercises_teacher on public.exercises for select using (class_id in (select app.teacher_class_ids()));
create policy exercises_student on public.exercises for select using (is_published and class_id = app.student_class_id() and app.student_has_access(auth.uid()));

create policy ex_questions_admin on public.exercise_questions for all using (app.is_admin()) with check (app.is_admin());
create policy ex_questions_teacher on public.exercise_questions for select using (exercise_id in (select id from public.exercises where class_id in (select app.teacher_class_ids())));
create policy ex_questions_student on public.exercise_questions for select using (app.student_has_access(auth.uid()) and exercise_id in
  (select id from public.exercises where is_published and class_id = app.student_class_id()));

create policy submissions_admin on public.submissions for all using (app.is_admin()) with check (app.is_admin());
create policy submissions_student_select on public.submissions for select using (student_id = auth.uid());
create policy submissions_student_insert on public.submissions for insert with check (student_id = auth.uid() and app.student_has_access(auth.uid())
  and exercise_id in (select id from public.exercises where is_published and class_id = app.student_class_id()));
create policy submissions_student_update on public.submissions for update using (student_id = auth.uid() and app.student_has_access(auth.uid()))
  with check (student_id = auth.uid());
create policy submissions_teacher_select on public.submissions for select using (exercise_id in (select id from public.exercises where class_id in (select app.teacher_class_ids())));
create policy submissions_teacher_update on public.submissions for update using (app.is_teacher() and exercise_id in (select id from public.exercises where class_id in (select app.teacher_class_ids())))
  with check (app.is_teacher() and status in ('in_correction','corrected','returned'));

create policy sub_files_admin on public.submission_files for all using (app.is_admin()) with check (app.is_admin());
create policy sub_files_student on public.submission_files for select using (submission_id in (select id from public.submissions where student_id = auth.uid()));
create policy sub_files_teacher on public.submission_files for select using (submission_id in (select s.id from public.submissions s join public.exercises e on e.id = s.exercise_id where e.class_id in (select app.teacher_class_ids())));

create policy corrections_admin on public.corrections for all using (app.is_admin()) with check (app.is_admin());
create policy corrections_teacher on public.corrections for all using (teacher_id = auth.uid() and app.is_teacher())
  with check (teacher_id = auth.uid() and submission_id in (select s.id from public.submissions s join public.exercises e on e.id = s.exercise_id where e.class_id in (select app.teacher_class_ids())));
create policy corrections_student on public.corrections for select using (published_at is not null and submission_id in (select id from public.submissions where student_id = auth.uid()));

create policy appreciations_admin on public.appreciations for all using (app.is_admin()) with check (app.is_admin());
create policy appreciations_teacher on public.appreciations for all using (teacher_id = auth.uid() and app.is_teacher())
  with check (teacher_id = auth.uid() and app.teaches_student(student_id));
create policy appreciations_student on public.appreciations for select using (student_id = auth.uid() and visible_to_student and published_at is not null);

create policy final_eval_admin on public.final_evaluations for all using (app.is_admin()) with check (app.is_admin());
create policy final_eval_teacher on public.final_evaluations for all using (teacher_id = auth.uid() and app.is_teacher())
  with check (teacher_id = auth.uid() and app.teaches_student(student_id));
create policy final_eval_student_sel on public.final_evaluations for select using (student_id = auth.uid() and published_at is not null);
create policy final_eval_student_upd on public.final_evaluations for update using (student_id = auth.uid() and published_at is not null) with check (student_id = auth.uid());

create policy activity_admin on public.activity_sessions for select using (app.is_admin());
create policy activity_teacher on public.activity_sessions for select using (app.is_teacher() and app.teaches_student(student_id));
create policy activity_student on public.activity_sessions for select using (student_id = auth.uid());

-- ───────── messagerie ─────────
create policy conv_admin_sel on public.conversations for select using (app.is_admin() and kind = 'teacher_admin');
create policy conv_participant on public.conversations for select using (teacher_id = auth.uid() or student_id = auth.uid());
create policy messages_select on public.messages for select using (
  conversation_id in (select id from public.conversations where teacher_id = auth.uid() or student_id = auth.uid() or (app.is_admin() and kind = 'teacher_admin')));
create policy messages_insert on public.messages for insert with check (sender_id = auth.uid() and conversation_id in (
  select c.id from public.conversations c where
    (c.kind = 'student_teacher' and (
        (c.student_id = auth.uid() and app.student_has_access(auth.uid()) and c.teacher_id in (select teacher_id from public.classes where id = app.student_class_id()))
     or (c.teacher_id = auth.uid() and app.teaches_student(c.student_id))))
 or (c.kind = 'teacher_admin' and (c.teacher_id = auth.uid() or app.is_admin()))));
create policy messages_mark_read on public.messages for update using (sender_id <> auth.uid() and conversation_id in
  (select id from public.conversations where teacher_id = auth.uid() or student_id = auth.uid() or (app.is_admin() and kind = 'teacher_admin')))
  with check (sender_id <> auth.uid());

-- ───────── notifications ─────────
create policy notifications_own_select on public.notifications for select using (user_id = auth.uid());
create policy notifications_own_update on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ───────── paiements (lecture seule côté client) ─────────
create policy formations_read on public.formations for select to authenticated using (true);
create policy enrollments_admin on public.enrollments for all using (app.is_admin()) with check (app.is_admin());
create policy enrollments_own on public.enrollments for select using (student_id = auth.uid());
create policy installments_admin on public.payment_installments for all using (app.is_admin()) with check (app.is_admin());
create policy installments_own on public.payment_installments for select using (enrollment_id in (select id from public.enrollments where student_id = auth.uid()));
create policy payments_admin on public.payments for select using (app.is_admin());
create policy payments_own on public.payments for select using (installment_id in
  (select i.id from public.payment_installments i join public.enrollments e on e.id = i.enrollment_id where e.student_id = auth.uid()));
create policy payment_events_admin on public.payment_events for select using (app.is_admin());

-- ───────── administration ─────────
create policy audit_admin on public.admin_audit_log for select using (app.is_admin());
create policy settings_admin on public.platform_settings for all using (app.is_admin()) with check (app.is_admin());

-- Les clients authentifiés ne peuvent jamais écrire sur ces tables : écriture serveur uniquement
revoke insert, update, delete on public.payments, public.payment_events, public.admin_audit_log,
  public.notifications, public.attendance_events, public.activity_sessions, public.invitations,
  public.appointment_history, public.session_history from authenticated;
grant update (read_at) on public.notifications to authenticated;
revoke update on public.notifications from authenticated;
grant update (read_at) on public.notifications to authenticated;

-- Garde-fous de colonnes (les triggers s'appliquent aussi aux admins, d'où l'absence de GRANT par colonne)
create or replace function app.guard_message_update() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then return new; end if;
  if new.body is distinct from old.body or new.sender_id is distinct from old.sender_id
     or new.conversation_id is distinct from old.conversation_id or new.created_at is distinct from old.created_at then
    raise exception 'messages_immutable' using errcode = '42501';
  end if;
  return new;
end $$;
create trigger messages_guard before update on public.messages for each row execute function app.guard_message_update();

create or replace function app.guard_final_eval_update() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or app.is_admin() or app.is_teacher() then return new; end if;
  if new.student_id is distinct from old.student_id or new.teacher_report is distinct from old.teacher_report
     or new.admin_feedback is distinct from old.admin_feedback or new.published_at is distinct from old.published_at then
    raise exception 'forbidden_final_eval_change' using errcode = '42501';
  end if;
  return new;
end $$;
create trigger final_eval_guard before update on public.final_evaluations for each row execute function app.guard_final_eval_update();
