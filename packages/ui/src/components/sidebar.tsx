import * as React from 'react';
import { cn } from '../lib/utils';

export interface SidebarItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  items: SidebarItem[];
}

export function Sidebar({ title, items, className, ...props }: SidebarProps) {
  return (
    <aside className={cn('w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950', className)} {...props}>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{title}</h2>
      <nav className="space-y-1" aria-label="Sidebar navigation">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href ?? '#'}
            className={cn(
              'flex items-center rounded-xl px-3 py-2 text-sm transition',
              item.active ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
