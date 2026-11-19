# Universal AI-Agent Read-Only Review — Week 10 D0 Blueprint

**Compatible with:** Codex, Claude Code, Cursor, GitHub Copilot, Gemini CLI, DeepSeek-enabled tools or any editor that can read repository Markdown. If a tool cannot access a private sibling folder, ask for explicit source attachment; never pretend it has inspected unavailable files.

## Objective

Review the approved structural **Week 10 Authentication & Authorization** educational blueprint (review for implementation readiness, not for a new structural approval). Week 9 and Week 10 structural plans are owner-approved (A-010/A-011), but finished lessons, test executions and learner-pilot results remain pending. Do not write application code, alter Git state, create an auth service, run destructive migrations/tests, expose private files, or mark D0/D1 signed off.

## Read in order

1. Root `AGENTS.md`, `DECISIONS.md` and `ROADMAP.md` (including DEC-21/23/24).
2. `docs/curriculum/WEEK09_LESSON_ASSESSMENT_BLUEPRINT.md` and `WEEK10_LESSON_ASSESSMENT_BLUEPRINT.md`.
3. `WEEK10_CHECKPOINT_INVENTORY.md`, `WEEK10_ASSESSMENT_ITEM_PLAN.md`, `WEEK10_SOURCE_TRACEABILITY.md` and `docs/quality/WEEK10_PILOT_PROTOCOL.md`.
4. `docs/learning/MASTERY_RULES.md`, `docs/curriculum/CONTENT_AUTHORING_STANDARD.md`, `docs/product/D0_APPROVAL_LOG.md` and `OPEN_DECISIONS_FOR_SIGNOFF.md`.
5. If accessible, the private original Week 10 source Markdown/PDF and code ZIP. If not, identify the exact missing artifacts.

## Review questions

- Are all original C01–C38 instructor chapters mapped accurately without accidentally shipping the instructor answer key or the complete reference implementation?
- Are stable `p1-w10-lNN` IDs and the **27** checkpoint IDs unique, with **24 required** (12 quizzes, 2 fake-JS suites, 10 local attestations) and 3 optional?
- Does each quiz group clearly specify ≥5/6 and reviewed essential item requirements? Are security-critical essentials justified?
- Do the isolated JS exercises avoid misleading claims to have run Argon2id, SQL, sessions or real account security?
- Does every local requirement specify real test evidence and an honest “Self-verified locally” label?
- Does the user ownership rule protect all list/get/create/update/delete calls using identity from the verified server session, with 404/no-mutation foreign-ID tests?
- Does migration preserve unknown-owner Week 9 tasks rather than assigning them arbitrarily?
- Are privacy and safety warnings explicit: no credentials in course progress or AI prompts, `_test` DB before destructive runs, no production-security claims?
- Is Week 10 correctly located in stage **D8**, with Week 11 hardening/deployment still ahead?

## Required output

Provide a short **read-only review report** with: confirmed source access, exact broken references, significant technical/educational risks, proposed editorial improvements, and owner decisions needed before future student-content authoring and pilot. Report what was **actually inspected** versus inferred. Do not mark tests as run. Do not modify files unless owner explicitly requests a documentation-only patch.

**Authorization boundary:** D0 and D1 remain unsigned; D2 application code is **NOT AUTHORIZED**. End after the review report.
