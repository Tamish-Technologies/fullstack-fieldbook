# Proposed Phase 1 Student Lesson Map — FOR APPROVAL

> **CURRENT AUTHORITATIVE PLANNING STATUS — 2026-11-17:** All 12 weekly educational BLUEPRINT STRUCTURES have owner approval (Week 12 = **A-013**). The D0 **cross-week audit is prepared**, but the owner has **not yet signed off D0**. All learner-ready content, question banks, code runners and pilots remain future work. D1 visual approval and explicit D2 coding authorization are also pending. Historical status notices in this document describe prior snapshots and are superseded by `docs/product/D0_OWNER_SIGNOFF.md` and `docs/product/D0_APPROVAL_LOG.md`.

> **Current structural baseline (2026-11-17):** All twelve weekly structures are owner-approved through A-013. Total 138 lesson slots, including one optional Week 4 L10; 137 mandatory lessons. This count is provisional under DEC-19, and prior “draft/pending” labels further down are archived planning snapshots. See `D0_CROSS_WEEK_AUDIT.md` and `D0_PREREQUISITE_CONTRACT.md`.





This is a **first-pass information architecture** grounded in the actual original chapter inventory. It is intentionally a proposal, not a claim that all lessons have been written or fully vetted. Mapping may be split/merged during source-level educational review.

## Key

- Stable IDs: `p1-wNN-lNN`; never reuse an ID for a different lesson once published.
- Source references: `C##` = numbered chapter of the corresponding original Week NN instructor guide.
- Mode values: `concept-check` = answer/reading check; `browser-practice` = HTML/CSS/JS interactive lab; `js-check` = deterministic JS exercise; `sql-check` = query reasoning (not a real browser database); `external-lab` = locally run project/test evidence; `debug-lab` = diagnose faulty logic; `self-check` = structured review; `weekly-gate` = required week-specific independent project gate.
- Every proposed lesson additionally needs goals, prior knowledge, practical examples, hint ladder, acceptance criteria and reviewed questions; these are created during the content conversion stage.
- **Weeks 1–9 have owner-approved D0 planning structures** (A-001/A-003–A-010) using DEC-21 methods (`quiz-auto`, `browser-code-auto`, `local-project-self-verified`, `optional-enrichment`). **Week 10 is a source-inspected D0 draft** awaiting owner review. Weeks 11–12 retain broad first-pass planning labels. This does not approve the provisional 138-lesson count or completed student assessments.

## Week 01: HTML, CSS and JavaScript refresher — structural plan OWNER APPROVED (A-001)
Project: Study Tasks v1. **12 proposed lessons; 20 proposed checkpoints (18 required, 2 optional).** Week 1 mapping is source-inspected and **owner-approved as a planning structure**, not as finished assessments or tested application code.

| Stable lesson ID | Proposed lesson title | Original chapters | DEC-21 checkpoint methods |
|---|---|---|---|
| `p1-w01-l01` | Orientation, tools and safe AI learning | C01, C02, C09 | `quiz-auto` + optional enrichment |
| `p1-w01-l02` | Semantic HTML and page landmarks | C03 | `browser-code-auto` |
| `p1-w01-l03` | Forms, labels and native validation | C03 | `browser-code-auto` + `quiz-auto` |
| `p1-w01-l04` | CSS selectors, cascade and box model | C04 | `browser-code-auto` |
| `p1-w01-l05` | Responsive layout with Flexbox | C04, C12 | `browser-code-auto` (D4 feasibility review) |
| `p1-w01-l06` | JavaScript values and variables | C05 | `quiz-auto` |
| `p1-w01-l07` | Functions and conditionals | C05 | `browser-code-auto` |
| `p1-w01-l08` | DOM selection and safe text nodes | C06 | `browser-code-auto` + `quiz-auto` |
| `p1-w01-l09` | Form events and task interactions | C06 | `browser-code-auto` |
| `p1-w01-l10` | DevTools: inspect, console, breakpoints | C07, C12 | `quiz-auto` + `local-project-self-verified` |
| `p1-w01-l11` | Git checkpoints and AI code review | C02, C08, C09 | `local-project-self-verified` + `quiz-auto` + optional enrichment |
| `p1-w01-l12` | Week 1 Study Tasks mini project and readiness check | C06, C10–C14, C16 | `local-project-self-verified` + `quiz-auto` + independent self-verification |

