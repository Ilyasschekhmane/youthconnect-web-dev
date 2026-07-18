import * as React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-8 py-12 text-center dark:border-slate-700 dark:bg-slate-950/60', className)} {...props}>
      <div className="mb-4 rounded-full bg-slate-100 p-3 text-slate-600 dark:bg-slate-800 dark:text-slate-200">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
