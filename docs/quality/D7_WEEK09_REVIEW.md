# Week 9 engineering review

On November 19, 2026, the owner accepted Week 8 engineering and authorized Week 9 under D7. Week 9 follows the A-010 PostgreSQL and SQL baseline. The owner accepted Week 9 and approved D7 engineering. The accepted delivery is `4d1a8e8` on `origin/codex/d7-week-nine`.

## Try Week 9

Run `npm run dev` in Fieldbook and open `/review/week/09/lesson/01` on the Vite address. **Review next lesson** opens each of the 12 lessons in sequence. The review route lets you try the quizzes and browser labs without saving course progress. For the regular course path, complete the Week 8 requirements first.

Download **the Week 9 PostgreSQL starter** from Lesson 1. Extract both folders together and open the included README. Lesson 3 walks through the dedicated local database role, the development and test databases, the private `.env`, and the first migration. Run `npm ci` in each project folder and launch the backend and frontend in separate terminals. The backend health endpoint confirms connectivity. The untouched starter reports 17 passing backend tests and 4 expected failures for the unfinished repository.

In Lesson 12, create a task in the completed learner project, record its generated ID, restart Express, and reload. Match the ID, title, and timestamp to the PostgreSQL row. The checklist records the learner's own local verification.

## Delivery

- `src/content/week-nine.ts`, `week-nine-quizzes.ts`, and `week-nine-practicals.ts` deliver 12 readings, 72 scored items with two prompts each, 2 browser labs, 10 local checklists, and 3 optional activities.
- `src/labs/week-nine-frame.js` uses a fake query function to check row mapping, filters, and parameter bindings. Learners run migrations, SQL, and HTTP requests in the separate local project.
- `build/student-projects/study-tasks-v9.zip` ships 48 learner files, including two lockfiles and a placeholder `.env.example`. It excludes instructor solutions and database credentials. The browser download test checks the reviewed ZIP's checksum.
- Week 8 graduation opens Week 9. All 24 required Week 9 checkpoints open the Week 10 outline. Backups use `w09.1` and accept eligible earlier exports.

## Local project walkthrough

I extracted the learner download and completed its repository in a disposable copy. The walkthrough used Node 24.21.0, PostgreSQL 17.11, node-postgres 8.23.1, Express 5.3.0, React 19.3.1, and Vite 7.3.8. Both lockfile installs and the starter frontend build passed.

- I connected as the learning role to both databases. The migration ran twice and preserved existing rows. I verified defaults, constraints, filters, and rollback of SQL changes targeted by the generated ID.
- The React task UI created a row, set its completion to true and back to false, and renamed it. After Express restarted with a different process ID, the same ID, title, and timestamp came back on GET. Canceling deletion preserved the row. Confirming returned HTTP 204 and removed the actual PostgreSQL row. The task page passed its automated accessibility scan at 360 CSS pixels.
- The real database test passed in a temporary schema inside the dedicated test database. It refused the development target, preserved an existing table in the test database, and removed its temporary schema.
- The first outage trial showed a generic 500 after the live database disconnected. After adjusting the driver's connection error classification, the same trial returned a safe 503. The setup guide also distinguishes missing configuration, a wrong port, and an unfinished repository.
- The completed disposable project passed 21 backend tests, the live database test, 49 frontend tests, and the frontend build. Altering the repository to discard explicit false values failed the intended test. Restoring the implementation passed again.
- The starter now uses exact-ID SQL examples and a scoped test schema. I updated the older in-memory guidance, clarified persistent deletion with confirmation, and improved the task page heading order, input instructions, and count contrast.

## Fieldbook verification

The final build passed TypeScript, Vite, and the public-asset allowlist. All 131 unit tests and 51 browser scenarios passed. A Week 3 scenario timed out on the first full run. It passed on the complete rerun.

The browser journey starts with empty progress. It works through all 196 required checks up to Week 9, imports a Week 8 backup, checks a failed essential item and recovery, then verifies the Week 10 outline gate after completion, reset, and restore. This journey simulates the local checklist submissions. The local project walkthrough above supplies separate PostgreSQL evidence. The target Week 9 scenarios also check both forms of all quizzes, plausible wrong lab submissions, the starter download, and automated accessibility at 320 CSS pixels.

The independent human learner pilot remains pending. Fieldbook's build reports size warnings for the roughly 626 kB and 556 kB minified chunks.

- [PostgreSQL 17 transactions](https://www.postgresql.org/docs/17/tutorial-transactions.html)
- [PostgreSQL 17 constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)
- [node-postgres query parameters](https://node-postgres.com/features/queries)
- [node-postgres pool API](https://node-postgres.com/apis/pool)
