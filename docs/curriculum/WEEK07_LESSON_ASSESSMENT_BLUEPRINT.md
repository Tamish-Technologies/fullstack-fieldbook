# Week 7 Lesson & Assessment Blueprint — D0 Planning Structure Approved A-008
**Product:** FullStack Fieldbook, Phase 1 (student Week 7). **Status:** **D0 STRUCTURAL APPROVAL A-008 — owner accepted the planning structure; actual lessons/tests/pilot pending.** **Learning-stage:** D7 (student Weeks 7–9); this is NOT platform-development-stage D7 authorization. **Source:** the original Week 7 instructor source Markdown (C01–C27) and 68-entry starter/reference ZIP. **Continuation:** Week 6 React Hooks/API/Router D0 structure approved as A-007; actual Week 6 course graduation is a prerequisite when this content is implemented.

> **Educational promise:** The learner moves from being an API consumer to the author of a small HTTP service. FullStack Fieldbook **remains a frontend-only learning website**. The **learner** installs and runs Node/Express locally. We do not secretly introduce a platform backend, cloud assessment service, or SQL database this week.

## 1. Scope, outcomes and phase boundary

**Project:** Study Tasks API v1, a separate Express 5/Node.js backend with an in-memory task store. Week 6 React retains browser `localStorage` tasks. A new `/server`/API Lab page performs **read-only** backend GET requests; React write integration is **Week 8**, and PostgreSQL persistence is **Week 9**.

By the end of Week 7, a student should be able to trace an HTTP request from a client to a middleware and route, validate untrusted inputs, implement RESTful CRUD and error responses, run actual Node tests, and **predict the empty task list after server restart**. They must demonstrate real local evidence and independently fix an unfamiliar backend bug.

**Exact intended API contract:**

| Method | Endpoint | Successful result | Relevant failures |
|---|---|---|---|
| GET | `/api/health` | 200 status metadata including `storage: "memory"` | Backend process offline is a *network failure*, not a JSON 404 |
| GET | `/api/tasks` | 200 `{data:[],count:0}` initially; `?completed=true/false` | 400 invalid filter |
| GET | `/api/tasks/:id` | 200 `{data: task}` | 400 malformed ID; 404 missing valid ID |
| POST | `/api/tasks` | 201 `{data: task}` and `Location: /api/tasks/:id` | 400 invalid body or malformed JSON |
| PATCH | `/api/tasks/:id` | 200 updated `{data: task}` | 400 invalid ID/body; 404 missing valid ID |
| DELETE | `/api/tasks/:id` | **204 with no body** | 400 invalid ID; 404 missing valid ID |

**Input contract:** POST accepts only `{title: string}` with trimmed title length **1–80**; PATCH accepts `title`, `completed`, or both, requires at least one field, and `completed` must be a real boolean. Unknown keys are rejected. Path IDs are positive safe integers; `completed` query filter is absent/`"true"`/`"false"`. Standard JSON error envelope is `{error:{code,message}}`; unexpected errors do not expose server internals. A request body above the configured JSON limit may return 413. No login/database/production deployment claim is made.

## 2. Prerequisites, student setup and study order

- Student should have passed the **actual Week 6** readiness/project gate before this week unlocks. Planning approval A-007 is not proof that the student's Week 6 local project was completed.
- Node.js and npm from a **currently supported LTS** version per official documentation at implementation time; source guide's `backend/package.json` uses ESM and the built-in `node:test` runner. VS Code, local terminal, free npm access for Express, and a free HTTP client/`curl` or REST Client extension.
- Keep an untouched Git checkpoint of the student's own Week 6 frontend; do not overwrite it with instructor reference code. `backend/` is introduced separately. Use port 3001 for learning and an optional Vite proxy from the frontend's development port.
- Do not download real credentials; use invented task titles. Internet access is needed initially to install npm packages, but Fieldbook quiz/isolated JS exercises stay offline-capable.
- Linear lesson progression `p1-w07-l01` through `p1-w07-l12`, with independent optional enrichment. Concept recall from Week 4 HTTP/fetch and Week 6 API handling can be reviewed without bypassing prerequisites.

**Learning note:** the learner may view/recall older lessons, but cannot advance past incomplete Week 7 required checkpoints merely by reading ahead or pasting an HTTP response into a form.

