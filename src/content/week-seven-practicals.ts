import type { Lab, LocalCheck } from './practicals'

export const weekSevenLabs: Record<string, Lab> = {
  'p1-w07-l06-c01': {
    title: 'Build an isolated in-memory task store',
    task: 'Write createTaskStore(options), where options.initialTasks contains seed records. Return list(filter), get(id), create(body), update(id, patch) and remove(id). The editor supplies now() as a deterministic clock. list takes {completed:null|true|false}, or no argument. Use the stable ID and copy rules above. You can use object spread, array methods and closures. In this editor update by mapping to a new array. Express runs only in your local project.',
    starter:
      'function createTaskStore(options) {\n  // Copy the initial tasks and initialise a separate next-ID counter.\n  return {\n    list(filter) { return []; },\n    get(id) { return null; },\n    create(body) {},\n    update(id, patch) { return null; },\n    remove(id) { return false; },\n  };\n}',
    checks: [
      'Start empty and create an incomplete task with an injected timestamp.',
      'Allocate new IDs after deletion and above the largest seed ID.',
      'Filter explicitly for true, false and all rows.',
      'Preserve untouched fields, handle missing IDs and return copies.',
      'Keep independently constructed stores separate.',
    ],
  },
  'p1-w07-l07-c01': {
    title: 'Validate JSON bodies, IDs and filters',
    task: 'Implement the four helpers. For create, patch and filters return {ok:true,value:cleanedValue} or {ok:false,message:"Explain the problem"}. A valid absent filter uses value:null. For parseTaskId return a positive safe integer from canonical decimal text, or null. Use Object.keys, Object.hasOwn, Number and String as needed. Construct output with object literals or spreads. Run real requests separately in Express.',
    starter:
      'function validateCreateBody(body) {\n  // Allow only a valid title.\n}\nfunction validatePatchBody(body) {\n  // Detect whether each allowed property is present.\n}\nfunction parseTaskId(raw) {\n  // Require canonical positive safe integer text.\n}\nfunction parseCompletedFilter(raw) {\n  // Handle an absent filter and exact true/false strings.\n}',
    checks: [
      'Reject non-object, missing or extra create fields.',
      'Trim create titles and enforce 1–80 characters.',
      'Reject empty or invalid patches.',
      'Keep explicit false and return only supplied valid fields.',
      'Accept only canonical positive safe ID strings.',
      'Distinguish missing, valid and invalid filter values.',
    ],
  },
}

const note = (label: string) => ({ label, max: 450 })

export const weekSevenProjects: Record<string, LocalCheck> = {
  'p1-w07-l01-c02': {
    title: 'Verify local Node, npm and ESM',
    items: [
      'I checked Node and npm in the backend folder and installed its locked dependencies.',
      'I ran the ESM script and observed the runtime output. My Week 6 project is separate.',
    ],
    fields: [
      note('Node and npm versions and the output that distinguished Node'),
    ],
  },
  'p1-w07-l03-c02': {
    title: 'Try the real health and fallback routes',
    items: [
      'I observed health 200 with storage memory and an unknown route returning JSON 404.',
      'In a disposable copy I moved the fallback early, reproduced 404 on health and restored the route order.',
    ],
    fields: [
      note(
        'Commands, status and error code before and after the route-order fix',
      ),
    ],
  },
  'p1-w07-l04-c02': {
    title: 'Inspect JSON middleware behavior',
    items: [
      'I sent a malformed JSON request and observed 400 INVALID_JSON with no internal diagnostics.',
      'I compared a syntactically valid body and explained the parser, ordinary fallback and error-handler order.',
    ],
    fields: [
      note('Request headers, parser result and observed valid-body result'),
    ],
  },
  'p1-w07-l05-c02': {
    title: 'Verify GET routes with seeded practice rows',
    items: [
      'I tested all, true and false lists against two known fictional records.',
      'I observed 400 for invalid query and path values, 200 for an existing ID and 404 for a missing valid ID.',
    ],
    fields: [
      note(
        'IDs for both filters, plus malformed and missing status observations',
      ),
    ],
  },
  'p1-w07-l08-c02': {
    title: 'Verify real POST creation',
    items: [
      'I submitted a padded title, observed 201 and followed Location to the trimmed record.',
      'Blank, numeric, overlong and extra-field bodies gave 400 and left the count unchanged.',
    ],
    fields: [
      note(
        'Location and count observations for accepted and rejected requests',
      ),
    ],
  },
  'p1-w07-l09-c02': {
    title: 'Verify PATCH false and bodyless DELETE',
    items: [
      'I edited the title without replacing other fields and saved completed true and then false.',
      'An empty or unknown-field patch yielded 400. Successful deletion returned 204 with an empty body.',
      'I compared invalid ID 400 with valid missing ID 404.',
    ],
    fields: [
      note(
        'Observed final completion flag, raw DELETE body length and relevant statuses',
      ),
    ],
  },
  'p1-w07-l10-c01': {
    title: 'Run the backend test and repair a regression',
    items: [
      'I issued a manual HTTP request and ran npm test from backend.',
      'I distinguished helper assertions from HTTP tests with isolated stores and temporary ports.',
      'I reproduced one failure, repaired it and reran its regression.',
    ],
    fields: [note('Named failing test, cause, and observed pass/fail totals')],
  },
  'p1-w07-l11-c01': {
    title: 'Connect the read-only React API Lab',
    items: [
      'I ran both processes and saw GET health and tasks through the Vite proxy.',
      'I stopped and restarted the API, tested Retry, and observed the reset of default server memory.',
      'My Tasks kept its separate browser-local task.',
    ],
    fields: [
      note(
        'Ports used, observed offline and recovery states, and the separate task owners',
      ),
    ],
  },
  'p1-w07-l12-c01': {
    title: 'Demonstrate the complete local contract',
    items: [
      'I verified GET, POST with Location, PATCH false, DELETE 204 and invalid/missing inputs using real HTTP.',
      'I ran backend and frontend tests, built the frontend and tried the read-only bridge with the keyboard.',
      'I observed Node restart behavior and confirmed browser tasks stayed separate.',
    ],
    fields: [
      note('Actual test totals, build result and one boundary case'),
      note('Request lifecycle and observed result after restart'),
    ],
  },
  'p1-w07-l12-c03': {
    title: 'Repair an unfamiliar backend failure',
    choices: [
      'Correct request reaches the fallback',
      'The false filter returns completed rows',
      'A partial update drops existing fields',
      'Creating after deletion reuses an ID',
      'A bodyless response is decoded as JSON',
    ],
    items: [
      'I reproduced an unfamiliar symptom and diagnosed it without an AI-generated fix.',
      'I made a focused correction and reran the exact local request or test.',
    ],
    fields: [
      note('Reproduction, hypothesis and cause'),
      note('Minimal change and observed before/after result'),
    ],
  },
}
