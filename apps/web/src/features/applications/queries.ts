import { getServerSupabase } from '@/lib/db/queries';
import type { ApplicationDTO } from './types';

export async function listApplications(organizationId: string, options?: { status?: string; page?: number; pageSize?: number }) {
  const supabase = await getServerSupabase();
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 50;
  let query = supabase
    .from('applications')
    .select(`
      id, organization_id, program_id, city_id, applicant_user_id, status, submitted_at, review_started_at, decision_at, score, notes, metadata, created_at, updated_at,
      programs(id, name), cities(id, name), documents(id, file_name, document_type, status, file_url, created_at), appointments(id, appointment_type, starts_at, ends_at, status, notes)
    `, { count: 'exact' })
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  const res = await query;
  if (res.error) {
    console.error('listApplications error', res.error);
    return { items: [] as ApplicationDTO[], count: 0 };
  }

  const items = (res.data as any[]).map((r) => ({
    id: r.id,
    organization_id: r.organization_id,
    program_id: r.program_id,
    program: r.programs ? { id: r.programs.id, name: r.programs.name } : undefined,
    city_id: r.city_id,
    city: r.cities ? { id: r.cities.id, name: r.cities.name } : undefined,
    applicant_user_id: r.applicant_user_id,
    status: r.status,
    submitted_at: r.submitted_at,
    review_started_at: r.review_started_at,
    decision_at: r.decision_at,
    score: r.score,
    notes: r.notes,
    metadata: r.metadata,
    documents: r.documents || [],
    appointments: r.appointments || [],
    created_at: r.created_at,
    updated_at: r.updated_at,
  })) as ApplicationDTO[];

  return { items, count: (res.count as number) || items.length };
}

export async function getApplication(applicationId: string) {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase
    .from('applications')
    .select(`
      id, organization_id, program_id, city_id, applicant_user_id, status, submitted_at, review_started_at, decision_at, score, notes, metadata, created_at, updated_at,
      programs(id, name, description), cities(id, name), documents(id, file_name, document_type, status, file_url, created_at), appointments(id, appointment_type, starts_at, ends_at, status, notes),
      auth.users (id, email, user_metadata)
    `)
    .eq('id', applicationId)
    .single();

  if (error || !data) return null;

  const r: any = data;
  const application: ApplicationDTO = {
    id: r.id,
    organization_id: r.organization_id,
    program_id: r.program_id,
    program: r.programs ? { id: r.programs.id, name: r.programs.name, description: r.programs.description } : undefined,
    city_id: r.city_id,
    city: r.cities ? { id: r.cities.id, name: r.cities.name } : undefined,
    applicant_user_id: r.applicant_user_id,
    applicant: r['auth.users'] ? { id: r['auth.users'].id, email: r['auth.users'].email, full_name: r['auth.users'].user_metadata?.full_name } : undefined,
    status: r.status,
    submitted_at: r.submitted_at,
    review_started_at: r.review_started_at,
    decision_at: r.decision_at,
    score: r.score,
    notes: r.notes,
    metadata: r.metadata,
    documents: r.documents || [],
    appointments: r.appointments || [],
    created_at: r.created_at,
    updated_at: r.updated_at,
  };

  return application;
}

export async function getApplicationHistory(applicationId: string) {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('entity_id', applicationId)
    .order('created_at', { ascending: true });

  if (error) return [];
  return data || [];
}

export async function listPrograms(organizationId: string) {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase.from('programs').select('id, name').eq('organization_id', organizationId).order('name');
  if (error) return [];
  return data || [];
}

export async function listCities(organizationId: string) {
  const supabase = await getServerSupabase();
  const { data, error } = await supabase.from('cities').select('id, name').eq('organization_id', organizationId).order('name');
  if (error) return [];
  return data || [];
}