**Detailed Week 1 source of truth:** `WEEK01_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK01_CHECKPOINT_INVENTORY.md`, `WEEK01_SOURCE_TRACEABILITY.md`, `WEEK01_ASSESSMENT_ITEM_PLAN.md`. Source ZIP contains the original Week 1 starter/reference; reference remains private. The original C13 75/100 coach rubric is **non-gating**; agreed DEC-21 checks determine Week 2 unlocking. Complete question banks, learner testing and code-runner feasibility are still pending D3/D4.

## Week 02: JavaScript data structures and application state — structural plan OWNER APPROVED (A-003)
Project: Study Tasks v2. **11 approved lesson slots; 22 approved checkpoint slots (19 required, 3 optional); 8 quizzes/45 planned scored item slots.** Source-inspected **structural approval**, not finished or executed assessment content.

| Stable lesson ID | Proposed lesson title | Original chapters | DEC-21 checkpoint methods |
|---|---|---|---|
| `p1-w02-l01` | Model a task with objects and stable IDs | C03,C07 | `quiz-auto` + `browser-code-auto` |
| `p1-w02-l02` | Functions, return values and callbacks | C04 | `browser-code-auto` + optional enrichment |
| `p1-w02-l03` | forEach, map, filter, find and reduce | C05 | `browser-code-auto` + `quiz-auto` |
| `p1-w02-l04` | State versus rendered DOM | C06 | `quiz-auto` |
| `p1-w02-l05` | Render tasks from a single source of truth | C06,C07 | `browser-code-auto` |
| `p1-w02-l06` | Add, complete and delete by task ID | C07 | `browser-code-auto` |
| `p1-w02-l07` | Safe text rendering and DOM events | C08 | `browser-code-auto` + `quiz-auto` |
| `p1-w02-l08` | JSON serialization and localStorage | C09 | `browser-code-auto` + `quiz-auto` |
| `p1-w02-l09` | Task filters, counts and empty states | C10 | `browser-code-auto` + `quiz-auto` |
| `p1-w02-l10` | Debug state and storage bugs with AI review | C11,C12 | `local-project-self-verified` + `quiz-auto` + optional enrichment |
| `p1-w02-l11` | Week 2 Study Tasks project + knowledge check | C13–C17,C20; private C18–C19 reference | `local-project-self-verified` (2) + `quiz-auto` + optional enrichment |

**Detailed owner-approved Week 2 D0 planning baseline:** `WEEK02_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK02_CHECKPOINT_INVENTORY.md`, `WEEK02_ASSESSMENT_ITEM_PLAN.md`, `WEEK02_SOURCE_TRACEABILITY.md`; D5 learner review: `docs/quality/WEEK02_PILOT_PROTOCOL.md`. No final questions or automated tests have been implemented. Original C18–C19 and completed reference ZIP are private.

## Week 03: DOM, modules, editing, sorting and testing — structural plan OWNER APPROVED (A-004)
Project: Study Tasks v3. **11 owner-approved lesson slots; 24 approved checkpoint slots (21 required, 3 optional); 8 quizzes / 45 planned item slots.** Approved as D0 **structure** A-004, not authored, run or approved for publication.

| Stable lesson ID | Proposed learner-facing lesson | Original chapters | DEC-21 checkpoint methods |
|---|---|---|---|
| `p1-w03-l01` | From user intent to pure data transformations | C03,C04 | `quiz-auto` + `browser-code-auto` |
| `p1-w03-l02` | Validation and immutable task edits | C04,C05 | `browser-code-auto` + `quiz-auto` |
| `p1-w03-l03` | Stable IDs and non-mutating sorting | C05 | `browser-code-auto` + `quiz-auto` |
| `p1-w03-l04` | ES modules and the local development server | C02,C06 | `local-project-self-verified` + `quiz-auto` |
| `p1-w03-l05` | Event bubbling and delegated handlers | C07 | `browser-code-auto` + `quiz-auto` |
| `p1-w03-l06` | Inline editing as a state machine | C08,C11 | `browser-code-auto` + optional enrichment |
| `p1-w03-l07` | Search, status filters, sorting and empty states | C05,C09 | `browser-code-auto` + `quiz-auto` |
| `p1-w03-l08` | Storage recovery, safe rendering and accessible focus | C10,C11 | `browser-code-auto` + `local-project-self-verified` |
| `p1-w03-l09` | Repeatable debugging and meaningful tests | C12,C13 | `browser-code-auto` |
| `p1-w03-l10` | Reviewing AI suggestions and Git diffs | C02,C14 | `quiz-auto` + `local-project-self-verified` + optional enrichment |
| `p1-w03-l11` | Week 3 project, transfer challenge and readiness | C15–C19,C22; private C20–C21 | `local-project-self-verified` (2) + `quiz-auto` + optional enrichment |

