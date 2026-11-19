# Week 3 Checkpoint Inventory — DEC-21 Mapping (D0 Proposal)

**Scope:** Week 3 mastery contract **owner-approved as D0 planning structure (A-004)**; actual code/tests and quiz banks are not implemented. Original private instructor chapters C01–C22 and starter/reference archive were consulted. Stable lesson IDs `p1-w03-l01`–`p1-w03-l11` are preserved.

## A. Complete proposed checkpoint inventory

| Stable checkpoint ID | Verification type | Required? | Learning outcomes | Passing rule / stored local evidence | Source |
|---|---|---|---|---|---|
| `p1-w03-l01-c01` | `quiz-auto` | Yes | O01–O02 | Five scored items; ≥4 correct and essential item; record score/item version | C03 |
| `p1-w03-l01-c02` | `browser-code-auto` | Yes | O03 | Pure helper passes all count/non-mutation tests; record tested fixture/test version | C03,C04 |
| `p1-w03-l02-c01` | `browser-code-auto` | Yes | O04–O06 | Title validator + rename behavior pass all required boundary/immutability checks | C04 |
| `p1-w03-l02-c02` | `quiz-auto` | Yes | O04–O06 | Five questions; ≥4 and essential validation item | C04 |
| `p1-w03-l03-c01` | `browser-code-auto` | Yes | O07–O09 | Oldest/newest sorting preserves source and identity | C05 |
| `p1-w03-l03-c02` | `quiz-auto` | Yes | O07–O09 | Five items; ≥4 and essential mutation item | C05 |
| `p1-w03-l04-c01` | `local-project-self-verified` | Yes | O10–O12 | Student confirms HTTP server, module import, diagnosed/fixed path error, brief observation | C02,C06 |
| `p1-w03-l04-c02` | `quiz-auto` | Yes | O10–O12 | Five items; ≥4 and any approved essentials | C06 |
| `p1-w03-l05-c01` | `browser-code-auto` | Yes | O13–O15 | Delegated event behavior on nested targets after rerender; correct task IDs | C07 |
| `p1-w03-l05-c02` | `quiz-auto` | Yes | O13–O15 | Five items; ≥4 and essential ID/target item | C07 |
| `p1-w03-l06-c01` | `browser-code-auto` | Yes | O16–O19 | Edit Save/Cancel validation, Enter/Escape, identity and focus pass required checks | C08,C11 |
| `p1-w03-l06-c02` | `optional-enrichment` | No | O19 | Extra focus/keyboard polish, no unlocking effect | C11 |
| `p1-w03-l07-c01` | `browser-code-auto` | Yes | O20–O23 | Combined views, empty/no-match states, global count, source preserved | C05,C09 |
| `p1-w03-l07-c02` | `quiz-auto` | Yes | O20–O23 | Five items; ≥4 and essential nondestructive view item | C09 |
| `p1-w03-l08-c01` | `browser-code-auto` | Yes | O24–O25 | Mock JSON parsing rejects bad shape/deduplicates, separate from course storage | C10 |
| `p1-w03-l08-c02` | `local-project-self-verified` | Yes | O26–O27 | Local keyboard/focus/safe-text test and storage-origin observation | C10,C11 |
| `p1-w03-l09-c01` | `browser-code-auto` | Yes | O28–O31 | Test catches seeded regression, corrected implementation passes, learner names root cause | C12,C13 |
| `p1-w03-l10-c01` | `quiz-auto` | Yes | O32–O34 | Five items; ≥4, correct review/safety reasoning | C14 |
| `p1-w03-l10-c02` | `local-project-self-verified` | Yes | O32–O34 | Learner inspects actual `git diff`, records issue/decision and regression checks | C02,C14 |
| `p1-w03-l10-c03` | `optional-enrichment` | No | O34 | Optional comparison of AI-generated suggestion with own plan; no AI account required | C14 |
| `p1-w03-l11-c01` | `local-project-self-verified` | Yes | O35–O38 | Project acceptance matrix incl local test run, behavior on refresh, safe text and keyboard | C15–C18 |
| `p1-w03-l11-c02` | `quiz-auto` | Yes | O35–O39 | Ten items; ≥8 correct **and all essential**; recorded score/version | C19 |
| `p1-w03-l11-c03` | `local-project-self-verified` | Yes | O39 | No-AI transfer challenge implemented/tested/explained with bounded self-reported evidence | C17–C19 |
| `p1-w03-l11-c04` | `optional-enrichment` | No | O38 | Extra test(s) or optional interface improvement | C17,C22 |

