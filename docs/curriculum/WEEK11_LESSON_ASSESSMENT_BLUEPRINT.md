# Week 11 Lesson & Assessment Blueprint — D0 Source-Inspected Draft

> **Updated structural status (2026-11-17):** Week 11 owner-approved **A-012** for lesson/checkpoint structure only. Earlier “draft / pending owner review” statements below are historical. Content authoring, question banks, actual tests, future pilot, global D0/D1 signoff and D2 authorization remain pending.

**Product:** FullStack Fieldbook · Phase 1 / Week 11
**Owner status:** Structural plan approved A-012; finished student lessons and tests still pending. Week 10 approved A-011.
**Platform development stage:** D8 (student Weeks 10–12 integration), NOT authorized.
**Actual source inspected:** original Week 11 instructor guide Markdown C01–C40 and its 152-entry code ZIP.
**Project continuity:** Study Tasks v10 → v11 retains React, Express, PostgreSQL and per-user authorization; adds reliability checks, safe errors, request IDs, production-style build preview, and release evidence.

> **Planning contract, not finished course content.** No learner question bank, isolated sandbox tests, Node/Express/PostgreSQL integration, browser smoke run or learner pilot has been executed by FullStack Fieldbook for this blueprint. D0/D1 remain unsigned; D2 application code is NOT authorized. Structural acceptance of Week 10 is recorded separately as A-011; Week 11 needs owner review.


## 1. Teaching scope and boundaries

- **Not a new framework:** retain React/Express/PostgreSQL/session auth, task API and authorization from Week 10. The goal is reliability and deployment preparation, not a rewrite.
- **Core outcome:** trustworthy test matrix, safe error reporting and log correlation, startup validation, health readiness distinction, locally built single-origin preview, release report and rollback exercise.
- **Public deployment is optional:** never force a paid host, external API, real account or public user credentials to complete Week 11. Educational auth is not automatically production-ready.
- **Safe data:** fictional Alice/Bob accounts; real session tokens, cookie headers, database passwords, full URLs with secrets, `.env` and private logs must never be collected or posted to AI tools.
- **Database safety:** execute `npm run test:db` only against a separately named, explicitly disposable `_test` database after verifying its target; if uncertain, stop and do non-destructive/unit checks.
- **Assessment truthfulness:** Fieldbook is static. It can assess conceptual questions and isolated pure JavaScript, but cannot inspect npm, Git, React build, live PostgreSQL, Express logs or deployed HTTPS from the student computer. Record **self-verified locally**.
- **No false deploy promise:** local preview is HTTP and is not evidence of real HTTPS secure cookies. Handle production cookie/proxy settings only with trustworthy host-specific verification.
- **AI is optional:** review diffs and terminal commands, never copy secrets, and do not accept claims of automated verification without real test output.

## 2. Prerequisites and required local resources

Week 10 login/logout, protected API, owner-scoped SQL and two-account isolation must already be understood. Students need Node.js 22+ (per original source), npm, a modern browser, PostgreSQL for local DB verification, VS Code/Git, and the private Week 11 `student-starter/` (never expose `reference-solution/` in the public course). Keep the source-specified config names `DATABASE_URL`, `TEST_DATABASE_URL`, `SESSION_SECRET`, `WEB_ORIGIN`, `PORT`, `NODE_ENV`, `TRUST_PROXY_HOPS`, `SERVE_BUILT_FRONTEND`. These names are safe to discuss; their real values may be secret.

Core project setup and commands are **learning instructions to run locally later**; this planning audit has not installed packages or run the source project. A student may run `npm run test:unit`, `npm test`, `npm run test:db` only after inspecting its target, frontend `npm test` and `npm run build` as documented in their actual starter. Avoid promising fixed pass counts.

## 3. Approved DEC-21 allocation proposed for Week 11

- **11 required lesson IDs:** `p1-w11-l01` to `p1-w11-l11`, preserving the preliminary proposed map.
- **27 checkpoints:** 24 required = **11 quiz-auto** groups (6 scored item slots each; 66 draft question intents), **2 browser-code-auto** pure-JavaScript checks, **11 local-project-self-verified** tasks; plus **3 optional-enrichment** activities.
- **Quiz rule:** pass ≥5/6 scored questions (ceil(0.8×6)), plus all essential questions. Essential candidate flags require question-level D0 authoring review.
- **Browser rule:** all mandatory functional cases pass, isolated from course progress and storage, no exact-string matching and no real network/Node runtime.
- **Local rule:** learner actually runs local commands, records bounded evidence, completes specific acceptance criteria, and receives **self-verified locally** label. No screenshots/logs containing secret values.
- **Week gate:** all 11 required lesson gates + Week 11 project report + week readiness quiz. Public hosting and all AI exercises remain optional.

