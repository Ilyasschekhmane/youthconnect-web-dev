"use client";

import React, { useState } from 'react';

export function ReviewPanel({ onApprove, onReject }: { onApprove: (notes?: string) => Promise<void>; onReject: (reason: string) => Promise<void> }) {
  const [notes, setNotes] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Review</h3>
      <div className="mt-3 space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Reviewer notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              setLoading(true);
              try {
                await onApprove(notes);
              } finally {
                setLoading(false);
              }
            }}
            className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white"
          >
            {loading ? 'Working...' : 'Approve'}
          </button>

          <button
            onClick={async () => {
              if (!reason) return alert('Please provide rejection reason');
              setLoading(true);
              try {
                await onReject(reason);
              } finally {
                setLoading(false);
              }
            }}
            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-white"
          >
            Reject
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Rejection reason</label>
          <input value={reason} onChange={(e) => setReason(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
        </div>
      </div>
    </div>
  );
}
