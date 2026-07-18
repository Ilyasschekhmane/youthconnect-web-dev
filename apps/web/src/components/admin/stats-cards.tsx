import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  delta?: number;
  trend?: 'up' | 'down';
  spark?: string; // svg path for sparkline
}

export function StatCard({ title, value, delta, trend, spark }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="flex flex-col items-end">
          {delta !== undefined && (
            <div className={cn('inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium', trend === 'up' ? 'bg-emerald-900 text-emerald-200' : 'bg-rose-900 text-rose-200')}>
              {trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(delta)}%</span>
            </div>
          )}
          {spark && (
            <svg className="mt-2 h-8 w-24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={spark} stroke="#06b6d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