## 3. Lesson sequence, expected effort and checkpoint allocation

| Lesson | Student-facing title | Source | Required checks | Suggested effort |
|---|---|---|---|---|
| `p1-w07-l01` | Node.js runtime, npm and ESM foundations | C01–C05 | 2 | 25–40 |
| `p1-w07-l02` | HTTP messages and REST endpoint contracts | C06 | 1 | 20–35 |
| `p1-w07-l03` | Express app, health route and route order | C07,C14 | 2 | 25–40 |
| `p1-w07-l04` | Middleware, JSON parsing and safe error responses | C08,C14 | 2 | 25–45 |
| `p1-w07-l05` | GET collections, query filters and path IDs | C09 | 2 | 30–45 |
| `p1-w07-l06` | In-memory repository, stable IDs and data lifecycle | C10 | 2 | 25–45 |
| `p1-w07-l07` | Validate task bodies, IDs and filters at the boundary | C11 | 2 | 30–50 |
| `p1-w07-l08` | POST creation, status 201 and Location | C12 | 2 | 25–40 |
| `p1-w07-l09` | PATCH, DELETE, 204 and missing-resource handling | C13,C14 | 2 | 30–50 |
| `p1-w07-l10` | Manual HTTP tools, repeatable API tests and debugging | C15,C16,C23 | 2 | 30–50 |
| `p1-w07-l11` | Read-only React API lab, layered debugging and AI review | C03,C17–C19 | 2 | 30–50 |
| `p1-w07-l12` | Week 7 API v1 capstone, independent debugging and Week 8 readiness | C01–C03,C20–C27 | 3 | 90–150+ for independent project |

**27 unique checkpoint IDs:** **24 required** = **12 `quiz-auto` sets (66 planned scored-question slots), 2 `browser-code-auto` pure-JS suites, and 10 `local-project-self-verified` local attestations**; **3 `optional-enrichment`**. Quiz banks, runnable browser test harnesses and learner-pilot results **have not been authored or executed**. This is a planned contract and is not a guarantee of local test results.

**DEC-21 mastery:** each scored quiz passes at least `ceil(0.8 × scored item count)` and all specifically flagged essential questions; every mandatory browser test passes; local project gates require running actual local commands and recording bounded honest evidence. Required lessons + weekly local project + readiness quiz + independent debugging gate unlock Week 8. Unlimited retries with conceptual feedback. Display completion as **“Includes self-verified work.”**

## 4. Lesson-by-lesson authoring contract

For each lesson, an eventual author must supply a beginner-friendly explanation (why/how/when), one or two validated worked examples, a novel practice scenario, common mistake + root-cause feedback, progressive hint ladder, alternate retry questions, and exact acceptance/tests. The specifications below are **not final ready-to-publish learner content**. Source references and private reference code inform authoring but must never be packaged wholesale into public UI assets.

### L01 — Node.js runtime, npm and ESM foundations (`p1-w07-l01`)

**Original source:** C01–C05. **Prerequisite:** Week 6 graduated. **Suggested effort:** 25–40 (not a time gate).

**Observable objectives:**
- Distinguish a browser JavaScript runtime from a Node.js process.
- Use Node/npm and explain what scripts, modules and dependencies do.
- Prepare a separate `backend/` workspace without overwriting the Week 6 frontend.

**Teach the mental model:** One language can run in different environments. Node handles server-side processes and the network; React still runs in the browser. A development server is a **running process**, not a saved HTML file.

**Worked-example specification:**

```text
node --version
npm --version
node hello.mjs
# Expect a console result from Node; document is unavailable here
```

**Independent practice:** Predict `document.querySelector()` in Node, explain the purpose of `package.json`, start the backend starter, and record the actual terminal output.

**Common misconception + feedback:** Running `npm` from the wrong directory; assuming browser globals exist in Node; copying package install commands without reading their effects.

**Three-level hint ladder:**
1. Which environment supplies the `document` global?
2. Where is the `backend/package.json` file?
3. Use `node --version`, then run npm commands from `backend/` and inspect the scripts.

**DEC-21 checkpoints:**
- `p1-w07-l01-c01` — **quiz-auto**, required: Node/npm/ESM and browser/runtime differences.
- `p1-w07-l01-c02` — **local-project-self-verified**, required: Node/npm setup, backend folder and ESM execution.

