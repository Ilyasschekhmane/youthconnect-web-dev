'use client';

import { useState } from 'react';
import { bookAppointment } from '@/lib/db/mutations';
import { Button } from '@/components/button';
import {
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  FormError,
} from '@/components/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Calendar, Clock } from 'lucide-react';

interface AppointmentBookingProps {
  applicationId: string;
  userId: string;
  organizationId: string;
  onSuccess?: () => void;
}

const APPOINTMENT_TYPES = [
  { value: 'consultation', label: 'Consultation Meeting' },
  { value: 'mentor_session', label: 'Mentor Session' },
  { value: 'training', label: 'Training Session' },
  { value: 'pitch_practice', label: 'Pitch Practice' },
  { value: 'follow_up', label: 'Follow-up Meeting' },
];

export function AppointmentBooking({
  applicationId,
  userId,
  organizationId,
  onSuccess,
}: AppointmentBookingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    appointmentType: '',
    date: '',
    time: '',
    notes: '',
  });

  const generateEndTime = (startTime: string): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + 1;
    return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.appointmentType || !formData.date || !formData.time) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const startsAt = new Date(`${formData.date}T${formData.time}`).toISOString();
      const endsAt = new Date(
        `${formData.date}T${generateEndTime(formData.time)}`
      ).toISOString();

      await bookAppointment(
        applicationId,
        userId,
        organizationId,
        formData.appointmentType,
        startsAt,
        endsAt,
        formData.notes
      );

      setSuccess(true);
      onSuccess?.();
      setFormData({ appointmentType: '', date: '', time: '', notes: '' });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <FormError>{error}</FormError>}

          {success && (
            <div className="rounded-lg border border-emerald-500 bg-emerald-500/10 p-3">
              <p className="text-sm text-emerald-300">
                ✓ Appointment booked successfully! You will receive a confirmation notification.
              </p>
            </div>
          )}

          <FormField>
            <FormLabel htmlFor="appointmentType" required>
              Appointment Type
            </FormLabel>
            <FormSelect
              id="appointmentType"
              required
              value={formData.appointmentType}
              onChange={(e) =>
                setFormData({ ...formData, appointmentType: e.target.value })
              }
              disabled={isSubmitting}
            >
              <option value="">Select an appointment type</option>
              {APPOINTMENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </FormSelect>
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField>
              <FormLabel htmlFor="date" required>
                Date
              </FormLabel>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                <FormInput
                  id="date"
                  type="date"
                  required
                  min={minDate}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={isSubmitting}
                  className="pl-10"
                />
              </div>
            </FormField>

            <FormField>
              <FormLabel htmlFor="time" required>
                Time
              </FormLabel>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                <FormInput
                  id="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  disabled={isSubmitting}
                  className="pl-10"
                />
              </div>
            </FormField>
          </div>

          <FormField>
            <FormLabel htmlFor="notes">Additional Notes</FormLabel>
            <FormTextarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any specific topics you'd like to discuss?"
              disabled={isSubmitting}
            />
          </FormField>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