**Detailed owner-approved Week 3 planning baseline:** `WEEK03_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK03_CHECKPOINT_INVENTORY.md`, `WEEK03_ASSESSMENT_ITEM_PLAN.md`, `WEEK03_SOURCE_TRACEABILITY.md`; D5 Week 3 learner-pilot plan: `docs/quality/WEEK03_PILOT_PROTOCOL.md`. Instructor C19 answer key, C20–C21 and `reference-solution/` remain private. **A-004 owner structural approval recorded; D5 lesson writing, runner tests and learner pilot are pending.**

## Week 04: Promises, async/await, HTTP and fetch — D0 structural baseline APPROVED (A-005)
Project: Study Tasks v4 / Study Idea Inbox. **12 lesson slots (11 required plus optional advanced L10), 25 checkpoint slots (21 required, 4 optional): 9 quizzes / 50 draft scored item slots, 8 browser-code tests, 4 locally self-verified checks.** Source-inspected, NOT finished or pilot-validated student content.

| Stable lesson ID | Proposed student lesson | Original chapters | DEC-21 methods |
|---|---|---|---|
| `p1-w04-l01` | How asynchronous work changes control flow | C03,C04 | `quiz-auto` + `browser-code-auto` |
| `p1-w04-l02` | Promises, fulfillment, rejection and chaining | C05 | `browser-code-auto` |
| `p1-w04-l03` | async/await, try/catch and finally | C06 | `browser-code-auto` + `quiz-auto` |
| `p1-w04-l04` | HTTP messages, URLs, methods and status codes | C07 | `quiz-auto` |
| `p1-w04-l05` | REST resources, CRUD and fake-API limits | C08 | `quiz-auto` + optional enrichment |
| `p1-w04-l06` | JSON validation at the network boundary | C09,C15 | `browser-code-auto` + `quiz-auto` |
| `p1-w04-l07` | fetch, response.ok and fake-network tests | C10,C15 | `browser-code-auto` + `quiz-auto` |
| `p1-w04-l08` | Use Network DevTools to diagnose failure | C11,C20 | `local-project-self-verified` + `quiz-auto` |
| `p1-w04-l09` | Loading, success, empty and error UI states | C12 | `browser-code-auto` + `quiz-auto` |
| `p1-w04-l10` | Optional advanced lab: cancellation and stale results | C13 | **optional-enrichment only (2); no gate** |
| `p1-w04-l11` | Study Idea Inbox, offline fixture and safe local import | C14,C15 | `browser-code-auto` (2) + `local-project-self-verified` |
| `p1-w04-l12` | Week 4 integration, independent transfer and readiness | C02,C16–C22,C24; private C23 | `local-project-self-verified` (2) + `quiz-auto` + optional enrichment |

**Week 4 documents (A-005 approved planning structure):** `WEEK04_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK04_CHECKPOINT_INVENTORY.md`, `WEEK04_ASSESSMENT_ITEM_PLAN.md`, `WEEK04_SOURCE_TRACEABILITY.md`, and D5 pilot `docs/quality/WEEK04_PILOT_PROTOCOL.md`. L11 requires L09, **not** the optional L10; cancellation is stretch. All required work uses bundled offline fake responses for grading. Reference C23 and `reference-solution/` remain private; no browser/API tests have been run for Fieldbook yet. **A-005 structural approval recorded; student content, graded tests and D5 pilot remain pending.**


## Week 05: React fundamentals and state — D0 structural plan OWNER APPROVED (A-006)
Project: Study Tasks v5 (React **JavaScript** local task core; Week 4 Idea Inbox returns Week 6).

