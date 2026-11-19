# Week 5 Checkpoint Inventory — DEC-21 Structural Plan APPROVED A-006

**Status:** 11 required lessons, **25 proposed checkpoints: 22 required + 3 optional**. Type totals: **10** `quiz-auto`, **3** `browser-code-auto` (pure JS, never JSX), **9** `local-project-self-verified` (actual React and tooling), **3** `optional-enrichment`. No automatic React compiler/test runner, reviewed quiz bank, local Vite build, or learner pilot exists in this planning stage. D6 is the future student Week 5 integration stage.

## A. Stable checkpoint register

| Checkpoint ID | DEC-21 method | Gate? | Actual learning outcome / exact pass target | Fieldbook evidence |
|---|---|---|---|---|
| `p1-w05-l01-c01` | `quiz-auto` | Required | Concept and UI-flow quiz: React vs manual DOM, component tree, state/event path (5 items) | score + essential result + item version |
| `p1-w05-l02-c01` | `local-project-self-verified` | Required | Actual Node/npm/Vite setup; heading hot reload; correct folder; import-error recovery | learner checklist + terminal observed result (no private paths) |
| `p1-w05-l02-c02` | `quiz-auto` | Required | Build tool, runtime, root entry, node_modules/lockfile roles (4 items) | score + essential result |
| `p1-w05-l03-c01` | `quiz-auto` | Required | JSX wrapper/fragment, className/htmlFor, expressions, safe text (6 items) | score + essential result |
| `p1-w05-l04-c01` | `quiz-auto` | Required | Identify component boundaries/tree and empty-list behavior (5 items) | score + essential result |
| `p1-w05-l04-c02` | `local-project-self-verified` | Required | Run local React TaskList/TaskItem with props and stable key; empty view | learner checklist + observed local run |
| `p1-w05-l05-c01` | `quiz-auto` | Required | Read-only props, function props and callback invocation (5 items) | score + essential result |
| `p1-w05-l05-c02` | `local-project-self-verified` | Required | Child reports correct task ID to parent; no incoming-prop mutation | learner checklist + callback explanation |
| `p1-w05-l06-c01` | `quiz-auto` | Required | State snapshots, functional updates, Hooks and render purity (6 items) | score + essential result |
| `p1-w05-l06-c02` | `local-project-self-verified` | Required | Run React counter and help toggle; explain queued state changes | learner checklist + observed output |
| `p1-w05-l07-c01` | `browser-code-auto` | Required | Pure `validateTitle()` trim, type, blank, 100/101 boundaries; behavior tests only | isolated JavaScript test summary |
| `p1-w05-l07-c02` | `local-project-self-verified` | Required | React controlled TaskForm, Enter/click, preventDefault, message and clearing | learner checklist + error/normal input behavior |
| `p1-w05-l07-c03` | `optional-enrichment` | Optional | Extra mobile/form accessibility or CSS polish; does not affect graduation | optional practice acknowledgment only |
| `p1-w05-l08-c01` | `quiz-auto` | Required | Stable list keys and immutable updates, identity after filtering/reorder (6 items) | score + essential result |
| `p1-w05-l08-c02` | `browser-code-auto` | Required | Pure JS add/toggle/delete function contracts with frozen fixtures and IDs | isolated JavaScript test summary |
| `p1-w05-l08-c03` | `local-project-self-verified` | Required | Actual React add/toggle/delete, list keys, filtered delete and no mutation | learner checklist + local smoke result |
| `p1-w05-l09-c01` | `quiz-auto` | Required | State ownership, derived data, counts not tied to filtered view (5 items) | score + essential result |
| `p1-w05-l09-c02` | `browser-code-auto` | Required | Pure JS search/filter/sort/count; nonmutation and stable source | isolated JavaScript test summary |
| `p1-w05-l10-c01` | `quiz-auto` | Required | Lazy initialization vs effect, origin/port, corruption and Strict Mode (5 items) | score + essential result |
| `p1-w05-l10-c02` | `local-project-self-verified` | Required | Local React persistence across add/toggle/delete/reload; malformed/blocked storage handling | learner checklist + observed reload and error |
| `p1-w05-l10-c03` | `optional-enrichment` | Optional | Manual deliberate Week 4→Week 5 data migration with safe backup | optional practice note only |
| `p1-w05-l11-c01` | `local-project-self-verified` | Required | Integrated React Study Tasks v5 functionality; tests, build, Git diff | learner checklist + bounded test/build summary |
| `p1-w05-l11-c02` | `quiz-auto` | Required | Ten-item React readiness quiz, including essential state/data-flow items | score + essential result |
| `p1-w05-l11-c03` | `local-project-self-verified` | Required | Independent no-AI repair of unseen JSX/handler/key/storage failure | learner root cause + fix/test description |
| `p1-w05-l11-c04` | `optional-enrichment` | Optional | Add edit/save/cancel task UI in React; may use mentor prompts as optional | optional practice note only |

