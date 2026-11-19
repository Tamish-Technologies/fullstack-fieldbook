# Week 10 Checkpoint Inventory — DEC-21 Contract (A-011 Structural Approval)

> **Week 10 current status (2026-11-17): OWNER STRUCTURALLY APPROVED A-011.** Earlier “draft/pending” passages are historical. Only grouping, proposed mastery methods and source mapping are approved—not learner-facing content, executable grading, security test results or a learner pilot. D0/D1 unsigned; D2 NOT AUTHORIZED.

**Status:** Week 10 planning structure OWNER APPROVED A-011; unimplemented assessments and real security tests still pending. No learner question bank, browser sandbox tests, local HTTP/PostgreSQL tests, auth security audit or D8 pilot has been executed for Fieldbook. D0/D1 unsigned; D2 **NOT AUTHORIZED**.

**Totals:** 27 checkpoints = **24 required** (12 `quiz-auto`, 2 `browser-code-auto`, 10 `local-project-self-verified`) + **3 `optional-enrichment`**. All stable IDs are unique. Each quiz has six proposed scored item slots, pass **≥5/6** *and* all reviewed essential items.

## 1. Complete checkpoint register

| Stable checkpoint ID | DEC-21 method | Gate | Specific future assessment contract |
|---|---|---|---|
| `p1-w10-l01-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Differentiate identity from authentication; Authorization vs authentication on a known ID; Status 401 for missing login; Essential: Frontend button hiding cannot enforce ownership; 404 for missing or foreign task; What data survives PostgreSQL restart versus login expiry |
| `p1-w10-l02-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Role of an opaque session ID; Where user ID is stored with server sessions; `HttpOnly` prevents normal JS access, not all attacks; `SameSite` is defense-in-depth, not a complete CSRF proof; Production `Secure` requires HTTPS; Logout invalidates the server session |
| `p1-w10-l02-c02` | `optional-enrichment` | Optional | Optional: annotate a mock login / refreshed session network timeline without exposing cookie values. |
| `p1-w10-l03-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Hashing vs encrypting passwords; Why per-hash salts matter; Why deliberately slow password hash; Essential: No plaintext or reversible password storage; Why login verification differs from hashing again and string equality; Why educational auth code is not production-ready |
| `p1-w10-l03-c02` | `local-project-self-verified` | Required | Run established hashing/verify utility using fictional practice credentials only; confirm no raw password is stored or logged; explain salts and the limitations of the local demo. |
| `p1-w10-l04-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Users UUID as identifier; Foreign-key ownership model; Separate session storage; Essential: Never silently reassign shared old tasks; Unique normalized email constraints; Migration does not automatically authenticate anyone |
| `p1-w10-l04-c02` | `local-project-self-verified` | Required | On an isolated local practice DB, back up or preserve the Week 9 `tasks` table, run Week 10 migration, inspect users/user_tasks/user_sessions and confirm old rows were not reassigned. |
| `p1-w10-l05-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Expected request body; Email normalization semantics; Registration passphrase length and type; Duplicate normalized email → 409; Essential: Backend must validate and never send password/hash to UI; Public response only `id,email` |
| `p1-w10-l05-c02` | `browser-code-auto` | Required | Pure-JS `normalizeEmail`/`validateCredentials` with synthetic payloads only: valid mixed-case email, malformed/type errors, short/oversize password, array body, extra-field rejection and case-preserving password; all mandatory tests. |
| `p1-w10-l05-c03` | `local-project-self-verified` | Required | Use the Week 10 local starter and real PostgreSQL to implement `users.create/getByEmail/getById` with parameterized SQL and run register/duplicate/invalid-request API checks with fictional accounts. |
| `p1-w10-l06-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Login lookup vs registration insert; Generic wrong-login message; Regenerate session on authentication; Essential: Logout invalidates session server-side; GET /auth/me and cookie behavior; 204 logout response must not be parsed as JSON |
| `p1-w10-l06-c02` | `local-project-self-verified` | Required | Use local Express + PostgreSQL to demonstrate 201 register, 200 login, 200 `/me`, successful session restoration on refresh, 204 logout and 401 after logout; keep cookie values private. |
| `p1-w10-l07-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Definition of CSRF; Why cookie sessions are relevant; Essential: Unsafe cross-origin request must fail closed; Distinguish origin failure 403 from session failure 401; Origin/Referer checks have deployment assumptions; What a later security review must revisit |
| `p1-w10-l07-c02` | `local-project-self-verified` | Required | Run local origin guard tests against trusted and untrusted origins, confirm state-changing requests fail with 403 and no task mutation, and state that this is an educational same-origin defense, not an audited production solution. |
| `p1-w10-l07-c03` | `optional-enrichment` | Optional | Optional: compare token-based CSRF defense and Origin/Referer controls conceptually; avoid implementing a new auth library. |
| `p1-w10-l08-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Authentication middleware task; Essential: All task SQL operations owner-scoped; Client-supplied ownerId is untrusted; Why 404 for missing or foreign task; Parameterized query for owner and ID; Preserving `completed:false` in PATCH |
| `p1-w10-l08-c02` | `browser-code-auto` | Required | Isolated fake-pool plain-JS repository exercise: record list/get/create/update/delete query SQL and values for owner A/B, verify `owner_id` filters, owner value from injected server-verified argument, 404-equivalent missing results, and PATCH `false`. No actual SQL/Express security claim. |
| `p1-w10-l08-c03` | `local-project-self-verified` | Required | Implement owner-scoped methods in local task repository, test list/get/create/update/delete for verified `ownerId`, and demonstrate 404/no mutation when another logged-in user requests a foreign task ID. |
| `p1-w10-l09-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Auth loading vs unauthenticated state; What GET /me restores; Credentials sent via same-origin cookie; Essential: Clear private task data on logout/account switch; No JWT/password in browser storage; Protected UI alone not backend authorization |
| `p1-w10-l09-c02` | `local-project-self-verified` | Required | Run local React + Express: complete login/signup state, session restore on refresh, logout/private-task clear, and no task fetch before authentication is resolved; inspect Network errors. |
| `p1-w10-l10-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Why two users are required for isolation proof; 401 without session; Essential: Foreign GET/PATCH/DELETE all deny, leave row unchanged; 404 avoids resource existence disclosure; CSRF 403 is separate mechanism; Why user ID trust originates from the session |
| `p1-w10-l10-c02` | `local-project-self-verified` | Required | Run local two-account negative HTTP and SQL tests; prove own CRUD works and all foreign list/GET/PATCH/DELETE attempts fail without altering data. Inspect `_test` target before destructive integration tests. |
| `p1-w10-l11-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). Spot missing owner filter; Spot leaked password_hash; Why generated tests need scrutiny; Essential: Never trust client ownerId or exposed secrets; Distinguish educational reference from production security; Correct review order: diff, tests, negative cases |
| `p1-w10-l11-c02` | `local-project-self-verified` | Required | Perform a structured local security review (with or without an AI assistant), record two trust-boundary findings, fix at least one locally, and show a failing-then-passing relevant test. |
| `p1-w10-l11-c03` | `optional-enrichment` | Optional | Optional: compare two code-review suggestions from different AI agents and justify rejecting an unsafe one. |
| `p1-w10-l12-c01` | `quiz-auto` | Required | 6 scored question intents (≥5/6 correct and all essential items). AuthN vs authZ in one request; Session cookie and logout semantics; Owner scope in list/read/write/delete; Essential: Prove foreign task cannot be mutated; What local tests demonstrate, and what they do not; Why this educational stack is not production-ready |
| `p1-w10-l12-c02` | `local-project-self-verified` | Required | Demonstrate full Study Tasks v10 with two fictional users and isolated tasks, session restoration/logout, three foreign-ID denials with unchanged rows, safe migration, redacted test evidence and a brief architecture explanation. |

## 2. Automatically checkable browser tasks — deliberately limited

### `p1-w10-l05-c02` — Pure-JavaScript registration input validator

**Environment:** Isolated, deterministic JS runner with entirely synthetic data. No real passwords, database calls, cookies, cryptographic implementation or Node-only modules.

- **Student task:** Implement a bounded validator/normalizer for a fictional registration payload and return precise, non-sensitive validation results.
- **Required cases:** valid trimmed mixed-case email normalizes; non-object/array body rejected; non-string email/password rejected; short registration passphrase rejected; excessively long inputs rejected; password remains case-sensitive; unexpected privileged fields rejected; malformed email rejected.
- **Passing:** all mandatory behavior tests pass, without relying on particular source-code strings. Browser may truthfully show “Passed automatically (isolated JS input logic only).”
- **Failure feedback:** identify which input class was mishandled; show hint about typing, bounds and normalization; ask a different synthetic value on retry.
- **Security boundary:** A passing validator is **not** evidence that Argon2id, real registration, PostgreSQL constraints, rate limiting or sessions work locally.

### `p1-w10-l08-c02` — Owner-scoped fake-pool repository capture

**Environment:** Plain JS fake `pool.query(sql, values)` implementation, synthetic user/task IDs and in-memory pretend rows. No connection to actual PostgreSQL, Express, a session store or the learner's filesystem.

- **Student task:** Build or complete small repository calls that pass a **server-verified owner ID argument** separately to parameterized SQL and preserve ownership conditions for list/get/create/update/delete.
- **Required cases:** list by owner (with/without completed filter), read/patch/delete by **owner AND ID**, create owner parameter supplied by server not request body, `completed:false` retained, missing/foreign rows produce null/false outcomes; multi-user query capture verifies no owner ID leakage.
- **Passing:** all required assertions; check placeholders and values rather than exact spacing or SQL formatting. Label “Passed automatically (fake-pool JavaScript only).”
- **Failure feedback:** missing `owner_id` WHERE condition, bad parameter order, owner sourced from client, false lost to truthiness, unscoped delete, missing-row response mismatch.
- **Security boundary:** Passing a mocked query capture does **not** independently establish PostgreSQL authorization, SQL injection resistance, secure Express route behavior or end-to-end account isolation. Those remain local tests.

## 3. Local project attestations — evidence required, self-reported honestly

The following required checkpoints must include a specific run command or reproducible manual scenario, expected outcome, troubleshooting help and a learner statement that they actually ran it. Store only a bounded, redacted summary; never request passphrases, cookies, session IDs, hashes, connection URLs, private logs or actual screenshots containing secrets.

### `p1-w10-l03-c02` — Password hashing and secure handling

- **Actual local task:** Run established hashing/verify utility using fictional practice credentials only; confirm no raw password is stored or logged; explain salts and the limitations of the local demo.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l04-c02` — Users, task ownership and migrations

