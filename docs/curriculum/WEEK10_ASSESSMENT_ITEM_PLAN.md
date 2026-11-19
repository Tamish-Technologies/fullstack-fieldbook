# Week 10 Assessment Item Plan — 72 Scored-Question Intent Slots (D0 Draft)

> **Week 10 current status (2026-11-17): OWNER STRUCTURALLY APPROVED A-011.** Earlier “draft/pending” passages are historical. Only grouping, proposed mastery methods and source mapping are approved—not learner-facing content, executable grading, security test results or a learner pilot. D0/D1 unsigned; D2 NOT AUTHORIZED.

**Boundary:** All Week 10 item IDs and answer intents are a **design plan**. They are not finished multiple-choice questions, distractors, technically validated security claims, or learner-tested auto-grading. The actual reviewed bank must be authored during the separately authorized D8 content stage; no D2 coding is authorized.

**DEC-21:** 12 quiz groups × 6 scored items each = **72 planned question slots**; `ceil(0.8 × 6) = 5` correct minimum and all designated essential questions correct. Unlimited retries and feedback. No paid AI requirement; avoid factual trick questions and secret-handling mistakes.

## 1. Question intent slots, per lesson

Each line names one future scored question slot, its intended correct concept, and the predictable misconception to address. `ESSENTIAL CANDIDATE` still requires education review before item publishing.

### L01 — Identity, authentication and authorization (`p1-w10-l01-c01`)

- `p1-w10-l01-q01` — Differentiate identity from authentication. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l01-q02` — Authorization vs authentication on a known ID. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l01-q03` — Status 401 for missing login. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l01-q04` — **ESSENTIAL CANDIDATE** — Frontend button hiding cannot enforce ownership. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l01-q05` — 404 for missing or foreign task. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l01-q06` — What data survives PostgreSQL restart versus login expiry. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L02 — Sessions, cookies and login lifecycle (`p1-w10-l02-c01`)

- `p1-w10-l02-q01` — Role of an opaque session ID. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l02-q02` — Where user ID is stored with server sessions. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l02-q03` — `HttpOnly` prevents normal JS access, not all attacks. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l02-q04` — `SameSite` is defense-in-depth, not a complete CSRF proof. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l02-q05` — Production `Secure` requires HTTPS. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l02-q06` — Logout invalidates the server session. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L03 — Password hashing and secure handling (`p1-w10-l03-c01`)

- `p1-w10-l03-q01` — Hashing vs encrypting passwords. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l03-q02` — Why per-hash salts matter. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l03-q03` — Why deliberately slow password hash. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l03-q04` — **ESSENTIAL CANDIDATE** — No plaintext or reversible password storage. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l03-q05` — Why login verification differs from hashing again and string equality. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l03-q06` — Why educational auth code is not production-ready. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L04 — Users, task ownership and migrations (`p1-w10-l04-c01`)

- `p1-w10-l04-q01` — Users UUID as identifier. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l04-q02` — Foreign-key ownership model. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l04-q03` — Separate session storage. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l04-q04` — **ESSENTIAL CANDIDATE** — Never silently reassign shared old tasks. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l04-q05` — Unique normalized email constraints. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l04-q06` — Migration does not automatically authenticate anyone. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L05 — Registration and input validation (`p1-w10-l05-c01`)

- `p1-w10-l05-q01` — Expected request body. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l05-q02` — Email normalization semantics. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l05-q03` — Registration passphrase length and type. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l05-q04` — Duplicate normalized email → 409. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l05-q05` — **ESSENTIAL CANDIDATE** — Backend must validate and never send password/hash to UI. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l05-q06` — Public response only `id,email`. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L06 — Login, /me, logout and sessions (`p1-w10-l06-c01`)

- `p1-w10-l06-q01` — Login lookup vs registration insert. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l06-q02` — Generic wrong-login message. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l06-q03` — Regenerate session on authentication. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l06-q04` — **ESSENTIAL CANDIDATE** — Logout invalidates session server-side. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l06-q05` — GET /auth/me and cookie behavior. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l06-q06` — 204 logout response must not be parsed as JSON. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L07 — CSRF and origin controls (`p1-w10-l07-c01`)

