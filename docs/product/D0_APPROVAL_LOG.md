# D0 Product and Curriculum Approval Log — FullStack Fieldbook

> **CURRENT AUTHORITATIVE PLANNING STATUS — 2026-11-17:** All 12 weekly educational BLUEPRINT STRUCTURES have owner approval (Week 12 = **A-013**). The D0 **cross-week audit and owner signoff are complete (A-014, 2026-11-17)**. All learner-ready content, question banks, code runners and pilots remain future work. D1 visual approval and explicit D2 coding authorization are also pending. Historical status notices in this document describe prior snapshots and are superseded by `docs/product/D0_OWNER_SIGNOFF.md` and `docs/product/D0_APPROVAL_LOG.md`.

**Purpose:** Keep *specific owner approvals* separate from the overall D0/D1 signoff. An approval of one lesson blueprint does not authorize application code or automatically approve another week.  
**Latest recorded review:** 2026-11-17 (A-014 — final owner D0 signoff; D1 review pending, D2 coding not authorized).
**Source:** owner continuation and approval of weekly structural blueprints through A-013. These are planning approvals, **not learner test results**.

## Approval A-001 — Week 1 educational blueprint structure

- **Status:** OWNER APPROVED — D0 planning baseline.
- **Scope:** `docs/curriculum/WEEK01_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK01_CHECKPOINT_INVENTORY.md`, `WEEK01_SOURCE_TRACEABILITY.md`, and the *item-slot plan* in `WEEK01_ASSESSMENT_ITEM_PLAN.md`.
- **Accepted initial structure:** **12 Week 1 lessons**, **20 checkpoint slots** (18 mandatory, 2 optional), 7 quiz sets/40 proposed item slots. Maintain Stage 1 fundamentals, real Week 1 task-list behavior and intentionally **no persistence** until Week 2.
- **Accepted assessment philosophy:** DEC-21, including 80% plus essential items, real browser behavior checks, and honest local-project self-verification. Keep optional AI assistance non-gating.
- **Conditional technical review:** L05 responsive-layout `browser-code-auto` geometry test must prove feasibility/accuracy in D4; if infeasible, request owner approval for a narrowly specified alternative checkpoint method. This approval does not invent a passing result or give permission to bypass the check.
- **Still outstanding:** final text of actual student lessons; question banks/distractors/equivalent retries; executable test implementation/safety review; accessibility and educational QA; real learner pilot; content release approval.
- **Decision effect:** Week 1 *lesson grouping and verification plan* may be used as the provisional authoring target. Stable IDs remain draft until content release/versioning; don't silently repurpose them.

## Approval A-002 / DEC-24 — D3/D4 sequencing dependency resolved

- **Status:** OWNER APPROVED — development *sequence only*, no stage implementation permission.
- **D3:** Build/review actual Week 1 learner-facing lesson content, generic lesson blocks and quizzes, and perform a **content/navigation/usability dry run**. Coding labs may be shown as explanatory/non-scored previews while their safe runner is missing. Do **not** mark browser-code checkpoints passed or claim full Week 1 graduation.
- **D4:** Implement/security-review the isolated browser coding playground and behavior-test runner, then execute the **complete integrated Week 1 mastery pilot**, including required browser checks, real learner exercise, and honest local self-attestations. Signoff of D4's integrated pilot is required before calling the Week 1 full mastery journey verified.
- **D4 contingency:** If geometry or isolation cannot satisfy a checkpoint, propose a documented DEC-21-compatible change and obtain owner approval before changing that checkpoint or unlocking rules.
- **Boundary:** D3 cannot start until D2 is explicitly authorized, completed and signed off; D4 cannot start without separate D4 stage authorization. D0/D1 remain unsigned and D2 is **NOT AUTHORIZED**.

## Approval A-003 — Week 2 educational blueprint structure

