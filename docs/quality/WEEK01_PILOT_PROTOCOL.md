# Week 1 Learner Pilot Protocol — FullStack Fieldbook

**Status:** D3 limited dry-run / D4 integrated pilot sequence **approved** (DEC-24). D3 automated walkthrough results are in [the Week 1 review](D3_WEEK01_REVIEW.md). The [D4 engineering trial](D4_WEEK01_REVIEW.md) passed in three browser engines. The human pilot and independent transfer observation remain pending.
**Scope:** Phase 1, Week 1, 12 proposed lessons.  
**Authority:** DEC-21 and the Week 1 blueprint/checkpoint inventory.  
**Purpose:** test whether a learner can *learn and apply* the material without a live tutor, not merely click Next.

## 1. Approved D3/D4 pilot sequencing (DEC-24)

The owner has chosen the **two-step route**: 

- **D3 = content/navigation/quiz usability dry run.** Week 1 explanations, examples, practice descriptions and reviewed quiz feedback should be real, not placeholder. Incomplete code exercises must be explicitly labeled preview/not yet automatically scored. Never award their mandatory `browser-code-auto` checkpoint pass or full Week 1 graduation just because the user viewed a static sample.
- **D4 = full integrated mastery pilot.** First implement/security-review the isolated HTML/CSS/JavaScript execution and behavior test runner. Then test all 12 lessons, essential questions, local self-verification gates, and the Week 1 full route with a learner. Check the proposed L05 responsive-geometry evaluation for feasibility; seek owner approval before changing verification type.

A limited D3 dry-run report is not equivalent to a D4 mastery-pilot signoff. **This approved sequencing is not permission to start D2/D3/D4 implementation.**

## 2. Participants and ethical setup

- Begin with the cousin or one consenting adult learner with a similar HTML/CSS/JS refresher background. If possible, follow with 1–2 additional learners with different levels of comfort.
- Tell participants this is an experimental educational product, not a graded job assessment. Avoid collecting identifying information, precise birth date, private accounts or secrets.
- A mentor may **observe but not teach** during the self-paced trial except to resolve external setup problems. Note any intervention as evidence of a content gap.
- Offer break/review opportunities. Track learning needs, not speed competition. No compulsory AI use; provide documentation offline when available.
- Prior consent before saving any screen recording or notes; anonymize findings. Keep personal trial notes outside public repo.

## 3. Pilot entry checklist

- [ ] D1-approved desktop/mobile screens and accessibility states are available in the review build.
- [ ] All 12 lessons have *real* educational content, not placeholder paragraphs.
- [ ] Question sets, essential flags, misconceptions, feedback and equivalent retry items were reviewed.
- [ ] All activated browser-code checks have actually run in an isolated environment and passed safety QA; D4 dependency resolved.
- [ ] The Week 1 project starter download is accessible; instructor reference is absent from public build assets.
- [ ] Progress, refresh/resume, quiz retry, chapter locks and self-verified labels behave as specified.
- [ ] No lesson requires paid services, AI login or cloud sync.

## 4. Learner tasks and observable evidence

| Scenario | Learner action | What the observer records |
|---|---|---|
| A — Start | Open course, understand Week 1 scope and start L01 | Can find first lesson and explain completion requirements unaided? |
| B — Read | Study L02/L03 form lessons | Can identify label/input relationship and correct wrong markup? |
| C — Code | Complete L07 helpers and L09 submit exercise | Tests pass, learner explains inputs/outputs and a failed case? |
| D — Fail/retry | Deliberately answer one nonessential quiz item incorrectly | Is feedback useful and can learner retry without penalty? |
| E — Essential item | Miss an essential item while reaching aggregate threshold | Does gate remain locked, with clear explanation? |
| F — Progress | Finish checkpoint, refresh, use Resume | Valid result persists and resumes correct available lesson? |
| G — Local practice | Run starter project, reproduce/fix a bug with DevTools | Can describe steps, evidence, cause, fix and verification? |
| H — Ownership | Review Git diff and create a local commit | Can distinguish staging, commit and push? |
| I — Capstone | Build/verify full Study Tasks and explain one feature | Can add/toggle/delete safely, demonstrate known reload limitation? |
| J — Lock | Read all 12 Week 1 lessons while deferring quizzes, then try a Week 2 route | Can the learner continue reading and identify which checks are required before Week 2? |
| K — Safety | Review reset preview and export offer **without destructive reset** | Consequence of reset understood, no unexpected loss? |
| L — Accessibility | Navigate key forms/quizzes using keyboard | Visible focus, announcements and controls work? |

