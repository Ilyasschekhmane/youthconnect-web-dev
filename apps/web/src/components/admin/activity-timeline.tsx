export function ActivityTimeline({ events }: { events: any[] }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-white">Activity Timeline</h3>
      <div className="mt-4 space-y-4">
        {events.length === 0 ? (
          <p className="text-sm text-slate-400">No recent activity</p>
        ) : (
          events.slice(0, 8).map((ev) => (
            <div key={ev.id} className="flex items-start gap-3">
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-slate-800/40 flex items-center justify-center text-xs text-slate-300">
                {ev.action ? ev.action.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{ev.details?.summary || ev.details?.message || ev.entity_type}</p>
                <p className="text-xs text-slate-400 mt-1">{new Date(ev.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
