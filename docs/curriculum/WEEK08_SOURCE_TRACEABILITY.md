# Week 8 Source Traceability — Exact C01–C32 Chapter Audit

**Source inspected:** original Phase 1 Week 8 instructor Markdown and companion code ZIP from the private source-materials folder.  
**Markdown SHA-256:** `61cbf467e5adf9dc806f14c66f4fa0c3ad10cce2531c283b2863f2fecc24ac3a`  
**Code ZIP SHA-256:** `e30a4a18aef3a0f535c3cf901eaeb4f1c1626bc73d0df7051c9f48c1bbd86634`  
**ZIP integrity:** valid; **77 file entries** = 37 learner starter + 38 private instructor reference + 2 top-level readme/notes.  
**Owner status:** **D0 structural plan accepted A-009.** This is a **source inventory**, not a live student test.

## Chapter-by-chapter disposition

| Chapter | Original title | Decision and student destination |
|---|---|---|

| C01 | Instructor mission: Week 8 makes the application full stack | **Onboard/learning outcome** → L01,L11 |
| C02 | Preparation, continuity checklist and eight-minute diagnostic | **Diagnostic, prerequisite/setup** → L01 |
| C03 | Project requirements and the Week 8 definition of done | **Full stack definition of done** → L01,L11 |
| C04 | Architecture before and after integration | **Two-process mental model** → L01 |
| C05 | Teach the API contract before writing React code | **API contract** → L01,L03,L05–L07 |
| C06 | Set up two running programs and locate every file | **Run two applications/setup** → L01,L02 |
| C07 | Explain same origin, CORS and the Vite development proxy | **Origins and proxy** → L02 |
| C08 | Use DevTools to trace one complete request | **DevTools Network inspection** → L02,L09 |
| C09 | State ownership: browser snapshot versus authoritative server | **State ownership** → L01,L04 |
| C10 | Build a small API service, not fetch calls scattered everywhere | **Reusable fetch client** → L03 |
| C11 | Handle HTTP errors, network failures and successful 204 correctly | **Fetch errors, 204, bad JSON** → L03,L07,L09 |
| C12 | GET tasks with React useEffect and explicit UI states | **GET loading/empty/error** → L04 |
| C13 | POST: create a task only after the server confirms it | **POST create, preserve draft** → L05 |
| C14 | PATCH: completion should use the task's current server-backed value | **PATCH toggle** → L06 |
| C15 | PATCH: rename, preserve the draft and handle validation | **PATCH rename, validate** → L06 |
| C16 | DELETE: 204, no JSON body and correct state changes | **DELETE 204 and status** → L07 |
| C17 | Pending UI, accidental duplicates and basic race conditions | **Concurrency/duplicate prevention** → L05,L08 |
| C18 | Keep Dashboard, Ideas and routes consistent with server data | **Dashboard/Ideas continuity** → L08,L11 |
| C19 | Effects, cleanup and the difference between loading and mutating | **Effect cleanup** → L04,L08 |
| C20 | Automated tests: mock fetch instead of needing a running API | **Mock-fetch unit tests** → L03,L07,L09 |
| C21 | Manual end-to-end testing: observe the actual browser and server | **Actual local end-to-end** → L09,L11 |
| C22 | Reliability, input safety and accessibility fundamentals | **Error, accessibility, safety** → L06,L08,L09,L10 |
| C23 | Learn to use AI as a teammate, not as the hidden author | **AI collaboration** → L10 (optional usage) |
| C24 | Session 1: precise 90-minute mentor plan | **Instructor session 1** → Adapt as self-paced action sequence L01–L06 |
| C25 | Session 2: precise 90-minute mentor plan | **Instructor session 2** → Adapt as self-paced action sequence L07–L11 |
| C26 | Independent work: 4-6-hour exercise ladder | **Homework ladder** → Spread across L04–L11 |
| C27 | Debugging labs: reproduce, diagnose, fix, retest | **Controlled debugging labs** → L09,L11 |
| C28 | Assessment: oral questions and live coding tasks | **Oral/code checks** → L10,L11 |
| C29 | Grading rubric: 100 points with clear thresholds | **Instructor rubric** → Student readiness criteria L11, private grading notes |
| C30 | Instructor answer key and misconception corrections | **INSTRUCTOR-ONLY ANSWERS** → PRIVATE: no student-facing answer key |
| C31 | Week 9 handoff: prepare for PostgreSQL without teaching it yet | **Week 9 handoff/resources** → L11 + optional official references |
| C32 | Instructor code appendix: the key integration files | **INSTRUCTOR-ONLY CODE APPENDIX** → PRIVATE: complete solution must not ship |

