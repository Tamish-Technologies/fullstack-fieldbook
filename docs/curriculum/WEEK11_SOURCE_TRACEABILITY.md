# Week 11 Source Traceability — C01–C40 and 152 Original Code Archive Entries

> **Updated structural status (2026-11-17):** Week 11 owner-approved **A-012** for lesson/checkpoint structure only. Earlier “draft / pending owner review” statements below are historical. Content authoring, question banks, actual tests, future pilot, global D0/D1 signoff and D2 authorization remain pending.

**Source artifacts:** Private `fullstack-fieldbook-source-materials/phase1/week-11/instructor-guide-source.md` (40 numbered chapters), original PDF, and `code-starter-and-reference.zip` (**152 entries**, including starter/reference/support docs).

> **Planning contract, not finished course content.** No learner question bank, isolated sandbox tests, Node/Express/PostgreSQL integration, browser smoke run or learner pilot has been executed by FullStack Fieldbook for this blueprint. D0/D1 remain unsigned; D2 application code is NOT authorized. Structural acceptance of Week 10 is recorded separately as A-011; Week 11 needs owner review.


## 1. Chapter-by-chapter disposition

| Original chapter | Exact source heading | Proposed student destination / privacy disposition |
|---|---|---|
| C01 | Instructor mission: from "it works" to "we can trust our checks" | L01/L11 — rework mission and quality promise |
| C02 | Entry check, outcomes and scope | L01/L11 — entry requirements and outcomes |
| C03 | Architecture and the reliability boundary | L01/L08/L09 — reliable request architecture |
| C04 | Teaching sequence and instructor preparation | L11 — pacing/mentor prep; student-facing summary only |
| C05 | Testing fundamentals: what does each layer prove? | L01 — five test layers and AAA |
| C06 | The Node.js test runner: commands, patterns, reading output | L01/L02 — node test commands and output |
| C07 | Unit testing configuration: fail before listening | L02/L06 — pure config tests and fail-fast |
| C08 | API integration and contract tests | L02 — HTTP integration tests and fake session caution |
| C09 | Live database tests and non-destructive thinking | L03 — DB test isolation |
| C10 | Browser acceptance tests: the two-account story | L03/L11 — Alice/Bob two-account smoke |
| C11 | A repeatable debugging procedure | L04 — debugging loop |
| C12 | Browser DevTools: request, headers, timing, response | L04 — DevTools and network trace |
| C13 | Correlation IDs and safe structured logs | L04 — correlation IDs and safe logs |
| C14 | Safe error responses: do not export the server's internals | L05 — safe error classifier |
| C15 | Reliable React error states and recovery | L05 — React recovery |
| C16 | Environment variables, secrets and the frontend bundle | L06 — env secrets and VITE exposure |
| C17 | Startup validation and deployment environment differences | L06 — startup validation and deployment config |
| C18 | HTTP security headers and dependency hygiene | L07 — headers and dependency hygiene |
| C19 | HTTPS, cookies, reverse proxies and origin checks | L07 — HTTPS, cookies and proxy trust |
| C20 | Security review checklist for a learning deployment | L07 — security review checklist |
| C21 | Liveness versus readiness and safe failure injection | L08 — liveness/readiness, safe injection |
| C22 | Build React, then serve a single public origin | L09 — built React one-origin static preview |
| C23 | SQL migrations, test data and backups | L10 — migrations and backups |
| C24 | Free preview hosting: optional Render example, with limits | L10 — optional free hosting, no core gate |
| C25 | Git, test gates and a safe release workflow | L10/L11 — Git/release gates |
| C26 | Deployment smoke test and rollback rehearsal | L10 — smoke and rollback |
| C27 | AI-assisted engineering: delegate checks, own the judgment | L11 — AI agent change-review, guardrails |
| C28 | Mentoring session A: complete 90-minute run of show | L11 — instructor session A schedule, adapt to self-paced |
| C29 | Session A: teach-from script and worked dialogue | L11 — instructor session A teach-from script, rewrite without instructor prompts |
| C30 | Mentoring session B: complete 90-minute run of show | L11 — instructor session B schedule, adapt to self-paced |
| C31 | Session B: teach-from script and worked dialogue | L11 — instructor session B teach-from script, rewrite without instructor prompts |
| C32 | Independent practice: four to six hours, with checkpoints | L11 — independent practice and self-report |
| C33 | Ten debugging labs: symptoms and acceptance criteria | L04/L05/L11 — ten debugging-lab intents, not answer text |
| C34 | Hands-on exercises and exact acceptance criteria | L11 — hands-on exercises and criteria |
| C35 | Oral knowledge check: 18 questions for mentoring | L11 — oral knowledge intent bank, rewrite as self-check |
| C36 | Instructor answer key: tests, labs and misconceptions | INSTRUCTOR ONLY — answer key; do not ship |
| C37 | Week 11 assessment rubric: 100 points | L11 — grading criteria, rewrite into transparent student criteria |
| C38 | Release report template and Week 12 handoff | L10/L11 — report template and Week 12 handoff |
| C39 | Instructor quick reference: commands and milestones | L02/L03/L09/L11 — commands and milestones, review versions later |
| C40 | Reference source code appendix: key reliability files | PRIVATE REFERENCE — full source appendix; do not ship as browser assets |