| Stable lesson ID | Proposed lesson title | Original chapters | DEC-21 verification |
|---|---|---|---|
| `p1-w05-l01` | Imperative DOM versus React mental model | C01,C02,C03 | `quiz-auto` |
| `p1-w05-l02` | Node, npm, Vite and React project setup | C02,C04,C15,C21 | `local-project-self-verified` + `quiz-auto` |
| `p1-w05-l03` | JSX syntax, expressions and safe output | C05,C18 | `quiz-auto` (actual JSX in local project later) |
| `p1-w05-l04` | Reusable function components and composition | C03,C06,C15 | `quiz-auto` + `local-project-self-verified` |
| `p1-w05-l05` | Props, read-only data and callback flow | C06,C10 | `quiz-auto` + `local-project-self-verified` |
| `p1-w05-l06` | useState, snapshots and functional state updates | C07,C16,C18 | `quiz-auto` + `local-project-self-verified` |
| `p1-w05-l07` | React events, controlled forms and validation | C08,C17,C18 | `browser-code-auto` (pure JS) + `local-project-self-verified` + optional polish |
| `p1-w05-l08` | Lists, stable keys and immutable task CRUD | C09,C17,C18 | `quiz-auto` + `browser-code-auto` (pure JS) + `local-project-self-verified` |
| `p1-w05-l09` | State ownership, toolbar and derived values | C03,C10,C17 | `quiz-auto` + `browser-code-auto` (pure JS) |
| `p1-w05-l10` | Lazy initialization, useEffect persistence and origin boundaries | C11,C12,C17 | `quiz-auto` + `local-project-self-verified` + optional migration |
| `p1-w05-l11` | Study Tasks v5 rebuild, debugging and readiness | C01,C02,C12–C23 | `local-project-self-verified` (2) + `quiz-auto` + optional edit |

**Week 5 D0 documents (approved planning structure A-006):** `WEEK05_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK05_CHECKPOINT_INVENTORY.md`, `WEEK05_ASSESSMENT_ITEM_PLAN.md`, `WEEK05_SOURCE_TRACEABILITY.md`; future D6 pilot `docs/quality/WEEK05_PILOT_PROTOCOL.md`. **11 required lessons / 25 checkpoints (22 required, 3 optional)**; 10 quiz groups / 57 intended question slots; three sandbox checks only for pure JS, nine local self-attestations for real React/Vite work. Edit/migration optional. **Owner-approved structure A-006; no actual React app automatically tested by Fieldbook.**

## Week 06: React hooks, APIs and routing — D0 DRAFT (owner review pending)
Project: Study Tasks v6 (Week 5 React local tasks + read-only, offline-capable Idea Inbox; client routing; no custom backend).

| Stable lesson ID | Proposed lesson title | Original chapters | Assessment mode |
|---|---|---|---|
| `p1-w06-l01` | React API-client boundaries and untrusted JSON | C01,C03–C06,C21 | `quiz-auto` + `browser-code-auto` (pure JS) |
| `p1-w06-l02` | Effect versus render versus event handlers | C03,C07 | `quiz-auto` |
| `p1-w06-l03` | Async Effects, dependencies, cancellation and stale results | C07–C09,C20 | `quiz-auto` + `local-project-self-verified` |
| `p1-w06-l04` | Four honest API UI states | C10,C20 | `quiz-auto` + `local-project-self-verified` |
| `p1-w06-l05` | Retry, offline samples and safe idea copying | C11,C20 | `quiz-auto` + `local-project-self-verified` |
| `p1-w06-l06` | React Router and client-side route mapping | C12,C24 | `quiz-auto` + `local-project-self-verified` |
| `p1-w06-l07` | Accessible links, active navigation and deep links | C13,C20 | `quiz-auto` + `local-project-self-verified` |
| `p1-w06-l08` | Share task state above route boundaries | C03,C14 | `quiz-auto` + `local-project-self-verified` |
| `p1-w06-l09` | Persist tasks across navigation and browser refresh | C15,C20 | `quiz-auto` + `local-project-self-verified` |
| `p1-w06-l10` | Fake-fetch tests and systematic async debugging | C20,C21 | `browser-code-auto` (pure JS) + `local-project-self-verified` |
| `p1-w06-l11` | Review AI-generated React changes without surrendering understanding | C16,C24 | `quiz-auto` + optional AI exercise |
| `p1-w06-l12` | Study Tasks v6 project, transfer debug and Week 7 readiness | C01,C02,C17–C19,C22–C26 | `local-project-self-verified` (2) + `quiz-auto` + 2 optional |

**Week 6 documents (D0 structure owner-approved A-007):** `WEEK06_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK06_CHECKPOINT_INVENTORY.md`, `WEEK06_ASSESSMENT_ITEM_PLAN.md`, `WEEK06_SOURCE_TRACEABILITY.md`; future D6 pilot `docs/quality/WEEK06_PILOT_PROTOCOL.md`. **12 required lessons / 26 checkpoints (23 required, 3 optional)**: 11 quizzes / 61 item slots, **2 isolated pure-JS tests**, **10 real React local attestations**. Offline samples + controlled fake fetch required for fair assessment; React builds/routing remain self-verified. **A-007 approves the planning structure only; student content/tests/pilot still pending.**


