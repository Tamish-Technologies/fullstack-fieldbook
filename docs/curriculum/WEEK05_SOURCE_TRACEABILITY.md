# Week 5 Source Traceability and Chapter Disposition — Approved Planning Structure A-006

**Status:** Week 5 original source Markdown and inner code ZIP inspected. This is a chapter-level inventory and implementation contract, **not** a page-by-page PDF accessibility audit, compiled React build, student test or released content approval. The original Markdown has **23 numbered instructor chapters** and the companion code archive has **30 files** (15 starter, 15 instructor reference).

## A. Provenance and exact source fingerprints

- Private `phase1/week-05/instructor-guide-source.md`: 60,176 bytes; SHA-256 `e852746e8ccdd95edca017f0fa9ed4118861c66670266a86d8600ca321dbf441`.
- Private `phase1/week-05/code-starter-and-reference.zip`: 23,762 bytes; SHA-256 `768277fc3fd9220088b5bf6b13a1cfef7c18c1fff9cffa8cfeb37125fe5e67a9`.
- Private `phase1/week-05/instructor-guide.pdf`: 473,625 bytes; SHA-256 `871acf4b7e25ae93e5e340ab6c1da7243bc0b33a28a26861dfae269b0150aa07`. PDF is source reference; if graphics differ from Markdown, inspect the PDF itself before reusing.

## B. Disposition of **all 23** original chapters

| Chapter | Disposition | Learner destination / restriction |
|---|---|---|
| C01 — Instructor brief: the Week 5 mission | Adapt | L01/L11; motivation, objectives, explicit scope; mentor-only instructions removed |
| C02 — Preparation, project continuity and a 10-minute diagnostic | Adapt | L01/L02/L11; Week 4 checkpoint, Git backup, setup diagnostic and separate folders |
| C03 — Mental model: imperative DOM vs declarative React | Teach | L01/L04/L09; DOM imperative vs declarative React and component tree |
| C04 — Lesson A: Node, npm, Vite and the project entry point | Teach | L02; Node/npm/Vite, entry paths and errors |
| C05 — Lesson B: JSX is JavaScript syntax for describing UI | Teach | L03; JSX expression, wrappers, attributes, safe output |
| C06 — Lesson C: components, props and one-way data flow | Teach | L04/L05; composition, props, callbacks, read-only inputs |
| C07 — Lesson D: `useState`, renders and state snapshots | Teach | L06; useState snapshot, updater and purity |
| C08 — Lesson E: events, controlled inputs and forms | Teach | L07; controlled form, submit, validation |
| C09 — Lesson F: lists, stable keys and immutable task updates | Teach | L08; stable keys, immutable CRUD |
| C10 — Lesson G: state ownership and derived data | Teach | L05/L09; state ownership and derived list |
| C11 — Lesson H: persistence, `useEffect` and origin boundaries | Teach | L10; lazy storage, useEffect, cross-port origin |
| C12 — Lesson I: debugging a React app systematically | Adapt | L10/L11; systematic React debugging labs |
| C13 — Project blueprint: what is migrated from Week 4 and why | Adapt | L11; project plan and continuity without API inbox |
| C14 — AI-assisted development: a disciplined workflow | Optional support | L11; AI prompts/review and bounded delegation, never required to pass |
| C15 — Guided Session 1 - React orientation, JSX and props (90 minutes) | Instructor only → adapt | L01–L05; activity sequencing, not instructor script |
| C16 — Guided Session 2 - state, forms and task updates (90 minutes) | Instructor only → adapt | L06–L11; coaching flow, not instructor script |
| C17 — Independent practice: 4–6 hours with explicit checkpoints | Adapt | L07–L11; independent tasks and acceptance checklist |
| C18 — Practical lab worksheet: five progressive micro-challenges | Adapt | L03/L06/L08/L09/L10; five micro challenges, no key leakage |
| C19 — Assessment rubric (100 points) and the release gate | Instructor rubric → adapt | L11 readiness evidence; not a 100-point automated academy gate |
| C20 — Instructor answer key and common misconceptions | PRIVATE answer key | Keep private; use to validate items and misconception feedback |
| C21 — Testing, Git commits and a final acceptance run | Adapt | L02/L11; run tests, Git checks, local acceptance |
| C22 — Complete reference implementation - instructor appendix | PRIVATE reference appendix | Keep private; do not bundle full `reference-solution/` in public assets |
| C23 — Week 6 handoff, teaching references and next steps | Adapt | L11 Week 6 preview and optional official learning references |

**Total:** C01–C23 accounted for. Instructor sessions/answer keys are not learner-readable by default; source coverage does not mean finished course content.

## C. Archive files inspected and public/private boundary

