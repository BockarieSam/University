import { apiFetch, getAdminToken, setAdminToken, clearAdminToken, ApiError } from "@/lib/api";

/**
 * Admin session is now backed by a real JWT issued by the API server (see
 * server/auth.js). The token is cached in localStorage so it survives page
 * reloads; its validity is enforced server-side, and any 401 response
 * automatically clears it and redirects to the login screen (see api.ts).
 */

export function isAdminAuthenticated(): boolean {
  // Presence check only — an expired/invalid token still gets rejected by
  // the server on the next request, which triggers the redirect in apiFetch.
  return !!getAdminToken();
}

export async function attemptAdminLogin(password: string): Promise<boolean> {
  try {
    const { token } = await apiFetch<{ token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
      skipAuthRedirect: true,
    });
    setAdminToken(token);
    return true;
  } catch (e) {
    if (e instanceof ApiError) return false;
    throw e;
  }
}

export function adminLogout() {
  clearAdminToken();
}
