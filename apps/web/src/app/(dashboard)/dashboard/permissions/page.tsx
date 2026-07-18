import { requireRole } from '@/lib/auth/session';

const permissions = [
  { scope: 'Platform Admin', access: 'Full access' },
  { scope: 'City Manager', access: 'City and program controls' },
  { scope: 'Program Staff', access: 'Application and document review' },
];

export default async function PermissionsPage() {
  const session = await requireRole('applicant');
  if (!session) return null;

  return (
    <main className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/10 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Permissions</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Access control matrix</h1>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300">
            Role-based governance
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {permissions.map((permission) => (
            <div key={permission.scope} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-white">{permission.scope}</p>
              <p className="text-sm text-slate-400">{permission.access}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
