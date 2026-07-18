import assert from 'node:assert/strict';
import test from 'node:test';
import { hasRequiredRole } from './roles';

test('super admin satisfies all required roles', () => {
  assert.equal(hasRequiredRole('super_admin', 'applicant'), true);
  assert.equal(hasRequiredRole('super_admin', 'staff'), true);
});

test('applicant does not satisfy staff role', () => {
  assert.equal(hasRequiredRole('applicant', 'staff'), false);
});
