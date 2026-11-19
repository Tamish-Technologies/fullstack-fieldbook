# D1-C Component Anatomy & State Contracts — Approved Design Baseline (A-017)

**Status:** **D1-C DESIGN CONTRACT APPROVED A-017.** The static component-state sheet in `design-reviews/d1c/` is a reference, not an implemented component.  
**Baseline:** D1-B static mockups A-016; Technical Editorial A-015; approved curriculum/mastery rules A-014 and DEC-21.  
**Deliverable type:** accepted component interaction/design specification only. **No React code, CSS implementation or executable test runner has been authorized by D1 approval.**

## Design principles

1. **Teach before decorating.** Components provide a mental model, practice, correction or the next required action.
2. **Truthful mastery.** `Passed automatically` means real deterministic checks executed; `Self-verified locally` means learner-reported external evidence. Never convert one into the other based on color or a generic completion toggle.
3. **Accessible states.** Every change has a text label, role/semantics appropriate to the eventual HTML, keyboard path, focus treatment and recovery action.
4. **Intentional hierarchy.** One primary action per major panel, not multiple competing accents.
5. **Privacy/local-first.** No login, remote sync, mandatory AI API, third-party analytics or hidden progress upload.

## Component inventory and minimum contract

| Component | Content and anatomy | Required states | Interaction and evidence |
|---|---|---|---|
| Brand header | Text wordmark, optional decorative mark, top navigation, theme button | Default, compact, mobile | Brand text remains legible without logo; keyboard accessible navigation |
| Course rail | Week number, name, gated/completed label, progress | Ready, active, complete, locked | Scrollable outline with visible focus; locked item explains prerequisite rather than silently failing |
| Breadcrumbs | Course → week → lesson, shortened on mobile | Normal, deep-linked | Current page marked; available ancestors navigable |
| Resume card | Exact last eligible lesson, brief objective, primary Resume | First visit, in progress, completed | Resume target recalculated after reset/import, never trusts stored `unlocked` flag |
| Week card | Week index, objectives, progress, requirement counts | Locked, ready, in progress, completed | Status includes text, not just tint; optional work excluded from required denominator |
| Lesson header | Lesson ID, title, outcomes, estimated effort | Reading, ready to assess, passed | One H1; effort estimate not time gate; no progress for scroll-only actions |
| Article body | Main prose, headings, code, glossary links, notes | Normal, expanded note, missing content | 65–75ch target, copyable code, in-document headings, no arbitrary text truncation |
| Worked-code block | File label, language, copy action, source | Normal, copied, copy failed | Preserves whitespace/selection; clear accessible copy success/failure |
| Hint ladder | Step 1 concept cue, Step 2 narrowing, Step 3 guided reasoning | Closed, open, exhausted | Reveals in stages without permanently penalizing learner |
| Quiz question | Prompt, optional code, answer choices, essential marker | Unanswered, selected, submitted correct/incorrect, retry | Use radios for single choice; feedback explains why, not only a score |
| Quiz outcome | Aggregate score, essential status, next action | Not passed, 80% but essential miss, passed | Explicit `ceil(0.8*N)` rule; show exact unmet essential and link to revise |
| Code-lab shell | Instructions, editor, Run, Check, Preview, Tests, Hints | Idle, editing, running, failed, passed, runner unavailable | Run/preview ≠ mastery; only isolated mandatory Check tests create `browser-code-auto` evidence |
| Editor controls | Run, Check, reset draft, copy/download | Enabled, disabled with reason, busy | Reset code requires context; must never reset course progress accidentally |
| Tests panel | Named behaviors, expected/actual summary, detailed hint | No run, running, fail, pass, infrastructure error | Distinguish user-test failure from runner crash; never fake success |
| Local project card | Setup commands, tests, acceptance list, learner notes | Not started, partially attested, fully attested | Use exact label `Self-verified locally`; record short bounded, non-sensitive attestation |
| Progress meter | Required completed/total, text ratio, progress graphic | Empty, partial, complete | Percent computed from valid required checkpoint records, never from page views |
| Status label | Text + optional icon; distinct mastery method | Locked, ready, attempted, auto-passed, self-verified | Color cannot be the sole meaning; no vague `Verified` tag for self-report |
| Empty/error panel | Specific problem, next action, help link | No progress, no saved work, bad import, storage full, runner unavailable | Clear recovery copy; no destructive action without confirmation |
| Search & results | Search input, result list, filtered week/lesson list | Idle, searching, no matches, unavailable | Search must not open locked lesson without prerequisite explanation |
| Drawer/navigation panel | Title, close, current page, list of available links | Closed/open | Dialog semantics if modal, focus trap only while open, Escape/close restores focus |
| Tab list | Code / Preview / Tests on narrow screens | One selected, others available | Keyboard arrow navigation per chosen tab pattern, panels retain underlying draft |
| Confirmation dialog | Action name, scope, counts, export suggestion, cancel/confirm | Reset lesson, reset week, reset all, import replace | Clear irreversibility, initial focus on safe action, no accidental Enter-triggered deletion |
| Backup import preview | File validity, scope, replaces count, course/schema warnings | Invalid, valid preview, confirmed, failed | No silent merge; recompute prerequisite edges; never trust imported unlocked flags |
| Theme switch | Light, dark, system choice | Explicit/system | Honor OS, persist preference only with user choice, avoid unreadable transition flash |
| Mobile bottom action | Previous/review/continue, gate reason | Available, locked, keyboard-open | Does not overlay text, input fields, validation messages or mobile keyboard |
| Announcement area | Error, quiz result, save/import outcome | Idle, info, error, success | Screen reader announcement on meaningful outcomes; no excessive repetitive announcements |

