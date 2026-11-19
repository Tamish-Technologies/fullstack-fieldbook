# Phase 1 / Week 5 — Lesson and Assessment Blueprint

**Product:** FullStack Fieldbook · **Curriculum:** Phase 1, Week 05 · **Status:** SOURCE-INSPECTED **D0 STRUCTURAL AUTHORING BASELINE — OWNER APPROVED A-006**. No student course content or live test runner is implemented or verified.  
**Student project:** Study Tasks v5, a **React (JavaScript) rebuild of the local task manager**.  
**Private source:** `../fullstack-fieldbook-source-materials/phase1/week-05/` (23 source chapters; 30 starter/reference archive entries).  
**Governing decisions:** DEC-01–17, DEC-21, DEC-23, DEC-24, with A-001/A-003/A-004/A-005/A-006 accepted for Weeks 1–5.  
**Delivery stage:** Week 5 learner content, local React labs, and its pilot belong to **D6** (student Weeks 5–6), after D4 secure runner/Week 1 pilot and D5 JavaScript content integration. This D0 document is not D6 execution authorization.

## 1. Week 5 educational promise

The learner has written modular vanilla JS and used a public sample API in Week 4. Week 5 changes **the UI architecture**, not the problem domain: instead of manually rebuilding DOM nodes, the learner describes the UI with components and state. Preserve tested task logic, create a **separate** React/Vite project, and understand every state transition. Node/npm run local development tooling now; Express/backend APIs are introduced later.

By Week 5 graduation, a student must be able to:

1. Explain manual DOM rendering versus React's declarative update cycle with a real event trace.
2. Run a local Vite React (JavaScript) starter, explain its entry files, and diagnose a build/import error.
3. Read/write JSX correctly and render untrusted task strings as escaped text.
4. Place and compose components, pass read-only data and callbacks, and choose the owner of shared task state.
5. Explain snapshot semantics and use functional `useState` updates appropriately.
6. Build a controlled form with trim, validation, Enter submission and accessible error messages.
7. Use stable task IDs, immutable arrays/objects and existing pure helpers for add/toggle/delete.
8. Derive filter/search/sort and statistics without duplicating or corrupting source state.
9. Read local tasks using a safe lazy initializer, persist updates with an effect, and explain origin-specific `localStorage`.
10. Run real local smoke/tests/build checks, diagnose an unseen failure and review Git/AI changes critically.

**Required:** core task manager (add, toggle, delete, filter, search, sort/count, persistence). **Stretch:** inline editing, UI polish, manual Week 4→5 storage migration. **Deliberately postponed:** Week 4 API Study Idea Inbox becomes a React feature in **Week 6**; React Router, advanced async effects and custom Express remain later. **TypeScript** is not a Week 5 teaching requirement (the React starter is JSX/JavaScript), even though Fieldbook itself is planned in TypeScript.

**Continuity constraints:** task objects keep `{ id: number, title: string, completed: boolean }`; a trimmed valid title is at most **100** chars; IDs are positive safe unique integers among current tasks. Keep task storage key `study-tasks-week2` in the student's separate app. Week 4 localhost (often :5500) and Week 5 Vite localhost (often :5173) are **different browser origins**, so the same key does not automatically migrate old tasks. Do not delete Week 4 project/data; do not change Fieldbook progress storage from a learner exercise.

**Runtime honesty:** the Fieldbook HTML/CSS/JS playground can grade portable **pure JavaScript task helpers** using isolated browser tests. It must **not** claim that a generic JS snippet runner has compiled React JSX, mounted components, run Vite, inspected the learner's local browser, or executed `npm test`. All React UI/build evidence is `local-project-self-verified` until a real separately approved React execution/testing environment exists. No React browser-runtime evaluator is promised for v1.

## 2. Lesson sequencing and prerequisite rules

