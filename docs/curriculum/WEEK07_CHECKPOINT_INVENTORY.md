# Week 7 Checkpoint Inventory — D0 Approved Structure A-008 (DEC-21)

**Planning structure status:** **OWNER APPROVED A-008** (2026-11-16); this does not mean question banks, tests, local Node/Express integration, source publication or learner pilot passed. Prior draft-status wording, if any, refers only to content authoring/technical review work still pending.


**Status:** 12 required student lessons, **27 proposed distinct checkpoint IDs: 24 required** (**12 `quiz-auto`, 2 `browser-code-auto`, 10 `local-project-self-verified`**) and **3 `optional-enrichment`**. **66 planned scored quiz-question slots**; these are not final, reviewed question banks. **Stage:** D7 (student Weeks 7–9). **Source:** C01–C27, 68-item Week 7 source archive (33 starter + 34 private reference + 1 README). **Week 6 planning structure:** approved A-007; a student's **actual Week 6 mastery** must precede Week 7.

> No test described here has been executed by FullStack Fieldbook. Backend/Express/HTTP/React checks require the student's **local environment** and must remain explicitly self-verified; the Academy itself remains frontend-only.

## A. Canonical checkpoint register

| Stable ID | DEC-21 method | Gate | Observable outcome | Evidence recorded (summary only) | Source |
|---|---|---|---|---|---|
| `p1-w07-l01-c01` | `quiz-auto` | Required | Node/npm/ESM and browser/runtime differences | scored result + essential item results | C01–C05 |
| `p1-w07-l01-c02` | `local-project-self-verified` | Required | Node/npm setup, backend folder and ESM execution | bounded student attestation + observed local result | C01–C05 |
| `p1-w07-l02-c01` | `quiz-auto` | Required | Methods, headers, response codes and empty-versus-error | scored result + essential item results | C06 |
| `p1-w07-l03-c01` | `quiz-auto` | Required | Express req/res, listen and route precedence | scored result + essential item results | C07,C14 |
| `p1-w07-l03-c02` | `local-project-self-verified` | Required | Run health 200, unknown route 404 and route-order diagnosis | bounded student attestation + observed local result | C07,C14 |
| `p1-w07-l04-c01` | `quiz-auto` | Required | Middleware ordering, next(), JSON parser and safe errors | scored result + essential item results | C08,C14 |
| `p1-w07-l04-c02` | `local-project-self-verified` | Required | Reproduce malformed JSON 400 and middleware order locally | bounded student attestation + observed local result | C08,C14 |
| `p1-w07-l05-c01` | `quiz-auto` | Required | req.params, req.query, completed filter and 400/404 | scored result + essential item results | C09 |
| `p1-w07-l05-c02` | `local-project-self-verified` | Required | GET list, query filters, IDs and missing-resource API tests | bounded student attestation + observed local result | C09 |
| `p1-w07-l06-c01` | `browser-code-auto` | Required | Plain JS task-store ID lifecycle, copying and memory semantics | isolated mandatory behavior-test summary | C10 |
| `p1-w07-l06-c02` | `quiz-auto` | Required | Repository separation, ID collisions and process reset | scored result + essential item results | C10 |
| `p1-w07-l07-c01` | `browser-code-auto` | Required | Plain JS create/patch validation and path/query parser suite | isolated mandatory behavior-test summary | C11 |
| `p1-w07-l07-c02` | `quiz-auto` | Required | Untrusted bodies, 1–80 trimmed titles, `completed:false` and unknown fields | scored result + essential item results | C11 |
| `p1-w07-l08-c01` | `quiz-auto` | Required | POST, 201 Created, Location and validation order | scored result + essential item results | C12 |
| `p1-w07-l08-c02` | `local-project-self-verified` | Required | Real Express POST 201+Location, invalid body 400, no data corruption | bounded student attestation + observed local result | C12 |
| `p1-w07-l09-c01` | `quiz-auto` | Required | PATCH field presence, DELETE empty 204, invalid 400/missing 404 | scored result + essential item results | C13,C14 |
| `p1-w07-l09-c02` | `local-project-self-verified` | Required | Real Express PATCH/DELETE and 204 no-body edge cases | bounded student attestation + observed local result | C13,C14 |
| `p1-w07-l10-c01` | `local-project-self-verified` | Required | Manual HTTP checks, node:test pure + HTTP suites and regression repair | bounded student attestation + observed local result | C15,C16,C23 |
| `p1-w07-l10-c02` | `quiz-auto` | Required | Manual vs integration testing, isolated stores and test limits | scored result + essential item results | C15,C16,C23 |
| `p1-w07-l11-c01` | `local-project-self-verified` | Required | Read-only `/server` React API lab, proxy and failure isolation | bounded student attestation + observed local result | C03,C17–C19 |
| `p1-w07-l11-c02` | `quiz-auto` | Required | Browser localStorage vs Node memory, proxy and AI diff review | scored result + essential item results | C03,C17–C19 |
| `p1-w07-l11-c03` | `optional-enrichment` | Optional | Optional one-file AI-assisted API doc/test improvement | optional short note only | C03,C17–C19 |
| `p1-w07-l12-c01` | `local-project-self-verified` | Required | Complete Express API v1 local contract and test evidence | bounded student attestation + observed local result | C01–C03,C20–C27 |
| `p1-w07-l12-c02` | `quiz-auto` | Required | 10-question Week 7 readiness assessment | scored result + essential item results | C01–C03,C20–C27 |
| `p1-w07-l12-c03` | `local-project-self-verified` | Required | Independent no-AI unfamiliar backend bug repair and explanation | bounded student attestation + observed local result | C01–C03,C20–C27 |
| `p1-w07-l12-c04` | `optional-enrichment` | Optional | Optional pagination/validation robustness extension | optional short note only | C01–C03,C20–C27 |
| `p1-w07-l12-c05` | `optional-enrichment` | Optional | Optional improve API documentation or HTTP test cases | optional short note only | C01–C03,C20–C27 |

