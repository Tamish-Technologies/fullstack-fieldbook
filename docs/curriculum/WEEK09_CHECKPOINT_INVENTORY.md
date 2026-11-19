> **Approval A-010 (2026-11-17):** The owner accepted Week 9’s **structural educational blueprint** by replacing its ZIP and requesting Week 10. The 12 lessons and 27 checkpoints remain an authoring baseline, **not** finished learner content, executed PostgreSQL tests or a successful pilot. Full D0/D1 signoff and D2 application coding remain pending.

# Week 9 Checkpoint Inventory — DEC-21 Verification Contract (D0 Draft)

**Status:** Week 9 structural baseline owner-approved A-010; actual question banks, tests and learner trial pending. No student quiz bank, browser sandbox implementation, real PostgreSQL learner tests or D7 pilot has been run. **D0/D1 unsigned; D2 NOT AUTHORIZED.**

**Totals:** **27 checkpoint IDs = 24 required (12 `quiz-auto`, 2 `browser-code-auto`, 10 `local-project-self-verified`) + 3 `optional-enrichment`.** Stable IDs `p1-w09-lNN-cNN` are not reused across lesson and reset/import logic. Every quiz group reserves six scored items, so pass requires **5 of 6** and every designated essential question correct. A week completes only with all mandatory lessons, the capstone local self-verification, and the L12 readiness quiz.

## 1. Full checkpoint register

