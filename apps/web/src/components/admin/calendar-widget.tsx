export function CalendarWidget({ events }: { events: any[] }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Calendar</h3>
        <p className="text-xs text-slate-400">Upcoming</p>
      </div>

      <div className="mt-4 space-y-3">
        {events.length === 0 ? (
          <p className="text-sm text-slate-400">No upcoming events</p>
        ) : (
          events.slice(0, 6).map((e) => (
            <div key={e.id} className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white">{e.appointment_type || e.title || 'Appointment'}</p>
                <p className="text-xs text-slate-400">{new Date(e.starts_at).toLocaleString()}</p>
              </div>
              <div className="text-xs text-slate-400">{e.status}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
