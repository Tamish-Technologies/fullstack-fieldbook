# Week 1 Checkpoint Inventory — Owner-Approved D0 Structure (Not Executed)

**Review status:** Week 1 checkpoint **structure** approved (A-001); exact questions, test implementation, feasibility and learner pilot are still pending. This is a content specification, **not** an executable test suite.  
**Course:** Phase 1 / Week 01 / Study Tasks v1.  
**Stable proposed IDs:** `p1-w01-lNN-cNN`; do not rename after student progress uses them.  
**Policy:** `docs/learning/MASTERY_RULES.md`; question item plan: `WEEK01_ASSESSMENT_ITEM_PLAN.md`.

## A. Inventory at a glance

| Lesson | Checkpoint ID | Verification method | Gate? | Outcome(s) | Builds on lesson | Source |
|---|---|---|---|---|---|---|
| L01 | `p1-w01-l01-c01` | `quiz-auto` | **Yes** | O01–O03 | none | C01,C02,C09 |
| L01 | `p1-w01-l01-c02` | `optional-enrichment` | No | O03 | none | C09 |
| L02 | `p1-w01-l02-c01` | `browser-code-auto` | **Yes** | O04–O05 | L01 | C03 |
| L03 | `p1-w01-l03-c01` | `browser-code-auto` | **Yes** | O06–O08 | L02 | C03 |
| L03 | `p1-w01-l03-c02` | `quiz-auto` | **Yes** | O06–O08 | L02 | C03,C14 |
| L04 | `p1-w01-l04-c01` | `browser-code-auto` | **Yes** | O09–O10 | L03 | C04 |
| L05 | `p1-w01-l05-c01` | `browser-code-auto` | **Yes** | O11–O12 | L04 | C04,C12 |
| L06 | `p1-w01-l06-c01` | `quiz-auto` | **Yes** | O13–O15 | L05 | C05,C14 |
| L07 | `p1-w01-l07-c01` | `browser-code-auto` | **Yes** | O16–O17 | L06 | C05 |
| L08 | `p1-w01-l08-c01` | `browser-code-auto` | **Yes** | O18–O19 | L07 | C06 |
| L08 | `p1-w01-l08-c02` | `quiz-auto` | **Yes** | O19 | L07 | C06,C14 |
| L09 | `p1-w01-l09-c01` | `browser-code-auto` | **Yes** | O20–O21 | L08 | C06 |
| L10 | `p1-w01-l10-c01` | `quiz-auto` | **Yes** | O22–O23 | L09 | C07,C14 |
| L10 | `p1-w01-l10-c02` | `local-project-self-verified` | **Yes** | O22–O23 | L09 | C07,C12 |
| L11 | `p1-w01-l11-c01` | `local-project-self-verified` | **Yes** | O24–O25 | L10 | C02,C08 |
| L11 | `p1-w01-l11-c02` | `quiz-auto` | **Yes** | O24,O26 | L10 | C08,C09,C14 |
| L11 | `p1-w01-l11-c03` | `optional-enrichment` | No | O26 | L10 | C09 |
| L12 | `p1-w01-l12-c01` | `local-project-self-verified` | **Yes** | O27–O28,O30 | L11 | C06,C12,C13,C15 |
| L12 | `p1-w01-l12-c02` | `quiz-auto` | **Yes** | O27–O30 | L11 | C13,C14 |
| L12 | `p1-w01-l12-c03` | `local-project-self-verified` | **Yes** | O29 | L11 | C13 |

**Summary:** 20 proposed checkpoints: **18 mandatory** (7 `quiz-auto`, 7 `browser-code-auto`, 4 `local-project-self-verified`) and **2 optional-enrichment**. Seven scored quizzes need reviewed, equivalent item banks. Reading alone earns no checkpoint evidence. These are **Week 1 draft counts only**, not final course totals.

## B. Standard contract for every required checkpoint

- **Reading order:** the preceding lesson provides background. All 12 readings are available from the outset. All mandatory checks must pass before starting Week 2.
- **Pass:** quiz requires `ceil(.8 * scored_required_items)` *and* each essential item; browser code requires every mandatory behavior test; local project requires explicit per-item learner attestation and bounded written evidence when specified.
- **Evidence:** `checkpointId`, `contentVersion`, `verificationMethod`, `passStatus`, minimal score/test-summary or local-attestation fields, and completion timestamp; **never** actual secrets, personal Git identity, unrestricted logs or private files.
- **Feedback:** targeted failed test/question, expected/observed behavior and 2–3 progressive hints; retries unlimited. Equivalent quizzes preferred; no source-text-only grading.
- **Reset:** review/retry does not invalidate a pass; formal lesson reset cascades through all future dependent lessons and week gates after a clear preview.
- **Accessibility:** announce pass/fail and focused next action; use label associations, keyboard-operable controls and reduced-motion-safe behavior.
- **Isolation:** learner-authored HTML/CSS/JS must not execute in Fieldbook's trusted origin or access its progress. D4 implementation review required before allowing arbitrary code to run.

## C. Test contracts for browser-code-auto checkpoints

**L02-c01: semantic page fixture**