All 32 chapters are accounted for. C30 and C32 are **not** copied into public student content. Instructor session scripts C24/C25, homework C26 and rubric C29 inform self-paced exercises, not mandatory live mentor meetings. C23's AI prompts are non-gating.

## Original code archive: grouped inspection and public-source boundaries

- **Top level:** `START_HERE.md`, `INSTRUCTOR_NOTES.md` (2 entries).
- **Learner starter:** `starter/` (**37 entries**), including frontend React/Vite pages/components, Express backend, `frontend/src/lib/task-api.js` TODO, and unit/HTTP tests.
- **Private solution:** `reference-solution/` (**38 entries**), including `frontend/src/hooks/useServerTasks.js`, completed API client, React integration and reference tests. Do not commit, bundle or publish this source as default student assets.
- **Public lesson source:** Use bounded self-authored snippets, reviewed *student starter* exercises where publication rights allow, and prepared fake-fetch fixtures. Source files remain in sibling private archive during planning.

### Technical file roles inspected (source-relative paths)

| File | Instructive role | D0 handling |
|---|---|---|
| `starter/backend/src/app.js` | Express routes, error envelope, status 204 | Source/contract only; not executed by Academy |
| `starter/backend/src/task-store.js` | Memory-backed persistence boundary | Explain restart limitation; Week 9 DB handoff |
| `starter/backend/src/validation.js` | Server validation and 80-character titles | Student compares frontend form rules |
| `starter/frontend/vite.config.js` | `/api` dev proxy to local backend | Local project self-check |
| `starter/frontend/src/lib/task-api.js` | Incomplete API client and TODOs | Project lab + isolated fake fetch subset |
| `starter/frontend/src/App.jsx` | React Router and task state location | Local React self-check |
| `starter/frontend/src/pages/TasksPage.jsx` | GET/CRUD task UI integration | Local project self-check |
| `starter/frontend/tests/task-api.test.mjs` | Error and API client unit cases | Guide learner to run locally; Academy may separately test safe pure JS equivalents |
| `reference-solution/frontend/src/hooks/useServerTasks.js` | Complete shared React data hook | **Private instructor-only** |
| `reference-solution/frontend/src/lib/task-api.js` | Complete API client | **Private instructor-only** |
| `reference-solution/frontend/tests/task-api.test.mjs` | Instructor regression examples | **Private**, adapt independently reviewed test intentions |

**No platform API:** This is evidence of students building their *own local* frontend/backend. It does not change Fieldbook's frontend-only architecture, privacy promises or deployment constraints.

## Source-specific continuity and risk register

| Potential error | Blueprint safeguard |
|---|---|
| Treat Week 7 React localStorage task list as same as Express store | L01/L04 explicitly teach migration of source of truth; preserve old browser data without silent import/delete |
| Mismatch frontend 100 characters vs backend 80 | L05/L06 local failure tests; server validation always authoritative |
| Parse JSON after 204 and show false error | L07 browser fake-fetch and local DELETE 204 acceptance |
| `fetch` resolves 400, mistaken for success | L03/L09 fake HTTP error checks; Network observation |
| Live API outage blocks mastery | All required browser cases use controlled fake responses; real backend lab self-verified locally, with reproducible setup |
| Untrusted JSON/HTML from wrong proxy is rendered as task | L03/L09 strict envelope and type checks, helpful diagnostic error |
| Duplicate POST on fast clicks or stale request | L08 pending control and effect cleanup; advanced concurrency optional |
| False claim that unit tests verify React/Express integration | Local project attestations and explicit D7 pilot observation, not automatic badge |
| Instructor answer key or full solution exposed publicly | C30/C32 stay in private source; student exercise only where licensed/rewritten |
| Week 8 accidentally teaches database/login | PostgreSQL Week 9, auth Week 10; no app-platform backend |

## Source audit completion vs educational approval

Chapter/file inventory is complete and the source-inspected Week 8 **lesson/checkpoint structure was owner-accepted as A-009**. Final student prose, question banks, isolated code runner implementation, actual Node/npm/React test evidence and learner pilot are **not completed** at D0. Source rights/publication remains deferred under DEC-18.