**Counts checked:** 24 entries; **21 required** = 8 quizzes + 8 browser coding checks + 5 local project self-verifications; **3 optional**. Required/optional counts determine lesson and weekly completion. The `p1-w03-lNN-cNN` identifiers must remain stable when authoring actual questions/test fixtures.

**Prerequisites:** L01 requires **Week 2 graduation**; each LNN (NN>01) requires completion of previous L(NN−1). Within a lesson, checkpoints may be attempted in any reasonable order after the lesson unlocks. L11 contains weekly project, readiness and independent transfer; Week 4 remains locked until all three and all preceding required checkpoints are satisfied. These are explicit graph rules, not inferred from completion percentages.

## B. Common specification fields and evidence rules

For *every required checkpoint* later author `stableId`, `lessonId`, `outcomeIds`, `sourceRefs`, `prerequisites`, `method`, `required`, `passRule`, `essentialFlags`, fixtures/edge cases, corrective feedback, retry alternatives, evidence schema, and review/version metadata. Specific quiz question IDs in `WEEK03_ASSESSMENT_ITEM_PLAN.md` are **not** the same as checkpoint IDs.

- **Quiz:** minimum 80% (5→4; 10→8) plus all flagged essentials; unlimited retries, actionable error explanation and equivalent question-bank variants where available. No memorization-based unlock by repeated identical answers.
- **Browser code:** all mandatory behavior assertions must pass in a security-reviewed sandbox. No source-string comparison, no reading Fieldbook's trusted local storage, no unrestricted execution in the main page. Store result IDs/counts, version and completion status; do not collect arbitrary student code in course progress unless explicitly authorized.
- **Local evidence:** learner explicitly confirms run/check outcomes; record bounded optional text or structured counts/answers, no credentials, no private logs or path exposure, no screenshot requirement. Label **Self-verified locally**, not **Passed automatically**. A fake or missing command report must not be auto-marked by the app as observed execution.
- **Optional:** no impact on lock or progress denominator; use any optional tool freely. Revisit/retry does not revoke mastery; formal reset previews downstream invalidation.

## C. Browser-code mandatory behavioral contracts

### L01-c02 — Pure data helper and invariant

**Input:** an array of three `{id,title,completed}` records with mixed statuses. **Required:** returns correct remaining count or selected record IDs for supplied new fixture; repeated call returns same result; input length/order/record flags unchanged. **Negative:** function that toggles a record or reassigns task array while counting fails. **Feedback:** highlight `return` vs effect; show before/after snapshot from isolated fixture. **Stored evidence:** suite version + passed case IDs, no full source.

### L02-c01 — Validation and immutable rename

**Input:** IDs 7/9/12 with nonconsecutive ordering. **Required:** trims text; rejects nonstring, blank whitespace, >100-character title, unknown ID; accepts exactly 100; updates exactly one ID, leaves others and original input unmodified. **Negative:** `tasks[id]`, mutation of original, accepts 101 characters, loses other fields. **Feedback:** first failing boundary with expected/actual behavior. **Implementation note:** source helper returns `{ok,tasks,error}`; authored exercises can expose equivalent behavior without requiring exact function name if contract is explicitly documented.

### L03-c01 — Sorting without mutation

**Input:** IDs `[12,4,19]`, then `[]` and duplicate-title records. **Required:** oldest ascending ID, newest descending ID; source remains `[12,4,19]`; selection actions target IDs, never rendered positions. **Negative:** direct `.sort()` on source fails nonmutation check; string comparator fails numeric ordering. **Feedback:** display original and returned orders. Do not claim ID is an actual timestamp.

### L05-c01 — Delegated event routing