1. `t01` a standards-mode HTML document is present; allow case/whitespace variations in doctype.
2. `t02` a meaningful non-empty `<title>` and `lang="en"` on root exist.
3. `t03` a `main` landmark and exactly one page-level `h1` exist with learner-controlled heading text.
4. `t04` UTF-8 charset and responsive viewport are present.
5. `t05` a stylesheet and deferred script are referenced correctly **against the fixture-provided paths**; failure explains broken paths, not blanket string mismatch.
6. **Negative cases:** markup containing only visually styled `div` tags must not pass; missing title/viewport should identify the exact item.

**L03-c01: form and list fixture**

1. `t01` form has a clear text input and visible associated label; label click or control activation focuses the input.
2. `t02` input's ID is unique and label `for` refers to that ID; placeholder alone does not pass.
3. `t03` Add button is a submit control; native form semantics support click/Enter.
4. `t04` required field prevents an **empty** form submission, but the exercise explains that spaces require later JS handling.
5. `t05` a section heading and empty `ul` task list exist; no task `li` needed yet.
6. `t06` any Delete control included at this stage uses `type="button"`; absence of Delete at this stage is acceptable.

**L04-c01: CSS selector/box model fixture**

1. `t01` authored class selector creates observable style on `.app`.
2. `t02` card width is bounded and visually centered within a larger fixture container (geometry tolerance; no exact CSS text).
3. `t03` a test element using declared width has `border-box` behavior including padding and border; accept equivalent semantic CSS.
4. `t04` padding adds measurable internal space while margin separates outer elements.
5. `t05` focus state remains visible (manual/accessibility QA may supplement; no pixel-perfect grading).

**L05-c01: responsive layout fixture — feasibility flag for D4**

1. `t01` at test viewport ~768 CSS px, form input and button are side by side and individually usable.
2. `t02` at ~375 CSS px, input and button stack with clear separation and no horizontal overflow in the practice preview.
3. `t03` both are visible, focusable, with no clipped actionable text at default zoom.
4. `t04` repeating layout tests produces stable results across target browsers and with text zoom; failures show which viewport/measurement was violated.
5. **D4 blocker:** prove the isolated harness can measure child geometry securely and reproducibly. If not, **do not ship a fake auto-check**: submit a documented checkpoint-type change for owner approval, with a local self-verification protocol.

**L07-c01: JavaScript helpers**

Function names/signatures expected in this lab only: `cleanTitle(rawTitle)` and `isValidTitle(title)` (input is a string). Accept any equivalent implementation.

| ID | Input | Expected |
|---|---|---|
| t01 | `cleanTitle("  Read MDN  ")` | `"Read MDN"` |
| t02 | `cleanTitle("")` | `""` |
| t03 | `cleanTitle(" \t ")` | `""` |
| t04 | `cleanTitle("Review")` | `"Review"` |
| t05 | `isValidTitle("Study")` | `true` |
| t06 | `isValidTitle("   ")` | `false` |
| t07 | `isValidTitle("")` | `false` |
| t08 | `isValidTitle("  Finish  ")` | `true` |

No pass for code that only prints expected values. Tests inspect actual returned values. Do not force a specific `if` syntax if behavior is correct.

**L08-c01: DOM creation and literal user text**

1. `t01` locates the task list (fails meaningfully if query returns null).
2. `t02` creates an `li` and appends it under the correct `ul`, not to an unrelated container.
3. `t03` after adding two titles, the list has two distinct items with correct order.
4. `t04` input `"<b>Read</b>"` remains visible as literal text; no unintended `b` element is inserted.
5. `t05` special text containing `&` or quotes is preserved; no markup is parsed from task-title data.
6. **Security/accuracy:** use safe inert fixtures; do not execute real attack payloads in the grader. No reliance on checking whether `.textContent` was typed literally; check resulting DOM behavior.

**L09-c01: real submit and add behavior**

1. `t01` Add button submits a nonempty task without navigating/reloading.
2. `t02` pressing Enter in the input adds exactly one task.
3. `t03` `"  Read CSS  "` creates a title `"Read CSS"` with no leading/trailing spaces.
4. `t04` empty string adds no task (native required may block the event) and whitespace-only input adds no task with helpful message.
5. `t05` two valid submissions create exactly two visible list items; events do not produce duplicates.
6. `t06` after successful add, input is cleared and focus is returned to the input.
7. **Regression:** `event.preventDefault()` or equivalent navigation prevention must be observable by page stability, not a text search of listener source.

## D. Quiz-auto checkpoint specifications

| Checkpoint | Scored items | Pass | Proposed essential item(s) | Content target |
|---|---:|---|---|---|
| L01-c01 | 5 | ≥4 correct | none initially | HTML/CSS/JS/browser roles, no storage, AI optional |
| L03-c02 | 5 | ≥4 correct **and essential** | associated visible label | form semantics, `required`, Enter, button types |
| L06-c01 | 5 | ≥4 correct | none initially | string/array/object, `const`/`let`, strict equality, falsy |
| L08-c02 | 5 | ≥4 correct **and essential** | safe literal user text | DOM selection, `null`, `.value`, `textContent` |
| L10-c01 | 5 | ≥4 correct | none initially | observation/reproduction, Console, Elements, breakpoints |
| L11-c02 | 5 | ≥4 correct | none initially | Git lifecycle, commit vs push, AI diff/scope/testing |
| L12-c02 | 10 | ≥8 correct **and both essential** | spaces-only validation; safe literal text | cumulative Week 1 readiness |

