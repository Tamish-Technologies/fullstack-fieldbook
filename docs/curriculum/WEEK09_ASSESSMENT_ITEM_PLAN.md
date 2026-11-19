> **Approval A-010 (2026-11-17):** The owner accepted Week 9’s **structural educational blueprint** by replacing its ZIP and requesting Week 10. The 12 lessons and 27 checkpoints remain an authoring baseline, **not** finished learner content, executed PostgreSQL tests or a successful pilot. Full D0/D1 signoff and D2 application coding remain pending.

# Week 9 Assessment Item Plan — 72 Proposed Scored Slots, NOT an Authored Question Bank

**Status:** D0 draft awaiting owner approval. **12 required quiz groups × 6 scored items = 72 intended slots.** Each group needs ≥5/6 and every essential question correct under DEC-21. These are *question specifications*, not published questions, explanations or learner-tested distractors.

## 1. Group allocation

| Quiz checkpoint | Slots | Pass threshold | Six item intents | Proposed essential concept |
|---|---:|---|---|---|
| `p1-w09-l01-c01` | 6 | ≥5/6 + essential | Week 8 memory vs Week 9 durable data; Database/table/row/column definitions; Why the browser cannot connect to PostgreSQL with privileged credentials; Repository role in request path; What persistence across Node restart proves; Identify what auth/ownership is still missing | none |
| `p1-w09-l02-c01` | 6 | ≥5/6 + essential | What a DB server process is; Development vs destructive test DB; Role vs database vs table; Correct setup order; Why not log a DB password; Why a browser cannot auto-grade local PostgreSQL connectivity | Keep credentials private |
| `p1-w09-l03-c01` | 6 | ≥5/6 + essential | Identity vs manually selected ID; Primary-key uniqueness; NOT NULL vs CHECK; BOOLEAN default semantics; TIMESTAMPTZ and API ISO representation; Database and API validation are complementary | none |
| `p1-w09-l04-c01` | 6 | ≥5/6 + essential | Select explicit columns; WHERE completed=FALSE; ORDER BY ASC vs DESC; COUNT(*); SQL `=` vs JavaScript `===`; Predict result rows for a given fixture | none |
| `p1-w09-l05-c01` | 6 | ≥5/6 + essential | INSERT columns vs values; Database-controlled identity; RETURNING usage; DEFAULT FALSE behavior; Created timestamp origin; HTTP 201 mapping | none |
| `p1-w09-l06-c01` | 6 | ≥5/6 + essential | UPDATE with WHERE; DELETE with WHERE; RETURNING on updates; Meaning of zero affected rows; BEGIN/ROLLBACK; Danger of missing WHERE | Missing WHERE safety |
| `p1-w09-l07-c01` | 6 | ≥5/6 + essential | DDL versus DML; Purpose of migrations; Why sequence matters; IF NOT EXISTS limits; Where migration scripts live; How to verify schema after applying | none |
| `p1-w09-l08-c01` | 6 | ≥5/6 + essential | Pool vs single connection concept; Server-only DATABASE_URL; Test database separation; Missing credentials behavior; DB outage vs bad task 400; Why pool must be closed during shutdown | No secrets in browser or Git |
| `p1-w09-l09-c01` | 6 | ≥5/6 + essential | Service/repository division; Row mapping created_at; NULL versus false patch; rowCount for DELETE; GET/POST/PATCH/DELETE contract; Missing row behavior | none |
| `p1-w09-l10-c01` | 6 | ≥5/6 + essential | Parameterized values vs SQL interpolation; Why frontend validation is insufficient; 400 vs 404 vs 503/500; SQL injection reasoning; Sensitive error log limits; Review fake-pool evidence boundaries | Parameterized SQL for user values |
| `p1-w09-l11-c01` | 6 | ≥5/6 + essential | Unit vs API vs real DB tests; Why fake pool cannot prove SQL execution; Database name _test safeguard; Migration requirement before real DB tests; Pool close/reopen semantics; Evidence of actual persistence | Never run destructive tests against non-test database |
| `p1-w09-l12-c01` | 6 | ≥5/6 + essential | Source of truth after Week 9; Postgres survives Express restart; 201 vs 204 contract remains; Evidence proving persistence; No user ownership until Week 10; Safe handoff into authentication | No authentication/ownership yet |

