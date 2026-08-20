# YojiLabs Landing Page Design

- Date: 2026-08-20
- Status: Approved in conversation, pending written review
- Workspace: `C:/dev/repos/YojiLabs_Landing_Page`
- Process source of truth: `wuTims/yojilabs-harness`

## 1. Goal

Design a polished, restrained, public-facing YojiLabs landing page that:

- aligns with current YojiLabs product typography and visual tone
- keeps users on the YojiLabs site as much as possible
- is easy to run locally during the full build cycle
- is easy to attach later to a real root-domain marketing site and backend

This document covers the design/spec phase only. It does not approve implementation yet.

## 2. Source Material

### Local design and brand references

- `YojiLabs/landingPage_Sample.png`
- `YojiLabs/ColorPalette.png`
- `YojiLabs/yoji_labs_logo.png`
- `YojiLabs/Yoji_Labs_Pricing_Updated.png`

### Real product reference

- Pantry app login entry point: `https://pantry.yojilabs.com/login?redirect_url=https%3A%2F%2Fpantry.yojilabs.com%2Fdashboard`

### Process and build-guideline reference repo

Reference repo clone inspected locally at:

- `C:/Users/dand5/AppData/Local/Temp/yojilabs-harness-4fe8d3d9-d5d3-44b3-96e7-53c76175d74a`

Most relevant files:

- `README.md`
- `docs/FRONTEND.md`
- `templates/l2-starters/web-nextjs.md`

## 3. Repository Findings

The current workspace is now the real codebase root, but it still contains planning/reference material only.

Current state:

- initialized git repo on `main`
- reference image assets in `YojiLabs/`
- planning docs under `docs/`
- no app scaffold yet
- no routes/components/styles yet

Implication:

- the implementation phase should scaffold the web app in this repo root
- localhost-first development is the intended initial workflow

## 4. Harness Takeaways We Will Adopt

The teammate harness is not the visual design system, but it is the operating guide for planning and build quality.

We will adopt these principles:

1. Plan before implementation.
2. Use documented source-of-truth files for important decisions.
3. Default to Next.js App Router, TypeScript, Tailwind, and server-first rendering.
4. Keep client-side JavaScript minimal and intentional.
5. Use design tokens, not scattered one-off values.
6. Build for accessibility and performance from the start.
7. Keep files and components focused with clear responsibilities.

## 5. Product and Brand Positioning

### Core positioning

YojiLabs should be presented as:

- a one-stop shop for websites, operations systems, automation, internal tools, and business software
- a small but technically capable product engineering partner
- a company that builds systems around real business workflows

### Proof emphasis

- YojiLabs is broad, not hospitality-only
- kitchen inventory is the strongest current proof point
- Pantry should appear through visuals and demo captions, not as the entire homepage identity

### Visual tone

The site should feel:

- warm
- spacious
- technical
- premium without being flashy

It should avoid:

- generic AI startup aesthetics
- over-decorated SaaS patterns
- busy card-heavy layouts
- excessive gradients, blobs, or glass effects

## 6. Typography Plan

### Font system

Use the current product-aligned system:

- `Satoshi` for branded hierarchy
- `Inter` for functional UI and body copy

### Usage rules

Use `Satoshi` for:

- hero headline
- section headings
- card headings
- important labels and emphasized product-preview metrics

Use `Inter` for:

- navigation
- paragraphs
- buttons
- forms
- footer content
- preview metadata and dashboard-style UI text

### Notes

- Do not introduce a separate serif-led marketing voice in v1.
- The landing page should feel like a public extension of current YojiLabs products.

## 7. Design Token Plan

### Color tokens

- `--bg: #F1E6CC`
- `--surface: #FCF7EE`
- `--surface-soft: #F8F1E2`
- `--text: #271D16`
- `--text-muted: #6C5C4D`
- `--border: #E1C596`
- `--accent: #D35F39`
- `--accent-warm: #E9A342`

### Spacing scale

- `4, 8, 12, 16, 24, 32, 48, 64, 96`

### Layout tokens

- standard container: approximately `1200px`
- hero container: approximately `1280px`
- comfortable text measure: `720px` to `760px`

### Radius and shadow

- small controls: `10px`
- buttons/cards: `14px`
- large framed surfaces: `18px`
- use shadows sparingly; borders should carry most structure

## 8. Information Architecture

### Site shape for v1

The first release should not be homepage-only. It should be a focused marketing site with a small route set:

- `/`
- `/start-a-project`
- `/start-a-project/book`
- `/start-a-project/intake`
- `/demos`
- placeholder legal routes for privacy/terms

### Homepage navigation

Header should include:

- `Services`
- `Demos`
- `About / Contact`
- primary CTA: `Start a Project`

### Navigation behavior

