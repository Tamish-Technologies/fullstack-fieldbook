# D1 Visual Design and UX Brief — FullStack Fieldbook

**Status (2026-11-18):** **D1 APPROVED A-017** (Technical Editorial A-015, D1-B static mockups A-016, D1-C and reversible temporary branding A-017). Design is an accepted implementation target; **D2 app code still needs separate authorization**.

## North star

Create a self-paced learning experience that combines the rigor and readability of a well-designed technical field guide with the confidence of an interactive coding lab. Learners should know **where they are, what to learn, what to practice, and exactly what is required to advance**. The interface must make difficult technical material easier to understand, not bury it under dashboard decoration.

## Approved constraints from D0

- Phase 1 only; 12 weeks; 138 provisional lessons / 304 checkpoints.
- No backend, database, accounts, required AI APIs, analytics or cloud progress.
- Progress stored locally; support backup/import, resume, review, and deliberate reset.
- 80% quizzes plus essential checks; mandatory safe browser-code tests; accurate **self-verified** labels for off-browser project work.
- Optional activities cannot block progress. Clear, accessible explanations when a lesson is locked.
- Week 1 coding must be safely isolated in D4; do not design impossible “test passed” UI for D3.

## Chosen visual direction — Technical Editorial (A-015)

The owner explicitly selected **A — Technical Editorial**. This direction is fixed for D1 exploration unless the owner authorizes a change. It combines the typography and structure of a thoughtful developer field guide with the practical affordances of a coding lab.

**Visual characteristics to demonstrate in mockups:**

- A calm **reading-first** hierarchy: chapter number and breadcrumb, meaningful H1, short orientation, body text at readable measure, annotated examples, margin notes/glossary and a clear next mastery action.
- A **distinct coding-workspace treatment**: code editor and test-output surface feel technical and usable, not decorative or like a generic marketing card.
- Clear structure through thin rules, restrained borders, modest corner radii, subtle background shifts, generous white space and editorial type scale. Avoid noisy gradients, gamified XP/streaks, childish mascots, oversized charts and generic AI robot imagery.
- Course progress remains easy to understand, adopting the *functional clarity* of the alternate calm-workspace sketch: clear Resume action, weekly completion state, honest auto-verified/self-verified distinctions, prerequisites and reset consequences. It must never displace the lesson reader as the visual priority.
- Start with the previously proposed token colors (indigo `#4F46E5`, completion teal `#0F766E`, hint amber `#B45309`, ink `#111827`, canvas `#F8FAFC`), but **do not imply the final palette is approved** before real component contrast and light/dark design review.
- Body typography approximately 16–18px with generous line height and a 65–75-character reading measure; bundle a legible monospace for coding if adopted. Font selection/licensing are still open.

See `D1_ART_DIRECTION_DECISION.md` for the owner record and `D1_SCREEN_MOCKUP_PLAN.md` for the next screen-design deliverables. The one-page sketches shown in discussion established the **direction**, not complete visual mockups.

## Priority screen designs (desktop, tablet and mobile)

| ID | Screen | Essential UX and states |
|---|---|---|
| S1 | Welcome & orientation | First-time path, system requirements, privacy/local progress disclosure, Start vs Resume |
| S2 | Course dashboard | One clear resume action, 12-week roadmap, counts from real gates, locked/explained/reviewable weeks |
| S3 | Week overview | Objectives, lessons, prerequisites, required project gate, current progress, available vs locked |
| S4 | Lesson reader | Narrow readable article, code examples, objectives, chapter outline, hints, Previous/Continue with honest gate |
| S5 | Knowledge quiz | Question navigation, 80%-plus-essential rule, attempts, explanatory feedback, retry without shame |
| S6 | Coding lab | Editor, safe-run semantics, preview/output, test panel, progressive hints, responsive fallback |
| S7 | Local project verification | Exact commands, expected outputs, checklist, optional bounded evidence, **Self-verified locally** label |
| S8 | Progress & review | Completed vs pending requirements, last visit, review links, no invented credential |
| S9 | Settings | Theme, local storage privacy, export/import with validation, lesson/week/course reset with consequence preview |
| S10 | Offline / error / empty states | No connection, malformed backup, unsupported device features, no progress, 404, missing prerequisite |

## Core interaction flows to prototype

