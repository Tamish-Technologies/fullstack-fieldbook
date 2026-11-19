# Week 10 Lesson & Assessment Blueprint — D0 Structural Baseline A-011

> **Week 10 current status (2026-11-17): OWNER STRUCTURALLY APPROVED A-011.** Earlier “draft/pending” passages are historical. Only grouping, proposed mastery methods and source mapping are approved—not learner-facing content, executable grading, security test results or a learner pilot. D0/D1 unsigned; D2 NOT AUTHORIZED.

**Product:** FullStack Fieldbook · Phase 1 / student Week 10  
**Owner status:** **D0 STRUCTURE APPROVED A-011**; Week 9 remains accepted A-010. Finished lesson authoring and verification remain pending.  
**Platform development stage:** **D8** (student Weeks 10–12 curriculum integration), **not authorized for implementation**.  
**Actual source inspected:** original Phase 1 Week 10 teaching-guide Markdown **C01–C38** and **125-file** starter/reference ZIP.  
**Project continuity:** Study Tasks v10: React + Express + PostgreSQL gains registration, server-side sessions and owner-scoped private tasks.

> **Teaching promise:** A student can explain identity and access control, use a maintained password-hashing library, trace a session-based request, test a protected backend, and demonstrate that Alice cannot read, change or delete Bob's tasks even when she knows their IDs. The demonstration uses fictional local accounts. This is **not** a production identity service or security certification.

## 1. Scope and non-negotiable boundaries

- **Keep from Week 9:** React / Vite, Node 22+ / Express, PostgreSQL, `pg` connection pool, validated task title (1–80 chars), JSON task shape `{id,title,completed,createdAt}`, GET/POST/PATCH/DELETE contracts and test/database separation.
- **Add:** `users`, `user_tasks`, PostgreSQL-backed `user_sessions`; register/login/me/logout endpoints, verified session `userId`, Argon2id via established library, HTTP-only session cookies, trusted-origin checks for unsafe requests and per-owner SQL in **every** task operation.
- **Database safety:** The earlier shared Week 9 `tasks` table is not automatically assigned to anyone. Preserve its rows in place; do not invent a trustworthy owner. Only Week 10 `user_tasks` contains private records. Check the target DB before migrations and the `_test` suffix before destructive tests.
- **Session security scope:** Strict same-origin `Origin`/`Referer` guard is an educational local deployment choice. It is not a universally sufficient CSRF system; production deployment needs a separate security review, HTTPS, cookie/proxy correctness and a maintained auth service or production-audited solution.
- **No separate platform backend:** FullStack Fieldbook remains static and offline-capable. It cannot inspect a student's localhost cookies, PostgreSQL, Express API, terminal, Git status or tests. That evidence is learner **self-verification**, not automatic checking.
- **No automatic browser auth simulation presented as real security:** Only pure-JavaScript credential validation and a controlled fake-pool query-capture suite are eligible for isolated `browser-code-auto` checks; neither proves live password hashing, session persistence or database authorization.
- **Out of scope:** OAuth, social sign-on, public user data, production release of educational auth, real account recovery, MFA, organizational roles, session-token storage in localStorage, and public deployment of this training backend.
- **AI collaboration:** Optional and bounded. AI-generated authentication code, migrations and tests require inspection, and no student has to create a paid AI account to pass.

## 2. Prerequisites and safe local setup

A learner entering Week 10 must have passed the **actual** Week 9 required lesson gates, SQL/local-project persistence test and readiness quiz (not simply read its planning document). They should trace React → Express route → repository → PostgreSQL, execute safe parameterized queries and explain why Week 9 tasks persist across a backend restart.

**Student starter:** `starter/` from the private Week 10 reference ZIP; the full `reference-solution/` and instructor key remain private. The Week 10 starter has deliberately **fail-closed** TODOs in auth and task repository modules: incomplete authorization must not accidentally expose shared tasks.

**Local tools:** Node.js **22+** (per original Week 10 package metadata), npm, PostgreSQL, a modern browser, VS Code, and fictional test accounts. `backend/.env.example` documents `DATABASE_URL`, separate `TEST_DATABASE_URL` (`*_test`), `SESSION_SECRET`, `WEB_ORIGIN` and `PORT`. Use the exact training origin `http://127.0.0.1:5173` when following this source's strict local origin guard; localhost is not interchangeable. Do not copy real passwords, cookie values, hashes, DB URLs or `.env` data into the academy or an AI prompt.

