# Week 10 learner pilot protocol

Week 10 follows the A-011 baseline. The [engineering review](D8_WEEK10_REVIEW.md) records the fresh-profile and disposable-database checks. The independent human learner pilot remains pending.

## Research question

Can a learner who genuinely completed Week 9 build a local multi-user experience, explain the session/authorization boundary, find and correct ownership failures, and prove that two users' private tasks stay isolated without needing AI to implement every security-critical line?

**Participants:** a learner meeting real Week 9 prerequisites; one observer/instructor if available. **Data:** fictional Alice/Bob accounts and tasks in an isolated local database. No real passwords, cookies, session IDs, connection strings or secrets in observation notes or academy progress.

## Preconditions for conducting a valid pilot

- Real student-facing Week 10 content has been authored, reviewed, and checked against C01–C38; all 72 scored question intents are turned into approved questions, rationales and retry alternatives.
- The two sandbox JS exercises run safely and show limited “Passed automatically” labels. Real auth/SQL work uses learner-controlled local project setup.
- Node 22.12+ or 24, PostgreSQL 17, separate dev and `_test` databases, Vite/Express, correct `WEB_ORIGIN=http://127.0.0.1:5173`, and a local copy of the fail-closed starter are available.
- Week 9 learner's actual persistence requirements are passed, and the prior shared task table is preserved rather than assigned to new users.
- Observer documents blockers without silently bypassing failed requirements; if PostgreSQL is unavailable, allow conceptual remediation but leave project self-verification gate incomplete.

## Observation plan

| Stage | Learner behavior to observe | Evidence and failure diagnosis |
|---|---|---|
| Entry diagnostic | Trace React → Express → SQL, identify missing Week 9 ownership | Explains authN vs authZ without prompting |
| Session reasoning | Draw login cookie → PostgreSQL session → verified user ID | Avoids copying cookie/secret into notes |
| Credentials | Explain hashed storage and established Argon2id verification | No plaintext in DB, logs or browser progress |
| Migration | Apply schema and inspect users/user_tasks/session tables | Old Week 9 tasks remain untouched; correct DB target |
| Registration | Create fictional account, duplicate and invalid attempts | 201 vs 409/400; redacted responses |
| Login/logout | Session restore, logout, expired/missing session | 200 /me then 401; server-side invalidation |
| CSRF | Submit from trusted and untrusted Origin | Bad Origin 403, no mutation, explain limits |
| Scoped SQL | Examine every owner predicate in list/get/create/update/delete | Session-derived owner, no client ownerId |
| Negative security | Alice creates task, Bob uses Alice ID | Bob GET/PATCH/DELETE 404 and Alice row unchanged |
| React state | Log out and switch user | Old tasks disappear from UI; new account list fetched correctly |
| Tests | Run relevant local unit/HTTP/DB tests with correct DB | Distinguishes actual tested layer from mock |
| Independent debug | Fix introduced missing owner clause or stale task state | Reasoned trace and regression test |
| AI review | Critique one AI-written diff/test | Identifies trust-boundary failure with no leaked secrets |
| Exit | Explain educational reference security limitations | No claims of production certification |

## Critical pass gates

1. All 12 mandatory quiz checkpoints meet **≥5/6 plus essential items**; no unpaid subscription, video or AI API required.
2. Both isolated plain-JS browser suites pass their actual functional tests and are labeled narrowly.
3. All 10 required local attestations are complete with reproducible, redacted evidence. A fake-pool test cannot substitute for a real PostgreSQL or Express check.
4. Unauthenticated task operations fail 401; wrong-origin unsafe operations fail 403; foreign task get/patch/delete fail 404 and **do not change owner data**.
5. Each user sees only own tasks, refresh restores an existing valid session, and logout clears client data **and** invalidates the server session.
6. Old shared Week 9 `tasks` records are preserved without invented user ownership.
7. No production deployment is promoted, no private completed instructor solutions are shipped and no secrets enter browser progress, logs or AI prompts.
8. Student can explain server identity derivation and fix one issue without treating an agent as the security authority.

## Observation / remediation log and eventual review

Record: time spent by concept (not scored), confusing terms, unsuccessful origins/ports, how learner distinguishes 401/403/404/409, accidentally shared cookie jars, forgotten `owner_id` predicates, CSRF mental model, duplicate registration, session persistence, Postgres mismatch, query/route test evidence, wrong feedback/hint and accessibility obstacles. Link observations to checkpoint IDs and proposal for content changes. Changes to approved mastery contracts must receive owner approval; don't silently auto-pass a security gate.

**Human pilot status: pending.** Record participant observations and remaining blockers here when the pilot runs.
