# Cloudflare Workers deployment

This site is deployed as a full-stack Next.js application on Cloudflare Workers
using the committed OpenNext adapter configuration.

## Repository configuration

- Worker name: `top`
- Worker config: `wrangler.jsonc`
- OpenNext config: `open-next.config.ts`
- Build artifact: `.open-next/`

The `WORKER_SELF_REFERENCE` binding intentionally points to `top`, matching the
Worker name. This binding is used by OpenNext for internal revalidation requests.

## Environment variables

Add these public values to the Cloudflare build environment. They are compiled
into browser code where applicable:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Existing Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Existing Sanity dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Sanity API version; defaults to `2023-07-21` in the app |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | No | Umami analytics site ID |
| `NEXT_PUBLIC_GISCUS_REPOID` | No | Giscus repository ID |
| `NEXT_PUBLIC_GISCUS_CATEGORYID` | No | Giscus category ID |
| `NEXT_PUBLIC_GITHUB_USERNAME` | No | GitHub contribution graph username |
| `NEXT_PUBLIC_GITHUB_JOIN_YEAR` | No | First year shown in the contribution graph |

Add this server-only value as a Cloudflare Worker secret:

| Secret | Required | Purpose |
| --- | --- | --- |
| `SANITY_REVALIDATE_SECRET` | Yes for webhooks | Validates `POST /api/revalidate` requests from Sanity |

Do not prefix the revalidation secret with `NEXT_PUBLIC_`.

```bash
npx wrangler secret put SANITY_REVALIDATE_SECRET
```

The repository does not use a Sanity read token; public dataset reads are made
without one. Do not create or migrate the existing Sanity dataset.

## Cloudflare Git build settings

Use the committed configuration instead of Wrangler's automatic Next.js
migration:

```text
Build command:  npm run build:cloudflare
Deploy command: npx wrangler deploy
```

The build command generates `.open-next/` once. The deploy command publishes
that artifact without rebuilding it.

## Build cache

Enable Cloudflare's project-wide build cache after connecting the repository:

1. Open the `top` Worker in the Cloudflare dashboard.
2. Go to **Settings → Build → Build cache**.
3. Select **Enable**.

Workers Builds automatically caches npm's global package cache and Next.js's
`.next/cache` directory. No custom cache directory or repository credential is
required. The first build after enabling the setting is a cold build; later
builds can reuse dependency downloads and Next.js compilation artifacts.

Do not cache `.open-next/` as a reusable source artifact. It is generated for
the current commit by `npm run build:cloudflare` and should be freshly assembled
before `npx wrangler deploy` publishes it.

If a dependency or framework upgrade produces inconsistent build output, use
**Settings → Build → Build cache → Clear Cache** and rebuild once.

For a local or manual deployment, use:

```bash
npm run deploy
```

For a production-like local preview:

```bash
npm run preview
```

## Sanity migration checklist

After the Worker is deployed:

1. Add `https://dar.wang` to the existing Sanity project's CORS origins with
   credentials enabled.
2. Keep `https://darrenwang.site` temporarily while the old deployment remains
   active.
3. Verify `/studio` and a deep Studio route such as `/studio/structure`.
4. Verify Studio login and authenticated API calls.
5. Update Sanity presentation or preview URLs to `https://dar.wang` if enabled.

## Domain cutover

After the Worker has been verified on its Cloudflare preview URL:

1. Attach `dar.wang` as the Worker's primary custom domain.
2. Redirect `www.dar.wang/*` permanently to `https://dar.wang/$1`.
3. Keep the Vercel deployment online during the verification period.
4. Redirect `darrenwang.site/*` permanently to `https://dar.wang/$1` before the
   old domain expires.

Keep `darr.ren` and `vpn.darr.ren` on Alibaba Cloud DNS. They are outside this
Worker deployment.

## Verification

Run a Wrangler dry run before publishing:

```bash
npm run build:cloudflare
npx wrangler deploy --dry-run
```

Verify `/`, `/about`, `/projects`, a real `/projects/[project]` slug,
`/payments`, `/studio`, a deep `/studio/*` route, and `POST /api/revalidate`.
