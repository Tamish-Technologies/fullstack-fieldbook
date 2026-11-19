> **Approval A-010 (2026-11-17):** The owner accepted Week 9’s **structural educational blueprint** by replacing its ZIP and requesting Week 10. The 12 lessons and 27 checkpoints remain an authoring baseline, **not** finished learner content, executed PostgreSQL tests or a successful pilot. Full D0/D1 signoff and D2 application coding remain pending.

# Week 9 Source Traceability — Exact C01–C34 Instructor Chapter Audit

**Source inspected:** `/phase1/week-09/instructor-guide-source.md` from the private source-materials bundle and its `code-starter-and-reference.zip`. Source is for private review; completed reference and answer key **must not be published**.  
**Source checksum:** SHA-256 (`instructor-guide-source.md`) `aeecd98d8f01d09143587ef0a0b01ed53c5e8770efb626bd1f18ef83fd41d4ff`; (`code-starter-and-reference.zip`) `ee9f68bc0dafa201e8943663a694afdfddaff4102a2c224619b1e55bf7eb8ebe`.  
**Source counts:** **34** original instructor chapters; **94** files in starter/reference code package.  
**Owner status:** Week 9 D0 source-inspected **draft awaiting structural review**. Not a real student or live PostgreSQL test.

## 1. Chapter-by-chapter disposition

| Original | Heading | Student handling / rationale |
|---|---|---|
| C01 | Instructor mission: make Study Tasks durable | **L01,L12** — Motivation, project scope and outcome |
| C02 | Your preparation and diagnostic check | **L02,L12** — Instructor preparation/diagnostic, not a standalone public lesson |
| C03 | Definition of done: what to demonstrate | **L12** — Required persistence project demonstration |
| C04 | Architecture: the extra layer that solves data loss | **L01** — React→Express→SQL repository→PostgreSQL architecture |
| C05 | Database fundamentals you can teach from | **L01,L03** — Database terminology, rows/columns/PK/schema |
| C06 | Install and connect to PostgreSQL for free | **L02** — Free local PostgreSQL install, distinct dev/test roles/DBs |
| C07 | Design the `tasks` table deliberately | **L03,L07** — tasks schema, types, constraints and migration discussion |
| C08 | SQL lesson 1: SELECT, WHERE and ORDER BY | **L04** — SELECT/WHERE/ORDER BY queries |
| C09 | SQL lesson 2: INSERT, defaults and RETURNING | **L05** — INSERT, defaults and RETURNING |
| C10 | SQL lesson 3: UPDATE, DELETE and the importance of WHERE | **L06** — Safe UPDATE/DELETE and WHERE/transactions |
| C11 | Schema migrations: how the table appears | **L07** — Initial migration, not full versioned migration evolution |
| C12 | Configuration and connection pooling with node-postgres | **L08** — Pool, configuration and startup checks |
| C13 | The repository pattern: isolate SQL from HTTP | **L09** — SQL repository separation |
| C14 | Repository lesson: read tasks with SELECT | **L09** — List/get query behavior |
| C15 | Repository lesson: create with INSERT and RETURNING | **L09,L05** — Create and RETURNING |
| C16 | Repository lesson: PATCH and DELETE without losing meaning | **L09,L06** — PATCH and DELETE repository semantics |
| C17 | Parameterized queries and SQL injection | **L10,L03** — Parameterized SQL and validation boundaries |
| C18 | Keep the Week 8 frontend contract unchanged | **L09,L12** — Keep Week 8 frontend/API contract |
| C19 | Error handling: unavailable DB vs invalid user input | **L08,L10** — Unavailable DB vs malformed user input |
| C20 | Three levels of testing and what each proves | **L11,L09** — Unit/API/live DB testing layers |
| C21 | Controlled debugging labs: use evidence, not guesses | **L11,L10** — Controlled debugging labs |
| C22 | AI-assisted workflow: tutor, teammate and reviewer | **L10,L12** — Optional AI tutor/review, no required agent |
| C23 | Hands-on implementation: small steps and commits | **L12** — Stepwise implementation and commits |
| C24 | Session 1: SQL and schema (90-minute instructor script) | **L02–L07** — Mentor session 1 adapted into autonomous steps |
| C25 | Session 2: PostgreSQL-backed Express CRUD (90-minute instructor script) | **L08–L12** — Mentor session 2 adapted into autonomous steps |
| C26 | Independent practice plan: 4-6 hours | **L02–L12** — Independent work plan and evidence |
| C27 | Student exercises: think before revealing the answers | **L04–L12** — Student exercises rewritten as learner-facing, no answer leakage |
| C28 | Instructor answers and demonstrations | **Private instructor only** — Answer key: excluded from publicly shipped lesson content |
| C29 | Knowledge check: 20 short questions with answers | **L01–L12** — Instructor concept questions inform future quiz intents only |
| C30 | Assessment rubric: 100 points and readiness for Week 10 | **L12** — 100-point instructor rubric informs self-assessment, not automatic certification |
| C31 | Final teaching demonstration and Week 10 handoff | **L12** — Ten-minute demonstration and Week 10 readiness |
| C32 | Free resources and evidence-based references | **Optional references** — External docs optional: full learning content must stand alone offline |
| C33 | Source-code appendix: key Week 9 implementation | **Private instructor only** — Full source appendix: do not embed completed reference code in public build |
| C34 | Instructor final notes and learner reflection | **L12** — Instructor final notes rewritten as learner reflection |

