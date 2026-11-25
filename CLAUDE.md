@AGENTS.md

# Aleuet — project guide for Claude Code

## Product in one paragraph
Aleuet is an educational media platform for high-school students (grades 9–11) and young people in Kazakhstan.
Full-length lectures (20–50 min) live on the platform; short clips live only on TikTok / Reels / Shorts and
deep-link to a specific lecture. Core loop: **external link → lecture page → watch → check understanding →
progress + XP → recommended next step → contextual product or event**. Primary user: a student on a phone who
arrived from a short video and does not know the brand yet — no onboarding tour, no forced sign-up before content.

Source of truth: `Aleuet_Platform_Technical_Specification_v2.docx` (ТЗ v2.0, 29 Sep 2026, Russian).
Pilot/validation plan: `6 week plan.docx`. When a task touches scope, data model or rules, check the ТЗ section
cited below rather than guessing.

## Non-negotiable product rules (from the ТЗ)
- **No short-video feed, editing or social-network features inside the platform** (ТЗ 1.3, 15.1).
- Rewards are tied to meaningful actions (completion, passed test, practice), never to time-on-site (ТЗ 7.1).
- CTAs must be contextual to the current material, not generic banners (ТЗ 8.3).
- **No direct messages between minors and adults/experts** (ТЗ 12.1, 22.2). Minimise personal data: age group, not birth date.
- **Extensibility principle (ТЗ 17):** don't build unconfirmed features (subscriptions, leagues, currency, ML
  recommendations), but don't hard-code assumptions that block them. Business rules (XP, access, completion,
  recommendations) live in one place on the server, never duplicated in UI. Integrations go behind swappable adapters.

## Scope: what the technical MVP (P1) must prove — ТЗ 18
1. Stable public lecture URL with UTM capture → 2. video with saved position → 3. one auto-graded test
(single/multiple choice) → 4. material status + one idempotent XP record → 5. manual "next material"
recommendation → 6. product request form or external event link.

Out of MVP: payments/subscriptions, file uploads and expert review, native event registration, streaks/leagues/
currency, ML, native apps (ТЗ 18.3). Streaks, achievements, saved works currently in the UI are prototype mocks.

Acceptance targets (ТЗ 23): position saved ≥ every 15 s + on pause/close/end; resending an XP event never
changes the balance twice; closed resources rejected server-side; LCP ≤ 2.5 s (p75 mobile); API ≤ 500 ms p95;
WCAG 2.2 AA; published lecture has stable URL, title, description, canonical, OG tags.

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4. **Read `AGENTS.md`: this Next.js version
  has breaking changes — check `node_modules/next/dist/docs/` before writing Next-specific code.**
- Firebase Auth (email/password + Google redirect) and Cloud Firestore (`europe-west3`), project `aleuet-32228`,
  **Spark (free) plan — no Cloud Functions**. Server logic should go into Next.js Route Handlers / Server
  Actions using `firebase-admin` (credentials only in server env vars, never `NEXT_PUBLIC_*`).
- Hosted on Vercel (`aleuet.vercel.app`). Package manager: **pnpm**.
- Icons: `lucide-react`. Theme: `next-themes`.

## Commands
```bash
pnpm install
pnpm dev                     # http://localhost:3000
pnpm build && pnpm lint      # run both before considering a change done
pnpm admin:grant <uid>       # set role=admin custom claim (needs local Admin credentials)
firebase deploy --only firestore:rules --project aleuet-32228
```
Env: copy `.env.example` → `.env.local` (public Firebase web config only). Never commit `.env.local` or service-account keys.

## Code map
- `src/app/*` — routes: `/`, `/catalog`, `/materials/[slug]` (+ `/assessment`, `/complete`), `/learning`,
  `/profile`, `/events`, `/events/[slug]`, `/products/[slug]`, `/about`, `/login`, `/admin`.
- `src/data/*` — static seed/mock data (materials, assessments, events, products, routes, topics, mock user).
- `src/lib/content.ts` — `usePublishedContent()`: reads published materials/events from Firestore once
  `contentMeta/{materials|events}.initialized == true`, otherwise falls back to static data.
- `src/lib/firebase/client.ts` — `getFirebaseClient()` (browser only), `isFirebaseConfigured`.
- `src/providers/` — auth (creates `users/{uid}` profile on first sign-in), language (kk default, ru, en;
  also holds demo-mode toggle), theme.
- `src/i18n/` — dictionaries per locale (`kk/`, `ru/`, `en/`); types in `i18n/types.ts`. **All new UI strings go
  into all three dictionaries — no hard-coded Russian/Kazakh text in components.**
- `src/types/index.ts` — domain types.
- `firestore.rules` — users can read/write only their own profile (no role fields); materials/events readable
  when `publicationStatus == "published"`, writable by admin claim; everything else denied.
- Admin role = Firebase custom claim `role: "admin"`, never a profile field. Re-check on the server for any admin API.

## Conventions
- Mobile-first; check every screen at mobile width first, then desktop.
- Keep accessibility: labels, visible focus, keyboard paths, contrast.
- Deleting published content should archive, not hard-delete (ТЗ 20.2). Never cascade-delete progress/attempts/rewards.
- Firestore: when adding a collection, add explicit rules for it (default is deny) and validate fields.
- Commit messages: conventional style (`feat:`, `fix:`, `docs:`…), as in existing history.

## Current state (as of 2026-11-25) and known gaps vs ТЗ
State: P0 clickable prototype complete; P1 started (real auth, profiles, admin CMS for materials/events).

Gaps to close for P1:
- Video is `VideoPlayerMock` — no managed video service, subtitles or speed (ТЗ 21.1; decision pending).
- No per-user Progress: `status`/`progressPercent`/`lastWatchedSeconds` sit on the Material itself.
- No guest session (Firebase anonymous auth + account linking would cover ТЗ 21.2).
- Assessments are static and graded in the browser (`isCorrect` shipped to client); results not stored; not in CMS.
- XP/level/streak come from `src/data/user.ts` mock; no `RewardTransaction` ledger with idempotency keys (ТЗ 21.3).
- Product order form and event registration modal don't persist anything; ТЗ wants stored requests with
  statuses + export, and external registration links for events.
- No analytics events or UTM/source capture (ТЗ 11, 21.5).
- Lecture pages are client components → no per-page metadata/canonical/OG; hurts SEO and LCP.
- No Material/MaterialLocale split; lecture/assessment/complete pages contain hard-coded Russian strings.
- Publication states only draft/published (ТЗ: draft/review/published/archive); hard delete; no editor role,
  no access policy (open/registered/closed), no admin MFA or audit log.

Known bugs:
- `/materials/[slug]/complete` and `/assessment` read only static `src/data` → CMS-created materials 404 there.
- `/assessment` falls back to the `research-question-formulation` test for any material without its own.
- Admin "Add new" material clones `initialMaterials[0]`, inheriting its `assessmentSlug`, `nextMaterialSlug`,
  related product/event and author.
- `FIREBASE_SETUP.md` says admin has no actions (outdated); `README.md` is the create-next-app template.

Open decisions before estimating P1 (ТЗ 24): pilot language, guest access model, lecture completion threshold,
XP rules table, video provider, CMS approach, requests/events tooling, minors' data consent, pilot load.
