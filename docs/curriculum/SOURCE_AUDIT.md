# Source Audit and Curriculum Scope — Initial Verified Inventory

> **CURRENT AUTHORITATIVE PLANNING STATUS — 2026-11-17:** All 12 weekly educational BLUEPRINT STRUCTURES have owner approval (Week 12 = **A-013**). The D0 **cross-week audit is prepared**, but the owner has **not yet signed off D0**. All learner-ready content, question banks, code runners and pilots remain future work. D1 visual approval and explicit D2 coding authorization are also pending. Historical status notices in this document describe prior snapshots and are superseded by `docs/product/D0_OWNER_SIGNOFF.md` and `docs/product/D0_APPROVAL_LOG.md`.

> **Current cross-week source audit (2026-11-17):** 347 numbered chapter identifiers traced across original 12 instructor source documents. Private manifest SHA-256 checks matched all 36 source artifacts. This does **not** mean student-facing content or test runners have been authored or validated. See `D0_CROSS_WEEK_AUDIT.md`.





## What has been verified

The local working set contained **all 12 original instructor PDFs, all 12 code ZIPs, and all 12 source Markdown guide files**. Page and numbered-chapter counts below were inspected from these files. This is a **source inventory and first curriculum mapping**, not an assertion that every code example has been pedagogically reviewed for student use.

| Student week | Topic | Original PDF pages | Original numbered chapters | Code archive entries | Main project |
|---|---|---:|---:|---:|---|
| 01 | HTML, CSS and JavaScript refresher | 38 | 16 | 8 | Study Tasks v1 |
| 02 | JavaScript data structures and application state | 39 | 20 | 8 | Study Tasks v2 |
| 03 | DOM, modules, editing, sorting and testing | 45 | 22 | 11 | Study Tasks v3 |
| 04 | Promises, async/await, HTTP and fetch | 54 | 24 | 18 | Study Tasks v4 / Study Idea Inbox |
| 05 | React fundamentals and state | 44 | 23 | 30 | Study Tasks v5 (React) |
| 06 | React hooks, APIs and routing | 50 | 26 | 41 | Study Tasks v6 |
| 07 | Node.js and Express REST API | 37 | 27 | 68 | Study Tasks API v1 |
| 08 | React–Express full-stack integration | 42 | 32 | 77 | Study Tasks v8 |
| 09 | PostgreSQL, SQL and persistence | 37 | 34 | 94 | Study Tasks v9 |
| 10 | Authentication, sessions and authorization | 43 | 38 | 125 | Study Tasks v10 |
| 11 | Testing, security and deployment readiness | 40 | 40 | 152 | Study Tasks v11 |
| 12 | Capstone and final assessment | 36 | 45 | 165 | Study Tasks v12 |

**Inventory total:** 12 PDFs, 347 numbered instructor chapters, 12 code archives and 12 text source files.

## Audit status and cautions

- **Verified:** source files present, page counts, numbered chapter headings, code ZIP inventories.
- **Owner-approved structural grouping:** all 12 weekly lesson/checkpoint plans are accepted through A-013; educational correctness, final item design and pilot evidence remain subject to D3–D8 review.
- **Not yet completed:** line-by-line verification that every final student-facing paragraph and runnable snippet matches the source; no final student lesson content has been written.
- **Instructor-only material:** teaching scripts, answer keys and reference implementations must be separated from the default student experience.
- **Browser-only boundary:** Weeks 7–12 need external local projects and genuine evidence; no pretend in-browser PostgreSQL/Express grading.

## Week 1 focused D0 review — structural plan approved A-001 (2026-11-16)

The original Week 1 source Markdown and every file in its eight-entry code ZIP were inspected. The **12-lesson/20-checkpoint source-to-student plan** is approved as a working **D0 authoring structure**. No actual student lesson/question bank, browser test or D4 learner pilot has been produced or executed. Seven quiz sets / 40 authoring item slots are proposed.

- Lesson planning: `WEEK01_LESSON_ASSESSMENT_BLUEPRINT.md`.
- DEC-21 mapping: `WEEK01_CHECKPOINT_INVENTORY.md` (18 required, 2 optional).
- Source disposition: `WEEK01_SOURCE_TRACEABILITY.md` (C01–C16).
- Item slots: `WEEK01_ASSESSMENT_ITEM_PLAN.md` (not finished quiz questions).
- D3 usability **dry run** and D4 integrated mastery pilot: `docs/quality/WEEK01_PILOT_PROTOCOL.md` (approved sequencing DEC-24; neither executed).

