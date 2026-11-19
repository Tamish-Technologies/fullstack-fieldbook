# Week 8 engineering review

On November 19, 2026, the owner accepted Week 7 engineering and authorized Week 8 under D7. Week 8 connects React task reads and writes to the local Express memory store. The owner accepted Week 8 engineering on November 19, 2026. The accepted commit is `36946be` on `origin/codex/d7-week-eight`.

## Try Week 8

Run `npm run dev` in Fieldbook and open `/review/week/08/lesson/01` on the Vite address. **Review next lesson** and the numbered links open all 11 lessons. The review view lets you try the quizzes and labs without recording course progress.

Download **the Week 8 React and Express starter** from Lesson 1. Extract both folders together. With Node 24, open a terminal in each of `backend` and `frontend`, run `npm ci` in each, then start each with `npm run dev`. Visit the direct backend health URL and the printed frontend address. The starter uses the Week 7 read-only API Lab and browser-local My Tasks. Build the server task client and follow the staged migration from Lesson 3. The untouched frontend reports 36 passing and 13 failing tests for its unfinished API client.

## Delivery

- `src/content/week-eight.ts`, `week-eight-quizzes.ts` and `week-eight-practicals.ts` implement the approved A-009 lesson IDs. The delivery includes 66 scored items over 11 quizzes, two prompts per item, three guided hints per lesson, three isolated browser labs and ten local checklists. Three enrichment activities are optional.
- `src/labs/week-eight-frame.js` checks GET and POST responses, empty 204, invalid envelopes and error classification with a fake transport. The lab preserves request options and original cancellation signals. Express execution and React event handling are exercised separately in the learner project.
- The 39-file `build/student-projects/study-tasks-v8.zip` includes the Week 8 frontend starter, the working API, setup notes and two dependency lockfiles. It excludes source solutions and instructor-only notes. The browser test pins the reviewed ZIP digest.
- Week 7 graduation opens Week 8. All 24 required Week 8 checkpoints open the Week 9 outline. Exports use `w08.1` and accept eligible prior versions.

## Local project checks and changes

The local walkthrough uses Node 24.21.0, Express 5.3.0, React 19.3.1, React Router 7.18.6 and Vite 7.3.8. Both packages installed from a fresh extraction with the lockfiles and a populated npm cache. The starter frontend compiled before editing. I wired the client and shared React snapshot in a disposable copy using the lesson steps.

- Direct and proxied health agreed. The real browser loaded a pending indicator before valid Empty. A rapid double-submit sent one POST. The confirmed row and Dashboard count appeared after 201 even though the learner navigated while waiting. Refresh read the same running store.
- A real PATCH applied true then false. An HTTP 400 on rename preserved the draft and the previously stored title. Retrying saved the edit. The offline Idea Inbox could copy a suggestion through the same server task owner. Cancelling deletion kept the row. Confirmed DELETE returned 204, and direct checks distinguished 400 and 404.
- The backend outage left a failed create draft and a failed-delete row visible. Reload showed an error, then successful Empty after restarting Express. The draft remained available for deliberate retry, and the old browser key stayed byte-for-byte unchanged. A delayed older GET did not replace the newer Retry result.
- The learner ZIP now states the expected starting test counts and keeps an address-in-use error from masquerading as server startup. I removed silent input truncation, corrected the task heading order, and improved task count contrast. Lesson 5 now explains how to keep draft state alive across a reload. Lesson 8 calls out the old route labels that can misstate task ownership.

## Verification

Fieldbook passed 118 unit tests and all 48 browser scenarios on the final run. The fresh-profile journey earned all 172 required checks through Week 8, migrated a Week 7 backup and correctly opened, relocked and restored the Week 9 outline. The mobile review exercised both forms of every quiz without saving progress. The first full run exposed a field-note selector that matched both note and lesson loading statuses. The assertion now waits for the actual saved message and passed on rerun.

In the completed disposable project, all 22 backend tests and 49 frontend tests passed. Removing the 204 branch reproduced the expected failing decoder test. Restoring it passed the suite. The Fieldbook and starter production builds passed, along with the completed learner frontend build. The integrated task page passed keyboard and automated accessibility checks at 360 CSS pixels.

## Review boundary

The Fieldbook browser journey uses synthetic local checklists for navigation and graduation. The separate walkthrough uses real loopback HTTP, actual browser interactions and disposable task data. The independent human pilot remains pending. Fieldbook's production build reports a size warning for the roughly 593 kB minified entry bundle.

- [React Effect request and cleanup guidance](https://react.dev/reference/react/useEffect#fetching-data-with-effects)
- [Vite development proxy](https://vite.dev/config/server-options#server-proxy)
- [Fetch response status definitions](https://fetch.spec.whatwg.org/#statuses)
