import type { Lab, LocalCheck } from './practicals'

export const weekSixLabs: Record<string, Lab> = {
  'p1-w06-l01-c02': {
    title: 'Normalize incoming ideas',
    task: 'Write normalizeIdeas(payload). Reject a non-array with new Error("Expected a list of ideas"). Skip invalid rows. Require positive safe integer IDs and string titles with 1–100 characters after trimming. Keep the first usable row for each ID. Return fresh records with an api- prefix and completed true only for boolean true. The fixtures include markup-looking titles, which must stay plain text.',
    starter:
      'function normalizeIdeas(payload) {\n  // Validate the array before processing its entries.\n}',
    checks: [
      'Reject the wrong top-level shape and accept an empty array.',
      'Trim and prefix usable rows, deduplicate and preserve the input.',
      'Reject invalid IDs and titles, including the 101-character boundary.',
    ],
  },
  'p1-w06-l10-c01': {
    title: 'Read a response with fake fetch',
    task: 'Implement async fetchIdeas(options). Call the supplied fetchImpl once with IDEAS_URL and {signal: options.signal}. That fake supplies read-only test responses. Reject !response.ok with an error containing the status before decoding. Await response.json(), return the supplied normalizeIdeas(body) result, and propagate transport, decode and cancellation errors.',
    starter:
      'async function fetchIdeas(options) {\n  // Fixtures provide fetchImpl, IDEAS_URL and normalizeIdeas.\n  // Use a local variable for each await.\n}',
    checks: [
      'Pass the correct URL and original signal; return normalized data.',
      'Reject HTTP 503 before reading the body.',
      'Propagate JSON and invalid-shape failures.',
      'Propagate network rejection and deliberate cancellation.',
    ],
  },
}

const note = (label: string) => ({ label, max: 450 })

export const weekSixProjects: Record<string, LocalCheck> = {
  'p1-w06-l03-c02': {
    title: 'Run a real Effect with cleanup',
    items: [
      'I mounted IdeasPage locally with Strict Mode enabled and observed the Effect start.',
      'I ran the late→empty retry fixture, waited for the late result, and verified it did not replace Empty.',
      'I repeated with an abortable request and confirmed cancellation produced no visible failure.',
    ],
    fields: [
      note(
        'Dependencies and the observed request order before and after Retry',
      ),
    ],
  },
  'p1-w06-l04-c02': {
    title: 'Observe four request states in React',
    items: [
      'I made the actual screen show Loading, Success, Empty and Error using the fixtures.',
      'Retry and offline controls stayed keyboard reachable. Loading and failure had status text and appropriate announcement semantics.',
    ],
    fields: [note('Mode and visible result for each of the four states')],
  },
  'p1-w06-l05-c02': {
    title: 'Recover offline and copy an idea',
    items: [
      'Switching to bundled samples during a late request kept the offline list visible.',
      'I copied the same sample twice and saw two unfinished tasks with different numeric IDs. The sample stayed unchanged.',
      'I inspected the request code and confirmed Copy writes only to the local list.',
    ],
    fields: [note('Source change, new fictional IDs and Retry outcome')],
  },
  'p1-w06-l06-c02': {
    title: 'Run the four local routes',
    items: [
      'BrowserRouter wraps App under Strict Mode.',
      'I visited /, /tasks, /ideas and /wrong and saw four distinct views.',
    ],
    fields: [note('Paths and view headings observed in the running project')],
  },
  'p1-w06-l07-c02': {
    title: 'Navigate and refresh by keyboard',
    items: [
      'I used Tab and Enter to move between views. The active link and focus were visible.',
      'I tried Back and Forward, refreshed /ideas and recovered from an unknown path using the page’s link.',
    ],
    fields: [note('Keyboard path, active link and direct-refresh result')],
  },
  'p1-w06-l08-c02': {
    title: 'Keep one task owner across routes',
    items: [
      'A temporary handler added two fictional tasks with one click and the resulting IDs were distinct.',
      'I checked Dashboard counts, navigated through Ideas and back to Tasks, and both records survived. I removed the temporary handler.',
    ],
    fields: [
      note('State owner, observed IDs and counts before and after navigation'),
    ],
  },
  'p1-w06-l09-c02': {
    title: 'Retain tasks and protect unreadable storage',
    items: [
      'A copied idea survived reloading /tasks on the same origin with the Week 5 key.',
      'On a disposable origin I reproduced a malformed record, saw a warning and preserved the exact value during memory-only use.',
      'I cancelled recovery once and checked the raw data before testing confirmed replacement.',
    ],
    fields: [note('Same-origin result, malformed value and recovery result')],
  },
  'p1-w06-l10-c02': {
    title: 'Diagnose client and UI failures separately',
    items: [
      'I ran npm test, reproduced the missing HTTP guard failure, restored it and reran the suite.',
      'In the real app I compared HTTP and transport failure fixtures and recovered without the public API.',
    ],
    fields: [
      note('Failed test, repaired test count and observed browser result'),
    ],
  },
  'p1-w06-l12-c01': {
    title: 'Demonstrate Study Tasks v6 locally',
    items: [
      'I tested all four routes, request states, Retry, offline and Copy, then exercised task operations and reload.',
      'I tested keyboard navigation and the unknown route at a narrow width.',
      'I actually ran npm test and npm run build, inspected git diff and traced a copied idea into local storage.',
    ],
    fields: [
      note('Test count, build result and one browser observation'),
      note(
        'Walk one action across components and identify where the data stays',
      ),
    ],
  },
  'p1-w06-l12-c03': {
    title: 'Repair an unfamiliar request or route bug',
    choices: [
      'An old response replaces the latest result',
      'Tasks disappear after route changes',
      'A route has the wrong active link or fallback',
      'A cancelled request appears as an error',
    ],
    items: [
      'I reproduced one unfamiliar variant and diagnosed it independently without AI-generated fixes.',
      'I made a minimal change and repeated the same regression in the running project.',
    ],
    fields: [
      note('Reproduction, hypothesis and root cause'),
      note('Exact behavior before and after the change'),
    ],
  },
}
