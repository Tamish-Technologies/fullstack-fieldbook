# D4 Week 1 implementation review

**Current owner direction (2026-11-18).** D4 engineering accepted. The human Week 1 pilot remains pending. D5 is authorized. Stop after Week 2 for owner review before Week 3.

The Week 1 mastery path is ready for a fresh-learner trial. On November 18, 2026 the automated trial earned all 18 required checkpoints through the interface. The owner accepted the engineering review. A consenting learner’s independent transfer observation is pending.

## Learner experience

All 12 readings are open on first visit. Each assessment follows its reading, and the next reading is available before the assessment. Seven quizzes and seven browser labs provide automatic feedback. Four local checklists cover debugging, local Git history, the Study Tasks project and an independent micro-challenge. Each checklist requires individual confirmations and the written evidence specified in the [checkpoint inventory](../curriculum/WEEK01_CHECKPOINT_INVENTORY.md).

The Week 2 lock lists unfinished checks and links back to them. The final pass opens the Week 2 outline and first lesson preview. Week 2 curriculum belongs to a later stage.

## Implementation and boundaries

| Area | Implementation |
| --- | --- |
| Lesson reader and recovery links | `src/App.tsx`, `src/lessons/QuizForm.tsx`, `src/content/week-one.ts` |
| Seven labs and four self-verifications | `src/content/practicals.ts`, `src/components/CodeLab.tsx`, `src/components/ResponsiveLab.tsx`, `src/components/Practical.tsx` |
| Isolated execution | `src/labs/frame.js`, `src/labs/language.js`, `src/labs/parser.worker.ts` and the Lesson 5 geometry fixture |
| Drafts, evidence, migration and reset | `src/labs/progress.ts`, `src/learning.ts`, `src/backup.ts`, `src/Settings.tsx` |
| Regression coverage | `tests/week-one.spec.ts`, `tests/responsive-lab.spec.ts`, `tests/browser.spec.ts`, `tests/week-one.test.ts` |

HTML parses in an opaque sandbox. Only a limited set of semantic form elements and attributes can enter the live form. CSS checks apply supported box and layout properties to fixed elements, then measure the rendered result. The native form fixtures allow form events, prevent navigation and have a content policy denying form destinations and external resources.

Acorn 8.19.0 parses up to 4,000 characters in a disposable local worker. A bounded interpreter runs the Week 1 language against named fixture capabilities inside the isolated frame. Its execution budget is 3,500 steps and 16 nested function calls. No learner string is evaluated as native JavaScript. The host receives results over a dedicated message port and validates their size and types. Keyboard-focus checks start with an explicit gesture inside the frame. The larger local project supports the learner's usual browser and editor.

Progress format `w01.2` stores practical drafts and earned evidence locally. Valid D3 quiz passes carry forward. Backups include local attestations and bounded notes, and reset previews count practical drafts. The learner controls browser storage and backup files. These assessments provide educational feedback and self-reported evidence.

## Verification

| Check | Observed result |
| --- | --- |
| `npm run build` | TypeScript, production build and four-file public asset allowlist passed. The parser worker loads only for JavaScript labs. |
| `npm test` | 41 tests passed, including older backup migration and rejection of incomplete local evidence. |
| `npm run test:e2e` | 28 Chrome scenarios passed. Coverage included actual label clicks, keyboard submission, reruns, draft retention, review-mode isolation, and practical-screen reflow and automated accessibility checks at 320px and 834px. |
| Full journey in Firefox and WebKit | The end-to-end scenario and the three-case grading regression passed in both locally cached engines using their matching Playwright 1.61 driver (4 scenarios). |
| Dependency audit | `npm audit --omit=dev` reported zero production vulnerabilities. The full audit reported six high-severity development dependency entries for the picomatch advisory. npm proposed a breaking Vite downgrade. The development-tooling finding remains open. |

The end-to-end test starts with empty browser storage and uses learner-facing controls. It fails starters, repairs code, answers quizzes and completes the local forms with synthetic test reports. At 17 passes the Week 2 direct URL still shows a lock. At 18 it opens. The test reloads, exports a backup, resets Week 1, confirms Week 2 relocks, restores the backup and reopens Week 2. Synthetic reports exercise the interface. A learner's own project and independent task are assessed in the [pilot protocol](WEEK01_PILOT_PROTOCOL.md).

## Try the build

Choose **Begin Week 01** on the fresh dashboard. Read and continue at your own pace. Return to any unfinished check from the Week 2 lock. For a quick lab sample, try the starter in Lesson 5, then change the narrow flex direction and rerun. A complete acceptance trial includes your local project and independent task in Lesson 12.

## Hands-on owner-proxy review · November 18

**Reviewer decision: ready for the human pilot.** An agent exercised the learner-facing production build in a fresh, disposable browser profile. No learner identity, owner progress or instructor intervention was recorded. The checks below supplement the scripted 18-check walkthrough.

| Exercise | Initial finding | Correction and retest |
| --- | --- | --- |
| L02 semantic heading | A learner could hide the only heading with inline `display:none` and earn 5/5. | The grader inspects the heading's text and its ancestors for explicit hiding. The same document lost the visible-heading check. |
| L03 Add button | An inert Add button earned 6/6 when a separate Save draft button submitted the form. | The grader activates the named Add control and checks native empty-field validation separately. The inert Add submission lost its Add check. |
| L09 submit handler | Returning early on whitespace before canceling submission earned 6/6. Outside the harness the browser could navigate on that path. | The grader observes whether the learner canceled the whitespace submission before the harness prevents navigation. The same handler earned 5/6 and received branch-specific feedback. |

All three findings affected mastery credit. The D4 implementation now includes a regression scenario covering each case. Browser lab results include short check identifiers for reporting feedback. Previously recorded passes are retained under the existing retry policy.

At 390px viewport width the reviewer deferred the first quiz and opened Lesson 2. In Lesson 7 a partial solution earned 5/8, displayed actual and expected return values, and passed 8/8 after revision. A partial debugging checklist resumed after reload without earning credit. The Week 2 lock linked to outstanding work and fit the viewport.

The full-path scenario also exercised a valid submission for every mandatory checkpoint, the 17-to-18 transition, reload, reset and backup restore. These observations support an engineering pass. A consenting learner must still demonstrate the local Study Tasks project and independently complete the transfer task before owner approval of the integrated pilot. The owner separately authorized D5 and requested Week 2 for review before Week 3.
