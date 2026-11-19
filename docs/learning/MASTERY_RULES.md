# Learning Progression and Mastery Rules — v0.2 (DEC-21 Policy Approved)

**Status:** The overarching DEC-21 assessment policy is **AGREED** (2026-11-16). The per-lesson checkpoint inventory is **still pending D0 curriculum audit**; D0, D1, and D2 are not approved by this document.

## Central promise

A learner progresses by **demonstrated work**, not by scrolling, time spent, or clicking Continue. They can always review completed content, see prerequisites, and retry failed checks without penalty. Locks are educational pacing aids; they are **not tamper-resistant security controls** on an entirely local app.

## Hierarchy

`Phase 1 course -> 12 weeks -> modules (optional grouping) -> lessons -> blocks -> checkpoints`.

Week 1 opens with all 12 lessons available for reading in order. Learners may defer or retry end-of-lesson quizzes and keep reading. Week 2 requires all mandatory Week 1 evidence, including quizzes, browser checks, the project and readiness assessment. Within Weeks 2–12, the prerequisite index determines lesson access.

## Proposed states

- **locked:** at least one mandatory prerequisite not passed.
- **available:** prerequisites met; lesson not yet opened.
- **in-progress:** opened/attempted; unmet required checkpoint remains.
- **completed-auto:** all required checkpoints verified by deterministic browser checks.
- **completed-self-verified:** external tests/acceptance evidence acknowledged by learner; never label this “automatically tested.”
- **needs-review:** optional prompt from repeated low-confidence results; does not invent a new punitive lock if mastery is already satisfied.

The UI can simplify these to Locked / Ready / In progress / Completed with a visible verification method.

## DEC-21 — Approved verification methods

Each checkpoint is classified as exactly one of the following types. A lesson may contain multiple required checkpoints; optional enrichment must never affect a lock.

| Method | Evidence and passing rule | Student-facing label |
|---|---|---|
| `quiz-auto` | At least **80%** of scored required questions correct (round up), **and every essential question correct** | Passed automatically |
| `browser-code-auto` | **All mandatory behavior-based functional checks pass** in the isolated browser execution environment; optional tests do not block | Passed automatically |
| `local-project-self-verified` | Learner runs **real local commands/tests**, confirms every required acceptance item, and records bounded, non-sensitive evidence; browser **cannot** verify the external project | Self-verified locally |
| `optional-enrichment` | Practice, extra challenges, AI exercises and reading; **never mandatory** | Optional practice |

HTML/CSS browser tasks can auto-check objectively testable structure/behavior, but visual quality, design judgment and subjective accessibility review require explicit manual criteria. Debugging exercises use a reliable automatic behavioral/scenario check if available; otherwise require a local-project verification or scored conceptual checkpoint, clearly labeled.

**Approved boundaries:** Viewing a page, scrolling, time spent, copying code, or checking a lone generic “done” box is not mastery. External AI tools and paid services must never be required to pass. Course progress is educational and locally editable, not a remotely authenticated credential.

## Required per-checkpoint definition (D0 audit)

Before a lesson's assessment can be authored or released, record: **stable checkpoint ID**, linked learning outcome, source reference, verification method, required/optional flag, prerequisite dependency, precise passing criteria, essential-question flag if relevant, input/edge cases, expected feedback, retry strategy, and what evidence is retained locally. Do not infer unlock rules from display order or titles. This *inventory work remains unchecked*, despite policy approval.

## Default lessons

- A simple content-only orientation can be cleared by an active acknowledgment plus one comprehension check (where appropriate); not merely a scroll event.
- Concept lesson: require passed question set and essential question(s), if any.
- Browser coding lesson: require deterministic cases and any explicit short reflection question; edit/read engagement alone is insufficient.
- Debugging lesson: require identified root cause + observed correction or scored equivalent.
- Local project lesson: learner runs tests on their own system and records a brief evidence checklist; completion is **self-verified**.

## Approved quiz pass policy (DEC-12 and DEC-21)

- Passing score: **ceil(0.8 × scored required question count)** (example: 4 of 5, or 5 of 6). Do not include unscored practice in the denominator.
- Every explicitly marked **essential question must be correct**, even if aggregate score already meets 80%. Use essential checks sparingly and only for critical skills or safety.
- Unlimited retries. Provide specific feedback after each attempt, with a hint ladder and lesson links.
- For retry, ideally use a reviewed bank of equivalent items rather than showing the exact same answer until guessed. When bank is small, reinforce with a new applied question or explanation.
- A high score on a trivial/poorly constructed quiz is not proof of understanding; the Week 1 pilot must validate real learning.

