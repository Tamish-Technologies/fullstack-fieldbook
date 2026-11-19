# D5 Week 3 engineering review

Week 2 was accepted and pushed on November 18, 2026 at `618aeb0` on `codex/d5-week-two`. The owner authorized Week 3 and requested review before Week 4.

## Try Week 3

Run `npm run dev` and open `/review/week/03/lesson/01` on the local address Vite prints. Try **Check your prediction**, edit a lab starter, run it, and open the knowledge check after the reading. **Review next lesson** and the numbered links let you visit all 11 lessons. This development review records no progress. In the regular course, Week 3 opens after Week 2 mastery, and each subsequent lesson opens when its preceding requirements are met.

## What learners receive

| Work | Delivery |
| --- | --- |
| Study Tasks v3 | Eleven readings mapped to the A-004 lesson and source chapters. Each includes an example, a prediction, feedback, hints and a local project exercise. The opening lesson offers the four files from the student portion of the Week 3 archive. |
| Knowledge checks | Eight quizzes with 45 scored questions, two scenarios per question, misconception feedback and essential-item scoring. |
| Guided practice | Eight isolated labs cover counting, renaming, sorting, delegation, editing, composing views, recovery and writing a regression test. Week 3 editor text stays in the open lesson. A learner can keep a copy in their project. |
| Work in the learner’s project | Five self-verified checks cover serving and repairing modules, keyboard and storage behavior, reviewing a Git change, demonstrating the project, and completing an independent transfer exercise. Three extensions are optional. |

The readings and assessments are in `src/content/week-three*.ts`. The guided fixtures are in `src/labs/week-three-frame.js`, and the student assets are in `src/content/week-three-starter/`. The implementation reuses the course reader, checkpoint forms, parser worker, bounded interpreter and versioned progress store. The original instructor guide and completed project stay outside the app.

## Fresh-profile walkthrough

| Issue found | Correction and evidence |
| --- | --- |
| A beginner could start from a file URL and later think their tasks disappeared when switching to a server. | Lesson 1 and the starter README explain how to serve the folder and reuse the original address and port. In Chrome the starter retained three tasks after reload. A second port started empty and the original three reappeared on returning. |
| Connecting the HTML entry point, importing a helper and writing a local regression were easy to confuse. | Lesson 4 separates the HTML tag from the two JavaScript files. Lesson 9 shows a local test module and how to observe a failure before repairing it. The walkthrough reproduced a missing module request and a successful reload after repair. |
| A superficially correct sort test could miss a damaged title. A malformed stored row could also stop the learner’s validation loop early. | The regression lab now exercises changed contents, missing records, wrong order and mutation. The storage fixture includes nested arrays and unknown fields alongside valid records. Positive and negative browser submissions cover these cases. |
| Leaving a newly opened lesson immediately could resume at the previous one. | The reader now records the eligible lesson before presenting its activities. The dashboard resume, refresh, retry and reset journey exercises this transition. |

In an isolated browser session, the four actual student downloads ran on a temporary loopback server. A separate, private reference check used the same disposable origin to verify the Week 2 records survived the upgrade. Keyboard trials covered a sorted edit, invalid save, Escape, Enter and return focus. Literal text, composed search and filters, the global count, malformed and duplicate data, and reload were checked. The supplied private project’s own browser suite returned **22 passed, 0 failed**.

## Acceptance evidence

The final November 18 run passed **60 unit tests** with `npm test` and **34 browser scenarios** with `npm run test:e2e` (44.2 seconds). `npm run build` passed strict typechecking, the production build and the six-file public asset check. The opening Week 3 accessibility scan reported zero automated violations.

- Unit tests exercise the checkpoint inventory, all eight essential-question policies, retry variants, supported backup versions and the previous weeks’ progress rules.
- The fresh production journey earns 18 Week 1, 19 Week 2 and 21 Week 3 checks through the interface. It restores a Week 2-format backup, misses an essential Week 3 answer at 4/5, passes the retry, verifies the Week 4 outline gate, resets Week 3 and restores a 58-check backup.
- The development review visits all 11 lessons at 320 pixels, tries the incomplete lab starters, passes both quiz forms and ends with empty review storage. An automated accessibility scan covers the opening lesson. The shared reader also has 834-pixel and desktop coverage.
- Local-project responses in the automated course journey use synthetic observations. The project checks above are separate engineering observations. Independent human comprehension, unaided transfer and the Week 1 human pilot remain pending.

The owner accepted Week 3 engineering and wrote “please proceed.” Week 4 is the remaining week of D5.
