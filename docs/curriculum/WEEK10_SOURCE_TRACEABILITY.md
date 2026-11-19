# Week 10 Source Traceability — C01–C38 and 125 Code-ZIP Entries (D0 Draft)

> **Week 10 current status (2026-11-17): OWNER STRUCTURALLY APPROVED A-011.** Earlier “draft/pending” passages are historical. Only grouping, proposed mastery methods and source mapping are approved—not learner-facing content, executable grading, security test results or a learner pilot. D0/D1 unsigned; D2 NOT AUTHORIZED.

**Source artifacts:** Private `fullstack-fieldbook-source-materials/phase1/week-10/instructor-guide-source.md` (38 numbered chapters), with companion original PDF, and `code-starter-and-reference.zip` (**125 non-directory entries**). All original source files remain private and unchanged.

**Curriculum continuity:** Week 9 persists task data in PostgreSQL but has shared tasks; Week 10 introduces server-side sessions and owner-scoped `user_tasks`. Original Week 9 rows have unknown ownership and remain untouched. The single browser-only FullStack Fieldbook academy never operates this local backend.

## 1. Chapter-by-chapter disposition

| Original chapter | Source heading | Proposed destination / action |
|---|---|---|
| C01 | Instructor mission: private tasks, not just a login screen | L01,L12 |
| C02 | Learning outcomes and realistic weekly scope | L01,L12 |
| C03 | Week 9 to Week 10: what changes and what stays the same | L01,L04,L12 |
| C04 | Weekly teaching sequence at a glance | L12 / instructor pacing |
| C05 | Foundations: identity, authentication, authorization | L01 |
| C06 | The HTTP login story: cookies and server sessions | L02,L06 |
| C07 | Password storage: hash, never plaintext | L03 |
| C08 | Reference design choices: established libraries, small trust boundary | L02,L03 |
| C09 | Database design: users, user_tasks and sessions | L04 |
| C10 | Migrations and free local setup | L04 |
| C11 | Authentication API contract before implementation | L05,L06 |
| C12 | Validating credentials: frontend checks are not enough | L05 |
| C13 | The registration request: input to database to session | L05 |
| C14 | The login request: generic failures and session regeneration | L06 |
| C15 | Server-side sessions, /me and logout | L02,L06 |
| C16 | CSRF: why cookies require origin protection | L07 |
| C17 | The requireAuth gate: who may reach task routes? | L08 |
| C18 | Authorization is the SQL WHERE clause | L04,L08 |
| C19 | Safe task updates: validation and race conditions | L08 |
| C20 | Frontend auth API: browser cookies, not localStorage tokens | L09 |
| C21 | React: authentication states and forms | L09 |
| C22 | Restoring sessions and clearing stale tasks on logout | L09 |
| C23 | Attack surface review: understand what is missing | L03,L07,L11 |
| C24 | Testing strategy: prove the negative cases | L08,L10,L12 |
| C25 | Debugging lab: identify the broken boundary | L10,L11 |
| C26 | Working with AI: tutor, reviewer, agent - with safeguards | L11 |
| C27 | Session 1: minute-by-minute 90-minute lesson plan | L12 / instructor-only session script |
| C28 | Session 2: minute-by-minute 90-minute lesson plan | L12 / instructor-only session script |
| C29 | Independent practice: realistic 4–6-hour schedule | L12 / homework/independent work |
| C30 | Student lab sheet: exercises in recommended order | L10,L12 / exercises |
| C31 | Manual acceptance worksheet: run this before grading | L10,L12 / acceptance evidence |
| C32 | Knowledge check: 20 questions without AI | L11,L12 / question intents, not copy-pasted |
| C33 | Instructor answer key and teaching cues | Instructor-only answer key (do not publish) |
| C34 | 100-point Week 10 instructor grading rubric | Instructor-only grading rubric / public criteria rewritten |
| C35 | Adapt the week to the learner's current level | L11,L12 / adaptation guidance |
| C36 | Setup troubleshooting and instructor preflight | L04,L10,L12 / setup troubleshooting |
| C37 | Sources, references and safe next steps | L12 / optional official references |
| C38 | Reference-code appendix: complete security-critical files | Private reference code appendix; concept extracts only L03–L09 |

**Privacy disposition:** C33 is an instructor answer key; C38 contains complete security-sensitive reference implementation. Both remain in the private source archive and must not be included directly in the public client build or as a hidden static asset. Selected concepts/short worked examples may be rewritten and reviewed for student lessons.

## 2. Code archive: verified source clusters