## Prerequisite example

- `p1-w01-l09` DOM task interactions requires `p1-w01-l08` DOM selection.
- `p1-w02-l08` localStorage requires the Week 2 state lessons.
- `p1-w07-l03` first Express app requires Node/npm basics.
- `p1-w09-l12` weekly database proof requires schema/query/repository checkpoints.

Detailed prerequisite edges must be validated in D0 and stored as data, not inferred from lesson titles or display order. At minimum use linear progress within each week; allow optional side branches for review content.

## Required local-project self-verification

For a local React, Node.js, Express, PostgreSQL or integrated project, provide reproducible setup commands, test commands, expected output, a list of required acceptance items and troubleshooting notes. Completion requires the learner to explicitly confirm having **run** the tests and checked the items, with a concise optional or required bounded note when justified (for example test count, observed result, or a short explanation of one failure/fix). Treat all entries as **learner attestations**; do not relabel them as automatic verification. Never collect secrets, real passwords, connection strings, or raw private logs. Backend/auth examples use fictional identities and safe test data.

For a mixed lesson/week, if any required checkpoint is self-verified, the completion summary must say **“includes self-verified work”**, not falsely imply that the entire week was automatically tested.

## Week graduation

Required: **all mandatory lesson gates + the required multi-topic weekly practical project + the weekly readiness assessment**. The readiness quiz follows the same 80%-plus-essential-checks rule; the practical project is auto-checked only where actually executable, otherwise self-verified. Show:
- Verified automatically: quiz/browser exercise results, if any.
- Self-verified: local project acceptance steps and test log completed by learner.
- Needs work: incomplete/failed requirements with direct links.

Do not award a verified technical credential or pretend that self-report establishes correctness. Explain the distinction before Week 7.

## Reset, review and retry — three different actions

1. **Review / retry:** revisit a finished lesson, retry code/quiz attempts without revoking earned completion (unless learner opts to formally reset).
2. **Reset lesson:** clear its mastery and **all downstream dependent lesson/week completions**; preview affected count and request confirmation.
3. **Reset week:** clear that week and all following weeks to maintain prerequisite consistency.
4. **Reset entire course:** clear course progress, settings per explicit selection, bookmarks/notes/drafts according to reset options; confirmation + export suggestion.

Never unexpectedly erase a learner's later work. Show precise consequence before cascading reset. Keep backups user-owned.

## Deep links and navigation

- Locked route must not render protected next lesson as completed or unlock it. Route returns to prerequisite explanation or informative locked view.
- Browser back/forward must preserve correct lock state.
- Resume target is the **last visited available** lesson; if no longer valid after reset/import, choose earliest incomplete eligible.
- Week progress shows *required checkpoints completed / total required checkpoints*. Optional lessons don't reduce percentage.
- Site “course completed” message appears only when all required Phase 1 gates are satisfied.

## Import interactions

- Import backup validates known course/schema/lesson/checkpoint IDs, then recomputes prerequisites. Reject malformed/corrupt/oversized files safely.
- v1 import uses **replace-with-preview**, not an ambiguous silent merge; offer existing backup first.
- Don't trust imported `unlocked` flags; derive allowed state from individual validated checkpoint records.
- If a later course content version changes essential questions, preserve achieved mastery where pedagogically compatible; require explicit migration rule, not automatic data loss.

## No-gameification-by-default policy

No streak penalties, time gating, artificial scarcity, gamified XP for scrolling, or completion shortcuts. Positive feedback, honest progress, and clear mastery evidence are enough. Optional celebrations must respect reduced-motion settings.

## Remaining content-level decisions / audit work

- Specify exact essential-question flags, question-bank sizes, equivalent retries, and versioned reassessment policy during the lesson audit; DEC-21 policy itself is already approved.
- Whether some local project gates require documented screenshot/test log, and how much proof is practical for self-paced users.
- Handling advanced learners who already know a week: v1 default follows linear path; a future “challenge-out” placement test must be rigorously designed before bypassing core foundations.
