# D0 Cross-Week Prerequisites and Graduation Gates — Proposed Owner Contract

**Status:** Proposed for owner's D0 signoff; not production application code.  
**Source:** All 12 owner-approved weekly blueprints, DEC-02, DEC-12, DEC-21 and `docs/learning/MASTERY_RULES.md`.  
**Machine-readable planning companion:** `D0_PREREQUISITE_INDEX.csv` (138 records).

## 1. Core definitions

- **Lesson passed:** all **required checkpoints** for the lesson have their correct evidence state. Optional exercises never gate.
- **Week passed:** *every required lesson* in the week is passed **AND** the required weekly practical project **AND** the week readiness/transfer quiz (the last lesson's required gate) are complete. A last-lesson quiz alone is not sufficient.
- **Next week unlocked:** previous week's week-passed state, **not** just the last lesson visited, is true. Never trust imported `unlocked` booleans.
- **Phase 1 finished:** all Week 01–12 required lesson, project and readiness gates satisfied; Week 12 critical authorization and data-safety requirements cannot be overridden by a rubric score. Completion is locally editable/self-attested where indicated and **not an independently authenticated credential**.

## 2. Lesson dependencies

| Rule | Dependency | Required behavior |
|---|---|---|
| Week 1, L01–L12 | None | Start at L01 and read in order. Return to checks before Week 2 (owner clarification, 2026-11-18). |
| Within Weeks 2–12, required L(N) | Previously required L(N-1) | Locked until prior lesson's mandatory checks complete |
| First required lesson of Week 2–12 | Previous complete week gate | Requires all mandatory previous-week lessons, required practical project and readiness quiz |
| **Week 4 optional L10** | Required Week 4 L09 | Available for enrichment after L09, but **not** required |
| **Week 4 required L11** | Required Week 4 L09 | **Bypasses optional L10**; it never blocks L11 or Week 5 |
| Week 4 required L12 | Required Week 4 L11 | Contains final Week 4 project/readiness gates |
| Week 12 final L11 | Required Week 12 L10 plus remaining critical requirements | Terminal Phase 1 gate, not a Week 13 unlock |

Cross-week data model prerequisites include frontend storage (Week 2), API effects (Week 4/6), Express routes (Week 7), React/Express CRUD (Week 8), PostgreSQL (Week 9), owner authorization (Week 10), reliability (Week 11), and independent capstone (Week 12). The platform must not silently jump learners across missing core skills.

## 3. Deterministic unlock and reset expectations

1. Compute current state from **known lesson IDs and checkpoint evidence**; no boolean bypasses.
2. Deep-linking to locked lessons shows a prerequisite explanation and safe navigation, not a completed lesson.
3. **Retry/review** never revokes earned mastery. A deliberate **lesson reset** invalidates all transitive dependents; a **week reset** invalidates that and later weeks; a **course reset** requires confirmation and offers backup first.
4. **Import** validates course version, known IDs, method, evidence type and size bounds; recompute completion and unlocks. An imported self-attestation remains self-attested, never recast as auto-verified.
5. **Question review** and equivalent retries are available even after completion; changing the final published question bank/IDs requires an explicit content-version migration plan.
6. Optional Week 4 L10 or any optional checkpoint must never appear in mandatory completion denominator.

## 4. Implementation-stage tests to require (not run in D0)

- Brand-new user starts at Week 1 L01; 11 remaining weeks locked.
- In Weeks 2–12, a prior lesson with a 79% quiz but failed essential stays incomplete; a threshold pass plus essentials and other required checks unlocks next.
- Local project self-verified state must be labeled distinctly from genuine browser test passes.
- Week 4 L09 completion unlocks **both** optional L10 and required L11; skipping L10 cannot stop progression.
- Week 8 still fails persistence after backend restart by design; Week 9 later verifies persistence. Do not auto-mark the Week 8 project passed based on Week 9 behavior.
- Resetting a prerequisite lesson in Week 3 revokes dependent completions through Week 12, with affected count shown; notes/drafts deletion only per chosen policy.
- Importing fabricated completion booleans or malformed checkpoint IDs must not unlock content.
- Week 12 completion remains blocked if the required two-account authorization evidence is marked Not run / failed.

## 5. Status of the contract

All 138 lesson rows are present in the companion CSV (137 mandatory, Week 4 L10 optional). These dependencies are a **proposed explicit implementation contract** derived from the agreed linear mastery philosophy, not a pre-authorized app implementation. Owner D0 signoff in `docs/product/D0_OWNER_SIGNOFF.md` accepts or requests changes to this contract.
