# Week 4 Independent Learner Pilot — Planned D5 Curriculum Integration

**Human pilot pending.** The owner approved the Week 4 educational structure under A-005 and accepted Week 3 engineering. The [Week 4 engineering review](D5_WEEK04_REVIEW.md) records the implementation and automated and local browser checks. This protocol is for a consenting human learner; the Week 1 human pilot is also pending.

## 1. Research question

Can a student who genuinely mastered Week 3 independently understand an async external data boundary, diagnose HTTP errors, use safe JSON normalization, and import an external idea without losing local tasks—using no paid agent or backend? A successful learner distinguishes *network response* from *local persistent state* and is not blocked by a public API outage.

## 2. Pilot setup and honest evidence

- Recruit at least one consenting recent Week 3 graduate and, where feasible, a second student returning after a break. These small trials discover problems; they do not establish general learning outcomes.
- Only provide completed Week 3 student project or Week 4 **starter**. Never expose completed `reference-solution/`, instructor C21 answer key or C23 code to the learner.
- Test in a current desktop browser, with localhost HTTP file serving, DevTools and a controlled disposable task dataset. Use fake names/tasks and no secrets, personal records or API credentials.
- Make the core lesson playable without internet by bundling `OFFLINE_IDEAS` and fake fetch responses. A live GET may be an optional demonstration when available.
- Observer notes when outside help was necessary; external AI support is optional but must not be required to pass. Independent transfer is no-AI self-attestation, not proctored certification.

## 3. Observed learner scenarios

| Step | Student action | What to observe |
|---|---|---|
| A | Finish Week 3 and open L01; try Week 5 deep link | Week 4 starts unlocked; Week 5 stays locked |
| B | Predict simple Promise logs, run isolated trace | Immediate/deferred ordering explained, no timing flakiness |
| C | Repair a Promise chain, rewrite with await | Returned Promise is awaited; catch/finally correct |
| D | Label request method, URL, status/response | 404 response distinguished from offline rejection |
| E | Map CRUD to REST; explain JSONPlaceholder | Learner knows fake write is not durable data |
| F | Normalize malformed remote fixture | Non-array rejected, duplicates/invalid records skipped |
| G | Fake fetch successful 200 vs fake HTTP 503 | 503 produces useful error, 200 decoded and normalized |
| H | Network/Console diagnostic locally | URL/status/response and offline case investigated |
| I | Resolve to success `[]` then rejected load | Empty UI differs from error; Load becomes available again |
| J | Choose optional L10 or skip to L11 | Optional cancellation never blocks learning progression |
| K | Load offline sample and Copy idea | Local tasks unchanged until Copy; fresh ID, same-origin persistence |
| L | Render markup-looking idea title in sandbox | Text remains literal, no injected DOM element |
| M | Run local `tests.html` regression/async tests | Learner reports real observed results, not Fieldbook auto-claim |
| N | Perform no-AI transfer: fix unseen 503/ID/loading bug | Root cause and before/after test explanation |
| O | Hit quiz 80% but miss essential; retry | Essential still required; specific feedback and alternate item |
| P | Reset, backup/export, return and keyboard navigate | Dependencies recomputed; no silent loss; usable status messages |

## 4. Pre-pilot technical gate (must be checked, not presumed)

- [ ] **9 required quiz groups / 50 reviewed scored items**, plus equivalent retries and essentials validated.
- [ ] **8 browser-code suites** execute in actual D4-reviewed sandbox with fake requests, asynchronous outcome control and positive/negative cases.
- [ ] Browser and lesson code cannot access Fieldbook's progress origin, actual external network, private keys or host DOM.
- [ ] **4 local self-verification gates** contain specific setup/test commands and honest evidence labels; `tests.html` run locally in course example, not magically inspected by academy.
- [ ] All mandatory project features work with offline fixture and simulated 404/503, invalid JSON, rejected network and empty 200.
- [ ] `study-tasks-week2` schema preserved, imported tasks receive fresh IDs; existing Week 3 task functions regressions passed.
- [ ] 12 lesson slots with L10 optional and no mandatory dependency; required unlock path and reset/retry tests pass.
- [ ] Source answer key and full `reference-solution/` files excluded from public student bundle.
- [ ] Keyboard status announcements/readability and mobile reading checked; desktop required for substantial local coding.
- [ ] Test results report exact actual commands, machine/browser and outcome; no unrun tests described as passing.

## 5. Transfer challenge options

Give the learner one previously unseen variant with no AI for the diagnostic (docs/DevTools allowed): (1) HTTP 503 resolves fetch but app displays Success; (2) importing remote ID 9 overwrites local task ID 9; (3) spinner remains after injected network failure. Learner must describe symptom, cause, fix and regression evidence. The app receives a **self-verified locally** report; observer may record what they independently witnessed but this is not a credential.

## 6. Evaluation and follow-up protocol

Record: clarity of Promise/HTTP mental model; number of skipped prerequisites; incorrect quiz explanations; async runner false positives; ability to recover offline; any loss of local task data; accessibility/focus; confusion between hosted learning platform and local task app. Mark each confusion as content, runner, UX, or external service issue, and fix the underlying problem before pilot acceptance.

**Pilot exit criteria:** no false-positive automatic pass, no student reference-solution leak, reliable offline assessed path, demonstrated local task preservation, independent debugging transfer, accurate status labels and accessible navigation. **Owner acceptance at D5** is separate from Week 4 D0 structure approval and does not authorize D6 by itself.

```text
Anonymous participant ID / consent:
Date, browser, project origin, academy content version:
Week 3 prerequisite verification:
Required lesson/checkpoint IDs completed:
Quiz scores / essential question retries:
Actual sandbox test pass/fail results:
Local project reports (learner attestation):
Offline API fallback and live-service status (if used):
No-AI transfer outcome and explanation:
Observations / interventions / accessibility issues:
Fix list, retest evidence, final pilot review:
Owner D5 Week 4 pilot status: NOT STARTED / NEEDS REVISION / ACCEPTED
```

**D0 documentation does not constitute running this pilot.**
