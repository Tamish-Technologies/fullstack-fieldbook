# D1-C Responsive Review Evidence

**Status:** Static viewport candidate reviewed in a headless browser. **Not a full browser behavior/accessibility test.**

## Viewport evidence

| Frame | Size | Expected layout | Evidence |
|---|---|---|---|
| Tablet reader (light) | 834 × 1112 | One readable main column, no fixed side rail; article scrolls | `D1C_tablet_reader_light.png` |
| Tablet lab (light) | 834 × 1112 | `Code / Preview / Tests` tabs, separated Run and Check | `D1C_tablet_lab_light.png` |
| Tablet reader (dark) | 834 × 1112 | Dark text/body/panel tokens work together | `D1C_tablet_reader_dark.png` |
| Open tablet course drawer | 834 × 1112 | Course list overlays content with visible close path | `D1C_tablet_course_drawer.png` |
| Narrow reader | 320 × 740 | Reflowed headings, visible label/status, code scrolls within panel | `D1C_320_reader_light.png` |
| Narrow lab | 320 × 740 | One active tab, compact editor, readable actions | `D1C_320_lab_light.png` |
| Component states | 1200 × 890 | Semantically differentiated corrections and safety warnings | `D1C_component_states_desktop.png` |

Source: `design-reviews/d1c/screens/*.html` and `assets/d1c-mockups.css` are **static review prototypes**, not reusable app components. Local screens are illustrative snapshots; a learner cannot interact with them as real lessons.

## Automated geometry smoke check

The design-only screenshot process checked each frame's DOM `body.scrollWidth` equals the selected viewport width (834, 320 or 1200px). **All 7 frames showed no unexpected whole-page horizontal overflow**. This does **not** prove text zoom, keyboard navigation, device safe-area, virtual keyboard occlusion or a functional editor. The article/lesson content is intentionally scrollable within the static viewport, with bottom inset spacing to protect final content from the fixed mock footer.

## Responsive implementation contract

- ≥1280px: course sidebar + centered article + optional contents rail; article must not become extremely wide.
- 1024–1279px: keep content first; collapse contents rail as needed. Tabs in coding panel if two columns become unusably narrow.
- 768–1023px: navigation drawer; main reading column; local code preview in **mutually exclusive tabs**, drafts persist when switching.
- 321–767px: no fixed right rail; small reading gutters; no content cut by safe-area or sticky footer.
- Effective 320px: readable heading and body, action labels do not truncate vital meaning, code scrolls only within code panel.

## Required tests in authorized implementation

- Real 834px tablet and 320px/400%-zoom browser runs; 200% text-only zoom; orientation switching; long translated-like strings.
- Verify course drawer focus enters, stays when modal, Escape closes, and focus returns to trigger.
- Check mobile virtual keyboard doesn't cover code editor, error messages, Run or Check.
- Check fixed footer respects scrolling and safe-area bottom inset; keyboard and screen reader can reach content behind/after it.
- CodeMirror accessibility trial or equivalent accessible text-area/download fallback; no false pass when inaccessible.
- Visual code highlighting and inline focus states in Light, Dark and system settings.

The design artifacts are meant to support **D1 owner review**. User testing and actual accessibility outcomes remain future implementation evidence.
