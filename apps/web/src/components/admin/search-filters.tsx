"use client";

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function SearchFilters({ initialSearch, initialStatus }: { initialSearch?: string; initialStatus?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (q) params.set('search', q);
    else params.delete('search');
    router.push(`${pathname}?${params.toString()}`);
  };

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const s = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (s) params.set('status', s);
    else params.delete('status');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        aria-label="Search applications"
        placeholder="Search by applicant, program or email"
        defaultValue={initialSearch}
        onChange={onSearchChange}
        className="rounded-md bg-slate-800 px-3 py-1 text-sm text-white border border-slate-700 focus:outline-none"
      />

      <select
        defaultValue={initialStatus || ''}
        onChange={onStatusChange}
        className="rounded-md bg-slate-800 px-3 py-1 text-sm text-white border border-slate-700"
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>
        <option value="submitted">Submitted</option>
        <option value="under_review">Under review</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}
