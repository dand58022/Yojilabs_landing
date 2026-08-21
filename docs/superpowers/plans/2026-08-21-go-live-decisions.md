# Go-live decisions — yojilabs.com landing

**Created:** 2026-08-21 · **Status:** decisions approved 2026-08-21; in-repo work on `feature/go-live-pass` · companion to `2026-08-20-vercel-deploy-yojilabs-com.md`

## What changed since the deploy plan

- Repo now lives at `github.com/yoji-labs/landing` (public, default `main`). Local `origin` updated.
- Vercel CLI authed as `wutims` (team `wutims-projects`). No `yojilabs-landing` project yet.
- `gh` can see the `yoji-labs` org. Whether the **Vercel GitHub App** is installed on the org is unknown (dashboard check).

## Launch steps (in order)

1. `git remote set-url origin https://github.com/yoji-labs/landing.git (done)`
2. Vercel dashboard → Add New → Import from `yoji-labs` org (installs GitHub App if
   not present) → project `yojilabs-landing`, preset Next.js, prod branch `main`.
3. Env: `NEXT_PUBLIC_SITE_URL=https://yojilabs.com` (production only) + the
   contact/booking vars below.
4. In-repo changes (Phase 1 of the deploy plan + the decisions below). PR → `main`.
5. Domains: `yojilabs.com` primary, `www` → 308 apex. Cloudflare DNS-only
   `A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com`.
6. Verification gate (curl checks in the deploy plan) + Search Console + Bing/IndexNow.

## Decision 1 — Contact / intake / booking

Today: three forms, all hit `lib/mocks/*`; user-visible copy says "localhost mode".
`contactEndpoints` in `lib/env.ts` is parsed but never consumed.

**Recommended stack (zero monthly cost, we keep the data):**

| Flow | Implementation |
| --- | --- |
| General contact + project intake | `app/api/contact/route.ts` + `app/api/intake/route.ts` → Zod validate → Cloudflare Turnstile server-verify → Resend (email to `hello@yojilabs.com` + auto-reply). Honeypot field as second layer. |
| Book a call | Replace `BookCallMockForm` with a Cal.com embed (`@calcom/embed-react`, free tier, webhooks included). Keep the "what to expect" card. |
| Mocks | Keep, but only when `deploymentStage === "local"`; delete all "localhost mode" copy from prod strings. |

