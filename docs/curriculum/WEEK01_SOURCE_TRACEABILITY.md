# Week 1 Source Traceability and Coverage Disposition

**Status:** detailed Week 1 source dispositions approved as initial planning structure (A-001); actual learner content, checks and educational QA are still pending.  
**Week:** Phase 1 / Week 01. **Source review date:** 2026-11-16.  
**Private originals:** sibling folder `../fullstack-fieldbook-source-materials/phase1/week-01/`. Do **not** copy this folder, its original reference answer key or its ZIP into public application assets.

## 1. Files actually inspected

| Source | Actual filename | Observations |
|---|---|---|
| Instructor guide Markdown | `instructor-guide-source.md` | 16 numbered chapters, with subheads and complete Week 1 explanations/mentor rubric |
| Original instructor guide PDF | `instructor-guide.pdf` | 38 pages in the verified inventory; companion representation of the original lesson guide |
| Starter/reference archive | `code-starter-and-reference.zip` | 8 archive entries: four starter files + four reference-solution files |
| Starter HTML, CSS, JS | `starter/index.html`, `starter/styles.css`, `starter/app.js` *inside ZIP* | Guided TODOs for semantics, responsive CSS and task interactions; no installed dependencies |
| Reference HTML, CSS, JS, README | `reference-solution/index.html`, `reference-solution/styles.css`, `reference-solution/app.js`, `reference-solution/README.md` *inside ZIP* | Working reference behavior and explicit non-persistence limitation; **instructor-only** |

**Content SHA-256 values for cross-workspace verification:**

```text
instructor-guide-source.md  cc36b93c783a684b4fa5b50f754c17904f7c200dad21239a3321bf9a15bc3317
instructor-guide.pdf        b80c0e67b714588a60eca3727ac0476e167449b0c88780e3b3391d2e14673225
code-starter-and-reference.zip 8ce372a3b790a68807d69359ead3835303cfe871babdb337563bd40eda6ff88e
```

> The detailed mapping used the original Markdown and examined individual files inside the ZIP. The existing source inventory provides PDF page count; this audit does not claim a new full visual/layout verification of the PDF.

## 2. Every original numbered chapter: explicit disposition

| Original chapter | Exact chapter role (paraphrased) | Student-facing disposition | Proposed destination | Why |
|---|---|---|---|---|
| **C01** | Instructor mission, outcomes, time, modes, scope | **Adapt selected learner essentials** | L01 + overview + L12 transition | Teaching script and mentor-specific timing stay private; learning promise and limits belong in orientation |
| **C02** | Free setup, four-file project, browser model, Git init | **Convert relevant setup** | L01 + L02 + L11 | Tool prerequisites and local Git are essential; optional GitHub sign-up must not block progress |
| **C03** | Semantic HTML, document skeleton, forms, accessibility | **Convert thoroughly** | L02 + L03 | Main HTML foundations; project examples and tests drawn directly from source |
| **C04** | CSS selectors, box model, Flexbox, media queries | **Convert thoroughly** | L04 + L05 + L12 | One responsive layout milestone; visual QA still needs human review |
| **C05** | JS values, variables, functions, objects/arrays, guard clauses | **Convert thoroughly** | L06 + L07 | Refresh only: array methods/state/storage deferred to later weeks |
| **C06** | DOM selection, events, add/complete/delete/empty state | **Convert thoroughly** | L08 + L09 + L12 | Primary student technical behavior, including literal text and keyboard submit |
| **C07** | Console, Elements, breakpoints, planted bugs, AI debug prompts | **Convert thoroughly** | L10 + L12 | Learner must observe root cause, not guess or rely on AI |
| **C08** | Git working tree, staging, commit, optional remote | **Convert thoroughly** | L11 + L12 | Local commits mandatory for project proof; GitHub remote optional |
| **C09** | AI tutor/review/agent modes, safety and free tiers | **Adapt into lessons** | L01 + L11 + optional AI enrichment | External AI not required; teach bounded review using offline sample diff |
| **C10** | Tutor Session 1 diagnostic script | **Extract student exercises only** | L01 entry self-check + L03/L09 tasks | Instructor sequencing is not student lesson text; diagnostic is ungraded baseline |
| **C11** | Tutor Session 2 code review and finish | **Extract student activities only** | L10 + L11 + L12 | Student-facing challenges and feedback remain; mentor script private |
| **C12** | Homework, milestones, self-check and hand-in | **Convert into practical work** | L05 + L10 + L11 + L12 | Supplies acceptance tests, README and debugging log expectations |
| **C13** | No-AI mini challenge, 100-point rubric, readiness | **Convert gate/optional coaching** | L12 + Week 1 pilot protocol | 75/100 tutor score is **not** a DEC-21 automatic unlock rule; see below |
| **C14** | Question/answer bank and debug examples | **Use as private authoring evidence** | Quiz seeds for L01/L03/L06/L08/L10/L11/L12 | Rewrite for self-learning with feedback/equivalent variants; do not publish instructor answer key verbatim |
| **C15** | Complete reference implementation, teacher copy | **Instructor-only** | Private reference; behavior used by L12 acceptance criteria | Never include full finished solution in public learner bundle by default |
| **C16** | Tutor troubleshooting, official references, Week 2 transition | **Adapt selected help and bridge** | L01/L10 help + L12 readiness and transition | Relevant troubleshooting and scope boundaries retained; instructor-specific notes stay private |