- Keep all **11 existing IDs** `p1-w05-l01` through `p1-w05-l11` in the original proposed map. All eleven lessons are **required**; optional features are checkpoints/branches within lessons rather than hidden required lessons.
- Week 5 L01 unlocks only after **Week 4 graduation** (including offline/API core and readiness) is recorded. Required linear chain: L01 → L02 → L03 → L04 → L05 → L06 → L07 → L08 → L09 → L10 → L11.
- Each required lesson unlocks its successor only after **all its required checkpoints** have passed; optional tasks have zero effect on completion percentages or dependencies.
- Graduation requires L01–L10 required checks and L11: **integrated React local-project attestation**, **ten-item readiness quiz**, and **independent no-AI debugging transfer**. Final UI must say **“includes self-verified work.”**
- DEC-21 quizzes require `ceil(0.8 * scored questions)` and every marked essential item; browser-code checks require all mandatory functional cases; real React work needs explicit learner-run local acceptance tests. Unlimited retries; previews of cascading reset effects.

**Checkpoint allocation (proposed):** 25 total = **22 required** (10 quiz groups/57 planned question slots, 3 isolated pure-JS browser-code checks, 9 local-project self-verifications) + **3 optional** (form/UI polish, deliberate storage migration, editing). This allocation is a source-audited proposal, not a finished bank or passing test report.

## 3. Lesson-by-lesson authoring contract

Every section below is a **future lesson specification**, not complete copy for a student. During authorized D6 work, author a first-principles explanation, annotated examples, practice, multiple hint levels, specific wrong-answer feedback, official documentation when appropriate, keyboard and mobile reading support, and equivalent retry questions. Keep the private instructor appendix and completed `reference-solution/` out of public assets.
### L01 — Imperative DOM versus React mental model (`p1-w05-l01`)

**Source:** C01,C02,C03. **Prerequisite:** Week 4 graduation. **Suggested learning effort:** 15–30 minutes (not a time gate).

- **Outcomes:** Differentiate manually rebuilding DOM nodes from describing UI as a function of state; trace an event from handler to new state to React render; place React, Vite, npm and future Express into distinct roles.
- **Core explanation / mental model:** In Week 4 a handler calls `render()` and creates nodes; in React, component functions return a UI description for the current state. The JavaScript browser foundations remain the same.
- **Worked example to author:** Compare `list.replaceChildren(...tasks.map(makeItem))` with `{tasks.map(task => <TaskItem key={task.id} task={task} />)}`. Draw `App → TaskList → TaskItem` and label where `tasks` lives.
- **Practice or local lab:** Given a checkbox click, put six statements in order: user event, child callback, parent handler, immutable data operation, state setter, re-render. Explain why React is not an API/backend.
- **Common misconception and correction:** Misconception: React automatically fixes state or eliminates need for JS/DOM understanding. Correct with concrete data-flow diagram.
- **Three-level hint ladder seed:** Identify who knows the tasks → trace which callback changes them → describe what React renders from the changed value.
- **Mastery checkpoint(s):** `p1-w05-l01-c01` **quiz-auto** (required): Concept and UI-flow quiz: React vs manual DOM, component tree, state/event path (5 items).
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L02 — Node, npm, Vite and React project setup (`p1-w05-l02`)

**Source:** C02,C04,C15,C21. **Prerequisite:** p1-w05-l01. **Suggested learning effort:** 25–45 minutes plus local setup (not a time gate).

- **Outcomes:** Explain build tool vs runtime vs framework; run the supplied starter locally; locate `index.html`, `src/main.jsx`, and `App.jsx`; interpret dev server and package scripts; describe `node_modules` and lockfile.
- **Core explanation / mental model:** Node/npm are developer tools here; starting Vite is not creating a production backend. `main.jsx` mounts the React root, `App` supplies the UI.
- **Worked example to author:** Follow a diagram from `index.html` root to `createRoot(...).render(<App />)` and show the actual URL displayed by `npm run dev`.
- **Practice or local lab:** Run `node --version`, `npm --version`, `npm install`, `npm run dev`; change a heading, then restore a deliberate broken import and explain observed terminal error. Use the supplied ZIP or create a fresh Vite React **JavaScript** template—not both nested.
- **Common misconception and correction:** Misconception: `npm install` requires paid tooling or Node here implies Express. Clarify package resolution and free local workflow.
- **Three-level hint ladder seed:** Check terminal → locate actual root folder → identify the missing module or version requirement.
- **Mastery checkpoint(s):** `p1-w05-l02-c01` **local-project-self-verified** (required): Actual Node/npm/Vite setup; heading hot reload; correct folder; import-error recovery; `p1-w05-l02-c02` **quiz-auto** (required): Build tool, runtime, root entry, node_modules/lockfile roles (4 items).
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L03 — JSX syntax, expressions and safe output (`p1-w05-l03`)

