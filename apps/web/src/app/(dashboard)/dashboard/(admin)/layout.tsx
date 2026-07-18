import type { ReactNode } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';

const navigation = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/cities', label: 'Cities' },
  { href: '/dashboard/organizations', label: 'Organizations' },
  { href: '/dashboard/users', label: 'Users' },
  { href: '/dashboard/reports', label: 'Reports' },
  { href: '/dashboard/analytics', label: 'Analytics' },
  { href: '/dashboard/system-health', label: 'System Health' },
  { href: '/dashboard/audit-logs', label: 'Audit Logs' },
  { href: '/dashboard/permissions', label: 'Permissions' },
  { href: '/dashboard/role-management', label: 'Role Management' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell title="National Admin" description="Platform-wide governance, operations, and oversight at scale." navigation={navigation}>
      {children}
    </DashboardShell>
  );
}