- **Status:** OWNER APPROVED — D0 planning baseline, via the owner's instruction to proceed after receiving and replacing the Week 2 draft. This is structural signoff only.
- **Scope:** `docs/curriculum/WEEK02_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK02_CHECKPOINT_INVENTORY.md`, `WEEK02_SOURCE_TRACEABILITY.md`, and the item-slot plan `WEEK02_ASSESSMENT_ITEM_PLAN.md`.
- **Accepted structure:** **11 Week 2 lessons**, **22 proposed checkpoint slots** (19 required: 8 quizzes, 8 browser checks, 3 local attestations; 3 optional), **8 quizzes / 45 planned question slots**. Retain Week 2 task objects/state-driven render, ID-based CRUD, All/Active/Completed, and browser `localStorage`. The Week 3 features (edit/search/sort/test modules) remain deferred until Week 3.
- **Required educational rules:** DEC-21 (80% + essential; all mandatory behavior tests; honest self-verification; optional AI; retries). Storage fixture tests must remain isolated from the Fieldbook host progress. Week 2 starter remains Week 1 DOM-only baseline, Week 2 reference private.
- **Not approved by this signoff:** final student-facing text, actual question banks and essential item wording, secure test implementation, technical/education review, local-run results, D5 learner pilot, D0/D1, or D2 authorization.
- **Effect:** Week 2 structure is an approved authoring baseline. Maintain stable IDs and request explicit change approval for any material structural redesign.

## Approval A-004 — Week 3 educational blueprint structure

- **Status:** OWNER APPROVED — D0 planning baseline, based on the owner's request to move forward after receiving/replacing the Week 3 draft. This is **structural approval**, not a software/lesson/pilot completion claim.
- **Scope:** `WEEK03_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK03_CHECKPOINT_INVENTORY.md`, `WEEK03_SOURCE_TRACEABILITY.md`, `WEEK03_ASSESSMENT_ITEM_PLAN.md` and future D5 pilot protocol.
- **Accepted structure:** **11 Week 3 lessons**, **24 checkpoint slots** (**21 required: 8 quiz, 8 browser, 5 local attestations; 3 optional**), eight quizzes with 45 draft scored item slots. Keep Week 2 data shape/key, nonmutating sorting, stable IDs, edit/cancel, event delegation, search, modules and real local tests.
- **Required verification:** DEC-21 rules; D4 runner must really support browser DOM events, keyboard and focus for deterministic Week 3 assessment. `tests.html` results in learner's separate local project are **self-verified** and source reference 22 checks are not an automatic pass token.
- **Not approved:** actual lesson text, reviewed question bank/essential-item wording, secure test implementation, local project execution, Git evidence, accessibility QA, D5 learner pilot, overall D0/D1 or D2 coding authorization.
- **Effect:** preserve eleven stable Week 3 IDs and checkpoint split as authoring baseline. Obtain owner approval before material gate changes.


## Approval A-005 — Week 4 educational blueprint structure

- **Status:** OWNER APPROVED — D0 planning baseline. The owner requested continuation after applying the Week 4 draft ZIP; this records acceptance of its proposed educational structure, not approval of completed learning content or tests.
- **Scope:** `WEEK04_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK04_CHECKPOINT_INVENTORY.md`, `WEEK04_ASSESSMENT_ITEM_PLAN.md`, `WEEK04_SOURCE_TRACEABILITY.md`, and future `docs/quality/WEEK04_PILOT_PROTOCOL.md`.
- **Accepted structure:** **12 lesson slots**, **11 mandatory with optional L10** for `AbortController` and stale requests; **25 checkpoints** (**21 required = 9 quiz / 8 browser / 4 local; 4 optional**) and 9 quiz groups / 50 planned scored slots. External public API GET remains optional; offline mock responses and fake-fetch fixtures are mandatory for assessed paths.
- **Continuity:** Study Tasks v4 retains the Week 3 data model, `study-tasks-week2` key and existing local tasks. Loading outside ideas must never silently overwrite local tasks; Copy allocates a new local ID. Week 5 React rebuild intentionally pauses the Idea Inbox until Week 6.
- **Verification rule:** DEC-21: never score a live public API outage against the student; 8 sandbox checks must use controlled fake asynchronous responses and a safely isolated runner when implemented. Local `tests.html` results are learner-attested, not browser-verified by Fieldbook. L10 cancellation remains non-gating.
- **Still outstanding:** complete student lessons, final quiz/question-bank text and essential flags, executable code/test verification, accessibility and actual D5 Week 4 learner pilot. Nothing in this acceptance authorizes D2/D5.
- **Effect:** Week 4 lesson/checkpoint structure is an approved authoring baseline. Keep stable IDs; changes to required gates need owner approval.

