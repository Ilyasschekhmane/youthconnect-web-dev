import { getCurrentUser } from '@/lib/db/queries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/card';
import { Button } from '@/components/button';
import { CitizenDashboard } from '@/features/applications/citizen-dashboard';
import { NotificationsList } from '@/features/notifications/notifications-list';
import Link from 'next/link';
import { 
  CheckCircle, 
  FileText, 
  Upload, 
  Clock, 
  Bell, 
  LogOut,
  ArrowRight 
} from 'lucide-react';

const workflowSteps = [
  {
    step: 1,
    title: 'Register',
    description: 'Create your account with email and password',
    icon: 'user-plus',
  },
  {
    step: 2,
    title: 'Login',
    description: 'Access your personalized dashboard',
    icon: 'log-in',
  },
  {
    step: 3,
    title: 'View Dashboard',
    description: 'See available programs and your application status',
    icon: 'grid',
  },
  {
    step: 4,
    title: 'Click Apply',
    description: 'Select a program to apply for',
    icon: 'check-circle',
  },
  {
    step: 5,
    title: 'Fill Form',
    description: 'Complete the application form with your details',
    icon: 'edit',
  },
  {
    step: 6,
    title: 'Upload Documents',
    description: 'Submit supporting documents (CV, ID, etc)',
    icon: 'upload',
  },
  {
    step: 7,
    title: 'Submit Application',
    description: 'Application status changes to Pending',
    icon: 'send',
  },
  {
    step: 8,
    title: 'Admin Review',
    description: 'Admin logs in and reviews your application',
    icon: 'eye',
  },
  {
    step: 9,
    title: 'Admin Approves',
    description: 'Application status changes to Approved',
    icon: 'check-circle-2',
  },
  {
    step: 10,
    title: 'See Status',
    description: 'You receive notification of approval',
    icon: 'bell',
  },
  {
    step: 11,
    title: 'Book Appointment',
    description: 'Schedule your first mentor meeting or training',
    icon: 'calendar',
  },
  {
    step: 12,
    title: 'Appointment Confirmed',
    description: 'Receive notification and confirm attendance',
    icon: 'check',
  },
];

function getStepColor(step: number) {
  if (step <= 3) return 'bg-slate-700 text-slate-100';
  if (step <= 7) return 'bg-cyan-900 text-cyan-100';
  if (step <= 10) return 'bg-amber-900 text-amber-100';
  return 'bg-emerald-900 text-emerald-100';
}

function getStepLabel(step: number) {
  if (step <= 3) return 'Authentication';
  if (step <= 7) return 'Application';
  if (step <= 10) return 'Review';
  return 'Booking';
}

