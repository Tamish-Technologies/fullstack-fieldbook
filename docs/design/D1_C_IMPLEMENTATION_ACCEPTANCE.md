# D1-C Design Acceptance Contract for Future Engineering

**Status:** **DESIGN ACCEPTED A-017 (2026-11-18).** Only actionable in application code **after a separate explicit D2 authorization**. Applies to FullStack Fieldbook Phase 1 only.

## D2: shell and local progress foundation

- Reproduce D1-B approved visual hierarchy with D1-C responsive navigation, using React/TypeScript/Vite/Tailwind/selected accessible components.
- Provide dark/system/light theme with visible focus and reduced motion; preserve manual preference locally.
- Implement router, 12-week metadata navigation, clear prerequisites, correct locked deep-link behavior and a working last-eligible Resume path.
- Version/validate local progress records. Test refresh, private/storage-unavailable mode, backup/import preview, cascading reset and safe default focus.
- At 320px effective width and 834px tablet, no **whole-page** horizontal overflow. All essential content remains reachable.
- Demonstrate keyboard reachability and preliminary contrast for the **actual** interface.
- Use fixtures/placeholders only; don't imply completed Week 1 mastery or working code execution.

## D3: lesson and quiz dry run

- Author the real Week 1 lesson content, examples, approved quiz-item bank and feedback following D0/DEC-21.
- Implement quizzes with ceil(80% × required questions) **plus all essential questions**; never unlock on page view or a missed essential.
- Support unlimited retries, progressively useful hints and a clear correction route.
- Maintain honest pending labels for browser coding checkpoints; D3 isn't the full Week 1 mastery pilot.

## D4: coding labs and complete Week 1 pilot

- Isolate learner code from trusted app origin. Define CSP/sandbox constraints and verify escape/network/timeouts; no eval in the trusted app document.
- `Run` preview and `Check` mandatory test run are separate actions. Editing after a check makes the old results stale; stale/failed/unavailable runs never unlock.
- Provide Code/Preview/Tests tabs for tablet/mobile with draft preserved and keyboard/screen-reader fallback if editor access is inadequate.
- Execute an integrated Week 1 mastery pilot; do not claim Week 1 passes if a required lab hasn't been verified.

## D9: offline release and QA

- Cache bundled approved content and necessary UI assets; communicate where offline cannot run a local Node/database project.
- Verify backup restores, schema migration, corrupted data recovery, no private source leaks, zoom, contrast, keyboard navigation, reduced motion, and publication rights.

## Product truthfulness throughout

**Automatic verification** = assessed inside a genuinely executed quiz or isolated browser test. **Self-verified locally** = student attests to running their actual local tests. The latter must never appear as an independently checked credential.

Never include private instructor PDFs, answer keys, actual reference projects, credentials or secrets in the public app bundle. Optional external AI tools must not be required to proceed.

## Design-vs-implementation evidence

Design acceptance validates a proposed look and interaction contract; it does not establish secure execution, functioning storage, or WCAG conformance. Future engineers must separately report browser and automated test results they actually ran.
