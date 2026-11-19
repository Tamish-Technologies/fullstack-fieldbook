# Week 7 engineering review

The owner accepted Week 6 and approved D6 engineering. The owner authorized Week 7 under D7 and requested review before Week 8. The owner subsequently accepted Week 7 engineering and authorized Week 8. The human learner pilot remains pending.

## Try Week 7

Start Fieldbook with `npm run dev`, then open `/review/week/07/lesson/01` on the address Vite prints. **Review next lesson** and the numbered links open all 12 lessons in practice mode. The lessons include 12 quizzes, two isolated JavaScript labs, and 10 checklists for local work. The review route leaves regular course progress alone.

From Lesson 1, download **the Week 7 Node and React starter** and extract the whole ZIP. With Node 24, run `npm ci` and `npm run dev` in `backend`. Open `http://127.0.0.1:3001/api/health`. Use a second terminal in that folder to issue requests and run `npm test`. The untouched backend has 5 passing and 17 failing tests for the unfinished helpers and routes. For Lesson 5 use `npm run dev:seed` to practice with two fictional tasks. Use the default empty store for the later restart check. Lesson 11 starts the separate `frontend` Vite process and connects the read-only API Lab.

## Delivery

- `src/content/week-seven.ts`, `week-seven-quizzes.ts` and `week-seven-practicals.ts` cover the approved A-008 curriculum and stable IDs. The 66 scored questions each have two prompts and targeted feedback. Three enrichment activities are optional.
- `src/labs/week-seven-frame.js` checks real learner-written plain JavaScript using the existing isolated interpreter. The store lab checks copies, filters, stable IDs and independent instances. The validation lab checks body shape, explicit false, canonical IDs and filters. Node processes and real HTTP testing are done in the learner project.
- The 36-file `build/student-projects/study-tasks-v7.zip` adapts the Week 7 source starter with lockfiles, an onboarding README and setup corrections. It includes learner assets only.
- Week 6 graduation opens Week 7. All 24 required Week 7 checks open the Week 8 outline. Browser progress exports use `w07.1` and retain compatibility with earlier course backups.

## Walkthrough and fixes

The original archive supplied the local project and the source guide supplied the implementation sequence. I worked through the backend and frontend in a disposable copy with Node 24.21.0, Express 5.3.0, React 19.3.1, React Router 7.18.6 and Vite 7.3.8. Both packages installed from a fresh extraction using the lockfiles and a populated npm cache.

- Actual HTTP requests verified health and unknown routes. Moving the terminal fallback early reproduced the wrong 404. A second listener on the same port exited with a useful error. Valid and malformed JSON took different paths. The repaired API returned safe 400 JSON and a 413 for an oversized body.
- Seeded GETs returned the correct completed and active IDs. Real POST returned 201 and Location for a trimmed task. Invalid bodies preserved the count. PATCH applied false and retained the title. DELETE returned 204 and zero body bytes. Malformed and missing IDs produced 400 and 404 respectively.
- The React walkthrough used the real Vite proxy, keyboard navigation and 360 CSS pixels. It verified the two read-only GETs, an accessible error with the backend stopped, Retry on restart, an empty server list and persistence of the independent browser task. The 360px automated accessibility scan passed after the starter’s page headings, link label and footer contrast were corrected.
- The completed learner copy passed all 22 backend tests and all 36 frontend helper tests. The frontend build passed. An intentional false-filter regression failed the named HTTP case and passed after repair.
- Seeded practice resolves the GET-before-POST gap. The starter now reports occupied ports accurately, identifies the unfinished bridge as the Lesson 11 task and makes the expected initial test failures visible. The isolated task-store grader now allows the labelled seed data field required by its own contract.

## Fieldbook verification

`npm test` passed all 106 unit tests. Strict TypeScript checking, the production build and the six-file asset privacy check passed. `npm run test:e2e` passed all 45 browser scenarios in 1.6 minutes. The production journey earned all 148 required checks through Week 7 from a fresh profile, migrated a Week 6-format backup, retried a missed essential question, and opened the Week 8 outline after the final requirement. Resetting the Week 7 store lesson relocked Week 8. Restoring a valid backup reopened it. A 320px review traversed all 12 lessons and both quiz forms without writing progress or contacting a backend.

## Review boundary

The end-to-end course journey uses synthetic local checklists to verify navigation and graduation. The separate walkthrough observes the real local project. Independent novice comprehension and unaided transfer are still open for the [human learner pilot](WEEK07_PILOT_PROTOCOL.md). Fieldbook’s production build reports a size warning for the roughly 560 kB minified entry bundle.

- [Installing Express](https://expressjs.com/en/starter/installing/)
- [Express error handling](https://expressjs.com/en/guide/error-handling.html)
- [Node test runner](https://nodejs.org/api/test.html)
- [Vite development proxy](https://vite.dev/config/server-options#server-proxy)
