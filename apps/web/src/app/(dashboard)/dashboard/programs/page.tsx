import { requireRole } from '@/lib/auth/session';

const programs = [
  { name: 'Founder Launchpad', status: 'Active', city: 'Chicago', cohort: 'Spring 2026' },
  { name: 'Capital Readiness', status: 'Reviewing', city: 'Austin', cohort: 'Summer 2026' },
  { name: 'Community Studio', status: 'Draft', city: 'Denver', cohort: 'Fall 2026' },
];

export default async function ProgramsPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Manage Programs</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Program portfolio</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            3 active offerings
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {programs.map((program) => (
            <div key={program.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{program.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{program.city} · {program.cohort}</p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">{program.status}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