**Non-public material:** C36 is an instructor answer key; C40 is the complete reference code appendix. Session scripts C28–C31 also contain mentor-only cues; rewrite as student hints/exercises, not as pre-revealed answers.

## 2. Source-code archive clusters

| Private archive path/group | Why needed | Student-facing policy |
|---|---|
| `student-starter/backend/src/config.js` | Pure startup config validation | Guided TODO and safe, non-sensitive test cases |
| `student-starter/backend/src/public-errors.js` | Public error classifier | Pure synthetic browser exercises plus local Node verification |
| `student-starter/backend/src/request-log.js` | Request IDs and safe structured logs | Isolated synthetic log exercise; actual Express behavior local self-verified |
| `student-starter/backend/src/spa-policy.js`, `static-web.js` | Distinguish static HTML fallback vs `/api/*` JSON | Concept questions + local browser/API verification |
| `student-starter/backend/src/app.js`, `server.js` | Middleware, route order, readiness and start behavior | Actual backend npm runs are **self-verified** |
| `student-starter/backend/tests/*.test.mjs` | Unit/API/DB/security assertions | Only documented safe test commands; never claim browser-verified Node test |
| `student-starter/frontend/src/lib/friendly-error.js` | Safe React error messages | Browser-safe pure tests where appropriate; full UI local |
| `student-starter/frontend/src/hooks/useServerTasks.js` | Retry and confirmed server state | Local React build/UI self-verification |
| `student-starter/frontend/src/pages/*` | SPA deep-link behavior | Built preview smoke tests, not automatically evaluated in Fieldbook |
| `reference-solution/**` | Instructor correctness baseline | **PRIVATE, NEVER BUNDLE** |
| `INSTRUCTOR_NOTES.md`, `START_HERE.md`, `PACKAGE_OVERVIEW.md` | Exercises, setup, instruction | Rewrite into standalone learner instructions, exclude instructor answers |

**Note:** ZIP’s top-level uses `student-starter/` and `reference-solution/`. Earlier Phase 1 archives may use `starter/`; do not silently rewrite Week 11 paths.

## 3. Security/privacy and evidence boundaries

- Treat all original source code as private instructional inputs until DEC-18 publication review. C40 and `reference-solution/**` cannot be shipped in the student client bundle.
- An educational auth implementation is not a certified/production-grade identity service. Optional public preview uses fictional accounts, with separate security review.
- Never include `.env` secrets, cookie values, database passwords, connection URLs, raw request query strings or private logs in the academy progress record.
- Destructive test suites may wipe rows: require dedicated disposable `_test` DB verified before `npm run test:db`; stop if in doubt.
- Current static academy will not execute local Node, Express, PostgreSQL, Vite build, or HTTPS deployment. Isolated browser labs are limited to pure JS synthetic telemetry/error classifiers.

## 4. Remaining audit/authoring work

