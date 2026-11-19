# Phase 1 / Week 2 — Lesson and Assessment Blueprint

**Product:** FullStack Fieldbook · **Curriculum:** Phase 1, Week 02 · **Status:** D0 **owner-approved educational structure (A-003)**, NOT authored/validated student content.  
**Project:** Study Tasks v2 (vanilla HTML/CSS/JavaScript).  
**Source:** private `../fullstack-fieldbook-source-materials/phase1/week-02/` — 20 original instructor chapters, one four-file starter project and one four-file completed instructor reference.  
**Authority:** DEC-02, DEC-12, DEC-13, DEC-14, DEC-17, DEC-21; `docs/learning/MASTERY_RULES.md`.  
**Week 1:** The **12-lesson/20-checkpoint Week 1 blueprint structure is owner approved**. Its real quiz bank, sandbox tests, lesson text and learner pilot are not yet delivered.

## 1. Purpose, outcomes and boundaries

**The fundamental shift:** Week 1 created and removed HTML nodes directly. Week 2 establishes a **task array of data objects as the source of truth**, then updates state, persists it, and re-renders a representation in the DOM. The learner must explain this flow using a real example: `event → task state change → save (if task data changed) → render`. A filter changes the *view*, not the stored records.

**By the end of this week, a learner can:**

1. Model tasks as `{id, title, completed}` with stable IDs; explain why IDs are not indexes.
2. Use functions/callbacks and `forEach`, `map`, `filter`, `find`, and a simple `reduce` for tasks, not as memorized syntax drills.
3. Explain and demonstrate the difference between task state, `activeFilter`, and the rendered DOM.
4. Implement add, completion toggle, undo and deletion **by ID**, without duplicate rendered nodes.
5. Persist tasks in `localStorage` using JSON; handle missing/malformed storage and recompute the next numeric ID after refresh.
6. Implement All/Active/Completed filters, the correct global remaining count, and distinct empty states without deleting hidden records.
7. Reproduce, diagnose, fix and verify an actual state/render/storage bug; use AI for hints/review only when useful.

**Prerequisite:** Week 1's mandatory lesson gates, task-list project, and readiness check. Study Tasks v1 has **no persistence**; this is expected. Week 2 adds persistence, not Week 1. The Week 2 **student starter** is the Week 1 DOM-based baseline, not the completed Week 2 reference. No npm, React, database or backend is needed.

**Learning load:** 11 short sequenced lessons, smaller browser exercises and one larger local project. The original two mentor sessions (90 minutes each) and 4–6 hours of independent practice are context, **not a time gate** in the self-paced app. Larger practical work may take additional time; progress is based on mastery.

**Deliberately deferred:** editing/searching/sorting tasks (Week 3); asynchronous fetch/APIs (Week 4); React (Weeks 5–6); backend/database/auth (Weeks 7–10); full automated app test infrastructure beyond focused browser checks (later weeks).

## 2. Lesson sequence and checkpoint matrix

| Lesson / stable ID | Proposed learner-facing lesson | Observable outcomes | Required checkpoints | Optional | Primary source |
|---|---|---|---|---|---|
| L01 `p1-w02-l01` | Task objects, arrays and stable IDs | O01–O03: define task object, identify IDs vs indexes, describe state | `c01` quiz; `c02` browser JS | — | C03, C07 |
| L02 `p1-w02-l02` | Functions, return values and callbacks | O04–O06: return values, validate text, distinguish a callback from invocation | `c01` browser JS | `c02` extra function drill | C04 |
| L03 `p1-w02-l03` | The five array tools | O07–O09: choose/execute methods, update without losing records, recognize find/reduce | `c01` browser JS; `c02` quiz | — | C05 |
| L04 `p1-w02-l04` | State is not the DOM | O10–O12: source-of-truth and event→save→render flow, effect of re-render | `c01` quiz | — | C06 |
| L05 `p1-w02-l05` | Render from task state | O13–O15: render array once, safe nodes, repeated render stable | `c01` browser DOM | — | C06, C07 |
| L06 `p1-w02-l06` | Add, toggle and delete by ID | O16–O18: mutate/replace state appropriately, select records by ID, re-render | `c01` browser DOM | — | C07 |
| L07 `p1-w02-l07` | DOM events and safe accessible text | O19–O21: event types, safe title text, label/button behavior | `c01` browser DOM; `c02` quiz | — | C08 |
| L08 `p1-w02-l08` | JSON and persistent browser storage | O22–O24: serialize/parse, malformed-data recovery, restore next ID | `c01` isolated JS/storage lab; `c02` quiz | — | C09 |
| L09 `p1-w02-l09` | Filter, count, empty states | O25–O27: non-destructive filter, remaining count from all tasks, two empty cases | `c01` browser DOM; `c02` quiz | — | C10 |
| L10 `p1-w02-l10` | Debug and review changes | O28–O30: reproduce/inspect/hypothesize/verify, analyze AI advice | `c01` local debugging attestation; `c02` quiz | `c03` AI prompt comparison | C11, C12 |
| L11 `p1-w02-l11` | Week 2 integrated project and readiness | O31–O34: complete Study Tasks v2, verify persistence, transfer skill without AI, document work | `c01` local project; `c02` readiness quiz; `c03` local transfer task | `c04` extra enhancement | C13–C17, C20 |

