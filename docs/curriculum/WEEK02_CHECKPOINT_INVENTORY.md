# Week 2 Checkpoint Inventory — DEC-21 Mapping (D0 Proposal)

**Status:** source-inspected **owner-approved checkpoint structure (A-003)**. Checkpoint IDs are the planning baseline; they are **not implemented tests** or a finished question bank.  
**Week:** Phase 1 / Week 02 · **Project:** Study Tasks v2.  
**Dependencies:** `WEEK02_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK02_ASSESSMENT_ITEM_PLAN.md`, `docs/learning/MASTERY_RULES.md`.  
**Important:** These are the learner's *Week 2 task-app* checks, not verification of FullStack Fieldbook's own storage/progress implementation.

## A. Complete proposed inventory

| Lesson | Stable checkpoint ID | Verification | Required? | Mapped outcomes | Source C## |
|---|---|---|---|---|---|
| L01 | `p1-w02-l01-c01` | `quiz-auto` | YES | O01–O03 | C03,C07 |
| L01 | `p1-w02-l01-c02` | `browser-code-auto` | YES | O01–O03 | C03 |
| L02 | `p1-w02-l02-c01` | `browser-code-auto` | YES | O04–O06 | C04 |
| L02 | `p1-w02-l02-c02` | `optional-enrichment` | NO | O04–O06 | C04 |
| L03 | `p1-w02-l03-c01` | `browser-code-auto` | YES | O07–O09 | C05 |
| L03 | `p1-w02-l03-c02` | `quiz-auto` | YES | O07–O09 | C05,C17 |
| L04 | `p1-w02-l04-c01` | `quiz-auto` | YES | O10–O12 | C06 |
| L05 | `p1-w02-l05-c01` | `browser-code-auto` | YES | O13–O15 | C06,C07 |
| L06 | `p1-w02-l06-c01` | `browser-code-auto` | YES | O16–O18 | C07 |
| L07 | `p1-w02-l07-c01` | `browser-code-auto` | YES | O19–O21 | C08 |
| L07 | `p1-w02-l07-c02` | `quiz-auto` | YES | O19–O21 | C08 |
| L08 | `p1-w02-l08-c01` | `browser-code-auto` | YES | O22–O24 | C09 |
| L08 | `p1-w02-l08-c02` | `quiz-auto` | YES | O22–O24 | C09 |
| L09 | `p1-w02-l09-c01` | `browser-code-auto` | YES | O25–O27 | C10 |
| L09 | `p1-w02-l09-c02` | `quiz-auto` | YES | O25–O27 | C10 |
| L10 | `p1-w02-l10-c01` | `local-project-self-verified` | YES | O28–O30 | C11,C15 |
| L10 | `p1-w02-l10-c02` | `quiz-auto` | YES | O28–O30 | C11,C12,C17 |
| L10 | `p1-w02-l10-c03` | `optional-enrichment` | NO | O29 | C12 |
| L11 | `p1-w02-l11-c01` | `local-project-self-verified` | YES | O31–O32 | C15,C16,C18 |
| L11 | `p1-w02-l11-c02` | `quiz-auto` | YES | O31–O34 | C17 |
| L11 | `p1-w02-l11-c03` | `local-project-self-verified` | YES | O33–O34 | C17,C20 |
| L11 | `p1-w02-l11-c04` | `optional-enrichment` | NO | O31–O34 | C15,C20 |

**Count:** **22** = 8 `quiz-auto` + 8 `browser-code-auto` + 3 `local-project-self-verified` + 3 `optional-enrichment`. Therefore **19 mandatory + 3 optional**.

## B. Common specification fields for all checkpoints

Before content release, each checkpoint must have: stable ID; lesson and learning outcome IDs; original source C##; type; required flag; question/test IDs; pass rule and edge cases; misconception explanations and hint ladder; retry/equivalent item policy; prerequisite IDs; version; review status; minimum progress evidence. This document provides a *design contract* for those fields, but does not claim the actual code runner/question bank has been executed.

