# Phase 1 / Week 4 — Lesson and Assessment Blueprint

**Product:** FullStack Fieldbook · **Curriculum:** Phase 1, Week 04 · **Status:** source-inspected **D0 STRUCTURAL BASELINE OWNER APPROVED A-005**; no student lesson, assessment or pilot has been executed.  
**Student project:** Study Tasks v4 (existing modular vanilla-JavaScript task manager + **Study Idea Inbox**).  
**Private source:** `../fullstack-fieldbook-source-materials/phase1/week-04/` (24 instructor chapters, original code archive).  
**Authority:** DEC-01–17, DEC-21, DEC-23, DEC-24, `docs/learning/MASTERY_RULES.md`. Weeks 1–3 have approved **planning structures** A-001/A-003/A-004; not complete learner content or software.

## 1. Essential educational contract

**The transition:** Weeks 1–3 used local browser task data and synchronous handlers. Week 4 introduces the difference between the local app and an outside API. Students will **read** JSON examples using HTTP GET, validate what they receive, show loading/error states, and explicitly copy a selected remote idea into their existing local task list. The public API is a fake example service, **not** the learner's backend or database. React comes in Week 5; Express and PostgreSQL come much later.

A learner who has truly completed this week can:

1. Predict synchronous/Promise/timer ordering without claiming that `await` freezes the browser.
2. Describe pending/fulfilled/rejected Promise states, chaining and error propagation; write an equivalent `async`/`await` function.
3. Explain an HTTP request/response: URL, method, status, optional headers/body and typical REST resource operations.
4. Distinguish *successful HTTP response*, *HTTP error response*, *network rejection*, *invalid JSON*, and *schema-invalid JSON*.
5. Use `response.ok` and `await response.json()` correctly with an injected fake `fetch` for tests.
6. Reject non-arrays and filter invalid remote todo records while preserving the original payload; recognize that `JSON.parse` is not schema validation.
7. Implement idle/loading/success/empty/error states and allow the local task app to remain usable after an API failure.
8. Read the Network panel to diagnose a wrong URL, HTTP 404/503, latency, and offline/network failure.
9. Import only after explicit user action, create a **new local task ID**, and preserve existing Week 3 tasks plus their `localStorage` data.
10. Safely render external strings as literal text and test async code using deterministic responses instead of relying on live network availability.
11. Demonstrate a working local project, describe one failed request, and independently fix a new failure after reading error evidence.

**Week 4 runtime:** HTML/CSS/JavaScript modules in a browser over a *local HTTP server*. No React, npm, Express, SQL, accounts, required paid AI account, API keys or server-side work in Week 4. The optional internet request is `GET https://jsonplaceholder.typicode.com/todos`; the **offline fixture must support all core learning requirements if that service is down**.

**Project invariants from Week 3:** task shape `{id, title, completed}`, title ≤ **100** trimmed characters, unique positive-safe numeric local IDs, storage key **`study-tasks-week2`**, and Edit/Save/Cancel/Search/Sort/Filter preserved. Current storage is scoped to scheme+host+port, not globally shared. Reading ideas never rewrites tasks. An external idea's `id` is **not** a safe local task ID; copying allocates a new one.

**Security/isolation:** the Fieldbook platform stores learner progress separately. Learner code runs in an isolated playground and must not read its host `localStorage`, modify its progress, call paid services or silently send personal tasks to the public API. Mock/fake network flows are the default assessed path. Real external API use is an optional diagnostic/local-project action, with clear online dependency.

**Scope control:** `AbortController`, stale-request guards and `Promise.all` are **optional advanced practice** in the original source. Here, L10 is an **optional non-gating lesson**; L11 follows L09. No cancellation implementation can block graduation. This keeps the Week 4 core feasible for independent learners and preserves DEC-21 optional-content rules.

**Timing:** 12 student lesson slots (11 required + optional L10), roughly 10–25 minutes per concept plus a larger Study Tasks v4 local project. Suggested study rhythm comes from the former mentor's 2×90-minute sessions + 4–6 hours independent work; there is no time lock.

## 2. Proposed lesson sequence

