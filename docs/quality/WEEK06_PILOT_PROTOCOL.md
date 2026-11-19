# Week 6 Independent Learner Pilot — Planned D6 React Hooks, API and Routing

**Independent human pilot pending.** The [Week 6 engineering review](D6_WEEK06_REVIEW.md) records the automated learner journey and separate local React walkthrough. Use this protocol with a consenting learner.

## Pilot research question

Can a learner who completed the Week 5 React task manager understand an Effect's external synchronization, prevent stale requests, handle four honest HTTP UI states, navigate real client URLs and keep **local tasks independent from public sample data**—with enough explanation to fix an unfamiliar failure **without AI-generated answers**?

## Pilot participants and environment

- At least one consenting learner around Phase 1 Week 6 readiness, ideally another fresh learner for independent comparison. Record observations rather than asserting population-level proof.
- Confirm actual Week 5 project and readiness completion; provide only learner lessons and reviewed `starter/`, never `reference-solution/` or private C22/C26.
- Student machine needs browser, editor, recent supported Node/npm and npm packages installed when possible. For mandatory assessment, provide bundled fake-fetch and offline test responses.
- Use fictional study tasks, no real accounts/passwords/secret tokens. Do not collect private paths, detailed logs, or user task content in Academy progress.
- Keep Academy and student app origins isolated. Preserve student task key `study-tasks-week2` but never touch Fieldbook progress data.

## Scenario matrix

| ID | Learner behavior / failure being tested | Observer records |
|---|---|---|
| A | Graduate Week 5 → Week 6 L01 available, direct Week 7 link locked | Correct prerequisites and gate message |
| B | Explain `fetch` resolved HTTP 503 versus network rejection | Correct status/transport distinction |
| C | Normalize non-array, duplicate, bad ID, blank/101-char title, `[]` | Pure JS sandbox feedback plus explanation |
| D | Explain render vs event handler vs Effect; label dependencies | Reasoning without AI-pasted definition |
| E | Open Ideas with network slow; Retry; navigate away | Old response ignored, AbortError not shown as error |
| F | In dev Strict Mode, observe extra setup/cleanup | Understands dev-only check, keeps Strict Mode |
| G | Demonstrate loading, success, empty, error and recovery | Honest UI states and accessible status text |
| H | Turn off network and use bundled offline sample ideas | Exercise remains completable without live endpoint |
| I | Copy one idea twice, open Tasks and check IDs | Two local tasks, no POST of learner data |
| J | Visit `/`, `/tasks`, `/ideas`, `/wrong`, use Back/Forward | Correct pages, wildcard and navigation semantics |
| K | Keyboard Tab/Enter through Links and Retry | Focus and accessible controls work |
| L | Refresh direct `/ideas` on local Vite; discuss host rewrite | No confusion of host 404 vs React 404 |
| M | Move task owner temporarily into a route page, navigate | Learner explains unmount loss then restores App ownership |
| N | Add task then navigate/reload same Vite origin | Persists; port-change origin explained |
| O | Corrupt disposable storage value, open app | Warning, no silent overwrite, recovery explained |
| P | Pass pure JS fake-fetch suite, run local npm tests/build | Observer distinguishes helper checks from React UI |
| Q | Miss essential quiz despite 80% aggregate | Block, targeted review and retry; not punitive |
| R | Attempt optional AI/custom-hook/route-param branch or skip | Optional never blocks Week 7 |
| S | Unseen no-AI race, routing or state bug | Symptom, root cause, minimal fix, observed regression |
| T | Export/reset/revisit, deep-link locked lesson | Correct consequences and preserved review access |

## Pre-pilot gate (all pending)

- [ ] Reviewed **11 quiz groups / 61 questions**, correct rationales, essential flags and equivalent retry items.
- [ ] **2** tested pure-JS suites: normalization and fake-fetch, including negative cases and no network/Academy data access.
- [ ] **10** local self-verification worksheets with test commands, observed UI expected states, security/privacy guardrails and honest status labels.
- [ ] Local starter has been installed, compiled/built and run on supported versions; actual results recorded, not copied from a generated reference.
- [ ] Four routed views, direct refresh, Back/Forward, `NavLink`, task ownership and persistence checked.
- [ ] Race cleanup and AbortError handling checked under slow/out-of-order requests and Strict Mode.
- [ ] Full offline fallback works and public API outage never becomes a grading failure.
- [ ] Private solutions/answer keys excluded; learner-friendly explanations and error messages prepared.
- [ ] Keyboard/mobile 360–375px, focus and status announcements checked.
- [ ] Progress import/reset never accepts bypassed locked checkpoint flags.

## Independent transfer bug (select unseen variant)

Possible variants: fetch during render; missing `response.ok`; stale A response overwrites B; abort appears as visible failure; `NavLink to="/"` missing `end`; Tasks page becomes state owner; remote `api-*` ID copied without new numeric ID; localStorage port mismatch; host deep-link 404 mistaken for React wildcard 404.

The student must reproduce, explain root cause, make the smallest fix and repeat a real local test, **without AI-generated solution** (documentation allowed). Treat any submission as learner attestation unless separately observed.

## Review criteria and results log

- Clearly explain where data lives and which request is current.
- Correct Effect timing/cleanup and confidence in network failure interpretation.
- Correct handling of route mount/unmount and shared state.
- Real React project functioning with offline fallback, not just a mocked screenshot.
- Results distinguish deterministic helper tests from real UI tests and locally self-reported npm commands.
- Accessibility and recovery support novice independent learning.

```text
Pilot ID / consent:
Date, browser and actual Node/npm versions:
Week 5 verified prerequisites:
Lesson/checkpoint attempts (redacted):
Quiz scores, essential misses, equivalent retries:
Isolated JS runner result summaries:
Actual local npm test/build observations (redacted):
React route and network UI observations:
Slow/abort/Strict Mode reproduction:
No-AI unfamiliar bug cause, patch and regression:
Offline/public API outage scenario:
Task-origin/storage safety and keyboard/mobile checks:
Learner feedback, confusing concepts and remediation:
Changes made, rerun evidence and approvals:
Owner D6 Week 6 pilot: NOT STARTED / NEEDS REVISION / ACCEPTED
```

**This is only a pilot protocol. No actual student, local build, browser test, or AI-agent implementation was involved in its preparation.**