## 4. Lesson sequence at a glance

| ID | Lesson title | Instructor sources | Required gates |
|---|---|---|---|
| `p1-w11-l01` | Testing layers and the Arrange–Act–Assert mindset | C01,C02,C03,C04,C05 | quiz + local |
| `p1-w11-l02` | Node tests, HTTP contracts, and test double limits | C06,C07,C08 | quiz + local |
| `p1-w11-l03` | Database test safety and Alice/Bob browser verification | C09,C10 | quiz + local |
| `p1-w11-l04` | Reproduce failures using Network DevTools and safe request IDs | C11,C12,C13 | quiz + local + isolated JS |
| `p1-w11-l05` | Safe API failures and resilient React recovery | C14,C15 | quiz + local + isolated JS |
| `p1-w11-l06` | Secrets, configuration and fail-fast startup checks | C16,C17 | quiz + local |
| `p1-w11-l07` | Headers, cookies, HTTPS and security review | C18,C19,C20 | quiz + local |
| `p1-w11-l08` | Liveness, readiness, outage simulation and recovery | C21 | quiz + local |
| `p1-w11-l09` | Build React and serve a safe single-origin preview | C22 | quiz + local |
| `p1-w11-l10` | Migrations, release gates, optional hosting and rollback | C23,C24,C25,C26 | quiz + local |
| `p1-w11-l11` | AI-assisted reliability review and Week 12 readiness | C27,C28,C29,C30,C31,C32,C33,C34,C35,C36,C37,C38,C39,C40 | quiz + local |

## 5. Complete per-lesson authoring contracts

### L01 — Testing layers and the Arrange–Act–Assert mindset

**ID:** `p1-w11-l01` · **Estimated learning block:** 20–30 · **Prerequisites:** Week 10 mandatory readiness gate · **Source:** C01, C02, C03, C04, C05

**Observable outcomes:**
1. Distinguish unit, HTTP integration, database integration, browser and deployment smoke tests
2. Write one meaningful Arrange–Act–Assert test with a real observable assertion
3. Explain what a passing test does not prove

**Teach-from explanation requirements:** Introduce the test pyramid as evidence layers, not a ladder where one green test grants universal correctness. Trace an authenticated task request through the frontend, route, session, repository and database. Compare a pure configuration test with a browser smoke test. Use a single `node:test` and `assert/strict` example with an injected fake error; run the actual Node test locally.

**Worked example intent:** Given a deliberately wrong expectation (`503` expected but helper returns `500`), ask the learner to predict the assertion failure and identify its most informative output.

**Learner-owned exercise:** Write one Node test for a pure function, deliberately change the expected value, restore it, and record which assertion failed.

**Misconception and feedback target:** Believing a green mocked unit test proves the real login/database/browser flow.

**Progressive hints:**
- Hint 1: Identify the layer that executed.
- Hint 2: Ask which external boundaries were replaced by fakes.
- Hint 3: List one missing test at the next integration layer.

**Required checkpoints:**
- `p1-w11-l01-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l01-c02` · `local-project-self-verified`: From the Week 11 student starter run `npm run test:unit` in `backend/`, identify the intentionally failing tests, fix one issue, rerun, record test name/results and a one-sentence explanation; no secrets.

**Quiz item intents:**
- `p1-w11-l01-q01` — Identify what a unit test can prove about a pure helper
- `p1-w11-l01-q02` — Choose a layer that verifies middleware and route behavior
- `p1-w11-l01-q03` — Explain what a live database test proves that a fake repository test cannot
- `p1-w11-l01-q04` — Interpret Arrange–Act–Assert in a short snippet
- `p1-w11-l01-q05` — **ESSENTIAL CANDIDATE:** Passing one layer does not certify the entire stack
- `p1-w11-l01-q06` — Choose a test for a browser refresh after sign-in

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L02 — Node tests, HTTP contracts, and test double limits

**ID:** `p1-w11-l02` · **Estimated learning block:** 25–35 · **Prerequisites:** p1-w11-l01 · **Source:** C06, C07, C08

**Observable outcomes:**
1. Run and interpret Node test-runner diagnostics
2. Explain why API integration checks use HTTP status, headers and response bodies
3. Distinguish fake-session harnesses from genuine PostgreSQL-backed sessions

**Teach-from explanation requirements:** Review Node test discovery (`node --test`), test naming, red–green–refactor and why startup validation is tested without opening a port. Use ephemeral localhost HTTP tests around Express to distinguish liveness and readiness, correct 401/404 behavior and no-store headers. Contrast fake session repositories with the live auth flow.

