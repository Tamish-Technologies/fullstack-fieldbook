# D1-C Responsive Layout, Typography, Tokens & Motion — Approved Design Baseline (A-017)

**Status:** **DESIGN APPROVED A-017** as initial responsive/type/token targets, with real-UI accessibility corrections and checks required. Static evidence: `design-reviews/d1c/`, `D1_C_RESPONSIVE_VALIDATION.md`, `D1_C_COLOR_CONTRAST_REVIEW.md`.  
**Base:** D1-B screens A-016; Technical Editorial A-015. All values are **design targets** for later testing, not implemented CSS.  
**DEC-20:** **AGREED A-017** for a reversible v1 baseline. Accessible refinement during implementation must preserve the approved art direction.

## Recommended type system

| Element | Candidate type and target | Design intent |
|---|---|---|
| UI and dense navigation | System sans (`system-ui`, Segoe UI, Arial fallback); optional bundled open-license sans after review | Clear controls, accessible and free of third-party font network requests |
| Editorial lesson H1 / prominent section lead | Georgia-style system serif, reserved for main learning titles; 32–42px desktop / 28–34px mobile | Premium technical-field-guide personality without impairing reading |
| Lesson body | System sans 17px desktop, 16px minimum mobile, line-height 1.65–1.75 | Legible sustained study; target article width ~65–75ch |
| Code | System monospace 13–15px with adequate line-height | Technical clarity, avoids unnecessary font downloads; allow horizontal code scrolling |
| Supporting captions | Prefer 13–14px; never unique required instructions only in 10–11px microcopy | Usability at zoom and on phones |

**Owner decision in D1-C:** accept limited serif headlines, choose default system sans + system monospace, and decide whether any optional self-hosted open-license font is essential. No font files are included in the handoff and no proprietary font is required.

## Design tokens (proposed semantic roles, not raw style code)

| Semantic role | Light candidate | Dark candidate | Use/notes |
|---|---|---|---|
| Canvas | `#F8FAFC` | `#0B1220` | Main background |
| Surface/paper | `#FFFFFF` | `#111827` | Reader, card and dialog |
| Primary text | `#111827` | `#F8FAFC` | Headings and essential information |
| Paragraph text | `#334155` | `#E2E8F0` | Lesson prose |
| Secondary text | `#475569` | `#CBD5E1` | Supporting descriptions, not hidden requirements |
| Brand/action | `#4F46E5` | `#A5B4FC` | Navigation and primary interaction |
| Brand-subtle surface | `#EEF2FF` | `#242C48` | Active navigation / low-intensity highlight |
| Passed/auto | `#0F766E` | `#5EEAD4` | Only where text also says what passed and how |
| Self-verified | Neutral/calm surface and **explicit method label** | Neutral/calm surface and method label | Avoid treating self-report as independent certification |
| Hint/warning text | `#A16207` on `#FFF7E9` | `#FBBF24` on `#3A2B17` | Warm hint; keep separate from safety errors |
| Error text | `#B91C1C` on pale red | `#FCA5A5` on `#3A2128` | Corrective feedback and test failure |
| Low-impact border | `#E2E8F0` | `#334155` | Decorative dividers only, not sole affordance |
| Strong border / focus | `#4F46E5` focus light | `#A5B4FC` focus dark | Test focus visibility around all interactive states |

### Verified mathematical contrast samples from D1-B (not full accessibility validation)

- Indigo `#4F46E5` on white: **6.29:1**.
- Teal `#0F766E` on white: **5.47:1**.
- Body `#334155` on canvas `#F8FAFC`: **9.90:1**.
- Amber `#A16207` on `#FFF7E9`: **4.63:1**.
- Dark text `#E2E8F0` on `#0B1220`: **15.19:1**.

These pairs are **candidate values**. D1-C still needs checks for all actual text sizes, disabled controls, icon borders, focus rings, code token colors, overlays, error states and browser zoom. Do not equate swatch calculations with WCAG-certified product behavior.

