# Week 12 learner pilot protocol

Week 12 follows the A-013 capstone baseline. The [engineering review](D8_WEEK12_REVIEW.md) records the fresh-profile checks and a disposable local implementation. The independent human learner pilot and oral self-check remain pending.

## 1. Pilot goal and entry conditions

Test whether a learner who completed Weeks 1–11 can independently plan, deliver, test and explain a secure vertical slice without mentor rescue or forced AI access. Use the actual Week 12 `student-starter` ZIP in a safe local environment. Require known baseline test results, fictional logins and a disposable local `_test` database before any potentially destructive tests. The instructor `reference-solution` stays out of view.

## 2. Minimum pilot tasks

1. Without AI, explain a single Week 11 task mutation through React, Express, session and PostgreSQL.
2. Write a concise CAPSTONE_BRIEF with MVP/non-goals and A01–A10 proof plan.
3. Implement priority and date-only dueDate across migration, backend and React, leaving optional dashboard aside if needed.
4. Run safe test layers and demonstrate A01–A09 with actual observed outcomes, especially A03 vs A04, A05/A06 and Alice/Bob ownership.
5. Perform three debugging-lab analyses, including PATCH omissions or foreign-owner access.
6. Record AI usage if any, demonstrate diff review and reject an unsafe suggestion.
7. Independently answer ten reasoning prompts, give five-minute demo and create an honest RELEASE_REPORT.
8. Complete the final course readiness quiz and self-assessment rubric without claiming third-party verification.

## 3. What observers measure

| Observation | Possible evidence | Warning sign |
|---|---|---|
| Independent reasoning | Student explains requirement/dependencies before writing code | Uses agent to invent the user story without comprehension |
| Migration safety | Preserved data, known DB target, no destructive shortcuts | Wants DROP TABLE as a quick fix |
| API behavior | Valid/invalid data, omitted/null PATCH, real response codes | React UI shows saved while server rejects |
| Owner isolation | Bob denied GET/PATCH/DELETE Alice data, unchanged row | Hiding button treated as authorization |
| Test honesty | Test commands and actual pass/fail/unrun reported | Copy-pasted “all green” without running |
| Debugging | One hypothesis and small experiment at a time | Random large edits |
| AI judgment | Accepted/rejected suggestions with verification | Blind terminal execution or secret disclosure |
| Accessible learning | Instructions understood without mentor explanation | Student blocked by unexplained setup terminology |
| Offline course | Explanations, quiz/fixtures accessible without network | Course cannot load mandatory content offline at D9 |

## 4. Pilot safety and stop conditions

Stop public deployment/claim of readiness on confirmed cross-user access, exposed credentials, destructive migration against non-disposable data or insecure test command. If local test DB name is uncertain, **do not execute destructive tests**. Record a blocker and remediate rather than fabricate success. Optional hosting, AI accounts and visual dashboard cannot be required to pass.

## 5. Feedback form and success criteria

Collect non-sensitive: confusing lesson identifier, clarification requests, time burden, blocker type, number of independently completed requirements, test layers actually run, quiz misconceptions, completion/hold reasons and owner consent on any screenshots. No passwords, DB URLs, cookies or private logs. Reviewer must check that “Passed automatically” is not used for anything run on the learner's computer.

**Exit acceptance:** A new learner can follow the capstone independently; A01–A10 evidence steps are specific and honest; essential owner-isolation safety is correctly explained; the app distinguishes graduation self-attestation from formal credentialing; missing optional features never block. Iterate the lesson until these criteria are demonstrated, not merely expected.

## 6. Review status

- [x] Published teaching examples reviewed against the source and local behavior.
- [x] Student starter commands validated in a disposable environment.
- [x] Required 66 question intents turned into reviewed items.
- [x] Two browser suites tested under isolation controls.
- [x] Local self-verification UI distinguishes Hold from completed evidence.
- [ ] Full pilot with real learner conducted and outcomes documented.
- [ ] Owner reviews pilot and approves Week 12 release content.

**Human pilot status: pending.** Record actual participant observations and any remaining blockers here after the pilot.
