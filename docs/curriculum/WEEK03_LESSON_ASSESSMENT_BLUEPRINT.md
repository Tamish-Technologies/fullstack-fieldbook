# Phase 1 / Week 3 — Lesson and Assessment Blueprint

**Product:** FullStack Fieldbook · **Curriculum:** Phase 1, Week 03 · **Status:** source-inspected **D0 structural plan owner-approved (A-004)**; not authored or validated student content.  
**Project:** Study Tasks v3 (vanilla HTML, CSS and modular JavaScript).  
**Source:** private `../fullstack-fieldbook-source-materials/phase1/week-03/` — **22 original instructor chapters** and starter/reference project archives.  
**Authority:** DEC-02/12/13/14/17/21/23/24, `docs/learning/MASTERY_RULES.md`. Week 1 and Week 2 lesson/checkpoint **structures** are approved as planning baselines (A-001 and A-003); actual lessons, quiz banks, executable Fieldbook checks and learner pilots are not complete.

## 1. Purpose, performance goals and hard boundaries

**Continuity:** Week 2 moved task data into an array, introduced state-driven rendering, IDs, All/Active/Completed filters and JSON persistence. Week 3 improves the *same app* rather than starting a disconnected tutorial: separate pure task logic from DOM effects, implement safe editing, compose search and sorting with existing filters, keep task persistence, and use evidence-driven debugging and tests.

At the end of the week a learner should independently be able to:

1. Draw `user intent → state transformation → optional persistence → derived view → DOM`, and identify operations that must *not* mutate source tasks.
2. Write pure helpers for task data and explain why returned arrays/objects differ from existing references.
3. Validate edits (trim, nonblank, max **100 characters**); rename only the selected stable ID, preserve the original array on failure.
4. Explain that `Array.prototype.sort()` mutates its receiver; compute oldest/newest views **without reordering stored tasks**.
5. Use ES module `import`/`export`, run an HTTP local development server and identify a failed `file://` module import.
6. Explain event bubbling and use delegated handlers on a stable list container for regenerated rows.
7. Implement Edit / Save / Cancel with a temporary draft and keyboard Enter/Escape, with explicit focus restoration.
8. Combine case-insensitive search, status filtering and ID-based ordering, displaying meaningful empty states without deleting hidden tasks.
9. Defensively load existing Week 2 saved tasks, handle malformed JSON/duplicate IDs and preserve the same storage schema.
10. Write and run useful JavaScript tests, debug a failing case, inspect a Git diff and explain any AI-suggested change.

**Prerequisite:** all mandatory Week 2 gates and Week 2 weekly project/readiness completion. The Week 3 starter is the **completed Week 2 baseline** (`starter/app.js` and friends), not the completed Week 3 solution. Prefer the student's own working v2 branch where possible.

**Week 3 source contract:** task shape `{id: positive safe integer, title: nonempty string <= 100 characters, completed: boolean}`; app storage key remains `study-tasks-week2`; `all/active/completed` filters remain; the Week 3 reference defines `newest` and `oldest` based on increasing numeric **IDs**, not actual timestamps. Switching browser origin/port may make existing localStorage appear empty. Week 3 intentionally does **not** add async `fetch`, APIs, React, Node, databases, authentication or paid tools.

**Course platform boundary:** FullStack Fieldbook itself uses local browser progress storage. Student-written sandbox exercises must **not** access it or the learner's personal `Study Tasks` storage. Browser checks must use isolated fixtures and/or mock storage. A complete local project run remains labeled **self-verified**, even if it contains its own 22-test browser suite.

**Learning rhythm:** 11 sequential student lessons, short checkpoint activities, plus one larger project; former mentor schedule (two 90-minute sessions + 4–6 hours practice) is a reference, not a self-paced time lock. Student-facing content must teach from first principles instead of assuming a mentor fills conceptual gaps.

## 2. Lesson sequence and checkpoint contract