| Stable ID | Method | Gate | Specific outcome/assessment contract |
|---|---|---|---|
| `p1-w09-l01-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. Week 8 memory vs Week 9 durable data; Database/table/row/column definitions; Why the browser cannot connect to PostgreSQL with privileged credentials; Repository role in request path; What persistence across Node restart proves; Identify what auth/ownership is still missing |
| `p1-w09-l02-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. What a DB server process is; Development vs destructive test DB; Role vs database vs table; Correct setup order; Why not log a DB password; Why a browser cannot auto-grade local PostgreSQL connectivity |
| `p1-w09-l02-c02` | `local-project-self-verified` | Required | Use psql/pgAdmin to select the current database name; show that the test database is different. Inspect the local `.env.example` and explain why the real `.env` must remain untracked. |
| `p1-w09-l03-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. Identity vs manually selected ID; Primary-key uniqueness; NOT NULL vs CHECK; BOOLEAN default semantics; TIMESTAMPTZ and API ISO representation; Database and API validation are complementary |
| `p1-w09-l03-c02` | `local-project-self-verified` | Required | Sketch a four-column tasks table. Predict whether blank titles, repeated IDs or missing completed values succeed. After running the migration, inspect the schema through psql or pgAdmin. |
| `p1-w09-l04-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. Select explicit columns; WHERE completed=FALSE; ORDER BY ASC vs DESC; COUNT(*); SQL `=` vs JavaScript `===`; Predict result rows for a given fixture |
| `p1-w09-l04-c02` | `local-project-self-verified` | Required | In the local SQL console run completed-only, incomplete-only, count and newest-ID-first queries. Predict exact rows first, then check results and write one explanation. |
| `p1-w09-l05-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. INSERT columns vs values; Database-controlled identity; RETURNING usage; DEFAULT FALSE behavior; Created timestamp origin; HTTP 201 mapping |
| `p1-w09-l05-c02` | `local-project-self-verified` | Required | Insert one valid task in the local development DB and inspect the returned ID and defaults. Query the created row using its ID and compare fields to the Week 8 POST API shape. |
| `p1-w09-l06-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. UPDATE with WHERE; DELETE with WHERE; RETURNING on updates; Meaning of zero affected rows; BEGIN/ROLLBACK; Danger of missing WHERE |
| `p1-w09-l06-c02` | `local-project-self-verified` | Required | Run a transaction lab: insert a temporary row, update it, read it, delete it, then roll back. Prove the original rows remain unchanged and explain why. |
| `p1-w09-l06-c03` | `optional-enrichment` | Optional | Optional report: count tasks by completion state using additional read-only SQL (not new endpoint). |
| `p1-w09-l07-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. DDL versus DML; Purpose of migrations; Why sequence matters; IF NOT EXISTS limits; Where migration scripts live; How to verify schema after applying |
| `p1-w09-l07-c02` | `local-project-self-verified` | Required | On the local dev database run the migration, inspect `tasks`, rerun it and confirm it does not duplicate the table. Explain why an intentionally incompatible existing table needs a future explicit migration. |
| `p1-w09-l08-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. Pool vs single connection concept; Server-only DATABASE_URL; Test database separation; Missing credentials behavior; DB outage vs bad task 400; Why pool must be closed during shutdown |
| `p1-w09-l08-c02` | `local-project-self-verified` | Required | Copy `.env.example` to local `.env` using fictional credentials, then start the backend after migrating. Demonstrate DB-backed health when connected, and identify failure mode with the DB off. |
| `p1-w09-l09-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. Service/repository division; Row mapping created_at; NULL versus false patch; rowCount for DELETE; GET/POST/PATCH/DELETE contract; Missing row behavior |
| `p1-w09-l09-c02` | `local-project-self-verified` | Required | Implement one repository read and one write locally, run local tests and compare POST/GET/PATCH/DELETE statuses with Week 8. In a separate browser-safe fake-pool exercise, inspect captured query arguments and row mapping only. |
| `p1-w09-l09-c03` | `browser-code-auto` | Required | Pure-JS toApiTask mapper and fake-pool repository calls: map date/timestamp and title/false values, capture placeholder SQL and result shapes; no real DB or Express execution. |
| `p1-w09-l10-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. Parameterized values vs SQL interpolation; Why frontend validation is insufficient; 400 vs 404 vs 503/500; SQL injection reasoning; Sensitive error log limits; Review fake-pool evidence boundaries |
| `p1-w09-l10-c02` | `browser-code-auto` | Required | Pure-JS fake-pool SQL call capture: ensure user-controlled title is in values array, never interpolated; cover apostrophe/injection-looking string and missing-row mapping. Does not prove a real DB query works. |
| `p1-w09-l10-c03` | `optional-enrichment` | Optional | Optional security review of AI-generated repository diff; write two findings with corrections. |
| `p1-w09-l11-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. Unit vs API vs real DB tests; Why fake pool cannot prove SQL execution; Database name _test safeguard; Migration requirement before real DB tests; Pool close/reopen semantics; Evidence of actual persistence |
| `p1-w09-l11-c02` | `local-project-self-verified` | Required | Run dependency-free tests and, after checking database name and tests, run real DB integration test locally. Review its data-clearing behavior and record pass/fail accurately; never substitute a guessed test count. |
| `p1-w09-l11-c03` | `optional-enrichment` | Optional | Optional explore migration-version tracking and how to test schema upgrade on a disposable DB. |
| `p1-w09-l12-c01` | `quiz-auto` | Required | 6 questions: pass at least 5/6 and all essential questions. Source of truth after Week 9; Postgres survives Express restart; 201 vs 204 contract remains; Evidence proving persistence; No user ownership until Week 10; Safe handoff into authentication |
| `p1-w09-l12-c02` | `local-project-self-verified` | Required | Use a fictional task: create, show DB row, toggle, rename, restart Node, re-fetch and delete. Capture redacted results, explain one independently debugged issue, document git diff and tests actually run. Confirm no `.env` in version control. |

## 2. Mandatory browser coding suite specifications — only pure JavaScript, not PostgreSQL

### `p1-w09-l09-c03` — Row mapping and fake-pool calls

- **Environment:** isolated browser JavaScript runner; only self-contained task-row mapping and injected fake-pool data. Never use or embed the actual `DATABASE_URL`, Node process, real `pg`, filesystem or SQL server.
- **Student target:** map `{id,title,completed,created_at}` into the API object `{id,title,completed,createdAt}` and/or call a supplied fake pool through a small repository operation with correct arguments.
- **Mandatory cases:** string vs Date timestamp to ISO; `completed:false` stays false; single row vs missing row returns expected values; sorted list rows preserve integer IDs; query uses a values array rather than concatenating unsafe data. Exact assertions approved during D7 implementation, not invented by the UI.
- **Passing:** all designated behavior-based assertions; reject reliance on exact code-text matching or import of local Node/`pg` modules. **Label:** Passed automatically (isolated JS only).
- **Wrong-answer feedback:** differentiate wrong key names, missing ISO conversion, Boolean `false` lost to truthiness defaults, empty result confusion and malformed parameters. Provide alternate fixture on retry.

### `p1-w09-l10-c02` — Parameter-array security review via fake-pool capture

- **Environment:** isolated plain-JS fake repository/pool with a controlled capture of `query(sql, values)`; do not run actual SQL, package install or cross-origin request.
- **Student target:** pass user title separately as `$1` values, keep SQL statement structure constant, handle apostrophe-containing strings as data; avoid exposing query errors or connection secrets.
- **Mandatory cases:** normal title, a title with `'`, SQL-looking input, missing ID and `completed:false` in PATCH argument array; verify no value interpolation into SQL, and that falsy Boolean remains explicit. Demonstrate a safe 400/404/5xx distinction through a separate knowledge-check scenario, not a fake live API call.
- **Passing:** all approved capture assertions; **not** proof of actual PostgreSQL SQL execution, security review or injection-test coverage. **Label:** Passed automatically (isolated JS only).
- **Feedback:** isolate placeholder/text vs value array mistakes and refer to the local database verification checkpoint when students ask “Did PostgreSQL actually run this?”.