**Source:** C05,C18. **Prerequisite:** p1-w05-l02. **Suggested learning effort:** 15–30 minutes (not a time gate).

- **Outcomes:** Write valid JSX with one parent or fragment, closed tags, `className`, `htmlFor`, expressions and conditions; explain component capitalization and React text escaping.
- **Core explanation / mental model:** JSX resembles HTML but is JavaScript syntax transformed by tooling, not an HTML string. Curly braces accept JavaScript expressions.
- **Worked example to author:** Given `Welcome({ student })`, predict `{student.toUpperCase()}` and the correct place for `className`; contrast `count > 0 && ...` with a `count && ...` case that can render 0.
- **Practice or local lab:** Write `StudySummary({ subject, completed })` from a short written contract; classify three deliberately invalid JSX examples and show the proper local fix.
- **Common misconception and correction:** Misconception: user-provided `{task.title}` is equivalent to inserting raw HTML. Explain React text escaping; do not use `dangerouslySetInnerHTML` for task titles.
- **Three-level hint ladder seed:** Check wrapper/fragment → check attribute names → check expression vs statement → safely render strings.
- **Mastery checkpoint(s):** `p1-w05-l03-c01` **quiz-auto** (required): JSX wrapper/fragment, className/htmlFor, expressions, safe text (6 items).
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L04 — Reusable function components and composition (`p1-w05-l04`)

**Source:** C03,C06,C15. **Prerequisite:** p1-w05-l03. **Suggested learning effort:** 15–30 minutes (not a time gate).

- **Outcomes:** Split UI into small components; identify a component tree; recognize capitalized component tags; decide when separate components improve reuse.
- **Core explanation / mental model:** Components are functions describing UI from inputs. `TaskList` maps a collection to `TaskItem` and the parent controls what inputs flow down.
- **Worked example to author:** Sketch and label `App → TaskForm`, `App → TaskToolbar`, `App → TaskList → TaskItem`, then compare a monolithic JSX tree with a composed one.
- **Practice or local lab:** Implement `TaskList` and `TaskItem` in the local starter; use stable ID in the list key. Show an empty-list message and verify the component files compile.
- **Common misconception and correction:** Misconception: every `<div>` should be a component or making components automatically shares state. Reuse boundaries deliberately.
- **Three-level hint ladder seed:** Start with one repeated UI row → extract it → pass its inputs → verify both list and empty cases.
- **Mastery checkpoint(s):** `p1-w05-l04-c01` **quiz-auto** (required): Identify component boundaries/tree and empty-list behavior (5 items); `p1-w05-l04-c02` **local-project-self-verified** (required): Run local React TaskList/TaskItem with props and stable key; empty view.
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L05 — Props, read-only data and callback flow (`p1-w05-l05`)

**Source:** C06,C10. **Prerequisite:** p1-w05-l04. **Suggested learning effort:** 15–30 minutes (not a time gate).

- **Outcomes:** Pass strings/objects/functions as props; distinguish prop values from shared state; explain why children must not mutate objects received from parents; invoke parent callbacks with IDs.
- **Core explanation / mental model:** Props flow downward; a child notifies a parent by calling a callback. The owner of the tasks array controls changes.
- **Worked example to author:** Read `TaskItem({ task, onDelete })` and trace `onClick={() => onDelete(task.id)}` through `App` to the new task array.
- **Practice or local lab:** Attach a delete callback from the parent to a child; confirm the correct ID arrives after filtering. Diagnose a deliberately mutated `task.completed = true`.
- **Common misconception and correction:** Misconception: `key` is an ordinary prop available as `props.key`. It is React list identity metadata; provide `id` as a prop if needed.
- **Three-level hint ladder seed:** Who owns the data? → what is passed downward? → what callback communicates the user intent?
- **Mastery checkpoint(s):** `p1-w05-l05-c01` **quiz-auto** (required): Read-only props, function props and callback invocation (5 items); `p1-w05-l05-c02` **local-project-self-verified** (required): Child reports correct task ID to parent; no incoming-prop mutation.
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L06 — useState, snapshots and functional state updates (`p1-w05-l06`)