**Local commands are future instructions, not commands run for this blueprint:** In `backend`: `npm install`, configure ignored `.env`, `npm run migrate`, `npm run dev`, `npm test` (after package install), and `npm run test:db` **only after verifying dedicated `_test` database name and safety**. In `frontend`: `npm install`, `npm run dev`, `npm test`, and `npm run build` where appropriate. Record actual local results rather than promising a fixed test count.

**Instructor preflight:** preserve old Week 9 tasks, inspect migration SQL, verify `WEB_ORIGIN` and the Vite proxy, ensure fresh distinct fake accounts, review CSRF assumptions and check that the private reference does not get copied into public course assets.

## 3. Proposed lesson sequence and assessment allocation

Preserve existing globally proposed IDs `p1-w10-l01` through `p1-w10-l12`; all 12 lessons are **required**. Prerequisites default to linear L01 → L12, beginning after Week 9 graduation. Actual unlocking is based on explicit stable prerequisite IDs, not merely display order.

| Lesson ID | Student-facing title | Source | Mandatory checkpoint types |
|---|---|---|---|
| `p1-w10-l01` | Identity, authentication and authorization | C01–C05 | quiz-auto |
| `p1-w10-l02` | Sessions, cookies and login lifecycle | C06,C08,C15 | quiz-auto |
| `p1-w10-l03` | Password hashing and secure handling | C07–C08,C23,C38(D) | quiz-auto + local-project-self-verified |
| `p1-w10-l04` | Users, task ownership and migrations | C03,C09–C10,C18,C38(A) | quiz-auto + local-project-self-verified |
| `p1-w10-l05` | Registration and input validation | C11–C13,C38(B,C,H) | quiz-auto + browser-code-auto + local-project-self-verified |
| `p1-w10-l06` | Login, /me, logout and sessions | C06,C11,C14–C15,C38(D,E,H) | quiz-auto + local-project-self-verified |
| `p1-w10-l07` | CSRF and origin controls | C06,C16,C23,C38(F) | quiz-auto + local-project-self-verified |
| `p1-w10-l08` | RequireAuth and database ownership clauses | C17–C19,C24,C38(G,H) | quiz-auto + browser-code-auto + local-project-self-verified |
| `p1-w10-l09` | React login/session state | C20–C22,C38(I,J) | quiz-auto + local-project-self-verified |
| `p1-w10-l10` | Two-account access control tests | C23–C25,C31,C36 | quiz-auto + local-project-self-verified |
| `p1-w10-l11` | Security-conscious AI code review | C23,C25–C26,C32–C35 | quiz-auto + local-project-self-verified |
| `p1-w10-l12` | Week 10 multi-user acceptance gate | C01–C04,C24,C27–C38 | quiz-auto + local-project-self-verified |

**Proposed DEC-21 allocation:** **27 checkpoints** = **24 required** (12 quiz groups × 6 scored item intents = **72 question slots**, 2 isolated plain-JavaScript browser-code suites, and 10 actual locally self-verified activities) + **3 optional enrichment checkpoints**. Six-item quizzes require **at least 5 correct** and every designated essential question correct. These are *planned requirements*, not authored learner questions, implemented grading code or executed tests.

## 4. Individual lesson authoring cards (for future student content)

Each card is a complete **authoring contract**, not the final self-paced lesson. During D8, expand it into an understandable explanation, annotated examples, independent practice, hints, actionable feedback, accessible quiz items and verified local test instructions. Do not copy the private instructor solution into the public client bundle.

### L01 — Identity, authentication and authorization

