# Universal AI Agent — Read-only D0 Week 2 Blueprint Review

Use in Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI, or any repository-aware agent. **Read-only educational review. Do not scaffold, edit or implement application code.**

## First read

1. `AGENTS.md`, `DECISIONS.md`, `ROADMAP.md`, `docs/product/D0_APPROVAL_LOG.md`, and `docs/product/OPEN_DECISIONS_FOR_SIGNOFF.md`.
2. `docs/learning/MASTERY_RULES.md`, `docs/curriculum/CONTENT_AUTHORING_STANDARD.md`, `docs/curriculum/PROPOSED_LESSON_MAP.md`.
3. Approved **Week 1 structure**: `docs/curriculum/WEEK01_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK01_CHECKPOINT_INVENTORY.md` and `docs/quality/WEEK01_PILOT_PROTOCOL.md`.
4. New Week 2 **draft**: `docs/curriculum/WEEK02_LESSON_ASSESSMENT_BLUEPRINT.md`, `WEEK02_CHECKPOINT_INVENTORY.md`, `WEEK02_ASSESSMENT_ITEM_PLAN.md`, `WEEK02_SOURCE_TRACEABILITY.md` and `docs/quality/WEEK02_PILOT_PROTOCOL.md`.
5. If accessible, the actual private source Week 2 Markdown/PDF/ZIP in `../fullstack-fieldbook-source-materials/phase1/week-02/`. If not accessible, say so rather than assuming it was inspected.

## Review questions

- Is the Week 2 lesson sequence faithful to the original source and prior Week 1 capabilities? Is any concept prematurely introduced (React, API, editing)?
- Verify all 11 stable lesson IDs, 22 unique checkpoint IDs, 19 required/3 optional classification, 8 quiz sets, 8 browser checks, and 3 locally self-verified activities.
- Does each mandatory checkpoint have meaningful behavior, inputs/edge cases, feedback, evidence, prerequisites and honest verification labels?
- Is the `localStorage` practice safely isolated from FullStack Fieldbook's own progress? Can invalid data or a storage error be tested without risking a user's actual course record?
- Are view filters and permanent deletion clearly distinguished? Is global remaining count correct across all views? Are IDs stable after deletion/reload?
- Are the quiz essential flags defensible? Are the 45 item slots still clearly un-authored? Does a failed essential question correctly block advance even when 80% is achieved?
- Are the local project and no-AI transfer tasks realistic for a self-paced 18–19-year-old learner with Week 1 prior knowledge?
- Do the Week 1 educational structural approval and DEC-24 D3/D4 sequencing appear consistently across `ROADMAP.md`, quality criteria and owner signoff docs?
- Are there source coverage gaps, unintended answer-key leaks, inaccessible interactions, or misleading “auto-verified” claims?

## Output

Provide: (a) a concise source-coverage summary, (b) critical/major/minor risks with file/section references, (c) specific proposed corrections, (d) any unresolved owner decisions, (e) a recommendation to approve/revise Week 2 *blueprint only*. Clearly separate **source-verified**, **specification reviewed**, and **not implemented/tested** statements.

**Do not modify any approved decision or authorize D2. Stop after reporting review findings.**
