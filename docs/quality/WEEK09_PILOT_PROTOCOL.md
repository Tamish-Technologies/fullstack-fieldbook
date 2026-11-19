# Week 9 learner pilot protocol

Week 9 follows the approved A-010 structure. The [engineering dry run](D7_WEEK09_REVIEW.md) used a fresh profile and a disposable PostgreSQL instance. The independent human learner pilot remains pending.

## Research question and participants

Can a learner who has completed Week 8's real React+Express project independently create a PostgreSQL schema, safely run basic SQL, implement a repository, and prove persistence across an Express restart without relying on AI-generated code they cannot explain?

Use the actual prepared Week 9 student starter and fictional sample tasks. A mentor/observer records confusion, setup blockers, remediation choices and whether the student can explain SQL and ownership boundaries without prompts. No real secrets/sensitive log collection.

## Before starting

- The full Week 9 learner-facing content and 12 quiz groups must have been authored/reviewed; the 2 browser plain-JS suites must run inside the approved sandbox and display honest labels.
- Device includes a supported Node installation, local PostgreSQL, pgAdmin or psql and the **two separately named dev/test databases**. Verify the instructor's test DB contains no valuable data.
- The student has passed actual Week 8 required gates; test errors and setup are recorded rather than silently fixed behind their back.
- Have an explicit recovery scenario if Postgres installation is blocked: the learner can complete conceptual exercises, but **the actual local project gate remains unpassed** until verified by learner.

## Observation stages and what to measure

| Stage | Learner task | Observe |
|---|---|---|
| Diagnostic | Predict what happens to Week 8 tasks on Node restart | Understands memory vs DB |
| Local setup | Connect as dedicated role, identify both DB names | Does not expose DB secrets; distinguishes dev/test |
| SQL basics | Read sample rows, insert/return, safe update/delete | `WHERE`, defaults and generated ID reasoning |
| Schema | Explain table columns and run/check initial migration | Recognizes constraint failures and migration limits |
| Repository | Walk through `pool.query` and row mapping | Preserves false, missing row, API envelope |
| Fake-pool lab | Complete isolated JS test without live DB | Understands what was *not* executed |
| Security | Compare parameterized query with interpolated SQL | Correctly handles apostrophe/user input |
| Real tests | Identify safe `_test` target before any destructive command | No accidental test against dev/valuable DB |
| Persistence | Create → DB row → Express restart → reload → still exists | Actual durable-data proof, not React refresh only |
| Independent debug | Fix one introduced missing migration/DB wrong-name/patch-false issue | Diagnosis supported by logs/network/query evidence |
| Capstone | Show CRUD, repo code and remaining absence of auth | Clear Week 10 handoff and accurate self-verification |

## Critical gating checks

1. The learner never executes an unbounded destructive UPDATE/DELETE on meaningful data and never runs `TRUNCATE` tests on an unverified database.
2. Quiz threshold ≥5/6 per group plus all essential items; retries/hints correctly unblock learning without wrong auto-pass.
3. Browser runner suites label their fake-pool results **Passed automatically (isolated JavaScript)**, not “PostgreSQL tested.”
4. Real DB work appears only as **Self-verified locally**, with explicit checked commands and redacted observations.
5. Task persists after stopping and restarting **Express**; learner can identify the actual saved PostgreSQL row.
6. A missing PostgreSQL setup cannot be overridden by a claimed executed database test; remedial options remain available without false completion.
7. Week 10 only unlocks when all Week 9 required checkpoints, project evidence and readiness quiz are satisfied.

## Observation and remediation log

Capture approximate active learning effort, hesitation points, confusion about service/database/table, results of SQL queries, target DB identification, case of wrong port or unapplied migration, confidence with `WHERE`, inability to separate HTTP and DB errors, and one AI-generated mistake the learner understood or rejected. Record findings by checkpoint ID and severity; revise content after owner review if mastery requirements must change.

## Approval boundaries

**Human pilot status: pending.** Record participant observations and unresolved blockers here once the pilot runs. Engineering signoff and learner pilot evidence have separate review records.
