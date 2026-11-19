# Quality and Acceptance Plan — Evidence-Based Development

> **CURRENT AUTHORITATIVE PLANNING STATUS — 2026-11-17:** All 12 weekly educational BLUEPRINT STRUCTURES have owner approval (Week 12 = **A-013**). The D0 **cross-week audit is prepared**, but the owner has **not yet signed off D0**. All learner-ready content, question banks, code runners and pilots remain future work. D1 visual approval and explicit D2 coding authorization are also pending. Historical status notices in this document describe prior snapshots and are superseded by `docs/product/D0_OWNER_SIGNOFF.md` and `docs/product/D0_APPROVAL_LOG.md`.

> **Current D0 acceptance reference (2026-11-17):** 12 owner-approved weekly planning structures, 138 proposed lessons and 304 checkpoint slots; see `docs/curriculum/D0_CROSS_WEEK_AUDIT.md`. **No** application tests, code runner, user pilot or final D0 signoff have been performed. Later-stage checklist items remain pending, not silently checked off.




## General release principle

A compilation success is necessary but not sufficient. Every milestone is accepted only if it functions as described to a real learner, handles failures honestly, and meets design/accessibility requirements. Record tests **actually run** and separate them from manual checks still needed.

## Historical D0 baseline — superseded: Weeks 1–9 approved, Week 10 was draft

**Week 1 owner-approved structure (A-001):** 12 lessons, 20 checkpoint slots (18 required, 2 optional), 7 quiz sets/40 authoring item slots. The Week 1 source trace and checkpoint structure are **authoring baselines**, not completed/validated student content. See `docs/product/D0_APPROVAL_LOG.md`, `docs/curriculum/WEEK01_LESSON_ASSESSMENT_BLUEPRINT.md` and related Week 1 files.

**DEC-24 D3/D4 approved dependency:** D3 is a Week 1 **content/navigation/quiz usability dry run** with unscored/clearly pending code exercises if safe runner is absent. D4 implements the isolated browser code runner and conducts the **full integrated Week 1 mastery pilot**. Neither has occurred; D3 must not generate fake browser-code successes or final graduation.

**Week 2 owner-approved structural plan (A-003):** source-inspected 11 lessons, 22 checkpoints (19 required, 3 optional), 8 quiz sets/45 item slots. See `docs/curriculum/WEEK02_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK02_CHECKPOINT_INVENTORY.md`, `WEEK02_SOURCE_TRACEABILITY.md`, `WEEK02_ASSESSMENT_ITEM_PLAN.md` and `docs/quality/WEEK02_PILOT_PROTOCOL.md`. This approval covers the structure, **not** implemented or learner-tested item banks/suites.

**Week 3 owner-approved structural plan (A-004):** 11 stable lessons, 24 checkpoints (21 required / 3 optional), eight quiz groups/45 planned slots. See `docs/curriculum/WEEK03_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK03_CHECKPOINT_INVENTORY.md`, `WEEK03_ASSESSMENT_ITEM_PLAN.md`, `WEEK03_SOURCE_TRACEABILITY.md`, and `docs/quality/WEEK03_PILOT_PROTOCOL.md`. This is planning-structure approval only; none is an executed Fieldbook test suite or finished student lesson.

**Week 4 D0 structural baseline owner-approved A-005:** 12 slots (11 required + optional advanced L10), 25 checkpoints (21 required / 4 optional), nine required quiz groups/50 planned slots, eight browser-code suites and four local attestations. See `docs/curriculum/WEEK04_*` and `docs/quality/WEEK04_PILOT_PROTOCOL.md`. All required browser assessments must use fake fetch/offline fixtures; cancellation/AbortController stays optional and no external API outage can block mastery. No lessons or runner tests have been executed.

**Week 5 owner-approved structural plan A-006:** 11 required React lesson IDs, 25 checkpoints (22 required: 10 quiz groups / 57 planned items, 3 pure-JS browser checks, 9 local React attestations; 3 optional); see `WEEK05_*` and the future `WEEK05_PILOT_PROTOCOL.md`. No automatic compiled JSX claim. Week 5/6 belongs to **D6**.

