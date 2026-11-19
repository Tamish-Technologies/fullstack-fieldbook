# Week 12 Assessment Item Plan — 66 Proposed Scored Question Intents

**D0 planning only.** This is **not** a ready-to-ship quiz bank. The original Week 12 instructor guide C38 provides twenty oral question prompts; adapt their concepts without directly exposing private instructor answers. This map adds targeted item intents to ensure complete coverage across the capstone.

## Item and retry rules

- 11 quiz groups × 6 scored items = **66 planned slots**; each group requires **5 correct of 6**, plus all reviewed essential items.
- Essential candidates below are **candidates**, not locked into implementation until technical and educational review.
- Author answers, three plausible distractors where appropriate, conceptual explanations, misconception-specific feedback, and a parallel/equivalent retry variant for each item.
- Test understanding by prediction, code reading, trade-off analysis and negative safety examples, not memorization of reference solution text.
- Do not invent screenshots of tests or pretend the 100-point rubric is automatically graded.

## L01 — Capstone mission, baseline and acceptance evidence

- `p1-w12-l01-q01` — Choose evidence that proves a baseline rather than a screenshot alone.
- `p1-w12-l01-q02` — Define a vertical slice spanning database to UI.
- `p1-w12-l01-q03` — Select a non-goal that should be excluded from Week 12.
- `p1-w12-l01-q04` — Explain why red *new* capstone tests may be expected.
- `p1-w12-l01-q05` — ESSENTIAL CANDIDATE: do not claim unrun HTTP/DB/build tests passed.
- `p1-w12-l01-q06` — Identify which capstone criterion checks account isolation.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L02 — Trace a request, create a safe Git branch and log AI use

- `p1-w12-l02-q01` — Name the browser-to-database request sequence.
- `p1-w12-l02-q02` — Locate the authoritative owner ID.
- `p1-w12-l02-q03` — Explain why server-confirmed state matters.
- `p1-w12-l02-q04` — Recognize an unsafe agent request to dump session cookies.
- `p1-w12-l02-q05` — Choose an appropriate atomic commit boundary.
- `p1-w12-l02-q06` — ESSENTIAL CANDIDATE: reviewed AI changes require local verification.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L03 — Write user stories, scope a vertical slice and order the work

- `p1-w12-l03-q01` — Identify a measurable user story.
- `p1-w12-l03-q02` — Distinguish acceptance criteria from coding tasks.
- `p1-w12-l03-q03` — Pick an order for migration → API → React.
- `p1-w12-l03-q04` — Explain the reason for backwards compatibility.
- `p1-w12-l03-q05` — ESSENTIAL CANDIDATE: a critical authorization failure blocks release readiness.
- `p1-w12-l03-q06` — Identify the optional dashboard scope cut.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L04 — Additive PostgreSQL migration and date-only semantics

- `p1-w12-l04-q01` — Choose a safe additive migration for existing rows.
- `p1-w12-l04-q02` — Pick DATE for date-only task deadlines.
- `p1-w12-l04-q03` — Explain default medium on pre-existing tasks.
- `p1-w12-l04-q04` — Distinguish valid leap-day from invalid date.
- `p1-w12-l04-q05` — ESSENTIAL CANDIDATE: never reset/destroy real user rows to add fields.
- `p1-w12-l04-q06` — Describe why a UTC demo policy needs explicit documentation.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L05 — Define the API contract and validate create/PATCH inputs

- `p1-w12-l05-q01` — Explain backwards-compatible title-only POST.
- `p1-w12-l05-q02` — Select the allowed priority values.
- `p1-w12-l05-q03` — Differentiate omitted date from explicit null in PATCH.
- `p1-w12-l05-q04` — Predict the status for an invalid priority.
- `p1-w12-l05-q05` — ESSENTIAL CANDIDATE: server-side validation cannot be replaced by a form check.
- `p1-w12-l05-q06` — Explain why a YYYY-MM-DD regex does not guarantee a real date.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L06 — Owner-scoped SQL, repository mapping and API client contracts

- `p1-w12-l06-q01` — Identify correct owner-scoped SQL predicates.
- `p1-w12-l06-q02` — Explain parameter placeholders.
- `p1-w12-l06-q03` — Pick a stable DATE-to-JSON mapping.
- `p1-w12-l06-q04` — Predict fetch behavior for HTTP 400.
- `p1-w12-l06-q05` — ESSENTIAL CANDIDATE: API owner ID comes from authenticated session, not client JSON.
- `p1-w12-l06-q06` — Choose a safe 404 response for foreign task IDs.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L07 — Controlled React forms and server-confirmed updates

