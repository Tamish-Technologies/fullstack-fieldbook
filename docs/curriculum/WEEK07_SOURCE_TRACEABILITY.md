# Week 7 Source Traceability — Planning Structure Approved A-008

**Planning structure status:** **OWNER APPROVED A-008** (2026-11-16); this does not mean question banks, tests, local Node/Express integration, source publication or learner pilot passed. Prior draft-status wording, if any, refers only to content authoring/technical review work still pending.


**Original private files:** `fullstack-fieldbook-source-materials/phase1/week-07/instructor-guide-source.md` and `code-starter-and-reference.zip`. Original PDF is also retained privately. **Source inventory:** **27 numbered C## instructor chapters**, **68 ZIP file entries** (**1 top-level `START_HERE.md`, 33 `starter/`, 34 `reference-solution/`**). The maps below are source dispositions for **12 proposed student lessons**, not claims that the complete student lessons have been written. D0 structure received owner approval A-008; real course content and tests are still pending.

## A. Exact source checksums (verify against your local private package)

- `instructor-guide-source.md` SHA-256: `78249ea41f55321587f6bb48c97a4b8d94c488019ba0ef9a4f9f414667dcb83e`
- `code-starter-and-reference.zip` SHA-256: `32fd76013203e0c5d69a7736f7d593403690a26efa946adfd527bff10aa0e9d2`

If the source files differ, do not silently overwrite this blueprint; review and version source corrections first. The original PDFs and instructor reference files are **not** public app assets.

## B. Chapter-by-chapter disposition (C01–C27)

| Chapter | Original instructor heading | Student lesson mapping | Required disposition |
|---|---|---|---|
| C01 | Instructor brief: the Week 7 mission | L01,L12 | Student mission and API architecture; discard instructor session script |
| C02 | Preparation, carry-forward checkpoint and diagnostic | L01,L12 | Carry-forward diagnostic, tool setup and Git checkpoint; adapt for self-pace |
| C03 | Architecture: where the new backend belongs | L01,L11 | Three distinct data owners diagram: browser storage vs Node memory vs external practice API |
| C04 | Lesson A: Node.js as a JavaScript runtime | L01 | Node runtime, browser globals, process/version |
| C05 | Lesson B: create the backend with npm and ESM | L01 | npm/ESM/backend files, local setup and errors |
| C06 | Lesson C: understand HTTP using a raw request/response | L02 | HTTP request/response anatomy and REST status contract |
| C07 | Lesson D: first Express app and health endpoint | L03 | App/health and 404 route order |
| C08 | Lesson E: Express middleware and parsing JSON bodies | L04 | Middleware, JSON body parsing, four-arg error handler |
| C09 | Lesson F: GET collections, query strings and route parameters | L05 | GET collection, query strings, path parameter validation |
| C10 | Lesson G: data layer and stable task IDs | L06 | Pure in-memory task store and monotonic IDs |
| C11 | Lesson H: validate untrusted inputs before using them | L07 | Create/PATCH validation and query/ID parsers |
| C12 | Lesson I: POST creates a task and returns 201 | L08 | POST 201/Location and creation contract |
| C13 | Lesson J: PATCH, DELETE and resource existence | L09 | PATCH/DELETE 204 and found/missing |
| C14 | Lesson K: safe, consistent errors and route order | L03,L04,L09 | Catch-all and JSON error behavior, status and route order |
| C15 | Lesson L: verify your API manually with real HTTP requests | L10,L12 | Manual HTTP client commands, prediction/result worksheet |
| C16 | Lesson M: automated tests with Node's built-in test runner | L10,L12 | Pure `node:test` versus actual HTTP integration tests |
| C17 | Lesson N: connect React to a custom backend, read-only | L11 | React read-only `/server` page, Vite dev proxy and failure state |
| C18 | Lesson O: debugging backend programs systematically | L11,L12 | Layered backend debugging and four deliberate faults |
| C19 | Lesson P: collaborating with AI as a backend engineer | L11,L12 | Safe AI tutor/review prompts and checked agent changes (optional usage) |
| C20 | Session 1: exact 90-minute teaching plan | L01–L05,L12 | Convert timed instructor Session 1 into self-paced steps; do not present as a fixed attendance requirement |
| C21 | Session 2: exact 90-minute teaching plan | L06–L12 | Convert timed instructor Session 2 into steps and project acceptance criteria |
| C22 | Independent practice: 4-6-hour exercise ladder | L08–L12 | Independent practice ladder and transfer task |
| C23 | Debugging labs: reproduce, diagnose, repair, retest | L04,L05,L09–L12 | Debugger lab cases and self-repair before passing |
| C24 | Assessment: oral questions, live tasks and 100-point rubric | L12 | Convert oral assessment and rubric into honest readiness/independent challenge |
| C25 | Instructor answer key and misconception guide | PRIVATE | Instructor answer key stays private; extract misconception seeds only, do not ship solutions |
| C26 | Week 8 handoff and additional free references | L12 | Week 8 full integration preview, free resources optional |
| C27 | Full reference source code: instructor appendix | PRIVATE | Complete reference source appendix, private comparison only; never publish complete solution |

**No orphan chapters:** C01–C27 all have explicit destinations or are deliberately private. In particular, C25 and C27 do **not** become public step-by-step answer keys. C20–C21 are mentor session plans, not mandatory 90-minute course timers. C23 debugging activities are adapted into learner-led exercises with private instructor resolutions. C26 is a Week 8 handoff, not a requirement to integrate React writes in Week 7.

## C. Code archive map and learner/source separation

The source ZIP must be consulted privately during later authoring. The following lists inventory the actual archive paths; **inventorying code does not make it safe to publish as-is**.