- `Services` scrolls to the homepage services section
- `About / Contact` scrolls to the homepage combined about/contact section
- `Demos` should link to the real `/demos` placeholder route in v1
- in localhost-first development, `Demos` does not have to link to the live Pantry app yet

### CTA destination map for v1

To keep implementation unambiguous, the default destination map should be:

- header `Start a Project` -> `/start-a-project`
- hero `Start a Project` -> `/start-a-project`
- hero `Explore Demos` -> `/demos`
- header `Demos` -> `/demos`
- intake success `Book a Call` -> `/start-a-project/book`
- intake success `Explore Demos` -> `/demos`
- intake success `View Services` -> `/#services`
- final CTA -> configurable, defaulting to `/start-a-project`

## 9. Homepage Section Order

The homepage should stay balanced: action-oriented early, but still educational enough to build confidence.

Planned section order:

1. Header
2. Hero
3. Services / what we build
4. Small demos preview
5. About / contact
6. Final CTA
7. Footer

No heavy testimonial or logo-wall section should be included in v1.

## 10. Hero Direction

### Core copy direction

- keep headline close to: `Software built around your business.`
- keep primary copy broad
- use supporting captions to reflect individual demo states

### CTA behavior

- visible CTAs:
  - `Start a Project`
  - `Explore Demos`
- `Start a Project` should default to the chooser flow, not directly to booking
- booking should still be the underlying highest-intent path inside that flow

### Product preview direction

The hero preview must feel like real YojiLabs software, not decorative filler.

It should support three product examples:

1. Kitchen Inventory
2. Bookings / Website
3. Operations Dashboard

### Interaction model

- desktop: manual tab-like switching
- mobile: simple, touch-friendly selection/stacked behavior
- no auto-advance
- main headline and body remain fixed
- only the supporting sample label/caption changes per selected demo

### Data strategy

- build preview from structured local data
- architect it so a real API/data source can replace the mock data later
- keep the whole first build frontend-heavy with little to no backend dependency

## 11. Services Section

The services section should remain restrained and readable.

Planned service categories:

- Custom Software
- Automation and Integrations
- Operations Systems
- Data and Intelligence

The section should also clearly support the broader YojiLabs offering, including:

- websites
- operations software
- automation
- internal tools
- SEO + GEO

Card style:

- simple line icon
- short heading
- concise explanatory copy
- no nested CTAs or dense sub-UI

## 12. Demos Section and Route

### Homepage demos preview

Include a small, not oversized, demos preview section on the homepage.

It should contain:

- 3 demo cards
- each card shows:
  - product/screenshot feel
  - business use case
  - one short outcome/result line

The three demo categories should match the core hero sample set:

- Kitchen Inventory
- Bookings / Website
- Operations Dashboard

### `/demos` route

The first release should include a real placeholder demos route.

It should contain:

- a lightweight intro
- the same 3 demo categories used in the hero and homepage demos preview
- a note that fuller interactive demos are being prepared
- a route structure that can later connect to live demo destinations

## 13. About / Contact Section

### Tone

Use the “small team, big focus” tone, but broaden it beyond hospitality.

The section should communicate:

- direct collaboration
- practical product thinking
- operational understanding
- focus and clarity over agency-style fluff

### Content

This section should combine:

- a short YojiLabs brand/company description
- a compact process summary
- visible contact details
- a general contact form

### Process

Use a simple four-step process:

1. Discover
2. Prototype
3. Build
4. Improve

### Contact details

Visible elements should include:

- email
- embedded general-contact form
- response-time note:
  - `We typically reply within 1–2 business days.`

Do not include social links in this section by default.

### General contact form

Fields:

- `Name`
- `Email`
- `Subject`
- `Message`

This is separate from the project intake flow.

### General contact form behavior contract

Minimum v1 behavior:

- all fields required
- inline client-side validation in localhost mode
- loading state on submit
- mocked local submit handler
- inline success state after submit
- success state should confirm receipt and restate the `1–2 business days` response expectation
- simple inline error state for simulated/mock failure handling
- no persistence required in v1

## 14. Conversion Flow Architecture

### `/start-a-project`

This is the chooser page and should stay on-site.

Two sub-actions:

- `Book a Call`
- `Send Project Details`

Shared intro framing:

- YojiLabs as a one-stop shop for websites, operations systems, automation, and internal tools

### `/start-a-project/book`

This page should contain:

- shared small header/intro framing
- short “what to expect” notes
- a mock scheduler area in localhost mode

### Mock booking contract

The booking route should still feel complete in localhost mode.

Minimum v1 behavior:

- show a small set of pre-defined mock availability slots grouped by day
- allow the user to select one slot
- reveal a minimal booking form after slot selection
- booking form fields:
  - `Name`
  - `Email`
  - `Business`
- submit handled entirely through a mocked local flow
- inline success state should confirm the selected slot and explain that the experience is running in mocked localhost mode
- no persistence required in v1
- implementation should preserve a replaceable booking adapter seam for later real scheduling integration

