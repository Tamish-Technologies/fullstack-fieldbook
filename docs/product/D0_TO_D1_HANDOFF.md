# D0 to D1 Handoff — FullStack Fieldbook

**Status (2026-11-18):** D0 **OWNER APPROVED A-014**; D1-A **Technical Editorial approved A-015**; D1-B **static mockups approved A-016**; D1-C and overall D1 signoff **PENDING**; D2 **NOT AUTHORIZED**.

## What D0 has accepted

The owner explicitly stated **“I approve D0”**. The accepted planning baseline comprises:

- Twelve Phase 1 student-week **blueprint structures**, accepted through A-013.
- Provisional **138 lesson slots** (137 required and one optional Week 4 L10).
- Provisional **304 checkpoint slots** (268 required, 36 optional): 122 quiz groups, 49 browser code checks, 97 local self-verifications, and 36 optional enrichment activities.
- Source traceability for all 347 numbered instructor chapters, with private source PDFs and reference solutions excluded from public assets.
- An explicit, non-cyclic prerequisite graph and weekly completion rules; optional Week 4 L10 does not block required progression.
- DEC-21 hybrid assessment and evidence rules, and DEC-24 D3 limited dry run / D4 safe coding pilot sequence.
- Limitations and deferred validations recorded in `docs/curriculum/D0_CROSS_WEEK_AUDIT.md` and `docs/quality/D0_DEFERRED_VALIDATION_PLAN.md`.

The figures above are **design inputs, not finished curriculum content**. DEC-19 stays OPEN until the integrated learner pilot.

## D1 objective and constraints

Design an accessible, premium-feeling, focused self-paced learning interface with clear chapter gates, honest assessment labels, local-only progress, and comfortable reading/coding experiences. Do not add cloud sync, logins, remote AI grading, course marketplace, instructor dashboards, or other out-of-scope features.

D1 must produce actual **desktop, tablet, and mobile design mockups** for the principal screens, plus a coherent light/dark system and meaningful interaction states. The specifications are in:

- `docs/design/DESIGN_SYSTEM.md` — proposed tokens, accessibility, component system.
- `docs/design/SCREEN_SPECIFICATIONS.md` — IA, routes, content and states.
- `docs/design/D1_DESIGN_BRIEF.md` — the current actionable design plan.
- `docs/design/D1_OWNER_SIGNOFF.md` — review checklist, still unchecked.

## Decisions that remain open

- **DEC-20:** Technical Editorial direction A-015 and static mockups A-016 approved; final logo/tagline, palette/typography, tablet and interaction/accessibility requirements plus overall D1 must still be accepted before D2.
- **DEC-19:** final lesson count after D4 pilot; current proposed IDs remain stable unless reviewed.
- **DEC-18:** public licensing and publication rights, before release.
- **DEC-22:** optional external AI links/age/privacy messaging only if that feature is proposed.

## Stage gates

1. **D1 design work:** May begin on an explicitly requested design-only task. It may output Markdown specs, static wireframes/mockups and reviewable assets. It must **not** scaffold or run application code.
2. **D1 signoff:** Owner reviews actual examples, not just a design philosophy, and explicitly approves D1 in `docs/design/D1_OWNER_SIGNOFF.md`.
3. **D2 authorization:** Requires a **separate explicit owner instruction** after D1 approval. D0 approval alone is not permission to implement.

## Single source of truth

`DECISIONS.md`, `docs/product/D0_OWNER_SIGNOFF.md`, and `docs/product/D0_APPROVAL_LOG.md` determine current approvals. Earlier week-by-week “pending” language is archival and superseded by A-014.

## Current D1-C work after owner A-016

The 27 static mockup states were owner-approved as the visual baseline. Refer to `docs/design/D1_APPROVAL_LOG.md`, `docs/design/D1_C_COMPONENT_CONTRACTS.md`, `docs/design/D1_C_ACCESSIBILITY_AND_INTERACTIONS.md`, `docs/design/D1_C_RESPONSIVE_TYPOGRAPHY_AND_TOKENS.md`, and `docs/design/D1_C_OWNER_REVIEW.md`. Any earlier “D1-B next/pending” section is historical. No code authorization follows from A-016.
