import Link from 'next/link';

export function ApplicationCard({ app }: { app: any }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{app.programs?.name || 'Program'}</p>
          <p className="mt-1 text-sm text-slate-500">Applicant: {app.auth?.users?.email || app.applicant_user_id}</p>
          <p className="mt-1 text-xs text-slate-400">Status: <span className="font-medium">{app.status}</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">{new Date(app.created_at).toLocaleDateString()}</p>
          <Link href={`/dashboard/applications/${app.id}`} className="mt-2 inline-block text-sm text-emerald-600">View</Link>
        </div>
      </div>
    </div>
  );
}