**Week 6 owner-approved D0 structural plan A-007:** 12 required lessons, 26 checkpoints (**23 required: 11 quizzes/61 planned items, 2 pure-JS browser-code suites and 10 actual local React attestations; 3 optional**). Public practice API is non-gating; offline/fake responses are mandatory. Real `useEffect`, Router, storage and build must be self-verified locally. No final quiz bank, tests or D6 learner pilot have been executed.

**Week 7 OWNER-APPROVED structural plan A-008:** 12 required lessons, 27 checkpoints (**24 required: 12 quiz-auto sets/66 planned scored slots, 2 isolated plain-JS store/validation suites, 10 actual Node/Express/React local attestations; 3 optional**). All 27 C## chapters and 68 code ZIP entries traced; `WEEK07_*` docs and future `WEEK07_PILOT_PROTOCOL.md`. Backend has **memory-only** tasks and React API Lab is **read-only**. Fieldbook does not execute npm, Express or real HTTP; local evidence is self-reported. Week 8 integrates writes, Week 9 PostgreSQL. No final learner content or executed checks.

**Week 8 OWNER-APPROVED D0 structural plan A-009:** 11 required lessons, 27 proposed checkpoints (**24 required: 11 quizzes/66 future item slots, 3 plain-JS fake-fetch isolated suites, 10 actual local React/Express attestations; 3 optional**). All 32 chapters and 77 source archive entries mapped. Express **memory** is task authority; no PostgreSQL until Week 9. Required error cases: fetch 400 vs network, bad JSON/HTML, 204 empty response, 80-character validation, server-issued IDs, draft preservation, pending duplicate protection and Node restart. Do not auto-grade real React/Express or call source tests executed. **Week 8 D7 pilot unrun; structural approval does not mean tested software**.

**Week 9 SOURCE-INSPECTED STRUCTURE OWNER-APPROVED A-010:** 12 required lessons / **27 proposed checkpoints (24 required = 12 quiz groups/72 intended items, 2 isolated fake-pool JS browser suites, 10 real locally self-verified PostgreSQL exercises; 3 optional)**. Original source C01–C34 and 94 code archive files mapped. Preserve Week 8 HTTP contract, replace backend task memory with persistent PostgreSQL, teach safe parameterization and separate `_test` DB for live destructive tests. **No live SQL, local npm, code-runner or D7 pilot results are claimed by this plan.**

**Overall D0/D1 remain unsigned; D2 is not authorized.**

## Test layers

| Test layer | Examples | Appropriate milestones |
|---|---|---|
| Pure unit tests | prerequisites, stable IDs, quiz scoring, resets, migrations | D2 onward |
| Schema/manifest tests | duplicate IDs, missing source refs, invalid content, cycles | D2–D8 |
| Component tests | disabled/active quiz actions, feedback, dialogs | D3 onward |
| Browser E2E | lock bypass, quiz→unlock, resume, reset, backup import | D2–D9 |
| Accessibility checks | keyboard, focus order, screen reader, contrast, reduced motion | D1 prototype and D2–D9 |
| Content validation | educational accuracy, runnable examples, misconceptions, answers | Each content week |
| Offline tests | complete bundled course in airplane mode, update/recovery | D9 |
| Security tests | sandbox escape, message spoofing, code timeout, imported data safety | D4 and D9 |

## Acceptance criteria by stage

### D0: planning and curriculum

- [ ] All 12 PDFs, all 12 project ZIPs and 12 source text guides cataloged.
- [ ] Proposed lesson map includes source chapter refs for every lesson.
- [ ] Every original *instructional* chapter is represented or justified as instructor-only.
- [ ] Clarify what is automatically graded vs. self-verified for each project.
- [ ] Owner signs off mastery/reset, v1 scope, and consent-free privacy assumptions.

### D1: design

