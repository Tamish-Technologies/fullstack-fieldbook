# Week 2 Quiz and Feedback Item Plan — D0 Proposal

**Status:** Week 2 item-slot **structure owner-approved (A-003)**; reviewed *source concepts*, **not a completed/validated student question bank**. Planned 45 scored question **slots** across eight mandatory `quiz-auto` checkpoints.  
**Authority:** DEC-12/DEC-21, `WEEK02_CHECKPOINT_INVENTORY.md`. Question IDs are proposed; item text, answer formats, equivalent retries, accessibility and translation-ready wording must be education-reviewed before publication.

## 1. Assessment-writing rules

- For five scored items, pass at least **4/5** **and all essential questions**. For ten scored items, at least **8/10** and all essential questions.
- Mark only essential concepts that represent genuine prerequisites, safety, or data-integrity risks. Essential flags are **proposed** and require human review; they are not final just because listed here.
- Every scored item needs: a fully written prompt, technically valid correct answer, plausible distractors/expected output, explanation for **each** wrong answer, and equivalent application/retry item. Avoid trivia, ambiguous English, false trick questions, and measuring typing speed.
- If a learner has seen a full explanation, use a new example/fixture on a retry for that concept. Do not punish repeated learning attempts.
- One question ID must map to **exactly one checkpoint**. The tables below provide **assessment intents**, not finished quiz content. `p1-w02-lNN-qNN` is a proposed content item ID. Separate it from `p1-w02-lNN-cNN` checkpoint IDs.
- Publish no private instructor solution, completed reference archive, passwords, or full teacher answer key. In a static client-only app, quiz responses are not secure credentials; assessments are for learning.

## 2. L01 — Data objects and stable identity (`p1-w02-l01-c01`)

| Question ID | Applied item to author | Common misconception / feedback direction | Equivalent retry scenario |
|---|---|---|---|
| `p1-w02-l01-q01` | Given title/status/identity requirements, choose appropriate single task data shape | A plain string can safely represent all properties | Change task type/name, preserve required fields |
| `p1-w02-l01-q02` | Inspect `[ {id:5}, {id:9} ]`; identify element index and task ID | Index and stable ID are identical | Delete first and ask where ID 9 moved |
| `p1-w02-l01-q03` | Predict what `.length` means in array of two task objects | Array length is number completed | Use three objects with mixed status |
| `p1-w02-l01-q04` | Predict `const task={completed:false}; task.completed=true` | `const` makes nested object immutable | Contrast `const` reassignment vs property update |
| `p1-w02-l01-q05` | Identify correct `task.title` access vs whole array access | Dot notation always works on an array of objects directly | Change property names and index |

**Target misconceptions:** identity vs position; arrays vs objects; Boolean properties; const binding.

## 3. L03 — Array methods (`p1-w02-l03-c02`)

| Question ID | Applied item to author | Common misconception / feedback direction | Equivalent retry scenario |
|---|---|---|---|
| `p1-w02-l03-q01` | Predict return of `forEach` when logging two items | `forEach` creates transformed array | Compare to `map` with same inputs |
| `p1-w02-l03-q02` | Choose operation to obtain titles from task objects | `filter` is for transforming each element | Different property transform |
| `p1-w02-l03-q03` | Predict result of `tasks.filter(t=>!t.completed)` | `filter` mutates input by default | Ask about original array after view selection |
| `p1-w02-l03-q04` | **ESSENTIAL:** distinguish a temporary Active view from permanent deletion | Assigning a view filter result to source is harmless | Use Completed view and a hidden active task |
| `p1-w02-l03-q05` | Predict `find` absent result or `reduce` max-ID behavior | `find` always returns object / reduce starts at first ID by magic | Use empty input and nonconsecutive IDs |

**Essential seed:** `q04`. Distractors must demonstrate *whether source data is lost*, not memorization of one specific function name.

## 4. L04 — Source of truth and rerender (`p1-w02-l04-c01`)

