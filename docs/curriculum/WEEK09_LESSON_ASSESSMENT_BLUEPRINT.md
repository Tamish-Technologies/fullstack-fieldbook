> **Approval A-010 (2026-11-17):** The owner accepted Week 9’s **structural educational blueprint** by replacing its ZIP and requesting Week 10. The 12 lessons and 27 checkpoints remain an authoring baseline, **not** finished learner content, executed PostgreSQL tests or a successful pilot. Full D0/D1 signoff and D2 application coding remain pending.

# Week 9 Lesson & Assessment Blueprint — D0 Source-Inspected Draft

**Product:** FullStack Fieldbook · Phase 1 student Week 9  
**Owner status:** **D0 STRUCTURE OWNER-APPROVED A-010 — student-facing authoring still pending**. Week 8 was owner-accepted as A-009 based on the owner's instruction to proceed.  
**Platform stage:** **D7**, student Weeks 7–9 content integration; **not authorized for implementation**.  
**Actual sources:** original Phase 1 Week 9 instructor-guide source Markdown **C01–C34** and accompanying **94-file** starter/reference ZIP.  
**Project:** Study Tasks v9 — replace Express's in-memory task repository with PostgreSQL without changing the Week 8 React REST API contract.

> **Teaching promise:** A learner can explain how PostgreSQL stores durable task records, write basic SQL independently, implement a parameterized repository, demonstrate actual persistence across an Express restart, and honestly distinguish local test evidence from automatic browser checks.

## 1. Scope and explicit boundaries

- **Keep:** React + Vite UI, GET/POST/PATCH/DELETE task API, 80-character trimmed titles, server-assigned integer IDs, ISO `createdAt` string, errors and empty DELETE `204` response, task filters.
- **Change:** task records now live in the single local PostgreSQL `tasks` table; Express uses `pg.Pool` and an SQL repository instead of an in-memory store. UI remains almost unchanged.
- **Require:** one setup/migration, CRUD SQL, parameter placeholders, database constraints, a development/test database split, meaningful error handling, test evidence and a backend-restart persistence proof.
- **Not yet:** user registration, sessions, authorization, owner-scoped queries, public DB hosting, production backups, advanced joins/index tuning, Prisma, multi-table schema. These belong later or are optional.
- **Safety:** SQL training is run on fictional tasks in a **local development DB**. Destructive tests target a distinct database with a `_test` suffix, after the learner verifies the exact URL/name. Never put credentials in React, the course browser, screenshots, Git or prompts.
- **Static academy boundary:** FullStack Fieldbook still has **no backend**. It cannot install PostgreSQL, inspect `psql`, execute the student's Express app, run real SQL, or see the student's filesystem. SQL reasoning is quiz-graded; real database work is **self-verified locally**. Two isolated plain JavaScript/fake-pool suites may be browser-graded; do not mislabel them database tests.

## 2. Prerequisites and local setup

The learner must have completed Week 8's **actual** integration project and readiness gate—not merely its D0 blueprint. They must be able to use two terminals, trace a POST through React and Express, read HTTP 200/201/204/400/404, and explain why Week 8 tasks disappear on Node restart.

**Local project:** `starter/` from the private Week 9 code package, with `backend` and `frontend` folders. PostgreSQL is a free local service; the project uses Node >=22 according to its own package metadata for `--env-file` commands. The lesson author must recheck compatibility if those commands change. No hosted database, paid tool, Docker, or agent is required.

**Preparation sequence:** create the dedicated local role and separate `study_tasks_week9` / `study_tasks_week9_test` databases; copy `.env.example` to an ignored `.env` with locally selected credentials; install local npm packages; run `npm run migrate`; start the backend and frontend separately. If setup is blocked, provide a deterministic table fixture for conceptual work, but **do not grant the local-project persistence checkpoint** without real evidence.

**Safe tests:** `npm test` runs backend non-live DB checks after package install; `npm run test:db` is intentionally destructive and must not be run until `TEST_DATABASE_URL` has been inspected, confirms `_test`, and the learner understands its cleanup. `npm test` in the frontend has its own scripts; specify the target working directory in lessons. Record observed output instead of promising a specific pass count.

