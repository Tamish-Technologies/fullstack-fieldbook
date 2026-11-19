# Week 3 Quiz and Feedback Item Plan — D0 Proposal

**Status:** The **45 scored item slots** across eight required quiz groups are owner-approved as structural intentions (A-004), **not final learner-facing questions**. Use after approving `WEEK03_CHECKPOINT_INVENTORY.md`. Source: private Week 3 guide C03–C14, C19; completed solution stays private. Authority: DEC-12/21, `MASTERY_RULES.md`.

## 1. Item-authoring and pass rules

- Seven five-question quizzes pass at **4/5 minimum**, the ten-question readiness quiz at **8/10 minimum**, **plus all flagged essential questions**. These item counts and essential seeds require educational review when authoring final banks.
- Each item must later include a valid correct answer, plausible distractors/expected output, rationales for every incorrect answer, and at least one equivalent retry scenario. Prefer *predict/explain/apply* over trivia.
- The ID pattern `p1-w03-lNN-qNN` identifies an *item*, distinct from `p1-w03-lNN-cNN`, a mastery *checkpoint*. Store completion/score evidence, not a copy of instructor's full answer key.
- Avoid asking learners to paste real tokens, private logs or passwords. Nothing here needs an AI account or remote API. “Essential” item flags here are proposals, not already approved final wording.

## 2. L01 — Data flow and pure functions (`p1-w03-l01-c01`)

| Question ID | Item to author | Misconception to correct | Equivalent retry |
|---|---|---|---|
| `p1-w03-l01-q01` | Given Save/Sort/Search, classify which changes source tasks | Every UI interaction needs persistence | Replace with Delete/Completed filter |
| `p1-w03-l01-q02` | Identify source array vs currently rendered DOM nodes | DOM nodes are authoritative record storage | Replace row and re-render |
| `p1-w03-l01-q03` | Inspect pure helper and identify side-effect line | Function name `get...` guarantees purity | Different helper touching storage |
| `p1-w03-l01-q04` | **ESSENTIAL:** choose invariant-preserving data flow after sorting | View order may modify source without consequence | Search+sort+delete on new IDs |
| `p1-w03-l01-q05` | Explain why `countRemaining` may be called twice with same result | Calling helper must change state | Fresh three-task fixture |

## 3. L02 — Validation and immutable edits (`p1-w03-l02-c02`)

| Question ID | Item to author | Misconception to correct | Equivalent retry |
|---|---|---|---|
| `p1-w03-l02-q01` | What should title validation do with outer spaces? | Trim only at display, save whitespace as title | Different padded title |
| `p1-w03-l02-q02` | Predict accepted lengths at 100 and 101 | 100 limit accepts 101 silently | Test 0/1/100 boundaries |
| `p1-w03-l02-q03` | **ESSENTIAL:** predict effect of invalid rename on original array | Failed validation may partially mutate source | Unknown ID/blank title example |
| `p1-w03-l02-q04` | Identify correct record for ID 12 after reordering | `tasks[12]` refers to id 12 | IDs 3/7/15; edit 7 |
| `p1-w03-l02-q05` | Interpret `{ok:false,tasks,error}` return | Invalid user entry must throw and crash UI | Different validation failure |

## 4. L03 — Sorting and stable IDs (`p1-w03-l03-c02`)

| Question ID | Item to author | Misconception to correct | Equivalent retry |
|---|---|---|---|
| `p1-w03-l03-q01` | Predict order when sorting `[12,4,19]` oldest | Default sort is numeric ascending | IDs [20,3,11] |
| `p1-w03-l03-q02` | Explain difference between ID and array index in visible result | Reordering changes identity | Delete filtered middle row |
| `p1-w03-l03-q03` | **ESSENTIAL:** choose copy-safe sort for source array | `tasks.sort()` has no lasting mutation | `slice().sort()` vs reverse |
| `p1-w03-l03-q04` | Explain why task ID is not exact creation timestamp | Larger imported ID proves exact creation time | Same IDs, new import order |
| `p1-w03-l03-q05` | Predict source sequence after computing both views | Every view must replace source order | Toggle ascending/descending repeatedly |

## 5. L04 — Modules and localhost (`p1-w03-l04-c02`)

| Question ID | Item to author | Misconception to correct | Equivalent retry |
|---|---|---|---|
| `p1-w03-l04-q01` | Identify which file should export pure helper | Every function must be in one `app.js` | Move validation helper into module |
| `p1-w03-l04-q02` | Select valid relative import path/extension | Browser resolves missing paths automatically | Wrong filename/parent folder |
| `p1-w03-l04-q03` | Interpret `file://` module error vs `http://localhost` | Permission flags should be disabled | Change server port; inspect URL |
| `p1-w03-l04-q04` | Identify evidence of missing module in Network panel | Empty UI means JavaScript logic must be rewritten | 404 import scenario |
| `p1-w03-l04-q05` | Distinguish localhost static server from backend API | Starting server makes data cloud-synced | `http.server` vs Express API |

**No essential item proposed:** all five still scored; local server proof is the separate self-verified gate.

## 6. L05 — Event bubbling and delegation (`p1-w03-l05-c02`)

