export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const token = process.env.NEXT_PUBLIC_SANITY_ACCESS_TOKEN;
// Uncomment the line below if you want to make the access token required
// export const token = checkValue(
//   process.env.NEXT_PUBLIC_SANITY_ACCESS_TOKEN,
//   "NEXT_PUBLIC_SANITY_ACCESS_TOKEN",
//   "https://sanity.io"
// );

export const hookSecret = process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET;
export const mode = process.env.NODE_ENV;

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-07-21";

export const hasSanityConfig = Boolean(projectId && dataset);

// Optional: Giscus comments (only required if using comments feature)
export const giscusRepoId = process.env.NEXT_PUBLIC_GISCUS_REPOID;
export const giscusCategoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORYID;

// Optional: Umami analytics (only required if using analytics)
export const umamiSiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export function getMissingSanityConfigMessage() {
  const missing = [
    !projectId ? "NEXT_PUBLIC_SANITY_PROJECT_ID" : null,
    !dataset ? "NEXT_PUBLIC_SANITY_DATASET" : null,
  ].filter(Boolean);

  return `Missing Environment Variable: ${missing.join(
    ", ",
  )}. Add these to .env.local to enable Sanity-backed pages.`;
}
