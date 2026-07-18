import { createSupabaseServerClient } from '@/lib/supabase/server';
import { hasRequiredRole, type AppRole } from '@/lib/auth/roles';

export type AuthSession = {
  userId: string;
  email: string;
  role: AppRole;
  isEmailVerified: boolean;
};

export async function getServerSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const appRole = (user.user_metadata?.role as AppRole | undefined) ?? 'applicant';

  return {
    userId: user.id,
    email: user.email ?? '',
    role: appRole,
    isEmailVerified: user.email_confirmed_at !== null,
  } satisfies AuthSession;
}

export async function requireRole(requiredRole: AppRole) {
  const session = await getServerSession();
  if (!session || !hasRequiredRole(session.role, requiredRole)) {
    return null;
  }
  return session;
}
