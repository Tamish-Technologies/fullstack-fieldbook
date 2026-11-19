# Phase 1 / Week 1 — Lesson and Assessment Blueprint

**Product:** FullStack Fieldbook  
**Status:** **Owner-approved D0 educational structure (approval A-001); NOT authored/tested or approved for student publication**  
**Prepared:** 2026-11-16  
**Student week:** 01 of 12 — HTML, CSS, JavaScript, browser tools and safe AI collaboration  
**Project:** Study Tasks v1, a dependency-free HTML/CSS/JavaScript task list  
**Authoritative policy:** `DECISIONS.md` (DEC-12, DEC-13, DEC-14, DEC-17, DEC-21, DEC-23) and `docs/learning/MASTERY_RULES.md`  
**Companion specifications:** `WEEK01_CHECKPOINT_INVENTORY.md`, `WEEK01_SOURCE_TRACEABILITY.md`, `WEEK01_ASSESSMENT_ITEM_PLAN.md`, `docs/quality/WEEK01_PILOT_PROTOCOL.md`

> This is a **content and assessment implementation contract**, not application code and not the finished student-facing text. The original Week 1 guide and starter/reference archive were inspected. Exact quiz wording, equivalent item banks, browser-runner feasibility, accessibility, and learner comprehension still need review during D3–D4. Do not mark D0 or D1 signed off or authorize D2 from this blueprint alone.

## 1. Teaching promise and boundaries

By the end of Week 1 the learner will create a semantic, keyboard-usable, responsive Study Tasks page with plain HTML/CSS/JavaScript. The user can add a task by button or Enter, reject whitespace-only titles, toggle completion, delete a specific task, safely display literal user input, and observe an empty-state message. They can explain their work, use DevTools to fix a fault, make two meaningful local Git commits, and critically review a small AI suggestion **without needing an AI account**.

**Deliberate Week 1 limitation:** All tasks disappear on reload because the page has no persistent storage. Do not add `localStorage`, React, npm, a backend, database, deployed API, authentication, state framework or sophisticated agent automation. Those belong to later curriculum weeks. The *Fieldbook platform* is built using React/Vite eventually; the **learner's Week 1 project** is plain static files and requires no build tool.

**Time budget:** aim for about 7–9 total study hours, corresponding to the original two 90-minute mentored sessions plus ~4–6 hours of practice. For self-paced delivery, use 11 focused lessons (typically 10–25 minutes, varied) and one substantial Week 1 capstone (roughly 90–150 minutes), with the remainder for setup and practice. These are planning estimates, not timed gates; mastery determines progression.

**Learner-facing loop:** Why it matters → mental model → annotated worked example → independent change → common mistake → required checkpoint → explanatory feedback/hints → next unlocked lesson. Do not reveal the complete reference project as the example for the assessment that requires the learner to create it.

## 2. Proposed learning sequence, outcomes and checkpoint matrix

The 12 lesson IDs below **preserve** the IDs in `PROPOSED_LESSON_MAP.md`; no final global lesson count has been approved (DEC-19 remains OPEN).

| Lesson | Primary capability | Source | Mandatory checkpoint(s) | Proposed effort |
|---|---|---|---|---|
| `p1-w01-l01` — Orientation, tools and safe AI learning | Explain browser roles, local Week 1 limits and safe learning workflow | C01, C02, C09 | `...l01-c01` (quiz) | 15–20m |
| `p1-w01-l02` — Semantic HTML and page landmarks | Produce a valid, meaningful document skeleton | C03 | `...l02-c01` (browser HTML) | 15–20m |
| `p1-w01-l03` — Forms, labels and native validation | Produce correctly labeled form and list markup | C03 | `...l03-c01` (browser HTML), `...l03-c02` (quiz) | 20–25m |
| `p1-w01-l04` — CSS selectors, cascade and box model | Explain and apply selectors, padding/margins, `box-sizing` | C04 | `...l04-c01` (browser CSS) | 20–25m |
| `p1-w01-l05` — Responsive layout with Flexbox | Make form usable at narrow and wide sizes | C04 | `...l05-c01` (browser layout checks) | 20–30m |
| `p1-w01-l06` — JavaScript values and variables | Predict JS values, bindings and comparisons | C05 | `...l06-c01` (quiz) | 15–20m |
| `p1-w01-l07` — Functions and conditionals | Implement focused text-cleaning and validation functions | C05 | `...l07-c01` (browser JS tests) | 20–25m |
| `p1-w01-l08` — DOM selection and safe text nodes | Create and append elements with literal user text | C06 | `...l08-c01` (browser DOM), `...l08-c02` (essential quiz) | 20–25m |
| `p1-w01-l09` — Form events and task interactions | Add trimmed tasks on submit without navigation | C06 | `...l09-c01` (browser DOM/event) | 20–30m |
| `p1-w01-l10` — DevTools and evidence-based debugging | Locate, fix and verify a browser issue | C07 | `...l10-c01` (debug quiz), `...l10-c02` (local self-verification) | 20–30m |
| `p1-w01-l11` — Git checkpoints and reviewing AI suggestions | Use local Git and evaluate a suggested diff without paid AI | C02, C08, C09 | `...l11-c01` (Git local self-verification), `...l11-c02` (review quiz) | 25–40m |
| `p1-w01-l12` — Study Tasks v1 project and readiness | Complete, test and explain the integrated app | C06, C10–C14, C16 | `...l12-c01` (project self-verification), `...l12-c02` (readiness quiz), `...l12-c03` (independent micro-challenge self-verification) | 90–150m |

