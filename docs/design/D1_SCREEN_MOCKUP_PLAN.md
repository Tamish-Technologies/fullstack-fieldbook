# D1-B Screen Mockup Plan — Technical Editorial

**Stage:** D1-B 27 static frames **owner-approved A-016 as a baseline**; D1-C component/accessibility/tablet review pending (not implementation).  
**Direction:** Technical Editorial, owner-selected in A-015.  
**Prerequisite:** D0 owner-approved as A-014.  
**Gate:** Full D1 owner signoff is pending; **D2 application coding is not permitted**.

## Review objective

Create *actual reviewable screen mockups* that show how a learner understands, practices, demonstrates mastery and resumes the curriculum. These are **design artifacts**, not runnable application files or React source.

## First review batch — focus screens

| ID | Screen | Primary design questions | Required states |
|---|---|---|---|
| S4 | **Lesson reader — top priority** | Can a beginner comfortably follow real Week 1 explanation, code and annotation? Are learning outcomes and Continue conditions obvious? | lesson available, active, gate incomplete, completed, mobile contents drawer |
| S2 | **Course dashboard** | Can a returning learner resume instantly and understand 12-week progress without visual noise? | first-time, in-progress, completed week, locked week, no saved progress |
| S5 | **Knowledge quiz** | Can a wrong answer teach? Is the essential-question rule shown separately from ≥80% score? | unanswered, submitted incorrect, hint, retry, pass with essential gate |
| S6 | **Coding lab** | Can students understand instructions, edit, run, check and debug safely? | idle, editing, executing, failed tests, passed tests, sandbox unavailable |

### Recommended mockup frames

- **Desktop:** 1440×900 baseline; mockup may scroll for long editorial content.
- **Mobile:** 390×844 baseline; show drawer, reading flow and stacked/Tabbed code lab.
- **Tablet:** 834×1112 **behavior notes or annotated frame** for lesson reader and lab.
- **Dark mode:** at least S4 lesson reader and S6 coding lab, with text/panel contrast notes.
- **Use real approved Week 1 topics** such as semantic HTML, DOM events or JavaScript functions; no lorem ipsum. Source wording should be re-authored for students rather than revealing instructor answer keys.

## Second review batch — complete screen system

| ID | Screen | Requirements |
|---|---|---|
| S1 | Welcome/orientation | Curriculum scope, requirements, local-only progress explanation, Start/Resume |
| S3 | Week overview | Required vs optional lessons, weekly project and readiness gate, explicit prerequisites |
| S7 | Local project verification | Actual local command instructions, reported test evidence, **Self-verified locally** labeling |
| S8 | Review/progress | Lesson vs week achievements, errors or gaps, last active lesson, no fabricated credential |
| S9 | Settings/import/reset | Local data notice, validated import preview, scoped reset confirmation and export suggestion |
| S10 | Error/offline/locked | Clear prerequisite deep-link, storage unavailable, offline, 404, invalid import |

## Interaction stories to show in mockups

1. First-time learner starts Week 1 Lesson 1.
2. Returning learner resumes last valid unlocked lesson.
3. Student fails a quiz despite ≥80% because an essential question is wrong, receives a hint, retries.
4. Learner sees `Passed automatically` after real browser checks, versus `Self-verified locally` after reporting project tests.
5. Locked deep-link explains the earliest missing prerequisite.
6. Reset/import previews exact downstream completion consequences and offers export first.

## Art and component standards

- Use restrained editorial typography and field-note cues; avoid overly playful mascot/XP themes.
- Use the **proposed** indigo/teal/amber/ink palette as a starting point; document any proposed adjustments, do not silently finalize colors.
- Show explicit pass/fail/locked descriptions, icons and text; do not communicate status only through color.
- Show keyboard focus and tap target behaviors with annotations, even if static.
- Keep course progress visible but clearly secondary to lessons and exercises.

## Review deliverables and what counts as evidence

- Exported image or design-file mockups for the listed screens, including desktop and mobile.
- Annotated screen flow explaining locked, auto-graded and self-verified transitions.
- Palette/font/component proposal with contrast checks on real examples.
- A change log for issues found during review and any open DEC-20 decisions.

**Do not mark mockups reviewed, passes verified, D1 approved or D2 authorized until the owner explicitly confirms those separate gates.**

## D1-B delivered static artifacts — pending owner review

- Gallery: `design-reviews/d1b/index.html` (27 responsive/dark/state frames, openable without React).
- PDF: `design-reviews/d1b/FullStack_Fieldbook_D1B_Screen_Mockup_Review.pdf` (17-page visual review).
- Owner notes: `D1_B_MOCKUP_REVIEW.md`, `D1_B_OWNER_FEEDBACK.md`, `D1_B_SCREEN_BEHAVIOR_AND_FLOW.md`, and `D1_B_TOKENS_ACCESSIBILITY_REVIEW.md`.
- Frame coverage includes S1–S10, quiz pass/failure, mobile course drawer, mobile coding Tests tab, light/dark reader/lab, locked/offline and import/reset consequence previews.
- Tablet adaptation is **specified in behavior notes**, not yet independently rendered or usability-tested.
- None of these screens is executable application code, live quiz evaluation, a tested isolated runner, proof of local-project correctness, or owner-approved final UI.

**Next:** owner inspects and records requested corrections (D1-B), then D1-C finishes component states, tablet/accessibility refinements and final design signoff. D2 coding remains blocked.

## Current disposition — A-016 (2026-11-18)

The D1-B screen mockups are accepted. This plan is retained as the **historical D1-B scope and review record**, not a request to redo the screens. Follow `D1_C_OWNER_REVIEW.md` for next actions. No code or full D1 signoff is authorized.
