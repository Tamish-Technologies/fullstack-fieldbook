# Week 12 Lesson & Assessment Blueprint — Owner-Approved D0 Structure (A-013)

> **CURRENT AUTHORITATIVE PLANNING STATUS — 2026-11-17:** All 12 weekly educational BLUEPRINT STRUCTURES have owner approval (Week 12 = **A-013**). The D0 **cross-week audit is prepared**, but the owner has **not yet signed off D0**. All learner-ready content, question banks, code runners and pilots remain future work. D1 visual approval and explicit D2 coding authorization are also pending. Historical status notices in this document describe prior snapshots and are superseded by `docs/product/D0_OWNER_SIGNOFF.md` and `docs/product/D0_APPROVAL_LOG.md`.


> **Status: OWNER STRUCTURALLY APPROVED A-013 (2026-11-17).** Week 11 is structurally approved as A-012. This document specifies learning objectives and future acceptance checks; it is **not** finished student lesson prose, an executed test suite, a security certification, or a final D0 signoff. DEC-21 mastery policy and DEC-24 D3/D4 sequencing remain unchanged. No app coding is authorized.

**Source of truth:** private Week 12 instructor guide C01–C45 and `phase1/week-12/code-starter-and-reference.zip` (165 path entries). **Student pathway:** eleven required lessons, 27 checkpoints = 24 required (11 quizzes / 66 planned question intents, two isolated plain-JS tests, 11 local capstone attestations) + three optional enrichments. Expected learning includes a self-directed full-stack feature plus honest engineering evidence, not an externally certified credential.

## 1. Week 12 purpose, entry conditions and boundaries

- **Entry gate:** Week 11 mandatory readiness complete, a safely functioning Study Tasks v11 baseline, and student understands that the Week 12 starter intentionally contains initially failing new capstone tests. Record actual pass/fail counts, not copied reference results.
- **Main feature:** Task Planning v12: `priority` ∈ `low|medium|high`, default `medium`; optional date-only `dueDate` in API and PostgreSQL `DATE`, editable and clearable. Implement across PostgreSQL migration, Express validation/repository/API, React controls/client, and tests.
- **Compatibility:** existing title-only POST continues to work; missing PATCH field means preserve value; explicitly `dueDate:null` means clear it. Existing owner IDs, sessions and task privacy survive unchanged.
- **Safety:** owner comes from trusted session; owner-scoped SQL for reads/writes; use only fictional accounts; never expose credentials. Database migration additive; dedicated explicitly inspected `_test` DB before destructive tests. Any owner-leak, committed secret or uncontrolled destructive migration means **Hold**, regardless of score.
- **Optional, not gating:** visible dashboard counters for overdue/due-soon/high-priority, fancy polish, public hosting, external AI service accounts. A local production-style preview remains sufficient.
- **Verification honesty:** the frontend-only Fieldbook can grade quiz reasoning and two synthetic pure-JS functions in an isolated runner. It **cannot** inspect a learner's local React/Express/PostgreSQL project, Git history or oral performance; those checks are self-verified with bounded evidence and disclosed limitations.
- **Realistic pacing:** 2 × 90-minute mentor sessions and 4–6 hours independent practice in the original source. The platform may offer self-paced chunks and milestones without timed locks or promising that the capstone fits every learner's available hours.

## 2. Safe local resources and milestone files

Use existing private Week 12 student starter, not the instructor `reference-solution`. The code ZIP includes `student-starter/CAPSTONE_BRIEF.md`, `EVIDENCE_LOG.md`, `AI_WORK_LOG.md`, `RELEASE_REPORT.md`, `backend/migrations/003_add_planning_fields.sql` (unfinished exercise), planning/date helper tests and Week 11 baseline. Every terminal command must be checked against the actual provided package before being published. Avoid bundling the private reference solution or instructor C39/C44 material into public assets.

**Acceptance artifacts:** baseline verification, student-authored brief and risk list, small Git commits, stable API contract, safe additive migration, validation/SQL/UI tests, Alice/Bob negative checks, a bug diary (at least three labs), AI review notes, and release report with Ready for local demo or Hold.

## 3. DEC-21 assessment allocation for Week 12

| Method | Required | Optional | Evidence |
|---|---:|---:|---|
| `quiz-auto` | 11 | 0 | 6 reviewed questions × 11 lessons = **66 proposed item intents**; pass ≥5/6 and all designated essential items |
| `browser-code-auto` | 2 | 0 | Pure isolated date-validation/classification tests, all mandatory behavior cases pass |
| `local-project-self-verified` | 11 | 0 | Actual learner tests, feature demonstrations, written rationale, bounded local attestations; not remotely inspected |
| `optional-enrichment` | 0 | 3 | AI prompt comparison, visual dashboard extension, optional public showcase/portfolio |
| **Total** | **24** | **3** | **27 checkpoint IDs** |

The 100-point capstone rubric is a **human/self-review instrument**, not an automatically authenticated grade. Readiness criteria from instructor C40 (85+ independently Phase-2-ready, 70–84 targeted practice, below 70 revisit) are **recommendations**, never override critical safety gates, and cannot be automatically asserted by the offline app.