## 3. Required local project attestations — honest evidence, no uploaded secrets


### `p1-w09-l02-c02` — Install and connect PostgreSQL locally

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** Use psql/pgAdmin to select the current database name; show that the test database is different. Inspect the local `.env.example` and explain why the real `.env` must remain untracked.
- **Check against original lesson outcomes:** Start or locate a local PostgreSQL server and connect using a dedicated learning role; Create separate development and `_test` databases without exposing credentials; Explain why local setup and real SQL cannot be automatically verified by the static Fieldbook site.
- **Troubleshooting:** A failed connection may mean service stopped, wrong role, wrong host/port, wrong database or a missing driver; do not “fix” it by using a hardcoded admin password.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** Check whether the PostgreSQL service is running. Verify the exact database name and role, not just a password.

### `p1-w09-l03-c02` — Table schema, types and constraints

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** Sketch a four-column tasks table. Predict whether blank titles, repeated IDs or missing completed values succeed. After running the migration, inspect the schema through psql or pgAdmin.
- **Check against original lesson outcomes:** Describe `id`, `title`, `completed` and `created_at` types and defaults; Explain primary key, NOT NULL and CHECK constraints using realistic task data; Inspect the actual table definition and distinguish server validation from DB constraints.
- **Troubleshooting:** `CREATE TABLE IF NOT EXISTS` is not a general-purpose schema-upgrade tool; it will not repair a table created with the wrong columns. Database `btrim` and JavaScript `.trim()` are similar but not identical for all whitespace.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** Identify the server-generated fields. For each invalid row, name the rejecting constraint.

### `p1-w09-l04-c02` — SELECT, WHERE, ORDER BY

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** In the local SQL console run completed-only, incomplete-only, count and newest-ID-first queries. Predict exact rows first, then check results and write one explanation.
- **Check against original lesson outcomes:** Predict result rows for SELECT with WHERE and ORDER BY; Write safe read-only queries for completed and incomplete tasks and counts; Explain why predictable ordering and named columns help API behavior.
- **Troubleshooting:** `ORDER BY id DESC` sorts by ID, not necessarily by arbitrary user-edit time. `SELECT *` can inadvertently return future columns and make a stable API contract harder to review.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** First decide which rows are eligible. Now choose the columns in the output.

### `p1-w09-l05-c02` — INSERT, RETURNING and defaults

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** Insert one valid task in the local development DB and inspect the returned ID and defaults. Query the created row using its ID and compare fields to the Week 8 POST API shape.
- **Check against original lesson outcomes:** Explain where new task IDs and timestamps come from; Write INSERT that returns a newly created row without assigning an ID manually; Connect INSERT RETURNING to HTTP 201 and the canonical task object.
- **Troubleshooting:** Do not explicitly insert ID for a GENERATED ALWAYS AS IDENTITY field. Do not assume that `INSERT` auto returns the row unless RETURNING is used.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** Which columns can the database populate automatically? What does the HTTP client need immediately after POST?