| Question ID | Applied item to author | Common misconception / feedback direction | Equivalent retry scenario |
|---|---|---|---|
| `p1-w02-l04-q01` | Order events in `click → state change → save → render` | DOM is automatically the data source | Use checkbox change rather than Add |
| `p1-w02-l04-q02` | Predict next render after DOM `li.remove()` only | Removing a node permanently deletes model record | Delete row from a filtered view then rerender |
| `p1-w02-l04-q03` | **ESSENTIAL:** identify `tasks` as source of truth, DOM as view | Rendered HTML is authoritative task store | Toggle CSS class without updating data then refresh |
| `p1-w02-l04-q04` | Identify when saving is needed: data change versus filter button | Every visual action must write localStorage | Count refresh versus task toggle |
| `p1-w02-l04-q05` | Diagnose state changed but list remains stale | `render()` happens automatically in plain JS | Give a task deletion example with missing render |

**Essential seed:** `q03`. Ask for cause/effect, not memorized vocabulary only.

## 5. L07 — Safe DOM events (`p1-w02-l07-c02`)

| Question ID | Applied item to author | Common misconception / feedback direction | Equivalent retry scenario |
|---|---|---|---|
| `p1-w02-l07-q01` | Choose `submit`, `change`, `click`, `input` for real UI interactions | Each button must be handled with click-only logic | Swap form/checkbox action |
| `p1-w02-l07-q02` | **ESSENTIAL:** display literal `"<b>Plan</b>"` safely | `innerHTML` and `textContent` are interchangeable for user text | Use harmless `<em>Focus</em>` literal text |
| `p1-w02-l07-q03` | Explain why Enter should submit the Add form | Keypress handler always required | Compare click Add with Enter in input |
| `p1-w02-l07-q04` | Choose button `type` for per-task Delete in a form | Every button should submit | Put action button near form controls |
| `p1-w02-l07-q05` | Choose accessible checkbox label setup | Placeholder/adjacent text always labels control automatically | Swap input/label location while preserving association |

**Essential seed:** `q02`. Real HTML parsing hazards should be discussed safely, without executing attacks in a test item.

## 6. L08 — JSON and browser storage (`p1-w02-l08-c02`)

| Question ID | Applied item to author | Common misconception / feedback direction | Equivalent retry scenario |
|---|---|---|---|
| `p1-w02-l08-q01` | Choose proper save operation for array of task objects | Storage accepts object references directly | Use a different array with two fields |
| `p1-w02-l08-q02` | Explain why valid JSON object is not a valid task array | Successful parse proves expected shape | Given `{tasks:[...]}`, choose guard behavior |
| `p1-w02-l08-q03` | **ESSENTIAL:** choose safe behavior for malformed saved JSON | Invalid storage must crash app / parse always succeeds | Swap syntax error with a wrong-type top-level value |
| `p1-w02-l08-q04` | Compute nextId from recovered IDs 2,5,9 | `nextId=tasks.length+1` never collides | Use IDs 4,11; remove one then reload |
| `p1-w02-l08-q05` | Explain storage blocked or origin change behavior | localStorage is a backend and never fails | Switch file URL vs localhost or quota error |

**Essential seed:** `q03`. Distinguish mocked sandbox storage exercise from actual local-project reload proof.

## 7. L09 — Filters and derived UI (`p1-w02-l09-c02`)

| Question ID | Applied item to author | Common misconception / feedback direction | Equivalent retry scenario |
|---|---|---|---|
| `p1-w02-l09-q01` | Predict active/completed view given 3 tasks | All/Active/Completed labels refer to same predicate | Swap two completed statuses |
| `p1-w02-l09-q02` | **ESSENTIAL:** after showing Active, determine how many records remain in source array | View filter deletes hidden records | Switch to Completed then back to All |
| `p1-w02-l09-q03` | Compute remaining count while Completed is selected | Count means visible rows only | All shows 4, Completed shows 3, ask remaining |
| `p1-w02-l09-q04` | Select correct empty-state message when there are tasks but no matches | Empty view proves there are zero tasks globally | Change to all tasks deleted case |
| `p1-w02-l09-q05` | Predict `aria-pressed`/selected filter after click | Visual button state independent from `activeFilter` | Toggle Active→All→Completed |

