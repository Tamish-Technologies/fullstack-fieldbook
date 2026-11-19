import type { Reading } from './week-one'

const lessons: Reading[] = [
  {
    minutes: '30–45',
    goals: [
      'Run an ES module in Node and identify its runtime.',
      'Set up the local backend beside the React project.',
    ],
    heading: 'Give the server its own process',
    explanation: [
      'In Week 6 Vite served the files, and the browser executed React. In Week 7 a second Node process executes your API code and responds to HTTP requests. Node runs JavaScript without a browser document. It can listen on a port and read process.env. It cannot see a browser tab’s localStorage. React still runs in the browser and talks to the API using HTTP.',
      'Extract the starter into a new folder with backend and frontend next to each other. Keep your Week 6 project as a separate copy. Open a terminal in backend and verify Node and npm. Use Node 24, or a compatible version at least 22.12. npm ci installs the versions in that folder’s lockfile. The first install needs the package registry or a populated npm cache. Inspect package.json before running a script. npm runs the command under scripts, and Node runs the resulting program.',
      'ES modules use import and export. The starter’s package.json sets type to module so Node treats its .js files as ES modules. A .mjs file is an ES module independently of that setting. Use ./ and the file extension when importing nearby modules. src/app.js creates the Express app; src/server.js calls listen and keeps the process alive until you stop it.',
    ],
    predict:
      'What prints from this file when Node runs it? Will the process keep running afterwards?',
    example:
      '/* backend/hello.mjs */\nimport { platform } from "node:os";\nconsole.log(platform(), typeof document);',
    result:
      'It prints the current operating system identifier and undefined. The script exits when its work is done. The API server stays running because it is listening for requests.',
    followUp: {
      title: 'Run from the backend directory',
      example:
        'cd backend\nnode --version\nnpm --version\nnpm ci\nnode hello.mjs',
      reasoning:
        'Create hello.mjs beside the backend package.json using the worked example. If npm cannot find package.json, return to the extracted folder and enter backend. If the registry is unavailable, try npm ci --offline only if the packages are cached. You can continue the readings while an install is blocked.',
    },
    exercise:
      'Download the starter, set up backend, run hello.mjs and record what you saw. Keep the frontend folder intact. If using Git, initialize a new repo in the extracted parent folder and commit a local baseline before edits.',
    hints: [
      'Check node --version before running npm.',
      'Find backend/package.json and its scripts.',
      'The output of typeof document identifies which runtime ran the file.',
    ],
    mistake:
      'Running backend commands in the frontend folder can start the wrong process. Check the package name and terminal directory first.',
    takeaway:
      'The browser and Node run distinct JavaScript programs with distinct data and lifetimes.',
  },
  {
    minutes: '20–35',
    goals: [
      'Read a method, path, header and body as separate parts of a request.',
      'Predict the response contract for task operations.',
    ],
    heading: 'Read the request and response before writing a route',
    explanation: [
      'The client sends a method and path. GET retrieves data; POST to the collection creates a task; PATCH on an individual path changes supplied fields; DELETE removes an individual record. Headers carry metadata. Content-Type: application/json tells a parser how to interpret a JSON body. The path and verb together select the handler.',
      'A response has a status, headers and sometimes a body. A successful lookup returns 200 and JSON. Creation returns 201 and a Location header pointing to the new resource. A successful delete returns 204 with an empty body. A malformed input is 400. A valid ID whose resource is absent is 404. A failed connection yields no HTTP response, so the client cannot read a status or body.',
      'Your Week 7 API returns {data, count} for a list, {data} for one record, and {error:{code,message}} for handled failures. The requester can use the stable error code, and the human can read the message.',
    ],
    predict:
      'A POST sends this JSON to /api/tasks. What is the successful status, and what does its Location header identify?',
    example:
      'POST /api/tasks HTTP/1.1\nHost: 127.0.0.1:3001\nContent-Type: application/json\n\n{"title":"Read the API contract"}',
    result:
      '201 Created. For the first task Location is /api/tasks/1. The body includes the server-generated record, so the caller need not invent its ID.',
    exercise:
      'Open backend/API_REQUESTS.http in your editor. Match each request to its intended status and body. Annotate one example of a 400 and one example of a 404. You will send these requests once the handlers are present.',
    hints: [
      'Start with the method and path.',
      'Check whether the body type matches the header.',
      'Predict whether the server can identify an existing resource from the input.',
    ],
    mistake:
      'Trying to decode a DELETE 204 with response.json() fails even though the deletion succeeded.',
    takeaway:
      'The status, headers and body together describe the result of a particular request.',
  },
  {
    minutes: '25–40',
    goals: [
      'Run the Express starter and observe its real HTTP responses.',
      'Reproduce and fix a route-order problem.',
    ],
    heading: 'Start with the health route',
    explanation: [
      'Express receives a request and walks the middleware and route stack in order. app.get registers a callback for a method and path. req represents the input; res sends the response. Return after sending a response from a conditional branch so execution cannot attempt to send another response. A final fall-through handler can return a JSON 404 for unmatched paths.',
      'Start the API with npm run dev in backend. Keep that terminal open. Node watches source files, so saving changes may restart the process and clear the in-memory store. In another terminal use the commands below. The health route returns 200 with status:"ok" and storage:"memory". A request to /api/missing returns a JSON 404 with ROUTE_NOT_FOUND. A connection error means there was no HTTP response. Check the startup terminal and port first.',
    ],
    predict:
      'If you register app.use that always sends 404 before the health route, what will a GET /api/health receive?',
    example:
      'curl -i http://127.0.0.1:3001/api/health\ncurl -i http://127.0.0.1:3001/api/missing',
    result:
      'With the correct order you get 200 and 404 respectively. With an early catch-all, even the health request receives 404. The server is still reachable.',
    exercise:
      'Run both commands. In a disposable copy move the JSON 404 handler above the health route, retest and restore its position. On Windows PowerShell use curl.exe instead of any curl alias. You can also open both GET URLs in the browser and inspect Network for the status.',
    hints: [
      'Look for the listening address printed by npm run dev.',
      'If the port is taken, stop your other practice server before retrying.',
      'Keep the catch-all after all intended routes.',
    ],
    mistake:
      'Starting a second server on the same port cannot replace the first. Requests may still be reaching the older process.',
    takeaway:
      'Verify a reachable server first, then inspect method, path and route order.',
  },
  {
    minutes: '35–50',
    goals: [
      'Place JSON parsing and error middleware in the right order.',
      'Return a safe JSON failure for malformed input.',
    ],
    heading: 'Parse the body before the handler needs it',
    explanation: [
      'Middleware can inspect a request, add information, answer it, or call next() to pass it on. The starter’s logger calls next() and records response status on finish. express.json runs before routes and decodes requests with a JSON content type. A malformed body takes an error path before a successful create handler could run.',
      'The last handler receives four arguments: err, req, res, next. Detect entity.parse.failed and answer 400 with INVALID_JSON. Detect entity.too.large and answer 413 with PAYLOAD_TOO_LARGE. The starter limit is 16kb. For unexpected errors, return a generic 500 and keep body contents, stack traces and paths out of the response. If headers were already sent, delegate with next(err).',
    ],
    predict:
      'A request has Content-Type: application/json and body {"title": with no closing value. Which layer responds?',
    example:
      '// Inside the final four-argument error handler\nif (err.type === "entity.parse.failed") {\n  return res.status(400).json(\n    errorBody("INVALID_JSON", "Request body must be valid JSON.")\n  );\n}',
    result:
      'The parser rejects the body before route matching reaches a success handler. Your error handler sends safe JSON. A syntactically valid body at the unfinished POST path still reaches the ordinary 404 at this stage.',
    followUp: {
      title: 'Send malformed JSON without shell quoting differences',
      example:
        '// backend/check-json.mjs\nconst response = await fetch("http://127.0.0.1:3001/api/tasks", {\n  method: "POST",\n  headers: {"Content-Type": "application/json"},\n  body: String.fromCharCode(123),\n});\nconsole.log(response.status, await response.text());',
      reasoning:
        'Run node check-json.mjs from a second terminal. The body is a single opening brace. Before TODO F the starter reports 500. Add the parser branch, save and expect 400 INVALID_JSON. Change body to JSON.stringify({title:"Practice"}) to confirm it reaches route matching. The create handler arrives in Lesson 8.',
    },
    exercise:
      'Implement TODO F in backend/src/app.js and verify both parser and route paths. Confirm the error response contains a code and message and no stack trace. Optionally send a fictional title of 17,000 characters to exercise the 413 branch.',
    hints: [
      'Keep express.json above both tasks routes and the 404 handler.',
      'A normal request advances with next(); an error advances to error middleware.',
      'Compare the response using a tool that prints the status and body.',
    ],
    mistake:
      'Returning 500 for invalid JSON makes a caller think the server failed internally. The caller can repair a 400 by sending valid JSON.',
    takeaway:
      'Middleware order determines whether a request reaches the route and how failures are reported.',
  },
  {
    minutes: '40–55',
    goals: [
      'Read path parameters and query strings separately.',
      'Verify exact filter parsing and distinguish invalid from absent IDs.',
    ],
    heading: 'Filter a collection or look up one resource',
    explanation: [
      'GET /api/tasks?completed=false supplies a query value. It arrives as a string, so Boolean("false") would incorrectly produce true. Accept exactly "true", "false" or an absent parameter. A repeated value such as completed=true&completed=false may be an array; reject it with 400 INVALID_FILTER.',
      'For /api/tasks/:id, req.params.id is the text in the path. Accept only canonical positive safe decimal integers. That means 7 can pass, while 0, 02, 1.5 and unsafe values fail. Reject malformed text with 400 INVALID_ID before accessing the store. Only then look up the numeric ID. A missing valid ID returns 404 TASK_NOT_FOUND.',
      'Try the GET contract before POST exists using npm run dev:seed in backend. Stop the normal server first. The seeded mode preloads fictional IDs 1 and 2, one completed and one active. Implement the list filter and basic get lookup in task-store.js as needed for this exercise. You will verify copies and ID allocation in Lesson 6 and harden both parsers in Lesson 7.',
    ],
    predict:
      'Which of these requests should return 400, which 404, and which a filtered list?',
    example:
      'GET /api/tasks?completed=false\nGET /api/tasks?completed=maybe\nGET /api/tasks/banana\nGET /api/tasks/999',
    result:
      'The first returns ID 2 with 200 in seeded mode. The middle two return 400 for invalid input. The last is a valid ID whose task is absent, so it returns 404.',
    followUp: {
      title: 'Wire parsed results into the routes',
      example:
        'const filter = parseCompletedFilter(req.query.completed);\nif (!filter.ok) {\n  return res.status(400).json(errorBody("INVALID_FILTER", filter.message));\n}\nconst data = store.list({completed: filter.value});\nreturn res.json({data, count: data.length});',
      reasoning:
        'Use value:null for no filter. In store.list, filter by task.completed === completed only when completed is not null. For a first lookup, find a matching numeric ID and return a copy or null. Keep temporary practice data separate from the default empty server.',
    },
    exercise:
      'Implement TODO A and B and issue the four requests above. Also compare completed=true with the absent filter and /api/tasks/1. Check that the count reflects the returned list. After testing, stop the seeded server.',
    hints: [
      'Work first with the two known fictional records.',
      'Parse params and query before reading the store.',
      'Check equality to false rather than using a truthy-only branch.',
    ],
    mistake:
      'Returning 404 for /api/tasks/banana hides a malformed request. Reject invalid input before the resource lookup.',
    takeaway:
      'Parse boundary values before using them, then report resource existence separately.',
  },
  {
    minutes: '45–60',
    goals: [
      'Build a task store with a stable ID counter and injectable clock.',
      'Verify isolation and copies with an independent store instance.',
    ],
    heading: 'Keep task lifetime separate from HTTP',
    explanation: [
      'The Express app chooses statuses. The store owns records and returns plain values. Each store instance begins with copies of its seed rows. Keep a private counter initialized one above the greatest seed ID. Increment it only when creating. Array length changes after deletion, so it cannot tell you the next unique ID.',
      'Create assigns id, title, completed:false and createdAt from a clock. Update changes only accepted fields. Keep the original id and createdAt. Return null when get or update cannot find the task, and a boolean from remove. List filters by an explicit completed value; null means all. Return copies from get, list, create and update so callers cannot edit saved records by accident.',
      'Store state belongs to one Node process. Restarting the default server constructs a fresh store. In the browser lab, calling the factory again models independent instances only. The local project’s real process restart comes later.',
    ],
    predict:
      'An empty store creates A and B, deletes A, then creates C. Which IDs should B and C have?',
    example:
      'let nextId = initialTasks.reduce((max, row) => Math.max(max, row.id), 0) + 1;\n// Inside create: use nextId, then increment it.\n// Inside list: return copied rows so callers cannot mutate stored objects.',
    result:
      'B keeps ID 2. C receives ID 3 because the counter outlives deleted records. A new empty store has its own counter.',
    exercise:
      'Complete the isolated store lab, then implement the local createTaskStore in backend/src/task-store.js. Run npm test in backend and inspect the store assertions. The HTTP cases still depend on later route work.',
    hints: [
      'Use a let binding for the counter in the factory, outside its returned handlers.',
      'Make update return a constructed copy and use map to replace an internal row.',
      'Try copying a seed row and changing the copy before a second get.',
    ],
    mistake:
      'Returning the stored row itself lets a caller change it without going through update.',
    takeaway:
      'A stable counter and defensive copies keep the store predictable across callers.',
  },
  {
    minutes: '40–55',
    goals: [
      'Allow exact input fields and preserve the meaning of false.',
      'Verify canonical IDs and filters as pure functions.',
    ],
    heading: 'Validate before preparing a mutation',
    explanation: [
      'Treat every JSON body as unknown input. Create accepts an object with only title. Check the type, trim it and require 1–80 characters. The server supplies id, completed and createdAt. Reject arrays, extra fields and invalid lengths. Return a fresh validated value and leave the original input alone.',
      'PATCH accepts title, completed, or both. Reject an empty object or unknown keys. Check field presence using Object.hasOwn and then check its type. A boolean false can be a deliberate update. The string "false" is invalid. To parse a path ID, require a string and a positive safe integer whose canonical decimal representation matches that string. Reject invalid query values with an explicit failure result.',
    ],
    predict:
      'A PATCH body is {completed:false}. Which test identifies whether the client sent completed?',
    example:
      'const supplied = Object.hasOwn(body, "completed");\nif (supplied && typeof body.completed !== "boolean") {\n  return {ok:false, message:"completed must be a boolean."};\n}',
    result:
      'supplied is true even though body.completed is false. Preserve false as an actual update. An omitted completed field leaves the old value alone.',
    exercise:
      'Complete the browser validation lab, then update the four helpers in backend/src/validation.js. Run npm test. Try an 80-character padded title, an 81-character title, a PATCH with false, a repeated filter, and a leading-zero ID. Compare their outcomes before making a store call.',
    hints: [
      'Guard the object shape before Object.keys or Object.hasOwn.',
      'Check allowed keys before constructing the result.',
      'Use Number and String round-trip with Number.isSafeInteger for canonical ID text.',
    ],
    mistake:
      'Spreading req.body into a task lets arbitrary fields overwrite values that belong to the server.',
    takeaway:
      'An explicit allowlist and type checks separate acceptable changes from unauthorised fields.',
  },
  {
    minutes: '30–45',
    goals: [
      'Create a task through the actual HTTP endpoint.',
      'Verify Location and confirm invalid requests leave the count intact.',
    ],
    heading: 'Send a useful response when a task is created',
    explanation: [
      'Register the POST handler above the fall-through 404. Validate req.body and return 400 VALIDATION_ERROR when validation fails. Only call store.create after validation succeeds. Send 201 with Location and a {data:task} JSON response. Location is the lookup path, so make a GET to that path to verify the new resource.',
      'Use valid JSON and the JSON content type. Try padded title, blank title, a number, an overlong title and an extra field. The count changes only for the accepted request. Reuse the title boundary helper from Lesson 7 instead of reimplementing it in the route.',
    ],
    predict:
      'A successful POST creates ID 5. What should its Location contain and how can you confirm it?',
    example:
      'const result = validateCreateBody(req.body);\nif (!result.ok) return res.status(400).json(errorBody("VALIDATION_ERROR", result.message));\nconst task = store.create(result.value);\nreturn res.status(201).location("/api/tasks/" + task.id).json({data:task});',
    result:
      'The header is /api/tasks/5. A GET to that path returns the record. Its trimmed title matches the input and completed is false.',
    exercise:
      'Implement TODO C. Start the normal unseeded API and send a POST from API_REQUESTS.http or adapt the Node request script from Lesson 4 with a JSON.stringify body. Read status and response.headers.get("location"), then GET the path. Compare the list count before and after invalid requests.',
    hints: [
      'express.json must have run before reading req.body.',
      'Return immediately on validation failure.',
      'Build the Location from task.id, which the store allocated.',
    ],
    mistake:
      'Adding a record before checking inputs can corrupt the list even when the client sees a 400.',
    takeaway:
      'Validation happens first and a successful 201 tells the client where the new resource is.',
  },
  {
    minutes: '35–50',
    goals: [
      'Use PATCH for supplied fields and DELETE for removal.',
      'Explain 400, 404 and empty 204 responses with actual requests.',
    ],
    heading: 'Apply a partial change and end a deletion cleanly',
    explanation: [
      'PATCH starts by parsing the path ID. It validates the patch shape before attempting a store update. The store retains omitted fields and applies false when supplied. Return 200 with the updated record. For a valid ID that does not exist after validation, return 404 TASK_NOT_FOUND.',
      'DELETE validates the ID and checks the store’s boolean remove result. A successful removal ends a 204 response without JSON. The caller can check response.status and use response.text() when inspecting the raw body. A second DELETE for the same valid ID returns 404 because the resource has already gone.',
    ],
    predict:
      'The current task has completed:true and a nonempty title. After PATCH {completed:false}, what will a GET return?',
    example:
      'PATCH /api/tasks/1  { "completed": false }\nGET /api/tasks/1\nDELETE /api/tasks/1\nGET /api/tasks/1',
    result:
      'The title stays the same and completed becomes false. DELETE returns 204 with zero bytes, then the matching GET returns 404.',
    exercise:
      'Implement TODO D and E. Start with a valid POST and use its Location for PATCH true, PATCH false, an invalid patch, then DELETE. Check exact status and body. Also test a malformed ID and a valid ID already deleted.',
    hints: [
      'Reuse the same ID parser for all item routes.',
      'A valid patch value contains only the fields you can apply.',
      'Send res.status(204).end() without a JSON body.',
    ],
    mistake:
      'A 204 is success with no content. Attempting JSON decoding hides that success behind a parse error.',
    takeaway:
      'Validate first, change only supplied fields, and match the response body to the status.',
  },
  {
    minutes: '35–50',
    goals: [
      'Read failures from Node tests and distinguish their scope.',
      'Reproduce a real API bug and rerun the same regression.',
    ],
    heading: 'Check the store and the HTTP boundary separately',
    explanation: [
      'A helper test passes input directly to a function. An HTTP integration test starts an Express app, sends a real request and reads status, headers and body. Read backend/tests/API names in the terminal output and open tests/validation.test.mjs or tests/api.test.mjs to match the assertion to the behavior.',
      'The HTTP tests use port 0 so the operating system allocates a free port. Each test creates its own app and store, and closes the listener in finally. It can test mutation without reaching your dev server or depending on a previous test’s data. Run npm test from backend and record observed counts. The original suite has 22 tests. The untouched backend starter has 5 passing and 17 failing tests. Those failures point to unfinished behavior. Focus on the named test and its first expected/actual pair.',
    ],
    predict:
      'The store unit tests pass but a valid POST in an HTTP test returns 404. Which part should you inspect first?',
    example:
      'npm test\n# Focus a case from the backend directory\nnode --test --test-name-pattern="POST creates" tests/api.test.mjs',
    result:
      'Look at route method, path and declaration order. The request may hit the catch-all before it gets to the store.',
    exercise:
      'Use the request file or terminal to exercise one real endpoint, then run both test files through npm test. Reproduce a failure in a disposable copy, for example register the catch-all early, and restore it. Repeat the named regression and the full test command.',
    hints: [
      'Read status, header and body expectations separately.',
      'Check whether the failed test was an HTTP request or a pure helper assertion.',
      'Verify each test owns its own store and listener.',
    ],
    mistake:
      'Pointing integration tests at your existing dev server creates hidden dependencies on its data and port.',
    takeaway:
      'Repeatable tests choose their own setup and verify a specific observable contract.',
  },
  {
    minutes: '45–65',
    goals: [
      'Connect a read-only React page to a real local API.',
      'Diagnose a development proxy failure without changing browser tasks.',
    ],
    heading: 'Connect two running processes through the Vite proxy',
    explanation: [
      'In one terminal run the Express server from backend. In a second, enter frontend, install with npm ci and run npm run dev. Use the frontend address printed by Vite and open /server. Edit src/pages/ServerPage.jsx. This page requests /api/health and /api/tasks. Vite forwards those relative requests to 127.0.0.1:3001. The development proxy only works while that server configuration is running.',
      'Place read requests inside an Effect. Reuse Week 6 cleanup and error handling. Show Loading while pending, Error and Retry on failure, and a distinct empty list or rows on success. Decode only successful responses. The API returns an envelope, so inspect health.status and tasks.data. Check that tasks.data is an array before mapping it. Render titles as text. On Retry change the attempt and cancel obsolete work.',
      'Keep the browser My Tasks page and the read-only Server page separate. Use a terminal POST to make one server row. Browser localStorage and the Node store have different lifetimes. Stop the API, then Retry. The proxy may show an HTTP proxy error. Test the direct health address to tell an unreachable backend from a responding backend with a bad path. Restart the normal unseeded API and watch the server list empty while browser tasks stay.',
    ],
    predict:
      'My Tasks has a browser task and Server shows a different record. What disappears when Node restarts?',
    example:
      'async function readJson(path, signal) {\n  const response = await fetch(path, {signal});\n  if (!response.ok) throw new Error("Request failed: " + response.status);\n  return response.json();\n}\n// Call from an Effect for "/api/health" and "/api/tasks".',
    result:
      'The unseeded server list resets because it lives in Node memory. The localStorage record remains on the same frontend scheme, host and port.',
    exercise:
      'Implement the /server connection and inspect the two GETs in Network. Add a fictional browser task from My Tasks and a different server task from the terminal. Verify success, backend-offline error, recovery after Retry, and an empty backend after restart. If you changed the API port, update the Vite proxy target and restart the frontend.',
    hints: [
      'Confirm the direct health address before debugging React.',
      'Use relative /api URLs in React so the local proxy forwards them.',
      'A proxy error is different from a JSON 404 returned by a reachable Express app.',
    ],
    mistake:
      'Writing the server result into the browser task key loses existing browser work. Keep fetched rows in the Server page’s own state.',
    takeaway:
      'Check the backend, the proxy and then the React view. Each layer has its own evidence.',
    extension:
      'Optional: ask for a one-file improvement to the API README or a test. Review git diff and rerun the affected request. Use fictional data and keep private paths and secrets out of prompts.',
  },
  {
    minutes: '85–135',
    goals: [
      'Demonstrate the local API and its read-only React bridge.',
      'Repair an unfamiliar backend bug and repeat the same regression.',
    ],
    heading: 'Demonstrate the contract from request to response',
    explanation: [
      'Run npm test in backend. In frontend run npm test and npm run build. Start the two development servers and use the read-only API Lab. Start with an empty unseeded API. Demonstrate health, creation with Location, completed and active filters, a partial update containing false and deletion with an empty 204. Compare malformed input with a valid missing ID. Restart Node and verify memory resets without touching browser tasks.',
      'Use the independent-transfer card in a disposable copy. Pick an unfamiliar symptom, reproduce it, identify its cause without AI-generated fixes, make the smallest change and repeat the same request or test. Write down the observed status, body or named assertion instead of pasting logs. Check the actual git diff before accepting the change.',
      'Week 8 will connect React writes to the API. This week proves server behavior with real HTTP checks and a read-only bridge. Fieldbook measures the plain JavaScript exercises and records what you confirm from your own project.',
    ],
    predict:
      'The backend reports 204 and the React client says the delete failed with an unexpected end of JSON input. Which boundary should you inspect?',
    example:
      'Request → parser → validated fields → memory store → status + headers + body\n204 means the last step ends without a JSON value.',
    result:
      'Read the raw response status and text, then inspect the client’s decode step. A correct 204 needs no JSON parse. Keep the server test for the empty body.',
    exercise:
      'Complete the demo, readiness check and independent transfer. Include one unexpected case and the exact regression that distinguishes it. Keep localhost development and fictional data throughout.',
    hints: [
      'Trace the first failing boundary in order.',
      'Record the expected and observed response separately.',
      'After repair, repeat the same request against a fresh local test store.',
    ],
    mistake:
      'Only testing the successful create path misses validation, safe failures, deletion semantics and memory lifetime.',
    takeaway:
      'A working contract is visible in the endpoint, tests and client behavior together.',
    extension:
      'Optional: add documented pagination with bounded inputs, or add one meaningful HTTP regression test and its request example. Keep the required API behavior intact.',
  },
]

export const weekSeven = Object.fromEntries(
  lessons.map((lesson, index) => [
    'p1-w07-l' + String(index + 1).padStart(2, '0'),
    lesson,
  ]),
)
