# Week 8 Lesson & Assessment Blueprint — D0 Owner-Approved Structure A-009

**Product:** FullStack Fieldbook · Phase 1, student Week 8  
**Owner status:** **D0 STRUCTURAL APPROVAL A-009** (Week 7 approved as A-008). This approves the lesson/checkpoint plan only, not authored content, runtime tests, or a learner pilot.  
**Platform development stage:** **D7** (authoring student Weeks 7–9); this document does **not** authorize D7 or D2 implementation.  
**Source:** original Week 8 instructor source Markdown C01–C32 and 77-entry starter/reference code ZIP.  
**Project:** **Study Tasks v8**, connecting the Week 6 React app and Week 7 in-memory Express API.

> **Core promise:** A student should be able to trace, build, debug, and explain an actual React → HTTP → Express request. The Fieldbook academy website itself remains static, browser-local and backend-free. Its browser exercises do not start Express or inspect local React projects.

## 1. Scope and non-negotiable boundaries

Week 7 left **two different task stores**: localStorage-backed tasks on `/tasks` and a separate in-memory Express store visible from the read-only `/server` lab. Week 8 makes **Express the authoritative task store** for React create/read/update/delete actions. React keeps a *snapshot* for rendering; it never assigns authoritative server IDs, treats a failed mutation as success, or silently migrates previous localStorage tasks. Existing localStorage entries should not be deleted without an explicit decision.

- **Must:** GET server tasks; POST create; PATCH toggle and rename; DELETE with 204; load/empty/error/retry states; maintain input on failure; prevent accidental duplicate operations; demonstrate browser Network requests and local test results.
- **Continuity:** Dashboard and Ideas routes remain explainable and usable; if time permits, update dashboard counts and idea-copy integration to server tasks. Do not let optional polish overshadow core CRUD and error handling.
- **Not yet:** PostgreSQL/database persistence (Week 9), authentication (Week 10), production deployment (Week 11), cloud synchronization, new state/query libraries or new backend framework.
- **Expected memory behavior:** a React refresh while the server is running re-fetches server tasks; a **Node process restart clears in-memory tasks**. This is intentional, not a Week 8 defect.
- **Data contract:** server-generated positive integer `id`, trimmed `title` length **1–80**, Boolean `completed`, ISO `createdAt`. POST returns 201 `{data:task}`; PATCH returns 200 `{data:task}`; GET 200 `{data:[...],count:n}`; DELETE 204 **empty body**; errors `{error:{code,message}}` with 400/404 as appropriate.

## 2. Prerequisite and setup contract

Before this week unlocks, the learner must have completed Week 7's **real** required lessons, memory-store API capstone and independent bug diagnosis. Planning approval does not itself satisfy a learner's progress. They should have:

- A local frontend React/Vite project and separate Node/Express project from the Week 7 starter, both on a supported Node LTS version when lessons are authored.
- Ability to run `npm install`, `npm run dev`, `npm test` in their **respective local folders**; understand that one terminal serves React and another Express.
- Git checkpoint/feature branch to preserve Week 7 implementation before integrating; use fictional tasks and no secrets.
- Browser DevTools Network panel, REST client/curl and an editor; internet for dependency install as needed. **No account, paid API, or AI assistant required.**

The Fieldbook course provides command explanations, expected observations and recovery instructions. It never reports that it ran the student's local commands. Full local React+Express verification is explicitly **self-verified**.

## 3. Stable lesson map and learning order

All eleven `p1-w08-lNN` IDs are preserved from the provisional 12-week lesson map. In the content implementation, dependency edges must be explicit; the default flow is L01 → L02 → ... → L11, conditional on passing each required checkpoint. Optional exercises do not block progression.

| Lesson | Topic | Source chapters | Required methods |
|---|---|---|---|

