# Week 1 Assessment Item Plan — D0 Structure Approved; Items Still Draft

**Status:** owner accepted this proposed **seven-quiz/40-slot educational plan** as part of A-001. Actual questions, answers, distractors, essential flag review, equivalent retries and test execution are **NOT completed**; no live item bank is approved.  
**Authority:** DEC-21, `MASTERY_RULES.md`, `WEEK01_CHECKPOINT_INVENTORY.md`.  
**Purpose:** prevent generic end-of-lesson trivia. Every assessed item should be anchored in a source concept, an observable outcome, an actionable wrong-answer explanation, and an equivalent retry.

## 1. Quiz construction rules

- Seven mandatory quizzes: L01 (5), L03 (5), L06 (5), L08 (5), L10 (5), L11 (5), and L12 (10). **Total: 40 scored item slots** in the first pass.
- Required scores: 4/5 or 8/10, *plus* all flagged essential questions (L03-Q01, L08-Q03, L12-Q03 and L12-Q07 are proposed essential seeds). If essential flags are revised, record approval and a content version.
- Each slot needs a complete stem, plausible alternatives or expected output, correct-answer explanation, wrong-answer misconceptions, at least one equivalent retry variation, keyboard/accessibility review and factual check before D3 publication. **These are seeds, not the finished answer key.**
- Avoid trick wording and guessing from obvious answer lengths; vary positions and test practical reasoning. Never infer mastery from pressing “Reveal answer.” If a learner reveals an explanation, use a new equivalent application item before scoring the learned competency.
- `questionId` prefixes below are proposed stable content IDs; freeze with `contentVersion` only when approved. Item ID must link to its lesson checkpoint; never reuse published IDs for different content.
- Do not put the private instructor's complete reference code or complete teacher answer key into public lesson assets. Any live auto-graded client-side bank is visible to technically savvy learners; client-side scoring is **educational, not secure certification**.

## 2. L01 orientation (5 items, ≥4/5)

| Proposed question ID | Application scenario / skill | Common wrong belief | Equivalent retry direction |
|---|---|---|---|
| `p1-w01-l01-q01` | Given heading, color and button behavior, allocate each change to HTML/CSS/JS | HTML directly controls all behavior | Give a different UI feature trio |
| `...l01-q02` | Identify DOM as the browser's live parsed document tree | DOM is a database | Ask what changes after appending an `li` |
| `...l01-q03` | Predict result of reload in Week 1 | Tasks automatically persist | Contrast temporary DOM vs Week 2 persistence |
| `...l01-q04` | Choose appropriate tool to inspect a broken selector | Need reinstall browser | Use Console/Elements scenario |
| `...l01-q05` | Choose learning-first AI workflow when stuck | AI output proves correctness | Compare hint/review workflow with full outsourcing |

**Feedback design:** connect every wrong result to a page example and a runnable/visible demonstration. **No essential question** proposed in this first quiz.

## 3. L03 forms and labels (5 items, ≥4/5 + essential)

| Question ID | Application scenario / skill | Essential? | Misconception and feedback direction |
|---|---|---|---|
| `...l03-q01` | Match a visible label to its intended input in markup | **YES** | Placeholder does not replace a label; show click-to-focus behavior |
| `...l03-q02` | Explain why a form submit event supports click and Enter | No | Button click-only handlers are not equivalent to form semantics |
| `...l03-q03` | Choose `type` for an Add button and a separate Delete button | No | Default button semantics can cause unintended form submit |
| `...l03-q04` | Compare empty string and spaces-only text with `required` | No | Native required is not a `.trim()` validator |
| `...l03-q05` | Choose semantic elements for a heading plus task list | No | `ul` and `li` convey list structure without custom roles |

**Equivalent retry:** different control IDs, button placement, and placeholder wording; do not change the underlying skill.

## 4. L06 JavaScript values/variables (5 items, ≥4/5)

| Question ID | Application scenario / skill | Misconception and feedback direction |
|---|---|---|
| `...l06-q01` | Predict result after trimming spaces and taking string length | `.trim()` removes internal letters or does not alter length |
| `...l06-q02` | Predict `3 === "3"` or equivalent strict equality comparison | `===` coerces string numbers |
| `...l06-q03` | Distinguish `const` binding reassignment from `tasks.push(...)` | `const` freezes an array |
| `...l06-q04` | Interpret a small `{title,done}` object vs an array of tasks | Object and array are interchangeable |
| `...l06-q05` | Predict truthiness of empty string vs nonempty string | Every string is truthy |

**Equivalent retry:** swap task titles, constants and types; include a short justification after showing computed result.

## 5. L08 DOM selection and safe text (5 items, ≥4/5 + essential)