1. **First visit → Week 1 Lesson 1:** short welcome, local-data explanation, obvious Start, clear learning objective.
2. **Lesson → knowledge-check failure → hints → retry → pass → next eligible lesson:** retry should not feel punitive. Include essential-check failure even when aggregate quiz is at least 80%.
3. **Browser coding challenge:** code change → sandbox run → multiple behavior tests → actionable failure → pass; no trusted-page execution.
4. **Off-browser lab (React/Express/PostgreSQL):** download/setup → locally run tests → specific checklist/evidence → label **Self-verified locally**.
5. **Locked lesson deep link:** show why locked and link to earliest unmet prerequisite without confusing blank/error page.
6. **Returning learner → Resume:** browser-stored valid state, correctly recovered after refresh.
7. **Reset/import:** preview all affected dependent completions; offer export before destructive reset/import.
8. **Long lesson on mobile:** reading, navigation and hint access without cramped three-column layout.

## Layout directions

- **Desktop (large):** left course outline, focused central reader, optional right on-page map / terms / notes; do not squeeze article to a narrow sliver.
- **Tablet:** collapsible secondary rail; maintain accessible navigation and reading width.
- **Mobile:** single-column reading, accessible drawer/outline, sticky controls only when they do not obscure content; for complex local coding, clearly recommend laptop/desktop rather than a fake mobile terminal.

## Component design inventory

Brand header, week card, lesson row, progress indicator (numeric + accessible text), status chips, prerequisite alert, glossary tooltip, worked-code block, editor shell, output/test result, hints ladder, quiz radio/card, assessment summary, local-verification evidence panel, toast/inline error, destructive confirmation, import/export chooser, theme toggle, keyboard focus/skip link and offline notice.

For every major component, show **default, hover, focus, disabled, locked, passed, failed and error** states where applicable. Never rely on color alone. Use real sample lesson copy and realistic statuses; placeholder lorem ipsum does not validate educational readability.

## D1 deliverables (design artifacts, not application code)

1. **Direction selected:** Technical Editorial (A-015). Document design reasoning and the rejected dashboard-first alternative; do not recreate the art-direction comparison as a new open choice unless asked.
2. Site map and user journeys revised from `SCREEN_SPECIFICATIONS.md` with state transitions and lock explanations.
3. High-fidelity mockups of S1–S9 in desktop and mobile sizes, plus tablet treatment for the lesson reader and coding lab. Include S10 state screens as needed.
4. Color/typography/spacing tokens, component anatomy and states, light and dark themes.
5. Design for a complete **sample Week 1 lesson** with real explanation, code example, quiz and feedback so readability can be judged.
6. Accessibility review: WCAG 2.2 AA target, contrast with actual backgrounds, keyboard focus, semantic controls, reduced motion, readable zoom and touch targets.
7. A review record of decisions, alternatives rejected, open issues and any technical feasibility concerns that D2/D4 should validate.

If the environment cannot generate image mockups, provide annotated wireframes and exportable design specifications, explicitly noting that visual approval still requires review of real rendered designs before D2.

## What does NOT count as D1 signoff

A written claim that “the app will be beautiful,” a palette table without page-level layouts, screenshots of unrelated template dashboards, a single desktop hero image, an inaccessible mobile mockup, or any React/Vite implementation created before D2 authorization.

## Review sequencing

- **D1-A:** Technical Editorial chosen **A-015**; temporary wordmark and tagline accepted later in **A-017**.
- **D1-B (APPROVED A-016):** Desktop and mobile static mockups accepted as design baseline; not functional implementation.
- **D1-C:** Component specification, dark mode, tablet accessibility requirements and branding **accepted A-017 as design targets**.

**Approval gate:** `docs/design/D1_OWNER_SIGNOFF.md` is now **approved A-017**. D0 is A-014, and **D2 remains locked until separately authorized**.

## D1-B concrete screen artifacts (owner-approved baseline A-016)

See `D1_B_MOCKUP_REVIEW.md` and `design-reviews/d1b/index.html` for 27 rendered desktop/mobile/dark mockup frames. The 17-page companion PDF is `design-reviews/d1b/FullStack_Fieldbook_D1B_Screen_Mockup_Review.pdf`. Read `D1_B_OWNER_FEEDBACK.md` before recording any screen approval. These static compositions do not implement the learning app.

## D1-C current handoff

Use the owner-accepted D1-B gallery and PDF as the baseline. D1-C proposals are now organized in `D1_C_COMPONENT_CONTRACTS.md`, `D1_C_ACCESSIBILITY_AND_INTERACTIONS.md`, `D1_C_RESPONSIVE_TYPOGRAPHY_AND_TOKENS.md` and `D1_C_OWNER_REVIEW.md`. These were accepted as D1 design requirements in A-017; no D2 authorization follows from this approval.

## D1-C design final-review update (2026-11-18)

The final review candidate now includes responsive tablet/320px static frames, core component feedback states and sample contrast evidence. The owner has **not yet approved D1-C or signed off D1 overall**. See `D1_C_FINAL_REVIEW_PACKET.md`, the D1-C gallery, and `D1_C_OWNER_REVIEW.md`.