| `p1-w08-l01` | Two-process architecture and server-owned task state | C01–C06,C09 | quiz-auto + local-project-self-verified |
| `p1-w08-l02` | Same origin, CORS, and the Vite proxy | C06–C08 | quiz-auto + local-project-self-verified |
| `p1-w08-l03` | Reusable API client, response contracts and validation | C05,C10–C11,C20 | quiz-auto + browser-code-auto |
| `p1-w08-l04` | GET tasks, useEffect and honest loading states | C09,C12,C19 | quiz-auto + local-project-self-verified |
| `p1-w08-l05` | POST creation and server-confirmed task IDs | C05,C13,C17 | quiz-auto + local-project-self-verified |
| `p1-w08-l06` | PATCH completion and rename without losing drafts | C05,C14–C15 | quiz-auto + local-project-self-verified |
| `p1-w08-l07` | DELETE, 204 No Content and confirmed UI changes | C05,C11,C16,C20 | quiz-auto + browser-code-auto + local-project-self-verified |
| `p1-w08-l08` | Pending mutations, races and route continuity | C17–C19,C22 | quiz-auto + local-project-self-verified |
| `p1-w08-l09` | Mock-fetch unit tests and layered debugging | C08,C11,C20–C22,C27 | quiz-auto + browser-code-auto + local-project-self-verified |
| `p1-w08-l10` | API-contract code review and bounded AI assistance | C22–C23,C26,C28 | quiz-auto + local-project-self-verified |
| `p1-w08-l11` | Study Tasks v8 end-to-end CRUD and Week 9 readiness | C01–C03,C18,C21,C24–C31 | quiz-auto + local-project-self-verified |

**Checkpoint allocation:** 11 required quizzes + 3 isolated **plain-JavaScript** browser suites + 10 self-verified local labs + 3 optional enrichment activities = **27 checkpoints (24 required / 3 optional)**. The quiz plan reserves **66 question slots**, not finished question banks.

## 4. Detailed lesson authoring cards

Each card is the specification for *future student-facing teaching content*, not that content itself. For every card, produce a clear motivation, glossary terms, guided walk-through, a worked example, a different practice case, common mistakes, feedback and a mastery checkpoint. Follow `docs/curriculum/CONTENT_AUTHORING_STANDARD.md`.


### L01 — Two-process architecture and server-owned task state

- **Stable ID:** `p1-w08-l01`. **Prerequisite:** Week 7 actual readiness/project gate. **Instructor source:** C01–C06,C09.
- **Learning outcomes:** Trace React → proxy → Express → memory store; distinguish task UI snapshot from authoritative backend records; explain why previous localStorage tasks do not automatically migrate.
- **Concept to teach with a worked example:** React task list and read-only API Lab are different data collections before integration. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Sketch two running processes and prove the health endpoints and task list use the same backend. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Who owns a newly created ID? Why does restart clear the store? Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l01-c01` (quiz-auto), `p1-w08-l01-c02` (local-project-self-verified).
- **Optional:** None.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L02 — Same origin, CORS, and the Vite proxy

- **Stable ID:** `p1-w08-l02`. **Prerequisite:** p1-w08-l01. **Instructor source:** C06–C08.
- **Learning outcomes:** Recognize protocol/hostname/port origins; configure and verify a dev proxy; explain why CORS is not authentication or production deployment.
- **Concept to teach with a worked example:** A browser origin includes scheme, host and port; Vite forwards `/api` in dev. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Inspect direct backend /api/health and frontend /api/health, and identify the actual process serving each. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** CORS is not a substitute for authorization. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l02-c01` (quiz-auto), `p1-w08-l02-c02` (local-project-self-verified).
- **Optional:** `p1-w08-l02-c03`.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L03 — Reusable API client, response contracts and validation

- **Stable ID:** `p1-w08-l03`. **Prerequisite:** p1-w08-l02. **Instructor source:** C05,C10–C11,C20.
- **Learning outcomes:** Design a small reusable fetch boundary; check response.ok, error envelopes and response shapes; categorize network, HTTP and invalid-payload failures.
- **Concept to teach with a worked example:** A fetch response can be an HTTP error even if its Promise resolves. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Implement a pure JavaScript fake-fetch client test suite, not a React or Express runner. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Check `.ok`, content type and response shape; do not parse empty responses. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l03-c01` (quiz-auto), `p1-w08-l03-c02` (browser-code-auto).
- **Optional:** None.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L04 — GET tasks, useEffect and honest loading states

- **Stable ID:** `p1-w08-l04`. **Prerequisite:** p1-w08-l03. **Instructor source:** C09,C12,C19.
- **Learning outcomes:** Fetch server tasks on screen load; distinguish loading, empty-success, success and error; retry and ignore irrelevant results.
- **Concept to teach with a worked example:** An empty task array is valid successful data; loading and error are distinct. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Run frontend/backend locally and demonstrate GET with a Network trace and outage recovery. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Stop backend, refresh, then restart and Retry; observe route state. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l04-c01` (quiz-auto), `p1-w08-l04-c02` (local-project-self-verified).
- **Optional:** None.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L05 — POST creation and server-confirmed task IDs

