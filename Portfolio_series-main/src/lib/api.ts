/**
 * Tiny REST client for the portfolio backend (server/).
 * The API URL comes from VITE_API_URL (see .env.example) — never hard-code it.
 * Every call resolves to a result object, so callers can show loading / success / error states:
 *
 *   setStatus('loading');
 *   const res = await submitContact({ name, email, message });
 *   setStatus(res.ok ? 'success' : 'error');   // res.message is safe to show to the visitor
 */
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

/** True when VITE_API_URL is set — the UI falls back to a plain mailto link when it isn't. */
export const isApiConfigured = Boolean(API_URL);

/** `website` is a hidden honeypot field: real visitors leave it empty. */
export type ContactPayload = { name: string; email: string; message: string; website?: string };
export type ApiResult = { ok: true; message: string } | { ok: false; message: string; fieldErrors?: Record<string, string> };

async function request(path: string, init?: RequestInit): Promise<{ status: number; body: any }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      signal: controller.signal,
    });
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      /* non-JSON response */
    }
    return { status: res.status, body };
  } finally {
    clearTimeout(timer);
  }
}

export async function submitContact(payload: ContactPayload): Promise<ApiResult> {
  if (!API_URL) return { ok: false, message: 'The messaging service is not configured yet.' };
  try {
    const { status, body } = await request('/api/contact', { method: 'POST', body: JSON.stringify(payload) });
    if (status === 201) return { ok: true, message: body?.message ?? 'Thanks — your message was sent.' };
    if (status === 400) return { ok: false, message: 'Please check the highlighted fields.', fieldErrors: body?.errors };
    if (status === 429) return { ok: false, message: 'Too many messages — please try again in a little while.' };
    return { ok: false, message: 'Something went wrong on the server. Please try again shortly.' };
  } catch {
    return { ok: false, message: 'Could not reach the server. Check your connection and try again.' };
  }
}

export async function checkHealth(): Promise<{ ok: boolean; db?: string }> {
  if (!API_URL) return { ok: false };
  try {
    const { status, body } = await request('/api/health');
    return { ok: status === 200 && body?.ok === true, db: body?.db };
  } catch {
    return { ok: false };
  }
}