The checkpoint table includes **mandatory and optional activities**, with exact IDs and acceptance conditions in `WEEK01_CHECKPOINT_INVENTORY.md`. An optional external AI practice item under Lesson 11 is explicitly non-gating.

## 3. Detailed teaching and activity design

### L01 — Orientation, tools and safe AI learning (`p1-w01-l01`)

**Prerequisites:** none. **Source:** C01 (purpose, success criteria), C02 (browser/editor/Git setup, file roles), C09 (AI operating modes).

**Outcomes:** W01-O01 explain the distinct jobs of HTML, CSS and JavaScript and what the DOM represents; W01-O02 describe Week 1's no-persistence limitation and distinguish local commit from remote upload; W01-O03 choose whether to attempt, seek a hint, or review a small agent-generated change.

**Student lesson content to author:** Start with a visual browser mental model showing an HTML form, CSS styling and JavaScript adding an `li` without reload. Show the four-file Week 1 workspace: `index.html`, `styles.css`, `app.js`, `README.md`. Provide browser/VS Code/Git setup instructions and an accessible fallback: the Fieldbook reader can be used on mobile, but a desktop/laptop is required for the local project. Explain that GitHub and AI accounts are **not required**.

**Practice:** Identify which file to edit to change the heading, background and submit action; predict whether a task survives reload; distinguish “AI gave me code” from “I tested and understood the change.” Provide a copyable *hint-only* AI prompt as optional enrichment. **Common misconception:** “A browser form needs a backend to show a new task.”

**Gate:** `p1-w01-l01-c01` scored five-item quiz (≥4/5; essential only if designated in reviewed bank). The environment/AI setup checklist `...c02` is optional, not a lock. **Feedback:** if the learner confuses DOM with persistent data, show a DOM-before/after animation and the reload limitation. **Evidence:** score, item-bank revision, timestamp and retry history summary; no personal identity or installed-tool telemetry.

### L02 — Semantic HTML and page landmarks (`p1-w01-l02`)

**Builds on:** L01. **Source:** C03 A1, A3, A4; source archive `starter/index.html`.

**Outcomes:** W01-O04 produce a minimal document using `<!doctype html>`, `html lang`, `meta charset`, viewport, a useful `<title>`, `<main>` and a single `<h1>`; W01-O05 connect a relative stylesheet and deferred script correctly.

**Mental model:** A meaningful HTML tree still works as readable content with CSS and JavaScript removed. Show the source's minimal `Study Tasks` document and explain each line, including how `defer` prevents early selection problems. Do **not** introduce React component markup.

**Practice:** The embedded editor starts with a partial HTML document. Fill in its semantic structure and linked files using a sandbox-friendly path setup. Preview the DOM tree and compare page with styling disabled. **Common mistakes:** duplicate IDs, missing viewport, accidental path mismatch, multiple top-level headings for styling alone.

**Gate:** `...l02-c01` browser HTML checks: correct root structure, language, title, one main landmark containing one top-level heading, viewport, and a working link/script reference in the exercise fixture (allow valid equivalent syntax, not exact text-match). **Feedback:** highlight the missing landmark or broken relative link and explain consequence. **Evidence:** test IDs, pass summary and content revision—not raw HTML copied into the progress record. **Authoring note:** sandbox harness must provide the same relative resources that the student is asked to reference.

