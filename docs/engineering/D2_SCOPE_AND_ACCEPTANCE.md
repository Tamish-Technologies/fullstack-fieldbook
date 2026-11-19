# D2 — Application Shell & Local Progress Foundation (Scoped Build Contract)

**Project:** FullStack Fieldbook · **Stage:** D2  
**Specification status:** D2 implementation authorized on 2026-11-18. Owner acceptance recorded on the same date in the [D2 review](D2_FOUNDATION_REVIEW.md).
**D0/D1:** Approved A-014/A-017; **D2:** authorized for the foundation only.

## Purpose

Create a trustworthy, accessible React/TypeScript static app *foundation* that can later host all twelve weeks. The result should allow reviewers to navigate realistic placeholders, inspect learning prerequisite states, save/export/import/reset local progress safely, and judge desktop/tablet/mobile usability. D2 is **not** a completed student course.

## Technical starting constraints

- React + TypeScript + Vite; Tailwind and only selected accessible shadcn/ui primitives needed for D2.
- Verify currently supported package releases and compatibility against official documentation when coding begins; record versions. Do not invent a dependency matrix ahead of installation.
- Static client-only app: no backend endpoints, cloud auth, database, analytics, paid AI API or required remote assets.
- Use local course manifest/lesson identifiers grounded in the approved D0 blueprint. **138 lessons provisional**; content itself may be marked Coming Later.
- Preserve route and checkpoint ID stability; do not expose instructor solutions in public assets.
- Follow approved D1-A/B/C style and component behavior. Font assets are optional; no remote font requirement.

## D2 implementation slices (agent should stop after D2)

| Slice | Work | Verification |
|---|---|---|
| 1 | Minimal build, static app shell, theme and responsive reading navigation | `build`/typecheck; desktop, 834px and 320px smoke checks |
| 2 | Local course manifest, nested week/lesson routes, accessible locked states, resume path | Navigational unit + E2E checks; locked deep links preserve gates |
| 3 | Versioned local progress store, schema validation, blocked-storage fallback | Reload, malformed record, unavailable/quota storage tests |
| 4 | Derived prerequisite gate engine using required checkpoint evidence (not stored `unlocked` booleans) | Graph tests, mandatory vs optional checks, gate derivation |
| 5 | Lesson/week/full-course reset with accurate cascade preview and confirmation | Dependent lessons invalidated; review/retry doesn't erase mastery |
| 6 | JSON export/validated import with overwrite preview, size limits and safe error recovery | Corrupt/unknown/oversize input rejected without overwriting current progress |
| 7 | Focus, keyboard, basic screen reader status, theme and 320px responsive checks | Accessible labels, escape/focus for dialogs, no whole-page horizontal overflow |
| 8 | Documentation and review report | Manual test guide; exact commands, passed/failed checks and limitations |

## D2 fixture policy: do not fabricate course mastery

D2 may use **explicitly test-only** fixtures to exercise scoring/gating algorithms. Production placeholder lessons must NOT offer a “Mark passed” shortcut that manufactures completion. Real learner-facing quizzes, accepted coding tests and local-project checklists arrive at D3/D4/D5–D8. Clearly distinguish **Available for preview**, **Content coming later**, **Locked by prerequisite** and **Completed with real evidence**; never conflate these states.

A first-lesson route can be browsed as a non-completable preview. A direct URL to later locked material must explain prerequisites rather than silently allow unlocking.

## Evidence and master rules

- Quiz logic later: `ceil(0.8 * requiredQuestions)` correct **and all essential questions** correct.
- Browser coding later: all mandatory behavior tests in secure isolation. A Run preview alone never grants mastery.
- Local React/Express/PostgreSQL work later: learner-run local tests and a clear **Self-verified locally** label; no automatic claim.
- Optional enrichments never gate progression.
- Checkpoints and import values are validated, not trusted merely because they came from browser storage.

## D2 exit tests

1. Fresh install/build/typecheck (and lint where configured) succeeds with reported versions.
2. Dashboard and 12-week roadmap display correct known statuses; no misleading claim that 138 authored lessons are ready.
3. Direct locked-route navigation displays necessary prerequisites and supports recovery.
4. Refresh/restart restores valid progress and theme where storage works.
5. Storage denied/corrupt/quota errors do not crash or claim saves succeeded.
6. Required checkpoint and dependency gate unit tests pass, including optional Week 4 bypass.
7. Reset previews affected dependent lessons; confirms before deletion; review/retry preserve mastery.
8. JSON import rejects oversized/malformed/unknown IDs, previews replacement, offers backup first and never silently wipes a valid record.
9. Desktop/tablet/320px layout checks; focus, dialogs and keyboard path verified in actual UI (not only mockups).
10. Public build contains no private answer keys, instructor PDFs, database passwords or nonpublic ZIP assets.
11. Agent lists files modified, commands actually run, results, unverified areas and how to run the demo locally.
12. **Stop after D2** and request owner review. Do not start D3 without separate authorization.

## Explicitly out of D2 scope

Actual 12-week lesson prose, full quiz banks, executable CodeMirror runner, server-side grading, login, PostgreSQL, PWA/offline service-worker release, subscription/payment, third-party analytics, public course release, formal certification and Phase 2 curriculum.

## Remaining nonblocking decisions

DEC-18 public licensing before launch; DEC-19 final lesson count after D4 pilot; DEC-22 external AI disclosures if optional links/services proposed.
