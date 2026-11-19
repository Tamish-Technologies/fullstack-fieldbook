# FullStack Fieldbook Design System — Approved D1 Baseline (A-017)

**Status (2026-11-18):** **Overall D1 APPROVED A-017**, including D1-C candidate tokens, typography, responsive component states and reversible branding. These are *design targets*, not verified React behavior; **D2 application development remains separately unauthorized**.

## Owner-selected art direction (A-015) — Technical Editorial

This system should evoke a **carefully designed engineering field guide**, not a generic analytics dashboard. The *reader* is the flagship interface. Dashboard cards and progress visuals exist to orient learners and should not compete with text, examples and tests.

- **Chapter anatomy:** numbered chapter/lesson marker, succinct breadcrumb, meaningful headline, outcomes, high-quality prose, code annotation/margin note, practice question and visible next gate.
- **Editorial rhythm:** a strong type hierarchy, clear separation rules and whitespace. Avoid high-gloss cards, rainbow gradients, heavy shadows, oversized visualizations and excessive badge collections.
- **Coding rhythm:** purpose-built editor/results panels, filename labels, accessible Run/Check/Reset-code actions, distinct pass/fail messages and helpful error descriptions. No fake terminal or simulated "passed" results.
- **Progress clarity:** dashboard borrows compact progress/status clarity from the alternate Calm Learning Workspace direction, but never becomes the dominant design language.
- **Meaningful details:** field-note sidebars, callouts for misconceptions, annotation lines and module indexes are appropriate when they aid understanding.
- **Status of tokens:** the palette below remains an initial proposal; it must be tested on actual mockups before final approval.

Current art-direction decision: `D1_ART_DIRECTION_DECISION.md`. Required next mockups: `D1_SCREEN_MOCKUP_PLAN.md`.

## Design philosophy

- **Calm learning environment:** a focused technical book combined with a modern coding lab—not a loud gamified dashboard.
- **Explain first, then assess:** reading and practice take priority over badges, streaks and decorative animations.
- **Premium but accessible:** deliberate spacing, restrained color, clear hierarchy, excellent keyboard focus and readable code.
- **Consistency:** the same lesson blocks and controls throughout all 12 weeks; no new visual language for every topic.
- **Honesty:** represent auto-graded and self-verified progress distinctly. Avoid visual signals that imply externally certified competency.

## Brand foundation

- Confirmed product name: **FullStack Fieldbook**. Repository slug: `fullstack-fieldbook`.
- Personality: credible, welcoming, practical, serious about learning; avoid childish mascot or excessive motivational copy.
- Voice: second-person, plain English, supportive without hype. Example: “That answer doesn't account for `filter()` returning a new array. Review how it differs from `splice()`.”
- Visual motifs: field notes, chapters, annotated code, layered application diagrams, and structured cards. Keep the appearance distinctly technical and instructional; avoid generic AI robot imagery.

## Design tokens — light mode (starting palette)

| Token | Value | Use |
|---|---|---|
| `brand.primary` | `#4F46E5` | Primary actions, active navigation |
| `brand.primaryHover` | `#4338CA` | Hover on primary action |
| `feedback.success` | `#0F766E` | Passed status and completion |
| `feedback.warning` | `#B45309` | Caution/hints, not required to mean failed |
| `feedback.error` | `#B91C1C` | Failed verification and error text |
| `ink.strong` | `#111827` | Headings and primary content |
| `ink.body` | `#334155` | Comfortable instructional body text |
| `ink.muted` | `#475569` | Secondary descriptions, check contrast |
| `surface.canvas` | `#F8FAFC` | App background |
| `surface.card` | `#FFFFFF` | Reading and card surfaces |
| `surface.subtle` | `#F1F5F9` | Code toolbars, insets |
| `border.default` | `#CBD5E1` | General separations |
| `border.subtle` | `#E2E8F0` | Non-critical dividers |
| `focus.ring` | `#4F46E5` | Visible keyboard focus with offset |

### Initial contrast calculations (foreground on named background)

These are basic mathematical checks of individual color pairs, **not** an audit of all final component states:

| Pair | Contrast ratio |
|---|---:|
| Primary indigo `#4F46E5` on white | 6.29:1 |
| Success teal `#0F766E` on white | 5.47:1 |
| Warning amber `#B45309` on white | 5.02:1 |
| Body ink `#334155` on white | 10.35:1 |
| Muted ink `#475569` on white | 7.58:1 |
| Dark-mode primary `#A5B4FC` on `#111827` | 8.90:1 |

