# Coverage Gap Review — Original Chapters Not Yet Attached to a Proposed Student Lesson

> **CURRENT AUTHORITATIVE PLANNING STATUS — 2026-11-17:** All 12 weekly educational BLUEPRINT STRUCTURES have owner approval (Week 12 = **A-013**). The D0 **cross-week audit is prepared**, but the owner has **not yet signed off D0**. All learner-ready content, question banks, code runners and pilots remain future work. D1 visual approval and explicit D2 coding authorization are also pending. Historical status notices in this document describe prior snapshots and are superseded by `docs/product/D0_OWNER_SIGNOFF.md` and `docs/product/D0_APPROVAL_LOG.md`.

> **Current coverage disposition (2026-11-17):** Week 1–12 source chapters have structural dispositions, with instructor-only answers and reference solutions explicitly private. Remaining gaps are **pedagogical/runtime**: authoring 706 planned quiz slots, test feasibility (Week 1 geometry), true local-project guidance, pilot verification and owner-approved D0 prerequisite contract. Historical “pending Week 10/11” sections are archived snapshots; see `D0_CROSS_WEEK_AUDIT.md`.





**Status: review queue, not a confirmed omission.** The draft lesson map deliberately places learning topics before instructor-only setup notes, teaching scripts, answer keys and source appendices. This list identifies original chapters not explicitly referenced in the proposed lesson table so that nothing is silently overlooked.

An original chapter may be: (a) converted to explanatory student setup or troubleshooting, (b) used as a project/checkpoint verification source, (c) retained privately as instructor-only reference, or (d) excluded as Phase 2/future scope. Review each disposition against the complete source body before D0 signoff.

## Week 01 — source disposition structure owner approved (A-001)

The original 16 chapters were inspected through the source Markdown and code archive; **all C01–C16 have a documented proposed disposition** in `WEEK01_SOURCE_TRACEABILITY.md`. The following two chapters previously lacked an explicit Week 1 map entry:

| Original chapter | Disposition after detailed Week 1 mapping | Student-facing location |
|---|---|---|
| C15 — Reference implementation: Study Tasks (teacher copy) | **Keep private; use behavior and acceptance criteria as traceable evidence.** Never bundle finished solution or answer key into the public site. | L12 project checks; actual reference remains private |
| C16 — Troubleshooting, sources, and Week 2 bridge | **Adapt relevant troubleshooting and learning transition**, retain instructor-specific parts privately. | L01 setup help, L10 debug guidance, L12 Week 2 preview |

**State:** Week 1 chapter-disposition **structure approved** (A-001); final authored lessons, quiz items, executable tests, accessibility and D4 integrated learner pilot remain outstanding. Week 2 structure now approved (A-003); Week 3 structural plan owner-approved (A-004); Week 4 source-inspected structure owner-approved (A-005); Week 5 structure owner-approved A-006; Week 6 structure owner-approved A-007; Week 7 structure owner-approved A-008; Week 8 structure owner-approved A-009; Week 9 structurally approved A-010; Week 10 source-inspected D0 draft awaiting review; Week 10 source-inspected D0 draft; Weeks 11–12 still queued.

## Week 02 — source disposition structure owner approved (A-003)

All **20** original Week 2 C01–C20 chapters have explicit proposed dispositions in `WEEK02_SOURCE_TRACEABILITY.md` after inspection of the original Markdown and both starter/reference code projects. The five chapters in the original gap queue are now addressed:

| Former gap | Proposed disposition | Reason / student destination |
|---|---|---|
| C01 instructor mission | Adapt learner objectives, keep mentor script private | L01 introduction and L11 graduation criteria |
| C02 setup and bridge | Convert prerequisites/starter/Git instructions | L01 onboarding and L11 local app checks |
| C18 instructor reference walkthrough | Keep private; use only to author behavior contracts | L04/L05/L11 checks, not completed reference code in app |
| C19 complete reference appendix | Keep **instructor-only** | Private code archive, no default public solution |
| C20 handoff and resources | Adapt student recap, next-week preview and optional resources | L11 and Week 3 transition |

