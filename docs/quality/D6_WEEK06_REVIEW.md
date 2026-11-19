# Week 6 engineering review

The owner accepted Week 5 engineering and authorized Week 6 under D6. Week 6 covers Effects, request recovery, React Router, shared task state and persistence. The owner subsequently accepted Week 6, approved D6 engineering, and authorized Week 7 under D7. The human learner pilot remains pending.

## Try the lessons

Run `npm run dev` in Fieldbook and open `/review/week/06/lesson/01` on the address Vite prints. Use **Review next lesson** or the numbered review links to move through all 12 lessons. This practice view keeps regular course progress separate.

Download **the Week 6 React starter** from Lesson 1. Extract it into a new folder. With Node 24, run `npm ci` and `npm run dev` next to the starter’s `package.json`. The Week 5 task list runs immediately. In another terminal, `npm test` initially reports 26 passes and 10 failures for the unfinished API helpers. `npm run build` checks whether the project compiles. Lessons 1–5 guide the build of the Ideas inbox, and Lessons 6–9 add the routes and carry tasks across navigation and reload.

## Delivery

- `src/content/week-six.ts`, `week-six-quizzes.ts` and `week-six-practicals.ts` implement the approved A-007 sequence and IDs. The lessons include worked examples, predictions and three progressive hints. There are 11 quizzes with 61 scored items and two prompts per item, two JavaScript labs and ten local project checklists. Three optional activities have no effect on graduation.
- `src/labs/week-six-frame.js` evaluates normalization and the request client inside the existing isolated interpreter. Fake fetch supplies the HTTP result, JSON and cancellation. The learner runs the actual React/Router project separately and self-verifies observations.
- `build/student-projects/study-tasks-v6.zip` contains 21 student files. The Week 6 source mapped 19 original student files, and the download adds an npm lockfile and practice fetch fixture. The engineer walked through a disposable copy. No instructor reference solution or guide is included in the archive.
- Regular course progression opens Week 6 on Week 5 graduation. All 23 required Week 6 checks open the Week 7 outline. Exported progress uses `w06.1` and accepts eligible Week 5 records.

## Learner walkthrough and changes

I used the downloadable project and built the Ideas page and routes in a disposable copy. It used Node 24.21.0, React and React DOM 19.3.1, React Router 7.18.5 and Vite 7.3.8. A clean extraction installed from the included lockfile using the npm cache and compiled. After implementing the client, all 36 student tests passed and the routed app compiled. Removing the HTTP guard failed the 503 test. Restoring it passed all 36 again.

- Chrome downloaded and checked the learner ZIP. The mobile review covered all readings and both forms of every quiz while blocking external requests.
- The real React project displayed loading, success, empty, HTTP 503, malformed JSON and network rejection. A slow old response deliberately ignored abort and still could not overwrite the newer Empty result. Offline samples survived a late response. Copy produced fresh numeric IDs without making a request. A separate intercepted request used GET without a body.
- A keyboard run checked focus, active links, Back and Forward, direct refresh of `/ideas` and wildcard recovery. The local Ideas page passed an automated accessibility scan at 360 CSS pixels. Task adds queued together, filtering, sorted deletion and reload preserved the expected records. A malformed storage value survived a memory-only edit and cancelled recovery. Confirmed recovery wrote an empty list.
- I made the expected initial test failures explicit and added a local fixture that reproduces six response outcomes plus a late response without network traffic. I removed the unfinished copy buttons from the Ideas placeholder and corrected the starter reset to clear memory as its confirmation promises. The first course run exposed a false failure in the fake-fetch lab. The interpreter now accepts the exact inert signal fixture as an options value, and the checked call preserves its identity. The desktop scan found two complementary landmarks with the same accessible name. The lesson’s sidebar now has its own accessible name.

## Fieldbook verification

`npm test` passed all 93 unit tests. Strict type checking, the production build and its six-file public asset check passed. All 42 browser scenarios passed across runs. The final full run passed 41 scenarios and hit the 30-second timeout in the existing 834px settings and contrast scenario. That scenario passed in 3.8 seconds on an isolated rerun.

The fresh production journey earned 124 required checks across Weeks 1–6. It imported a Week 5-format backup, retried after missing an essential Week 6 quiz question, confirmed the Week 7 link stayed absent until the final required check, and opened the Week 7 outline. Resetting Week 6 Lesson 3 relocked Week 7. Restoring the Week 6 backup reopened it.

## Review boundary

The end-to-end course test uses synthetic checklist observations to test progression. The separate React walkthrough ran real interactions. Independent human comprehension and unaided transfer still require the learner pilot. Vite reports a size warning for the roughly 528 kB minified entry bundle, with the production build and public asset checks passing.

- [React Effect lifecycle](https://react.dev/reference/react/useEffect)
- [React Router v7 declarative installation](https://reactrouter.com/7.18.5/start/declarative/installation)
