"use client";

import React, { useState } from 'react';

export function ApplicationForm({ programs = [], cities = [], onSubmit }: { programs?: any[]; cities?: any[]; onSubmit: (data: any) => Promise<void> }) {
  const [programId, setProgramId] = useState('');
  const [cityId, setCityId] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ programId, cityId, applicantEmail, notes });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Program</label>
        <select required value={programId} onChange={(e) => setProgramId(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2">
          <option value="">Select program</option>
          {programs.map((p: any) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">City</label>
        <select required value={cityId} onChange={(e) => setCityId(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2">
          <option value="">Select city</option>
          {cities.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Applicant email</label>
        <input required value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
      </div>

      <div>
        <button type="submit" disabled={submitting} className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white">
          {submitting ? 'Creating...' : 'Create Application'}
        </button>
      </div>
    </form>
  );
}