**Worked example intent:** Read a test asserting `/api/live` is 200 while a fake failing readiness dependency causes `/api/health` to return 503, both with a safe `X-Request-ID`.

**Learner-owned exercise:** Write an API integration assertion for a non-existent `/api/` path, ensuring it returns JSON rather than an HTML SPA shell.

**Misconception and feedback target:** Mistaking a successful mocked session route for production-grade session security.

**Progressive hints:**
- Hint 1: Inspect the HTTP response before the implementation.
- Hint 2: Check status, content type and error code separately.
- Hint 3: Ask which dependency the test replaced.

**Required checkpoints:**
- `p1-w11-l02-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l02-c02` · `local-project-self-verified`: Locally install project dependencies where available, run backend unit and HTTP tests, implement missing starter behavior, document a 401 and an unknown `/api/*` JSON response. Record actual commands/status, not invented results.

**Quiz item intents:**
- `p1-w11-l02-q01` — Which test command needs Express packages installed
- `p1-w11-l02-q02` — What distinguishes an HTTP integration test from a pure unit test
- `p1-w11-l02-q03` — Why use an ephemeral local port for an API test
- `p1-w11-l02-q04` — **ESSENTIAL CANDIDATE:** Mocked session harness is not secure real session proof
- `p1-w11-l02-q05` — Why must unknown `/api/*` return JSON instead of HTML
- `p1-w11-l02-q06` — Which header helps correlate requests with server-side logs

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L03 — Database test safety and Alice/Bob browser verification

**ID:** `p1-w11-l03` · **Estimated learning block:** 30–45 · **Prerequisites:** p1-w11-l02 · **Source:** C09, C10

**Observable outcomes:**
1. Explain why destructive database tests require a disposable `_test` database
2. Use fictional Alice/Bob accounts to check read/edit/delete isolation
3. Identify what mock SQL tests fail to establish

**Teach-from explanation requirements:** Introduce explicit test DB allowlists, separate `DATABASE_URL` and `TEST_DATABASE_URL`, migrations, `TRUNCATE` consequences, local browser smoke testing and session separation. Preserve Week 10 per-owner query expectations under adverse conditions.

**Worked example intent:** Walk through Alice creating a task; Bob attempting GET/PATCH/DELETE by known ID gets 404 and Alice’s row remains unchanged; explain 401 for anonymous.

**Learner-owned exercise:** Write a safe test plan that first records the intended database name and refuses to run if the `_test` suffix is absent.

**Misconception and feedback target:** Running a destructive test against a real or shared database, or trusting frontend hiding as ownership protection.

**Progressive hints:**
- Hint 1: Verify environment and database name before any command.
- Hint 2: Consider what an operation would remove and whether data is recoverable.
- Hint 3: Separate a browser’s cookies from the server’s owner-filtered SQL.

**Required checkpoints:**
- `p1-w11-l03-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l03-c02` · `local-project-self-verified`: Create or select only an expressly disposable local `_test` database, verify its name before any destructive tests, run `npm run test:db` if safe, manually demonstrate separate fictional Alice/Bob sessions and unchanged data after foreign GET/PATCH/DELETE attempts. If unsure about target DB, STOP and use mock tests instead.
- `p1-w11-l03-c03` · `optional-enrichment` (non-gating): Design an alternative browser-smoke trace using a second fictional account, with sanitized evidence only.

**Quiz item intents:**
- `p1-w11-l03-q01` — What can `TRUNCATE ... CASCADE` remove
- `p1-w11-l03-q02` — **ESSENTIAL CANDIDATE:** Never run destructive tests without confirming isolated disposable target
- `p1-w11-l03-q03` — Difference between mock query capture and live SQL
- `p1-w11-l03-q04` — Why use separate browser profiles
- `p1-w11-l03-q05` — What response should Bob get for Alice’s task ID
- `p1-w11-l03-q06` — What should remain true about Alice’s database row afterward

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L04 — Reproduce failures using Network DevTools and safe request IDs

**ID:** `p1-w11-l04` · **Estimated learning block:** 25–35 · **Prerequisites:** p1-w11-l03 · **Source:** C11, C12, C13

**Observable outcomes:**
1. Follow a repeatable six-step debugging loop
2. Locate a failing request across browser, Express and database layers
3. Link sanitized client evidence to backend logs using `X-Request-ID` without exposing credentials

