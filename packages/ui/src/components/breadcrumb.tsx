import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm text-slate-600 dark:text-slate-400', className)} {...props}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : null}
              {isLast || !item.href ? (
                <span className="font-medium text-slate-900 dark:text-slate-100">{item.label}</span>
              ) : (
                <a href={item.href} className="transition hover:text-slate-900 dark:hover:text-slate-50">
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
