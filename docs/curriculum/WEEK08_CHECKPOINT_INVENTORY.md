# Week 8 Checkpoint Inventory — DEC-21 Contract (Owner-Approved Structure A-009)

**Status:** **Owner-approved D0 structure A-009.** No final quiz bank, sandbox suite, local project execution or learner pilot is complete; approval does not establish automatic verification results.

## A. Stable ID registry, required flags and outcomes

| Checkpoint ID | Verification method | Gate | Assessed behavior/observation |
|---|---|---|---|

| `p1-w08-l01-c01` | `quiz-auto` | Required | Architecture, source of truth and process-memory reasoning. |
| `p1-w08-l01-c02` | `local-project-self-verified` | Required | Run both processes, verify direct/proxied health, draw request flow and preserve previous Git checkpoint. |
| `p1-w08-l02-c01` | `quiz-auto` | Required | Origin comparison, proxy role, and CORS not being authorization. |
| `p1-w08-l02-c02` | `local-project-self-verified` | Required | Observe frontend /api/health forwarding and diagnose a deliberate backend port/proxy failure. |
| `p1-w08-l02-c03` | `optional-enrichment` | Optional | Compare explicit CORS configuration with Vite proxy, no security claims. |
| `p1-w08-l03-c01` | `quiz-auto` | Required | response.ok, network vs HTTP vs parse/shape failures, data envelopes. |
| `p1-w08-l03-c02` | `browser-code-auto` | Required | Isolated pure-JS fake-fetch contract checks including 200/201 and invalid responses. |
| `p1-w08-l04-c01` | `quiz-auto` | Required | Loading, error, empty/ready, retry and effect cleanup. |
| `p1-w08-l04-c02` | `local-project-self-verified` | Required | React GET request and honest UI states under running/stopped backend. |
| `p1-w08-l05-c01` | `quiz-auto` | Required | POST 201, server ID, trimmed 1–80 title validation, draft preservation. |
| `p1-w08-l05-c02` | `local-project-self-verified` | Required | Demonstrate POST confirm/validation/backend failure and no duplicate IDs. |
| `p1-w08-l06-c01` | `quiz-auto` | Required | PATCH Boolean vs string, 400/404, rename and failure UX. |
| `p1-w08-l06-c02` | `local-project-self-verified` | Required | PATCH toggle/reopen/rename and retain edit input on failed request. |
| `p1-w08-l07-c01` | `quiz-auto` | Required | 204 semantics, empty body, and server-confirmed deletion. |
| `p1-w08-l07-c02` | `browser-code-auto` | Required | Isolated pure-JS 204 client parser must not read empty response JSON. |
| `p1-w08-l07-c03` | `local-project-self-verified` | Required | DELETE 204/404/400 verified locally; no list loss on failed deletion. |
| `p1-w08-l08-c01` | `quiz-auto` | Required | Pending state, double-click races, abort/ignore and route continuity. |
| `p1-w08-l08-c02` | `local-project-self-verified` | Required | Demonstrate duplicate prevention, route navigation and task state consistency. |
| `p1-w08-l08-c03` | `optional-enrichment` | Optional | Per-row busy indicators and improved nonblocking concurrency. |
| `p1-w08-l09-c01` | `quiz-auto` | Required | Network tab diagnostics, fake response testing and regression evidence. |
| `p1-w08-l09-c02` | `browser-code-auto` | Required | Isolated pure-JS fake-fetch error taxonomy and invalid JSON/HTML handling. |
| `p1-w08-l09-c03` | `local-project-self-verified` | Required | Run local tests and investigate an observed client/proxy/server error. |
| `p1-w08-l10-c01` | `quiz-auto` | Required | Code review of API contract violations and agent verification. |
| `p1-w08-l10-c02` | `local-project-self-verified` | Required | Review a diff, reject wrong edit, document one independent fix and test. |
| `p1-w08-l10-c03` | `optional-enrichment` | Optional | Use free AI agent for a bounded refactor and inspect changes; no requirement. |
| `p1-w08-l11-c01` | `quiz-auto` | Required | Ten-item readiness check: 80% plus essential questions. |
| `p1-w08-l11-c02` | `local-project-self-verified` | Required | End-to-end local CRUD, outages, no-AI bug repair and backend restart boundary. |

**Total:** **27 unique checkpoint IDs**, **24 required**: 11 quizzes, 3 browser-code suites, 10 local-project self-attestations; **3 optional**. All are mapped to an explicit Week 8 lesson and primary learning outcome in `WEEK08_LESSON_ASSESSMENT_BLUEPRINT.md`. A required checkpoint is only met by its actual specified evidence, not by clicking Continue.

## B. Quiz-auto group rules and question-count allocation