## Week 2 focused D0 review — structural plan owner-approved A-003 (2026-11-16)

The full original Week 2 Markdown (20 C## chapters), each file inside its eight-entry code ZIP, and the source inventory were inspected. The **11-lesson/22-checkpoint structure** is an owner-approved DEC-21 planning baseline (**19 mandatory / 3 optional**) with **8 quiz groups / 45 planned item slots**.

- Lesson plan: `WEEK02_LESSON_ASSESSMENT_BLUEPRINT.md`.
- Detailed checkpoint/test/attestation contracts: `WEEK02_CHECKPOINT_INVENTORY.md`.
- Quiz/question intent (not authored live question bank): `WEEK02_ASSESSMENT_ITEM_PLAN.md`.
- Original C01–C20 dispositions, exact storage behavior/limits and SHA-256 values: `WEEK02_SOURCE_TRACEABILITY.md`.
- Later D5 learner test, **not run**: `docs/quality/WEEK02_PILOT_PROTOCOL.md`. Final question banks and browser checks are also not yet written or executed.

**Important:** Week 2 task storage is `study-tasks-week2` in the *student project*, not FullStack Fieldbook's own progress. The classroom starter remains Week 1 DOM-only code. The reference adds task objects, stable IDs, state-driven render, filters/count and localStorage; its full code stays private.

## Week 3 focused D0 source review — structural plan owner-approved A-004 (2026-11-16)

The full original Week 3 Markdown (**22 C## chapters**) and **11 files** in its archive were inspected. The existing **11 stable lesson IDs** and **24 checkpoint slots** (**21 mandatory / 3 optional**) are **owner-approved as planning structure A-004**: 8 quiz-auto groups (45 planned item slots), 8 browser-code checks and 5 local self-verification activities. Real lessons/tests remain pending.

- Detailed proposed lesson mapping: `WEEK03_LESSON_ASSESSMENT_BLUEPRINT.md`.
- DEC-21 checkpoint/test/attestation contracts: `WEEK03_CHECKPOINT_INVENTORY.md`.
- Question intents, **not authored items**: `WEEK03_ASSESSMENT_ITEM_PLAN.md`.
- Chapter C01–C22 trace and exact code-behavior boundaries: `WEEK03_SOURCE_TRACEABILITY.md`.
- Later D5 learner trial, **not conducted**: `docs/quality/WEEK03_PILOT_PROTOCOL.md`.

**Week 3 project continuity:** same `{id,title,completed}` task format and **`study-tasks-week2`** key, but module imports require a local HTTP server; changing origin/port changes visible local storage. New functionality: immutable rename, case-insensitive search, ID-based copied sort, event delegation, keyboard Save/Cancel, defensive parse and real local tests. Original teacher reference suite contains 22 assertions; don't grade student code only by an exact count. Completed source reference remains private.

## Week 4 focused D0 source review — owner-approved structural baseline A-005 (2026-11-16)

The original Week 4 source Markdown (**24 C## chapters**) and all **18 starter/reference ZIP files** were inspected, and the owner has accepted their structural mapping (A-005). The existing 12 stable lesson slots are preserved, with **optional advanced L10** (cancellation and stale-response guard), yielding 11 required lessons. The proposed **25 checkpoints** include **21 required** (9 quiz sets / 50 planned items, 8 browser tests, 4 local attestations) and **4 optional**. All quiz banks and executable Fieldbook grading tests remain future work.

- Lesson-level scope and prerequisites: `WEEK04_LESSON_ASSESSMENT_BLUEPRINT.md`.
- Deterministic fake-fetch/browser and local verification contracts: `WEEK04_CHECKPOINT_INVENTORY.md`.
- Quiz item intentions, not final reviewed items: `WEEK04_ASSESSMENT_ITEM_PLAN.md`.
- Full C01–C24 chapter disposition, file checksums and source constraints: `WEEK04_SOURCE_TRACEABILITY.md`.
- Later D5 learner test, **not conducted**: `docs/quality/WEEK04_PILOT_PROTOCOL.md`.

**Source-specific safety/continuity:** task model `{id,title,completed}`, key `study-tasks-week2`, max title 100, independent remote idea IDs, public JSONPlaceholder GET treated as example-only, fake fetch/offline data required for gradeable learning. Reference Week 4 browser suite has **37 instructor tests**, not independently run by FullStack Fieldbook.

## Week 5 focused D0 source review — OWNER APPROVED structure A-006 (2026-11-16)

The original Week 5 source Markdown contains **23 C## chapters** and its code ZIP has **30 files** (15 starter + 15 instructor reference), all inspected for the proposed student learning structure. The existing 11 stable lesson IDs were preserved. The proposed **25 checkpoints** include **22 required** (10 quizzes / **57 planned item slots**, 3 isolated **pure-JS** browser checks, 9 locally self-verified React/Vite activities) plus **3 optional** (UI polish, manual data migration, editing).

- D0 lesson plan and scope: `WEEK05_LESSON_ASSESSMENT_BLUEPRINT.md`.
- Per-checkpoint passing rules and local evidence: `WEEK05_CHECKPOINT_INVENTORY.md`.
- Assessment intent, **not authored question bank**: `WEEK05_ASSESSMENT_ITEM_PLAN.md`.
- C01–C23 dispositions, source SHA-256 and complete archive inventory: `WEEK05_SOURCE_TRACEABILITY.md`.
- Later **D6** learner pilot, **not conducted**: `docs/quality/WEEK05_PILOT_PROTOCOL.md`.

**Critical boundary:** the academy generic sandbox can auto-grade safe, isolated **plain JavaScript helper behavior**, but it cannot honestly auto-grade local JSX, `useState`, React DOM, npm/Vite builds or a student's private filesystem without an explicitly implemented and approved runner. Real React evidence is **self-verified locally**. The Week 4 remote Study Idea Inbox returns in Week 6; the Week 5 React app intentionally starts with local tasks only. **A-006 approves this planning structure, not any finished React build, test or learner pilot.**

## Week 6 focused D0 source review — OWNER APPROVED structural plan A-007 (2026-11-16)

The original Week 6 Markdown has **26 numbered instructor C## chapters**, and its accompanying code ZIP has **41 entries** (19 learner starter and 22 private reference). All are mapped in `WEEK06_SOURCE_TRACEABILITY.md`. Owner approved **12 required lessons and 26 checkpoint slots** (**23 required: 11 quizzes / 61 planned scored items, 2 plain-JS browser suites, 10 actual local React attestations; 3 optional**) as **D0 structural baseline A-007**. This does **not** mean React browser tests, npm builds, finished quizzes, or the future D6 learner pilot have run. The public practice API is never mandatory for passing, and real Effects/Router/UI are self-verified locally.

## Week 7 focused D0 source review — STRUCTURAL APPROVAL A-008 (2026-11-16)

The original Week 7 Markdown has **27 instructor C## chapters** and its code ZIP has **68 entries** (33 `starter/`, 34 `reference-solution/`, 1 top-level `START_HERE.md`), all enumerated in `WEEK07_SOURCE_TRACEABILITY.md`. The original twelve proposed lesson IDs were preserved and expanded with exact outcomes, examples and checkpoint requirements.

- **Curriculum blueprint:** `WEEK07_LESSON_ASSESSMENT_BLUEPRINT.md`: 12 required lessons, Node/npm/ESM → HTTP → Express routes/middleware → memory-store CRUD → validation → tests → read-only React API lab → Week 8 readiness.
- **DEC-21 checkpoint plan:** `WEEK07_CHECKPOINT_INVENTORY.md`: **27 proposed: 24 required (12 quiz-auto, 2 isolated pure-JS code, 10 real local-project self-attestations), 3 optional**.
- **Question allocation:** `WEEK07_ASSESSMENT_ITEM_PLAN.md`: **12 quiz groups / 66 planned scored slots**; not finished or learner-tested.
- **Traceability:** `WEEK07_SOURCE_TRACEABILITY.md` covers C01–C27 and all 68 code archive entries, including private C25 answers and C27 source appendix.
- **Future D7 pilot:** `docs/quality/WEEK07_PILOT_PROTOCOL.md` is drafted but not executed.

**Scope/verification:** FullStack Fieldbook remains a **static frontend application**. The student creates a separate **local Node/Express API with in-memory task storage**. Only dependency-free JavaScript store and validation helpers are automatically checkable in Fieldbook's vetted browser sandbox. Real HTTP requests, Node process, Express routes, npm tests and React `/server` read-only page must be **self-verified locally**. API writes from React begin Week 8; PostgreSQL persistence begins Week 9. No completed backend/progress test claims are made by this audit. **Week 7 planning structure is now owner-approved as A-008; final educational content, learner-run tests and D7 pilot remain pending.**

**Remaining D0 audit work:** Week 10 owner review plus detailed Weeks 11–12 source-to-lesson/checkpoint audits, final reset/model review and global D0 signoff. DEC-19's proposed 138-lesson total remains OPEN; D1 also unsigned, D2 NOT AUTHORIZED.

## Week 8 focused D0 review — OWNER APPROVED structural plan A-009 (2026-11-16)

The original Week 8 Markdown has **32 C## chapters** and the companion archive has **77 files**; the 11-lesson/27-checkpoint D0 structure was owner-accepted on continuation. **24 required: 11 quizzes / 66 proposed scored items, 3 isolated pure-JS fake-fetch suites, 10 local React/Express self-attestations; plus 3 optional.** Express memory owns tasks after integration, with Node restart still erasing those tasks. Actual learner-facing content, browser suite implementation, local tests and D7 pilot remain pending.

## Week 9 focused D0 source review — HISTORICAL DRAFT, now approved as A-010 (initial audit 2026-11-16)

Week 9 instructor Markdown has **34 numbered C## chapters**, and its code ZIP has **94 files**. All chapters and archive paths have an explicit disposition in `WEEK09_SOURCE_TRACEABILITY.md`. Preserve the original **12 stable lesson IDs**, with proposed **27 checkpoints** (**24 required: 12 quiz groups with 72 future scored items, 2 isolated plain-JS fake-pool checks, 10 actual local PostgreSQL self-attestations; 3 optional**). `WEEK09_LESSON_ASSESSMENT_BLUEPRINT.md` and `WEEK09_CHECKPOINT_INVENTORY.md` define lesson-level learning, safe SQL, PostgreSQL setup, repository mapping, DB isolation, and restart persistence. No live SQL tests or pilot were performed by this audit; **Week 9 structural approval recorded A-010; final content and tests remain pending**.

**Architecture transition:** Week 8 memory → Week 9 PostgreSQL for the **same** React+Express API. Important boundaries: `created_at` maps to API `createdAt`; parameterized `$1` SQL; `completed:false` preserved; local dev/test DBs kept separate; real tests using `TRUNCATE` only on explicitly validated `_test` target; auth and ownership postponed until Week 10. In-browser JS checks do **not** prove live SQL or npm tests.

## Week-level curriculum coverage targets

### Week 01: HTML, CSS and JavaScript refresher
- **Carried-forward project:** Study Tasks v1.
- **Exercise/evaluation mode:** Browser quiz + HTML/CSS/DOM exercises; tool setup self-check.
- **Initial proposed lesson IDs:** `p1-w01-l01` through `p1-w01-l12`.
- **Source of truth:** original Week 01 PDF, source Markdown, and accompanying code ZIP.

### Week 02: JavaScript data structures and application state
- **Carried-forward project:** Study Tasks v2.
- **Exercise/evaluation mode:** JS function tests + saved-task checks.
- **Initial proposed lesson IDs:** `p1-w02-l01` through `p1-w02-l11`.
- **Source of truth:** original Week 02 PDF, source Markdown, and accompanying code ZIP.

### Week 03: DOM, modules, editing, sorting and testing
- **Carried-forward project:** Study Tasks v3.
- **Exercise/evaluation mode:** JS testing + editing/search/keyboard manual checks.
- **Initial proposed lesson IDs:** `p1-w03-l01` through `p1-w03-l11`.
- **Source of truth:** original Week 03 PDF, source Markdown, and accompanying code ZIP.

### Week 04: Promises, async/await, HTTP and fetch
- **Carried-forward project:** Study Tasks v4 / Study Idea Inbox.
- **Exercise/evaluation mode:** API response simulations + live/offline practice.
- **Initial proposed lesson IDs:** `p1-w04-l01` through `p1-w04-l12`.
- **Source of truth:** original Week 04 PDF, source Markdown, and accompanying code ZIP.

### Week 05: React fundamentals and state
- **Carried-forward project:** Study Tasks v5 (React).
- **Exercise/evaluation mode:** React concept checks; external Vite project tests.
- **Initial proposed lesson IDs:** `p1-w05-l01` through `p1-w05-l11`.
- **Source of truth:** original Week 05 PDF, source Markdown, and accompanying code ZIP.

### Week 06: React hooks, APIs and routing
- **Carried-forward project:** Study Tasks v6.
- **Exercise/evaluation mode:** Client fetch state checks; React project with route tests.
- **Initial proposed lesson IDs:** `p1-w06-l01` through `p1-w06-l12`.
- **Source of truth:** original Week 06 PDF, source Markdown, and accompanying code ZIP.

### Week 07: Node.js and Express REST API
- **Carried-forward project:** Study Tasks API v1.
- **Exercise/evaluation mode:** Node/Express project tested locally; cannot verify purely in browser.
- **Initial proposed lesson IDs:** `p1-w07-l01` through `p1-w07-l12`.
- **Source of truth:** original Week 07 PDF, source Markdown, and accompanying code ZIP.

### Week 08: React–Express full-stack integration
- **Carried-forward project:** Study Tasks v8.
- **Exercise/evaluation mode:** End-to-end local API checks and frontend tests.
- **Initial proposed lesson IDs:** `p1-w08-l01` through `p1-w08-l11`.
- **Source of truth:** original Week 08 PDF, source Markdown, and accompanying code ZIP.

### Week 09: PostgreSQL, SQL and persistence
- **Carried-forward project:** Study Tasks v9.
- **Exercise/evaluation mode:** SQL predictions + local DB migration/integration tests.
- **Initial proposed lesson IDs:** `p1-w09-l01` through `p1-w09-l12`.
- **Source of truth:** original Week 09 PDF, source Markdown, and accompanying code ZIP.

### Week 10: Authentication, sessions and authorization
- **Carried-forward project:** Study Tasks v10.
- **Exercise/evaluation mode:** Two-account isolation checklist + local automated tests.
- **Initial proposed lesson IDs:** `p1-w10-l01` through `p1-w10-l12`.
- **Source of truth:** original Week 10 PDF, source Markdown, and accompanying code ZIP.

### Week 11: Testing, security and deployment readiness
- **Carried-forward project:** Study Tasks v11.
- **Source-inspected D0 draft:** 40 original chapter headings, **152 original ZIP entries** enumerated in `WEEK11_SOURCE_TRACEABILITY.md`.
- **Student IDs:** `p1-w11-l01`–`p1-w11-l11`; **27 proposed checkpoints** (24 required: 11 quizzes / 66 future items, 2 browser pure-JS, 11 local attestations; 3 optional).
- **Scope:** test layers, safe logs and errors, env/secure cookies, health/readiness, local built preview, Git/release evidence; **public deployment optional**.
- **Privacy:** original C36 answer key, C40 reference appendix and `reference-solution/**` remain private.
- **Approval:** Week 10 approved A-011; **Week 11 awaits owner structural approval**. No learner pilot or runtime tests claimed.

### Week 12: Capstone and final assessment
- **Carried-forward project:** Study Tasks v12.
- **Exercise/evaluation mode:** Independent implementation, demo, self-verified capstone + oral checks.
- **Initial proposed lesson IDs:** `p1-w12-l01` through `p1-w12-l11`.
- **Source of truth:** original Week 12 PDF, source Markdown, and accompanying code ZIP.

## Required next step before approving the full content map

For each proposed student lesson, a curriculum reviewer must: (1) inspect the original chapters, (2) check code/version details against source/reference files, (3) identify the correct target proficiency, (4) list the exact examples and exercises being used, (5) supply independent assessment items with explanations, and (6) approve its source trace. See `CONTENT_AUTHORING_STANDARD.md` and `templates/CONTENT_REVIEW_TEMPLATE.md`.



## Week 8 focused D0 source review — OWNER APPROVED structure A-009 (2026-11-16)

The original Week 8 instructor Markdown contains **32 C## chapters**; the accompanying code ZIP has **77 entries**: 37 learner starter + 38 private reference + 2 top-level instructions. All are traced in `WEEK08_SOURCE_TRACEABILITY.md` with original source hashes. The eleven provisional stable lesson IDs are preserved and expanded into an educational plan.

- `WEEK08_LESSON_ASSESSMENT_BLUEPRINT.md`: 11 required lessons, React→API→Express HTTP integration, confirmed CRUD, loading/retry and independent debugging.
- `WEEK08_CHECKPOINT_INVENTORY.md`: **27 planned** (24 mandatory: 11 quiz-auto / 3 fake-fetch browser-code-auto / 10 real local React+Express self-attestations; 3 optional). Backend memory is authoritative and resets on Node restart; client title 1–80 aligns to backend.
- `WEEK08_ASSESSMENT_ITEM_PLAN.md`: **11 quiz groups / 66 planned scored items** — question intentions, not final question text or verified grades.
- `WEEK08_SOURCE_TRACEABILITY.md`: C01–C32 and complete 77-entry ZIP classified, with C30 instructor answers and C32 complete reference excluded from public app.
- `docs/quality/WEEK08_PILOT_PROTOCOL.md`: future D7 learning trial, **not executed**.

**Verification boundary:** Fieldbook remains frontend-only. It may auto-assess controlled **isolated pure JS fake-fetch behavior**, never claim to run real npm, Vite, React component tests, Express HTTP endpoints or DevTools automatically. These require **self-verified local learner evidence**. Dashboard/Idea route polish is secondary to core CRUD. PostgreSQL remains Week 9; auth Week 10. **Owner accepted this structure as A-009; actual learner content/tests remain pending.**


## Historical audit snapshot — Week 9 approved A-010, Week 10 then a draft (now A-011)

**Week 9:** 12 lessons / 27 checkpoint slots were accepted as a D0 structural baseline A-010, not verified SQL/learner results. Week 9 keeps PostgreSQL persistence without authentication; subsequent Week 10 adds user ownership.

**Week 10:** The original Markdown contains **38** numbered C## chapters and the code ZIP has **125** non-directory entries, including a **fail-closed** learner starter and private completed solution. The draft retains 12 stable lesson IDs, assigns **27 checkpoint slots** (**24 required: 12 quizzes with 72 future item intents, 2 isolated browser JavaScript suites, 10 locally self-verified auth/ownership labs; 3 optional**), and traces C01–C38. Critical local proof is two-session Alice/Bob isolation: user B cannot list, GET, PATCH or DELETE A's tasks even by ID, and A's data remains unchanged. Backend uses server-derived owner ID; same-origin training assumptions apply, and old Week 9 shared tasks remain untouched. Academy itself still has no backend and cannot auto-grade real sessions or SQL.

**Unfinished:** Week 10 owner structural review, final item bank, locally run auth security tests, D8 pilot, detailed Weeks 11–12 audits, DEC-19/global D0 closeout, D1 and D2 authorization. Do not call educational code production-ready authentication.

## Week 10 structural approval A-011 / Week 11 source verification (2026-11-17)

Week 10 structure is owner-approved; this is **not** a security certification or result of running the reference. Week 11 original Markdown has **C01–C40** and ZIP contains **152** path entries. All are traced by the Week 11 source document; 11 proposed lessons/27 checks still await owner review. Detailed technical accuracy and content QA remain future work.

## Week 11 approved A-012 / Week 12 original source audit (2026-11-17)

- Week 11: 40/40 original chapters, 152/152 ZIP paths traced, 11 lesson / 27 checkpoint **structure approved A-012**; actual tests/pilots remain pending.
- Week 12: original `instructor-guide-source.md` has **45 numbered chapters (C01–C45)**. Companion `code-starter-and-reference.zip` has **165 path entries**, including student starter, reference solution and templates. All inventoried in `WEEK12_SOURCE_TRACEABILITY.md`.
- Proposed Week 12 authoring contracts: eleven stable lesson IDs, 27 proposed checkpoints (24 required/3 optional) and 66 future quiz-item intentions. Actual answers and executable tests have **not** been authored/verified.
- Privacy: C39 is instructor answer key, C44 completed reference code; both and `reference-solution/**` remain **private**. C32–C36 mentor scripts are rewritten as independent student tasks. C40 rubric is disclosed as self-assessment with safety override, not official certification.
- **Course-wide source-heading inventory:** 347 instructor chapters across all twelve weeks (16+20+22+24+23+26+27+32+34+38+40+45). Chapter mapping is not equal to educational completeness.
- Week 12 owner structural review pending; global D0 cross-week audit/signoff pending, DEC-19 count provisional. D2 unauthorized.
