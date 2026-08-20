# YojiLabs Landing Page

This repository is the working codebase for the new YojiLabs public-facing landing page.

## Current Phase

The project is currently in spec/planning mode.

Primary planning document:

- `docs/superpowers/specs/2026-08-20-yojilabs-landing-page-design.md`

## Process Source of Truth

For planning discipline, build conventions, and frontend quality expectations, use the teammate harness as the process/source-of-truth reference:

- `wuTims/yojilabs-harness`

This repo does **not** provide the final visual design system for the landing page. The visual direction comes from the local YojiLabs brand and mockup assets.

Current refinement direction for the homepage:

- preserve the existing YojiLabs structure instead of redesigning from scratch
- use the harness as process guidance, not as the landing page's final visual source
- keep Satoshi for hierarchy and Inter for supporting UI
- favor denser section rhythm over adding filler sections
- keep demo previews clearly distinct by product type while preserving a shared YojiLabs UI system

Reusable brand primitives added during the flare pass:

- `components/brand/YojiLabsLoader.tsx`
- `components/brand/YojiLabsLoaderOverlay.tsx`
- `components/brand/yojilabs-loader.module.css`

Usage example:

```tsx
import { YojiLabsLoader } from "@/components/brand/YojiLabsLoader";

export default function Example() {
  return <YojiLabsLoader variant="full" size="md" />;
}
```

Overlay usage stays separate so the loader primitive remains portable:

```tsx
import { YojiLabsLoaderOverlay } from "@/components/brand/YojiLabsLoaderOverlay";

export default function ExampleOverlay() {
  return <YojiLabsLoaderOverlay variant="full" size="lg" />;
}
```

## Local Development Intent

The landing page is intended to be developed localhost-first until the experience is complete enough to attach to the real root-domain site.

The first build should be fully runnable locally with mocked behavior for:

- booking flow
- project intake submissions
- general contact submissions
- demo data
- success states

## Config and Environment Notes

External URLs should be environment-driven from day one. Plan for configuration of:

- primary CTA destinations
- demo/app URLs
- contact endpoints
- canonical site URL
- Open Graph image URL
- any future external/legal/service URLs

Current environment seam in the app:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CANONICAL_URL`
- `NEXT_PUBLIC_OG_IMAGE_URL`
- `NEXT_PUBLIC_DEPLOYMENT_STAGE`
- `NEXT_PUBLIC_MARKETING_ROUTE_BASE`
- `NEXT_PUBLIC_PANTRY_APP_URL`
- `NEXT_PUBLIC_KITCHEN_INVENTORY_DEMO_URL`
- `NEXT_PUBLIC_BOOKINGS_DEMO_URL`
- `NEXT_PUBLIC_OPERATIONS_DASHBOARD_DEMO_URL`
- `NEXT_PUBLIC_CONTACT_ENDPOINT`
- `NEXT_PUBLIC_PROJECT_INTAKE_ENDPOINT`
- `NEXT_PUBLIC_BOOKING_ENDPOINT`

Content that should stay easy to update without rewriting component structure:

- CTA labels
- contact info
- section headings and copy
- footer content
- hero preview datasets and labels

Current internal route map:

- `/`
- `/demos`
- `/privacy`
- `/terms`
- `/start-a-project`
- `/start-a-project/book`
- `/start-a-project/intake`
- `/#services`
- `/#about-contact`

Mocked localhost seams already in place:

- general contact submission adapter: `lib/mocks/mock-submissions.ts`
- project intake submission adapter: `lib/mocks/mock-submissions.ts`
- booking adapter + availability dataset: `lib/mocks/mock-booking.ts`
- mock delay helper: `lib/mocks/mock-delay.ts`

Future live demo-link seam:

- demo route/hero/homepage preview data lives in `content/demo-content.ts`
- each demo carries a typed destination contract so future live links can attach without rewriting the rendering components

## Future Backend Notes

The first backend attachment point should be a simple internal YojiLabs-owned store for:

- project intake submissions
- general contact submissions

Future enhancement to plan for later:

- admin/dashboard management of leads and contact messages

Do not treat the admin/dashboard path as a v1 blocker for the landing page build.

## Asset Notes

For v1, the build may use a self-generated SVG version of the YojiLabs logo/symbol.

Later production polish should still consider:

- favicon set
- social share / OG image
- any official vector replacements if desired