Env to add: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`,
`NEXT_PUBLIC_CAL_LINK`. Resend needs `yojilabs.com` DNS verification (SPF/DKIM in
Cloudflare — a few TXT/CNAME records, no proxy impact).

Fallback if we don't want to touch DNS for email: Web3Forms (250/mo free) for both
forms; still do Cal.com for booking.

Accounts the operator must create: Resend, Cloudflare Turnstile widget, Cal.com.

## Decision 2 — Demos

Research summary (Navattic 2025 report, vendor comparisons — see research notes):
- Public sandbox with seeded data: highest proof, highest cost (separate tenant,
  reset cron, abuse surface). Not worth it for a login-gated, single-tenant app.
- Interactive click-through tour (Arcade / Supademo free tier): ~50% engagement,
  vendor-reported 15–25% lift to contact; hours to build; recapture on UI changes.
- Video: ~10–15% of visitors watch. Screenshots + "book a demo": baseline.

**Recommendation: three tiers, matching what's actually real.**

| Demo | Status today | Ship as |
| --- | --- | --- |
| Kitchen Inventory (Pantry) | Live app, login-gated | Keep the in-page mocked UI (already built: `HeroDemoTabs` / `ProductPreview`) **plus** a 5–10 step Arcade/Supademo tour captured from the real Pantry app with seeded data, opened from the demo card in a modal/route. Label "Interactive preview · sample data". CTA = "Book a walkthrough". Drop the direct `pantry.yojilabs.com/login` link from public cards — sending anonymous visitors to a login wall is a dead end. |
| Client Scheduling | Not built | Keep the in-page mock preview only. Label "Concept". No tour tool, no external link — that would misrepresent capability. |
| Operations Dashboard | Not built | Same as above: "Concept". |

Consequences in code: `demoContent[].destination` for Pantry becomes an internal
route (`/demos/kitchen-inventory`) hosting the tour embed; the other two get
`link: null` (already the case) and the `/demos` page copy loses "Route connection
coming next" / "Fuller interactive demos are being prepared" in favor of honest
"Concept" labels. Only the Pantry tour needs an operator action (record it).

Revisit a real public sandbox only if Pantry becomes self-serve SaaS.

## Decision 3 — SEO + GEO

Already good: Metadata API with canonical/OG/Twitter, `robots.ts` gated on
`allowIndexing`, `sitemap.ts`, self-hosted fonts, all routes static.

Add:
- **JSON-LD** in `app/layout.tsx`: `Organization` (logo, `sameAs` → GitHub/LinkedIn,
  `contactPoint`), `WebSite`; `Service` per offering on the home page;
  `BreadcrumbList` on sub-routes. Skip FAQPage rich-result hopes (Google retired
  them May 2026) — FAQ content in plain HTML is what matters.
- **Real OG image**: replace `og-placeholder.png` with `app/opengraph-image.tsx`
  (1200×630) or a designed PNG.
- **robots.ts**: explicitly allow `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`,
  `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`,
  `Google-Extended` in production. We want citation.
- **`public/llms.txt`**: 15 minutes, low adoption by providers, harmless.
- **IndexNow**: key file in `public/` + ping on deploy (Bing feeds ChatGPT/Copilot).
- **Operator**: Google Search Console + Bing Webmaster verification (TXT in Cloudflare
  or meta tag via env), submit sitemap.
- **Content hygiene for GEO**: one plain entity sentence above the fold ("YojiLabs is
  a custom software and automation studio that…"), answer-first H2s, a real About
  section, consistent name/links across GitHub + LinkedIn.
- Sitemap: drop `/privacy` and `/terms` placeholders until they have real copy
  (`LegalPlaceholder` today), or write the copy — thin legal pages indexed under
  the brand look worse than none.
- Fix `sitemap.ts` hard-coded `lastModified`.

## Blockers that need a human

1. Vercel GitHub App on `yoji-labs` org (one click in dashboard).
2. Create Resend + Turnstile + Cal.com accounts; add DNS records for Resend.
3. Record the Pantry tour (Arcade/Supademo free tier).
4. Privacy/Terms copy (or agree to leave them out of the sitemap).
5. Confirm `www` → apex policy (recommended).

## Implementation status (2026-08-21)

Done on `feature/go-live-pass` (all behind env vars; nothing requires keys to build or run):

- Forms → `POST /api/contact` and `/api/intake` (`lib/server/contact.ts`): validation, honeypot,
  time-to-submit, optional Turnstile verify, Resend via REST, auto-reply. 503 with mailto copy
  when `RESEND_API_KEY` is missing. Mocks only when `deploymentStage === "local"`.
- Booking → Cal.com inline embed when `NEXT_PUBLIC_CAL_LINK` is set; "Request a time" card otherwise.
- Demo tiers (`interactive-preview` / `concept`) in `content/demo-content.ts`; new
  `/demos/kitchen-inventory` route with tour iframe (`NEXT_PUBLIC_PANTRY_TOUR_URL`) or in-page
  preview fallback; concept slugs 308 → `/demos`. No public link to the Pantry login.
- SEO/GEO: JSON-LD (Organization, WebSite, Service ItemList, BreadcrumbList), generated OG image,
  AI crawlers allowed in `robots.ts`, `public/llms.txt`, IndexNow key + `npm run indexnow`,
  sitemap without legal placeholders, entity sentence in hero, `vercel.json` security headers.
- `.env.example`, `.nvmrc`, `next.config.ts`, deduped `@playwright/test`, e2e coverage for all of it.

Operator checklist (unchanged): Vercel import from `yoji-labs/landing`; Resend (+ DNS), Turnstile,
Cal.com accounts; record the Pantry tour; Privacy/Terms copy; Search Console + Bing verification.
