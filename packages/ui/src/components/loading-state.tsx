import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function LoadingState({ title = 'Loading', description, className, ...props }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-8 py-12 text-center dark:border-slate-800 dark:bg-slate-950/70', className)} {...props}>
      <Loader2 className="mb-4 h-8 w-8 animate-spin text-slate-700 dark:text-slate-200" />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      {description ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p> : null}
    </div>
  );
}