**Teach-from explanation requirements:** Reproduce → locate → gather safe evidence → hypothesize → test one change → explain/commit. Teach Network request/response headers, timing, status and how structured logs use route patterns rather than arbitrary URLs. Disallow logging cookies, headers with secrets, passwords and full SQL connection strings.

**Worked example intent:** For `GET /api/tasks -> 503`, show `/api/live` 200, `/api/health` 503 and a matching request ID; infer a database dependency failure instead of a JSX bug.

**Learner-owned exercise:** Given synthetic request fields including `Cookie: session=secret` and `?token=private`, create a sanitized log event preserving request ID, route template, method, status and duration only.

**Misconception and feedback target:** Copying sensitive headers/query strings to an AI assistant or treating a 503 as an empty task list.

**Progressive hints:**
- Hint 1: Only include fields necessary to reproduce and correlate.
- Hint 2: Use route templates, not whole raw URLs.
- Hint 3: Check what the logger emits when synthetic sensitive values are present.

**Required checkpoints:**
- `p1-w11-l04-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l04-c02` · `browser-code-auto`: Given synthetic `{method, route, requestId, status, elapsedMs, rawUrl, cookie, body}`, return `{event,requestId,method,route,status,elapsedMs}` only; reject/omit raw query, cookies, token, body, headers; check numeric safe status/duration and stable template route. All mandatory cases must pass in an isolated runner.
- `p1-w11-l04-c03` · `local-project-self-verified`: Fix the starter request-ID propagation; run relevant local tests and reproduce one non-sensitive failing API request. Record method/route/status/request ID and a matching sanitized log entry, without recording cookies or credentials.

**Quiz item intents:**
- `p1-w11-l04-q01` — First step in debugging loop
- `p1-w11-l04-q02` — Differentiate route pattern from raw URL
- `p1-w11-l04-q03` — Purpose of X-Request-ID
- `p1-w11-l04-q04` — **ESSENTIAL CANDIDATE:** Never log cookies, credentials or private query strings
- `p1-w11-l04-q05` — Which DevTools panel gives response status
- `p1-w11-l04-q06` — What 200 liveness + 503 readiness suggests

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L05 — Safe API failures and resilient React recovery

**ID:** `p1-w11-l05` · **Estimated learning block:** 25–40 · **Prerequisites:** p1-w11-l04 · **Source:** C14, C15

**Observable outcomes:**
1. Map known failures to safe public status/code/message triples
2. Explain recoverable 503 versus unexpected 500 behavior
3. Preserve confirmed React task state after a failed mutation and offer an appropriate Retry

**Teach-from explanation requirements:** Distinguish parse failure 400, oversized body 413, no session 401, untrusted origin 403, absent/foreign task 404, too many attempts 429, unexpected server 500 and DB dependency 503. Teach public API safety, stable error codes, matching frontend messages, no retry storm and 204 handling.

**Worked example intent:** Simulate `ECONNREFUSED` with a message containing `password=secret`. Public classifier must return safe 503 `DB_UNAVAILABLE` without exposing the source error.

**Learner-owned exercise:** Predict UI behavior when POST fails; confirm the previous list remains unchanged and a failure message explains manual Retry.

**Misconception and feedback target:** Returning raw stack traces or making failed mutations appear saved.

**Progressive hints:**
- Hint 1: Classify the known failure type first.
- Hint 2: Use a constant safe public message.
- Hint 3: Ensure unknown errors fall back to a generic 500 response.

**Required checkpoints:**
- `p1-w11-l05-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l05-c02` · `browser-code-auto`: Implement a pure `classifyPublicError(error)` using synthetic objects: malformed JSON→400, oversized request→413, DB connection failures→503, unknown Error→500; ensure constant safe message and that no `password=`/stack string escapes. Verify every mandatory behavior case.
- `p1-w11-l05-c03` · `local-project-self-verified`: Fix starter public error classification and React friendly-error paths; run backend/frontend tests locally. Reproduce a failed mutation, ensure UI does not display unconfirmed task, then Retry after recovery. Inspect API output for secrets.

**Quiz item intents:**
- `p1-w11-l05-q01` — 400 vs 413
- `p1-w11-l05-q02` — What status for a temporarily unavailable database
- `p1-w11-l05-q03` — **ESSENTIAL CANDIDATE:** Never expose a raw SQL/credential-bearing error to clients
- `p1-w11-l05-q04` — When should a failed POST change React task data
- `p1-w11-l05-q05` — Why avoid automatic retry storms
- `p1-w11-l05-q06` — What is required for a successful 204 response

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L06 — Secrets, configuration and fail-fast startup checks

