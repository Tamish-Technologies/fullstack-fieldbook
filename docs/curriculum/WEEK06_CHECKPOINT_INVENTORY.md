# Week 6 Checkpoint Inventory — D0 Structure Approved A-007 (DEC-21)

**Status:** **26 proposed unique checkpoint IDs** across 12 required lessons: **23 required** (11 `quiz-auto`, 2 `browser-code-auto`, 10 `local-project-self-verified`) + **3 `optional-enrichment`**. This is an authoring specification, **not** a working test runner, completed assessment, or learner result.  
**Source:** instructor C01–C26 and 41-entry code ZIP (`starter/` 19, `reference-solution/` 22). **Stage:** D6. **Week 5 prerequisite:** structurally approved A-006, but Week 5 real learning/project graduation must be recorded before L01 unlocks.

## A. Canonical checkpoint register

| Stable ID | Method | Gate | Outcome to verify | Learner evidence stored | Source |
|---|---|---|---|---|---|
| `p1-w06-l01-c01` | `quiz-auto` | Required | API-client contract, HTTP response and untrusted JSON (5 questions) | scored quiz & essential item results | C01,C03,C04,C05,C06,C21 |
| `p1-w06-l01-c02` | `browser-code-auto` | Required | Normalize remote ideas with safe IDs/title validation/deduplication | mandatory behavior-test summary (no learner code persistence required) | C01,C03,C04,C05,C06,C21 |
| `p1-w06-l02-c01` | `quiz-auto` | Required | Render versus events versus external synchronization (5) | scored quiz & essential item results | C03,C07 |
| `p1-w06-l03-c01` | `quiz-auto` | Required | Effect dependencies, cleanup and Strict Mode (6) | scored quiz & essential item results | C07,C08,C09,C20 |
| `p1-w06-l03-c02` | `local-project-self-verified` | Required | Real React Effect, cancellation and late-response handling | bounded learner-run command/UI observation and short explanation | C07,C08,C09,C20 |
| `p1-w06-l04-c01` | `quiz-auto` | Required | Loading/success/empty/error status distinctions (5) | scored quiz & essential item results | C10,C20 |
| `p1-w06-l04-c02` | `local-project-self-verified` | Required | Local React four-state accessible UI and recovery actions | bounded learner-run command/UI observation and short explanation | C10,C20 |
| `p1-w06-l05-c01` | `quiz-auto` | Required | Retry, offline samples and separation of task data (5) | scored quiz & essential item results | C11,C20 |
| `p1-w06-l05-c02` | `local-project-self-verified` | Required | Local offline Retry/Copy flow and new local IDs | bounded learner-run command/UI observation and short explanation | C11,C20 |
| `p1-w06-l06-c01` | `quiz-auto` | Required | BrowserRouter/Routes and route versus server concepts (5) | scored quiz & essential item results | C12,C24 |
| `p1-w06-l06-c02` | `local-project-self-verified` | Required | Local React `/`, `/tasks`, `/ideas`, `*` routes | bounded learner-run command/UI observation and short explanation | C12,C24 |
| `p1-w06-l07-c01` | `quiz-auto` | Required | NavLink, active states, keyboard and SPA deep-link semantics (5) | scored quiz & essential item results | C13,C20 |
| `p1-w06-l07-c02` | `local-project-self-verified` | Required | Local navigation, direct URL/refresh/404 and keyboard use | bounded learner-run command/UI observation and short explanation | C13,C20 |
| `p1-w06-l08-c01` | `quiz-auto` | Required | State ownership, page unmount and functional updates (5) | scored quiz & essential item results | C03,C14 |
| `p1-w06-l08-c02` | `local-project-self-verified` | Required | Local shared task array survives route change and rapid adds | bounded learner-run command/UI observation and short explanation | C03,C14 |
| `p1-w06-l09-c01` | `quiz-auto` | Required | Persistence, same origin, storage warning and reload (5) | scored quiz & essential item results | C15,C20 |
| `p1-w06-l09-c02` | `local-project-self-verified` | Required | Local storage retention and corrupted data recovery | bounded learner-run command/UI observation and short explanation | C15,C20 |
| `p1-w06-l10-c01` | `browser-code-auto` | Required | Fake-fetch response, failures, malformed body and AbortSignal | mandatory behavior-test summary (no learner code persistence required) | C20,C21 |
| `p1-w06-l10-c02` | `local-project-self-verified` | Required | Local test/Network DevTools diagnosis and bug reproduction | bounded learner-run command/UI observation and short explanation | C20,C21 |
| `p1-w06-l11-c01` | `quiz-auto` | Required | Agent code-review safety and acceptance evidence (5) | scored quiz & essential item results | C16,C24 |
| `p1-w06-l11-c02` | `optional-enrichment` | Optional | Optional one-file AI-assisted bounded patch and reviewed diff | optional note only | C16,C24 |
| `p1-w06-l12-c01` | `local-project-self-verified` | Required | Integrated Study Tasks v6 local demo, tests and build | bounded learner-run command/UI observation and short explanation | C01,C02,C17,C18,C19,C22,C23,C24,C25,C26 |
| `p1-w06-l12-c02` | `quiz-auto` | Required | 10-item Week 6 readiness assessment | scored quiz & essential item results | C01,C02,C17,C18,C19,C22,C23,C24,C25,C26 |
| `p1-w06-l12-c03` | `local-project-self-verified` | Required | Independent no-AI unfamiliar async/routing bug repair | bounded learner-run command/UI observation and short explanation | C01,C02,C17,C18,C19,C22,C23,C24,C25,C26 |
| `p1-w06-l12-c04` | `optional-enrichment` | Optional | Optional custom useIdeas hook extraction and review | optional note only | C01,C02,C17,C18,C19,C22,C23,C24,C25,C26 |
| `p1-w06-l12-c05` | `optional-enrichment` | Optional | Optional route params or responsive/keyboard polish | optional note only | C01,C02,C17,C18,C19,C22,C23,C24,C25,C26 |