For the D3 **dry run** before the D4 runner, scenarios C/I can be *observed*, but cannot be marked `browser-code-auto` passed; note the limitation. The D4 integrated pilot must cover them with actual safe tests.

## 5. Independent transfer challenge

After completing relevant lessons, give a **fresh** 20–30 minute challenge (documentation permitted, no AI for this one task). Use a copy of the learner's project; choose one based on observed skill:

1. Add a second task via a clean submit handler without page reload, including trim, or
2. Implement checkbox completion toggling for a newly constructed task, or
3. Diagnose and fix a mismatched query selector from Console/Elements evidence.

Ask learner to explain the **event**, the **data value**, the **DOM change**, and **one manual test**. Record the explanation quality, not simply whether the UI happens to look polished. The course's self-verified gate is not proctored; a pilot observer can provide optional stronger evidence of educational effectiveness.

## 6. Suggested qualitative and quantitative signals

- **Learning:** learner can explain HTML/CSS/JS roles, `trim`, `submit/preventDefault`, DOM text safety, and the expected reload limitation using their own words.
- **Transfer:** completes at least one fresh micro-task with only documentation support; if not, document which prerequisite content failed them.
- **Feedback usefulness:** after one wrong answer or broken test, learner identifies *why* it failed and what to try next without a tutor giving the solution.
- **Usability:** navigation/resume, error handling and locked states need no repeated explanation from an observer.
- **Reliability:** no false-passing essential questions, accidental unlocks, data losses on retry, or claims of browser-verified local projects.
- **Accessibility:** keyboard navigation/focus and readable lesson code tested on representative desktop and narrow mobile layouts; substantial coding remains desktop-recommended.
- **Time and friction:** collect actual study time, pauses, blockers, skipped reading, and interruptions as **diagnostic information**, not speed requirements.

Do **not** assert population-level effectiveness from one or two successful users.

## 7. Exit criteria for the Week 1 integrated pilot

1. All documented *critical* quiz/lesson/gating bugs have been fixed and re-tested.
2. Required browser checks genuinely execute, report test IDs, and cannot trivially give false passes for known incorrect submissions; sandbox security has been reviewed.
3. At least one learner completes the intended Week 1 path without an instructor writing code or explaining missing lessons; document every intervention.
4. Learner can demonstrate required Study Tasks behavior and explain a newly posed code/debug task. A learner needing extra practice is not a product failure; missing instructions, opaque feedback, or broken checks are.
5. Essential questions behave correctly: aggregate quiz score alone cannot bypass them.
6. Self-verified tasks are never labeled auto-passed, and participant understands what “self-verified” means.
7. Feedback from observations has a named issue, severity, correction owner and retest outcome.
8. Owner explicitly approves the Week 1 integrated pilot before large-scale conversion of Weeks 2–12.

## 8. Observation record template

```text
Pilot ID (anonymous):
Date/build/content version:
Prior experience (broad, non-identifying):
Device and browser:
Tasks attempted:
Independent challenges completed:
Incorrect-answer / failed-code feedback that helped:
Confusing steps / missing concepts:
Required mentor interventions (what and why):
Unlock/reset/restore observations:
Accessibility issues:
Tests actually executed by the platform:
Local-project actions self-verified by learner:
Critical issues and proposed edits:
Retest results:
Reviewer decision: NEEDS REVISION / LIMITED PILOT ACCEPTED / INTEGRATED WEEK1 PILOT ACCEPTED
Owner signoff (explicit, separate from D0/D1):
```

**Do not mark this protocol “passed” simply because it exists.** No application, tests or learner sessions have been run as part of this D0 writing task.