**A-007 approval note:** Week 6 blueprint and 26 checkpoint slots are owner-approved as a **planning structure**; finished question banks, actual React/Vite tests and learner pilot remain pending.

## Week 07: Node.js and Express REST API — D0 STRUCTURAL APPROVAL A-008
Project: Study Tasks API v1. **12 proposed required lessons; 27 checkpoint slots (24 required: 12 quizzes / 2 isolated plain-JS tests / 10 local attestations; 3 optional); 66 intended quiz-item slots.** Real backend lives in learner's local Node process; **not** a backend added to the Fieldbook platform.

| Stable lesson ID | Proposed lesson title | Original chapters | DEC-21 verification methods |
|---|---|---|---|
| `p1-w07-l01` | Node.js runtime, npm and ESM foundations | C01–C05 | `quiz-auto` + `local-project-self-verified` |
| `p1-w07-l02` | HTTP messages and REST endpoint contracts | C06 | `quiz-auto` |
| `p1-w07-l03` | Express app, health route and route order | C07,C14 | `quiz-auto` + `local-project-self-verified` |
| `p1-w07-l04` | Middleware, JSON parsing and safe error responses | C08,C14 | `quiz-auto` + `local-project-self-verified` |
| `p1-w07-l05` | GET collections, query filters and path IDs | C09 | `quiz-auto` + `local-project-self-verified` |
| `p1-w07-l06` | In-memory repository, stable IDs and data lifecycle | C10 | `browser-code-auto` + `quiz-auto` |
| `p1-w07-l07` | Validate task bodies, IDs and filters at the boundary | C11 | `browser-code-auto` + `quiz-auto` |
| `p1-w07-l08` | POST creation, status 201 and Location | C12 | `quiz-auto` + `local-project-self-verified` |
| `p1-w07-l09` | PATCH, DELETE, 204 and missing-resource handling | C13,C14 | `quiz-auto` + `local-project-self-verified` |
| `p1-w07-l10` | Manual HTTP tools, repeatable API tests and debugging | C15,C16,C23 | `local-project-self-verified` + `quiz-auto` |
| `p1-w07-l11` | Read-only React API lab, layered debugging and AI review | C03,C17–C19 | `local-project-self-verified` + `quiz-auto` + `optional-enrichment` |
| `p1-w07-l12` | Week 7 API v1 capstone, independent debugging and Week 8 readiness | C01–C03,C20–C27 | `local-project-self-verified` + `quiz-auto` + `optional-enrichment` |

**Week 7 planning structure owner-approved A-008:** `WEEK07_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK07_CHECKPOINT_INVENTORY.md`, `WEEK07_ASSESSMENT_ITEM_PLAN.md`, `WEEK07_SOURCE_TRACEABILITY.md` and `docs/quality/WEEK07_PILOT_PROTOCOL.md`. All C01–C27 and 68 code ZIP entries traced. The in-memory server resets on process restart. React `/server` is GET-only; React write integration = Week 8, PostgreSQL = Week 9. Exact learner-facing questions, executable tests and D7 pilot are *not* done. A-008 structural approval recorded; actual educational content/tests/pilot still pending.

## Week 08: React–Express full-stack integration — D0 OWNER-APPROVED STRUCTURE A-009
Project: Study Tasks v8. **11 proposed required lessons / 27 checkpoints (24 required: 11 quizzes, 3 isolated fake-fetch browser-JS suites, 10 real local-project attestations; 3 optional)**, and **66 proposed scored quiz items**. Full frontend/backend behavior is **self-verified**; no automatic React/Express evaluation inside Fieldbook.

