import type { Lab, LocalCheck } from './practicals'

export const weekTenLabs: Record<string, Lab> = {
  'p1-w10-l05-c02': {
    title: 'Validate fictional credentials',
    task:
      'Write normalizeEmail(email) and validateCredentials(body). For a string, trim and lowercase the email, otherwise return an empty string. Reject non-objects, arrays and keys other than email and password. The supplied isEmailAddress(email) checks the demo shape and length. Require a password string of 12–128 characters. Return { ok: false } for an invalid input or { ok: true, email, password } with the original password. All fixture credentials are fictional. Use no personal data.',
    starter:
      'function normalizeEmail(email) {\n  // Trim and lowercase an email string.\n}\n\nfunction validateCredentials(body) {\n  // Return ok, then include normalized email and unchanged password only on success.\n}',
    checks: [
      'Normalize mixed-case addresses and guard input types.',
      'Reject invalid email, array and non-object bodies.',
      'Enforce the password type and both length boundaries.',
      'Reject extra fields and preserve password case and whitespace.',
    ],
  },
  'p1-w10-l08-c02': {
    title: 'Capture owner-scoped repository queries',
    task:
      'Use the supplied async query(sql, values) recorder. Each function runs one statement against user_tasks. For list use WHERE owner_id = $1 and [ownerId]. For get and remove, use WHERE owner_id = $1 AND id = $2 and [ownerId, id]. Insert (owner_id, title) with VALUES ($1, $2). Update only completed in this lab using SET completed = $3 and the same owner-plus-ID predicate, with [ownerId, id, completed]. Select or return the id column. Return rows for list, the first row or null for get, create and setCompletion (check result.rows.length in this editor), and rowCount > 0 for remove. The recorder inspects text and values without executing SQL.',
    starter:
      'async function list(ownerId) {\n  // List only rows for this verified owner.\n}\nasync function get(ownerId, id) {\n  // Look up a row by both owner and task ID.\n}\nasync function create(ownerId, title) {\n  // Store the verified owner and title.\n}\nasync function setCompletion(ownerId, id, completed) {\n  // Use the verified owner and preserve false.\n}\nasync function remove(ownerId, id) {\n  // Scope deletion by owner and task ID.\n}',
    checks: [
      'Bind each caller independently for list and get.',
      'Use the verified owner and bind the fictional title on create.',
      'Require both owner and ID for an update and preserve false.',
      'Scope delete and distinguish a removed row from no match.',
    ],
  },
}

const note = (label: string) => ({ label, max: 450 })
export const weekTenProjects: Record<string, LocalCheck> = {
  'p1-w10-l03-c02': {
    title: 'Verify password hashing locally',
    items: [
      'I ran npm run demo:hash with fictional input and saw different salted records verify for the same candidate.',
      'The wrong candidate failed. The script printed only boolean outcomes.',
    ],
    fields: [note('Observed outcomes and what the salt changes')],
  },
  'p1-w10-l04-c02': {
    title: 'Preserve the prior task through migration',
    items: [
      'I verified the isolated development database and recorded a fictional legacy task ID before migration 002.',
      'I checked users, user_tasks and user_sessions and confirmed the legacy row stayed in tasks.',
    ],
    fields: [note('Database name, table names, and retained fictional task ID')],
  },
  'p1-w10-l05-c03': {
    title: 'Verify local registration and the public response',
    items: [
      'I implemented parameterized user repository methods and tested a successful registration against PostgreSQL.',
      'Invalid input got 400, the duplicate got 409, and the successful response exposed only public user fields.',
    ],
    fields: [note('Statuses and public field names, without any passwords or session values')],
  },
  'p1-w10-l06-c02': {
    title: 'Verify a real login and logout',
    items: [
      'I registered and logged in with a practice user. Refresh restored that user through /me.',
      'Logout returned an empty 204 and the next /me returned 401.',
    ],
    fields: [note('Observed register, login, restore and logout statuses only')],
  },
  'p1-w10-l07-c02': {
    title: 'Verify the origin guard locally',
    items: [
      'I ran the provided origin tests and distinguished a 403 origin failure from a 401 missing-session result.',
      'A disallowed write did not change any practice row. I can name the demo’s exact-origin assumption.',
    ],
    fields: [note('Origin test outcomes and the local configuration assumption')],
  },
  'p1-w10-l08-c03': {
    title: 'Verify owner-scoped task operations',
    items: [
      'I implemented all five repository methods with bound owner values and verified my account’s CRUD.',
      'A foreign ID returned 404 and left the row unchanged. An own PATCH preserved explicit false.',
    ],
    fields: [note('Methods, statuses, and the unchanged-row observation')],
  },
  'p1-w10-l09-c02': {
    title: 'Verify React’s session and account transitions',
    items: [
      'The task request waited for a verified /me. Refresh and an ended session led to the expected UI states.',
      'Signing out and switching accounts cleared the prior tasks. The browser stored no task or credential values in localStorage.',
    ],
    fields: [note('Observed request order and account-specific UI behavior')],
  },
  'p1-w10-l10-c02': {
    title: 'Verify the two-account permission matrix',
    items: [
      'I checked the separate _test database and ran the local test cases for both fictional accounts.',
      'I verified own CRUD, scoped lists and foreign GET, PATCH and DELETE denials against a known row, then confirmed its original values.',
    ],
    fields: [note('Status matrix and unchanged row result, without credential or cookie data')],
  },
  'p1-w10-l11-c02': {
    title: 'Record a defensive code review',
    items: [
      'I reviewed how the server assigns ownership and what fields it returns to the client.',
      'I corrected a local issue and observed the intended test fail before the correction and pass afterward.',
    ],
    fields: [note('Two findings and the relevant failing-then-passing test outcome')],
  },
  'p1-w10-l12-c02': {
    title: 'Demonstrate the multi-user project',
    items: [
      'I demonstrated the retained legacy row, authenticated CRUD, refresh and logout.',
      'I used two roles to verify isolated lists, all three foreign-ID denials and an unchanged owner row.',
      'I can trace verified identity from the session to the scoped SQL and explain the local evidence.',
    ],
    fields: [note('Redacted acceptance summary with session and access outcomes')],
  },
}
