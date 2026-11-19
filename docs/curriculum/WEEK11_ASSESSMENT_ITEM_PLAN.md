# Week 11 Assessment Item Plan — 66 Proposed Question Intents

> **Updated structural status (2026-11-17):** Week 11 owner-approved **A-012** for lesson/checkpoint structure only. Earlier “draft / pending owner review” statements below are historical. Content authoring, question banks, actual tests, future pilot, global D0/D1 signoff and D2 authorization remain pending.

> **Planning contract, not finished course content.** No learner question bank, isolated sandbox tests, Node/Express/PostgreSQL integration, browser smoke run or learner pilot has been executed by FullStack Fieldbook for this blueprint. D0/D1 remain unsigned; D2 application code is NOT authorized. Structural acceptance of Week 10 is recorded separately as A-011; Week 11 needs owner review.


## Ground rules

- This file is a **question-intent plan** only. Every final question still needs the full text, answer, plausible distractors, rationale, differentiated feedback, alternate equivalent retry, readability/accessibility and technical review.
- Each lesson quiz is six scored items (11 × 6 = **66 slots**). Passing requires ≥5/6 correct plus all essential questions.
- Essential flags below are **candidates**, not finalized authored question metadata. Do not silently set them active before education review.
- Browser suites L04/L05 and local project checklists have separate requirements under `WEEK11_CHECKPOINT_INVENTORY.md`.

## L01 — Testing layers and the Arrange–Act–Assert mindset

**Checkpoint:** `p1-w11-l01-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l01-q01` — Identify what a unit test can prove about a pure helper. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l01-q02` — Choose a layer that verifies middleware and route behavior. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l01-q03` — Explain what a live database test proves that a fake repository test cannot. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l01-q04` — Interpret Arrange–Act–Assert in a short snippet. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l01-q05` — Passing one layer does not certify the entire stack. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l01-q06` — Choose a test for a browser refresh after sign-in. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L02 — Node tests, HTTP contracts, and test double limits

**Checkpoint:** `p1-w11-l02-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l02-q01` — Which test command needs Express packages installed. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l02-q02` — What distinguishes an HTTP integration test from a pure unit test. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l02-q03` — Why use an ephemeral local port for an API test. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l02-q04` — Mocked session harness is not secure real session proof. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l02-q05` — Why must unknown `/api/*` return JSON instead of HTML. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l02-q06` — Which header helps correlate requests with server-side logs. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L03 — Database test safety and Alice/Bob browser verification

**Checkpoint:** `p1-w11-l03-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l03-q01` — What can `TRUNCATE ... CASCADE` remove. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l03-q02` — Never run destructive tests without confirming isolated disposable target. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l03-q03` — Difference between mock query capture and live SQL. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l03-q04` — Why use separate browser profiles. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l03-q05` — What response should Bob get for Alice’s task ID. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l03-q06` — What should remain true about Alice’s database row afterward. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L04 — Reproduce failures using Network DevTools and safe request IDs

**Checkpoint:** `p1-w11-l04-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l04-q01` — First step in debugging loop. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l04-q02` — Differentiate route pattern from raw URL. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l04-q03` — Purpose of X-Request-ID. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l04-q04` — Never log cookies, credentials or private query strings. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l04-q05` — Which DevTools panel gives response status. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l04-q06` — What 200 liveness + 503 readiness suggests. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L05 — Safe API failures and resilient React recovery

**Checkpoint:** `p1-w11-l05-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l05-q01` — 400 vs 413. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l05-q02` — What status for a temporarily unavailable database. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l05-q03` — Never expose a raw SQL/credential-bearing error to clients. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l05-q04` — When should a failed POST change React task data. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l05-q05` — Why avoid automatic retry storms. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l05-q06` — What is required for a successful 204 response. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L06 — Secrets, configuration and fail-fast startup checks

**Checkpoint:** `p1-w11-l06-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l06-q01` — What VITE_ prefix means for frontend code. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l06-q02` — DATABASE_URL and SESSION_SECRET must not be in client bundle. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l06-q03` — Why production WEB_ORIGIN uses HTTPS. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l06-q04` — Why validate config before server listen. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l06-q05` — What to do after a real secret enters Git history. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l06-q06` — How to decide a safe proxy hop count. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L07 — Headers, cookies, HTTPS and security review

**Checkpoint:** `p1-w11-l07-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l07-q01` — What HttpOnly limits. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l07-q02` — What Secure cookie needs in a public browser. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l07-q03` — Role of SameSite and why it is not a universal CSRF proof. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l07-q04` — Helmet does not replace authorization. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l07-q05` — Why arbitrary trust proxy is dangerous. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l07-q06` — What kind of code/credentials must not appear in public preview. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L08 — Liveness, readiness, outage simulation and recovery

**Checkpoint:** `p1-w11-l08-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l08-q01` — What does liveness test. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l08-q02` — What does readiness test. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l08-q03` — A running process does not prove DB availability. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l08-q04` — Why inject a fake dependency failure. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l08-q05` — What status indicates not ready. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l08-q06` — What recovery evidence should be recorded. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L09 — Build React and serve a safe single-origin preview

**Checkpoint:** `p1-w11-l09-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l09-q01` — Purpose of Vite dev proxy. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l09-q02` — What production build emits. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l09-q03` — Difference between /tasks and /api/tasks. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l09-q04` — Unknown `/api/*` must not return SPA HTML fallback. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l09-q05` — How refresh on nested route should behave. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l09-q06` — What changes about cookies under one origin. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L10 — Migrations, release gates, optional hosting and rollback

**Checkpoint:** `p1-w11-l10-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l10-q01` — Why backup needs restore planning. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l10-q02` — Deployment not required to complete core Week 11. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l10-q03` — Why compare migration/schema before release. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l10-q04` — What to inspect in git diff and staged files. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l10-q05` — What should rollback preserve. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l10-q06` — Why free hosting limits must be checked before recommending it. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## L11 — AI-assisted reliability review and Week 12 readiness

**Checkpoint:** `p1-w11-l11-c01` · **Question slots:** 6 · **Passing condition:** ≥5/6 and essential items correct.

- `p1-w11-l11-q01` — What an AI-generated test can miss. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l11-q02` — Why inspect diff and generated commands before running. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l11-q03` — Never equate a passing subset with production certification. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l11-q04` — What evidence belongs in a release report. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l11-q05` — How to explain a skipped live-DB test honestly. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- `p1-w11-l11-q06` — Which Week 12 independent project capability is most important. Write a scenario-specific correct rationale and one plausible misconception-based wrong answer.
- **Retry guidance:** change the fake endpoint, response code, log fields or fictional account scenario; assess the same skill without exposing answer-by-memory.

## Assessment authoring acceptance

- [ ] 66 reviewed final question items with unique IDs, correct answers, rationales and targeted misconception feedback.
- [ ] Review the 11 essential-item candidates and retain only genuinely critical ones.
- [ ] Two isolated browser exercise test plans have exhaustive mandatory cases and safe sandbox boundaries.
- [ ] All 11 self-verification checklists contain exact safe commands, observed outputs and stop conditions.
- [ ] Optional public preview does not block Week 12.
- [ ] No teacher answer key/reference solution published in student assets.
- [ ] A real learner pilot catches unclear prerequisites and misleading test labels.

**Current status:** planning only; no final quiz bank or executable academy test implemented.