- 11 scored quiz groups; **66 planned item slots**, none authored/approved yet.
- The instructor-authored bank must identify the essential question(s) where genuinely critical. For 5 scored questions pass at least 4; for 6 pass at least 5; readiness's 10 questions pass at least 8. All essentials must be correct.
- Ask the learner to *predict first* and explain afterwards; provide issue-specific feedback for wrong reasons (e.g. “204 was successful; JSON parsing was the error”), plus equivalent retry questions.
- Essential **candidate concepts**, not final question flags: HTTP `response.ok`, no-body 204, backend-owned IDs and validation, distinction between UI snapshot/server memory, server restart reset. Essential flags require educational review in the actual authored bank.

## C. Three mandatory browser-code-auto contracts (isolated JavaScript only)

These tests run **only within an approved isolated browser JavaScript sandbox**, using injected deterministic fake `fetch`; they must **not** reach localhost, any real API, a public endpoint, the learner filesystem, or Fieldbook local-progress storage. Use behavior tests instead of requiring identical source text.

### `p1-w08-l03-c02`: fake-fetch API response and error contract

**Challenge:** Given fake response/transport objects, write a small reusable handler (student-selected function name or specified educational API) and correctly categorize successes and failures.

Required cases:
1. 200 `{data:[...],count:n}` returns an array of server tasks and doesn't mutate it.
2. 201 `{data:{id,title,completed,createdAt}}` returns the exact server task object; cannot invent a local ID.
3. 400 `{error:{code,message}}` produces a meaningful failure even though `fetch` returned a Response object.
4. A rejected transport Promise is a network/transport failure, not an HTTP 404.
5. HTML instead of expected JSON is reported as an invalid API response; malformed JSON is not presented as success.
6. Valid JSON with missing/wrong-shaped `data` is rejected; safe, readable error is produced without exposing secrets.
7. Caller-supplied `AbortSignal` is forwarded where relevant (may be a scored case if supported by the final exercise contract).

**Pass:** all mandatory executable cases. **Not proven:** React Effects, proxy, real API availability, HTTP server behavior.

### `p1-w08-l07-c02`: successful DELETE 204 parser

Required cases:
1. When fake response is `ok:true,status:204`, return/resolve successfully **without calling `.json()`** or reading an absent body.
2. A 404 error response yields a failure and does not masquerade as successful deletion.
3. A 400 invalid-ID error yields a failure with a useful message.
4. A simulated network rejection is a failure with no fabricated HTTP status.
5. A 200 JSON response for a non-DELETE route still parses expected JSON; don't skip all JSON responses.
6. Repeated calls don't mutate caller-owned task arrays. A UI removal occurs only after resolved success in the separate local React lab.

**Pass:** all mandatory cases. **Not proven:** actual Express DELETE route, browser click event, optimistic rollback behavior.

### `p1-w08-l09-c02`: client error taxonomy and mock response regression

Required cases:
1. Distinguish HTTP validation failure with error envelope from a transport rejection and a JSON parse error.
2. Surface 404 missing-resource distinctly from invalid input 400 where safe metadata exists.
3. Reject invalid envelope (`data` missing, wrong-shaped task ID) and accidental Vite HTML response as `BAD_RESPONSE`/equivalent.
4. Preserve error classifications across repeat/Retry call; no “success” returned solely because promise resolved.
5. Verify request method/path and JSON payload for a bounded GET/POST/PATCH/DELETE scenario using fake fetch, without executing a backend.
6. Make one regression test fail before implementing fix, then succeed; show meaningful test output in the sandbox.

**Pass:** all mandatory deterministic tests; show descriptive feedback and concept-review hints. **Not proven:** localhost routing, Node integration tests, real network outages.

## D. Ten required real local-project attestations

For each card: provide exact working-directory instructions, local command(s), expected success/failure observations, troubleshooting and a brief self-attestation. **Do not collect real secrets, pasted private terminal logs, or require upload.** Fields must be bounded (e.g. observed status code and a short explanation). The Fieldbook website does **not** execute these tests.


### `p1-w08-l01-c02` — Real local project evidence

- [ ] Make a Git checkpoint of prior Week 7 work; start backend (e.g. `npm run dev` in backend) and frontend (in frontend) in separate terminals.
- [ ] Inspect direct backend `GET /api/health` and the browser /server GET; explain frontend localStorage vs backend memory before integration.
- [ ] Sketch React→Vite proxy→Express→store→response and state where a new task ID is assigned.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l02-c02` — Real local project evidence

- [ ] Open `http://127.0.0.1:3001/api/health` and `http://localhost:5173/api/health`; see same backend data (port/host may be configured differently locally).
- [ ] Temporarily stop backend or misconfigure proxy in a disposable local branch and observe the difference between HTML/502-like proxy response and a task 404.
- [ ] Explain CORS is not authentication; restore Vite proxy configuration and record actual outcome.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l04-c02` — Real local project evidence

- [ ] Start both processes; use `/tasks` to observe GET `/api/tasks` in browser Network and server-backed rows.
- [ ] Demonstrate loading state, a real empty-success message, a nonempty list and a server-unavailable error with Retry.
- [ ] Navigate away during an in-flight request; review cleanup/stale response behavior with an actual local test where possible.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l05-c02` — Real local project evidence

