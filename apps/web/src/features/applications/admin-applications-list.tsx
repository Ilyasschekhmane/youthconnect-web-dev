import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/button';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
const CreateApplicationClient = dynamic(() => import('./create-application-client').then((m) => m.CreateApplicationClient), { ssr: false });

async function getDefaultOrganization() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { data } = await supabase
    .from('organizations')
    .select('id, name')
    .eq('status', 'active')
    .limit(1)
    .single();

  return data;
}

async function getOrganizationApplications(organizationId: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { data, error } = await supabase
    .from('applications')
    .select(
      `
      id,
      status,
      score,
      submitted_at,
      decision_at,
      created_at,
      programs (name),
      cities (name),
      applicant_user_id,
      documents (id, status),
      auth.users (
        id,
        email,
        user_metadata
      )
    `
    )
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    return [];
  }

  return data || [];
}

export async function AdminApplicationsList() {
  const org = await getDefaultOrganization();

  if (!org) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-slate-400">No organization found</p>
        </CardContent>
      </Card>
    );
  }

  const applications = await getOrganizationApplications(org.id);

  const pendingApplications = applications.filter(
    (a) => a.status === 'submitted' || a.status === 'under_review'
  );
  const approvedApplications = applications.filter((a) => a.status === 'approved');
  const rejectedApplications = applications.filter((a) => a.status === 'rejected');

  return (
    <div className="space-y-6">
      {/* Top actions */}
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <p className="text-sm font-semibold text-slate-400">Applications</p>
          <p className="text-lg font-bold text-white">Manage submissions</p>
        </div>
        <div>
          {/* Client-side create application modal */}
          {/* @ts-ignore Server -> Client component import allowed in this project */}
          <CreateApplicationClient orgId={org.id} programs={[]} cities={[]} />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Pending Review</p>
              <p className="text-3xl font-bold text-amber-400">{pendingApplications.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Approved</p>
              <p className="text-3xl font-bold text-emerald-400">{approvedApplications.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Rejected</p>
              <p className="text-3xl font-bold text-rose-400">{rejectedApplications.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Applications */}
      {pendingApplications.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <CardTitle>Pending Review ({pendingApplications.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-start justify-between rounded-lg border border-slate-700 p-4 hover:border-cyan-500 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <div>
                        <h4 className="font-semibold text-white">
                          {(app as any).auth?.users?.[0]?.user_metadata?.full_name || 
                           (app as any).auth?.users?.[0]?.email ||
                           'Unknown Applicant'}
                        </h4>
                        <p className="text-sm text-slate-400">
                          Program: {(app as any).programs?.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span>📄 {(app as any).documents?.length || 0} documents</span>
                      <span>
                        Submitted:{' '}
                        {app.submitted_at
                          ? new Date(app.submitted_at).toLocaleDateString()
                          : 'Not submitted'}
                      </span>
                    </div>
                  </div>
                  <Link href={`/dashboard/admin/applications/${app.id}`}>
                    <Button size="sm">Review</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Approved Applications */}
      {approvedApplications.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <CardTitle>Approved ({approvedApplications.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvedApplications.slice(0, 5).map((app) => (
                <div key={app.id} className="flex items-center justify-between rounded-lg border border-slate-700 p-3">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {(app as any).auth?.users?.[0]?.user_metadata?.full_name || 
                       (app as any).auth?.users?.[0]?.email}
                    </p>
                    <p className="text-xs text-slate-400">{(app as any).programs?.name}</p>
                  </div>
                  <StatusBadge status="approved">Approved</StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {applications.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-slate-400">No applications yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