Detailed item-topic seeds and planned feedback are in `WEEK01_ASSESSMENT_ITEM_PLAN.md`. This file does **not** certify that questions or equivalent retry banks have been written, psychometrically reviewed or tested with learners.

## E. Local-project-self-verified checkpoint specifications

**L10-c02 — DevTools debugging record**

Learner checks all items: (a) reproduced a known failure in a locally opened Week 1 app; (b) observed Console or Elements evidence; (c) identified the root cause, (d) made a fix, (e) reran the original steps, and (f) explained why the fix worked. Required bounded fields: symptom (max 240 chars), evidence (max 240), fix and verification (max 360). State: **Self-verified locally**. Do not pretend platform saw DevTools.

**L11-c01 — Local Git checkpoint**

Learner confirms: (a) initialized/opened a repo containing their Week 1 files, (b) reviewed `git status` and `git diff`, (c) staged relevant files, (d) created at least one meaningful commit by this checkpoint, (e) inspected history (`git log --oneline`), (f) can explain commit vs GitHub push, (g) did not stage secrets. At L12 project gate, require **two** meaningful commits total. Optional note: non-sensitive commit-summary text (max 160 chars); no email, tokens, pasted raw history. GitHub login, remote and push are never mandatory.

**L12-c01 — Completed Study Tasks project**

Learner explicitly confirms all of the following before passing:

1. Four-file project contains `index.html`, `styles.css`, `app.js`, `README.md` and can be opened in a browser without npm.
2. Semantic structure: `main`, one `h1`, labeled task input, `form`, submit button, section heading, `ul`, and task-specific controls.
3. Add a normal title by button; add by Enter; each adds one item without navigating.
4. Submit empty and whitespace-only text; neither creates a task; whitespace case explains the validation message.
5. Add multiple items, check and uncheck a specific item's checkbox; visible completed appearance toggles correctly.
6. Delete the middle of three tasks; only that task disappears.
7. Delete all tasks; the empty-state message returns.
8. Add `<b>Test</b>`; page shows literal text, not formatted markup.
9. At ~375 CSS px and desktop width, no horizontal overflow or inaccessible controls; label/focus and keyboard behavior are usable.
10. After refresh, tasks disappear **by design**, and learner can explain why.
11. README states how to run, features, three manual tests, known reload limitation and one learning takeaway.
12. At least two named local Git commits; `git log` was inspected; no secrets were committed.
13. A five-line debugging record from L10 exists (can be a section in README).
14. Learner provides a brief explanation of the submit → trim → DOM insertion sequence and why `textContent` is used.

Evidence: checked items, three concise optional text fields (test note, bug explained, code explanation), completion time; mark explicitly **student attestation**. Do **not** require uploading files, screenshots, video or project ZIP to a server. The app cannot confirm the local project was actually tested.

**L12-c03 — Independent micro-challenge**

Choose **one** task on a copy of the local project: (A) recreate trimmed add-task submit handling, (B) recreate checkbox `change` behavior and completed appearance, or (C) diagnose a mismatched DOM selector and verify correction. Documentation may be used; **no AI assistance for this particular diagnostic**. Learner records selection, what changed, how they tested, and a brief event/data/DOM explanation. This is self-attested, not proctored. Optional owner/family mentor can review, but the platform remains usable without a mentor.

## F. Optional enrichment, never blocking

- `p1-w01-l01-c02`: install/configure editor and Git if needed; try official MDN guide; copy an AI hint-only prompt. These are orientation aids, not a scored gate.
- `p1-w01-l11-c03`: optionally use free AI tutoring on one function or CSS snippet and write a three-line Prompt → Decision → Verification log. No AI account, usage quota, network connection or paid subscription may be required for any mandatory checkpoint.

## G. Cross-check and decision flags

- **Original C13 75/100 tutor rubric:** useful as optional coaching feedback only; **not** an alternative unlock path. Approved DEC-21 requires all mandatory checkpoints plus weekly project and readiness quiz.
- **CSS geometry runner:** L05 auto-graded status remains a D4 feasibility risk; owner review needed if a truthful/stable auto-check is impossible.
- **Accessibility:** browser auto-check can verify semantics, focusability and some geometry. Full visual usability requires manual testing, explicitly part of local project attestation.
- **Question bank:** seven quizzes must be authored and reviewed, with equivalent retry variants. A sample item list is not a validated question bank.
- **Progress records:** version and stable IDs required. `unlocked` flags cannot be trusted on import; recompute from mandatory passes.
- **Publication:** no complete instructor reference or original answer key should be copied into public site assets or repository content intended for open-source publishing.

**No Week 1 lesson or gate has been implemented or tested by this document.** Formal owner D0 signoff and D1 approval remain pending.