**Proposed Week 2 totals:** **22 checkpoints: 19 required** = 8 `quiz-auto`, 8 `browser-code-auto`, 3 `local-project-self-verified`; **3 optional** = `optional-enrichment`. Eight quiz sets have **45 initial item slots**, not published questions. Explicit contracts: `WEEK02_CHECKPOINT_INVENTORY.md`; item plan: `WEEK02_ASSESSMENT_ITEM_PLAN.md`; source audit: `WEEK02_SOURCE_TRACEABILITY.md`.

**Lesson prerequisite rule:** L01 requires Week 1 graduation; L02 requires L01; ...; L11 requires L10. A lesson is complete only after **all of its required checkpoints** pass; the separate Week 2 graduation event requires L01–L11, including L11's practical project, readiness quiz, and transfer task. Optional activities cannot block progression. This is now an **owner-approved Week 2 planning structure (A-003)** under DEC-21; no specific quiz item or code check has been implemented, validated or learner-tested.

## 3. Detailed lesson design

### L01 — Task objects, arrays and stable IDs (`p1-w02-l01`)

**Source:** C03 (§A1–A5), C07 (§E1); Week 1 data/no-persistence bridge C02. **Prerequisite:** approved Week 1 course gates (not just having opened its last page). **Suggested effort:** 15–25 minutes.

- **Teach:** A string alone cannot describe title + completion + identity. A task record groups `id` (positive numeric identity), `title` (human-readable text), and `completed` (Boolean). An array stores multiple records. Distinguish index (position) from stable `id`: after deleting array element 0, the next item moves but keeps its ID. Explain `let` vs `const` and why `const obj` does not make an object immutable.
- **Worked example to author:** Two task objects with IDs 3 and 7 in an array; predict values from `.length`, `[0]`, `.title`, and the result after removing the first item. Show `let tasks` reassignment versus `const` property mutation without promoting mutation as a universal rule.
- **Practice:** Construct `{id: 9, title: "Review arrays", completed: false}`, then a list of two tasks; print second title and justify why IDs don't change on sorting/deleting.
- **Typical misconception:** “The first array item has ID 0.” Feedback traces a deletion that moves index 1 to 0 while ID remains unchanged.
- **Gate `c01`:** 5-item quiz about data structures, stable IDs, `const` and indexes; at least 4/5. **Gate `c02`:** isolated JS task-model behavior checks (correct fields/types, ID independence under deletion, two records); all mandatory tests.
- **Hint ladder:** (1) What identifies a task *after* moving it? (2) Contrast `[0]` with `.id`. (3) Trace two objects, remove one, and compare positions.

### L02 — Functions, return values and callbacks (`p1-w02-l02`)

**Source:** C04 (§B1–B5). **Suggested effort:** 15–25 minutes.

- **Teach:** Inputs/parameters vs arguments; returned value vs UI side effect; reusable helpers such as `normalizeTitle(rawTitle)`, `isNonEmptyTitle(text)`, and `countRemaining(taskArray)`; arrow callbacks in `forEach` and `addEventListener`; passing a callback vs invoking it during setup.
- **Worked example:** `normalizeTitle("  Study JS  ")` returns `"Study JS"`; a whitespace-only title gives `false`; a `countRemaining` function returns a number without modifying input.
- **Practice:** Implement a title-normalizer and Boolean validator using examples that differ from the worked example. Predict why passing `handler()` is wrong where an event listener expects `handler`.
- **Common mistake:** Missing `return`, or `addEventListener("click", handler())`. Give the observed result and help find the invocation point.
- **Gate `c01`:** behavior-based JS tests for trimming, nonempty validation, callback operation, and stable return values; no exact text matching.
- **Optional `c02`:** bonus reuse of `countRemaining` with different task inputs; does not block.
- **Hint ladder:** (1) What should the caller receive? (2) Where is `return`? (3) Are you *passing* a function or *calling* it now?

