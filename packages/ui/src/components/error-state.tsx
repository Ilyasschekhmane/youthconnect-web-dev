import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function ErrorState({ title = 'Something went wrong', description, action, className, ...props }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-8 py-12 text-center dark:border-rose-900/50 dark:bg-rose-950/40', className)} {...props}>
      <div className="mb-4 rounded-full bg-rose-100 p-3 text-rose-700 dark:bg-rose-900/50 dark:text-rose-200">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-rose-900 dark:text-rose-100">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-rose-700 dark:text-rose-300">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