### L03 — Forms, labels and native validation (`p1-w01-l03`)

**Builds on:** L02. **Source:** C03 A2–A4; `reference-solution/index.html` for authoritative semantics, not student reveal.

**Outcomes:** W01-O06 connect `label[for]` to unique input ID; W01-O07 use a `form`, a submit button, a section heading and an unordered task list; W01-O08 explain why `required` does not reject spaces-only text and why Delete must use `type="button"`.

**Worked example:** focus the input by clicking its visible label; trigger native form submit using both Enter and Add, while explaining that JS handling comes later. Show `required` with empty text and then spaces. A placeholder is not an accessible label. **Practice:** repair a broken form with mismatched `for` and `id`, make the list an actual `ul`, and give the button its correct type.

**Gates:** `...l03-c01` browser HTML/interaction checks (label click focuses input; form, text input, `name`, submit button, list and heading exist; native empty submission blocks) **and** `...l03-c02` five-question quiz (≥4/5, essential label question). **Feedback:** wrong `for` points to the corresponding input; spaces-only example previews later JS `.trim()` logic. **Evidence:** browser test summary + quiz result.

### L04 — CSS selectors, cascade and box model (`p1-w01-l04`)

**Builds on:** L03. **Source:** C04 B1, B2 and B5; `reference-solution/styles.css` as private authoring reference.

**Outcomes:** W01-O09 distinguish tag/class/ID/pseudo-class selectors and interpret conflicting rules; W01-O10 explain padding, border and margin and apply `box-sizing: border-box`.

**Worked example:** change card padding and inspect the resulting box dimensions, then compare `body`, `.app` and `#task-input` rules. Explain that the cascade also considers specificity and origin, not simply “last wins.” **Practice:** style a centered `.app` card, button hover/focus states, and visible form spacing using a provided preview.

**Gate:** `...l04-c01` browser CSS checks confirm style effect: card width stays within its container, padding creates inner space, `border-box` prevents a test width from expanding beyond its declared box, and a class selector has an observable effect. Do **not** demand exact color or CSS source text. **Feedback:** expose computed dimensions and matched selector info. **Evidence:** pass/fail IDs and version. Full visual appeal is deferred to the Week 1 local project checklist.

### L05 — Responsive layout with Flexbox (`p1-w01-l05`)

**Builds on:** L04. **Source:** C04 B3–B5 and C12 Practice A.

**Outcomes:** W01-O11 use `display:flex`, gap and appropriate flex sizing for a form row; W01-O12 apply a small-screen media query while preventing horizontal overflow and preserving usable controls.

**Worked example:** compare input/button arrangement at approximately 768px and 375px, then change `gap`, `flex:1` and `min-width:0`. Explain why `justify-content` has no effect on a non-flex container. **Practice:** repair a form that overflows at phone width and stacks incorrectly.

**Gate:** `...l05-c01` **proposed browser-code-auto**, based on actual rendered geometry at two controlled iframe sizes—not a required `@media` string. Expected: wide row has usable side-by-side peers; narrow row stacks without horizontal overflow; input and button are visible, focusable and not clipped. Reconfirm manually at Week 1 project gate. **Implementation feasibility flag:** D4 must prove this test is stable in its sandbox and with accessible zoom; if not, propose a documented DEC-21-compatible change to `local-project-self-verified` before publishing. **Feedback:** show which viewport and measurable behavior failed. **Evidence:** tested viewport categories, pass summary and test revision.

### L06 — JavaScript values and variables (`p1-w01-l06`)

**Builds on:** L05. **Source:** C05 C1, C3, C5.

**Outcomes:** W01-O13 predict output from strings, booleans, numbers, arrays and simple objects; W01-O14 distinguish `const` binding reassignment from array-content mutation; W01-O15 understand strict equality and basic falsy empty strings.

**Worked example:** predict `"  Plan  ".trim().length`, `[].length`, `Boolean("")`, and `3 === "3"` *before* running. Use `const tasks=[]; tasks.push(...)` versus illegal reassignment, and a simple object `{title,done}` only as a preview of Week 2 data models. **Practice:** select the predicted value, then run example and explain mismatch.

**Gate:** `...l06-c01` five-question quiz (≥4/5; outcomes covered across numeric/boolean/string/array/object examples). Include at least one explanation item requiring an applied code scenario, not just definitions. **Feedback:** show binding versus content, and strict-equality comparisons. **Evidence:** quiz score, variant and revision. **Boundary:** no array method deep-dive or persistent task model yet.

