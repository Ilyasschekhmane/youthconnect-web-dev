import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/tokens.css';
import { SkipLink } from '@/components/skip-link';
import { buildMetadataDescription, buildPageTitle } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: buildPageTitle('Home'),
  description: buildMetadataDescription('YouthConnect is a modern GovTech platform for youth entrepreneurship centers, applications, and operations.'),
  metadataBase: new URL('https://youthconnect.example'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'YouthConnect',
    description: 'Modern public sector software for youth entrepreneurship programs.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