**Automated:** only `l01-c02` and `l10-c01` execute in Fieldbook's approved isolated **plain-JS** runtime. A network connection, npm process, JSX mount, React Router navigation or third-party AI is not required or claimed by these suites. **Actual React work:** the ten local evidence entries remain self-reported unless a separate mentor observes them.

## B. Universal quiz scoring and essential-question review

- Each `quiz-auto` checkpoint uses **ceil(80% × required scored questions)**; all author-approved essential items must also be correct. For five scored items this is **4/5**; for six **5/6**; for ten **8/10**.
- Eleven quiz groups contain **61 intended question slots**. The question text, distractor rationale, essential flags and independent retry variants remain **unfinished D6 content**.
- No scoring for optional reading, optional AI prompts, clicking Continue or merely viewing sample code. Unlimited retries; feedback must explain the particular misconception and link to the relevant lesson.

## C. Mandatory browser-code suite 1: `p1-w06-l01-c02`

**Subject:** `normalizeIdeas(payload)` using isolated pure JavaScript and controlled payload fixtures (not a React component).  
**Required behavior cases:**

1. A non-array payload (e.g. `{todos:[]}`, `null`, primitive) reports an expected-shape error rather than silently showing Empty.
2. Valid item `{id:17,title:"  Read React docs  ",completed:false}` normalizes to `{id:"api-17",title:"Read React docs",completed:false}`.
3. Remote IDs must be positive safe integers; string IDs, zero, negative and unsafe integers are invalid.
4. Duplicate remote IDs resolve to **one** normalized entry with a stable prefixed display key.
5. Invalid item, blank/whitespace title, non-string title and over-100-character title are safely skipped; exactly-100-character valid title is accepted.
6. `completed` is true only when the source value is the boolean `true`.
7. Empty array returns `[]`, enabling a legitimate Empty UI state.
8. External HTML-looking strings remain plain **data**; normalization does not insert into DOM or mutate input objects.

