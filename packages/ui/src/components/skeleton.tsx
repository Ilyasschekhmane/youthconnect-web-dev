import * as React from 'react';
import { cn } from '../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export function Skeleton({ className, children, ...props }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800', className)} {...props}>
      {children}
    </div>
  );
}
