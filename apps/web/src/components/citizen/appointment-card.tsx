import Link from 'next/link';
import { Card } from '@/components/card';
import { StatusBadge } from '@/components/status-badge';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface CitizenAppointmentCardProps {
  id: string;
  appointmentType: string;
  startsAt: string;
  endsAt: string;
  status: string;
  location?: string;
  notes?: string;
  applicationId: string;
}

export function CitizenAppointmentCard({
  id,
  appointmentType,
  startsAt,
  endsAt,
  status,
  location,
  notes,
  applicationId,
}: CitizenAppointmentCardProps) {
  const startDate = new Date(startsAt);
  const isUpcoming = startDate > new Date();
  const isPast = startDate < new Date();

  return (
    <Link href={`/dashboard/appointments`}>
      <Card className={`hover:border-cyan-500/50 transition cursor-pointer ${isPast ? 'opacity-75' : ''}`}>
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <h3 className="font-semibold text-white capitalize">
                  {appointmentType.replace('_', ' ')}
                </h3>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="h-3 w-3" />
                  {startDate.toLocaleString()}
                </div>

                {location && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {location}
                  </div>
                )}

                {notes && (
                  <p className="text-xs text-slate-500 mt-2 line-clamp-1">{notes}</p>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              <StatusBadge status={status as any}>
                {isPast ? 'Past' : isUpcoming ? 'Upcoming' : 'Today'}
              </StatusBadge>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
