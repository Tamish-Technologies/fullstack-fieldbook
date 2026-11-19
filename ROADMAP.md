# Development Roadmap — 10 Milestones (D0–D9)

**Current owner direction (2026-11-19).** D4 engineering accepted. The human Week 1 pilot remains pending. The owner accepted Week 4 and approved D5 engineering. The owner accepted Week 6 and approved D6 engineering. The owner accepted Week 9 and approved D7 engineering. The owner accepted Week 10 engineering. The owner accepted Week 11 engineering. The owner accepted Week 12 and approved D8 engineering. [D9 is in local release review](docs/quality/D9_RELEASE_REVIEW.md).

**These are application-development stages, not the 12 student curriculum weeks.** Every milestone ends with a review and explicit approval; do not auto-advance.

**CURRENT STATUS (2026-11-18):** D0 A-014 APPROVED; Technical Editorial A-015 APPROVED; D1-B A-016 APPROVED; overall D1 (including D1-C and temporary branding) **APPROVED A-017**. **D2 application foundation accepted by the owner.** The owner accepted D3 and D4 engineering and subsequently accepted Week 2 of D5. [Week 3 engineering is owner-accepted](docs/quality/D5_WEEK03_REVIEW.md). See `docs/quality/D3_WEEK01_REVIEW.md`. See `docs/engineering/D2_FOUNDATION_REVIEW.md`. See `docs/design/D1_FINAL_APPROVAL_RECORD.md` and `docs/engineering/D2_AGENT_HANDOFF.md`.

| Stage | Purpose | Main deliverable | Required approval gate |
|---|---|---|---|
| **D0 — Audit and product definition** | Inventory original 12 guides/code ZIPs, set pedagogy, content mapping and scope | Verified source index, requirements, curriculum coverage, lesson ID draft, mastery rules | Owner accepts coverage, assessment philosophy, v1 scope |
| **D1 — UX and visual system** | Define interface, responsive states, tokens, reader and exercise design | Design tokens, page specs, hi-fi mockups/prototype and accessibility decisions | Owner approves desktop/mobile/quiz/playground appearance |
| **D2 — App shell and progress foundation** | Build static React TS Vite structure and stable local progress engine | Navigation, week gates, route guards, local persistence, reset/import/export basics | Tests prove locks, reload persistence, reset, corrupt storage handling |
| **D3 — Week 1 content/quiz learning dry run** | Author student-ready Week 1 material and test the learning experience before enabling unsafe code execution | Reusable lesson blocks, reviewed question banks/feedback, navigation, code-exercise previews and a **clearly limited** content/usability dry run | No fabricated browser-code passes or claim of full Week 1 graduation; content and quiz feedback reviewed |
| **D4 — Safe coding labs and integrated Week 1 pilot** | Build the isolated code runner and verify the **entire** Week 1 mastery journey | Sandboxed HTML/CSS/JS playground, deterministic behavior tests, guided lab flows, full Week 1 end-to-end learner pilot | Isolation/accuracy tests, required auto-checks, honest local attestations and independent transfer trial pass |
| **D5 — Convert student Weeks 2–4** | Core JS, DOM, async and HTTP material | Detailed lessons, browser exercises, assessments, continuity QA | Every topic traced to source and Week 4 tested |
| **D6 — Convert student Weeks 5–6** | React teaching content | JSX/hooks/routing visual labs and local project tasks | No misleading React simulation; tested real project instructions |
| **D7 — Convert student Weeks 7–9** | Backend and SQL instruction | Detailed setup guides, Express/SQL local labs, file downloads, self-verification | Fresh machine can follow setup and run tests |
| **D8 — Convert student Weeks 10–12** | Security, testing, deploy and capstone | Multi-user checks, threat model, full capstone, final assessment | Coverage review and full-course learning walk-through |
| **D9 — Offline, hardening and publish** | Release quality and privacy | PWA offline caching, import/export robustness, accessibility QA, static deploy | Offline/reload/backup/version-upgrade tests and owner signoff |

## Default workflow for each stage

1. Restate the precise scope and acceptance criteria.
2. Review any dependency from previous stages.
3. Complete only the agreed work.
4. Demonstrate what a learner actually sees/does.
5. Run tests and record what is untested.
6. Identify unresolved issues and get owner signoff.

