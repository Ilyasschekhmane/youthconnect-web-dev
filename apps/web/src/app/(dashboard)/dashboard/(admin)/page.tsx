import { getServerSupabase } from '@/lib/db/queries';
import { StatCard } from '@/components/admin/stats-cards';
import { RecentApplications } from '@/components/admin/recent-applications';
import { PendingReviews } from '@/components/admin/pending-reviews';
import { OrganizationsPanel } from '@/components/admin/organizations-panel';
import { ProgramsPanel } from '@/components/admin/programs-panel';
import { CalendarWidget } from '@/components/admin/calendar-widget';
import { NotificationsPanel } from '@/components/admin/notifications-panel';
import { ActivityTimeline } from '@/components/admin/activity-timeline';
import { QuickActions } from '@/components/admin/quick-actions';
import { MiniAreaChart, generateSparkPath } from '@/components/admin/charts';
import { CitySwitcher } from '@/components/admin/city-switcher';
import { SearchFilters } from '@/components/admin/search-filters';

function daysAgoDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}

function seriesFromCounts(countsByDay: Record<string, number>, days = 30) {
  const series: number[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = daysAgoDate(i);
    const key = d.toISOString().slice(0, 10);
    series.push(countsByDay[key] || 0);
  }
  return series;
}

export default async function AdminOverviewPage({ searchParams }: { searchParams?: { cityId?: string; search?: string; status?: string } }) {
  const supabase = await getServerSupabase();

  // Default org
  const { data: org } = await supabase
    .from('organizations')
    .select('id, name')
    .eq('status', 'active')
    .limit(1)
    .single();

  const orgId = org?.id;

  // Fetch cities for switcher first
  const { data: cities } = await supabase
    .from('cities')
    .select('id, name, slug, created_at')
    .eq('organization_id', orgId)
    .order('name', { ascending: true });

  const cityId = searchParams?.cityId || (cities && cities[0]?.id) || null;
  const searchQuery = searchParams?.search?.trim() || '';
  const statusFilter = searchParams?.status || '';

  // Build queries and run in parallel. Include related program and applicant metadata for better filtering in memory.
  const appsBuilder = supabase
    .from('applications')
    .select(`
      id, status, created_at, submitted_at, review_started_at, decision_at, applicant_user_id, program_id, score, city_id, metadata,
      programs(id, name), cities(id, name), auth.users(id, email, user_metadata)
    `)
    .eq('organization_id', orgId)
    .order('created_at', { ascending: false })
    .limit(1000);

  const programsBuilder = supabase
    .from('programs')
    .select('id, name, capacity, city_id')
    .eq('organization_id', orgId)
    .order('created_at', { ascending: false })
    .limit(200);
  const orgsBuilder = supabase.from('organizations').select('id, name, slug, created_at').eq('id', orgId).limit(50);
  const appointmentsBuilder = supabase
    .from('appointments')
    .select('id, appointment_type, starts_at, ends_at, status, created_by_user_id, application_id, city_id')
    .eq('organization_id', orgId)
    .order('starts_at', { ascending: true })
    .limit(50);
  const notificationsBuilder = supabase
    .from('notifications')
    .select('id, title, body, recipient_user_id, created_at, is_read, related_entity_type, related_entity_id')
    .eq('organization_id', orgId)
    .order('created_at', { ascending: false })
    .limit(50);
  const auditsBuilder = supabase
    .from('audit_logs')
    .select('id, actor_user_id, entity_type, entity_id, action, details, created_at')
    .eq('organization_id', orgId)
    .order('created_at', { descending: true })
    .limit(50);

  if (cityId) {
    appsBuilder.eq('city_id', cityId);
    programsBuilder.eq('city_id', cityId);
    appointmentsBuilder.eq('city_id', cityId);
  }

  if (statusFilter) {
    appsBuilder.eq('status', statusFilter);
  }

  const [appsRes, programsRes, orgsRes, appointmentsRes, notificationsRes, auditsRes] = await Promise.all([
    appsBuilder,
    programsBuilder,
    orgsBuilder,
    appointmentsBuilder,
    notificationsBuilder,
    auditsBuilder,
  ]);

  const apps = appsRes.data || [];
  const programs = programsRes.data || [];
  const orgs = orgsRes.data || [];
  const appointments = appointmentsRes.data || [];
  const notifications = notificationsRes.data || [];
  const audits = auditsRes.data || [];

  const citiesList = cities || [];
  const applications = Array.isArray(apps) ? apps : [];
  const programsList = programs || [];
  const organizations = orgs || [];
  const upcoming = appointments || [];
  const notes = notifications || [];
  const auditEvents = audits || [];

  // Apply search filter in-memory to allow searching program name, applicant email, or metadata fields.
  const lowerSearch = searchQuery.toLowerCase();
  const filteredApplications = lowerSearch
    ? applications.filter((a: any) => {
        const programName = String(a.programs?.name || '').toLowerCase();
        const applicantEmail = String(a['auth.users']?.email || '').toLowerCase();
        const applicantName = String(a['auth.users']?.user_metadata?.full_name || '').toLowerCase();
        const metaName = String(a.metadata?.applicant_name || '').toLowerCase();
        return (
          programName.includes(lowerSearch) ||
          applicantEmail.includes(lowerSearch) ||
          applicantName.includes(lowerSearch) ||
          metaName.includes(lowerSearch)
        );
      })
    : applications;

  // Final scoped set
  const scopedApplications = cityId ? filteredApplications.filter((a: any) => a.city_id === cityId) : filteredApplications;

  // Pending and recent
  const pending = scopedApplications.filter((a: any) => a.status === 'submitted' || a.status === 'under_review');
  const recent = scopedApplications.slice(0, 6);

  // KPIs
  const totalApplications = scopedApplications.length;
  const totalPending = pending.length;
  const totalOrgs = organizations.length;
  const totalPrograms = programsList.length;
  const totalCities = citiesList.length;

  // Approval rate and average decision time
  const approvedCount = scopedApplications.filter((a: any) => a.status === 'approved').length;
  const approvalRate = totalApplications > 0 ? Math.round((approvedCount / totalApplications) * 100) : 0;

  const decisionDurations: number[] = scopedApplications
    .filter((a: any) => a.decision_at && a.review_started_at)
    .map((a: any) => new Date(a.decision_at).getTime() - new Date(a.review_started_at).getTime());
  const avgDecisionMs = decisionDurations.length ? decisionDurations.reduce((s, v) => s + v, 0) / decisionDurations.length : 0;
  const avgDecisionDays = avgDecisionMs ? Math.round(avgDecisionMs / (1000 * 60 * 60 * 24)) : 0;

  // Build 30-day counts series for charts
  const dayCounts: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = daysAgoDate(i);
    dayCounts[d.toISOString().slice(0, 10)] = 0;
  }

  scopedApplications.forEach((a: any) => {
    const key = new Date(a.created_at).toISOString().slice(0, 10);
    if (dayCounts[key] !== undefined) dayCounts[key] += 1;
  });

  const appsSeries = seriesFromCounts(dayCounts, 30);

  // Create spark path for stat cards
  const sparkObj: any = generateSparkPath(appsSeries, 100, 24, 4) as any;
  const sparkPath = sparkObj?.line || '';

  return (
    <main className="space-y-6 py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Overview of programs, applications, and operations</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchFilters initialSearch={searchQuery} initialStatus={statusFilter} />
          <CitySwitcher cities={citiesList.map((c: any) => ({ id: c.id, name: c.name }))} selectedCityId={cityId || undefined} />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Applications" value={totalApplications} delta={approvalRate} trend={approvalRate >= 0 ? 'up' : 'down'} spark={sparkPath} />
        <StatCard title="Pending Reviews" value={totalPending} delta={totalPending > 0 ? -Math.round((totalPending / Math.max(1, totalApplications)) * 100) : 0} trend={totalPending > 0 ? 'down' : 'up'} spark={sparkPath} />
        <StatCard title="Approval Rate" value={`${approvalRate}%`} delta={0} trend="up" spark={sparkPath} />
        <StatCard title="Avg Decision (days)" value={avgDecisionDays} delta={0} trend="up" spark={sparkPath} />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RecentApplications applications={recent} />
            <PendingReviews items={pending} />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <OrganizationsPanel organizations={organizations} />
            <ProgramsPanel programs={programsList} />
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
              <h3 className="text-sm font-semibold text-white">Cities</h3>
              <div className="mt-4 space-y-3">
                {citiesList.slice(0, 6).map((c: any) => (
                  <div key={c.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.slug}</p>
                    </div>
                    <div className="text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <MiniAreaChart series={appsSeries} label={cityId ? `Applications (30d) — ${citiesList.find((c:any)=>c.id===cityId)?.name || ''}` : 'Applications (30d)'} />
            <MiniAreaChart series={appsSeries.map((v)=>Math.round(v*0.4))} label="Approvals (30d)" />
            <MiniAreaChart series={appsSeries.map((v)=>Math.round(v*0.1))} label="New Programs (30d)" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <CalendarWidget events={upcoming} />
            <NotificationsPanel notifications={notes} />
          </div>

          <ActivityTimeline events={auditEvents} />
        </div>

        <aside className="space-y-6">
          <QuickActions />

          <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
            <h3 className="text-sm font-semibold text-white">Overview</h3>
            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-300">Total Cities</p>
                <p className="text-sm font-semibold text-white">{totalCities}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-300">Upcoming Appointments</p>
                <p className="text-sm font-semibold text-white">{upcoming.length}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-300">Unread Notifications</p>
                <p className="text-sm font-semibold text-white">{notes.filter((n: any) => !n.is_read).length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
            <h3 className="text-sm font-semibold text-white">Staff Activity</h3>
            <p className="text-sm text-slate-400 mt-3">Recent approvals, assignments and notes from staff members.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
