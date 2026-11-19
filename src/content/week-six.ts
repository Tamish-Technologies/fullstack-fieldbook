import type { Reading } from './week-one'

const lessons: Reading[] = [
  {
    minutes: '30–45',
    goals: [
      'Distinguish HTTP failure, network rejection and invalid JSON.',
      'Normalize remote records before they reach React.',
    ],
    heading: 'Give the Ideas page a small API contract',
    explanation: [
      'The Week 6 starter begins with the working local task manager. You will add a separate inbox of sample study ideas. The API client is an ordinary JavaScript module. It makes a read-only GET, checks the HTTP result, decodes the body and returns clean ideas or throws. The UI decides how to display that outcome. Your local task array never goes into the request.',
      'A fulfilled fetch means the server responded. A 503 response still fulfills, so check response.ok before reading the body. A disconnected network can reject before you have any response. Even with HTTP 200, json() can reject on invalid syntax, or the parsed value can have the wrong shape. Throw when the top level is anything other than an array. A valid array can contain unusable rows, which you can skip.',
      'For each object row, require a positive safe integer ID and a string title with 1–100 characters after trim. Preserve the first usable record for each ID. Prefix display IDs with api-, create new records, and use completed === true so a string like "true" does not become a boolean. Display titles as JSX text. Treat the inbox and the task list as different collections.',
    ],
    predict:
      'A response is HTTP 200 and contains a usable row with ID 17 and title "  Review hooks  ", a second row with ID 17, and a row with string ID "18". What comes back?',
    example:
      'const payload = [\n  { id: 17, title: "  Review hooks  ", completed: false },\n  { id: 17, title: "Duplicate" },\n  { id: "18", title: "String ID" },\n];',
    result:
      'One new record: {id:"api-17", title:"Review hooks", completed:false}. The API key identifies an idea on screen. A copied task later gets a new numeric ID.',
    followUp: {
      title: 'Run the extracted project',
      example:
        'node --version\nnpm ci\nnpm run dev\n\n# In another terminal in the same folder\nnpm test',
      reasoning:
        'Use Node 24 and the folder containing package.json. Open the Local address Vite prints. The task list works before you begin. The first npm test run should report 26 passes and 10 failures for the two unfinished API helpers. Those failures guide the work. Use npm run build to verify compilation. Keep Week 5 in its own project folder.',
    },
    exercise:
      'Download the starter and run its tests. Complete the normalization lab below, then implement normalizeIdeas in src/lib/ideas-api.js. For the local fetchIdeas client, read its TODOs and follow the receive → check → decode → normalize order. The full client behavior is tested in Lesson 10.',
    hints: [
      'Use Array.isArray before iterating.',
      'Check typeof title before trim. To spot a repeated ID, compare the prefixed ID to IDs already accepted.',
      'Test [] and {} separately. The first returns []; the second throws an error such as "Expected a list of ideas".',
    ],
    mistake:
      'Using the raw JSON directly in React can produce unstable keys or invalid labels. Converting an error into [] also makes an outage appear to be a valid empty list.',
    takeaway:
      'The API boundary turns an uncertain response into known data or an explainable error.',
  },
  {
    minutes: '20–35',
    goals: [
      'Choose where render calculations, events and Effects belong.',
      'Explain how an Effect reacts to dependencies.',
    ],
    heading: 'Put work where its trigger belongs',
    explanation: [
      'Render takes props and state and describes the current UI. Derive the remaining count and visible tasks there, as in Week 5. A render can run again without a click, so placing fetch in the component body starts work unpredictably. An event handler answers a specific action, such as choosing offline examples or requesting a retry.',
      'An Effect synchronizes with something outside React after a commit. Loading ideas while the page is visible is one example. Call useEffect at the top level. With no dependency array, it runs after each commit. An empty array is useful for setup with no changing reactive values. With [source, retryKey], React cleans up the previous setup and runs a new one when either value changes. Development Strict Mode also checks setup and cleanup by running an extra cycle.',
    ],
    predict:
      'The user types into the task filter while the Ideas screen is open. Should typing request ideas again?',
    example:
      'const visible = getVisibleTasks(tasks, {filter, query, sort});\nfunction retry() { setRetryKey(key => key + 1); }\n// The request Effect reads source and retryKey.',
    result:
      'No. Typing changes the derived view. Clicking Retry increments retryKey and requests a fresh Effect. Each action changes only the state it owns.',
    exercise:
      'In src/App.jsx classify getVisibleTasks, addTask and the storage useEffect. Then sketch where you will keep source and retryKey in IdeasPage. Run npm test again after changes to the API module.',
    hints: [
      'Ask whether the work can be calculated from existing state.',
      'Identify the external system. Identify the user action separately.',
      'List the props and state the request setup actually reads.',
    ],
    mistake:
      'An Effect that writes remainingCount from tasks duplicates a value you can compute during render and may show an outdated count.',
    takeaway:
      'Render derives the view, handlers answer actions, and Effects synchronize with external systems.',
  },
  {
    minutes: '45–60',
    goals: [
      'Give each request its own cleanup and guard.',
      'Reproduce a late response and distinguish cancellation from failure.',
    ],
    heading: 'Give each request one lifetime',
    explanation: [
      'Imagine request A starts first. You press Retry and B finishes first. If A writes after B, the latest result disappears. The same problem occurs when you leave Ideas or choose offline samples. Track freshness inside each Effect setup so A cannot update a view owned by B.',
      'The outer useEffect callback stays synchronous so it can return cleanup immediately. Run asynchronous work inside it or use Promise reactions. On cleanup, mark that setup inactive and abort its controller. Abort saves unnecessary work when the transport supports it. The active flag protects against results from work that ignores abort. Ignore an AbortError for a deliberately cancelled request and show actual failures for the current request.',
    ],
    predict:
      'A slow fixture ignores abort. The user immediately switches to offline examples. Can a controller alone keep A from replacing the examples?',
    example:
      'useEffect(() => {\n  if (source !== "remote") return;\n  const controller = new AbortController();\n  let active = true;\n  setRemote({status:"loading"});\n  fetchIdeas({signal: controller.signal}).then(ideas => {\n    if (active) setRemote({status: ideas.length ? "success" : "empty", ideas});\n  }).catch(error => {\n    if (active && error.name !== "AbortError") {\n      setRemote({status:"error", message:error.message});\n    }\n  });\n  return () => { active = false; controller.abort(); };\n}, [source, retryKey]);',
    result:
      'Each setup closes over its own active flag. Cleanup changes A’s flag, even when the request ignores the controller. A cannot write after its setup has ended.',
    followUp: {
      title: 'Mount the inbox before building routes',
      example:
        '// Temporary: import IdeasPage into App and render <IdeasPage /> in its main.\n// Inside IdeasPage, import fetchIdeas and practiceFetch.\nconst fetchImpl = practiceFetch(retryKey === 0 ? "late" : "empty");',
      reasoning:
        'Keep test fixtures inside the Effect setup when they depend on retryKey. Pass fetchImpl with the signal to fetchIdeas. Add a temporary Retry button that increments retryKey and show remote.status plus ideas?.length. A first request is slow; Retry produces a fast empty result. After three seconds it must still be empty. This temporary mount becomes the /ideas route in Lesson 6.',
    },
    exercise:
      'Implement the Effect in IdeasPage with source initially "remote", retryKey initially 0 and remote initially {status:"loading"}. Run the late→empty fixture above. Repeat with "slow" instead of "late" and observe cancellation, then restore a success fixture. Keep Strict Mode enabled.',
    hints: [
      'Use one controller per setup.',
      'Return cleanup from useEffect itself.',
      'Guard both success and failure updates with the setup’s active flag.',
    ],
    mistake:
      'One controller reused across attempts stays aborted after its first cleanup. Make a new one for each setup.',
    takeaway:
      'Cleanup ends a request’s right to update the view and asks the transport to stop.',
  },
  {
    minutes: '30–45',
    goals: [
      'Render distinct request states.',
      'Make status and recovery controls available to keyboard and screen-reader users.',
    ],
    heading: 'Tell the user what the request actually did',
    explanation: [
      'Loading means the current request is pending. Success means there are usable ideas to show. Empty means the valid response had no usable rows. Error covers HTTP, syntax, shape or network failure. Clear stale results when beginning a new attempt so a previously successful list is not presented as the new result.',
      'Keep the Retry and offline controls outside the conditional results. A status region can politely announce loading and empty changes. Use an alert for a current failure and offer a concrete next action. Keep focus on the control the user activated while results change. Use native buttons and a list with stable idea keys.',
    ],
    predict:
      'A valid response is [] on one attempt and malformed JSON on another. Which text and action apply to each?',
    example:
      '{remote.status === "loading" && <p role="status">Loading study ideas…</p>}\n{remote.status === "empty" && <p role="status">No usable ideas found.</p>}\n{remote.status === "error" && <p role="alert">{remote.message}</p>}',
    result:
      'Empty can say there are no usable ideas. Malformed JSON is an error with a recovery choice. Retry and offline ideas remain available in both states.',
    exercise:
      'Extend the mounted IdeasPage. Render a list on success and a message for the other states. Exercise practiceFetch modes success, empty, http and json one at a time. Use slow to see loading and Tab to check that the controls stay reachable.',
    hints: [
      'Use a single status field to avoid contradictory flags.',
      'Keep the buttons in the same DOM position during changes.',
      'The malformed JSON branch comes from response.json() rejecting.',
    ],
    mistake:
      'Displaying a blank list when a request fails gives the learner no way to tell whether retrying would help.',
    takeaway:
      'Each request outcome has its own message and an available recovery path.',
  },
  {
    minutes: '35–50',
    goals: [
      'Switch data sources without losing tasks.',
      'Copy an idea with a fresh local ID and no external write.',
    ],
    heading: 'Keep an offline path and keep tasks local',
    explanation: [
      'Retry switches the source to remote and increments retryKey. Offline selects bundled SAMPLE_IDEAS from src/lib/sample-ideas.js and stops the active request through cleanup. Derive the displayed list from source plus remote state. Keep offline ideas visible even if a superseded remote fixture completes.',
      'Copy belongs in an event handler. The row reports idea.title to a callback from App. App validates the title and calls its existing addTask. A copy is a new unfinished local task, even if the remote row was marked completed. The numeric task ID comes from the local task collection. Two copies may have the same title and must have different IDs. No task is uploaded to the sample service.',
    ],
    predict:
      'An offline idea is already marked complete. If you copy it twice, what changes in the inbox and what changes in Tasks?',
    example:
      '// In App, pass the existing handler:\n<IdeasPage onAddIdea={addTask} />\n// In IdeasPage, call it inside a click handler:\n<button type="button" onClick={() => onAddIdea(idea.title)}>Copy idea</button>',
    result:
      'The idea stays in the inbox unchanged. Tasks gets two incomplete records with different local IDs. A nearby status message can confirm the copy.',
    exercise:
      'Add Retry, Use offline examples and Copy to the mounted page. Select offline while the late fixture is still pending. Verify the examples remain after it completes. Copy one twice and check both records in the task list on the same screen. Use a labelled button with the idea title when presenting several Copy buttons.',
    hints: [
      'Retry can set source and increment retryKey in one handler.',
      'Use sample-ideas.js directly on the offline branch.',
      'Call onAddIdea from an event; pass just the title.',
    ],
    mistake:
      'Replacing tasks with the response erases local work. A copy appends one new task through App’s existing updater.',
    takeaway:
      'Requests change the inbox. A deliberate copy changes the local task list.',
  },
  {
    minutes: '30–45',
    goals: [
      'Configure four routes in the actual React project.',
      'Trace a route from the browser URL to its element.',
    ],
    heading: 'Map real paths to React pages',
    explanation: [
      'BrowserRouter reads the browser URL and uses its history. Routes selects a matching Route and renders the supplied element. Use the installed react-router package from the starter. In src/main.jsx, wrap <App /> with BrowserRouter inside StrictMode. Put shared navigation and persistent task state in App, outside the route elements.',
      'Create a dashboard at /, the existing task view at /tasks, the inbox at /ideas, and a wildcard fallback for unknown paths. Start by moving the existing task section unchanged into the /tasks element. Extract TasksPage afterward if useful. Give every page a distinct heading. The wildcard page should explain the path could not be found and give a link back.',
    ],
    predict:
      'The address is /ideas. Does that path create an HTTP API that responds with idea JSON?',
    example:
      '<Routes>\n  <Route path="/" element={<DashboardPage />} />\n  <Route path="/tasks" element={<TasksPage />} />\n  <Route path="/ideas" element={<IdeasPage onAddIdea={addTask} />} />\n  <Route path="*" element={<NotFoundPage />} />\n</Routes>',
    result:
      'Once the app shell loads, the router selects IdeasPage. The page’s request uses the separate sample API URL. No backend endpoint is created by declaring a client Route.',
    exercise:
      'Replace the temporary mount with a Route. Import BrowserRouter in main.jsx and Routes, Route and Link in App.jsx. If starting with placeholders, add a unique heading to each first. Then wire the existing tasks and inbox, and open /, /tasks, /ideas and /wrong in local Vite.',
    hints: [
      'BrowserRouter is an ancestor of Routes and Links.',
      'Pass an element such as <IdeasPage /> to element.',
      'Use * for the wildcard.',
    ],
    mistake:
      'Wrapping each page in its own router divides history and can trigger a nested-router error.',
    takeaway: 'The browser address selects a page within one app shell.',
  },
  {
    minutes: '25–40',
    goals: [
      'Use keyboard-friendly links and expose the current page.',
      'Distinguish an application fallback view from a server 404.',
    ],
    heading: 'Navigate, refresh and recover',
    explanation: [
      'Link renders a real link for an internal path and lets the router handle normal activation. NavLink also exposes the current route, including aria-current="page" when active. Pass end to the dashboard link so it is active only at /. Pair a visible style change with that semantic state. Tab to navigate and Enter to follow links.',
      'Clicking a link in the loaded app uses client navigation. Opening /ideas directly or refreshing asks the server for that path first. Local Vite sends the SPA shell for app routes. A future static host must be configured to do the same. If the document itself gets HTTP 404, the React wildcard has not had a chance to run.',
    ],
    predict:
      'Clicking Ideas works. Refresh on a static host returns its plain 404 document. Where do you investigate?',
    example:
      '<nav aria-label="Study Tasks">\n  <NavLink to="/" end>Dashboard</NavLink>\n  <NavLink to="/tasks">Tasks</NavLink>\n  <NavLink to="/ideas">Ideas</NavLink>\n</nav>',
    result:
      'Check the initial document request in Network and the host’s SPA fallback. On Vite, /wrong should still reach the app and render your own Not Found heading.',
    exercise:
      'Add the three navigation links and a recovery link to the wildcard page. Use only the keyboard to move between views. Check aria-current and visible focus, then try Back, Forward and direct refresh on /ideas. Ensure a new route has an identifiable heading and a useful focus location.',
    hints: [
      'Use [aria-current="page"] for an active selector.',
      'Check URL and page heading together.',
      'A document request and an ideas data request are separate rows in Network.',
    ],
    mistake:
      'A div with a click handler needs manual keyboard and link behavior. Begin with Link or NavLink.',
    takeaway:
      'A real link and predictable history make a routed app easier to use and debug.',
  },
  {
    minutes: '30–45',
    goals: [
      'Keep tasks above route pages that can unmount.',
      'Preserve each update when quick actions occur together.',
    ],
    heading: 'Give shared task state a persistent owner',
    explanation: [
      'Switching routes can remove a page from the tree and throw away that page’s state. Tasks belong to App because Dashboard needs counts, Tasks needs rows and Ideas needs a copy callback. Keep short-lived state such as Ideas request status in IdeasPage. Pass shared values down as props and actions back through callbacks.',
      'When adding a task, derive the ID and next array inside a functional setter. If two calls use the same captured tasks array, both may pick the same ID or the last update can replace the first. A functional setter receives the latest queued value. Dashboard counts should derive from App’s tasks every render.',
    ],
    predict:
      'The list contains IDs 2 and 7. A handler calls addTask twice in one event. Which IDs should the two new tasks have?',
    example:
      'setTasks(previous => {\n  const id = previous.reduce((max, task) => Math.max(max, task.id), 0) + 1;\n  return addTaskToList(previous, id, title).tasks;\n});',
    result:
      'The first updater creates ID 8. The second sees it and creates ID 9. Route changes keep both records because App stays mounted.',
    exercise:
      'Keep task state, storage Effect and callbacks in App. Pass counts to Dashboard, controlled data to Tasks and addTask to Ideas. In a project copy add a temporary button that calls addTask with two different fictional titles in one click. Check both IDs, navigate away and return, then remove the test button.',
    hints: [
      'Draw App above Routes.',
      'Only pass what a page needs.',
      'Check the previous argument inside the updater, before choosing an ID.',
    ],
    mistake:
      'Moving useState(tasks) into TasksPage can make the list disappear on navigation even though the rest of the application still runs.',
    takeaway:
      'The owner of shared data must stay mounted while its consumers change.',
  },
  {
    minutes: '30–45',
    goals: [
      'Verify storage on the actual project origin.',
      'Protect unreadable data and explain recovery.',
    ],
    heading: 'Carry tasks through reloads as well as navigation',
    explanation: [
      'An App-owned state survives route changes. Reload rebuilds the React tree, so use the starter’s lazy initializer to read storage and its Effect to write task changes. Keep the key study-tasks-week2 and Week 5 task fields. Equality of key names is only meaningful within the same scheme, host and port. Preserve your original Week 5 project when trying this.',
      'If an initial record cannot be decoded, keep it untouched and show a warning. Let people practice in memory and require explicit confirmation to replace the record. Keep warnings reachable from all pages. A write failure should say changes might not survive reload. Fieldbook’s progress is stored separately from this Vite project.',
    ],
    predict:
      'You copied an idea on port 5173, then reopen the project on port 5174. Neither list is corrupted. Why does the second list look empty?',
    example:
      'const [initial] = useState(initialTasks);\nconst [tasks, setTasks] = useState(initial.tasks);\n// Save from App only when the initial read is safe or recovery was confirmed.',
    result:
      'The ports belong to different origins. Return to the original address to find its tasks. A different route path on one origin uses the same storage.',
    exercise:
      'Copy a fictional idea, open /tasks and refresh the exact URL. Start a separate Vite port for destructive practice. Open DevTools → Application → Local Storage for that origin, set study-tasks-week2 to { and reload. Confirm the warning and inspect the raw value after an in-memory edit. Cancel replacement once before testing explicit recovery.',
    hints: [
      'Write down the exact scheme, host and port.',
      'Verify that the original single opening brace is still stored after an edit.',
      'Check the save guard before changing the parse function.',
    ],
    mistake:
      'Saving the empty fallback immediately erases the unreadable value and makes deliberate recovery impossible.',
    takeaway:
      'Keep one safe persistence boundary in App and test it on a disposable origin.',
  },
  {
    minutes: '40–55',
    goals: [
      'Test a client with injected HTTP-like responses and cancellation.',
      'Diagnose a failure in the mounted app.',
    ],
    heading: 'Control the response so the test proves one thing',
    explanation: [
      'A fake fetch substitutes one function while leaving the API client’s control flow intact. Give the fake a resolved response with ok:false and status:503, a resolved response with invalid JSON, or a rejected promise. The response can expose a json() method that counts whether it was called. An abort rejection belongs to the caller; the client should propagate the original error.',
      'Forward the original signal reference with the URL. In the Fieldbook editor fetchImpl and normalizeIdeas are supplied fixture functions. Use options.signal and a separate variable for each await. In your local project you can destructure the parameters and inject any test function. The browser lab runs no real request.',
      'Use npm test to isolate API helper behavior. In the actual React UI use practiceFetch modes http, network and json to see failures and recovery. When trying the optional sample GET, the Network panel shows a status for an HTTP response and a failed or blocked entry when transport does not produce a response. Your required demo works even if the endpoint is unavailable.',
    ],
    predict:
      'Your fake returns {ok:false,status:503}. Its json method would return []. Why should the client leave json uncalled?',
    example:
      '// An injected fake can observe both routing arguments.\nasync function unavailable(url, options) {\n  return {ok:false, status:503, json(){ throw Error("Unexpected decode"); }};\n}',
    result:
      '503 is already a failure. Leaving json untouched preserves the useful HTTP cause and prevents [] from masquerading as successful Empty.',
    exercise:
      'Complete the browser lab and use npm test on your local project. In a temporary copy remove the response.ok guard and observe a failed 503 test. Restore it and rerun. In the UI compare http, json and network and recover with Retry or offline examples. Record one helper failure and one browser observation.',
    hints: [
      'Call the supplied fake once with the URL and signal.',
      'Check response.ok before awaiting response.json().',
      'Return the normalizer’s output. Leave rejections visible to the caller.',
    ],
    mistake:
      'A passing helper test cannot show whether clicking Retry starts an Effect or whether the router mounted the right component.',
    takeaway:
      'Use fixture tests for client branches and a real browser for requests, navigation and UI behavior together.',
  },
  {
    minutes: '20–30',
    goals: [
      'Review a small diff against concrete acceptance criteria.',
      'Protect task data and verify claims with commands you ran.',
    ],
    heading: 'Review the change one behavior at a time',
    explanation: [
      'Start with an observed symptom and a test you can repeat. Scope the patch to the smallest relevant area. For example, a root link that stays highlighted on /ideas usually means a routing match issue, not a task storage change. A reviewer can compare the exact before and after behavior and ask whether unrelated files changed.',
      'If you use an assistant, ask for an explanation first and limit what it can edit. Read git diff and inspect every changed branch. Run the named tests and observe the browser yourself. Keep private data, tokens and machine paths out of prompts and examples. An optional assistant has no role in earning this checkpoint.',
    ],
    predict:
      'A proposed patch makes a failing test pass by catching errors and returning []. What regression would you look for?',
    example:
      'git status --short\ngit diff -- src/pages/IdeasPage.jsx src/lib/ideas-api.js\nnpm test\nnpm run build',
    result:
      'Force HTTP 503 and invalid JSON. If either now displays Empty, the diff hid the real error. Restore correct error propagation and rerun those cases.',
    exercise:
      'Compare your current diff with the baseline. Pick one file, identify its responsibility, and run a specific red→green test or repeatable browser journey for its change.',
    hints: [
      'Name the observed behavior before editing.',
      'Look for a deleted check or changed expected result.',
      'Match each claim to a command result or an observable browser action.',
    ],
    mistake:
      'A large patch that happens to build can still regress offline recovery or apply a task reset unexpectedly.',
    takeaway: 'A review is evidence about the actual changed behavior.',
    extension:
      'Optional: ask an assistant for a one-file patch to improve one message or link, then review the diff and verify keyboard behavior yourself.',
  },
  {
    minutes: '90–140',
    goals: [
      'Demonstrate the complete Study Tasks v6 workflow.',
      'Diagnose an unfamiliar failure and verify a minimal fix independently.',
    ],
    heading: 'Put the request, routes and task state together',
    explanation: [
      'Start with three fictional tasks. Navigate from Dashboard to Ideas using the keyboard. Use the slow, success, empty and error fixtures, then switch to offline examples while a late result is still pending. Copy the same idea twice. On Tasks, verify unique IDs, Add/Toggle/Delete, filter, search, order and remaining count. Reload /tasks and check that the expected records survive.',
      'Visit the unknown route and use its recovery link. Run npm test and npm run build and record the counts you observed. Inspect the diff and explain where the task array lives, who starts each request and how obsolete results are ignored. The field checks record your observations from your project.',
      'For independent transfer, ask a peer to pick one bug from the checklist or work from an unfamiliar symptom in a disposable copy. Debug without AI-generated fixes. Record the smallest reproduction, hypothesis, cause, patch and the same regression rerun.',
    ],
    predict:
      'A late request replaces offline results only after Retry or navigation. What two things would you log first, using fictional data?',
    example:
      'Click Retry → increment retryKey → clean up A → start B\nChoose offline → clean up B → show local sample ideas\nCopy an idea → App validates title → append with new local ID',
    result:
      'Trace the start/cleanup for each request and the status/source it tried to update. Check the active guard before the state write. Then repeat with the fixture that ignores abort.',
    exercise:
      'Complete the local demo and transfer checklists and the readiness quiz. Try the four pages at 360px and with the keyboard. Compare the full list before and after filtering or reload. Keep your optional refinements out of the readiness requirements.',
    hints: [
      'Pick a fixture that changes one condition at a time.',
      'Record route, request phase and ID separately.',
      'Repeat the exact failing sequence after the fix.',
    ],
    mistake:
      'Demonstrating one successful request does not exercise retry, cancellation, storage recovery or route history.',
    takeaway:
      'A complete demo shows both normal use and a recoverable failure.',
    extension:
      'Optional: extract a useIdeas hook after the cleanup tests pass. Or add a route parameter or polish keyboard and small-screen behavior on a branch.',
  },
]

export const weekSix = Object.fromEntries(
  lessons.map((lesson, index) => [
    'p1-w06-l' + String(index + 1).padStart(2, '0'),
    lesson,
  ]),
)