## Approval A-006 — Week 5 React educational blueprint structure

- **Status:** OWNER APPROVED — D0 *planning structure*, based on the owner's instruction to move forward after applying the Week 5 draft. This is **not** a released React course, executed student test or learner-pilot result.
- **Scope:** `WEEK05_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK05_CHECKPOINT_INVENTORY.md`, `WEEK05_ASSESSMENT_ITEM_PLAN.md`, `WEEK05_SOURCE_TRACEABILITY.md`, and the future `docs/quality/WEEK05_PILOT_PROTOCOL.md`.
- **Accepted structure:** **11 required Week 5 lessons**, **25 checkpoint slots** (**22 required = 10 quiz groups / 57 planned question slots, 3 isolated pure-JS browser suites, 9 locally self-verified React/Vite activities; 3 optional**).
- **Required learning:** declarative React vs manual DOM, JSX, components/props, one-way data flow, state snapshots/functional updates, controlled forms, stable keys/immutability, state owner, derived views and browser storage. Keep `{id,title,completed}` and `study-tasks-week2`; maintain local React task manager and max 100-character title.
- **Scope boundary:** actual JSX/React components, hooks, Vite/npm and task UI are **self-verified locally**. The three browser suites may only auto-check genuinely executed **pure JS helpers**. `reference-solution/` stays private. Week 4 API Idea Inbox returns in **Week 6**, not required in Week 5; editing and deliberate storage migration remain optional.
- **Still outstanding:** complete student-facing lessons, reviewed questions and essential items, safe sandbox implementations, observed React UI/build results, D6 Week 5 learner pilot and formal content release. This approval does not authorize D2 or D6 work.
- **Effect:** Week 5 stable IDs and assessment allocation are accepted as the authoring baseline; request explicit approval for material prerequisite/pass-rule changes.

## Approval A-007 — Week 6 React Hooks, APIs and Routing educational blueprint structure

- **Status:** OWNER APPROVED — D0 planning structure only, based on the owner's request to move forward after applying the Week 6 draft. This is **not** approved finished content or an executed React/browser learner pilot.
- **Scope:** `WEEK06_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK06_CHECKPOINT_INVENTORY.md`, `WEEK06_ASSESSMENT_ITEM_PLAN.md`, `WEEK06_SOURCE_TRACEABILITY.md` and future `docs/quality/WEEK06_PILOT_PROTOCOL.md`.
- **Accepted structure:** **12 required lessons**, **26 proposed checkpoints** (**23 required: 11 quizzes / 61 item slots, 2 plain-JS browser suites, 10 local React self-attestations; 3 optional**). Source C01–C26 and 41 archive entries traced.
- **Required learning:** safe remote JSON normalization, `useEffect` dependencies and cleanup, abort/stale-result handling, honest loading/empty/error/retry/offline states, router/deep links, shared task state, local persistence and React API Idea Inbox. Offline/fake-fetch coverage is mandatory; the live public API cannot block completion.
- **Hard boundary:** auto-grade only pure-JS normalization/fake-fetch behavior in the isolated runner. Do not claim a mounted React app, `useEffect`, React Router navigation, npm build or browser storage integration was auto-verified by Fieldbook; those are **self-verified locally**. Custom hooks and route params are optional; the first Express backend is Week 7.
- **Not approved:** actual learner explanations, 61 reviewed quiz questions, runnable code tests, React build, D6 learner pilot, overall D0/D1 signoff or D2 authorization.
- **Effect:** Week 6 structure becomes approved authoring baseline A-007. Keep stable lesson/checkpoint IDs unless explicit owner review changes the contract.

## Overall gates remain unchanged

- **DEC-18, DEC-19, DEC-20, DEC-22:** OPEN at their recorded review milestones.
- **D0:** NOT fully signed off; remaining weeks' audits, resets/progress review, content-model signoff and other work remain.
- **D1:** NOT signed off; actual mockups/brand visual approval pending.
- **D2:** NOT AUTHORIZED; no React scaffold or application implementation yet.


## Approval A-008 — Week 7 Node.js and Express educational blueprint structure