Do not include an “ideal fit” section in v1.

### `/start-a-project/intake`

Fields:

- `Name`
- `Email`
- `Business`
- `What do you need built?`

Behavior:

- local mock submission flow in v1
- inline success state on the same page

Success state should offer:

- `Book a Call`
- `Explore Demos`
- `View Services`

## 15. Footer and Legal

Footer should be lightweight but useful.

Include:

- brand block
- small link groups
- email
- legal links

Footer should not become a second sitemap.

### Legal handling

For v1 localhost and early build stages:

- include lightweight placeholder routes for `Privacy` and `Terms`

## 16. Config, Content, and Backend Seams

### Content/config philosophy

The first build should separate content and configuration from component structure as much as practical.

Keep easy-to-change:

- external links
- contact info
- CTA labels
- homepage copy
- section headings
- footer content
- hero preview dataset and labels

### Environment-driven external URLs

Treat external URLs as environment-driven from day one.

This should include:

- external contact endpoints
- live app/demo URLs
- future marketing-route base URLs
- canonical site URL
- Open Graph image URL

Core internal app routes should stay fixed in v1 rather than environment-driven:

- `/`
- `/demos`
- `/start-a-project`
- `/start-a-project/book`
- `/start-a-project/intake`

### Backend integration seam

The first real backend target should be:

- a simple internal YojiLabs-owned store for project-intake and contact submissions

Frontend should be planned around a replaceable submission adapter boundary so mocked handlers can later be swapped for real persistence without rewriting page structure.

Future note:

- later admin/dashboard management should be documented as a future extension, not a v1 requirement

### Documentation requirement

Future backend and configuration notes should be preserved in both:

- this spec document
- `README.md`

## 17. Localhost and Non-Production Behavior

The first build should run fully in localhost with mocked behavior.

That includes:

- booking flow
- project-intake submission flow
- general-contact form submission flow
- success states
- demo/preview data

No external service should be required for core local flow testing.

### Indexing behavior

- localhost and non-production should be `noindex`
- production should become indexable at launch

## 18. Technical Stack Direction

Lock the spec to the harness-aligned starter direction:

- Next.js App Router
- TypeScript
- Tailwind
- server-first rendering

Client-side JavaScript should be used only where it provides real value:

- hero demo switching
- mobile nav if needed
- local mock form interactions

## 19. Motion, Accessibility, and Performance

### Motion

Keep motion subtle and polished:

- small hover transitions
- restrained preview state transitions
- gentle entrances only if they do not distract

Avoid:

- autoplay-heavy motion
- decorative parallax
- blobs, bounce, floating UI noise

### Accessibility

- semantic headings and landmarks
- visible focus states
- keyboard-friendly interactive elements
- reduced-motion support
- strong contrast on cream surfaces
- correct button/link semantics
- meaningful alt text

### Performance

- minimize client JavaScript
- optimize fonts and image handling
- avoid layout shift in hero/logo areas
- keep demo visuals lightweight
- treat the site as frontend-heavy, backend-light

## 20. Asset Plan

### Available now

- raster logo
- palette image
- landing page mockup
- pricing reference image

### Approved v1 logo strategy

- use a self-generated SVG version of the YojiLabs logo/symbol in v1
- use symbol + wordmark wherever appropriate

### Still needed later

- favicon set
- final OG/social image
- any official source vector assets if later desired

## 21. Expected Project Structure

Expected implementation structure:

- `app/`
- `app/start-a-project/`
- `app/start-a-project/book/`
- `app/start-a-project/intake/`
- `app/demos/`
- `app/privacy/`
- `app/terms/`
- `components/landing/`
- `components/forms/`
- `components/routes/`
- `content/` or equivalent local content/config layer
- `public/`
- `docs/superpowers/specs/`

## 22. Files Expected to Change During Implementation

### Create

- `package.json`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- route files for booking/intake/demos/legal
- landing components
- form components
- local content/config files
- SVG brand assets derived for v1

### Leave untouched

- `YojiLabs/*` reference images
- teammate harness repo contents

## 23. Implementation Sequence

1. Scaffold the web app in the repo root.
2. Establish theme tokens, typography, and brand asset pipeline.
3. Add route shell, metadata, and localhost/non-production indexing behavior.
4. Build homepage structure and section scaffolding.
5. Build hero and structured multi-product preview.
6. Build services and small demos preview sections.
7. Build about/contact section and general-contact form.
8. Build `/start-a-project` chooser route.
9. Build booking and intake subroutes with mocked local behavior.
10. Build `/demos` placeholder and legal placeholders.
11. Complete responsive, accessibility, motion, and performance passes.
12. Document future backend/store integration seam.

## 24. Immediate Next Step

After the written spec is reviewed and accepted, the next planning artifact should be the implementation plan.
