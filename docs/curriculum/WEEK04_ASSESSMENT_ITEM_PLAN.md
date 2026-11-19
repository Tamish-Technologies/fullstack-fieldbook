# Week 4 Assessment Question & Feedback Item Plan — A-005 Structural Baseline

**Status:** **50 owner-approved planned scored slots (structure only)** across **9 required quizzes**, NOT finished learner-facing questions or a verified quiz bank. Additional L10 optional knowledge activity does not count toward graduation or scores. Authority: DEC-12/21; original Week 4 C04–C12, C21–C22; `WEEK04_CHECKPOINT_INVENTORY.md` specifies exact checkpoint IDs.

## 1. Scoring and authoring policies

- Eight 5-item quizzes need **4/5 correct**; the ten-item readiness needs **8/10 correct**. Proposed essential question(s) must also be correct irrespective of total score.
- Use *predict, debug, explain, compare* items, not trivia about API function names. The correct option must be justified; every plausible wrong answer needs diagnostic feedback and a specific review link.
- Distinguish question IDs `p1-w04-lNN-qNN` from checkpoint IDs `p1-w04-lNN-cNN`.
- Write at least one equivalent retry scenario per item set, or a new application question where item banks are small. Repeated correct clicks are not a proxy for mastery.
- Never grade or reward “public API was online” because external service availability is outside learner control. For remote-read concepts use packaged JSON fixtures and fake Response objects.
- All items below are **intent outlines**. No answer bank or completed private instructor source is included here. Flag essential questions only after reviewing their wording and fairness.

## 2. Planned question intents by required quiz checkpoint

### `p1-w04-l01-c01` — 5 scored items

- **Concepts/slots:** async vs sync: predict console order; Promise callback timing; no global browser blocking; timer 0; async completion.
- **Proposed essential:** `p1-w04-l01-q03`.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

### `p1-w04-l03-c02` — 5 scored items

- **Concepts/slots:** async function return type; missing await and Promise property; catch rejection; finally cleanup; sequential vs parallel concept.
- **Proposed essential:** `p1-w04-l03-q03`.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

### `p1-w04-l04-c01` — 5 scored items

- **Concepts/slots:** identify URL segments; GET vs POST; HTTP status 200/404/503; network failure vs HTTP 404; headers/body meaning.
- **Proposed essential:** `p1-w04-l04-q04`.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

### `p1-w04-l05-c01` — 5 scored items

- **Concepts/slots:** REST resource identity; GET vs PATCH; POST new resource; PUT vs PATCH; fake JSONPlaceholder writes are not durable.
- **Proposed essential:** `p1-w04-l05-q04`.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

### `p1-w04-l06-c02` — 5 scored items

- **Concepts/slots:** valid vs invalid JSON row; JSON parsing vs schema checking; duplicate IDs; title limit; preserving source array.
- **Proposed essential:** `p1-w04-l06-q03`.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

### `p1-w04-l07-c02` — 5 scored items

- **Concepts/slots:** fetch result is Response; HTTP failure may resolve; status check before json; invalid JSON throws; injected fetch tests.
- **Proposed essential:** `p1-w04-l07-q02`.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

### `p1-w04-l08-c02` — 5 scored items

- **Concepts/slots:** Network URL/status/timing; wrong endpoint vs offline; how to read response; CORS meaning; safe debugging without disabling protections.
- **Proposed essential:** none.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

### `p1-w04-l09-c02` — 5 scored items

- **Concepts/slots:** idle/loading/success/error; empty data success; loading reset; offline fallback; human-facing error messaging.
- **Proposed essential:** `p1-w04-l09-q04`.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

### `p1-w04-l12-c02` — 10 scored items

- **Concepts/slots:** Promise vs Response; HTTP error and network rejection; parse vs normalize; offline fixture; safe DOM; remote/local ID split; local persistence; fake-fetch tests; accessibility; no-AI transfer reasoning.
- **Proposed essential:** `p1-w04-l12-q03` and `p1-w04-l12-q07`.
- **Item-writing instruction:** include one case with a changed payload/status to prevent memorized answers, one misconception-based distractor, concise correct rationale and explicit wrong-answer feedback.

## 3. Detailed seed examples to rewrite into learner questions

**HTTP false-success misconception:** Show fake `{ok:false,status:503,json: async()=>({message:'down'})}`. Ask whether `fetch()` necessarily rejects on this status. Expected reasoning: no; HTTP response can resolve, code must check `response.ok`; only then can failed status lead to thrown error and error UI. Wrong-answer feedback must distinguish response arrival from network rejection.

**Parsing vs validating:** Show `[{id:1,title:7,completed:false}]` decoded from syntactically valid JSON. Expected reasoning: `JSON.parse` or `.json()` succeeded but task data is schema-invalid; do not call `.trim` on a number. Feedback leads back to normalizer.

**Local ID collision:** Local task has ID 9; remote idea has ID 9. Expected reasoning: Copy creates another **new local ID**, not overwrites or treats remote ID as shared source-of-truth; loading without Copy makes zero task changes.

**Empty vs error:** Fake response returns `[]`, status 200. Expected: successful empty list, not an exception or offline error. Error feedback identifies a UI state-machine confusion.

**Optional cancellation (non-gating):** Show two requests A and B; B is most recent. Ask why A's late result must not overwrite B. This may be practice text in L10 but is **not a scored required item**.

## 4. Feedback authoring and reviewed-bank QA

Each required item must eventually store a stable ID, learning objective reference, expected answer and rationale, distractor feedback, essential flag if applicable, equivalent retry variant, localization note (English only initially), source chapter, and review status. Explain failure using actual evidence; never leak completed reference source files. Use short hints (concept → inspect value/status → narrow implementation step), not immediate code dumps.

## 5. Cross-check before publishing

- [ ] 9 quiz groups and 50 reviewed scored items exist; checks exactly 4/5 or 8/10 **plus essentials**.
- [ ] Every proposed essential flag is defensible and fair after actual item wording review.
- [ ] `fetch()` HTTP error questions do not inaccurately describe normal fulfillment as rejection.
- [ ] Fake JSONPlaceholder write requests are not described as persistent data storage.
- [ ] Optional cancellation never becomes a hidden Week 5 unlock dependency.
- [ ] Retries and alternate response fixtures provide real transfer, not repeated guessing.
- [ ] Test/editor implementation and actual learner results are separately verified at **D5**, not assumed from this D0 plan.
