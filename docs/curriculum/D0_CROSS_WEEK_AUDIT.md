# D0 Cross-Week Curriculum & Assessment Audit — FullStack Fieldbook

**Prepared:** 2026-11-17  
**Status:** AUDIT COMPLETED FOR OWNER REVIEW — **D0 NOT YET SIGNED OFF**.  
**Coverage:** Current cumulative planning repository after the Week 12 patch, and original source-package manifest. No student course, coding tests or live pilots have been executed in this audit.

## 1. Verified scope

The 12-week Phase 1 teaching sequence is represented by a provisional **138 student lesson IDs** (137 required + optional advanced Week 4 L10) and **304 unique checkpoint IDs** (268 required + 36 optional). The distinct method distribution is **122 quiz-auto**, **49 browser-code-auto**, **97 local-project-self-verified**, **36 optional-enrichment**. A total of **706 proposed scored question slots** across 122 quiz groups is planned, **not** 706 finished questions.

All **347 numbered original instructor chapters** are represented in the 12 `WEEKNN_SOURCE_TRACEABILITY.md` inventories. The private-source manifest contains **36 source artifacts** (12 Markdown guides, 12 PDFs and 12 code ZIPs); file-hash verification matched **36/36** entries. This is *structural traceability*, not an educational correctness or PDF visual-quality certification. Detailed instructor code and answer keys stay private.

### Week-by-week consistency table

| Week | Lesson slots | Source chapters | Checkpoints | Required | Optional | Quiz groups | Browser suites | Local attestations | Planned scored slots |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 01 | 12 | 16 | 20 | 18 | 2 | 7 | 7 | 4 | 40 |
| 02 | 11 | 20 | 22 | 19 | 3 | 8 | 8 | 3 | 45 |
| 03 | 11 | 22 | 24 | 21 | 3 | 8 | 8 | 5 | 45 |
| 04 | 12 | 24 | 25 | 21 | 4 | 9 | 8 | 4 | 50 |
| 05 | 11 | 23 | 25 | 22 | 3 | 10 | 3 | 9 | 57 |
| 06 | 12 | 26 | 26 | 23 | 3 | 11 | 2 | 10 | 61 |
| 07 | 12 | 27 | 27 | 24 | 3 | 12 | 2 | 10 | 66 |
| 08 | 11 | 32 | 27 | 24 | 3 | 11 | 3 | 10 | 66 |
| 09 | 12 | 34 | 27 | 24 | 3 | 12 | 2 | 10 | 72 |
| 10 | 12 | 38 | 27 | 24 | 3 | 12 | 2 | 10 | 72 |
| 11 | 11 | 40 | 27 | 24 | 3 | 11 | 2 | 11 | 66 |
| 12 | 11 | 45 | 27 | 24 | 3 | 11 | 2 | 11 | 66 |
| **TOTAL** | **138** | **347** | **304** | **268** | **36** | **122** | **49** | **97** | **706** |

Week 4's L10 is **optional**, so required lesson count = **137**; the 304 checkpoint total includes four Week 4 optional checkpoints. Numeric values are a **proposed authoring baseline** and DEC-19 remains OPEN until the integrated Week 1 learner pilot.

## 2. Structural checks performed

| Check | Result | Limitations |
|---|---|---|
| Lesson IDs across 12 blueprints | PASS — 138 unique identifiers | Content not learner-reviewed |
| Checkpoint IDs in twelve inventory tables | PASS — 304 unique identifiers | No runner/quiz code exists |
| Checkpoint verification types | PASS — exactly four DEC-21 methods used | Exact grading implementation pending |
| Required vs optional distribution | PASS — 268 required, 36 optional | Some proposed feasibility to validate at D4/D5 |
| Original numbered chapter identifiers in traceability files | PASS — 347 represented | Presence is not proof that finished lesson covers every detail |
| Original source package checksum manifest | PASS — 36/36 | Source PDF visual/layout re-review not performed |
| Cross-week conceptual sequence | COHERENT with clarifications | Formal prerequisite graph is proposed in the companion contract |
| Published quiz correctness or accessibility | NOT TESTED | D3–D8 curriculum production |
| Browser code sandbox isolation | NOT TESTED | D4 security review and implementation |
| Learner-run React/Node/PostgreSQL projects | NOT TESTED by academy | Local self-verification only |
| Real novice completion/pilot | NOT RUN | D3 dry run and D4 integrated Week 1 pilot, later D5–D8 |

## 3. Verified project/learning continuity