## 2. Authoring requirements for all 72 slots

For every authored item provide stable item ID (e.g. `p1-w09-l06-c01-q04`), outcome reference, scenario/fixture, correct answer and rationale, plausible distractors with specific wrong-answer feedback, essential flag if critical, equivalent retry scenario and technical/educational review status. Do not depend on one memorized SQL literal or require a live DB to pass a conceptual quiz. Review SQL semantics using PostgreSQL documentation and the original teaching material when actually authoring content.

**Minimum scenario variety:** (a) rows from a fixed in-page sample table; (b) choosing safe SQL from several equivalent variants; (c) spotting a missing `WHERE`; (d) mapping row and API payloads; (e) distinguishing real DB tests from fake pool tests; (f) debugging a redacted connection failure; (g) explaining what happens after backend restart.

**Quiz placement examples to author later (not final exact questions):**

- L04: Given a fixed three-task table, predict IDs for `WHERE completed = true ORDER BY id DESC`. Provide feedback about WHERE before ORDER BY.
- L05: Identify which task attributes are DB-generated vs supplied during `INSERT ... RETURNING`.
- L06 essential: Highlight a `DELETE` with no `WHERE` and ask how many rows are targeted; pair with safe alternative.
- L08 essential: Ask where `DATABASE_URL` is permitted and why frontends cannot receive DB credentials.
- L09: Demonstrate `completed:false` patch failure when `||` is used for a fallback; choose the correct preservation approach.
- L10 essential: Compare interpolated SQL and `$1` values arrays using an apostrophe-containing name as the input fixture.
- L11 essential: Given two DB names, select which one destructive tests may clear and explain the `_test` convention.
- L12 essential: Ask whether shared Week 9 tasks are private per user; contrast with upcoming Week 10 server-enforced ownership.

## 3. Equivalent retries and feedback ladder

Avoid making students pass only by memorizing answer order. Each conceptual intent should have at least one alternative fixture/wording where feasible: use different task rows/IDs/titles but preserve the same underlying skill. Provide (1) conceptual hint, (2) focused reference to the relevant schema/SQL clause, (3) corrective explanation and new applied attempt. Unlimited retries, no time limits.

**Proposed essential flags are not validated item IDs yet.** A reviewer must assign exact qNN IDs and check that essential designation tests a critical concept, not a tricky wording detail. All essential items must be correct even if overall 5/6 is achieved.

## 4. Browser and local exercises are separate from these quiz slots

- Required browser suites (`p1-w09-l09-c03`, `p1-w09-l10-c02`) run plain JavaScript only with fake row/fake pool data. They are not SQL engines, live DB tests or substitutes for 10 local self-verification activities.
- Live SQL queries, migrations, psql configuration, Express repository integration and persistence across Node restart require actual learner-run local tests. Never imply the static Fieldbook website can grade those externally.
- Optional SQL reporting, AI security critique and migration curiosity remain non-gating.

## 5. Future content signoff, distinct from owner D0 approval

- [ ] 72 actual items authored with correctness, answer rationales, distractors and hints.
- [ ] Essential item wording reviewed (safety and query integrity).
- [ ] Isolated browser fake-pool suites implemented, security-reviewed and run.
- [ ] Local project commands/expected output checked against current dependencies and private reference.
- [ ] Real learner Week 9 pilot observed and confusing prompts corrected.

The proposed slots are a planning target. Do not claim that these quizzes have been implemented, executed, approved as final exam items or passed by any student.
