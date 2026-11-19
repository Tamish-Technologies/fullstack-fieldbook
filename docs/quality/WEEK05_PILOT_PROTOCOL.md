# Week 5 Independent Learner Pilot — Planned D6 React Integration

**Independent human pilot pending.** The [Week 5 engineering review](D6_WEEK05_REVIEW.md) records the automated course journey and hands-on React project checks. This protocol is reserved for a consenting learner.

## Research question and learner experience

Can a learner who completed Week 4 independently migrate the *UI approach* of Study Tasks to React (JSX, components, props, state and effects) while preserving task data integrity and correctly interpreting local Vite/Node tooling? A good result is not a pretty screenshot; it is an independent explanation of event → callback → parent state → render and a real, locally demonstrated app.

## Pilot prerequisites and participants

- Confirm Week 4 required mastery, including offline fixture, status distinctions and independent debugging; don't use only visit-time or self-reported “watched video.”
- Recruit one consenting novice learner and ideally an additional person who completed the prior four-week curriculum. These trials find serious gaps, not population-wide proof.
- Provide only `starter/` and public learner content; keep `reference-solution/` and C20/C22 private.
- Student machine needs local Node/npm, a code editor, browser and npm dependencies after installation; note any lack of internet/package cache. Use fictional task titles.
- Keep Week 4 origin and saved data untouched. Separate Fieldbook progress origin and React Vite origin. Any optional cross-origin migration uses disposable/test data.

## Scenario matrix

| Scenario | Learner action | What observer records |
|---|---|---|
| A | Graduate Week 4, open React L01; deep-link to locked Week 6 | Week 5 available only after prerequisites; Week 6 locked |
| B | Explain imperative DOM versus React and draw component tree | Identifies owner of tasks and callbacks, not magic DOM replacement |
| C | Run starter in correct directory and fix a broken import | Dev server success/error accurately reported; no hidden paid tool requirement |
| D | Predict and repair JSX fragment, className and conditional rendering | Correct explanations, accessible code reading |
| E | Extract reusable TaskItem and pass props | Lists render, key stable, parent/child role explained |
| F | Explain child callback and forbidden prop mutation | Task ID flows to parent, props not mutated |
| G | Predict two `setCount` updater outcomes, test in React | State snapshot explanation, not immediate assignment |
| H | Complete pure-JS title validator in isolated runner | 100/101-char and blank cases pass; runner has no React or host access |
| I | Make real React controlled task form | Enter and click, error visibility, no page reload |
| J | Complete pure-JS immutable task helper tests | Frozen records unchanged, correct IDs |
| K | Make local React Add/Toggle/Delete and stable key | Reordered/filtered task actions target correct ID |
| L | Test derived active/react/newest view | Results correct; source array unchanged; remaining count accurate |
| M | Add lazy read and storage effect | React-origin reload persists, malformed storage isn't silently erased |
| N | Try optional migration or editing; alternatively skip | Optional work never blocks progression |
| O | Run actual npm test/build and record result | Observer differentiates helper tests from UI/build verification |
| P | Independently debug unseen event/key/storage bug without AI | Reproduced symptom/root cause/fix/test documented |
| Q | Miss essential quiz while meeting 80% aggregate | Remedial feedback and retry, essential still needed |
| R | Retry/review/backup/reset and keyboard navigation | Correct cascading resets, safe confirm, no loss without warning |

## Authoring and technical pre-pilot gate

- [ ] 10 quiz groups / 57 reviewed items with rationale and equivalent retries exist; essential flags validated.
- [ ] 3 browser pure-JS suites pass actual sandbox security/negative-case checks; no JSX/React claims.
- [ ] 9 local self-verification checkpoints give exact steps/expected results and honest status labels, plus independent debugging task.
- [ ] Starter installs/builds on a supported Node/Vite environment; version/command observations recorded, not guessed.
- [ ] Project feature scope excludes required Idea Inbox, routing and TypeScript; optional edit/data migration never block.
- [ ] Task model, 100-char constraint, stable IDs, `study-tasks-week2` storage preserved; separate origins explained.
- [ ] Course's source-only private reference and C20/C22 excluded from release assets.
- [ ] Keyboard focus, screen reader labels, error announcements, 360px reading and large code samples usable.
- [ ] Student can revisit, retry or export/reset progress without corruption or bypassing prerequisites.
- [ ] Observations record actual learning evidence and failures; self-attestation is not represented as automatic environment inspection.

## Transfer challenge (select one unseen variant)

Without AI-generated patch (docs allowed): handler executes during render; controlled input is read-only; toggle mutates a frozen task; index key associates wrong row after sort; React data seems gone because of a different Vite port. Learner writes: reproduction steps, expected/actual, root cause, minimal fix, local verification. Record all claims as **learner self-verification** unless witnessed by observer; never certify externally.

## Review criteria and log

Review where learners ask for help: React mental model, Vite/npm, JSX compiler errors, identifying state owner, data mutation, origin vs storage, and AI-generated diff risk. A no-AI independent transfer is a useful practice signal, not proof of supervised certification.

**Pilot acceptance target:** No false automatic JSX passes; a novice completes required lessons with recoverable feedback; app data safe across filters/reload; real local React project works under observed conditions; question bank measures understanding; optional editing and migration truly optional. A D6 content/pilot signoff is separate from D0 structural approval.

```text
Anonymous pilot ID and consent:
Date / browser / supported Node and npm versions:
Actual React project directory and Vite URL (redact private paths):
Prior Week 4 mastery result:
Lesson/checkpoint attempt record:
Real sandbox JS test result summaries:
Real npm test / npm run build / UI observation:
Local self-attestations vs observer-witnessed actions:
Unseen no-AI bug reproduction/cause/fix:
Quiz essentials/retries and misunderstanding categories:
Screen reader/keyboard/mobile and offline-doc usability:
Privacy and cross-origin storage safety:
Issues, owner fixes, rerun evidence:
Owner D6 Week 5 pilot status: NOT STARTED / NEEDS REVISION / ACCEPTED
```

**This document is a pilot plan; no learner pilot, install, build, or browser trial was conducted to create it.**

**A-006 update:** Week 5 D0 educational structure is owner-approved. The independent learner trial remains open after engineering review.
