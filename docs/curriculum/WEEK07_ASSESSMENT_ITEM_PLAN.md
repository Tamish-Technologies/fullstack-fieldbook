# Week 7 Assessment Item Plan — Approved Structure A-008, Not an Authored Item Bank

**Planning structure status:** **OWNER APPROVED A-008** (2026-11-16); this does not mean question banks, tests, local Node/Express integration, source publication or learner pilot passed. Prior draft-status wording, if any, refers only to content authoring/technical review work still pending.


**Coverage:** 12 quiz sets, **66 proposed scored item slots**, two plain-JS sandbox test suites and ten locally self-verified project checks. This plan defines **what** must be assessed; it does not provide final question text, completed distractors, hidden test code or confirmed pass results. Owner has approved DEC-21 rules, **not** these new Week 7 items.

## A. Proposed quiz specification by lesson

| Quiz checkpoint | Slots | Passing threshold | Essential-question candidate | Coverage |
|---|---:|---:|---|---|
| `p1-w07-l01-c01` | 5 | 4/5 + all essential | None yet; confirm at authoring review | Node vs browser globals, npm commands/scripts, ESM import/export, running process and port, how to verify installed Node |
| `p1-w07-l02-c01` | 5 | 4/5 + all essential | None yet; confirm at authoring review | request method vs URL, headers vs JSON body, 200 vs 201, 204 empty body, invalid ID 400 vs missing 404 |
| `p1-w07-l03-c01` | 5 | 4/5 + all essential | None yet; confirm at authoring review | app.get handler semantics, req/res response completion, app.listen and port, unknown route 404, catch-all route precedence |
| `p1-w07-l04-c01` | 5 | 4/5 + all essential | None yet; confirm at authoring review | middleware order, next() vs response ending, express.json parser, malformed JSON safe error, error handler 4-argument signature |
| `p1-w07-l05-c01` | 6 | 5/6 + all essential | Distinguish malformed path ID (400) from valid missing ID (404) | req.params versus req.query, query filter absent, parse true/false strings, why Boolean("false") is true, 400 invalid filter, 400 malformed vs 404 nonexistent |
| `p1-w07-l06-c02` | 5 | 4/5 + all essential | None yet; confirm at authoring review | separation HTTP/store, ID collision after removal, cloning store records, task memory reset, seeded store next ID |
| `p1-w07-l07-c02` | 5 | 4/5 + all essential | Reject untrusted body fields and accept explicit false | POST exact shape, trim 1–80 title, PATCH empty body rejection, completed false presence, unknown fields and type rejection |
| `p1-w07-l08-c01` | 5 | 4/5 + all essential | None yet; confirm at authoring review | status 201 Created, Location header, server-generated ID, validate before mutate, create error preserves count |
| `p1-w07-l09-c01` | 5 | 4/5 + all essential | 204 must have empty body and 400/404 distinction | PATCH partial field behavior, boolean false should apply, DELETE 204 no body, 400 invalid vs 404 missing, consistent JSON errors |
| `p1-w07-l10-c02` | 5 | 4/5 + all essential | None yet; confirm at authoring review | manual request headers, unit versus HTTP integration test, ephemeral port 0, per-test store isolation, test pass scope and regression |
| `p1-w07-l11-c02` | 5 | 4/5 + all essential | None yet; confirm at authoring review | two task stores, Vite proxy role, /server read-only requests, backend offline versus 404, review AI diff and terminal commands |
| `p1-w07-l12-c02` | 10 | 8/10 + all essential | Server-side validation before mutation; true 204 semantics | client/server request lifecycle, parser before handlers, valid/invalid 400 distinctions, 201 + Location, 204 no body, GET query validation, ID uniqueness, memory reset vs DB, test isolation, Week 8 React write integration |

The essential designations above are **candidates**, not final boolean flags in published data. A question must be technically correct and evaluated by two reviewers before being marked essential. Badly constructed essential questions create arbitrary blocks and are not allowed.

