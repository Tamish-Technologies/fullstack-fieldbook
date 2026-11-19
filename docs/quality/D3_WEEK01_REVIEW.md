# Week 1 lessons, quizzes and D3 dry run

**Submitted for owner review on November 18, 2026.** After accepting D2, the owner authorized “the Week 1 lessons, quizzes, and usability dry run” and selected “Use automated checks for now.” The results below cover that automated scope. Learner explanations, pacing, confusion and independent transfer still need observation with a consenting learner.


**Fresh-learner retest (18 November 2026).** The owner accepted D3 on 18 November 2026. The Lesson 6 exercise, Week 2 lock, mobile quiz drafts, field-note drafts and essential-question links passed the recorded retest. All 12 readings remain open. The build, 39 unit tests and 21 browser tests passed. [See the results](d3-learner-audit/AUDIT.md).

## Try it

Start the app with `npm run dev` and open the local address Vite prints.

| To review | What to do | What to look for |
|---|---|---|
| Learner path | From the dashboard choose **Begin Week 01**, read the orientation, download the four starter files into one folder and choose **Continue to Semantic HTML and page landmarks**. | Lesson 2 opens immediately. A score of 4/5 earns the orientation checkpoint toward Week 2. A failed attempt offers specific feedback and an alternate question form. A later failed retry preserves the earned pass. |
| Pending coding checkpoint | From Lesson 2, inspect **Browser lab preview**, then visit `/course/week/01/lesson/03`. | The lesson shows a local practice task and pending checks. Lesson 3 is readable with the coding check still pending. Week 2 remains locked. |
| All 12 lessons | In the local development server, open the Week 1 outline and choose **Open Week 1 content review (practice only)**. The direct path is `/review/week/01/lesson/01`. | Numbered links and **Review next lesson** open each reading. Review quizzes give scores and feedback without writing learner attempts, notes, passes or a resume location. The production build exposes only gated learner routes. |
| An essential miss | In content review, try the Lesson 3 quiz. Answer the visible-label question incorrectly and the other four correctly. Retry the alternate examples. | At 4/5, feedback identifies the missing essential requirement. The keyboard focus moves to the result, then to the first choice on retry. |
| Local progress | On the regular learner path, refresh after submitting. Open **Progress & review**, then **Settings** to inspect export and reset. | Recent attempts show the latest score and attempt count. Reset preview includes the affected attempt summaries. |

## Owner feedback on lesson order

The owner authorized reading all 12 Week 1 lessons before passing the checks. The regular learner route now supports this directly. Reading updates the resume location. Each scored quiz stays at the end of its lesson and records a pass toward Week 2. All 18 required Week 1 checkpoints are still needed for Week 2. Resetting one Week 1 lesson preserves independent Week 1 passes.

The orientation felt like a test on arrival. The five questions belong at the end of Lesson 1. Previously all five appeared as soon as the page loaded, and the guidance on asking for a hint appeared only in optional practice. The revised orientation starts with an explanation and a sample task you can add and reload before downloading files. It introduces both the hint workflow and a missing-element example before assessing them. All seven quizzes now wait for **Start knowledge check**.

I reviewed the 12 lessons and both forms of the seven quizzes against the Week 1 assessment plan. Lessons 2–5 build and style the form. Lessons 6–9 introduce values and functions before reading and updating the page. Lessons 10–12 debug, review and integrate the project. I kept this order. Lesson 3 now teaches the list structure it assesses, Lesson 6 demonstrates how to read the first task’s title, and Lesson 11 gives learners an opportunity to make the two commits Lesson 12 asks them to inspect.

The production build, 38 unit tests and 15 browser tests passed after these changes. The browser walkthrough opened each quiz by keyboard, checked both question sets and exercised the orientation example. Beginner pacing and comprehension still need a learner walkthrough.

## Content and source coverage

The authoring inputs were the private Week 1 guide Markdown and the four-file starter/reference project structure, plus the approved lesson map, checkpoint register and item blueprint. The public readings and starter are newly written. Each reading links its stable lesson ID to chapter numbers from the planning manifest. Browser-delivered quiz choices and scoring keys are inspectable.