| Lesson ID | Student lesson title | Source chapters | Required checkpoints | Optional checkpoints |
|---|---|---|---|---|
| `p1-w04-l01` | How asynchronous work changes control flow | C03,C04 | c01 quiz; c02 browser | — |
| `p1-w04-l02` | Promises, fulfillment, rejection and chaining | C05 | c01 browser | — |
| `p1-w04-l03` | async/await, try/catch and finally | C06 | c01 browser; c02 quiz | — |
| `p1-w04-l04` | HTTP messages, URLs, methods and status codes | C07 | c01 quiz | — |
| `p1-w04-l05` | REST resources, CRUD and fake-API limits | C08 | c01 quiz | c02 REST design |
| `p1-w04-l06` | JSON validation at the network boundary | C09,C15 | c01 browser; c02 quiz | — |
| `p1-w04-l07` | fetch, response.ok and fake-network tests | C10,C15 | c01 browser; c02 quiz | — |
| `p1-w04-l08` | Use Network DevTools to diagnose failure | C11,C20 | c01 local; c02 quiz | — |
| `p1-w04-l09` | Loading, success, empty and error UI states | C12 | c01 browser; c02 quiz | — |
| `p1-w04-l10` | Optional advanced lab: cancellation and stale results **(optional)** | C13 | — | c01 conceptual; c02 cancellation code |
| `p1-w04-l11` | Study Idea Inbox, offline fixture and safe local import | C14,C15 | c01 browser; c02 browser; c03 local | — |
| `p1-w04-l12` | Week 4 integration, independent transfer and readiness | C02,C16–C22,C24; private C23 | c01 local project; c02 readiness quiz; c03 local transfer | c04 advanced Promise exercise |

**Proposed checkpoints: 25 total = 21 required (9 `quiz-auto` groups, 8 `browser-code-auto`, 4 `local-project-self-verified`) + 4 `optional-enrichment`.** The 9 required quizzes have **50 draft scored item slots** (eight × five-item checks + ten-item weekly readiness). Those are *planned slots*, not reviewed question-bank text. The optional L10 concept and cancellation activity do not count toward either 50 scored item slots or graduation.

**Prerequisites:** Week 3 graduation → L01; required sequence L01 → L02 → … → L09 → L11 → L12; the optional L10 becomes available after L09, is revisitable at any time, and **is not a prerequisite** for L11 or Week 5. All required checkpoints within each lesson must pass before its required successor unlocks. Week 5 unlocks only when L01–L09, L11–L12 and all required checks, L12 integrated project, readiness quiz and independent transfer are satisfied. Any week completion involving local attestations says **“includes self-verified work.”**

**Where the precise acceptance criteria live:** `WEEK04_CHECKPOINT_INVENTORY.md`; source disposition `WEEK04_SOURCE_TRACEABILITY.md`; quiz subject plan `WEEK04_ASSESSMENT_ITEM_PLAN.md`; future D5 pilot `docs/quality/WEEK04_PILOT_PROTOCOL.md`.

## 3. Detailed lesson authoring specifications

### L01 — How asynchronous work changes control flow (`p1-w04-l01`)

**Source:** C03–C04. **Prerequisite:** Week 3 graduation. **Effort:** 15–25 minutes.

- **Teach:** Browser event loop at an introductory level; synchronous statements run before later timer and Promise reaction callbacks; Promise microtasks ordinarily run before a subsequently ready timer in simple browser examples. `setTimeout(...,0)` does not interrupt the currently executing call stack. The current `async` function can suspend while the browser remains responsive.
- **Worked example to author:** First predict and then trace `console.log('A'); Promise.resolve().then(()=>console.log('B')); console.log('C');` → `A,C,B`. Add a simple `setTimeout` with a controlled ordering example and explain why it is not an exact timer guarantee.
- **Practice:** Choose the log order in three variations; implement a function that returns a Promise-driven ordered trace using `await` and a resolved fixture, not a real delay or unstable wall-clock assertion.
- **Misconception feedback:** “`await` makes the whole browser synchronous” → illustrate user interaction continuing while only one async continuation is paused.
- **Required:** `c01` five-question concept quiz; `c02` isolated deterministic JS order check. **Hints:** distinguish immediate lines from scheduled callbacks → name microtask → identify the continuation after awaited Promise.

### L02 — Promises, fulfillment, rejection and chaining (`p1-w04-l02`)

**Source:** C05. **Effort:** 15–25 minutes.

