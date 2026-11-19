# Product Requirements Document (PRD) — FullStack Fieldbook v0.1

## Problem

Beginner web-development education is fragmented. Learners follow tutorials without demonstrating knowledge and lose continuity across HTML, CSS, JS, React, backend, database and deployment. The existing 12 instructor handbooks are detailed, but not designed for fully independent self-study. The app will turn them into a guided, interactive, progressively gated course.

## Target learners and constraints

- Primary: 18–19-year-old beginner with modest HTML/CSS/JS exposure and a possible long learning break.
- Secondary: self-paced new web learners with free tools and a computer capable of local Node.js/DB practice.
- Context: an optional mentor may assist, but all core instructional explanations must stand independently.
- Costs: **free to learn**, no API subscriptions or paid service requirements; static hosting.
- Core language: English v1, plain and respectful explanations; code terminology defined at first use.
- Devices: mobile-friendly reading and quizzes, desktop recommended for substantial coding and terminal projects.

## Product promise

A learner can start from Day 1, learn every essential concept in the 12-week Phase 1 course, practice real skills, verify learning before progressing, resume on the same browser, and export progress without an account or cloud service.

We should aim to outperform passive tutorials in **structure, clarity, practice, feedback and continuity**, but we cannot guarantee superior learning outcomes until we test it with real learners.

## Critical user journeys

**New learner:** Visit → clear orientation and requirements → start W01-L01 → learn → attempt checkpoint → receive feedback → pass → next lesson.

**Returning learner:** Open app → progress recovered locally → resume exact lesson/exercise → revisit prior lessons at will.

**Struggling learner:** Fail → specific misconception-based feedback → show hint ladder and prerequisite links → retry with a new or rearranged question set.

**Working on a terminal project:** Read setup instructions → download starter files → work locally in VS Code → run tests + inspect acceptance checklist → record self-verification accurately → unlock further work.

**Changing devices/clearing data:** Export a backup → import into another browser → see validated, compatible progress (no cloud sync).

**Reset:** Preview effect of reset, optionally export first, confirm, then remove chosen scope and all dependent completions.

## Functional requirements (priority)

| ID | Priority | Requirement | Concrete acceptance |
|---|---|---|---|
| FR-01 | P0 | Show all 12 weeks in order, with appropriate lesson outlines | Clearly labeled available/locked/completed states |
| FR-02 | P0 | Allow starting, resuming, reading, revisiting lessons | Deep links work and locked deep links redirect to prerequisite guidance |
| FR-03 | P0 | Mastery gate per lesson | Opening/scanning page never counts as passing |
| FR-04 | P0 | Quizzes with useful feedback and unlimited retries | Deterministic grading, explanation of wrong answers, no permanent punishment |
| FR-05 | P0 | Weekly project checklists, evidence and required checkpoints | Explicitly distinguish self-attested from automatically verified |
| FR-06 | P0 | Browser-local progress | Refresh retains progress on the same origin, absent storage failures |
| FR-07 | P0 | Full/section reset with destructive confirmation | Cascade impacts shown before deletion; re-evaluate locks |
| FR-08 | P0 | Stable content IDs with real source traceability | Every lesson maps to specific original Phase 1 chapter(s) |
| FR-09 | P0 | Detailed explanations and readable code blocks | Accurate explanations, examples, misconceptions, exercises |
| FR-10 | P0 | No compulsory cloud or paid services | Course study works without AI login or backend endpoints |
| FR-11 | P1 | JSON backup export and restore | Schema validated; incompatible/corrupt imports fail safely |
| FR-12 | P1 | Coding labs for browser HTML/CSS/JS | Isolated execution, clear feedback, reasonable input limits |
| FR-13 | P1 | Downloadable project starter materials | Downloads work; version and steps identified; answers not default exposed |
| FR-14 | P1 | Content search, glossary and bookmarks | Useful for review without bypassing gates |
| FR-15 | P1 | Offline-capable PWA | After prepared cache, core course works without internet |
| FR-16 | P1 | Dark/light/system themes | Readable text and code at WCAG contrast targets |
| FR-17 | P1 | Reading settings/accessibility | Adjustable text comfort, keyboard support, reduced motion |
| FR-18 | P2 | Notes and small code drafts stored locally | Bound storage usage, warn before clearing/reset |
| FR-19 | P2 | Optional guided AI prompt copy | Not required to pass or use app; no API integration |

P0 = must-have before a useful pilot; P1 = required before wide release; P2 = valuable enhancement after core mastery is sound. Some P1 features are deliberately scheduled in later dev stages.

## Quality requirements

- **Educational:** Content complete against verified source inventory; each lesson has objectives, examples, practice and checkpoints. Content QA requires human review, not only AI-generated summaries.
- **Performance:** No heavy remote service or video required; lazy-loading by week; no external font dependency for offline use; define performance budgets during implementation.
- **Privacy:** No registration, tracking, analytics, advertising or remote learning-progress collection in v1.
- **Reliability:** Local storage may be denied/cleared; app degrades gracefully and displays backup risk. Do not claim progress cannot be lost.
- **Accessibility:** Target WCAG 2.2 AA where applicable; semantic headings, focus, keyboard and screen readers.
- **Trust:** UI labels never claim an off-device backend project is “automatically verified” without real independent evidence.
- **Security:** No execution of student-written code in the app's trusted JS context; offline sandbox isolation.
- **Maintenance:** Content files separated from code, stable IDs, versioned schema, tests for gating and content integrity.

## Distinct activities vs. status labels

- **Read:** content can be viewed. Does not imply mastery.
- **Attempted:** learner has tried practice/quiz.
- **Passed automatically:** measurable local quiz or deterministic code check succeeded.
- **Self-verified:** learner ran local project tests or followed verifiable acceptance steps and acknowledged result.
- **Completed:** all required checkpoints for that lesson/week are satisfied.

## Definition of “Phase 1 course complete”

All required lesson/checkpoint gates in weeks 1–12 are complete, including completion of a Week 12 capstone checklist and self-evaluation. Completion is a personal progress indicator, **not a credential proving independently invigilated competence**.

## Out of scope

Online community, accounts, teacher-admin panel, certificates claiming formal accreditation, server-side progress databases, cloud save, leaderboards, live AI chat or agents, auto-running Node/Postgres inside browser, videos requiring network, and Phase 2 student content.

## Pilot success measures

- A new learner completes W01 without missing context or outside tutoring for required concepts.
- Failed questions receive actionable feedback and the learner can recover.
- Reload/locked deep links/import/reset behave exactly as specified.
- A learner can explain a concept and implement a small change, not just pass rote answers.
- Source-to-student lesson traceability passes content QA.
