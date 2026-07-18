'use client';

import { useState } from 'react';
import { ApplicationForm } from '@/components/applications-application-form';
import { createApplication } from '@/lib/db/mutations';
import { useRouter } from 'next/navigation';

export function CreateApplicationClient({ programs = [], cities = [], orgId }: { programs?: any[]; cities?: any[]; orgId?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    // data contains programId, cityId, applicantEmail, notes
    try {
      // createApplication expects organizationId, programId, cityId, userId (current user) — we'll call without userId and let mutation use current session user
      await createApplication(orgId as string, data.programId, data.cityId, (data.applicantEmail as string) ?? '');
      setOpen(false);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create');
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white">New application</button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Create application</h3>
              <button onClick={() => setOpen(false)} className="text-sm text-slate-500">Close</button>
            </div>
            <div className="mt-4">
              <ApplicationForm programs={programs} cities={cities} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
