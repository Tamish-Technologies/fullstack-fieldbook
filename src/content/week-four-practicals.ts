import type { Lab, LocalCheck } from './practicals'

export const weekFourLabs: Record<string, Lab> = {
  'p1-w04-l01-c02': {
    title: 'Trace a pending operation',
    task: 'Implement trace(label). Call mark(label) immediately. Await load(), mark the returned value, then mark "done". Return a Promise that settles after all three marks. The fixture decides when load finishes.',
    starter:
      'async function trace(label) {\n  // Start recording before waiting.\n}',
    checks: [
      'Return the whole operation.',
      'Record the immediate step while the loader is pending.',
      'Record the resolved value and finish in order.',
    ],
  },
  'p1-w04-l02-c01': {
    title: 'Return a connected Promise chain',
    task: 'Implement chain() with load(), .then(), .catch() and .finally(). The success handler calls doubleLater(value), which also returns a Promise. Return its eventual number. Recover with null on rejection. Call cleanup() exactly once at settlement.',
    starter: 'function chain() {\n  return load();\n}',
    checks: [
      'Propagate both eventual numbers.',
      'Recover with null on rejection.',
      'Clean up once after either outcome.',
    ],
  },
  'p1-w04-l03-c01': {
    title: 'Restore the loading flag',
    task: 'Implement async read(). Call setLoading(true), await load() in try, return its value, and return null in catch. Call setLoading(false) in finally. Use a separate local variable for the awaited value.',
    starter:
      'async function read() {\n  // Record loading before the first await.\n}',
    checks: [
      'Return the eventual value on success.',
      'Recover from rejection.',
      'Restore the flag on every settled path.',
    ],
  },
  'p1-w04-l06-c01': {
    title: 'Normalize an idea payload',
    task: 'Implement normalize(rows, limit). Default limit to 8 when omitted. Throw new Error("Invalid input") for a non-array or a limit that is not a nonnegative safe integer. Keep the first valid record per positive safe integer ID with a boolean completed and a trimmed title of 1–100 characters. Return at most limit fresh {id,title,completed} records in input order. Use for…of and a guard around accepted rows.',
    starter:
      'function normalize(rows, limit = 8) {\n  const accepted = [];\n  // Validate the container, then inspect each candidate.\n  return accepted;\n}',
    checks: [
      'Reject invalid containers and limits.',
      'Clean, validate and deduplicate valid rows.',
      'Apply the limit after validation.',
      'Preserve the source and return fresh records.',
    ],
  },
  'p1-w04-l07-c01': {
    title: 'Distinguish a response from success',
    task: 'Implement async request(). Await fetchImpl() with no arguments. If response.ok is false, throw an Error whose message includes response.status. Otherwise await response.json(), then return normalizeIdeas(payload). Allow errors to reach your caller. These injected operations run offline.',
    starter:
      'async function request() {\n  const response = await fetchImpl();\n  // Check the status before decoding the body.\n}',
    checks: [
      'Decode and normalize a successful response.',
      'Reject HTTP 503 before parsing.',
      'Propagate network, JSON and schema errors.',
    ],
  },
  'p1-w04-l09-c01': {
    title: 'Recover the inbox after failure',
    task: 'Implement async refresh(). Use setDisabled(true/false) for Load. Before awaiting load(), call show("loading", []). Show "success" with its rows, "empty" with [] for an empty result, or "error" with [] on rejection. Restore the button for retry in finally.',
    starter:
      'async function refresh() {\n  // Make the pending state visible first.\n}',
    checks: [
      'Expose pending state and clear stale results.',
      'Distinguish populated and empty success.',
      'Recover controls and permit a successful retry.',
    ],
  },
  'p1-w04-l11-c01': {
    title: 'Copy an offline idea into local tasks',
    task: 'offline(sample) returns normalizeIdeas(sample) without writing. copy(tasks,idea) returns the next collection and calls save(next) once. Append an incomplete task using its title and a fresh local ID. Find the highest local ID with a loop (start at zero). Keep earlier records and the remote input intact.',
    starter:
      'function offline(sample) {\n}\nfunction copy(tasks, idea) {\n  return tasks;\n}',
    checks: [
      'Normalize the offline sample without saving tasks.',
      'Allocate distinct local IDs and preserve existing tasks.',
      'Persist only explicit copies.',
    ],
  },
  'p1-w04-l11-c02': {
    title: 'Render literal text and route a Copy click',
    task: 'paint(idea,titleNode) receives a real span. Set its textContent and call addCopy(idea.id, label) with a label including the title. The fixture delegates clicks to onCopy(). nearestId() returns the nearest button ID or null. For a valid click call copyById(id) once and announce(message).',
    starter:
      'function paint(idea, titleNode) {\n}\nfunction onCopy() {\n  // Ignore clicks outside a Copy button.\n}',
    checks: [
      'Display markup-looking titles as literal text.',
      'Name and identify both Copy buttons.',
      'Resolve nested clicks by ID and announce completion.',
    ],
  },
}
export const weekFourProjects: Record<string, LocalCheck> = {
  'p1-w04-l08-c01': {
    title: 'Self-verify a Network panel investigation',
    items: [
      'I served my project locally and inspected a successful request URL, method, status and response.',
      'I compared a missing local resource with an offline request and restored the connection.',
    ],
    fields: [
      {
        label:
          'One observed HTTP status, the separate network symptom, and the repair',
        max: 400,
      },
    ],
  },
  'p1-w04-l11-c03': {
    title: 'Self-verify a copy across reload',
    items: [
      'Loading the offline sample and simulating failure both preserved my existing tasks.',
      'I copied one idea, compared local IDs and reloaded the same origin.',
      'I checked edit, filter, search, sort, toggle and delete and tried a title containing literal markup.',
    ],
    fields: [
      {
        label: 'Original IDs, copied ID and one observation after reload',
        max: 400,
      },
    ],
  },
  'p1-w04-l12-c01': {
    title: 'Demonstrate Study Tasks v4 locally',
    items: [
      'I served index.html and tests.html on the same origin as my previous project and preserved its storage key.',
      'My GET client checks status, awaits JSON and validates shape.',
      'I demonstrated loading, success, empty, error, retry and offline sample states.',
      'I copied an idea with a fresh local ID, checked literal text and reloaded.',
      'I ran the Week 3 regressions and at least five meaningful fake-network tests including success, failure and invalid payloads.',
      'I reviewed the change in Git and reproduced a defect before and after its repair.',
    ],
    fields: [
      { label: 'Observed local test counts and a regression case', max: 400 },
      { label: 'One reviewed change and what it fixed', max: 400 },
    ],
  },
  'p1-w04-l12-c03': {
    title: 'Independent diagnostic transfer',
    choices: [
      'A maintenance response appears as a successful inbox',
      'A copy collides with a saved task',
      'Load stays disabled after a rejection',
    ],
    items: [
      'I worked independently without AI, using documentation or DevTools as needed.',
      'I reproduced the failure, made a small repair and ran a regression that distinguished the two versions.',
    ],
    fields: [
      { label: 'Fixture, symptom and root cause', max: 400 },
      { label: 'Smallest fix and observed before/after result', max: 400 },
    ],
  },
}
