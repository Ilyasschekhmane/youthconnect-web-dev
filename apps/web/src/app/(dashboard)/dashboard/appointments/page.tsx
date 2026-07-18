import { getCurrentUser, getServerSupabase } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { CitizenAppointmentCard } from '@/components/citizen/appointment-card';
import { Calendar, AlertCircle } from 'lucide-react';

export default async function AppointmentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const supabase = await getServerSupabase();

  // Fetch user's appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('id, appointment_type, starts_at, ends_at, status, notes, application_id, created_by_user_id')
    .eq('created_by_user_id', user.id)
    .order('starts_at', { ascending: true })
    .limit(100);

  const allAppointments = appointments || [];
  const upcoming = allAppointments.filter((a) => new Date(a.starts_at) > new Date());
  const past = allAppointments.filter((a) => new Date(a.starts_at) <= new Date());

  return (
    <main className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Appointments</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your meetings and interviews for approved applications
        </p>
      </div>

      {/* Upcoming Appointments */}
      {upcoming.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" />
              Upcoming Appointments ({upcoming.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map((apt) => (
              <CitizenAppointmentCard
                key={apt.id}
                id={apt.id}
                appointmentType={apt.appointment_type}
                startsAt={apt.starts_at}
                endsAt={apt.ends_at}
                status={apt.status}
                notes={apt.notes}
                applicationId={apt.application_id}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Past Appointments */}
      {past.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Previous Appointments ({past.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {past.slice(0, 10).map((apt) => (
              <CitizenAppointmentCard
                key={apt.id}
                id={apt.id}
                appointmentType={apt.appointment_type}
                startsAt={apt.starts_at}
                endsAt={apt.ends_at}
                status={apt.status}
                notes={apt.notes}
                applicationId={apt.application_id}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {allAppointments.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-300 font-semibold">No appointments scheduled</p>
              <p className="text-slate-400 text-sm mt-2">
                Once your application is approved, you can book an appointment
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Box */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Appointment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-100">
          <p>• Attend all scheduled appointments on time</p>
          <p>• Bring required documents (you&apos;ll see what&apos;s needed in your application)</p>
          <p>• Contact your city center 24 hours in advance if you need to reschedule</p>
          <p>• Missed appointments may affect your program eligibility</p>
        </CardContent>
      </Card>
    </main>
  );
}