- **Prerequisites:** L01 requires Week 1 graduation. Each later lesson requires all mandatory checkpoints of the immediately previous Week 2 lesson. Optional side activities can be opened without locking the next lesson.
- **Quiz passing:** ceil(0.8 × scored items); with five questions requires **4/5**, with ten requires **8/10**. Every specifically marked essential item must be answered correctly as well. Wrong responses get specific explanation and an equivalent retry when appropriate.
- **Browser coding:** all mandatory behavioral cases pass in a *reviewed isolated sandbox*. The evaluator tests outputs, state and DOM behavior; not regex matching for `map`, `filter`, `textContent`, or a particular coding style. If code execution is unavailable, **never mark it passed**; show unavailable/pending verification.
- **Local projects:** user confirms each concrete step after running their own app and records bounded text such as “tests passed: add, toggle, reload, filter; one defect fixed.” This is **learner attestation**, NOT independent technical verification.
- **Recorded evidence:** checkpoint ID, result, content version, timestamp, method, quiz score or test pass identifiers or a small self-attestation. Do **not** store private codebases, full terminal logs, passwords, personal details or real Git accounts in the platform record.
- **Reset and reattempt:** review/retry doesn't revoke achieved mastery; formal reset cascades with confirmation. Imports recompute prerequisites rather than trusting boolean unlock flags.

## C. Proposed browser-code behavioral contracts

### L01-c02 — Task record modeling (`browser-code-auto`)

**Fixture:** small isolated JavaScript expression/function challenge, with two records defined by learner code; no access to application DOM.

| Test ID | Required behavior |
|---|---|
| t01 | Returns an array with exactly two objects; both have numeric positive safe-integer `id`, nonempty string `title`, Boolean `completed`. |
| t02 | IDs are distinct and are not assumed equal to the element index. |
| t03 | After filtering away the first task, the second retains its original `.id` even though its position changes. |
| t04 | Can read the correct second title and original array length. |
| t05 | Can explain via a short accompanying concept question that `const` protects binding reassignment, not mutation of referenced objects. |

**Negative controls:** two strings instead of records, reused ID, index-derived ID after reorder must not pass. Output/behavior checks only.

### L02-c01 — Functions and callbacks (`browser-code-auto`)

| Test ID | Required behavior |
|---|---|
| t01 | `normalizeTitle("  Practice JS  ")` returns `"Practice JS"`. |
| t02 | Empty and whitespace-only text normalize to empty strings and validate false. |
| t03 | `isNonEmptyTitle("  Study  ")` is true; `isNonEmptyTitle("  ")` is false. |
| t04 | A count helper correctly computes unfinished tasks for 0, 1 and mixed status inputs without changing the supplied task array. |
| t05 | Given an `onEach`-style fixture, passes a callback that is invoked once for each value rather than eagerly during setup. |

**Fixture note:** function names are educational API requirements *for this exercise only*, not a requirement for the whole student's project. Tests should accept valid equivalent function bodies.

### L03-c01 — Array operations (`browser-code-auto`)

| Test ID | Required behavior |
|---|---|
| t01 | Selects 2 active of 3 tasks via a returned array; original records remain intact. |
| t02 | Maps to ordered title strings; doesn't rely on `forEach` returning a new array. |
| t03 | Toggles only record ID 7, preserving all non-target IDs and titles and original array length. |
| t04 | Searches existing ID and returns `undefined` for absent ID without throwing. |
| t05 | Calculates `max(ids)+1` including an empty list (1) and noncontiguous IDs (e.g. 4,9→10). |
| t06 | Does not replace the source array with the displayed filtered subset. |

**Negative controls:** wrong IDs, in-place view mutation, assuming IDs are indexes, returning `undefined` after `forEach` transformation.

### L05-c01 — State-driven rendering (`browser-code-auto`)

| Test ID | Required behavior |
|---|---|
| t01 | Renders two task records as exactly two `li` elements under correct fixture list. |
| t02 | A second `render()` with unchanged state still produces exactly two `li` elements (no duplicates). |
| t03 | Replaces state with one remaining task and a rerender shows exactly one matching `li`. |
| t04 | Literal title `"<b>Read</b>"` stays as text without an actual nested `b` created from the title. |
| t05 | Checkbox states match `.completed`, and visual completion semantics are synchronized with rendered data. |
| t06 | No list rows are re-added from stale DOM elements missing in `tasks`. |

**Isolation:** a standalone sandboxed DOM fixture. If rendered via iframe, the evaluator must avoid trusted parent origin access. Preserve accessibility and focus checks in manual review where needed.

### L06-c01 — Add, toggle, delete by stable ID (`browser-code-auto`)

