import { getCurrentUser, getUserApplications, getPrograms } from '@/lib/db/queries';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/card';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/button';
import { FileText, Plus, Calendar } from 'lucide-react';

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

export async function CitizenDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-slate-400">
              Please log in to view your dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const applications = await getUserApplications(user.id);
  const org = await getDefaultOrganization();
  const programs = await getPrograms(org?.id);

  const recentApplications = applications.slice(0, 5);
  const statusCounts = {
    draft: applications.filter((a) => a.status === 'draft').length,
    submitted: applications.filter((a) => a.status === 'submitted').length,
    approved: applications.filter((a) => a.status === 'approved').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Welcome, {user.user_metadata?.full_name || user.email}</CardTitle>
          <CardDescription>
            Manage your applications and track your progress through the programs
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Draft Applications</p>
              <p className="text-3xl font-bold text-white">{statusCounts.draft}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Submitted</p>
              <p className="text-3xl font-bold text-cyan-400">{statusCounts.submitted}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Approved</p>
              <p className="text-3xl font-bold text-emerald-400">{statusCounts.approved}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">Rejected</p>
              <p className="text-3xl font-bold text-rose-400">{statusCounts.rejected}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Programs */}
      {programs.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Available Programs</CardTitle>
              <Plus className="h-5 w-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="flex items-start justify-between rounded-lg border border-slate-700 p-4 hover:border-cyan-500 transition"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{program.name}</h4>
                    <p className="text-sm text-slate-400 mt-1">{program.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>
                        Deadline:{' '}
                        {program.application_close_at
                          ? new Date(program.application_close_at).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <Link href={`/dashboard/applications/new?program=${program.id}`}>
                    <Button size="sm">Apply</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Applications */}
      {recentApplications.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <Link
                  key={app.id}
                  href={`/dashboard/applications/${app.id}`}
                  className="block rounded-lg border border-slate-700 p-4 hover:border-cyan-500 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <h4 className="font-semibold text-white">
                          {Array.isArray(app.programs) ? (app.programs as any)[0]?.name : (app.programs as any)?.name}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                      Location: {Array.isArray(app.cities) ? (app.cities as any)[0]?.name : (app.cities as any)?.name || 'N/A'}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Submitted:{' '}
                        {app.submitted_at
                          ? new Date(app.submitted_at).toLocaleDateString()
                          : 'Not submitted'}
                      </p>
                    </div>
                    <StatusBadge status={app.status as any}>
                      {app.status.replace('_', ' ').charAt(0).toUpperCase() +
                        app.status.slice(1).replace('_', ' ')}
                    </StatusBadge>
                  </div>
                  {app.documents && app.documents.length > 0 && (
                    <div className="mt-3 text-xs text-slate-400">
                      📎 {app.documents.length} document(s)
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-slate-400 mb-4">You haven&apos;t applied to any programs yet</p>
              <p className="text-sm text-slate-500">
                Browse available programs above and submit your first application
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