### L07 — Functions and conditionals (`p1-w01-l07`)

**Builds on:** L06. **Source:** C05 C2, C4, C5.

**Outcomes:** W01-O16 implement a function with parameter, return value and `.trim()`; W01-O17 use an early return or equivalent condition to reject blank/whitespace-only text.

**Worked example:** `cleanTitle("  Finish homework  ")` produces `"Finish homework"`; `isValidTitle("   ")` is false. Explain the difference between logging a value and returning a value. **Practice:** write `cleanTitle` and `isValidTitle` independently using supplied signature requirements, not a pasted solution.

**Gate:** `...l07-c01` isolated JS behavioral checks: `cleanTitle("  Read MDN  ") → "Read MDN"`; `cleanTitle("") → ""`; `cleanTitle(" \t ") → ""`; `isValidTitle("Read") → true`; `isValidTitle("   ") → false`; `isValidTitle("") → false`; function returns must be checked, not just console messages. Avoid imposing a particular control-flow syntax. **Feedback:** show specific input, expected value and observed value. **Evidence:** test summary only.

### L08 — DOM selection and safe text nodes (`p1-w01-l08`)

**Builds on:** L07. **Source:** C06 D1, D2; C14 question and spot-the-issue bank.

**Outcomes:** W01-O18 locate a DOM element with `querySelector`, acknowledging it can return `null`; W01-O19 create an `li`, set literal text safely with `textContent`, and append it to a list.

**Worked example:** trace create → set text → append. Preview `"<b>Read</b>"` as **visible angle-bracket text**, not a bold element; compare this with a deliberately unsafe `innerHTML` pattern only in inert explanatory text. **Practice:** repair a function that incorrectly selects the list, then safely append two user-supplied titles.

**Gates:** `...l08-c01` browser DOM functional tests: correct target list; a new `li` appears, list length updates, literal `<b>Read</b>` and `&` are preserved as text, and no user-provided element markup is created. `...l08-c02` five-question quiz, **essential** question on safe literal user text. **Feedback:** for wrong selector show `null`; for unsafe markup explain text versus parsed HTML without executing real payloads. **Evidence:** test results + quiz score/essential status.

### L09 — Form events and task interactions (`p1-w01-l09`)

**Builds on:** L08. **Source:** C06 D1–D3 and D7; reference `app.js` privately for expected baseline behavior.

**Outcomes:** W01-O20 explain `submit`, `preventDefault()`, `input.value` and event handling; W01-O21 add trimmed, non-empty tasks with both button click and Enter, then clear and focus input.

**Worked example:** submit handler flow: prevent page navigation → read trimmed title → reject blank → create task node → reset and refocus input. Show the difference between button `click` and form `submit`. **Practice:** start with a form whose button is wired incorrectly, implement the submit handler using the previous DOM helper.

**Gate:** `...l09-c01` browser DOM/event checks: click and Enter each add exactly one visible task without navigation; whitespace input adds none and reports helpful feedback; `"  Read CSS  "` becomes `"Read CSS"`; input resets and focus returns after successful add; adding two tasks results in two distinct list items. Control native `required` when testing spaces-only input. **Feedback:** report whether submit fired, whether default was prevented, and the resulting list length. **Evidence:** test IDs and runtime revision. **Boundary:** checkbox/delete/empty-state completeness is integrated in L12 project, rather than silently requiring Week 2 state architecture.

### L10 — DevTools and evidence-based debugging (`p1-w01-l10`)

**Builds on:** L09. **Source:** C07 E1–E4, C12 Practice C, C14 spot-the-issue items.

**Outcomes:** W01-O22 locate a failure using Console, Elements and/or a breakpoint; W01-O23 state symptom, reproduction, observed evidence, root cause, fix and verification.

**Worked example:** a mismatch between `#task-form` and a selected ID yields a null value; reproduce the error, inspect element and Console, correct the selector, confirm button/Enter. Other fixtures: missing `defer`, broken relative stylesheet path, blank submission caused by missing trim. **Practice:** repair one intentionally broken project file locally and record what was observed.

**Gates:** `...l10-c01` five-question **debug reasoning quiz** (≥4/5), plus `...l10-c02` local-project-self-verified debugging record with six labeled parts (symptom, steps, evidence, root cause, fix, confirmation). No automatic claim that DevTools was truly opened. **Feedback:** examples of evidence (“Console says null selector”) versus guesses (“JS is broken”). **Evidence:** structured short text and attestation; cap notes at reasonable length, no raw logs/secrets.

