# UNIVERSAL AI-AGENT PROMPT — D2 Application Foundation

**IMPORTANT: CONDITIONAL TASK.** This file is a reusable implementation prompt, **not an authorization to code**. Only execute its coding instructions if the owner separately and explicitly says **“I authorize D2 application foundation development”** (or equivalent unambiguous approval). If such authorization is absent, perform only a read-only readiness review and stop.

## Context

You are implementing the **D2 application shell + local progress engine** for **FullStack Fieldbook**, a frontend-only, no-login, free, self-paced 12-week Phase 1 course. D0 is approved A-014 and D1 approved A-017, including the Technical Editorial design and temporary `F/S` wordmark / “A practical learning guide” tagline. The lesson/checkpoint count is provisional; don't fabricate finished course material.

## Required reading before coding

`AGENTS.md` → `DECISIONS.md` → `docs/design/D1_FINAL_APPROVAL_RECORD.md` → `docs/engineering/D2_AGENT_HANDOFF.md` → `docs/engineering/D2_SCOPE_AND_ACCEPTANCE.md` → `docs/learning/MASTERY_RULES.md` → `docs/data/LOCAL_PROGRESS_SPEC.md` → `docs/curriculum/D0_PREREQUISITE_CONTRACT.md` → `docs/design/DESIGN_SYSTEM.md` / `SCREEN_SPECIFICATIONS.md` → `docs/design/D1_C_IMPLEMENTATION_ACCEPTANCE.md` → `docs/quality/ACCEPTANCE_PLAN.md`.

## Implementation task (D2 ONLY)

1. Verify current React/TypeScript/Vite/Tailwind/shadcn compatibility from available official docs or installed package metadata. Record pinned versions; do not claim live verification if unavailable.
2. Initialize the smallest reasonable client-only app; implement the approved editorial style with accessible responsive navigation, theme, placeholder lesson reader and twelve-week roadmap.
3. Model lesson/checkpoint IDs, dependencies and derived unlocking rules from the D0 contract. Do not trust manually stored `unlocked` booleans.
4. Implement versioned/validated local progress, storage-denied/corrupt fallback, resume and safe updates.
5. Implement explicit lesson/week/course reset previews, dependent-completion cascading, JSON export/import with schema and ID checks, safe-size limit and overwrite confirmation.
6. Create meaningful tests for routing/gates, reload, corrupted state, resets/import, keyboard navigation and 320px/834px layouts. Test the actual implementation, not only design screenshots.
7. Document setup/run/test/build and provide a short demo path, without using external APIs or paid tools.

**Never:** add a backend, authentication, analytics, cloud sync, remote AI service, private instructor content, fake passing quiz route, executable code sandbox, PWA publishing or Phase 2 content. Week 1 curriculum content is D3; secure editor/test runner and integrated pilot are D4.

## Delivery / stopping point

Before writing code, state the exact bounded plan, files to create, and tests to run. Keep work in small reviewable changes. Run actual checks and report exact outputs, failures and limitations. **Stop after D2 and request owner review. Do not begin D3 on your own.**

## Owner authorization check (agent must not invent)

Record the **actual separate owner instruction** granting D2 before starting; if there is none, do not implement.