| Test ID | Required behavior |
|---|---|
| t01 | Adding valid title creates a new task with unique positive ID and `completed:false`. |
| t02 | Adding whitespace-only input creates no record and exposes useful feedback. |
| t03 | Toggle complete then uncomplete for the same ID updates the model and visible checkbox. |
| t04 | Deleting ID 9 removes ID 9 even when it is at index 0 or filtered into a different position. |
| t05 | Rerender after update/delete has no duplicate elements; other tasks remain intact. |
| t06 | Pressing Enter submits exactly once; Delete button does not trigger form submit. |

**Scope:** storage not mandatory here; L08 adds it. Do not force a specific implementation technique so long as stable-ID behavior and state/render synchronization are correct.

### L07-c01 — Safe events and title rendering (`browser-code-auto`)

| Test ID | Required behavior |
|---|---|
| t01 | Harmless literal angle-bracket input such as `"<b>Review</b>"` is visible exactly as text; no b-element is created from title. |
| t02 | A title containing an ampersand or quotation marks survives without HTML parsing. |
| t03 | Checkbox has a discernible label and `change` updates the intended task only. |
| t04 | Add form supports keyboard Enter and uses the submit event. |
| t05 | Delete buttons are `type="button"` in a form fixture; no unexpected submit. |
| t06 | A meaningful form error is available to assistive technology; keyboard focus can return to the input after Add. |

**Safety:** inert text samples only; don't execute malicious payloads or introspect the Fieldbook parent page.

### L08-c01 — JSON and storage (`browser-code-auto`)

**Test strategy:** an injected **fake storage adapter** inside the sandbox with `getItem/setItem`, not the Academy's real `localStorage`. Exercise functions can receive `storage` as a parameter and call its methods; do not insist that the learner access `window.localStorage`.

| Test ID | Required behavior |
|---|---|
| t01 | Serializes task records as valid JSON string and parses them back with IDs, titles and Boolean status preserved. |
| t02 | Missing storage key returns empty task array without exception. |
| t03 | Invalid JSON (`not-json`) does not crash; returns a safe empty result or equivalent documented fallback. |
| t04 | Valid JSON with a non-array top-level value is rejected safely; invalid record shapes aren't blindly used. |
| t05 | A fake `setItem` that throws causes a recoverable failure with an observable warning/result; app state remains usable. |
| t06 | After recovering records IDs `[2,8]`, next assigned numeric ID is greater than 8; empty storage starts from ID 1. |

**Important limits:** reference implementation filters malformed task records but does not deduplicate IDs or exhaustively validate all hostile input. Do not silently introduce production-grade validation as a **Week 2 required** gate. Live reload/storage origin checks belong to L11 local-project self-verification.

### L09-c01 — Non-destructive filtering, remaining count, empty states (`browser-code-auto`)

| Test ID | Required behavior |
|---|---|
| t01 | All shows all source tasks, Active only incomplete, Completed only completed. |
| t02 | Changing views leaves the underlying source task array unchanged; switching back to All restores hidden tasks. |
| t03 | Remaining count always equals **global incomplete records**, even while Completed view is selected. |
| t04 | No source tasks shows “No tasks yet”; a nonempty source with no selected matches shows “No tasks match this filter” (text may vary but meanings distinct). |
| t05 | Filter controls' `aria-pressed` correctly indicate the current selection and remain buttons of `type="button"`. |
| t06 | Completing a task while viewing Active removes it from that view but not from source; deleting by ID while filtered removes only the intended record. |
| t07 | Filter switching alone never invokes storage saving or changes task records (instrumented adapter). |

**Negative control:** implementations that permanently assign `tasks = tasks.filter(...)` on filter selection must fail because they lose records.

## D. Local-project self-verification contracts

### L10-c01 — Reproduce and fix a data/DOM bug

Learner checks **all**:

- [ ] Work in an expendable local copy of Study Tasks; state starting tasks and exact reproduction steps.
- [ ] Diagnose **one** supplied bug: duplicate rows after render, deleted row reappearing, non-destructive filter wiping source data, or invalid storage shape.
- [ ] Observe both model and DOM (Console/Elements/Storage as relevant), propose a single cause, and apply one purposeful fix.
- [ ] Repeat original steps and at least one neighboring regression scenario; confirm the bug no longer appears.
- [ ] Record a bounded note: expected/actual before, root cause, fix, and verified outcome. Do not paste unrestricted console logs or private files.

Completion label **Self-verified locally**; app cannot independently inspect the student's local dev environment.