**Counts derived from register:** 25 unique checkpoint IDs; 22 required (10 quiz + 3 pure-JS browser tests + 9 local) and 3 optional. All 11 lessons mandatory. `l11-c01`, `l11-c02`, `l11-c03` are each required for week graduation.

## B. Quiz scoring contract

- Each quiz applies `ceil(0.8 * required scored item count)` AND all approved essential questions must be correct.
- The ten L01..L11 quiz groups total 57 planned slots; actual questions and essential wording must be created, reviewed and versioned during D6. A passed quiz does not automatically prove the local JSX/UI has been executed.
- Incorrect answers have targeted feedback, links to the exact mental model, layered hints and unlimited retries; equivalent new scenario preferred over memorized answer clicks.

## C. Three isolated browser-code contracts — pure JavaScript only

### `p1-w05-l07-c01` — Title validation (pure helper)
- **Fixture:** strings `"  Study React  "`, `""`, `"   "`, 100-character valid title, 101-character invalid title, `null`, `{}`, numeric input; frozen sources where relevant.
- **Pass:** trims only strings; rejects blank, overlong and non-string values; accepts exactly 100 chars; returns explicit success/error and never mutates inputs. 100% mandatory cases.
- **Negative tests:** accepts whitespace, uses input `maxLength` instead of shared validator, throws on null unexpectedly, truncates silently.
- **Feedback:** identify first violating input and boundary before showing full reference code. **No React compilation or component rendering.**

### `p1-w05-l08-c02` — Immutable task operations
- **Fixture:** frozen tasks with IDs 1/7/11; toggling 7, deleting 1, adding a new unique positive ID after deletion; filtered order unrelated to IDs.
- **Pass:** returns distinct array when changed; creates new record only for target update; original frozen array untouched; other tasks and IDs preserved; rejects invalid duplicate/non-positive ID and blank title; no index-as-ID assumption. 100% mandatory cases.
- **Negative tests:** direct `.push()`/`.splice()` on source, `.sort()` in place, ID generated from visible index, destructive filter.
- **Feedback:** show mutated reference and expected before/after records with IDs. **This verifies pure JS only, not the React UI.**

### `p1-w05-l09-c02` — Derived views and counts
- **Fixture:** tasks A `id=1,done=true,title="Read React"`, B `id=2,done=false,title="Practice JavaScript"`, C `id=3,done=false,title="Build React app"`; active/react/newest should yield C, remaining count 2.
- **Pass:** filter/search/sort combinations yield correct ordered IDs; counts derive from all tasks; no mutation or stored display-only copy; empty query and empty array sensible; input frozen remains unchanged.
- **Negative tests:** calculating remaining from visibleTasks, sorting original array in place, filtering away stored tasks, case mismatch.
- **Feedback:** compare displayed IDs, remaining count and unchanged source array.

**Runtime restrictions:** Tests execute in D4-approved sandbox with disposable fixtures. They do not bundle the instructor's reference solution, do not access Fieldbook progress storage, do not require external network, and do **not** claim to run JSX, React hooks, npm, Vite, a React component tree or actual learner project tests. D6 authors must first demonstrate feasibility of test-owned fixtures and good error reporting.

## D. Nine locally self-verified checkpoints — specific evidence, not automatic grades

**L02-c01, tool setup**
- [ ] Student starts from extracted `starter/`, can show correct `pwd`/working folder and `package.json`, runs `node --version` and `npm --version`.
- [ ] `npm install`, `npm run dev` and displayed URL are observed locally; heading hot reload works.
- [ ] After deliberately breaking an import, student reads terminal/browser overlay, repairs it and records the diagnosis.
- **Evidence:** test commands observed, app loaded yes/no, one error/fix sentence. No personal filesystem paths or secrets.

**L04-c02, components**
- [ ] Local React app renders `TaskList` with at least two `TaskItem`s and an explicit empty-list state.
- [ ] Can explain component tree and show stable `task.id` in JSX list key.
- **Evidence:** observed UI conditions and one component responsibility explanation.