### L11 — Git checkpoints and reviewing AI suggestions (`p1-w01-l11`)

**Builds on:** L10. **Source:** C02 setup/Git, C08 F1–F5, C09 G1–G5.

**Outcomes:** W01-O24 differentiate working tree, staging area, commit and remote push; W01-O25 make and inspect local Git commits; W01-O26 review scope, correctness and test evidence of a small AI suggestion.

**Worked example:** change a heading, run `git diff`, stage only relevant files, inspect `git diff --staged`, commit and inspect `git log --oneline`; explain why a commit is not a GitHub upload. Provide a **bundled mock AI suggestion** (e.g. adds CSS plus changes unrelated JS or uses untrusted `innerHTML`) and have learner identify the scope violation and necessary checks. External AI use is optional.

**Gates:** `...l11-c01` local-project-self-verified Git checklist (run `git status`, `git diff`, `git add`, `git commit`, `git log --oneline`, confirm no secrets); `...l11-c02` five-question quiz (≥4/5) on commit vs push, safe AI review, diff inspection and basic Git actions. Optional `...l11-c03` AI tutor session is **non-gating**, with a three-line prompt/decision/verification log. **Evidence:** bounded commit-message summary / attestations, quiz results; no identity, email, access tokens or full `.git` history uploaded.

### L12 — Week 1 Study Tasks v1 and readiness (`p1-w01-l12`)

**Builds on:** L11. **Source:** C06 D4–D7; C10–C13 teaching/work/project criteria; C14 knowledge checks; C16 readiness and transition. **Authoritative behavior:** original reference archive `reference-solution/README.md` and `app.js`, kept private.

**Outcomes:** W01-O27 implement the complete four-file plain HTML/CSS/JS project; W01-O28 test and explain add, validation, completion, deletion, empty-state, responsiveness and safe text; W01-O29 independently diagnose/modify a small behavior; W01-O30 explain the absence of storage and the reason Week 2 introduces a task data model.

**Project sequence:** (1) start from the original **starter**, not the completed reference, (2) write semantic layout, (3) style responsive form, (4) add and validate tasks, (5) add checkbox `change` behavior and undo, (6) create task-specific delete buttons `type="button"`, (7) keep empty-state message in sync, (8) test keyboard, narrow screen and literal input, (9) document the known reload limitation, (10) commit tested changes. Provide a small checklist and a separate downloadable starter archive during the later implementation phase—**do not bundle the completed instructor reference into the public site**.

**Required checks:**

- `...l12-c01` **local-project-self-verified**: all project acceptance items from the Week 1 checklist must be explicitly confirmed, with local test notes and a short explanation of one bug/decision. There is no automated inspection of learner's local folder.
- `...l12-c02` **quiz-auto**: 10 scored readiness questions, pass ≥8/10 **and all essential questions** (initial essential topics: whitespace validation and safe text rendering, subject to item review).
- `...l12-c03` **local-project-self-verified**: independent, no-AI micro-challenge (recreate the submit handler, make a checkbox toggle, or fix a selector issue) with a brief explanation of event → data → DOM → test. The app records an honest learner attestation, not proctored proof.

**Expected project:** Add tasks via click/Enter; blank/space-only input rejected; checkbox can be checked and unchecked; a selected task can be deleted without deleting siblings; empty message returns when last item is removed; text such as `<b>Test</b>` displays literally; keyboard focus/labels and ~375px layout are usable; tasks disappear on reload by design; meaningful Git history and README are present.

**Coaching rubric:** Original C13 gives a 100-point rubric and suggested ≥75/100 plus ≥15/25 JS/DOM coaching threshold. This remains a **non-gating self-review rubric**; it must **not** silently override the approved DEC-21 pass rules. The self-paced Week 1 unlock depends on the three required L12 checkpoints and all earlier gates. **Feedback:** incomplete checklist points directly to corresponding earlier lessons; readiness quiz explains concept gaps; optional extra practice is encouraged without time pressure.

## 4. Exactly how progression is derived

