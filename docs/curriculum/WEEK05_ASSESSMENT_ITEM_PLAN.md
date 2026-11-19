# Week 5 Assessment Item and Feedback Plan — Owner-Approved Structural Plan A-006

**Status:** **57 proposed scored question slots in 10 required quiz groups**, no learner-ready question text, answers, distractors or executed scores. Connected to `WEEK05_CHECKPOINT_INVENTORY.md` and DEC-12/21. 22 required checkpoints include **3 pure-JS browser checks** and **9 real React local attestations** in addition to these 10 quiz groups; optional checkpoints do not affect pass scores.

## A. Global scoring rules

- Score pass is `ceil(0.8 × scored required questions)` **plus every finalized essential item correct**. For this draft, e.g. 4-item quiz requires **4/4**, 5-item requires **4/5**, 6-item requires **5/6**, and ten-item readiness **8/10**. Do not hide the all-essential requirement behind the aggregate score.
- The question slot count is a **planning intention** only, not a completed bank. Review accessibility, technical correctness, and item difficulty with novice pilot participants.
- Do not test whether the student installed `node_modules` or ran React in a conceptual quiz; actual build/interaction is a separate learner-attested local checkpoint.
- Avoid exact-source-code-string questions as the primary grading method. Code-reading/prediction exercises may show a short JSX excerpt without executing JSX in Fieldbook.
- Optional editing, UI polish, cross-origin migration and AI tool use must never block Week 6.

## B. Quiz groups and question intents

### `p1-w05-l01-c01` — 5 scored items; threshold 4/5

- **Proposed question ID slots:** `p1-w05-l01-q01` to `p1-w05-l01-q05`.
- **Intent topics:** imperative vs declarative; renders; event order; component tree; React is not backend.
- **Essential-candidate learning target:** state updates trigger render. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L01 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l02-c02` — 4 scored items; threshold 4/4

- **Proposed question ID slots:** `p1-w05-l02-q01` to `p1-w05-l02-q04`.
- **Intent topics:** Node vs npm vs Vite; entry point; `npm install`; package scripts / dependencies.
- **Essential-candidate learning target:** Node used for tooling ≠ Express server. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L02 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l03-c01` — 6 scored items; threshold 5/6

- **Proposed question ID slots:** `p1-w05-l03-q01` to `p1-w05-l03-q06`.
- **Intent topics:** JSX single root; attribute names; expression syntax; JSX capitalization; conditional `&&`; text escaping.
- **Essential-candidate learning target:** React safely escapes user text by default. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L03 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l04-c01` — 5 scored items; threshold 4/5

- **Proposed question ID slots:** `p1-w05-l04-q01` to `p1-w05-l04-q05`.
- **Intent topics:** component reuse; parent vs child; empty list; props availability; list row composition.
- **Essential-candidate learning target:** component role and stable identity. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L04 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l05-c01` — 5 scored items; threshold 4/5

- **Proposed question ID slots:** `p1-w05-l05-q01` to `p1-w05-l05-q05`.
- **Intent topics:** read-only props; callback arg; `key` not props; handler passing; ownership.
- **Essential-candidate learning target:** child must not mutate incoming task prop. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L05 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l06-c01` — 6 scored items; threshold 5/6

- **Proposed question ID slots:** `p1-w05-l06-q01` to `p1-w05-l06-q06`.
- **Intent topics:** state snapshots; queued state; functional updater; Hooks top level; render purity; mutation symptoms.
- **Essential-candidate learning target:** functional update and snapshot reasoning. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L06 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l08-c01` — 6 scored items; threshold 5/6

- **Proposed question ID slots:** `p1-w05-l08-q01` to `p1-w05-l08-q06`.
- **Intent topics:** index key hazard; immutable new array; map toggle; filter deletion; IDs; filtered view vs data.
- **Essential-candidate learning target:** stable keys and nonmutation. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L08 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l09-c01` — 5 scored items; threshold 4/5

- **Proposed question ID slots:** `p1-w05-l09-q01` to `p1-w05-l09-q05`.
- **Intent topics:** owner of draft/tasks; derived visible list; counts; state duplication; sort/filter effects.
- **Essential-candidate learning target:** derived filtered view must not erase source. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L09 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l10-c01` — 5 scored items; threshold 4/5

- **Proposed question ID slots:** `p1-w05-l10-q01` to `p1-w05-l10-q05`.
- **Intent topics:** lazy initializer; effect dependencies; browser origin; corrupted storage; Strict Mode.
- **Essential-candidate learning target:** different localhost ports are different origins. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L10 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.
### `p1-w05-l11-c02` — 10 scored items; threshold 8/10

- **Proposed question ID slots:** `p1-w05-l11-q01` to `p1-w05-l11-q10`.
- **Intent topics:** end-to-end state path (2); JSX/props (2); keys/immutability (2); form (1); derived list (1); storage (1); debugging (1).
- **Essential-candidate learning target:** state/data flow and data integrity. Pick a specific question only after wording/review and mark its actual ID; **not yet approved as a final essential question**.
- **Format mix:** at least one predict-the-behavior item, one code-read/debug decision, one conceptual or practical transfer question, with defensible distractors.
- **Incorrect-answer feedback:** explain the relevant data flow and point to L11 worked example; do not merely reveal a memorized choice.
- **Equivalent retry:** alter input/task ID/component tree/order or React render scenario without changing the measured learning objective.

## C. Seed misconceptions for reviewers (not completed test items)

1. React removes all DOM/browser knowledge (false: it changes the UI authoring approach).
2. A child can mutate the `task` prop to update App state (false: props are read-only inputs).
3. A `setCount` call instantly changes `count` in the running handler (false: snapshot semantics).
4. Calling `onClick={...}` and calling a function during render are the same as passing a callback (false).
5. `key={index}` is safe after delete and reorder (often wrong for stateful, dynamic lists).
6. `setTasks(tasks.push(item))` is a valid immutable update (false: `.push` mutates and returns length).
7. Changing a filter should change stored tasks (false: derived view must not modify source).
8. `useEffect` is needed for pure filter/search computation (false: compute from state in render).
9. Storage key equality across two different localhost ports implies shared data (false: origin also includes port).
10. Passing the 25 helper tests means the React UI/build works (false: helper tests do not mount the interface).

## D. Reviewer acceptance checklist

- [ ] 57 reviewed scored item texts exist with IDs, source C## and mapped learning objectives; alternate variants documented.
- [ ] Every distractor has a diagnosis; essential questions reserved for genuinely critical data/safety concepts.
- [ ] 80% and essential question rules verified for 4-, 5-, 6- and 10-item sets.
- [ ] JSX syntax items use valid JSX and acknowledge that Fieldbook does not run React in its general JavaScript sandbox.
- [ ] React/Node/Vite version commands verified at actual content publication; link to official current documentation.
- [ ] Errors involving Strict Mode are described accurately: dev-only repeated mount/effect behavior doesn't justify breaking Hook rules or disabling Strict Mode to hide side effects.
- [ ] Stable keys and immutable state question fixtures distinguish identity, display order and array index.
- [ ] Human tests ensure quiz feedback genuinely helps a learner recover without an instructor.

**Current status:** D0 proposal only; author, execute and review during D6 after phase authorization.

**A-006 note:** Question *slots and topics* are approved planning structure, **not reviewed questions, learner-passed quizzes or executed checks**.
