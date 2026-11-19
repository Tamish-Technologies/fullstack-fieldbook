# Week 3 Independent Learner Pilot — Planned D5 Curriculum Integration

**Human pilot pending.** The owner approved the educational structure under A-004, accepted Week 2 and authorized Week 3 engineering. The automated walkthrough and private local project checks are recorded in the [Week 3 engineering review](D5_WEEK03_REVIEW.md). Use the protocol below with a consenting learner to assess comprehension and independent transfer. The Week 1 human pilot also remains pending.

## 1. Purpose and success definition

A learner entering with genuine Week 2 mastery can independently extend a model-driven DOM task app into Study Tasks v3. They should **understand** why data invariants and copied views matter, not only press UI controls. They can explain a module import failure, fix a nested-target event bug, Edit/Cancel correctly, test no-data-loss scenarios, run local browser tests, inspect Git changes and distinguish Fieldbook's verified browser checks from their **self-reported** project results.

## 2. Preparation and consent

- Use only consenting participants; test with at least one recent Week 2 graduate and, if possible, another learner returning after a pause. Note that tiny samples do not demonstrate academy-wide effectiveness.
- Give participant a private/expendable local Week 2 project or allowed **student starter** only. Never include reference-solution ZIP, instructor guide answer key or C21 appendix in student downloads.
- Confirm browser supports keyboard/focus testing and DevTools; local HTTP server available (Live Server, Live Preview or Python if installed); Git optional installation instructions supplied.
- Use fictional task text and no personal secrets. Observer records interventions and confusing content without secretly coaching. External AI tools are optional and never required.
- The published course must communicate that local tests are **learner attested**, even if the observer independently checks them during this pilot.

## 3. Scenario and observation matrix

| Scenario | Participant action | Evidence to record / failure signal |
|---|---|---|
| A — Prerequisite | Complete Week 2 and open L01; attempt Week 4 deep link | Week 3 L01 unlocked; Week 4 still locked |
| B — Pure state | Explain `tasks`, view controls, draft, render; complete L01 code test | Helper does not mutate source; can explain data flow |
| C — Validation | Rename by ID with blank, 100 and 101 characters | Error/valid behavior and original data preserved |
| D — Sort | Sort IDs 12/4/19 oldest/newest | Correct numeric order; source order unchanged |
| E — Module/server | Serve project locally; deliberately break/repair import | Console/Network evidence; no bypass of browser security |
| F — Delegation | Click nested child in Delete, change checkbox after rerender | Correct one-time action on matching ID, no listener duplication |
| G — Edit | Edit/Save, invalid Save, Cancel, Enter/Escape | Original unchanged on Cancel; keyboard/focus works |
| H — Derived view | Search case-insensitively, compose status + order | View correct; hidden source tasks retained; count correct |
| I — Storage/focus | Load malformed/duplicate mock JSON; local keyboard audit | Browser sandbox isolated; local result labeled self-verified |
| J — Debug/test | Seed mutation/index bug; write assertion failing before fix | Learner explains failing invariant and regression test |
| K — Diff/review | Review small Git change and hypothetical AI error | Meaningful review evidence; no paid agent needed |
| L — Local project | Open `tests.html`, run browser suite; refresh | Real local results reported honestly, not Fieldbook-auto-passed |
| M — Independent transfer | No-AI cancel-after-sort regression or nested-click repair | Demonstrates unfamiliar variant and explains decision |
| N — Failed quiz | Hit 80% but miss essential item, retry equivalent | Block until essential answered, specific feedback |
| O — Reset/resume | Refresh, retry, formal reset, import previous progress | No silent loss; dependent unlock recomputed |
| P — Accessibility | Navigate app and exercises by keyboard on narrow viewport | Visible focus, labeled controls, no trapped interaction |

## 4. Technical acceptance BEFORE recruiting learner

- [ ] Eight quiz sets have genuine, peer-reviewed item banks, correct distractors/explanations and equivalent retry variants; essentials vetted.
- [ ] Eight required browser-code suites execute in the **isolated** D4 runner with positive/negative fixtures and error feedback; no arbitrary learner code executes in trusted host.
- [ ] Test fixture for `JSON.parse` never uses course `localStorage` progress and cannot read its parent origin.
- [ ] DOM runner realistically supports nested targets, keyboard/form submissions and focus; any limitation is documented and reviewed rather than faked.
- [ ] Five self-verified local gates include exact commands/acceptance steps and honest interface labels; no fabricated test output.
- [ ] Student downloads include only the four learner files.
- [ ] Real **local** Study Tasks v3 project checks pass on desktop browser with source files/schemas confirmed. Report what was actually tested, not original author claims.
- [ ] Prerequisite graph Week 2→3→4, 11 sequential lessons, optional non-gating, retry/reset/import and progress persistence are covered by UI tests.
- [ ] All required core content and reviewed examples work without paid AI or remote APIs; appropriate offline bundled fixtures available.

## 5. No-AI independent transfer

Offer a new fixture and one task selected randomly from two options. Docs and DevTools are allowed; **do not require proctoring or claim tamper-proof independence**.

- **Option A:** Given a failure where Cancel after sorting saves the edited draft, identify change point, fix, and design a test that catches it.
- **Option B:** Given a delegated event handler using `event.target.dataset.action`, fix handling of a nested `<span>` inside a Delete button and verify correct task ID after reordering.

A passing self-reported activity includes reproducible symptom, root cause, smallest fix, test evidence, and learner explanation. Observer notes actual observations separately from user attestation.

## 6. Learning outcome, accessibility and signoff notes

Record: Did learner explain source/derived view/edit draft clearly? Did they detect destructive mutation? Could they diagnose module and event failures without AI? Was the `file://` vs HTTP explanation understandable? Did quiz feedback support productive retries? Were local-project checks honestly labeled? Could learner return/resume and reset safely?

**Exit criteria:** no critical false-positive code pass or solution leakage; meaningful error feedback; successful independent transfer; acceptable accessibility and recovery; owner reviews observed issues and explicitly accepts D5 Week 3 experience. **This later acceptance is not automatic authorization for D6**.

```text
Anonymous pilot participant ID:
Date / academy build / curriculum content version:
Week 2 prerequisite evidence (no personal details):
Browser / platform / local project origin:
Lessons and checkpoint IDs attempted:
Observed browser runner pass/fail counts:
Self-verified local project checks (learner report):
Independent transfer (actual observer notes):
Misconceptions / missing teaching / interventions:
Keyboard and visual issues:
Reset/import/resume behavior:
Required fixes and retest evidence:
Owner D5 Week 3 pilot acceptance: NOT STARTED / NEEDS REVISION / ACCEPTED
```

**Record human observations here when a consenting learner takes part.**