**State:** Week 2 structural mapping **approved** (A-003), not final learner content or test execution. Original C13/C14 mentor scripts and C17 answer key remain subject to private/student separation. Actual question text, sandbox tests, accessibility, local project proof and D5 learner pilot remain pending.

## Week 03 — source disposition structure owner-approved (A-004)

All **22** Week 3 C01–C22 chapters and **11** starter/reference ZIP entries have been assigned explicit proposed dispositions in `WEEK03_SOURCE_TRACEABILITY.md`, and the eleven stable lesson IDs have a detailed checkpoint proposal. Former initial gap entries now resolve as follows:

| Former gap | Proposed disposition | Student location |
|---|---|---|
| C01 mission | Adapt performance goals, keep mentor coaching private | L01 and L11 |
| C02 setup/Git/local server | Convert setup and prerequisite checks into self-paced guidance | L04 and L10 |
| C20 reference architecture | **Private instructor authoring reference** | Helps design L04/L11 acceptance rules; no completed code copied |
| C21 complete instructor solution | **Private; never ship publicly** | No learner-facing reference code or answer key |
| C22 handoff/next week | Adapt learning recap and Week 4 preview | L11 |

C15/C16 mentor scripts are restructured into lesson sequence (not student-facing scripts); C19 answer key stays private. Student-facing labs will use safe original examples and new fixtures.

**State:** Week 3 structural mapping **approved** (A-004), not finished learner content or actual execution. Eight quiz groups (45 draft item slots), eight sandbox tests, five local attestations and three optional activities remain to be authored, checked and piloted under D5. Pilot is **not run**.

## Week 04 — full chapter disposition structurally approved (A-005)

All **24** Week 4 C01–C24 chapters and all **18** starter/reference ZIP files have explicit proposed dispositions in `WEEK04_SOURCE_TRACEABILITY.md`. The original gap queue is resolved at the *chapter mapping* level:

| Former gap | Proposed disposition | Student destination |
|---|---|---|
| C01 instructor mission | Adapt introductory objective/constraints, keep mentoring script private | L01/L12 |
| C02 preparation/local setup/Git | Adapt explicit prerequisites, local HTTP origin, Git evidence | L08/L12 |
| C23 full instructor implementation | **Private instructor reference only** | L06/L07/L11 authoring behavior targets; no full solution in public app |
| C24 free refs and Week 5 preview | Adapt optional references and next-week readiness | L12 |

C17/C18 session scripts become self-paced activities, C21 answer key remains instructor-only, and **C13 cancellation stays optional advanced content (L10)**. The detailed Week 4 draft has 12 lesson slots (11 mandatory), 25 checkpoints (21 required, 4 optional), nine required quizzes (50 planned item slots), eight browser checks and four local attestations. The public fake HTTP GET is *not* required for auto-grading: graded checks use offline mock fetch/data.

**State:** Week 4 chapter disposition **structurally approved (A-005)**; final quiz banks/behavior tests/local project material and D5 learner pilot have not been written or executed. Distinguish the original fake API from a real persistent server. Original C23 code/reference ZIP remain private.


## Week 05 — full source chapter disposition owner-approved (A-006)

All **23** original Week 5 C01–C23 chapters and **30** files from `starter/` and `reference-solution/` now have explicit dispositions in `WEEK05_SOURCE_TRACEABILITY.md`, linked to the **11** existing student lesson IDs and 25 proposed checkpoints. Former gap rows resolve as follows:

| Former gap | Proposed handling | Student-facing destination |
|---|---|---|
| C01 Week 5 instructor mission | Adapt motivational objective and scope; omit mentoring instructions | L01/L11 |
| C02 setup, continuity, diagnostic | Convert to local React setup and prerequisite checks, keep Git backup advice | L01/L02/L11 |
| C22 complete instructor reference | **PRIVATE**: use for behavior specifications only, never public code bundle | L11 design verification targets (not direct reference code) |
| C23 Week 6 handoff | Adapt recap and short next-week preview | L11 |