**ID:** `p1-w11-l06` · **Estimated learning block:** 25–35 · **Prerequisites:** p1-w11-l05 · **Source:** C16, C17

**Observable outcomes:**
1. Distinguish browser-exposed `VITE_` variables from server-only secrets
2. Explain validating required environment configuration before listening
3. Locate safe deployment settings without printing secret values

**Teach-from explanation requirements:** Teach environment variable scope, `.env.example`, ignored `.env`, configuration guards for `WEB_ORIGIN`, `SESSION_SECRET`, database URL, port, mode, and trusted proxy count. Production should require HTTPS; local dev may use loopback HTTP. Never place private values in Vite’s client bundle.

**Worked example intent:** Given a synthetic configuration with `NODE_ENV=production` and an HTTP `WEB_ORIGIN`, predict a safe startup validation rejection and explain why.

**Learner-owned exercise:** Build a written checklist to distinguish safe variable names from forbidden secret values when asking AI for help.

**Misconception and feedback target:** Believing environment variables are secret simply because they are named ENV, or pasting secrets into prompts or Git.

**Progressive hints:**
- Hint 1: Ask where the value ends up in a production build.
- Hint 2: Check the prefix for Vite-exposed variables.
- Hint 3: Validate inputs before `app.listen()`.

**Required checkpoints:**
- `p1-w11-l06-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l06-c02` · `local-project-self-verified`: Run local config validation unit tests including production HTTP-origin rejection, invalid `PORT` and proxy-hop values. Audit `git status` for ignored `.env`. Use placeholders/variable names only in self-verification notes.

**Quiz item intents:**
- `p1-w11-l06-q01` — What VITE_ prefix means for frontend code
- `p1-w11-l06-q02` — **ESSENTIAL CANDIDATE:** DATABASE_URL and SESSION_SECRET must not be in client bundle
- `p1-w11-l06-q03` — Why production WEB_ORIGIN uses HTTPS
- `p1-w11-l06-q04` — Why validate config before server listen
- `p1-w11-l06-q05` — What to do after a real secret enters Git history
- `p1-w11-l06-q06` — How to decide a safe proxy hop count

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L07 — Headers, cookies, HTTPS and security review

**ID:** `p1-w11-l07` · **Estimated learning block:** 25–40 · **Prerequisites:** p1-w11-l06 · **Source:** C18, C19, C20

**Observable outcomes:**
1. Explain what HTTP security headers and Helmet provide and do not provide
2. Describe `HttpOnly`, `Secure`, and `SameSite` cookie roles
3. Identify reverse-proxy assumptions, secret hygiene and ownership checks in a release review

**Teach-from explanation requirements:** Review secure-cookie flags, HTTPS termination, `trust proxy` boundaries and a short threat checklist. Explain that headers are defense-in-depth; a one-origin preview reduces CORS complexity but does not magically secure an educational auth implementation.

**Worked example intent:** Compare local HTTP loopback cookie behavior with an HTTPS public preview using an explicitly configured reverse proxy; explain which flags differ and why.

**Learner-owned exercise:** Evaluate a sample redacted response header list and point out missing protections or a falsely trusted proxy setting.

**Misconception and feedback target:** Treating Helmet or a green test suite as certification of production security.

**Progressive hints:**
- Hint 1: Separate browser cookie behavior from backend authorization.
- Hint 2: Ask which machine terminates HTTPS.
- Hint 3: Treat proxy trust as a host-specific topology decision.

**Required checkpoints:**
- `p1-w11-l07-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l07-c02` · `local-project-self-verified`: Inspect headers and cookie flags in a safe local preview; verify origin checks and owner-scoped operations continue to reject unauthorized requests. Produce a redacted review checklist; if secure HTTPS cannot be exercised locally, label that limitation and defer to optional host smoke test.
- `p1-w11-l07-c03` · `optional-enrichment` (non-gating): Review an optional threat model for a fictional HTTPS preview, keeping all real configuration values private.

**Quiz item intents:**
- `p1-w11-l07-q01` — What HttpOnly limits
- `p1-w11-l07-q02` — What Secure cookie needs in a public browser
- `p1-w11-l07-q03` — Role of SameSite and why it is not a universal CSRF proof
- `p1-w11-l07-q04` — **ESSENTIAL CANDIDATE:** Helmet does not replace authorization
- `p1-w11-l07-q05` — Why arbitrary trust proxy is dangerous
- `p1-w11-l07-q06` — What kind of code/credentials must not appear in public preview

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L08 — Liveness, readiness, outage simulation and recovery

**ID:** `p1-w11-l08` · **Estimated learning block:** 20–35 · **Prerequisites:** p1-w11-l07 · **Source:** C21