- `p1-w10-l07-q01` — Definition of CSRF. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l07-q02` — Why cookie sessions are relevant. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l07-q03` — **ESSENTIAL CANDIDATE** — Unsafe cross-origin request must fail closed. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l07-q04` — Distinguish origin failure 403 from session failure 401. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l07-q05` — Origin/Referer checks have deployment assumptions. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l07-q06` — What a later security review must revisit. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L08 — RequireAuth and database ownership clauses (`p1-w10-l08-c01`)

- `p1-w10-l08-q01` — Authentication middleware task. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l08-q02` — **ESSENTIAL CANDIDATE** — All task SQL operations owner-scoped. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l08-q03` — Client-supplied ownerId is untrusted. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l08-q04` — Why 404 for missing or foreign task. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l08-q05` — Parameterized query for owner and ID. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l08-q06` — Preserving `completed:false` in PATCH. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L09 — React login/session state (`p1-w10-l09-c01`)

- `p1-w10-l09-q01` — Auth loading vs unauthenticated state. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l09-q02` — What GET /me restores. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l09-q03` — Credentials sent via same-origin cookie. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l09-q04` — **ESSENTIAL CANDIDATE** — Clear private task data on logout/account switch. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l09-q05` — No JWT/password in browser storage. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l09-q06` — Protected UI alone not backend authorization. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L10 — Two-account access control tests (`p1-w10-l10-c01`)

- `p1-w10-l10-q01` — Why two users are required for isolation proof. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l10-q02` — 401 without session. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l10-q03` — **ESSENTIAL CANDIDATE** — Foreign GET/PATCH/DELETE all deny, leave row unchanged. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l10-q04` — 404 avoids resource existence disclosure. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l10-q05` — CSRF 403 is separate mechanism. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l10-q06` — Why user ID trust originates from the session. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L11 — Security-conscious AI code review (`p1-w10-l11-c01`)

- `p1-w10-l11-q01` — Spot missing owner filter. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l11-q02` — Spot leaked password_hash. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l11-q03` — Why generated tests need scrutiny. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l11-q04` — **ESSENTIAL CANDIDATE** — Never trust client ownerId or exposed secrets. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l11-q05` — Distinguish educational reference from production security. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l11-q06` — Correct review order: diff, tests, negative cases. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

### L12 — Week 10 multi-user acceptance gate (`p1-w10-l12-c01`)

- `p1-w10-l12-q01` — AuthN vs authZ in one request. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l12-q02` — Session cookie and logout semantics. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l12-q03` — Owner scope in list/read/write/delete. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l12-q04` — **ESSENTIAL CANDIDATE** — Prove foreign task cannot be mutated. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l12-q05` — What local tests demonstrate, and what they do not. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- `p1-w10-l12-q06` — Why this educational stack is not production-ready. Feedback should explain why a plausible wrong interpretation fails in the real HTTP/session/DB boundary.
- **Retry variant guidance:** create an equivalent scenario using new fictional actors, task IDs or HTTP responses; do not merely reorder identical answer choices.

## 2. Essential intent and rationale

Choose essential flags only where errors are **critical**: ownership must be enforced by the server, client data never chooses the task owner, passwords are not stored plaintext, session termination is server-side, unsafe origin requests are rejected in the agreed local model, and foreign task attempts cannot mutate data. The student must answer every reviewed essential item correctly in addition to the ≥5/6 threshold.

For each actual authored question, retain: learning outcome, correct answer/reason, explanations for wrong choices, knowledge gap it tests, question version, review date and a similarly demanding alternative for retry. Do not publish instructor-only source answer keys or complete reference code.

## 3. Other assessments planned, not executed

- **Two browser suites:** L05 input normalization/validation and L08 query-capture with fake PostgreSQL pool; all tests mandatory; no real sessions or SQL execution.
- **Ten local attestations:** Argon2 demo; safe migration; register/validate; login/logout; origin protection; owner-scoped CRUD; React session state; two-user negative tests; AI/diff review; complete capstone proof.
- **Three optional enrichment tasks:** L02 mock cookie timeline; L07 CSRF-defense comparison; L11 review competing AI suggestions.
- **Weekly readiness:** L12 quiz is not a substitute for actual Alice/Bob isolation evidence. Both required.

## 4. Educational item quality review checklist

- [ ] Each scored item has one unambiguous correct assessment target and a mapped lesson outcome.
- [ ] Essential marks are justified and reviewed by a second person when possible.
- [ ] Question wording avoids exposing sensitive real credentials or encouraging capture of session cookies.
- [ ] HTTP codes match this educational API; e.g., foreign 404, unauthorized 401, wrong Origin 403, duplicate register 409.
- [ ] Student can understand the feedback without external video or AI help.
- [ ] Equivalent retry forms assess understanding rather than remembering options.
- [ ] Browser JS checks and local app tests display **distinct labels**.
- [ ] Actual source content is technically reviewed in the target dependency versions before release.
- [ ] No finished questions, auto-test execution or learner results are claimed by this D0 document.
