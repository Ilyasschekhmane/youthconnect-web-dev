'use server';

import { getServerSupabase } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

export async function createApplication(
  organizationId: string,
  programId: string,
  cityId: string,
  userId: string
) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('applications')
    .insert({
      organization_id: organizationId,
      program_id: programId,
      city_id: cityId,
      applicant_user_id: userId,
      status: 'draft',
      metadata: { started_at: new Date().toISOString() },
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create application: ${error.message}`);
  }

  revalidatePath('/dashboard');
  return data;
}

export async function submitApplication(
  applicationId: string,
  formData: Record<string, unknown>
) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('applications')
    .update({
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      metadata: formData,
    })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to submit application: ${error.message}`);
  }

  // Create notification for applicant
  const app = await supabase
    .from('applications')
    .select('applicant_user_id, organization_id')
    .eq('id', applicationId)
    .single();

  if (app.data) {
    await supabase.from('notifications').insert({
      organization_id: app.data.organization_id,
      recipient_user_id: app.data.applicant_user_id,
      related_entity_type: 'application',
      related_entity_id: applicationId,
      title: 'Application Submitted',
      body: 'Your application has been submitted successfully and is now under review.',
      channel: 'in_app',
    });
  }

  revalidatePath('/dashboard');
  return data;
}

export async function approveApplication(applicationId: string, notes?: string) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('applications')
    .update({
      status: 'approved',
      decision_at: new Date().toISOString(),
      notes,
      review_started_at: new Date().toISOString(),
    })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to approve application: ${error.message}`);
  }

  // Get application details and create notification
  const app = await supabase
  .from('applications')
  .select('applicant_user_id, organization_id, programs(name)')
  .eq('id', applicationId)
  .single();

if (app.data) {
  const programs = app.data.programs as any;

const programName = Array.isArray(programs)
  ? programs[0]?.name
  : programs?.name;
  await supabase.from('notifications').insert({
    organization_id: app.data.organization_id,
    recipient_user_id: app.data.applicant_user_id,
    related_entity_type: 'application',
    related_entity_id: applicationId,
    title: 'Application Approved! 🎉',
    body: `Congratulations! Your application for ${programName ?? 'the selected program'} has been approved. Please book an appointment to proceed.`,
    channel: 'in_app',
  });
}
  revalidatePath('/dashboard/applications');
  return data;
}

export async function rejectApplication(applicationId: string, reason: string) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('applications')
    .update({
      status: 'rejected',
      decision_at: new Date().toISOString(),
      notes: reason,
      review_started_at: new Date().toISOString(),
    })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to reject application: ${error.message}`);
  }

  // Create rejection notification
  const app = await supabase
    .from('applications')
    .select('applicant_user_id, organization_id')
    .eq('id', applicationId)
    .single();

  if (app.data) {
    await supabase.from('notifications').insert({
      organization_id: app.data.organization_id,
      recipient_user_id: app.data.applicant_user_id,
      related_entity_type: 'application',
      related_entity_id: applicationId,
      title: 'Application Update',
      body: `Your application was not selected at this time. ${reason}`,
      channel: 'in_app',
    });
  }

  revalidatePath('/dashboard/applications');
  return data;
}

export async function uploadDocument(
  applicationId: string,
  userId: string,
  documentType: string,
  fileName: string,
  fileUrl: string,
  mimeType: string
) {
  const supabase = await getServerSupabase();

  // Get organization_id from application
  const app = await supabase
    .from('applications')
    .select('organization_id')
    .eq('id', applicationId)
    .single();

  if (!app.data) {
    throw new Error('Application not found');
  }

  const { data, error } = await supabase
    .from('documents')
    .insert({
      organization_id: app.data.organization_id,
      application_id: applicationId,
      uploaded_by_user_id: userId,
      document_type: documentType,
      file_name: fileName,
      file_url: fileUrl,
      mime_type: mimeType,
      status: 'uploaded',
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to upload document: ${error.message}`);
  }

  revalidatePath(`/dashboard/applications/${applicationId}`);
  return data;
}

export async function bookAppointment(
  applicationId: string,
  userId: string,
  organizationId: string,
  appointmentType: string,
  startsAt: string,
  endsAt: string,
  notes?: string
) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      organization_id: organizationId,
      application_id: applicationId,
      created_by_user_id: userId,
      appointment_type: appointmentType,
      starts_at: startsAt,
      ends_at: endsAt,
      status: 'scheduled',
      notes,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to book appointment: ${error.message}`);
  }

  // Create notification
  await supabase.from('notifications').insert({
    organization_id: organizationId,
    recipient_user_id: userId,
    related_entity_type: 'appointment',
    related_entity_id: data.id,
    title: 'Appointment Confirmed',
    body: `Your ${appointmentType} has been scheduled for ${new Date(startsAt).toLocaleDateString()}`,
    channel: 'in_app',
  });

  revalidatePath('/dashboard');
  return data;
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = await getServerSupabase();

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) {
    throw new Error(`Failed to mark notification as read: ${error.message}`);
  }

  revalidatePath('/dashboard');
}

export async function updateApplicationMetadata(applicationId: string, metadata: Record<string, unknown>) {
  const supabase = await getServerSupabase();

  const { data, error } = await supabase
    .from('applications')
    .update({ metadata })
    .eq('id', applicationId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update application: ${error.message}`);
  }

  revalidatePath(`/dashboard/applications/${applicationId}`);
  return data;
}
