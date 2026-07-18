'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type DashboardShellProps = {
  title: string;
  description: string;
  navigation: Array<{ href: string; label: string }>;
  children: ReactNode;
};

export function DashboardShell({ title, description, navigation, children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:flex-row lg:px-8 lg:py-6">
        <aside className="w-full shrink-0 rounded-[28px] border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-black/20 lg:w-72">
          <div className="mb-6 px-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">YouthConnect</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm text-slate-400">{description}</p>
          </div>
          <nav aria-label="Dashboard navigation" className="flex flex-col gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-2xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
