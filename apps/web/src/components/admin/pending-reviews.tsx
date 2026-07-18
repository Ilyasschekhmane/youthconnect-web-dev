export function PendingReviews({ items }: { items: any[] }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Pending Reviews</h3>
        <p className="text-sm text-slate-400">{items.length} pending</p>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400">No items pending review</p>
        ) : (
          items.slice(0, 6).map((it) => (
            <div key={it.id} className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{it.programs?.name || '—'}</p>
                <p className="text-xs text-slate-400">{it.applicant_user_id || it.applicant_email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">{new Date(it.submitted_at || it.created_at).toLocaleDateString()}</p>
                <p className="text-xs text-slate-500">{it.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
