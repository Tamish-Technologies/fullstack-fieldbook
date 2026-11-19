# FullStack Fieldbook — D2 AI-Agent Handoff (Foundation Review)

**Status:** D0 **APPROVED A-014**; overall D1 **APPROVED A-017**.  
**Current milestone:** D2 foundation accepted.
**Application coding:** D2 authorized by separate owner instruction on 2026-11-18.

## Product in one paragraph

FullStack Fieldbook is a free, local-first, no-login, no-backend, self-paced 12-week **Phase 1** full-stack web-development learning environment. It provides teaching, quizzes, safe browser coding labs when available, local project guidance, progress and course reset/backup. It uses a Technical Editorial design and must truthfully distinguish browser-verified evidence from locally self-verified work. Curriculum blueprints exist for all 12 weeks; their student-facing content/real tests are **not yet implemented**.

## Read these files, in this order

1. `AGENTS.md` and `DECISIONS.md` — authoritative stage/feature rules, especially DEC-20/21/23/24.
2. `docs/product/D0_OWNER_SIGNOFF.md` and `docs/design/D1_FINAL_APPROVAL_RECORD.md` — recorded approvals.
3. `ROADMAP.md`, `docs/engineering/D2_SCOPE_AND_ACCEPTANCE.md` and `docs/engineering/D2_READINESS_CHECKLIST.md`.
4. `docs/curriculum/D0_PREREQUISITE_CONTRACT.md`, `docs/curriculum/D0_CROSS_WEEK_AUDIT.md`, `docs/curriculum/PROPOSED_LESSON_MAP.md` — IDs and gating; 138 lessons remain provisional.
5. `docs/learning/MASTERY_RULES.md`, `docs/data/LOCAL_PROGRESS_SPEC.md`, `docs/quality/ACCEPTANCE_PLAN.md`.
6. `docs/design/DESIGN_SYSTEM.md`, `docs/design/SCREEN_SPECIFICATIONS.md`, `docs/design/D1_OWNER_SIGNOFF.md`, `docs/design/D1_C_IMPLEMENTATION_ACCEPTANCE.md`, plus D1-B and D1-C static galleries.
7. `docs/architecture/ARCHITECTURE_SECURITY_OFFLINE.md`, `docs/product/PRODUCT_REQUIREMENTS.md` and relevant tooling adapters.

## Prompt choice

- **Before authorization:** `prompts/21_UNIVERSAL_D2_READINESS_REVIEW.md` — read-only status/architecture review; do not edit files.
- **Only after a separate owner statement authorizes D2:** `prompts/22_UNIVERSAL_D2_IMPLEMENTATION_AFTER_AUTHORIZATION.md` — one bounded application-foundation implementation milestone, followed by a stop for review.

If the agent cannot access the files, report exactly which paths are inaccessible. A cloud editor does not automatically have the private instructor-source directory. Never include instructor answers, PDFs, references or private code packages in a public application bundle.

## Design implementation contract

- Text-first **FullStack Fieldbook** identity with a small decorative `F/S` mark and temporary tagline “A practical learning guide.”
- Technical Editorial, reading-first desktop layout, responsive mobile/tablet, light/dark/system theme.
- Component states and navigation specified in approved D1 files, with automated real-browser verification where possible.
- D1 mockups are design references, **not proof of actual accessibility or functionality**.

## Stage controls

D2 implements **shell, navigation, safe local progress and basic import/export/reset contracts**, with clearly marked lesson placeholders. It must not claim real quizzes/coding labs work, install a server/database, publish instructor solutions, or implement all twelve student weeks. D3 handles Week 1 content/quizzes; D4 implements the secure code runner and integrated pilot. D9 handles offline/PWA production QA.

**D2 authorization record:** “I authorize D2 application foundation development”. See [the D2 review guide](D2_FOUNDATION_REVIEW.md). The owner accepted D2 on 2026-11-18. The owner subsequently authorized D3. See `docs/quality/D3_WEEK01_REVIEW.md`.