Text overlays, hover/disabled states, dark backgrounds, code themes and focus outlines still need visual/accessibility review in D1 and browser testing in D2.

**Use semantic tokens**; do not scatter hex literals throughout components. Brand success and warning must also have icons/text, never color alone. Test component-level contrast after background/text pairings are finalized.

## Dark mode proposal

| Token | Value |
|---|---|
| Canvas | `#0B1220` |
| Cards | `#111827` |
| Raised/inset surfaces | `#1E293B` |
| Strong text | `#F8FAFC` |
| Body text | `#E2E8F0` |
| Muted text | `#CBD5E1` |
| Borders | `#334155` |
| Primary active accents | `#A5B4FC` (contrast-test against dark surfaces) |
| Success accents | `#5EEAD4` |
| Warning accents | `#FBBF24` |
| Error accents | `#FCA5A5` |

Respect `prefers-color-scheme`, with an explicit theme override. Avoid flashes of the wrong theme during startup. Code editor can use a synchronized independent dark theme.

## Type system

- UI font: Inter **or system sans fallback**, bundled locally if a custom font is chosen and its license permits.
- Code font: JetBrains Mono **or system monospace fallback**. Never make a hosted font essential for offline study.
- Reading body: desktop ~17px; comfortable line height ~1.7–1.8; line length ~65–75 characters.
- Mobile reading body: ~16px minimum without forcing zoom, line height ~1.65.
- UI labels/buttons: ~14–16px; avoid excessively small secondary text.
- Lesson H1: desktop 30–36px, mobile 26–30px; H2 23–27px; H3 18–21px.
- Code: approximately 13–15px, adjustable where feasible, preserved indentation, horizontal scrolling if necessary.
- Use semantic headings and a real table of contents; don't rely on visual weight without heading semantics.

## Spacing and sizing

- Base rhythm: 4px grid; key spacing steps 4, 8, 12, 16, 24, 32, 40, 48, 64px.
- Default button/control height: 40–44px; recommended primary tap targets 44px or more where practical.
- Card radius: 12px; control radius: 9px; panel radius: 16px; avoid overly rounded app surfaces.
- Border: 1px neutral. Shadows subtle; rely on whitespace before extra borders/shadows.
- Interactive transitions: ~120–200ms and easily disabled by `prefers-reduced-motion`.
- Content max width: approximately 760px for prose. Code playground may extend wider.

## Layout grids

**Desktop >=1280px:** fixed left course rail (~248px), flexible lesson reader (~760px maximum), optional right utility rail (~208–232px), gap ~24px. Center the whole composition; keep prose narrow.

**Laptop 1024–1279px:** left rail (~224px), reader grows, utility rail becomes a collapsible drawer/inline contents.

**Tablet 768–1023px:** compact left navigation drawer, 1 main reading column, anchored next/previous controls.

**Mobile <768px:** one reading column, top course navigation, a drawer for week outline, context tools below lesson, sticky progress controls only if they don't block content/keyboard. Code blocks scroll horizontally; coding tasks recommend desktop if appropriate.

Breakpoints are **behavioral design targets**, not a command to use arbitrary magic numbers throughout code; test at representative in-between widths.

## Core reusable component inventory

| Component | Purpose | Essential states |
|---|---|---|
| `AppShell` | Global header/nav/reading frame | desktop, mobile, offline |
| `CourseRoadmap` | 12-week roadmap | locked, current, completed |
| `WeekCard` | Week overview and objectives | unavailable, ready, ongoing, passed |
| `LessonOutline` | Ordered lesson navigation | locked, active, completed |
| `LessonHeader` | Title, objective, place in course | reading progress, estimated effort |
| `ExplanationBlock` | Long-form teaching content | headings, code, glossary |
| `CodeExample` | Syntax-highlighted display | copy, wrap, accessible labels |
| `PracticeBlock` | Exercise and hints | untouched, attempting, incorrect, passed |
| `QuizQuestion` | Knowledge check | unanswered, selected, checked, feedback |
| `QuizSummary` | Score and remediations | pass/fail, review, retry |
| `CodePlayground` | Sandbox-based practice | editing, running, tests, error, timeout |
| `ProjectLab` | Local full-stack task | setup, criteria, expected output, self-verification |
| `HintStack` | Progressive help | hint 1/2/3; no automatic full answer |
| `ProgressIndicator` | Earned checkpoint completion | count + qualitative labels |
| `MasteryGate` | Explain requirements | prereqs, done/remaining, unlock |
| `Breadcrumbs` | Context and navigation | keyboard usable |
| `SearchDialog` | Find known topics | results don't bypass locked routes |
| `StorageWarning` | Local data reliability | saved, warning, blocked, failure |
| `BackupRestore` | Export/import flow | validate, preview, confirm, success/fail |
| `ResetDialog` | Destructive progress action | scoped preview, confirm, cancelled |
| `ThemeSwitch` | Light/dark/system | preferences persist |