### L03 — The five array tools (`p1-w02-l03`)

**Source:** C05 (§C1–C6). **Suggested effort:** 20–35 minutes.

- **Teach:** `forEach` visits items (returns `undefined`); `map` transforms into a same-length new array; `filter` selects and returns a new array; `find` returns a match or `undefined`; `reduce` reduces to a value (here, maximum existing ID). Explain `===`, `!==`, `!`, spreading task properties, and the difference between selection versus deletion.
- **Worked example:** 3 tasks (1 completed). Predict All/Active/Completed, map to titles, toggle ID 2 immutably, find ID 3, and compute nextId from maximum ID. Trace `reduce` one step at a time rather than teaching general algorithm patterns.
- **Practice:** Generate a title array, count active tasks, update one task by ID and confirm original array has not been overwritten by filtering.
- **Typical mistakes:** `forEach` used as if it returns an array; `tasks = tasks.filter(...)` in a *view* filter; `"2" === 2` assumption.
- **Gate `c01`:** JS tests for mapping, filtering, ID-based toggle, find/undefined, and max-ID calculation. **Gate `c02`:** 5-item applied quiz; ≥4/5 plus essential item if flagged in item plan.
- **Hint ladder:** (1) Is your goal to visit, transform or select? (2) Which methods return new arrays? (3) Compare array lengths and task IDs before/after.

### L04 — State is not the DOM (`p1-w02-l04`)

**Source:** C06 (§D1–D5). **Suggested effort:** 15–25 minutes.

- **Teach:** `tasks` is domain state; `activeFilter` is view state; DOM is representation. Events update state; save only when task data changes; rendering rebuilds list/count/filter attributes. Explain why removing an `li` without changing `tasks` is temporary and why changing `tasks` without rendering shows stale UI.
- **Worked example:** Draw `user action → handler → data update → save (if needed) → render` and trace: submit valid task, click Active, toggle complete, reload.
- **Practice:** Classify five bug reports by responsibility: state, selection, rendering, persistence, or event wiring; predict next render result after a DOM-only deletion.
- **Common mistake:** Treat visible markup as the true task database; filter overwrite confusion. Feedback shows two different state traces.
- **Gate `c01`:** 5-item scored reasoning quiz (≥4/5) plus essential preservation-of-state scenario. No browser execution is needed just to test an architectural mental model.
- **Hint ladder:** (1) Where does the source data live? (2) Does the event change it? (3) What will a fresh render read?

### L05 — Render from task state (`p1-w02-l05`)

**Source:** C06 (§D2–D4), C07 (§E4). **Suggested effort:** 20–35 minutes.

- **Teach:** `render()` clears prior rows with `replaceChildren()`, iterates current state, builds `li`/label/title nodes, and appends them. `textContent` inserts literal user text. Explain that rerender should not create duplicate rows, and re-attached task-specific listeners will still work.
- **Worked example:** Start with two records, call `render()` twice and verify exactly two rows. Add a third record and render again; now see three rows in task order.
- **Practice:** Complete an isolated DOM fixture so the list reflects the array after repeated renders. A direct append-per-event implementation is insufficient because rerender must represent state.
- **Common mistakes:** Failing to clear children; creating elements without appending; using `.innerHTML +=` for user titles; confusing task count with DOM count.
- **Gate `c01`:** isolated DOM tests for deterministic rerender count/order, safe text, checkbox checked state, no accumulation after twice rendering. Must not execute learner code with access to Fieldbook progress.
- **Hint ladder:** (1) What did the old DOM still contain? (2) Which records should render now? (3) Clear old rows before appending new data.

### L06 — Add, toggle and delete by ID (`p1-w02-l06`)

**Source:** C07 (§E1–E6). **Suggested effort:** 20–35 minutes.

