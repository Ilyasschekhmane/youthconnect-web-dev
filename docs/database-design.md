# YouthConnect database design

This schema is designed for a multi-tenant GovTech platform that supports organizations, cities, programs, applicant workflows, documents, appointments, notifications, and auditability on Supabase.

## Core design principles

- Multi-tenancy is enforced through the organizations table.
- Every business entity links back to an organization so data is scoped per tenant.
- Row Level Security (RLS) protects access using membership roles and helper functions.
- The schema is ready for Supabase Auth and can be extended with storage, webhooks, and analytics.

## Tables

### organizations
Stores the top-level tenant container for a city agency, nonprofit, or program operator.

Why it exists:
- Provides isolation between different tenants.
- Holds tenant-level metadata such as status and branding.

Key fields:
- id: primary key
- name, slug: tenant identity
- status: lifecycle state of the organization
- owner_user_id: the initial administrator user
- metadata: flexible JSON data for extensions

### organization_memberships
Associates authenticated users with organizations and assigns roles.

Why it exists:
- Enables multi-user access without sharing credentials across tenants.
- Supports owner, admin, staff, member, and applicant roles.

Key fields:
- organization_id, user_id: membership identity
- role: permission tier
- status: active/invited/suspended state

### cities
Represents cities or service regions operated by an organization.

Why it exists:
- Enables geography-based program delivery.
- Lets organizations manage localized services per city.

Key fields:
- organization_id: parent tenant
- name, slug, state_province, country
- status: active/inactive

### programs
Represents a specific youth entrepreneurship or support program.

Why it exists:
- Supports lifecycle management of offerings.
- Links to a city when the program is locality-specific.

Key fields:
- organization_id: parent tenant
- city_id: optional city association
- name, slug, description
- status and application dates
- capacity and metadata

### applications
Stores applications submitted by applicants to programs.

Why it exists:
- Centralizes applicant workflow data.
- Supports status transitions, review timing, and scoring.

Key fields:
- organization_id, program_id, city_id
- applicant_user_id: owning user
- status, submitted_at, review_started_at, decision_at
- score, notes

### documents
Tracks required supporting files for an application.

Why it exists:
- Keeps evidence and attachments tied to the process.
- Supports upload review and validation states.

Key fields:
- application_id, uploaded_by_user_id
- document_type, file_name, file_url, mime_type
- status

### appointments
Stores interviews, check-ins, or office visits.

Why it exists:
- Connects scheduling to applicants and program staff.
- Supports operational workflow across cities.

Key fields:
- application_id, city_id, created_by_user_id
- appointment_type, starts_at, ends_at
- status, notes

### notifications
Stores in-app or outbound notifications for users.

Why it exists:
- Keeps users informed of workflow changes.
- Supports staff and applicant communication.

Key fields:
- recipient_user_id, related entity reference
- title, body, channel, is_read

### audit_logs
Captures important changes and actions performed in the system.

Why it exists:
- Supports compliance and traceability.
- Enables administrators to review actions taken on records.

Key fields:
- actor_user_id, entity_type, entity_id, action, details

## RLS model

The schema includes helper functions:
- is_org_member(org_id): true if the current user is an active member of the organization.
- is_org_admin(org_id): true for owners and admins.
- is_org_staff(org_id): true for owners, admins, and staff.

Policies are applied per table so access is scoped by organization membership and role.

## How to apply the migration

Run the SQL file in the Supabase SQL editor:

```bash
# if using the Supabase CLI
supabase db push
```

Or import the migration manually in the Supabase dashboard.

## Recommended next step

Next, add a storage bucket for uploads and a trigger that writes audit_log rows whenever applications, programs, or documents change.