**Source:** C07,C16,C18. **Prerequisite:** p1-w05-l05. **Suggested learning effort:** 15–30 minutes (not a time gate).

- **Outcomes:** Explain `useState` return pair, snapshot semantics, functional updater, render purity and top-level Hook rules; predict two queued updates and diagnose mutation.
- **Core explanation / mental model:** Each render provides a snapshot of state. `setCount` requests another render; it does not rewrite the current handler variable.
- **Worked example to author:** Predict a double `setCount(count+1)` followed by two updater-function calls and explain final values; draw a render timeline for toggling help text.
- **Practice or local lab:** Write a counter and a show/hide-help switch in actual React; explain which handler owns the update and why an effect is not needed.
- **Common misconception and correction:** Misconception: `setTasks(tasks)` after `tasks.push` should update reliably. New reference required; do not cause side effects while rendering.
- **Three-level hint ladder seed:** Observe previous snapshot → use `setX(previous => ...)` when dependent → create new object/array → test repeated clicks.
- **Mastery checkpoint(s):** `p1-w05-l06-c01` **quiz-auto** (required): State snapshots, functional updates, Hooks and render purity (6 items); `p1-w05-l06-c02` **local-project-self-verified** (required): Run React counter and help toggle; explain queued state changes.
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L07 — React events, controlled forms and validation (`p1-w05-l07`)

**Source:** C08,C17,C18. **Prerequisite:** p1-w05-l06. **Suggested learning effort:** 25–45 minutes plus local setup (not a time gate).

- **Outcomes:** Differentiate callback reference vs immediate invocation; implement controlled `value`/`onChange`; use semantic form submit/Enter; validate trim and ≤100-character title; provide accessible feedback.
- **Core explanation / mental model:** The input draft belongs to `TaskForm`, while accepted tasks belong to `App`. Submitting hands one validated string upward.
- **Worked example to author:** Trace typing → onChange → draft state → input rerender; then Enter/click → preventDefault → validation → onAdd → cleared draft. Compare `onClick={save}` to `onClick={save()}`.
- **Practice or local lab:** Implement a controlled form in the local React starter; separately test pure `validateTitle()` with blank/space/100/101-character examples in an isolated JS runner.
- **Common misconception and correction:** Misconception: `maxLength=100` alone means the underlying data is always valid. Shared validation still required.
- **Three-level hint ladder seed:** Identify draft owner → inspect event prop → trim input → show field error → verify Enter and mouse paths.
- **Mastery checkpoint(s):** `p1-w05-l07-c01` **browser-code-auto** (required): Pure `validateTitle()` trim, type, blank, 100/101 boundaries; behavior tests only; `p1-w05-l07-c02` **local-project-self-verified** (required): React controlled TaskForm, Enter/click, preventDefault, message and clearing; `p1-w05-l07-c03` **optional-enrichment** (optional): Extra mobile/form accessibility or CSS polish; does not affect graduation.
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L08 — Lists, stable keys and immutable task CRUD (`p1-w05-l08`)

**Source:** C09,C17,C18. **Prerequisite:** p1-w05-l07. **Suggested learning effort:** 25–45 minutes plus local setup (not a time gate).