1. Start at L01. All 12 lessons are available to read in order. Learners may defer quizzes until they have studied the material. Every required checkpoint contributes to the Week 2 gate.
2. A lesson with more than one mandatory checkpoint is complete only after **all** mandatory checkpoints pass; optional items never gate.
3. Scored quizzes use **ceil(0.8 × required scored items)** and all essential items. The initial question distribution is planned in `WEEK01_ASSESSMENT_ITEM_PLAN.md`. Equivalent retry items, reviewed explanations and unlimited retries are required.
4. Browser programming checks must execute in a genuinely isolated environment, report individual expected/observed outcomes and resist accidental false positives. They do not need to be tamper-proof; the course is local self-study, not certification.
5. L10, L11, and L12 self-verified checks are explicitly labeled **“Self-verified locally.”** Successful browser quizzes are labeled **“Passed automatically.”** L12/week summaries must say **“Includes self-verified work.”**
6. Week 2 unlocks only after L01–L12 are complete **and** L12's project, readiness quiz and independent micro-challenge pass; no alternative silent 75/100 cutoff.
7. Review/retry of completed lessons does not revoke mastery. A formal reset previews and cascades through dependent lessons according to `MASTERY_RULES.md` and `LOCAL_PROGRESS_SPEC.md`.
8. If a prerequisite is not met after import/reset, deep links show the missing prerequisite rather than giving access to a locked lesson.

## 5. Student support, accessibility and feedback contract

- **Hints:** Level 1 concept nudge; Level 2 narrow diagnostic; Level 3 partial worked explanation plus a new application question. Avoid showing the full final project before the independent attempt.
- **Quizzes:** Each distractor has an explanatory response tied to the misconception; don't merely say “Incorrect.” If a learner guesses after viewing the answer, give an equivalent application question before awarding mastery when appropriate.
- **Code:** On failure show test description and expected/observed values; never reveal arbitrary hidden evaluator code or run input in the trusted app origin. No fragile source-string checks; accept equivalent solutions.
- **Offline:** All mandatory text, preview fixtures, quiz items and safe code exercises need a bundled/offline path. Optional official-doc or AI links can be external, non-gating and clearly marked.
- **Accessibility:** Native form controls, visible focus, meaningful labels, error announcements, keyboard-operable quiz and sandbox controls, light/dark contrast and reduced motion. Some subjective visual/accessibility checks are manual and self-verified.
- **Privacy:** Do not collect real names, Git email, secrets, raw terminal logs or private source files. Keep notes bounded; progress is local and exportable.

## 6. Authoring and release stages (no coding authorized by this document)

**D0 now:** Week 1 12-lesson/20-checkpoint planning structure is approved as the reference for authoring. Continue source-to-checkpoint audits for Weeks 2–12 and document any future revisions. Essential question wording, safe-runner feasibility and real learner evidence still require implementation/educational review.

**D1 later:** approve lesson reader, code lab, quiz feedback and locked/self-verified states at desktop and mobile widths. This blueprint does not approve the visual design.

**D2 only after approval:** implement generic navigation/progress/locking with fixtures. Do not pre-author all Week 1 tests while app shell is being built.

**D3 (approved DEC-24):** write the 12 student lessons, reviewed answer-feedback banks, source-linked exercises, and safe static/non-scored coding previews; run a **limited content/navigation/quiz usability dry run**. **D4:** implement and security-review the sandboxed browser code runner, verify geometry feasibility, and run the **complete integrated Week 1 mastery pilot**. Never mark unexecuted browser-code checks passed.

## 7. Owner review checklist — structural approval recorded; remaining implementation checks open

- [x] The 12-lesson grouping is accepted as the initial self-paced **planning structure** (A-001); actual pacing still needs learner evidence.
- [ ] Original Week 1 requirements are covered without adding Week 2 persistence or React.
- [ ] Each mandatory checkpoint fairly measures the linked outcome and has a feasible verification mode.
- [ ] Local project and DevTools/Git tasks are honestly self-verified.
- [ ] Essential quiz items are truly essential, not trick questions.
- [ ] The final project remains challenging without revealing the private reference.
- [ ] The mobile, keyboard and AI-optional learning routes are workable.
- [ ] Feasibility of responsive browser-code checks is addressed during D4 and not misrepresented as implemented.
- [ ] Pilot exit criteria are meaningful; review findings will be recorded.
- [x] Owner accepts this **Week 1 D0 blueprint structure** as the authoring baseline; this is NOT D0/D1 signoff or application-implementation authorization.
- [x] D3 content/quiz dry run and D4 integrated mastery pilot sequence approved (DEC-24); **neither has run**.