### `p1-w09-l06-c02` — UPDATE and DELETE safely

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** Run a transaction lab: insert a temporary row, update it, read it, delete it, then roll back. Prove the original rows remain unchanged and explain why.
- **Check against original lesson outcomes:** Write UPDATE and DELETE with a verified WHERE id clause; Predict what happens if WHERE is omitted and how a rollback lab protects practice data; Explain zero-row updates/deletes and their corresponding 404 API behavior.
- **Troubleshooting:** `DELETE FROM tasks` without WHERE can delete the entire table. This is a critical question; the lesson must never prompt students to execute an unbounded write on real data.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** Identify the intended task ID before changing SQL. Find the WHERE condition that limits affected rows.

### `p1-w09-l07-c02` — Migrations and safe schema setup

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** On the local dev database run the migration, inspect `tasks`, rerun it and confirm it does not duplicate the table. Explain why an intentionally incompatible existing table needs a future explicit migration.
- **Check against original lesson outcomes:** Explain why a migration is a reviewed change to the database schema; Run the supplied 001 SQL migration before starting the API; Distinguish an idempotent first migration from a full version-tracked migration system.
- **Troubleshooting:** `CREATE TABLE IF NOT EXISTS` does not add missing fields or preserve application compatibility when schema changes; do not teach it as an all-purpose upgrade strategy.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** Distinguish database creation from table creation. Find the actual SQL file before examining the runner script.

### `p1-w09-l08-c02` — pg Pool and application configuration

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** Copy `.env.example` to local `.env` using fictional credentials, then start the backend after migrating. Demonstrate DB-backed health when connected, and identify failure mode with the DB off.
- **Check against original lesson outcomes:** Describe how `pg.Pool` provides bounded backend database connections; Explain the `DATABASE_URL` and `TEST_DATABASE_URL` boundaries and missing-config behavior; Diagnose startup failure or inability to reach PostgreSQL without exposing secrets.
- **Troubleshooting:** Never commit `.env`, render a DB URL into the React client, or log secrets. A network/connection error is not a malformed user task and should not be reported as HTTP 400.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** Look for the server-side configuration source. Use an interactive PostgreSQL login to distinguish credential failures from backend code errors.

### `p1-w09-l09-c02` — SQL repository and query boundaries

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** Implement one repository read and one write locally, run local tests and compare POST/GET/PATCH/DELETE statuses with Week 8. In a separate browser-safe fake-pool exercise, inspect captured query arguments and row mapping only.
- **Check against original lesson outcomes:** Describe how repository methods hide SQL from Express routes; Explain how a database row becomes `{id,title,completed,createdAt}` API JSON; Build SQL-backed list/get/create/update/remove without changing Week 8 route semantics.
- **Troubleshooting:** A patch with `completed:false` must not use `||` defaults because false is meaningful; use nullish logic. `DELETE` returns a count rather than a task row; missing rows lead to 404.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** First identify the shape of a raw DB row. Compare expected API keys with PostgreSQL column names.

### `p1-w09-l11-c02` — Database test separation and persistence checks

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** Run dependency-free tests and, after checking database name and tests, run real DB integration test locally. Review its data-clearing behavior and record pass/fail accurately; never substitute a guessed test count.
- **Check against original lesson outcomes:** Explain unit/fake-repository API tests versus an actual database integration test; Prove persistence across pool closure and restart using a dedicated test DB; Debug wrong-database, migration-missing and constraint-failure scenarios with evidence.
- **Troubleshooting:** A unit test passing does not prove PostgreSQL is installed or persistence exists. Never run `TRUNCATE` tests against the development DB or any important/production DB.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** Identify which layer the failing test actually exercises. Inspect the target DB name before any data-changing test.

### `p1-w09-l12-c02` — Week 9 persistent Study Tasks proof and Week 10 readiness