## Early pilot milestones

- D2 **does not** need final lesson content; use clearly labeled fixtures/placeholders.
- D3 must contain **real Week 1 educational prose and reviewed quizzes**, not lorem ipsum; its learner trial is a **limited content/navigation/usability dry run**, not a full completion/maturity claim.
- D4 must define, implement and security-review a bounded user-code execution model, then conduct the **integrated Week 1 mastery pilot**. The owner authorized Week 2 conversion while the human pilot remains pending. Review learner outcomes separately.
- Stage boundaries and separate owner authorizations remain mandatory; no running user-authored code in the trusted page context.

## Approved D3/D4 Week 1 sequencing (DEC-24, approval A-002)

**Resolved by owner approval:** D3 handles lesson text, quizzes, and a limited usability/content dry run. Seven mandatory Week 1 `browser-code-auto` checks **cannot pass** in D3 until a vetted runner exists; such checkpoints are shown as *unavailable/pending* and do not generate completion. **D4** adds the security-reviewed sandbox/behavior runner, validates responsive checks where feasible, and completes the first **end-to-end Week 1 mastery pilot**.

The first D4 slice measures responsive geometry in the Lesson 5 practice lab. The [implementation and verification record](docs/engineering/D4_RESPONSIVE_LAB.md) tracks the feasibility result and the remaining work before checkpoint credit. If accurate automatic grading cannot be achieved safely, propose an explicit DEC-21-compatible method change for owner approval instead of inventing passing evidence. See `docs/product/D0_APPROVAL_LOG.md`, `docs/quality/WEEK01_PILOT_PROTOCOL.md`. This milestone-sequence approval is **not** an authorization to start D2, D3, or D4.

## Releasable subsets

- **Prototype A (D2):** progress/navigation interactions only.
- **Learning Pilot (D3–D4):** D3 dry run for content/quizzes; full Week 1 gate trial only after D4 safe coding labs.
- **Frontend Preview (D5–D6):** first six weeks with review gates.
- **Full Curriculum (D8):** all twelve weeks, local labs and capstone.
- **Public Release (D9):** robust offline/backup/polish and documentation.

## Scope discipline

Exclude user profiles, cloud sync, social/leaderboard, analytics, AI chat integrations, billing, course marketplace, and Phase 2 curriculum. These are not accidental TODOs; they are consciously out of scope.

## Current D1 design substages (owner-controlled)

- **D1-A:** Technical Editorial chosen (A-015) — approved.
- **D1-B:** 27 static design frames and the review PDF accepted (A-016) — approved **as mockup baseline only**.
- **D1-C:** Component/interaction states, typography and contrast targets, tablet/320px layouts and temporary branding — **owner-approved A-017 as a design baseline**, not implemented.
- **Overall D1:** **approved A-017**. The owner subsequently authorized D2 in a separate instruction. See `docs/design/D1_OWNER_SIGNOFF.md`.

## D2 handoff after D1 approval (A-017)

- `docs/engineering/D2_AGENT_HANDOFF.md` — read-first file and approval gate.
- `docs/engineering/D2_SCOPE_AND_ACCEPTANCE.md` — bounded implementation slice and test expectations.
- `prompts/21_UNIVERSAL_D2_READINESS_REVIEW.md` — safe read-only agent task available immediately.
- `prompts/22_UNIVERSAL_D2_IMPLEMENTATION_AFTER_AUTHORIZATION.md` — future coding prompt, usable **only with separate explicit owner authorization**.

The owner accepted D2 and separately authorized D3. The owner accepted D3 and requested D4. The Week 1 implementation and automated mastery trial are complete. The [D4 review](docs/quality/D4_WEEK01_REVIEW.md) records the results. The human pilot remains pending. The [Week 4 engineering review](docs/quality/D5_WEEK04_REVIEW.md) records the final D5 delivery. The owner approved D5 engineering and accepted Week 5 engineering. The owner approved D6 engineering, accepted Week 9, approved D7 engineering, accepted Week 12, approved D8 engineering, and authorized D9. Public deployment requires owner approval.
