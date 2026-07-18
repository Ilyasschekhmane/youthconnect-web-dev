import { requireRole } from '@/lib/auth/session';

const users = [
  { name: 'Aimee Jordan', role: 'Platform Admin', status: 'Active' },
  { name: 'John Lee', role: 'City Manager', status: 'Active' },
  { name: 'Sofia Cruz', role: 'Program Staff', status: 'Pending invite' },
];

export default async function UsersPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Users</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Identity and access management</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            1,184 accounts
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div key={user.name} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="mt-1 text-sm text-slate-400">{user.role}</p>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-slate-200">{user.status}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
