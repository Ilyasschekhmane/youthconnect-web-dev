import { getCurrentUser, getServerSupabase } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { User, Mail, MapPin, Phone, Calendar as CalendarIcon } from 'lucide-react';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const supabase = await getServerSupabase();

  // Fetch user metadata from auth
  const userMetadata = user.user_metadata || {};
  const userEmail = user.email || '';

  // Optionally fetch extended profile data if stored in a profiles table
  const { data: profileData } = await supabase
    .from('organization_memberships')
    .select('id, role, created_at')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  const fullName = userMetadata.full_name || 'Not set';
  const phone = userMetadata.phone || 'Not provided';
  const location = userMetadata.location || 'Not set';
  const birthDate = userMetadata.birth_date || 'Not set';
  const joinedDate = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A';

  return (
    <main className="space-y-6 py-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your personal information and account settings</p>
      </div>

      {/* Profile Header */}
      <Card variant="elevated">
        <CardContent className="pt-8">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <User className="h-12 w-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{fullName}</h2>
              <p className="text-sm text-slate-400 mt-1">{userEmail}</p>
              <p className="text-xs text-slate-500 mt-3">Member since {joinedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Full Name</p>
              <p className="mt-2 text-sm text-white">{fullName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Email Address</p>
              <p className="mt-2 text-sm text-white">{userEmail}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Phone Number</p>
              <p className="mt-2 text-sm text-white flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                {phone}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Location</p>
              <p className="mt-2 text-sm text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                {location}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Date of Birth</p>
              <p className="mt-2 text-sm text-white flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-slate-400" />
                {birthDate}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Member Since</p>
              <p className="mt-2 text-sm text-white">{joinedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Email Status</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-sm text-emerald-400">Verified</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">User ID</p>
            <p className="mt-2 text-xs text-slate-300 font-mono break-all bg-slate-800 p-2 rounded">
              {user.id}
            </p>
          </div>
          {profileData && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Account Role</p>
              <p className="mt-2 text-sm text-white capitalize">{profileData.role}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400">Security & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-amber-100">
          <p>✓ Your personal information is encrypted and stored securely</p>
          <p>✓ All applications and documents are protected with role-based access</p>
          <p>✓ You can manage connected devices and sessions from Account Settings</p>
          <p>To change your password or manage security settings, visit Account Settings in the main menu.</p>
        </CardContent>
      </Card>
    </main>
  );
}