| Question ID | Item to author | Misconception to correct | Equivalent retry |
|---|---|---|---|
| `p1-w03-l05-q01` | Trace event propagation from child span to list | Events stop at the button automatically | Icon nested in edit button |
| `p1-w03-l05-q02` | Identify delegated listener attachment site | Must rebind every button after each render | Recreate row via replaceChildren |
| `p1-w03-l05-q03` | **ESSENTIAL:** nested target plus sorted list: how get correct task ID? | Event target is always button/index is record ID | Click SVG span in row ID 19 |
| `p1-w03-l05-q04` | Choose `change` for checkbox and `submit` for edit form | One click listener handles all semantics best | Shift to keyboard checkbox/action |
| `p1-w03-l05-q05` | Identify necessary guard for unrelated list clicks | Any bubbled click should delete task | Click non-action text outside button |

## 7. L07 — Search/filter/sort (`p1-w03-l07-c02`)

| Question ID | Item to author | Misconception to correct | Equivalent retry |
|---|---|---|---|
| `p1-w03-l07-q01` | Predict query `javascript` with mixed casing | Includes only exact-case titles | Different term/casing |
| `p1-w03-l07-q02` | Compute Completed + query `CSS` from 3 tasks | Search overrides status filter | Switch active+query |
| `p1-w03-l07-q03` | **ESSENTIAL:** explain tasks remaining after switching view | Filter permanently deletes unshown records | Active→All after sort+search |
| `p1-w03-l07-q04` | Global remaining vs visible shown count | Remaining means visible row count | No matches but active tasks exist |
| `p1-w03-l07-q05` | Choose correct empty-state message from fixture | Zero matches equals zero global tasks | Empty dataset vs unmatched query |

## 8. L10 — Git and responsible AI review (`p1-w03-l10-c01`)

| Question ID | Item to author | Misconception to correct | Equivalent retry |
|---|---|---|---|
| `p1-w03-l10-q01` | Review diff that replaces copy-sort with source-sort | AI-proposed simplification is always safe | AI changes delete by index |
| `p1-w03-l10-q02` | Choose smallest regression check after rename fix | Successful page load proves behavior | Cancel/Save after status filter |
| `p1-w03-l10-q03` | What to do before an unknown terminal command? | Agent recommendation permits blind execution | Suspicious install/cleanup command |
| `p1-w03-l10-q04` | Explain what Git diff proves and does not prove | Seeing green diff means tests pass | Diff changes title validation |
| `p1-w03-l10-q05` | Compare a bounded agent task to “rewrite the app” | More generated files means higher quality | Request test on existing module |

**No essential item proposed**; AI remains optional, but safe review skills are required conceptually.

## 9. L11 — Weekly readiness (`p1-w03-l11-c02`)

| Question ID | Item to author | Misconception / feedback focus | Equivalent retry |
|---|---|---|---|
| `p1-w03-l11-q01` | Trace event → data change → persistence → view | Every view control writes task data | Edit vs Search workflow |
| `p1-w03-l11-q02` | **ESSENTIAL:** choose correct ID-targeting edit/delete in sorted list | Visible index is same as ID | Different nonconsecutive IDs |
| `p1-w03-l11-q03` | Predict `sort()` mutation on original tasks | Copy unnecessary | Small 3-task fixture |
| `p1-w03-l11-q04` | Select proper normalization/100-char boundary | Whitespace title valid | New boundary input |
| `p1-w03-l11-q05` | State transitions of Cancel vs Save | Cancel should persist draft | Invalid save then cancel |
| `p1-w03-l11-q06` | Explain why modules require correct origin and paths | `file://` behavior same as localhost | Wrong extension vs origin |
| `p1-w03-l11-q07` | **ESSENTIAL:** explain why `innerHTML` is wrong for task title | User input can safely be markup | Literal harmless `<em>Read</em>` text |
| `p1-w03-l11-q08` | Search+filter+sort with mixed-case term | Applying controls destroys data | Switch status filter |
| `p1-w03-l11-q09` | Distinguish syntax parsing from stored-task validation | `JSON.parse` guarantees task schema | Duplicate ID/wrong completed type |
| `p1-w03-l11-q10` | Choose meaningful test after bug fix and AI review | Single happy-path test is sufficient | Test regression on cancel-after-sort |

**Minimum 8/10 plus q02 and q07** (if final reviewed items retain essential designation). These item descriptions are not finished questions; final review must check consistency with C19 and all earlier objectives.

## 10. Review backlog / readiness criteria

- [ ] Turn all 45 slots into valid questions with unambiguous correct answers, plausible distractors, per-distractor explanation, equivalent retry, keyboard support, and reviewer signature.
- [ ] Verify essential item flags target critical data integrity/safety, not syntax trivia; explicitly approve any changes to the proposed item counts and checkpoint contract.
- [ ] Match every item to a linked lesson objective; check score calculation, resubmission, essential failures, and multiple attempts.
- [ ] Ensure no default student bundle contains the private instructor answer key, completed reference ZIP or original C21 code appendix.
- [ ] Log any D5 learner-pilot confusion and refine explanations without silently changing approved mastery policy.

**This is an authoring plan, not a final question bank and not evidence that quizzes were executed.**