### L02 — HTTP messages and REST endpoint contracts (`p1-w07-l02`)

**Original source:** C06. **Prerequisite:** `p1-w07-l01` graduated. **Suggested effort:** 20–35 (not a time gate).

**Observable objectives:**
- Identify method, path, headers, body, status, and response data in a request.
- Predict expected statuses for GET, POST, PATCH and DELETE.
- Explain why an empty GET success and an HTTP failure are different.

**Teach the mental model:** HTTP is the agreed language spoken between clients and servers. The response includes a status and may include a body; HTTP status semantics are part of the contract.

**Worked-example specification:**

```text
POST /api/tasks HTTP/1.1
Content-Type: application/json

{"title":"Revise JavaScript"}

HTTP/1.1 201 Created
Location: /api/tasks/1
```

**Independent practice:** Match six requests to methods, statuses, expected bodies and failure meanings. Describe the difference between 400 for a malformed ID and 404 for a missing valid ID.

**Common misconception + feedback:** Assuming a GET returns 201, a DELETE 204 returns JSON, or that a 404 means the server did not respond.

**Three-level hint ladder:**
1. Is the server creating or reading a resource?
2. Does the response contain a body?
3. Compare the 200, 201, 204, 400 and 404 contract table.

**DEC-21 checkpoints:**
- `p1-w07-l02-c01` — **quiz-auto**, required: Methods, headers, response codes and empty-versus-error.

### L03 — Express app, health route and route order (`p1-w07-l03`)

**Original source:** C07,C14. **Prerequisite:** `p1-w07-l02` graduated. **Suggested effort:** 25–40 (not a time gate).

**Observable objectives:**
- Explain the responsibilities of `req`, `res` and `app.listen`.
- Run a health route and distinguish known/missing routes.
- Place the catch-all 404 handler after the specific routes.

**Teach the mental model:** An Express route maps a particular method/path to a handler; registering a function does not make the server listen until its process starts.

**Worked-example specification:**

```text
GET /api/health  ->  200 {"status":"ok","storage":"memory"}
GET /api/banana  ->  404 {"error":{...}}
```

**Independent practice:** Start the local backend; inspect `/api/health` and `/api/banana`; move a catch-all 404 handler ahead of the health route in a disposable branch and diagnose the failure.

**Common misconception + feedback:** Putting the catch-all first; responding twice; forgetting to start the listener; confusing a real HTTP 404 with no network connection.

**Three-level hint ladder:**
1. Did the request reach the correct process and port?
2. Which handler matches first?
3. Compare route order before and after the change.

**DEC-21 checkpoints:**
- `p1-w07-l03-c01` — **quiz-auto**, required: Express req/res, listen and route precedence.
- `p1-w07-l03-c02` — **local-project-self-verified**, required: Run health 200, unknown route 404 and route-order diagnosis.

**Verification honesty:** actual Node process, Express routes, network requests, npm tests, Vite and React are executed **on the learner machine**; record evidence as `local-project-self-verified` and do not mark them auto-passed.

### L04 — Middleware, JSON parsing and safe error responses (`p1-w07-l04`)

**Original source:** C08,C14. **Prerequisite:** `p1-w07-l03` graduated. **Suggested effort:** 25–45 (not a time gate).

**Observable objectives:**
- Trace a request through middleware, handler and response.
- Explain `next()`, JSON parsing and content-type assumptions.
- Diagnose malformed JSON and unexpected errors without exposing stack traces.

**Teach the mental model:** Middleware is a pipeline with order. JSON parsing is not magic; missing/invalid bodies need explicit handling before reading properties.

**Worked-example specification:**

```text
Request -> logger -> express.json({limit:"16kb"}) -> matching route -> JSON response
Malformed JSON -> error middleware -> 400 INVALID_JSON
```

**Independent practice:** Trace three middleware orders; run malformed JSON request locally and record status/error shape; explain what happens if `next()` is omitted.

**Common misconception + feedback:** Reading `req.body.title` when `req.body` is undefined; putting JSON parser after routes; calling `next()` after ending a response.

**Three-level hint ladder:**
1. Where does `req.body` come from?
2. Does middleware continue or send a response?
3. Compare parser and error-handler placement.