- **ID / prerequisite:** `p1-w10-l01`; Week 9 required completion gates. **Source:** C01–C05.
- **Observable outcomes:** Distinguish an identifier, proof of identity and permission to access a resource; Classify HTTP 401, 403, 404 and 409 in the Week 10 API story; Explain why a React login screen does not protect a database record.
- **Concept and worked-example specification:** Trace an unauthenticated `GET /api/tasks` → 401, a logged-in request for another user’s task ID → 404, and a valid own-task request → 200. The API, not React, makes the decision.
- **Independent practice:** Sort eight fictional request cards into authentication, authorization, validation or availability. Draw the transition from the shared Week 9 `tasks` table to owner-scoped tasks.
- **Misconception / debugging challenge:** “A logged-in user is allowed to edit any task ID.” Authentication does not grant universal authorization.
- **Progressive hints:** H1 — Ask: who are you? versus which record may you use? H2 — Imagine Bob sends the HTTP request directly, bypassing the UI. H3 — Find the place where an authenticated `userId` must be compared with a task owner.
- **Required checkpoints:** `p1-w10-l01-c01 (quiz-auto)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** Differentiate identity from authentication; Authorization vs authentication on a known ID; Status 401 for missing login; Essential: Frontend button hiding cannot enforce ownership; 404 for missing or foreign task; What data survives PostgreSQL restart versus login expiry. **Essential intent** is flagged in the item plan for education review.

### L02 — Sessions, cookies and login lifecycle

- **ID / prerequisite:** `p1-w10-l02`; `p1-w10-l01`. **Source:** C06,C08,C15.
- **Observable outcomes:** Diagram login → session cookie → server-side session → authenticated request; Distinguish session identifier from password, user ID and access token; Explain `HttpOnly`, `SameSite` and the purpose of HTTPS/Secure cookies.
- **Concept and worked-example specification:** Draw the response `Set-Cookie: study.sid=<opaque>; HttpOnly; SameSite=Lax` and the later browser-sent cookie; show the server querying session state instead of receiving a password again.
- **Independent practice:** Inspect a redacted mock Network trace, label which fields must never be pasted into chat, and predict behavior after logout, cookie expiry and refresh.
- **Misconception / debugging challenge:** “A cookie by itself guarantees the request is authorized.” Server validation and task ownership are still necessary.
- **Progressive hints:** H1 — Separate the opaque cookie value from server-held session data. H2 — Trace what an invalid or expired session ID maps to. H3 — Ask why browsers can automatically attach cookies and how that affects CSRF.
- **Required checkpoints:** `p1-w10-l02-c01 (quiz-auto)`.
- **Optional enrichment:** `p1-w10-l02-c02`. Optional: annotate a mock login / refreshed session network timeline without exposing cookie values.
- **Quiz design, six scored intents:** Role of an opaque session ID; Where user ID is stored with server sessions; `HttpOnly` prevents normal JS access, not all attacks; `SameSite` is defense-in-depth, not a complete CSRF proof; Production `Secure` requires HTTPS; Logout invalidates the server session. **Essential intent** is flagged in the item plan for education review.

### L03 — Password hashing and secure handling

- **ID / prerequisite:** `p1-w10-l03`; `p1-w10-l02`. **Source:** C07–C08,C23,C38(D).
- **Observable outcomes:** Distinguish hashing and encryption and explain why plaintext storage is unacceptable; Describe a salted, slow password hash and verified library workflow; Demonstrate local use of established Argon2id utilities without writing cryptography.
- **Concept and worked-example specification:** Use a diagram showing entered passphrase → established Argon2id hash → stored salted hash; verification checks entered passphrase against the hash without storing it as plain text.
- **Independent practice:** Run the provided backend helper locally with fictional credentials; prove two hashes of the same passphrase need not match byte-for-byte and both verify, then record results without copying hashes or passphrases into the academy.
- **Misconception / debugging challenge:** “We can compare the plaintext password against the database.” We compare via a vetted verification function.
- **Progressive hints:** H1 — Focus on what is saved in the users table. H2 — Different salts can produce different hashes for the same candidate. H3 — Use an established library; do not invent a custom hash.
- **Required checkpoints:** `p1-w10-l03-c01 (quiz-auto)`, `p1-w10-l03-c02 (local-project-self-verified)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** Hashing vs encrypting passwords; Why per-hash salts matter; Why deliberately slow password hash; Essential: No plaintext or reversible password storage; Why login verification differs from hashing again and string equality; Why educational auth code is not production-ready. **Essential intent** is flagged in the item plan for education review.
- **Local learner attestation:** Run established hashing/verify utility using fictional practice credentials only; confirm no raw password is stored or logged; explain salts and the limitations of the local demo. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L04 — Users, task ownership and migrations

