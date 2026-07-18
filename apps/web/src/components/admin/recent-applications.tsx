import Link from 'next/link';

export function RecentApplications({ applications }: { applications: any[] }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Recent Applications</h3>
        <Link href="/dashboard/admin/applications" className="text-sm text-slate-400 hover:text-slate-200">
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {applications.length === 0 ? (
          <p className="text-sm text-slate-400">No recent applications</p>
        ) : (
          applications.slice(0, 6).map((app) => (
            <div key={app.id} className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{app.programs?.name || '—'}</p>
                <p className="text-xs text-slate-400">{app.applicant_user_id || app.applicant_email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">{new Date(app.created_at).toLocaleDateString()}</p>
                <p className="text-xs text-slate-500">{app.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
