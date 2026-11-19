# Week 4 Source Traceability and Instructor Chapter Disposition — A-005 Structural Baseline

**Status:** original Week 4 Markdown and ZIP **inspected**; this is **chapter-level source mapping**, not an independently executed learner test, page-by-page PDF audit, or approval of released student content. The instructor guide has **24 numbered C## chapters**; the code archive has **18 files**. The project's original PDF is available privately; visual-only details must be checked separately if used in student lessons.

## 1. Private source files checked

- `../fullstack-fieldbook-source-materials/phase1/week-04/instructor-guide-source.md`: 66,292 bytes, SHA-256 `f68453b36b4cdad05f1f57634795ff726a04262e740621d21b62da4928b90c83`.
- `../fullstack-fieldbook-source-materials/phase1/week-04/code-starter-and-reference.zip`: 25,421 bytes, SHA-256 `0b9f278989bd84120cf71d0da73d2bc3275e67cab1514701f64be5271e479d92`.
- The ZIP paths inspected: `starter/README.md`, `starter/api-client.js`, `starter/app.js`, `starter/index.html`, `starter/sample-ideas.js`, `starter/styles.css`, `starter/task-logic.js`, `starter/tests.html`, `starter/tests.js`, `reference-solution/README.md`, `reference-solution/api-client.js`, `reference-solution/app.js`, `reference-solution/index.html`, `reference-solution/sample-ideas.js`, `reference-solution/styles.css`, `reference-solution/task-logic.js`, `reference-solution/tests.html`, `reference-solution/tests.js`.

**Code boundary:** `starter/` begins as the **functional Week 3** task manager plus non-working Week 4 API controls and `api-client.js` TODOs. `reference-solution/` is private; its `api-client.js` and `tests.js` are **authoring/verification references**, not public learner downloads. Do not ship `reference-solution/` or instructor answer chapters by bundling them in app assets.

## 2. Exact chapter disposition (C01–C24)

| Source chapter | Disposition | Student destination / reason |
|---|---|---|
| C01 | Adapt learning mission, exclude mentor script | L01 motivation, L12 outcomes/exclusions |
| C02 | Adapt setup, baseline and Git precautions | L08/L12 local setup, `file://` vs localhost, project continuity |
| C03 | Teach browser→HTTP→remote data boundary | L01 introduction, L11 local vs remote recap |
| C04 | Teach synchronous/asynchronous mental model | L01 ordered-trace exercises |
| C05 | Teach Promise lifecycle, chain and failure | L02; reconsolidate in L03 |
| C06 | Teach async/await, catch/finally | L03; referenced by L07 |
| C07 | Teach HTTP anatomy and status codes | L04 diagnostic quiz and examples |
| C08 | Teach REST and fake API limits | L05; future endpoints marked illustrative |
| C09 | Teach untrusted JSON schema reasoning | L06 validator and edge cases |
| C10 | Teach fetch response and HTTP error | L07 fake-fetch behavior tests |
| C11 | Teach Network panel and safe CORS explanation | L08 local diagnostic checklist |
| C12 | Teach loading/error/empty/success states | L09 browser UI state tests |
| C13 | **OPTIONAL advanced** cancellation/race prevention | L10 optional branch; not Week 5 gate |
| C14 | Adapt project requirements and regressions | L11 app feature spec; L12 integration |
| C15 | Adapt implementation steps, not full completed code | L06/L07/L11 localized practice and acceptance |
| C16 | Teach AI prompting and diff review, AI optional | L12 optional AI support/review workflow |
| C17 | Reframe Session 1 timing into self-paced activity order | L01–L07; scripts remain instructor-only |
| C18 | Reframe Session 2 timing into self-paced activity order | L08–L12; scripts remain instructor-only |
| C19 | Adapt practical homework and reflections | L11/L12 project and no-AI transfer |
| C20 | Convert controlled failure labs to practice/quiz | L03/L07/L08/L09/L11/L12 |
| C21 | Use as quiz intent **private answer key excluded** | L01,L03–L09,L12 quiz item plan |
| C22 | Adapt rubric as reflection/readiness criteria | L12 project and quiz; do not gate on teacher 100-point rubric |
| C23 | **PRIVATE full reference source** | Never ship appendix as learner content; use to confirm API and schema contract |
| C24 | Adapt official references and Week 5 bridge | L12 recap, resources, introduction to React later |

