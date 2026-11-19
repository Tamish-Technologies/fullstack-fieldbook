# D5 Week 2 engineering review

The owner accepted D4 engineering on November 18, 2026 and authorized Week 2 as the first D5 delivery. **The Week 1 human learner pilot remains pending.** The owner accepted Week 2 and authorized Week 3, with owner review before Week 4.

## Try the course

Run `npm run dev` and open `/review/week/02/lesson/01` on the local address Vite prints. The review supports all eleven readings, their practice labs and quizzes. Use the numbered links or **Review next lesson**. Review selections stay in this page and earn no learner progress.

For the ordinary experience, open `/course/week/02` in a profile with completed Week 1 progress. A fresh profile needs all 18 required Week 1 checks. Each subsequent Week 2 lesson requires the preceding lesson’s mandatory checks. The last lesson has a local project, a ten-question readiness quiz and an independent transfer task. Completion includes self-verified local work.

## Scope and source

| Deliverable | Implementation |
| --- | --- |
| Eleven readings, worked predictions, project guidance and optional exercises | `src/content/week-two.ts`, mapped to the stable Week 2 manifest lesson IDs and original chapter numbers |
| Eight quiz groups, 45 scored items, two prompts per item, misconception feedback and essential-question rules | `src/content/week-two-quizzes.ts` |
| Eight isolated browser labs and three local project checklists | `src/content/week-two-practicals.ts`, `src/labs/week-two-frame.js`, bounded interpreter in `src/labs/language.js` |
| Four downloadable student starter files | `src/content/week-two-starter/`, copied from the four approved student entries only |
| Catalog, review navigation, scoring, validation and backup migration | `src/content/catalog.ts`, reader and practical components, `src/backup.ts`, `src/learning.ts` |

The authoring inputs were the private Week 2 instructor guide and local project archive, the approved lesson blueprint, assessment item plan, checkpoint inventory and prerequisite contract. The guide and the completed reference stay outside the application. No new runtime dependency was added.

## Engineering verification

The November 18 run passed 51 unit tests and 31 browser scenarios. Typechecking, the production build and the five-file asset allowlist passed.

- `npm test` exercises the lesson/checkpoint mapping, essential-question scoring, locked practical submissions, progress migration, and existing foundation and Week 1 rules.
- `npm run build` runs strict TypeScript checking and the production asset and private-material allowlist. The browser lab runner loads when a learner opens a lab.
- `npm run test:e2e` starts separate production and development servers. A fresh browser earns all 18 Week 1 and 19 Week 2 checks through the interface, reloads, exports, resets and restores progress. Local-project form responses in this test are explicitly synthetic.
- All eight unfinished Week 2 lab starters withhold credit. The tests exercise real learner submissions in the opaque frame. Week 2 work uses an in-memory storage adapter. Local project reload and storage behavior belong to the learner’s own browser project.
- The review walkthrough checks all 11 lessons at 320 pixels, the four student download links, practice-only navigation and the production route boundary. Automated accessibility checks on the opening review page supplement keyboard and quiz retry tests.
- A separate local Chrome check exercised the private reference in a disposable browser context. It verified literal title text, completion across reload, filters and global count, filtered deletion, new IDs after reload, recovery from malformed JSON and a usable in-memory session with a warning after a denied write.

The browser fixtures provide guided APIs and evaluate a bounded JavaScript subset. They supply some DOM wiring, and do not certify a learner’s independent local implementation. Browser automation and synthetic attestations provide engineering evidence. Learner comprehension, independent transfer and the human pilot remain unverified.

## Fresh-learner walkthrough and verdict

**Recommendation on November 18, 2026. Accept the Week 2 delivery.** A fresh Chrome profile traversed all eleven lessons at a 390-pixel viewport, opened predictions and hints, and tried incomplete submissions. A separate run supplied independently written solutions to all eight labs and answered all 45 quiz items on both the first and retry forms. Each practice run ended with an empty Fieldbook storage record set.

| What happened on the first pass | What changed and how it was checked |
| --- | --- |
| Lesson 2 rejected a correct unfinished-task counter written with `count += 1`. | The bounded interpreter accepts local counter increments. Both `count += 1` and `count++` now score 5/5 in the browser. |
| Lesson 3 gave 6/6 to a toggle that always set completion to true. Lesson 8 gave 6/6 to a fixed ID of 99 for every nonempty project. Lesson 9 gave 7/7 to a fixed remaining count of two. | The fixtures now exercise undoing completion, restoring a record that already has ID 99, and changing the actual count across empty, edited and filtered lists. Those submissions now score 5/6, 5/6 and 6/7 respectively. Each missed check explains the input to try. |
| The generic lock message left learners to find the missing check again. An empty or finished lab frame could receive a click while moving to the next lesson on mobile. | The regular reader now links directly to each outstanding check and updates the remaining count as credit is earned. The runner displays the Week 2 focus fixture when the focus check is ready and hides finished fixtures. The keyboard-focus test and the 11-lesson mobile navigation walkthrough passed. |
| The storage example printed parsed JSON without demonstrating a real save across reload. | Lesson 8 now provides a two-part save/reload example using a separate demo key. The reviewer downloaded all four student files, verified the starter’s task cleared on reload and ran the published example on a disposable project origin. It restored ID 8 after reload. Lesson 11 explains how to simulate a failed write and restore ordinary saving in a project copy. |

The production build and five-file public-asset check passed. The final run passed **51 unit tests and 32 browser scenarios**. The regular learner journey earned 37 checkpoints across Weeks 1 and 2, exercised keyboard focus on the outstanding-check links, and verified reset and backup restoration. Its local checklist submissions are synthetic. A separate disposable reference-project run verified actual reload, filtering, ID allocation and storage recovery. The human learner pilot and independent human transfer observation remain pending.