## 4. Proposed lesson sequence and source allocation

| Stable lesson ID | Student lesson | Source chapters | Main gates |
|---|---|---|---|
| `p1-w12-l01` | Capstone mission, baseline and acceptance evidence | C01, C02, C03, C04, C05, C06 | quiz + local project |
| `p1-w12-l02` | Trace a request, create a safe Git branch and log AI use | C07, C08, C09 | quiz + local project + optional |
| `p1-w12-l03` | Write user stories, scope a vertical slice and order the work | C10, C11 | quiz + local project |
| `p1-w12-l04` | Additive PostgreSQL migration and date-only semantics | C12, C13 | quiz + local project |
| `p1-w12-l05` | Define the API contract and validate create/PATCH inputs | C14, C15 | quiz + isolated JS + local project |
| `p1-w12-l06` | Owner-scoped SQL, repository mapping and API client contracts | C16, C17 | quiz + local project |
| `p1-w12-l07` | Controlled React forms and server-confirmed updates | C18, C19 | quiz + local project |
| `p1-w12-l08` | Pure date logic, testable derivations and optional dashboard | C20 | quiz + isolated JS + local project + optional |
| `p1-w12-l09` | Prove behavior across unit, HTTP, PostgreSQL and browser layers | C21, C22, C23, C24, C25, C26 | quiz + local project |
| `p1-w12-l10` | Diagnose bugs, review security and decide whether to release | C27, C28, C29, C30, C31 | quiz + local project |
| `p1-w12-l11` | Final demonstration, exit assessment and Phase 2 readiness | C32, C33, C34, C35, C36, C37, C38, C39, C40, C41, C42, C43, C44, C45 | quiz + local project + optional |

## 5. Complete per-lesson authoring contracts

### L01 — Capstone mission, baseline and acceptance evidence

**ID:** `p1-w12-l01` · **Suggested learning block:** 30–45 minutes (not a time gate) · **Prerequisite:** Week 11 readiness and safe baseline · **Sources:** C01, C02, C03, C04, C05, C06.

**Observable outcomes:**
1. Demonstrate the inherited Week 11 project without claiming unrun tests
1. Explain the Task Planning MVP, its excluded stretch scope and A01–A10 evidence requirements
1. Identify the security and backward-compatibility requirements that cannot be traded for visual polish

**Teach-from requirements:** Explain a vertical slice as one feature crossing database → repository → route → API client → React. Have the learner compare a flashy generated dashboard with a plain feature that survives reload and rejects foreign access. Establish independent ownership: student chooses implementation order and writes a concise brief. Record baseline commit, environment (without secrets) and known red starter tests. Do not mistake the intentionally failing new Week 12 tests for regressions in Week 11.

**Worked example to author:** Trace a title-only POST on Week 11: a fictional signed-in Alice creates a task, the server associates her account ID, and React shows a confirmed saved task. Then list every layer that priority and dueDate will affect.

**Independent student exercise:** Run the Week 11 baseline, capture Git commit and real observations, list A01–A10 in CAPSTONE_BRIEF and mark each untested. Distinguish the *minimum secure slice* from optional dashboard counters.

**Misconception:** Claiming the feature is finished because the form shows a priority selector, or believing the starter red tests demonstrate broken Week 11 behavior.

**Progressive hints:**
- Hint 1: Show one route and find where it reads/writes data.
- Hint 2: Identify which A01–A10 requirements are backend-only or security-critical.
- Hint 3: Start the baseline, inspect a network response, and record what you actually observed.

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l01-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l01-c02` · `local-project-self-verified` · **Required:** From the supplied Week 12 student starter: start or otherwise inspect Week 11 baseline safely, run available pure baseline tests, record actual commands/outputs and Git commit in EVIDENCE_LOG. Note expected capstone TODO failures separately; use fictional accounts and avoid secrets. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.

**Planned six-question bank intents:**
- `p1-w12-l01-q01` — Choose evidence that proves a baseline rather than a screenshot alone
- `p1-w12-l01-q02` — Define a vertical slice spanning database to UI
- `p1-w12-l01-q03` — Select a non-goal that should be excluded from Week 12
- `p1-w12-l01-q04` — Explain why red *new* capstone tests may be expected
- `p1-w12-l01-q05` — ESSENTIAL CANDIDATE: do not claim unrun HTTP/DB/build tests passed
- `p1-w12-l01-q06` — Identify which capstone criterion checks account isolation

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L02 — Trace a request, create a safe Git branch and log AI use

**ID:** `p1-w12-l02` · **Suggested learning block:** 20–30 minutes (not a time gate) · **Prerequisite:** p1-w12-l01 · **Sources:** C07, C08, C09.

**Observable outcomes:**
1. Follow the same task mutation through browser, API client, authenticated route, owner-scoped SQL, and response
1. Use a branch, small commits and diff review to isolate changes
1. Describe an AI proposal, verification performed and one inappropriate suggestion rejected

**Teach-from requirements:** Use an annotated, source-grounded request path as an architecture refresher. Reinforce that session identity comes from the server and that client-supplied owner ID is untrusted. Teach `git status`, diff review, commit boundaries, and a redacted AI work log. An agent may propose a plan or small tests; the student must inspect changes and not paste `.env`, cookies or personal data into AI.

**Worked example to author:** After pressing Save, list the path: React form → task API client → PATCH /api/tasks/:id → authentication/session middleware → repository with owner filter → PostgreSQL → response → state update. Point to which boundary would produce 401, 400 or 404.

**Independent student exercise:** Write a one-page request trace for `PATCH /api/tasks/:id`, open a work branch and make an initial plan-only commit. In AI_WORK_LOG, document a bounded AI suggestion and what would be required to verify it.

**Misconception:** Assuming a Git commit proves tests passed; or accepting an AI-written migration because it looks syntactically plausible.

**Progressive hints:**
- Hint 1: Name the browser-owned state and server-owned source of truth.
- Hint 2: Where is the authenticated user ID attached to the request?
- Hint 3: Inspect `git diff` before accepting any agent change.

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l02-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l02-c02` · `local-project-self-verified` · **Required:** Create and check a branch without touching an existing production database. Save a sanitized request trace, initial commit ID, and one reviewed AI-assisted plan in AI_WORK_LOG; no network session IDs or credentials. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.
- `p1-w12-l02-c03` · `optional-enrichment` · **Optional:** Compare two bounded AI prompts for usefulness. This is optional and must not force sign-in to an AI service. Never blocks progression.

