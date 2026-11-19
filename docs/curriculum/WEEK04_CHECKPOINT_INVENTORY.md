# Week 4 Checkpoint Inventory — DEC-21 Owner-Approved D0 Structure (A-005)

**Status:** Owner-approved A-005 structure of 12 lesson slots (11 required + optional L10), **25 checkpoints: 21 required + 4 optional**. No auto-grader, quiz bank or student local project has been implemented or run. Source: original Week 4 instructor C03–C22, private C23; approved Week 3 planning structure A-004 is the prerequisite. Proposed passing conditions must be validated when actual items and runner behavior are authored in D5.

## A. Canonical checkpoint register

| Checkpoint ID | Method | Required? | Outcome / pass target | Evidence retained in Fieldbook |
|---|---|---|---|---|
| `p1-w04-l01-c01` | `quiz-auto` | Yes | predict sync vs Promise callback order (5 questions) | score, essentials, item revision |
| `p1-w04-l01-c02` | `browser-code-auto` | Yes | deterministic async trace without timing assumptions | sandbox test result summary |
| `p1-w04-l02-c01` | `browser-code-auto` | Yes | Promise chain propagation and error/finally behavior | test results and revision |
| `p1-w04-l03-c01` | `browser-code-auto` | Yes | async/await success/rejection/cleanup under fake operation | test results and revision |
| `p1-w04-l03-c02` | `quiz-auto` | Yes | async return, await, catch/finally distinction (5) | score, essentials |
| `p1-w04-l04-c01` | `quiz-auto` | Yes | HTTP anatomy, methods, status and network distinction (5) | score, essentials |
| `p1-w04-l05-c01` | `quiz-auto` | Yes | REST resource reasoning and fake API limits (5) | score, essentials |
| `p1-w04-l05-c02` | `optional-enrichment` | No | design hypothetical future task routes, no runtime | optional practice indication only |
| `p1-w04-l06-c01` | `browser-code-auto` | Yes | sanitize and cap API idea records without mutation | sandbox tests and code revision |
| `p1-w04-l06-c02` | `quiz-auto` | Yes | parsed JSON does not imply validated data (5) | score, essentials |
| `p1-w04-l07-c01` | `browser-code-auto` | Yes | fetch mock 2xx/503/network/invalid JSON branches | sandbox tests and revision |
| `p1-w04-l07-c02` | `quiz-auto` | Yes | fetch response.ok and JSON semantics (5) | score, essentials |
| `p1-w04-l08-c01` | `local-project-self-verified` | Yes | real/local DevTools evidence for bad path and offline failure | learner checkboxes and short observation |
| `p1-w04-l08-c02` | `quiz-auto` | Yes | diagnose URL/status/CORS/network scenarios (5) | score, essentials |
| `p1-w04-l09-c01` | `browser-code-auto` | Yes | UI idle/loading/success/empty/error and recovery | sandbox test results |
| `p1-w04-l09-c02` | `quiz-auto` | Yes | state transitions, user-facing error vs empty (5) | score, essentials |
| `p1-w04-l10-c01` | `optional-enrichment` | No | explain stale response hazard (optional) | optional practice indication only |
| `p1-w04-l10-c02` | `optional-enrichment` | No | AbortController + stale-request guard (optional) | optional practice indication only |
| `p1-w04-l11-c01` | `browser-code-auto` | Yes | offline fixture and explicit fresh-ID local import | sandbox test results |
| `p1-w04-l11-c02` | `browser-code-auto` | Yes | external text safe DOM rendering and copy action | sandbox DOM test results |
| `p1-w04-l11-c03` | `local-project-self-verified` | Yes | real app import/offline/reload check | learner checklist and observed result |
| `p1-w04-l12-c01` | `local-project-self-verified` | Yes | integrated Study Tasks v4 + fake-fetch tests and regressions | learner checklist, test summary, reflection |
| `p1-w04-l12-c02` | `quiz-auto` | Yes | 10-item cumulative readiness and essential data-integrity items | score, essentials |
| `p1-w04-l12-c03` | `local-project-self-verified` | Yes | no-AI independent debugging transfer | learner root cause, fix/test summary |
| `p1-w04-l12-c04` | `optional-enrichment` | No | Promise.all / extra network edge cases | optional practice indication only |

**Counts (derived from the register):** 9 required quizzes; 8 required sandbox browser-code checks; 4 required local-project self-verification checks; 4 optional-enrichment checks. **Total 25; required 21.** All required checkpoint IDs are unique. L10 is optional; L11 depends on L09 rather than L10.

## B. Stable prerequisite contract

