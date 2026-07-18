import type { ReactNode } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';

const navigation = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/programs', label: 'Manage Programs' },
  { href: '/dashboard/applications', label: 'Applications' },
  { href: '/dashboard/applicants', label: 'Applicants' },
  { href: '/dashboard/documents', label: 'Documents' },
  { href: '/dashboard/reports', label: 'Reports' },
  { href: '/dashboard/analytics', label: 'Analytics' },
  { href: '/dashboard/calendar', label: 'Calendar' },
  { href: '/dashboard/notifications', label: 'Notifications' },
];

export default function OrganizationLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell title="Organization Hub" description="Operational oversight for programs, applicants, and city delivery." navigation={navigation}>
      {children}
    </DashboardShell>
  );
}