## Detailed state transitions to prototype

**Lesson:** locked → ready → in progress → required quiz/code/local checks → `completed-auto` or `completed-self-verified` summary → unlock dependent item. Optional practice does not block. A lesson with mixed required methods must say **“Includes self-verified work.”**

**Quiz:** edit answers → Submit → compute rounded-up 80% threshold + all essential questions → fail with actionable reason OR pass with auto-verified evidence → unlimited retry. A failed essential question blocks the gate even at 80% overall.

**Code lab:** editing → Run preview (no completion) → Check in isolated runner → either required tests fail, runner unavailable or all pass. A successful browser preview does not count as test pass. Show the last valid test result, but mark it stale when code is edited after checking.

**Local project:** show commands and expected result → learner completes checklist and confirms the commands actually ran → store bounded attestation → mark Self-verified locally. The app does not upload logs or independently inspect local Express/PostgreSQL.

**Reset/import:** requested → consequence preview (affected future lessons, notes/drafts policy) → offer backup → explicit confirm → update locally and recompute progression. Review/retry by itself never revokes mastery.

## Content tone microcopy examples

| Instead of | Use |
|---|---|
| `Unlock failed` | `Complete the essential question to continue. Your quiz score is 80%, but that requirement is still unmet.` |
| `Project verified` | `Self-verified locally — you reported running the required project tests.` |
| `Success!` (without context) | `All 4 required behavior checks passed. Next lesson is available.` |
| `Cannot continue` | `Next lesson locked. Finish Week 6 readiness check to open this chapter.` |
| `Reset?` | `Reset Week 2? This also removes completion records for Weeks 3–12.` |
| `Offline mode supported` | `Lessons you have already cached may be available offline. Some downloads and external links may not work.` |

## D1-C review gates

- [ ] Component labels/actions approved across all normal, pending, failure and exceptional states.
- [ ] Every component's keyboard, focus, status-announcement and recovery behavior reviewed with `D1_C_ACCESSIBILITY_AND_INTERACTIONS.md`.
- [ ] Tablet/mobile anatomy, bottom action safety and dark-mode variants reviewed with `D1_C_RESPONSIVE_TYPOGRAPHY_AND_TOKENS.md`.
- [ ] No app runtime or WCAG-conformance claim made from static samples alone.