- [ ] Submit a valid trimmed title and see POST 201, server ID and task added using returned response.
- [ ] Try blank, 81-character, or unexpected values: client feedback and backend authoritative 400; ensure no false success.
- [ ] Stop backend before submission: typed title remains; resume and retry; prevent rapid duplicate create requests.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l06-c02` — Real local project evidence

- [ ] Toggle `completed:true` then `completed:false` using PATCH; verify backend response and UI both match.
- [ ] Rename with valid title; intentionally send a blank or overlength title and observe 400.
- [ ] Simulate an update failure and confirm edit draft/input is still editable; correct one mismatch between 100 old vs 80 server max.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l07-c03` — Real local project evidence

- [ ] Delete an actual task and inspect DELETE 204 with no response JSON body; remove row on confirmed success.
- [ ] Send DELETE for missing positive ID and malformed ID using a local HTTP client; distinguish 404 and 400.
- [ ] Disconnect backend before deleting and confirm task row remains visible with feedback; do not call `.json()` on 204.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l08-c02` — Real local project evidence

- [ ] Attempt two rapid submits; observe one create while busy or explicit request guard preventing duplicate requests.
- [ ] Navigate `/`, `/tasks`, `/ideas` and `/server`, preserving usable route UI and no contradictory server-task snapshot.
- [ ] Demonstrate error/Retry and effect cleanup; note that enhanced per-row concurrency and full Idea Inbox copy integration are stretch.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l09-c03` — Real local project evidence

- [ ] Run `npm test` in relevant local frontend and backend project directories; report actual pass/fail observations without pasting secrets.
- [ ] Reproduce a 400 error with Network Payload and backend validation output; fix the mismatch and rerun a targeted regression.
- [ ] Explain why mocked `fetch` tests cannot establish that Vite proxy, real backend process and React events work together.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l10-c02` — Real local project evidence

- [ ] Review a bounded Git diff or proposed agent change; identify a localStorage write still incorrectly treated as authoritative or another API-contract error.
- [ ] Reject/modify it with a rationale, reproduce the original symptom and show a passing local test/manual check.
- [ ] Document independently how request/response/error handling flows; AI assistance is optional and may not be required to pass.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


### `p1-w08-l11-c02` — Real local project evidence

- [ ] Demonstrate frontend GET→POST→PATCH completion→PATCH rename→DELETE through Express while watching actual Network methods/status.
- [ ] Stop backend: show honest error, retry and draft preservation. Restart Node: prove the in-memory task store resets; explain Week 9 DB purpose.
- [ ] Run local tests and frontend build (if supported), repair one deliberate unfamiliar bug without copying AI solution, and record a Git checkpoint.
- [ ] Confirm student can distinguish current confirmed state from unsaved input and discuss server-side 80-character validation.
**Evidence:** learner checks each item they actually observed and records one short non-sensitive observation (e.g. method/status, test result or root-cause explanation); confirmation label **Self-verified locally**. This is not automatic verification.


## E. Three optional enrichment checkpoints

- `p1-w08-l02-c03`: Compare explicit CORS allow-list setup with a Vite development proxy in a disposable branch; do not imply CORS secures APIs. **Optional, non-gating.**
- `p1-w08-l08-c03`: Implement per-task busy indicators or independently controlled mutation queues, with demonstrated race-failure handling. **Optional, non-gating.**
- `p1-w08-l10-c03`: Delegate a clearly bounded API client refactor to a free AI agent (if accessible); inspect diff, test and document rejection/acceptance. **Optional, non-gating and no AI account needed.**

## F. Prerequisites, readiness and failure rules

- Week 8 opens only after actual Week 7 mandatory checkpoints, including API capstone and independent debugging, are completed by the learner; planning log A-008 is not a progress token.
- Each lesson requires its preceding lesson (linear default), but optional enrichment never unlocks or blocks required work.
- Readiness quiz `p1-w08-l11-c01`: **10 questions**, at least **8/10** plus every essential question correct. Focus on cross-layer transfer, not only memorized definitions.
- Final capstone `p1-w08-l11-c02` requires real local application evidence and no-AI bug repair. All **24 required checkpoints** must be completed to unlock Week 9; the week label **Includes self-verified work**.
- Quiz retries and sandbox retries unlimited with topic-specific hints and equivalent items. An ordinary retry does not erase mastery; formal reset previews dependencies.
- Never auto-pass a local project based on a learner clicking a single generic “Done” button, viewing a PDF, or completing isolated JS tests.
- **D0 planning status only.** Actual code runner, final items, React build checks, HTTP tests and learner pilot are future implementation/quality work.