**Fixture:** sandbox list element with generated rows; Delete/Edit button contains nested child; checkbox changes via `change`, not button click. **Required:** one listener on stable container routes valid `data-action` and numeric `data-id`, tolerates click on inner span, avoids duplicate actions after re-render; ignores outside/unknown target. **Negative:** `event.target.dataset.action` only, index-based update, listener attached to removed row. **Feedback:** show target vs nearest matching actionable ancestor. **Risk:** depends on genuine isolated DOM events; no fake synthetic pass if runner cannot simulate action reliably.

### L06-c01 — Edit state transitions

**Fixture:** three tasks with nonconsecutive IDs and edit controls. **Required:** Edit loads draft from selected ID; Save trims and persists valid title; empty/101-character Save rejected without altering original; Cancel and Escape discard changes; Enter submits valid edit; edits after sorting target correct ID; buttons/forms labeled and focus behaves as documented. **Negative:** keystroke changes source immediately; editingId stale after delete; keyboard handler swallows unrelated input. **Feedback:** identify transition where source data changed unexpectedly. **Risk:** focus and keyboard checks require real DOM focus and forms; design D4-runner-compatible D5 deterministic tests rather than parsing HTML strings.

### L07-c01 — Combined search + filter + sort + empty states

**Input:** ID 7 `Read JavaScript` active, 9 `Practice CSS` complete, 12 `Debug JavaScript` active. **Required:** query `JAVAscript` finds IDs 7/12; Completed+`css` returns ID 9; oldest/newest numeric ID ordering; `tasks` unchanged through view changes; `countRemaining` remains 2; distinguishes zero global tasks from no matches. **Negative:** destructively overwrites `tasks`, sorts source, counts visible-only rows, case-sensitive search. **Feedback:** compare source/visible IDs and expected count.

### L08-c01 — Defensive parse using isolated fixtures

**Input:** `null`, valid JSON array, syntactically invalid JSON, valid JSON wrong top-level shape, duplicate ID, blank title, wrong `completed` type, non-positive/unsafe ID. **Required:** `null`→empty; invalid or wrong shape handled by documented caller catch path; malformed/duplicate entries filtered per contract; still-valid entries preserved in order. **Negative:** `JSON.parse` is trusted as data validation, malformed string crashes UI, duplicate IDs survive. **Feedback:** distinguish parse success, top-level structure and per-record validation. **Isolation:** do **not** access actual `localStorage` in the Fieldbook host; use passed JSON strings or mocked storage.

### L09-c01 — Test meaningful failure then correction

**Scenario:** broken testable sort/rename helper intentionally mutates source or targets an index. **Required:** learner-authored or repaired assertion detects faulty fixture; correct implementation passes; learner selects/enters root cause in an independently checked prompt. **Negative:** always-true test, only checking `typeof function === 'function'`, no regression after fix. **Feedback:** explain which invariant was not tested. **Risk:** test meta-checks must be reviewed to avoid rewarding copying one exact assertion string.

## D. Local self-verification contracts

### L04-c01 — Module and server setup

Learner locally verifies: (1) ES-module export/import split, (2) `index.html` loads module via `type="module"`, (3) project served from a localhost HTTP URL, (4) deliberate wrong import path yields an observable console/network error and corrected path works. **Evidence:** selected checks + short explanation of error/repair. Provide sample `python -m http.server 5500` only when Python is installed; offer a free editor local-server alternative. This is a local attestation, not remotely inspected startup.

### L08-c02 — Keyboard, text rendering and storage origins

Learner locally checks: task title with harmless markup-like string displays literally; label/input/control names make sense; Tab focus visible; Enter saves and Escape cancels edit; focus returns to useful control after modal/form exit; reload uses expected origin; switching port can make tasks appear absent without data migration. **Evidence:** structured checklist and brief note on one observation. Do not require unsafe script payloads or real private data.

### L10-c02 — Git diff and review log

Learner checks `git status` and `git diff` for a manual project change, records reason, affected file(s), test run and which risks were checked. **Evidence:** bounded summary (no credentials/agent chats required). An AI suggestion is **optional**; Git review is mandatory.

### L11-c01 — Integrated Study Tasks v3 project

Learner verifies against the provided student starter and requirements:

