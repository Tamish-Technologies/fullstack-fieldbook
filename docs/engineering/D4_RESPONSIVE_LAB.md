# D4 first implementation · Lesson 5 responsive form

This record describes the initial practice release. The [integrated D4 review](../quality/D4_WEEK01_REVIEW.md) covers active Lesson 5 credit, the other labs and the Week 2 gate.

The owner accepted D3 on 2026-11-18 and asked to start the next roadmap task after pushing the accepted work. The first D4 implementation addresses the open feasibility question for checkpoint `p1-w01-l05-c01`. It provides practice feedback. Awarding checkpoint credit and running the integrated Week 1 pilot remain open.

## Try the lab

Open Week 1, Lesson 5. After the reading, choose **Run layout checks**. The starter puts the button beside the input at both widths. Compare the wide and narrow results, edit the narrow rule and rerun. Each preview is a real browser viewport. On a small device, its container scrolls horizontally so the lesson page still fits. Edits last for the current visit.

## What the runner measures

The host supplies a fixed form and a media query. Learners edit two CSS declaration blocks. The harness measures the input, button, button text and document width at 375px and 768px, first with 16px text and then with 24px text. It checks row or stack geometry, space between stacked controls, minimum usable size and clipping. The larger text sample changes the fixture font size. Native browser zoom and keyboard focus appearance still need manual inspection.

The two frame documents have opaque origins. Only bounded, allowlisted layout declarations are serialized into two stylesheet slots. The fixture's content security policy denies external resources and form actions. Only the trusted measurement script runs. Its response travels over a per-frame message port, and the host checks the shape, viewport width and font sizes. The component has no progress-store access. This review covers CSS declarations in the fixed form only. HTML authoring and JavaScript execution require their own isolation designs. [Sandboxed iframe reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) · [MessageChannel reference](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)

## Verification

- The two browser scenarios in `tests/responsive-lab.spec.ts` exercise the starter failure, Flexbox and Grid repairs, repeat runs, viewport overflow, unsupported declarations, origin isolation, keyboard order, 320px page reflow and the Week 2 gate.
- Both scenarios passed on installed Chrome and on the cached Firefox and WebKit engines. The latter two used their matching local Playwright 1.61 runner. The newer project driver could not start a context in the older Firefox. The final keyboard check directs the key to the input inside each frame. Firefox used full keyboard navigation and macOS WebKit used Option-Tab.
- Reproduce the production checks with `npm test`, `npm run build` and `npm run test:e2e`. The last command includes the two responsive lab scenarios.

## Remaining D4 work

Review the CSS grading criteria before enabling durable evidence. Implement the remaining six isolated browser labs and four local self-verification checkpoints, verify backup, reset and Week 2 gate transitions with real results, and run the integrated pilot and independent transfer task with a consenting learner.