- [ ] Dashboard, week page, lesson, quiz, playground, project lab, settings/backup, mobile layouts designed.
- [ ] Light/dark tokens, typography, spacing and component states approved.
- [ ] Focus/keyboard and result announcement behavior specified.
- [ ] Design review includes storage-warning, failed assessment and locked state.

### D2: application shell

- [ ] 12 weeks can display using placeholder manifest; no fabricated lesson mastery.
- [ ] Clicking locked deep link shows prerequisite explanation.
- [ ] Refresh retains valid progress under same origin.
- [ ] Invalid progress JSON does not crash app.
- [ ] Reset lesson cascades to dependencies; retry does not delete prior mastery.
- [ ] Full reset warns and suggests export.
- [ ] Import validates and previews overwrite; known milestones survive export/import.
- [ ] Site builds and SPA deep links work on a local static server.

### D3: Week 1 real content, quizzes, limited dry run

- [x] Week 1 lessons are fully authored, not placeholder text.
- [x] Each lesson maps to source chapters and has objective/practice/checkpoint.
- [x] Quiz incorrect answer explains specific misconception.
- [x] Failed attempt supports retry/hint, never permanent lock.
- [x] Success unlocks exactly the next eligible lesson.
- [x] Owner-selected automated walkthrough completed. See [results, content correction and retest](D3_WEEK01_REVIEW.md).
- [ ] Dry-run learner can explain Week 1 concepts and navigate real authored lessons/quizzes; unfinished code labs are labeled unverified.
- [ ] At least one **limited** learner usability/content dry run documented with resulting content corrections. Full mastery checks are **not yet passed**.

### D4: safe browser coding + full integrated Week 1 mastery pilot

- [ ] HTML/CSS preview isolation and JS execution limits reviewed.
- [ ] Obvious injection/escape attempt cannot access parent progress storage.
- [ ] Infinite-loop JS exercise does not freeze site indefinitely.
- [ ] Runtime exceptions and failed tests provide useful, accurate feedback.
- [ ] Reset-editor is distinct from reset-mastery.
- [ ] Tests use meaningful edge cases, not brittle textual equality.
- [ ] All seven Week 1 browser-code checkpoints run in the vetted runner and failures produce honest results; L05 geometry check is validated or an owner-approved alternative applied.
- [ ] At least one learner completes the **integrated** Week 1 path; complete gates and local attestations are validated without a teacher supplying the answers.
- [ ] Owner signs off the full D4 Week 1 pilot before broad Week 2–12 rollout.

### D5–D8: curriculum conversion (Weeks 2–4 are in D5)

