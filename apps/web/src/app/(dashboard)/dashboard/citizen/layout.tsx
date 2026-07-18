import type { ReactNode } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';

const navigation = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/profile', label: 'Profile' },
  { href: '/dashboard/applications', label: 'Applications' },
  { href: '/dashboard/history', label: 'History' },
  { href: '/dashboard/documents', label: 'Documents' },
  { href: '/dashboard/notifications', label: 'Notifications' },
];

export default function CitizenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardShell
      title="Citizen Portal"
      description="Manage your applications and personal information."
      navigation={navigation}
    >
      {children}
    </DashboardShell>
  );
}