- **Teach:** A new task gets a new ID, normalized title, `completed:false`; toggling changes only matching task; deleting removes only matching record. Show map/filters can replace `tasks` while `nextId` stays monotonically increasing; UI updates from the new data. For this lesson, persistence is **not yet required**; it arrives at L08.
- **Worked example:** With IDs 4 and 9, toggle 9 and delete 4. After both operations, ID 9 remains and is completed; adding creates a new unique ID.
- **Practice:** Connect handlers to the correct record ID, including when a record has moved in array order. Test add, undo completion, delete filtered record, Enter submit and whitespace rejection.
- **Common mistakes:** Delete by DOM index; event handler captures wrong ID; `handler()` runs immediately; missing render call; accidental submit by Delete button.
- **Gate `c01`:** browser DOM/data behavior suite for create, toggle twice, delete by ID, no duplicates, validation/Enter and same task after reorder. No storage requirement yet.
- **Hint ladder:** (1) Which task did the user click? (2) Use `.id`, not the row number. (3) After state changes, what renders?

### L07 — DOM events and safe accessible text (`p1-w02-l07`)

**Source:** C08 (§F1–F5) and C07 (§E4–E5). **Suggested effort:** 15–25 minutes.

- **Teach:** `querySelector` vs `querySelectorAll`; `submit`, `change`, `click`, `input`; checkbox `checked`; form submit/Enter; `type="button"` for Delete; label-input relationship; `.textContent` for untrusted titles; preserve keyboard focus and visible error announcement.
- **Worked example:** A title `"<b>Read</b>"` appears literally as text, not formatted markup. Clicking associated checkbox label toggles its state. Delete does not trigger the form.
- **Practice:** Repair a broken event registration and unsafe title rendering in a sandboxed fixture. Explain why switching from text to HTML parsing changes behavior.
- **Common mistakes:** Reading the wrong selector, `innerHTML` for user text, button default submit, missing label association or no focus restore.
- **Gate `c01`:** browser DOM tests for safe literal text, correct event types, Enter and checkbox, no unintended submit, accessible labels. **Gate `c02`:** five scenario questions, ≥4/5; safe text handling flagged essential.
- **Hint ladder:** (1) What *event* does the control generate? (2) Is the title text or markup? (3) Inspect the resulting DOM and form submit count.

### L08 — JSON and persistent browser storage (`p1-w02-l08`)

**Source:** C09 (§G1–G7). **Suggested effort:** 20–40 minutes.

- **Teach:** Browser storage values are strings; `JSON.stringify(tasks)` stores data, `JSON.parse(raw)` recovers values; parse output must be checked as an array. Validate expected fields, guard `getItem` and `setItem` with appropriate error handling, show warning when save fails. Restore `nextId = max(valid ID) + 1`; malformed saved input must not crash the app. Explain that saved tasks belong to a specific origin and that this is **not a database or cloud sync**.
- **Worked example:** Save two objects, parse them again, remove ID 1, restore nextId from ID 7. Demonstrate handling missing key, bad JSON, wrong top-level shape, and a simulated storage-quota exception.
- **Practice:** Implement pure serialization/load helpers using an injected **mock storage interface inside a sandbox**, not Fieldbook's own `localStorage`. Later verify refresh in the downloaded local Study Tasks project.
- **Common mistakes:** `setItem(key, tasks)` without stringify; `JSON.parse(null)` treated as an array; blindly calling `.filter()` on an object; resetting ID to 1; hiding storage failures.
- **Gate `c01`:** isolated JS/storage tests for round trip, absent key, malformed JSON, wrong shape, failure handling and nextId. The separate real-browser reload demo is checked in L11. **Gate `c02`:** five quiz scenarios ≥4/5; recovery from invalid stored input flagged essential.
- **Hint ladder:** (1) What type does storage accept? (2) What does parse return for malformed input? (3) Validate before rendering and catch storage errors.

### L09 — Filter, count and empty states (`p1-w02-l09`)

**Source:** C10 (§H1–H6). **Suggested effort:** 20–35 minutes.