**Planned six-question bank intents:**
- `p1-w12-l02-q01` — Name the browser-to-database request sequence
- `p1-w12-l02-q02` — Locate the authoritative owner ID
- `p1-w12-l02-q03` — Explain why server-confirmed state matters
- `p1-w12-l02-q04` — Recognize an unsafe agent request to dump session cookies
- `p1-w12-l02-q05` — Choose an appropriate atomic commit boundary
- `p1-w12-l02-q06` — ESSENTIAL CANDIDATE: reviewed AI changes require local verification

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L03 — Write user stories, scope a vertical slice and order the work

**ID:** `p1-w12-l03` · **Suggested learning block:** 25–35 minutes (not a time gate) · **Prerequisite:** p1-w12-l02 · **Sources:** C10, C11.

**Observable outcomes:**
1. Convert vague UI requests into user stories and observable acceptance criteria
1. Order tasks by dependency and testability rather than screen appearance
1. Define an MVP and a reasoned stretch cut line

**Teach-from requirements:** Explain user stories as who/goal/value and acceptance criteria as observable proof. Distinguish product acceptance from implementation steps. Show why the additive migration and HTTP contract precede UI changes. Keep a single small branch and a deliberate risk list. The two-session schedule is context, not a timer-based unlock.

**Worked example to author:** Rewrite “Add deadlines” into “As a signed-in learner I can save an optional YYYY-MM-DD date and later clear it; PATCH with omitted dueDate preserves it, PATCH with null clears it; foreign users cannot update it.”

**Independent student exercise:** Fill CAPSTONE_BRIEF with three user stories, minimal A01–A10 criteria, a dependency-ordered task list and one rejected scope expansion. Independently justify at least one trade-off.

**Misconception:** Treating “create a component” as a user story, or prioritizing the dashboard while owner filtering remains untested.

**Progressive hints:**
- Hint 1: Can a tester observe success without reading the implementation?
- Hint 2: Which layer must change before the UI can save a new field?
- Hint 3: Move the dashboard summary below every privacy and persistence check.

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l03-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l03-c02` · `local-project-self-verified` · **Required:** Produce CAPSTONE_BRIEF and a reviewable task list; self-check every requirement against the original A01–A10 contract. Record any blocked acceptance criterion explicitly. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.

**Planned six-question bank intents:**
- `p1-w12-l03-q01` — Identify a measurable user story
- `p1-w12-l03-q02` — Distinguish acceptance criteria from coding tasks
- `p1-w12-l03-q03` — Pick an order for migration → API → React
- `p1-w12-l03-q04` — Explain the reason for backwards compatibility
- `p1-w12-l03-q05` — ESSENTIAL CANDIDATE: a critical authorization failure blocks release readiness
- `p1-w12-l03-q06` — Identify the optional dashboard scope cut

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L04 — Additive PostgreSQL migration and date-only semantics

**ID:** `p1-w12-l04` · **Suggested learning block:** 35–50 minutes (not a time gate) · **Prerequisite:** p1-w12-l03 · **Sources:** C12, C13.

**Observable outcomes:**
1. Describe a safe additive schema for priority and nullable due_date without losing rows
1. Explain PostgreSQL DATE versus timestamp and the API YYYY-MM-DD representation
1. Differentiate an actual calendar date from a pattern-only match

**Teach-from requirements:** Use the existing user_tasks table and owner_id relationship. Plan priority low/medium/high, default medium, NOT NULL and CHECK; due_date nullable DATE. Contrast a safe ALTER migration with DROP TABLE. Explain why ISO date-only strings are calendar dates rather than instants, and why a demo may use UTC calendar day explicitly. Show leap-year and impossible-date reasoning; avoid implicit Date-to-local conversion for API round-trips. Never run destructive DB test commands without verifying the dedicated test target.

**Worked example to author:** Use hypothetical existing row without priority: migration gives medium and null. Discuss exact API values for 2028-02-29 (valid), 2027-02-29 (invalid), and 2026-02-30 (invalid).

**Independent student exercise:** Write the migration plan, describe its constraints and rollback without data deletion, verify target database name before any write, apply only on a safe local development DB, and compare task counts before/after.

**Misconception:** Running a migration that recreates user_tasks, using timestamp for dueDate without timezone policy, or equating regex shape with calendar validity.

**Progressive hints:**
- Hint 1: What happens to existing rows when a NOT NULL column appears?
- Hint 2: Does the date represent a day or a precise instant?
- Hint 3: Check the calendar, not only the digits; confirm DB name before migrations.

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l04-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l04-c02` · `local-project-self-verified` · **Required:** Safely apply an additive migration to a local development DB and verify existing rows and owner IDs remain intact. Separately confirm a disposable `_test` database before any destructive suite; never run destructive SQL if uncertain. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.