export default async function DemoWorkflowPage() {
  const user = await getCurrentUser();

  return (
    <main className="space-y-8 py-8">
      {/* Header */}
      <section className="rounded-lg border border-slate-700 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-8">
        <h1 className="text-4xl font-bold text-white mb-2">YouthConnect Demo Workflow</h1>
        <p className="text-slate-300 max-w-2xl">
          Complete end-to-end demonstration of the youth entrepreneurship program application system.
          Follow the flow below to understand how citizens apply and get approved for programs.
        </p>
      </section>

      {/* User Status */}
      {user ? (
        <Card variant="elevated">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">LOGGED IN AS</p>
                <p className="text-lg font-semibold text-white">{user.email}</p>
              </div>
              <Link href="/auth/logout" className="text-sm text-slate-400 hover:text-slate-300">
                <Button variant="secondary">Logout</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card variant="elevated" className="border-amber-500/50 bg-amber-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-400">NOT LOGGED IN</p>
                <p className="text-white font-semibold">Start the demo by creating an account</p>
              </div>
              <div className="flex gap-2">
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary">Sign In</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Steps */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Complete Workflow (12 Steps)</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((item, idx) => (
            <div key={item.step} className="relative">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${getStepColor(item.step)}`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-400 uppercase">
                        {getStepLabel(item.step)}
                      </p>
                      <h3 className="font-semibold text-white mt-1">{item.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {idx < workflowSteps.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-slate-600 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Key Features Demonstrated</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <CardTitle className="text-lg">Multi-Step Application Form</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Comprehensive form for applicants to enter business details, experience, and motivation
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-cyan-400" />
                <CardTitle className="text-lg">Document Upload</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Support for CV, ID, business plans, and financial statements with Supabase Storage
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <CardTitle className="text-lg">Admin Review System</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Dedicated admin dashboard to approve, reject, and add notes to applications
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-lg">Appointment Booking</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Allows approved applicants to schedule mentor sessions and training meetings
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-rose-400" />
                <CardTitle className="text-lg">Real-Time Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              In-app notifications for application status changes, approvals, and appointment confirmations
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-slate-400" />
                <CardTitle className="text-lg">Role-Based Access</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Different dashboards and capabilities for citizens, admins, and staff members
            </CardContent>
          </Card>
        </div>
      </section>

      {user && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Citizen Dashboard */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Dashboard</h2>
            <CitizenDashboard />
          </section>

          {/* Notifications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Notifications</h2>
            <NotificationsList />
          </section>
        </div>
      )}

      {/* Demo Instructions */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>How to Use This Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300">
          <div>
            <h4 className="font-semibold text-white mb-2">👤 Citizen Flow:</h4>
            <ol className="space-y-1 ml-4 list-decimal text-slate-400">
              <li>Create an account via Sign Up</li>
              <li>Login with your credentials</li>
              <li>Browse available programs on dashboard</li>
              <li>Click &quot;Apply&quot; on a program</li>
              <li>Fill in the application form</li>
              <li>Upload required documents</li>
              <li>Submit your application</li>
              <li>Wait for admin review</li>
              <li>View approval notification</li>
              <li>Book an appointment</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-2">👨‍💼 Admin Flow:</h4>
            <ol className="space-y-1 ml-4 list-decimal text-slate-400">
              <li>Create admin account via Sign Up</li>
              <li>Navigate to admin dashboard</li>
              <li>View pending applications</li>
              <li>Click &quot;Review&quot; on an application</li>
              <li>View applicant details and documents</li>
              <li>Add review notes</li>
              <li>Approve or reject the application</li>
              <li>Applicant receives notification</li>
            </ol>
          </div>

          <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/50 p-3">
            <p className="text-cyan-300">
              💡 <strong>Tip:</strong> Open the demo in two browser windows - one for citizen flow and one for admin flow to see the complete interaction
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Technical Stack */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Technical Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <p className="font-semibold text-white mb-2">Frontend</p>
              <ul className="space-y-1 text-slate-400">
                <li>✓ Next.js 15 with React 19</li>
                <li>✓ Server Components</li>
                <li>✓ TailwindCSS Styling</li>
                <li>✓ TypeScript</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Backend</p>
              <ul className="space-y-1 text-slate-400">
                <li>✓ Supabase PostgreSQL</li>
                <li>✓ Row-Level Security</li>
                <li>✓ Supabase Storage</li>
                <li>✓ Authentication</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Schema Overview */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-white mb-2">Core Tables</p>
              <ul className="space-y-1 ml-2">
                <li>• organizations</li>
                <li>• programs</li>
                <li>• cities</li>
                <li>• applications</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Supporting Tables</p>
              <ul className="space-y-1 ml-2">
                <li>• documents</li>
                <li>• appointments</li>
                <li>• notifications</li>
                <li>• audit_logs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="rounded-lg border border-cyan-500/50 bg-gradient-to-r from-cyan-500/10 to-slate-900 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Start?</h2>
        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
          Follow the workflow steps above to see how YouthConnect enables seamless applications and program management.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {!user ? (
            <>
              <Link href="/signup">
                <Button size="lg" className="flex items-center gap-2">
                  Create Account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="secondary">Sign In</Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button size="lg" className="flex items-center gap-2">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
