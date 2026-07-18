import { requireRole } from '@/lib/auth/session';

const checks = [
  { name: 'Supabase API', status: 'Operational' },
  { name: 'Authentication', status: 'Operational' },
  { name: 'Storage', status: 'Degraded' },
];

export default async function SystemHealthPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">System Health</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Infrastructure status</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            99.9% uptime
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {checks.map((check) => (
            <div key={check.name} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-white">{check.name}</p>
              <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">{check.status}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
