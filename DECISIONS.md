# Decision Register — FullStack Fieldbook v1.0

**Current owner direction (2026-11-19).** D4 engineering accepted. The human Week 1 pilot remains pending. The owner accepted Week 4 and approved D5 engineering. The owner approved D6 engineering, accepted Week 9 and approved D7 engineering, accepted Week 12 and approved D8 engineering. The owner accepted D9 engineering, the README, and the MIT and CC BY 4.0 license split with credit to Tamish Technologies. The preferred public address is `fullstack.tamishtech.com`. Repository visibility and deployment are separate owner actions.

**Review recorded:** 2026-11-18 (A-017 full D1 owner signoff, including temporary branding)
**Owner review outcome:** D0 A-014 approved; D1-A A-015, D1-B A-016 and overall D1 A-017 approved. DEC-20 is AGREED for the reversible v1 design and temporary branding. DEC-18 is AGREED for the approved licenses and owner-confirmed publication rights. DEC-19 and DEC-22 remain OPEN.
**Development authorization:** The owner separately authorized the D2 application foundation on 2026-11-18. The owner subsequently stated “I accept D2”. D3 Week 1 content and quizzes are authorized. The owner selected automated dry-run checks for this review. On 2026-11-18 the owner accepted D3 and instructed the agent to start the next planned task after committing and pushing the accepted work. The owner accepted D4 engineering and authorized D5 beginning with Week 2. The human learner pilot remains pending, and the owner subsequently accepted the Week 2 and Week 3 engineering deliveries and directed work to proceed. Earlier stage snapshots below retain their original context.

## Status terminology

- **AGREED:** The product owner has accepted the decision. Changing it requires explicit owner approval.
- **RECOMMENDED:** Proposed but not yet accepted. No decisions currently remain in this status.
- **OPEN:** A decision remains unresolved or intentionally deferred. The review milestone is recorded below.

## Decision register

