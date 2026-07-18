"use client";

import React, { useState } from 'react';
import { bookAppointment, getServerSupabase as noop } from '@/lib/db/mutations';

export function AppointmentPanel({ application }: { application: any }) {
  const [type, setType] = useState('Interview');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    try {
      // The project pattern allows calling server mutations from client components in some places.
      // We'll attempt to call bookAppointment directly. It requires organizationId and userId; use application values.
      await bookAppointment(application.id, application.applicant_user_id || application.created_by_user_id, application.organization_id, type, startsAt, endsAt, notes);
      alert('Appointment booked');
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Appointment</h3>
      <div className="mt-3 space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2">
            <option>Interview</option>
            <option>On-site interview</option>
            <option>Mentor session</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Starts at</label>
          <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Ends at</label>
          <input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <input value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <button
            onClick={handleBook}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white"
          >
            {loading ? 'Booking...' : 'Book appointment'}
          </button>
        </div>
      </div>
    </div>
  );
}
