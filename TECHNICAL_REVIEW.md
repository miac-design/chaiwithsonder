# ChaiWithSonder - Senior Engineer Technical Review

**Date:** 2026-02-12
**Scope:** Full codebase audit - docs, processes, architecture, security, and code quality
**Reviewer context:** Senior AI/Platform Engineer perspective

---

## Executive Summary

ChaiWithSonder is a Next.js 15 mentorship platform using Supabase (Postgres + Auth + Realtime), NextAuth, Jitsi video, and Brevo/Resend email services. The product vision is strong — story-based mentor matching with a "Sonder Engine" is genuinely differentiated. However, the codebase has **critical security gaps**, **fragmented authentication**, **no CI/CD pipeline**, and **missing production hardening** that must be addressed before launch.

**Overall risk level: HIGH for production deployment in current state.**

---

## 1. DOCUMENTATION GAPS

### 1.1 README.md is Outdated

| Field | README Says | Actual |
|---|---|---|
| Next.js version | 14 | 15.3.9 |
| State management | "React Hooks" | Supabase + NextAuth + local state |
| Icons | Heroicons | Lucide React |
| Project structure | 5 routes listed | 15+ routes with dashboard, auth, API |
| Tech stack | 4 items | Supabase, NextAuth, Framer Motion, Jitsi, Brevo, Resend, Cal.com |

The README doesn't mention Supabase, authentication, the database, API routes, or real-time features at all. A new developer would have no idea how to set up the project.

### 1.2 Missing Critical Documentation

- **No `.env.example`** — new developers can't know which env vars are required (Supabase URL, Supabase anon key, Google OAuth creds, Resend API key, Brevo API key, admin secret, cron secret, NextAuth secret)
- **No `CONTRIBUTING.md`** — the README has 5 bullet points but no coding standards, branch strategy, or PR process
- **No `LICENSE` file** — README references MIT license but the file doesn't exist
- **No architecture diagram** — complex multi-service system with no visual documentation
- **No API documentation** — 5 API routes with no documented request/response contracts
- **No database schema docs** — 5 migration files but no ERD or relationship documentation
- **No deployment guide** — no instructions for Vercel/hosting setup, Supabase project config, or domain setup

### 1.3 Recommendation

Create:
1. `.env.example` with every required variable documented
2. An architecture overview explaining the auth flow, data flow, and service integrations
3. API route documentation (even inline JSDoc would help)
4. A database ERD showing table relationships

---

## 2. DEVELOPMENT PROCESS GAPS

### 2.1 No CI/CD Pipeline

There are **zero** GitHub Actions, no `.github/` directory, no pre-commit hooks, no automated testing.

**What's missing:**
- No automated linting on PRs
- No build verification on PRs
- No automated tests (unit, integration, or e2e)
- No automated deployment pipeline
- No branch protection rules documented

This means broken code can land in main with no guardrails.

### 2.2 No Testing Infrastructure

- **Zero test files** in the entire codebase
- No test runner configured (no Jest, Vitest, Playwright, or Cypress)
- No test scripts in `package.json` beyond `lint`
- No test coverage thresholds

For a platform handling user data, sessions, and payments (donations), this is a significant risk.

### 2.3 ESLint is Disabled During Builds

```js
// next.config.js
eslint: {
    ignoreDuringBuilds: true,
}
```

This means the build will succeed even with lint errors. Combined with no CI, there's no code quality enforcement at any stage.

### 2.4 Recommendation

**Minimum viable process:**
1. Add a GitHub Actions workflow: `lint -> type-check -> build` on every PR
2. Add Vitest with at least API route tests
3. Remove `ignoreDuringBuilds: true` from next.config.js
4. Add a pre-commit hook (husky + lint-staged) for linting

---

## 3. CRITICAL SECURITY ISSUES

### 3.1 Hardcoded Admin Secret (CRITICAL)

**File:** `src/app/api/mentor-approval/route.ts`
```
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'chaichat-admin-2024';
```

If the env var is unset, anyone who reads the source code can approve mentors. Worse, the GET endpoint on this same route **returns the actual secret value in an example curl command**. This is a credential leak.