## 3. Stable lesson sequence and DEC-21 assessment allocation

Preserve `p1-w09-l01` through `p1-w09-l12` from the global proposed map. These are twelve **required** lesson slots. Default prerequisites are linear L01 → ... → L12, with Week 8 readiness required for L01; the completion engine uses explicit IDs, not display order. Optional enrichment never blocks.

| Lesson | Student-facing title | Instructor source | Required methods |
|---|---|---|---|
| `p1-w09-l01` | What a relational database solves | C01,C03–C05,C18 | quiz-auto |
| `p1-w09-l02` | Install and connect PostgreSQL locally | C02,C06,C21,C26 | local-project-self-verified + quiz-auto |
| `p1-w09-l03` | Table schema, types and constraints | C05,C07,C11,C17 | local-project-self-verified + quiz-auto |
| `p1-w09-l04` | SELECT, WHERE, ORDER BY | C08,C27,C29 | local-project-self-verified + quiz-auto |
| `p1-w09-l05` | INSERT, RETURNING and defaults | C09,C15,C27 | local-project-self-verified + quiz-auto |
| `p1-w09-l06` | UPDATE and DELETE safely | C10,C16,C21,C27 | local-project-self-verified + quiz-auto |
| `p1-w09-l07` | Migrations and safe schema setup | C07,C11,C23 | local-project-self-verified + quiz-auto |
| `p1-w09-l08` | pg Pool and application configuration | C02,C12,C19 | local-project-self-verified + quiz-auto |
| `p1-w09-l09` | SQL repository and query boundaries | C13–C16,C18,C20,C33 | browser-code-auto + local-project-self-verified + quiz-auto |
| `p1-w09-l10` | Parameterized SQL and safe error handling | C17,C19,C21,C22 | browser-code-auto + quiz-auto |
| `p1-w09-l11` | Database test separation and persistence checks | C18,C20–C22,C26,C27 | local-project-self-verified + quiz-auto |
| `p1-w09-l12` | Week 9 persistent Study Tasks proof and Week 10 readiness | C01–C03,C18,C23–C34 | local-project-self-verified + quiz-auto |

**Approved DEC-21 policy applied to this proposed week:** 12 quiz groups of six scored items each (**72 question slots**, minimum 5 of 6 correct plus every designated essential item), 2 mandatory isolated plain-JavaScript browser suites, 10 actual local-project attestations, 3 optional enrichment tasks. **27 checkpoints total: 24 required / 3 optional.** This is a planning allocation, not an authored or executed question/test bank.

## 4. Detailed learner lesson cards

The cards below specify **future student-facing material**. Each authoring task must turn the relevant card into clear explanation, working examples with expected outputs, a different practice scenario, checked misconceptions, hints and explicit DEC-21 checkpoints. Do not paste instructor scripts/answers from the private guide into a public client bundle.


### L01 — What a relational database solves

