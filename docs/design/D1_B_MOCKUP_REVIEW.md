# D1-B Screen Mockup Review — FullStack Fieldbook

**Status:** **OWNER-APPROVED D1-B MOCKUP BASELINE (A-016, 2026-11-18)**. This is not full D1 approval.  
**Approved direction:** A — Technical Editorial (A-015).  
**D0:** Approved (A-014).  
**D1 overall:** NOT approved; D1-C design review pending. **D2 React/Vite/application coding: NOT AUTHORIZED.**  
**Review package:** `design-reviews/d1b/index.html` and `design-reviews/d1b/FullStack_Fieldbook_D1B_Screen_Mockup_Review.pdf`.

## Objective

Make the approved Technical Editorial direction concrete enough for the owner to judge the *actual learning experience*: readable content, code annotation, quiz feedback, local project evidence, privacy, locked progression, mobile navigation, and reset/import consequences. These mockups are high-fidelity **static design artifacts**, not an implemented academy or a functioning prototype.

## How to review

1. Open `design-reviews/d1b/index.html` in a browser. Its linked HTML/CSS pages are **static** and work without an application server. Click a thumbnail to examine the full 1440 × 900 or 390 × 844 frame.
2. Optionally view the 17-page PDF at `design-reviews/d1b/FullStack_Fieldbook_D1B_Screen_Mockup_Review.pdf`; zoom in to examine text and details.
3. Begin with **S4 lesson reader**, then S2 dashboard, S5 quiz failure/pass, S6 coding lab, S7 local project, S9 reset/import and S10 locked/offline. Review supporting screens afterward.
4. Record corrections and accept/reject decisions in `docs/design/D1_B_OWNER_FEEDBACK.md`. *Do not* check D1 signoff until all D1-C accessibility/component work and owner review are complete.

## Exact visual deliverables

| Screen | Visual artifact / variant | Key question for owner |
|---|---|---|
| S1 | Welcome — desktop/mobile | Does the first action and local-data model make sense? |
| S2 | 12-week resume dashboard — desktop/mobile | Is resume prominent without dashboard clutter? |
| S3 | Week overview — desktop | Are the weekly project gate and missing prerequisites obvious? |
| S4 | Lesson reader — desktop/mobile/dark desktop | Is the article readable, technical, and inviting to study for long periods? |
| S4M | Mobile lesson outline drawer | Can the learner navigate and understand locks without losing place? |
| S5 | Quiz at 80% with a failed essential question — desktop/mobile | Does feedback help without incorrectly unlocking? |
| S5P | Quiz passed — desktop | Does 'Passed automatically' remain distinct from local-project reports? |
| S6 | Coding lab — desktop/mobile/dark desktop | Do editor, output, tests, hints and constraints form a coherent workspace? |
| S6T | Mobile coding-lab Tests tab | Can mobile visitors inspect the test outcome without a fake local terminal? |
| S7 | Local project verification — desktop/mobile | Is 'Self-verified locally' truthful and specific? |
| S8 | Progress and review — desktop | Does evidence avoid implying certification or remotely verified competence? |
| S9 | Privacy, settings, export/import/reset — desktop/mobile | Is data ownership easy to understand? |
| S9R | Destructive reset preview — desktop/mobile | Are downstream consequences and the backup recommendation clear? |
| S9I | Import preview — desktop | Is replace-with-preview and prerequisite recalculation explicit? |
| S10 | Locked deep link — desktop/mobile | Does it name the *earliest missing prerequisite* and route back safely? |
| S10O | Offline — desktop | Does it explain cached/local limits without claiming every link works offline? |

**Count:** 27 static HTML screen frames, 27 PNG renders, one overview HTML gallery, one 17-page review PDF. The two dark desktop frames are S4 and S6.

## Design language visible in these frames

- **Editorial hierarchy:** light neutral canvas, deliberate reading measure, understated borders, numbered chapter labels and small field-note cues.
- **Typography proposal:** system UI sans for navigation, Georgia-style serif for prominent instructional headlines, system monospace for code. This is a **D1-B proposal**; final licensing and font selections are still subject to owner review under DEC-20.
- **Color:** proposed `#4F46E5` indigo (primary), `#0F766E` teal (passed), deep ink `#111827`, amber hints, neutral surfaces. Palette is not yet signed off; see `D1_B_TOKENS_ACCESSIBILITY_REVIEW.md`.
- **Mastery semantics:** badges always include text, e.g. 'Passed automatically', 'Self-verified locally', 'Next lesson locked'; not color-only signals.
- **Progress model:** mockups use an *illustrative* Week 1 learner with two completed lessons and Lesson 3 in progress. Week 2 is not unlocked.
- **Product boundary:** no account, cloud data, backend in the academy itself, API paid service, automatic validation of students' local React/Node/PostgreSQL work or production-ready auth claims.

## Review scenarios

1. First visit → orientation → available Week 1 Lesson 1.
2. Returning learner → one meaningful Resume action → Lesson 3.
3. Reading Lesson 3 → open browser HTML exercise → complete required tests and quiz → next lesson unlocks. **No actual tests are running in these frames.**
4. Quiz at 4/5 (80%) but essential answer incorrect → informative message, hint, equivalent retry, *no unlock*.
5. Local Express lab → run `npm test` personally → check required evidence → record *self-verification*.
6. Locked link to Week 7 → tell learner which Week 6 project/readiness gate is unmet → link back.
7. Reset earlier week → preview affected dependent lessons → offer export → require explicit confirmation.
8. Import backup → validate file, preview replacement, recompute prerequisites, confirm explicitly.
9. Offline → reading can use cached assets only after actually cached; external downloads/links are conditionally unavailable.

## Design-stage limitations (must not be misreported)

These HTML files contain static markup and CSS. They intentionally contain **no application JavaScript**, no router, no progress storage, no functional buttons, no active quiz scoring, no code execution and no backend. The screenshot words '2 passed / 1 failed' are sample *visual states*, not test results. Font and contrast calculations are a proposal-level review, not an audited end-user build. Files may be opened locally for review but should not be deployed as the learning app.

## Owner feedback requested (not assumed)

- Accept the reading-first hierarchy, headline typography, and course-rail density—or request changes.
- Accept the desktop/mobile approach for quiz, lab and prerequisite navigation—or request changes.
- Review whether mobile lab should offer a read-only fallback and strong recommendation to continue complex projects on desktop.
- Review reset/import wording and how destructive outcomes are shown.
- **Completed A-016:** Owner approved D1-B static mockups as the basis for D1-C; final typography, accessibility, tablet and identity work still requires review.

## What happens after D1-B feedback

**D1-C:** refine component anatomy/states, perform full design-level accessibility and contrast review, lock down the approved design tokens and typography, and finalize S1–S10 states. Then solicit an explicit D1 owner signoff. Even a signed-off D1 **does not automatically authorize D2**; the owner must separately instruct the agent to implement the D2 shell.

## Owner approval outcome (supersedes the review-request instructions)

The owner explicitly wrote **“I approve D1-B”** on 2026-11-18; see `D1_B_APPROVAL_RECORD.md`. The images and static HTML gallery are now the accepted design baseline, not functional application behavior or a WCAG-tested implementation. The D1-C specifications and final D1 owner decision remain open.
