import { createApiErrorResponse, createApiError } from './validation';
import { createRateLimiter } from './rate-limit';

const apiRateLimiter = createRateLimiter(60, 60_000);

export async function withApiMiddleware(request: Request, handler: () => Promise<Response>) {
  const identifier = request.headers.get('x-forwarded-for') ?? 'global';
  const limit = apiRateLimiter(identifier);

  if (!limit.allowed) {
    return createApiErrorResponse(createApiError('Too many requests', 429, 'RATE_LIMITED'), {
      headers: { 'Retry-After': String(limit.retryAfter ?? 0) },
    });
  }

  const response = await handler();
  response.headers.set('x-ratelimit-remaining', String(limit.remaining));
  response.headers.set('x-ratelimit-limit', '60');
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  response.headers.set('permissions-policy', 'geolocation=(), microphone=(), camera=()');

  return response;
}
