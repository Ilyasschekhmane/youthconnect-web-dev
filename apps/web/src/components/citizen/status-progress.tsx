import { CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';

interface StatusStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

interface CitizenStatusProgressProps {
  applicationStatus: string;
  submittedAt?: string;
  reviewStartedAt?: string;
  decidedAt?: string;
}

export function CitizenStatusProgress({
  applicationStatus,
  submittedAt,
  reviewStartedAt,
  decidedAt,
}: CitizenStatusProgressProps) {
  const steps: StatusStep[] = [
    {
      label: 'Created',
      status: 'completed',
      date: submittedAt ? new Date(submittedAt).toLocaleDateString() : undefined,
    },
    {
      label: 'Submitted',
      status: submittedAt ? 'completed' : 'pending',
      date: submittedAt ? new Date(submittedAt).toLocaleDateString() : undefined,
    },
    {
      label: 'Under Review',
      status:
        reviewStartedAt || applicationStatus === 'under_review'
          ? 'completed'
          : 'pending',
      date: reviewStartedAt
        ? new Date(reviewStartedAt).toLocaleDateString()
        : undefined,
    },
    {
      label: 'Decision',
      status:
        applicationStatus === 'approved' || applicationStatus === 'rejected'
          ? 'completed'
          : 'pending',
      date: decidedAt ? new Date(decidedAt).toLocaleDateString() : undefined,
    },
  ];

  const getIcon = (status: 'completed' | 'current' | 'pending') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case 'current':
        return <Clock className="h-5 w-5 text-cyan-400 animate-spin" />;
      default:
        return <FileText className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div key={step.label} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">{getIcon(step.status)}</div>
            {idx !== steps.length - 1 && (
              <div
                className={`h-12 w-0.5 mt-2 ${
                  step.status === 'completed'
                    ? 'bg-emerald-400'
                    : 'bg-slate-700'
                }`}
              />
            )}
          </div>

          <div className="flex-1 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    step.status === 'completed'
                      ? 'text-white'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-slate-500 mt-1">{step.date}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
