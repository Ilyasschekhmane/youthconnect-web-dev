export function ProgramsPanel({ programs }: { programs: any[] }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-white">Programs</h3>
      <div className="mt-4 space-y-3">
        {programs.length === 0 ? (
          <p className="text-sm text-slate-400">No programs</p>
        ) : (
          programs.slice(0, 6).map((p) => (
            <div key={p.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-xs text-slate-400">{p.city_id ? p.cities?.name : '—'}</p>
              </div>
              <div className="text-right text-sm text-slate-400">{p.capacity || '—'}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