- [ ] Every published lesson has a reviewed source reference and passing content QA.
- [ ] Actual code examples are run or independently validated in intended local runtime.
- [ ] D5 Week 2: 8 quiz sets, 8 browser-code suites and 3 local self-verification gates meet the **approved Week 2 structural contract**; execute Week 2 pilot before claiming validation.
- [ ] D5 Week 3: 8 quiz sets, 8 browser-code suites and 5 local self-verification gates meet the **approved Week 3 structural contract (A-004)**; validate module/server instructions, DOM keyboard focus, event delegation and the local project pilot before claiming Week 3 validated.
- [ ] D5 Week 4: nine quiz sets, eight safe fake-fetch/browser-code suites, and four local self-verification gates meet the **owner-approved A-005 Week 4 structural contract**. Exercise 200-empty vs failure, HTTP 503 vs offline, invalid JSON/payload, remote/local ID collision, safe text and persistence. L10 cancellation is optional and never blocks Week 5. Run the Week 4 pilot before claiming validation.
- [ ] **D6 Week 5 React:** only 3 pure-JS sandbox suites are eligible for `browser-code-auto`; 9 actual Vite/React JSX/state/effect/project checks must remain `local-project-self-verified`. Author 10 quiz groups / 57 planned slots, verify all 22 required gates, optional edit/migration, Week 4 idea inbox deferred Week 6, and conduct the actual D6 learner pilot. Source reference 25 tests are NOT React UI verification.
- [ ] **D6 Week 6 React:** author 11 quiz groups/61 question slots, run 2 isolated pure-JS `normalizeIdeas`/fake-fetch suites with no live network, review **10 self-verified React project gates**, validate all 23 required checkpoints, offline/failure/race/Route interactions and real local build, then conduct actual Week 6 learner pilot. Custom hooks, route params and optional AI exercise must remain non-gating. Do not label helper tests as mounted React/Router checks.
- [ ] **D7 Week 7 Node/Express:** author the 12 lesson explanations and 12 quiz groups/66 planned items; run exactly 2 browser-code pure-JS suites (store + validation) in vetted isolation and label all **10 Node/HTTP/React local project gates self-verified**. Confirm 201+Location, 204 empty, malformed JSON/400/404, PATCH false, stable IDs and process restart. Require Week 7 integrated API and independent no-AI bug gate. Future D7 pilot must actually run before acceptance. **Do not** claim the static academy starts Express or executes local HTTP tests.
- [ ] **D7 Week 8 React + Express:** author 11 quizzes/66 planned items, verify exactly 3 isolated plain-JS fake-fetch suites (client/error/204) in a safe runner, and support **10 learner-reported real local integration checks** for two processes, proxy, GET/POST/PATCH/DELETE, errors/races, tests and independent bug fix. Confirm all 24 required gates and future D7 pilot; no fake React/Express execution claim, database postponed to Week 9.
- [ ] **D7 Week 9 PostgreSQL/SQL:** Author **12 lessons and 12 quizzes/72 proposed scored items**, implement **only 2 isolated browser-safe plain-JS fake-pool suites** (row mapping and parameter-array behavior), and label **10 real PostgreSQL/local Express project checks self-verified**. Before any destructive `db.test.mjs` execution require visible verification of a separate `_test` DB; SQL injection placeholders, WHERE safety, `.env` secrecy, migration execution and backend-restart persistence are core. Preserve Week 8 status/body contract and show that Week 10 auth/ownership is absent. Run a real later D7 Week 9 learner pilot; never claim the browser runner executed PostgreSQL.
- [ ] Project continuity and source archive versions are documented.
- [ ] Weeks 7–12 labs say “self-verified,” not “automatically graded.”
- [ ] Wrong-answer messages direct learners to the precise relevant concept.
- [ ] All week gates tested through completion and reset.
- [ ] Capstone includes planning, implementation, tests, explanation and honest verification.

### D9: public release

- [ ] Mobile layout at representative widths and desktop layout tested.
- [ ] Keyboard operation, visible focus, contrast and accessible error announcements tested.
- [ ] Core learning content works offline after explicit cache preparation.
- [ ] Missing/offline remote optional links degrade gracefully.
- [ ] Progress survives service-worker app update where compatible.
- [ ] Backup restore works across supported browsers with same course version.
- [ ] Broken/corrupt backup and blocked storage are handled safely.
- [ ] No instructor answer keys/reference ZIPs bundled into public assets unintentionally.
- [ ] Public privacy and license information published.

## Content QA rubric (per student lesson)

| Dimension | Questions |
|---|---|
| Accuracy | Is technical explanation correct for the specified environment? |
| Independence | Can a learner follow without mentor filling in missing steps? |
| Meaningful practice | Does exercise require reasoning beyond copying? |
| Feedback | Can the learner understand why a wrong attempt is wrong? |
| Assessment | Does a pass demonstrate the stated learning outcome? |
| Continuity | Does it build from prerequisites and connect to current project? |
| Readability | Clear heading hierarchy, short paragraphs and code annotations? |
| Accessibility | Semantic controls, keyboard use, contrast and screen reader? |
| Source trace | Original Week/chapter and reference code archived and documented? |

Any one severe flaw in accuracy/security/assessment honesty blocks publication of that lesson.

## Suggested milestone report format

