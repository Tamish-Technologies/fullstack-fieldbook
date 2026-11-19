# Week 12 engineering review

The owner accepted Week 11 engineering and authorized Week 12 under D8, with review before D9. Week 12 follows the A-013 Task Planning capstone baseline. The owner accepted Week 12 and approved D8 engineering. The accepted delivery is `d8aa968` on `origin/codex/d8-week-twelve`.

## Try Week 12

Run `npm run dev` in Fieldbook and open `/review/week/12/lesson/01` at the printed address. **Review next lesson** opens all 11 lessons in order. Practice quizzes and labs are available in this view without saving course progress.

Download the Week 12 capstone starter in Lesson 1 and read START_HERE.md. It separates the inherited Week 11 baseline checks from the new planning tests. Lesson 5 practices valid calendar dates. Lesson 7 guides the browser form, and Lesson 11 walks through the evidence, independent explanation, and local demo decision.

## Delivery

- `src/content/week-twelve.ts`, `week-twelve-quizzes.ts`, and `week-twelve-practicals.ts` deliver 11 readings, 66 scored items with two prompts each, two isolated JavaScript labs, eleven local checklists, and three optional activities.
- `src/labs/week-twelve-frame.js` checks Gregorian dates and deterministic due windows with synthetic inputs. The real migration, API, and React work run in the separate learner project.
- `build/student-projects/study-tasks-v12.zip` contains 85 learner files with two lockfiles, baseline and capstone commands, the brief, an A01–A10 evidence matrix, twenty oral prompts, and the release report and rubric. The planning implementation is the learner's exercise. The instructor archive, engineering implementation, recordings, and active settings stay outside the download.
- Week 11 completion opens Week 12. Phase 1 completion derives from every required lesson and the final project and quiz. Hold saves as a draft and cannot count as completed evidence, including on backup import. Backups use `w12.1` and accept eligible prior versions.

## Fresh learner walkthrough

I extracted the starter, installed both lockfiles and independently implemented the planning exercise in a disposable copy. The walkthrough used Node 24.21.0, PostgreSQL 17.11, Express 5.3.0, pg 8.23.1, Helmet 8.3.0, React 19.3.1 and Vite 7.3.8.

- The inherited suites passed 38 backend and 55 frontend checks. The original title-only save, refresh, second-account denial, and logout worked in fresh Chrome profiles. The full untouched suite showed five expected backend and eight expected frontend planning failures. I separated one capstone request assertion from the baseline suite so the starting checkpoints are clear.
- The baseline migration succeeded and the unfinished migration gave a direct instruction to complete 003. After implementation, running migration 003 twice preserved the same fictional task ID, owner, and title and supplied medium priority and a null date.
- The completed copy passed 46 backend and 63 frontend tests, the frontend build, and the real PostgreSQL planning suite. The live suite refused the development database, preserved an existing sentinel table in the test database, and removed its temporary schema.
- Against the real built preview, title-only POST received medium and null. A high-priority task saved February 29, 2028. A priority-only edit sent only priority and retained that date. A keyboard-activated clear sent explicit null. Both invalid priority and impossible date returned 400. The saved ID and planning fields survived refresh and a new Express process with different server and browser timezones.
- Two separate profiles verified 404 for foreign GET, PATCH and DELETE with the owner row unchanged. During a controlled loss of the database relay, the failed edit showed 503, kept the draft and preserved the confirmed values. After recovery the retry updated the row. The mobile editor passed automated accessibility checks at 360 CSS pixels.
- In the disposable copy I recorded A01–A09, three engineering debugging records, and a redacted explanation of one request. I reviewed the diff and committed the test candidate locally. The human portion of A10 remains part of the separate pilot.

## Review boundary

Fieldbook passed TypeScript, the production build and public-asset check, 169 unit tests, and all 60 Chrome scenarios on the serial run. The full course journey recorded 268 required checkpoints. It restored a Week 11 backup, kept Hold and its draft after reload, rejected Hold as completion evidence on import, and removed and restored Phase 1 completion via reset and backup. This journey uses synthetic entries for local checklists. The separate walkthrough exercised the real learner application. An existing Week 1 keyboard check timed out during the earlier two-worker run and passed on the final serial run.

The independent human learner pilot, including the unaided oral explanation and rubric, remains pending. The engineering checks use fictional accounts and a local built preview. The Fieldbook build still warns about the approximately 722 kB and 983 kB minified JavaScript chunks.

- [PostgreSQL calendar and timestamp types](https://www.postgresql.org/docs/17/datatype-datetime.html)
- [PostgreSQL additive table changes](https://www.postgresql.org/docs/17/ddl-alter.html)
- [node-postgres type handling](https://node-postgres.com/features/types)
- [React controlled input guidance](https://react.dev/reference/react-dom/components/input)
