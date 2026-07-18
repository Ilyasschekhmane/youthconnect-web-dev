import * as React from 'react';
import { cn } from '../lib/utils';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: React.ReactNode;
  actions?: React.ReactNode;
}

export function Navbar({ brand, actions, className, children, ...props }: NavbarProps) {
  return (
    <header className={cn('border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80', className)} {...props}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">{brand}</div>
        <div className="flex items-center gap-3">{actions}</div>
      </div>
      {children ? <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-6 lg:px-8">{children}</div> : null}
    </header>
  );
}
