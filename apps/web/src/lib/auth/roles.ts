export type AppRole = 'super_admin' | 'city_admin' | 'staff' | 'applicant';

export const ROLE_HIERARCHY: Record<AppRole, number> = {
  super_admin: 100,
  city_admin: 80,
  staff: 40,
  applicant: 20,
};

export function hasRequiredRole(userRole: AppRole | null | undefined, requiredRole: AppRole) {
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
