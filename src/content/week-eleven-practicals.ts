import type { Lab, LocalCheck } from './practicals'

export const weekElevenLabs: Record<string, Lab> = {
  'p1-w11-l04-c02': {
    title: 'Build a safe request log record',
    task:
      'Write buildRequestLog(input). Return a new object with exactly event: "http_request", requestId, method, route, status, and elapsedMs. Use the supplied isRequestId, isHttpMethod, and isRouteTemplate helpers. For an unrecognized route use "unmatched". Return null if the input, ID, method, or numeric fields are invalid. Status must be an integer from 100 to 599 and elapsedMs a nonnegative safe integer. Reject arrays. Never copy extra fields, including the raw URL, cookie, token, body or headers.',
    starter:
      'function buildRequestLog(input) {\n  // Validate the allowed fields and construct a new record.\n}',
    checks: [
      'Keep the approved event fields and omit all private extras.',
      'Keep matched route templates and replace unknown routes.',
      'Validate status range and elapsed time.',
      'Reject invalid IDs, methods and input shapes.',
    ],
  },
  'p1-w11-l05-c02': {
    title: 'Classify safe public API errors',
    task:
      'Write classifyPublicError(error) and return exactly { status, code, message }. Map type "entity.parse.failed" to 400 INVALID_JSON, type "entity.too.large" to 413 PAYLOAD_TOO_LARGE, and database failures to 503 DB_UNAVAILABLE. Recognize ECONNREFUSED, ECONNRESET, ETIMEDOUT, 57P01 and string codes starting with 08 (use the supplied hasDbClassPrefix(code) in this editor). All other inputs get 500 INTERNAL_ERROR. Use one fixed, descriptive message of your own for each category and never copy error.message or stack.',
    starter:
      'function classifyPublicError(error) {\n  // Check known categories first and return a safe fallback.\n}',
    checks: [
      'Map malformed JSON to a fixed safe 400 response.',
      'Map a body exceeding the limit to a fixed safe 413 response.',
      'Map each specified connection category to a fixed safe 503 response.',
      'Hide unknown internal details in a consistent 500 fallback.',
    ],
  },
}

const field = (label: string) => ({ label, max: 450 })
export const weekElevenProjects: Record<string, LocalCheck> = {
  'p1-w11-l01-c02': {
    title: 'Run one Arrange–Act–Assert test',
    items: ['I added a pure-helper boundary case and ran its file with node --test.', 'I can name the evidence this unit test supplies and a claim requiring another layer.'],
    fields: [field('Test name, expected result, and actual result')],
  },
  'p1-w11-l02-c02': {
    title: 'Verify the local HTTP contract',
    items: ['I ran the backend unit and HTTP tests and identified the intentional failures.', 'I observed 401 for a protected request and JSON 404 for an unknown API route.'],
    fields: [field('Actual commands, statuses, and a limitation of the fake session')],
  },
  'p1-w11-l03-c02': {
    title: 'Check the real database and two browser accounts',
    items: ['I verified a separate disposable _test target and ran the live PostgreSQL suite.', 'I used different profiles for owner and second account and verified three scoped denials with the owner row unchanged.'],
    fields: [field('Verified target name and redacted permission results')],
  },
  'p1-w11-l04-c03': {
    title: 'Match an HTTP response to a safe log entry',
    items: ['I fixed request ID propagation and ran the focused test.', 'I matched the response identifier to the safe log for a reproduced request.'],
    fields: [field('Method, safe route label, result and correlation ID only')],
  },
  'p1-w11-l05-c03': {
    title: 'Verify safe API failure and React recovery',
    items: ['I fixed classification and verified that client output contained no raw exception or credentials.', 'I reproduced a failed write. The list stayed confirmed, the draft remained, and retry after checking recovery succeeded.'],
    fields: [field('Status, visible recovery instruction, and observed result after retry')],
  },
  'p1-w11-l06-c02': {
    title: 'Verify fail-fast configuration',
    items: ['I ran the config tests for invalid port, invalid proxy hops, and the production HTTP-origin guard.', 'I checked that the configured .env stays ignored and confirmed client settings contain no secrets.'],
    fields: [field('Test names and variable names only')],
  },
  'p1-w11-l07-c02': {
    title: 'Inspect local security-relevant response behavior',
    items: ['I checked a security header and noted the browser cookie flag names.', 'I verified the origin and ownership denials and recorded the local HTTP limitation.'],
    fields: [field('Observed header names, response statuses, and transport limitation')],
  },
  'p1-w11-l08-c02': {
    title: 'Demonstrate liveness through a readiness failure',
    items: ['I used a safe controlled failure and saw /api/live 200 while /api/health returned 503.', 'I restored the dependency and verified recovery without deleting learner data.'],
    fields: [field('Normal, unavailable and recovered status pairs')],
  },
  'p1-w11-l09-c02': {
    title: 'Run a same-origin built preview',
    items: ['I built the frontend and started the local Express preview from the learner guide.', 'I refreshed /tasks and /ideas and checked the unknown API response and missing asset behavior.'],
    fields: [field('Build and preview commands, observed route statuses and response types')],
  },
  'p1-w11-l10-c02': {
    title: 'Rehearse a release and rollback',
    items: ['I reviewed Git status, the whitespace check, tests and build.', 'I recorded a migration decision, a smoke sequence and a local rollback or restore rehearsal.'],
    fields: [field('Reviewed version, smoke outcomes, and rollback result')],
  },
  'p1-w11-l11-c02': {
    title: 'Review the release candidate',
    items: ['I documented a reproduced defect, a focused fix and the same check passing.', 'I recorded actual evidence from unit, HTTP, live database and built-browser checks, including both accounts.', 'I recorded residual risks and a rollback path and committed the reviewed local project.'],
    fields: [field('Redacted test results, release decision and reviewed commit')],
  },
}
