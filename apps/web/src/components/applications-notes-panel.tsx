export function NotesPanel({ notes }: { notes?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-sm font-semibold">Notes</h3>
      <div className="mt-3">
        {notes ? <p className="text-sm text-slate-700 dark:text-slate-300">{notes}</p> : <p className="text-sm text-slate-500">No notes</p>}
      </div>
    </div>
  );
}
