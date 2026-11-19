# Content Authoring Standard — A Full Lesson, Not a Tutorial Summary

**Assessment authority:** DEC-21 is approved. Follow `docs/learning/MASTERY_RULES.md` and do not invent different thresholds or claim browser verification of local projects. Per-lesson checkpoint mapping remains subject to D0 review.

## Objective

Convert each source topic into a genuinely teachable, self-paced lesson. Instructor guides were created for a mentor; student lessons must not assume that the instructor will fill in missing explanations, observe errors, or provide corrective feedback. **Do not paste the PDF chapter verbatim and call it a lesson.**

## Source-first workflow

1. Open original week's instructor guide Markdown/PDF and relevant starter/reference ZIP.
2. Identify exact source chapters, code examples, independent practice, pitfalls, and instructor-only material.
3. Draft a learner outcome using an observable verb: explain, predict, implement, debug, test, compare.
4. Identify prerequisites already mastered and terms to define in the lesson.
5. Write a concept explanation in plain language with one mental model and one worked example.
6. Add at least one practice prompt with meaningful input/edge cases and constructive feedback.
7. Classify each checkpoint as **`quiz-auto`, `browser-code-auto`, `local-project-self-verified`, or `optional-enrichment`** under DEC-21; document required status, pass rule and evidence.
8. Identify common wrong ideas; write feedback that explains *why* they're wrong, not only “Try again.”
9. Run or inspect all example code against the exact intended environment. Avoid outdated package commands.
10. Review with a beginner and log confusions before approving the lesson.

## Required lesson fields (content model, not app implementation)

- `id`: stable `p1-wNN-lNN` identifier.
- `weekId` and `moduleId`.
- `title`, `shortSummary`, `estimatedMinutes` (not a promise), `difficulty`.
- `prerequisiteLessonIds`: explicit dependencies.
- `sourceRefs`: original week number and chapter numbers; optional original ZIP file/path.
- `learningOutcomes`: 2–5 verifiable statements.
- `glossaryTerms`: defined on first use or linked to glossary.
- `sections`: ordered lesson blocks (see below).
- `requiredCheckpoints`: stable checkpoint/question IDs with mapped outcomes, verification method, required flag, pass criteria, feedback, retry strategy and recorded evidence.
- `optionalExtensions`: supplementary practice without blocking advancement.
- `contentVersion` and `reviewStatus` (`draft`, `tech-reviewed`, `education-reviewed`, `approved`).
- `reviewerNotes`: track what remains unverified.

## Content block types

| Block type | Required content and behavior |
|---|---|
| `explanation` | Clear conceptual narrative, examples and why it matters |
| `analogy` | Short analogy plus its limit; not a replacement for technical precision |
| `worked-example` | Correct, runnable code or explicit pseudocode, with annotated reasoning |
| `output-prediction` | Student predicts first, then checks answer and explanation |
| `try-it` | Bounded interactive change, expected behavior, hints |
| `common-mistake` | Broken code/symptom/root cause/fix with explanation |
| `knowledge-check` | Reviewed questions and expected misconception feedback |
| `debug-lab` | Reproducible bug, progressive hints, acceptance test |
| `local-project-lab` | Prerequisites, files, commands, assertions, and troubleshooting |
| `ai-collaboration` | Safe tutor/review/agent prompt; never prerequisite to pass |
| `summary` | Key takeaways and link to earlier concepts |
| `checkpoint` | Explicit observable mastery requirement |
| `further-reading` | Optional official docs; bundled explanation must stand alone |

## Student-facing lesson sequence

1. **Why you're learning this** — problem or practical motivation (1–2 paragraphs).
2. **What you'll be able to do** — precise goals.
3. **Build the mental model** — explain terms before showing advanced code.
4. **Worked example** — predict → run/show → explain each important line.
5. **Make a small change** — constrained practice using different input or scenario.
6. **Spot an error** — one common misconception/fault.
7. **Check understanding** — questions or code checks aligned with stated outcomes.
8. **Feedback and remedial path** — explanation, hints, prerequisite link.
9. **Consolidate** — short summary and next dependency.

Not every lesson needs every block; a terminal setup lesson needs clear commands, expected outputs and recovery more than an artificial multiple-choice quiz.