**Planned six-question bank intents:**
- `p1-w12-l04-q01` — Choose a safe additive migration for existing rows
- `p1-w12-l04-q02` — Pick DATE for date-only task deadlines
- `p1-w12-l04-q03` — Explain default medium on pre-existing tasks
- `p1-w12-l04-q04` — Distinguish valid leap-day from invalid date
- `p1-w12-l04-q05` — ESSENTIAL CANDIDATE: never reset/destroy real user rows to add fields
- `p1-w12-l04-q06` — Describe why a UTC demo policy needs explicit documentation

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L05 — Define the API contract and validate create/PATCH inputs

**ID:** `p1-w12-l05` · **Suggested learning block:** 30–45 minutes (not a time gate) · **Prerequisite:** p1-w12-l04 · **Sources:** C14, C15.

**Observable outcomes:**
1. Specify backwards-compatible POST and PATCH JSON contracts
1. Differentiate omitted dueDate from explicitly null dueDate
1. Validate low/medium/high and true calendar YYYY-MM-DD on the server

**Teach-from requirements:** Introduce contract-first development, old title-only POST compatibility, and complete 400 validation behavior. Show PATCH partial-update semantics: missing dueDate leaves stored date untouched; null clears it. Never trust React form validation as server security. Demonstrate why `new Date` rolls an invalid date forward and how parsing/canonical round-trip guards against it. Use only synthetic date strings in browser coding tests.

**Worked example to author:** Compare PATCH {"priority":"high"} to PATCH {"dueDate":null}; first must preserve due date, second must clear it. Compare POST {"title":"Study"} to POST with a valid dueDate.

**Independent student exercise:** Write request/response examples and at least five invalid input cases. Implement/verify a small pure date-validation function in an isolated browser exercise, then run server validator tests locally and record actual output.

**Misconception:** Clearing dueDate whenever a PATCH payload lacks it; treating `2026-02-30` as valid; claiming client-side validation is sufficient.

**Progressive hints:**
- Hint 1: Use property *presence* rather than truthiness for PATCH.
- Hint 2: Check YYYY-MM-DD format and canonical calendar round-trip.
- Hint 3: What should old clients sending only a title receive?

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l05-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l05-c02` · `browser-code-auto` · **Required:** Implement a pure `isValidDateOnly(value)` function for synthetic inputs. Mandatory checks include leap-day 2028-02-29 true; 2027-02-29 false; 2026-02-30 false; 2026-13-01 false; 2026-2-5 false; non-string false; no Date-to-local conversion, no network/Node imports. All mandatory deterministic tests must pass in a secure isolated runner; these checks do not prove backend security.
- `p1-w12-l05-c03` · `local-project-self-verified` · **Required:** Locally run backend validation tests for create and patch. Demonstrate title-only POST default; invalid priority and impossible date 400; omitted date preserves while explicit null clears. Record concrete test commands/status codes with no secrets. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.

**Planned six-question bank intents:**
- `p1-w12-l05-q01` — Explain backwards-compatible title-only POST
- `p1-w12-l05-q02` — Select the allowed priority values
- `p1-w12-l05-q03` — Differentiate omitted date from explicit null in PATCH
- `p1-w12-l05-q04` — Predict the status for an invalid priority
- `p1-w12-l05-q05` — ESSENTIAL CANDIDATE: server-side validation cannot be replaced by a form check
- `p1-w12-l05-q06` — Explain why a YYYY-MM-DD regex does not guarantee a real date

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L06 — Owner-scoped SQL, repository mapping and API client contracts

**ID:** `p1-w12-l06` · **Suggested learning block:** 35–50 minutes (not a time gate) · **Prerequisite:** p1-w12-l05 · **Sources:** C16, C17.

**Observable outcomes:**
1. Trace parameterized owner-scoped repository operations
1. Explain how SQL DATE becomes consistent API dueDate JSON
1. Handle response.ok and failure states without falsely accepting changes

**Teach-from requirements:** Use trusted session user ID rather than request body owner field. Required repository UPDATE/SELECT/DELETE must filter owner_id AND task ID; placeholders prevent interpolation. Explain conditional update rules and returning priority and dueDate from every relevant route, e.g. canonical TO_CHAR as needed. Distinguish response.ok from fetch network rejection. Compare fake SQL test assertions with a real live DB test; neither automatically proves the UI.

**Worked example to author:** Hypothetical query constraints `WHERE owner_id = $1 AND id = $2` and HTTP PATCH that returns JSON only after a committed update; if Bob knows Alice’s ID, return 404 and do not modify a row.

**Independent student exercise:** Write a repository/API test matrix, implement the reviewed backend and API client changes locally, run appropriate tests and document actual responses for the owner scope and failure paths.

**Misconception:** Using only `WHERE id = $1`, taking ownerId from React, or assuming fetch rejects a 400 automatically.

**Progressive hints:**
- Hint 1: Where does `owner_id` come from?
- Hint 2: Observe which conditions appear in SELECT, UPDATE and DELETE.
- Hint 3: Inspect `response.ok` and the serialized response shape.

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l06-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l06-c02` · `local-project-self-verified` · **Required:** Run available backend repository and HTTP tests locally, including failure and foreign-owner cases. Confirm server JSON includes priority/date; preserve no-secrets and fictional-account rules. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.