**Fix:** Remove the fallback. Fail with 500 if env var is missing. Never return secrets in responses.

### 3.2 Authentication is Not Connected (CRITICAL)

The codebase has **two separate auth systems** that aren't integrated:

1. **NextAuth** (`src/app/api/auth/[...nextauth]/route.ts`) — configured with Google OAuth
2. **Supabase Auth** (`src/lib/auth-context.tsx`, `src/lib/supabase.ts`) — used in auth context

The dashboard pages use **neither**. They use hardcoded mock data:
```typescript
const mockUser = {
    id: 'user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    isMentor: true,
};
```

This means:
- Dashboard is accessible to anyone, no login required
- All session/message/analytics data is visible without authentication
- No user identity is verified on any page

**Fix:** Pick one auth system (Supabase Auth is the better choice given the existing RLS policies) and wire it through the entire app. Add middleware to protect `/dashboard/*` routes.

### 3.3 No Input Validation on API Routes (HIGH)

All 5 API routes accept request bodies without validation:

- `/api/match` — quiz answers not validated against allowed enums
- `/api/booking-email` — email addresses not validated, names not sanitized
- `/api/mentor-approval` — mentor data not validated
- `/api/reminders` — no validation at all (cron endpoint)

User input is directly interpolated into HTML email templates without escaping, creating XSS-in-email vectors.

**Fix:** Add Zod schemas for every API route. Sanitize all user input before embedding in HTML.

### 3.4 No Rate Limiting (HIGH)

No rate limiting on any endpoint. The email-sending endpoints (`/api/booking-email`, `/api/mentor-approval`) could be abused to send spam through your Brevo/Resend accounts, potentially getting your sending domain blacklisted.

**Fix:** Add rate limiting middleware. At minimum, rate-limit email-sending endpoints.

### 3.5 Wildcard Image Domain (MEDIUM)

```js
// next.config.js
hostname: '**',  // Allows ANY remote image
```

This allows SSRF attacks via Next.js image optimization. An attacker could use your server as a proxy to fetch internal resources.

**Fix:** Whitelist only the domains you actually use (Supabase storage, Unsplash, etc.).

### 3.6 Missing CSRF Protection (MEDIUM)

API routes have no CSRF tokens. Combined with the lack of CORS configuration, external sites could make authenticated requests on behalf of users.

---

## 4. DATABASE SCHEMA REVIEW

### 4.1 Duplicate Session Tables

There are **two session tables** that overlap:

| Table | Migration | Columns |
|---|---|---|
| `sessions` | 001_initial_schema.sql | connection_id, mentor_id, mentee_id, scheduled_at, duration_minutes, status, session_type, meeting_link |
| `mentoring_sessions` | 002_automation_schema.sql | conversation_id, mentor_id, mentee_id, scheduled_at, duration_minutes, status, meeting_url, notes, feedback_rating |

The code uses `mentoring_sessions` in the automation/chat flows and `sessions` in the original schema. This creates confusion about which is the source of truth.

**Fix:** Consolidate to one sessions table. Migrate data if needed.

### 4.2 Duplicate Feedback Tables

Similarly, there are **two feedback/review tables**:

| Table | Migration |
|---|---|
| `reviews` | 001_initial_schema.sql |
| `session_feedback` | 004_phase3_notes_analytics.sql |

Both store ratings (1-5) and text feedback per session. The `reviews` table also has `would_recommend` and references the old `sessions` table.

**Fix:** Consolidate to one feedback table.

### 4.3 RLS Policy Gaps

**Conversations table:**
```sql
CREATE POLICY "Users can view their own conversations"
    ON conversations FOR SELECT
    USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
```

The `mentor_id` and `mentee_id` here reference `profiles(id)`, not `auth.users(id)`. But `auth.uid()` returns the auth user ID. These will **never match** unless `profiles.id` equals `auth.users.id`, which it doesn't — the `profiles` table uses its own UUID with `user_id` as a separate FK.

