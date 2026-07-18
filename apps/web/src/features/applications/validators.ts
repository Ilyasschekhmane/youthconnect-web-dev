export function validateCreatePayload(payload: { programId?: string; cityId?: string }) {
  const errors: Record<string, string> = {};
  if (!payload.programId) errors.programId = 'Program is required';
  if (!payload.cityId) errors.cityId = 'City is required';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateReviewNotes(notes?: string, action?: 'approve' | 'reject') {
  if (action === 'reject') {
    if (!notes || !String(notes).trim()) return { valid: false, error: 'Rejection reason is required' };
  }
  return { valid: true };
}