- **Teach:** Promise lifecycle pending → fulfilled/rejected, `.then`, `.catch`, `.finally`, returning values from handlers, throwing inside a handler and propagation to the next rejection handler. Emphasize `.finally` receives no settled value and does not itself magically turn a failure into success.
- **Worked example:** A chain begins with `Promise.resolve([2,4,6])`, filters values and maps to new numbers; a second chain rejects and handles the error; display expected console output explicitly.
- **Practice:** Repair a handler that does not `return` its Promise; create a handler that recovers from rejection with a fallback. Repeat with an input that causes rejection.
- **Required:** `c01` browser-code behavior tests for fulfillment/rejection, chaining and return propagation with controlled fixture Promises. **No separate quiz gate**: explain/predict in the lesson and assess through actual execution. **Hints:** check what handler returns → inspect whether chain is Promise or value → use next `.then`/`.catch` evidence.

### L03 — async/await, try/catch and finally (`p1-w04-l03`)

**Source:** C06. **Effort:** 20–30 minutes.

- **Teach:** `async` always yields a Promise; `await` provides the fulfillment value *inside* that function; rejection follows the thrown-error path. Explain `try/catch/finally`, sequential independent calls vs optional `Promise.all` intuition, and missing-`await` pitfalls.
- **Worked example:** Convert a two-step `.then` chain to `async function loadName(loader)`, return the result, catch rejected loader and restore a loading flag in `finally`. Do not present illustrative functions as shipped project code.
- **Practice:** Fix `const response = fetch(url); console.log(response.ok);` and describe what `response` actually is before `await`.
- **Required:** `c01` browser check with success/rejection and `finally` order, injected fake async operations; `c02` five-question conceptual quiz. **Hints:** watch the Promise object in console → put `await` within async function → locate which branch resets UI state.

### L04 — HTTP messages, URLs, methods and status codes (`p1-w04-l04`)

**Source:** C07. **Effort:** 15–25 minutes.

- **Teach:** URL scheme, host, path and query; method, status, headers, body; client and server responsibilities; GET/POST/PUT/PATCH/DELETE; 200/201/204/400/401/403/404/429/500/503. Distinguish a response with an HTTP failure status from not receiving a response at all.
- **Worked example:** Annotate a simplified GET `/todos/1` and response `200` plus JSON. Note that it is educational, not a byte-for-byte real capture.
- **Practice:** Choose the right method/status for five scenarios; write a diagnostic statement for a 404 vs an offline error.
- **Required:** `c01` five-question quiz including essential network-vs-HTTP distinction. **Hints:** first ask whether any response arrived → examine method/status separately → identify whether retrying the same request can help.

### L05 — REST resources, CRUD and fake-API limits (`p1-w04-l05`)

**Source:** C08. **Effort:** 15–20 minutes.

- **Teach:** REST as an API design approach, resource URLs, create/read/update/delete correspondences, GET retrieval vs POST creation, PATCH partial vs PUT replacement, and why JSONPlaceholder is a fake training API whose write calls do *not* establish durable persistence.
- **Worked example:** Route/action table for hypothetical `/tasks` and `/tasks/:id`; clearly label these as **future** API routes, not existing Week 4 endpoints.
- **Practice:** Choose resource/method for creating, updating, reading and deleting a task; compare “remote example downloaded” with “my local task stored.”
- **Required:** `c01` five-question quiz, essential item on **fake POST does not prove durable save**. **Optional:** `c02` draft a future REST API contract using prose (not code that Week 4 will execute).

### L06 — JSON validation at the network boundary (`p1-w04-l06`)

**Source:** C09, C15; reference `api-client.js`. **Effort:** 20–30 minutes.

- **Teach:** JSON text vs JavaScript values; `JSON.parse`/`response.json()` only parse; neither validates shape. `normalizeIdeas(data,limit)` must reject non-array root, ignore invalid rows and duplicates, trim titles and return **new** records, never modify source fixture; cap at eight by default. Valid rows require positive safe integer `id`, nonblank trimmed string title ≤100, Boolean `completed`.
- **Worked example:** Given duplicate ID, malformed title, wrong completed type and a valid item, predict which records remain and why. Do **not** copy entire reference implementation into the learner prompt.
- **Practice:** Build the normalizer against a new fixture. Required cases include `null`, object instead of array, empty array, duplicate IDs, title length 100/101, and limit=0. Define behavior for invalid limits matching the actual reference contract.
- **Required:** `c01` browser-code normalization tests and source immutability; `c02` five-question quiz including essential **parsed ≠ trusted** misconception. **Hints:** check array shape → validate each field → dedupe then cap → return new objects.

### L07 — fetch, response.ok and fake-network tests (`p1-w04-l07`)

**Source:** C10, C15; reference `fetchStudyIdeas`. **Effort:** 20–30 minutes.