This means either:
- RLS policies silently block all data (nothing works)
- RLS is bypassed because the app uses the service role key

**Fix:** RLS policies should compare against `(SELECT user_id FROM profiles WHERE id = mentor_id)` or refactor to store `auth.uid()` directly in conversation fields.

### 4.4 Missing Migration Tooling

Migrations are raw SQL files with no versioning tool (no Supabase CLI config, no `supabase/config.toml`). There's no way to:
- Roll back a migration
- Track which migrations have been applied
- Run migrations in different environments

**Fix:** Set up `supabase init` and use the Supabase CLI migration system properly.

### 4.5 No Seed Data

The schema has `-- INSERT INTO ... (to be added if needed)` comments but no actual seed data. Local development requires manually creating test data.

**Fix:** Add a `supabase/seed.sql` with development test data.

---

## 5. CODE ARCHITECTURE ISSUES

### 5.1 Hardcoded Mentor Data in API Route

`src/app/api/match/route.ts` contains ~170 lines of hardcoded mentor profiles:

```typescript
const MENTORS: MentorProfile[] = [
    { id: 'hamed-alikhani', name: 'Hamed Alikhani, PhD', ... },
    // 13 more mentors
];
```

This should be in the database. It means:
- Adding/removing mentors requires a code deployment
- No admin interface can manage mentors
- The matching API response is disconnected from the actual mentor profiles in the database

### 5.2 Email Service Fragmentation

Three different email implementations exist:

| File | Provider | Used For |
|---|---|---|
| `src/lib/email-service.ts` | Resend API | General emails |
| `src/lib/reminder-service.ts` | Resend API | Session reminders |
| `src/app/api/booking-email/route.ts` | Brevo (Sendinblue) API | Booking confirmations |

Two different email providers, three different implementations, no shared abstraction. Switching providers or updating templates requires changes in multiple places.

**Fix:** Create a single email service abstraction with template support. Pick one provider.

### 5.3 Type Safety Erosion

Extensive use of `as any` throughout the codebase defeats TypeScript:

```typescript
// src/lib/chat-service.ts
const { data, error } = await (supabase as any).from('conversations').select(...)

// src/lib/analytics-service.ts
const completedSessions = sessions.filter((s: any) => s.status === 'completed');
```

**Fix:** Run `supabase gen types typescript` to generate proper database types and use them everywhere.

### 5.4 Client-Side Analytics Calculation

`src/lib/analytics-service.ts` fetches all sessions and computes stats in JavaScript:

```typescript
const { data: sessions } = await supabase
    .from('mentoring_sessions').select('*').eq('mentor_id', mentorId);
// Then: .filter(), .reduce(), new Set()... in JS
```

This should be a single SQL query with `COUNT`, `SUM`, `AVG`. As data grows, this will become a bottleneck.

### 5.5 Tailwind Dynamic Class Anti-pattern

`src/app/(routes)/dashboard/page.tsx` uses template string class names:

```typescript
text-${stat.color}-500
```

Tailwind's JIT compiler only scans for complete class strings. Dynamic construction like this means the classes won't be in the CSS output.

**Fix:** Use a mapping object: `{ blue: 'text-blue-500', green: 'text-green-500', ... }`.

---

## 6. DEPENDENCY CONCERNS

### 6.1 Version Conflicts

| Package | Installed | Issue |
|---|---|---|
| `tailwindcss` | ^3.3.3 | But `@tailwindcss/postcss` is ^4.1.7 — major version mismatch |
| `react` | 18.2.0 | Next.js 15 ships with React 19 support; pinning 18 may cause issues |
| `next-auth` | ^4.24.11 | Next.js 15 works better with Auth.js v5 (next-auth@5) |
| `framer-motion` | ^10.0.0 | Current version is 11.x; v10 has known issues with React 18 strict mode |

### 6.2 Missing Dependencies

- **No validation library** (zod, yup, joi) — all input validation is manual
- **No date library** (date-fns, dayjs) — date handling uses raw `Date` objects and string construction
- **No logging library** — all logging is `console.log`/`console.error`
- **No error tracking** (Sentry, LogRocket) — errors silently disappear in production

