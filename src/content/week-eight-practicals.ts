import type { Lab, LocalCheck } from './practicals'

const clientTask =
  'Write async requestTasks(path, options, expected). Pass path and options unchanged to the supplied fetchImpl. The fixture includes the HTTP method, optional JSON body, and original signal. Use response.contentType in the editor. For expected "list" validate data and count and return the array. For "task" validate and return the exact data record with id, title, completed and createdAt. Keep HTTP failure status and the envelope message in a thrown Error. Use NETWORK_ERROR for a rejected transport, NON_JSON_RESPONSE for HTML, BAD_JSON for a failed decode, and BAD_RESPONSE for wrong data. The supplied isAbort(error) identifies cancellation; propagate that error. Keep awaits in variable initializers or returns. Use small async helpers for narrow catches.'

const starter =
  'async function requestTasks(path, options, expected) {\n  // Send the supplied options to the fake transport.\n  // Return data only after checking the response.\n}'

export const weekEightLabs: Record<string, Lab> = {
  'p1-w08-l03-c02': {
    title: 'Read successful and failed task responses',
    task: clientTask,
    starter,
    checks: [
      'Forward the request and return a validated 200 list and 201 record.',
      'Treat HTTP 400 with its envelope as failure.',
      'Distinguish network rejection and deliberate cancellation.',
      'Reject HTML, malformed JSON and invalid envelopes.',
    ],
  },
  'p1-w08-l07-c02': {
    title: 'Resolve an empty successful delete',
    task: 'Adapt requestTasks(path, options, expected) from Lesson 3. A successful 204 with expected "none" returns undefined without calling json(). Keep JSON handling for actual data. Throw a useful 400 or 404 error for failed deletion and NETWORK_ERROR for rejected transport. The exercise supplies the path and options. No task array is passed to the client for mutation.',
    starter,
    checks: [
      'Preserve DELETE options and skip JSON on 204.',
      'Keep invalid-ID 400 and missing-ID 404 distinguishable.',
      'Report a failed transport without fabricating an HTTP status.',
      'Continue to decode and return valid GET data on a later request.',
    ],
  },
  'p1-w08-l09-c02': {
    title: 'Classify failures and verify Retry',
    task:
      clientTask +
      ' Include the successful 204 shortcut from Lesson 7. In this lab make one behavior fail deliberately, then run the same checks after your repair.',
    starter,
    checks: [
      'Forward GET, POST, PATCH and DELETE request options including the payload.',
      'Keep status and message for 400 and 404.',
      'Distinguish rejected fetch, invalid JSON, HTML and malformed data.',
      'Keep failure classification intact, then recover on a successful Retry.',
    ],
  },
}

const note = (label: string) => ({ label, max: 450 })

export const weekEightProjects: Record<string, LocalCheck> = {
  'p1-w08-l01-c02': {
    title: 'Verify the two local processes and task owners',
    items: [
      'I preserved the Week 7 Git checkpoint and started the two Week 8 programs.',
      'Direct and proxied health responded. I traced a request and identified where an ID is assigned.',
    ],
    fields: [note('Observed ports, health result and current task owners')],
  },
  'p1-w08-l02-c02': {
    title: 'Diagnose a stopped backend or proxy mismatch',
    items: [
      'I compared direct and proxied health, stopped the backend or changed the disposable proxy target, and observed the failure.',
      'I restored the correct setup and distinguished a connection or proxy failure from an Express JSON 404.',
    ],
    fields: [
      note('Observed status, content type or connection error and repair'),
    ],
  },
  'p1-w08-l04-c02': {
    title: 'Load the server snapshot through React',
    items: [
      'I observed real GET loading, non-empty, valid empty and backend-unavailable states.',
      'Retry recovered. I exercised slow-load cleanup and stopped the old browser task write path.',
    ],
    fields: [
      note('Observed Network results, Retry outcome and cleanup behavior'),
    ],
  },
  'p1-w08-l05-c02': {
    title: 'Create with server confirmation and preserve the draft',
    items: [
      'I observed POST 201 and verified the returned ID and trimmed title in the UI.',
      'I tried invalid title lengths, a direct bad API request, and a stopped backend. The failed draft stayed available and a deliberate retry worked.',
    ],
    fields: [note('Observed 201 and 400 data, plus what remained on failure')],
  },
  'p1-w08-l06-c02': {
    title: 'Complete, reopen and rename through PATCH',
    items: [
      'I checked PATCH true and false in Network and verified the UI matched the response.',
      'I renamed through the API, verified the 80-character contract, and kept an edit open through a failed request.',
    ],
    fields: [
      note('Observed boolean and title changes, plus preserved draft evidence'),
    ],
  },
  'p1-w08-l07-c03': {
    title: 'Verify real deletion and honest failure',
    items: [
      'I checked DELETE 204 with no response body, and compared invalid 400 with missing 404.',
      'A failed delete left the confirmed row visible with recovery feedback.',
    ],
    fields: [note('DELETE method, statuses and visible before/after behavior')],
  },
  'p1-w08-l08-c02': {
    title: 'Observe pending requests and shared routes',
    items: [
      'I used a slow request and tried two rapid submissions. Network showed only one write.',
      'I checked Dashboard, Tasks, Ideas and API Lab while navigating and verified Retry or request cleanup.',
    ],
    fields: [note('Actual request count and route/snapshot behavior')],
  },
  'p1-w08-l09-c03': {
    title: 'Trace a real failure and rerun the tests',
    items: [
      'I inspected a real payload and status or proxy response, reproduced one failure and repaired it.',
      'I ran the backend and frontend npm test commands and distinguished fake-fetch evidence from the real browser path.',
    ],
    fields: [
      note('Method, status or error, fix and actual local test results'),
    ],
  },
  'p1-w08-l10-c02': {
    title: 'Review one integration change',
    items: [
      'I inspected a focused Git diff and identified a contract error or obsolete storage write.',
      'I rejected or corrected it and reran the relevant local regression independently.',
    ],
    fields: [note('Reviewed behavior, changed file and observed evidence')],
  },
  'p1-w08-l11-c02': {
    title: 'Demonstrate the integrated project and an independent repair',
    choices: [
      'Stale load overrides a write',
      'Save discards its failed draft',
      'PATCH skips false',
      'DELETE 204 tries to parse JSON',
      'Wrong proxy path serves HTML',
    ],
    items: [
      'I exercised real GET, POST, both PATCH operations and DELETE through React and Express.',
      'I stopped and restarted Node, verified recovery and memory reset, and checked browser drafts or the old task key separately.',
      'I ran the project tests and build and repaired an unfamiliar failure without AI-generated code.',
    ],
    fields: [
      note('Observed statuses, recovery and actual suite/build results'),
      note('Independent symptom, cause, minimal edit and repeated regression'),
    ],
  },
}
