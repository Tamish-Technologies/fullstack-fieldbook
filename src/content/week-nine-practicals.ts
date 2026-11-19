import type { Lab, LocalCheck } from './practicals'

const rowContract =
  'Return a fresh {id,title,completed,createdAt} for a row, or null when missing. Use the editor’s toIsoTimestamp(value) with created_at. Copy completed as its actual boolean.'

export const weekNineLabs: Record<string, Lab> = {
  'p1-w09-l09-c03': {
    title: 'Map rows and inspect repository reads',
    task:
      'Write toApiTask(row), async listTasks(completed) and async getTask(id). ' +
      rowContract +
      ' The supplied query(sql, values) returns {rows,rowCount} from a fake pool. Use an explicit values array. Select the four columns from tasks ordered by id, with a completed = $1 filter when completed is true or false. null requests all rows. For get, use WHERE id = $1 and [id]. Map the result before returning it. The editor does not execute SQL.',
    starter:
      'function toApiTask(row) {\n  // Map created_at and preserve the boolean.\n}\nasync function listTasks(completed) {\n  // query(sql, values) gives fixture rows.\n}\nasync function getTask(id) {\n  // Return one mapped row or null.\n}',
    checks: [
      'Map both timestamp input types and keep false.',
      'Read all rows in ID order and map each result.',
      'Bind the completed filter and return an empty list when appropriate.',
      'Bind a numeric ID and map a missing row to null.',
    ],
  },
  'p1-w09-l10-c02': {
    title: 'Bind title and completion as values',
    task:
      'Write async insertTask(title) and async setCompletion(id, completed). Use the supplied query(sql, values), which captures text and arguments rather than executing SQL. Insert into tasks(title) using VALUES ($1) and [title]. Update tasks with completed = $2 and WHERE id = $1 using [id, completed]. Use RETURNING id, title, completed, created_at. ' +
      rowContract +
      ' Reuse your mapper from Lesson 9 or include a new one.',
    starter:
      'function toApiTask(row) {\n  // Reuse your mapper.\n}\nasync function insertTask(title) {\n  // Keep the statement fixed; bind the title.\n}\nasync function setCompletion(id, completed) {\n  // The two parameters carry the ID and boolean.\n}',
    checks: [
      'Keep the same INSERT statement with three different titles.',
      'Pass apostrophes and SQL-looking text as literal data.',
      'Bind the ID and explicit false or true in the update.',
      'Return null when the bounded update finds no row.',
    ],
  },
}

const note = (label: string) => ({ label, max: 450 })

export const weekNineProjects: Record<string, LocalCheck> = {
  'p1-w09-l02-c02': {
    title: 'Verify the local development and test database targets',
    items: [
      'I connected as the learning role and observed the current database in both connections.',
      'The test database is distinct and ends in _test. I checked that backend/.env is ignored.',
    ],
    fields: [
      note(
        'Observed database names and login outcome, without credentials or URLs',
      ),
    ],
  },
  'p1-w09-l03-c02': {
    title: 'Inspect the migrated tasks table',
    items: [
      'I predicted identity, title, completed and timestamp behavior.',
      'I ran the initial migration and inspected the actual column defaults and constraints.',
    ],
    fields: [
      note('Observed schema and one invalid input the database rejects'),
    ],
  },
  'p1-w09-l04-c02': {
    title: 'Predict and verify SELECT results',
    items: [
      'I predicted matching IDs for active, completed and descending-ID reads.',
      'I ran each query and counted the rows in the development database.',
    ],
    fields: [note('Expected and observed IDs and count')],
  },
  'p1-w09-l05-c02': {
    title: 'Inspect RETURNING and database defaults',
    items: [
      'I inserted a fictional title, recorded its generated ID and verified it with SELECT.',
      'I observed the default completion and timestamp and compared the row with the API response shape.',
    ],
    fields: [note('Returned column values and their API field names')],
  },
  'p1-w09-l06-c02': {
    title: 'Run a bounded rollback exercise',
    items: [
      'I used the exact newly inserted ID for the read, update and delete in one transaction.',
      'I ended with ROLLBACK and verified the original rows were unchanged and the temporary task absent.',
    ],
    fields: [
      note('Target ID, observed changes, and the result after rollback'),
    ],
  },
  'p1-w09-l07-c02': {
    title: 'Rerun and inspect the initial migration',
    items: [
      'I checked the development target, ran the migration twice and inspected the task table.',
      'I verified an existing task survived and can explain why a conflicting schema needs an explicit upgrade.',
    ],
    fields: [note('Database name, table result and observed retained row')],
  },
  'p1-w09-l08-c02': {
    title: 'Connect Express with private environment settings',
    items: [
      'I used the ignored .env and observed health reporting postgres on the migrated development database.',
      'I reproduced a safe database connection failure in my own setup, restored it and verified recovery.',
    ],
    fields: [
      note(
        'Observed health response and redacted failure and recovery categories',
      ),
    ],
  },
  'p1-w09-l09-c02': {
    title: 'Wire SQL behind the existing HTTP routes',
    items: [
      'I implemented repository reads and writes and observed the mapped JSON, including the timestamp.',
      'I verified confirmed create, patch false, missing row and empty delete responses against real storage and ran the local tests.',
    ],
    fields: [
      note(
        'Observed method, status and one mapped field or missing-row outcome',
      ),
    ],
  },
  'p1-w09-l11-c02': {
    title: 'Run the isolated real PostgreSQL test',
    items: [
      'I read the database guard and cleanup and verified the separate _test connection before running it.',
      'I ran both backend test commands and can explain what the fake pool, HTTP tests and real DB verify.',
    ],
    fields: [
      note(
        'Actual results for npm test and npm run test:db, without private logs',
      ),
    ],
  },
  'p1-w09-l12-c02': {
    title: 'Demonstrate durable CRUD and independent repair',
    choices: [
      'Missing column or migration',
      'PATCH false becomes absent',
      'Wrong row mapping',
      'Unreachable database or wrong target',
    ],
    items: [
      'I created, toggled, renamed and read a fictional task in React and PostgreSQL, then restarted Express and fetched the same ID.',
      'I observed a bodyless DELETE and absence in the database. I ran the project tests and build and kept .env out of Git.',
      'I reproduced a fault in a disposable copy, repaired it independently and repeated the same check.',
    ],
    fields: [
      note('Observed same-ID before/after results and actual test counts'),
      note('Independent symptom, minimal repair and repeated outcome'),
    ],
  },
}