- **Setup:** the Week 9 starter project on the student's own machine with real PostgreSQL where appropriate. Verify database target before any mutating SQL and avoid using personal data.
- **Required behavior:** Use a fictional task: create, show DB row, toggle, rename, restart Node, re-fetch and delete. Capture redacted results, explain one independently debugged issue, document git diff and tests actually run. Confirm no `.env` in version control.
- **Check against original lesson outcomes:** Demonstrate task CRUD through React → Express → PostgreSQL, preserving Week 8 API contract; Show task persistence after restarting only the Express process; Explain absence of authentication/ownership and the security goal of Week 10.
- **Troubleshooting:** Refreshing React or restarting only Vite is insufficient evidence of durable database persistence. A shared tasks table without user association is not a multi-user secure app.
- **Evidence recorded locally:** learner acknowledgement of actual commands/tests and results; one short redacted note or a bounded observation (e.g. row exists after restart). Never ask to paste passwords, connection URLs or raw private logs.
- **Completion label:** **Self-verified locally**; learner attestation is not automatic test execution by FullStack Fieldbook.
- **Retry/remediation:** Check current API health and storage indicator. Query PostgreSQL directly for the newly created task ID.

## 4. Quiz mapping, essential flags, scoring and retry rules

Each `p1-w09-lNN-c01` is a six-question reviewed quiz group aligned with that lesson's six topic intents in `WEEK09_ASSESSMENT_ITEM_PLAN.md`. **Pass = 5/6 and all essential items**, if flagged. No question bank, distractors, answer feedback or equivalent reattempts have been authored yet.

**Proposed essential concept flags, to verify during D7 content review:** L02 protecting DB secrets; L06 `WHERE` and safe write operations; L08 never exposing DB credentials; L10 parameterized queries; L11 safe target for destructive database tests; L12 acknowledging that Week 9 has no user ownership. These are concept intents; exact final item IDs/wordings must be reviewed and mapped before publication, not blindly marked passed.

**Feedback:** reveal underlying misconceptions and a 3-step hint ladder (concept → narrowed location → partial structure), then offer an equivalent fresh example on retry. No punitive limits, timer gates or required external AI. A student may review any completed lesson without losing previous mastery unless an explicit formal reset is requested.

## 5. Optional enrichment — never included in completion denominator

- `p1-w09-l06-c03`: read-only SQL completion count/report; use a disposable fixture or dev DB and explain result.
- `p1-w09-l10-c03`: read-only AI suggestion review for SQL security; external AI must remain optional, with a non-AI alternative.
- `p1-w09-l11-c03`: explore how a production migration tool differs from an idempotent initial SQL script; no application rewrite.

## 6. Weekly Week 9 gate and import/reset data

**Gate:** all required quiz/browser/self-verification checkpoints plus Week 9 capstone evidence and readiness quiz. The learner's progress record stores stable checkpoint ID, course/content version, method, pass/attestation record and timestamp; **do not store any PostgreSQL secret**. Local `study_tasks_week9` application DB is unrelated to Fieldbook's own `localStorage` progress record.

- Ordinary retry/review never revokes mastery.
- Formal lesson reset invalidates dependent completions with an explicit preview.
- Week reset invalidates that and later weeks; full reset offers backup and confirmation.
- Imported completion flags are recomputed against verified prerequisites. Browser auto-check badges never get inferred from a self-attestation.
- Student Week 10 remains locked until Week 9's required gates are satisfied; a failed DB setup can be remediated but cannot be mislabeled as a tested persistent app.

## 7. D0 review checklist

- [ ] Check 27 unique IDs and allocations (12 quiz / 2 browser JS / 10 local / 3 optional).
- [ ] Verify exact safe SQL/JS fixtures before D7 implementation, including false patch, SQL apostrophes and valid row mapping.
- [ ] Approve warning and lock policy for `_test` destructive DB checks.
- [ ] Review six question intents per quiz and proposed essential flags.
- [ ] Confirm Week 9 local project artifacts are not in public app bundle.
- [ ] Record owner approval A-010 separately; do **not** approve by simply receiving this document.