| Stable lesson ID | Proposed title | Original source | DEC-21 verification |
|---|---|---|---|
| `p1-w08-l01` | Two-process architecture and server-owned task state | C01–C06,C09 | quiz-auto + local-project-self-verified |
| `p1-w08-l02` | Same origin, CORS, and the Vite proxy | C06–C08 | quiz-auto + local-project-self-verified + optional-enrichment |
| `p1-w08-l03` | Reusable API client, response contracts and validation | C05,C10–C11,C20 | quiz-auto + browser-code-auto |
| `p1-w08-l04` | GET tasks, useEffect and honest loading states | C09,C12,C19 | quiz-auto + local-project-self-verified |
| `p1-w08-l05` | POST creation and server-confirmed task IDs | C05,C13,C17 | quiz-auto + local-project-self-verified |
| `p1-w08-l06` | PATCH completion and rename without losing drafts | C05,C14–C15 | quiz-auto + local-project-self-verified |
| `p1-w08-l07` | DELETE, 204 No Content and confirmed UI changes | C05,C11,C16,C20 | quiz-auto + browser-code-auto + local-project-self-verified |
| `p1-w08-l08` | Pending mutations, races and route continuity | C17–C19,C22 | quiz-auto + local-project-self-verified + optional-enrichment |
| `p1-w08-l09` | Mock-fetch unit tests and layered debugging | C08,C11,C20–C22,C27 | quiz-auto + browser-code-auto + local-project-self-verified |
| `p1-w08-l10` | API-contract code review and bounded AI assistance | C22–C23,C26,C28 | quiz-auto + local-project-self-verified + optional-enrichment |
| `p1-w08-l11` | Study Tasks v8 end-to-end CRUD and Week 9 readiness | C01–C03,C18,C21,C24–C31 | quiz-auto + local-project-self-verified |

**D0 documents:** `WEEK08_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK08_CHECKPOINT_INVENTORY.md`, `WEEK08_ASSESSMENT_ITEM_PLAN.md`, `WEEK08_SOURCE_TRACEABILITY.md`, future D7 `docs/quality/WEEK08_PILOT_PROTOCOL.md`, and tool-independent read-only `prompts/11_UNIVERSAL_D0_WEEK08_BLUEPRINT_REVIEW.md`. Week 7 contract remains GET 200, POST 201 server-assigned ID, PATCH 200, DELETE 204 empty, 400/404 errors and 80-character title limit. The **Express memory store resets when Node restarts**; PostgreSQL persistence begins Week 9. The old React localStorage task data must not be silently erased/imported. **Owner-approved structural baseline A-009; no student lesson code or tests have run.**

## Week 09: PostgreSQL, SQL and persistence — D0 SOURCE-INSPECTED DRAFT (owner review pending)

Project: Study Tasks v9. Preserve all **12 originally proposed stable lesson IDs**. PostgreSQL replaces the Week 8 in-memory Express store; the React/API contract stays compatible. **27 proposed checkpoints = 24 required (12 quizzes/72 intended item slots, 2 isolated pure-JS fake-pool browser tests, 10 learner-run local PostgreSQL attestations) + 3 optional**. Browser code tests **do not execute SQL**.

| Stable lesson ID | Proposed title | Original source chapters | DEC-21 verification |
|---|---|---|---|
| `p1-w09-l01` | What a relational database solves | C01,C03–C05,C18 | quiz-auto |
| `p1-w09-l02` | Install and connect PostgreSQL locally | C02,C06,C21,C26 | local-project-self-verified + quiz-auto |
| `p1-w09-l03` | Table schema, types and constraints | C05,C07,C11,C17 | local-project-self-verified + quiz-auto |
| `p1-w09-l04` | SELECT, WHERE, ORDER BY | C08,C27,C29 | local-project-self-verified + quiz-auto |
| `p1-w09-l05` | INSERT, RETURNING and defaults | C09,C15,C27 | local-project-self-verified + quiz-auto |
| `p1-w09-l06` | UPDATE and DELETE safely | C10,C16,C21,C27 | local-project-self-verified + quiz-auto + optional-enrichment |
| `p1-w09-l07` | Migrations and safe schema setup | C07,C11,C23 | local-project-self-verified + quiz-auto |
| `p1-w09-l08` | pg Pool and application configuration | C02,C12,C19 | local-project-self-verified + quiz-auto |
| `p1-w09-l09` | SQL repository and query boundaries | C13–C16,C18,C20,C33 | browser-code-auto + local-project-self-verified + quiz-auto |
| `p1-w09-l10` | Parameterized SQL and safe error handling | C17,C19,C21,C22 | browser-code-auto + quiz-auto + optional-enrichment |
| `p1-w09-l11` | Database test separation and persistence checks | C18,C20–C22,C26,C27 | local-project-self-verified + quiz-auto + optional-enrichment |
| `p1-w09-l12` | Week 9 persistent Study Tasks proof and Week 10 readiness | C01–C03,C18,C23–C34 | local-project-self-verified + quiz-auto |