- `p1-w12-l07-q01` — Distinguish local form state from persisted state.
- `p1-w12-l07-q02` — Choose labels for a date input.
- `p1-w12-l07-q03` — Explain empty date → null payload.
- `p1-w12-l07-q04` — Avoid optimistic false-success after HTTP error.
- `p1-w12-l07-q05` — Recognize an accessibility regression in a form.
- `p1-w12-l07-q06` — ESSENTIAL CANDIDATE: do not reflect failed server updates as saved.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L08 — Pure date logic, testable derivations and optional dashboard

- `p1-w12-l08-q01` — Classify a date earlier than today as overdue.
- `p1-w12-l08-q02` — Identify inclusive +7-day due-soon boundary.
- `p1-w12-l08-q03` — Exclude completed tasks from overdue counts.
- `p1-w12-l08-q04` — Justify injecting today into a pure helper.
- `p1-w12-l08-q05` — Differentiate derived UI summary from database columns.
- `p1-w12-l08-q06` — ESSENTIAL CANDIDATE: invalid date-only strings must not silently enter due-soon logic.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L09 — Prove behavior across unit, HTTP, PostgreSQL and browser layers

- `p1-w12-l09-q01` — Identify what a pure test cannot prove.
- `p1-w12-l09-q02` — Select an HTTP test for PATCH semantics.
- `p1-w12-l09-q03` — Recognize conditions for safe test DB.
- `p1-w12-l09-q04` — Prove persistence after server restart.
- `p1-w12-l09-q05` — ESSENTIAL CANDIDATE: cross-user GET/PATCH/DELETE must deny access.
- `p1-w12-l09-q06` — Differentiate browser evidence from database evidence.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L10 — Diagnose bugs, review security and decide whether to release

- `p1-w12-l10-q01` — Pick a minimal debugging experiment.
- `p1-w12-l10-q02` — Spot unsafe DROP TABLE recovery suggestion.
- `p1-w12-l10-q03` — Select redacted AI review evidence.
- `p1-w12-l10-q04` — Explain what a failed authorization gate means for release.
- `p1-w12-l10-q05` — ESSENTIAL CANDIDATE: privacy/security failures override attractive demo or rubric score.
- `p1-w12-l10-q06` — Recognize false success UI after server 400.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## L11 — Final demonstration, exit assessment and Phase 2 readiness

- `p1-w12-l11-q01` — Describe what the final capstone actually demonstrates.
- `p1-w12-l11-q02` — Trace a browser mutation to server-owned data.
- `p1-w12-l11-q03` — Explain omitted vs null dueDate.
- `p1-w12-l11-q04` — Justify safety of an additive migration.
- `p1-w12-l11-q05` — ESSENTIAL CANDIDATE: failing owner isolation means Hold regardless of score.
- `p1-w12-l11-q06` — Explain why course completion is not a production/security certification.

**Retry design:** Change the task title, task ID, synthetic date, failure mode or user account while retaining the same learning outcome. Explain errors and link back to the relevant lesson.

## 20 oral reasoning prompts (source C38) — optional mentor observation, required student rehearsal

The student should independently rehearse **at least ten** spanning frontend, backend, SQL, security, testing and AI. Original prompt themes: vertical slice vs tutorial; API contract; additive migrations; defaults; DATE vs timestamp; true calendar validation; PATCH omitted/null; 400; session owner ID; UI hiding vs authorization; Bob's foreign PATCH status; parameterized SQL; failed-save React behavior; persistence restart; unit-test scope; mocked versus live DB; fetch 400; frontend secret exposure; rejected AI suggestion; justified Hold decision. Additional day-boundary arithmetic is an optional challenge.

## Human/self-evaluation rubric (not automated grade)

| Dimension | Points |
|---|---:|
| User problem and scope | 10 |
| Independent JS/React reasoning | 15 |
| API contract, validation and responses | 15 |
| PostgreSQL migration and persistence | 15 |
| Auth/authorization and secrets | 15 |
| Tests, debugging and truthful evidence | 15 |
| AI collaboration and diff review | 10 |
| Git, demo, documentation | 5 |
| **Total** | **100** |

**Publication acceptance:** The 66 question slots must be fully written and reviewed, the two browser suites implemented/tested safely, the local-project checklists verified against actual student starter, and the student pilot completed later. None has happened in this D0 planning update.