- **Outcomes:** Explain why array index keys fail under reorder; implement add/toggle/delete by stable ID using existing pure helpers; preserve prior task data during filter/search.
- **Core explanation / mental model:** A React list key represents logical item identity, not its current display position. React state arrays should be replaced, not mutated.
- **Worked example to author:** Compare `tasks.push(newTask); setTasks(tasks)` against functional `setTasks(prev => [...prev, newTask])`; show ID-based toggle with `map`, delete with `filter`.
- **Practice or local lab:** In isolated JS, prove nonmutation and correct IDs with frozen task fixtures. In the local React app, filter, delete a specific task, then return to All to verify no accidental loss.
- **Common misconception and correction:** Misconception: `key={{index}}` is harmless for editable/sortable lists or sorting the state array in place is fine.
- **Three-level hint ladder seed:** Check stable ID → return new array → verify unaffected record equality → sort/filter display only.
- **Mastery checkpoint(s):** `p1-w05-l08-c01` **quiz-auto** (required): Stable list keys and immutable updates, identity after filtering/reorder (6 items); `p1-w05-l08-c02` **browser-code-auto** (required): Pure JS add/toggle/delete function contracts with frozen fixtures and IDs; `p1-w05-l08-c03` **local-project-self-verified** (required): Actual React add/toggle/delete, list keys, filtered delete and no mutation.
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L09 — State ownership, toolbar and derived values (`p1-w05-l09`)

**Source:** C03,C10,C17. **Prerequisite:** p1-w05-l08. **Suggested learning effort:** 15–30 minutes (not a time gate).

- **Outcomes:** Place source state and local form draft correctly; derive visible tasks and remaining counts; avoid duplicated visibleTasks state; explain why filtering does not delete underlying tasks.
- **Core explanation / mental model:** App owns `tasks`, `filter`, `query`, `sort`; `TaskForm` owns its draft; `visibleTasks` and `countRemaining` are computed views, not independent stores.
- **Worked example to author:** Given 3 tasks, `filter="active"`, `query="react"`, `sort="newest"`, predict one visible item while countRemaining remains 2 and source length remains 3.
- **Practice or local lab:** Complete a pure JavaScript derived-view challenge in the sandbox; use a local React toolbar to trigger filter/query/sort and verify the source array remains intact.
- **Common misconception and correction:** Misconception: storing a second `visibleTasks` array is harmless; demonstrate stale derived state after a task toggle.
- **Three-level hint ladder seed:** Identify canonical source → compute views from it → check counts against unfiltered data → preserve input reference.
- **Mastery checkpoint(s):** `p1-w05-l09-c01` **quiz-auto** (required): State ownership, derived data, counts not tied to filtered view (5 items); `p1-w05-l09-c02` **browser-code-auto** (required): Pure JS search/filter/sort/count; nonmutation and stable source.
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L10 — Lazy initialization, useEffect persistence and origin boundaries (`p1-w05-l10`)

**Source:** C11,C12,C17. **Prerequisite:** p1-w05-l09. **Suggested learning effort:** 25–45 minutes plus local setup (not a time gate).

- **Outcomes:** Explain why browser storage is external to render; use lazy state initialization and an effect for persistence; detect malformed/blocked storage; explain different localhost ports are different origins.
- **Core explanation / mental model:** Initialization reads the saved task data; an effect synchronizes subsequent changes. The React Vite origin does not automatically share Week 4 data from another port.
- **Worked example to author:** Show `useState(() => readStoredTasks(storage))` and `useEffect(() => writeStoredTasks(storage, tasks), [tasks])` as a conceptual pair; explain behavior in dev Strict Mode without using a ref to hide bugs.
- **Practice or local lab:** Implement persistence in local React, test add/toggle/delete across reload, and deliberately start from malformed storage in a disposable fixture without overwriting original data.
- **Common misconception and correction:** Misconception: same storage key works across ports or every effect is required for filtering. Separate pure derivation from external synchronization.
- **Three-level hint ladder seed:** Check origin and key → distinguish read from write → inspect storage error → avoid destructive overwrite.
- **Mastery checkpoint(s):** `p1-w05-l10-c01` **quiz-auto** (required): Lazy initialization vs effect, origin/port, corruption and Strict Mode (5 items); `p1-w05-l10-c02` **local-project-self-verified** (required): Local React persistence across add/toggle/delete/reload; malformed/blocked storage handling; `p1-w05-l10-c03` **optional-enrichment** (optional): Manual deliberate Week 4→Week 5 data migration with safe backup.
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

### L11 — Study Tasks v5 rebuild, debugging and readiness (`p1-w05-l11`)

**Source:** C01,C02,C12,C13,C14,C15,C16,C17,C18,C19,C20,C21,C22,C23. **Prerequisite:** p1-w05-l10. **Suggested learning effort:** 15–30 minutes (not a time gate).

