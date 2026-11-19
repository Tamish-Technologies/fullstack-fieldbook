# D0 / D1 Signoff Checklist — FullStack Fieldbook (Current)

**Updated:** 2026-11-18 — **Overall D1 owner-approved A-017; D2 foundation separately authorized.**
**Current source of truth:** `DECISIONS.md`, `docs/product/D0_APPROVAL_LOG.md`, `docs/product/D0_OWNER_SIGNOFF.md`, and `docs/curriculum/D0_CROSS_WEEK_AUDIT.md`.  
**Coding status:** **D3 only** for current development, by separate owner instruction on 2026-11-18. This is a status checklist, not permission to scaffold or modify application code.

## A. Decisions already approved

- [x] DEC-01–DEC-17: scope, free/frontend-only architecture, local progress, course philosophy, chosen stack, privacy and source-material boundaries.
- [x] DEC-21: hybrid mastery assessments (80% plus essential questions; browser tests; honest self-verification; unlimited retries).
- [x] DEC-23: tool-independent agent handoff.
- [x] DEC-24: D3 content/quiz dry run; D4 secure code runner and full Week 1 pilot.
- [x] **A-001, A-003–A-013**: all **twelve weekly educational structures** owner-approved, including Week 12's A-013 capstone. These do not approve completed quizzes or executing learner projects.

## B. D0 course-audit findings accepted by owner (A-014)

- [x] All 12 original instructor chapter lists represented in `WEEKNN_SOURCE_TRACEABILITY.md` (347 chapter identifiers total).
- [x] Provisional IDs inventoried: 138 lesson slots and 304 checkpoint slots; unique across weeks.
- [x] DEC-21 methods classified for all checkpoint slots: 122 quiz, 49 browser code, 97 local self-verified and 36 optional.
- [x] Proposed cross-week prerequisite contract written, including optional Week 4 L10 bypass.
- [x] Source privacy, Week 1/Week 2 storage distinction, Week 7–10 persistence/auth progression, and Week 12 critical safety gate documented.
- [x] Known implementation and educational risks documented in the cross-week audit and signoff proposal.
- [x] **Owner D0 acceptance (A-014, 2026-11-17):** The owner explicitly approved the audit, scope, provisional counts, prerequisite contract, mastery boundaries, and documented deferrals in `docs/product/D0_OWNER_SIGNOFF.md`.

## C. Content-release work explicitly deferred to authorized development stages

- [ ] D3–D8: final student-facing explanations, worked examples, item banks, feedback and verified equivalent retries.
- [ ] D4: security-reviewed isolated browser runner and Week 1 responsive geometry feasibility; owner-approved alternative if needed.
- [ ] D3 limited usability dry run; D4 complete Week 1 mastery pilot; D5–D8 later learner trials.
- [ ] D2/D9: tested progress schema, cascade resets, import/export migration, recovery, offline/caching; no invented pass results.
- [ ] DEC-19: review final lesson count after the D4 pilot; **138 is provisional**, not a fixed published commitment.

## D. D1 visual design — must be approved before coding

- [x] **A-015:** Owner selected **A — Technical Editorial** visual direction for D1.
- [x] DEC-20 approved A-017: initial reversible text wordmark + `F/S` mark + temporary “A practical learning guide” tagline. Custom logo optional later.
- [x] Light/dark palette targets, typography, spacing, component states and accessibility design requirements accepted A-017; actual implementation audits remain pending.
- [x] Owner approved the **D1-B desktop/mobile static screen mockups (A-016)** for dashboard, roadmap, lesson reader, quiz, coding lab, project verification and settings. **Tablet-specific and final responsive accessibility review remain D1-C tasks.**
- [x] Reset/export/import confirmations and honest “Passed automatically” versus “Self-verified locally” visuals accepted as design A-017.
- [x] Explicit **overall D1 signoff A-017** recorded (2026-11-18).


**D1-B approval A-016 (2026-11-18):** The owner accepted 27 static frames; **subsequent A-017** also accepted tablet/keyboard/component design requirements and temporary brand. None of these mockups count as functional proof; the separate D2 authorization is recorded below.

## E. External/public-release decisions that remain OPEN

- [ ] DEC-18: licensing, content ownership, third-party attribution and publication rights before public/open-source release (D9 at latest).
- [ ] DEC-19: final lesson/checkpoint count after validated Week 1 pilot.
- [ ] DEC-22: external AI links/disclosures/age guidance **if** a feature is proposed.

## F. D2 coding authorization (all must be true)

- [x] D0 owner signoff recorded (A-014).
- [x] D1 owner signoff recorded (A-017).
- [x] Owner expressly authorizes **D2 application shell only** in a new instruction.

**No Phase 1 public course publication, learner certification, or React application implementation follows from checking an individual planning item.**

## G. Current milestone (after A-014)

- **D0:** Approved as planning baseline on 2026-11-17.
- **D1:** **APPROVED A-017**, including D1-C responsive/accessibility contracts and temporary branding; real implementation tests remain outstanding.
- **D2:** Foundation accepted by the owner on 2026-11-18. D3 is authorized and awaiting owner review.

## Completed D1-C owner-review requirement — A-017

D1-C requirements and temporary branding are **owner-approved A-017**, recorded in `docs/design/D1_C_OWNER_REVIEW.md`. This is design acceptance, not permission to implement an application.

## D1-C evidence accepted as design only (A-017)

The 834px tablet frames, effective 320px layouts, dark reader, navigation drawer, critical component-state sheet, sampled contrast calculations, and candidate interim brand fallback are now provided in `docs/design/D1_C_FINAL_REVIEW_PACKET.md`. **They are accepted design references A-017.** DEC-20 is AGREED for the reversible v1 identity, and overall D1 is APPROVED. D2 authorization followed separately. Functional accessibility tests remain D2–D4/D9 work.

## Current post-D1 owner approval — A-017

The owner explicitly approved **D1 including the temporary branding** on 2026-11-18. DEC-20 is now AGREED as a reversible initial design baseline. D1's design approval covers static screen mockups, component/interaction specifications, responsive/type/tokens proposals and the `F/S` plus “A practical learning guide” fallback. **DEC-18, DEC-19 and DEC-22 remain OPEN** at their scheduled review gates.

**Separate D2 owner authorization received on 2026-11-18.** “I authorize D2 application foundation development”. See `docs/engineering/D2_FOUNDATION_REVIEW.md`. D3 authorization and the automated walkthrough are recorded in `docs/quality/D3_WEEK01_REVIEW.md`.