**Planned six-question bank intents:**
- `p1-w12-l06-q01` — Identify correct owner-scoped SQL predicates
- `p1-w12-l06-q02` — Explain parameter placeholders
- `p1-w12-l06-q03` — Pick a stable DATE-to-JSON mapping
- `p1-w12-l06-q04` — Predict fetch behavior for HTTP 400
- `p1-w12-l06-q05` — ESSENTIAL CANDIDATE: API owner ID comes from authenticated session, not client JSON
- `p1-w12-l06-q06` — Choose a safe 404 response for foreign task IDs

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L07 — Controlled React forms and server-confirmed updates

**ID:** `p1-w12-l07` · **Suggested learning block:** 35–50 minutes (not a time gate) · **Prerequisite:** p1-w12-l06 · **Sources:** C18, C19.

**Observable outcomes:**
1. Build accessible controlled priority/date inputs with clear labels
1. Encode empty optional date as explicit null when user clears it
1. Show confirmed updates and actionable errors rather than optimistic false success

**Teach-from requirements:** Reuse the Week 11 React component patterns, avoid architectural rewrites. Compare controlled form state versus confirmed server task state. State stays unchanged or reports a pending failure if POST/PATCH rejects. Include keyboard navigation, labels, and date input edge cases, and explain where validation belongs. Keep form error text specific but not exposing server internals.

**Worked example to author:** Edit high priority and dueDate, submit PATCH, wait for response, then display stored fields. Clear the date: send null, not empty string/omission. Simulate server 400: show error, do not falsely claim a saved task.

**Independent student exercise:** Extend the local React form and task item, run build or relevant tests where available, manually verify keyboard navigation, date clearing, reloading, and failed save messages. Record results rather than screenshots alone.

**Misconception:** Mutating React state to “success” before HTTP confirmation, or silently omitting null after a user clears the date input.

**Progressive hints:**
- Hint 1: What does the input hold before Save, and what does the server confirm afterward?
- Hint 2: Check whether the payload contains `dueDate: null`.
- Hint 3: Make a failed request and verify the UI remains truthful.

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l07-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l07-c02` · `local-project-self-verified` · **Required:** Use local React app to demonstrate create/edit/clear/reload and a failed save with helpful feedback. Verify actual request payload/response via Network DevTools, redacting session information. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.

**Planned six-question bank intents:**
- `p1-w12-l07-q01` — Distinguish local form state from persisted state
- `p1-w12-l07-q02` — Choose labels for a date input
- `p1-w12-l07-q03` — Explain empty date → null payload
- `p1-w12-l07-q04` — Avoid optimistic false-success after HTTP error
- `p1-w12-l07-q05` — Recognize an accessibility regression in a form
- `p1-w12-l07-q06` — ESSENTIAL CANDIDATE: do not reflect failed server updates as saved

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L08 — Pure date logic, testable derivations and optional dashboard

**ID:** `p1-w12-l08` · **Suggested learning block:** 25–40 minutes (not a time gate) · **Prerequisite:** p1-w12-l07 · **Sources:** C20.

**Observable outcomes:**
1. Define overdue/due-soon/high-priority-open consistently using date-only values
1. Calculate dates from an explicit today input instead of implicit global clock
1. Keep dashboard visual implementation optional while testing the pure date model

**Teach-from requirements:** Make testability the primary lesson. Review UTC date-only demo policy and explicit `today` arguments; eligible due-soon dates include today through +7 days inclusive, only for unfinished tasks. Overdue is strictly before today; completed tasks are excluded. Carefully distinguish the optional UI dashboard from the required pure date reasoning and testing. No extra persistent counter columns.

**Worked example to author:** With today 2026-11-15: incomplete due Nov 14 overdue, Nov 15/Nov 22 due soon, Nov 23 outside range; completed Nov 14 counts as neither. High-priority unfinished count is independent of due-date status.

**Independent student exercise:** Write the expected outcomes by hand before coding a pure helper; test boundaries using bundled synthetic tasks, then run corresponding local helper unit tests. Optional: add visible dashboard counts.

**Misconception:** Counting completed tasks as overdue, combining local timestamps with date-only strings, or persisting derived dashboard counts as database columns.

**Progressive hints:**
- Hint 1: Is completed false?
- Hint 2: Are both date strings validated YYYY-MM-DD?
- Hint 3: Is the +7-day end boundary inclusive?

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l08-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l08-c02` · `browser-code-auto` · **Required:** Implement a pure `classifyDue(task, today)` or equivalent with explicit `today` argument and validated ISO date-only values. Mandatory cases: overdue yesterday/incomplete, due today, exactly +7 days, +8 days, completed overdue false, no due date false, invalid dates rejected; run without `Date.now`, network, Node packages or DOM. All mandatory deterministic tests must pass in a secure isolated runner; these checks do not prove backend security.
- `p1-w12-l08-c03` · `local-project-self-verified` · **Required:** Document date-only assumptions and locally run the pure planning helper tests. Compare expected classifications with actual outcomes; dashboard presentation is an optional extension, not a required gate. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.
- `p1-w12-l08-c04` · `optional-enrichment` · **Optional:** Build optional React dashboard counts for overdue/due-soon/high-priority-open with accessible labels; never required for graduation. Never blocks progression.