**Chapter coverage:** all 24 C01–C24 headings assigned a proposed disposition. This does not prove every paragraph is learner-ready or every future item is educationally correct. A content reviewer must still validate depth and continuity during D5.

## 3. Verified source-level feature contract to preserve

1. Week 4 starter (`starter/`) contains the **completed Week 3 task manager** and a new panel; Load, Offline and Cancel are unfinished. The student should complete Week 4, not be handed the reference solution.
2. The reference uses ES modules and a local HTTP server (for example `python -m http.server 5500` when Python is installed). Student exercises must not rely on `file://` module imports.
3. `task-logic.js` continues previous `{id,title,completed}` data, 100-character title limit and **`study-tasks-week2`** storage key. A different browser origin/port shows a different storage namespace.
4. `api-client.js` exports `IDEAS_URL` (`https://jsonplaceholder.typicode.com/todos`), `MAX_IDEAS = 8`, `normalizeIdeas` and `fetchStudyIdeas` with injectable `fetchImpl` and optional AbortController `signal`.
5. Normalizer requires array root; skips invalid/duplicate remote records; ID must be positive safe integer, title nonblank string length ≤100 after trim, `completed` Boolean. It returns at most eight new, normalized objects by default; invalid limit throws.
6. `fetchStudyIdeas` awaits fake/real `fetch`, checks `response.ok`, awaits `response.json()` and normalizes results. It has no authenticated or write API operation.
7. JSONPlaceholder is an **example fake REST API**. HTTP writes in tutorials are simulated and should never be described as durable app storage. It is not required to be available to graduate because test fixtures and offline sample exist.
8. `sample-ideas.js` provides deterministic `OFFLINE_IDEAS`, which go through normalizer. Copying an idea is a separate explicit action allocating a **new local task ID**, and the source remote ID is not reused automatically.
9. Imported text renders with `textContent` and cannot be treated as trusted HTML; local existing tasks are not overwritten when remote data loads or fails.
10. The reference includes idle/loading/success/error/cancelled/offline status UI; **AbortController cancellation and stale-result protection are advanced and optional for week mastery** (C13 explicitly calls them stretch).
11. Reference tests are browser-based and **do not call the real API**; source author describes 37 tests total (22 Week 3 + 15 Week 4). That is **reference provenance**, not a student-test requirement or a currently executed Fieldbook assessment.
12. Sandbox uses injected fake `fetchImpl` and no access to host academy progress. No third-party credentials, paid API, server backend, database, or React is needed in Week 4.

## 4. Known content/technical risks

- **Fetch semantics:** HTTP 404/503 responses do not normally reject fetch Promise; explicitly inspect `response.ok`.
- **Outside availability:** a fake service can be temporarily down; offline fixture and fake-response checks are the authoritative required path, not uncontrolled live requests.
- **Cancellation optional:** a source reference includes this in complete instructor solution, but it is stretch. Treat L10 as an optional branch and do not let it accidentally block L11.
- **Storage preservation:** external data and task state are different datasets. Tests must catch accidental `tasks=ideas`, remote ID collision and unexpected storage reset.
- **External input:** even well-formed JSON may not meet the agreed schema; use safe DOM text rather than `innerHTML`.
- **Browser-runner feasibility:** controlling async resolution and DOM update/focus reliably in an isolated sandbox must be proven at D4/D5; do not assert future pass today.
- **Source answer leakage:** C21 includes answers and C23 complete code; keep separate from learner default packages and any public build, subject to public-rights review at D9.
- **Site offline vs student app offline:** Fieldbook D9 PWA caches course content. Week 4 fixture simulates/fallbacks the student's separate task app; these are different capabilities and should not be conflated.

## 5. D5 authoring QA requirements

Check real lesson examples against the actual intended runtime, preserve old task regression functionality, peer-review all scored items and essential flags, test isolated async fake response cases, verify all nine quizzes/eight browser-code suites/four local attestations and the no-AI transfer challenge; confirm the sandbox has no access to Fieldbook progress. Exact URLs and package versions should be checked again near publication. **Current status is owner-approved D0 structure A-005; final content, tests and D5 pilot remain pending.**
