# D1-C Accessibility & Interaction Requirements — Approved Design Baseline (A-017)

> **D1-C APPROVAL A-017 (2026-11-18):** Design requirements accepted. Evidence: `D1_C_COLOR_CONTRAST_REVIEW.md`, `D1_C_RESPONSIVE_VALIDATION.md` and `design-reviews/d1c/`. Static artifacts do **not** establish WCAG conformance or functional keyboard behavior; validate in the real application.

**Status:** **D1 APPROVED A-017** as design-level requirements; not an implemented or accessibility-certified experience.  
**Target:** WCAG 2.2 AA where applicable, inclusive keyboard/touch/screen reader use, reduced motion, and accurate learning-evidence labeling.  
**Authority:** DEC-21 mastery rules and approved D1-B mockup baseline A-016.

## Foundations and page landmarks

- Provide a keyboard-reachable **Skip to main content** link before repeating course navigation.
- Use structural regions: header, labeled course navigation, `main`, contextual navigation (where present), and footer. Only one main region and sensible heading hierarchy with one primary H1 per screen.
- Keep lesson reading in DOM and keyboard order; sidebar visuals must not rearrange meaningful reading order.
- Use descriptive link text such as `Return to Week 1 Lesson 2`, not unlabeled `Click here`.
- Show the current page and active week to both sighted and assistive-technology users.

## Keyboard contract and expected focus order

| UI | Keyboard expectation | Focus/announcement requirement |
|---|---|---|
| Navigation links | Tab/Shift+Tab; Enter opens eligible route | Locked links either open an accessible explanation screen or describe disabled state and missing prerequisite; never silent |
| Mobile course drawer | Trigger opens with Enter/Space; Escape closes; focus remains inside while modal | On close return to trigger; drawer heading and current lesson read as context |
| Tabbed code lab | Arrow keys move between tabs (for automatic activation) or focus tabs then Enter/Space to activate (for manual activation); choose one consistent model | Active tab exposed; opening Tests doesn't discard editor draft or scroll position |
| Quiz options | Native radio-group behavior when single choice | Essential item labeled in text; answer choices include accessible names; summary announced only after submission |
| Hint disclosure | Enter/Space toggle | Expanded/collapsed exposed; hint text is in reading order |
| Copy snippet | Enter/Space | Announces `Code copied` or a recoverable error; no unexplained clipboard mutation |
| Code editor | Explicit keyboard help and shortcuts; avoid trapping Tab irreversibly | Provide `Exit editor` accessible shortcut or Tab mechanism, plus alternate download/edit-in-VS-Code instructions when needed |
| Reset/import modal | Focus initially on safe Cancel; Escape closes when possible; explicit destructive confirm | Focus trapped only while modal open and returned to trigger on close; visible side-effect summary |
| Inline error | Not dependent on color or position alone | Error tied to control; focus first affected field or summary as appropriate; no endless auto-announcement |

## Visual and touch targets

- **Text contrast:** aim ≥4.5:1 normal text, ≥3:1 for large text, and ≥3:1 for meaningful controls/indicators that need non-text contrast. Check actual states and surfaces, not only palette swatches.
- **Focus indicators:** visible at least as obvious as a strong contrasting outline. Proposed initial style is a 3px high-contrast ring with a 2px offset; test on white/dark backgrounds and over colored fills.
- **Targets:** design primary touch actions at **44×44 CSS px** when feasible, especially drawer, quiz, next, reset and lab tabs. Respect WCAG 2.2 AA target size/spacing requirements, with context-specific exceptions documented.
- **Readable content:** text zoom to 200%, layout reflow at effective 320px width / 400% browser zoom without losing meaning or controls. Avoid essential text below 14px; body target 16–18px.
- **Code:** allow horizontal scrolling within code blocks rather than whole-page overflow. Maintain labels, copy affordances, and an accessible textual alternative to visual-only highlighting.
- **Color:** passed/failed/locked meanings require icon or label plus explanation, not color alone.

## Notification and error behavior

| Event | Required result copy/behavior | Focus recommendation |
|---|---|---|
| Quiz failed at 80% with essential missed | `You answered 4 of 5 correctly, but the required essential question still needs a correct answer.` Include hint and retry | Summary heading receives focus on submission; explanation accessible without hunting |
| Code test pending | `Checking 4 required behaviors…` | Polite status, do not re-announce every individual test immediately |
| Code sandbox crashed | `Tests couldn't run. Your code has not been graded. Retry or use the local instructions.` | Error status, no unlock |
| Local project self-report submitted | `Self-verified locally. We haven't inspected your project.` | Confirmation as polite status |
| Storage unavailable | `Progress cannot be saved in this browser right now. You can still read lessons.` | Persistent warning plus recovery/export guidance |
| Import rejected | Specific reason: unsupported file version, oversized, invalid ID, malformed data | Focus summary; preserve existing progress |
| Cascading reset | Name exact scope and number of dependent records | Safe initial focus; no irreversible action on a single mistaken keypress |
| Locked deep link | State earliest unmet requirement and link to it | H1 on locked page, focus main heading |

## Motion and timeout rules

- Honor `prefers-reduced-motion`: disable unnecessary transitions and progress animations; do not rely on motion to convey completion.
- No countdowns, streak penalties, forced daily limits, autoplay video, confetti by default or punitive attempt limits.
- Saving progress should not be announced repeatedly after every keystroke. Confirm substantive actions only.

## Privacy, code safety and limitations

- No account, cloud sync, analytics, remote assignment submission, required external AI tool or upload of secret-bearing logs.
- User-authored code is **untrusted**. A visual editor does not grant execution in the trusted app document. D4 requires an independently reviewed isolated runner with content/security policy and behavior tests.
- If assistive technology cannot use the selected editor comfortably, provide downloadable exercises and equivalent learning outcomes rather than blocking access indefinitely.
- Static D1 mockups cannot prove any of these interactions. Accessibility testing belongs in authorized implementation stages, followed by human learner testing.

## D1-C acceptance review

- [ ] Every interactive component has written keyboard and focus transitions.
- [ ] All pass/fail/locked and self-report outcomes use explicit accessible text.
- [ ] Contrast math documented for candidate palette and all critical state colors; unresolved cases recorded.
- [ ] Reader and lab reflow designs reviewed at desktop, tablet, mobile and effective 320px.
- [ ] Reset/import and local-storage failures have safe navigation and clear instructions.
- [ ] Editor/runner limitations transparently represented; no claim of actual security or accessibility certification at design stage.
