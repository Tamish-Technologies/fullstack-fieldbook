# Week 2 Learner Pilot Protocol — Planned for D5

**Current owner direction (2026-11-18).** D4 engineering accepted. The human Week 1 pilot remains pending. D5 is authorized. Stop after Week 2 for owner review before Week 3.

**Status:** proposed, **not conducted**.  
**Week:** Phase 1 / Week 02.  
**Human pilot prerequisite.** Recruit a consenting learner with confirmed Week 1 mastery for this protocol. The owner accepted the D4 engineering trial and authorized Week 2 development while the human pilot remains pending. See the [Week 2 engineering review](D5_WEEK02_REVIEW.md) for automated results.

## 1. What a successful pilot must demonstrate

A learner who completed Week 1 can independently explain why task objects/state are more reliable than DOM-only task lists, then **implement and verify** task persistence, filtering and proper render flow using the supplied student starter. The learner must transfer the model to a novel bug/change, not merely click through exercises.

## 2. Participant and environment setup

- Begin with a consenting learner whose Week 1 knowledge is confirmed through its required gates. Ideally include at least one learner who has recently completed Week 1 and another returning after a pause; do not claim broad effectiveness from a tiny sample.
- Tell participants this is an experimental self-paced learning course, not a professional certification. Use fictional task text, an expendable local project, and no real credentials/private data.
- Use an ordinary browser with DevTools and VS Code; verify local-origin persistence setup. No paid AI, backend, PostgreSQL, React or cloud account.
- Observer does not teach missing concepts, except essential setup help; note each intervention as product feedback. Offer breaks and unlimited retries.

## 3. Learner journey test table

| Scenario | Learner activity | What observer must record |
|---|---|---|
| A — Entry | Resume from completed Week 1 and open Week 2 L01 | Week 1 completion required; correct L01 unlock; no phantom Week 2 progress |
| B — Data | Create task objects and explain stable IDs despite deletion | Can distinguish index and ID with a fresh 3-record example |
| C — Methods | Complete L03 `map/filter/find/reduce` exercise | Actual safe browser tests pass; no loss of input on view filter |
| D — State | Trace event → update → save (where needed) → render | Explains why direct DOM removal is temporary |
| E — Render | Call render twice and compare list child count | No duplicates; correct text/checked state |
| F — CRUD | Add/toggle/delete a non-first ID | Correct record changes even if array position changes |
| G — Safe DOM | Display harmless literal `<b>Plan</b>` input | No markup parsing; keyboard and labels usable |
| H — Storage | Round-trip JSON and handle invalid mock saved data in sandbox | Report test IDs; platform progress storage unaffected |
| I — Local reload | Run/download project and reload after adding/completing/deleting | **Self-verified locally**, not auto-passed by the academy |
| J — Filter | Switch All/Active/Completed, check count, empty cases | Hidden tasks preserved, remaining count always global |
| K — Fail/retry | Miss an essential quiz question but reach 80% | No unlock until essential response correct; constructive feedback |
| L — Debug | Reproduce and repair duplicate render or destructive filter | Observed evidence, root cause, fix and neighboring regression |
| M — Transfer | Independently add completed count or repair filter bug | Explains design, no AI for transfer, proper self-attestation |
| N — Progress | Close/reopen, retry completed, reset with preview | Earned mastery preserved on ordinary retry; reset cascades intentionally |
| O — Accessibility | Navigate quiz/fixtures by keyboard, test visible focus | Controls/announcements work on desktop and narrow screen |

## 4. Required technical acceptance before testing learners

- [ ] All eight Week 2 quiz sets have reviewed question/explanation banks; essential flags approved and tested.
- [ ] All eight required browser-code checks execute safely in the D4 runner with deterministic fixtures/negative cases; no false pass on missing code.
- [ ] Storage mock is isolated from FullStack Fieldbook progress; no learner code can read parent site storage.
- [ ] Week 2 local project starter download does **not** bundle the completed instructor reference or answer keys.
- [ ] Week 2 reference behavior verified locally: refresh persistence, ID restore, safe text, filters/count and malformed storage recovery. Report commands/browser outcomes *actually run*.
- [ ] All three local self-verification checkpoint flows say exactly what learner checked and never claim automatic project inspection.
- [ ] Week 1→Week 2 gate, Week 2 L01→L11 gates, Week 3 lock, reset and import are verified in UI tests.
- [ ] No required step depends on AI APIs, an account or network access after approved offline content is cached.

## 5. Independent transfer activity

Give a fresh three-task fixture (one completed, two active) and a copy of the student's local project. Documentation allowed; **no AI** for this diagnostic. Learner chooses:

- Add “completed tasks” count derived from all state while switching All/Active/Completed; or
- Repair a filter action which mistakenly assigns a filtered view back into source `tasks`.

A valid response includes implementation or specific fixed line(s), expected/observed output, and at least two regression checks. Pilot observer separately verifies the local behavior if accessible; the *production* Fieldbook platform will still label ordinary unsupervised student work self-verified.

## 6. Exit criteria and feedback record

1. Learner can explain ID versus index and state versus DOM in their own words.
2. All functional browser exercises pass with real test evidence; wrong code is not auto-passed.
3. Local project tests are clearly distinguished from automatic tests.
4. Learner completes the transfer task with meaningful explanation, not memorized code.
5. At least one deliberately wrong answer produces useful next-step feedback and an equivalent retry.
6. Filtering never causes data loss; storage failures do not erase Fieldbook progress.
7. Observer records missing explanations, setup friction, keyboard issues and proposed corrections; critical issues are fixed/retested.
8. The owner approves the integrated Week 2 learner experience before it is considered production-ready. This does **not** authorize D6 or other future stages automatically.

### Pilot record template

```text
Anonymous pilot ID:
Date / build / content version:
Week 1 prerequisite evidence (no personal details):
Device / browser / local project origin:
Lessons and checks attempted:
Auto-run test IDs/pass outcomes:
Local project checks learner self-reported:
Transfer task independent outcome:
Confusing concepts or unclear test feedback:
Interventions / accessibility issues:
Progress, reset and resume observations:
Critical issues / fixes / retest results:
Owner pilot signoff: NOT STARTED / NEEDS REVISION / ACCEPTED
```

**This document is a later test protocol, not a report of testing already performed.**
