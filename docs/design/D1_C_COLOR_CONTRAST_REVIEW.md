# D1-C Candidate Color & Contrast Review

**Status:** Design-token measurement, **not a live WCAG audit**. Prepared 2026-11-18. Colors are proposed until owner signs off D1. Raw measurements are in `D1_C_CONTRAST_MATRIX.csv`.

## Method and thresholds

Color ratios were calculated from relative sRGB luminance per the WCAG contrast formula. The candidate review target is **4.5:1 for normal text** and **3:1 for meaningful non-text indicators** (with additional requirements in the full standard). Decorative borders do not need to carry meaning but must never be the only sign of an actionable control. This is a palette audit only: rendered text sizes, focus layering, disabled behavior, editor tokens, overlays, actual mobile zoom and browser/assistive-technology interactions still require tests.

| Role | Foreground | Background | Ratio | Candidate review |
|---|---|---|---:|---|
| Light primary text | `#111827` | `#FFFFFF` | 17.74:1 | PASS |
| Light lesson body | `#334155` | `#FFFFFF` | 10.35:1 | PASS |
| Light secondary text | `#475569` | `#FFFFFF` | 7.58:1 | PASS |
| Light action label | `#FFFFFF` | `#4F46E5` | 6.29:1 | PASS |
| Light primary link | `#4F46E5` | `#FFFFFF` | 6.29:1 | PASS |
| Light success text | `#0F766E` | `#ECFDF5` | 5.20:1 | PASS |
| Light amber help | `#A16207` | `#FFF7E9` | 4.63:1 | PASS |
| Light error text | `#B91C1C` | `#FEF2F2` | 5.91:1 | PASS |
| Light focus ring vs canvas | `#4F46E5` | `#F8FAFC` | 6.01:1 | PASS |
| Light border vs canvas | `#E2E8F0` | `#F8FAFC` | 1.18:1 | DECORATIVE ONLY |
| Light example code | `#E2E8F0` | `#0F172A` | 14.48:1 | PASS |
| Light example code line numbers | `#94A3B8` | `#0F172A` | 6.96:1 | PASS |
| Light code keyword | `#C4B5FD` | `#0F172A` | 9.67:1 | PASS |
| Light code property | `#93C5FD` | `#0F172A` | 9.90:1 | PASS |
| Dark primary text | `#F8FAFC` | `#111827` | 16.96:1 | PASS |
| Dark body text | `#E2E8F0` | `#111827` | 14.39:1 | PASS |
| Dark secondary text | `#CBD5E1` | `#111827` | 11.95:1 | PASS |
| Dark action label | `#0B1220` | `#A5B4FC` | 9.39:1 | PASS |
| Dark primary link | `#A5B4FC` | `#111827` | 8.90:1 | PASS |
| Dark success label | `#5EEAD4` | `#123D37` | 8.12:1 | PASS |
| Dark amber label | `#FBBF24` | `#3A2B17` | 8.18:1 | PASS |
| Dark error label | `#FCA5A5` | `#3A2128` | 7.75:1 | PASS |
| Dark focus ring vs canvas | `#A5B4FC` | `#0B1220` | 9.39:1 | PASS |
| Dark border vs canvas | `#334155` | `#0B1220` | 1.81:1 | DECORATIVE ONLY |

## Decisions required to make these tokens usable

1. Preserve text labels and explicit explanations on **success, self-reported, locked and error states**, independent of color.
2. Use the lighter `#E2E8F0` boundary as **decoration**; do not rely on its 1.18:1 contrast against the canvas for the visible edge of a required field. Use focused outlines, labels or a stronger border when an affordance needs non-text contrast.
3. Use `#475569` or darker for essential secondary copy in light mode, not pale tertiary gray; dark mode uses `#CBD5E1` for essential secondary copy.
4. Light warning `#A16207` on `#FFF7E9` is only **4.63:1**, with limited margin; test actual opacity, antialiasing and surface overlays before shipping.
5. Dark-theme controls should use a deliberate pairing: `#0B1220` lettering on `#A5B4FC`, not white lettering on pale indigo.
6. The focus ring must remain visible on color fills, alerts, toolbars and the code panel; inspect actual rendered outlines, not just one ring/canvas color pair.

**Next evidence step:** During D2–D4, measure actual components in light/dark and high zoom; record any failures and revise CSS before claiming accessibility. This review does not authorize app code.
