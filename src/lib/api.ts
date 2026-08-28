const TOKEN_KEY = "ssctvet_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface ApiFetchOptions extends RequestInit {
  skipAuthRedirect?: boolean;
}

/**
 * Fetch wrapper for the SSCTVET API. Same-origin relative paths work both in
 * dev (proxied by Vite to the local API server) and in production (the API
 * server also serves the built frontend). Automatically attaches the admin
 * bearer token when present, and redirects to the login screen on 401s from
 * authenticated requests.
 */
export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const token = getAdminToken();
  const { skipAuthRedirect, headers, ...rest } = options;

  const res = await fetch(path, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (res.status === 401) {
    clearAdminToken();
    if (!skipAuthRedirect && window.location.pathname.startsWith("/admin")) {
      window.location.href = "/admin/login";
    }
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || "Your session has expired. Please log in again.", 401);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/uploads", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  if (res.status === 401) {
    clearAdminToken();
    window.location.href = "/admin/login";
    throw new ApiError("Your session has expired. Please log in again.", 401);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || "Upload failed.", res.status);
  }

  return res.json();
}
