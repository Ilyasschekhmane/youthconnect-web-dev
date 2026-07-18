import { requireRole } from '@/lib/auth/session';

const documents = [
  { name: 'Business plan draft.pdf', status: 'Verified', updated: 'Today' },
  { name: 'Identification document.jpg', status: 'Pending review', updated: 'Yesterday' },
  { name: 'Resume.pdf', status: 'Uploaded', updated: '2 days ago' },
];

export default async function DocumentsPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Documents</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Your uploaded files</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            3 documents shared
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {documents.map((document) => (
            <div key={document.name} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{document.name}</p>
                <p className="mt-1 text-sm text-slate-400">Updated {document.updated}</p>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">{document.status}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