**No source chapter is discarded silently.** Instructor-only C28/C33 are restricted to private curriculum authoring; answers inform misconception feedback but full solutions do not enter public app bundles. C24/C25 teaching scripts are decomposed into standalone procedural labs. Chapter C29 questions are **question intents**, not a completed graded bank.

## 2. Code package inventory and roles

The 94-file code package has the following folders (archive paths, not public application files). The private instructor solution is **never** copied wholesale into `public/`, a lesson JSON blob, a service-worker cache, or any build artifact.

| Original file/path | Purpose | Proposed D0 student handling |
|---|---|---|
| `starter/backend/migrations/001_create_tasks.sql` | One initial idempotent teaching table migration | L03,L07; learner reads, executes and explains |
| `starter/backend/scripts/migrate.js` | Runs initial migration using DB config | L07, local setup; not a full versioned migrations framework |
| `starter/backend/src/db.js` | `pg.Pool` and guarded connection configuration | L08; explain server-only credentials |
| `starter/backend/src/task-repository.js` | SQL task operations with learner TODOs | L09–L10; actual local project implementation |
| `starter/backend/src/app.js` | Maintains Express route contract | L09–L12; avoid teaching frontend rewrite |
| `starter/backend/src/server.js` | Pings DB before listening | L08,L12, startup debugging |
| `starter/backend/src/validation.js` | Data validation / ID bounds | L03,L10, compare with SQL constraints |
| `starter/backend/tests/repository.test.mjs` | SQL call expectations with fake pool | L09–L11; conceptual pattern for isolated browser fake-pool, not real DB |
| `starter/backend/tests/db.test.mjs` | Live DB destructive test restricted to separate `_test` DB | L11, only after explicit target inspection |
| `starter/backend/tests/api.test.mjs` | API testing with injected repository | L11, explain tests do not prove PostgreSQL connection |
| `starter/backend/sql/sql-lab.sql` | Safe rollback transaction SQL practice | L04–L06, local teaching only |
| `starter/backend/.env.example` | Example local credentials; no real secrets | L02,L08, must never expose actual `.env` |
| `starter/frontend/src/lib/task-api.js` | Existing Week 8 API client | L09,L12, preserve contract |
| `reference-solution/**` | Instructor-only complete working code, examples and tests | Private reviewer reference; **not** included in shipped course app |
| `INSTRUCTOR_NOTES.md` | Mentor guidance and test limitations | Private authoring input, not a public answer key |

### Full archive path enumeration

The code ZIP contains 94 entries; see below for exact file audit scope. Counts are **archive entries**, not test pass counts.