### Pass policy, stored evidence and release restrictions

- `quiz-auto`: **ceil(0.8 × scored required questions)** plus all specifically essential questions; 12 groups contain **66 candidate item slots**, not yet written/approved. Ten groups have 5 slots, L05 has 6 slots, and L12 readiness has 10 slots. Five items require 4 correct; six require 5; ten require 8. Essential flags are seeds pending author review.
- `browser-code-auto`: **100% of mandatory functional tests**; explain input/output mismatches. Auto-checked suites run only **plain JavaScript dependency-free functions** in a disposable isolated environment. No Node processes, packages, `express`, real HTTP server, npm execution, filesystem access or protected Fieldbook state. Runner must be security-reviewed at D4; D7 tests are authored/implemented later.
- `local-project-self-verified`: specific real `npm`/HTTP/React results observed on the learner laptop; learner must confirm each required action and record concise non-sensitive evidence. FullStack Fieldbook **does not independently inspect local results** and must label them *Self-verified locally*.
- `optional-enrichment`: 3 activities, never part of completion percent, prerequisites or graduation. External AI tools are optional; no paid service requirement.
- Every lesson is gated by all its required checkpoints. L12's full project, readiness quiz and independent no-AI debug must all pass along with earlier lessons to unlock Week 8.
- All checkpoints will eventually define reviewed item text/tests/essential flags, alternative retry scenarios, hint ladder, failure feedback and content version; they are not finished by this D0 mapping. No source solutions or teacher keys in public app assets.

## B. Mandatory isolated JavaScript suite: `p1-w07-l06-c01`

**Public target:** a student-written dependency-free `createTaskStore` function with `list`, `get`, `create`, `update`, `remove`; reference API behavior comes from `reference-solution/backend/src/task-store.js`, but don't publish its full implementation as a learner answer.

**Mandatory cases to specify at D7 (test names and exact assertions reviewed before use):**

1. Fresh store `list()` returns empty array; `get(1)` returns `null` when absent.
2. `create({title:"A"})` gives ID 1, `completed:false`, and a timestamp (accept deterministic injected clock in tests).
3. Create A/B, remove A, create C: IDs are 1/2/3; never reuse an ID based on array length.
4. `list({completed:true})` filters completed tasks and `list({completed:false})` filters active tasks; `null` gives all.
5. `get`, `update` and `remove` return correct found/missing results; updates retain unmodified fields.
6. Returned task objects are copies: mutating a value returned from `get` or `list` doesn't change internal stored data.
7. Seeded store `initialTasks` with existing IDs creates new items above the largest current ID, not an existing ID.
8. Freshly constructed store has fresh memory. In-browser test can simulate this by a new store object; **it cannot verify an actual Node process restart**.

