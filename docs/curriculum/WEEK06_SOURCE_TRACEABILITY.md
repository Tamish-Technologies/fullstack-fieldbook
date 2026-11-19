# Week 6 Source Traceability and Chapter Disposition — D0 Structure Approved A-007

**Status:** Original Week 6 instructor **Markdown was inspected** (26 numbered C## chapters) together with the 41-entry code ZIP (19 `starter/`, 22 `reference-solution/`). This is a source-to-learning mapping, **not** a finished student lesson, inspected PDF graphics verification, React runtime build or learner pilot. The original PDF remains private reference.  
**Stage:** D6; **proposed plan:** 12 required student lessons, 26 checkpoints (23 required, 3 optional), 11 quiz groups with 61 future question slots.

## A. Exact private source fingerprints

- `../fullstack-fieldbook-source-materials/phase1/week-06/instructor-guide-source.md`: **54,039 bytes**, SHA-256 `05b4c166441e982462b9eb0df1aa53d9026e4f0f670e79aef09efc5076466bde`.
- `../fullstack-fieldbook-source-materials/phase1/week-06/code-starter-and-reference.zip`: **33,838 bytes**, SHA-256 `4c88066e71d0286e896b99dc41b012e4af5ea28b312e3c7afb85d1a0765f477b`.
- `../fullstack-fieldbook-source-materials/phase1/week-06/instructor-guide.pdf`: **412,160 bytes**, SHA-256 `acb379c7183691b23e16fb385d851e99cef1e0431232093644960e87a7f08c31`.

If layout diagrams or important content differ between the source Markdown and PDF, inspect the PDF before republishing; this blueprint does not claim graphical PDF inspection. Code files are educational references and require version/licensing review before public release.

## B. Disposition of all 26 original source chapters

| Instructor chapter | Disposition | Student destination / restriction |
|---|---|---|
| C01 — Instructor brief: the Week 6 mission | Adapt orientation/assessment | L01, L12; problem, targets and limits; instructor text not directly pasted |
| C02 — Preparation, continuity and diagnostic | Adapt setup/diagnostic | L01/L12; Week 5 baseline, Git backup, actual local npm checks |
| C03 — Draw the data-flow model before writing JSX | Teach | L01/L02/L08; render, handler, effect and local-vs-remote state flow |
| C04 — Lesson A: a precise HTTP refresher | Teach | L01; HTTP request/status/JSON review |
| C05 — Lesson B: isolate the API client from React | Teach | L01/L10; isolated API client and injected fetch |
| C06 — Lesson C: treat API JSON as untrusted data | Teach | L01; validate and normalize remote payloads |
| C07 — Lesson D: `useEffect` is synchronization, not a general callback | Teach | L02/L03; effect setup/dependencies/cleanup |
| C08 — Lesson E: `useEffect` plus async/await safely | Teach | L03; async function inside Effect and stale-response guards |
| C09 — Lesson F: the full request Effect with cancellation | Teach | L03; AbortController and active guard implementation |
| C10 — Lesson G: model request UI as four explicit states | Teach | L04; loading/success/empty/error UI states |
| C11 — Lesson H: Retry, deliberate offline mode and safe copying | Teach | L05; retry/offline samples/copy to local tasks |
| C12 — Lesson I: React Router - pages without full document reloads | Teach | L06; BrowserRouter and three routes + wildcard |
| C13 — Lesson J: use `Link` and `NavLink`, not navigation hacks | Teach | L07; Link/NavLink/active nav/deep-link host fallback |
| C14 — Lesson K: state ownership across route mount/unmount | Teach | L08; lifting state across route unmount |
| C15 — Lesson L: persistence across pages and browser reloads | Teach | L09; localStorage and browser origin |
| C16 — Teach AI-assisted development as controlled engineering | Optional support | L11; optional AI tutoring/agent patch + own review |
| C17 — Live mentoring Session 1 - 90-minute script | Instructor sequencing → adapt | L01–L05; Session 1 process, not published mentor script |
| C18 — Live mentoring Session 2 - 90-minute script | Instructor sequencing → adapt | L06–L12; Session 2 process, not published mentor script |
| C19 — Independent practice - 4 to 6 hours | Adapt learner practice | L03–L12; local exercises, homework and evidence |
| C20 — Debugging labs: reproduce five failures deliberately | Adapt debugging | L03–L10; five deliberate failure labs |
| C21 — Testing: fake HTTP, real interactions, no paid services | Adapt testing | L01/L10/L12; fake fetch + manual acceptance, test scope |
| C22 — Knowledge check and instructor answer key | PRIVATE instructor answers | Keep private; use to verify rationale, do not bundle verbatim |
| C23 — 100-point grading rubric and readiness criteria | Adapt final gate | L12; rubric and readiness reasoning, not automatic certificate |
| C24 — FAQ, troubleshooting and teaching adjustments | Adapt troubleshooting | L02–L10; FAQs, version differences and teaching adjustments |
| C25 — Official references and the Week 7 handoff | Adapt optional references/handoff | L12; official docs/Week 7 preview |
| C26 — Complete instructor reference code appendix | PRIVATE reference appendix | Keep private; never bundle complete `reference-solution/` |

**Coverage:** C01–C26 each has an explicit disposition. C17/C18 instructor scripts, C22 answers and C26 complete code do not become public learner chapters. C22/C26 and `reference-solution/` remain private.

## C. Every inner archive entry and publication boundary

| Archive path | Proposed use / distribution rule |
|---|---|
| `starter/.gitignore` | Learner starter candidate only after technical, content and licensing review |
| `starter/README.md` | Learner starter candidate only after technical, content and licensing review |
| `starter/index.html` | Learner starter candidate only after technical, content and licensing review |
| `starter/package.json` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/App.jsx` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/components/TaskForm.jsx` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/components/TaskItem.jsx` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/components/TaskList.jsx` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/components/TaskToolbar.jsx` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/lib/ideas-api.js` | Learner starter candidate; guided TODO exercises must be reviewed and remain incomplete as intended |
| `starter/src/lib/sample-ideas.js` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/lib/storage.js` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/lib/task-logic.js` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/main.jsx` | Learner starter candidate only after technical, content and licensing review |
| `starter/src/pages/IdeasPage.jsx` | Learner starter candidate; guided TODO exercises must be reviewed and remain incomplete as intended |
| `starter/src/styles.css` | Learner starter candidate only after technical, content and licensing review |
| `starter/tests/ideas-api.test.mjs` | Learner starter candidate; guided TODO exercises must be reviewed and remain incomplete as intended |
| `starter/tests/task-logic.test.mjs` | Learner starter candidate only after technical, content and licensing review |
| `starter/vite.config.js` | Learner starter candidate only after technical, content and licensing review |
| `reference-solution/.gitignore` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/README.md` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/index.html` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/package.json` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/App.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/components/TaskForm.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/components/TaskItem.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/components/TaskList.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/components/TaskToolbar.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/lib/ideas-api.js` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/lib/sample-ideas.js` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/lib/storage.js` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/lib/task-logic.js` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/main.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/pages/DashboardPage.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/pages/IdeasPage.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/pages/NotFoundPage.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/pages/TasksPage.jsx` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/src/styles.css` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/tests/ideas-api.test.mjs` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/tests/task-logic.test.mjs` | PRIVATE instructor reference — never include in public course/app assets |
| `reference-solution/vite.config.js` | PRIVATE instructor reference — never include in public course/app assets |

**ZIP count:** 41 entries = 19 starter + 22 instructor reference. Counts refer to the original source archive; no student code package is being produced in D0.

## D. Verified project contract and continuity rules from source

1. The Week 6 starter keeps Week 5 React task logic plus new `IdeasPage.jsx`, `ideas-api.js`, `sample-ideas.js` and `tests/ideas-api.test.mjs`. Some TODOs intentionally fail; these are student assignments, not broken deliverables claimed ready for release.
2. The instructor reference adds `DashboardPage`, `TasksPage`, `NotFoundPage`; `BrowserRouter` and route elements. Version ranges in its `package.json` are **historical source values**, not automatically suitable for future installation; check official docs and lockfile at D6 implementation.
3. `IDEAS_URL` is a **read-only GET** demonstration (`https://jsonplaceholder.typicode.com/todos?_limit=8`); all graded API paths must work with a fake response, offline sample or injected fetch. Third-party uptime isn't a learner failure.
4. Validated remote idea IDs use string prefixes `api-*`, offline examples `offline-*`. Local task IDs remain positive numeric IDs, allocated when copying; duplicate intended copies may create distinct local tasks.
5. Local task shape stays `{id:number,title:string,completed:boolean}` with 100-character title validation and `study-tasks-week2` local storage key. Changed protocol/hostname/port changes origin; tasks don't automatically cross origins.
6. `normalizeIdeas` throws for a non-array input, filters invalid entries and duplicate IDs, trims titles and uses safe JSX rendering. A valid `[]` is an **empty** state; invalid JSON structure is an **error**.
7. `fetchIdeas` is separate from React components, accepts injected fetch and an abort signal; catches/handles non-OK HTTP responses. The reference fake-fetch tests exercise client logic but do **not** mount JSX or check React Router.
8. Effects load remote ideas and protect against obsolete result handling using `AbortController` and `active` guard. Intentional abort is not an ordinary UI error. Strict Mode may re-run setups in development; do not disable it to mask cleanup bugs.
9. Four request states: loading, success, empty and error. Retry uses a user action; offline samples are bundled and don't require network. Copy invokes `App.addTask`; the external API never receives student tasks.
10. Browser route set is `/`, `/tasks`, `/ideas`, and `*`. `Link` and `NavLink` are internal navigation; some static hosts need an SPA rewrite for deep-link requests.
11. `App` owns task state above Routes; the Ideas page owns request state. Task count is derived from shared tasks rather than duplicated. The storage helper prevents silent overwriting malformed prior data.
12. Source `tests/ideas-api.test.mjs` contains **11** focused API/offline tests; source `tests/task-logic.test.mjs` covers Week 5 helper behavior. The Week 6 reference is described as having 36 passing JavaScript tests in the original materials, but **this D0 package does not rerun npm tests or certify React UI**.
13. Actual app uses JSX and local npm/Vite/React Router; a generic Fieldbook plain-JS sandbox cannot truthfully say it mounted those components. Only API-client helper code may auto-grade in isolated browser JS; actual React local checks are self-verified.
14. All instructor answer/source content remains **private** and is not copied into a public Fieldbook application build. Publication rights are pending DEC-18.
15. Next curriculum stage (Week 7) is **building** an Express backend; Week 6 is still **consuming** a sample API.

## E. Known risks and future QA

- Live endpoint blocked/down; use offline fixture. Never block required quiz/browser checks on it.
- Unsafe runner calls learner code in Academy origin; isolate and prohibit Academy progress/storage access.
- React Router import conventions may differ from old tutorials; source uses `react-router` declarative imports. Reconfirm against current official docs at D6 authoring.
- React Effect dependency/cleanup behavior and Strict Mode must be explained precisely, not over-simplified into “runs once.”
- Local UI may claim passed after source helper tests, even though no React mount/route event was inspected; correct this labeling.
- SPA deep links can return host 404 without rewrite; distinguish from React wildcard page.
- Accidentally replacing task storage key or mutating records could lose Week 5 task data.
- Failing to redact instructor answers and original reference code before publishing.

**D0 owner review:** 12 stable IDs retained; 26 proposed checks; all 26 C## chapters and all 41 code entries mapped. The owner has approved this D0 **planning structure A-007**, but student-facing content, tests, D6 learner pilot and D0/D1/D2 gates remain pending.
