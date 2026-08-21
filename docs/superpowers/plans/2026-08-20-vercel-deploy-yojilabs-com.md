# Deploy Plan — Landing page on Vercel at `yojilabs.com`

**Created:** 2026-08-20 · **Status:** proposed (awaiting go-ahead)
**Pattern source:** `drop-your-pantry-fe/docs/plans/active/2026-06-25-fe-production-deployment.md`

## Current state (verified 2026-08-20)

| Item | State |
| --- | --- |
| Vercel team | `wutims-projects` (CLI logged in as `wutims`) |
| Existing Vercel projects | `drop-your-pantry-fe` → `pantry.yojilabs.com` (Next.js preset, Node 24, root `.`) |
| `yojilabs.com` in Vercel | Already attached to the team as a domain (registrar + nameservers "Third Party" = Cloudflare DNS) |
| `yojilabs.com` / `www.yojilabs.com` | **Do not resolve** — apex is empty, nothing to displace |
| `pantry.yojilabs.com` | Vercel IPs, DNS-only (grey cloud) — per the pantry runbook |
| `api.yojilabs.com` | Cloudflare-proxied → Railway |
| Landing repo remote | `github.com/dand58022/Yojilabs_landing` (**not** under `wutims`) |
| Production build | `next build` passes; 11 routes, **all static** (`○`) |
| Env | Every var has a localhost default; `NEXT_PUBLIC_SITE_URL` + `VERCEL_ENV` drive indexing |
| Forms | Contact / intake / booking are **mock-only**; `contactEndpoints` in `lib/env.ts` is never consumed |

Architecture: a second, independent Vercel project in the same team. Same
pattern as pantry (Next.js SSR/static on Vercel, Cloudflare DNS-only CNAME,
Vercel-issued TLS). Subdomains stay where they are; only `@` and `www` change.

---

## Phase 0 — Decisions needed from the operator

1. **GitHub ownership.** Vercel's Git integration needs access to
   `dand58022/Yojilabs_landing`. Options: (a) transfer the repo to the
   `wutims` account / an org, (b) install the Vercel GitHub App on
   `dand58022`'s account and have them grant access, or (c) skip Git
   integration and deploy via `vercel --prod` from CLI (loses PR previews).
   **Recommended: (a)** — keeps both YojiLabs projects under one owner.
2. **Form behaviour at launch.** Forms currently say "localhost mode" and
   never send anything. Ship choices: (a) wire real endpoints before launch,
   (b) launch with forms replaced by `mailto:hello@yojilabs.com` / Cal link,
   (c) launch as-is behind `NEXT_PUBLIC_DEPLOYMENT_STAGE=preview` (noindex)
   as a soft launch. **This is the one genuine blocker for a public launch.**
3. **`www` policy.** Recommend apex-canonical: `www.yojilabs.com` → 308 →
   `yojilabs.com` (Vercel does this automatically when both are added and
   apex is marked primary).

## Phase 1 — In-repo changes (agent)

- [ ] `lib/env.ts`: treat `VERCEL_ENV=production` as production **even when
      `NEXT_PUBLIC_SITE_URL` is unset** is already the case — but add
      `NEXT_PUBLIC_SITE_URL` fallback to `https://${VERCEL_PROJECT_PRODUCTION_URL}`
      so OG/canonical/sitemap URLs are correct on every Vercel build without
      manual env. Keep explicit `NEXT_PUBLIC_SITE_URL` override.
- [ ] Remove "localhost mode" copy from user-facing strings in
      `components/forms/*`, `components/routes/BookCallRouteShell.tsx`,
      `app/start-a-project/intake/page.tsx`, `lib/mocks/*` — or gate that copy
      on `deploymentStage === "local"`.
- [ ] Forms: implement per Phase 0 decision 2. If (a): consume
      `contactEndpoints.*` from `lib/env.ts` (already parsed, just unused)
      and fall back to mocks only when `deploymentStage === "local"`.