**Input / isolation restriction:** Tests operate on an exported pure JS function with deterministic injected `now` to avoid clock flakiness. Never let learner scripts read Academy local progress/storage or run in the same origin. No Express import is required. **Pass:** every mandatory case succeeds, including reviewed edge cases. **Feedback:** mention mutation/ID ownership/return values, do not reveal the instructor implementation.

## C. Mandatory isolated JavaScript suite: `p1-w07-l07-c01`

**Public target:** pure helpers `validateCreateBody`, `validatePatchBody`, `parseTaskId`, `parseCompletedFilter`. The same contract is implemented in the learner's real backend separately.

**Mandatory behavior cases:**

1. Create: reject null, undefined, empty object, arrays, non-object body, missing `title`, numeric `title`, extra keys like `id`/`completed`/`isAdmin`.
2. Create: trim whitespace; accept title length exactly 1 and exactly 80 **after trimming**; reject empty and length 81; original object is not mutated.
3. PATCH: reject absent body, arrays, empty object, unknown fields, invalid `title` (including blank and >80) and string boolean values.
4. PATCH: accept `{completed:false}` as an **explicit field**, `{completed:true}`, `{title:"  Revise  "}`, and both fields. Preserve false as false.
5. Path ID: accept strings `"1"`, `"7"`; reject `"0"`, `"-2"`, `"1.5"`, `"abc"`, `"02"` (if strict format), unsafe integer strings and non-strings; returning null for invalid.
6. Completed filter: absent (`undefined`) => no filter, exact `"true"` => true, exact `"false"` => false; reject `"yes"`, `"0"`, actual boolean false and multi-valued arrays if unsupported.
7. Pure helper must not silently alter the store or generate API responses; route handlers decide status codes after validation.

**Pass:** all mandatory behavior-based cases. **Feedback:** isolate shape/type/range/allowed-field errors; don't score exact implementation text. **Boundary:** this is **not** proof that `express.json`, middleware, POST/PATCH routes or HTTP status codes run correctly. Those require local project checks.

## D. Ten required local-project verification cards

For each local checkpoint, the learner sees specific commands, expected results and recovery hints; to complete, they confirm what they **actually ran**, enter only bounded non-sensitive observations and accept an explicit “Self-verified locally” label. No global filesystem/upload/network access is needed for Fieldbook.

### `p1-w07-l01-c02` — Node/npm and ESM setup

- [ ] Run `node --version` and `npm --version` locally; note actual versions.
- [ ] From `backend/`, run `npm install`; inspect dependencies rather than blindly accepting terminal commands.
- [ ] Run a simple ESM script (`node hello.mjs`) and explain why `document` is unavailable in Node.
- [ ] Confirm the learner's own Week 6 frontend remains intact after adding `backend/`.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l03-c02` — Health endpoint and route-order diagnosis

- [ ] Start backend with `npm run dev`; call `GET /api/health` and record 200, JSON status and `storage:"memory"`.
- [ ] Call an unknown route, record JSON 404, and explain why it is not a connection failure.
- [ ] Reproduce an intentional early catch-all 404 in a disposable branch, restore handler order and retest.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l04-c02` — Middleware and malformed-JSON recovery

- [ ] With backend running, send valid JSON POST and an intentionally malformed JSON body; record 400 `INVALID_JSON` for the latter.
- [ ] Inspect how `express.json` and error middleware are ordered; explain what happens if `next()` is not called.
- [ ] Test a safe error response without leaking stack traces; check the configured body limit behavior if possible.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l05-c02` — GET routes and validated query filters

- [ ] Test `/api/tasks`, `/api/tasks?completed=true`, `/api/tasks?completed=false` after creating and completing test tasks.
- [ ] Test `/api/tasks?completed=maybe` → 400; `/api/tasks/banana` → 400; `/api/tasks/999` → 404.
- [ ] Verify `req.query.completed` and `req.params.id` arrive as strings, not trusted booleans/numbers.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l08-c02` — POST creation contract

- [ ] Send valid POST title with padding; verify 201, `Location`, trimmed data, server-generated ID and default completed false.
- [ ] Send blank, numeric, 81-character and extra-field bodies; verify 400 with no added record.
- [ ] Make sure no test relies on the student editing the private reference solution.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l09-c02` — PATCH/DELETE and status semantics