**Planned six-question bank intents:**
- `p1-w12-l08-q01` — Classify a date earlier than today as overdue
- `p1-w12-l08-q02` — Identify inclusive +7-day due-soon boundary
- `p1-w12-l08-q03` — Exclude completed tasks from overdue counts
- `p1-w12-l08-q04` — Justify injecting today into a pure helper
- `p1-w12-l08-q05` — Differentiate derived UI summary from database columns
- `p1-w12-l08-q06` — ESSENTIAL CANDIDATE: invalid date-only strings must not silently enter due-soon logic

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L09 — Prove behavior across unit, HTTP, PostgreSQL and browser layers

**ID:** `p1-w12-l09` · **Suggested learning block:** 45–60 minutes (not a time gate) · **Prerequisite:** p1-w12-l08 · **Sources:** C21, C22, C23, C24, C25, C26.

**Observable outcomes:**
1. Choose appropriate evidence for each test layer and state its limitations
1. Safely verify the migration and persistence against isolated test data
1. Prove cross-user access denial with real fictional Alice/Bob sessions

**Teach-from requirements:** Use the acceptance matrix A01–A10. Unit tests check validation and date helpers; repository tests check owner-scoped SQL contract; HTTP integration checks response codes/shape; PostgreSQL tests check actual persistence and constraints; browser tests prove the human flow. Never run destructive DB tests unless target name ends `_test` and user explicitly confirms it. A mock passing is not evidence of live auth; redacting session cookies does not itself prove request security.

**Worked example to author:** A01 title-only POST still passes; A03 PATCH with only priority preserves due_date; A04 null clears; A08 Bob’s GET/PATCH/DELETE of Alice ID 404, Alice’s row unchanged. Discuss which layer proves each claim.

**Independent student exercise:** Run available local unit, HTTP, safe test DB, and browser checks; record exact commands/results, failures, and unrun checks in EVIDENCE_LOG. If test DB cannot be safely verified, stop rather than guess.

**Misconception:** Writing “all tests pass” after only running pure unit tests, or letting a destructive test target a normal development database.

**Progressive hints:**
- Hint 1: Which dependency does this test actually exercise?
- Hint 2: Write down the database target before running test:db.
- Hint 3: Does the foreign request change an actual stored row?

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l09-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l09-c02` · `local-project-self-verified` · **Required:** Complete an A01–A10 evidence matrix with unit, HTTP, live PostgreSQL only if safe, and browser verification. Use distinct fictional users; run real 404 denial and unchanged-row check, or record honest blocker and do not mark it passed. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.

**Planned six-question bank intents:**
- `p1-w12-l09-q01` — Identify what a pure test cannot prove
- `p1-w12-l09-q02` — Select an HTTP test for PATCH semantics
- `p1-w12-l09-q03` — Recognize conditions for safe test DB
- `p1-w12-l09-q04` — Prove persistence after server restart
- `p1-w12-l09-q05` — ESSENTIAL CANDIDATE: cross-user GET/PATCH/DELETE must deny access
- `p1-w12-l09-q06` — Differentiate browser evidence from database evidence

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L10 — Diagnose bugs, review security and decide whether to release

**ID:** `p1-w12-l10` · **Suggested learning block:** 35–50 minutes (not a time gate) · **Prerequisite:** p1-w12-l09 · **Sources:** C27, C28, C29, C30, C31.

**Observable outcomes:**
1. Apply symptom → evidence → hypothesis → experiment → fix → regression checks
1. Reject unsafe AI edits, destructive migrations, or leaked secrets
1. Make a justified Ready for local demo or Hold release decision

**Teach-from requirements:** Use three independent debugging scenarios from C37 including the omitted-vs-null PATCH or owner leak. Review SQL, cookies, controlled UI and error messages. Require explicit diff review and one rejected AI proposal; no use of external AI is necessary to pass. Distinguish secure local demo from public production release: educational auth remains non-production. Prioritize user/privacy safety over demo polish.

**Worked example to author:** Agent suggests DROP TABLE to resolve missing `priority` column; explain additive migration and backup checks instead. Bob can change Alice’s dueDate: choose Hold, add owner-filter regression test, do not deploy.

**Independent student exercise:** Investigate at least three supplied lab symptoms, including either dueDate preservation or foreign-owner write, and record root cause, smallest fix and regression evidence. Write a release report with explicit remaining risks and a hold decision where appropriate.

**Misconception:** Fixing by randomly changing many files, claiming a deployed URL means app is secure, or accepting AI-generated code before a diff review.

**Progressive hints:**
- Hint 1: First reproduce the smallest failing case.
- Hint 2: Which boundary can produce this symptom?
- Hint 3: If a security gate is red, the correct release decision is Hold.

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l10-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l10-c02` · `local-project-self-verified` · **Required:** Complete three debugging-lab records, including a critical PATCH/owner case, perform sanitized diff/security review, and record a truthful release decision. Public hosting is optional and not a graduation requirement. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.