C15/C16 instructor session scripts become self-paced learning order; C20 instructor answer key stays private. Core required work is React JSX, props, state, local task CRUD and persistence. Editing and manual Week 4 data migration are optional. **The API inbox returns Week 6**. L07/L08/L09 browser checks address only isolated pure-JS helpers; actual React is learner-self-verified locally.

**State:** Week 5 mapping **D0 authoring structure owner-approved A-006**; the complete 10 quiz banks/57 slots, 3 pure-JS suites, 9 local attestations, actual learner text and D6 pilot still need authoring/real verification. Future source package and instructor solutions remain private.

## Week 06 — source-inspected chapter disposition OWNER APPROVED (A-007)

All **26 original Week 6 C01–C26 chapters** and **41 ZIP entries (19 learner starter / 22 private reference)** now have exact dispositions in `WEEK06_SOURCE_TRACEABILITY.md`. The existing 12 lesson IDs are preserved, and the D0 proposal allocates **26 checkpoints (23 required, 3 optional)**. Key source disposition: C04–C15 teach API/effects/router/state/storage, C16 is optional AI practice, C17–C19 adapt timed mentor sessions and homework into self-paced guidance, C20/C21 supply debug/test scenarios, **C22 answers and C26 complete code stay private**, C23/C24/C25 inform readiness, FAQ and handoff.

| Gap / risk | Proposed mitigation | Linked learner lessons |
|---|---|---|
| Browser-only Academy falsely grades JSX or Router | Only auto-grade pure `normalizeIdeas` and fake-fetch JavaScript; all real React evidence clearly self-verified | L01,L03–L12 |
| Public JSONPlaceholder outage blocks student | Bundle sample ideas and controllable fake HTTP responses for required checks | L01,L04,L05,L10,L12 |
| HTTP `fetch` resolution conflated with 503 success | Explicit status/shape checks and negative tests | L01,L04,L10 |
| Old request result overwrites current page | Teach AbortController + stale guard, Strict Mode cleanup; local race reproduction | L03,L10 |
| Route unmount discards tasks | Lift shared tasks to App above Routes; rapid-copy IDs test | L08,L12 |
| Lost tasks due to changed storage origin/key | Preserve `study-tasks-week2`; teach same-origin (including port) and safe malformed-data handling | L09 |
| Deep-link host 404 mistaken for React wildcard | Explain SPA host fallback separately from client `/wrong` UI | L06,L07,L12 |
| Week 7 backend introduced prematurely | Keep Week 6 API read-only and local; Node/Express starts in Week 7 | L01,L05,L12 |

**State:** Week 6 mapping is **D0 STRUCTURAL APPROVAL A-007**; quiz text, browser suites, real React build and D6 learner pilot remain undone. All source and starter files are private until publication/license review, and private reference code is never packaged in public assets.


**A-007 note:** Owner approval applies to the Week 6 lesson/checkpoint planning structure only. Questions, pure-JS runner tests, actual React build and D6 pilot remain pending.

## Week 07 — original chapter gap review now mapped (D0 STRUCTURAL APPROVAL A-008)

All **27 C## chapters** and **68 ZIP entries** have been inspected and assigned an explicit disposition in `WEEK07_SOURCE_TRACEABILITY.md`. The existing 12 stable learner lesson IDs are retained with **27 proposed checkpoints** (24 required, 3 optional). Prior gap-queue items resolve as follows:

| Chapter(s) | Original material | Disposition | Student destination |
|---|---|---|---|
| C01–C03 | Instructor mission, prep, architecture | Adapt to self-paced onboarding and storage-ownership diagram; discard coach-only instructions | L01,L11,L12 |
| C04–C05 | Node runtime, npm/ESM setup | Teach/setup lab, real local environment | L01 |
| C06–C14 | HTTP, Express middleware, GET/POST/PATCH/DELETE, validation/errors | Student-facing concepts + real local project checks; browser sandbox limited to pure JS | L02–L09 |
| C15–C16 | Manual HTTP + automated tests | Learner-run commands, observed test evidence, no fake auto-pass | L10,L12 |
| C17–C19 | React read-only bridge, debug, AI collaboration | GET-only API Lab + debug and optional AI review; not full React CRUD | L11 |
| C20–C22 | Two instructor sessions and homework | Convert to self-paced project progression, not mandatory attendance timers | L01–L12 |
| C23–C24 | Bug labs and assessment/rubric | Learner debugging/checkpoint tests, readiness and independent transfer; no teacher-only scoring leakage | L10–L12 |
| C25 | Instructor answers | **Private instructor-only**; do not ship the answer key | PRIVATE |
| C26 | Week 8 handoff/resources | Recap and next-week preview, optional official resources | L12 |
| C27 | Complete reference code | **Private instructor-only**; use for validation, never ship in public app | PRIVATE |

**State:** Week 7 source mapping has **D0 structural approval A-008**; actual lessons, runtime tests and learner pilot remain future work. Real local Node/Express tests and `npm` output must be self-verified by learner, not claimed as run by the static Fieldbook app. Week 8 React API CRUD and Week 9 PostgreSQL remain out of scope. Assessment item bank, safe browser JS tests and D7 pilot are not yet executed.

## Week 08 — original chapter gap review now OWNER APPROVED A-009

All **32 original Week 8 C## chapters** and 77 code entries (37 starter / 38 private reference / 2 top-level) have explicit dispositions in `WEEK08_SOURCE_TRACEABILITY.md`. The eleven stable lesson slots are kept, and **27 checkpoint slots** allocated (24 required: 11 quizzes, 3 isolated JavaScript fake-fetch suites and 10 real local project attestations; 3 optional).

| Chapter(s) | Material | Student-facing disposition |
|---|---|---|
| C01–C06 | Goal, continuity, architecture, contract, dual-process setup | Self-paced entry, diagrams, required Week 7 prerequisite + L01–L03 |
| C07–C11 | Origins, Network tools, source of truth and client response handling | L02,L03,L07,L09, with 400/404/204 and malformed JSON checks |
| C12–C16 | GET, POST, PATCH and DELETE | L04–L07 local React+Express evidence and two pure-JS client suites |
| C17–C19 | Busy/race, route continuity and effects | L08 with optional per-row concurrency enhancement |
| C20–C22 | Mocked tests, local end-to-end, safety/accessibility | L09 and L11, honest local/auto test separation |
| C23 | AI-agent prompts | L10 optional tool usage; independent code review is required |
| C24–C27 | Mentor sessions, homework, debugging labs | Reworked into self-paced exercises and no-AI debugging proof |
| C28–C29 | Oral tests and rubric | L10,L11 applied readiness checks; not fake remote grade |
| C30 | Instructor answer key | **PRIVATE: do not bundle in public app** |
| C31 | Week 9 persistence handoff/resources | L11 and non-gating reading |
| C32 | Full instructor reference code | **PRIVATE: do not bundle in public app** |

**Key guardrails:** no auto-migration or erasure of old React localStorage tasks; backend becomes task authority, still **in-memory**; client and server title limits both 1–80; DELETE success 204 has no JSON body; HTTP errors are not fetch transport rejections. Week 8 is **owner-approved for its D0 structure A-009**; executable tests, actual React/Express work and D7 learner pilot have not been conducted.

## Week 09 — historical initially flagged gaps, NOW DISPOSITIONED in Week 9 source audit

The seven flagged C01/C02/C03/C31/C32/C33/C34 headings below have **now been traced** in `WEEK09_SOURCE_TRACEABILITY.md`. Keep the table only as the original gap list for provenance; Week 9 lesson/checkpoint structure is owner-approved A-010; final content and tests remain pending.

