import * as React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tone?: 'success' | 'error' | 'info';
}

export function Toast({ title, description, tone = 'info', className, ...props }: ToastProps) {
  const toneStyles = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-200',
    error: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-200',
    info: 'border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100',
  };

  const Icon = tone === 'success' ? CheckCircle2 : tone === 'error' ? XCircle : CheckCircle2;

  return (
    <div className={cn('flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-sm', toneStyles[tone], className)} role="status" {...props}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="space-y-1">
        <p className="text-sm font-semibold">{title}</p>
        {description ? <p className="text-sm opacity-80">{description}</p> : null}
      </div>
    </div>
  );
}
