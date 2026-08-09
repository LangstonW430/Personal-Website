import type { HomePage, SiteSettings } from "../sanity/types";

/**
 * Overlay CMS values on top of the defaults, one level deep.
 * A field is only overridden when Sanity actually returned something for it —
 * null, undefined, empty strings and empty arrays all fall through to the
 * default, so a half-filled document can never blank out a section.
 */
export function merge<T extends object>(
  base: T,
  override: Partial<T> | null | undefined,
): T {
  if (!override) return base;

  const out = { ...base };
  for (const key of Object.keys(base) as (keyof T)[]) {
    const value = override[key];
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value as T[keyof T];
  }
  return out;
}

export function mergeSettings(
  base: SiteSettings,
  data: Partial<SiteSettings> | null | undefined,
): SiteSettings {
  return merge(base, data);
}

/** Same idea, applied section by section since the homepage is nested. */
export function mergeHome(
  base: HomePage,
  data: Partial<HomePage> | null | undefined,
): HomePage {
  if (!data) return base;

  return {
    ...merge(base, data),
    hero: merge(base.hero, data.hero),
    about: merge(base.about, data.about),
    projects: merge(base.projects, data.projects),
    skills: merge(base.skills, data.skills),
    education: merge(base.education, data.education),
    hire: merge(base.hire, data.hire),
    contact: merge(base.contact, data.contact),
  };
}