## B. Item-slot prompts and misconception coverage

Each bullet is a **question-writer brief**, not a question to ship unchanged. Write an authentic scenario, a correct answer with rationale, plausible wrong answers with *why* feedback, one equivalent retry variant, a hint ladder, and official/reference chapter links. Prefer applied reasoning over terminology memorization.

### `p1-w07-l01-c01` — Node.js runtime, npm and ESM foundations

1. **Slot 1:** Node vs browser globals; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** npm commands/scripts; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** ESM import/export; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** running process and port; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** how to verify installed Node; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l01` rather than providing the completed starter answer.

### `p1-w07-l02-c01` — HTTP messages and REST endpoint contracts

1. **Slot 1:** request method vs URL; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** headers vs JSON body; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** 200 vs 201; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** 204 empty body; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** invalid ID 400 vs missing 404; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l02` rather than providing the completed starter answer.

### `p1-w07-l03-c01` — Express app, health route and route order

1. **Slot 1:** app.get handler semantics; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** req/res response completion; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** app.listen and port; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** unknown route 404; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** catch-all route precedence; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l03` rather than providing the completed starter answer.

### `p1-w07-l04-c01` — Middleware, JSON parsing and safe error responses

1. **Slot 1:** middleware order; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** next() vs response ending; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** express.json parser; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** malformed JSON safe error; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** error handler 4-argument signature; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l04` rather than providing the completed starter answer.

### `p1-w07-l05-c01` — GET collections, query filters and path IDs

1. **Slot 1:** req.params versus req.query; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** query filter absent; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** parse true/false strings; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** why Boolean("false") is true; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** 400 invalid filter; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
6. **Slot 6:** 400 malformed vs 404 nonexistent; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l05` rather than providing the completed starter answer.

### `p1-w07-l06-c02` — In-memory repository, stable IDs and data lifecycle

1. **Slot 1:** separation HTTP/store; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** ID collision after removal; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** cloning store records; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** task memory reset; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** seeded store next ID; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l06` rather than providing the completed starter answer.

### `p1-w07-l07-c02` — Validate task bodies, IDs and filters at the boundary

1. **Slot 1:** POST exact shape; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** trim 1–80 title; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** PATCH empty body rejection; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** completed false presence; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** unknown fields and type rejection; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l07` rather than providing the completed starter answer.

### `p1-w07-l08-c01` — POST creation, status 201 and Location

1. **Slot 1:** status 201 Created; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** Location header; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** server-generated ID; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** validate before mutate; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** create error preserves count; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l08` rather than providing the completed starter answer.

### `p1-w07-l09-c01` — PATCH, DELETE, 204 and missing-resource handling

1. **Slot 1:** PATCH partial field behavior; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** boolean false should apply; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** DELETE 204 no body; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** 400 invalid vs 404 missing; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** consistent JSON errors; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l09` rather than providing the completed starter answer.

### `p1-w07-l10-c02` — Manual HTTP tools, repeatable API tests and debugging

1. **Slot 1:** manual request headers; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** unit versus HTTP integration test; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** ephemeral port 0; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** per-test store isolation; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** test pass scope and regression; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l10` rather than providing the completed starter answer.

### `p1-w07-l11-c02` — Read-only React API lab, layered debugging and AI review