### Top-level instructions — 1 file(s)

- `START_HERE.md`

### Student starter — 33 file(s)

- `starter/backend/.gitignore`
- `starter/backend/API_REQUESTS.http`
- `starter/backend/README.md`
- `starter/backend/package.json`
- `starter/backend/src/app.js`
- `starter/backend/src/server.js`
- `starter/backend/src/task-store.js`
- `starter/backend/src/validation.js`
- `starter/backend/tests/api.test.mjs`
- `starter/backend/tests/validation.test.mjs`
- `starter/frontend/.gitignore`
- `starter/frontend/README.md`
- `starter/frontend/index.html`
- `starter/frontend/package.json`
- `starter/frontend/src/App.jsx`
- `starter/frontend/src/components/TaskForm.jsx`
- `starter/frontend/src/components/TaskItem.jsx`
- `starter/frontend/src/components/TaskList.jsx`
- `starter/frontend/src/components/TaskToolbar.jsx`
- `starter/frontend/src/lib/ideas-api.js`
- `starter/frontend/src/lib/sample-ideas.js`
- `starter/frontend/src/lib/storage.js`
- `starter/frontend/src/lib/task-logic.js`
- `starter/frontend/src/main.jsx`
- `starter/frontend/src/pages/DashboardPage.jsx`
- `starter/frontend/src/pages/IdeasPage.jsx`
- `starter/frontend/src/pages/NotFoundPage.jsx`
- `starter/frontend/src/pages/ServerPage.jsx`
- `starter/frontend/src/pages/TasksPage.jsx`
- `starter/frontend/src/styles.css`
- `starter/frontend/tests/ideas-api.test.mjs`
- `starter/frontend/tests/task-logic.test.mjs`
- `starter/frontend/vite.config.js`

### Private reference solution — 34 file(s)

- `reference-solution/.gitignore`
- `reference-solution/backend/.gitignore`
- `reference-solution/backend/API_REQUESTS.http`
- `reference-solution/backend/README.md`
- `reference-solution/backend/package.json`
- `reference-solution/backend/src/app.js`
- `reference-solution/backend/src/server.js`
- `reference-solution/backend/src/task-store.js`
- `reference-solution/backend/src/validation.js`
- `reference-solution/backend/tests/api.test.mjs`
- `reference-solution/backend/tests/validation.test.mjs`
- `reference-solution/frontend/.gitignore`
- `reference-solution/frontend/README.md`
- `reference-solution/frontend/index.html`
- `reference-solution/frontend/package.json`
- `reference-solution/frontend/src/App.jsx`
- `reference-solution/frontend/src/components/TaskForm.jsx`
- `reference-solution/frontend/src/components/TaskItem.jsx`
- `reference-solution/frontend/src/components/TaskList.jsx`
- `reference-solution/frontend/src/components/TaskToolbar.jsx`
- `reference-solution/frontend/src/lib/ideas-api.js`
- `reference-solution/frontend/src/lib/sample-ideas.js`
- `reference-solution/frontend/src/lib/storage.js`
- `reference-solution/frontend/src/lib/task-logic.js`
- `reference-solution/frontend/src/main.jsx`
- `reference-solution/frontend/src/pages/DashboardPage.jsx`
- `reference-solution/frontend/src/pages/IdeasPage.jsx`
- `reference-solution/frontend/src/pages/NotFoundPage.jsx`
- `reference-solution/frontend/src/pages/ServerPage.jsx`
- `reference-solution/frontend/src/pages/TasksPage.jsx`
- `reference-solution/frontend/src/styles.css`
- `reference-solution/frontend/tests/ideas-api.test.mjs`
- `reference-solution/frontend/tests/task-logic.test.mjs`
- `reference-solution/frontend/vite.config.js`


## D. Student learning continuity and platform/source boundaries

- **Carry forward** Week 6 React multi-page application with local task storage and public read-only idea inbox. Do not overwrite the student's own Week 6 Git history with a canned reference.
- **Add** `starter/backend` as a separate local Node/Express program. The `/server` React route (from the supplied frontend compatibility copy) is a **read-only** health/list demonstration. It doesn't replace the `/tasks` browser storage yet.
- **Keep separate:** three task/data owners: browser `localStorage`, server memory, and public sample ideas. `GET /api/tasks` does not read browser tasks automatically.
- **State contract:** backend `title` max **80** trimmed chars; previous React form may allow **100**. This mismatch is intentionally reconciled in **Week 8**, not hidden by changing source/reference data early.
- **Teach** 400/404, 201/Location and 204/no-body; the backend store intentionally resets when the Node process restarts. Week 9 PostgreSQL makes it persistent.
- **Fieldbook** can grade pure task-store/validation functions in a secure browser sandbox; the **local** backend/npm/Express process, actual HTTP requests and React project are self-verified, even though original starter/reference includes API tests.
- **Public content** must never include instructor answer keys, full reference backend source, reference frontend, private grading rationale or raw hidden fixtures. The final distribution/license review is DEC-18.

## E. D7 authoring review actions

- [ ] Validate the source ZIP against checksums and inspect `starter/backend` TODOs before authoring exact student implementation instructions.
- [ ] Recheck Express/Node versions and CLI specifics against official docs at the moment of implementation.
- [ ] Complete all 66 proposed quiz items with rationale and alternative retries; obtain education/technical approval.
- [ ] Design and security-review the two **pure JS** sandbox suites, without dependency/network/API claims.
- [ ] Produce and locally verify step-by-step backend and frontend lab commands; document cross-platform terminal differences.
- [ ] Conduct the D7 learner pilot and record actual student errors, blockers and fixes before publishing Week 7.

**Status: source mapping done for a D0 proposal; assessment and implementation signoff pending.**