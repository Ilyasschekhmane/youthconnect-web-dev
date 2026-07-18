create extension if not exists pgcrypto;

create type public.organization_status as enum ('active', 'inactive', 'pending');
create type public.membership_role as enum ('owner', 'admin', 'staff', 'member', 'applicant');
create type public.membership_status as enum ('active', 'invited', 'suspended');
create type public.city_status as enum ('active', 'inactive');
create type public.program_status as enum ('draft', 'active', 'paused', 'closed');
create type public.application_status as enum ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'waitlisted', 'withdrawn');
create type public.document_status as enum ('pending', 'uploaded', 'verified', 'rejected');
create type public.appointment_status as enum ('scheduled', 'completed', 'cancelled', 'no_show');
create type public.notification_channel as enum ('in_app', 'email', 'sms');
create type public.audit_action as enum ('create', 'update', 'delete', 'approve', 'reject', 'archive', 'assign', 'send', 'view');

create table public.organizations (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    status public.organization_status not null default 'pending',
    owner_user_id uuid references auth.users(id) on delete set null,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

comment on table public.organizations is 'Top-level tenant container for a city, agency, or youth entrepreneurship program operator.';
comment on column public.organizations.owner_user_id is 'Primary owner of the organization account.';

create table public.organization_memberships (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    role public.membership_role not null default 'member',
    status public.membership_status not null default 'active',
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, user_id)
);

comment on table public.organization_memberships is 'Maps authenticated users to organizations and controls their access level.';

create table public.cities (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    name text not null,
    slug text not null,
    state_province text,
    country text not null default 'US',
    status public.city_status not null default 'active',
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, slug)
);

comment on table public.cities is 'Cities or service areas managed by an organization.';

create table public.programs (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    city_id uuid references public.cities(id) on delete set null,
    name text not null,
    slug text not null,
    description text,
    status public.program_status not null default 'draft',
    application_open_at timestamptz,
    application_close_at timestamptz,
    capacity integer,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, slug)
);

comment on table public.programs is 'Programs offered by an organization within one or more cities.';