- **Status:** OWNER APPROVED — **D0 planning structure only**, based on owner instruction to continue after installing the Week 7 ZIP. This does **not** mean a backend, student test or learner pilot ran.
- **Scope:** `WEEK07_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK07_CHECKPOINT_INVENTORY.md`, `WEEK07_ASSESSMENT_ITEM_PLAN.md`, `WEEK07_SOURCE_TRACEABILITY.md`, and the later `WEEK07_PILOT_PROTOCOL.md`.
- **Accepted structure:** 12 required lessons, **27 proposed checkpoints: 24 required** (12 quizzes / 66 planned scored question slots, 2 isolated plain JavaScript checks, 10 real local-project self-attestations), plus 3 optional.
- **Educational boundaries:** Week 7 server tasks are **memory-only**; frontend `/server` lab is **read-only**; React writes in Week 8, PostgreSQL durability in Week 9, authentication in Week 10. Fieldbook's own app remains static, browser-local and does not run Node/Express.
- **Still pending:** complete lesson authoring, quiz wording/essential flags/retry variants, sandbox implementation, learner-run HTTP tests/build proof, D7 Week 7 pilot, source-publication review, full D0/D1 and D2 authorization.
- **Effect:** Week 7 stable IDs and gate allocation are now the approved *planning* baseline; any change to required gates needs owner approval.

## Historical Week 8 source-inspected draft — **SUPERSEDED BY A-009 BELOW**

- **Historical status:** This was the Week 8 pre-approval proposal. It is **now owner-approved as A-009** below; no development work is authorized.
- **Source:** 32 instructor chapters and 77 ZIP entries (37 starter + 38 reference + 2 top-level); see `WEEK08_SOURCE_TRACEABILITY.md`.
- **Draft structure:** 11 required lessons, **27 checkpoint slots** (24 required: 11 quizzes / 66 planned question slots, 3 isolated fake-fetch pure-JavaScript browser suites, 10 locally self-verified React/Express checks; 3 optional).
- **Scope:** separate processes → API contract/proxy → fetch client → GET → POST → PATCH → DELETE → pending/race/error states → test/debug → independent integrated Week 8 CRUD capstone. Backend remains **in-memory**; PostgreSQL Week 9.
- **Read-only review:** `prompts/11_UNIVERSAL_D0_WEEK08_BLUEPRINT_REVIEW.md`; future D7 pilot protocol has not been executed.
- **No coding authorization:** D0 and D1 are still unsigned, D2 **NOT AUTHORIZED**. Week 8 structural approval is recorded in A-009 below; this historical section is retained for traceability.

## Approval A-009 — Week 8 React/Express integration educational blueprint structure

- **Status:** **OWNER APPROVED — D0 planning baseline**, through the owner's instruction to proceed after receiving and replacing the Week 8 draft ZIP. This records agreement to its *structural plan only*.
- **Scope:** `WEEK08_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK08_CHECKPOINT_INVENTORY.md`, `WEEK08_ASSESSMENT_ITEM_PLAN.md`, `WEEK08_SOURCE_TRACEABILITY.md` and future `docs/quality/WEEK08_PILOT_PROTOCOL.md`.
- **Accepted:** **11 required lessons / 27 checkpoints** (**24 required = 11 quiz-auto / 3 isolated pure-JS fake-fetch browser checks / 10 locally self-verified React/Express tasks; 3 optional**) and **66 proposed scored question slots**. All original C01–C32 chapters and 77 original code archive entries are mapped.
- **Boundary:** The React task manager uses Express memory as the authoritative store; POST/GET/PATCH/DELETE have meaningful HTTP contracts including 80-character title limit and empty DELETE 204. Browser-safe fake fetch can only test plain JS API-client behavior; local React/Express tests are **learner self-verified**. Database persistence belongs in Week 9; no new authentication or back-end for the Fieldbook platform.
- **Still pending:** actual student prose, quiz banks/essential item wording, sandbox test execution, local React/Express integration evidence, accessibility review and future D7 Week 8 learner pilot.
- **Approval effect:** Week 8 authoring may follow these stable lesson/checkpoint IDs. Any material change in gating policy needs owner approval. **Not** a D0/D1 global signoff or D2/D7 coding authorization.

