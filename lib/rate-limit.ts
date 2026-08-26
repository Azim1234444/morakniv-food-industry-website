/**
 * Fixed-window, in-memory rate limiter.
 *
 * LIMITATION — read before relying on this.
 * State lives in the module scope of one server instance. It does NOT survive
 * a cold start and is NOT shared between instances, so on a serverless or
 * multi-region deployment the effective limit is per-instance rather than
 * global. That is acceptable for slowing down naive form abuse; it is not a
 * security control. Move to a shared store (Upstash Redis, Vercel KV) if real
 * abuse appears.
 */

type Window = {
  count: number;
  resetAt: number;
};

const windows = new Map<string, Window>();

/** Drop expired windows so the Map cannot grow without bound. */
function sweep(now: number) {
  if (windows.size < 500) return;
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  return {
    allowed: true,
    remaining: limit - existing.count,
    retryAfter: 0,
  };
}

/**
 * Best-effort client IP from proxy headers.
 *
 * These headers are client-controllable unless a trusted proxy overwrites
 * them, so the value is a throttling hint only — never an identity.
 */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}