- [ ] Create a task, patch `completed:true` then `completed:false`; verify false is actually saved.
- [ ] PATCH title independently; reject invalid patch empty body and unknown field with 400.
- [ ] DELETE existing gives 204 **empty body**; missing valid ID gives 404; malformed ID gives 400.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l10-c01` — Actual local HTTP and Node test evidence

- [ ] Use `curl`/REST Client or Node fetch to make and inspect requests; record method/path/status/headers.
- [ ] Run `npm test` in `backend/`; record the actual failing/passing test observations.
- [ ] Identify pure/helper versus real HTTP test files; check HTTP tests start/close temporary server ports.
- [ ] Break one behavior deliberately, identify failing assertion, fix and rerun.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l11-c01` — Read-only React API lab and proxy failure

- [ ] Start backend and frontend in separate terminals, open `/server` and inspect GET `/api/health` and `/api/tasks`.
- [ ] Stop backend and observe an honest error state. Repair path/port/proxy in dev setup and retry.
- [ ] Confirm existing React `/tasks` still reads browser localStorage; API Lab does not rewrite task CRUD this week.
- [ ] Review one AI-suggested change as a bounded Git diff and verify it.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l12-c01` — Integrated Week 7 API v1 acceptance

- [ ] Complete required endpoints and error contract in the learner-owned backend, without needing an external server.
- [ ] Run and record health, GET, POST, PATCH, DELETE, filters, 400/404, 204 empty body and malformed JSON scenarios.
- [ ] Run local unit and HTTP integration tests, record actual results and investigate failures.
- [ ] Restart Node; demonstrate task-memory reset and explain how Week 9 persistence differs.
- [ ] Confirm React `/server` read-only lab, separate browser and server task stores, and clear Git checkpoint.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

### `p1-w07-l12-c03` — Independent no-AI debugging proof

- [ ] Receive a novel API defect (e.g. early catch-all, `completed:false`, parser order, or DELETE body).
- [ ] Predict failure, reproduce it with an HTTP request and locate root cause; no AI solution pasted.
- [ ] Apply smallest fix, rerun a relevant test and narrate why it works.
- [ ] Record concise before/after behavior and one learned principle.
**Evidence:** learner-confirmed checklist + one bounded observed result or short explanation (no secrets/raw private logs). **Verification:** Self-verified locally; no Fieldbook auto-run.

## E. Week graduation and failure paths

- All 24 required checks must be satisfied. The Week 7 graduate summary must say **“Includes self-verified work”**, regardless of 12 quiz scores and two isolated browser suites.
- The required Week 7 readiness quiz is `p1-w07-l12-c02`, containing **10 scored items** with **8/10 minimum** and all designated essential items correct. All other sets follow 80% rounded up, with essential correct.
- `p1-w07-l12-c01` is required real-project acceptance, not an automatic clone of the reference code. `p1-w07-l12-c03` is an independent bug diagnosis/fix. Both need honest self-attestation before Week 8 unlocks.
- If npm is offline, continue bundled learning/quizzes/sandbox helpers, but **do not auto-complete real Express tasks**. Offer actionable offline setup troubleshooting and a resume link.
- Provide unlimited retries and graduated hints; retry never revokes achieved completion. Formal lesson/week reset must preview dependent progress loss.
- Never require external AI assistance or upload local project source/credentials. Read-only sample code and terminal commands are teaching aids, not platform execution.

## F. Pending authoring/quality decisions at D7 (not DEC-21 policy changes)

- Final question wording, distractor rationales, equivalent retry items, essential flags and answer-key review.
- Sandbox signature details and isolated execution security; Node classes/Express integrations may **not** silently become auto-grading features.
- Exact local checklist screenshots/test-log requirement (prefer short self-attestation; do not require screenshot uploads).
- Actual version and reproducibility of Node/Express dependency installation and command output at implementation time.
- Learner pilot results, corrective revisions and explicit D7 content QA signoff.

**Status: D0 planning structure owner-approved A-008; final authored tests/content review pending; no app implementation or learner-assessment execution authorized.**