- Milestone ID and exact work authorized.
- Files added/changed.
- Demonstration script: what a beginner should click and see.
- Test commands, outcomes and logs where available.
- Manual QA completed, with device/browser noted.
- Known issues and deviations from spec.
- Decisions requiring owner approval.
- Explicit statement: next stage NOT started.


## Historical D0 update — Week 9 approved / Week 10 pre-approval draft

**Week 9 structure accepted A-010:** 12 lessons / 27 checkpoints, 24 mandatory (12 quizzes, 2 browser fake-pool suites, 10 real PostgreSQL self-verified labs), 3 optional; only source/assessment mapping approved, not a completed DB test or learner trial.

**Week 10 proposed D8 acceptance:** Author 12 required lessons, 12 quiz groups/72 planned scored item slots, 2 safely isolated pure-JS browser suites (credential validation and owner-scoped fake-pool calls) and **10 real local-project attestations** including migrations, Argon2, session lifecycle, trusted-origin behavior, owner-scoped CRUD, React state clearing and final two-account negative tests. Require missing login 401, untrusted Origin unsafe request 403, foreign GET/PATCH/DELETE 404, and **unchanged owner data**. Do not assume fake SQL proves real Postgres. Stage D8 must conduct a real learner pilot before claiming educational completion; no implementation authorization here.

## D0 checkpoint acceptance — Week 11 source-inspected draft (2026-11-17)

- [ ] Owner reviews **11 Week 11 lesson IDs** and **27 checkpoints** (11 quiz groups / 66 planned items, 2 isolated pure JS tests, 11 local self-attestations, 3 optional) for educational appropriateness.
- [ ] No browser runner claim for Node, Express, React build, PostgreSQL, session ownership, HTTPS or release infrastructure. All such evidence must say **Self-verified locally**.
- [ ] Validate synthetic browser tests for safe log field selection and safe public error classification; no networking, secrets, host progress access or private logs.
- [ ] Verify `*_test` disposable DB guard and stop behavior; never run destructive tests on shared/uncertain DB.
- [ ] Confirm locally built SPA `/tasks` and `/ideas` refresh and JSON `/api/*` fallbacks, with real observed output before claiming the learner passed.
- [ ] Require a release report and rollback plan. Public deployment remains **optional**; local HTTP preview is not proof of HTTPS cookie correctness.
- [ ] Exclude C36 instructor answers, C40 complete source appendix and `reference-solution/**` from public build.
- [ ] Run a real learner pilot later at D8 after the relevant stages are authorized; these docs do not constitute test results.

Week 10 structural authoring baseline is accepted **A-011**; Week 11 stays a **draft**. D0 and D1 remain unsigned and D2 not authorized.

## Week 11 A-012 acceptance / Week 12 capstone draft criteria (2026-11-17)

- [x] **Week 11 planning structure:** owner approved 11 lessons, 27 checkpoint slots in A-012; no runtime tests were executed by this approval.
- [x] **Week 12 source inventory:** all C01–C45 headings and 165 original code ZIP entries traceable; instructor answers/reference private.
- [ ] **Week 12 structural owner decision:** confirm 11 lessons, 27 checkpoints (24 required, three optional), A01–A10 final capstone criteria, critical Hold override and no “verified developer” badge.
- [ ] **Future student content quality:** draft/review 66 scored question items, required essential flags, equivalent retries, two isolated synthetic date code suites, local milestone evidence cards and no public instructor solutions.
- [ ] **Future D8 learner pilot:** verify realistic independent app setup, local testing evidence, fictional account isolation, no destructiveness, accessibility and truthful self-verification labels.
- [ ] **Global D0 closeout:** validate all 12 weeks and stable prerequisites, reset/import after updates, DEC-19 provisional counts, source traceability and stage approvals.

**Critical safety criterion:** An owner-leak, exposed secret or unsafe destructive migration cannot be offset by a high quiz score or polished dashboard. “Hold” is appropriate risk reporting, but does not qualify an unsafe project for successful capstone completion. Tests executed locally by the student remain self-attested by Fieldbook. D0/D1 unsigned; D2 unauthorized.
