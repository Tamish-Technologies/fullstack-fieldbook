# D1-B Screen Behavior, Responsive Rules, and Navigation Contract

**Status:** D1-B static flow baseline **OWNER-APPROVED A-016** for D1-C design refinement. Behaviors are still **design specifications, not implemented or tested interactions**; D0 mastery logic is authoritative and no app code is authorized.

## Primary navigation and layouts

- **Desktop (review width 1440):** fixed left course rail; top bar with breadcrumb/search/theme; primary article column; contextual rail on long lessons. Use stable primary navigation for Dashboard, Course roadmap and Progress & review. Do not let the article measure exceed ~65–75 characters.
- **Laptop (1024–1279):** keep the course outline if room permits; collapse right contextual rail into a button or in-article list.
- **Tablet (review target 834 × 1112):** hide persistent left rail; provide a labeled, keyboard-accessible course drawer, article one column, compact context list or drawer. Lab uses a vertical split only when both panes stay usable; otherwise tabs.
- **Mobile (review width 390 × 844):** single-column article, compact header and course drawer, no permanent right rail. Prev/Next status is visible without covering reading content. Lab has Code/Preview/Tests tabs with persistent draft and progress; if runtime is unsupported, provide instructions and a save/export workaround rather than falsely saying tests passed.
- **Dark:** deliberately themed reader and editor, not a color inversion. Maintain recognizable indigo for navigation and teal for passing states; status text must be explicit.

## Screen-specific behavior

| Screen | Core elements | Actions/behavior that D2–D4 must implement later | Error/empty behavior |
|---|---|---|---|
| **S1 Welcome** | Purpose, 12-week scope, local privacy, system requirements | Start only earliest available lesson; returning learner resumes last eligible lesson | No storage: explain session-only mode and export limits; no compulsory account |
| **S2 Dashboard** | Resume, 12-week roadmap, progress breakdown | Resume validates prerequisites; clicking locked week explains earliest missing requirement | Clear first-time state and empty progress; no fake completion |
| **S3 Week overview** | Objectives, required lessons, weekly project, readiness gate | Lesson opens only if prerequisites met; optional branches are visibly non-gating | Missing prerequisite links back to source; no accidental bypass |
| **S4 Reader** | Breadcrumb, chapter ID, outcomes, technical explanation, code, field notes | Scrollable article with on-page TOC, accessible code copy, Next available only after all required checkpoints | If chapter content fails to load, preserve progress and offer retry |
| **S5 Quiz** | Question navigation, essential label, answer options, explained feedback | Score `ceil(0.8 × required)` + every essential correct; unlimited retries; show equivalent question where reviewed | 80% + essential missed stays incomplete; never mark auto-passed without checking |
| **S6 Coding lab** | Editor, preview, run, check, tests, hints, reset code | Test mandatory behavior in isolated browser runner; distinguish Preview from Check; retain draft only within exercise storage | Runner unavailable => don't claim pass; show fallback and transparent status |
| **S7 Local project** | Commands, acceptance checklist, bounded evidence text | Learner explicitly reports that commands ran and every required check passed; record a learner attestation | Cannot inspect local Express or PostgreSQL; never call it auto-verified |
| **S8 Progress** | Completed check history, resume, review | Distinguish automatically checked vs self-attested completions; export records | Stale/invalid progress recomputed from verified checkpoint IDs; no fake certificate |
| **S9 Settings** | Theme, offline notice, backup/export/import, reset | Import uses validate → preview → confirm replace; reset uses consequence preview → backup offer → confirm | Reject invalid/oversized imports; warn when storage unavailable |
| **S10 Locked/offline** | Reason, earliest unmet prerequisite, safe back link | Locked deep links never render unlocked content; offline shows what is actually cached | 404, unavailable cache, bad backup and quota errors receive actionable remedies |

## Interaction flows / state transitions

### Flow A — First visit

`first launch` → explanation of local progress → `p1-w01-l01` available → learner completes required quiz → L02 available. No account prompt, streak, fake certificate, or time gate.

### Flow B — Essential quiz miss

`quiz answered` → aggregate score ≥ 80% → essential question incorrect → **quiz remains incomplete** → show explanation and hint → equivalent retry → if aggregate + essential pass → record `quiz-auto` → unlock next dependent step.

### Flow C — Code runner and verification

`editing` → preview (not mastery) → run required tests inside isolated sandbox → failed result with named behavior and repair hint → retry → all required tests pass → store `browser-code-auto` evidence → update chapter gate. If runner fails to initialize, show *unverified* status.

### Flow D — Local full-stack lab

`download/starter instructions` → learner runs tests locally → all acceptance items checked and evidence recorded → store `local-project-self-verified` with explicit method → unlock when other gates also pass. Never transmit passwords, database URLs or raw private logs to the course.

### Flow E — Locked deep link

`visit locked URL` → compute prerequisites from approved graph, not imported `unlocked` flags → show earliest unmet checkpoint/lesson/week → link to it; browser history remains sensible.

### Flow F — Reset and import

`reset lesson/week/course` → compute dependent completions → preview affected counts and notes/draft policy → offer export → confirm destructive action → recompute resume target and unlocks. `import` → validate file format/content/version/size → preview replace → confirm → recompute prerequisites. No silent merge.

## Component-state contract

- **Locked:** lock icon + explicit prerequisite text and accessible disabled behavior.
- **Ready:** ordinary navigation affordance and Begin/Continue.
- **In progress:** exact outstanding checkpoints; progress denominator excludes optional enrichment.
- **Passed automatically:** only for exercises actually checked by the browser.
- **Self-verified locally:** only for learner-reported external test evidence; never a green badge implying independent verification.
- **Failed check:** describe which behavior or essential condition failed, not merely a red outline.
- **Disabled runner or unavailable local storage:** clear error and recovery, not an implied successful save.
- **Keyboard focus:** 3px visible ring with offset in final design; no focus traps except properly dismissible modal/drawer.

## What is deliberately illustrative in D1-B

All sample scores, progress dates, code-run outcomes, form values, checkboxes, and tabs are **static**. They are design states to be implemented later, after D1 signoff and explicit D2 authorization. Text may be adjusted during D1-C, but do not modify DEC-21 scoring or the D0 prerequisite graph by visual-design fiat.

**A-016 boundary:** The flow illustrations are accepted as intended UX. Component semantics, tablet behavior, focus/keyboard and safe execution still require D1-C and later runtime testing. See `D1_C_COMPONENT_CONTRACTS.md` and `D1_C_ACCESSIBILITY_AND_INTERACTIONS.md`.
