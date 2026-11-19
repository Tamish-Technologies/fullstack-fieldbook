# Prompt 01 — Universal D2 App Foundation — ONLY After D0/D1 Owner Signoff

**This prompt is intentionally saved for later. Do not run without the owner's explicit authorization to begin D2.**

Implement **D2: static application shell + local progress engine** according to the approved `DECISIONS.md`, `ROADMAP.md`, design/UX specs, architecture and mastery rules.

Scope for D2 ONLY:
- Set up minimal React + TypeScript + Vite project with agreed Tailwind and selected UI primitives; verify current official docs, versions and compatibility.
- Implement shell navigation and placeholder data manifest that illustrates all 12 weeks without pretending content is already approved.
- Implement week/lesson deep links, clearly visible locked/ready/in-progress/completed states and prerequisite route guards.
- Implement versioned, validated `localStorage` progress with safe load/save errors; never treat `unlocked` as an independent trusted boolean.
- Implement completed-checkpoint-driven gate evaluation and reset behavior with downstream cascade preview; implement export/import after schema review per D2 acceptance plan.
- Implement key design tokens and mobile reading shell; no large interactive playground yet.
- Add unit and browser tests for gating, refresh, invalid saved data, import, reset and direct-URL locking.
- No backend, server-side DB, external API, analytics, account, Phase 2 course, or fake quiz pass path.

Before coding, restate your exact task list and acceptance criteria. During implementation, keep changes reviewable. At the end, run actual checks and provide a demo guide, list of changed files, test results, known problems and explicit request for approval. **Stop after D2.**
