import { requireRole } from '@/lib/auth/session';

const logs = [
  { action: 'Role granted', actor: 'Aimee Jordan', time: '10 min ago' },
  { action: 'Organization approved', actor: 'John Lee', time: '52 min ago' },
  { action: 'Program updated', actor: 'Sofia Cruz', time: '2 hrs ago' },
];

export default async function AuditLogsPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Audit Logs</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Compliance history</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            Immutable timeline
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {logs.map((log) => (
            <div key={log.action} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="font-semibold text-white">{log.action}</p>
              <p className="mt-2 text-sm text-slate-400">By {log.actor} · {log.time}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
