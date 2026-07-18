/**
 * Application and user related queries
 * Server-side data fetching functions
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    }
  );
}

export async function getCurrentUser() {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data.user;
}

export async function getUserApplications(userId: string) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('applications')
    .select(
      `
      id,
      status,
      score,
      notes,
      submitted_at,
      decision_at,
      created_at,
      updated_at,
      program_id,
      programs (
        id,
        name,
        description,
        organization_id
      ),
      city_id,
      cities (id, name),
      documents (
        id,
        file_name,
        document_type,
        status,
        created_at
      )
    `
    )
    .eq('applicant_user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }

  return data || [];
}

export async function getApplicationById(applicationId: string) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('applications')
    .select(
      `
      id,
      status,
      score,
      notes,
      submitted_at,
      decision_at,
      created_at,
      updated_at,
      program_id,
      programs (
        id,
        name,
        description,
        organization_id
      ),
      city_id,
      cities (id, name),
      applicant_user_id,
      documents (
        id,
        file_name,
        document_type,
        status,
        file_url,
        created_at
      ),
      appointments (
        id,
        starts_at,
        ends_at,
        status,
        appointment_type,
        notes
      )
    `
    )
    .eq('id', applicationId)
    .single();

  if (error) {
    console.error('Error fetching application:', error);
    return null;
  }

  return data;
}

export async function getOrganizationApplications(
  organizationId: string,
  filters?: { status?: string; limit?: number }
) {
  const supabase = await getServerSupabase();

  let query = supabase
    .from('applications')
    .select(
      `
      id,
      status,
      score,
      submitted_at,
      decision_at,
      created_at,
      programs (name),
      cities (name),
      applicant_user_id,
      auth.users (
        id,
        email,
        user_metadata
      ),
      documents (id, status)
    `
    )
    .eq('organization_id', organizationId);

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(filters?.limit || 100);

  if (error) {
    console.error('Error fetching organization applications:', error);
    return [];
  }

  return data || [];
}

export async function getUserAppointments(userId: string) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('appointments')
    .select(
      `
      id,
      starts_at,
      ends_at,
      status,
      appointment_type,
      notes,
      created_at,
      applications (
        id,
        programs (name)
      )
    `
    )
    .eq('created_by_user_id', userId)
    .order('starts_at', { ascending: true });

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }

  return data || [];
}

export async function getUserNotifications(userId: string) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('recipient_user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }

  return data || [];
}

export async function getPrograms(organizationId?: string) {
  const supabase = await getServerSupabase();

  let query = supabase
    .from('programs')
    .select(
      `
      id,
      name,
      slug,
      description,
      status,
      application_open_at,
      application_close_at,
      capacity,
      organization_id,
      city_id,
      cities (id, name)
    `
    );

  if (organizationId) {
    query = query.eq('organization_id', organizationId);
  }

  const { data, error } = await query.eq('status', 'active').order('name');

  if (error) {
    console.error('Error fetching programs:', error);
    return [];
  }

  return data || [];
}

export async function getApplicationHistory(applicationId: string) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('audit_logs')
    .select('id, actor_user_id, entity_type, entity_id, action, details, created_at')
    .eq('entity_id', applicationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching application history:', error);
    return [];
  }

  return data || [];
}