- **Actual local task:** On an isolated local practice DB, back up or preserve the Week 9 `tasks` table, run Week 10 migration, inspect users/user_tasks/user_sessions and confirm old rows were not reassigned.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Safety/negative requirement:** confirm that old Week 9 tasks were not reassigned; for Alice/Bob tests validate foreign-ID access denial **and** unchanged owner data. Use fictional accounts and separately identified sessions.
- **Database target:** confirm dev vs `_test` database before migration or destructive integration scripts; never run unsafe tests on valuable/production data.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l05-c03` — Registration and input validation

- **Actual local task:** Use the Week 10 local starter and real PostgreSQL to implement `users.create/getByEmail/getById` with parameterized SQL and run register/duplicate/invalid-request API checks with fictional accounts.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l06-c02` — Login, /me, logout and sessions

- **Actual local task:** Use local Express + PostgreSQL to demonstrate 201 register, 200 login, 200 `/me`, successful session restoration on refresh, 204 logout and 401 after logout; keep cookie values private.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l07-c02` — CSRF and origin controls

- **Actual local task:** Run local origin guard tests against trusted and untrusted origins, confirm state-changing requests fail with 403 and no task mutation, and state that this is an educational same-origin defense, not an audited production solution.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l08-c03` — RequireAuth and database ownership clauses

