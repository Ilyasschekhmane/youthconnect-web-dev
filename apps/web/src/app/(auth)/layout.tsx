import type { Metadata } from 'next';
import { buildMetadataDescription, buildPageTitle } from '@/lib/seo';

export const metadata: Metadata = {
  title: buildPageTitle('Authentication'),
  description: buildMetadataDescription('Sign in, create an account, and recover access to your YouthConnect workspace securely.'),
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-950">{children}</div>;
}
