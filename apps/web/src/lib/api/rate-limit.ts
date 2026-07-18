const WINDOWS = new Map<string, { count: number; resetAt: number }>();

export function createRateLimiter(limit: number, windowMs: number) {
  return function checkLimit(identifier: string) {
    const now = Date.now();
    const existing = WINDOWS.get(identifier);

    if (!existing || existing.resetAt <= now) {
      WINDOWS.set(identifier, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: limit - 1 };
    }

    if (existing.count >= limit) {
      return { allowed: false, remaining: 0, retryAfter: Math.max(0, Math.ceil((existing.resetAt - now) / 1000)) };
    }

    existing.count += 1;
    return { allowed: true, remaining: limit - existing.count };
  };
}