- **Actual local task:** Implement owner-scoped methods in local task repository, test list/get/create/update/delete for verified `ownerId`, and demonstrate 404/no mutation when another logged-in user requests a foreign task ID.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l09-c02` — React login/session state

- **Actual local task:** Run local React + Express: complete login/signup state, session restore on refresh, logout/private-task clear, and no task fetch before authentication is resolved; inspect Network errors.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l10-c02` — Two-account access control tests

- **Actual local task:** Run local two-account negative HTTP and SQL tests; prove own CRUD works and all foreign list/GET/PATCH/DELETE attempts fail without altering data. Inspect `_test` target before destructive integration tests.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Safety/negative requirement:** confirm that old Week 9 tasks were not reassigned; for Alice/Bob tests validate foreign-ID access denial **and** unchanged owner data. Use fictional accounts and separately identified sessions.
- **Database target:** confirm dev vs `_test` database before migration or destructive integration scripts; never run unsafe tests on valuable/production data.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l11-c02` — Security-conscious AI code review

- **Actual local task:** Perform a structured local security review (with or without an AI assistant), record two trust-boundary findings, fix at least one locally, and show a failing-then-passing relevant test.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

### `p1-w10-l12-c02` — Week 10 multi-user acceptance gate

- **Actual local task:** Demonstrate full Study Tasks v10 with two fictional users and isolated tasks, session restoration/logout, three foreign-ID denials with unchanged rows, safe migration, redacted test evidence and a brief architecture explanation.
- **Evidence fields:** learner confirms setup or command performed, records observed HTTP status/test outcome and one concise redacted explanation, without sensitive data. This is an *attestation*; academy does not access the local project.
- **Safety/negative requirement:** confirm that old Week 9 tasks were not reassigned; for Alice/Bob tests validate foreign-ID access denial **and** unchanged owner data. Use fictional accounts and separately identified sessions.
- **Database target:** confirm dev vs `_test` database before migration or destructive integration scripts; never run unsafe tests on valuable/production data.
- **Failure remediation:** if environment/dependencies cannot run, let the learner study and retry later; do **not** grant the local project checkpoint based on a simulated browser example.

## 4. Quiz grouping and essential flags (candidate item specifications)

Each L01–L12 has one required `c01` quiz checkpoint linked to six future item IDs `p1-w10-lNN-q01`…`q06`. **The highlighted essential intent below is a provisional recommendation for item authors**, not finished wording. Final reviewer must verify technical accuracy, false-positive risk and equivalent retry items. See `WEEK10_ASSESSMENT_ITEM_PLAN.md`.

| Quiz checkpoint | Planned scored slots | Passing rule |
|---|---|---|
| `p1-w10-l01-c01` | 6 (`p1-w10-l01-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l02-c01` | 6 (`p1-w10-l02-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l03-c01` | 6 (`p1-w10-l03-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l04-c01` | 6 (`p1-w10-l04-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l05-c01` | 6 (`p1-w10-l05-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l06-c01` | 6 (`p1-w10-l06-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l07-c01` | 6 (`p1-w10-l07-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l08-c01` | 6 (`p1-w10-l08-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l09-c01` | 6 (`p1-w10-l09-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l10-c01` | 6 (`p1-w10-l10-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l11-c01` | 6 (`p1-w10-l11-q01…q06`) | ≥5/6 and each reviewed essential question correct |
| `p1-w10-l12-c01` | 6 (`p1-w10-l12-q01…q06`) | ≥5/6 and each reviewed essential question correct |

## 5. Optional enrichment checkpoints

- `p1-w10-l02-c02` — Optional: annotate a mock login / refreshed session network timeline without exposing cookie values. This must **not** appear in the required progress denominator.
- `p1-w10-l07-c03` — Optional: compare token-based CSRF defense and Origin/Referer controls conceptually; avoid implementing a new auth library. This must **not** appear in the required progress denominator.
- `p1-w10-l11-c03` — Optional: compare two code-review suggestions from different AI agents and justify rejecting an unsafe one. This must **not** appear in the required progress denominator.

## 6. Progress/unlock and validation rules

- **Prerequisite:** the prior required lesson gate; L01 additionally requires the actual Week 9 weekly project and readiness gate.
- **Lesson:** all required `cNN` checkpoints complete; optional `cNN` cannot block navigation.
- **Quiz:** `ceil(0.8 × 6) = 5`, plus all essential items; feedback, unlimited retries and reviewed alternatives.
- **Auto-code:** all mandatory functional checks pass in isolated JS, with honest scope labels.
- **Local project:** learner attests exact observed results; academy never reads real HTTP logs or database. If a required real local test is unavailable, the checkpoint remains unfinished until it can be completed.
- **Week graduation:** all 24 required Week 10 checks, notably the final Alice/Bob project proof `p1-w10-l12-c02`, and readiness quiz `p1-w10-l12-c01`. Display “Includes self-verified local work.”
- **Reset/import:** follow `docs/learning/MASTERY_RULES.md` and versioned local progress schema; no bare completed flag or assumed proof from a self-report.
- **Privacy:** safe synthetic credentials in lesson prose are okay, but never store/capture real passwords or secrets in Fieldbook progress or exports.
- **Release status:** proposal only; actual tests, visual exercises and student work are not executed by this D0 artifact.
