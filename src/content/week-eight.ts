import type { Reading } from './week-one'

const lessons: Reading[] = [
  {
    minutes: '35–50',
    goals: [
      'Trace a request from React to the Express store and back.',
      'Start both processes and identify which one owns each task list.',
    ],
    heading: 'Connect the Week 7 API to the task screen',
    explanation: [
      'At the end of Week 7, My Tasks saved in the browser, and the separate API Lab read temporary server records. This week you will change My Tasks to read and write through your Express API. React keeps a snapshot for rendering and separate draft text for forms. The Express store owns confirmed task IDs, titles and completion flags. Browser refresh can reload that store while the same Node process is running.',
      'Keep your completed Week 7 project as a separate Git checkpoint. Extract the Week 8 starter alongside it. The starter includes the working Week 7 API and an unfinished frontend API client. Open two terminals, one in backend and one in frontend, each beside its package.json. Use Node 24, or a compatible release at least 22.12. Install from each lockfile with npm ci and run each program with npm run dev.',
      'Use a fresh frontend address or browser profile for this exercise. The old browser task key stays intact during the migration. You will stop reading and writing that key when you switch the shared task owner in Lesson 4. Leave Express running when you refresh React. Restart Express only when testing the memory boundary.',
    ],
    predict:
      'The React process refreshes while Express stays running. Which component can provide the previously created server task?',
    example:
      'React event → task API client → Vite dev proxy\n  → Express handler → in-memory store\n  ← status, headers and JSON (or an empty 204)',
    result:
      'Express can return the task from the same running store. React gets it through a new GET. A Node restart creates an empty store.',
    followUp: {
      title: 'Use two terminals',
      example:
        '# Terminal 1, from the extracted parent folder\ncd backend\nnode --version\nnpm ci\nnpm run dev\n\n# Terminal 2, from the extracted parent folder\ncd frontend\nnpm ci\nnpm run dev',
      reasoning:
        'Leave both processes open. Use the printed frontend address and its API Lab link. Direct GET http://127.0.0.1:3001/api/health reports storage:"memory". Opening /api/health on the frontend address should return the same JSON. If installation is blocked, npm ci --offline can use packages already in the npm cache.',
    },
    exercise:
      'Run both programs. Compare direct and proxied health and inspect the starter’s API Lab and My Tasks separately. Check Git in your Week 7 project before making changes in the Week 8 copy. Sketch where the eventual POST receives its ID.',
    hints: [
      'Check the two directory names and printed addresses.',
      'Use the existing API Lab before replacing My Tasks.',
      'The Express store owns numeric IDs; the browser draft is only a title until a successful response.',
    ],
    mistake:
      'A browser-local task showing up after refresh says nothing about Express. Verify the actual request before treating a UI as integrated.',
    takeaway:
      'Keep the task authority, UI snapshot and unsaved draft separate.',
  },
  {
    minutes: '25–40',
    goals: [
      'Compare origins by scheme, hostname and port.',
      'Diagnose direct server versus proxied request failures.',
    ],
    heading: 'Follow the request across the development proxy',
    explanation: [
      'An origin is the combination of scheme, host and port. The page at http://127.0.0.1:5173 and the server at http://127.0.0.1:3001 have different origins. A path beginning /api/ uses the page’s origin. Vite receives it and forwards it to the loopback Express target declared in frontend/vite.config.js.',
      'CORS is a browser policy for cross-origin reads. It does not establish an identity or decide who may change a task. For this local setup, keep the existing proxy and relative paths. This proxy applies to the development server. A static production preview checks your frontend build but needs a separate API routing arrangement for real requests.',
      'When /api fails, first open the direct health URL. If that also fails, check whether Node is running and listening at the expected port. If direct health works, inspect the frontend request URL and the Vite terminal. An Express 404 JSON envelope means the API answered. A Vite HTML response or proxy error can indicate the request never reached that handler.',
    ],
    predict:
      'Direct :3001/api/health works. The frontend receives HTML from /api/health. Which layer should you check next?',
    example:
      'Browser: GET /api/health on the printed Vite address\nVite server.proxy: /api → http://127.0.0.1:3001\nExpress: responds to GET /api/health',
    result:
      'Check the proxy target, configuration location and exact request path. Inspect Content-Type before attempting JSON decoding.',
    exercise:
      'Stop only the Express process and repeat the direct and proxied GETs. Observe the two terminals and Network results. Restart Express, compare with /api/tasks/999 on the working server, and record which status or connection error each action produced.',
    hints: [
      'Remember which terminal runs which process.',
      'A changed Vite config requires restarting that process.',
      'Compare response Content-Type and the error envelope, not only the browser address bar.',
    ],
    mistake:
      'Enabling a broad CORS policy will not fix a stopped backend or a wrong proxy path.',
    takeaway:
      'Check the direct server first, then the proxy path and browser response.',
    extension:
      'Optional: compare a documented explicit origin allowlist with the proxy in a disposable local copy. Explain what each lets a browser read.',
  },
  {
    minutes: '40–55',
    goals: [
      'Build a single task API client with injectable transport.',
      'Decode and validate success and error responses before exposing data.',
    ],
    heading: 'Give every request a shared contract',
    explanation: [
      'The starter’s frontend/src/lib/task-api.js contains the createTaskApi factory and ApiError class. Keep the fetchImpl argument so tests can supply an HTTP-like response. A shared request function takes a path, method, optional JSON body and signal. Encode any supplied body once and set Content-Type: application/json. Keep paths relative.',
      'Fetch can fulfill with HTTP 400 or 404. Check response.ok when deciding whether data can be used. A JSON error envelope can carry the server code and message. An HTML response, invalid JSON and a structurally wrong JSON body are distinct failures. Preserve deliberate AbortError so Effect cleanup does not report an outage. For other fetch rejections report NETWORK_ERROR without inventing a status.',
      'GET returns {data:[…],count:n}. Check the count and validate every task. POST and PATCH return {data:task}. A usable task has a positive safe integer ID, nonempty title, boolean completed and createdAt string. Return the server record with its ID intact. Health returns status and storage metadata. A successful 204 is handled before the JSON work in Lesson 7.',
    ],
    predict:
      'The transport fulfills with status 400 and a JSON error code. Can React use payload.data from this response?',
    example:
      'const response = await fetchImpl(path, options);\n// Decide whether the response has content before parsing.\nconst payload = await response.json();\nif (!response.ok) {\n  throw new ApiError(payload.error.message, {\n    status: response.status, code: payload.error.code,\n  });\n}',
    result:
      'No. This excerpt assumes a decoded JSON error envelope. Your real wrapper must also handle invalid or missing envelopes and transport errors. Successful JSON requires its own shape checks.',
    exercise:
      'Complete the isolated response lab. In frontend, run npm test, open tests/task-api.test.mjs and start with list and health. Add success shape checks and distinguish NON_JSON_RESPONSE, BAD_JSON and BAD_RESPONSE in the service. Reuse the wrapper as you add writes.',
    hints: [
      'In the browser lab response.contentType supplies the header value. Use response.headers.get("content-type") in the local client.',
      'Separate a failed fetch from a failed response.json() call.',
      'Keep the body-decoding catch narrow, so HTTP and shape errors keep their own classification.',
    ],
    mistake:
      'Using one broad catch to turn every failure into [] makes a server outage look like a successful empty list.',
    takeaway:
      'Centralize request options, response decoding and shape checks so the UI can handle honest outcomes.',
  },
  {
    minutes: '40–55',
    goals: [
      'Load tasks on mount with Effect cleanup.',
      'Show loading, ready, empty and error states with an explicit Retry action.',
    ],
    heading: 'Replace the browser task authority with an API snapshot',
    explanation: [
      'Keep tasks and load status in App or in a hook that App calls. App holds shared data while different route elements mount and unmount. Remove the Week 7 browser task initializer and save Effect from App, leaving old browser storage untouched. Initialize a new snapshot and load from taskApi.list. Derive Dashboard counts from that same snapshot.',
      'Use a synchronous Effect callback with an inner async function or promise reactions. Create an AbortController and an active flag per setup. On cleanup, set active false and abort. Retry changes a dependency such as attempt. Guard writes after awaiting. React development Strict Mode can run setup, cleanup, then setup again.',
      'Show loading while waiting. An empty array gives an honest empty-ready message. A rejected call gives a visible error and Retry. Keep controls keyboard reachable. Gate edits until a snapshot is ready, and hide or label dashboard counts while data is unavailable. During this lesson use only reads. Disable the old browser write callbacks until you replace them.',
    ],
    predict:
      'GET fails after restarting Vite with a wrong target. What should the task screen show before and after the failure?',
    example:
      'useEffect(() => {\n  let active = true;\n  const controller = new AbortController();\n  setStatus("loading");\n  taskApi.list({signal:controller.signal}).then(rows => {\n    if (active) { setTasks(rows); setStatus("ready"); }\n  }).catch(error => {\n    if (active && error.name !== "AbortError") {\n      setError(error.message); setStatus("error");\n    }\n  });\n  return () => { active = false; controller.abort(); };\n}, [attempt]);',
    result:
      'Loading comes first. On a current failure show an error and a Retry button. If a later GET succeeds with [], show an empty list message and enable the ready actions as you implement them.',
    exercise:
      'Wire GET into App and pass status, error and Retry to TasksPage. Test empty, populated and stopped-backend states. Use a terminal POST to populate the API for the read exercise. Throttle a request in DevTools and trigger Retry or reload to observe cleanup.',
    hints: [
      'Assign a status before awaiting.',
      'Use attempt as an Effect dependency.',
      'Guard success and failure updates after cleanup.',
    ],
    mistake:
      'Storing another copy of the shared task list in TasksPage can make the dashboard and task page disagree.',
    takeaway:
      'One shared snapshot and explicit request states keep the UI truthful across routes.',
  },
  {
    minutes: '35–50',
    goals: [
      'Create a row only after POST is confirmed by Express.',
      'Preserve the draft and prevent duplicate submissions.',
    ],
    heading: 'Save the draft only when the server accepts it',
    explanation: [
      'The form owns unsaved input. Trim and validate 1–80 characters locally for quick feedback. src/lib/task-logic.js still has the old 100-character rule. Update the learner validator and its boundary tests in the same change. Leave the backend’s rule authoritative. Send POST /api/tasks with a JSON title; use the returned data and numeric ID after 201.',
      'Make the submit handler asynchronous. The starter clears immediately after calling onAdd. Await the result and clear only in the success branch. Keep the draft and a useful error on failure. Keep the form mounted when Retry reloads the list, or hold its draft above that conditional view. Expose Saving and disable repeat submit while pending. Use a ref guard before the first await so two events before a rerender still produce one request.',
      'A response can be lost after a write has happened. If the result is uncertain, reload the server list before resubmitting so you can see whether the first request took effect. The course uses fictional data and a single confirmed write at a time.',
    ],
    predict:
      'The draft is "  Read the contract  " and the server rejects the request. What stays on screen?',
    example:
      'try {\n  const created = await taskApi.create(cleanTitle);\n  setTasks(rows => [...rows, created]);\n  return {ok:true};\n} catch (error) {\n  return {ok:false, error:error.message};\n}',
    result:
      'The current confirmed rows and user draft stay visible. A successful response can append the returned record and clear the draft. Use the returned ID rather than deriving one from list length.',
    exercise:
      'Implement create and await it in TaskForm. Demonstrate POST 201 in Network, test blank and 81-character titles, and send a direct invalid request to verify Express returns 400. Stop the backend before a submit, verify the draft stays editable, restart, reload if the result is uncertain, then retry.',
    hints: [
      'Change the 100-character check and its test together.',
      'Send a content type and exactly the title field.',
      'Return an explicit outcome so the form knows when it can clear.',
    ],
    mistake:
      'Appending an invented task before the response can show success when Express has stored nothing.',
    takeaway: 'A pending draft and a saved record are different states.',
  },
  {
    minutes: '40–55',
    goals: [
      'Reconcile completion and rename with the returned PATCH record.',
      'Keep a failed edit available for correction and retry.',
    ],
    heading: 'Change only what the user asked to change',
    explanation: [
      'PATCH /api/tasks/:id accepts title, completed, or both. To complete or reopen, submit a real boolean derived from the currently displayed server snapshot. Use {completed: !task.completed}. A response with completed:false describes a valid reopened task. Replace only the returned ID in your snapshot after success.',
      'Rename sends a trimmed title with the same 80-character boundary. Keep TaskItem in edit mode on failure and restore focus to its draft when appropriate. The starter treats onRename as synchronous. Await it before deciding when to close. Distinguish 400 invalid input and 404 missing resource. A 404 can mean the snapshot is old; prompt a refresh without discarding the typed edit.',
    ],
    predict:
      'A completed task is reopened, then a rename fails. What should its checkbox and title show?',
    example:
      'const saved = await taskApi.update(id, {completed:false});\nsetTasks(rows => rows.map(row => row.id === saved.id ? saved : row));',
    result:
      'The checkbox reflects the confirmed false from the first response. The title remains the last confirmed value in the list, and the failed rename draft stays in its edit input.',
    exercise:
      'Wire toggle and rename to the task API. Verify PATCH true then false in Network. Rename once successfully and try an overlength draft. In a disposable local project simulate an update failure by stopping the backend or temporarily removing the row from a second tab or terminal. Observe the original row or edit draft before refreshing.',
    hints: [
      'Use the current task ID in the request path.',
      'Keep JSON booleans as booleans.',
      'Close edit mode only after a successful resolved outcome.',
    ],
    mistake:
      'An if(patch.completed) condition ignores false and prevents reopening.',
    takeaway: 'The server’s returned record confirms which fields changed.',
  },
  {
    minutes: '30–45',
    goals: [
      'Handle successful 204 without decoding absent JSON.',
      'Keep the task row and show feedback when deletion fails.',
    ],
    heading: 'End a successful delete at the status boundary',
    explanation: [
      'DELETE /api/tasks/:id returns 204 with an empty body on success. Handle status 204 and response.ok before checking Content-Type or calling response.json(). Keep the other HTTP checks for error envelopes. A missing row is 404 and malformed ID is 400. A failed transport has no HTTP status.',
      'Offer confirmation before sending if the user cannot undo deletion. After a successful request, filter out the ID from the shared snapshot. Keep the row on a failed request and offer Retry or refresh as appropriate. Make the mutation status accessible near the list.',
    ],
    predict:
      'Network shows 204, but your code immediately calls json() and displays an error. What actually happened?',
    example:
      'if (response.ok && response.status === 204) return;\n// Other replies still need appropriate JSON and status checks.',
    result:
      'The API removed the row successfully. The client’s decoder failed on the absent body. Handle 204 first, then remove the row after the request resolves.',
    exercise:
      'Try the isolated 204 lab. Add taskApi.remove and the React confirmation path. Verify DELETE 204 in Network. Test a malformed and absent ID from a terminal. Stop the backend before confirming another delete and check that the visible row remains with an error.',
    hints: [
      'Inspect status before reading content.',
      'Use the same ID when filtering the confirmed array.',
      'Make repeated deletion of a missing ID an explicit failure with a useful message.',
    ],
    mistake:
      'Filtering immediately hides the task even if the delete never reaches Express.',
    takeaway:
      'An empty body can be a successful answer when its status says 204.',
  },
  {
    minutes: '35–50',
    goals: [
      'Guard one request at a time without confusing navigation.',
      'Keep route counts and copied ideas aligned with confirmed tasks.',
    ],
    heading: 'Give overlapping requests a clear owner',
    explanation: [
      'Use a shared pending state and an immediate ref guard at the task owner. Disable controls while a mutation is running. Keep that lock until finally. Guard a retry at the same boundary so a stale GET cannot replace a freshly confirmed write. Do not start writes while a new snapshot is loading. Abort or ignore older GET results when their attempt is obsolete.',
      'Because App stays mounted, changing routes can leave an already-sent mutation to finish and update its shared snapshot. Component-specific drafts disappear when their route unmounts unless you explicitly preserve them. Design for a known scope: keep drafts on failed writes while the form is open, and show a shared result on navigation. Dashboard counts derive from the snapshot and must indicate when it is unavailable.',
      'The offline Idea Inbox can still show bundled suggestions. Optional server copy sends only the chosen title with POST to your local API and uses the same pending guard. Until that callback is connected, disable it or label it clearly. The old browser-local callback would update the wrong list. Update the Dashboard and API Lab help text to identify the shared Express store and label the public Ideas service separately.',
    ],
    predict:
      'Two submit events fire before React paints disabled. Is that disabled state enough to block the second request?',
    example:
      'if (pending.current) return {ok:false, error:"Saving is already in progress."};\npending.current = true;\nsetBusy(true);\ntry { /* await one request and apply the confirmed result */ }\nfinally { pending.current = false; setBusy(false); }',
    result:
      'The ref changes immediately so the second event can be rejected before rendering catches up. The disabled state communicates what the guard is doing to the user.',
    exercise:
      'Throttle a write in DevTools. Try a rapid double submit, tab to Dashboard, then return to Tasks after resolution. Verify a single POST and accurate counts. Inspect /ideas and /server for honest task ownership. Test Retry while loading and confirm older responses cannot replace the newer view.',
    hints: [
      'Keep the lock at the shared owner, not only on the button.',
      'Reload and writes should use mutually exclusive pending phases.',
      'Check Network for the request count, even if the UI shows one row.',
    ],
    mistake:
      'Disabling the only button after an awaited API call is too late to prevent duplicate work.',
    takeaway:
      'An immediate guard coordinates requests. The UI shows which operation is pending.',
    extension:
      'Optional: compare a per-task lock with the shared lock. Test how concurrent updates and a refresh interact before keeping the more complex design.',
  },
  {
    minutes: '40–60',
    goals: [
      'Locate a failure in the browser, proxy, client or API.',
      'Reproduce a regression with fake fetch and a real local request.',
    ],
    heading: 'Read the evidence from the failing layer',
    explanation: [
      'In Network, select a specific request and read its method, path, status, request payload and response. Use the Vite and Express terminals to see whether forwarding reached the API. A 400 JSON validation error is different from 404 missing resource, failed transport or a frontend HTML document returned as 200.',
      'Mock fetch tests isolate method, path, headers, signal and response parsing. Use a successful Response, an HTTP failure envelope, malformed JSON and a rejected Promise. Call the client twice to check a failure did not make the next request incorrectly fail or succeed. Separate those results from real browser interaction and Express integration.',
      'Run npm test in backend and frontend. The original frontend suite has 13 unfinished API tests in addition to the 36 carried-over tests. Align its 100-character helper expectations with the new 80-character contract as part of the migration.',
    ],
    predict:
      'GET /api/tasks shows 200 and Content-Type: text/html. Which evidence invalidates the apparent success?',
    example:
      'Request: GET /api/tasks\nResponse: 200 OK, Content-Type: text/html\nBody starts with an HTML document',
    result:
      'The route returned a document that does not meet the API contract. Check proxy path and target. Show a non-JSON response error, then retry after fixing the path.',
    exercise:
      'Complete the error-taxonomy lab. Reproduce a deliberate content-type mismatch or a server validation 400 with a fictional title. Record method, status and observed error. Fix the mismatch, rerun that request and both local npm test suites, and inspect what the automated checks actually covered.',
    hints: [
      'Look at Response and Payload, not only Console.',
      'Use an injected fake to keep your regression deterministic.',
      'After the failure rerun a success case to prove recovery.',
    ],
    mistake:
      'A fake-fetch test cannot tell whether your Vite port points at the right Express process.',
    takeaway:
      'A useful regression names the observed failure, isolates its layer and repeats the same check after repair.',
  },
  {
    minutes: '25–40',
    goals: [
      'Review a focused integration diff and its evidence.',
      'Reject a change that violates ownership, validation or privacy.',
    ],
    heading: 'Review the contract before accepting a patch',
    explanation: [
      'Use git status and git diff to see what changed. Inspect new files too. Search the current task owner for the old storage key or write effect, and walk every mutation from user action into the request and returned record. A valid change preserves the failed draft, respects the backend 80-character rule and resolves 204 without trying JSON.',
      'If you collaborate with an assistant, ask it to inspect a specific symptom or propose a small patch. Keep credentials, private file paths and real records out of examples. Verify any claimed fix against your own previous failing request and test output. You can complete the same review by inspecting a deliberate patch in a local branch.',
    ],
    predict:
      'A diff writes server tasks to the old localStorage key after each GET. What regression should you check?',
    example:
      'git status --short\ngit diff -- frontend/src/App.jsx frontend/src/lib/task-api.js\n# Compare the actual request before and after one change.',
    result:
      'Test fresh load and outage. Old browser rows must not become authoritative when the API fails. Preserve the Week 7 list in its old key and represent the API error explicitly.',
    exercise:
      'Pick one relevant change. Explain what behavior it changes, reproduce the old symptom and rerun the corrected check. Record one accepted or rejected diff with a rationale and terminal or browser observation.',
    hints: [
      'Identify the state owner first.',
      'Check the smallest relevant file set.',
      'Use an actual status, named test or observed UI result as evidence.',
    ],
    mistake:
      'Accepting a large patch solely because it builds can hide false success, lost drafts or a storage regression.',
    takeaway:
      'A review checks behavior against the agreed boundaries and observable results.',
    extension:
      'Optional: delegate a small readability change to the task client. Inspect its diff and run the same error and success fixtures yourself.',
  },
  {
    minutes: '85–135',
    goals: [
      'Demonstrate real React CRUD and recovery through Express.',
      'Explain the memory boundary and verify an independent code repair.',
    ],
    heading: 'Trace a complete task through both programs',
    explanation: [
      'Start both local processes. On /tasks open Network and observe GET, POST 201, PATCH true then false, PATCH rename and DELETE 204. Confirm only successful responses change the snapshot. Exercise the keyboard form path, 80-character limit and one deliberate failure. Save short observations rather than whole logs.',
      'Disable the backend before a submit to verify the draft stays. Restart and Retry to load the empty default memory store. Check Dashboard and the diagnostic route. Verify that any old browser tasks remain separate and that newly created server tasks survive frontend refresh while Node stays running. Next week PostgreSQL will give the API a durable store.',
      'In a disposable copy independently diagnose an unfamiliar issue such as stale load overriding a save, wrong proxy target, a PATCH that strips false or JSON decode after 204. Reproduce it first, fix only the relevant change and repeat the same test without borrowing a generated fix.',
    ],
    predict:
      'A task survives refreshing /tasks, then disappears after restarting Express. Which component lost data?',
    example:
      'Refresh React → new GET → same Express store\nRestart Express → fresh memory store → empty GET result',
    result:
      'Only the server process restart resets its store. React refresh reconstructs its snapshot from the current server.',
    exercise:
      'Run npm test in both folders and npm run build in frontend. Walk the network sequence above, retry a real outage, and complete the independent repair. Record the actual results and review the diff before making a local Git checkpoint.',
    hints: [
      'Start from a known empty backend and fictional data.',
      'Watch the request, returned status and visible row together.',
      'Repeat the same failure fixture after repair.',
    ],
    mistake:
      'A passing HTTP test suite does not show that React keeps a draft or prevents a double click.',
    takeaway:
      'Show the whole request path, including one failed action and its recovery.',
  },
]

export const weekEight = Object.fromEntries(
  lessons.map((lesson, index) => [
    'p1-w08-l' + String(index + 1).padStart(2, '0'),
    lesson,
  ]),
)