**Observable outcomes:**
1. Distinguish process liveness from dependency readiness
2. Interpret 200/503 outcomes during simulated DB outage
3. Explain safe failure injection using fakes rather than damaging local data

**Teach-from explanation requirements:** `GET /api/live` checks process responsiveness. `GET /api/health` checks PostgreSQL readiness. During a controlled fake DB failure, the process may be alive while health is unavailable. Readiness is not full application security or correctness.

**Worked example intent:** Make a table of live=200/health=503 and decide what is likely healthy and which operation should wait.

**Learner-owned exercise:** Write a brief fault-injection experiment using a fake repository to simulate a database ping error.

**Misconception and feedback target:** Making `/api/live` depend on DB or causing a real destructive outage to demonstrate one.

**Progressive hints:**
- Hint 1: Identify which endpoint must make a database call.
- Hint 2: Simulate failure through injection or a disposable test instance.
- Hint 3: Check the 503 response stays safe and includes a request ID.

**Required checkpoints:**
- `p1-w11-l08-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l08-c02` · `local-project-self-verified`: With a fake ping or safe controlled test, demonstrate `/api/live` remains 200 while `/api/health` becomes 503. Rerun after recovery and record results. Do not destroy data or use shared DBs for outage drills.

**Quiz item intents:**
- `p1-w11-l08-q01` — What does liveness test
- `p1-w11-l08-q02` — What does readiness test
- `p1-w11-l08-q03` — **ESSENTIAL CANDIDATE:** A running process does not prove DB availability
- `p1-w11-l08-q04` — Why inject a fake dependency failure
- `p1-w11-l08-q05` — What status indicates not ready
- `p1-w11-l08-q06` — What recovery evidence should be recorded

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L09 — Build React and serve a safe single-origin preview

**ID:** `p1-w11-l09` · **Estimated learning block:** 30–45 · **Prerequisites:** p1-w11-l08 · **Source:** C22

**Observable outcomes:**
1. Explain Vite dev proxy versus a built same-origin preview
2. Distinguish SPA `/tasks` HTML fallback from `/api/*` JSON responses
3. Verify nested route refresh without breaking API error handling

**Teach-from explanation requirements:** Keep React + Express separate during development. For production-style local preview, build React and have Express serve static assets while `/api/` remains reserved for JSON endpoints. Check route fallback and caching behavior; server must not return `index.html` for unknown `/api/*`.

**Worked example intent:** Compare `GET /tasks` -> HTML shell with `GET /api/tasks` -> protected JSON, plus unknown `/api/missing` -> JSON 404.

**Learner-owned exercise:** Map three URLs to server responsibility, then predict status/content type before trying local preview.

**Misconception and feedback target:** Placing a catch-all `index.html` route before API routes so missing APIs wrongly appear successful.

**Progressive hints:**
- Hint 1: Remember SPA route and API route have different expected content types.
- Hint 2: Test directly refreshing nested routes.
- Hint 3: Keep unknown /api requests outside the static fallback.

**Required checkpoints:**
- `p1-w11-l09-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l09-c02` · `local-project-self-verified`: Run frontend `npm run build`, start the source-specified Express single-origin preview locally, test refresh on `/tasks` and `/ideas`, and check unknown `/api/*` returns safe JSON 404. Record actual commands, statuses and build results.

**Quiz item intents:**
- `p1-w11-l09-q01` — Purpose of Vite dev proxy
- `p1-w11-l09-q02` — What production build emits
- `p1-w11-l09-q03` — Difference between /tasks and /api/tasks
- `p1-w11-l09-q04` — **ESSENTIAL CANDIDATE:** Unknown `/api/*` must not return SPA HTML fallback
- `p1-w11-l09-q05` — How refresh on nested route should behave
- `p1-w11-l09-q06` — What changes about cookies under one origin

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L10 — Migrations, release gates, optional hosting and rollback

**ID:** `p1-w11-l10` · **Estimated learning block:** 30–45 · **Prerequisites:** p1-w11-l09 · **Source:** C23, C24, C25, C26

**Observable outcomes:**
1. Write a release checklist covering migrations, tests, secrets and deploy smoke
2. Explain why a backup is not the same as a verified restore
3. Describe one small safe rollback plan and the limits of free hosting

**Teach-from explanation requirements:** Introduce migration review, safe test data, backup/restore planning, git diff review, dry-run deployment smoke and rollback rehearsal. Public preview is OPTIONAL and should use fictional accounts; free tier availability changes. The course core gate is a reproducible local preview and release report.