## Week 9 source-inspected D0 blueprint — OWNER REVIEW PENDING (not A-010 yet)

- **Status:** D0 draft prepared from **C01–C34** Week 9 source Markdown and **94** source ZIP files. The owner has **not yet approved Week 9's structural plan**.
- **Draft scope:** `WEEK09_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK09_CHECKPOINT_INVENTORY.md`, `WEEK09_ASSESSMENT_ITEM_PLAN.md`, `WEEK09_SOURCE_TRACEABILITY.md`, future `docs/quality/WEEK09_PILOT_PROTOCOL.md`, and `prompts/12_UNIVERSAL_D0_WEEK09_BLUEPRINT_REVIEW.md`.
- **Proposed:** **12 lessons / 27 checkpoint slots**, 24 required (**12 quizzes / 72 scored item intents, 2 isolated fake-pool JavaScript browser suites, 10 real local PostgreSQL project attestations**), plus 3 optional.
- **Data boundary:** PostgreSQL table replaces Express memory, not the UI/HTTP contract. The student proves persistence over backend restart, parameterization, `WHERE` safety, migration, and destructive test isolation in a separately named `_test` database.
- **Still pending:** owner's Week 9 structural review; finished question bank, isolated test code, local/live DB demonstration, full D7 pilot and all D0/D1/D2 authorizations.


## Approval A-010 — Week 9 PostgreSQL / SQL educational blueprint structure

- **Status:** OWNER APPROVED — D0 planning structure through the owner's request to continue after downloading and replacing the Week 9 package. This approval records the 12 required lessons, 27 checkpoints (**24 required = 12 quiz groups / 72 future scored item slots, 2 fake-pool plain-JS browser tests, 10 locally self-verified database exercises; 3 optional**).
- **Scope:** `WEEK09_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK09_CHECKPOINT_INVENTORY.md`, `WEEK09_ASSESSMENT_ITEM_PLAN.md`, `WEEK09_SOURCE_TRACEABILITY.md` and future `WEEK09_PILOT_PROTOCOL.md` (not run).
- **Boundary:** In-memory Express tasks become persistent PostgreSQL rows, but the API contract stays the same; user accounts and per-owner SQL are **Week 10**. Verify `_test` DB before destructive tests. No live SQL or learner evidence is claimed by this planning approval.
- **Still pending:** student-facing lesson content, technical review, actual database tests, safe browser-runner implementation, D7 learner pilot, global D0/D1 signoff and D2 coding authorization.

## Historical Week 10 source-inspected proposal — superseded by owner approval A-011

- **Historical pre-approval status:** This proposal was initially not approved but was subsequently accepted as **A-011**. The initial D0 mapping is based on original Week 10 guide **C01–C38** and source ZIP **125** entries; future platform content implementation is **D8**, not authorized.
- **Proposed:** 12 required lessons with stable IDs `p1-w10-l01`–`l12`, **27 checkpoint IDs** (**24 required = 12 quizzes / 72 planned scored question intents, 2 isolated plain-JS checks, 10 real local auth/ownership self-verifications; 3 optional**).
- **Technical learning milestone:** Argon2id library concepts, users/user_tasks/session tables, cookie-based session restoration, registration/login/logout/me API, origin/CSRF limits, `requireAuth`, server-derived owner scoping in every task query, negative Alice/Bob tests, and privacy-conscious AI review.
- **Critical boundary:** Old Week 9 shared task rows remain untouched; no automatic ownership assignment. Browser fake-pool/validation exercises do not prove actual secure auth. Private C33 answer key and C38 full reference stay out of public client assets. The educational auth stack is not production-ready.
- **Still pending after A-011:** finished student lesson prose, reviewed question/distractor banks, browser tests, live local project runs, security review, and later D8 learner pilot. D0/D1 unsigned, D2 **NOT AUTHORIZED**.

## Approval A-011 — Week 10 Authentication / Authorization educational blueprint structure