| Lesson ID | Learner-facing title | Objective tags | Mandatory checkpoints | Optional | Original chapters |
|---|---|---|---|---|---|
| `p1-w03-l01` | From user intent to pure data transformations | O01–O03: diagram data flow, define invariant, pure helper | `c01` quiz, `c02` browser JS | — | C03,C04 |
| `p1-w03-l02` | Validation and immutable task edits | O04–O06: normalize, validate, rename by stable ID | `c01` browser JS, `c02` quiz | — | C04,C05 |
| `p1-w03-l03` | Stable IDs and non-mutating sorting | O07–O09: ID vs position; copied sort; consistent ordering | `c01` browser JS, `c02` quiz | — | C05 |
| `p1-w03-l04` | ES modules and the local development server | O10–O12: import/export; serve files; diagnose loading | `c01` local self-verification, `c02` quiz | — | C02,C06 |
| `p1-w03-l05` | Event bubbling and delegated handlers | O13–O15: find actionable target; route by data ID; avoid duplicate listeners | `c01` browser DOM, `c02` quiz | — | C07 |
| `p1-w03-l06` | Inline editing as a state machine | O16–O19: edit draft; valid Save; Cancel; keyboard/focus | `c01` browser DOM | `c02` extra keyboard enhancement | C08,C11 |
| `p1-w03-l07` | Search, status filters, sorting and empty states | O20–O23: compose views, preserve tasks, distinguish empty results | `c01` browser JS/DOM, `c02` quiz | — | C05,C09 |
| `p1-w03-l08` | Storage recovery, safe rendering and accessible focus | O24–O27: parse/dedupe; storage origins; safe text; focus | `c01` browser JS, `c02` local usability attestation | — | C10,C11 |
| `p1-w03-l09` | Repeatable debugging and meaningful tests | O28–O31: reproduce, isolate, test failure, regression checks | `c01` browser JS tests | — | C12,C13 |
| `p1-w03-l10` | Reviewing AI suggestions and Git diffs | O32–O34: inspect diff, justify change, validate without AI | `c01` quiz, `c02` local review log | `c03` optional AI comparison | C02,C14 |
| `p1-w03-l11` | Week 3 project, transfer challenge and readiness | O35–O39: ship Study Tasks v3; run tests; independently transfer | `c01` local project, `c02` readiness quiz, `c03` local transfer | `c04` extra test/enhancement | C15–C19,C22; private C20–C21 |

**Proposed Week 3 totals:** **24 checkpoints: 21 required** = **8 `quiz-auto`**, **8 `browser-code-auto`**, **5 `local-project-self-verified`**, plus **3 `optional-enrichment`**. The eight quiz sets have **45 planned scored item slots** (seven 5-item sets and one 10-item readiness set); these are *not authored or reviewed final question banks*. Exact codes, test inputs, false-positive cases and evidence: `WEEK03_CHECKPOINT_INVENTORY.md`. Source references: `WEEK03_SOURCE_TRACEABILITY.md`. Quiz intents: `WEEK03_ASSESSMENT_ITEM_PLAN.md`.

**Gating:** L01 requires Week 2 graduation; L02 requires L01; …; L11 requires L10. Within each lesson, **all mandatory checkpoints** must pass. Week 3 graduation requires all required lesson checks, the **L11 integrated project**, and **L11 readiness** (and independent transfer), not merely reading the last page. Retry/review does not revoke earned mastery; formal reset follows the dependency-aware rules. The mapping above is an **owner-approved planning structure (A-004)**, not approval of published student material or completed tests.

## 3. Detailed lesson-by-lesson authoring specifications

### L01 — From user intent to pure data transformations (`p1-w03-l01`)

**Source:** C03 §four parts/invariants, C04 §A1. **Prerequisite:** completed Week 2. **Target learning effort:** 15–25 minutes.