## Visual treatment of educational states

- **Locked:** restrained border, lock icon, prerequisite explanation visible. Avoid making completed material seem punitive.
- **Ready:** normal card with clear Begin action.
- **In progress:** highlighted navigation line and accurate checkpoint percentage.
- **Passed automatically:** check icon and “Checks passed” label.
- **Self-verified:** check icon and explicit “Self-verified project” label; distinct from automated passing.
- **Needs review:** actionable label and link to concept, no arbitrary streak/points penalty.

## Code/editor UI direction

- Code examples use a quieter, high-contrast panel with filename and language label.
- Playground supports Run / Check / Reset editor (reset code, not course), test output, console-like diagnostics, and side-by-side preview on large screens.
- On small screens, stack tabs: Instructions → Editor → Preview/Results.
- Never obscure editor's keyboard focus or show fake “Passed” from merely pressing Run.
- Any runnable learner code is isolated from the main app context; execution design is in the architecture spec.

## Animation policy

Only purposeful movement: opening navigation, collapsing hints, gentle progress acknowledgment. No confetti by default, no autoplay background video, no fake countdown urgency. Honor reduced motion and allow skipping effects.

## Accessibility baseline

Target WCAG 2.2 AA: keyboard control and visible focus, screen-reader labels and announcers for result changes, correct reading order, sufficient text contrast, meaningful errors, touch target sizing/spacing, reduced-motion support, no color-only meaning, code editor keyboard affordances. Validate in a browser with keyboard and accessibility tooling, not by visual inspection alone.

## D1 design approval artifacts required

1. Light and dark theme tokens reviewed for contrast.
2. Desktop and mobile mockups for all priority screens from `SCREEN_SPECIFICATIONS.md`.
3. Component states: locked/pass/fail/loading/storage issue/confirmation.
4. One complete Week 1 lesson reading + quiz screen prototype (not necessarily coded).
5. One playground layout and one external backend lab layout.
6. Owner approves branding/colors/type and navigation pattern before D2.

## D1-B rendered typography and frame proposal — screen baseline approved A-016; final tokens pending D1-C

The A-015 Technical Editorial art direction has been exercised in actual static screen mockups: `design-reviews/d1b/index.html`. The frames use system sans-serif UI, a **proposed Georgia-style serif accent for large lesson headings**, and system monospace for code. The restrained serif accent, system font strategy and temporary branding are accepted A-017; font-loading and visual accessibility remain implementation checks. The primary indigo/teal/amber/ink tokens above are unchanged from the established proposal.

`docs/design/D1_B_TOKENS_ACCESSIBILITY_REVIEW.md` records color-pair calculations and open accessibility issues; `docs/design/D1_B_SCREEN_BEHAVIOR_AND_FLOW.md` describes keyboard, tablet, mobile drawer/tab and progress-state behavior to be implemented only after D1 signoff and D2 authorization. **No application code was developed or tested by these design frames.**

## D1-C component and accessibility design contracts (owner approved A-017)

The accepted D1-B visuals do not finalize operational behavior. Accepted design contracts are in `D1_C_COMPONENT_CONTRACTS.md`, `D1_C_ACCESSIBILITY_AND_INTERACTIONS.md`, `D1_C_RESPONSIVE_TYPOGRAPHY_AND_TOKENS.md` and `D1_C_OWNER_REVIEW.md`. Token values are initial accepted design targets: real rendered accessibility still requires verification. A-017 does not certify WCAG conformance or authorize application coding.

## D1-C final review candidate — authority and limits (2026-11-18)

The 27 approved D1-B static frames (A-016) remain the visual baseline. Proposed responsive frames, contrast calculations, interim wordmark/tagline and component-state feedback are in `D1_C_FINAL_REVIEW_PACKET.md` and `design-reviews/d1c/`. They are **approved by the owner A-017** as reversible design requirements, extending A-015/A-016.

For future engineering, verify accessibility, dynamic focus/keyboard behavior, color ratios in rendered components and 320px/834px reflow in D2–D4; no static document guarantees these properties. D2 remains unauthorized.
