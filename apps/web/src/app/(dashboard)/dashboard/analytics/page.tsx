import { requireRole } from '@/lib/auth/session';

const metrics = [
  { label: 'Conversion rate', value: '38%' },
  { label: 'Retention', value: '84%' },
  { label: 'Staff utilization', value: '76%' },
];

export default async function AnalyticsPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Analytics</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Performance insights</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            Real-time snapshot
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
