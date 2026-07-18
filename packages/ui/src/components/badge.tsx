import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900',
        secondary: 'border-transparent bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
        success: 'border-transparent bg-emerald-600/15 text-emerald-700 dark:text-emerald-300',
        warning: 'border-transparent bg-amber-600/15 text-amber-700 dark:text-amber-300',
        destructive: 'border-transparent bg-rose-600/15 text-rose-700 dark:text-rose-300',
        outline: 'border-slate-300 bg-transparent text-slate-700 dark:border-slate-700 dark:text-slate-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