**Worked example intent:** Given a deploy report where live endpoint responds but database health fails, decide No-Go and explain the minimal recovery path.

**Learner-owned exercise:** Draft Go/No-Go acceptance criteria and a rollback plan referencing a previous known-good Git commit rather than deleting the database.

**Misconception and feedback target:** Believing a green local build proves public HTTPS or DB migration safety; committing `.env` or using real users for preview.

**Progressive hints:**
- Hint 1: Review both application and infrastructure dependencies.
- Hint 2: Look for tests that were not executed.
- Hint 3: Define how to return to a known-good code revision without erasing persistent data.

**Required checkpoints:**
- `p1-w11-l10-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l10-c02` · `local-project-self-verified`: Review `git diff --check`, `git status`, tests and build; prepare a release report with actual evidence, redacted environment checklist, smoke steps, backup/migration decision and rollback rehearsal. Optional public hosting must use fictional accounts and be labeled educational.
- `p1-w11-l10-c03` · `optional-enrichment` (non-gating): Evaluate a free preview host’s current constraints; do not deploy or create accounts if unnecessary.

**Quiz item intents:**
- `p1-w11-l10-q01` — Why backup needs restore planning
- `p1-w11-l10-q02` — **ESSENTIAL CANDIDATE:** Deployment not required to complete core Week 11
- `p1-w11-l10-q03` — Why compare migration/schema before release
- `p1-w11-l10-q04` — What to inspect in git diff and staged files
- `p1-w11-l10-q05` — What should rollback preserve
- `p1-w11-l10-q06` — Why free hosting limits must be checked before recommending it

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

### L11 — AI-assisted reliability review and Week 12 readiness

**ID:** `p1-w11-l11` · **Estimated learning block:** 45–75 project gate · **Prerequisites:** p1-w11-l10 · **Source:** C27, C28, C29, C30, C31, C32, C33, C34, C35, C36, C37, C38, C39, C40

**Observable outcomes:**
1. Review a bounded AI-generated test/change without blindly accepting it
2. Present a reproducible release-candidate report with actual evidence
3. Explain technical limitations, remaining risks and readiness for the Week 12 capstone

**Teach-from explanation requirements:** Convert source mentor sessions and answer keys into a student-owned final reliability challenge, independent practice plan, 10 debugging labs and a safe AI diff-review exercise. Do not expose source C36 instructor answer key or C40 completed reference. Require honest documentation of tests that did not run.

**Worked example intent:** Compare two AI suggestions: one logs entire request headers for debugging, one logs request ID/method/route/status only; explain the security and observability tradeoff.

**Learner-owned exercise:** Independently diagnose one seeded failure, record hypothesis/evidence/fix, and ask AI only for a bounded review of the final diff if desired.

**Misconception and feedback target:** Claiming “production ready” because an AI agent says so or copying private logs into external prompts.

**Progressive hints:**
- Hint 1: Start with the exact failing behavior and original requirement.
- Hint 2: Record which test environments were exercised, not just passing totals.
- Hint 3: Separate demonstrated outcome, learner attestation and unverified assumptions.

**Required checkpoints:**
- `p1-w11-l11-c01` · `quiz-auto`: 6 reviewed scored question slots; pass ≥5/6 and every essential item.
- `p1-w11-l11-c02` · `local-project-self-verified`: Complete the Week 11 release-candidate gate: provide unit, HTTP, live DB (only if safe), browser and built-preview evidence as available; reproduce/resolve a reliability defect; Alice/Bob isolation smoke; write rollback and remaining-risk notes; commit reviewed diffs. Core completion is possible without public deployment.

**Quiz item intents:**
- `p1-w11-l11-q01` — What an AI-generated test can miss
- `p1-w11-l11-q02` — Why inspect diff and generated commands before running
- `p1-w11-l11-q03` — **ESSENTIAL CANDIDATE:** Never equate a passing subset with production certification
- `p1-w11-l11-q04` — What evidence belongs in a release report
- `p1-w11-l11-q05` — How to explain a skipped live-DB test honestly
- `p1-w11-l11-q06` — Which Week 12 independent project capability is most important

**Review threshold:** Authoring team must define correct answer, rationale, plausible distractors, mistaken-answer feedback and equivalent retry before this lesson can become learner-visible.

## 6. Practical project and readiness gate

**Study Tasks v11 reliability and release-candidate challenge:** Keep Week 10 behavior intact while implementing the safe-error classifier, request ID propagation, config validation, health/readiness endpoints, and static React build preview. Students must demonstrate a small failure, a recovery, and a safe rollback plan. A published website is *not* required.

