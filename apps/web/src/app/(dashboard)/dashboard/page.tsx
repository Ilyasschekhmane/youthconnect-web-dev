import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';

const highlights = [
  { title: 'Active applications', value: '3', caption: '2 awaiting review' },
  { title: 'Upcoming appointments', value: '2', caption: 'Next: Friday at 10:00 AM' },
  { title: 'Documents verified', value: '4', caption: 'All required files are in order' },
];

const recentActivity = [
  'Your application for Founder Launchpad was moved to review.',
  'A new training session was added for the coming week.',
  'A reminder was sent for your next appointment.',
];

export default async function DashboardPage() {
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
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Welcome back, {session.email}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Keep your applications moving, review upcoming steps, and stay connected with your city support team.
            </p>
          </div>
          <Link href="/dashboard/applications" className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
            Open my applications
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/10">
            <p className="text-sm text-slate-400">{item.title}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.caption}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent activity</h2>
            <a href="/dashboard/notifications" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">
              View all
            </a>
          </div>
          <div className="mt-6 space-y-3">
            {recentActivity.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10">
          <h2 className="text-xl font-semibold text-white">Next steps</h2>
          <div className="mt-6 space-y-4">
            {[
              ['Upload missing document', 'Upload your business plan draft before the review deadline.'],
              ['Confirm appointment', 'Join your mentorship session on Friday at 10:00 AM.'],
              ['Explore training', 'Browse the new weekly workshop schedule.'],
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
