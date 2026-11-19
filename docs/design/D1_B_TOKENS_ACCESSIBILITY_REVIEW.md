# D1-B Token and Accessibility Review — Proposal, Not Final Approval

**Status:** D1-B mockup frames **OWNER-APPROVED A-016**; **palette, typography and component accessibility still require D1-C owner review**. Technical Editorial direction approved A-015. This document records measured color pairs and review risks, not conformance certification.

## Typography proposal

| Usage | D1-B rendering | Decision status |
|---|---|---|
| UI / navigation | system-ui / Segoe UI fallback, variable line height | Proposed; Inter may be bundled under appropriate font license during actual implementation |
| Large editorial lesson headings | Georgia-like serif | **Owner must approve or replace**; intentionally distinct from the sans-serif course UI |
| Prose | 16–17px on reading surfaces, ~1.65–1.75 line-height, reading measure ~65–75 characters | Design target; test at browser zoom 200% |
| Code | system monospace, light/dark syntax colors | Proposed; ensure horizontal scrolling, selection and spoken text accessibility |
| Labels/metadata | mostly 12–14px in mockups | Review smallest sizes carefully; not all tiny decorative labels are acceptable for essential information |

**No proprietary font files are part of the mockup package.** Local system fonts are used for the design previews; font choices remain open under DEC-20.

## Proposed color pairs — mathematical WCAG relative-luminance check

| Foreground / background | Contrast | Initial disposition |
|---|---:|---|
| Indigo `#4F46E5` on white `#FFFFFF` | 6.29:1 | Passes 4.5:1 normal text target |
| White on indigo `#4F46E5` | 6.29:1 | Passes 4.5:1 normal text target |
| Teal `#0F766E` on white | 5.47:1 | Passes 4.5:1 normal text target |
| Warning `#A16207` on pale amber `#FFF7E9` | 4.63:1 | Passes 4.5:1; review any smaller status labels |
| Body `#334155` on canvas `#F8FAFC` | 9.90:1 | Passes |
| Secondary `#475569` on canvas `#F8FAFC` | 7.24:1 | Passes |
| Primary dark accent `#A5B4FC` on `#111827` | 8.90:1 | Passes |
| Dark body `#E2E8F0` on dark canvas `#0B1220` | 15.19:1 | Passes |
| Dark amber `#FBBF24` on `#3A2B17` | 8.18:1 | Passes |
| Dark error `#FCA5A5` on `#3A2128` | 7.75:1 | Passes |
| White on error `#B91C1C` | 6.47:1 | Passes |

**Not yet verified:** all code syntax token combinations; disabled buttons; borders and non-text contrast; hover/focus backgrounds; opacity overlays; mobile browser zoom; assistive technology; true 200% and 400% reflow. Perform these tests on the implemented app in D2/D4 and design-level checks in D1-C.

## Accessibility acceptance criteria for D1-C and implementation

- Semantic page landmarks, H1/H2 hierarchy, readable single-column lesson, skip-to-content link, sensible navigation order.
- Keyboard-operable drawer, tabs, quiz options, hints, editor controls, reset confirmation and import review. Visible keyboard focus remains distinct from selected and passed states.
- Touch targets target at least 44 × 44 CSS pixels for primary mobile controls, with suitable spacing.
- Long code examples scroll horizontally without clipping essential content; do not reduce code font to tiny sizes just to fit.
- Headings, prose and labels must survive 200% text zoom; layout must reflow at narrow equivalent viewport without horizontal page scrolling.
- Honor user `prefers-reduced-motion`; do not make progress rely on animation, confetti or timers.
- Never rely on indigo/teal/amber/red alone for mastery; include icon, words, and behavioral explanation.
- Quiz feedback is announced accessibly after submission, with focus moved logically if errors block progression; essential-question rule appears in plain language.
- Progress backups, invalid imports and reset warnings provide accessible error descriptions and consequence summaries.
- Coding playground must isolate learner code; preserve accessible non-visual alternative instructions when the editor is unsuitable for a learner/device.
- Mobile coding tabs need readable active-state labels and accessible role/keyboard interactions in the real app (not provided by static HTML).

## Design-stage issues requiring owner review

1. **Serif headline proposal:** good editorial personality, but confirm that it is suitable for a broad global student audience and does not dominate the instructional hierarchy.
2. **Navigation density:** a 12-week outline must remain usable for low-vision users; the screenshots show only first eight sidebar items before scrolling. Actual design needs independently scrollable rails without keyboard trapping.
3. **Mobile reader:** reader content target is 16px; some mockup metadata remains smaller and must never carry unique essential information.
4. **Mobile coding lab:** tabs represent *planned navigation*. D1-C must specify the accessible focus and state preservation behavior; complex local terminal labs should continue to recommend a laptop.
5. **Bottom navigation:** the design should reserve content space for fixed footer actions so a keyboard or on-screen keyboard does not cover assessment buttons. Screenshots are static; implementation must test scroll.
6. **Reset/import previews:** modal dismissal, focus return, validation and effects on existing progress need tests in the actual application.

## Design QA limitations

The frames were visually rendered at 1440 × 900 and 390 × 844 from static local HTML/CSS. Image generation and static review do not demonstrate behavior in actual browsers, keyboard interactions, screen readers, or sandbox runner safety. The final WCAG 2.2 AA target remains an implementation goal requiring manual and automated review, not a claim already achieved.

**A-016 note:** Accepting the rendered D1-B appearance does **not** certify the listed contrast calculations for every state or authorize adoption of fonts/assets. Final decisions and design-level acceptance checks are in `D1_C_RESPONSIVE_TYPOGRAPHY_AND_TOKENS.md` and `D1_C_OWNER_REVIEW.md`.