| Archive path | Usage boundary |
|---|---|
| `starter/.gitignore` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/README.md` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/index.html` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/package.json` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/App.jsx` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/components/TaskForm.jsx` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/components/TaskItem.jsx` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/components/TaskList.jsx` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/components/TaskToolbar.jsx` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/lib/storage.js` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/lib/task-logic.js` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/main.jsx` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/src/styles.css` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/tests/task-logic.test.mjs` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `starter/vite.config.js` | Public starter candidate after review; learner-specific TODOs still unfinished |
| `reference-solution/.gitignore` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/README.md` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/index.html` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/package.json` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/App.jsx` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/components/TaskForm.jsx` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/components/TaskItem.jsx` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/components/TaskList.jsx` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/components/TaskToolbar.jsx` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/lib/storage.js` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/lib/task-logic.js` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/main.jsx` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/src/styles.css` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/tests/task-logic.test.mjs` | Instructor-only complete reference; **never** bundled into public course |
| `reference-solution/vite.config.js` | Instructor-only complete reference; **never** bundled into public course |

**Student starter:** `starter/src/App.jsx` begins with two demo tasks, TODO `addTask`, toggle/delete callbacks and persistence; its pure task utilities and a Node test file are present. This is an intentional starter, not a full React app. **Private reference:** `reference-solution/src/App.jsx` has actual state, storage handling and task callbacks; `reference-solution/src/components/TaskItem.jsx` contains optional editing; its 25 helper/storage tests are source reference assertions, not independently executed academy tests.

## D. Confirmed project invariants and learning boundaries

1. Task shape `{ id:number, title:string, completed:boolean }` continues from Weeks 2–4. Preserve ID validity and title ≤100 trimmed characters.
2. Reuse `src/lib/task-logic.js` rather than rewriting known-good pure functions solely because UI moved to React.
3. Storage helpers in `src/lib/storage.js` use key `study-tasks-week2`; they protect against exceptions/malformed JSON instead of silently destroying data.
4. Browser origin includes protocol/host/port: Vite (usually :5173) and Week 4 local server (often :5500) do not share saved tasks automatically. Keep source and React projects separate.
5. Week 5 student scope is **JSX + React**, not a TypeScript migration. The Fieldbook platform's TypeScript stack is not the student's Week 5 curriculum language.
6. The React API-powered Idea Inbox from Week 4 is **deferred to Week 6**, not missing required Week 5 behavior.
7. Inline task editing in the reference is explicitly **stretch**. Don't require it to graduate Week 5 or leak its full implementation.
8. Source uses `npm install`, `npm run dev`, `npm test`, `npm run build`; actual Node/Vite version compatibility and package availability must be rechecked when D6 content is produced. The ZIP contains no `node_modules`.
9. Test file `tests/task-logic.test.mjs` covers 25 helper/storage test assertions according to source, **not** actual mounted React component tests. Running a helper test cannot certify the UI.
10. Fieldbook pure-JS browser checks can validate the helper behavior in isolated fixtures, but **must not be presented as automatic JSX/React component checks** unless a separately reviewed execution environment genuinely implements them.
11. React DevTools may be optional, standard browser Console/Elements/Storage and Vite terminal remain central. No paid tools or AI account required for course completion.
12. The local task app's storage must never access or overwrite FullStack Fieldbook's **own course progress**.

## E. Known open risks and QA before D6 delivery

- Vite/Node release compatibility may change; do not hardcode future minimum versions from this 2026 source without checking official Vite/Node docs at actual build time.
- React Strict Mode may expose impure rendering or duplicate initialization; teach causes rather than deleting Strict Mode to mask a bug.
- React state mutation, `key={index}`, incorrect onClick invocation, stale derived state and different storage origin are the priority debugging scenarios.
- Deciding to auto-grade JSX by string matching or embedding a general React bundler in Fieldbook is outside this approved v1 architecture. Keep actual local app behavior **self-verified**.
- First-party official React guidance is preferred for state/props/effects, including `https://react.dev/learn/state-as-a-snapshot`, `https://react.dev/learn/updating-arrays-in-state` and `https://react.dev/learn/synchronizing-with-effects`; Vite setup docs `https://vite.dev/guide/`. Recheck technical details near course publication.
- The project source contains an instructor reference. Keep C20, C22 and every `reference-solution/` file out of future public build and app downloads; respect license/publication DEC-18 later.

**D0 owner review:** all 11 lesson IDs preserved; draft 25 checks (22 mandatory/3 optional); 10 quizzes/57 slots; source C01–C23 mapped and 30 code archive files inspected. Actual learning material, QA and local React runs remain **not done**.

**A-006 note:** Owner approved the Week 5 chapter-to-lesson/assessment structure only. Reference source inspection is not an executed React build, D6 learner trial or publication approval.
