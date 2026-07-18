import { requireRole } from '@/lib/auth/session';

const trainingItems = [
  { title: 'Pitch deck essentials', time: 'Wednesday · 6:00 PM' },
  { title: 'Customer discovery workshop', time: 'Thursday · 5:30 PM' },
  { title: 'Grant writing clinic', time: 'Friday · 4:00 PM' },
];

export default async function TrainingPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Training</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Upcoming learning opportunities</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            3 live sessions
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {trainingItems.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm text-slate-400">{item.time}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