- **ID / prerequisite:** `p1-w10-l04`; `p1-w10-l03`. **Source:** C03,C09–C10,C18,C38(A).
- **Observable outcomes:** Model `users`, `user_tasks`, `user_sessions` and the owner foreign key; Explain why preexisting Week 9 shared tasks cannot be assigned to a newly registered user; Apply a non-destructive migration and distinguish schema development from auth logic.
- **Concept and worked-example specification:** Draw `users(id UUID)` one-to-many `user_tasks(owner_id UUID FK)`. Explain retaining old `tasks` separately; new users get new `user_tasks` rows.
- **Independent practice:** Inspect the named local database before migration; back up any valuable learning records; apply migration and verify users/user_tasks/session tables while old `tasks` rows remain untouched.
- **Misconception / debugging challenge:** “Assign old tasks to the first account to make the app work.” That could disclose shared historical data.
- **Progressive hints:** H1 — Identify which previous rows have a trustworthy owner. H2 — Do not invent ownership information where none existed. H3 — Recheck migration target database and existing table before running.
- **Required checkpoints:** `p1-w10-l04-c01 (quiz-auto)`, `p1-w10-l04-c02 (local-project-self-verified)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** Users UUID as identifier; Foreign-key ownership model; Separate session storage; Essential: Never silently reassign shared old tasks; Unique normalized email constraints; Migration does not automatically authenticate anyone. **Essential intent** is flagged in the item plan for education review.
- **Local learner attestation:** On an isolated local practice DB, back up or preserve the Week 9 `tasks` table, run Week 10 migration, inspect users/user_tasks/user_sessions and confirm old rows were not reassigned. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L05 — Registration and input validation

- **ID / prerequisite:** `p1-w10-l05`; `p1-w10-l04`. **Source:** C11–C13,C38(B,C,H).
- **Observable outcomes:** Define POST /api/auth/register contract including 201/400/409; Validate and normalize email and bounded password input on the server; Explain hashing, parameterized INSERT and public-response redaction.
- **Concept and worked-example specification:** Trace fictional `Student@Example.Test` through normalized email → validation → Argon2id hash → `INSERT ... RETURNING id,email` → regenerated server session → 201 `{user}` without password/hash.
- **Independent practice:** First complete an isolated pure-JavaScript validator using supplied synthetic inputs; then finish user repository registration locally and observe valid, invalid and duplicate registrations. Do not store credential strings in the Fieldbook browser.
- **Misconception / debugging challenge:** “Frontend validation means the backend can accept any JSON.” Attackers can bypass the form.
- **Progressive hints:** H1 — Validate type and bounds before database work. H2 — Keep the password case-sensitive even though email is normalized. H3 — Return only public user fields, never the hash.
- **Required checkpoints:** `p1-w10-l05-c01 (quiz-auto)`, `p1-w10-l05-c02 (browser-code-auto)`, `p1-w10-l05-c03 (local-project-self-verified)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** Expected request body; Email normalization semantics; Registration passphrase length and type; Duplicate normalized email → 409; Essential: Backend must validate and never send password/hash to UI; Public response only `id,email`. **Essential intent** is flagged in the item plan for education review.
- **Browser-code assessment:** Pure-JS `normalizeEmail`/`validateCredentials` with synthetic payloads only: valid mixed-case email, malformed/type errors, short/oversize password, array body, extra-field rejection and case-preserving password; all mandatory tests. **Boundary:** only isolated pure JS; this does not verify Express, Argon2 or PostgreSQL.
- **Local learner attestation:** Use the Week 10 local starter and real PostgreSQL to implement `users.create/getByEmail/getById` with parameterized SQL and run register/duplicate/invalid-request API checks with fictional accounts. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L06 — Login, /me, logout and sessions