create table public.applications (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    program_id uuid not null references public.programs(id) on delete restrict,
    city_id uuid references public.cities(id) on delete set null,
    applicant_user_id uuid not null references auth.users(id) on delete cascade,
    status public.application_status not null default 'draft',
    submitted_at timestamptz,
    review_started_at timestamptz,
    decision_at timestamptz,
    score numeric(5,2),
    notes text,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

comment on table public.applications is 'Application submissions created by applicants for a specific program.';

create table public.documents (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    application_id uuid references public.applications(id) on delete cascade,
    uploaded_by_user_id uuid references auth.users(id) on delete set null,
    document_type text not null,
    file_name text not null,
    file_url text not null,
    mime_type text,
    status public.document_status not null default 'pending',
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

comment on table public.documents is 'Supporting files uploaded as part of an application workflow.';

create table public.appointments (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    application_id uuid references public.applications(id) on delete cascade,
    city_id uuid references public.cities(id) on delete set null,
    created_by_user_id uuid references auth.users(id) on delete set null,
    appointment_type text not null,
    starts_at timestamptz not null,
    ends_at timestamptz not null,
    status public.appointment_status not null default 'scheduled',
    notes text,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint appointments_time_order check (ends_at > starts_at)
);

comment on table public.appointments is 'Scheduled interviews, check-ins, or mentor sessions linked to an application.';

create table public.notifications (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    recipient_user_id uuid not null references auth.users(id) on delete cascade,
    related_entity_type text,
    related_entity_id uuid,
    title text not null,
    body text not null,
    channel public.notification_channel not null default 'in_app',
    is_read boolean not null default false,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

comment on table public.notifications is 'User-facing notifications for workflow milestones and reminders.';

create table public.audit_logs (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    actor_user_id uuid references auth.users(id) on delete set null,
    entity_type text not null,
    entity_id uuid,
    action public.audit_action not null,
    details jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

comment on table public.audit_logs is 'Immutable history of administrative or workflow events for compliance and traceability.';

create index public_idx_organizations_slug on public.organizations (slug);
create index public_idx_memberships_org_user on public.organization_memberships (organization_id, user_id);
create index public_idx_cities_org on public.cities (organization_id);
create index public_idx_programs_org_city on public.programs (organization_id, city_id);
create index public_idx_applications_org_program on public.applications (organization_id, program_id);
create index public_idx_applications_applicant on public.applications (applicant_user_id);
create index public_idx_documents_application on public.documents (application_id);
create index public_idx_appointments_org_time on public.appointments (organization_id, starts_at);
create index public_idx_notifications_recipient on public.notifications (recipient_user_id, is_read);
create index public_idx_audit_logs_org_time on public.audit_logs (organization_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger organizations_set_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

create trigger organization_memberships_set_updated_at
before update on public.organization_memberships
for each row execute function public.set_updated_at();

create trigger cities_set_updated_at
before update on public.cities
for each row execute function public.set_updated_at();

create trigger programs_set_updated_at
before update on public.programs
for each row execute function public.set_updated_at();

create trigger applications_set_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

create trigger documents_set_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.set_updated_at();

create trigger notifications_set_updated_at
before update on public.notifications
for each row execute function public.set_updated_at();

create or replace function public.is_org_member(org_id uuid)
returns boolean
language sql
stable
as $$
    select exists (
        select 1
        from public.organization_memberships om
        where om.organization_id = org_id
          and om.user_id = auth.uid()
          and om.status = 'active'
    );
$$;

create or replace function public.is_org_admin(org_id uuid)
returns boolean
language sql
stable
as $$
    select exists (
        select 1
        from public.organization_memberships om
        where om.organization_id = org_id
          and om.user_id = auth.uid()
          and om.status = 'active'
          and om.role in ('owner', 'admin')
    );
$$;

create or replace function public.is_org_staff(org_id uuid)
returns boolean
language sql
stable
as $$
    select exists (
        select 1
        from public.organization_memberships om
        where om.organization_id = org_id
          and om.user_id = auth.uid()
          and om.status = 'active'
          and om.role in ('owner', 'admin', 'staff')
    );
$$;

alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.cities enable row level security;
alter table public.programs enable row level security;
alter table public.applications enable row level security;
alter table public.documents enable row level security;
alter table public.appointments enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

create policy "organizations_select_members"
    on public.organizations
    for select
    using (public.is_org_member(id));

create policy "organizations_insert_authenticated"
    on public.organizations
    for insert
    with check (auth.uid() is not null);

create policy "organizations_update_admins"
    on public.organizations
    for update
    using (public.is_org_admin(id))
    with check (public.is_org_admin(id));

create policy "organizations_delete_admins"
    on public.organizations
    for delete
    using (public.is_org_admin(id));

create policy "memberships_select_members"
    on public.organization_memberships
    for select
    using (public.is_org_member(organization_id) or user_id = auth.uid());

create policy "memberships_insert_admins_or_self"
    on public.organization_memberships
    for insert
    with check (public.is_org_admin(organization_id) or user_id = auth.uid());

create policy "memberships_update_admins_or_self"
    on public.organization_memberships
    for update
    using (public.is_org_admin(organization_id) or user_id = auth.uid())
    with check (public.is_org_admin(organization_id) or user_id = auth.uid());

create policy "memberships_delete_admins_or_self"
    on public.organization_memberships
    for delete
    using (public.is_org_admin(organization_id) or user_id = auth.uid());

create policy "cities_select_members"
    on public.cities
    for select
    using (public.is_org_member(organization_id));

create policy "cities_manage_staff"
    on public.cities
    for insert
    with check (public.is_org_staff(organization_id));

create policy "cities_update_staff"
    on public.cities
    for update
    using (public.is_org_staff(organization_id))
    with check (public.is_org_staff(organization_id));

create policy "programs_select_members"
    on public.programs
    for select
    using (public.is_org_member(organization_id));

create policy "programs_manage_staff"
    on public.programs
    for insert
    with check (public.is_org_staff(organization_id));

create policy "programs_update_staff"
    on public.programs
    for update
    using (public.is_org_staff(organization_id))
    with check (public.is_org_staff(organization_id));

create policy "applications_select_members"
    on public.applications
    for select
    using (public.is_org_member(organization_id) and (applicant_user_id = auth.uid() or public.is_org_staff(organization_id)));

create policy "applications_insert_applicant_or_staff"
    on public.applications
    for insert
    with check (
        public.is_org_member(organization_id)
        and (applicant_user_id = auth.uid() or public.is_org_staff(organization_id))
    );

create policy "applications_update_owner_or_staff"
    on public.applications
    for update
    using (applicant_user_id = auth.uid() or public.is_org_staff(organization_id))
    with check (applicant_user_id = auth.uid() or public.is_org_staff(organization_id));

create policy "documents_select_members"
    on public.documents
    for select
    using (public.is_org_member(organization_id) and (uploaded_by_user_id = auth.uid() or public.is_org_staff(organization_id)));

create policy "documents_insert_applicant_or_staff"
    on public.documents
    for insert
    with check (
        public.is_org_member(organization_id)
        and (uploaded_by_user_id = auth.uid() or public.is_org_staff(organization_id))
    );

create policy "documents_update_owner_or_staff"
    on public.documents
    for update
    using (uploaded_by_user_id = auth.uid() or public.is_org_staff(organization_id))
    with check (uploaded_by_user_id = auth.uid() or public.is_org_staff(organization_id));

create policy "appointments_select_members"
    on public.appointments
    for select
    using (public.is_org_member(organization_id));

create policy "appointments_manage_members"
    on public.appointments
    for insert
    with check (public.is_org_member(organization_id));

create policy "appointments_update_members"
    on public.appointments
    for update
    using (public.is_org_member(organization_id))
    with check (public.is_org_member(organization_id));

create policy "notifications_select_recipient_or_staff"
    on public.notifications
    for select
    using (recipient_user_id = auth.uid() or public.is_org_staff(organization_id));

create policy "notifications_insert_staff"
    on public.notifications
    for insert
    with check (public.is_org_staff(organization_id));

create policy "notifications_update_recipient_or_staff"
    on public.notifications
    for update
    using (recipient_user_id = auth.uid() or public.is_org_staff(organization_id))
    with check (recipient_user_id = auth.uid() or public.is_org_staff(organization_id));

create policy "audit_logs_select_staff"
    on public.audit_logs
    for select
    using (public.is_org_staff(organization_id));

create policy "audit_logs_insert_staff"
    on public.audit_logs
    for insert
    with check (public.is_org_staff(organization_id));