**L05-c02, props and callback path**
- [ ] Child receives read-only `task` and `onDelete`; clicking a row sends the correct ID to parent after filter/reorder.
- [ ] Parent updates state; no mutation of incoming props; no `onDelete(task.id)` invocation during render.
- **Evidence:** one traced callback path and observed task ID.

**L06-c02, actual state**
- [ ] Local counter increments correctly with functional updater; two queued updates differ correctly from two captured `count + 1` calls.
- [ ] Help visibility toggles without page reload; student points to owning component and event function.
- **Evidence:** before/after values and snapshot explanation.

**L07-c02, controlled form**
- [ ] TaskForm has `value` and `onChange`, submit calls `preventDefault`, Enter matches Add button behavior.
- [ ] Blank/whitespace and 101-character title rejected with accessible error; valid trimmed title added once; draft clears only on success.
- **Evidence:** checklist and one input-error example. This is a React UI attestation, separate from L07-c01 pure validator auto-check.

**L08-c03, React CRUD**
- [ ] Add/toggle/delete work on task ID regardless of display order; no index keys; filtered-delete still removes correct source ID.
- [ ] No state array/object mutation, previous tasks remain intact; UI updates after React state setter.
- **Evidence:** local smoke steps and named edited component/handler.

**L10-c02, real persistence**
- [ ] Add, toggle and delete persist after page refresh on the **React Vite origin**; local key `study-tasks-week2`.
- [ ] Correctly explains why old Week 4 `localhost:5500` data doesn't automatically appear at Vite port; no forced migration.
- [ ] Corrupt/blocked storage is diagnosed without silently overwriting source tasks; student knows where DevTools storage panel lives.
- **Evidence:** observed before/after refresh, origin note and error/recovery description. Do not store actual raw task JSON in academy progress.

**L11-c01, weekly integrated demo and test/build**
- [ ] Core React CRUD/filter/search/sort/count and persistence behave as specified; API inbox is **not** a required feature.
- [ ] Student actually runs `npm test` (source has 25 helper tests) and, after package install, `npm run build`; logs the **observed** result, including failures if any.
- [ ] Meaningful Git diff/commit; no `node_modules`, `.env` or private reference bundled; student explains who owns tasks.
- **Evidence:** short local test/build results, checkboxes, one event flow explanation, one Git review note. Fieldbook does not run those commands remotely.

**L11-c03, independent transfer**
- [ ] Learner picks/receives an unseen bug variant: handler invoked in render, state mutation, wrong list key after sort, read-only controlled input, or incorrect storage origin.
- [ ] Reproduces error, explains cause, fixes minimal code, repeats regression, writes a brief result **without AI-generated solution** (docs permitted).
- **Evidence:** symptom → root cause → fix → local test. Self-verified locally; not a supervised proof.

## E. Week 5 unlock and reset behavior

- `p1-w05-l01` requires **completed Week 4** project/readiness; all L01–L11 mandatory in order.
- L07-c03, L10-c03 and L11-c04 are optional and excluded from denominator, gate and reset descendants.
- Each required lesson needs all required checkpoint IDs. L11 graduation needs integrated local `c01`, quiz `c02` and independent local `c03` **all** satisfied.
- A formal reset at L07 invalidates required dependent L08–L11 and Week 6 progress, but ordinary review/retry never erases a completed checkpoint. Resetting an optional checkpoint does not relock Week 6.
- In Fieldbook student UI, show quiz/browser checks as **Passed automatically** and local project work as **Self-verified locally**; completed Week 5 says **Includes self-verified work**.

## F. D6 authoring feasibility checks

- [ ] Author and peer-review 10 quiz sets, 57 intended scored items, essential question flags and equivalent retry scenarios.
- [ ] Run 3 pure-JS browser suites in actual D4-approved isolated runner, prove at least one negative case per suite.
- [ ] Write 9 local checklists with exact expected terminal/UI outputs, novice-friendly troubleshooting and bounded evidence without secrets.
- [ ] Verify node/npm/Vite setup with actual supported versions and record tested build; never assume package install works offline.
- [ ] Test browser refresh/port differences and app-state failure without touching FullStack Fieldbook's own storage.
- [ ] Conduct D6 Week 5 learner pilot; no pilot or React build has been executed by this documentation-only package.

**Owner status — A-006:** The checkpoint **structure** (22 required / 3 optional) is approved; implementation, question wording, sandbox execution and D6 pilot remain pending.