**Pass:** all designated cases, including hidden edge cases, pass with **100% mandatory functional tests**. **Feedback:** show the failed data property/edge case and explain why, not a completed reference source file. Tests must execute in a disposable isolated context with no access to Academy progress keys.

## D. Mandatory browser-code suite 2: `p1-w06-l10-c01`

**Subject:** `fetchIdeas({signal, fetchImpl})` with **injected fake fetch**, not live `https://jsonplaceholder.typicode.com/`.  
**Required behavior cases:**

1. The injected fake receives the expected read-only URL and the passed `AbortSignal` reference.
2. A successful HTTP-like response resolves and parses the body, then calls the expected normalizer, returning a normalized array.
3. A resolved response carrying `ok:false,status:503` **rejects** with a useful HTTP error; no false Success or Empty.
4. A successful HTTP-like response with malformed JSON body/shape rejects appropriately.
5. Fake fetch network rejection propagates as failure; distinct from HTTP status failure.
6. An `AbortError` propagates to the caller for the **React UI** to ignore as deliberately stale cancellation. The pure client does not pretend to render a spinner or set React state.
7. No learner data is POSTed or uploaded; all test behavior is deterministic and works without external network.

**Pass:** 100% mandatory behavior checks. **Feedback:** distinguish fetch rejection vs HTTP error vs parse/shape error vs deliberate abort. The D4 isolated runtime must be verified to support Promise scheduling and mock signal handling safely before the suite can be enabled. **No claim:** this suite does not run `useEffect` or mounted React UI.

## E. Ten required local project verification checklists

### `p1-w06-l03-c02` — Real React Effect, cancellation and late-response handling

- [ ] **Effect Setup:** Open Ideas with an actual React Effect and document dependencies and non-async outer callback.
- [ ] **Cleanup:** Make a request slow, leave page or Retry, and confirm old result does not overwrite new state.
- [ ] **Abort:** Distinguish deliberate AbortError from a visible failure and keep Strict Mode enabled.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l04-c02` — Local React four-state accessible UI and recovery actions

- [ ] **Four States:** Use local mock/controlled responses to display loading, success, valid empty and error separately.
- [ ] **Accessibility:** Check status/alert semantics and useful Retry/Offline controls.
- [ ] **Trace:** Note which response triggered each state.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l05-c02` — Local offline Retry/Copy flow and new local IDs

- [ ] **Offline:** Activate bundled offline ideas with network disabled and see no new request.
- [ ] **Copy:** Copy two ideas rapidly into local tasks; unique numeric IDs assigned by App.
- [ ] **Privacy:** Observe that external sample API receives no POST of student tasks.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l06-c02` — Local React `/`, `/tasks`, `/ideas`, `*` routes

- [ ] **Routes:** Configure BrowserRouter/Routes/Route for `/`, `/tasks`, `/ideas`, and `*`.
- [ ] **Direct Url:** Open each route and unknown path directly on local Vite.
- [ ] **Distinction:** Explain client route vs server HTTP endpoint.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l07-c02` — Local navigation, direct URL/refresh/404 and keyboard use

- [ ] **Navigation:** Link/NavLink changes URL and active status, including `end` on root.
- [ ] **Keyboard:** Tab, Enter, visible focus and active `aria-current` behavior.
- [ ] **Deep-Link:** Check back/forward and refresh; document host fallback caveat.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l08-c02` — Local shared task array survives route change and rapid adds

- [ ] **Ownership:** Task array lives in App above Routes; remote status lives in IdeasPage.
- [ ] **Rapid Add:** Two quick Copy clicks create distinct numeric task IDs.
- [ ] **Derived:** Dashboard counts use task props, not duplicate state.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l09-c02` — Local storage retention and corrupted data recovery