| Original chapter | Title | Initial disposition for review |
|---|---|---|
| C01 | Instructor mission: make Study Tasks durable | Inspect for student prerequisite/onboarding content; otherwise instructor-facing only |
| C02 | Your preparation and diagnostic check | Inspect for student prerequisite/onboarding content; otherwise instructor-facing only |
| C03 | Definition of done: what to demonstrate | Check source; attach to a student lesson, week gate or document reason to omit |
| C31 | Final teaching demonstration and Week 10 handoff | Transition/supplemental information; decide whether to include week summary |
| C32 | Free resources and evidence-based references | Instructor-only reference; extract needed examples, never publish answer key by default |
| C33 | Source-code appendix: key Week 9 implementation | Instructor-only reference; extract needed examples, never publish answer key by default |
| C34 | Instructor final notes and learner reflection | Inspect for student prerequisite/onboarding content; otherwise instructor-facing only |

## Week 10

| Original chapter | Title | Initial disposition for review |
|---|---|---|
| C01 | Instructor mission: private tasks, not just a login screen | Inspect for student prerequisite/onboarding content; otherwise instructor-facing only |
| C02 | Learning outcomes and realistic weekly scope | Check source; attach to a student lesson, week gate or document reason to omit |
| C03 | Week 9 to Week 10: what changes and what stays the same | Check source; attach to a student lesson, week gate or document reason to omit |
| C04 | Weekly teaching sequence at a glance | Check source; attach to a student lesson, week gate or document reason to omit |
| C35 | Adapt the week to the learner's current level | Check source; attach to a student lesson, week gate or document reason to omit |
| C36 | Setup troubleshooting and instructor preflight | Carry useful troubleshooting, setup and optional official links into relevant lab |
| C37 | Sources, references and safe next steps | Instructor-only reference; extract needed examples, never publish answer key by default |
| C38 | Reference-code appendix: complete security-critical files | Instructor-only reference; extract needed examples, never publish answer key by default |

## Week 11

| Original chapter | Title | Initial disposition for review |
|---|---|---|
| C01 | Instructor mission: from "it works" to "we can trust our checks" | Inspect for student prerequisite/onboarding content; otherwise instructor-facing only |
| C02 | Entry check, outcomes and scope | Check source; attach to a student lesson, week gate or document reason to omit |
| C03 | Architecture and the reliability boundary | Check source; attach to a student lesson, week gate or document reason to omit |
| C04 | Teaching sequence and instructor preparation | Inspect for student prerequisite/onboarding content; otherwise instructor-facing only |
| C39 | Instructor quick reference: commands and milestones | Instructor-only reference; extract needed examples, never publish answer key by default |
| C40 | Reference source code appendix: key reliability files | Instructor-only reference; extract needed examples, never publish answer key by default |

## Week 12

| Original chapter | Title | Initial disposition for review |
|---|---|---|
| C43 | Transition plan: Phase 2 should test genuine autonomy | Transition/supplemental information; decide whether to include week summary |
| C44 | Instructor solution guide: where the key code lives | Instructor-only reference; extract needed examples, never publish answer key by default |
| C45 | Instructor command reference, troubleshooting and resources | Instructor-only reference; extract needed examples, never publish answer key by default |

**Previously flagged chapter headings still awaiting detailed disposition: 3 (Week 12 only).** The original eight Week 10 headings are dispositioned in `WEEK10_SOURCE_TRACEABILITY.md`; the six flagged Week 11 headings now have explicit dispositions in `WEEK11_SOURCE_TRACEABILITY.md`. The remaining three are Week 12. The seven originally flagged Week 9 headings are now dispositioned in the Week 9 source trace. This figure counts only the legacy flagged-heading review queue, not the entire remaining content-validation workload. This is the residual review queue, not a statement that all other source subsections have already passed education/technical content review.

## D0 signoff rule

A chapter is not “covered” merely because it appears in this gap report. Mark an explicit final disposition for each original chapter during the educational audit, including any instructor-only reference used to prepare student materials. Source chapter coverage is one dimension; original *subsections* and learning outcomes also need verification.

## Week 08 — owner-approved structural mapping (A-009)

All original **32 C## chapters** and **77** code-package files are dispositioned in `WEEK08_SOURCE_TRACEABILITY.md`. Owner approved **11 lesson IDs and 27 checkpoint slots** as an educational plan; this does not validate any React/Express runtime behavior or the future D7 pilot. Week 8 tasks are server-memory-owned; Week 9 adds SQL persistence.