- **Teach:** Distinguish stored `tasks`, UI controls (`activeFilter`, `searchQuery`, `sortOrder`), temporary edit state (`editingId`, `editDraft`), and effects (render/storage). Define an **invariant** as a property that must remain true after any valid operation: unique IDs, valid task titles, hidden tasks preserved, count from source tasks. Explain a pure function: same arguments → same result; no DOM/storage write; no mutation of input.
- **Worked example to author:** Starting with two task records, sketch a rename operation that returns a new task array. Compare `getVisibleTasks(tasks, options)` with a save operation; a view calculation is not supposed to write `localStorage`.
- **Practice:** Categorize seven actions (Save, Cancel, Search, Sort, Complete, Delete, refresh) into task-data change, view change, transient edit change, or external effect; write a pure `countRemaining()` without changing input.
- **Mistake/feedback:** “Search changes my stored task array.” Show the original 3 IDs before and after a search and require learner to trace which variable changed.
- **Required:** `c01` 5-item quiz covering data-flow, state vs view, purity/invariants; `c02` safe isolated JS behavior checks for a pure count/select helper with repeated calls and input unchanged.
- **Hint ladder:** (1) Identify where the authoritative task list lives. (2) Which operations affect only visibility? (3) Compare original array before/after call with a new returned value.

### L02 — Validation and immutable task edits (`p1-w03-l02`)

**Source:** C04 §§A2–A5, C05 §B1. **Effort:** 20–30 minutes.

- **Teach:** `normalizeTitle`, string type checks, trimmed nonblank input, 100-character maximum, safe-positive IDs, duplicate-ID rejection for creation, and immutable updates via `map`/object spread. Distinguish `return {ok:false, tasks, error}` from throwing on expected user input. `renameTaskInList` must not silently add an unknown ID.
- **Worked example:** Rename ID 7 from `" Read JS "` to `"Read tests"`, leaving ID 12 unchanged and original array intact. Compare invalid whitespace-only rename with valid exactly 100-character title; 101-character title must fail.
- **Practice:** Implement `validateTitle(raw)` and `renameTaskInList(tasks,id,raw)` for fresh fixtures with nonconsecutive IDs; explain why `tasks[id]` is incorrect.
- **Mistake/feedback:** Directly mutate `task.title` and then try to undo; show why an old reference cannot be trusted for rollback.
- **Required:** `c01` isolated JS tests for boundary length, trim, unchanged array, unknown ID and same-ID update; `c02` quiz on returned-result contract and validation boundaries.
- **Hint ladder:** (1) Decide what invalid input should return. (2) Find record using `.id`, not position. (3) Copy task object only when its ID matches.

### L03 — Stable IDs and non-mutating sorting (`p1-w03-l03`)

**Source:** C05 §§B1–B4. **Effort:** 15–25 minutes.

- **Teach:** `Array.prototype.sort()` mutates the array being sorted; `tasks.slice().sort(...)` or another copied form protects source order. Numeric comparator `a.id-b.id`/`b.id-a.id` and difference between `id` and current index. Explain that in this specific learning app “newest” means **highest numeric ID**; it does not prove a real timestamp.
- **Worked example:** IDs `[12, 4, 19]` sorted oldest `[4,12,19]` and newest `[19,12,4]`, then check original stays `[12,4,19]`. Delete ID 12 from a sorted view without touching index 1 by assumption.
- **Practice:** Write `sortTasks(tasks, order)` and choose the record to edit after search and reordering.
- **Mistake/feedback:** `tasks.sort()` permanently reorders storage; show source array after each view control change.
- **Required:** `c01` browser JS tests for numeric order, original array unchanged, nonconsecutive ID handling; `c02` quiz about `sort()` mutation, identity and behavior-based ordering.
- **Hint ladder:** (1) Does this method change its receiver? (2) Where should you copy? (3) Does changing position change an ID?

### L04 — ES modules and the local development server (`p1-w03-l04`)

