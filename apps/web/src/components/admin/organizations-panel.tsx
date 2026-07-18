export function OrganizationsPanel({ organizations }: { organizations: any[] }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-white">Organizations</h3>
      <div className="mt-4 space-y-3">
        {organizations.length === 0 ? (
          <p className="text-sm text-slate-400">No organizations</p>
        ) : (
          organizations.slice(0, 6).map((org) => (
            <div key={org.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{org.name}</p>
                <p className="text-xs text-slate-400">{org.slug}</p>
              </div>
              <div className="text-right text-sm text-slate-400">{new Date(org.created_at).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