- **Teach:** All returns all tasks; Active selects `!completed`; Completed selects `completed`. A temporary filtered list **must not replace source `tasks`**. `remainingCount` is derived from *all* unfinished tasks even while viewing Completed. Distinguish “No tasks yet” from “No tasks match this filter.” Set filter buttons' `aria-pressed` based on `activeFilter` and do not store filter choices as if they were task records.
- **Worked example:** Tasks A complete, B active, C active. Predict the All/Active/Completed views and the remaining count before/after completing B while Active is selected.
- **Practice:** Add filter buttons and count to sandboxed task app; change filter multiple times, delete while filtered and verify underlying array remains intact except for actual deletion.
- **Common mistakes:** Filter overwrites tasks; count is `list.children.length`; empty-state message always says no tasks; selected button visually changes without updated state.
- **Gate `c01`:** browser DOM tests for filters, non-destructive source, count across filters, two empty messages, `aria-pressed` and correct deletion. **Gate `c02`:** five scenario questions ≥4/5; essential non-destructive filter question.
- **Hint ladder:** (1) Where are *all* the tasks? (2) What is just a selected view? (3) Count from data before filtering.

### L10 — Debug and review changes (`p1-w02-l10`)

**Source:** C11 (§I1–I5), C12 (§J1–J6), C15/17 selected exercises. **Suggested effort:** 20–35 minutes plus local debugging practice.

- **Teach:** Reproduce → Observe (Console/Elements/state) → Hypothesis and one change → Verify. Diagnose: duplicate rows after repeated `render()`, delete-only-DOM resurrecting tasks, filter overwriting source, wrong stored type. Explain AI tutor versus AI agent versus independent work. Review diffs and require a manual test rather than accepting fluent-looking AI suggestions.
- **Worked example:** `list.replaceChildren()` accidentally removed: list accumulates. Show how logging array length alongside DOM child count narrows cause to renderer. Contrast a `tasks.filter is not a function` error pointing to malformed loaded data.
- **Practice:** In a copy of local starter, reproduce and repair one purposely introduced error; record before, suspected layer, fix and retest. AI hint optional, not required to pass.
- **Common mistakes:** Changing three things at once, using a filter for permanent delete when filtering, deleting code to silence stack traces, accepting agent commands blindly.
- **Gate `c01`:** locally self-verified debug lab with bounded evidence of one reproduced failure and retest. **Gate `c02`:** 5 scored debugging/AI-judgment questions, ≥4/5. **Optional `c03`:** draft/review a narrow AI agent prompt; no external account required.
- **Hint ladder:** (1) State reproducible steps and expected/actual. (2) Inspect `tasks` and rendered rows separately. (3) Fix one hypothesis, rerun original and neighboring cases.

### L11 — Study Tasks v2 integration and readiness (`p1-w02-l11`)

**Source:** C13–C17, C20, reference behavior in private C18–C19 and code ZIP. **Suggested effort:** 60–120+ minutes; learning time varies.

- **Teach/build:** Work from the student's completed Week 1 app or Week 2 **student starter**. Refactor to task objects/IDs, source-state plus `render`, CRUD, All/Active/Completed, remaining count, distinct empty states, storage persistence, invalid-data recovery and storage failure message. Keep literal text safe, form semantics, keyboard interaction and responsive layout. Use Git checkpoint before refactor, then a reviewed commit after.
- **Practice acceptance:** Add 2 tasks, reload; toggle one complete and reload; switch All/Active/Completed; delete and reload; preserve ID after reload; try spaces-only input, literal HTML-looking title, empty view, corrupt storage test data in an expendable local project; verify errors don't crash UI.
- **No-AI transfer:** Given 3 tasks with different statuses, independently add a **completed count** (derived from source `tasks`, not visible rows), or fix a filter bug with a clear explanation. Documentation is allowed; external AI not used for this diagnostic. Explain one bug hypothesis and one regression test.
- **Gate `c01`:** specific local-project checklist and bounded self-attestation of local test results; not browser-verified. **Gate `c02`:** 10-item readiness quiz (≥8/10 + designated essential questions). **Gate `c03`:** locally self-verified transfer task with concrete acceptance evidence. **Optional `c04`:** choose one enhancement, e.g. clear completed or accessibility refinement; never blocks Week 3.
- **Common mistakes:** Claiming persistence because page didn't reload; tasks vanishing after filter; next ID reused; parse crash; AI-written implementation cannot be explained.
- **Hint ladder:** (1) Trace event→state→save→render. (2) Split failure by UI vs data vs storage. (3) Read Console/Storage and use the Week 2 local acceptance list. Do not reveal the full instructor implementation as first hint.

**Week 2 graduation:** all lessons L01–L11 complete; required L11 c01, c02, c03 pass/attested as defined; record that graduation **includes self-verified local work**. Week 3 becomes available; no claim of independently authenticated certification.

## 4. Exact Week 2 progress and assessment behavior