1. **Weeks 1 → 2:** Week 1 temporary DOM task list **does not persist** on refresh; Week 2 introduces task-state model and browser `localStorage`. The academy's own learning-progress storage must never be shared with the learner's task-app storage.
2. **Weeks 2 → 3:** Stable task IDs, safe DOM text rendering, state-first edits/search/sorting and pure logic tests continue the same data model.
3. **Week 4:** Read-only external example API or bundled fixtures; copied ideas become **local** tasks. Fake HTTP cases must be sufficient to pass regardless of third-party uptime. Cancellation/stale request advanced Week 4 L10 is **optional**.
4. **Weeks 5 → 6:** React/Vite replaces DOM-first UI; state/props/hooks and routing build on it. Vite's different browser origin can make previous `localStorage` data appear absent. JSX/React build is **not automatically graded** in the generic sandbox.
5. **Week 7:** Express API with temporary **in-memory** server task store; small React **read-only** API lab. Week 8 handles full React CRUD through Express; data still does not survive server restart.
6. **Week 9:** PostgreSQL persistence added behind the existing task API; real database tests must target a disposable test DB, never an unknown production database.
7. **Week 10:** Secure login/session basics and **server-enforced owner-scoped queries**. Required two-account checks include attempts to GET, PATCH and DELETE a foreign user's task by ID using fictional accounts.
8. **Week 11:** Testing, error handling and safe deployment preparation; local production-style demo and release report are **required**, public hosting is **optional**.
9. **Week 12:** Capstone priority + optional due dates across the full stack, with safe migrations, genuine owner checks and independent explanation. Dashboard and public hosting are **optional**. Failed critical authorization/migration checks override a high rubric score: report **Hold**, not completion.

## 4. Cross-week prerequisite contract proposed for approval

See `D0_PREREQUISITE_CONTRACT.md` and `D0_PREREQUISITE_INDEX.csv`. The plan requires completed mandatory checkpoints and the **prior week's entire graduation gate** before entering the next week. Default sequential required lessons within a week; one approved optional branching exception: Week 4 L10 is an optional path after L09, and **required L11 depends on L09, never L10**. Week 12 final project/readiness is the terminal Phase 1 gate; no fabricated Week 13.

The generated index has 138 lesson records and no missing or duplicate lesson IDs. It is an **authoring contract proposal for owner acceptance in D0 signoff**. Explicit dependencies should be frozen during content authoring, independently verified when the D2 engine is built, and tested with reset/import cases.

## 5. Key findings and controlled follow-ups

| ID | Severity | Finding | Resolution / stage |
|---|---|---|---|
| F01 | Document consistency | Historical README, approval log and weekly files contain earlier “draft” notices. | Current authoritative status stated at top of central docs; A-013 recorded. Historical snapshots remain archived. Do not infer state from old excerpts. |
| F02 | **Blocking D0 owner signoff** | Explicit cross-week lesson and week-gate dependency decisions require owner acceptance. | Review and accept `D0_PREREQUISITE_CONTRACT.md` in `D0_OWNER_SIGNOFF.md`. |
| F03 | Post-D0 content issue | Several weekly item plans propose different *future question ID styles* and only item intents, not complete banks. | Before authoring/publishing, adopt a unique reviewed question-ID convention, retain seed aliases, and document versioned migrations where necessary. Do not silently change released checkpoint IDs. D3–D8. |
| F04 | D4 feasibility risk | Week 1 responsive layout geometry-based browser grading may not be reliable or safe. | Prototype/test isolation, viewport handling and equivalent valid CSS; request an approved DEC-21 method change if automatic grading is infeasible. D4. |
| F05 | Content quality risk | All 706 planned item slots need actual stems, answers, misconceptions, equivalent retries and novice usability testing. | Produce and review content during D3–D8; numeric counts are **not evidence** of learning success. |
| F06 | Security/privacy risk | Generic browser evaluator cannot inspect learner's local React/Express/PostgreSQL or authenticate self-report. | Keep labels explicit; no server/no paid tool dependency; redacted local attestations, never credentials or private logs. D2–D8. |
| F07 | Progress integrity risk | Reset/import/version changes can leave inconsistent unlocked state if progress is trusted. | Compute mastery from validated checkpoints; run cascade, rollback, corrupt import, storage-unavailable, multiple-tab tests. D2/D9. |
| F08 | Public launch risk | Publishing instructor source/reference code, licensed dependencies, or third-party content without review. | Keep source ZIPs outside public app; resolve DEC-18 before D9 release. |
| F09 | D1 design gap | No owner-approved high-fidelity visual mockups or complete component state designs. | D1 screens, accessibility and brand visual signoff before D2. |
| F10 | Teaching safety risk | Week 12 project security and database checks cannot be inferred from quiz percentages or UI appearance. | Final self-attestation requires real evidence; missing critical checks = Hold, not a “verified engineer” certificate. D8. |

## 6. Proposed D0 closure standard

A reasonable **D0 planning signoff** accepts (a) all twelve *structures*, (b) the explicit proposed prerequisite graph, (c) DEC-21 mastery boundaries, (d) this risk register and (e) deferred content/technical validation in the assigned D3–D9 stages. It **does not** require writing hundreds of final lessons or running an application that has not been built. Owner confirmation is still required in `docs/product/D0_OWNER_SIGNOFF.md`.

### Not represented as complete

- No actual React/Vite academy, local storage implementation, sandbox, published lesson or hosted app.
- No passing browser/e2e/security test run or novice learning pilot.
- No external AI platform integration or account system.
- No professional certification, live PostgreSQL correctness claim, or declaration that the educational reference authentication module is production-ready.

**Audit result:** **RECOMMEND D0 PLANNING SIGNOFF SUBJECT TO OWNER ACCEPTANCE OF F02**. D1 and D2 are independently gated.
