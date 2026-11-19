# Screen-by-Screen User Experience Specification — D1 Accepted Baseline (A-017)

**Status:** D1 accepted as a design/interaction contract on 2026-11-18. This does not authorize application code or establish that any interaction has been tested.

## Site map

```
Welcome / Get started
  └─ Course dashboard (12-week roadmap)
      └─ Week overview
          └─ Lesson reader
              ├─ Explanation / worked example / glossary
              ├─ Practice / quiz / debug lab
              ├─ Local project handoff
              └─ Lesson completion → next eligible lesson

Global: Resume | Course roadmap | Search/glossary | Settings
Settings: Theme | Backup/restore | Reset | Privacy/offline help
```

Planned routes (example paths; final URLs approved with implementation):
- `/` → Welcome on first visit, otherwise dashboard/resume entry.
- `/course` → 12-week roadmap.
- `/course/week/01` → Week 1 overview.
- `/course/week/01/lesson/01` → Lesson reader.
- `/progress` → Progress details, not a formal credential.
- `/glossary` → Terminology and reference.
- `/settings` → local storage, backup/import/reset/theme.
- Unrecognized route → useful not-found page with navigation.

## S1. Welcome and setup

**Goal:** orient a brand-new learner without overwhelming them.

- Hero: “Learn to build real web applications, one mastered lesson at a time.” Avoid unsupported outcome guarantees.
- Explain the 12-week curriculum, expected study/practice flow, what is free, and what is local.
- Quick readiness: computer/keyboard recommendation, browser, free VS Code and Git, later Node/PostgreSQL prerequisites.
- Explain that learning progress is stored on this browser and may be lost if site data is cleared; show Backup in Settings.
- Actions: Start Phase 1, Explore syllabus (reading metadata without bypassing lesson content), How progress works.
- States: first visit, returning visitor with Resume, denied storage warning.

## S2. Course dashboard

**Goal:** answer “Where am I? What should I do next?”

- Header + course identity + Resume exact eligible lesson.
- Main progress: earned required checkpoint count and last activity; not a time-studied KPI.
- Roadmap 12 cards: number/title, topic summary, state, completed/total required gates, project's focus.
- Locked week explains prerequisite with link to earliest unmet gate.
- Quick links: review previous, bookmarks, backup status, install offline (when ready).
- Empty/new learner state, completed course state, unavailable progress state.

## S3. Week overview

**Goal:** frame learning goals and project before opening a lesson.

- Why this week matters; what new skills become available.
- Prerequisites and quick concept refresh links.
- Ordered lesson list; each item shows expected activity type and status.
- Weekly project briefing preview and required submission/evidence details.
- “What you'll build” and tool requirements in plain language.
- Start/Resume; locked item behavior and clear unlock requirements.

## S4. Lesson reader (primary screen)

**Goal:** make detailed lessons comfortable and interactive.

Desktop: left outline / centered reading / right On this page + notes/hints. Mobile: main column, collapsible outline.

Mandatory content near top: breadcrumb, title, exact learning outcomes, estimated effort, prerequisites. The main content is ordered explanation → worked example → practice → misconception → checkpoint → review. Sticky navigation may show Previous / Check / Continue, but never cover the article.

- Code samples with language/filename and accessible copy.
- Glossary definitions on-demand; no internet needed.
- Internal reference links to prerequisite lessons. A lesson can be reviewed after passing.
- End gate shows which tasks passed and which remain; Continue is disabled or explains why it is locked.
- Keyboard support for headings, quiz controls, and in-page anchors.
- Print-friendly main reading area optional after D3.

## S5. Quiz and practice screen

- Show question, context, possible answers or code task, and how many questions remain.
- Respond on Check; display correct/incorrect with explanatory feedback.
- Progress through question bank; do not reveal all answers just because wrong button clicked.
- Retry without penalty; hints and contextual links available.
- Score and essential-check policy visibly explained before assessment begins.
- Failed state: targeted review path, not generic shame language.
- Passing state: show earned mastery, exact unlock impact, and next lesson.
- Assistive tech: announced results and focus relocation to feedback.

## S6. Browser coding playground