**Planned six-question bank intents:**
- `p1-w12-l10-q01` — Pick a minimal debugging experiment
- `p1-w12-l10-q02` — Spot unsafe DROP TABLE recovery suggestion
- `p1-w12-l10-q03` — Select redacted AI review evidence
- `p1-w12-l10-q04` — Explain what a failed authorization gate means for release
- `p1-w12-l10-q05` — ESSENTIAL CANDIDATE: privacy/security failures override attractive demo or rubric score
- `p1-w12-l10-q06` — Recognize false success UI after server 400

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

### L11 — Final demonstration, exit assessment and Phase 2 readiness

**ID:** `p1-w12-l11` · **Suggested learning block:** 45–75 minutes (not a time gate) · **Prerequisite:** p1-w12-l10 · **Sources:** C32, C33, C34, C35, C36, C37, C38, C39, C40, C41, C42, C43, C44, C45.

**Observable outcomes:**
1. Demonstrate a student-owned feature with traceable A01–A10 evidence
1. Explain representative React, Express, SQL, tests and AI decisions independently
1. Self-assess Phase 1 readiness and create a targeted remediation/Phase 2 entry plan

**Teach-from requirements:** Reframe instructor sessions C32–C35 and oral list C38 into a self-paced rehearsal: five-minute demo, independent oral review, ten questions covering all layers, at least three debugging labs, and a signed/dated self-report. Share grading criteria, not C39 instructor answers or C44 full reference code. C40 rubric is transparent; no automatic certification. Distinguish progress unlock (required verified and self-attested checkpoints plus readiness quiz) from teacher/peer-observed proficiency. If core security A08 or migration/secret safety fails, record Hold, no ready-for-release claim and repeat the specific exercise before completion.

**Worked example to author:** A full demo traces one signed-in priority+date task create, restart/reload, edit and clear date, invalid 400, foreign 404, tests and an AI suggestion rejected; release report states any unrun checks.

**Independent student exercise:** Complete A01–A10 with truthful proof, 5-min demo/rehearsal, at least ten independent oral questions from original C38, commit/release report, 100-point self-evaluation and short targeted Phase 2 readiness plan. Do not use AI during the independent explanation.

**Misconception:** Marking a capstone complete because AI says “done” or self-scoring 95 without a tested ownership check.

**Progressive hints:**
- Hint 1: Demonstrate one click through the layers.
- Hint 2: Name a failing or unrun test honestly and show how you would diagnose it.
- Hint 3: Explain what you reviewed in the agent-generated diff and which risks remain.

**Required checkpoints (content contracts, not executed):**
- `p1-w12-l11-c01` · `quiz-auto` · **Required:** 6 reviewed scored questions; pass ≥5/6 plus every essential item, with rationale, remedial links, equivalent retry and unlimited attempts.
- `p1-w12-l11-c02` · `local-project-self-verified` · **Required:** Complete final capstone demonstration and explicit self-attestation: A01–A10, required test evidence, ownership denied, safety report, Git diff/AI log, at least three debugger exercises, ten oral self-check answers and 100-point rubric. Mark unfinished or blocked safety checks incomplete and choose Hold; never present this as externally certified. Completion requires an honest bounded attestation; Fieldbook has not inspected these local results.
- `p1-w12-l11-c03` · `optional-enrichment` · **Optional:** Optional public demo or personal Phase 2 portfolio polish with fictional data and independent review; never required for course completion. Never blocks progression.

**Planned six-question bank intents:**
- `p1-w12-l11-q01` — Describe what the final capstone actually demonstrates
- `p1-w12-l11-q02` — Trace a browser mutation to server-owned data
- `p1-w12-l11-q03` — Explain omitted vs null dueDate
- `p1-w12-l11-q04` — Justify safety of an additive migration
- `p1-w12-l11-q05` — ESSENTIAL CANDIDATE: failing owner isolation means Hold regardless of score
- `p1-w12-l11-q06` — Explain why course completion is not a production/security certification

**Before publication:** Author correct answers, plausible wrong answers, targeted feedback, essential flags, equivalent retries and technical/educational review. No source answer key can be shipped.

## 6. Week 12 integrated capstone acceptance matrix

