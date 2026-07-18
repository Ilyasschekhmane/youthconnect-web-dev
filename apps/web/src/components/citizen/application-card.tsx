import Link from 'next/link';
import { Card } from '@/components/card';
import { StatusBadge } from '@/components/status-badge';
import { FileText, ArrowRight, Calendar } from 'lucide-react';

interface CitizenApplicationCardProps {
  id: string;
  programName: string;
  cityName: string;
  status: string;
  submittedAt?: string;
  decidedAt?: string;
  score?: number;
}

export function CitizenApplicationCard({
  id,
  programName,
  cityName,
  status,
  submittedAt,
  decidedAt,
  score,
}: CitizenApplicationCardProps) {
  return (
    <Link href={`/dashboard/applications/${id}`}>
      <Card className="hover:border-cyan-500/50 transition cursor-pointer">
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <h3 className="font-semibold text-white truncate">{programName}</h3>
              </div>
              <p className="text-sm text-slate-400">{cityName}</p>
              
              <div className="flex items-center gap-3 mt-3">
                {submittedAt && (
                  <p className="text-xs text-slate-500">
                    📤 {new Date(submittedAt).toLocaleDateString()}
                  </p>
                )}
                {score !== undefined && status === 'approved' && (
                  <p className="text-xs text-emerald-400 font-medium">
                    Score: {score}/100
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <StatusBadge status={status as any}>{status}</StatusBadge>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
