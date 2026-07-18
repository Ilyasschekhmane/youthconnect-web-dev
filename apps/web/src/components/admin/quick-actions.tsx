import Link from 'next/link';
import { Button } from '@/components/button';

export function QuickActions() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link href="/dashboard/admin/applications">
          <Button className="w-full">Review Applications</Button>
        </Link>
        <Link href="/dashboard/organizations">
          <Button variant="secondary" className="w-full">Manage Organizations</Button>
        </Link>
        <Link href="/dashboard/programs">
          <Button className="w-full">Create Program</Button>
        </Link>
        <Link href="/dashboard/reports">
          <Button variant="secondary" className="w-full">Export Reports</Button>
        </Link>
      </div>
    </div>
  );
}