## Responsive layout targets

| Viewport | Navigation/reading | Coding lab |
|---|---|---|
| Wide desktop ≥1280px | Persistent course rail (~240–264px), article 65–75ch, optional contextual rail. Avoid squeezing article below ~580px. | Editor/preview or editor/tests two-pane when both remain usable; test summary stays visible. |
| Laptop 1024–1279px | Course rail if space; contextual TOC collapsed to on-page outline or popover. | Two panes if min widths pass, otherwise tabs; no horizontal whole-page overflow. |
| Tablet 768–1023px (review at **834×1112**) | Collapsible labeled course drawer; single article column with section outline on demand. Keep breadcrumb short and actions reachable. | Prefer **Code / Preview / Tests** tabs, preserve editor draft and scroll on tab switch. |
| Mobile ≤767px (review at **390×844** plus 320px equivalent) | One main reading column, labeled course drawer; no permanent right rail; sticky bottom actions only with safe spacing. | Tabs for code/preview/results. Clearly recommend laptop for real npm/Express/PostgreSQL labs; never fake a local terminal. |

### Tablet review sketches (behavioral, not rendered UI)

**Tablet reader:** top bar (menu, lesson ID, theme) → title/outcomes → content with 65–75ch max → inline notes and code blocks → mastery status panel → non-obscuring Previous/Next. A course drawer opens over the page with focus management; contextual TOC moves into `On this page` control.

**Tablet lab:** top bar → task instructions + criteria → `Code | Preview | Tests` tab list → one full-width panel at a time → Run/Check anchored in a non-obscuring action strip. Changing tabs does not clear unsaved code; on-screen keyboard must not cover the result summary.

D1-C owner review must decide whether these behavioral sketches are sufficient or whether a rendered tablet frame should be added before final D1 acceptance.

## Spacing and component sizing

- Four-point spacing base; typical tokens: **4, 8, 12, 16, 24, 32, 48** px.
- Body reading line length **65–75ch** where the screen allows, with fluid 16–24px horizontal page padding.
- Primary controls on touch screens target **≥44×44 CSS px** where feasible; desktop actions may be visually compact but must remain comfortably operable.
- Border radius restrained: ~6–12px standard surfaces, ~12–16px major panels; avoid bouncy oversized pills for every label.
- Visible focus candidate: contrasting **3px ring, 2px offset**, tested on light and dark states.
- Right rail never holds the *only* copy of a required objective, hint or prerequisite.

## Dark theme, motion and persistence

- Dark theme should be an intentional palette, not a naive color inversion. Code panel contrasts and editor selection need their own review.
- Theme modes: **System (default)**, Light, Dark. User selection persists in local preferences, independent of lesson progression data.
- Respect `prefers-reduced-motion`; no celebratory motion or animated score counters required. Use minimal, nonessential transitions for drawer/hint motion.
- Avoid theme flash and layout jumps during eventual initialization; this must be checked in D2+.
- Offline content readability must not depend on Google Fonts or any external font CDN.

## Accepted DEC-20 design choices — A-017

1. **Brand:** FullStack Fieldbook text wordmark with a small decorative `F/S` mark; temporary “A practical learning guide” tagline; no bespoke logo required in D2.
2. **Typography:** Editorial serif for prominent article titles only; system sans for body/UI and system mono for code. No external font dependency.
3. **Palette:** Semantic light/dark tokens above accepted as initial targets; adjust individual rendered combinations where testing reveals a contrast or focus problem.
4. **Tablet:** Use Code/Preview/Tests tabs where parallel panes are too narrow, preserving draft and focus.
5. **Mobile:** Accessible course drawer and non-obscuring actions with safe area and onscreen keyboard considerations; no fake backend terminal.

**Design accepted, implementation unverified.** D2 must be separately authorized and real accessibility/responsive checks performed.
