import { getCurrentUser, getUserApplications, getApplicationHistory, getServerSupabase } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { FileText, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

export default async function HistoryPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch all user applications
  const applications = await getUserApplications(user.id);

  // Fetch audit logs for all user applications
  const supabase = await getServerSupabase();
  const applicationIds = applications.map((a) => a.id);

  let allAudits: any[] = [];
  if (applicationIds.length > 0) {
    const { data: audits } = await supabase
      .from('audit_logs')
      .select('id, entity_id, entity_type, action, details, created_at, actor_user_id')
      .in('entity_id', applicationIds)
      .order('created_at', { ascending: false })
      .limit(200);

    allAudits = audits || [];
  }

  // Group audits by application
  const auditsByApp: Record<string, any[]> = {};
  applications.forEach((app) => {
    auditsByApp[app.id] = [];
  });

  allAudits.forEach((audit) => {
    if (auditsByApp[audit.entity_id]) {
      auditsByApp[audit.entity_id].push(audit);
    }
  });

  // Helper to get icon for action
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <FileText className="h-4 w-4 text-cyan-400" />;
      case 'approve':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'reject':
        return <XCircle className="h-4 w-4 text-rose-400" />;
      case 'submit':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'update':
        return <AlertCircle className="h-4 w-4 text-amber-400" />;
      default:
        return <FileText className="h-4 w-4 text-slate-400" />;
    }
  };

  // Helper to get action display text
  const getActionText = (action: string, details?: any) => {
    switch (action) {
      case 'create':
        return 'Application created';
      case 'submit':
        return 'Application submitted for review';
      case 'approve':
        return `Application approved${details?.notes ? ': ' + details.notes : ''}`;
      case 'reject':
        return `Application rejected${details?.reason ? ': ' + details.reason : ''}`;
      case 'update':
        return 'Application updated';
      default:
        return action.charAt(0).toUpperCase() + action.slice(1);
    }
  };

  return (
    <main className="space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Application History</h1>
        <p className="text-sm text-slate-400 mt-1">
          Track all changes and status updates for your applications
        </p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <FileText className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-300 font-semibold">No applications yet</p>
              <p className="text-slate-400 text-sm mt-2">
                Your application history will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const audits = auditsByApp[app.id] || [];
            return (
              <Card key={app.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{Array.isArray(app.programs) ? (app.programs as any)[0]?.name : (app.programs as any)?.name}</CardTitle>
                                            <p className="text-sm text-slate-400 mt-1">{Array.isArray(app.cities) ? (app.cities as any)[0]?.name : (app.cities as any)?.name}</p>
                    </div>
                    <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-200">
                      {audits.length} events
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {audits.length === 0 ? (
                    <p className="text-sm text-slate-400">No activity recorded</p>
                  ) : (
                    <div className="space-y-4">
                      {audits.map((audit, idx) => (
                        <div key={audit.id} className="flex gap-4">
                          {/* Timeline line */}
                          <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-slate-700 bg-slate-900">
                              {getActionIcon(audit.action)}
                            </div>
                            {idx !== audits.length - 1 && (
                              <div className="h-12 w-0.5 bg-slate-700 mt-2" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {getActionText(audit.action, audit.details)}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                  {new Date(audit.created_at).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Additional details for specific actions */}
                            {audit.action === 'approve' && audit.details?.notes && (
                              <div className="mt-2 p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <p className="text-xs text-emerald-300">
                                  <strong>Notes:</strong> {audit.details.notes}
                                </p>
                              </div>
                            )}
                            {audit.action === 'reject' && audit.details?.reason && (
                              <div className="mt-2 p-2 rounded bg-rose-500/10 border border-rose-500/20">
                                <p className="text-xs text-rose-300">
                                  <strong>Reason:</strong> {audit.details.reason}
                                </p>
                              </div>
                            )}
                            {audit.action === 'update' && audit.details?.metadata && (
                              <div className="mt-2 p-2 rounded bg-blue-500/10 border border-blue-500/20">
                                <p className="text-xs text-blue-300">
                                  <strong>Updated fields:</strong> {JSON.stringify(audit.details.metadata).slice(0, 100)}...
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