- **Teach:** `fetch` returns a Promise of Response; `.json()` is asynchronous; `response.ok` is true for 2xx, and HTTP 404/500 usually **fulfill** the fetch Promise, unlike network rejection. Explain difference between fetch error, HTTP status, JSON parse error and invalid payload. Use dependency-injected `fetchImpl` and an explicitly fake Response for graded tests.
- **Worked example:** `async function getIdeas(fetchImpl) { const r = await fetchImpl('/todos'); if (!r.ok) throw Error(...); const d = await r.json(); return normalizeIdeas(d); }` (pseudocode for student explanation, not final reference source).
- **Practice:** Make fake `{ok:false,status:503}` reject, valid fake response normalize, malformed JSON path reject, network fake reject. Explain why checking only `catch` is insufficient for HTTP errors.
- **Required:** `c01` isolated browser-code tests with mocked request (no real outgoing network); `c02` five-question quiz with essential `response.ok` concept. **Hints:** inspect the resolved Response before `.json()` → check status first → differentiate thrown `Error` vs rejected network Promise.

### L08 — Use Network DevTools to diagnose failure (`p1-w04-l08`)

**Source:** C11,C20. **Effort:** 20–30 minutes plus local exploration.

- **Teach:** Network URL/method/status/headers/response/timing inspection; Console error and initiator; wrong route, offline mode and API payload failure. Explain CORS as a browser permission mechanism, **not** something to disable or bypass using untrusted proxy instructions.
- **Worked example:** Two screenshots/short written traces: HTTP 404 with response received vs an offline request with no successful HTTP response; screenshot examples must be clearly illustrative if not captured from an actual run.
- **Practice:** Run the starter on a local HTTP server; deliberately request bad path, inspect status, restore path; toggle browser offline and identify failure; use a fake malformed response in local tests.
- **Required:** `c01` honest local DevTools checklist and short observed status/error note; `c02` five-question diagnosis quiz. **Hints:** inspect Network first → find actual URL → distinguish status vs absent response. Do not require the public service to be online: local mock/error fixtures can substitute when offline.

### L09 — Loading, success, empty and error UI states (`p1-w04-l09`)

**Source:** C12. **Effort:** 20–30 minutes.

- **Teach:** explicit `idle → loading → success (items or empty) / error`; active controls, recovery and `finally`. A successful `[]` is an empty result, not an error. Visible status announcements, recoverable Retry and offline option, and prevention of stale error messages. Keep UI independent of the local task-list data.
- **Worked example:** deterministic async loader seeded with success `[{id...}]`, empty `[]`, rejected error. Demonstrate state transition log or tiny DOM view with `role='status'`; no CSS animation needed for passing.
- **Practice:** Implement state reducer/transition function or small handler within isolated browser fixture; verify error restores Load control and empty success displays distinct copy.
- **Required:** `c01` deterministic browser test for state transitions (including error and empty) and `c02` five-question quiz. **Hints:** identify current state before click → explicitly reset loading in finally → distinguish zero items from rejected request.

### L10 — Optional advanced lab: cancellation and stale results (`p1-w04-l10`)

**Source:** C13 (**source labels cancellation a stretch**). **This entire lesson is optional/non-gating**; after L09 the learner may go directly to L11. **Effort:** 20–35 extra minutes.

- **Teach:** `AbortController` signal/cancel, `AbortError`, and *stale results* when an old request finishes after the user chooses a newer source. Explain that abort is best effort and comparing a request token/controller with current active request may also be needed.
- **Worked example:** Two deferred fake requests: A starts, user chooses offline sample B, A completes; without a guard A overwrites B. Show what request-identity guard changes.
- **Optional checks:** `c01` conceptual self-check (non-gating); `c02` browser code exercise validating cancel and stale result protection with controlled deferred Promises. **No remote API dependence, no graduation block, no punishment for skipping.**

### L11 — Study Idea Inbox, offline fixture and safe local import (`p1-w04-l11`)

**Source:** C14,C15. **Prerequisite:** L09 (not L10). **Effort:** 25–45 minutes plus local build time.

