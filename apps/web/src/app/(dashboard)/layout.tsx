import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouthConnect Dashboard',
  description: 'Protected dashboard experience for YouthConnect.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-950">{children}</div>;
}