| Source path inside private ZIP | What it informs | Public academy policy |
|---|---|---|
| `starter/backend/migrations/002_create_users_sessions_and_user_tasks.sql` | Users, ownership, session schema; safe migration lab | Only sanitized migration explanation and student starter download where rights permit; keep private instructor solutions separate |
| `starter/backend/src/auth-validation.js`, `auth-repository.js`, `passwords.js` | Registration validation, storage, Argon2 | Explain concept and local TODOs; no real credentials |
| `starter/backend/src/session.js`, `csrf.js`, `app.js` | Session lifecycle, trusted Origin, auth endpoints | Browser runner may not access Node session code; local self-verification only |
| `starter/backend/src/task-repository.js` | Owner-filtered SELECT/UPDATE/DELETE/INSERT | Fail-closed starter; real repository tested locally, fake-pool subset may be browser-graded |
| `starter/backend/tests/ownership.test.mjs`, `auth-validation.test.mjs`, `csrf.test.mjs`, `auth-api.test.mjs` | Local test goals | Accurate local command and expected behavior; do not claim actual student test pass |
| `starter/frontend/src/hooks/useAuth.js`, `src/lib/auth-api.js`, `src/pages/AuthPage.jsx` | React session restoration and forms | Actual React/Vite requires local tests/build; academy cannot grade JSX from a plain-JS runner |
| `reference-solution/backend/**`, `reference-solution/frontend/**` | Instructor review and correctness baseline | **Remain private; do not ship full completed solutions** |
| `START_HERE.md`, `INSTRUCTOR_NOTES.md`, `starter/backend/EXERCISES.md` | Setup, lesson objectives, acceptance and grading | Rewrite into student-facing self-paced guidance and redacted evidence checklist |

**Archive count:** **125 non-directory entries**, as listed from the actual ZIP (including project manifests, local starter, private solution and support instructions). Do not equate archive entry count with unique concept count or a completed software audit.

## 3. Special safety and educational checks

- Explicitly classify whether a concept can be auto-checked in isolated browser JS or requires learner-run local tests. Password hashing, PostgreSQL session store, Express routes, CSRF middleware and real two-user isolation are **not** auto-run by the academy.
- The source uses `Node >=22`, development Origin `http://127.0.0.1:5173`, PostgreSQL, and selected `express-session`, `connect-pg-simple`, `argon2` dependencies. Version-dependent commands need revalidation at future authoring/implementation time.
- The starter's incomplete `auth-repository.js` / `task-repository.js` deliberately **fail closed**. Do not replace it with an unsafe permissive fallback for “demo convenience.”
- A PostgreSQL table named `tasks` from Week 9 may remain after Week 10 migration. No implicit account takeover or assignment of those rows.
- Browser password/session examples are **synthetic**. UI screenshots, exports, AI prompts and logs must not capture real secrets or raw cookie values.
- A passing mock SQL test does not prove auth protection; local Alice/Bob negative tests and unchanged database rows are required.
- Avoid suggesting public deployment of this educational authentication implementation as production-safe. Week 11 covers deployment preparation, not a security audit certification.

## 4. Open review work

- [ ] Confirm the original PDF and Markdown contents agree for each security-critical chapter before final student authoring.
- [ ] Resolve content density for 12 lessons; avoid turning instructor scripts and appendix material into dozens of shallow lessons.
- [ ] Approve proposed 27 checkpoint allocation and essential-item intents after owner Week 10 review.
- [ ] Verify future learner instructions for Node, PostgreSQL, local origin, CSRF, sessions, and test DB through actual learner trial.
- [ ] Review local starter downloads and licensing before public publication (DEC-18), keeping reference solutions private.

**Status:** Source traced, **Week 10 structural plan OWNER APPROVED A-011**; finished content and actual tests pending. No learner pilot, runtime auth test or security audit was performed as part of this document. D0 and D1 not signed off; D2 not authorized.


## 5. Full original code archive path enumeration (private inventory only)

The following **125** paths are provided to give content authors and review agents exact traceability. This is **only a list of filenames**; it is not a public distribution list, test result or authorization to include private solution files in the learner app. Paths under `reference-solution/` are instructor-only.

