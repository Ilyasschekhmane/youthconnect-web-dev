-- Seed: Moroccan cities and demo programs/applications for multi-city SaaS demo
-- This file seeds the demo organization and adds cities and programs for each city.
-- NOTE: Replace placeholder user UUIDs (applicant/staff) with real auth.users IDs from your Supabase Auth before running.

-- Demo org assumed from previous seed
\set org_id 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid

-- Cities: realistic Moroccan cities
INSERT INTO public.cities (id, organization_id, name, slug, state_province, country, status, metadata)
VALUES
  ('a1111111-0000-4000-8000-000000000001'::uuid, :org_id, 'Oujda', 'oujda', 'Oriental', 'Morocco', 'active', '{"population": 494252, "notes":"Border city"}'::jsonb),
  ('a1111111-0000-4000-8000-000000000002'::uuid, :org_id, 'Berkane', 'berkane', 'Oriental', 'Morocco', 'active', '{"population": 109237}'::jsonb),
  ('a1111111-0000-4000-8000-000000000003'::uuid, :org_id, 'Nador', 'nador', 'Oriental', 'Morocco', 'active', '{"population": 161726}'::jsonb),
  ('a1111111-0000-4000-8000-000000000004'::uuid, :org_id, 'Figuig', 'figuig', 'Oriental', 'Morocco', 'active', '{"population": 15000}'::jsonb),
  ('a1111111-0000-4000-8000-000000000005'::uuid, :org_id, 'Rabat', 'rabat', 'Rabat-Salé-Kénitra', 'Morocco', 'active', '{"population": 578000}'::jsonb),
  ('a1111111-0000-4000-8000-000000000006'::uuid, :org_id, 'Casablanca', 'casablanca', 'Casablanca-Settat', 'Morocco', 'active', '{"population": 3359818}'::jsonb),
  ('a1111111-0000-4000-8000-000000000007'::uuid, :org_id, 'Marrakech', 'marrakech', 'Marrakech-Safi', 'Morocco', 'active', '{"population": 928850}'::jsonb),
  ('a1111111-0000-4000-8000-000000000008'::uuid, :org_id, 'Tangier', 'tangier', 'Tanger-Tetouan-Al Hoceima', 'Morocco', 'active', '{"population": 947952}'::jsonb),
  ('a1111111-0000-4000-8000-000000000009'::uuid, :org_id, 'Agadir', 'agadir', 'Souss-Massa', 'Morocco', 'active', '{"population": 421844}'::jsonb)
ON CONFLICT DO NOTHING;