**D0 documents:** `WEEK09_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK09_CHECKPOINT_INVENTORY.md`, `WEEK09_ASSESSMENT_ITEM_PLAN.md`, `WEEK09_SOURCE_TRACEABILITY.md`, future `docs/quality/WEEK09_PILOT_PROTOCOL.md` and `prompts/12_UNIVERSAL_D0_WEEK09_BLUEPRINT_REVIEW.md`. Critical local safeguards include `.env` privacy, separate `study_tasks_week9_test` and no deceptive “PostgreSQL passed automatically” labels. **Week 9 structure owner-approved A-010; actual learner content and tests pending.**

## Week 10: Authentication, sessions and authorization
Project: Study Tasks v10.

| Stable lesson ID | Proposed lesson title | Original chapters | Assessment mode |
|---|---|---|---|
| `p1-w10-l01` | Identity, authentication and authorization | C05 | quiz-auto |
| `p1-w10-l02` | Sessions, cookies and login lifecycle | C06 | quiz-auto |
| `p1-w10-l03` | Password hashing and secure handling | C07, C08 | quiz-auto + local-project-self-verified |
| `p1-w10-l04` | Users, task ownership and migrations | C09, C10 | quiz-auto + local-project-self-verified |
| `p1-w10-l05` | Registration and input validation | C11, C12, C13 | quiz-auto + browser-code-auto + local-project-self-verified |
| `p1-w10-l06` | Login, /me, logout and sessions | C14, C15 | quiz-auto + local-project-self-verified |
| `p1-w10-l07` | CSRF and origin controls | C16 | quiz-auto + local-project-self-verified |
| `p1-w10-l08` | RequireAuth and database ownership clauses | C17, C18, C19 | quiz-auto + browser-code-auto + local-project-self-verified |
| `p1-w10-l09` | React login/session state | C20, C21, C22 | quiz-auto + local-project-self-verified |
| `p1-w10-l10` | Two-account access control tests | C23, C24, C25 | quiz-auto + local-project-self-verified |
| `p1-w10-l11` | Security-conscious AI code review | C26 | quiz-auto + local-project-self-verified |
| `p1-w10-l12` | Week 10 multi-user acceptance gate | C27, C28, C29, C30, C31, C32, C33, C34 | quiz-auto + local-project-self-verified |

**Proposed:** 12 learner lessons. Week gate must include real project readiness criteria; final pass is not merely a reading-complete checkbox.

## Week 11: Testing, security and deployment readiness
Project: Study Tasks v11.

| Stable lesson ID | Proposed lesson title | Original chapters | Assessment mode |
|---|---|---|---|
| `p1-w11-l01` | Testing layers and Arrange–Act–Assert | C01–C05 | `quiz-auto` + `local-project-self-verified` |
| `p1-w11-l02` | Node tests, HTTP contracts and test double limits | C06–C08 | `quiz-auto` + `local-project-self-verified` |
| `p1-w11-l03` | Safe DB testing and Alice/Bob browser verification | C09–C10 | `quiz-auto` + `local-project-self-verified` + `optional-enrichment` |
| `p1-w11-l04` | DevTools, failure reproduction and sanitized request IDs | C11–C13 | `quiz-auto` + `browser-code-auto` + `local-project-self-verified` |
| `p1-w11-l05` | Safe API errors and resilient React recovery | C14–C15 | `quiz-auto` + `browser-code-auto` + `local-project-self-verified` |
| `p1-w11-l06` | Secrets, configuration and fail-fast startup | C16–C17 | `quiz-auto` + `local-project-self-verified` |
| `p1-w11-l07` | HTTP headers, HTTPS, cookies and security review | C18–C20 | `quiz-auto` + `local-project-self-verified` + `optional-enrichment` |
| `p1-w11-l08` | Liveness vs readiness and safe outage simulation | C21 | `quiz-auto` + `local-project-self-verified` |
| `p1-w11-l09` | Production-style built React single-origin preview | C22 | `quiz-auto` + `local-project-self-verified` |
| `p1-w11-l10` | Migrations, release gates, optional hosting and rollback | C23–C26 | `quiz-auto` + `local-project-self-verified` + `optional-enrichment` |
| `p1-w11-l11` | AI review, release report and Week 12 readiness | C27–C40 (instructor-only C36/C40) | `quiz-auto` + `local-project-self-verified` |

**Proposed:** 11 learner lessons. Week gate must include real project readiness criteria; final pass is not merely a reading-complete checkbox.

## Week 12: Full-stack capstone and final assessment — D0 SOURCE-INSPECTED DRAFT (owner review pending)