- **ID / prerequisites:** `p1-w09-l01`; Week 8 required graduation gates. **Source:** C01,C03–C05,C18.
- **Observable learning outcomes:** Explain why an Express in-memory array loses tasks on Node restart and what PostgreSQL changes; Trace one task through React, Express routes, a SQL repository and the tasks table; Distinguish a database, table, row, column, schema, primary key and SQL query.
- **Why it matters and worked example specification:** Contrast the Week 8 memory-store API with the Week 9 PostgreSQL-backed API using one task titled “Practice SQL”. The React UI and HTTP endpoint remain the same; the repository now reads and writes durable rows.
- **Guided independent practice:** Draw the five boxes for browser, HTTP route, repository, pool and PostgreSQL. Describe who validates the title, who generates an ID and what happens on refresh versus Node restart.
- **Debugging/misconception to surface:** Mistaken claim: “localStorage on the frontend becomes the database.” Ask whether a task on a different browser can be retrieved, and distinguish UI snapshot, volatile Node memory and durable DB.
- **Hints (in order):** H1 — Track what is discarded when Node exits. H2 — Find the single module whose storage responsibility changes this week. H3 — Draw two traces: request-to-JSON and server-restart-to-reload.
- **Required checkpoints:** `p1-w09-l01-c01` (`quiz-auto`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** Week 8 memory vs Week 9 durable data; Database/table/row/column definitions; Why the browser cannot connect to PostgreSQL with privileged credentials; Repository role in request path; What persistence across Node restart proves; Identify what auth/ownership is still missing.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L02 — Install and connect PostgreSQL locally

- **ID / prerequisites:** `p1-w09-l02`; p1-w09-l01. **Source:** C02,C06,C21,C26.
- **Observable learning outcomes:** Start or locate a local PostgreSQL server and connect using a dedicated learning role; Create separate development and `_test` databases without exposing credentials; Explain why local setup and real SQL cannot be automatically verified by the static Fieldbook site.
- **Why it matters and worked example specification:** Introduce the PostgreSQL service, role and named databases. Create `study_tasks_week9` and `study_tasks_week9_test`, with distinct purposes. Use an interactive password prompt, not an exposed password in an example shell command.
- **Guided independent practice:** Use psql/pgAdmin to select the current database name; show that the test database is different. Inspect the local `.env.example` and explain why the real `.env` must remain untracked.
- **Debugging/misconception to surface:** A failed connection may mean service stopped, wrong role, wrong host/port, wrong database or a missing driver; do not “fix” it by using a hardcoded admin password.
- **Hints (in order):** H1 — Check whether the PostgreSQL service is running. H2 — Verify the exact database name and role, not just a password. H3 — Try the connection from psql with an interactive prompt and compare the host/port in `.env`.
- **Required checkpoints:** `p1-w09-l02-c01` (`quiz-auto`), `p1-w09-l02-c02` (`local-project-self-verified`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** What a DB server process is; Development vs destructive test DB; Role vs database vs table; Correct setup order; Why not log a DB password; Why a browser cannot auto-grade local PostgreSQL connectivity.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L03 — Table schema, types and constraints

- **ID / prerequisites:** `p1-w09-l03`; p1-w09-l02. **Source:** C05,C07,C11,C17.
- **Observable learning outcomes:** Describe `id`, `title`, `completed` and `created_at` types and defaults; Explain primary key, NOT NULL and CHECK constraints using realistic task data; Inspect the actual table definition and distinguish server validation from DB constraints.
- **Why it matters and worked example specification:** Read `INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY`, `VARCHAR(80) NOT NULL`, `BOOLEAN DEFAULT FALSE`, and `TIMESTAMPTZ DEFAULT NOW()` in the original migration. Explain that the DB enforces constraints even if SQL is run outside Express.
- **Guided independent practice:** Sketch a four-column tasks table. Predict whether blank titles, repeated IDs or missing completed values succeed. After running the migration, inspect the schema through psql or pgAdmin.
- **Debugging/misconception to surface:** `CREATE TABLE IF NOT EXISTS` is not a general-purpose schema-upgrade tool; it will not repair a table created with the wrong columns. Database `btrim` and JavaScript `.trim()` are similar but not identical for all whitespace.
- **Hints (in order):** H1 — Identify the server-generated fields. H2 — For each invalid row, name the rejecting constraint. H3 — Check the current schema in PostgreSQL instead of assuming a migration updated it.
- **Required checkpoints:** `p1-w09-l03-c01` (`quiz-auto`), `p1-w09-l03-c02` (`local-project-self-verified`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** Identity vs manually selected ID; Primary-key uniqueness; NOT NULL vs CHECK; BOOLEAN default semantics; TIMESTAMPTZ and API ISO representation; Database and API validation are complementary.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L04 — SELECT, WHERE, ORDER BY

- **ID / prerequisites:** `p1-w09-l04`; p1-w09-l03. **Source:** C08,C27,C29.
- **Observable learning outcomes:** Predict result rows for SELECT with WHERE and ORDER BY; Write safe read-only queries for completed and incomplete tasks and counts; Explain why predictable ordering and named columns help API behavior.
- **Why it matters and worked example specification:** Use a small fixed table (two complete tasks, one incomplete). Walk through FROM, WHERE, selected columns and ORDER BY. Contrast SQL `=` equality with JS assignment and `===`.
- **Guided independent practice:** In the local SQL console run completed-only, incomplete-only, count and newest-ID-first queries. Predict exact rows first, then check results and write one explanation.
- **Debugging/misconception to surface:** `ORDER BY id DESC` sorts by ID, not necessarily by arbitrary user-edit time. `SELECT *` can inadvertently return future columns and make a stable API contract harder to review.
- **Hints (in order):** H1 — First decide which rows are eligible. H2 — Now choose the columns in the output. H3 — Finally specify how the output is ordered.
- **Required checkpoints:** `p1-w09-l04-c01` (`quiz-auto`), `p1-w09-l04-c02` (`local-project-self-verified`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** Select explicit columns; WHERE completed=FALSE; ORDER BY ASC vs DESC; COUNT(*); SQL `=` vs JavaScript `===`; Predict result rows for a given fixture.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L05 — INSERT, RETURNING and defaults

- **ID / prerequisites:** `p1-w09-l05`; p1-w09-l04. **Source:** C09,C15,C27.
- **Observable learning outcomes:** Explain where new task IDs and timestamps come from; Write INSERT that returns a newly created row without assigning an ID manually; Connect INSERT RETURNING to HTTP 201 and the canonical task object.
- **Why it matters and worked example specification:** Show `INSERT INTO tasks (title) VALUES ('Practice SQL') RETURNING id, title, completed, created_at;`. Explain identity generation, default FALSE and created-at timestamp.
- **Guided independent practice:** Insert one valid task in the local development DB and inspect the returned ID and defaults. Query the created row using its ID and compare fields to the Week 8 POST API shape.
- **Debugging/misconception to surface:** Do not explicitly insert ID for a GENERATED ALWAYS AS IDENTITY field. Do not assume that `INSERT` auto returns the row unless RETURNING is used.
- **Hints (in order):** H1 — Which columns can the database populate automatically? H2 — What does the HTTP client need immediately after POST? H3 — What SQL clause returns inserted columns?
- **Required checkpoints:** `p1-w09-l05-c01` (`quiz-auto`), `p1-w09-l05-c02` (`local-project-self-verified`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** INSERT columns vs values; Database-controlled identity; RETURNING usage; DEFAULT FALSE behavior; Created timestamp origin; HTTP 201 mapping.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L06 — UPDATE and DELETE safely

- **ID / prerequisites:** `p1-w09-l06`; p1-w09-l05. **Source:** C10,C16,C21,C27.
- **Observable learning outcomes:** Write UPDATE and DELETE with a verified WHERE id clause; Predict what happens if WHERE is omitted and how a rollback lab protects practice data; Explain zero-row updates/deletes and their corresponding 404 API behavior.
- **Why it matters and worked example specification:** Use an existing returned ID in `UPDATE tasks SET completed = TRUE WHERE id = … RETURNING …`. Introduce `BEGIN`/`ROLLBACK` as the safe local SQL-lab pattern; use DELETE only with a WHERE predicate.
- **Guided independent practice:** Run a transaction lab: insert a temporary row, update it, read it, delete it, then roll back. Prove the original rows remain unchanged and explain why.
- **Debugging/misconception to surface:** `DELETE FROM tasks` without WHERE can delete the entire table. This is a critical question; the lesson must never prompt students to execute an unbounded write on real data.
- **Hints (in order):** H1 — Identify the intended task ID before changing SQL. H2 — Find the WHERE condition that limits affected rows. H3 — Run potentially destructive practice inside a rollback transaction.
- **Required checkpoints:** `p1-w09-l06-c01` (`quiz-auto`), `p1-w09-l06-c02` (`local-project-self-verified`).
- **Optional enrichment:** `p1-w09-l06-c03`.
- **Quiz topic coverage (six future scored items):** UPDATE with WHERE; DELETE with WHERE; RETURNING on updates; Meaning of zero affected rows; BEGIN/ROLLBACK; Danger of missing WHERE.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L07 — Migrations and safe schema setup

- **ID / prerequisites:** `p1-w09-l07`; p1-w09-l06. **Source:** C07,C11,C23.
- **Observable learning outcomes:** Explain why a migration is a reviewed change to the database schema; Run the supplied 001 SQL migration before starting the API; Distinguish an idempotent first migration from a full version-tracked migration system.
- **Why it matters and worked example specification:** Review `backend/migrations/001_create_tasks.sql` and `backend/scripts/migrate.js`. Show the order: create database, configure local `.env`, install packages, `npm run migrate`, then start API.
- **Guided independent practice:** On the local dev database run the migration, inspect `tasks`, rerun it and confirm it does not duplicate the table. Explain why an intentionally incompatible existing table needs a future explicit migration.
- **Debugging/misconception to surface:** `CREATE TABLE IF NOT EXISTS` does not add missing fields or preserve application compatibility when schema changes; do not teach it as an all-purpose upgrade strategy.
- **Hints (in order):** H1 — Distinguish database creation from table creation. H2 — Find the actual SQL file before examining the runner script. H3 — If app queries fail, verify whether the migration ran on the same DB in DATABASE_URL.
- **Required checkpoints:** `p1-w09-l07-c01` (`quiz-auto`), `p1-w09-l07-c02` (`local-project-self-verified`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** DDL versus DML; Purpose of migrations; Why sequence matters; IF NOT EXISTS limits; Where migration scripts live; How to verify schema after applying.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L08 — pg Pool and application configuration

- **ID / prerequisites:** `p1-w09-l08`; p1-w09-l07. **Source:** C02,C12,C19.
- **Observable learning outcomes:** Describe how `pg.Pool` provides bounded backend database connections; Explain the `DATABASE_URL` and `TEST_DATABASE_URL` boundaries and missing-config behavior; Diagnose startup failure or inability to reach PostgreSQL without exposing secrets.
- **Why it matters and worked example specification:** Explain a bounded connection pool of five and why the server creates one pool per running process. Read a redacted environment example, identify the server-only secret, and describe the health/ping test.
- **Guided independent practice:** Copy `.env.example` to local `.env` using fictional credentials, then start the backend after migrating. Demonstrate DB-backed health when connected, and identify failure mode with the DB off.
- **Debugging/misconception to surface:** Never commit `.env`, render a DB URL into the React client, or log secrets. A network/connection error is not a malformed user task and should not be reported as HTTP 400.
- **Hints (in order):** H1 — Look for the server-side configuration source. H2 — Use an interactive PostgreSQL login to distinguish credential failures from backend code errors. H3 — Read a redacted error class and check whether server startup occurred.
- **Required checkpoints:** `p1-w09-l08-c01` (`quiz-auto`), `p1-w09-l08-c02` (`local-project-self-verified`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** Pool vs single connection concept; Server-only DATABASE_URL; Test database separation; Missing credentials behavior; DB outage vs bad task 400; Why pool must be closed during shutdown.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L09 — SQL repository and query boundaries

- **ID / prerequisites:** `p1-w09-l09`; p1-w09-l08. **Source:** C13–C16,C18,C20,C33.
- **Observable learning outcomes:** Describe how repository methods hide SQL from Express routes; Explain how a database row becomes `{id,title,completed,createdAt}` API JSON; Build SQL-backed list/get/create/update/remove without changing Week 8 route semantics.
- **Why it matters and worked example specification:** Trace `GET /api/tasks` route → `repo.list` → `pool.query` → PostgreSQL rows → `toApiTask` → `{data,count}`. Explain why `created_at` is transformed to `createdAt`, how false is preserved, and how empty result maps to null or rowCount.
- **Guided independent practice:** Implement one repository read and one write locally, run local tests and compare POST/GET/PATCH/DELETE statuses with Week 8. In a separate browser-safe fake-pool exercise, inspect captured query arguments and row mapping only.
- **Debugging/misconception to surface:** A patch with `completed:false` must not use `||` defaults because false is meaningful; use nullish logic. `DELETE` returns a count rather than a task row; missing rows lead to 404.
- **Hints (in order):** H1 — First identify the shape of a raw DB row. H2 — Compare expected API keys with PostgreSQL column names. H3 — Use a fake pool to observe query calls before debugging the real DB.
- **Required checkpoints:** `p1-w09-l09-c01` (`quiz-auto`), `p1-w09-l09-c02` (`local-project-self-verified`), `p1-w09-l09-c03` (`browser-code-auto`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** Service/repository division; Row mapping created_at; NULL versus false patch; rowCount for DELETE; GET/POST/PATCH/DELETE contract; Missing row behavior.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L10 — Parameterized SQL and safe error handling

- **ID / prerequisites:** `p1-w09-l10`; p1-w09-l09. **Source:** C17,C19,C21,C22.
- **Observable learning outcomes:** Explain why user-controlled values must be passed separately from SQL text; Distinguish input validation 400, missing row 404 and storage failure 503/500 without exposing internals; Review a proposed AI-written SQL change for interpolation and unsafe logging.
- **Why it matters and worked example specification:** Use a query shape with `$1` and an array of values. Show an injected-looking title as plain data rather than concatenating it into SQL. Distinguish a fake-pool query-capture check from real database execution.
- **Guided independent practice:** Read an unsafe interpolated-query snippet (do not run it), propose a parameterized equivalent and verify it using a fake-pool browser lab. In the real local repo, trigger a missing row vs an unavailable DB and compare error responses.
- **Debugging/misconception to surface:** String concatenation is unsafe even if the frontend validated the title. Do not expose SQL error text or the full connection URL in API responses.
- **Hints (in order):** H1 — Identify which string came from a user or HTTP request. H2 — Move its value into the parameter array and leave SQL text stable. H3 — Classify the failure as request validation, nonexistent resource or backend storage failure.
- **Required checkpoints:** `p1-w09-l10-c01` (`quiz-auto`), `p1-w09-l10-c02` (`browser-code-auto`).
- **Optional enrichment:** `p1-w09-l10-c03`.
- **Quiz topic coverage (six future scored items):** Parameterized values vs SQL interpolation; Why frontend validation is insufficient; 400 vs 404 vs 503/500; SQL injection reasoning; Sensitive error log limits; Review fake-pool evidence boundaries.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L11 — Database test separation and persistence checks

- **ID / prerequisites:** `p1-w09-l11`; p1-w09-l10. **Source:** C18,C20–C22,C26,C27.
- **Observable learning outcomes:** Explain unit/fake-repository API tests versus an actual database integration test; Prove persistence across pool closure and restart using a dedicated test DB; Debug wrong-database, migration-missing and constraint-failure scenarios with evidence.
- **Why it matters and worked example specification:** Compare fake-pool repository unit tests, API HTTP tests with fake repository, and a real PostgreSQL test. Explain why `TEST_DATABASE_URL` must point to an isolated database whose name ends in `_test` before any test script that truncates tables is run.
- **Guided independent practice:** Run dependency-free tests and, after checking database name and tests, run real DB integration test locally. Review its data-clearing behavior and record pass/fail accurately; never substitute a guessed test count.
- **Debugging/misconception to surface:** A unit test passing does not prove PostgreSQL is installed or persistence exists. Never run `TRUNCATE` tests against the development DB or any important/production DB.
- **Hints (in order):** H1 — Identify which layer the failing test actually exercises. H2 — Inspect the target DB name before any data-changing test. H3 — Close and reopen the pool to test committed durability.
- **Required checkpoints:** `p1-w09-l11-c01` (`quiz-auto`), `p1-w09-l11-c02` (`local-project-self-verified`).
- **Optional enrichment:** `p1-w09-l11-c03`.
- **Quiz topic coverage (six future scored items):** Unit vs API vs real DB tests; Why fake pool cannot prove SQL execution; Database name _test safeguard; Migration requirement before real DB tests; Pool close/reopen semantics; Evidence of actual persistence.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

### L12 — Week 9 persistent Study Tasks proof and Week 10 readiness

- **ID / prerequisites:** `p1-w09-l12`; p1-w09-l11. **Source:** C01–C03,C18,C23–C34.
- **Observable learning outcomes:** Demonstrate task CRUD through React → Express → PostgreSQL, preserving Week 8 API contract; Show task persistence after restarting only the Express process; Explain absence of authentication/ownership and the security goal of Week 10.
- **Why it matters and worked example specification:** Make the student narrate one POST journey: browser form → HTTP 201 → Express validation → SQL INSERT RETURNING → new task row → React update. Compare with DELETE 204 and GET after a backend restart.
- **Guided independent practice:** Use a fictional task: create, show DB row, toggle, rename, restart Node, re-fetch and delete. Capture redacted results, explain one independently debugged issue, document git diff and tests actually run. Confirm no `.env` in version control.
- **Debugging/misconception to surface:** Refreshing React or restarting only Vite is insufficient evidence of durable database persistence. A shared tasks table without user association is not a multi-user secure app.
- **Hints (in order):** H1 — Check current API health and storage indicator. H2 — Query PostgreSQL directly for the newly created task ID. H3 — Stop only Express, restart it and then reload React to prove durability.
- **Required checkpoints:** `p1-w09-l12-c01` (`quiz-auto`), `p1-w09-l12-c02` (`local-project-self-verified`).
- **Optional enrichment:** None.
- **Quiz topic coverage (six future scored items):** Source of truth after Week 9; Postgres survives Express restart; 201 vs 204 contract remains; Evidence proving persistence; No user ownership until Week 10; Safe handoff into authentication.
- **Evidence policy:** Only actual browser-controlled quiz/fake-pool suites can show “Passed automatically”; actual `psql`, migrations, npm, React, Express and PostgreSQL evidence is learner-reported as “Self-verified locally.”

## 5. Week 9 practical project contract — Study Tasks v9

**Start state:** Week 8 React API already works with temporary Express memory. **End state:** same React API against PostgreSQL, with durable task records. The student implements/reviews `backend/src/task-repository.js`, understands `backend/src/db.js` and `migrations/001_create_tasks.sql`, runs migration and tests. The completed instructor reference remains private.

**Required acceptance evidence (learner-run locally, not independently graded by Fieldbook):**

1. Connect to the development DB with a non-superuser learning role, safely storing secrets in ignored `.env`.
2. Run SQL migration and inspect table columns, identity PK, constraints and defaults.
3. Execute at least four safe basic SQL operation patterns (SELECT, INSERT RETURNING, UPDATE WHERE, DELETE WHERE); use a rollback transaction for destructive practice when suitable.
4. Implement/query `list`, `get`, `create`, `update`, `remove` via PostgreSQL repository; preserve `completed:false` and missing-row behavior.
5. Verify API response shape/statuses: GET 200, POST 201, PATCH 200, DELETE 204 **no JSON body**, invalid input 400 and missing task 404.
6. Create task; show its row by returned ID in PostgreSQL; stop/restart **only Express** and reload React; task persists.
7. Confirm backend startup/database outage is represented honestly; never display DB credentials, raw SQL stack traces or sensitive connection information in the browser.
8. Inspect both database names before running tests; perform available unit/API tests and optional live DB tests *only* against verified `_test` DB; write down what actually ran.
9. Show one independent SQL bug investigation and relevant evidence; explain where AI was/was not used, and inspect Git diff for secrets.
10. State current limitation: **no accounts, no user ownership and no private per-user tasks until Week 10**.

**Weekly unlocking gate:** all mandatory lesson checkpoints, plus L12 local-project capstone self-attestation with the above evidence and L12 six-question readiness quiz with its essential check. Mandatory quiz threshold remains 5/6 for six scored items plus all flagged essential questions. No exact test pass count is promised; record observed local results.

## 6. Security and learner confidence boundaries

- Do not create fake SQL emulators that claim to evaluate PostgreSQL semantics. Pure-JS fake-pool exercises can validate the **shape of calls** and row formatting but cannot validate a real PostgreSQL query, migration, network connection or transaction.
- A student may type SQL into a local console only after selecting a **dedicated local database**. Never use `TRUNCATE`/unbounded DELETE/UPDATE as a suggested student drill on valuable data. `TRUNCATE` appears only inside a controlled, isolated test suite targeting `_test` DB.
- Do not require screenshots containing connection URLs, personal data or passwords. A bounded checklist with command names and redacted outcomes is enough for self-attested progress.
- A learner blocked by PostgreSQL setup may study upcoming conceptual material and follow remedial help, but a **required local persistence gate cannot be marked automatically passed** merely because a quiz score is high.
- Week 9 is single-user development data; Week 10 introduces accounts, server sessions and row-level ownership checks. A course completion badge is not a professional certification.

## 7. Representative assessment and hint scenarios

**Scenario A: SQL result prediction.** With tasks [1 incomplete, 2 complete, 3 complete], ask which IDs are returned by `WHERE completed=TRUE ORDER BY id DESC` and explain the filter/sort sequence. Auto-check as reviewed quiz content, **not a database execution claim**.

**Scenario B: `completed:false`.** A user changes a previously completed task to incomplete. The API must persist false rather than treating it as “missing”. Use a browser-safe fake-pool capture test for JS argument handling, then separately instruct the learner to run the actual local API and verify the PostgreSQL row.

**Scenario C: SQL injection review.** Given a query interpolating `title` directly, ask the learner to replace it with `$1` and a separate values array. In-browser fake-pool verification can test the captured call structure; real SQL injection defenses also need code review and database tests.

**Scenario D: restart proof.** A learner refreshes React but never stops Express. This is **insufficient** evidence of server-restart durability. Show a corrective hint ladder, then require a backend restart and direct DB row inspection before claiming local project self-verification.

## 8. Independent homework, teaching and pilot scope

**Original teaching cadence:** two guided 90-minute mentor sessions plus approximately 4–6 hours of independent practice. A self-paced Fieldbook learner should be able to use the same sequence autonomously with explanatory code, predicted outcomes, troubleshooting, and optional AI tutoring prompts. Learning-critical SQL is written by the learner; any agent-generated SQL is reviewed and tested, never blindly executed.

**Suggested independent blocks:** A (schema/SQL, 45–60m), B (repository reads, 45–60m), C (writes, 60–90m), D (restart/persistence integration, 45–60m), E (tests, security/Git review, 45–60m). Allow recovery after environment blockers; these are estimates, not time locks.

**Future D7 learner pilot** is specified in `docs/quality/WEEK09_PILOT_PROTOCOL.md`. It must actually observe a novice completing SQL work, preserving task data through Express restart, and avoiding a destructive test-DB mistake before D7 Week 9 content can be called validated. **The pilot has not run.**

## 9. Blueprint owner review checklist

- [ ] Verify all 12 stable lesson IDs, source C01–C34 coverage and project continuity from Week 8.
- [ ] Approve proposed **27-checkpoint split**: 12 quizzes, 2 isolated fake-pool JS suites, 10 locally self-verified projects, 3 optional.
- [ ] Confirm six scored items per quiz (**72 slots**, pass 5/6 plus essential) are sufficient *as a starting design*, subject to later content and learner reviews.
- [ ] Approve critical safety teaching: parameterized queries, WHERE guarding writes, `.env` secrecy and separate `_test` DB.
- [ ] Confirm no React/Express/PostgreSQL project is auto-graded by the static academy and no Week 10 auth is taught prematurely.
- [ ] Confirm future Week 9 pilot is an unexecuted plan, not a claimed successful result.
- [ ] Record owner's structural approval before changing this draft to A-010.

**STATUS: D0 source-inspected draft awaiting owner review.** This file is a teaching-system specification, not finished student prose, an executable SQL lab, a passing test suite, an executed pilot or authorization for application development. D0/D1 unsigned, D2 **NOT AUTHORIZED**.