**Source:** C02 local server instructions, C06. **Effort:** 20–35 minutes, including setup.

- **Teach:** `export` vs `import`, module file boundaries (`task-logic.js` pure logic vs `app.js` DOM), relative path suffix and `<script type="module">`; module scripts differ from classic scripts. Browsers may reject module loading from `file://`; students can serve the project using VS Code Live Server/Live Preview or free `python -m http.server 5500` and inspect Network/Console.
- **Worked example:** Export a `normalizeTitle` function and import it into `app.js` using an actual relative path; show success from `http://localhost:5500/` and a 404 when the path is wrong. State that Python command works only if Python is installed; not a dependency of the published course itself.
- **Practice:** Split a small existing script into two modules. Ask learner to predict which file loads and what a bad path looks like in Network panel.
- **Mistake/feedback:** Double-clicked `index.html` or omitted `./task-logic.js` path; diagnose by URL scheme and file path, not changing security flags or pasting unknown AI commands.
- **Required:** `c01` **local-project-self-verified** checklist: local HTTP server started, module import loaded, one deliberate import-path failure diagnosed/fixed, written observation. `c02` 5-item automatically checked knowledge set. Never label server startup as automatically verified by Fieldbook.
- **Hint ladder:** (1) Check address bar scheme. (2) Inspect Network request to `.js`. (3) Confirm exported name, path and extension.

### L05 — Event bubbling and delegated handlers (`p1-w03-l05`)

**Source:** C07 §§D1–D4. **Effort:** 15–30 minutes.

- **Teach:** Event targeting, bubbling up the DOM tree, `closest()` for a child icon inside a button, stable container listener after re-render, data attributes `data-action` and `data-id`, `click` vs `change` vs `submit`, and guarding non-actions. Use task **ID** in handlers, not list position. Prevent action leakage from nested controls.
- **Worked example:** A delegated `click` handler on `<ul>` identifies Edit vs Delete using action attributes; a separate delegated `change` handler toggles a checkbox by task ID. Show why attaching listeners to disappearing nodes can produce unexpected behavior after re-render.
- **Practice:** In an isolated test DOM, click a nested `<span>` inside a Delete button, then re-render rows and confirm the same one delegated listener still handles actions once.
- **Mistake/feedback:** `event.target.dataset.action` fails for nested icon/span; use `closest()` and ensure action belongs to list container.
- **Required:** `c01` browser DOM tests for one delegated listener, nested target, correct ID after reordered view, unknown action ignored; `c02` 5-item event reasoning quiz.
- **Hint ladder:** (1) Which actual element received click? (2) Where will bubble path go? (3) What ID is stored on actionable element?

### L06 — Inline editing as a state machine (`p1-w03-l06`)

**Source:** C08 §§E1–E5, C11 focus. **Effort:** 20–40 minutes.

- **Teach:** State transitions `idle → editing → saved/cancelled`, temporary `editingId`/`editDraft`, Save validation, Cancel must not persist, errors retain editing state, Escape cancels, Enter submits, and focus returns to a sensible control. Use native form semantics rather than keypress-only Save logic.
- **Worked example:** Edit task ID 9 to a trimmed title; compare Save with Cancel. Trigger invalid whitespace; show error and original stored title preserved. Demonstrate focus behavior after successful Save.
- **Practice:** Build an editable row in a sandbox fixture with Edit/Save/Cancel. Enter valid title, use Escape, try invalid title, then delete a non-first sorted task.
- **Mistake/feedback:** Writing `task.title = input.value` on every keystroke means Cancel cannot undo. Trace distinction between draft and saved value.
- **Required:** `c01` browser DOM behavior tests for editing, Save validation, Cancel no-op, keyboard Enter/Escape, correct ID and accessible controls. **Feasibility note:** focus assertions require a genuine focus-capable DOM sandbox, not string matching; adjust implementation only after technical review. **Optional `c02`:** extra focus restoration/keyboard enhancement with no unlock impact.
- **Hint ladder:** (1) When is the stored value allowed to change? (2) Where is the unsaved draft? (3) After closing form, which element should get focus?