**Coverage conclusion for Week 1:** All C01–C16 now have an explicit proposed disposition, including previously unassigned C15 and C16. This is **coverage planning**, not certification that every student-facing sentence has been authored or educationally validated.

## 3. Reference application behaviors actually confirmed from source code

The private `reference-solution/app.js` uses DOM selectors for `#task-form`, `#task-input`, `#task-list`, `#empty-state`, and `#form-error`. It creates list items, checkbox/label pairs and task-specific Delete buttons. The submit handler prevents default navigation, trims the input, rejects blank/whitespace-only text with feedback, appends literal task text, resets the form and returns focus. Completion toggles `.completed` based on checkbox state; deletion removes only the targeted item, then refreshes the empty state. The reference README explicitly states **refresh clears tasks by design**.

**L12 manual acceptance contract** therefore includes normal add, Enter, spaces-only validation, toggle/undo, delete from a multi-item list, empty message restoration, literal `<b>Test</b>` text, focus and mobile behavior, and reload reset. The learning app **must not** claim that a browser-only Fieldbook page can automatically inspect the student's separate local project folder.

## 4. Important reconciliations and authoring guardrails

1. **Week 1 vs Week 2 storage:** Do not accidentally “enhance” the Week 1 reference with `localStorage`; that is a Week 2 teaching goal.
2. **Instructor rubric vs approved mastery:** C13 suggests a ≥75/100 coaching threshold and a JS/DOM floor. Under DEC-21, the app's unlock gate is **all mandatory checkpoints, the weekly project, and ≥80% readiness quiz plus essential items**. The 100-point rubric can remain a non-gating self-review tool.
3. **No-AI independent challenge vs AI collaboration:** require a short learner-attested independent challenge, but **do not** require external AI use or judge students for not having a paid tool.
4. **Tool prerequisites:** VS Code, Git and browser recommended for local project; no Node/npm/PostgreSQL/API is required for this week; GitHub remote is optional.
5. **Question sourcing:** C14 includes teacher answers, so public student quizzes need separately authored, reviewed wording and misconception feedback. Avoid directly shipping the original answer table.
6. **Accessibility:** label/input association, semantic form/list, keyboard controls and visible focus are core, not polish. Visual layout checks are not fully machine-verifiable.
7. **Browser runner:** L05's geometry-based auto-check is proposed; validate isolated execution, cross-browser stability and measurement feasibility before shipping. Do not silently relabel manual work as auto-verified.
8. **AI-agent neutrality:** Any docs/scripts used in future lesson authoring must work with any competent code editor and respect `AGENTS.md`, not embed Codex-specific assumptions.

## 5. Trace-review work still pending

- [ ] Education reviewer confirms every L01–L12 grouping makes sense to a novice.
- [ ] Technical reviewer validates actual student examples and test fixtures for all 12 lessons.
- [ ] D3 author writes the complete worked explanations, exercises, quiz items, equivalent retry forms and hints.
- [ ] Any corrections to original source errors are documented rather than silently changed.
- [ ] A learner completes the Week 1 trial and reports confusing steps.
- [x] Owner approves this map as the **Week 1 D0 planning structure** (A-001); **not** the whole D0 milestone, student publication or executed checks.

**Week 2 now has a separate source-audited D0 draft awaiting owner approval. Weeks 3–12 retain initial draft maps.**
