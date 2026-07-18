import assert from 'node:assert/strict';
import test from 'node:test';
import { z } from 'zod';

import { createApiError, parseJsonBody } from './validation';

test('parseJsonBody returns parsed data for valid input', async () => {
  const schema = z.object({ name: z.string() });
  const request = new Request('http://localhost/api/organizations', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'YouthBridge' }),
  });

  const result = await parseJsonBody(request, schema);

  assert.equal(result.success, true);
  assert.deepEqual(result.data, { name: 'YouthBridge' });
});

test('parseJsonBody returns a structured error for invalid input', async () => {
  const schema = z.object({ name: z.string().min(2) });
  const request = new Request('http://localhost/api/organizations', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'A' }),
  });

  const result = await parseJsonBody(request, schema);

  assert.equal(result.success, false);
  assert.equal(result.error?.status, 400);
  assert.equal(result.error?.code, 'VALIDATION_ERROR');
});

test('createApiError produces a predictable payload', () => {
  const error = createApiError('Rate limit exceeded', 429, 'RATE_LIMITED');

  assert.equal(error.status, 429);
  assert.equal(error.code, 'RATE_LIMITED');
  assert.equal(error.message, 'Rate limit exceeded');
});