## Week 09 — PostgreSQL/SQL source disposition (owner-approved structure A-010)

All **34** original C## chapters and **94** code ZIP entries have been mapped in `WEEK09_SOURCE_TRACEABILITY.md`. Previously broad initial lesson labels are now assigned detailed outcomes, prerequisite IDs, reviewed exercise intents and DEC-21 checkpoint types. **12 stable lessons, 27 proposed checkpoints (24 mandatory/3 optional)**. Source C28 answers and C33 completed implementation remain **private instructor materials**, not student lesson source. Mentoring scripts C24/C25 are rewritten as self-paced exercises and C29 becomes question intents rather than a ready-made quiz bank.

**Open educational risks before content implementation:** realistic local PostgreSQL setup guidance across OSes; misleading fake SQL grading; safe destructive DB test guard; React/Express restart durability proof vs mere page refresh; credential leakage in screenshots/exported progress; distinguishing initial idempotent migration from schema evolution. These are covered in the Week 9 blueprint and future pilot but **not yet executed/learner-validated**.



## Historical Week 10 source disposition (subsequently approved A-011)

All **38** original Week 10 instructor chapters and **125** source ZIP entries have been traced in `WEEK10_SOURCE_TRACEABILITY.md`. The earlier flagged Week 10 general/transition/source headings are now explicitly assigned to lesson outcomes or instructor-only dispositions; this resolves their *mapping gap*, not student-content correctness. The proposed 12 lessons and 27 checkpoints (24 required / 3 optional) are specified in `WEEK10_LESSON_ASSESSMENT_BLUEPRINT.md` and `WEEK10_CHECKPOINT_INVENTORY.md`. The answer-key chapter C33 and completed implementation appendix C38 remain **private**.

**Remaining Week 10 educational risks:** confusing authN and authZ; accidental reliance on client-supplied owner IDs; old shared task migration leakage; treating fake-pool checks as real database proof; overclaiming SameSite/Origin protection; missing logout invalidation; stale React task state; capturing cookies/passwords in logs or progress exports; destructive tests targeting non-test DB. These are specified for future D8 implementation/pilot, **not yet executed**. Week 11 source has now been traced as a draft; Week 12 still requires detailed audit. Week 10 structure is approved A-011.

## Week 11 C01–C40 source disposition — D0 DRAFT (2026-11-17)

All **40** original headings and **152** source-ZIP entries have explicit mapping in `WEEK11_SOURCE_TRACEABILITY.md`, including the six formerly flagged Week 11 headings. C36 instructor answer key and C40 full reference appendix remain private; session scripts are rewritten as self-paced learning tasks. Key content hazards: claiming automatic grading of local Node/PostgreSQL; treating green mocks as production-ready; secret/cookie leakage in logs or AI prompts; destructive DB tests without disposable `_test` DB; wrong SPA/API routing fallback; and forcing public deployment for a learner with only local tooling. **Week 10 approved A-011, Week 11 lesson/checkpoint allocation is still owner-review DRAFT**. Three previously flagged headings remain for Week 12.

## Latest source-heading gap disposition — Week 11 A-012 / Week 12 mapping complete (2026-11-17)

The historical three Week 12 heading flags above now have **explicit dispositions in `WEEK12_SOURCE_TRACEABILITY.md`**:

- **C43 — Phase 2 transition:** mapped to L11 as future-readiness self-reflection, not Phase 2 curriculum inside this release.
- **C44 — instructor solution guide:** **PRIVATE instructor/reference source**, excluded from public app assets; L11 references its existence for authoring only.
- **C45 — instructor command reference:** student-safe setup/troubleshooting/adapted official resources in L11; commands must be verified against the actual starter at implementation time, with secrets redacted.

**Historical heading disposition queue: 0 remaining of the specifically flagged list.** This does **not** imply that all original subsections, technical examples, future quizzes or local lab commands have completed educational QA. Week 11 structure is approved A-012; Week 12 is source-inspected **DRAFT** for owner structural review. After approval, run cross-week coverage and prerequisite review before D0 signoff.
