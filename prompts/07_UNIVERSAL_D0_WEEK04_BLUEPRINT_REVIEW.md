# Universal AI-Agent D0 Week 4 Blueprint Review (READ-ONLY)

**Works in Codex, Cursor, Claude Code, Copilot, Gemini CLI or another tool that can read repository text files. This is a documentation review task only.**

You are reviewing the FullStack Fieldbook Phase 1 Week 4 proposed educational blueprint. **DO NOT create, modify, scaffold or test application code. Do not silently approve any decision.** Use the project `AGENTS.md` and any editor adapter if present, but treat `DECISIONS.md` and D0 signoff document as authoritative over general instructions.

## Read these repository documents

1. `DECISIONS.md`, `docs/product/D0_APPROVAL_LOG.md`, `docs/product/OPEN_DECISIONS_FOR_SIGNOFF.md`.
2. `docs/learning/MASTERY_RULES.md`, `docs/curriculum/CONTENT_AUTHORING_STANDARD.md`.
3. `docs/curriculum/WEEK03_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK03_SOURCE_TRACEABILITY.md`.
4. `docs/curriculum/WEEK04_LESSON_ASSESSMENT_BLUEPRINT.md`.
5. `docs/curriculum/WEEK04_CHECKPOINT_INVENTORY.md`, `WEEK04_ASSESSMENT_ITEM_PLAN.md`, `WEEK04_SOURCE_TRACEABILITY.md`.
6. `docs/quality/WEEK04_PILOT_PROTOCOL.md` and `docs/quality/ACCEPTANCE_PLAN.md`.
7. Private original Week 4 instructor source Markdown and starter/reference ZIP *only if accessible* at `../fullstack-fieldbook-source-materials/phase1/week-04/` (do not claim access if unavailable).

## Review without changing files

- Verify 12 lesson IDs, **11 required plus L10 optional**, **25 checkpoint IDs (21 required, four optional)**, nine quiz groups with 50 scored item slots, and source C01–C24 dispositions.
- Confirm optional L10 is not a hidden prerequisite for L11/Week 5 and that cancellation is indeed stretch in source.
- Compare starter/reference contract: Week 3 persisted tasks, `study-tasks-week2` key, shape, ID/title rules; fake API GET vs local Copy; `normalizeIdeas`, `fetchStudyIdeas`, offline fixture and tests.
- Inspect likely misgraded cases: HTTP 503 response vs network rejection; malformed JSON vs invalid schema; empty 200 vs error; source mutation; ID collision; optional online service.
- Confirm all `browser-code-auto` work can be deterministically tested in **isolated sandbox** using fake fetch, and no sandbox can modify Fieldbook learning progress.
- Flag any missing lesson objectives, sources, hints, essential flags, answer-key leakage, unclear self-verification evidence or reader accessibility issues.
- Check README, lesson map, signoff, approval log and acceptance plan for consistent status: Weeks 1–3 structures approved, Week 4 D0 proposal pending, no D0/D1 signoff, D2 NOT AUTHORIZED.

## Output

Provide: (A) a concise coverage/mapping table, (B) inconsistencies with file paths and suggested fixes, (C) the five highest-risk assessment false positives, (D) a recommendation to approve/revise Week 4 **structure only**, and (E) a precise list of documents that would need updating on owner approval. **Do not approve anything yourself, change local files or write application code.**