Project: Study Tasks v12 (priority + optional date-only due date). **A01–A10** are required; dashboard presentation/public deployment optional. Entry depends on Week 11 mandatory readiness.

| Stable lesson ID | Proposed lesson title | Original chapters | DEC-21 methods |
|---|---|---|---|
| `p1-w12-l01` | Capstone mission, baseline and acceptance evidence | C01–C06 | quiz + local self-verification |
| `p1-w12-l02` | Trace request, safe Git branch and AI log | C07–C09 | quiz + local self-verification + optional |
| `p1-w12-l03` | User stories, feature slicing and implementation plan | C10–C11 | quiz + local self-verification |
| `p1-w12-l04` | Additive migration and calendar date-only semantics | C12–C13 | quiz + local self-verification |
| `p1-w12-l05` | API contracts, true date validation and PATCH semantics | C14–C15 | quiz + isolated JS + local self-verification |
| `p1-w12-l06` | Owner-scoped SQL, repositories and API-client shape | C16–C17 | quiz + local self-verification |
| `p1-w12-l07` | Controlled React forms and server-confirmed updates | C18–C19 | quiz + local self-verification |
| `p1-w12-l08` | Pure due-date classification and optional dashboard | C20 | quiz + isolated JS + local self-verification + optional |
| `p1-w12-l09` | Unit, HTTP, SQL, browser and Alice/Bob evidence | C21–C26 | quiz + local self-verification |
| `p1-w12-l10` | Debugging, privacy review and release decisions | C27–C31 | quiz + local self-verification |
| `p1-w12-l11` | Independent demo, rubric, exit assessment and Phase 2 readiness | C32–C45 | quiz + local self-verification + optional |

**Proposed Week 12:** 11 required lessons, 27 checkpoints = 24 required (11 quiz groups / 66 future question intentions; two isolated pure-JS browser checks; 11 local project self-verifications) + three optional. Original C39 answer key and C44 reference remain private. Capstone evidence, safe owner isolation and independent explanation are required; progress is local, not official certification.

**Provisional course-wide total:** 138 proposed lesson IDs (Week 12 same eleven IDs as original map). This count is still **DEC-19 OPEN** until the full D0/pilot process; no implementation authorization.

## Required coverage check before a week is called complete

Verify each original instructional chapter is represented or its omission is justified; preserve important code examples, misconceptions and exercises; test all runnable examples; manually review explanations and answers; verify project continuity and original archive version; confirm that practical outputs are graded honestly; ensure published lesson content does not inadvertently embed the instructor-only solution package.


### Week 10 source-inspected D0 assessment allocation (owner review pending)

The existing **12 stable `p1-w10-l01`–`p1-w10-l12` IDs and titles above are preserved**. The source-inspected Week 10 blueprint proposes **27 checkpoints**: 24 required = 12 quiz groups/72 question intents + 2 isolated pure-JS sandbox checks (credential validation; fake-pool owner-scope capture) + 10 real locally self-verified auth/authorization labs, and 3 optional enrichment items. The original 38 instructor chapters and 125 code archive entries are mapped in `WEEK10_SOURCE_TRACEABILITY.md`. Week 10 belongs to D8 (student Weeks 10–12). Week 9 is owner-approved A-010; Week 10 is a draft. Old shared Week 9 `tasks` must not be assigned to arbitrary new users. A browser JS fake-pool test is not proof of live authorization. D0/D1 pending, D2 not authorized.

## Week 11 D0 detailed-map update (draft, 2026-11-17)

The 11 stable Week 11 IDs above are now source-inspected in `WEEK11_LESSON_ASSESSMENT_BLUEPRINT.md`. **27 proposed checks:** 11 `quiz-auto`, 2 `browser-code-auto` (pure JS, synthetic data only), 11 `local-project-self-verified` and 3 optional. **66 planned quiz item slots** are question intentions only. Week 10 is structurally accepted A-011. Local preview plus truthful release report is mandatory; public hosting is optional. Week 11 was subsequently **structurally approved A-012**; its earlier draft status is historical.

## Latest D0 map status — Week 11 A-012 / Week 12 draft (2026-11-17)

Weeks 1–11 are now structurally owner-approved. Week 12's 11 lessons and 27 checkpoint slots have source and grading-method allocations, but they still require owner structural signoff. This does not constitute finished lesson content, complete student test banks, learner pilots or final D0/D1 approval. Cross-week prerequisites and mastery reset/import assumptions require one final D0 closeout pass.