- `p1-w04-l01` requires **Week 3 graduation** (which includes L11's independent transfer and readiness).
- Required linear chain: `l01→l02→l03→l04→l05→l06→l07→l08→l09→l11→l12`.
- `p1-w04-l10` optional advanced branch unlocks when `l09` passes. Skipping it has **zero** effect on weekly progress or unlock.
- Mandatory checkpoints within any required lesson must all pass. `l12-c01` integrated local project, `l12-c02` weekly quiz and `l12-c03` independent no-AI transfer are all required.
- A formal reset of a required earlier lesson invalidates its dependent required completions; resets of optional L10 may not invalidate L11 or Week 5. Ordinary review/retry never revokes mastery.
- Week 5 remains locked until every required Week 4 checkpoint is completed (auto or self-verified as appropriate). No passive “visited lesson” pass.

## C. Browser-code test contracts — MUST NOT hit public API

**L01-c02 — Ordered async trace**

- **Inputs:** simple immediate log markers with `Promise.resolve`; controlled async completion fixture. **Pass:** values appear in expected order for two independent examples; returned trace is available as Promise and input isn't mutated. **Negative:** assumes timer 0 is synchronous, returns before async result, hardcodes one exact fixture. **Feedback:** point out which line executes immediately and which continuation runs later.

**L02-c01 — Promise chains**

- **Inputs:** `Promise.resolve([2,4,6])`; `Promise.reject(Error('offline'))`; handler returning nested Promise. **Pass:** transformed results, rejection recovery and `.finally()` ordering correct; chain returns proper eventual value. **Negative:** missing return, swallowed rejection, `.finally()` treated as `.then(value)`. **Feedback:** show actual value at next handler.

**L03-c01 — Await, error and cleanup**

- **Inputs:** injected async loader fulfilling with object and rejecting with Error. **Pass:** waits for actual value, returns proper promise, handles error, restores loading false regardless of outcome. **Negative:** tests read `.ok` from Promise without awaiting, forget cleanup after failure. **Feedback:** display before/after loading and error state.

**L06-c01 — `normalizeIdeas`**

- **Inputs:** valid rows; duplicate positive ID; numeric title; `null`; blank/101-char title; completed="yes"; invalid limit; 20 valid rows; empty array. **Pass:** non-array throws; invalid rows skipped; duplicates excluded; titles trimmed; valid 100-char accepted; default max 8; limit 0→[]; returns copies; original unchanged. **Negative:** treats `JSON.parse` as trust guarantee, writes to shared source, caps before filtering valid rows. **Feedback:** identify first failed field/boundary and expected retained IDs.

**L07-c01 — `fetchStudyIdeas` with fake fetch**

- **Inputs:** `{ok:true,status:200,json:async()=>fixture}`, `{ok:false,status:503}`, a thrown network failure, a JSON parse rejection and wrong-shape payload. **Pass:** successful result normalized; HTTP 503 rejected with readable status; network error propagated/handled; invalid JSON/payload rejected. **Negative:** only `.catch()` HTTP path without checking `response.ok`, does not await `.json()`. **Feedback:** separate HTTP, network and parsing reasons. **Isolation:** sandbox runner uses fake `fetchImpl` only, **no real URL requests**.

**L09-c01 — UI asynchronous states**

- **Fixture:** controlled deferred-loader or reducer with 0/2 valid ideas and a rejected Promise. **Pass:** idle→loading→success, success empty is not error, failure→error, load control becomes available again, retry/offline option clear. **Negative:** permanently disabled Load, stale old list presented as fresh success, all zero results labeled error. **Feedback:** show state transition timeline.

**L11-c01 — Offline fixture and local Copy**

- **Fixture:** existing local tasks IDs 7/9; offline ideas IDs 9/101; source title with whitespace. **Pass:** offline goes through same normalizer; no tasks changed on Load alone; copying yields a fresh noncolliding positive-safe local task ID and persists via mocked storage; repeated copy does not accidentally mutate API item; old tasks still present. **Negative:** uses remote ID verbatim, `tasks = ideas`, writes remote POST, changes progress storage. **Feedback:** compare old/remote/new local IDs and storage writes.

**L11-c02 — Safe text and event behavior**

- **Fixture:** idea title is harmless markup-looking string `<b>Example</b>` plus nested Copy button label. **Pass:** text appears literally with no added `<b>` element; delegated Copy targets correct remote idea; controls have meaningful labels and status message readable. **Negative:** `innerHTML = idea.title`, unsafe interpolation or index-based import after reorder. **Feedback:** compare textContent vs innerHTML rendered node structure. **Isolation:** sandbox DOM cannot reach Fieldbook parent document.

## D. Locally self-verified checkpoints — no false automatic claims

**L08-c01 — DevTools failure reproduction**

- [ ] Open Week 3/4 starter through an **HTTP localhost origin**, not `file://`.
- [ ] Inspect request URL, method, status, and response/headers/timing for a valid or mocked request.
- [ ] Deliberately use a bad route and identify HTTP 404 *if a network connection is available*, or use an offline deterministic fixture showing that case.
- [ ] Simulate Offline and observe a network-level rejection; explain difference from an HTTP error.
- [ ] Restore working configuration and record one observed status and one error explanation.
- **Evidence:** checks + short sentence(s), no personal tokens or private logs. Fieldbook records only the student's report.

**L11-c03 — Local UI continuity**

- [ ] Existing tasks remain unchanged after loading ideas (including if load fails).
- [ ] Offline sample shows up with internet disconnected.
- [ ] Copying a chosen idea creates a local task with new ID; after same-origin refresh it persists.
- [ ] Search/Sort/Edit/Filter/Complete/Delete still work; external text displays as text, not markup.
- [ ] Learner reports one observed result; browser-local Fieldbook does **not** inspect the local app.

**L12-c01 — Integrated Study Tasks v4**

- [ ] Serve `index.html` from a local HTTP server; app and `tests.html` run in browser.
- [ ] React/Express/PostgreSQL are *not* part of Week 4; modular vanilla JS retained.
- [ ] Existing Week 3 tasks/schema/key preserved; local features regression-checked.
- [ ] New API client uses GET, `response.ok`, async JSON and normalization.
- [ ] Live example GET demonstrated when internet/API available; when unavailable use same mock fixture without blocking mastery.
- [ ] Loading/success/empty/error statuses, retry and offline fallback demonstrated.
- [ ] External titles render as safe text; Copy produces new local ID and local persistence.
- [ ] Five or more meaningful async tests run **without hitting network**, including success, failure and invalid payload; retained Week 3 regression tests also run.
- [ ] Git diff/commit reviewed; learner describes one bug/fix.
- **Evidence:** checklist, observed local test summary and explanation (no credentials). Original instructor reference mentions **37** tests; do **not** demand that magic count or mark self-report as auto-passed.

**L12-c03 — Independent diagnostic transfer (without AI)**

Choose one **unseen variant** after the week instruction, documentation/DevTools allowed:

- **Variant A:** Fix an API client that silently treats a 503 Response as success. Show one failing-before/passing-after mock test and explain why `fetch` Promise fulfillment is not HTTP success.
- **Variant B:** Fix a Copy handler that uses remote idea ID and silently overwrites task ID 9. Show before/after ID list, a noncolliding new ID, and unchanged original tasks.
- **Variant C:** Fix an async UI handler that leaves Load disabled after an injected rejection; demonstrate correct cleanup and error state.

Learner records symptom, root cause, smallest change, evidence of a test and explanation. Mark as **self-verified**, not a proctored no-AI credential; learner can review/retry without penalty.

## E. Required quiz-auto checkpoint matrix — question slots, not authored banks

| Quiz checkpoint | Draft scored items | Pass threshold | Proposed essential item | Focus |
|---|---:|---:|---|---|
| `p1-w04-l01-c01` | 5 | 4/5 | `p1-w04-l01-q03` | immediate vs deferred work |
| `p1-w04-l03-c02` | 5 | 4/5 | `p1-w04-l03-q03` | missing `await`, catch/finally |
| `p1-w04-l04-c01` | 5 | 4/5 | `p1-w04-l04-q04` | HTTP error vs network failure |
| `p1-w04-l05-c01` | 5 | 4/5 | `p1-w04-l05-q04` | fake API writes not durable |
| `p1-w04-l06-c02` | 5 | 4/5 | `p1-w04-l06-q03` | parsed JSON still untrusted |
| `p1-w04-l07-c02` | 5 | 4/5 | `p1-w04-l07-q02` | HTTP 404/503 and `response.ok` |
| `p1-w04-l08-c02` | 5 | 4/5 | — | DevTools diagnostics and CORS |
| `p1-w04-l09-c02` | 5 | 4/5 | `p1-w04-l09-q04` | empty vs error; recovering loading |
| `p1-w04-l12-c02` | 10 | 8/10 | `p1-w04-l12-q03`, `p1-w04-l12-q07` | entire network boundary and local data integrity |

**Total:** 9 required quiz groups, **50 draft scored item slots**. Essential flags are *seed proposals*, not technical- or education-approved final questions. Replace unhelpful essential flags during authoring with reviewed equivalents while preserving the approved pass philosophy; any material gate change needs owner review.

## F. Graduation evidence and owner-review items

- The **21** required checkpoint IDs are the completion denominator; four optional slots never count.
- Week 5 unlocks only after L12 required project, readiness and independent transfer, plus all prior mandatory lesson checks. `p1-w04-l10` is an optional detour and has **no downstream dependency**.
- Browser-code automatic pass requires D4-reviewed runner behavior; until implemented, display **pending**, not a fake pass. No learner has run future Fieldbook Week 4 items yet.
- Local browser project completion reads **“includes self-verified work”**, even if reference contains automated tests the learner ran independently.
- Owner to approve/refine: optional L10, all 25 checkpoint slots and 21/4 split, 50 quiz item slots, current essential item proposals, offline-first assessment design, and independent transfer burden. **Pending approval.**
