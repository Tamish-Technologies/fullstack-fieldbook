> **Historical read-only review prompt:** Week 9 structure is now owner-approved as A-010. Review the approved baseline without changing status; Week 10 draft is separate. No coding authorized.

# Universal Read-Only AI-Agent Review — D0 Week 9 Blueprint

You are reviewing **FullStack Fieldbook**'s student Phase 1 Week 9 educational-planning proposal, not implementing the product. This prompt is editor-independent for Codex, Claude Code, Cursor, Gemini CLI, GitHub Copilot, DeepSeek-capable agents and other tools that can read repository files.

**Hard gate:** DO NOT scaffold, install dependencies, write application code, run destructive PostgreSQL commands, edit files, claim tests passed, or begin D2/D7 implementation. D0/D1 unsigned, D2 NOT AUTHORIZED. Follow `AGENTS.md`, `DECISIONS.md`, `ROADMAP.md`, and `docs/learning/MASTERY_RULES.md`.

## Read in order

1. `docs/product/D0_APPROVAL_LOG.md`, `docs/product/OPEN_DECISIONS_FOR_SIGNOFF.md`, `docs/curriculum/PROPOSED_LESSON_MAP.md`.
2. Week 9 proposal: `docs/curriculum/WEEK09_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK09_CHECKPOINT_INVENTORY.md`, `WEEK09_ASSESSMENT_ITEM_PLAN.md`, `WEEK09_SOURCE_TRACEABILITY.md`, `docs/quality/WEEK09_PILOT_PROTOCOL.md`.
3. Owner-approved Week 8 predecessor and API contract.
4. If available, the private sibling `../fullstack-fieldbook-source-materials/phase1/week-09/` with original instructor source Markdown and starter/reference ZIP. **Do not copy complete private instructor solutions to public app content**. If private sources are unavailable, explicitly disclose the gap.

## Review requirements

- Preserve **12 original stable `p1-w09-lNN` IDs** and C01–C34 traceability.
- Check **27 checkpoint IDs**, allocation **24 required (12 quizzes / 2 isolated fake-pool pure-JS browser suites / 10 local database-project attestations), 3 optional**, plus 72 proposed quiz slots.
- Confirm 80% pass means **5/6**, plus every designated essential check; essential security concepts are represented.
- Verify Week 9 React/Express REST API contract stays Week 8 compatible, while persistence moves from memory to PostgreSQL. Auth/user ownership comes in Week 10.
- Ensure content does not claim `CREATE TABLE IF NOT EXISTS` is a complete migration system; explain constraints, timestamps and safe `WHERE`.
- Separate PostgreSQL dev DB from `_test` DB; distinguish nondestructive practice from tests that use `TRUNCATE`.
- Check that fake-pool browser JS tests **cannot** claim to execute real SQL or inspect PostgreSQL; actual DB work is labeled learner self-verified locally.
- Inspect security guidance: no secrets in browser, repo, notes or generated AI prompts; SQL values parameterized and user data treated as untrusted.
- Check later D7 learner pilot and owner approval are clearly pending; no request here can authorize D2 or app code.

## Deliverable

Produce a severity-ranked **read-only review** with exact document headings and recommended corrections, especially any safety or source-accuracy discrepancies. Mark unverified claims clearly. Do not modify files until the owner separately requests a documentation patch. End with the explicit status: **D0 Week 9 draft only; no application code written, D0/D1 unsigned, D2 NOT AUTHORIZED.**
