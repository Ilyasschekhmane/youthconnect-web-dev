import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap',
  {
    variants: {
      status: {
        draft: 'bg-slate-700 text-slate-100',
        submitted: 'bg-blue-900 text-blue-100',
        under_review: 'bg-amber-900 text-amber-100',
        approved: 'bg-emerald-900 text-emerald-100',
        rejected: 'bg-rose-900 text-rose-100',
        waitlisted: 'bg-purple-900 text-purple-100',
        withdrawn: 'bg-slate-800 text-slate-200',
        pending: 'bg-amber-900 text-amber-100',
        uploaded: 'bg-blue-900 text-blue-100',
        verified: 'bg-emerald-900 text-emerald-100',
        scheduled: 'bg-emerald-900 text-emerald-100',
        completed: 'bg-slate-700 text-slate-100',
        cancelled: 'bg-rose-900 text-rose-100',
        no_show: 'bg-rose-800 text-rose-100',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  className?: string;
  children: React.ReactNode;
}

export function StatusBadge({ status, className, children }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)}>
      {children}
    </span>
  );
}