| Question ID | Application scenario / skill | Essential? | Misconception and feedback direction |
|---|---|---|---|
| `...l08-q01` | Predict result of `querySelector` with missing matching element | No | Returns `null`, not an empty HTML element |
| `...l08-q02` | Distinguish `input.value` from `item.textContent` | No | Reading an input differs from setting displayed text |
| `...l08-q03` | Choose safe handling of a user-entered literal `<b>Read</b>` | **YES** | Inserting untrusted string via `innerHTML` treats it as markup |
| `...l08-q04` | Identify effect of `createElement('li')` before `append()` | No | Creation alone doesn't display an element |
| `...l08-q05` | Reason about adding two distinct items to the list | No | Reusing/replacing markup can lose prior nodes and handlers |

**Equivalent retry:** use harmless literal strings such as `<em>Plan</em>`, `A & B` or quoted titles; avoid realistic attack payloads.

## 6. L10 debugging reasoning (5 items, ≥4/5)

| Question ID | Application scenario / skill | Misconception and feedback direction |
|---|---|---|
| `...l10-q01` | Browser Console reports reading property on `null`; choose first investigation | Randomly rewrite JS instead of checking selector/DOM |
| `...l10-q02` | Styles not applying; choose how to inspect stylesheet path and computed rule | CSS failure always requires reinstalling tools |
| `...l10-q03` | Form refreshes on submit; identify observable event/default issue | Browser refresh means JavaScript executed correctly |
| `...l10-q04` | Explain what breakpoint reveals vs logging | Debugging is only reading guesses or AI output |
| `...l10-q05` | Pick a useful bug report among vague and evidence-based examples | “Doesn't work” is sufficient reproduction information |

**Equivalent retry:** use new, scoped failure fixtures with the same underlying debugging strategy.

## 7. L11 Git and AI code review (5 items, ≥4/5)

| Question ID | Application scenario / skill | Misconception and feedback direction |
|---|---|---|
| `...l11-q01` | Identify what `git status` tells about edits and staging | Every edited file is already committed |
| `...l11-q02` | Distinguish `git add` from `git commit` | Staging and committing are identical |
| `...l11-q03` | Determine if local commit is on GitHub automatically | Commit implies push |
| `...l11-q04` | Review a sample AI diff that changes unrelated files | Agent completed task, so all changes are acceptable |
| `...l11-q05` | Choose verification before accepting an AI suggestion | AI says “done” is sufficient evidence; ignore tests |

**Equivalent retry:** new fictional Git status snippets and alternate scoped CSS diff. No required external account or actual AI usage.

## 8. L12 final readiness (10 items, ≥8/10 + two essential)

| Question ID | Multi-topic performance target | Essential? | Feedback / retry idea |
|---|---|---|---|
| `...l12-q01` | Associate semantic form, label and task list | No | Provide new form structure |
| `...l12-q02` | Predict consequence of missing `preventDefault()` | No | Observe navigation and temporary DOM |
| `...l12-q03` | Explain why spaces-only title must be rejected with `.trim()` | **YES** | Test input containing tabs and spaces |
| `...l12-q04` | Predict a JS early return or function result | No | Use different task string |
| `...l12-q05` | Explain how checkbox `.checked` drives `.completed` CSS | No | Compare checked/unchecked transitions |
| `...l12-q06` | Identify why deleting last `li` should restore empty-state | No | Model list count before/after deletion |
| `...l12-q07` | Choose safe literal text rendering for user-provided title | **YES** | Use different inert markup-looking task string |
| `...l12-q08` | Diagnose a wrong selector using DevTools | No | Use another null selector fixture |
| `...l12-q09` | Explain responsive layout result of a small-screen media query | No | Compare 375px with 768px condition |
| `...l12-q10` | Distinguish local Git commit, push and AI review evidence | No | Use fresh history/diff scenario |

The final quiz must not merely repeat the exact wording/answer order of earlier quizzes. It should test transfer to a new sample or situation. L12 also requires real project and independent micro-challenge attestations; quiz alone cannot unlock Week 2.

## 9. Required content-review work before student release

For each item above, the D3 writer and reviewer must add:

- [ ] Full student-facing wording and unambiguous interaction type.
- [ ] Correct-answer reasoning, distractor-specific feedback, source attribution (chapter/section).
- [ ] One or more reviewed equivalent retry forms where practicable.
- [ ] Versioned essential flag and reliable scoring behavior.
- [ ] Keyboard, screen reader, mobile and language readability checks.
- [ ] Confirmation that a beginner can reason from **taught material**, not memorized example text.
- [ ] Final learner pilot feedback: incorrect-guess patterns, confusing wording and content corrections.

**Do not publish this plan as a scored quiz bank and do not mark 40 drafted questions as “written.”** It is an item-by-item **authoring assignment** tied to the approved DEC-21 policy.
