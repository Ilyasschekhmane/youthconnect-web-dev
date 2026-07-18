import { requireRole } from '@/lib/auth/session';

const roles = [
  { name: 'Super Admin', scope: 'Platform-wide administration' },
  { name: 'City Admin', scope: 'Multi-program oversight' },
  { name: 'Program Manager', scope: 'Applicant and workflow controls' },
];

export default async function RoleManagementPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Role Management</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Governance roles</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            Scalable by region
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {roles.map((role) => (
            <div key={role.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="font-semibold text-white">{role.name}</p>
              <p className="mt-2 text-sm text-slate-400">{role.scope}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
