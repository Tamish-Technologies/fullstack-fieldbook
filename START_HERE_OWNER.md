# Owner Setup and Universal AI-Agent Handoff — Copy/Paste Checklist

## Before opening an AI coding editor

The current deliverable is **planning documentation only**, deliberately no `src/`, `package.json`, app framework setup, application routes, or actual lesson engine.

### 1. Download both archives

- `FullStack_Fieldbook_Planning_Handoff.zip` → approved/specification candidates and reusable editor-independent agent prompts.
- `FullStack_Fieldbook_Private_Source_Materials.zip` → original 12 PDFs, 12 source Markdown handbooks, 12 code project archives. These source files include instructor answers, so keep them private.

### 2. Extract them into a common workspace

```
my-workspace/
  fullstack-fieldbook/
    AGENTS.md
    README.md
    DECISIONS.md
    ROADMAP.md
    START_HERE_OWNER.md
    docs/
    prompts/
    templates/
    reference-materials/README.md
  fullstack-fieldbook-source-materials/
    README.md
    manifest.sha256
    phase1/
      week-01/... through week-12/...
```

Do not put the source materials under `public/` or `src/assets/` (which could ship answers to every learner). Any AI agent must have explicit read access to the source workspace; a sibling folder is convenient for local agents, but **cloud agents may not automatically have that sibling directory**. For a cloud workflow, deliberately attach/provide the source pack or use a private repository workspace that contains the sources but excludes them from the public build.

### 3. Open a **private** Git repository

Use the approved repository name: `fullstack-fieldbook`. You can initially commit only this planning package. Put source materials outside Git, or include them only in a private repository with a conscious publication policy. Store no real user progress, tokens, personal notes or credentials.

Example optional terminal commands, run *inside* `fullstack-fieldbook/` after inspecting the files:

```
git init
git add README.md START_HERE_OWNER.md AGENTS.md DECISIONS.md ROADMAP.md docs prompts templates reference-materials .gitignore
git commit -m "docs: add product and curriculum planning handoff"
```

If Git asks for author identity, set your Git username/email using normal Git configuration; don't commit secrets.

### 4. Give your chosen AI agent the universal first prompt — no code

Open `prompts/00_UNIVERSAL_AI_AGENT_HANDOFF.md`. Copy the entire content into Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI or another capable agent. Some tools auto-load `AGENTS.md`; others need their adapter file or a manual request to read `AGENTS.md`. See `docs/agent/EDITOR_COMPATIBILITY.md`. Confirm its response references the **actual** file paths, correctly distinguishes agreed vs. proposed decisions, and lists the remaining D0/D1 approval work.

### 5. Finish design decisions before engineering

- Review lesson map and source audit against the original guides.
- DEC-21 quiz/project **policy is already approved**. Finish the D0 per-checkpoint audit and review the proposed reset cascade; do not reopen the approved policy without an explicit change request.
- Review light/dark color palette, logo, tagline and layouts. The product name is already approved.
- Approve the dashboard, lesson, quiz, playground and local project lab screens in D1.
- Use `templates/MILESTONE_SIGNOFF_TEMPLATE.md` to document signoff.

### 6. Only then authorize the first implementation stage

After you approve D0 and D1, use `prompts/01_D2_APP_FOUNDATION.md`. It is **not permission** for any agent to generate all 12 weeks or the coding playground in one shot.

### 7. Future weekly conversion

After app shell and Week 1 pilot are approved, use `prompts/03_CONTENT_CONVERSION_PROMPT.md` for one student week at a time, with original code ZIP and the preceding approved week.

## Source-of-truth order for any AI coding agent

1. `AGENTS.md`: hard project rules.
2. `DECISIONS.md`: agreed choices and open approvals.
3. `docs/product/PRODUCT_REQUIREMENTS.md`: what the platform must do.
4. `docs/learning/MASTERY_RULES.md` and `docs/data/LOCAL_PROGRESS_SPEC.md`: correctness of progress.
5. `docs/curriculum/*`: what must be taught and where it came from.
6. `docs/design/*`: what screens should look and behave like.
7. `docs/architecture/*`: safe frontend-only and offline boundaries.
8. `ROADMAP.md` and `docs/quality/*`: stage gates and evidence.
9. Original source materials: student lesson substance, not public assets.

## Guardrails if you copy content into public GitHub later

- Review third-party content and adopt a deliberate license.
- Do not accidentally publish full instructor solutions or private reference assets.
- Never commit a learner's backup JSON, `.env` credentials, or other sensitive material.
- Browser quiz answers can be inspected by technical users; do not claim secure certification.
- Public static hosting needs HTTPS (and SPA route handling) for reliable PWA/navigation.

## AI-editor independence

`AGENTS.md` is the canonical project policy. The universal first prompt does not depend on a proprietary tool command, file-edit protocol, or model. If a tool does not support automatic project instructions, open `AGENTS.md` and paste the first prompt manually. The small editor adapters in the repository simply direct tools to that source of truth; they must not independently redefine decision gates.

**Current owner approvals:** DEC-01–DEC-17, DEC-21 and DEC-23 are AGREED. DEC-18, DEC-19, DEC-20 and DEC-22 remain OPEN. D0/D1 signoff and D2 authorization are pending.
