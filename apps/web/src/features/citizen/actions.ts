'use server';

import { getServerSupabase, getCurrentUser } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

export async function markNotificationAsRead(notificationId: string) {
  const supabase = await getServerSupabase();
  const user = await getCurrentUser();

  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .eq('recipient_user_id', user.id);

  if (error) throw new Error('Failed to mark notification as read');

  revalidatePath('/dashboard/notifications');
  return { success: true };
}

export async function markAllNotificationsAsRead() {
  const supabase = await getServerSupabase();
  const user = await getCurrentUser();

  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('recipient_user_id', user.id)
    .eq('is_read', false);

  if (error) throw new Error('Failed to mark notifications as read');

  revalidatePath('/dashboard/notifications');
  return { success: true };
}

export async function deleteNotification(notificationId: string) {
  const supabase = await getServerSupabase();
  const user = await getCurrentUser();

  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId)
    .eq('recipient_user_id', user.id);

  if (error) throw new Error('Failed to delete notification');

  revalidatePath('/dashboard/notifications');
  return { success: true };
}

export async function cancelAppointment(appointmentId: string) {
  const supabase = await getServerSupabase();
  const user = await getCurrentUser();

  if (!user) throw new Error('Not authenticated');

  // Verify user owns the appointment
  const { data: apt } = await supabase
    .from('appointments')
    .select('id, created_by_user_id')
    .eq('id', appointmentId)
    .single();

  if (!apt || apt.created_by_user_id !== user.id) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('appointments')
    .update({ status: 'cancelled' })
    .eq('id', appointmentId);

  if (error) throw new Error('Failed to cancel appointment');

  // Insert audit log
  await supabase.from('audit_logs').insert({
    entity_type: 'appointment',
    entity_id: appointmentId,
    action: 'cancel',
    details: { cancelled_by: user.id },
  });

  revalidatePath('/dashboard/appointments');
  return { success: true };
}

export async function rescheduleAppointment(appointmentId: string, newStartsAt: string, newEndsAt: string) {
  const supabase = await getServerSupabase();
  const user = await getCurrentUser();

  if (!user) throw new Error('Not authenticated');

  // Verify user owns the appointment
  const { data: apt } = await supabase
    .from('appointments')
    .select('id, created_by_user_id')
    .eq('id', appointmentId)
    .single();

  if (!apt || apt.created_by_user_id !== user.id) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('appointments')
    .update({ starts_at: newStartsAt, ends_at: newEndsAt })
    .eq('id', appointmentId);

  if (error) throw new Error('Failed to reschedule appointment');

  // Insert audit log
  await supabase.from('audit_logs').insert({
    entity_type: 'appointment',
    entity_id: appointmentId,
    action: 'update',
    details: { new_starts_at: newStartsAt, new_ends_at: newEndsAt },
  });

  revalidatePath('/dashboard/appointments');
  return { success: true };
}

export async function downloadDocument(documentId: string) {
  const supabase = await getServerSupabase();
  const user = await getCurrentUser();

  if (!user) throw new Error('Not authenticated');

  // Fetch document
  const { data: doc } = await supabase
    .from('documents')
    .select('id, file_url, file_name, application_id, uploaded_by_user_id')
    .eq('id', documentId)
    .single();

  if (!doc) throw new Error('Document not found');

  // Verify access - user must own the application
  const { data: app } = await supabase
    .from('applications')
    .select('applicant_user_id')
    .eq('id', doc.application_id)
    .single();

  if (app?.applicant_user_id !== user.id) {
    throw new Error('Unauthorized');
  }

  // Log download
  await supabase.from('audit_logs').insert({
    entity_type: 'document',
    entity_id: documentId,
    action: 'download',
    details: { downloaded_by: user.id },
  });

  return { url: doc.file_url, fileName: doc.file_name };
}
