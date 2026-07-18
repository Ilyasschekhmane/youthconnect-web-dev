import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';

const metrics = [
  { title: 'Programs live', value: '12', caption: 'Across 4 cities' },
  { title: 'Applications in review', value: '86', caption: '14 need follow-up' },
  { title: 'Documents pending', value: '23', caption: 'Awaiting staff action' },
];

const recentWork = [
  'Founder Launchpad moved 18 applicants into the interview stage.',
  'The Austin team added a new mentorship session for this week.',
  'Daily analytics were refreshed for all active programs.',
];

export default async function OrganizationOverviewPage() {
  const session = await requireRole('applicant');

  if (!session) {
    return null;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/15 to-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Overview</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Organization operations center</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Review program health, triage applicant flow, and coordinate your staff with a single operational hub.
            </p>
          </div>
          <Link href="/dashboard/programs" className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            Manage programs
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((item) => (
          <div key={item.title} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/10">
            <p className="text-sm text-slate-400">{item.title}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.caption}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10">
          <h2 className="text-xl font-semibold text-white">Recent operations</h2>
          <div className="mt-6 space-y-3">
            {recentWork.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10">
          <h2 className="text-xl font-semibold text-white">Priority actions</h2>
          <div className="mt-6 space-y-4">
            {[
              ['Review document queue', '23 documents need staff confirmation today.'],
              ['Confirm interviews', '8 applicant interviews are scheduled for this week.'],
              ['Share analytics summary', 'Leadership update is ready for distribution.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="font-medium text-white">{title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
