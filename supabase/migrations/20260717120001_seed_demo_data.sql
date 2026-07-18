/**
 * Database seed script for YouthConnect demo workflow
 * 
 * This creates:
 * - Demo organization (Youth Entrepreneurship Center - Casablanca)
 * - Demo users (citizen, admin)
 * - Sample programs
 * - Cities
 * 
 * Run this after Supabase migration in the Supabase SQL editor:
 * 1. Go to Supabase dashboard > SQL Editor
 * 2. Create new query
 * 3. Copy the SQL below
 * 4. Run it
 * 
 * Note: User IDs need to be replaced with actual auth user IDs from Supabase Auth
 */

-- INSERT DEMO DATA
-- Replace these UUIDs with real user IDs from your Supabase Auth

-- Demo organization
INSERT INTO public.organizations (id, name, slug, status, owner_user_id, metadata)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid,
  'Youth Entrepreneurship Center - Casablanca',
  'yec-casablanca',
  'active',
  'b47ac10b-58cc-4372-a567-0e02b2c3d480'::uuid,
  '{"region": "Casablanca-Settat", "founded": "2022", "capacity": 500}'::jsonb
);

-- Cities
INSERT INTO public.cities (id, organization_id, name, slug, state_province, country, status, metadata)
VALUES 
  ('c47ac10b-58cc-4372-a567-0e02b2c3d481'::uuid, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid, 'Casablanca', 'casablanca', 'Casablanca-Settat', 'Morocco', 'active', '{"population": 3359000, "established": 2022}'::jsonb),
  ('c47ac10b-58cc-4372-a567-0e02b2c3d482'::uuid, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid, 'Fez', 'fez', 'Fez-Meknes', 'Morocco', 'active', '{"population": 1112000, "established": 2023}'::jsonb),
  ('c47ac10b-58cc-4372-a567-0e02b2c3d483'::uuid, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid, 'Marrakech', 'marrakech', 'Marrakech-Safi', 'Morocco', 'active', '{"population": 928850, "established": 2023}'::jsonb);

-- Programs
INSERT INTO public.programs (id, organization_id, city_id, name, slug, description, status, application_open_at, application_close_at, capacity, metadata)
VALUES 
  ('p47ac10b-58cc-4372-a567-0e02b2c3d484'::uuid, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid, 'c47ac10b-58cc-4372-a567-0e02b2c3d481'::uuid, 'Digital Skills Bootcamp', 'digital-skills-bootcamp', 'A comprehensive 12-week bootcamp covering web development, data analytics, and digital marketing for aspiring entrepreneurs.', 'active', now(), now() + interval '30 days', 50, '{"duration": "12 weeks", "level": "beginner", "category": "tech"}'::jsonb),
  ('p47ac10b-58cc-4372-a567-0e02b2c3d485'::uuid, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid, 'c47ac10b-58cc-4372-a567-0e02b2c3d481'::uuid, 'Business Incubation Program', 'business-incubation', 'Mentorship and funding support for early-stage startups in the tourism and hospitality sector.', 'active', now(), now() + interval '45 days', 25, '{"duration": "6 months", "level": "intermediate", "category": "business"}'::jsonb),
  ('p47ac10b-58cc-4372-a567-0e02b2c3d486'::uuid, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid, 'c47ac10b-58cc-4372-a567-0e02b2c3d482'::uuid, 'Green Energy Initiative', 'green-energy-initiative', 'Support for sustainable energy and environmental entrepreneurship projects.', 'active', now(), now() + interval '60 days', 30, '{"duration": "8 weeks", "level": "intermediate", "category": "sustainability"}'::jsonb);

-- Organization memberships (users must exist in auth first!)
-- Admin membership
INSERT INTO public.organization_memberships (id, organization_id, user_id, role, status, metadata)
VALUES (
  'm47ac10b-58cc-4372-a567-0e02b2c3d487'::uuid,
  'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid,
  'b47ac10b-58cc-4372-a567-0e02b2c3d480'::uuid,
  'admin',
  'active',
  '{"department": "Administration", "hire_date": "2022-01-15"}'::jsonb
)
ON CONFLICT DO NOTHING;

-- Additional sample users can be added here after they register
