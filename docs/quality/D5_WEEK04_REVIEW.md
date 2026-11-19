# D5 Week 4 engineering review

The owner accepted Week 3 engineering and directed work to proceed. Week 4 completes the planned D5 engineering scope for Weeks 2–4. The owner accepted Week 4 and approved D5 engineering. The Week 1 human learner pilot remains pending.

## Try the week

Open `/review/week/04/lesson/01` on the local development server (`npm run dev`). The numbered links and **Review next lesson** let you try all twelve lessons without writing course progress. Lesson 1 has the nine student starter downloads. Lesson 7 lets you try a failing request without internet access. Lesson 11 has two separate editors for importing an idea and handling its Copy button.

In the regular course, graduate from Week 3 first. Complete the checks through Lesson 9, then continue directly to Lesson 11. Lesson 10 covers cancellation and stale responses as an optional detour. Week 4 graduation requires 21 checks and includes self-verified local work. Week 5 has an outline only.

## Scope and sources

| Delivery | Files and behavior |
| --- | --- |
| Instruction and assessment | `src/content/week-four.ts` and `week-four-quizzes.ts` cover the approved A-005 lesson and checkpoint IDs. Nine quizzes have 50 scored items and two scenarios per item. Essential items, misconception feedback, worked examples, predictions and hints appear in the reader. |
| Offline labs | `src/content/week-four-practicals.ts` and `src/labs/week-four-frame.js` cover eight programs. They exercise deferred settlement, Promise chains, cleanup, schema validation, fake fetch, UI state, local copy and real DOM click handling. |
| Local project | `src/content/week-four-starter/` contains the nine student files from the original Week 4 archive. Setup instructions explain the origin and port. Four local checklists explicitly request learner observations, including independent transfer. |
| Course integration | The reader, practical components and course catalog publish Week 4. The progress validator accepts previous course exports and uses `w04.1` for new records. Required dependencies bypass optional Lesson 10. |

Authoring used the Week 4 original guide, the student archive entries, the lesson blueprint, checkpoint inventory, assessment item plan and source traceability record. The private reference was exercised outside the application. The public build continues to exclude the source archive and instructor guide.

## Fresh-learner engineering checks

On November 18, 2026, `npm test` passed **70 unit tests**. `npm run test:e2e` passed **36 browser scenarios** in 1.1 minutes, including a fresh journey earning all **79 required checks across Weeks 1–4**. Resetting optional Lesson 10 preserved Week 5 eligibility. Resetting Week 4 locked Week 5, and restoring the backup reopened it. The lesson reset selector now has an explicit accessible name. `npm run build` passed strict typechecking, production compilation and the six-file public asset and private-material check.

- The development review traverses all 12 readings at 320 pixels, opens hints, tries the unfinished lab starters and answers both forms of all nine quizzes. It blocks external requests, checks for horizontal overflow and finishes with empty course storage. Automated accessibility scans cover the opening lesson and the two-editor Lesson 11.
- Each of the eight browser labs accepts a working program and rejects a plausible mistake. The first traversal exposed a valid validator exhausting an allowance shared by multiple test cases. Independent payloads now receive independent bounded runs. The final checks cover omitted and zero limits, duplicates, 100- and 101-character titles, changed inputs and malformed records.
- The production journey begins with empty browser storage, earns checkpoints via the ordinary course UI, migrates prior exports and exercises an essential-item retry. It checks the optional detour, the Week 5 prerequisite, reset, and backup restoration. Local project forms in this journey contain synthetic observations.
- In a separate disposable Chrome profile, all nine files were downloaded from Lesson 1 and served over loopback HTTP. The starter’s browser suite returned **22 passed, 0 failed**. A missing-file GET returned 404. The known-good GET rejected while offline and returned 200 after reconnecting.
- The private project’s own browser suite returned **37 passed, 0 failed**. With the same saved task records, the independent check exercised a simulated HTTP 503, a disconnected transport, invalid JSON, an empty success, successful retry and the offline sample. Copying a markup-looking idea with a colliding remote ID added a new incomplete local task with literal text and a fresh ID. The original records and the copy survived reload.

## Interpretation and limits

The code editor interprets a bounded JavaScript subset inside the existing opaque sandbox. Async programs support Promise reactions, named fixture operations and explicit await statements, initializers and returns. The DOM lab provides the event delegation wiring and checks the learner’s handling of a real nested click. The full JavaScript project runs on the learner’s own computer. Fieldbook saves required results and local attestations. Week 4 editor source stays in the open lesson.

The technical review used local fixtures and Chrome. Live third-party availability, independent human comprehension and unaided transfer were not measured. The [human pilot protocol](WEEK04_PILOT_PROTOCOL.md) remains available for a consenting learner.