### L07 — Search, status filters, sorting and empty states (`p1-w03-l07`)

**Source:** C05 §B3, C09 §§F1–F5. **Effort:** 20–35 minutes.

- **Teach:** Compose view rules: case-insensitive trimmed query, status predicate, then copied numeric-ID sort. Source `tasks` stays unchanged. `resultsCount` counts current view; `remainingCount` counts all incomplete source tasks. Empty global state differs from “no search/filter matches.”
- **Worked example:** Task IDs 7 (`Read JavaScript`, active), 9 (`Practice CSS`, complete), 12 (`Debug JavaScript`, active); search `JAVAscript` ⇒ IDs 7 and 12; Active+search ⇒ same; Completed+`css` ⇒ ID 9. Oldest should show ID 7 before 12; stored order remains unchanged.
- **Practice:** Add mixed-case query input and Newest/Oldest select. Verify toggling filters preserves hidden tasks, then clear search and compare full count.
- **Mistake/feedback:** `tasks = tasks.filter(...)` silently deletes hidden records; checking only one view hides the bug. Repeat All→Active→Completed→All and verify source IDs.
- **Required:** `c01` browser behavior tests for combined search+filter+sort, copy-safe result, global count, empty and no-match distinctions; `c02` quiz on derived views and side effects.
- **Hint ladder:** (1) Which values are controls rather than task records? (2) Is the list you're sorting a copy? (3) What does the count refer to?

### L08 — Storage recovery, safe rendering and accessible focus (`p1-w03-l08`)

**Source:** C10 §§G1–G4, C11 §§H1–H5. **Effort:** 20–35 minutes.

- **Teach:** Week 2 storage key and `{id,title,completed}` compatibility; parse JSON defensively, reject wrong top-level type, skip malformed/duplicate records, recover by catching invalid JSON. Save task data after accepted edits, *not* after search/sort. Different origins/ports have different storage buckets. For UI use `.textContent` for learner text, native labels/buttons, visible keyboard focus.
- **Worked example:** Saved array with duplicate ID 7 and empty-title record; explain which records survive; show `JSON.parse('not-json')` raising an error for caller to handle. Show text such as `<em>Read</em>` appearing literally, not interpreted as markup.
- **Practice:** Create `parseStoredTasks` for `null`, valid, malformed, duplicate and wrong-shape values. Then manually Tab through a local editable list and verify focus after Save and Cancel.
- **Mistake/feedback:** “If it parsed, it is a valid task list.” Distinguish JSON syntax correctness from data shape and identity checks. Storage key in Study Tasks must never be reused for Fieldbook progress.
- **Required:** `c01` browser JS tests against supplied raw JSON fixtures using mocked data, not course storage; `c02` **self-verified local** keyboard/accessibility/storage-origin checklist with observed outcomes and one explained fix/limitation.
- **Hint ladder:** (1) Parse can succeed but return what type? (2) Is each ID valid and unique? (3) Which node receives focus after render?

### L09 — Repeatable debugging and meaningful tests (`p1-w03-l09`)

**Source:** C12 §§I1–I5, C13 §§J1–J5. **Effort:** 20–35 minutes.