**DEC-21 checkpoints:**
- `p1-w07-l04-c01` — **quiz-auto**, required: Middleware ordering, next(), JSON parser and safe errors.
- `p1-w07-l04-c02` — **local-project-self-verified**, required: Reproduce malformed JSON 400 and middleware order locally.

**Verification honesty:** actual Node process, Express routes, network requests, npm tests, Vite and React are executed **on the learner machine**; record evidence as `local-project-self-verified` and do not mark them auto-passed.

### L05 — GET collections, query filters and path IDs (`p1-w07-l05`)

**Original source:** C09. **Prerequisite:** `p1-w07-l04` graduated. **Suggested effort:** 30–45 (not a time gate).

**Observable objectives:**
- Distinguish path parameters, query strings and request body.
- Interpret string query values as validated filters, not booleans by coercion.
- Return 400 for invalid IDs/filters and 404 for valid missing resources.

**Teach the mental model:** URLs contain strings. A backend must parse the client inputs explicitly before it uses them to select data.

**Worked-example specification:**

```text
GET /api/tasks?completed=false -> validated filter false
GET /api/tasks/7 -> path id "7" -> numeric ID 7
GET /api/tasks/banana -> 400; GET /api/tasks/999 -> 404
```

**Independent practice:** Implement or repair GET list and by-ID endpoints in the local starter; test absent/true/false/invalid filters and a missing ID; narrate `Boolean("false")`.

**Common misconception + feedback:** Coercing nonempty strings with `Boolean`; returning 404 for a malformed ID; treating an empty filtered list as a server error.

**Three-level hint ladder:**
1. What type is `req.query.completed`?
2. Separate parsing from the store lookup.
3. Try the literal strings "true", "false" and "maybe".

**DEC-21 checkpoints:**
- `p1-w07-l05-c01` — **quiz-auto**, required: req.params, req.query, completed filter and 400/404.
- `p1-w07-l05-c02` — **local-project-self-verified**, required: GET list, query filters, IDs and missing-resource API tests.

**Verification honesty:** actual Node process, Express routes, network requests, npm tests, Vite and React are executed **on the learner machine**; record evidence as `local-project-self-verified` and do not mark them auto-passed.

### L06 — In-memory repository, stable IDs and data lifecycle (`p1-w07-l06`)

**Original source:** C10. **Prerequisite:** `p1-w07-l05` graduated. **Suggested effort:** 25–45 (not a time gate).

**Observable objectives:**
- Implement `list/get/create/update/remove` in plain JavaScript.
- Preserve stable IDs across deletions and return copies of stored objects.
- Predict exactly why tasks vanish after server restart.

**Teach the mental model:** Express transports the request, while a plain JavaScript repository owns task state. Process memory is temporary; a database arrives only in Week 9.

**Worked-example specification:**

```text
Create A -> ID 1; create B -> ID 2; delete A; create C -> ID 3
Start new Node process -> store returns []
```

**Independent practice:** Implement a pure `createTaskStore()` helper in the isolated browser JS lab, then compare it with the separate real backend implementation and its unit tests.

**Common misconception + feedback:** Using `tasks.length+1` as ID, returning internal object references, or claiming server memory survives restart.

**Three-level hint ladder:**
1. What happens when an earlier task is deleted?
2. Which value must increase monotonically?
3. Return a copied task and test whether callers can mutate the store through a reference.

**DEC-21 checkpoints:**
- `p1-w07-l06-c01` — **browser-code-auto**, required: Plain JS task-store ID lifecycle, copying and memory semantics.
- `p1-w07-l06-c02` — **quiz-auto**, required: Repository separation, ID collisions and process reset.

**Sandbox boundary:** auto-evaluate only the plain-JS, dependency-free store API. Never claim the browser runner has started Express or tested HTTP.

### L07 — Validate task bodies, IDs and filters at the boundary (`p1-w07-l07`)

**Original source:** C11. **Prerequisite:** `p1-w07-l06` graduated. **Suggested effort:** 30–50 (not a time gate).

**Observable objectives:**
- Validate exact body shape and trimmed title length 1–80.
- Distinguish absent `completed` from the boolean false during PATCH.
- Reject unknown fields, malformed IDs and bad filters without mutation.