1. **Slot 1:** two task stores; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** Vite proxy role; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** /server read-only requests; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** backend offline versus 404; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** review AI diff and terminal commands; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l11` rather than providing the completed starter answer.

### `p1-w07-l12-c02` — Week 7 API v1 capstone, independent debugging and Week 8 readiness

1. **Slot 1:** client/server request lifecycle; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
2. **Slot 2:** parser before handlers; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
3. **Slot 3:** valid/invalid 400 distinctions; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
4. **Slot 4:** 201 + Location; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
5. **Slot 5:** 204 no body; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
6. **Slot 6:** GET query validation; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
7. **Slot 7:** ID uniqueness; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
8. **Slot 8:** memory reset vs DB; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
9. **Slot 9:** test isolation; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.
10. **Slot 10:** Week 8 React write integration; write a prediction, diagnostic or contract-reading scenario and focused misconception feedback.

**Retry strategy:** introduce a different task ID/request/body/response with equivalent difficulty. Link incorrect responses back to `p1-w07-l12` rather than providing the completed starter answer.

## C. Browser-code assessment plans (actual tests deferred)

**Suite 1 — `p1-w07-l06-c01`:** pure `createTaskStore` (list/get/create/update/remove) using deterministic injected clock. At a minimum test fresh empty, stable IDs after removal, seeded IDs, completed filters, clones vs references, update and remove found/missing, and a new store instance. **Never claim this restarts Node or calls Express.**

**Suite 2 — `p1-w07-l07-c01`:** pure `validateCreateBody`, `validatePatchBody`, `parseTaskId`, `parseCompletedFilter`. Cover bad input shapes, title boundary 1/80/81, trimming without mutation, extra fields, boolean false presence, invalid ID syntax/unsafe number, absent/true/false/invalid filter. **Never claim this tests HTTP middleware or JSON parsing.**

**Passing:** all mandatory reviewed behavior tests. Code matching/requiring a particular style cannot substitute for behavior checks. Sandbox isolation and time limits must be reviewed before enabling either suite. Do not distribute internal/reference source as a learner exercise solution.

## D. Local project assessment plan

The ten `local-project-self-verified` checkpoints are specified in `WEEK07_CHECKPOINT_INVENTORY.md` with explicit run commands, expected status/body/evidence and safe failure paths. Learner reports what they actually ran; FullStack Fieldbook cannot inspect backend, browser, SQL or local filesystem automatically.

Specific transfer/debug challenge for `p1-w07-l12-c03`: choose one issue from an unseen equivalent set (missing JSON parser; premature catch-all; `completed:false` ignored; `DELETE 204` erroneously parsed as JSON). Ask for a predicted symptom, real reproduction, minimal patch, new regression assertion and a brief explanation. Withhold completed solution; do not require paid AI to pass.

## E. Worked feedback standards and optional AI exercises

- **Expected useful feedback:** “`req.query.completed` is a string: `Boolean("false")` is true. Parse the exact accepted values before filtering.”
- **Expected useful feedback:** “`completed: false` is a supplied field. A truthiness check loses it; test field presence and boolean type.”
- **Expected useful feedback:** “HTTP 204 has no body. Don't call `response.json()` for successful DELETE.”
- **Expected useful feedback:** “Source tasks were stored in Node memory. Restarting the backend resets that store; Week 9 adds PostgreSQL.”
- **Unhelpful feedback:** “Wrong,” “Try again,” copying entire reference Express server, or showing a precomputed pass without real execution.

**Optional activities:** `l11-c03` one-file AI-reviewed documentation/test improvement; `l12-c04` non-gating pagination or validation enhancement; `l12-c05` non-gating HTTP documentation/test expansion. Do not silently convert them into gates.

## F. Quality/release checklist for item authoring

- [ ] Reviewed full 66-item question bank actually exists and maps to these 12 stable quiz IDs.
- [ ] Every correct and incorrect answer has technical rationale, alternate retry and hints; essential candidates explicitly reviewed.
- [ ] Scored quizzes use 80% rounded up and all approved essential checks.
- [ ] Pure JS suites pass all mandatory tests inside the **approved isolated runner** without network/Node/npm access.
- [ ] All ten local evidence forms have real student-run commands, expected results and explicit self-verification disclosure.
- [ ] Instructor reference files, raw answer keys and private solutions are absent from public assets.
- [ ] A D7 learner pilot validates instructional clarity and the local frontend/backend split; no invented pilot signoff.

**Status: D0 draft only. No actual question bank, browser test results or observed student outcome is being claimed.**