- **Teach:** Minimal reproduction → observation (Console/Network/Sources) → hypothesis → smallest fix → regression test. Difference between a test name, assertion and meaningful expected behavior. A test must fail on a deliberately buggy implementation and pass after correcting it; false confidence from tests that always pass is dangerous.
- **Worked example:** Deliberately wrong sorter that mutates source, paired with a test checking original ID sequence. Fail then repair with a copy. Mention the original Week 3 instructor browser suite has **22 assertions**, but these are private *reference* checks, not authored Fieldbook test infrastructure.
- **Practice:** Given three deliberate bugs (index used instead of ID, edit draft lost on re-render, filter destructively assigned to `tasks`), identify each root cause and construct one regression assertion for a fresh example.
- **Mistake/feedback:** Only checking that a function exists or a button is present; require at least a negative case that fails before a fix.
- **Required:** `c01` safe browser challenge: write/repair a small pure function plus behavioral assertion for the broken case, prove test detects broken fixture and passes correct one. DOM/browser tests may be demonstrated, but local complete-project tests are at L11.
- **Hint ladder:** (1) What exact input fails? (2) What observable invariant did it violate? (3) Could a flawed implementation still pass your test?

### L10 — Reviewing AI suggestions and Git diffs (`p1-w03-l10`)

**Source:** C02 Git branch instructions, C14 §§K1–K4. **Effort:** 15–25 minutes.

- **Teach:** Git diff contains concrete code changes that deserve review regardless of who wrote them. A fluent AI response does not prove correctness. Review scope, wrong assumptions (array index vs ID, unsafe HTML insertion, destructive sorting), test updates, terminal commands, and ability to revert. AI chat/agent usage **must remain optional**.
- **Worked example:** Review a *prewritten hypothetical* change replacing `sortTasks([...tasks])` with `tasks.sort(...)`; identify regression, propose invariant test, decide reject/revise. Compare an unreviewed broad agent command to a small bounded task description.
- **Practice:** Make a small manually authored change locally, inspect `git diff`, record what changed, one risk, one actual regression check. No AI account needed.
- **Mistake/feedback:** Treat Git commit or agent approval as evidence tests passed. Discuss what *specific* behavior was observed.
- **Required:** `c01` quiz on review judgments, safe commands and regression thinking; `c02` **local self-verified** diff/review evidence (no private paths or secrets). **Optional `c03`:** compare an AI suggestion with independent plan and note why accepted/rejected.
- **Hint ladder:** (1) What is the smallest change? (2) Which invariant could break? (3) What test shows no regression?

### L11 — Week 3 Study Tasks v3 and readiness (`p1-w03-l11`)

**Source:** C15–C19 and C22; use C20–C21 only in **private instructor** preparation. **Effort:** 90–180 minutes, possibly spread across self-paced sessions.

- **Teach/require:** Working v3: same stored task model/key, add/toggle/delete/filter preserved; Edit/Save/Cancel; search; Newest/Oldest; modular pure logic and DOM app; delegated handlers; defensive storage; safe text; keyboard access; test page with meaningful cases; focused Git commits. Student must explain each significant change rather than copy the completed instructor appendix.
- **Worked walkthrough:** Demonstrate **process**, not instructor solution: choose acceptance criterion, implement smallest data helper, test it, wire UI, verify keyboard, check local storage reload, inspect diff, commit and document. Use original instructor C18 QA matrix as acceptance source but write learner-friendly guidance.
- **Practice/project:** Given 3 tasks with nonconsecutive IDs, apply search + status + sorting, edit an off-first record, Cancel another, refresh; verify no data loss and correct results. Start local server and run own tests (`tests.html` in source project), recording observed results. Sample reference has **22 browser tests**; user work may use a different valid test suite if criteria are demonstrably met.
- **Required `c01`:** **self-verified** full project checklist with observed browser interactions and test outcomes; no false claim Fieldbook executed local files. **Required `c02`:** 10-question readiness quiz, at least 8 correct and all essential items. **Required `c03`:** independent no-AI transfer task (choose *new* regression test for cancel-after-sort, or repair delegated nested-target handling) with local evidence and explanation.
- **Optional `c04`:** add 1–2 extra test cases or small UI polish, cannot block progress.
- **Common fails to teach:** old tasks vanished because origin changed; missing `.js` extension in import; stale `editingId` after deletion; edit draft saved on Cancel; unvalidated titles; `tasks.sort()` mutation; safe text switched to `.innerHTML`; test that reports 22 passes but tests do not inspect desired behavior.
- **Hint ladder:** (1) Start with a failing acceptance criterion. (2) Locate pure data logic vs DOM layer. (3) Write a regression test before delegating UI polish.