**Teach the mental model:** Every HTTP input is untrusted even if React sends it. Validation belongs on the backend and cannot be delegated to a frontend form.

**Worked-example specification:**

```text
POST {"title":"  Read  "} -> title "Read"
PATCH {"completed":false} -> valid
PATCH {"completed":"false"} -> 400
POST {"title":"X","id":9} -> 400
```

**Independent practice:** In an isolated JS lab, implement `validateCreateBody`, `validatePatchBody`, `parseTaskId` and `parseCompletedFilter` against a behavior-first test contract.

**Common misconception + feedback:** Using truthiness to test `completed`, allowing IDs and admin-like fields in create, accepting whitespace-only titles or arrays as objects.

**Three-level hint ladder:**
1. What does `Object.hasOwn()` distinguish?
2. Check types and allowed keys before trimming.
3. Check boundary cases at 0, 1, 80 and 81 trimmed characters.

**DEC-21 checkpoints:**
- `p1-w07-l07-c01` — **browser-code-auto**, required: Plain JS create/patch validation and path/query parser suite.
- `p1-w07-l07-c02` — **quiz-auto**, required: Untrusted bodies, 1–80 trimmed titles, `completed:false` and unknown fields.

**Sandbox boundary:** auto-evaluate dependency-free validation/parser functions against deterministic fixtures. The learner must separately place them into their real Express server.

### L08 — POST creation, status 201 and Location (`p1-w07-l08`)

**Original source:** C12. **Prerequisite:** `p1-w07-l07` graduated. **Suggested effort:** 25–40 (not a time gate).

**Observable objectives:**
- Implement creation that validates before changing store state.
- Return HTTP 201 with new task data and a resource Location.
- Verify invalid inputs do not create records.

**Teach the mental model:** Creating a resource is more than pushing into an array. It has a contract: validate, create once, return the resource, and identify where it lives.

**Worked-example specification:**

```text
POST /api/tasks with {"title":" Revise HTTP "}
201 Created | Location: /api/tasks/1
{"data":{"id":1,"title":"Revise HTTP","completed":false,...}}
```

**Independent practice:** Implement POST in real Express project; send valid and invalid JSON through an HTTP client; inspect status, Location and task count before/after failures.

**Common misconception + feedback:** Accepting client IDs, returning 200 by default, not trimming, or reporting success while mutating despite validation failure.

**Three-level hint ladder:**
1. What status means Created?
2. Which side owns the ID and timestamp?
3. Does an invalid POST alter `GET /api/tasks`?

**DEC-21 checkpoints:**
- `p1-w07-l08-c01` — **quiz-auto**, required: POST, 201 Created, Location and validation order.
- `p1-w07-l08-c02` — **local-project-self-verified**, required: Real Express POST 201+Location, invalid body 400, no data corruption.

**Verification honesty:** actual Node process, Express routes, network requests, npm tests, Vite and React are executed **on the learner machine**; record evidence as `local-project-self-verified` and do not mark them auto-passed.

### L09 — PATCH, DELETE, 204 and missing-resource handling (`p1-w07-l09`)

**Original source:** C13,C14. **Prerequisite:** `p1-w07-l08` graduated. **Suggested effort:** 30–50 (not a time gate).

**Observable objectives:**
- Update only provided fields, including `completed:false`.
- Return 404 for a valid missing resource; return 400 for an invalid ID/body.
- Delete with 204 and no response body; explain no JSON parsing on 204.

**Teach the mental model:** Updating is a partial change with explicit field presence. Deleting a resource can succeed without returning any JSON.

**Worked-example specification:**

```text
PATCH /api/tasks/1 {"completed":false} -> 200 updated JSON
DELETE /api/tasks/1 -> 204 with EMPTY body
DELETE /api/tasks/999 -> 404 JSON error
```

**Independent practice:** Run PATCH/DELETE tests, demonstrate false-value update, invalid/unknown resource cases, and confirm an empty 204 response body.

**Common misconception + feedback:** `if (body.completed)` silently ignores false; returning 204 with a JSON expectation; using the wrong status for missing IDs.

**Three-level hint ladder:**
1. Is the property present even when its value is false?
2. Does HTTP 204 promise a response body?
3. Check parsing success before store lookup.