- **Outcomes:** Demonstrate local React CRUD, filters, search, sort and safe persistence; run project tests and a production build; debug a new error independently; explain an AI-generated diff; identify Week 6 API/routing deferral.
- **Core explanation / mental model:** This is a UI architecture migration, not a new product. Keep the Week 4 project intact and reuse the existing data helpers; finish a small React app correctly.
- **Worked example to author:** Trace one task creation end-to-end across `TaskForm`, `App`, the pure logic helper, `TaskList` and storage; explain why an event does not force a full page reload.
- **Practice or local lab:** Use the Week 5 student starter; demonstrate add/toggle/delete, toolbar and persistence; run `npm test` and `npm run build` after dependencies are available; repair an unseen handler/key/storage bug without generated solution.
- **Common misconception and correction:** Misconception: copying a reference App.jsx or passing the existing 25 helper tests means the full React UI works; actual local UI/build verification is separate.
- **Three-level hint ladder seed:** Reproduce → inspect Vite/Console/props → isolate smallest logic error → rerun local flow/tests → explain Git diff.
- **Mastery checkpoint(s):** `p1-w05-l11-c01` **local-project-self-verified** (required): Integrated React Study Tasks v5 functionality; tests, build, Git diff; `p1-w05-l11-c02` **quiz-auto** (required): Ten-item React readiness quiz, including essential state/data-flow items; `p1-w05-l11-c03` **local-project-self-verified** (required): Independent no-AI repair of unseen JSX/handler/key/storage failure; `p1-w05-l11-c04` **optional-enrichment** (optional): Add edit/save/cancel task UI in React; may use mentor prompts as optional.
- **Review question:** Ask the student to explain **why** the approach works, not merely name the API. Every local-project result is learner-attested; no automatic React build claims.

## 4. Week 5 project scope and the actual learner workflow

**Starting state:** extract only the provided `starter/` React/Vite folder; Week 4 vanilla-JS project remains intact. The starter includes demo tasks and TODO event handlers; supplied library functions/tests are a valid learning baseline, not proof that the React UI is implemented.

**Project order:** (1) orient to files and sketch component tree; (2) JSX with data-driven task row; (3) read-only props and parent callback IDs; (4) `useState` + functional updates; (5) controlled task form; (6) add/toggle/delete without mutation and without index keys; (7) derive search/filter/sort/count; (8) safe lazy browser-storage read and change-sync effect; (9) debug, run tests/build, inspect diff; (10) optional edit. Do not insist that every advanced Week 4 feature reappear in React on Week 5.

**Local acceptance criteria (manual and self-verified):**

- [ ] Student runs `node --version`, `npm --version`, `npm install` in the **correct starter folder** and `npm run dev` on the actual printed URL; confirms visible React UI.
- [ ] Student can explain `index.html → main.jsx → App.jsx → TaskList → TaskItem`, and shows a data-changing handler path.
- [ ] Add a task by mouse **and Enter**; whitespace trim; blank error; 100 chars accepted, 101 rejected; display markup-like strings literally.
- [ ] Three tasks retain distinct stable IDs; toggle one and delete another even after filter/search/sort, without other task corruption.
- [ ] All/Active/Completed + search + sort work as **derived** views. Counts correspond to full underlying state.
- [ ] Add, toggle and delete persist after browser reload **on the React origin**; malformed stored JSON does not get silently overwritten; blocked storage degrades gracefully.
- [ ] `npm test` executes the actual helper suite; `npm run build` runs after dependency install; learner records the **observed** results and corrects any failure. The original instructor reference describes **25 tests** in `tests/task-logic.test.mjs`, but passing that suite alone does *not* verify the React UI.
- [ ] One unseen React bug (bad callback invocation, mutation, key, read-only input, or origin mismatch) is independently reproduced, diagnosed, fixed, and explained.
- [ ] Before a Git commit the learner inspects `git diff`, explains any AI-aided change, and does not commit `node_modules`, secrets, or the instructor reference.

**Environment caveat:** npm installation and current React/Vite version/Node LTS compatibility should be checked against official documentation at actual D6 authoring time; this blueprint does not claim present npm installation, React bundle builds or local browser verification. The academy's future offline PWA does not automatically supply npm package caches or a local Node runtime.