- [ ] Compare source Markdown to original PDF if discrepancies arise during detailed lesson writing.
- [ ] Write 66 full question items, essential flags, explanations and equivalent retries.
- [ ] Design and security-review isolated coding runner tests for L04 and L05.
- [ ] Turn source C28–C39 mentor-facing activities into independent student feedback/acceptance without leaking C36 answers.
- [ ] Execute a real local learner pilot with redacted evidence, not only inspect docs.
- [ ] Confirm version-dependent hosting/config guidance against official documentation at publication time.

**Status:** 40/40 chapters and 152/152 ZIP path entries accounted for as source references. **Week 11 structural approval pending; no course runtime tests or learner pilot performed.**

## 5. Full private code archive path enumeration

This path inventory is for traceability only; it is **not** authorization to publish source files.

```text
START_HERE.md
INSTRUCTOR_NOTES.md
PACKAGE_OVERVIEW.md
student-starter/INSTRUCTOR_NOTES.md
student-starter/START_HERE.md
student-starter/.gitignore
student-starter/STUDENT_EXERCISES.md
student-starter/frontend/README.md
student-starter/frontend/package.json
student-starter/frontend/vite.config.js
student-starter/frontend/index.html
student-starter/frontend/.gitignore
student-starter/backend/README.md
student-starter/backend/.env.example
student-starter/backend/package.json
student-starter/backend/API_REQUESTS.http
student-starter/backend/.gitignore
student-starter/backend/tests/public-errors.test.mjs
student-starter/backend/tests/preview-api.test.mjs
student-starter/backend/tests/validation.test.mjs
student-starter/backend/tests/csrf.test.mjs
student-starter/backend/tests/request-log.test.mjs
student-starter/backend/tests/auth-api.test.mjs
student-starter/backend/tests/db.test.mjs
student-starter/backend/tests/ownership.test.mjs
student-starter/backend/tests/spa-policy.test.mjs
student-starter/backend/tests/repository.test.mjs
student-starter/backend/tests/api.test.mjs
student-starter/backend/tests/config.test.mjs
student-starter/backend/tests/auth-validation.test.mjs
student-starter/backend/migrations/002_create_users_sessions_and_user_tasks.sql
student-starter/backend/migrations/001_create_tasks.sql
student-starter/backend/src/config.js
student-starter/backend/src/auth-validation.js
student-starter/backend/src/passwords.js
student-starter/backend/src/db.js
student-starter/backend/src/app.js
student-starter/backend/src/validation.js
student-starter/backend/src/auth-repository.js
student-starter/backend/src/session.js
student-starter/backend/src/task-repository.js
student-starter/backend/src/request-log.js
student-starter/backend/src/static-web.js
student-starter/backend/src/csrf.js
student-starter/backend/src/public-errors.js
student-starter/backend/src/spa-policy.js
student-starter/backend/src/server.js
student-starter/backend/sql/sql-lab.sql
student-starter/backend/scripts/migrate.js
student-starter/backend/tests/helpers/memory-repository.js
student-starter/backend/tests/helpers/fake-auth-state.mjs
student-starter/frontend/tests/task-logic.test.mjs
student-starter/frontend/tests/task-api.test.mjs
student-starter/frontend/tests/friendly-error.test.mjs
student-starter/frontend/tests/auth-api.test.mjs
student-starter/frontend/tests/ideas-api.test.mjs
student-starter/frontend/src/App.jsx
student-starter/frontend/src/main.jsx
student-starter/frontend/src/styles.css
student-starter/frontend/src/hooks/useAuth.js
student-starter/frontend/src/hooks/useServerTasks.js
student-starter/frontend/src/components/TaskList.jsx
student-starter/frontend/src/components/TaskToolbar.jsx
student-starter/frontend/src/components/TaskForm.jsx
student-starter/frontend/src/components/TaskItem.jsx
student-starter/frontend/src/pages/DashboardPage.jsx
student-starter/frontend/src/pages/TasksPage.jsx
student-starter/frontend/src/pages/AuthPage.jsx
student-starter/frontend/src/pages/NotFoundPage.jsx
student-starter/frontend/src/pages/ServerPage.jsx
student-starter/frontend/src/pages/IdeasPage.jsx
student-starter/frontend/src/lib/auth-api.js
student-starter/frontend/src/lib/storage.js
student-starter/frontend/src/lib/friendly-error.js
student-starter/frontend/src/lib/ideas-api.js
student-starter/frontend/src/lib/sample-ideas.js
student-starter/frontend/src/lib/task-logic.js
student-starter/frontend/src/lib/task-api.js
reference-solution/INSTRUCTOR_NOTES.md
reference-solution/START_HERE.md
reference-solution/.gitignore
reference-solution/frontend/README.md
reference-solution/frontend/package.json
reference-solution/frontend/vite.config.js
reference-solution/frontend/index.html
reference-solution/frontend/.gitignore
reference-solution/backend/README.md
reference-solution/backend/.env.example
reference-solution/backend/package.json
reference-solution/backend/API_REQUESTS.http
reference-solution/backend/.gitignore
reference-solution/backend/tests/public-errors.test.mjs
reference-solution/backend/tests/preview-api.test.mjs
reference-solution/backend/tests/validation.test.mjs
reference-solution/backend/tests/csrf.test.mjs
reference-solution/backend/tests/request-log.test.mjs
reference-solution/backend/tests/auth-api.test.mjs
reference-solution/backend/tests/db.test.mjs
reference-solution/backend/tests/ownership.test.mjs
reference-solution/backend/tests/spa-policy.test.mjs
reference-solution/backend/tests/repository.test.mjs
reference-solution/backend/tests/api.test.mjs
reference-solution/backend/tests/config.test.mjs
reference-solution/backend/tests/auth-validation.test.mjs
reference-solution/backend/migrations/002_create_users_sessions_and_user_tasks.sql
reference-solution/backend/migrations/001_create_tasks.sql
reference-solution/backend/src/config.js
reference-solution/backend/src/auth-validation.js
reference-solution/backend/src/passwords.js
reference-solution/backend/src/db.js
reference-solution/backend/src/app.js
reference-solution/backend/src/validation.js
reference-solution/backend/src/auth-repository.js
reference-solution/backend/src/session.js
reference-solution/backend/src/task-repository.js
reference-solution/backend/src/request-log.js
reference-solution/backend/src/static-web.js
reference-solution/backend/src/csrf.js
reference-solution/backend/src/public-errors.js
reference-solution/backend/src/spa-policy.js
reference-solution/backend/src/server.js
reference-solution/backend/sql/sql-lab.sql
reference-solution/backend/scripts/migrate.js
reference-solution/backend/tests/helpers/memory-repository.js
reference-solution/backend/tests/helpers/fake-auth-state.mjs
reference-solution/frontend/tests/task-logic.test.mjs
reference-solution/frontend/tests/task-api.test.mjs
reference-solution/frontend/tests/friendly-error.test.mjs
reference-solution/frontend/tests/auth-api.test.mjs
reference-solution/frontend/tests/ideas-api.test.mjs
reference-solution/frontend/src/App.jsx
reference-solution/frontend/src/main.jsx
reference-solution/frontend/src/styles.css
reference-solution/frontend/src/hooks/useAuth.js
reference-solution/frontend/src/hooks/useServerTasks.js
reference-solution/frontend/src/components/TaskList.jsx
reference-solution/frontend/src/components/TaskToolbar.jsx
reference-solution/frontend/src/components/TaskForm.jsx
reference-solution/frontend/src/components/TaskItem.jsx
reference-solution/frontend/src/pages/DashboardPage.jsx
reference-solution/frontend/src/pages/TasksPage.jsx
reference-solution/frontend/src/pages/AuthPage.jsx
reference-solution/frontend/src/pages/NotFoundPage.jsx
reference-solution/frontend/src/pages/ServerPage.jsx
reference-solution/frontend/src/pages/IdeasPage.jsx
reference-solution/frontend/src/lib/auth-api.js
reference-solution/frontend/src/lib/storage.js
reference-solution/frontend/src/lib/friendly-error.js
reference-solution/frontend/src/lib/ideas-api.js
reference-solution/frontend/src/lib/sample-ideas.js
reference-solution/frontend/src/lib/task-logic.js
reference-solution/frontend/src/lib/task-api.js
```