| ID | Decision | Status | Rationale or next review |
|---|---|---|---|
| DEC-01 | Phase 1 curriculum only, 12 student weeks | AGREED | Phase 2 curriculum is separate future work. |
| DEC-02 | Self-paced chapter-by-chapter progression | AGREED | Owner clarification during D3 on 2026-11-18: all 12 Week 1 readings are available from entry. Learners can take or defer the end-of-lesson quizzes. Entry to Week 2 requires all mandatory Week 1 evidence. Weeks 2–12 retain their existing lesson prerequisites. |
| DEC-03 | Platform has no backend, server-side database, or paid API dependency | AGREED | Core platform must run entirely client-side. |
| DEC-04 | Progress is stored locally and can be reset | AGREED | No accounts or cloud synchronization. |
| DEC-05 | Platform may later be shared freely with other learners | AGREED | Static hosting and simple access. Publication rights are recorded under DEC-18. |
| DEC-06 | Development is stage-gated; no code without authorization | AGREED | Planning and design must be approved before engineering begins. |
| DEC-07 | Official product name **FullStack Fieldbook**; repository slug `fullstack-fieldbook` | AGREED | Owner selected the name. Do not change stable curriculum IDs as part of branding. |
| DEC-08 | React, TypeScript, Vite, Tailwind CSS, and selected shadcn/ui components | AGREED | Approved as the accessible, maintainable static-application stack. |
| DEC-09 | CodeMirror for browser HTML/CSS/JavaScript labs | AGREED | No third-party code-execution API required; execution must remain isolated from the trusted application. |
| DEC-10 | `localStorage` for v1 progress, bounded drafts, and JSON export/import | AGREED | Lightweight browser-local persistence; evaluate IndexedDB only if real requirements justify it. |
| DEC-11 | Service worker/PWA for offline content, scheduled for D9 | AGREED | Confirm cache correctness, updates, and offline behavior before release. |
| DEC-12 | Lesson quizzes pass at **80% or higher**, plus required essential checks | AGREED | Approved starting policy; validate question quality in the Week 1 pilot and revise only with owner approval. |
| DEC-13 | Local full-stack projects are self-verified using actual local tests and explicit checklists | AGREED | The browser must not claim to automatically verify Express/PostgreSQL work it cannot inspect. |
| DEC-14 | Failed checks offer explanations, hints, review paths, and unlimited retries | AGREED | Encourage learning without punitive retry limits. |
| DEC-15 | English is the initial interface and curriculum language | AGREED | Existing materials are in English; localization can be considered later. |
| DEC-16 | Desktop and mobile reading are supported; a desktop/laptop is recommended for substantial coding | AGREED | Responsive learning without pretending terminal-based labs work on phones. |
| DEC-17 | Original instructor PDFs, answer keys, and reference solutions stay out of the public application build | AGREED | Keep private instructional source material separate; public browser assets cannot securely hide bundled solutions. |
| DEC-18 | Public licensing and publication rights for curriculum and code | AGREED | The owner approved MIT for original code and CC BY 4.0 for original teaching material and confirmed Tamish Technologies has the rights to publish and relicense the source-derived material. The [release review](docs/release/PRIVACY_ACCESSIBILITY_PUBLICATION.md#repository-publication-review) records the clean snapshot for owner review. |
| DEC-19 | Final lesson count and finalized checkpoint inventory | OPEN | **Review after detailed D0 source-to-lesson mapping and the D4 integrated Week 1 mastery pilot**. The 138 proposed lessons are a working draft, not an approved final count. |
| DEC-20 | Technical Editorial D1 visual/interaction system, temporary `F/S` text wordmark and “A practical learning guide” tagline | AGREED | **Owner-approved A-017 (2026-11-18)**. Design is a reversible baseline; actual accessibility and functional behavior require future tests. |
| DEC-21 | Hybrid mastery-based assessment: quizzes, isolated browser coding checks, local-project self-verification and optional enrichment | AGREED | Policy approved; see `docs/learning/MASTERY_RULES.md`. **Checkpoint method classifications were inventoried and accepted in D0**; question banks, sandbox tests and actual learner checks are still future-phase work. |
| DEC-22 | External AI links, privacy/consent disclosures, and age guidance (if introduced) | OPEN | **Defer until the feature is proposed; resolve before shipping any external AI links**. No integrated AI API is required in v1. |
| DEC-23 | Tool-independent AI-agent handoff with `AGENTS.md` as shared project policy, a universal first prompt, and small editor-specific adapters | AGREED | Owner approved portability across capable coding editors; keep one authoritative specification and preserve D0/D1 approval gates. |
| DEC-24 | Stage D3 contains Week 1 content, quizzes and usability dry run; the secure code runner and full integrated Week 1 mastery pilot happen in D4 | AGREED | Owner approved the development **sequence only**. D0/D1 signoff and explicit D2 authorization are still mandatory. See `docs/product/D0_APPROVAL_LOG.md`. |

## Owner decision review

- **Approved:** DEC-01–DEC-17, DEC-21, DEC-23 and DEC-24 are AGREED. DEC-21 requires an 80% quiz score plus essential questions, all required browser functional tests, honest self-verification for local projects, unlimited retries, and non-gating enrichment.
- **Still open:** DEC-19 (final lesson count after D4 pilot) and DEC-22 (optional external AI disclosures). DEC-18 is AGREED. DEC-20 is AGREED A-017.
- **Review handoff:** `docs/quality/D3_WEEK01_REVIEW.md`.
- **D0 status:** **APPROVED (A-014, 2026-11-17)** as a planning baseline: 12 structurally approved student weeks, 138 provisional lesson slots, 304 proposed checkpoints, and an accepted explicit prerequisite contract. Detailed lesson prose, reviewed questions, executable tests, reset/import validation and learner pilots remain deferred to authorized implementation stages.
- **D1 status:** **APPROVED A-017 (2026-11-18)**, including D1-C, provisional typography/tokens and temporary branding. Tests of implemented behavior are deferred.
- **D2 status:** Authorized by separate owner message, “I authorize D2 application foundation development”. Owner acceptance recorded in the D2 foundation review.

## Approved DEC-21 implementation boundary

- Required quizzes: at least **80%** correct (rounded up), with **all essential questions** correct.
- Required browser coding: **all mandatory behavior-based tests** pass in a properly isolated environment.
- Local React/Node/Express/PostgreSQL/full-stack projects: student runs real local commands and completes explicit **self-verification** evidence; never present it as independently auto-graded.
- Weekly graduation: mandatory lesson gates **plus** weekly practical project and readiness check.
- Failed checks: specific feedback, progressive hints, review paths, and **unlimited retries**. A retry does not erase previously earned mastery.
- Optional enrichment and external AI tools: **never required to unlock**.
- Each required checkpoint must later receive a stable ID, learning-outcome mapping, verification method, pass criteria, feedback, prerequisite information and recorded evidence during the D0 audit.

DEC-24 changes only the staged milestone sequence: D3 is a **content/quiz usability dry run**; D4 adds safely isolated code execution and the complete Week 1 mastery pilot. D3 may not claim `browser-code-auto` checks passed without a tested runner. This does not authorize implementation.

DEC-23 is documentation/tool workflow only: it does **not** approve application implementation, change any curriculum mastery rules, or give cloud agents automatic access to private material.

A-014 separately **signs off D0 planning**. It does not freeze DEC-19 final lesson count, approve finished question banks or execution, certify a learner pilot, sign off D1, or authorize D2. The detailed operational contract is `docs/learning/MASTERY_RULES.md`.

## Change control

An AGREED decision must not be silently overwritten by an AI coding agent. Propose any change with its reason, impact, and affected documents, then obtain explicit owner approval. OPEN decisions must be resolved before implementing the features that depend on them. Keep this register and the signoff checklist synchronized.


## Historical Week 9 approval / Week 10 pre-approval draft (superseded by A-011)

**Approval A-010:** On applying the Week 9 planning package and asking to proceed, the owner accepted **Week 9's 12-lesson, 27-checkpoint structure** as a D0 authoring baseline (24 required: 12 quiz groups/72 proposed items, 2 isolated JavaScript fake-pool suites, 10 local PostgreSQL attestations; 3 optional). This does not approve actual SQL test execution, student lesson prose, learner pilot or production code.

**Historical pre-approval proposal (now accepted A-011):** 12 required lesson IDs `p1-w10-l01`–`l12`, **27 checkpoint slots** (24 required: 12 quizzes/72 future scored items, 2 isolated pure-JS browser checks, 10 real local authentication/authorization self-attestations; 3 optional). **Now approved A-011, not pending.** See `docs/curriculum/WEEK10_*` and `docs/product/D0_APPROVAL_LOG.md`. These are curriculum-level decisions, **not** a new DEC-25 technology/policy decision; DEC-01–DEC-17, DEC-21, DEC-23 and DEC-24 were AGREED while DEC-18/19/20/22 were then OPEN. **Historical status superseded by A-014/A-017**; D2 coding remains not authorized.

## Week 10 owner structural approval A-011 / Week 11 draft (2026-11-17)

- **A-011 accepted:** Week 10 / authentication and authorization **12 lessons, 27 proposed checkpoints** (24 required: 12 quiz groups / 72 planned question slots, 2 isolated pure-JS checks, 10 real local self-attestations; 3 optional). It is *not* evidence that server authentication/authorization tests ran or that this implementation is safe for production.
- **Week 11 draft:** 11 lessons, 27 proposed checkpoints (24 required: 11 quizzes / 66 planned question slots, 2 isolated pure-JS checks for sanitized logs and safe public errors, 11 local self-attestations; 3 optional). Public hosting is **optional**, local production-style preview and release report are required. Instructor answer key/reference stay private.
- Historical snapshot at that time: no changes to DEC-01–DEC-24 statuses; DEC-18/19/20/22 OPEN, and D0/D1 still unsigned then. **Superseded by current A-014 D0 signoff; D2 remains NOT AUTHORIZED.**

## Historical D0 milestone — A-012 Week 11 accepted / Week 12 draft (2026-11-17; superseded by A-013/A-014)

- **Owner structural approval A-012:** Week 11 (11 required lessons; 27 checkpoint slots = 24 required: 11 quizzes / 66 planned scored intents, two isolated synthetic JavaScript checks, 11 learner-attested local tasks; three optional) is now accepted for *planning structure only*. No code test or pilot has been run by Fieldbook. Public deployment stays optional.
- **Week 12 DRAFT:** Source C01–C45 and 165 archive paths traced. Eleven proposed capstone lessons with 27 checkpoints (24 required: eleven quizzes, two synthetic date-code suites and eleven local attestations; three optional). Priority + optional date is the core vertical slice; dashboard and public hosting are optional.
- **Final graduation boundary:** A01–A10 evidence, accurate self-verification, critical owner isolation, safe additive migration, no credential exposure and independent explanation. A learner's self-scored 100-point rubric is *not* a third-party credential.
- **At the time of this historical snapshot:** DEC-18/19/20/22 were OPEN and Week 12/D0/D1 awaited approval. **Subsequent approvals A-013, A-014 and A-017 supersede that status; D2 remains unauthorized.**

## D0 closeout audit record (2026-11-17)

- Week 12 **A-013** approved as structural blueprint, not verified code or released lessons.
- Cross-week inventory: **138 proposed lessons (137 required, one optional); 304 checkpoint IDs (268 required, 36 optional); 347 source chapter references traced**. See `docs/curriculum/D0_CROSS_WEEK_AUDIT.md`.
- `DEC-19` remains **OPEN** until D4 integrated Week 1 pilot validates the student pathway; numerical counts are provisional.
- **Subsequent owner approval A-014 (2026-11-17):** D0 signoff has now been explicitly recorded in `docs/product/D0_OWNER_SIGNOFF.md`. The original audit-only snapshot above is historical.

## Historical D0 milestone acceptance A-014 (followed by D1 A-017)

- **Recorded:** 2026-11-17. Owner explicitly wrote **“I approve D0”**.
- **Accepted:** D0 cross-week audit, provisional 138-lesson / 304-checkpoint planning baseline, existing DEC-21 assessment policy, source coverage, project sequence and explicit prerequisite contract.
- **Open at the time of A-014:** DEC-18 licensing, DEC-19 final lesson count, DEC-20 visual identity and D1, DEC-22 optional external AI disclosures. **DEC-20 was subsequently approved in A-017.**
- **Next at that time:** D1 design review (now owner-approved as A-017). See `docs/design/D1_FINAL_APPROVAL_RECORD.md`.
- **D2:** **NOT AUTHORIZED** until D1 signoff and a separate explicit owner instruction.


## Historical D1-A art-direction approval — A-015 (2026-11-17; D1 finalized in A-017)

The owner selected **A — Technical Editorial** as the FullStack Fieldbook visual direction. This is a **narrow art-direction approval**, documented in `docs/design/D1_ART_DIRECTION_DECISION.md`. Use a focused, readable technical field-guide experience with restrained academic/editorial cues and integrated coding surfaces. Borrow the *clarity* of progress indicators from the previously proposed calm-workspace alternative, but **do not** switch the overall product to a dashboard-first design.

**Historical A-016 update (superseded in A-017):** the D1-B responsive *static frames* are now accepted as design baseline. Final logo, wordmark, tagline, complete light/dark component palette, font licensing/selection, tablet design details, functional interactive states, accessibility review, and D1 milestone signoff remain pending under DEC-20. **D2 remains NOT AUTHORIZED.**

## D1-B owner approval — A-016 (2026-11-18)

Owner said **“I approve D1-B.”** The 27 static rendered screen states, flows and 17-page review PDF become the accepted **design baseline** for D1-C. Approval is recorded in `docs/design/D1_B_APPROVAL_RECORD.md` and `docs/design/D1_APPROVAL_LOG.md`. No actual accessibility, component behavior, dynamic quiz verification or sandbox execution has been demonstrated by these static frames. **DEC-20 was OPEN at the time of A-016 and was subsequently AGREED in A-017.** **D2 implementation remains unauthorized.**

## Current authoritative D1 owner approval — A-017 (2026-11-18)

The owner stated: **“I approve D1, including the temporary branding.”** This signs off overall D1 and **DEC-20 AGREED**. Accepted v1 design: Technical Editorial, the 27 D1-B static frames and seven D1-C supplementary frames, candidate light/dark tokens, editorial reading typography, accessible interaction contracts, and a **FullStack Fieldbook** text wordmark with decorative **`F/S`** and **“A practical learning guide”** temporary tagline.

**Older “D1 pending / DEC-20 OPEN” excerpts above are historical snapshots and are superseded by this design approval.** At A-017, DEC-18, DEC-19 and DEC-22 were OPEN. See the decision register above for their current status. The design approval **does not** certify an implemented UI or authorize D2 coding. See `docs/design/D1_FINAL_APPROVAL_RECORD.md`, `docs/design/D1_OWNER_SIGNOFF.md` and `docs/engineering/D2_AGENT_HANDOFF.md`.
