import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPageTitle } from './seo';

test('buildPageTitle appends the product name', () => {
  assert.equal(buildPageTitle('Programs'), 'Programs | YouthConnect');
});

test('buildPageTitle preserves the provided site name', () => {
  assert.equal(buildPageTitle('Dashboard', 'YouthConnect GovTech'), 'Dashboard | YouthConnect GovTech');
});
