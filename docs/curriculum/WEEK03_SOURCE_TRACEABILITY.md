# Week 3 Source Traceability and Chapter Disposition — D0 Proposal

**Status:** source-inspected chapter disposition **owner-approved as D0 structure (A-004)**; actual lesson/technical review remains pending. **Never** publish the completed instructor reference/answers inside the public learner app. The original Week 3 guide has **22 C## chapters**; its code archive has **11 file entries**: 4 student-starter, 7 completed-reference files. Student lessons reuse 11 stable IDs from the existing proposed lesson map.

## 1. Private artifacts actually inspected

- `../fullstack-fieldbook-source-materials/phase1/week-03/instructor-guide-source.md`: 65,276 bytes; SHA-256 `bfc12de0737e1bc8dcf59797e376f65a0be4756825039f2a3b7571f1f98754de`.
- `../fullstack-fieldbook-source-materials/phase1/week-03/code-starter-and-reference.zip`: 14,720 bytes; SHA-256 `d126613945714ab65b9de73745f9d1d45099701e7021245d38d26fb8033573e4`.
- Original PDF is available in the same private week folder and should be inspected visually later if formatting/figures require it. **This source mapping was based on Markdown and ZIP contents, not on page-by-page PDF visual QA.**

The starter consists of `starter/{README.md,index.html,styles.css,app.js}`. The reference consists of `reference-solution/{README.md,index.html,styles.css,task-logic.js,app.js,tests.html,tests.js}`. The completed `reference-solution/` subtree is instructor-only.

## 2. Complete source chapter disposition (C01–C22)

| Original source chapter | Proposed disposition | Student destination / reason |
|---|---|---|
| **C01** Instructor brief: mission | **Adapt overview**, exclude mentoring-only instructions | L01 motivation, L11 explicit outcomes and exclusions |
| **C02** Prep/setup/diagnostic, Git, local server | **Adapt setup and prerequisite checks**, exclude instructor timing instructions | L04 server/modules; L10 Git; L11 baseline checks |
| **C03** Data flow, source, derived view and invariants | **Directly teach**, add interactive example | L01; reinforced L07 |
| **C04** Pure functions, validation, immutable rename | **Teach with new fixtures**, no completed source pasted as answer | L01 and L02 |
| **C05** Stable IDs, sort/copy and derived view | **Teach and browser check** | L02 ID recap, L03 sorting, L07 composition |
| **C06** ES modules and file boundaries | **Teach and local self-verify** | L04; two-file minimal example |
| **C07** Event bubbling/delegation | **Teach and browser DOM lab** | L05; L11 integration |
| **C08** Inline editing as state machine | **Teach and browser DOM lab** | L06; L11 integration |
| **C09** Live search/sort/empty states | **Teach and browser DOM/JS lab** | L07; L11 integration |
| **C10** Storage compatibility/defensive parse | **Teach and isolated JSON test** | L08; local refresh part of L11 |
| **C11** Semantic HTML, focus and safe text | **Teach/accessibility review**, not string-match-only grading | L06, L08 and L11 |
| **C12** Systematic debugging | **Teach reproducible procedure** | L09, L11 independent transfer |
| **C13** Test runner/assertions and evidence | **Teach meaningful tests**, keep full reference tests private | L09, L11 local QA |
| **C14** AI tutor/agent/reviewer and diff | **Teach review procedure**, AI usage optional | L10; review part of L11 |
| **C15** Mentor Session 1 | **Reframe as self-paced activity order** | L01–L06 recommended practice order; mentor scripts private |
| **C16** Mentor Session 2 | **Reframe as self-paced activity order** | L07–L11 recommended practice order; scripts private |
| **C17** Independent practice plan | **Adapt optional scheduling, required tasks** | L09/L10/L11 project instructions |
| **C18** Full acceptance criteria and manual QA | **Adapt into student acceptance checklist** | L11 `c01`; do not expose answer key |
| **C19** Knowledge checks, answers, scoring rubric | **Adapt learning objectives and quiz intents**, keep instructor answers private | Quiz plans L01/L02/L03/L04/L05/L07/L10/L11; detailed private answer key excluded |
| **C20** Reference architecture and guided walkthrough | **PRIVATE authoring reference**; do not publish completed solution | Use for L04 module boundaries and L11 verification authoring |
| **C21** Complete instructor code appendix | **PRIVATE**; only use to verify intended behaviors | No learner-facing copy of reference code or full tests |
| **C22** Handoff, Week 4 preview, resources | **Adapt recap and optional references** | L11 end and Week 4 bridge |