- **ID / prerequisite:** `p1-w10-l06`; `p1-w10-l05`. **Source:** C06,C11,C14–C15,C38(D,E,H).
- **Observable outcomes:** Explain login, session regeneration, /me and logout as one lifecycle; Differentiate invalid credentials 401 from valid login 200 and current-user 200; Demonstrate that refreshing retains a valid session and logout invalidates it.
- **Concept and worked-example specification:** Diagram `POST /login` → Argon2id verification → session regeneration → `GET /me` 200; after logout, `GET /me` returns 401. Logout 204 has an empty body.
- **Independent practice:** Run the local auth lifecycle with fictional Alice credentials; inspect redacted Network headers (not actual cookie values), show refresh and logout behavior, and explain why sessions must be invalidated server-side.
- **Misconception / debugging challenge:** “Clear the React user state and logout is complete.” Server session must be destroyed; 204 has no JSON to parse.
- **Progressive hints:** H1 — Trace one request including the attached cookie. H2 — What record must be invalidated when user signs out? H3 — Check response codes after logout instead of relying on button appearance.
- **Required checkpoints:** `p1-w10-l06-c01 (quiz-auto)`, `p1-w10-l06-c02 (local-project-self-verified)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** Login lookup vs registration insert; Generic wrong-login message; Regenerate session on authentication; Essential: Logout invalidates session server-side; GET /auth/me and cookie behavior; 204 logout response must not be parsed as JSON. **Essential intent** is flagged in the item plan for education review.
- **Local learner attestation:** Use local Express + PostgreSQL to demonstrate 201 register, 200 login, 200 `/me`, successful session restoration on refresh, 204 logout and 401 after logout; keep cookie values private. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L07 — CSRF and origin controls

- **ID / prerequisite:** `p1-w10-l07`; `p1-w10-l06`. **Source:** C06,C16,C23,C38(F).
- **Observable outcomes:** Describe why ambient cookies create CSRF risks; Explain strict origin/referer checking for unsafe requests in this local teaching setup; Distinguish 403 untrusted origin from 401 missing authentication.
- **Concept and worked-example specification:** Compare `POST /api/tasks` from the exact allowlisted `http://127.0.0.1:5173` with a state-changing request from an untrusted Origin, expected 403. State the limits of relying on Origin/Referer checks in varied deployments.
- **Independent practice:** Test the local origin middleware with trusted, untrusted, absent and malformed Origin/Referer cases using fictional input. Explain why SameSite flags alone do not replace route-level anti-CSRF review.
- **Misconception / debugging challenge:** “SameSite=Lax removes every CSRF concern.” It reduces exposure but is not universal protection.
- **Progressive hints:** H1 — Notice when the browser attaches cookies automatically. H2 — Look at HTTP method: read-only vs state-changing. H3 — Check whether the allowlist accepts only the configured exact web origin.
- **Required checkpoints:** `p1-w10-l07-c01 (quiz-auto)`, `p1-w10-l07-c02 (local-project-self-verified)`.
- **Optional enrichment:** `p1-w10-l07-c03`. Optional: compare token-based CSRF defense and Origin/Referer controls conceptually; avoid implementing a new auth library.
- **Quiz design, six scored intents:** Definition of CSRF; Why cookie sessions are relevant; Essential: Unsafe cross-origin request must fail closed; Distinguish origin failure 403 from session failure 401; Origin/Referer checks have deployment assumptions; What a later security review must revisit. **Essential intent** is flagged in the item plan for education review.
- **Local learner attestation:** Run local origin guard tests against trusted and untrusted origins, confirm state-changing requests fail with 403 and no task mutation, and state that this is an educational same-origin defense, not an audited production solution. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L08 — RequireAuth and database ownership clauses

- **ID / prerequisite:** `p1-w10-l08`; `p1-w10-l07`. **Source:** C17–C19,C24,C38(G,H).
- **Observable outcomes:** Explain why `requireAuth` protects routes but is insufficient by itself; Use verified server `userId` for list/create/get/update/delete queries; Explain parameterized `owner_id = $1 AND id = $2` and 404 for foreign/missing tasks.
- **Concept and worked-example specification:** Trace Bob calling PATCH on Alice task ID 7: a valid Bob session reaches a repository query using Bob’s server-side user ID + task ID 7; zero rows → 404; Alice data unchanged.
- **Independent practice:** First use a pure-JS fake-pool query capture lab; then implement owner-scoped SQL in the local repository and prove every route uses session-supplied identity. Inspect `completed:false` PATCH behavior.
- **Misconception / debugging challenge:** “Checking `req.body.ownerId` is safe.” Owner ID must come from a verified server session; untrusted client input must not choose the owner.
- **Progressive hints:** H1 — Where does this owner ID originate? H2 — Inspect both `owner_id` and task ID in query filters. H3 — Test list/get/update/delete, not only create.
- **Required checkpoints:** `p1-w10-l08-c01 (quiz-auto)`, `p1-w10-l08-c02 (browser-code-auto)`, `p1-w10-l08-c03 (local-project-self-verified)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** Authentication middleware task; Essential: All task SQL operations owner-scoped; Client-supplied ownerId is untrusted; Why 404 for missing or foreign task; Parameterized query for owner and ID; Preserving `completed:false` in PATCH. **Essential intent** is flagged in the item plan for education review.
- **Browser-code assessment:** Isolated fake-pool plain-JS repository exercise: record list/get/create/update/delete query SQL and values for owner A/B, verify `owner_id` filters, owner value from injected server-verified argument, 404-equivalent missing results, and PATCH `false`. No actual SQL/Express security claim. **Boundary:** only isolated pure JS; this does not verify Express, Argon2 or PostgreSQL.
- **Local learner attestation:** Implement owner-scoped methods in local task repository, test list/get/create/update/delete for verified `ownerId`, and demonstrate 404/no mutation when another logged-in user requests a foreign task ID. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L09 — React login/session state

- **ID / prerequisite:** `p1-w10-l09`; `p1-w10-l08`. **Source:** C20–C22,C38(I,J).
- **Observable outcomes:** Understand signed-out/loading/signed-in states with server-backed session restoration; Explain cookie-based auth API calls and safe task-state clearing on logout; Build React forms without storing auth tokens or passwords in localStorage.
- **Concept and worked-example specification:** Show `useAuth` loading → `GET /api/auth/me` → authenticated user or signed-out 401; after logout, clear the user and cached task list before navigating to sign-in.
- **Independent practice:** Run the local React app and verify register/login forms, refresh, error display, and logout clearing old tasks. Check that the frontend does not send `ownerId` or persist credentials.
- **Misconception / debugging challenge:** “Keeping the previous user’s task state is fine because the API is protected.” It leaks stale private data in the browser UI.
- **Progressive hints:** H1 — Watch the session restoration request before loading tasks. H2 — What should a new user see before their tasks are fetched? H3 — After logout, inspect both auth state and stale task components.
- **Required checkpoints:** `p1-w10-l09-c01 (quiz-auto)`, `p1-w10-l09-c02 (local-project-self-verified)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** Auth loading vs unauthenticated state; What GET /me restores; Credentials sent via same-origin cookie; Essential: Clear private task data on logout/account switch; No JWT/password in browser storage; Protected UI alone not backend authorization. **Essential intent** is flagged in the item plan for education review.
- **Local learner attestation:** Run local React + Express: complete login/signup state, session restore on refresh, logout/private-task clear, and no task fetch before authentication is resolved; inspect Network errors. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L10 — Two-account access control tests