- **Status:** OWNER APPROVED — D0 authoring structure only, inferred from the owner's instruction to proceed after applying the Week 10 ZIP, following established review cadence.
- **Scope:** `WEEK10_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK10_CHECKPOINT_INVENTORY.md`, `WEEK10_ASSESSMENT_ITEM_PLAN.md`, `WEEK10_SOURCE_TRACEABILITY.md`, and future `WEEK10_PILOT_PROTOCOL.md`.
- **Accepted:** **12 required lessons, 27 checkpoints** (**24 required: 12 quiz groups / 72 proposed items, 2 isolated pure-JS browser suites, 10 real local auth/ownership self-verifications; 3 optional**). Original C01–C38 and 125 ZIP entries traced.
- **Non-negotiable:** user-owned rows, server-verified session identity, preserved legacy unowned Week 9 rows, fake Alice/Bob authorization negative tests, logout invalidation and credential privacy; educational auth is not certified production-ready.
- **Still pending:** final learner text/questions, secure browser runner, real Node/PostgreSQL session and isolation results, security review and D8 pilot. Structural approval is **not** evidence tests passed.
- **Gate:** This does NOT approve overall D0, D1 or D2 implementation.

## Week 11 source-inspected D0 blueprint — OWNER REVIEW PENDING (not A-012)

- **Status:** D0 draft from **40 numbered original chapters** and **152 source-ZIP entries**, traced in `WEEK11_SOURCE_TRACEABILITY.md`.
- **Proposed:** **11 required lessons; 27 checkpoint slots** (24 required: 11 quizzes / 66 planned question items, 2 isolated pure-JS browser checks, 11 locally self-verified reliability/release tasks; 3 optional).
- **Scope:** Node/API/database/browser test layers; DevTools tracing and request IDs; public safe error mapping and React recovery; secrets/startup guards; cookies/headers/proxy; liveness vs readiness; built React/Express one-origin local preview; release report, rollback and bounded AI review.
- **Mandatory evidence:** safe test target `_test`, Alice/Bob isolation smoke, fake dependency 503/readiness demonstration, no secret leakage, local SPA/API route checks, truthful release readiness report.
- **Not mandatory:** paid AI services, public HTTPS deployment or a free-hosting account. A local preview is the core release exercise.
- **Still pending:** owner structural approval; full question bank; isolated JS grading; learner-run unit/HTTP/DB/browser checks; D8 pilot; final lesson QA. C36 answer key and C40 reference code remain private.
- **Next:** Owner reviews `WEEK11_*` and `docs/quality/WEEK11_PILOT_PROTOCOL.md`; then source-inspect Week 12. D0/D1 unsigned, D2 **NOT AUTHORIZED**.

## Approval A-012 — Week 11 Testing, Security and Deployment Readiness educational blueprint structure

- **Status:** OWNER STRUCTURALLY APPROVED (2026-11-17): owner applied the Week 11 planning ZIP and instructed continuation to Week 12, consistent with prior incremental review cadence.
- **Accepted scope:** 11 required lessons; 27 checkpoints = **24 required** (11 quiz groups/66 future question intents, two isolated synthetic JS checks, 11 learner-run local reliability/release attestations) + three optional. Original Week 11 C01–C40 and 152 source ZIP entries traced.
- **Key teaching boundaries:** separate unit/HTTP/database/browser tests; safe `_test` data; request IDs and privacy-safe errors; liveness/readiness; single-origin local built preview and truthful release/rollback report. Public deployment is optional.
- **Not approved or performed:** actual Node/PostgreSQL/browser tests, finished quiz banks, future D8 learner pilot, full D0/D1 signoff, D2 app scaffolding or production security certification.

## Historical Week 12 draft snapshot — before A-013 (archived)

- **Source:** original Week 12 instructor C01–C45; separate private source ZIP contains **165 paths**, including `student-starter/` and instructor `reference-solution/`. All traced in `WEEK12_SOURCE_TRACEABILITY.md`.
- **Draft:** **11 lessons** (`p1-w12-l01`–`l11`), **27 checkpoint IDs** = 24 required (11 quiz sets/66 future items, two pure-JS synthetic date suites, eleven genuinely local self-attestations) + 3 optional.
- **Required project:** safe additive priority (`low|medium|high`, default medium) and nullable calendar due date across PostgreSQL, Express and React. A01–A10 demonstrate validation, omitted/null PATCH semantics, backwards compatibility, persistence, Alice/Bob owner isolation, failure recovery and explanation.
- **Graduation:** 100-point rubric is self-assessment/mentor guidance, not authenticated remote grading; **critical security/data/secret failures require Hold**. Three debugging labs, ten independent oral explanations, an honest evidence log and release report. Dashboard/public deployment/AI accounts optional.
- **Outstanding at the time:** owner Week 12 structural approval (subsequently granted in A-013); final cross-week prerequisites and reset/import trace; content publishing rights; DEC-19 lesson total after pilot; real student content/quiz authoring, secure browser runner and actual pilots; global D0 and D1 signoff. D2 coding is **NOT AUTHORIZED**.