### 6.3 Unused Dependencies

- `next-auth` is configured but not actually used in any page/component (dashboard uses mock data)
- If Supabase Auth is the intended system, `next-auth` can be removed

---

## 7. PROCESS IMPROVEMENT RECOMMENDATIONS

### Priority 1: Security Fixes (Before Any Public Launch)

1. **Remove hardcoded admin secret** and its exposure in API responses
2. **Wire up authentication** — pick Supabase Auth, add middleware for protected routes, remove mock data
3. **Add input validation** with Zod on every API route
4. **Fix RLS policies** — the user ID mismatch means policies don't work correctly
5. **Restrict image domains** in next.config.js
6. **Add rate limiting** to email and auth endpoints

### Priority 2: Development Process (Before Team Scaling)

1. **Add CI/CD** — GitHub Actions with lint, type-check, and build steps
2. **Add testing** — at minimum, API route tests and auth flow tests
3. **Create `.env.example`** — document every required environment variable
4. **Enable ESLint in builds** — remove `ignoreDuringBuilds: true`
5. **Set up Supabase CLI** — proper migration management with `supabase init`
6. **Add pre-commit hooks** — husky + lint-staged for code quality

### Priority 3: Architecture Cleanup (Before Feature Expansion)

1. **Consolidate duplicate tables** — merge `sessions`/`mentoring_sessions` and `reviews`/`session_feedback`
2. **Move mentor data to database** — remove hardcoded array from API route
3. **Unify email service** — single abstraction, one provider
4. **Generate Supabase types** — eliminate all `as any` casts
5. **Move analytics to SQL** — replace client-side computation with database aggregation
6. **Fix Tailwind dynamic classes** — use class maps instead of template strings

### Priority 4: Production Readiness (Before Scale)

1. **Add error tracking** (Sentry)
2. **Add observability** (structured logging, request tracing)
3. **Add monitoring** (uptime checks, performance metrics)
4. **Document deployment process** — env vars, Supabase setup, Vercel config
5. **Add database backups** — verify Supabase backup strategy
6. **Add data pagination** — all list queries should be paginated

### Priority 5: Documentation (Ongoing)

1. **Update README** — correct tech stack, accurate project structure
2. **Add architecture diagram** — auth flow, data flow, service map
3. **Add API documentation** — request/response contracts for each route
4. **Add database ERD** — visual schema documentation
5. **Create onboarding guide** — step-by-step for new developers

---

## 8. WHAT'S DONE WELL

To be balanced, the codebase does several things right:

- **RLS is enabled on all tables** — the intent to secure data at the database level is correct, even if the policies need fixing
- **Good schema design** — the Sonder Engine concept (story analysis, growth stages, communication styles) is well-modeled
- **Clean component structure** — components are reasonably sized and focused
- **Proper use of Next.js App Router** — route groups, API routes, and layouts are well-organized
- **Supabase Realtime** — correctly set up for messages and live availability
- **TypeScript strict mode** — enabled in tsconfig.json
- **Sensible indexing** — GIN indexes on array columns, composite indexes on frequently queried columns
- **Trigger-based automation** — reciprocity tracking, updated_at timestamps, analytics updates all use proper database triggers

---

## Summary Table

| Area | Current State | Risk | Effort to Fix |
|---|---|---|---|
| Authentication | Broken / mock data | CRITICAL | Medium |
| API Security | No validation, hardcoded secrets | CRITICAL | Medium |
| RLS Policies | User ID mismatch | CRITICAL | Low |
| CI/CD | None | HIGH | Low |
| Testing | None | HIGH | Medium |
| Documentation | Outdated/missing | MEDIUM | Low |
| Type Safety | Extensive `as any` | MEDIUM | Medium |
| Email Services | Fragmented | MEDIUM | Medium |
| Database Schema | Duplicated tables | MEDIUM | Medium |
| Performance | Client-side computation | LOW | Low |

---

*This review is intended to be constructive. The product concept is strong and the codebase has good bones — addressing these issues systematically will put it in a solid position for launch.*