## 4. Week 3 progress, unlocking and evidence

- **Lesson progress:** L01→L11 in ID order; each lesson completes only after all mandatory checks. Optional steps and AI prompts never gate. Fieldbook stores only permitted bounded quiz/test-result records and learner attestations; it must not read private project files.
- **Quiz policy:** 80% required score rounded upward, **and every explicitly essential question correct**; unlimited retries, alternate equivalent items and targeted hints. Quiz item slots are a **plan**, not finished reviewed question banks.
- **Browser-code policy:** all required behavior-based tests pass in the **security-reviewed D4 sandbox**, never by matching a preferred source-string pattern. Mock/isolated storage, isolated DOM, controlled inputs; no trusted progress access. If focus/event simulation proves unreliable, record a technical limitation and request a reviewed gate adjustment instead of auto-passing.
- **Local project policy:** learner runs local server and own tests, checks specific acceptance steps, and records short, non-sensitive observations. UI label is **Self-verified locally**; weekly completion label should say **includes self-verified work**.
- **Weekly completion:** L01–L11 mandatory checkpoints **plus** L11 full project, readiness and transfer task. Week 4 stays locked until those are satisfied.
- **Reset:** normal review/retry preserves prior completions; formal reset previews downstream invalidation and asks confirmation; no silent project-data deletion.

## 5. Technical and educational risks to resolve before D5 implementation

1. **Modules on local origin:** distinguish `file://` failure from broken module code; Week 3 starter still runs as classic JS, reference requires HTTP origin.
2. **Different storage buckets:** port/origin change can show an empty list even though `study-tasks-week2` was saved elsewhere; the course platform's own progress must remain unrelated.
3. **DOM exercise sandbox feasibility:** delegated-event tests should work with nested actionable content, focus, keyboard and events without exposing trusted Fieldbook context. This must be tested during D4 runner design and before releasing D5 Week 3 checks.
4. **`sort` assumptions:** chronological labels are based on task ID, not timestamps; do not promise true chronological ordering for arbitrary imported IDs.
5. **Avoid test-count theater:** 22 assertions in instructor reference are not a required magic threshold for student work; test *behavior and negative cases*.
6. **Source disposition/security:** original C19 answer key and C21 full reference code, plus instructor ZIP `reference-solution/`, remain private. Student starter may be made available after review.
7. **Project readiness:** Week 3 uses no external API, no paid tooling, no npm. Keep Week 4 async/API work deferred.

## 6. Week 3 structural approval recorded; educational implementation still pending

- [x] Read original Week 3 source Markdown and inspected starter and completed reference code filenames/behavior.
- [x] Preserved the 11 stable `p1-w03-lNN` IDs proposed earlier.
- [x] Mapped all original **C01–C22** to proposed learner-facing content, setup/reference, or private instructor use.
- [x] Assigned provisional DEC-21 methods and 24 unique checkpoint IDs (21 required, 3 optional).
- [x] Owner approves the **Week 3 structural plan (A-004)**: 11 lessons, 8 quiz groups, 8 browser checks, 5 local self-verification gates and 3 optional activities.
- [ ] Author and technically review actual student lesson text, quiz questions, hints, runnable check implementations, local instructions and source references under future authorized D5.
- [ ] Run safe browser tests and independent learner pilot in D5; **not performed by producing this blueprint**.
- [ ] Obtain separate D0/D1 signoff before any application scaffolding, and separate owner authorization for D2 and later stages.

**This document is a planning specification. It is not a functioning course, audited security sandbox, graded coding challenge or proof of learner mastery.**