- [ ] **Reload:** Add via Ideas, navigate Tasks, reload same-origin URL; task remains.
- [ ] **Storage Key:** Keep `study-tasks-week2` in student app, separate from Academy progress.
- [ ] **Recover:** Confirm unreadable storage is not silently overwritten.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l10-c02` — Local test/Network DevTools diagnosis and bug reproduction

- [ ] **Tests:** Actually run source `npm test` and record pass/fail counts; debug at least one failing case.
- [ ] **Network:** Reproduce 503 versus network rejection and use browser Network/Console.
- [ ] **Scope:** Explain why helper tests do not certify React UI or router.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l12-c01` — Integrated Study Tasks v6 local demo, tests and build

- [ ] **Integrated:** All 4 routes, honest API states, Retry, offline, Copy, task CRUD/filter/search/sort and persistence.
- [ ] **Build:** Actually run `npm test` and `npm run build`; record observed results, not assumed success.
- [ ] **Accessibility:** Check keyboard, focus, 360–375px layout, loading/error announcements and unknown route.
- [ ] **Review:** Explain Git diff, data flows, no paid AI dependency.
**Evidence:** learner confirms commands/screens actually observed, adds a bounded result and a brief explanation. Display **Self-verified locally**; Fieldbook did not inspect the local environment. Never collect real task contents, private machine paths, secrets or raw logs.

### `p1-w06-l12-c03` — independent transfer/debug (second L12 local gate)

- [ ] Learner receives an **unseen** variant: missing Effect cleanup; fetch during render; cancelled request shown as a failure; task state erroneously placed inside a route page; incorrect root `NavLink`; or failed direct deep link due to missing static-host fallback.
- [ ] Reproduce symptom → form hypothesis → identify root cause → make minimal edit → rerun regression.
- [ ] Complete without asking AI to generate the fix. Official docs and the student's existing notes are permitted.
- [ ] Record a short summary of what changed and which *actual* local test/manual behavior confirms it.

**Evidence:** self-reported root cause, minimal fix and observed result. **No verified certification** or fabricated command output.

## F. Optional enrichment (zero gating effect)

| Checkpoint | Optional activity | Boundaries |
|---|---|---|
| `p1-w06-l11-c02` | Agent-assisted narrow patch + review | External AI optional; no account required to graduate; manually review diff |
| `p1-w06-l12-c04` | Extract a `useIdeas` custom hook | Only after basic Effect is understood; preserve cleanup/tests |
| `p1-w06-l12-c05` | Route params or extra UI/accessibility polish | No prerequisite; don't change approved core routes |

## G. Unlock, reset, versioning and privacy

- `p1-w06-l01` requires Week 5 graduation; each L02–L12 requires prior required lesson complete. Store dependencies as stable IDs.
- All 23 required checkpoints must be satisfied, and L12 integrated `c01`, readiness quiz `c02` and transfer `c03` are mandatory to unlock Week 7. Optional checkpoints excluded from percentages.
- Quiz/browser results are auto-passed **only after real checked execution**; React project work is *Self-verified locally*. Whole-week label: **Includes self-verified work**.
- Review/quiz retry does not revoke previous mastery. Formal lesson/week reset previews cascading affected later lessons/weeks. Import validates stable IDs and recalculates allowed state.
- Public platform bundles no reference solution, private instructor C22/C26 content, API tokens, sensitive logs or actual learner task data. Do not expose Academy progress store to arbitrary student execution.

## H. D6 acceptance checklist (NOT yet performed)

- [ ] Eleven reviewed quiz banks (61 draft slots) + essential flags, distractor rationales and alternative retries created.
- [ ] Two pure JS suites genuinely execute in a verified safe runner with deterministic fake-fetch and negative cases.
- [ ] Ten local project checklists include exact setup/test steps and expected behavior, honest evidence labels.
- [ ] Actual React and Router demo installed, built and tried on a learner machine; D6 tests and learner observation results recorded.
- [ ] Week 5 source compatibility, local task key and Week 7 unlock behavior validated.
- [ ] Optional activities do not block or change score.

**Owner-approved A-007 planning structure:** no approved quiz content, executed tests, React build, pilot or D0/D1/D2 authorization is implied.