The local final project must satisfy **A01–A10**. Every item requires an explicit evidence status (`pass` / `fail` / `not run`), actual action/command and observed result. The Fieldbook website records *student attestation*, never a remote test pass.

| Acceptance ID | Required observation | Principal lesson |
|---|---|---|
| A01 | Existing title-only POST returns 201; priority defaults `medium`, dueDate is `null` | L05–L06 |
| A02 | Create high priority + real YYYY-MM-DD date; fields returned and stored | L05–L07 |
| A03 | Priority-only PATCH preserves an existing due date | L05–L06 |
| A04 | PATCH with `dueDate:null` clears an existing date | L05–L07 |
| A05 | Impossible date (e.g. `2026-02-30`) rejected with 400; data unchanged | L04–L06 |
| A06 | Unknown priority (e.g. `urgent`) rejected with 400; data unchanged | L05–L06 |
| A07 | Repeated read/refresh and real server restart preserve fields | L04, L07, L09 |
| A08 | Bob cannot GET/PATCH/DELETE Alice's task by ID; 404 and Alice's row unchanged | L06, L09 |
| A09 | Failed API/DB write is visibly handled; no false saved status | L07, L10 |
| A10 | Actual test output, student-owned code explanation, evidence/AI/release log | L09–L11 |

**Non-negotiable gate:** A08, data preservation and secret safety must be passed before a **Ready for local demo** claim. A learner may still document a legitimate Hold result as engineering reflection, but a *Hold* does not unlock successful final capstone completion; remediation is required. Never imply public production approval.

## 7. Final rubric, self-assessment, and independent explanation

Based on original instructor C40 (100 points): problem/scope 10; JavaScript/React independence 15; API behavior/validation 15; PostgreSQL migration/persistence 15; authorization/privacy 15; testing/debug/evidence 15; AI review 10; communication/Git/handoff 5. Require at least **three** documented debugging labs, including omitted-vs-null PATCH or owner isolation, and **ten** of the original twenty oral reasoning prompts answered without an AI tool. At least one from each essential layer: React, HTTP/API, SQL, authorization, tests, and AI review. Learner score and rubric commentary must be labeled **self-assessed** unless separately observed by an instructor.

**Phase 2 readiness recommendation:** 85–100 and all critical safety gates → suggested readiness; 70–84 with gates passed → guided reinforcement; below 70 → revisit one scoped feature. This is learning guidance, not a legally meaningful credential. The application must avoid awarding a verified certificate based solely on editable local progress.

## 8. Ten debugging-lab scenario intents (future content)

1. Priority renders but resets on refresh — missing POST/SQL field.
2. Date shifts by one day — calendar DATE versus local timestamp conversion.
3. `2026-02-30` accepted — regex without true calendar validation.
4. Priority-only PATCH clears date — omitted versus null distinction.
5. Bob edits Alice's priority — missing owner SQL filter (critical).
6. Date input clears but Save fails — empty text not converted to null.
7. UI says saved after HTTP 400 — failure response ignored.
8. API 500 after schema change — migration not applied or query mismatch.
9. Completed task counted overdue — missing completed filter in pure helper.
10. Agent recommends DROP TABLE — destructive, reject and use additive recovery.

Student lab reply: **symptom → evidence → hypothesis → smallest safe experiment → correction → regression check**. These are prompts, not actual inserted live bugs or executed solutions. Do not bundle the original instructor C39 solutions.

## 9. Source privacy, offline behavior, and cross-week consistency

- Public Fieldbook contains student-authored explanatory text, synthetic examples, reviewed quizzes and bounded pure-JS exercises; original teacher answer key C39 and full reference appendix C44 remain private.
- The actual capstone requires local npm/PostgreSQL/Git tools; the academy must make setup/test instructions readable offline and offer explicit safety instructions. No premium AI, public hosting or live demo URL required.
- Reuse Week 11 auth/session model and test safety rules; Week 12 migration is additive and does not affect Week 9 legacy rows or assign ownership to arbitrary users.
- Stable lesson IDs remain `p1-w12-l01`–`l11`; checkpoints have stable IDs. Do not infer unlock status from lesson headings.
- The final course-completed state requires all mandatory Week 1–12 gates and Week 12 final readiness. Work not externally inspected stays self-attested and locally editable.

## 10. Owner review checklist

- [x] Owner approves Week 12's **11-lesson** sequence and the 27-checkpoint method allocation (24 required, three optional).
- [ ] Owner confirms priority + optional due date as the required vertical slice; dashboard/public hosting optional.
- [ ] Owner approves A01–A10 evidence matrix and non-compensatory authorization/data-safety/secret gate.
- [ ] Owner approves completion wording: course-completed learning milestone, **not** automatically certified production competence.
- [ ] Owner confirms the 100-point rubric is self-assessment guidance, not a remotely verified exam score.
- [ ] After approval, complete **cross-week D0 closeout** (all 12 weeks, prerequisites, reset/import schema, DEC-19, source rights/DEC-18 release dependency) before signing D0 as a whole.

**Current status:** Week 11 is structurally approved A-012; Week 12 is structurally approved **A-013**. Neither approval constitutes finished lesson content or a completed learner pilot. D0/D1 remain unsigned and D2 code authorization remains **NOT GRANTED**.