## 5. Assessment and verification boundaries

**Automated conceptual quizzes:** 10 groups / 57 **planned** scored item slots, with essential candidates requiring a reviewed fair question; follow DEC-21 80% rounded up and essential checks. Build reviewed incorrect-answer rationales and variant banks in D6.

**Browser-code-auto (only pure JS):** `l07-c01` pure title validation, `l08-c02` immutable task helper CRUD, `l09-c02` derived search/filter/sort/count. These run with **test-owned disposable arrays**, no React JSX compilation, no Vite, no network, and no access to the host academy progress store. Never require exact code-string matching. The source `task-logic.js` is a reference for contracts, not a full answer to ship into the student editor.

**Local self-verification:** all genuine React JSX/component/hook/form/DOM and `npm`/Git project checks are done on the learner's laptop. The app must label them **Self-verified locally**, retain bounded non-secret details (observed result, a test/build summary, one root cause), and never claim it inspected terminal output or a private filesystem.

**Optional stretch:** L07-c03 accessibility styling, L10-c03 deliberate Week 4 data migration, L11-c04 edit/save/cancel. They never block L11 or Week 6; optional AI prompts, React DevTools install and prettier UI have no unlocking effect.

**Security:** student code in the academy playground must not reach academy `localStorage` or DOM; isolate it and provide behavior mocks. Do not compile/execute arbitrary third-party React code inside the academy's trusted origin. Vite/local student project uses test-only fictional tasks, no passwords or paid APIs.

**Operational testing to author in D6:** focused reset/unlock behavior tests; quiz pass/fail with essential question; sandbox fixture behavior; local attestation UI honesty; sample student runs across 360px screen and keyboard; Vite setup error guidance; no private-solution leakage; L11 no-AI transfer. All remain future tasks.

## 6. Project continuity and next-week boundaries

- Preserve the **Week 4 vanilla app**, including Study Idea Inbox, separately for comparison. Do not silently remove source material from its existing folder or claim it is migrated.
- **React Week 5 app:** only local tasks; reuse domain helpers `{id,title,completed}`, `MAX_TITLE_LENGTH=100`, `study-tasks-week2` on the new Vite origin, `getVisibleTasks`, `countRemaining`, and storage helper contracts.
- **Week 6:** API-powered idea inbox returns, `useEffect` goes deeper into data fetching/cleanup, and React Router introduces multi-page structure. No Express/Postgres yet.
- **Fieldbook app:** its own progress DB-less store is separate from the learner's demo task app; tests must never edit actual academy progress.

## 7. D0/D6 authoring and owner-review gates

- [x] Owner approved **A-006**: 11 required lessons, 25 checkpoints (22 required / 3 optional), 10 quizzes/57 intended item slots, pure-JS-only browser grading, real React local attestation, optional edit/migration.
- [ ] Final actual student explanations, runnable JSX examples and instruction screenshots are authored and checked; default student runtime uses JavaScript React template, not TypeScript.
- [ ] Quiz distractors, essential-item text and retries are technically/educationally peer-reviewed and tested in the actual lesson engine.
- [ ] All three pure-JS code suites are executed in D4-approved isolated runner; no false claims of compiled JSX.
- [ ] Real React local project acceptance commands are run and results accurately recorded by a future learner; don't claim the source's 25 unit tests prove UI.
- [ ] D6 learner pilot is conducted with actual student and observer; critical errors corrected before publishing the week.
- [ ] Private source C20 answers, C22 full reference and `reference-solution/` excluded from public app build.
- [ ] D0 global curriculum audit, D1 design approval and explicit D2 authorization remain outstanding separately.

**Owner status today:** **Week 5 structural proposal owner-approved A-006**; Weeks 1–4 already approved as D0 structures. No code, real React UI/build or learner pilot has been executed in FullStack Fieldbook.

**Owner status update — A-006:** Week 5 structure approved after the owner applied the Week 5 draft and requested continuation. No actual learner-ready question bank, JSX runner, local React UI build, or D6 learner pilot is approved or executed.