1. **Quiz-auto:** eight separate scored sets; ≥80% of scored items rounded up and every explicitly essential item correct. Suggested 5 per L01/L03/L04/L07/L08/L09/L10 and 10 for L11; details/IDs in item plan. At least one equivalent re-application item after showing a full explanation for a failed essential concept; no punitive retries.
2. **Browser-code-auto:** eight mandatory checks; verify actual behavior using deterministic fixtures in a **security-reviewed isolated runner**. No string-matching to expected source code and no unreviewed use of the trusted app's DOM/storage. For L08, use an injected fake storage adapter; never read/write the Fieldbook course-progress key.
3. **Local-project-self-verified:** L10 debug exercise + L11 project + L11 no-AI transfer. The platform **does not run** the downloaded student's app or independently verify a refresh. Require specific test actions/expected results and explicit attestation with bounded text/checkbox evidence. Label “Self-verified locally.”
4. **Optional-enrichment:** L02, L10, L11. Does not change required denominator or lock progress. AI use is always optional.
5. **Storage separation:** Study Tasks v2 uses the source project's `study-tasks-week2` key *in its own origin*; the learning platform's progress uses a different private namespace. Any iframe/test runner receives mock storage without privileged access. Even if both apps are opened under localhost, don't share a trusted origin accidentally.
6. **Reset/retry:** reattempt of completed lesson does not revoke mastery. A formal lesson reset shows downstream consequences, including later Week 2/3 progress. Week reset clears Week 2 and all following weeks, not Week 1. Whole-course reset is separately confirmed with export option.
7. **Locking:** independent route/deep link to L08 cannot bypass L07. To unlock Week 3, all 19 mandatory Week 2 checkpoint results, including local attestations, must satisfy their criteria. Never trust imported `unlocked=true` flags.
8. **Caution for publishing:** scoring on a client-only site is educational, not cheating-proof. A high quiz score does not substitute for a working local project or an independent explanation.

## 5. Technical/security review flags for later D4/D5

- **Sandbox design:** safe execution, timeouts for runaway JS, error reporting, parent/child message validation, no parent origin storage access, and deterministic DOM fixtures must be verified before enabling learner-written JS.
- **Storage tests:** API shape for mocked `getItem`/`setItem`; private namespacing, disabled-storage simulation, exception and corrupt value cases; no real user data cleared in test labs.
- **Source limits:** the Week 2 instructor reference filters invalid records from storage but does **not** deduplicate IDs or fully validate arbitrary object shapes. Do not present it as production-grade schema validation or require extra hardening before teaching the stated concepts.
- **Browser origin:** opening `index.html` directly may produce inconsistent storage behavior on `file://`; if persistence test fails, guide students to a simple localhost server. Avoid promises about automatic backups/cloud sync.
- **No completed solution leak:** the instructor reference archive and full answer keys are private; project starter downloads may include guided TODOs but not the finished teacher solution.
- **Scope:** retain plain HTML/CSS/JS and no npm/dependency installation. ES modules, editing/search/sorting and formal JS automated test suite belong in Week 3.

## 6. Week 2 structural approval recorded; content and implementation NOT signed off

- [x] Owner accepts the **11-lesson** sequence as the D0 authoring baseline (A-003).
- [x] Owner accepts the **22 checkpoint slots** and 19 required / 3 optional structure (A-003).
- [ ] All essential quiz questions have been reviewed for genuine importance.
- [ ] All source C01–C20 dispositions are approved, and copied code/examples are accurate and licensed for student use.
- [ ] Browser-code exercises have validated fixtures, edge cases, sensible error feedback, and safe execution; no student content can access the platform's progress storage.
- [ ] Storage lessons explicitly handle bad data, the next ID and origin limitations without confusing project storage with Fieldbook progress.
- [ ] Student project never requires the private completed Week 2 reference, paid AI, React, or a backend.
- [ ] Pilot protocol tests understanding and transfer, not just lesson navigation.
- [ ] Week 1 source-to-lesson approved structure is preserved; prior approvals are not misrepresented as executed tests.
- [ ] Full D0 and D1 approval remain separately outstanding. **No application coding is authorized.**

**Next step after A-003 structural approval:** review Week 3 source mapping; Week 2 content production remains a later authorized D5 task. Student-facing prose, final question banks, executable code-runner checks and a learner pilot remain separate later authoring/implementation tasks.
