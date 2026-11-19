# Week 8 Learner Pilot Protocol — Future D7 Execution (NOT RUN)

**Independent human pilot pending.** The [Week 8 engineering review](D7_WEEK08_REVIEW.md) records the course tests and separate real React–Express walkthrough. Use this protocol with a consenting learner.

## Objective

Test whether a genuine learner who finished the **actual** Week 7 API project can make React tasks communicate with their own Express backend, trace calls in DevTools, recover from failures and explain what remains in memory. The important outcome is correct *reasoning* across layers rather than copying a solution.

## Entry conditions

- Reviewed student lessons/questions are authored under the Week 8 blueprint; 11 quizzes, 3 safe JavaScript browser suites and 10 local self-attestation cards operate as specified (without pretending to control local OS processes).
- Week 7 learner prerequisites satisfied; student has Node LTS/npm, local frontend/backend starter, browser DevTools and Git. Dependencies installed/cached or learner can pause safely until available.
- Safe browser-code runner has completed D4 security review; examples run without network and cannot write Academy progress directly.
- No instructor solution made visible, no participant real credentials or private logs collected.

## Observation route (one full learner session plus optional follow-up)

| Activity | Learner action | Evidence of comprehension / problems to capture |
|---|---|---|
| Onboard + diagnostic | Explain Week 7 browser task store vs in-memory API; draw two-process request flow | Can they distinguish UI state, server state and nonexistent DB? |
| Contract + setup | Run both local servers and verify direct/proxied health | Identify port/proxy problems without random edits |
| API client | Predict fake 200/201/204/400/transport outcomes | Understand error vs success before copying code |
| GET states | Refresh Tasks with server running/stopped and Retry | No false “empty tasks” display on server error |
| POST and PATCH | Create, complete, reopen and rename | Server ID, validation, 80 char and draft preservation |
| DELETE | Fix deliberately broken JSON parse after 204 | Can explain reason and rerun a test |
| Pending and navigation | Double-click and visit `/`, `/tasks`, `/ideas` | No duplicates/contradictory task state |
| Independent debugging | Instructor injects a *new* wrong proxy/error-envelope/stale edit bug | Predict, reproduce, isolate, repair, test without AI answer dump |
| Completion | Run local tests/build, restart backend, show reset and explain Week 9 | Honest evidence and memory persistence boundary |

## Interview questions

1. Which process assigns ID for POST, and how does React get it?
2. Why can browser `fetch()` return successfully while HTTP status is 400?
3. What exactly happens when DELETE is 204?
4. How do you know the UI is reading the Express tasks, not old localStorage tasks?
5. Why does refreshing React not necessarily remove tasks, but restarting Express does?
6. Is CORS an authentication mechanism? Why not?
7. Why are tests using mocked fetch not enough to prove Vite and Express run together?
8. How would you trace a 502 proxy failure differently from an Express 404?

## Misconception and accessibility checks

- Run screen-reader/keyboard route and form navigation, visible focus, labels and error announcements.
- Capture hints opened, wrong-answer patterns, misunderstood terms, setup stumbling points, learner time within a range (not speed as pass criterion), and whether public network access was incorrectly required.
- Test explicit student-facing tags **Passed automatically** vs **Self-verified locally** and the mixed Week 8 summary **Includes self-verified work**.
- Require honest checklist evidence, not an unchecked “Done” skip. Deliberately fail server and observe error/Retry behavior.

## Completion and reporting

The observer logs: worked/failed checkpoints, time spent diagnosing each new bug, dependency failures, surprising error messages, confusing hint feedback, unsafe generated suggestions and requirements requiring clearer explanation. Track proposed revisions by checkpoint ID; changes to an approved assessment gate require owner approval. The pilot is accepted only after actual learner observations and any critical corrections are addressed.

**Pilot execution status:** **NOT STARTED.** No automatic React or HTTP integration test results can be inferred from this planned protocol. Week 8 blueprint structure is owner-approved as A-009. The separate learner observation remains open.