## Practical standards by topic

- **HTML/CSS:** use semantic markup, labels, mobile view, clear selectors and a preview. Don't grade by string matching alone; a valid solution can take multiple forms.
- **JavaScript/DOM:** include correct outputs and edge cases (empty input, whitespace, duplicate tasks, invalid values); safe rendering practices.
- **React:** explain state ownership and data flow before showing hooks; complex UI must be run in an actual local React project.
- **HTTP/async:** separate network failure, HTTP error and bad JSON; use deterministic offline fixtures for tests.
- **Node/Express:** use real local project/download with exact setup, request examples and test commands; no fake remote evaluation.
- **PostgreSQL:** explain data relationships, query conditions, migrations and test-database safety; in-browser SQL quizzes assess reasoning, not real database execution.
- **Auth/security:** don't share insecure home-grown production recipes; real ownership tests with fictional identities.
- **Capstone:** student plans, implements, tests and explains; present self-verified work honestly.

## Approved DEC-21 assessment authoring rules

- **Required quizzes:** at least **80%** of scored required questions correct, rounded up, **and all designated essential questions correct**. Give explanations for mistakes and unlimited retries.
- **Required browser coding:** all mandatory behavior-based tests pass. Test outcomes and edge cases, not exact source-code text. Student code must run isolated from the trusted application.
- **Local full-stack projects:** provide actual commands, expected results and acceptance criteria. The learner records bounded evidence and **self-verifies**; the browser does not independently inspect a local backend, database or build.
- **Optional enrichment:** never contributes to mandatory unlocking. AI use is optional; do not require paid or external services.
- **Weekly gate:** required lesson checkpoints, required weekly practical project and weekly readiness assessment must all be satisfied.
- **Completion labels:** display “Passed automatically” only for genuinely auto-checked requirements; use “Self-verified locally” or “Includes self-verified work” for local-project gates.
- **Content mapping:** every checkpoint must have a stable ID, linked objective, original source reference, verification method, required/optional status, passing criteria, essential designation where relevant, feedback, retry strategy, and evidence fields. Exact per-lesson inventories remain D0 work.

## Assessment authoring quality

Every required question must document: question ID, concept/outcome mapping, correct-answer rationale, distractor rationales or common error patterns, review status, retry strategy, and whether the answer can be reliably auto-graded. Build a question bank, not only a single 5-question path. Avoid trick questions and memorize-the-syntax-only tests.

**Example (conceptual, not production content):**

- Prompt: “After filtering the task array, what happens to the original array?”
- Expected: Filtering returns a new array; original array remains unchanged.
- Wrong-answer feedback: “`filter()` selects a new array rather than removing items from the original. Compare it with `splice()`, which mutates.”
- Follow-up: Try both methods in a controlled console example.
- Mastery check: Explain why this matters for rendering an active filter without deleting stored tasks.

## Terminology, pace, readability

- Define terms on first use. Use short chunks but not shallow explanations.
- Approximate single-lesson reading/practice target: 10–25 minutes; larger local project labs explicitly longer.
- Prefer 1–2 thoroughly explained examples over many disconnected snippets.
- Embed recall of relevant earlier concepts to build retention.
- Avoid judging a student by speed. No timed pressure for core course completion.
- A lesson should make sense offline without requiring YouTube or optional external articles.

## Review requirements for publishing a lesson

- [ ] Every technical statement checked against original source and current docs where relevant.
- [ ] At least one working example with expected behavior and explanation.
- [ ] Incorrect-answer feedback is specific and useful.
- [ ] Exercise supports meaningful reasoning, not copying the example exactly.
- [ ] Every required checkpoint ties to a learning outcome, has a DEC-21 verification type, explicit pass criteria and appropriate evidence.
- [ ] Source references and stable IDs are correct.
- [ ] Auto-verification claims accurately describe what ran; local-project self-verification is not presented as automatic.
- [ ] No instructor-only solution inadvertently leaked into lesson preview.
- [ ] Runtime prerequisites/paid dependencies clearly disclosed; local/offline fallback if necessary.
- [ ] Keyboard/reader usability checked.
- [ ] Education reviewer signs off after technical review.
