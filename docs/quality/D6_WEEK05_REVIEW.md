# Week 5 engineering review · React fundamentals

The owner accepted Week 4, approved D5 engineering, and authorized Week 5 under D6. The owner subsequently accepted Week 5 engineering and authorized Week 6. The Week 1 human pilot remains pending.

## Try it

Run `npm run dev` in the Fieldbook repository. On the printed local address, open `/review/week/05/lesson/01`. Follow **Review next lesson** or jump using the lesson numbers. Review mode lets you read, retry quizzes and run the labs without changing regular course progress.

Download **the Week 5 React starter** from Lesson 1 or 2. Extract it and open a terminal beside its `package.json`. With Node 24 and npm available, run `npm install` followed by `npm run dev`. Use the address printed by that second Vite process. The two demo tasks let you try filtering and sorting right away. Add preserves your draft until you connect it. Toggle and Delete show the task ID that reaches the parent. Lesson 7 covers form validation, Lesson 8 wires the task state, and Lesson 10 adds persistence.

## Delivery

| Area | Where to look | What the learner gets |
| --- | --- | --- |
| Readings | `src/content/week-five.ts`, `src/lessons/Article.tsx` | Eleven lessons take the learner from tracing a checkbox through a render to demonstrating and debugging Study Tasks v5. Each includes a worked example, prediction, practice and feedback. |
| Quizzes and practice | `src/content/week-five-quizzes.ts`, `week-five-practicals.ts`, `src/labs/week-five-frame.js` | Ten quizzes cover 57 scored questions with two prompts each. Three browser labs exercise pure functions for validation, immutable updates and derived views. Nine local checklists ask for observations from the real React project. |
| Student project | `build/student-projects/study-tasks-v5.zip` | One downloadable project preserves the directory tree, dotfile, helper tests and setup instructions. Authoring used the original Week 5 guide, archived student files and approved A-006 source mapping. Only the 15 student entries are packaged. The browser download regression pins the reviewed digest. |
| Progress | Course catalog, reader, practical controls and backup validator | Week 4 graduation opens Week 5. Completing all 22 required Week 5 checks unlocks the Week 6 outline. All three enrichment options can be skipped. New exports use `w05.1`; prior valid progress migrates on import. |

## What was tested

- **Fieldbook:** 81 unit tests, 39 browser scenarios, strict TypeScript checking, the Vite production build and the six-file public asset check passed. The repository has no separate lint script.
- **Course journey:** A fresh Chrome profile earned all 101 required checks in Weeks 1–5 through the production UI. It imported Week 4 progress, missed an essential Week 5 question with a 4/5 score, retried, graduated, reset Lesson 7, observed the Week 6 lock and restored the backup. The local checklist entries in this test are synthetic.
- **Reading and assessments:** The mobile review traversed all eleven lessons at 320 CSS pixels, opened hints, answered both forms of every quiz, rejected unfinished lab starters and finished with empty local storage. External requests were blocked. Automated accessibility scans of Lessons 1 and 11 found zero violations. A separate keyboard walkthrough ran the failing lab and checklist in Lesson 7 and opened the Lesson 8 quiz at 320 and 834 CSS pixels. Both widths passed reflow and accessibility checks. All three labs accepted working solutions and rejected targeted mistakes.
- **Actual learner download:** Chrome downloaded the ZIP from Lesson 2. Its bytes matched the reviewed archive, and its 15 entries matched the extracted student files individually. The project installed using Node 24.21.0 and npm 11.19.0, resolving React and React DOM 19.3.1 and Vite 7.3.8. Its 25 helper tests and production build passed on the starter and again after wiring the project in a disposable copy.
- **Real React interactions:** Chrome observed hot reload, an intentional import error and recovery. From a count of 3, two captured updates produced 4 and two functional updates produced 5. Enter and the Add button submitted trimmed titles. Whitespace and 101 characters retained the draft with an error; 100 characters succeeded after wiring. A markup-looking title appeared as text. Filtering, case-insensitive search, sorted deletion, global counts and same-port reload preserved the expected task IDs.
- **Storage:** A second port opened an empty project. Returning to the first recovered its three rows. Malformed JSON survived reload and an in-memory add. Denied reads and denied writes produced warnings while the form remained usable. All task data used here was fictional.

## Changes from the walkthrough

The starter used to clear a valid draft even though Add had saved nothing. It now explains when to wire Add and keeps the text. A silent input length limit also made the assigned 101-character error impossible to observe. The form now runs its validator and shows the error. Toggle and Delete now announce the receiving task ID, and the lessons identify when to replace each callback. Lesson 7 includes a temporary success callback so learners can test a valid submission before building Lesson 8.

Keyboard testing caught a lab result whose status role hid its heading semantics. Results now retain their heading, focus target and live announcement. The practice checklist now says where observations can be saved, and the final lesson links directly to the newly unlocked Week 6 outline.

The first local package command encountered a broken system Node installation. Switching to the installed Node 24 runtime resolved it. The setup lesson now calls out the Node version check, project directory, printed port, and second terminal.

## Review boundary

Fieldbook evaluates the three JavaScript helpers in its constrained interpreter. A learner runs React, hooks, npm commands and browser storage in their own project and records those observations. The engineering walkthrough used Chrome. A consenting novice's comprehension, unaided debugging and assistive-technology experience remain unmeasured. The [human pilot protocol](WEEK05_PILOT_PROTOCOL.md) stays open.