```text
START_HERE.md
INSTRUCTOR_NOTES.md
starter/START_HERE.md
starter/.gitignore
starter/frontend/README.md
starter/frontend/package.json
starter/frontend/vite.config.js
starter/frontend/index.html
starter/frontend/.gitignore
starter/backend/README.md
starter/backend/.env.example
starter/backend/EXERCISES.md
starter/backend/package.json
starter/backend/API_REQUESTS.http
starter/backend/.gitignore
starter/backend/tests/validation.test.mjs
starter/backend/tests/csrf.test.mjs
starter/backend/tests/auth-api.test.mjs
starter/backend/tests/db.test.mjs
starter/backend/tests/ownership.test.mjs
starter/backend/tests/repository.test.mjs
starter/backend/tests/api.test.mjs
starter/backend/tests/auth-validation.test.mjs
starter/backend/migrations/002_create_users_sessions_and_user_tasks.sql
starter/backend/migrations/001_create_tasks.sql
starter/backend/src/auth-validation.js
starter/backend/src/passwords.js
starter/backend/src/db.js
starter/backend/src/app.js
starter/backend/src/validation.js
starter/backend/src/auth-repository.js
starter/backend/src/session.js
starter/backend/src/task-repository.js
starter/backend/src/csrf.js
starter/backend/src/server.js
starter/backend/sql/sql-lab.sql
starter/backend/scripts/migrate.js
starter/backend/tests/helpers/memory-repository.js
starter/backend/tests/helpers/fake-auth-state.mjs
starter/frontend/tests/task-logic.test.mjs
starter/frontend/tests/task-api.test.mjs
starter/frontend/tests/auth-api.test.mjs
starter/frontend/tests/ideas-api.test.mjs
starter/frontend/src/App.jsx
starter/frontend/src/main.jsx
starter/frontend/src/styles.css
starter/frontend/src/hooks/useAuth.js
starter/frontend/src/hooks/useServerTasks.js
starter/frontend/src/components/TaskList.jsx
starter/frontend/src/components/TaskToolbar.jsx
starter/frontend/src/components/TaskForm.jsx
starter/frontend/src/components/TaskItem.jsx
starter/frontend/src/pages/DashboardPage.jsx
starter/frontend/src/pages/TasksPage.jsx
starter/frontend/src/pages/AuthPage.jsx
starter/frontend/src/pages/NotFoundPage.jsx
starter/frontend/src/pages/ServerPage.jsx
starter/frontend/src/pages/IdeasPage.jsx
starter/frontend/src/lib/auth-api.js
starter/frontend/src/lib/storage.js
starter/frontend/src/lib/ideas-api.js
starter/frontend/src/lib/sample-ideas.js
starter/frontend/src/lib/task-logic.js
starter/frontend/src/lib/task-api.js
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
reference-solution/backend/tests/validation.test.mjs
reference-solution/backend/tests/csrf.test.mjs
reference-solution/backend/tests/auth-api.test.mjs
reference-solution/backend/tests/db.test.mjs
reference-solution/backend/tests/ownership.test.mjs
reference-solution/backend/tests/repository.test.mjs
reference-solution/backend/tests/api.test.mjs
reference-solution/backend/tests/auth-validation.test.mjs
reference-solution/backend/migrations/002_create_users_sessions_and_user_tasks.sql
reference-solution/backend/migrations/001_create_tasks.sql
reference-solution/backend/src/auth-validation.js
reference-solution/backend/src/passwords.js
reference-solution/backend/src/db.js
reference-solution/backend/src/app.js
reference-solution/backend/src/validation.js
reference-solution/backend/src/auth-repository.js
reference-solution/backend/src/session.js
reference-solution/backend/src/task-repository.js
reference-solution/backend/src/csrf.js
reference-solution/backend/src/server.js
reference-solution/backend/sql/sql-lab.sql
reference-solution/backend/scripts/migrate.js
reference-solution/backend/tests/helpers/memory-repository.js
reference-solution/backend/tests/helpers/fake-auth-state.mjs
reference-solution/frontend/tests/task-logic.test.mjs
reference-solution/frontend/tests/task-api.test.mjs
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
reference-solution/frontend/src/lib/ideas-api.js
reference-solution/frontend/src/lib/sample-ideas.js
reference-solution/frontend/src/lib/task-logic.js
reference-solution/frontend/src/lib/task-api.js
```

**Checked source SHA-256 (for transfer validation, not a security audit):**

- `instructor-guide-source.md`: `1f62751186fdb5855f8027800e1d29555bc62afc9e6bd45b6751dfc0949f1b1f`
- `code-starter-and-reference.zip`: `a2d5222c4a0283372450f61c5910429668e6a2649290cee83715c69d0c79c517`

**Reconciliation rule:** If a later copy of the source differs from these checksums, re-audit the actual artifacts before translating any security-critical material into student lessons.