```text
START_HERE.md
INSTRUCTOR_NOTES.md
reference-solution/.gitignore
reference-solution/START_HERE.md
reference-solution/backend/.env.example
reference-solution/backend/.gitignore
reference-solution/backend/API_REQUESTS.http
reference-solution/backend/README.md
reference-solution/backend/migrations/001_create_tasks.sql
reference-solution/backend/package.json
reference-solution/backend/scripts/migrate.js
reference-solution/backend/sql/sql-lab.sql
reference-solution/backend/src/app.js
reference-solution/backend/src/db.js
reference-solution/backend/src/server.js
reference-solution/backend/src/task-repository.js
reference-solution/backend/src/validation.js
reference-solution/backend/tests/api.test.mjs
reference-solution/backend/tests/db.test.mjs
reference-solution/backend/tests/helpers/memory-repository.js
reference-solution/backend/tests/repository.test.mjs
reference-solution/backend/tests/validation.test.mjs
reference-solution/frontend/.gitignore
reference-solution/frontend/README.md
reference-solution/frontend/index.html
reference-solution/frontend/package.json
reference-solution/frontend/src/App.jsx
reference-solution/frontend/src/components/TaskForm.jsx
reference-solution/frontend/src/components/TaskItem.jsx
reference-solution/frontend/src/components/TaskList.jsx
reference-solution/frontend/src/components/TaskToolbar.jsx
reference-solution/frontend/src/hooks/useServerTasks.js
reference-solution/frontend/src/lib/ideas-api.js
reference-solution/frontend/src/lib/sample-ideas.js
reference-solution/frontend/src/lib/storage.js
reference-solution/frontend/src/lib/task-api.js
reference-solution/frontend/src/lib/task-logic.js
reference-solution/frontend/src/main.jsx
reference-solution/frontend/src/pages/DashboardPage.jsx
reference-solution/frontend/src/pages/IdeasPage.jsx
reference-solution/frontend/src/pages/NotFoundPage.jsx
reference-solution/frontend/src/pages/ServerPage.jsx
reference-solution/frontend/src/pages/TasksPage.jsx
reference-solution/frontend/src/styles.css
reference-solution/frontend/tests/ideas-api.test.mjs
reference-solution/frontend/tests/task-api.test.mjs
reference-solution/frontend/tests/task-logic.test.mjs
reference-solution/frontend/vite.config.js
starter/.gitignore
starter/START_HERE.md
starter/backend/.env.example
starter/backend/.gitignore
starter/backend/API_REQUESTS.http
starter/backend/README.md
starter/backend/migrations/001_create_tasks.sql
starter/backend/package.json
starter/backend/scripts/migrate.js
starter/backend/sql/sql-lab.sql
starter/backend/src/app.js
starter/backend/src/db.js
starter/backend/src/server.js
starter/backend/src/task-repository.js
starter/backend/src/validation.js
starter/backend/tests/api.test.mjs
starter/backend/tests/db.test.mjs
starter/backend/tests/helpers/memory-repository.js
starter/backend/tests/repository.test.mjs
starter/backend/tests/validation.test.mjs
starter/frontend/.gitignore
starter/frontend/README.md
starter/frontend/index.html
starter/frontend/package.json
starter/frontend/src/App.jsx
starter/frontend/src/components/TaskForm.jsx
starter/frontend/src/components/TaskItem.jsx
starter/frontend/src/components/TaskList.jsx
starter/frontend/src/components/TaskToolbar.jsx
starter/frontend/src/hooks/useServerTasks.js
starter/frontend/src/lib/ideas-api.js
starter/frontend/src/lib/sample-ideas.js
starter/frontend/src/lib/storage.js
starter/frontend/src/lib/task-api.js
starter/frontend/src/lib/task-logic.js
starter/frontend/src/main.jsx
starter/frontend/src/pages/DashboardPage.jsx
starter/frontend/src/pages/IdeasPage.jsx
starter/frontend/src/pages/NotFoundPage.jsx
starter/frontend/src/pages/ServerPage.jsx
starter/frontend/src/pages/TasksPage.jsx
starter/frontend/src/styles.css
starter/frontend/tests/ideas-api.test.mjs
starter/frontend/tests/task-api.test.mjs
starter/frontend/tests/task-logic.test.mjs
starter/frontend/vite.config.js
```

## 3. Continuity and technical risks that content must preserve

- Week 8 backend memory resets on restart; Week 9 PostgreSQL-backed rows should survive *Express-only* restart. Do not quietly switch back to frontend localStorage or introduce an ORM.
- The React API client remains nearly unchanged; route response envelope and 80-character title validation remain stable. `created_at` DB column maps to `createdAt` ISO text in API JSON.
- Schema: `id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY`; `title VARCHAR(80) NOT NULL`, a nonblank CHECK; Boolean default false; timestamp default NOW. Teach what the actual source enforces, including `btrim` caveat.
- `UPDATE`/`DELETE` use `WHERE id = ...`; `completed:false` must be preserved (no `||` fallback); missing row maps to 404; DELETE returns a row count, HTTP 204 has no body.
- A fake-pool test is useful for verifying SQL text/placeholder **call structure** but does not run SQL. Only real local PostgreSQL tests can demonstrate database behavior, migrations and persistence.
- Separate `_test` DB and named connection guard are critical because actual `db.test.mjs` uses `TRUNCATE`. No credential content should be copied into the static academy website or AI prompts.
- Original reference requires Node >=22 for `--env-file` commands; check actual installation requirements in future content review. Dependency versions are source-specific, not guarantees about all future versions.
- Week 9 still has no users/owner_id/session; multi-user isolation belongs in Week 10. A static academy may contain safe learning exercises about auth later but does not gain its own backend.

## 4. Completeness and future verification

All **C01–C34** chapter IDs and **94** archive files are included in this audit. The source is inspected, but the **12-lesson/27-checkpoint mapping remains pending owner approval**. Instructor code is private, actual scored questions/browser sandbox suites are unwritten, and the D7 learner pilot/live database verification is not executed. DEC-18 publication-rights decision remains open for later public release.