**DEC-21 checkpoints:**
- `p1-w07-l09-c01` — **quiz-auto**, required: PATCH field presence, DELETE empty 204, invalid 400/missing 404.
- `p1-w07-l09-c02` — **local-project-self-verified**, required: Real Express PATCH/DELETE and 204 no-body edge cases.

**Verification honesty:** actual Node process, Express routes, network requests, npm tests, Vite and React are executed **on the learner machine**; record evidence as `local-project-self-verified` and do not mark them auto-passed.

### L10 — Manual HTTP tools, repeatable API tests and debugging (`p1-w07-l10`)

**Original source:** C15,C16,C23. **Prerequisite:** `p1-w07-l09` graduated. **Suggested effort:** 30–50 (not a time gate).

**Observable objectives:**
- Send real GET/POST/PATCH/DELETE requests with headers and body.
- Distinguish pure-function/store tests from HTTP integration tests.
- Use isolated server ports and fix regressions based on a failing assertion.

**Teach the mental model:** Manual inspection validates one scenario; repeatable tests protect behavior across changes. A green test run only proves the tested assertions.

**Worked-example specification:**

```text
npm test  # backend node:test suites; run in backend/
GET health 200; POST 201+Location; PATCH 200; DELETE 204 empty
```

**Independent practice:** Run the backend tests locally, record actual counts and any failures, then intentionally break/repair one behavior and rerun tests. Inspect both pure and HTTP tests.

**Common misconception + feedback:** Counting untouched frontend tests as backend passes, assuming local project tests are auto-graded by Fieldbook, or leaving a test server listening.

**Three-level hint ladder:**
1. Which test failed and which layer does it exercise?
2. Inspect the actual method/path/header/body.
3. Make the smallest fix and rerun just the relevant test, then the suite.

**DEC-21 checkpoints:**
- `p1-w07-l10-c01` — **local-project-self-verified**, required: Manual HTTP checks, node:test pure + HTTP suites and regression repair.
- `p1-w07-l10-c02` — **quiz-auto**, required: Manual vs integration testing, isolated stores and test limits.

**Verification honesty:** actual Node process, Express routes, network requests, npm tests, Vite and React are executed **on the learner machine**; record evidence as `local-project-self-verified` and do not mark them auto-passed.

### L11 — Read-only React API lab, layered debugging and AI review (`p1-w07-l11`)

**Original source:** C03,C17–C19. **Prerequisite:** `p1-w07-l10` graduated. **Suggested effort:** 30–50 (not a time gate).

**Observable objectives:**
- Describe two simultaneous data stores: browser tasks and Node-memory tasks.
- Configure a Vite development proxy and verify read-only health/task GETs.
- Diagnose offline/proxy/backend failures and review AI-generated changes without blind acceptance.

**Teach the mental model:** Two processes on the same laptop still communicate over HTTP. A proxy simplifies development routing but is not a database, authentication or deployment strategy.

**Worked-example specification:**

```text
React /server page -> fetch("/api/health") -> Vite proxy -> Express :3001
React /tasks page -> browser localStorage (NOT new API writes)
```

**Independent practice:** Start two terminals, open `/server`, inspect Network GETs, stop backend and explain the failure; review a small AI-suggested patch by checking the diff and tests.

**Common misconception + feedback:** Changing all React CRUD calls in Week 7, treating CORS/proxy as authorization, or assuming backend tasks persist after Node restarts.

**Three-level hint ladder:**
1. Which program actually owns this task list?
2. What does the Vite proxy forward?
3. Check both terminal ports and the request path before editing UI state.

**DEC-21 checkpoints:**
- `p1-w07-l11-c01` — **local-project-self-verified**, required: Read-only `/server` React API lab, proxy and failure isolation.
- `p1-w07-l11-c02` — **quiz-auto**, required: Browser localStorage vs Node memory, proxy and AI diff review.
- `p1-w07-l11-c03` — **optional-enrichment**, optional: Optional one-file AI-assisted API doc/test improvement.

**Verification honesty:** actual Node process, Express routes, network requests, npm tests, Vite and React are executed **on the learner machine**; record evidence as `local-project-self-verified` and do not mark them auto-passed.

### L12 — Week 7 API v1 capstone, independent debugging and Week 8 readiness (`p1-w07-l12`)

