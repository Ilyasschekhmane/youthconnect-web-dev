import { Card, CardContent } from '@/components/card';
import { FileText, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

interface QuickStatProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'cyan' | 'emerald' | 'orange' | 'slate';
}

function QuickStat({ icon, label, value, color }: QuickStatProps) {
  const colorClasses = {
    cyan: 'text-cyan-400 bg-cyan-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
    orange: 'text-orange-400 bg-orange-500/10',
    slate: 'text-slate-400 bg-slate-500/10',
  };

  const { textColor, bgColor } = {
    cyan: { textColor: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
    emerald: { textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    orange: { textColor: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    slate: { textColor: 'text-slate-400', bgColor: 'bg-slate-500/10' },
  }[color];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bgColor}`}>
            <div className={textColor}>{icon}</div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface CitizenQuickStatsProps {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  upcomingAppointments: number;
}

export function CitizenQuickStats({
  totalApplications,
  pendingApplications,
  approvedApplications,
  upcomingAppointments,
}: CitizenQuickStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <QuickStat
        icon={<FileText className="h-5 w-5" />}
        label="Total Applications"
        value={totalApplications}
        color="cyan"
      />
      <QuickStat
        icon={<AlertCircle className="h-5 w-5" />}
        label="Under Review"
        value={pendingApplications}
        color="orange"
      />
      <QuickStat
        icon={<CheckCircle2 className="h-5 w-5" />}
        label="Approved"
        value={approvedApplications}
        color="emerald"
      />
      <QuickStat
        icon={<Calendar className="h-5 w-5" />}
        label="Upcoming Appointments"
        value={upcomingAppointments}
        color="slate"
      />
    </div>
  );
}