- **Teach:** External ideas are **remote read-only suggestions**, never the student's saved tasks. `OFFLINE_IDEAS` is a fixed fixture passed through the same normalizer as live data; remote result capped at eight. Copy action creates a fresh local task ID using existing Week 3 `addTaskToList`, not remote `id`. Render titles with text nodes/`textContent`; never trust `innerHTML`. Only Copy mutates local task state.
- **Worked example:** Local tasks IDs `[7,9]`, remote idea ID `9` title `'  Practice requests  '`: after explicit Copy, preserve old task ID 9; new task receives an available local ID and is persisted. The remote payload remains unchanged.
- **Practice:** Create an offline load path, then a Copy handler; deliberately test duplicates and a markup-like string `<b>example</b>` displayed literally. Preserve edit, search, sort, filter and counts.
- **Required:** `c01` browser-code functional check for offline fixture and local copying, source unchanged; `c02` isolated DOM safe-render/interaction check; `c03` local-project verification for UI integration and same-origin refresh. **Hints:** separate `ideas` and `tasks` → allocate new local ID → use safe text rendering → save tasks only on actual import.

### L12 — Week 4 integration, independent transfer and readiness (`p1-w04-l12`)

**Source:** C02,C16–C22,C24; instructor reference C23 is **private only**. **Effort:** approximately 3–5 hours for integration/QA plus focused readiness check (adjustable).

- **Teach:** Assemble Study Tasks v4 from completed Week 3 baseline; `api-client.js` exports testable network helpers; offline fallback; fake-fetch tests and Network inspection; Git review; explain what got copied locally vs fetched remotely. The app should work usefully even when public API is unavailable. Cancellation remains optional.
- **Required:** `c01` **local-project-self-verified** integrated demo with a real HTTP local server, old features intact, failure/offline/import flows, ≥five meaningful async-focused tests and visible Git diff/commit evidence; `c02` ten-item readiness quiz; `c03` no-AI independent transfer task reproducing/repairing one previously unseen network/status/import bug and recording root cause/test. **Optional:** `c04` `Promise.all`/additional race-case exercise, never a graduation requirement.
- **Failure patterns to author:** missing await, 503 mistaken for fulfilled *success*, invalid payload silently accepted, external ID collision, remote idea overwrites `tasks`, XSS-style markup interpreted as HTML, missing loading reset, stale response overwriting offline data (advanced optional).
- **Required final explanation:** What happens when clicking Load? Why does HTTP 503 need `response.ok` checking? What does `response.json()` **not** guarantee? What stays local after copying? How does the offline fixture help? What did fake network tests verify?

## 4. Assessment philosophy, authoring and delivery rules

**Passing and feedback:** DEC-21: scored quiz passes `ceil(0.80 × required scored questions)` **and every essential question**. Browser checks require 100% of **mandatory behavior tests** to pass in D4-vetted isolation. Local project checks are **learner attestations** recorded with bounded evidence and never labeled auto-graded. Unlimited retries and a three-stage hint ladder; equivalent problem variants when reasonably available. Optional L05-c02, L10-c01/c02 and L12-c04 are completely non-gating.

**Critical Week 4 source boundary:** the reference's `tests.html/tests.js` lists 37 browser tests (22 Week 3 regressions + 15 new API/async cases). That number is **descriptive** of the instructor reference, not a Fieldbook pass token. Future student test expectations require actual local commands and observed outcomes. Do **not** claim Fieldbook ran the student's local `tests.html`.

**Assessment isolation:** fake `fetchImpl`, fake Response objects, offline arrays, deterministic queued/deferred Promises, sandbox-only DOM/text fixtures. Never grade by string searching code or by calling the real JSONPlaceholder API. Do not allow learner JS access to Fieldbook progress storage, DOM or credentials; D4 sandbox security review remains mandatory before publishing browser-code checks. A learner may use a public API in a locally run project, but must not include personal data or keys.

**Weekly readiness:** L12 `c01` integrated app + `c02` readiness quiz + `c03` independent transfer are independently required. All earlier mandatory lessons must also be complete. The final UI must say **“includes self-verified work.”** If `c01` is self-attested, a platform-generated badge cannot truthfully certify actual server behavior. The weekly project does *not* request POST/PUT persistence from the fake service.

**Authoring backlog:** Write learner explanations, new non-leaking examples, 50 reviewed scored question items plus alternate versions, 8 executable isolation-compatible browser suites, 4 local verification checklists, hint/feedback variants, copy/accessibility QA, and tested source manifests during authorized D5. These **do not exist yet** in this planning package.

**Owner A-005 structural approval:** The owner accepted (a) twelve lesson slots, including eleven mandatory lessons and optional L10; (b) the proposed 25-checkpoint split; (c) optional request cancellation; (d) isolated fake-fetch tests and a remote API offline fallback; (e) proposed essential-question seeds; and (f) independent transfer evidence without required AI use. This is an **owner-approved D0 planning structure (A-005)**, not authored student content or an executed D5 course.