| Lesson | Worked example or practice | Scored slots |
|---|---|---:|
| 01 · Orientation | Compare an on-disk heading change with an edit to the live DOM. | 5 |
| 02 · Semantic HTML | Connect the title, main heading, metadata and relative asset paths. | — |
| 03 · Forms | Click a visible label and compare native validation of empty and spaces-only text. | 5 |
| 04 · CSS | Measure a card’s border and content widths under a width cap. | — |
| 05 · Flexbox | Test a form at 375px and 768px with keyboard focus. | — |
| 06 · JavaScript values | Predict trimmed lengths, strict comparison and array mutation. | 5 |
| 07 · Functions | Trace a return value and write helpers for ordinary and blank titles. | — |
| 08 · DOM text | Create two independent rows and preserve literal markup-like text. | 5 |
| 09 · Events | Trace submit, reject blank input, toggle a checkbox and restore the empty state. | — |
| 10 · DevTools | Reproduce a selector failure, inspect evidence, fix and repeat. | 5 |
| 11 · Git and review | Compare staged and unstaged edits and test a suggested change. | 5 |
| 12 · Study Tasks | Verify the local project, document two meaningful commits and attempt an independent transfer task. | 10 |

Seven quizzes cover **40 scored slots**, each with an equivalent retry variant. Essential slots are L03-Q01, L08-Q03, L12-Q03 and L12-Q07. Each item includes feedback for the correct choice and each distractor. Learners can practice the seven coding exercises and local project tasks on their own computers. The course awards no browser-code evidence or local project credit in D3.

## Automated dry-run observations

| Scenario | Observation and follow-up |
|---|---|
| Start, fail and recover | The Chrome walkthrough submitted 3/5 on orientation, refreshed, then earned 4/5 on alternate questions. Resume pointed to Lesson 2. Lesson 3 was readable. Direct visits to Week 2 showed the earliest unmet requirement. |
| Read and review | The reviewer walkthrough visited all 12 articles, expanded predictions and hints, and submitted both forms of every quiz against a separate answer rubric. Review visits left learner storage empty. |
| Feedback and accessibility | The walkthrough exercised essential misses, score summaries, keyboard radio selection, retry focus and quiz feedback at 320px and 834px. Axe and horizontal-overflow checks passed on the tested states. These observations cover interaction mechanics. Whether an explanation helps a learner recover unaided remains open. |
| Reset and persistence | The walkthrough revisited an earned quiz, failed it, and retained the pass. After a scoped reset, Week 1 remained readable and Week 2 remained locked. The test now waits for the visible result before inspecting the saved attempt count. |
| Worked-example correction | At a 375px viewport the card measured 359px with the browser’s default body margins. Lesson 4 now explains why a 360px **maximum** allows that value. The corrected browser test uses a standards-mode document and the actual containing width. |

To repeat, run `npm run build`, `npm test`, then `npm run test:e2e`. The browser suite starts a production preview on port 4173 and a separate local development server on port 4174. It uses temporary browser storage. No learner responses were collected.

## Changes and verification

- **Content and UI.** `src/content/week-one.ts`, `quizzes.ts` and `starter.ts` contain the readings, assessment bank and four starter downloads. `src/lessons/` provides article rendering, quiz interaction and scoring. The app shell, lab tabs, progress screen and styles integrate them into the existing navigation.
- **Data.** The `w01.1` record stores compact attempt summaries and first passing evidence. A separate storage key preserves the original D2 record. D2 notes, theme and eligible reading location carry forward. D2 demonstration evidence cannot unlock a real lesson. Current imports validate active quiz shape, methods and prerequisites. Backups and resets include attempt summaries.
- **Test and stage files.** The Week 1 unit and browser suites extend the foundation coverage. The npm test command, Playwright configuration, active handoffs and pilot protocol point to the D3 scope. Existing dependencies suffice.
- **Build and tests.** Strict typecheck, production build and the public-asset check passed. Vitest passed **38 tests**. Playwright passed **16 tests** in Chrome, including the limited automated dry run. The unit suite enumerates all correct/incorrect combinations for the seven quizzes. The regular learner walkthrough followed all 12 lessons without opening a quiz, followed the orientation study links, reloaded Lesson 12, checked for zero recorded attempts or passes, and verified the Week 2 direct route stayed locked. The quiz checks use a separate expected-answer rubric.
- **Limits.** The code-example checks use fixed course-authored snippets in disposable test documents. They do not execute learner code. Manual screen-reader use, human comprehension and educational effectiveness remain unverified. The D2 development-tool advisory remains documented in the foundation report. No D3 dependency was added.

For a later human walkthrough, use scenarios A, B, D, E, F, J and L in the [Week 1 pilot protocol](WEEK01_PILOT_PROTOCOL.md). Ask the participant to explain why the essential miss held the gate, what changed on reload, and where to go next. With consent, record anonymous observations, corrections and retest outcomes.

**Owner decision.** On 18 November 2026 the owner wrote “I accept D3” and requested the next planned task after committing and pushing the accepted work. D4 is the next stage in the roadmap.
