export function StatusTimeline({ history }: { history: any[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Status Timeline</h3>
      <div className="mt-3 space-y-3">
        {history.length === 0 ? (
          <p className="text-sm text-slate-500">No history available</p>
        ) : (
          history.map((h) => (
            <div key={h.id} className="flex items-start gap-3">
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-slate-100 text-xs dark:bg-slate-800 flex items-center justify-center">{(h.action || 'x').charAt(0).toUpperCase()}</div>
              <div>
                <p className="text-sm font-medium">{h.action}</p>
                <p className="text-xs text-slate-500">{new Date(h.created_at).toLocaleString()}</p>
                {h.details?.summary ? <p className="mt-1 text-sm text-slate-600">{h.details.summary}</p> : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
