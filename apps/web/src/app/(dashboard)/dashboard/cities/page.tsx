import { requireRole } from '@/lib/auth/session';

const cities = [
  { name: 'Chicago', organizations: 6, status: 'Healthy' },
  { name: 'Austin', organizations: 4, status: 'Monitoring' },
  { name: 'Denver', organizations: 3, status: 'Healthy' },
];

export default async function CitiesPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Cities</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">City network overview</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            28 cities active
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {cities.map((city) => (
            <div key={city.name} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{city.name}</p>
                <p className="mt-1 text-sm text-slate-400">{city.organizations} organizations connected</p>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">{city.status}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