## Approval A-013 — Week 12 capstone educational blueprint structure (2026-11-17)

- **Approval trigger:** Owner reported applying the Week 12 blueprint ZIP and explicitly agreed to proceed with the final D0 consistency/signoff review, following the established weekly approval cadence.
- **Accepted structure:** 11 required student lesson slots; 27 checkpoint slots = **24 mandatory** (11 quiz sets with 66 proposed question intents, two synthetic pure-JavaScript browser tests, eleven local project self-verifications), plus three optional enrichments.
- **Source coverage:** All original Week 12 C01–C45 instructor chapters and 165 archive paths given a traceability disposition; instructor answer key and finished reference solution remain private.
- **Required capstone focus:** Priority and optional due date as a full-stack vertical slice across PostgreSQL, Express and React, with genuine owner authorization tests. Optional dashboard and public deployment never block graduation.
- **Critical hold rule:** Unverified foreign-account access, unsafe destructive migration, missing authorization, or failed required verification must be shown as incomplete / Hold; a high score or polished UI cannot override these safety gates.
- **Not approved or performed:** Student-facing question bank, live database tests, secure coding runner, local full-stack execution, D8 learner pilot, independent verification of graduation, final D0 signoff, D1 signoff, or D2 application development.

## D0-AUDIT-001 — Cross-week review completed for owner consideration (2026-11-17)

- Audited current planning ZIP baseline for **138 unique proposed lesson IDs**, **304 unique proposed checkpoint IDs**, **347 instructor source chapter identifiers represented across the 12 traces**, and the four DEC-21 verification classifications.
- Generated `docs/curriculum/D0_CROSS_WEEK_AUDIT.md`, `D0_PREREQUISITE_CONTRACT.md`, and read-only master indexes.
- Corrected authoritative status headers and documented historical status notices as archival.
- **Status:** Audit prepared. **D0 owner signoff is still UNCHECKED**; see `docs/product/D0_OWNER_SIGNOFF.md`. D1 and D2 remain pending.

## Approval A-014 — Final D0 planning-baseline owner signoff (2026-11-17)

- **Explicit trigger:** The product owner stated **“I approve D0”** in this conversation. Unlike a ZIP download or a routine “move next” message, this is explicit milestone approval.
- **Accepted:** D0-AUDIT-001, the 12 structurally approved week blueprints through A-013, the provisional 138-lesson/304-checkpoint inventory, source and project boundaries, DEC-21 methods and evidence rules, the explicit cross-week prerequisite plan (including optional Week 4 L10 bypass), and documented implementation/pilot deferrals.
- **Acceptance location:** `docs/product/D0_OWNER_SIGNOFF.md`.
- **D0 outcome:** **APPROVED AS A PLANNING BASELINE**. Future lessons, reviewed item banks, secure sandbox, browser tests, local full-stack tests, PWA QA and learner pilots remain unimplemented and unverified.
- **DEC-19:** Remains **OPEN**. Lesson/checkpoint totals are provisional until the integrated Week 1 mastery pilot at D4.
- **New phase:** **D1 design and UX review**, with DEC-20 and design signoff pending. See `docs/product/D0_TO_D1_HANDOFF.md` and `docs/design/D1_DESIGN_BRIEF.md`.
- **Authorization boundary:** **D2 application code is NOT authorized**. A-014 is not a license to scaffold, run npm or build pages. D1 signoff and an explicit subsequent D2 instruction are mandatory.

Earlier entries in this log are retained as **historical approval snapshots**; any earlier “D0 pending” status is superseded by A-014.