**Original source:** C01–C03,C20–C27. **Prerequisite:** `p1-w07-l11` graduated. **Suggested effort:** 90–150+ for independent project (not a time gate).

**Observable objectives:**
- Deliver a real in-memory Express CRUD API with meaningful status codes.
- Demonstrate and report local test evidence including restart behavior.
- Debug a novel API defect independently and explain the request lifecycle.

**Teach the mental model:** A backend is correct only when its contract survives real requests and relevant tests—not because a route looks plausible in a code editor.

**Worked-example specification:**

```text
Client HTTP -> logging + JSON parser -> route -> validation -> memory store -> status + JSON/204
Restart server -> GET /api/tasks => []
```

**Independent practice:** Finish the Week 7 backend starter and read-only React lab, then execute the seven-step contract check and a novel debugging challenge without AI; give a short architectural explanation.

**Common misconception + feedback:** Presenting a memory backend as persistent, claiming self-reported tests as Fieldbook-verified, or postponing invalid-input/error cases until after graduation.

**Three-level hint ladder:**
1. Start at health: is the process actually available?
2. Check request method and parser before the route.
3. Verify the store and status codes with manual requests and node:test.

**DEC-21 checkpoints:**
- `p1-w07-l12-c01` — **local-project-self-verified**, required: Complete Express API v1 local contract and test evidence.
- `p1-w07-l12-c02` — **quiz-auto**, required: 10-question Week 7 readiness assessment.
- `p1-w07-l12-c03` — **local-project-self-verified**, required: Independent no-AI unfamiliar backend bug repair and explanation.
- `p1-w07-l12-c04` — **optional-enrichment**, optional: Optional pagination/validation robustness extension.
- `p1-w07-l12-c05` — **optional-enrichment**, optional: Optional improve API documentation or HTTP test cases.

**Verification honesty:** actual Node process, Express routes, network requests, npm tests, Vite and React are executed **on the learner machine**; record evidence as `local-project-self-verified` and do not mark them auto-passed.

## 5. Cross-lesson progression and mastery gate

- `L01` requires Week 6 actual graduation; `L02…L12` form an explicit prerequisite chain. Do not infer it from display order alone.
- `L06` and `L07` include isolated **plain-JS** functional suites; none of the other Node/Express/React work is browser-graded. Local tasks are student-run and self-attested. Do not let learner code run in Fieldbook's trusted origin or access Fieldbook progress storage.
- The course platform itself never runs Express, `npm install`, CLI scripts, HTTP tests, or a real local server on the learner's behalf. Instructions are copyable, with Windows-friendly notes.
- `L12` week graduation: all previous required checkpoints, `l12-c01` full project verification, `l12-c02` readiness assessment (10 scored questions; 8 correct plus essential), and `l12-c03` an independent no-AI bug reproduction/fix explanation. L12 optional checks `c04`/`c05` never affect unlocking.
- Reset/backups and imported progress follow `docs/learning/MASTERY_RULES.md` and `docs/data/LOCAL_PROGRESS_SPEC.md`. Untrusted imported `unlocked` flags cannot bypass computed requirements. Optional enrichment never changes completion denominator.

## 6. Required local project acceptance checklist (learner attestation)

The exact instructions/expected outputs must be reproduced from the verified starter/reference at D7 authoring time. Before marking `L12-C01` self-verified, the student must attest to having **actually run**:

