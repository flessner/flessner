/**
 * A single client-writable cookie carrying the preferences the server
 * needs for first-paint HTML (theme). JSON-encoded so adding more keys
 * later is trivial. Same-origin, SameSite=Lax, 1-year lifetime, not
 * HttpOnly — written by `document.cookie` on the client.
 */

export type Theme = "light" | "dark";
export type ThemeChoice = "system" | Theme;

export interface Preferences {
  theme?: Theme;
}

export const PREFERENCES_COOKIE = "preferences";

export function readPreferencesFromCookie(
  cookieHeader: string | null | undefined,
): Preferences {
  if (!cookieHeader) return {};
  const m = /(?:^|;\s*)preferences=([^;]+)/.exec(cookieHeader);
  if (!m?.[1]) return {};
  try {
    const decoded = decodeURIComponent(m[1]);
    const parsed = JSON.parse(decoded) as Preferences;
    const out: Preferences = {};
    if (parsed.theme === "light" || parsed.theme === "dark") {
      out.theme = parsed.theme;
    }
    return out;
  } catch {
    return {};
  }
}

/** Merge new values into the preferences cookie. Pass `undefined` to drop a key. */
export function updatePreferences(patch: Preferences) {
  if (typeof document === "undefined") return;
  const current = readPreferencesFromCookie(document.cookie);
  const merged: Preferences = { ...current, ...patch };
  for (const key of Object.keys(merged) as (keyof Preferences)[]) {
    if (merged[key] === undefined) delete merged[key];
  }
  if (Object.keys(merged).length === 0) {
    document.cookie = `${PREFERENCES_COOKIE}=; path=/; max-age=0; samesite=lax`;
    return;
  }
  const payload = encodeURIComponent(JSON.stringify(merged));
  document.cookie = `${PREFERENCES_COOKIE}=${payload}; path=/; max-age=${
    60 * 60 * 24 * 365
  }; samesite=lax`;
}