### L11-c01 — Completed Week 2 Study Tasks v2 project

Learner runs/downloads the appropriate Week 2 **starter** (or own Week 1 code) and confirms all required behaviors. Explicit test data:

1. Add two valid titles. Reload the *local project*; both remain.
2. Complete one, reload, confirm checkbox state; toggle back and confirm persistence.
3. All/Active/Completed show correct task subsets without deleting hidden tasks.
4. Remaining count reflects all incomplete tasks regardless of selected view.
5. Add a task after reload/deletion; numeric ID does not reuse a live ID.
6. Delete a task, reload, verify it's permanently removed.
7. Reject whitespace-only input; Enter triggers add; Delete does not submit form.
8. Add harmless literal HTML-looking text and verify it is displayed as text, not interpreted HTML.
9. No tasks versus no matching tasks produce distinct helpful empty-state messages.
10. In expendable **test data only**, corrupt the `study-tasks-week2` value; a subsequent reload warns/recovers rather than crashing. Restore valid data afterward.
11. If storage is blocked, the app remains usable and displays a warning that changes may be lost.
12. Verify basic keyboard focus/labels and narrow layout; record at least one reviewed Git commit after a working checkpoint.

**Environment note:** if `file://` storage behaves inconsistently, use an ordinary local static server and test from the same origin. Do not confuse Fieldbook's own progress with the student's Study Tasks storage. **No source ZIP reference solution** is required for pass.

**Evidence to record:** checkbox attestations above, brief local test outcome, one thing understood and one bug fixed. No actual task contents, browser dumps, secrets or personal identity. Learner chooses to self-attest; Fieldbook does **not** inspect local files or confirm the result.

### L11-c03 — Independent no-AI transfer task

After the working project, use one of two equivalent tasks (no AI, documentation permitted):

- **Option A:** Display completed task count derived from `tasks`, not from currently visible rows; count remains correct when filter changes.
- **Option B:** Diagnose/fix a purposely introduced filter bug that overwrites source state, then show a three-task example proving hidden tasks remain.

**Self-verification:** specify the initial three-task fixture, expected result, actual result and exact file/function modified; explain why the solution works and which regression test was used. No need to upload code. The checkbox is an attestation, not an automatic grade.

## E. Quiz-auto groups and proposed essential items

| Checkpoint | Scored items | Pass | Proposed essential skill |
|---|---:|---|---|
| L01-c01 | 5 | ≥4/5 | none |
| L03-c02 | 5 | ≥4/5 | differentiate selection versus deletion (`q04`) |
| L04-c01 | 5 | ≥4/5 | source-state versus DOM (`q03`) |
| L07-c02 | 5 | ≥4/5 | safe literal text (`q02`) |
| L08-c02 | 5 | ≥4/5 | malformed storage recovery (`q03`) |
| L09-c02 | 5 | ≥4/5 | filter must not delete (`q02`) |
| L10-c02 | 5 | ≥4/5 | none |
| L11-c02 | 10 | ≥8/10 | state→save→render (`q04`) and global count/filter integrity (`q07`) |

**Quiz-item identifiers:** use `p1-w02-lNN-qNN` (not checkpoint IDs) in `WEEK02_ASSESSMENT_ITEM_PLAN.md`; each item must link back to its checkpoint. Essential flags are **proposed** until educational/technical review. Unlimited retries; select equivalent application questions rather than memorized options.

## F. Week gate, implementation risks, and owner review

- **Week 2 graduation = all 19 mandatory checkpoints completed**, with the three L11 gates present. Because local work is mandatory, the Week 2 completion summary must say **“includes self-verified local work.”**
- Tests must use stable IDs and behavior, not implementation-text matching; no explicit requirement to use exact reference function names in the student's overall project.
- Exercise questions, fixture code, scorer, sandbox, and actual local student-project tests **have not been authored/executed by this planning package**.
- D4 must establish isolated browser code execution before Week 2 `browser-code-auto` checkpoints can be delivered in D5. If an exercise cannot be verified safely as designed, propose a documented checkpoint-type change for owner approval; do not grant a fake pass.
- **A-003 approval:** owner accepted lesson/checkpoint count and structural split. Exact essential question wording, test fairness, local attestation text, browser-storage isolation, authoring QA and real Week 1→Week 2 UI continuity remain unverified. Whole D0/D1 unsigned, D2 not authorized.
