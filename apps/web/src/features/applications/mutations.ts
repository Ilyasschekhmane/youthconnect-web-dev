'use server';

import { getServerSupabase, getCurrentUser } from '@/lib/db/queries';
import * as libMutations from '@/lib/db/mutations';
import type { UUID } from './types';

async function insertAudit(supabase: any, orgId: UUID, actorId: UUID | null, entityType: string, entityId: UUID | null, action: string, details: Record<string, any>) {
  try {
    await supabase.from('audit_logs').insert({
      organization_id: orgId,
      actor_user_id: actorId,
      entity_type: entityType,
      entity_id: entityId,
      action,
      details,
    });
  } catch (err) {
    // best-effort: do not fail the primary action for audit write failure
    console.error('audit insert failed', err);
  }
}

export async function createApplicationAction(organizationId: string, programId: string, cityId: string, applicantUserId?: string) {
  const supabase = await getServerSupabase();
  const current = await getCurrentUser();

  const userId = applicantUserId || current?.id;
  if (!userId) throw new Error('No applicant user specified and no authenticated user');

  // use existing lower-level mutation to insert application
  const app = await libMutations.createApplication(organizationId, programId, cityId, userId);

  // record audit
  await insertAudit(supabase, organizationId, current?.id || null, 'application', app.id, 'create', { note: 'Admin-created application' });
  return app;
}

export async function approveApplicationAction(applicationId: string, notes?: string) {
  const supabase = await getServerSupabase();
  const current = await getCurrentUser();

  const app = await libMutations.approveApplication(applicationId, notes);
  if (!app) throw new Error('Approval failed');

  await insertAudit(supabase, app.organization_id, current?.id || null, 'application', applicationId, 'approve', { notes: notes || null });
  return app;
}

export async function rejectApplicationAction(applicationId: string, reason: string) {
  const supabase = await getServerSupabase();
  const current = await getCurrentUser();

  const app = await libMutations.rejectApplication(applicationId, reason);
  if (!app) throw new Error('Rejection failed');

  await insertAudit(supabase, app.organization_id, current?.id || null, 'application', applicationId, 'reject', { reason });
  return app;
}

export async function submitApplicationAction(applicationId: string, payload: Record<string, any>) {
  const supabase = await getServerSupabase();
  const current = await getCurrentUser();

  const app = await libMutations.submitApplication(applicationId, payload);

  if (!app) throw new Error('Submit failed');
  await insertAudit(supabase, app.organization_id, current?.id || null, 'application', applicationId, 'submit', { payload });
  return app;
}

export async function updateApplicationAction(applicationId: string, metadata: Record<string, any>) {
  const supabase = await getServerSupabase();
  const current = await getCurrentUser();

  const app = await libMutations.updateApplicationMetadata(applicationId, metadata);
  if (!app) throw new Error('Update failed');

  await insertAudit(supabase, app.organization_id, current?.id || null, 'application', applicationId, 'update', { metadata });
  return app;
}

export async function uploadDocumentAction(applicationId: string, userId: string, documentType: string, fileName: string, fileUrl: string, mimeType: string) {
  const supabase = await getServerSupabase();
  const current = await getCurrentUser();

  const doc = await libMutations.uploadDocument(applicationId, userId, documentType, fileName, fileUrl, mimeType);
  if (!doc) throw new Error('Upload failed');

  await insertAudit(supabase, doc.organization_id, current?.id || null, 'document', doc.id, 'create', { file_name: fileName, document_type: documentType });
  return doc;
}

export async function bookAppointmentAction(applicationId: string, userId: string, organizationId: string, appointmentType: string, startsAt: string, endsAt: string, notes?: string) {
  const supabase = await getServerSupabase();
  const current = await getCurrentUser();

  const appt = await libMutations.bookAppointment(applicationId, userId, organizationId, appointmentType, startsAt, endsAt, notes);
  if (!appt) throw new Error('Booking failed');

  await insertAudit(supabase, organizationId, current?.id || null, 'appointment', appt.id, 'create', { appointment_type: appointmentType, starts_at: startsAt });
  return appt;
}