-- Add representative programs for each city to demonstrate per-city stats (capacity and sample dates)
INSERT INTO public.programs (id, organization_id, city_id, name, slug, description, status, application_open_at, application_close_at, capacity, metadata)
VALUES
  ('p0000001-0000-4000-8000-000000000001'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000001'::uuid, 'Oujda Startup Lab', 'oujda-startup-lab', 'Local entrepreneurship support and incubation.', 'active', now() - interval '60 days', now() + interval '30 days', 40, '{"category":"incubation"}'::jsonb),
  ('p0000001-0000-4000-8000-000000000002'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000002'::uuid, 'Berkane Digital Bootcamp', 'berkane-digital-bootcamp', 'Digital skills and e-commerce training.', 'active', now() - interval '30 days', now() + interval '60 days', 30, '{"category":"training"}'::jsonb),
  ('p0000001-0000-4000-8000-000000000003'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000003'::uuid, 'Nador Women Entrepreneurship', 'nador-women-entrepreneurship', 'Support for women-led microbusinesses.', 'active', now() - interval '10 days', now() + interval '80 days', 25, '{"category":"microbusiness"}'::jsonb),
  ('p0000001-0000-4000-8000-000000000004'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000004'::uuid, 'Figuig Community Makers', 'figuig-makers', 'Community makerspace and prototyping support.', 'active', now() - interval '5 days', now() + interval '45 days', 20, '{"category":"makerspace"}'::jsonb),
  ('p0000001-0000-4000-8000-000000000005'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000005'::uuid, 'Rabat Green Entrepreneurs', 'rabat-green-entrepreneurs', 'Sustainability-focused startups program.', 'active', now() - interval '15 days', now() + interval '15 days', 35, '{"category":"sustainability"}'::jsonb),
  ('p0000001-0000-4000-8000-000000000006'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000006'::uuid, 'Casablanca Digital Skills Bootcamp (Extended)', 'casablanca-digital-bootcamp-ext', 'Advanced digital skills and entrepreneurship.', 'active', now() - interval '40 days', now() + interval '20 days', 80, '{"category":"training"}'::jsonb),
  ('p0000001-0000-4000-8000-000000000007'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000007'::uuid, 'Marrakech Tourism Startup Track', 'marrakech-tourism-track', 'Support for tourism and hospitality startups.', 'active', now() - interval '20 days', now() + interval '50 days', 30, '{"category":"tourism"}'::jsonb),
  ('p0000001-0000-4000-8000-000000000008'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000008'::uuid, 'Tangier Export Readiness', 'tangier-export-readiness', 'Help SMEs prepare for export markets.', 'active', now() - interval '25 days', now() + interval '35 days', 30, '{"category":"export"}'::jsonb),
  ('p0000001-0000-4000-8000-000000000009'::uuid, :org_id, 'a1111111-0000-4000-8000-000000000009'::uuid, 'Agadir Fisheries Innovation', 'agadir-fisheries-innovation', 'Innovation in fisheries and aquaculture.', 'active', now() - interval '10 days', now() + interval '90 days', 20, '{"category":"agrifish"}'::jsonb)
ON CONFLICT DO NOTHING;

-- Sample applications for each program (replace applicant_user_id with real auth user UUIDs)
INSERT INTO public.applications (id, organization_id, program_id, city_id, applicant_user_id, status, submitted_at, score, metadata)
VALUES
  ('app00001-0000-4000-8000-000000000001'::uuid, :org_id, 'p0000001-0000-4000-8000-000000000001'::uuid, 'a1111111-0000-4000-8000-000000000001'::uuid, 'd1111111-0000-4000-8000-000000000101'::uuid, 'submitted', now() - interval '10 days', 78.5, '{"business":"La Bonne Idee"}'::jsonb),
  ('app00001-0000-4000-8000-000000000002'::uuid, :org_id, 'p0000001-0000-4000-8000-000000000002'::uuid, 'a1111111-0000-4000-8000-000000000002'::uuid, 'd1111111-0000-4000-8000-000000000102'::uuid, 'under_review', now() - interval '5 days', 82.0, '{"business":"E-Market Maroc"}'::jsonb),
  ('app00001-0000-4000-8000-000000000003'::uuid, :org_id, 'p0000001-0000-4000-8000-000000000003'::uuid, 'a1111111-0000-4000-8000-000000000003'::uuid, 'd1111111-0000-4000-8000-000000000103'::uuid, 'submitted', now() - interval '2 days', 69.0, '{"business":"WomenCraft Nador"}'::jsonb)
ON CONFLICT DO NOTHING;

-- Sample appointments for upcoming events (linked to applications)
INSERT INTO public.appointments (id, organization_id, application_id, city_id, created_by_user_id, appointment_type, starts_at, ends_at, status, notes)
VALUES
  ('ap00001-0000-4000-8000-000000000001'::uuid, :org_id, 'app00001-0000-4000-8000-000000000001'::uuid, 'a1111111-0000-4000-8000-000000000001'::uuid, 'b47ac10b-58cc-4372-a567-0e02b2c3d480'::uuid, 'Interview', now() + interval '3 days', now() + interval '3 days' + interval '45 minutes', 'scheduled', 'Phone screen with program coordinator'),
  ('ap00001-0000-4000-8000-000000000002'::uuid, :org_id, 'app00001-0000-4000-8000-000000000002'::uuid, 'a1111111-0000-4000-8000-000000000002'::uuid, 'b47ac10b-58cc-4372-a567-0e02b2c3d480'::uuid, 'In-person Interview', now() + interval '7 days', now() + interval '7 days' + interval '60 minutes', 'scheduled', 'On-site at Berkane Center')
ON CONFLICT DO NOTHING;

-- Audits & notifications examples per city
INSERT INTO public.notifications (id, organization_id, recipient_user_id, related_entity_type, related_entity_id, title, body, channel, is_read)
VALUES
  ('n00001-0000-4000-8000-000000000001'::uuid, :org_id, 'd1111111-0000-4000-8000-000000000101'::uuid, 'application', 'app00001-0000-4000-8000-000000000001'::uuid, 'Application Submitted', 'Your application to Oujda Startup Lab has been submitted.', 'in_app', false),
  ('n00001-0000-4000-8000-000000000002'::uuid, :org_id, 'd1111111-0000-4000-8000-000000000102'::uuid, 'application', 'app00001-0000-4000-8000-000000000002'::uuid, 'Application Under Review', 'Your application to Berkane Digital Bootcamp is under review.', 'in_app', false)
ON CONFLICT DO NOTHING;

INSERT INTO public.audit_logs (id, organization_id, actor_user_id, entity_type, entity_id, action, details)
VALUES
  ('al00001-0000-4000-8000-000000000001'::uuid, :org_id, 'b47ac10b-58cc-4372-a567-0e02b2c3d480'::uuid, 'application', 'app00001-0000-4000-8000-000000000001'::uuid, 'create', '{"summary":"Applicant submitted application for Oujda Startup Lab"}'::jsonb),
  ('al00001-0000-4000-8000-000000000002'::uuid, :org_id, 'b47ac10b-58cc-4372-a567-0e02b2c3d480'::uuid, 'appointment', 'ap00001-0000-4000-8000-000000000001'::uuid, 'create', '{"summary":"Interview scheduled for Oujda application"}'::jsonb)
ON CONFLICT DO NOTHING;

-- End of seed