1. `node --version`, `npm --version`, a backend `npm install`, and `npm run dev` in **backend/**; record actual versions, avoiding passwords/tokens.
2. `GET /api/health` 200 with `storage:"memory"`, and unknown `/api/banana` 404 JSON error.
3. `GET /api/tasks` empty 200 `{data:[],count:0}` before adding tasks, `?completed=true/false` filtered results; invalid `?completed=maybe` 400.
4. `POST /api/tasks` valid 201 with `Location` and trimmed title; invalid, extra-key, and blank titles 400 with **no unintended create**.
5. `GET /api/tasks/:id` 200 for existing, 400 for malformed ID, 404 for a well-formed missing ID.
6. `PATCH` title and `completed:true/false` (ensure false is not ignored), reject unknown keys and invalid value types.
7. `DELETE` existing returns **204 with no body**; deleting missing returns 404; unknown route returns 404.
8. `npm test` for pure store/validation plus real HTTP integration suites: record **actual** observed results and investigate any failures; do not claim the source's historical test-case counts are automatically reproduced.
9. Restart the backend process and confirm its **in-memory tasks reset**; recognize Week 9 will address persistence.
10. Two separate terminals for React frontend + Express backend; `/server` API Lab performs read-only GETs. Existing `/tasks` React browser-storage operations remain separate. Stop backend and observe honest error UI.
11. Explain one complete request lifecycle, identify where an invalid input is rejected, and record a short independent bug-fix explanation without AI.

**Evidence kept in Fieldbook:** learner-confirmed command/checklist items + bounded short explanation + optional concise test-result summary; **no** pasted raw logs with secrets, passwords, environment variables or private data. Student-facing label: **Self-verified locally**. Separate the project's data from Fieldbook's own progress keys. This checklist is a contract; the learning platform cannot validate it automatically.

## 7. Questions, misconceptions, teaching guidance and offline fallback

- **HTTP status essentials:** quiz items must assess 200 vs 201 vs 204, 400 vs 404, validation before mutation and 204 empty response. Essential flags are *candidates* until question banks receive technical/educational review.
- **Memory illusion:** task storage in process memory is not `localStorage` and not PostgreSQL. Ask what is lost after Node restart and why.
- **False boolean trap:** PATCH `{completed:false}` is valid; checking only a truthy value is incorrect. Browser code cases must include false explicitly.
- **Real test scope:** `node:test` pure tests exercise helpers; HTTP integration tests exercise Express routes with `app.listen(0)` on a temporary local port, requiring installed dependencies.
- **Failure recovery:** if npm is temporarily offline, students can complete bundled explanations/quizzes and the two pure-JS sandbox suites, but must still perform real local backend checks before Week 7 graduation; offer troubleshooting and resume later without a hidden paid service requirement.
- **AI use:** optional tutor, debugging or diff-review prompts, never compulsory and never a substitute for proving behavior. User-supplied terminal commands must be inspected before running them.
- **Safe content boundary:** complete reference source, teacher answers and instructor grading rubric stay in the private source materials. Public exercises can show *partial examples*, precise acceptance criteria and feedback; don't ship completed answer keys in accessible lesson assets.

## 8. Future D7 learner-pilot validation plan

See `docs/quality/WEEK07_PILOT_PROTOCOL.md` for precise learner tasks, observed evidence, failure scenarios, accessibility/terminal considerations, and an actual signoff sheet. A self-paced beginner should be able to complete the API with at most on-demand documentation and hints, **without a teacher building routes on their behalf**. The protocol has **not** run.

## 9. Instructor source and next-week transition

- Original: `fullstack-fieldbook-source-materials/phase1/week-07/instructor-guide-source.md` (C01–C27) and `code-starter-and-reference.zip` (68 entries: top-level README 1, starter 33, reference 34), stored privately next to repo.
- Week 7 starter: `starter/backend/` and `starter/frontend/` (previous Week 6 React compatibility bridge). Private solution: `reference-solution/backend/` and `reference-solution/frontend/`. Keep reference out of public assets.
- Week 8 begins actual React CRUD API integration, frontend/backend validation alignment (e.g. React title up to 100 vs API 80), and client error/retry handling. Week 9 introduces PostgreSQL; not part of Week 7 graduation.

## 10. Owner review checklist — Week 7 structural approval, NOT code authorization

- [ ] Accept twelve lesson IDs/titles and linear prerequisites; Week 6 actual graduation remains entry gate.
- [ ] Accept 27 proposed checks: 24 required (12 quiz / 2 pure JS browser / 10 real local), 3 optional.
- [ ] Accept true backend validation, 400/404/201/204 contract and in-memory restart limitation as required concepts.
- [ ] Accept local self-verification with no fabricated auto-grading of Express/npm/React.
- [ ] Accept read-only React `/server` lab, separate browser task store, Week 8 full integration handoff.
- [ ] Retain DEC-21 quiz threshold/retries and D7 pilot as future work, not passed tests.

**Current status: Week 7 planning structure owner-approved A-008; finished lessons, runnable tests and learner pilot remain pending. D0/D1 signoff and D2 implementation are NOT authorized.**
