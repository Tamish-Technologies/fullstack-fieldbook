import type { Reading } from './week-one'

const lessons: Reading[] = [
  {
    minutes: '15–25',
    goals: [
      'Trace immediate work and a Promise continuation.',
      'Keep a page responsive while data is pending.',
    ],
    heading: 'Watch what runs before an answer arrives',
    explanation: [
      'Open the starter and add a fictional task. Its click handler can update the list immediately because it already has the title. An ideas request is different. The browser sends a request, gives the handler a Promise for the eventual response and can handle another click while the data travels. The Promise may still be pending when the handler ends.',
      'Synchronous statements finish the current call stack in order. Even a reaction attached to an already fulfilled Promise waits until that stack ends. Promise reactions then run as microtasks before the next timer task in the simple example below. A zero-millisecond timer schedules a later opportunity, with no guarantee about the exact delay.',
    ],
    predict:
      'Before running this in your project console, write the four labels in the order you expect.',
    example:
      'console.log("open");\nsetTimeout(() => console.log("timer"), 0);\nPromise.resolve("ideas").then(value => console.log(value));\nconsole.log("ready");',
    result:
      'open and ready appear first. The current job finishes, the ideas reaction runs, then the timer callback gets its turn.',
    followUp: {
      title: 'Pause one function',
      example:
        'async function observe(pending) {\n  console.log("waiting");\n  const name = await pending;\n  console.log(name);\n}\nobserve(Promise.resolve("received"));\nconsole.log("button still works");',
      reasoning:
        'The call runs up to await immediately and returns a Promise. Its caller keeps going. The resumed function later prints received.',
    },
    exercise:
      'Run both examples in the starter console. Change the second payload, predict again and record which lines can use the resolved value. Then try the trace lab below.',
    hints: [
      'Underline the lines outside a callback.',
      'Set aside the rest of an async function starting at its first await.',
    ],
    mistake:
      'Reading the console top to bottom in source order hides the moment the current stack ends.',
    takeaway: 'Wait for the operation in the function that needs its value.',
  },
  {
    minutes: '15–25',
    goals: [
      'Pass an eventual value to the next handler.',
      'Recover from rejection and clean up on either outcome.',
    ],
    heading: 'Connect each step to the returned chain',
    explanation: [
      'A Promise starts pending and settles once, either fulfilled with a value or rejected with a reason. Calling then makes another Promise. The value you return from its handler becomes the next result. If you return a Promise, the chain waits for that inner operation. A handler with no return supplies undefined.',
      'Throwing in a handler rejects the next Promise. A later catch can recover by returning a replacement value or propagate failure by throwing. finally runs after either path and receives no settled value. Ordinary cleanup leaves the earlier value or error flowing through.',
    ],
    predict: 'Does the second handler print 6, a pending Promise or undefined?',
    example:
      'Promise.resolve(3)\n  .then(n => Promise.resolve(n + n))\n  .then(value => console.log(value))\n  .finally(() => console.log("finished"));',
    result:
      'It prints 6, then finished. The first handler returned the inner Promise. Remove its return by changing the arrow to a block with no return and the second handler gets undefined.',
    exercise:
      'In a local copy replace the starting Promise with Promise.reject(new Error("offline")). Add catch before finally, return a fallback and inspect the value after cleanup. Run success and failure separately.',
    hints: [
      'Return the whole chain from your function.',
      'Use braces with an explicit return, or an expression arrow with an implicit return.',
    ],
    mistake:
      'Starting a second operation inside then without returning it lets cleanup finish too early.',
    takeaway:
      'The outer function and every transforming handler must return the work the caller depends on.',
  },
  {
    minutes: '20–30',
    goals: [
      'Read a resolved value with await.',
      'Restore an interface on success and failure.',
    ],
    heading: 'Put the wait inside the error boundary',
    explanation: [
      'Calling an async function always gives its caller a Promise, even if its body returns a plain number. Awaiting the Promise gives you its fulfilled value. Reading a property on the pending Promise reads the wrong object. Await a rejection inside try to send it through that function’s catch.',
      'Reset shared controls in finally so both the success and failure exits release them. If the second operation needs the first result, await them in sequence. If two reads are independent, starting both before awaiting can allow overlap.',
    ],
    predict: 'What will the caller see when the injected reader rejects?',
    example:
      'async function getLabel(read) {\n  try {\n    const row = await read();\n    return row.title;\n  } catch (error) {\n    return "Unavailable";\n  } finally {\n    console.log("ready again");\n  }\n}\ngetLabel(() => Promise.reject(Error("offline"))).then(console.log);',
    result:
      'The rejection enters catch. The function runs finally before its caller receives Unavailable. A fulfilled {title:"Read"} would reach the same cleanup and return Read.',
    exercise:
      'Supply a successful reader and then one that rejects. Compare the order of the cleanup and result messages. In the lab use a loading flag a button could read.',
    hints: [
      'Await inside try if the rejection should reach catch.',
      'Keep cleanup outside the success-only branch.',
    ],
    mistake:
      'Returning a still-pending Promise from try without awaiting can move its rejection beyond the surrounding catch.',
    takeaway: 'Place cleanup where every settled path reaches it.',
  },
  {
    minutes: '20–30',
    goals: [
      'Read a URL and an HTTP exchange.',
      'Distinguish an HTTP failure from a missing response.',
    ],
    heading: 'Read the request and response separately',
    explanation: [
      'In https://example.test/ideas?limit=2 the scheme is https, the host is example.test, the path is /ideas and the query asks for limit=2. The client sends a method, URL, headers and sometimes a body. The server returns a status, headers and sometimes a body. Content-Type describes the format. Inspect the body separately to see the actual data.',
      'GET reads. POST commonly creates an item in a collection. PATCH changes selected fields, PUT replaces a representation, and DELETE removes a resource. Codes 200 and 201 mean success and created. A 204 succeeds without a body. A 400 reports bad input, 401 missing or invalid credentials, 403 refusal, 404 a missing resource, and 429 too many requests. A 500 reports server failure and 503 temporary unavailability.',
    ],
    predict: 'Which line below establishes that the server actually answered?',
    example:
      'GET /ideas?limit=2\n\nHTTP/1.1 503 Service Unavailable\nContent-Type: application/json\n\n{"message":"Try later"}',
    result:
      'The 503 status comes from a response. A disconnected device may receive no response at all. A JSON body can arrive even with an unsuccessful HTTP status.',
    exercise:
      'Serve your starter and open Network in DevTools. Reload index.html and inspect a GET for app.js. Identify the path, returned status, content type and response text.',
    hints: [
      'Select a single request before looking for its headers.',
      'Disable caching or reload if the browser reuses a cached response.',
    ],
    mistake:
      'A completed request entry can carry a failure status. Inspect the number before declaring success.',
    takeaway:
      'Method describes what was requested. Status describes how the server answered.',
  },
  {
    minutes: '15–25',
    goals: [
      'Map a resource and its identity to a route.',
      'Explain where a copied task will persist.',
    ],
    heading: 'Give a collection and an item different addresses',
    explanation: [
      'A REST-style API organizes interactions around resources. /ideas names a collection. /ideas/17 names one item within it. The method expresses the requested action. GET /ideas/17 reads one item. POST /ideas proposes a new item. PATCH /ideas/17 changes selected fields, while PUT supplies the replacement representation.',
      'The training service JSONPlaceholder simulates writes. Even a plausible success status and returned ID do not promise a durable change on a later GET. This project reads suggestions. Only a learner choosing Copy changes the local task collection, which the browser saves under the established Week 2 key.',
    ],
    predict:
      'A practice service returns this response. What can you conclude about tomorrow’s GET?',
    example:
      'POST /ideas\n{"title":"Read a diagram"}\n\n201 Created\n{"id":201,"title":"Read a diagram"}',
    result:
      'You observed a creation-shaped response for this exchange. The simulated service can return the original dataset on the next read. The project stores an explicit local copy for persistence.',
    exercise:
      'Sketch routes for listing tasks, reading one, creating one, updating a single title and deleting one. Keep the exercise on paper. Use the starter’s local Save path for real edits.',
    hints: [
      'Put an existing ID in an item path.',
      'Choose between a full replacement and a field-level update.',
    ],
    mistake:
      'Giving a local task the remote ID can collide with an existing local record.',
    takeaway:
      'A remote idea and a local task have separate ownership and identities.',
    extension:
      'Add a route for changing only the completed flag. Explain what would happen if the item did not exist.',
  },
  {
    minutes: '25–40',
    goals: [
      'Validate decoded JSON against the idea schema.',
      'Return a bounded collection without changing the input.',
    ],
    heading: 'Only valid rows earn a place in the inbox',
    explanation: [
      'JSON is a text format. JSON.parse(text) or await response.json() can produce an array, object, string, number, boolean or null. Parsing establishes syntax. First require an array, then inspect each candidate. Check for an object before reading fields. Its ID must be a positive safe integer, its completed flag a boolean and its title a string that trims to 1 through 100 characters.',
      'Keep the first valid occurrence of an ID. A bad row must never reserve a good ID or use up the limit. Make a new {id,title,completed} object for each accepted row. Keep their input order and stop at the requested number, eight by default. Reject a negative or fractional limit. Zero means zero results.',
    ],
    predict: 'With a limit of one, which title survives?',
    example:
      '[\n  {id: 8, title: 7, completed: false},\n  {id: 8, title: "  Inspect  ", completed: true},\n  {id: 8, title: "Later", completed: false}\n]',
    result:
      'Inspect is the first valid row. The original middle title still contains spaces. A copy carries the cleaned title.',
    followUp: {
      title: 'Build a guard one field at a time',
      example:
        'const label = row && typeof row.title === "string"\n  ? row.title.trim() : "";\nconst usable = label.length > 0 && label.length <= 100;\nconst alreadyUsed = accepted.some(item => item.id === row.id);',
      reasoning:
        'Only calculate alreadyUsed after the row passes its field checks. Append when it is new and there is room. Verify ID and boolean separately.',
    },
    exercise:
      'Fill in normalizeIdeas in api-client.js. Pass malformed, duplicate and valid rows together, plus trimmed titles of 100 and 101 characters. Compare the source with a snapshot afterward.',
    hints: [
      'Check Array.isArray and Number.isSafeInteger before the loop.',
      'Push a new object with the cleaned title.',
    ],
    mistake:
      'Slicing the first eight raw rows can throw away good rows that follow malformed entries.',
    takeaway: 'Validate, deduplicate and count accepted rows in that order.',
  },
  {
    minutes: '25–40',
    goals: [
      'Check the HTTP status before decoding JSON.',
      'Use a fake transport to exercise every failure offline.',
    ],
    heading: 'A fulfilled fetch can still contain a 503',
    explanation: [
      'fetch() returns a Promise for a Response. A 404 or 503 normally fulfills that Promise because a response arrived. response.ok covers 2xx statuses. Check it before reading the body. response.json() then returns another Promise. An invalid JSON document rejects at that stage. A valid document with the wrong shape reaches your normalizer and fails there.',
      'Accept fetchImpl as an argument so your client can use a deterministic fake. Production can call fetch with the read-only URL. Tests pass a local function returning a Response-like object. A rejected fake models a network failure. Neither a real GET nor credentials are needed to exercise these paths.',
    ],
    predict: 'Will the catch block below run for this fake?',
    example:
      'const fake = async () => ({ok:false, status:503});\ntry {\n  const reply = await fake();\n  console.log(reply.status);\n} catch { console.log("no response"); }',
    result:
      'It prints 503. Explicitly throwing an error for !reply.ok gives your caller a useful failure to handle. An offline rejection would go directly to catch.',
    followUp: {
      title: 'Change only the transport',
      example:
        'const good = async () => ({\n  ok:true, status:200, json:async () => []\n});\nconst broken = async () => { throw Error("offline"); };',
      reasoning:
        'Supply each fake separately. Check a third fake whose json method throws and a fourth returning the wrong root shape. Those failures occur at different lines.',
    },
    exercise:
      'Implement fetchStudyIdeas using the options signature in api-client.js. Pass your fake as fetchImpl and use await on both asynchronous steps before normalizing. Record the status in an HTTP error.',
    hints: [
      'Keep a variable for the Response and a separate variable for the payload.',
      'Try a fake whose JSON decoder fails if called on a 503.',
    ],
    mistake:
      'Turning every failure into [] hides outages behind a believable empty inbox.',
    takeaway: 'Separate transport, status, decoding and validation.',
  },
  {
    minutes: '20–35',
    goals: [
      'Identify a failed request in DevTools.',
      'Explain a missing route, network failure and cross-origin permission.',
    ],
    heading: 'Follow one request from its initiator to its body',
    explanation: [
      'Open your project through its local HTTP server. In DevTools select Network, keep the panel open and reproduce one action. Look for the request URL, method and status in Headers, then inspect Response, Timing and Initiator. An HTML error page can explain a JSON decoding failure. A 404 proves something answered at that address. When a request never reaches a server there may be no HTTP status at all.',
      'A different scheme, host or port is another origin. CORS uses response headers to decide whether a browser script may read a cross-origin response. The console can explain a blocked read even when a service is reachable. Use your own same-origin fixture for this exercise or a service that permits the read. Keep browser protections enabled.',
    ],
    predict: 'Which investigation should you try first for each result?',
    example:
      'GET /missing-week4.json → 404, text/html\nGET /sample-ideas.js → (failed) while Offline',
    result:
      'For the first case compare the requested path and server folder. For the second restore the connection and retry the same known-good path. Inspect the returned body before trying to decode it.',
    exercise:
      'With the project open, run the calls below in its console one at a time. Inspect the missing-file request. In Network select Offline, disable cache and repeat the known-good call. Return to normal network mode, retry and record both observations.',
    exerciseExample:
      'fetch("./missing-week4.json").then(r => console.log(r.status));\nfetch("./sample-ideas.js").then(r => console.log(r.status)).catch(e => console.log(e.message));',
    hints: [
      'Open DevTools before reproducing the problem.',
      'If you see a cached response, disable cache with DevTools open.',
    ],
    mistake:
      'A console message alone often omits the URL or status needed to distinguish the failures.',
    takeaway:
      'Pair the visible symptom with one specific request and an observed result.',
  },
  {
    minutes: '25–35',
    goals: [
      'Represent pending, empty and failed states explicitly.',
      'Make a failed request recoverable by keyboard.',
    ],
    heading: 'Give loading and empty results their own states',
    explanation: [
      'Start idle with instructions and an enabled Load button. On click clear the previous inbox result, disable duplicate loads and announce loading. A successful nonempty array produces rows. A successful empty array means the service answered with no suggestions. A failed request calls for a brief message and a useful next action such as Retry or Use offline sample. None of these transitions should touch the saved task list.',
      'Put visible updates in a status region, for example a paragraph with role="status". Give actionable controls visible names. Re-enable Load in finally so a rejected request cannot strand the learner. Test the pending state with a manually resolved Promise so a fast computer cannot hide it.',
    ],
    predict:
      'What goes wrong if enabling the button is the last line inside try?',
    example:
      'button.disabled = true;\ntry {\n  const rows = await readIdeas();\n  draw(rows);\n  button.disabled = false;\n} catch { showMessage("Try again or use the sample."); }',
    result:
      'On rejection control jumps to catch before the enable line runs. The message suggests trying again while its button is still disabled. Move cleanup into finally.',
    exercise:
      'Use the panel in index.html. Give it distinct messages for loading, zero valid rows and failure. Run a successful fake, an empty success and a failure followed by a successful retry.',
    hints: [
      'Keep the inbox render function separate from the local task render.',
      'A zero-length valid result belongs to the success path.',
    ],
    mistake:
      'Showing the last successful result underneath a new error can make stale ideas look fresh.',
    takeaway: 'Every settled path restores a usable interface.',
  },
  {
    minutes: '20–35 optional',
    goals: [
      'Predict which response should own the screen.',
      'Ignore a stale result after switching data sources.',
    ],
    heading: 'Optional detour · when an older request finishes last',
    explanation: [
      'You can go straight to Lesson 11. Try this extension if you want to handle a slow live request followed by an instant offline selection. Each operation can be valid by itself. The older result can still repaint the latest selection unless you track which request currently owns the panel.',
      'Create an AbortController for a live request and pass its signal to fetch. Call abort() when switching sources. Treat AbortError as a canceled operation. A version counter also protects against a task that already finished its network phase or a fake loader that ignores the signal. Only the latest request should update results, status or controls.',
    ],
    predict:
      'The two calls finish in reverse order. Which value is allowed to draw?',
    example:
      'let version = 0;\nasync function choose(read) {\n  const mine = ++version;\n  const rows = await read();\n  if (mine === version) draw(rows);\n}',
    result:
      'Only the most recently started choice may draw. The counter compares user intent, not arrival time.',
    exercise:
      'Create two deferred fakes. Start the slow one first and choose the offline sample second. Release the first result last and check the sample stays visible. Repeat with cancellation and inspect the final button state.',
    hints: [
      'Increment the version on offline selection too.',
      'Guard finally if it would change the newer request’s controls.',
    ],
    mistake:
      'Canceling a network request alone cannot undo an already queued render.',
    takeaway: 'The latest user choice owns the visible state.',
    extension:
      'First explain the two-request timeline. Then add a controller, signal and stale-result check to a local project copy.',
  },
  {
    minutes: '40–65',
    goals: [
      'Load offline suggestions without altering tasks.',
      'Copy one suggestion safely to a persistent local ID.',
    ],
    heading: 'Copy is the only action that writes a task',
    explanation: [
      'Pass OFFLINE_IDEAS from sample-ideas.js through the same normalizeIdeas function used for network data. Render the result inside the inbox. Leave old tasks and their storage key alone when loading, failing, retrying or filtering. A remote suggestion can have exactly the same ID as a local task. Those IDs belong to different collections.',
      'When Copy is activated, find the suggestion by its remote ID, then use the existing local addTaskToList helper and the local next ID. Store a new incomplete task and persist the whole updated local collection. A repeated copy is another new task. Render the suggestion title as textContent. Give its button a meaningful label and resolve nested clicks with closest on the stable inbox list. Announce which task was added.',
    ],
    predict:
      'Local IDs are 7 and 9. The suggestion also has ID 9. Which records should change on Load and on Copy?',
    example:
      'const suggestion = {id:9,title:"<b>Outline</b>",completed:true};\nconst name = document.createElement("span");\nname.textContent = suggestion.title;',
    result:
      'Load leaves both local records untouched. On Copy the local allocator can produce ID 10. Its title includes the literal angle brackets, and the new task begins incomplete. Replacing ID 9 would lose existing work.',
    followUp: {
      title: 'Follow a click inside the button',
      example:
        'const button = event.target.closest("button[data-idea-id]");\nif (button && list.contains(button)) {\n  const remoteId = Number(button.dataset.ideaId);\n  // Find the suggestion, then call the local add path.\n}',
      reasoning:
        'The original target can be a span inside the button. Resolve its enclosing control before looking up the ID. Sorting the list must not change what gets copied.',
    },
    exercise:
      'Go offline after opening the starter. Wire the sample action in app.js. Load twice, then copy twice. Inspect the saved IDs after each action. Return to the same address after reload and try editing and filtering the copied task.',
    hints: [
      'Use the existing local ID allocator even when the remote ID looks available.',
      'Keep status text and inbox elements separate from the task list.',
    ],
    mistake:
      'Reusing the remote completed flag can add a task that is already finished and hidden by the active filter.',
    takeaway:
      'Copy turns an external suggestion into a new task owned by this browser.',
  },
  {
    minutes: '90–180',
    goals: [
      'Demonstrate an offline-capable Study Tasks v4 project.',
      'Diagnose a new defect independently and document its repair.',
    ],
    heading: 'Prove the inbox can fail without losing local work',
    explanation: [
      'Start from the same origin and study-tasks-week2 key. Create two fictional local tasks, finish one and record both IDs. Compare them after an inbox success, failure, empty result and offline load. Copy one idea and check the new local ID after refresh. Exercise the old search, sort, edit, complete and delete paths on a disposable task.',
      'Run the original Week 3 tests and add at least five asynchronous cases. Supply controlled fake transports for success, HTTP failure, offline rejection, invalid JSON and malformed payload. Await each test before recording its result. Include a failing-before and passing-after observation. A public API outage leaves these tests and the offline path available.',
    ],
    predict: 'Why could a green test counter be wrong in this example?',
    example:
      'function testRead() {\n  readIdeas(fake).then(rows => assert(rows.length === 2));\n}\n// A synchronous harness counts a pass when testRead returns.',
    result:
      'The function returns before its assertion runs. Return or await the Promise, and have the harness await each case before increasing the pass count.',
    followUp: {
      title: 'Run one awaited test from tests.html',
      example:
        'async function check(name, work) {\n  try { await work(); console.log("PASS", name); }\n  catch (error) { console.error("FAIL", name, error.message); }\n}\nawait check("empty success", async () => {\n  const rows = await fetchStudyIdeas({fetchImpl: async () => ({ok:true, json:async () => []})});\n  if (rows.length !== 0) throw Error("expected empty");\n});',
      reasoning:
        'Import your client in a local test module. Run it from tests.html alongside the starter regressions. Add a fake that returns 503. Demonstrate that the test goes red when you temporarily remove the status check.',
    },
    exercise:
      'Use the project checklist below. In a separate copy choose one independent transfer case and work without AI. Record the inputs, expected behavior, actual result, smallest repair and regression test. Inspect git diff before committing the local project.',
    hints: [
      'Make remote and local IDs collide on purpose in a disposable fixture.',
      'For a stuck control, trace every exit from loading.',
    ],
    mistake:
      'A successful live GET alone leaves the error, collision and recovery paths untested.',
    takeaway: 'The data remains yours across failure, copy and reload.',
    extension:
      'Try two independent read operations with Promise.all and predict what one rejection will do to the combined Promise.',
  },
]
export const weekFour = Object.fromEntries(
  lessons.map((lesson, i) => [
    'p1-w04-l' + String(i + 1).padStart(2, '0'),
    lesson,
  ]),
)