- Problem statement and acceptance tests visible alongside editor.
- HTML/CSS: constrained preview in sandboxed iframe.
- JS: constrained evaluation process; avoid running arbitrary code in main window.
- Editor tabs if needed: HTML / CSS / JS; Run, Check, Reset code, Show hint.
- Results: passed/failed cases with reproducible explanation, timeouts and syntax errors handled.
- Desktop split view; mobile tabbed/stacked view with desktop recommendation for complex work.
- Security and network policy described in Architecture doc; there is no guarantee of running all third-party libraries offline.

## S7. Local full-stack project lab

**Important:** app does not run Node/Express/Postgres for user.

- Prerequisites: current week tools and expected environment.
- Download appropriate student starter ZIP (never teacher solutions by default).
- Step-by-step terminal commands with OS notes where necessary.
- Expected output and diagnostic section with common failures.
- Test commands, what passing output means, what failures to investigate.
- Acceptance checklist and optional evidence notes: test result summary, manual behavior demonstration.
- Explicit verification type: “I have run these tests locally” → self-verified, not auto-graded.
- Copyable AI tutor/review prompts optional.

## S8. End-of-week report

- Required lessons and checkpoints passed.
- Project completed / not completed, verification method.
- Areas for revision (not punitive).
- Link to all earlier lessons and Week N+1 once gated.
- Optional challenge exercises clearly labeled as nonblocking.
- End of Week 12 includes an honest learner-owned capstone summary, not formal certification.

## S9. Settings / privacy / backup / reset

- Clear explanation of local storage/device/browser caveats.
- Export JSON backup with feedback.
- Import JSON file → validate → compare → confirm overwrite.
- Reset section: review/retry (non-destructive), lesson reset, week reset, entire-course reset; exact cascade preview.
- Theme: light/dark/system, reduced-motion preference and reading size.
- Offline assets status/help if PWA installed; distinguish cache from progress data.
- No account, no telemetry settings required (because none exists in v1).

## S10. Search and glossary

- Search bundled approved lesson metadata and glossaries.
- Results identify locked/available status; previewing metadata doesn't grant completion.
- Click locked result leads to informative prerequisite screen, not content bypass.
- Glossary is locally available even when week lesson is locked, to help comprehension.

## Navigation and states to review in D1

- New learner vs returning learner.
- Dark vs light mode on long lesson and code editor.
- Small phone (~360px), tablet (~800px), laptop (~1024px), large desktop (~1440px).
- No-progress storage warning.
- Failed quiz and retry with specific guidance.
- Locked lesson via direct URL.
- Offline lesson, pending offline download, storage cleared.
- Import error, corrupt backup, destructive reset confirmation.
- External lab with missing project dependencies and test failures.

## Screen success criteria

A novice always knows: **where they are, what they're learning, how to practice, why they cannot advance yet, and what exact next action unlocks progress**.

## D1-C final screen and state proposal (2026-11-18)

The earlier screen specifications remain the baseline. The D1-C **candidate** adds static designs at 834px tablet and 320px effective width plus dark reader, course drawer and six important feedback states (`design-reviews/d1c/index.html`). This is not a functioning product. The full owner-review and criteria are in `D1_C_FINAL_REVIEW_PACKET.md`, `D1_C_OWNER_REVIEW.md`, and `D1_C_IMPLEMENTATION_ACCEPTANCE.md`.

- Tablet reader: one-column article, course drawer, optional on-page outline, readable 65–75ch maximum when possible; final action/footer must not obscure text.
- Tablet/mobile lab: Code/Preview/Tests in tabs. A code edit marks previous Check evidence stale. `Run` does not unlock mastery; required tests do.
- Quiz: when 80% is reached but an essential question is wrong, focus correction summary and explain exactly what is incomplete.
- Local project: show “Self-verified locally” and identify student-attested commands; never state server/database checks were automatically run by the course.
- Settings: reset previews downstream effects and offers backup; invalid import preserves existing data.
- Storage failure: learning content remains readable, with prominent warning that progress cannot be persisted.

**All interaction and accessibility behavior must still be implemented and verified in authorized D2–D4 stages.**
