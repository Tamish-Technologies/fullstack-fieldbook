# Week 11 Checkpoint Inventory — DEC-21 Contract (D0 Draft)

> **Updated structural status (2026-11-17):** Week 11 owner-approved **A-012** for lesson/checkpoint structure only. Earlier “draft / pending owner review” statements below are historical. Content authoring, question banks, actual tests, future pilot, global D0/D1 signoff and D2 authorization remain pending.

> **Planning contract, not finished course content.** No learner question bank, isolated sandbox tests, Node/Express/PostgreSQL integration, browser smoke run or learner pilot has been executed by FullStack Fieldbook for this blueprint. D0/D1 remain unsigned; D2 application code is NOT authorized. Structural acceptance of Week 10 is recorded separately as A-011; Week 11 needs owner review.


**Totals:** 27 checkpoints = 24 required (**11 `quiz-auto`, 2 `browser-code-auto`, 11 `local-project-self-verified`**) + 3 optional. Each required quiz has six **planned**, not yet authored, scored item slots: ≥5/6 + all essential items.

## 1. Complete checkpoint register

| Stable checkpoint ID | DEC-21 method | Gate | Future acceptance and evidence |
|---|---|---|---|
| `p1-w11-l01-c01` | `quiz-auto` | Required | Six reviewed questions on testing layers and the arrange–act–assert mindset; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l01-c02` | `local-project-self-verified` | Required | From the Week 11 student starter run `npm run test:unit` in `backend/`, identify the intentionally failing tests, fix one issue, rerun, record test name/results and a one-sentence explanation; no secrets. |
| `p1-w11-l02-c01` | `quiz-auto` | Required | Six reviewed questions on node tests, http contracts, and test double limits; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l02-c02` | `local-project-self-verified` | Required | Locally install project dependencies where available, run backend unit and HTTP tests, implement missing starter behavior, document a 401 and an unknown `/api/*` JSON response. Record actual commands/status, not invented results. |
| `p1-w11-l03-c01` | `quiz-auto` | Required | Six reviewed questions on database test safety and alice/bob browser verification; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l03-c02` | `local-project-self-verified` | Required | Create or select only an expressly disposable local `_test` database, verify its name before any destructive tests, run `npm run test:db` if safe, manually demonstrate separate fictional Alice/Bob sessions and unchanged data after foreign GET/PATCH/DELETE attempts. If unsure about target DB, STOP and use mock tests instead. |
| `p1-w11-l03-c03` | `optional-enrichment` | Optional | Additional fictional two-user browser trace. Never blocks. |
| `p1-w11-l04-c01` | `quiz-auto` | Required | Six reviewed questions on reproduce failures using network devtools and safe request ids; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l04-c02` | `browser-code-auto` | Required | Given synthetic `{method, route, requestId, status, elapsedMs, rawUrl, cookie, body}`, return `{event,requestId,method,route,status,elapsedMs}` only; reject/omit raw query, cookies, token, body, headers; check numeric safe status/duration and stable template route. All mandatory cases must pass in an isolated runner. |
| `p1-w11-l04-c03` | `local-project-self-verified` | Required | Fix the starter request-ID propagation; run relevant local tests and reproduce one non-sensitive failing API request. Record method/route/status/request ID and a matching sanitized log entry, without recording cookies or credentials. |
| `p1-w11-l05-c01` | `quiz-auto` | Required | Six reviewed questions on safe api failures and resilient react recovery; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l05-c02` | `browser-code-auto` | Required | Implement a pure `classifyPublicError(error)` using synthetic objects: malformed JSON→400, oversized request→413, DB connection failures→503, unknown Error→500; ensure constant safe message and that no `password=`/stack string escapes. Verify every mandatory behavior case. |
| `p1-w11-l05-c03` | `local-project-self-verified` | Required | Fix starter public error classification and React friendly-error paths; run backend/frontend tests locally. Reproduce a failed mutation, ensure UI does not display unconfirmed task, then Retry after recovery. Inspect API output for secrets. |
| `p1-w11-l06-c01` | `quiz-auto` | Required | Six reviewed questions on secrets, configuration and fail-fast startup checks; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l06-c02` | `local-project-self-verified` | Required | Run local config validation unit tests including production HTTP-origin rejection, invalid `PORT` and proxy-hop values. Audit `git status` for ignored `.env`. Use placeholders/variable names only in self-verification notes. |
| `p1-w11-l07-c01` | `quiz-auto` | Required | Six reviewed questions on headers, cookies, https and security review; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l07-c02` | `local-project-self-verified` | Required | Inspect headers and cookie flags in a safe local preview; verify origin checks and owner-scoped operations continue to reject unauthorized requests. Produce a redacted review checklist; if secure HTTPS cannot be exercised locally, label that limitation and defer to optional host smoke test. |
| `p1-w11-l07-c03` | `optional-enrichment` | Optional | Optional fictional preview security review. Never blocks. |
| `p1-w11-l08-c01` | `quiz-auto` | Required | Six reviewed questions on liveness, readiness, outage simulation and recovery; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l08-c02` | `local-project-self-verified` | Required | With a fake ping or safe controlled test, demonstrate `/api/live` remains 200 while `/api/health` becomes 503. Rerun after recovery and record results. Do not destroy data or use shared DBs for outage drills. |
| `p1-w11-l09-c01` | `quiz-auto` | Required | Six reviewed questions on build react and serve a safe single-origin preview; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l09-c02` | `local-project-self-verified` | Required | Run frontend `npm run build`, start the source-specified Express single-origin preview locally, test refresh on `/tasks` and `/ideas`, and check unknown `/api/*` returns safe JSON 404. Record actual commands, statuses and build results. |
| `p1-w11-l10-c01` | `quiz-auto` | Required | Six reviewed questions on migrations, release gates, optional hosting and rollback; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l10-c02` | `local-project-self-verified` | Required | Review `git diff --check`, `git status`, tests and build; prepare a release report with actual evidence, redacted environment checklist, smoke steps, backup/migration decision and rollback rehearsal. Optional public hosting must use fictional accounts and be labeled educational. |
| `p1-w11-l10-c03` | `optional-enrichment` | Optional | Optional free-hosting comparison/deployment plan. Never blocks. |
| `p1-w11-l11-c01` | `quiz-auto` | Required | Six reviewed questions on ai-assisted reliability review and week 12 readiness; ≥5/6 correct plus all designated essential questions; feedback and unlimited retries. |
| `p1-w11-l11-c02` | `local-project-self-verified` | Required | Complete the Week 11 release-candidate gate: provide unit, HTTP, live DB (only if safe), browser and built-preview evidence as available; reproduce/resolve a reliability defect; Alice/Bob isolation smoke; write rollback and remaining-risk notes; commit reviewed diffs. Core completion is possible without public deployment. |

## 2. Per-method acceptance rules

- **quiz-auto:** 11 sets × 6 scored reviewed questions = **66 planned item slots**. Pass `ceil(0.8 * 6)=5`, and every explicitly essential item. All six items need correct-answer rationale, distractor feedback, an equivalent retry plan and content review.
- **browser-code-auto:** only L04 sanitized telemetry and L05 safe error classification; deterministic synthetic data, no Node packages, no network, no real credentials; all mandatory test cases required. Never interpret browser-pass as HTTP/session/database verification.
- **local-project-self-verified:** actual learner test/build/inspect actions with bounded evidence. The academy cannot access npm tests, local PostgreSQL, cookies, browser profiles, deployment or Git. Never upgrade the label to “Passed automatically.”
- **optional-enrichment:** three optional activities (L03, L07, L10) have no effect on locks or completion percentage.

## 3. Critical essential-item candidates (to review during authoring)

- L01: A passing mocked unit test does not certify deployment correctness.
- L02: A fake-session HTTP harness does not prove real session security.
- L03: Never run destructive tests without confirming a dedicated disposable `_test` DB.
- L04: Never log/share cookies, credentials or sensitive URL parameters.
- L05: Never return SQL secrets or raw exception stacks publicly.
- L06: Never bundle `DATABASE_URL`/`SESSION_SECRET` in client assets.
- L07: Helmet and cookie flags do not replace server authorization.
- L08: Process liveness is not database readiness.
- L09: An unknown `/api/*` endpoint must not get SPA fallback HTML.
- L10: Public deployment is optional; a safe local preview and report fulfill core requirement.
- L11: AI/green unit tests do not certify production security.

## 4. Explicit cross-week prerequisite chain

- Start: Week 10 mandatory readiness and Alice/Bob ownership gate.
- L01→L02→L03→L04→L05→L06→L07→L08→L09→L10→L11 is the required default sequence.
- Weekly next-week unlock requires **all 24 required checkpoints** and Week 11 readiness within L11; content author must map all gates before release.
- If the learner cannot safely run PostgreSQL tests, do **not** mislabel as passed; provide a local setup repair exercise or equivalent real disposable DB environment.

## 5. Privacy, reliability and review ledger

- Never store cookie headers, real `.env` contents, database URLs, passwords, query strings or raw private logs in local course progress or exports.
- Source C36/C40 and the `reference-solution/**` tree are instructor-only; student test intentions should be rewritten as problems, not leaked solutions.
- Assignment of stable IDs and verification methods is proposed; actual question banks, code runners, tests and learner trials are pending.
- **Current status:** D0 Week 11 **structurally approved A-012**; checkpoint methods proposed/accepted as planning only, no test execution; D2 not authorized.