- **ID / prerequisite:** `p1-w10-l10`; `p1-w10-l09`. **Source:** C23–C25,C31,C36.
- **Observable outcomes:** Write a reproducible two-account isolation test for list/read/edit/delete; Explain why negative authorization tests are stronger than merely successful login; Distinguish HTTP 401, foreign 404 and untrusted-origin 403 with evidence.
- **Concept and worked-example specification:** Alice creates task A, Bob creates task B; Bob’s GET/PATCH/DELETE for A must all return 404, leaving A unchanged; each user sees only own list, and logout produces 401.
- **Independent practice:** Execute two fictional accounts with separate sessions and record redacted HTTP statuses, task IDs, unchanged database rows, and one bug that fails a negative authorization test. Use a dedicated `_test` DB for destructive suites.
- **Misconception / debugging challenge:** “GET list filters by owner, so update and delete must be safe too.” Each repository method needs independent owner checks.
- **Progressive hints:** H1 — Use different sessions/cookie jars so accounts are not accidentally swapped. H2 — Run GET before/after PATCH/DELETE to prove no mutation. H3 — Verify both list filters and ID-targeted operations at the database layer.
- **Required checkpoints:** `p1-w10-l10-c01 (quiz-auto)`, `p1-w10-l10-c02 (local-project-self-verified)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** Why two users are required for isolation proof; 401 without session; Essential: Foreign GET/PATCH/DELETE all deny, leave row unchanged; 404 avoids resource existence disclosure; CSRF 403 is separate mechanism; Why user ID trust originates from the session. **Essential intent** is flagged in the item plan for education review.
- **Local learner attestation:** Run local two-account negative HTTP and SQL tests; prove own CRUD works and all foreign list/GET/PATCH/DELETE attempts fail without altering data. Inspect `_test` target before destructive integration tests. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L11 — Security-conscious AI code review

- **ID / prerequisite:** `p1-w10-l11`; `p1-w10-l10`. **Source:** C23,C25–C26,C32–C35.
- **Observable outcomes:** Review AI-generated authentication changes for unsafe trust boundaries; Identify skipped authorization, plaintext logging, client-supplied owner IDs and invalid session behavior; Explain what AI checks cannot substitute for local proof.
- **Concept and worked-example specification:** Present a small simulated agent diff: route accepts `ownerId` from request body, user model returns `password_hash`, logout only hides React UI. Student identifies issues and proposes guarded tests.
- **Independent practice:** Ask an agent to review (not execute) selected security changes, then independently audit routes, `user_tasks` SQL predicates, logged fields, session destruction and CSRF. Document two findings and one rejected suggestion.
- **Misconception / debugging challenge:** “AI generated a test, so authentication must be secure.” Review actual assertions and run negative scenarios.
- **Progressive hints:** H1 — Look at every input crossing browser → server. H2 — Inspect what fields leave backend in JSON or logs. H3 — Try the Alice/Bob test even if a passing happy-path test exists.
- **Required checkpoints:** `p1-w10-l11-c01 (quiz-auto)`, `p1-w10-l11-c02 (local-project-self-verified)`.
- **Optional enrichment:** `p1-w10-l11-c03`. Optional: compare two code-review suggestions from different AI agents and justify rejecting an unsafe one.
- **Quiz design, six scored intents:** Spot missing owner filter; Spot leaked password_hash; Why generated tests need scrutiny; Essential: Never trust client ownerId or exposed secrets; Distinguish educational reference from production security; Correct review order: diff, tests, negative cases. **Essential intent** is flagged in the item plan for education review.
- **Local learner attestation:** Perform a structured local security review (with or without an AI assistant), record two trust-boundary findings, fix at least one locally, and show a failing-then-passing relevant test. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

### L12 — Week 10 multi-user acceptance gate

- **ID / prerequisite:** `p1-w10-l12`; `p1-w10-l11`. **Source:** C01–C04,C24,C27–C38.
- **Observable outcomes:** Demonstrate end-to-end registration/login/tasks/logout with real local PostgreSQL; Prove user-specific authorization across every task API method, including guessed IDs; Explain limitations of the educational authentication example and Week 11 hardening goals.
- **Concept and worked-example specification:** Present the complete local scenario: Alice registers and saves task; Bob registers and sees empty list; Bob’s GET/PATCH/DELETE against Alice ID all return 404; Alice’s task is unchanged; logout returns 204 and subsequent GET returns 401.
- **Independent practice:** Complete all Week 10 required gates, run documented backend/frontend tests and carefully scoped DB tests, record redacted status/results, explain one bug without AI, and commit only nonsecret project files.
- **Misconception / debugging challenge:** “Working signup and a visually private list are equivalent to secure ownership.” Require negative HTTP/database evidence.
- **Progressive hints:** H1 — Use the request flow: browser cookie → session → requireAuth → repository owner filter. H2 — Check your SQL predicates against every task method. H3 — Do a fresh Alice/Bob reproduction rather than only replaying saved screenshots.
- **Required checkpoints:** `p1-w10-l12-c01 (quiz-auto)`, `p1-w10-l12-c02 (local-project-self-verified)`.
- **Optional enrichment:** None.
- **Quiz design, six scored intents:** AuthN vs authZ in one request; Session cookie and logout semantics; Owner scope in list/read/write/delete; Essential: Prove foreign task cannot be mutated; What local tests demonstrate, and what they do not; Why this educational stack is not production-ready. **Essential intent** is flagged in the item plan for education review.
- **Local learner attestation:** Demonstrate full Study Tasks v10 with two fictional users and isolated tasks, session restoration/logout, three foreign-ID denials with unchanged rows, safe migration, redacted test evidence and a brief architecture explanation. **Label:** “Self-verified locally”; no secrets or actual session identifiers stored in course progress.

## 5. Weekly practical project contract — Study Tasks v10

**Start state:** Week 9's working React + Express + PostgreSQL app has a **shared** `tasks` table, no multi-user identity or protected API. **End state:** the same user-facing task CRUD contract operates on private `user_tasks` owned by the verified session user; registration, login, current-user, logout and session restoration function locally. Week 9 shared rows are preserved, not silently assigned.

**Required final evidence, collected as bounded learner attestations after actually running commands:**

1. Safe local migrations create `users`, `user_tasks` and server-side session storage; old `tasks` records remain unchanged and no real secrets are committed.
2. Valid fictional registration returns `201 {user}` without password/hash; invalid details fail appropriately, normalized duplicate email is rejected, and login failures are generic.
3. Login establishes a server-side session; `/api/auth/me` works across refresh and logout invalidates the session; subsequent protected requests return `401`.
4. React does not store password/session ID in `localStorage`; task UI does not fetch private data while auth state is unresolved and clears previous-user state upon logout/switch.
5. Task list/get/create/update/delete queries use **server-session-derived owner ID**, not a client-supplied owner. Every ID-specific operation scopes on **both** owner and task ID.
6. Alice's private task is absent from Bob's list. With Bob's logged-in session, GET, PATCH and DELETE of Alice's known task ID return `404`, and Alice's database row is unchanged.
7. A state-changing request with an untrusted Origin is rejected as `403`, without modifying data. Explain the deployment assumptions of the same-origin defense.
8. Relevant local backend/frontend tests are run. For any destructive database test, the learner confirms the dedicated `_test` DB name before execution and records redacted pass/fail observations.
9. Student can trace an example end-to-end request and independently debug at least one small auth/ownership issue without blindly accepting AI code.
10. The student explains why this is **an educational security architecture**, not a production-certified identity system.

**Server API envelope continuity:** `GET /api/tasks` returns `{data,count}`; POST 201 `{data}`, PATCH 200 `{data}`, DELETE 204 **empty**; `GET /api/tasks/:id` is 404 when missing or foreign; unauthed task routes are 401. `GET /api/auth/me` is 200 `{user}` or 401; logout is 204. Unexpected DB failure never leaks a connection URL or raw SQL.

**Explicit non-goals:** No public hosting of a homemade auth stack, password reset, social sign-in, universal CSRF claim, new organization roles, cloud tracking, or cross-device student progress.

## 6. Learner-facing assessment and feedback contract

- **Quizzes:** 12 groups of six future scored items; each requires ≥5/6 correct plus all flagged essential items. Unlimited retry with progressively more informative hints and alternate reviewed questions where feasible. Question wording/answer keys are not yet completed.
- **Browser automatic checks:** Only `p1-w10-l05-c02` (pure-JS credential validation) and `p1-w10-l08-c02` (fake-pool owner-scoped query capture). Tests must use synthetic values, run in isolated execution, and report only their actual scope. Do not execute production auth code or expose a session cookie to the runner.
- **Local project checks:** Ten checkpoints have explicit learner-run commands and acceptance criteria. The academy cannot inspect local auth cookies, HTTP calls, database logs or Git; show **“Self-verified locally”** and preserve only bounded redacted observation text/checkbox evidence.
- **Security-critical essential questions:** Emphasize server-enforced ownership, not logging secrets or plaintext passwords, session invalidation, CSRF limitations, and negative cross-account tests. Avoid arbitrary trick questions.
- **Weekly graduation:** Complete all 24 required checkpoints including L12 practical demonstration, and pass L12 readiness quiz; optional tasks never block. The completion summary must say **“includes self-verified local work.”**
- **Review/reset:** Normal retries do not revoke earlier mastery; formal resets follow approved downstream dependency rules. All learner data remains local; backups contain no credentials.

## 7. Teaching schedule converted to independent learning

- **Before Session 1 / first self-study block:** refresh Week 9 architecture; complete L01–L03 conceptual lessons and optional L02 cookie timeline. Do not prematurely run session middleware in the browser runner.
- **Session 1 (90 min, instructor reference):** 10 min independent HTTP request trace; 20 min authN/authZ/cookie/pw mental models; 25 min users + migration walkthrough; 25 min register/login API tracing; 10 min student explanation and security review. Real project work is self-verified, and asynchronous homework may take longer than this session.
- **Between sessions (2–3 h self-study):** finish L04–L07 with local migrations, validation, registration, session and origin check lab; keep false/negative test outcomes recorded accurately.
- **Session 2 (90 min):** 10 min recap; 20 min owner-scoped SQL; 20 min React auth state; 25 min Alice/Bob negative tests; 10 min AI-generated diff review; 5 min evidence/checklist review.
- **After Session 2 (2–3 h):** complete L08–L12 and Week 10 local project acceptance. Extra accessibility or security research stays optional; prioritize isolation correctness over UI polish.

The future self-paced lesson player must allow pausing/reviewing a topic and retrying; it must not force students to wait for mentor sessions or require a paid AI assistant.

## 8. Authoring and review blockers, not hidden assumptions

- [ ] Every C01–C38 chapter and all 125 source archive paths have a reviewed disposition; initial source trace is included but human educational review still needed.
- [ ] All 72 quiz intents become technically accurate learner questions with distractor rationales, meaningful feedback, essential flags and equivalent retry variants.
- [ ] Both isolated browser suites receive security review, correct runtime isolation, deterministic expected results and explicit scope disclaimers.
- [ ] Local instructions are run against current supported dependencies and a safely isolated `_test` DB; origin/port behavior is verified in the actual learner environment.
- [ ] Both user sessions used in the isolation lab are independent and all foreign-ID negative tests check database **non-mutation**, not just a UI toast.
- [ ] Old shared Week 9 records are preserved; no unsafe automatic ownership assignment is introduced.
- [ ] Student-facing examples cannot leak the instructor answer key or complete reference code from private archives.
- [ ] A real later D8 learner pilot validates comprehension, setup instructions and failure-recovery; none has yet happened.
- [ ] Global D0 curriculum/reset review and D1 visual approvals remain pending; D2 coding is **NOT AUTHORIZED**.

**Owner review scope:** Approve or revise this **12-lesson / 27-checkpoint planning structure only**. This does not sign off runnable auth software, security robustness, finished content, a learner pilot, D0 or D1.