- **Stable ID:** `p1-w08-l05`. **Prerequisite:** p1-w08-l04. **Instructor source:** C05,C13,C17.
- **Learning outcomes:** Validate a trimmed 1–80-character title, send JSON, accept the server-issued ID and update UI only after 201; preserve the entered draft on failure.
- **Concept to teach with a worked example:** POST returns the canonical server task and ID; do not synthesize IDs in React. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Demonstrate POST success and failure, then retry without retyping the title. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Fail a create request and verify the unsaved input remains. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l05-c01` (quiz-auto), `p1-w08-l05-c02` (local-project-self-verified).
- **Optional:** None.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L06 — PATCH completion and rename without losing drafts

- **Stable ID:** `p1-w08-l06`. **Prerequisite:** p1-w08-l05. **Instructor source:** C05,C14–C15.
- **Learning outcomes:** Send true booleans and trimmed titles, honor 400/404 responses and apply updated server task; keep edit draft on failed update.
- **Concept to teach with a worked example:** PATCH `completed:false` must remain Boolean `false`, never string or falsy omission. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Complete, reopen, rename, and reproduce a failed edit while retaining the draft. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Edit a title and intentionally trigger 400 to test draft retention. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l06-c01` (quiz-auto), `p1-w08-l06-c02` (local-project-self-verified).
- **Optional:** None.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L07 — DELETE, 204 No Content and confirmed UI changes

- **Stable ID:** `p1-w08-l07`. **Prerequisite:** p1-w08-l06. **Instructor source:** C05,C11,C16,C20.
- **Learning outcomes:** Explain successful empty responses; remove the UI row only after confirmed deletion; preserve unchanged list on request failure.
- **Concept to teach with a worked example:** HTTP 204 signals success without a JSON body. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Prove 204 has no body and handle 400/404/network error without false success. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Delete then query a missing ID; compare 204, 404, 400. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l07-c01` (quiz-auto), `p1-w08-l07-c02` (browser-code-auto), `p1-w08-l07-c03` (local-project-self-verified).
- **Optional:** None.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L08 — Pending mutations, races and route continuity

- **Stable ID:** `p1-w08-l08`. **Prerequisite:** p1-w08-l07. **Instructor source:** C17–C19,C22.
- **Learning outcomes:** Prevent duplicate submissions, isolate pending states, explain effect cleanup and avoid stale/contradictory UI across routes.
- **Concept to teach with a worked example:** Disable pending writes and guard double-submit; separate load and mutation errors. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Demonstrate rapid-click protection and stable task state when navigating dashboard/tasks/ideas. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Navigate routes during a request and explain stale result handling. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l08-c01` (quiz-auto), `p1-w08-l08-c02` (local-project-self-verified).
- **Optional:** `p1-w08-l08-c03`.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L09 — Mock-fetch unit tests and layered debugging

- **Stable ID:** `p1-w08-l09`. **Prerequisite:** p1-w08-l08. **Instructor source:** C08,C11,C20–C22,C27.
- **Learning outcomes:** Use deterministic fake responses and Network DevTools to separate client, proxy, route, validation and store defects; write a regression test.
- **Concept to teach with a worked example:** Mocked fetch tests are not full browser or backend integration tests. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Trace an HTTP failure and demonstrate a targeted failing-then-passing test with explanation. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Examine Network method, URL, payload, status and server terminal. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l09-c01` (quiz-auto), `p1-w08-l09-c02` (browser-code-auto), `p1-w08-l09-c03` (local-project-self-verified).
- **Optional:** None.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L10 — API-contract code review and bounded AI assistance

- **Stable ID:** `p1-w08-l10`. **Prerequisite:** p1-w08-l09. **Instructor source:** C22–C23,C26,C28.
- **Learning outcomes:** Review Git diffs and AI suggestions for contract violations, insecure assumptions and localStorage leftovers; identify a fix independently.
- **Concept to teach with a worked example:** Code-agent output is an untrusted proposed change until reviewed. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Reject or revise one proposed change using explicit behavioral evidence; external AI use is optional. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Inspect a diff; find an old localStorage write and prove if it breaks API ownership. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l10-c01` (quiz-auto), `p1-w08-l10-c02` (local-project-self-verified).
- **Optional:** `p1-w08-l10-c03`.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


### L11 — Study Tasks v8 end-to-end CRUD and Week 9 readiness

