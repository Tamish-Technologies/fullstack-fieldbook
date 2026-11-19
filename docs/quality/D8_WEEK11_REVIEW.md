# Week 11 engineering review

The owner accepted Week 10 engineering and authorized Week 11 under D8 with review before Week 12. Week 11 follows the A-012 testing and release baseline. The owner accepted Week 11 engineering. The accepted delivery is `648316c` on `origin/codex/d8-week-eleven`.

## Try Week 11

Run `npm run dev` in Fieldbook and open `/review/week/11/lesson/01` at the printed address. **Review next lesson** opens all 11 lessons in sequence. The practice view includes the quizzes and browser labs without saving course progress.

Download the Week 11 reliability starter in Lesson 1 and open START_HERE.md. The guide covers both the two-terminal development setup and the built Express preview. Lessons 4–6 introduce the request-ID, error-mapping and configuration exercises. Lesson 8 rehearses a controlled outage. Lesson 9 builds the single-origin preview, and Lessons 10–11 finish the recovery and release report.

## Delivery

- `src/content/week-eleven.ts`, `week-eleven-quizzes.ts`, and `week-eleven-practicals.ts` cover 11 lessons, 66 scored quiz items with two prompts each, two isolated JavaScript labs, eleven local project checks, and three optional activities.
- `src/labs/week-eleven-frame.js` grades synthetic log records and safe public error mapping. The browser labs use no real HTTP requests or private logs.
- `build/student-projects/study-tasks-v11.zip` contains 76 learner files, including two lockfiles, a placeholder environment file, standalone setup, the four exercises, and a release-report template. The instructor solution and recordings stay outside the learner download.
- Week 10 graduation opens Week 11. All 24 required Week 11 checks open the Week 12 outline. Progress exports use `w11.1` and accept eligible prior backups.

## Fresh learner walkthrough

I extracted the learner package, installed both lockfiles, and completed the four exercise fixes independently in a disposable copy. The walkthrough used Node 24.21.0, PostgreSQL 17.11, Express 5.3.0, express-session 1.19.0, Helmet 8.3.0, pg 8.23.1, React 19.3.1 and Vite 7.3.8.

- The untouched starter had 25 of 29 passing pure checks and 32 of 38 passing full backend checks. All 29 pure checks and 38 full backend checks passed after completing the exercises. The learner frontend passed 55 tests and built successfully.
- The live PostgreSQL suite passed, refused the development database and preserved an existing sentinel table in the test database. The temporary schema was removed. Applying migrations twice preserved the legacy task, and an exported fictional row restored successfully into a third disposable database.
- In the actual built preview, two fresh Chrome profiles verified separate lists, 404 on the other account's GET/PATCH/DELETE, and an unchanged owner row. Both `/tasks` and `/ideas` survived refresh. Unknown API and missing asset requests returned 404. The task screen passed its automated accessibility check at 360 CSS pixels.
- I interrupted the preview's database relay while leaving PostgreSQL and its data intact. Liveness stayed 200 while readiness returned 503. A failed write preserved its draft and confirmed list. The 503 response ID matched a sanitized log event. After readiness returned to 200, I checked the confirmed list and retried successfully.
- I replaced the instructor-only setup link, clarified the expected starting failures, and added a single command for the built preview. The health routes bypass session-store loading. The built Idea Inbox uses bundled examples and the rehearsal made no external requests.

## Review boundary

Fieldbook passed TypeScript, the production build and public-asset check, 156 unit tests, and all 57 Chrome scenarios. The fresh course journey earned 244 checkpoints, imported a Week 10 backup, retried a missed essential question, and relocked and restored access to the Week 12 outline. The course journey used synthetic entries for the local checklists. The actual starter walkthrough above supplies separate local evidence. The focused tests exercised both versions of every quiz, both labs with valid and invalid submissions, the reviewed download, and 320-pixel reflow.

The separate human learner pilot remains pending. This review exercised local HTTP. Public HTTPS and reverse-proxy behavior remain optional verification outside the local rehearsal. Fieldbook's build still warns about the approximately 690 kB and 832 kB minified JavaScript chunks.

- [Node.js test runner](https://nodejs.org/api/test.html)
- [Vite production builds](https://vite.dev/guide/build)
- [Express proxy settings](https://expressjs.com/en/guide/behind-proxies.html)
- [Helmet response headers](https://helmetjs.github.io/)
