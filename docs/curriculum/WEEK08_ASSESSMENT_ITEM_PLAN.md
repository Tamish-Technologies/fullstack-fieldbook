# Week 8 Assessment Item Plan — Proposed Slots, NOT an Authored Quiz Bank

**Status:** **Owner-approved D0 item-slot plan A-009**, not completed questions. **11 mandatory quiz groups / 66 planned scored question slots**. No final distractors, answers, item variants, essential flags, code test files or learner validation have been created.

The objectives are source-traceable to `WEEK08_LESSON_ASSESSMENT_BLUEPRINT.md`, and the checkpoint IDs are listed in `WEEK08_CHECKPOINT_INVENTORY.md`. Apply DEC-21: 80% correct rounded up **plus all carefully selected essential items**; unlimited retries with meaningful feedback. Do not mechanically mark all items essential.

## Proposed group allocation

| Lesson/checkpoint | Slots | Minimum | Intended question intents | Essential candidate |
|---|---:|---:|---|---|

| `p1-w08-l01-c01` | 5 | 4/5 | Source-of-truth, request flow, React snapshot, memory reset, ID assignment | Backend assigns IDs and React may not fake persistence |
| `p1-w08-l02-c01` | 5 | 4/5 | Origin components, direct/proxied /api, CORS limitations, proxy outages | CORS is not authorization |
| `p1-w08-l03-c01` | 6 | 5/6 | fetch resolution, HTTP 400, non-JSON response, envelope schema, error classification | fetch may resolve on HTTP 400 |
| `p1-w08-l04-c01` | 6 | 5/6 | loading vs empty, retry, cleanup, useEffect dependency discipline, error recovery | Empty array is successful data, not a network failure |
| `p1-w08-l05-c01` | 6 | 5/6 | POST body, 201, backend ID, 80 char, 400 blank, unsaved draft | Backend validates regardless of React |
| `p1-w08-l06-c01` | 6 | 5/6 | PATCH true/false, rename validation, lost draft, 404, response reconciliation | Boolean false must not be ignored |
| `p1-w08-l07-c01` | 5 | 4/5 | 204 empty, .json() failure, confirmation, 400 vs 404, local row retention | Successful DELETE has no JSON body |
| `p1-w08-l08-c01` | 6 | 5/6 | Double-click, pending lock, stale responses, routing, dashboard snapshots, Idea Inbox continuity | Do not invent confirmed mutation before backend response |
| `p1-w08-l09-c01` | 6 | 5/6 | DevTools traces, non-JSON HTML, fake-fetch injection, tests, regression, separation of layers | Mock-fetch unit tests do not prove React routing works |
| `p1-w08-l10-c01` | 5 | 4/5 | Agent scope, Git diffs, old localStorage writes, privacy, test evidence | Accepting AI code without review is not validation |
| `p1-w08-l11-c01` | 10 | 8/10 | 10 mixed transfer questions across GET/POST/PATCH/DELETE/errors/restarter/architecture | Memory reset at Node restart, no database yet |

## Question-writing standards for future authoring

1. Ask about a **specific observation, request, response or bug**, not just a vocabulary definition. Example: “A POST returns 400 yet fetch resolved: what should code do?”
2. Include correct-answer rationale and misconception-based feedback for each distractor; never use “Wrong, try again” as the only feedback.
3. Incorporate request/response bodies (including 201, 204, 400, 404) and Network traces as locally bundled illustrations.
4. Provide equivalent retry variants that change task titles/status values/ports but test the **same** reasoning. Avoid trivial answer memorization.
5. Mark critical essentials only after educator review: server authority, response.ok, 204 no body, authorization/CORS distinction, and in-memory restart are possible candidates, not ratified flags.
6. Include accessible keyboard use, clear screen-reader labels and code blocks that do not depend on color alone.
7. Don't leak private C30 instructor answers or C32 complete reference code into public quiz data or hover hints.
8. Distinguish quiz correctness from ability to run/test the full local project; never substitute quiz scores for the Week 8 capstone.

## Example item blueprints (intent only; not final exam text)

**L01 — source of truth:** Show two tasks, one still in old browser storage and one returned by Express. Ask which record the integrated React view should render and what should happen on Node restart. Wrong-answer feedback should contrast React *rendering snapshot* versus server *authoritative memory*.

**L03 — HTTP failure:** Given a fake `fetch` response `{ok:false,status:400}`, ask whether the promise rejects automatically and how error envelopes should be interpreted. Provide a second case where the request rejects before any HTTP response.

**L05 — create:** Given an 81-character trimmed title and an example 201 response, ask why the API rejects the former and why the React component must use the server's returned ID instead of an array index.

**L07 — 204:** Show a fake successful DELETE and a client that immediately calls `.json()`. Ask why the UI reports failure and which branch should handle 204.

**L08 — pending/race:** Two rapid clicks cause duplicate POSTs. Ask which pending state or ref guard is useful and why “disable during async” needs a race-aware implementation.

**L11 — transfer:** Given a Network trace and a server restart, have student locate which layer needs change for persistence. Expected: backend store/database in Week 9, not merely React state or localStorage.

## Independent and applied prompts

- Include at least two debugging questions requiring diagnosis of a **new** trace, not a repeated screenshot from the lesson.
- Use `p1-w08-l09-c03` to require a real local observed failure/fix and test rerun; a copied AI explanation alone does not pass.
- Use `p1-w08-l10-c02` to require reasoned review of a suggested change, with a manually checked diff and relevant test evidence.
- Future item-bank reviewers should validate reasoning, language clarity and hidden-answer handling before marking `education-reviewed`.

**D0 authoring debt:** 66 slots need actual written/reviewed items, correct and wrong feedback, essential question flags, equivalence/retry variants and QA; no pass rates or question correctness claimed now.