- **Stable ID:** `p1-w08-l11`. **Prerequisite:** p1-w08-l10. **Instructor source:** C01–C03,C18,C21,C24–C31.
- **Learning outcomes:** Demonstrate complete confirmed CRUD, meaningful failures, independent debugging and the intentional in-memory reset; explain what will change in Week 9.
- **Concept to teach with a worked example:** Confirmed end-to-end CRUD plus independent debugging demonstrates readiness. Show a concrete user action → expected HTTP method/status → server data → resulting React UI. For questions that involve HTTP, include a realistic request and response with readable headers/body; clarify which examples are illustrative versus exact contract.
- **Guided practice:** Run local tests/build and show GET→POST→PATCH→DELETE in Network, plus backend restart reset. Ask the student to predict the Network/console observation **before** interacting, then compare it with actual behavior. Provide one normal case and one edge/failure case.
- **Common misconception/debug prompt:** Restart Node and explain why Week 9 storage is needed. Include a symptom, predicted root cause, investigation step, corrective feedback and a parallel retry scenario—not a pasted reference solution.
- **Required checkpoint(s):** `p1-w08-l11-c01` (quiz-auto), `p1-w08-l11-c02` (local-project-self-verified).
- **Optional:** None.
- **Verification note:** Browser `quiz-auto` / `browser-code-auto` can verify only controlled questions and isolated JavaScript. Real React hooks, Vite proxy, Express process, npm tests and local end-to-end behavior are **learner-run, self-verified locally**.


## 5. Assessment and graduation contract — DEC-21

- Each quiz passes at **ceil(80% × scored items)** and requires **all explicitly designated essential questions** correct. 5-item groups require 4/5; 6-item groups 5/6; the 10-item readiness quiz 8/10, plus essentials.
- Three `browser-code-auto` suites assess **pure JS** fake-fetch contract/response behavior, no live HTTP, no npm, no React JSX execution, and no access to Fieldbook's host progress storage. **All** required behavior cases must pass. See inventory.
- Ten `local-project-self-verified` cards require the student to actually run local work, confirm specific acceptance items, and save only bounded non-sensitive observations. The academy displays **Self-verified locally**, not “passed automatically”.
- Three optional activities (direct CORS alternative, per-task busy improvements, optional AI agent delegation) never block advancing.
- **Week completion** requires all **24 required checkpoints**, including L11 capstone attestation and the ten-item readiness quiz. A mixed week summary reads **Includes self-verified work**.
- Failed quizzes/code exercises receive actionable feedback, progressive hints and unlimited retries. Previously earned mastery remains earned during ordinary review/retries. Formal resets preview dependent progress loss.
- Fieldbook does not independently verify the learner's Node process, Vite frontend or private project source code, and never collects real passwords, tokens or raw private logs.

## 6. Instructor-source adaptation / public content separation

C01–C03 are adapted into student onboarding, architecture and acceptance tasks; C04–C23 provide conceptual and lab content; C24–C26 mentor session scripts/homework become **self-paced action plans** rather than scheduled attendance; C27 controlled defects become student debugging labs; C28–C29 assess readiness; C30 answers **stay private**; C31 summarizes Week 9 handoff; C32 contains complete private source code and **must not be embedded in public Fieldbook assets**. Exact C## dispositions and ZIP entry hashes appear in `WEEK08_SOURCE_TRACEABILITY.md`.

## 7. Learner safety and migration notes

- React task state becomes an API-backed snapshot. Do **not** silently delete or import `study-tasks-week2` localStorage data, and never use Fieldbook's *own* saved learning-progress key for a task sample.
- Keep request validation on the backend; client validation is user experience, not protection from malicious requests.
- The dev proxy does not provide production CORS, auth or encryption; do not infer authorization from its existence.
- The first implementation uses **confirmed mutations**, not optimistic UI. Advanced per-task concurrency is optional.
- All must-pass browser suites use bundled fake responses, so no public API or internet service can gate graduation.

## 8. Pilot, review and handoff

The **future D7 Week 8 learner pilot** must observe a student (not a coding agent) independently trace requests, repair an injected 204 bug, preserve a failed POST draft, align frontend 80-character title validation and explain the server-memory restart boundary. See `docs/quality/WEEK08_PILOT_PROTOCOL.md`. The pilot has **not run**. Final questions, code tests, source-checked lesson prose, runtime verification and UX accessibility checks are **pending authoring/implementation**.

**Week 9 handoff:** preserve the same API contract where feasible and replace the backend in-memory task repository with PostgreSQL; don't reintroduce localStorage as authoritative storage.

**STATUS: D0 STRUCTURE OWNER APPROVED A-009.** No application code or executable student assessments authored; final content, local tests and the D7 learner pilot remain pending. D0/D1 unsigned, D2 NOT AUTHORIZED.
