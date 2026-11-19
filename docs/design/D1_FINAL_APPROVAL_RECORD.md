# A-017 — Full D1 Design & UX Owner Approval

**Product:** FullStack Fieldbook  
**Date:** 2026-11-18  
**Decision ID:** A-017  
**Owner statement (verbatim):** “I approve D1, including the temporary branding.”  
**Milestone:** D1 — **APPROVED** (D1-A, D1-B and D1-C accepted as a design baseline)

## What the owner approved

- **D1-A / A-015:** Technical Editorial visual direction, reading-first course experience.
- **D1-B / A-016:** 27 static screens covering orientation, dashboard, week overview, reader, quizzes, code lab, local project verification, progress, settings and critical states.
- **D1-C / A-017:** Seven additional static responsive/component views, including tablet and 320px layouts; component-state contracts; accessibility and keyboard interaction *design requirements*; light/dark semantic tokens and proposed responsive behavior.
- **Temporary branding:** **FullStack Fieldbook** text wordmark and a small **`F/S`** decorative mark, with the temporary tagline **“A practical learning guide.”** Do not require a custom logo or remotely loaded fonts for the initial application.
- **Typography:** A restrained editorial serif for prominent lesson titles only; system sans for UI/body; system monospace for code. Adjust accessible font-size/line-height as required in implementation.
- **Design principles:** Truthful auto-checked versus self-verified statuses; no fake unlocked results, paywalls, accounts or hidden backend; clear reset and import warning states; keyboard, zoom, touch and reduced-motion expectations.

## Acceptance is of the DESIGN, not implementation evidence

Static mockups and sampled color-math checks are not proof of actual component WCAG conformance, functional keyboard traps, client-side storage reliability, code execution sandbox safety, or a working PWA. Verify these during the relevant authorized stages (D2, D3, D4 and D9). Where a proposed token fails in a real rendered state, use an accessible correction without silently changing the overarching art direction.

## Decisions and gates

- **DEC-20:** AGREED as an initial *reversible* visual/brand baseline, subject to ordinary change control.
- **DEC-18:** OPEN until publishing/licensing checks.
- **DEC-19:** OPEN until the actual D4 Week 1 mastery pilot validates course organization.
- **DEC-22:** OPEN if external AI links/services are proposed.
- **D0:** APPROVED (A-014).
- **D1:** **APPROVED (A-017).**
- **D2:** **NOT AUTHORIZED BY THIS APPROVAL.** A separate explicit owner instruction to begin D2 is required. A handoff document or implementation prompt alone is not authorization.

## Authoritative references

`DECISIONS.md`, `docs/design/D1_OWNER_SIGNOFF.md`, `docs/design/D1_C_OWNER_REVIEW.md`, `docs/design/D1_APPROVAL_LOG.md`, `docs/design/DESIGN_SYSTEM.md`, `docs/design/D1_C_IMPLEMENTATION_ACCEPTANCE.md` and `docs/product/OPEN_DECISIONS_FOR_SIGNOFF.md`.

**Approved and recorded:** A-017 · 2026-11-18