**Coverage:** All 22 chapter headings assigned a disposition. This does **not** certify every original explanation, diagram or question has become learner-ready content; the actual D5 authoring and educational review are still pending.

## 3. Verified source-level project characteristics to preserve

1. The *starter* is the Week 2 model-driven, stored task manager. Do not describe it as already supporting editing/search/sort/modules/tests.
2. The *reference* uses six implementation/test files plus README; `index.html` loads `app.js` as a **module**. A local HTTP origin is required for reliable browser imports.
3. Task data shape stays `{id,title,completed}`. A task ID is a positive safe integer and must be unique. Title limit is **100 characters**; validation trims whitespace. Do not conflate IDs with indexes.
4. Storage key is still **`study-tasks-week2`**. Data persisted only if the browser **origin** stays the same. Changing `file://` → localhost or port changes what storage is visible; no automatic cross-origin migration.
5. `task-logic.js` exports `normalizeTitle`, `validateTitle`, `isValidTask`, `parseStoredTasks`, `addTaskToList`, `renameTaskInList`, `toggleTaskInList`, `deleteTaskFromList`, `countRemaining` and `getVisibleTasks` plus title limit. These are reference examples, not code to publish unmodified as student answers.
6. The reference `getVisibleTasks` first filters by status and case-insensitive query then uses `.slice().sort()` by **numeric ID**. This preserves source order and uses “newest/oldest” as an ID-based proxy, not actual timestamps.
7. Edit state tracks `editingId` and `editDraft`. Save validates then updates task data. Cancel and Escape must discard draft; Enter works through form submit. Focus is restored after exit where appropriate.
8. Event delegation is on the stable task list with `click`, `change`, `input`, `submit`, and `keydown` handlers. The code uses `closest()` and action/ID attributes; titles render via `.textContent`.
9. `parseStoredTasks` uses `JSON.parse` and explicitly throws on invalid syntax or wrong top-level JSON shape; its **caller** handles errors and recovers to `[]`. It filters invalid records and deduplicates IDs.
10. `tests.html`/`tests.js` provides **22 browser assertions** of pure task logic; the student must run meaningful tests and understand failures. The number 22 is descriptive of reference, not a mandatory completion number.
11. No `fetch`, React, backend, PostgreSQL, cloud progress or AI account is needed; those concepts belong to later weeks.
12. Sandbox code/fixtures must be isolated from FullStack Fieldbook's own `localStorage` progress key. The student app's storage requirements are separate from the platform's storage implementation.

## 4. Known limitations and handoff risks

- **Origin mismatch:** source says existing v2 tasks carry forward only on the **same origin**. Published materials must tell students how to tell a storage-origin issue from true data loss.
- **DOM runner feasibility:** nested button targets, keyboard focus and re-render behavior require actual sandbox DOM semantics. Write behavior-based tests, not HTML-substring assertions.
- **Module setup:** a static localhost file server is **not** an Express API; clarify before Week 4/7. `python -m http.server` only works with installed Python.
- **Safe output:** avoid XSS demonstrations that execute code; use markup-like harmless text to teach `.textContent`.
- **Draft persistence:** `editDraft` is temporary; only accepted Save persists. Don't save on search/sort.
- **Content boundary:** C19 key, C20 walkthrough, C21 appendix, reference ZIP must remain outside any public build and student default download.
- **No automatic evidence:** inspecting source files is not the same as running the future Fieldbook browser sandbox or learner pilot.

## 5. Traceability audit requirements for future agents

When writing actual Week 3 lessons, cross-check every source chapter disposition, test the specific sample used in the app, keep Week 1/2 ID mapping stable, and separate instructor answers from learner-facing feedback. Record each checkpoint with original C## source, outcome ID, real implementation tests, and technical/education review status. Revisit any proposed essential quiz item if its actual wording cannot be fairly graded. **A-004 approves Week 3 structural chapter/lesson mapping only**, not actual content, runner tests or D5 learner pilot; DEC-19 global lesson count remains OPEN.
