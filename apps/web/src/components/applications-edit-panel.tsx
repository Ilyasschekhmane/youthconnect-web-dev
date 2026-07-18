'use client';

import { useState } from 'react';
import { updateApplicationMetadata } from '@/lib/db/mutations';

export function ApplicationEditPanel({ application }: { application: any }) {
  const [notes, setNotes] = useState(application.notes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateApplicationMetadata(application.id, { ...application.metadata, notes });
      // simple refresh
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Edit Application</h3>
      <div className="mt-3 space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