- [ ] Same existing Week 2 tasks/schema; storage key `study-tasks-week2`, no accidental reset when origin is unchanged.
- [ ] Add/Complete/Delete/All/Active/Completed all still work; controls use stable IDs.
- [ ] Title edits validated: whitespace rejected, 100 accepted, 101 rejected, unknown ID not silently created.
- [ ] Edit/Save/Cancel, Enter/Escape, visible focus, accessible labels, safe title text.
- [ ] Search trims/case-folds, works alongside status filter; Newest/Oldest by ID; old tasks not lost.
- [ ] Count uses all unfinished tasks; global-empty vs no-match messages differ.
- [ ] Modules load through HTTP and testable logic is separated from DOM code.
- [ ] Guarded saved-data parse/dedupe; refresh retains accepted task changes on the same browser origin.
- [ ] Student runs and reviews actual browser `tests.html` or equivalent suite, recording observed pass/failure summary and one repaired failure.
- [ ] Git commits and README describe three bugs investigated and reviewed changes.

**Evidence:** checks + observed local test summary + brief explanation of one nontrivial behavior. **Important:** original reference reports 22 assertions; do not grade solely by exactly “22 passed.” Fieldbook does not itself execute the learner's local project.

### L11-c03 — Independent no-AI transfer challenge

Choose one after course teaching: **A)** create a regression test for Edit→Cancel after changing sort order that fails if source title was prematurely mutated; or **B)** repair a delegated-click handler that fails when target is nested inside a button. Docs/DevTools allowed; **no AI for the independent diagnostic**. Learner records exact behavior before/after, one test, and a short explanation. Checklist is an honest self-attestation, not a proctored certification. Student can retry or review lesson before reattempting.

## E. Quiz-auto checkpoint contracts

| Quiz checkpoint | Planned question count | Minimum | Proposed essential IDs (pending authored item review) | Focus |
|---|---:|---:|---|---|
| `p1-w03-l01-c01` | 5 | 4/5 | `p1-w03-l01-q04` | source data / pure view vs effects |
| `p1-w03-l02-c02` | 5 | 4/5 | `p1-w03-l02-q03` | invalid rename protects source task |
| `p1-w03-l03-c02` | 5 | 4/5 | `p1-w03-l03-q03` | copied sort versus source mutation |
| `p1-w03-l04-c02` | 5 | 4/5 | — | import/export, origin, setup errors |
| `p1-w03-l05-c02` | 5 | 4/5 | `p1-w03-l05-q03` | nested target, stable task ID |
| `p1-w03-l07-c02` | 5 | 4/5 | `p1-w03-l07-q03` | filter/search must not delete saved tasks |
| `p1-w03-l10-c01` | 5 | 4/5 | — | agent/Git review, concrete test evidence |
| `p1-w03-l11-c02` | 10 | 8/10 | `p1-w03-l11-q02`, `p1-w03-l11-q07` | integrated data integrity and safe verification |

Total **45 item slots**. “Essential” flags above are **seed proposals** requiring technical and educational review of the actual question wording. Essential-item failures block regardless of overall score. Use alternate equivalent scenarios for retries; no punitive attempt limit.

## F. Week 3 graduation and implementation review pending

- Completion is **not** `25/25` or raw time: only the **21 required** checkpoints count. Optional 3 never affect gating.
- Week 4 is locked until **all 11 Week 3 lessons**, L11 `c01` integrated project, L11 `c02` readiness quiz, and L11 `c03` transfer challenge are satisfied.
- If any local self-verification is required, weekly completion must read **“includes self-verified work.”** No auto-issued professional certificate.
- D5 (Weeks 2–4 integration in the approved roadmap) may not claim Week 3 checks tested until actual implementations and D4-runner compatibility are validated. Milestones remain separately authorized after D0/D1 signoff and D2.
- **A-004 owner structural approval:** 11 lesson groupings and 24 checkpoint slots (21 required, 3 optional) are the approved authoring baseline. Final essential-question wording, DOM keyboard/focus runner feasibility, local attestation UX and real learner test evidence remain subject to D5 review.

**This file defines an educational test contract, not a test runner or proven learner achievement.**
