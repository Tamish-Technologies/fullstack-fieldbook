# Week 10 engineering review

The owner accepted Week 9, approved D7 engineering, and authorized Week 10 under D8 with review before Week 11. Week 10 follows the A-011 authentication and authorization baseline. The owner accepted Week 10 engineering. The accepted delivery is `c92481d` on `origin/codex/d8-week-ten`.

## Try Week 10

Run `npm run dev` in Fieldbook and open `/review/week/10/lesson/01` on the Vite address. Follow **Review next lesson** in order. The lessons, end-of-lesson quizzes, and browser labs are available in this practice view without saving progress. Complete the Week 9 gates to earn progress on the regular course path.

Download the Week 10 authentication starter in Lesson 1 and read its START_HERE.md. Lesson 3 runs the fictional Argon2id exercise. Lesson 4 prepares the isolated database and preserves a legacy row. Lessons 5 and 8 walk through completing the user and task repositories. Lesson 12 combines the evidence into a two-account demonstration.

## Delivery

- `src/content/week-ten.ts`, `week-ten-quizzes.ts`, and `week-ten-practicals.ts` contain 12 readings, 72 scored items with two prompts each, two isolated browser labs, ten local project checklists, and three optional activities.
- `src/labs/week-ten-frame.js` checks plain JavaScript credential validation and captures owner-scoped query arguments. The judge uses synthetic fixtures. Real sessions, HTTP requests, and PostgreSQL operations take place in the separate learner project.
- `build/student-projects/study-tasks-v10.zip` contains 63 learner files with two lockfiles and a placeholder `.env.example`. The repositories stay incomplete for the exercises. The download excludes the instructor solution, recordings, and configured credentials.
- Week 9 graduation opens Week 10. The 24 required Week 10 checks open the Week 11 outline. Progress exports use `w10.1` and accept eligible earlier versions.

## Fresh learner walkthrough

I extracted the learner ZIP and installed both lockfiles with Node 24.21.0. The local runs used PostgreSQL 17.11, Argon2 0.44.0, Express 5.3.0, express-session 1.19.0, connect-pg-simple 10.0.0, express-rate-limit 8.7.4, pg 8.23.1, and Vite 7.3.8. Both the learner frontend build and all 53 frontend tests passed. The Argon2 script confirmed differing salts, successful verification, and refusal of an incorrect candidate. It printed three booleans.

- The first migration seeded a single fictional legacy row. Applying the full migration twice preserved the row in `tasks` and left `user_tasks` empty before signup.
- The untouched starter reported 20 passing and three expected failing backend tests for the incomplete owner repository. I completed the repositories independently in a disposable copy. All 23 backend tests and the real PostgreSQL/Express suite then passed.
- The live suite exercised actual Argon2id storage, protected endpoints, public signup output, duplicate email, cookie attributes, logout, and separate lists. All three foreign-ID requests returned 404 and the owner's row remained unchanged. The suite refused the development URL, preserved a sentinel table in the test database, and removed its temporary schema.
- Two fresh Chrome profiles verified that the task request waits for the session, refresh restores the right account, and logout and account switching clear the previous tasks. I checked 403 for a disallowed origin, explicit false in PATCH, 204 on confirmed deletion, and recovery after an invalid sign-in. The sign-in and signed-in task screens passed automated accessibility checks at 360 CSS pixels.
- I added an explicit starter message for incomplete signup, exact-origin and two-profile setup guidance, a session-check retry action, and confirmation for persistent task deletion. The browser audit identified low-contrast task counts and a mismatch between the visible and accessible brand label. Both were corrected. The lab audit caught the existing single-digit week-ID assumption, which is fixed for Week 10.

## Verification and review boundary

Fieldbook passed TypeScript, the production build and public-asset checks, 144 unit tests, and all 54 Chrome scenarios. The full journey earned 220 checkpoints, imported a Week 9 backup, retried a missed essential question, and verified reset/restore around the Week 11 outline. It uses synthetic checklist entries. The walkthrough above checks real local server behavior separately. The Week 10 practice tests ran both quiz variants for each lesson, tested both labs with correct and incorrect programs, checked the download checksum, and verified reflow at 320 CSS pixels.

The independent human learner pilot is pending. The learner backend is loopback-only. Its local authentication behavior is a teaching exercise. Fieldbook's build still reports size warnings for the approximately 659 kB and 688 kB minified chunks.

- [Express session middleware](https://expressjs.com/en/resources/middleware/session/)
- [connect-pg-simple](https://github.com/voxpelli/node-connect-pg-simple)
- [OWASP password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP origin verification](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#using-standard-headers-to-verify-origin)