**Essential seed:** `q02`. Score should reflect mental model of non-destructive views.

## 8. L10 — Debugging and responsible AI review (`p1-w02-l10-c02`)

| Question ID | Applied item to author | Common misconception / feedback direction | Equivalent retry scenario |
|---|---|---|---|
| `p1-w02-l10-q01` | Rows duplicate after each render; choose next observation | Need rewrite app instead of inspect renderer | One stale checkbox scenario |
| `p1-w02-l10-q02` | `tasks.filter is not a function`; identify likely data-shape issue | Error means syntax typo in filter | `tasks.map` on nonarray after parse |
| `p1-w02-l10-q03` | Choose smallest reproducible bug report | “App broken” is sufficient evidence | Use completion not persisted case |
| `p1-w02-l10-q04` | Agent suggests overwriting source tasks for Active; decide review action | Fluent AI response proves safe correctness | Agent suggests delete by array index |
| `p1-w02-l10-q05` | Choose regression test after filter fix | Testing only one button click is enough | Test All→Completed→All after delete |

**No essential question proposed.** Include responsible terminal/Git diff practices as appropriate, but do not require an AI account.

## 9. L11 — Week 2 readiness (`p1-w02-l11-c02`)

| Question ID | Applied item to author | Common misconception / feedback direction | Equivalent retry scenario |
|---|---|---|---|
| `p1-w02-l11-q01` | Define task shape/unique ID for new record | Array index uniquely identifies forever | Reordered list and deleted ID |
| `p1-w02-l11-q02` | Predict `map` toggle for one ID | Every record toggles | Three-task fixture |
| `p1-w02-l11-q03` | Distinguish temporary filter and delete operation | Both change source data | Switch filter before reload |
| `p1-w02-l11-q04` | **ESSENTIAL:** trace `submit→model update→save→render` | Saving or UI change can substitute for other steps | Toggle checkbox then reload |
| `p1-w02-l11-q05` | Explain `JSON.stringify` and parse data validation | Parse always returns correct task array | Bad top-level JSON object |
| `p1-w02-l11-q06` | Identify accessible Delete/checkbox/form behavior | All buttons can submit safely | Press Enter and Delete |
| `p1-w02-l11-q07` | **ESSENTIAL:** count unfinished tasks from source despite current filter | Visible row count equals global remaining | Completed filter with two active tasks |
| `p1-w02-l11-q08` | Diagnose ID collision on reload after deletion | `length+1` always safe | IDs 1,2,9 after refresh |
| `p1-w02-l11-q09` | Describe first observation for list-render duplication | Start by changing CSS | Compare `tasks.length` with `list.children.length` |
| `p1-w02-l11-q10` | Explain limits of self-verified local test evidence | Browser automatically validated learner's external files | Fresh local-project proof scenario |

**Essential seeds:** `q04` and `q07`. Readiness quiz is an adjunct to **two mandatory local project/transfer checkpoints**, never a substitute.

## 10. Publishing and authoring checklist

- [ ] Write final questions and answer/explanation/feedback for each of the 45 slots.
- [ ] Review all proposed essential flags with human technical and educational reviewers; remove unnecessary flags and document approved exceptions.
- [ ] Write at least one equivalent re-application question for each essential concept and targeted variants for other items.
- [ ] Confirm that quiz questions are unambiguous, accessible by keyboard, and not dependent on live network calls.
- [ ] Exercise meaningful decision-making (not copying code immediately above the question).
- [ ] Ensure every item maps to exactly one checkpoint and at least one observable outcome.
- [ ] Run content QA and learner pilot before enabling real unlocks; do not represent draft item plans as published question banks.
- [ ] Confirm no private instructor answer key or completed app reference is accidentally included in a publicly downloadable curriculum package.

**Counts:** 7 × 5 + 1 × 10 = **45** item slots; 8 mandatory `quiz-auto` checkpoints. Their existence in this document does **not** mean they've been authored, passed, run or validated.
