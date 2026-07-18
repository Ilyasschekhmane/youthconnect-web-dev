export function DocumentsList({ documents }: { documents: any[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Documents</h3>
      <div className="mt-3 space-y-3">
        {(!documents || documents.length === 0) ? (
          <p className="text-sm text-slate-500">No documents uploaded</p>
        ) : (
          documents.map((d) => (
            <div key={d.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{d.file_name}</p>
                <p className="text-xs text-slate-500">{d.document_type} • {d.status}</p>
              </div>
              <a href={d.file_url} target="_blank" rel="noreferrer" className="text-sm text-emerald-600">Open</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