- [ ] Add `.nvmrc` → `24` (match pantry project / Vercel default) or set
      `"engines": { "node": "24.x" }`. Local is Node 20; build passed on 20,
      so this is alignment, not a fix.
- [ ] `package.json`: dedupe the duplicate `@playwright/test` devDependency
      (`^1.62.1` and `^1.55.1` both listed).
- [ ] Optional: `vercel.json` with security headers
      (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
      and `www` → apex redirect if not using Vercel's domain-level redirect.
- [ ] Add `.env.example` documenting the `NEXT_PUBLIC_*` vars and their prod
      values (see table below).
- [ ] Gate: `npm run lint && npx tsc --noEmit && npm run build && npm test`.
- [ ] Commit on `feature/vercel-deploy`, PR → `main`.

## Phase 2 — Vercel project (operator + agent via CLI)

- [ ] Create project `yojilabs-landing` in `wutims-projects` (CLI:
      `vercel link` from repo root → "create new"; or dashboard **Import**).
      Framework preset Next.js, root `.`, production branch `main`.
- [ ] Environment variables:

  | Var | Production | Preview |
  | --- | --- | --- |
  | `NEXT_PUBLIC_SITE_URL` | `https://yojilabs.com` | *(unset → Vercel URL fallback)* |
  | `NEXT_PUBLIC_DEPLOYMENT_STAGE` | *(unset — derived from `VERCEL_ENV`)* | *(unset)* |
  | `NEXT_PUBLIC_PANTRY_APP_URL` | *(default is already the prod pantry URL)* | same |
  | `NEXT_PUBLIC_CONTACT_ENDPOINT` etc. | per Phase 0 decision 2 | unset (mocks) |

  No secrets exist in this app — everything is `NEXT_PUBLIC_*`.
- [ ] First deploy (`vercel --prod` or push to `main`). Verify the
      `*.vercel.app` URL renders and `/robots.txt` says `Disallow: /` on
      preview, `Allow: /` + sitemap on production.

## Phase 3 — Domain + DNS (operator; Cloudflare + Vercel)

- [ ] Vercel → project → Domains → add `yojilabs.com` (primary) and
      `www.yojilabs.com` (redirect to apex). Domain is already in the team so
      no verification TXT should be needed.
- [ ] Cloudflare DNS, **DNS-only (grey cloud)** — same rule as pantry:
      - `A    @    76.76.21.21` (Vercel's apex IP; confirm value in the
        Vercel domain panel at the time)
      - `CNAME www  cname.vercel-dns.com`
      Confirm no pre-existing `A`/`AAAA`/`CNAME` on `@` (currently nothing
      resolves, so none expected). Leave `pantry` and `api` untouched.
- [ ] Wait for Vercel to show both domains **Valid** with certs issued.

## Phase 4 — Verification gate

```bash
curl -sI https://yojilabs.com | head -3              # 200, server: Vercel
curl -sI https://www.yojilabs.com | grep -i location # → https://yojilabs.com/
curl -s https://yojilabs.com/robots.txt              # Allow: / + Sitemap line
curl -s https://yojilabs.com/sitemap.xml | grep -c yojilabs.com   # 7 URLs, no localhost
curl -sI https://pantry.yojilabs.com | head -1       # still 200 — untouched
```

- [ ] OG tags resolve to `https://yojilabs.com/brand/og-placeholder.png`
      (check with a social-card debugger).
- [ ] Homepage CTA to Pantry lands on `pantry.yojilabs.com/login`.
- [ ] Submit each form once and confirm the Phase 0 decision 2 behaviour.
- [ ] Lighthouse ≥ 90 perf/a11y/SEO on `/`.

## Rollback

Remove the two Cloudflare records → apex returns to non-resolving within
minutes. Nothing touches the pantry or api projects. The Vercel project can be
paused from the dashboard without deleting.
