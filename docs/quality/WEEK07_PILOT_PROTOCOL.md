# Week 7 Learner Pilot Protocol — Future D7 Execution, NOT Run

**Planning structure status:** **OWNER APPROVED A-008** (2026-11-16); this does not mean question banks, tests, local Node/Express integration, source publication or learner pilot passed. Prior draft-status wording, if any, refers only to content authoring/technical review work still pending.


**Independent human pilot pending.** The [Week 7 engineering review](D7_WEEK07_REVIEW.md) records the course walkthrough and the separate local project checks. Use this protocol with a consenting learner.

## Purpose and entry requirements

Determine whether a learner who completed the actual Week 6 React/API/Routing exercises can create and explain a working **local Node/Express API** from guided course instructions without an instructor writing it for them. Evaluate terminal confidence, input validation, status semantics, storage ownership, honest local-project evidence and ability to debug independently. This is not a production security certification.

**Entry conditions:** real Week 6 mastery completed; safe Node LTS/npm available; student has a writable local project folder; VS Code/terminal and free HTTP client; Week 7 approved content and quiz bank are ready; isolated JavaScript runner already passed D4 safety requirements. Backend install needs internet at least once, so provide a no-cost cached/offline alternative or allow pausing until dependencies are available.

## Pilot protocol — phases and observations

| Phase | Learner task | Observe and record |
|---|---|---|
| Onboarding | Describe Week 6 vs Week 7 data storage, install Node, preserve Git checkpoint | Can learner locate backend and avoid destroying existing app? |
| Foundations | Explain Node/global APIs, package scripts, ESM, HTTP request and responses | Can learner predict statuses without prompting? |
| Starter health | Start Express backend and GET health/unknown route | Can learner distinguish reachable 404 from offline network error? |
| Server behavior | Implement GET filters, path IDs, middleware, POST/PATCH/DELETE | Are validation and route-order decisions deliberate? |
| Functional checks | Run pure JS store/validation sandbox suites | Does the learner diagnose failing tests rather than paste answers? |
| Real local checks | Use REST client/terminal; run `npm test` real API suites | Does the learner report actual commands and status/body results honestly? |
| Integration bridge | Start React and Express in separate terminals; use read-only `/server` | Can learner identify browser localStorage versus backend-memory task list? |
| Independent transfer | Introduce a novel defect and require no-AI root cause + regression proof | Can learner fix it without revealing the instructor reference? |
| Final review | Explain request lifecycle and what happens on Node restart | Is Week 8 full CRUD integration appropriately understood as next step? |

## Required failure scenarios

1. Backend not running or wrong port: compare network failure to actual `/api/health` 404.
2. Invalid JSON body: safe JSON 400, not HTML error page or internal stack trace.
3. Wrong `Content-Type`: explain parser behavior and why route body may be absent.
4. `GET /api/tasks?completed=false` returns incorrect results when using `Boolean("false")`.
5. `PATCH {completed:false}` doesn't change true to false due to truthiness.
6. Missing valid task yields 404; invalid path ID yields 400; unknown API route yields separate JSON 404.
7. Delete returns 204 with **empty** body; client attempting JSON parse fails.
8. Task IDs repeat after deletion if array length is incorrectly reused.
9. Route order causes a valid POST to receive catch-all 404.
10. Restart Node: backend memory empties, while React browser task list remains untouched.
11. Vite development proxy misconfigured; inspect both ports and request paths, not broad unrestricted CORS.
12. npm installation temporarily offline: learner can continue offline theory/browser pure functions, but cannot honestly self-verify backend graduation yet.

## DEC-21 evidence and completion rules

- Twelve quizzes follow 80%-plus-essential policy; mandatory two isolated JS suites must pass every required behavior test.
- Ten local-project checkpoints are **learner-reported** with bounded evidence, not automatically graded or witnessed by Fieldbook. The pilot observer may separately see them, but product labels remain honest.
- `L12-C01` integrated API project and `L12-C03` independent bug diagnosis cannot be replaced with a single generic Done tick or a copied assistant answer.
- Review and retry a completed lesson does not revoke previous mastery; formal resets display downstream consequences.
- No real personal data, raw credentials, user session tokens, or full private test logs are collected. Keep pilot observations anonymized with consent.
- Optional external AI prompts must never become a paid or required prerequisite.

## Minimum educational-quality acceptance

- Learner demonstrates at least one real POST 201/Location, PATCH false update, DELETE 204 empty body, GET filter and invalid-input 400/404 case.
- Learner can describe the Express request lifecycle, debug a broken handler, and explain why Node memory is temporary.
- Actual local test output is observed/reported with version and environment; any missing backend checks are explicitly marked incomplete rather than falsely passed.
- The student can use the read-only React API Lab without thinking it replaced browser `localStorage` CRUD.
- Critical instructions work for supported Node/npm and are clear for common Windows/macOS/Linux setups; interactive lesson UI remains accessible on mobile although real coding needs a laptop/desktop.
- Misconception and retry feedback enable progress without live tutor intervention or perfect network availability.

## Pilot notes template (fill only after real execution)

```text
Pilot ID (consent, anonymized):
Date / environment / actual Node & npm versions:
Week 6 actual prerequisites:
Quiz item outcomes and essential misses:
Isolated JS store and validation suite outcomes:
Local npm install/run/test observation (commands/results, redacted):
API status/body evidence: GET, POST, PATCH false, DELETE 204, errors:
Unknown-route/malformed JSON/debugging investigation:
Vite proxy and two-data-store demonstration:
Unfamiliar bug: symptoms -> root cause -> minimal fix -> regression:
Time/effort perception, learning frustrations, suggested improvements:
Accessibility / keyboard / mobile reading observations:
Defects found and course changes made:
Retested after fixes (YES/NO + evidence):
D7 Week 7 owner acceptance: NOT STARTED / NEEDS REVISION / ACCEPTED
```

**This document is a *future test protocol*, not a test report. Do not claim the Week 7 local application passed tests or the learner pilot succeeded based on the existence of this file.**