**Required acceptance evidence (all learner-reported, not independently verified by Fieldbook):**

1. Relevant unit and HTTP checks run locally, with pass/fail and any environment block reported honestly.
2. Dedicated `_test` DB used for destructive tests, or explicit explanation that DB tests were skipped safely. Do not mark skipped required DB verification as passed; provide guided fallback/remediation before graduation.
3. Alice/Bob accounts demonstrate login, unauthorized foreign read/update/delete denial and unchanged owned task.
4. Reproduced 503 error provides safe public code/message and `X-Request-ID` correlated to a sanitized log event.
5. `/api/live` remains healthy while a *fake* dependency causes `/api/health` to signal not-ready, without damaging stored data.
6. Built React preview works on `/`, `/tasks` and `/ideas` refreshes; unknown `/api/*` returns JSON 404 and no SPA shell.
7. No private credentials or cookies in screenshots, exported logs, version-control diff, student notes or AI prompts.
8. Release report includes commands actually run, results, known failures, test scope, rollback actions and Week 12 readiness assessment.

**Qualification:** A check skipped due to unavailable PostgreSQL or npm dependencies must be shown as **not verified**, not quietly ticked. Course author must provide a safe local repair plan; the learner should complete mandatory local evidence before the Week 12 gate. Optional public hosting cannot block progress.

## 7. Learner pacing and high-value teaching examples

- **Mentor route:** two 90-minute sessions plus 4–6 hours independent practice (from source C28–C32).
- **Self-paced route:** each lesson provides a stepwise explanation, expected output, tests/commands, recoverable errors, progressive hints, one meaningful mini-practice and explicit check; larger local labs may need more than 25 minutes.
- **Recall anchor:** revisit Week 4 HTTP response distinctions, Week 8 API contracts, Week 9 DB isolation and Week 10 server authorization when relevant.
- **AI use:** optional tutor prompt first, bounded agent task second, review `git diff` and rerun targeted tests. Never delegate away safety judgment.

## 8. Common debugging scenarios to author (not yet implemented)

| Failure | Diagnostic lesson | Expected correction |
|---|---|---|
| API 503 treated as empty tasks | L04–L05 | Distinguish error from empty success; investigate DB readiness |
| Public error includes connection string | L05 | Classify and return safe static message; log sanitized metadata only |
| Missing `X-Request-ID` | L04 | Add header, matching sanitized structured log, test correlation |
| `.env` committed | L06 | Ignore properly; if real secret exposed rotate and address history |
| Production cookie fails behind host proxy | L07 | Verify HTTPS termination, secure cookies and host-specific trust-proxy config |
| `/api/missing` serves HTML | L09 | Separate `/api/*` JSON routing from SPA fallback |
| Health incorrectly reports green during DB outage | L08 | Distinguish liveness and dependency readiness |
| DB test aims at non-test database | L03/L10 | Stop; verify isolated disposable `_test` target before test run |
| Failed POST appears saved in React | L05 | Preserve confirmed server state and expose failure/Retry |
| Agent adds raw request headers to logs | L04/L11 | Reject diff, preserve minimal safe telemetry |

## 9. Source and privacy rules

- All C01–C40 headings and 152 original code ZIP paths are enumerated in `WEEK11_SOURCE_TRACEABILITY.md`.
- C29/C31 mentor dialogue and C36 answer key are instructor source; **rewrite** for students without giving away complete assessment answers. C40 full reference-code appendix and `reference-solution/**` remain private.
- Selected short, safe code fragments can be rewritten as teaching examples, technically reviewed and attributed where appropriate; no bulk copying private solutions into browser assets.
- Do not claim MDN/current hosting guidance verified in this blueprint; verify official docs again at content implementation if needed.

## 10. Owner review checklist

- [ ] Approve the Week 11 **11-lesson** grouping, keeping source C01–C40 accounted for.
- [ ] Approve 27 proposed checkpoint IDs/methods (24 required, 3 optional).
- [ ] Confirm public deployment remains optional; local built preview + release report mandatory.
- [ ] Confirm live DB tests use disposable `_test` DB and do not expose secrets.
- [ ] Confirm no browser-based grader claims to execute npm, Express, PostgreSQL, HTTPS deployment or session security.
- [ ] Confirm 66 draft question intents are not counted as finished/learner-tested questions.
- [ ] Confirm teacher answer key and entire reference solution stay private.
- [x] Record owner structural acceptance **A-012**; retain separate future student-content, testing and pilot approvals.

**Current status:** Week 11 structure is **OWNER APPROVED A-012**. This is not finished content, D0/D1 signoff or authorization to code D2.
