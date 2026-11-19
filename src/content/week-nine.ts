import type { Reading } from './week-one'

const lessons: Reading[] = [
  {
    minutes: '25–40',
    goals: [
      'Trace a task from React through the repository to PostgreSQL.',
      'Explain what survives a Node restart and what evidence proves it.',
    ],
    heading: 'Move confirmed tasks out of Node memory',
    explanation: [
      'Week 8 React sent requests to Express, which stored tasks in an array inside its running process. Week 9 keeps that HTTP contract and gives Express a durable store. A database is the named collection you connect to. A table has named, typed columns. Each row represents one task. PostgreSQL owns the saved rows while React renders a snapshot and keeps unsaved drafts separately.',
      'The browser still calls relative /api URLs through the development proxy. The Express route validates inputs and decides which HTTP status to send. A repository translates those validated operations into SQL. A backend-only connection pool talks to PostgreSQL and returns records for the response. Browser code has no database credentials. Keep real credentials in backend/.env and use one dedicated local learning role.',
      'Restarting the API and loading the same task by ID demonstrates that the data outlived the Node process. Opening a browser tab or reusing an already-rendered React list does not establish that. This project has a shared task table and is for fictional data on loopback. User login and per-user ownership come later.',
    ],
    predict:
      'You stop Express, leave the database running, then start Express and issue a fresh GET for a known ID. Where does the task come from?',
    example:
      'React → Express route → repository → pg Pool → PostgreSQL\n      ← HTTP envelope ← mapped row ← PostgreSQL result',
    result:
      'PostgreSQL stores the row. The new Express process reads it and returns the familiar Week 8 JSON. React updates from the fresh response.',
    exercise:
      'Download the Week 9 starter and inspect START_HERE.md and backend/src/app.js. Preserve a separate Week 8 checkpoint. Draw a request path for reading one task and label the layers that hold a draft, render a snapshot, validate an ID and store a row.',
    hints: [
      'Trace one task ID through the whole chain.',
      'Inspect the route separately from the repository it calls.',
      'Name the process you would stop while checking durability.',
    ],
    mistake:
      'Changing the storage implementation does not require changing the frontend’s response fields or giving it a database connection.',
    takeaway: 'Keep the HTTP API stable and move task durability behind it.',
  },
  {
    minutes: '40–65',
    goals: [
      'Connect to a local PostgreSQL service with a dedicated role.',
      'Verify separate development and test targets before configuring Node.',
    ],
    heading: 'Know which database you are connected to',
    explanation: [
      'Install PostgreSQL and a client such as psql or pgAdmin. The client opens a connection to a running server. Use your installation’s normal local administrator login to set up the exercise. From an administrator session create the study_tasks login role. In psql use the interactive password prompt below. In pgAdmin, create a role with login enabled and set its password in the Definition tab.',
      'Create the development and test databases in separate statements outside a transaction. Make the learning role their owner. If these names already exist, inspect the role and ownership before using them. Preserve existing data. Connect as study_tasks to each named database, and check current_database() and current_user. The dedicated _test target is for the automated isolation exercise.',
      'Read backend/.env.example. Copy it to backend/.env and fill in the local host, port, role, password and database names. Keep the active file untracked. If the password contains URL-reserved characters, percent-encode those characters in the connection URL. Do not paste connection strings into logs, notes or screenshots.',
    ],
    predict:
      'A connection succeeds but current_database() reports postgres. Can you assume it is the exercise database?',
    example:
      'CREATE ROLE study_tasks LOGIN;\n-- In psql only, set the password interactively:\n\\password study_tasks\n-- Run each line separately outside a transaction:\nCREATE DATABASE study_tasks_week9 OWNER study_tasks;\nCREATE DATABASE study_tasks_week9_test OWNER study_tasks;',
    result:
      'The server may be correct while the selected database is wrong. Connect to the named development or test database explicitly and confirm the result before making schema or data changes.',
    followUp: {
      title: 'Check the targets as the learning role',
      example:
        'psql -h 127.0.0.1 -p 5432 -U study_tasks -d study_tasks_week9 -W\n-- In psql or the equivalent pgAdmin connection:\nSELECT current_database(), current_user;',
      reasoning:
        'Enter the password privately when prompted. Use the port configured by your installation if it differs from 5432. Repeat for study_tasks_week9_test. In pgAdmin, open the Query Tool from the specific database node. Check the returned name rather than the window title.',
    },
    exercise:
      'Create or locate both dedicated databases, connect to each and verify the names differ. Copy .env.example to .env (PowerShell: Copy-Item .env.example .env). Check git status so the untracked configuration is excluded. Record only database names and the observed connection result.',
    hints: [
      'A running service, login role and database name solve different parts of setup.',
      'A refused connection usually means the host or service is wrong before credentials are checked.',
      'Compare both database names before running any test that writes.',
    ],
    mistake:
      'Reusing the development database for tests makes it easy to confuse practice data with automated setup and cleanup.',
    takeaway: 'Verify the server, role and exact database before writing.',
  },
  {
    minutes: '30–45',
    goals: [
      'Read the tasks table definition and explain each constraint.',
      'Inspect the actual table with the local client.',
    ],
    heading: 'Teach PostgreSQL what a valid task looks like',
    explanation: [
      'The migration defines id as an integer identity primary key. PostgreSQL supplies the ID at insert time and the primary key enforces uniqueness and non-null identity. title is VARCHAR(80) NOT NULL, with a CHECK that rejects space-only titles. NOT NULL rejects missing values but does not by itself reject an empty string.',
      'completed is a NOT NULL Boolean with DEFAULT FALSE. Leaving the column out uses the default. Explicit NULL remains invalid. created_at is TIMESTAMPTZ with DEFAULT NOW(). The repository turns the driver timestamp into ISO text named createdAt for the existing React client.',
      'API validation gives useful 400 messages for malformed input before writing. Table constraints protect the stored representation even when a SQL client writes directly. PostgreSQL btrim in the starter checks ordinary spaces; JavaScript trim covers a wider set of whitespace. Read the actual rule before claiming they are identical.',
    ],
    predict:
      'Given an INSERT that supplies only a valid title, which columns will PostgreSQL fill? Would explicit NULL completed succeed?',
    example:
      'id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY\ntitle VARCHAR(80) NOT NULL\ncompleted BOOLEAN NOT NULL DEFAULT FALSE\ncreated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()',
    result:
      'The database supplies the ID, false and a timestamp. Explicit NULL completed fails the column constraint. The table also has a separate CHECK on the trimmed title.',
    exercise:
      'Sketch the four columns and predictions. In backend run npm ci then npm run migrate after verifying the development target from Lesson 2. In psql inspect with \\d tasks, or refresh Tables → tasks in pgAdmin and inspect Columns and Constraints. Lesson 7 returns to the migration mechanics.',
    hints: [
      'Read identity, primary key and default independently.',
      'Compare an omitted column with a supplied NULL.',
      'The migration must run before the table is visible.',
    ],
    mistake:
      'Treating a Boolean default as a constraint would miss the distinction between omitted and explicitly invalid input.',
    takeaway:
      'Database constraints and HTTP validation protect different boundaries.',
  },
  {
    minutes: '25–40',
    goals: [
      'Predict exact rows using WHERE and ORDER BY.',
      'Query named fields and count with PostgreSQL.',
    ],
    heading: 'Choose rows, then order the results',
    explanation: [
      'SELECT lists the columns you want returned. FROM identifies the table, WHERE keeps matching rows, and ORDER BY defines output order. SQL uses = for equality. Use completed = FALSE for active tasks, not the JavaScript operator ===. Use explicit columns to make the API-facing shape easier to review.',
      'Without ORDER BY the database does not promise a stable order. ORDER BY id DESC places higher IDs first. That is ID order, not necessarily the last time a task was edited. COUNT(*) counts the rows that match the query. Write a prediction before executing the query.',
    ],
    predict:
      'Rows 2 and 5 are active and row 9 is completed. Which IDs and order should this query return?',
    example:
      'SELECT id, title\nFROM tasks\nWHERE completed = FALSE\nORDER BY id DESC;',
    result:
      'IDs 5 and 2, in that order. The completed row does not match. Only id and title appear.',
    followUp: {
      title: 'Add a tiny fixture only if the table is empty',
      example:
        "INSERT INTO tasks (title, completed) VALUES\n  ('Practice an active query', FALSE),\n  ('Practice a completed query', TRUE)\nRETURNING id, completed;",
      reasoning:
        'Use the returned IDs for the filter exercise. Lesson 5 explains the INSERT columns and defaults in detail.',
    },
    exercise:
      'Use the development connection. If empty, insert two fictional titles with explicit completed TRUE and FALSE, then note their returned IDs. Run separate completed and active reads, a COUNT(*) and a newest-ID-first query. Compare your predicted rows with the actual results.',
    hints: [
      'Decide eligibility before sorting.',
      'Use column names from Lesson 3.',
      'Compare COUNT(*) with and without a WHERE clause.',
    ],
    mistake:
      'Reading the first row from an unordered query is not a stable way to find the greatest ID.',
    takeaway: 'Use explicit columns, precise filters and deliberate ordering.',
  },
  {
    minutes: '25–40',
    goals: [
      'Insert one row and inspect the values PostgreSQL supplies.',
      'Map a returned database record to an HTTP create response.',
    ],
    heading: 'Let the database assign the saved ID',
    explanation: [
      'INSERT lists the written columns and corresponding values. Supply only title for a normal new task. PostgreSQL generates the ID and supplies completion and timestamp defaults. RETURNING reads specified columns of the newly inserted row directly. A subsequent SELECT by that ID should reveal the same record.',
      'The repository will map created_at to createdAt. Express can then return 201 with {data: task} and Location for the database-assigned ID. React should keep that record rather than guessing an ID. Identity sequences can skip numbers. The API needs a stable identifier, not a contiguous count.',
    ],
    predict:
      'This statement omits id, completed and created_at. Which fields should RETURNING show?',
    example:
      "INSERT INTO tasks (title)\nVALUES ('Week 9: review the contract')\nRETURNING id, title, completed, created_at;",
    result:
      'The actual allocated ID, supplied title, false and a database timestamp. Query that returned ID to verify the stored value.',
    exercise:
      'Insert one fictional row in the dedicated development database. Record its returned ID and defaults. Query it using its exact ID. Compare the column names with the JSON envelope a successful POST should return in Lesson 9.',
    hints: [
      'Keep the columns aligned with the values positions.',
      'Use the returned ID in the follow-up SELECT.',
      'The response timestamp is mapped later by the repository.',
    ],
    mistake:
      'Reading MAX(id) as the result of your INSERT can select someone else’s row if another insert occurs.',
    takeaway: 'RETURNING identifies the row affected by this statement.',
  },
  {
    minutes: '35–50',
    goals: [
      'Run a rollback exercise with a verified ID for every write.',
      'Interpret zero affected rows and describe the effect of omitting WHERE.',
    ],
    heading: 'Verify the target before updating or deleting',
    explanation: [
      'UPDATE modifies matching rows. DELETE removes matching rows. Both need a WHERE clause that identifies the task under discussion. Using a title as the target can affect several tasks with identical titles. In this exercise all writes are limited to the ID returned by a fresh fictional INSERT.',
      'A transaction groups statements from BEGIN until COMMIT or ROLLBACK. Use BEGIN before the insert and ROLLBACK at the end. Existing rows stay unchanged. The identity sequence can still consume an ID. RETURNING exposes affected rows. If no row matches an otherwise valid ID, the repository returns null or false and the route can send 404.',
      'The psql file backend/sql/sql-lab.sql records the new ID with \\gset and uses it for the rest of the transaction. In pgAdmin run each SQL statement in the same Query Tool session, omit the psql commands and replace :id with the returned value. If a statement fails, roll back before trying again.',
    ],
    predict:
      'The lab inserts a temporary row, updates and deletes that same ID, then rolls back. What will a follow-up read show?',
    example:
      '-- Use :id from the psql lab, or substitute the actual returned integer.\nUPDATE tasks SET completed = TRUE WHERE id = :id RETURNING id, completed;\nDELETE FROM tasks WHERE id = :id RETURNING id;',
    result:
      'The temporary row is absent and the original rows are unchanged. The rollback ends the transaction. The unused identity number may remain a gap.',
    exercise:
      'Check the development database name, capture an ordered read of the existing rows, then run the lab. In psql use \\i with the path to backend/sql/sql-lab.sql or run the statements manually. Compare the existing rows afterwards. Explain what an update without WHERE could affect without executing it.',
    hints: [
      'Keep all transaction statements in the same connection.',
      'Read the inserted ID before using it.',
      'Verify the final count for the exact lab ID is zero.',
    ],
    mistake:
      'A transaction in one SQL tab does not protect operations run from a different connection.',
    takeaway:
      'Bound a write by identity, verify the result and deliberately end the transaction.',
    extension:
      'Optional: run a read-only report grouping tasks by completed and counting each group.',
  },
  {
    minutes: '25–40',
    goals: [
      'Run and inspect the initial migration twice on the development database.',
      'Explain why an existing incompatible schema needs an explicit upgrade.',
    ],
    heading: 'Make schema setup repeatable',
    explanation: [
      'A migration is a reviewed schema change stored with the project. DDL, such as CREATE TABLE, changes structure. DML, such as INSERT or UPDATE, changes data. Start a database, create and connect to the named database, apply schema changes, then run repository operations that need the table.',
      'The starter’s runner reads backend/migrations/001_create_tasks.sql and sends it through the configured pool. It prints the connected database name, so verify the development target. CREATE TABLE IF NOT EXISTS allows this first migration to run twice without adding a duplicate table. It does not verify every existing column, change a wrong type or replace a future migration system.',
    ],
    predict:
      'A table named tasks already exists but has no completed column. What can you infer after the migration prints success?',
    example:
      'npm run migrate\n# Inspect the connected database and then the tasks table.\nnpm run migrate',
    result:
      'The table name existed, so the initial CREATE statement did not repair or replace it. An explicit reviewed upgrade would be needed for an incompatible table. The learner exercise uses a fresh dedicated database.',
    exercise:
      'From backend run the migration twice on the verified development database. Use psql or pgAdmin to inspect one tasks table and its columns. Check that your fictional task from Lesson 5 still exists, then explain how a later schema change differs.',
    hints: [
      'Inspect both the runner script and the SQL file it reads.',
      'Check the database name before interpreting success output.',
      'Use the table definition rather than table existence alone.',
    ],
    mistake:
      'Recreating an existing table to make a test pass could discard rows. Inspect and use a reviewed migration for a real change.',
    takeaway:
      'Repeatable setup means a known target, reviewed SQL and inspected results.',
  },
  {
    minutes: '35–50',
    goals: [
      'Configure a bounded backend pool using private environment settings.',
      'Distinguish connectivity, schema and task validation failures.',
    ],
    heading: 'Keep the database connection behind Express',
    explanation: [
      'A pool reuses connections instead of opening one for every request. The starter limits the pool and connection wait time. The backend reads DATABASE_URL from its own .env file. Vite needs only the HTTP endpoint path. TEST_DATABASE_URL is read by the separate test entry point. Stop the API and drain its pool during shutdown.',
      'Start from backend with npm run dev after migrating. Startup checks a database connection before listening. GET /api/health runs SELECT 1 and returns storage:"postgres". It checks connectivity without reading tasks. An unimplemented task repository can still return 500 at this point. If the database stops after startup, connection failures can yield 503. Invalid user input is still 400 and a missing valid record is 404.',
      'Check the local PostgreSQL service, port and target name when a connection fails. Check the API port separately. When debugging a wrong URL, report the failed stage or error category without the connection string, stack trace or credential.',
    ],
    predict:
      'The API reports postgres in health, but /api/tasks fails. What does the health result actually establish?',
    example:
      'npm run dev\n# In a separate terminal or a browser:\ncurl -i http://127.0.0.1:3001/api/health',
    result:
      'The backend can connect. The read operation also needs the schema and implemented repository. Check migration and list() separately. If the DB is unavailable at startup, the API should exit with a configuration or connectivity message.',
    exercise:
      'Check the ignored .env, run the API and inspect health. In your dedicated development setup, stop the database only if it is yours to stop, or try an intentionally unused port in a disposable backend copy. Observe a safe startup failure and restore the original settings. On Windows use curl.exe or browser Network.',
    hints: [
      'Read the process terminal before changing React.',
      'Confirm both database names privately.',
      'Use health before reaching for task routes.',
    ],
    mistake:
      'Adding a VITE_ prefix to a database URL can expose it to the client bundle. Keep the database credentials only in the backend environment.',
    takeaway:
      'A working connection is one checked dependency. It is separate from the API and repository contract.',
  },
  {
    minutes: '45–65',
    goals: [
      'Implement SQL repository reads and writes behind the existing routes.',
      'Map PostgreSQL field names and driver values into the API response.',
    ],
    heading: 'Give SQL and HTTP their own responsibilities',
    explanation: [
      'In backend/src/task-repository.js complete the five TODOs. Use list and get first to check a read path. list selects explicit columns in ID order, and adds WHERE completed = $1 with a Boolean value only when the filter is not null. get selects WHERE id = $1. Map missing single rows to null and lists to arrays, including an empty array.',
      'create inserts title through a placeholder and returns the new record. update uses the target ID and accepted fields. Use null to represent an omitted field when using COALESCE, and preserve false with patch.completed ?? null. remove sends a bounded DELETE and returns whether rowCount is greater than zero. Keep route status and shape unchanged.',
      'The driver commonly returns TIMESTAMPTZ as a Date. Map created_at to createdAt using ISO text. Keep completed:false unchanged. The browser lab supplies toIsoTimestamp(value) for the Date/string conversion and query(sql, values) for fake pool responses. The editor does not run SQL or load a driver. The real methods use pool.query and the actual conversion separately.',
    ],
    predict:
      'An update has ID 7 and patch {completed:false}. Which value array retains the user’s intent?',
    example:
      'const values = [id, patch.title ?? null, patch.completed ?? null];\n// Use WHERE id = $1 and a RETURNING clause for the updated row.',
    result:
      '[7, null, false]. Null represents the absent title. A Boolean false must go in the completion slot. The returned row keeps the original ID and timestamp.',
    exercise:
      'Complete the mapper lab. In the local project implement list and get, then implement create, update and remove. Start the migrated backend and try GET and POST before testing PATCH and DELETE. Compare envelopes and statuses to the Week 8 contract and run npm test in backend.',
    hints: [
      'Write one query and test one route at a time.',
      'Return mapped rows and decide what no rows means for each operation.',
      'Use a NULL-aware fallback for absent fields.',
    ],
    mistake:
      'Using patch.completed || null turns a real false update into absence.',
    takeaway:
      'The repository owns SQL and row mapping. Routes keep the transport contract.',
  },
  {
    minutes: '35–50',
    goals: [
      'Bind supplied values separately from SQL text.',
      'Distinguish safe input errors and server failures.',
    ],
    heading: 'Keep values separate from the statement',
    explanation: [
      'A SQL parameter is a position such as $1 in fixed statement text. The driver sends the corresponding value separately. A title such as "Read O’Reilly" can contain punctuation without changing the statement. Use placeholders for titles, IDs and booleans. If you need to choose a table or column, select it from fixed, reviewed application-owned names instead of treating identifiers as parameters.',
      'Server validation still matters. It constrains input length and type, and prevents unauthorized fields from becoming changes. Browser validation helps a person see mistakes sooner. A failed query or unavailable DB is a server failure, while validation and missing rows are 400 and 404. Send concise errors and avoid leaking SQL details or connection information.',
      'The isolated lab captures the statements and their value arrays. Passing it proves only that these simulated calls follow the boundary. The actual PostgreSQL integration test proves that the reviewed statements run on the schema.',
    ],
    predict:
      'Two requests have different titles. What should change in this call and what should stay identical?',
    example:
      'const result = await pool.query(\n  "INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, completed, created_at",\n  [title]\n);',
    result:
      'The first value changes. The statement and placeholder position stay the same. A returned row then needs the same API mapping as a normal title.',
    exercise:
      'Complete the captured query lab with a title containing an apostrophe and a SQL-looking phrase as ordinary text. In the local repository inspect every user value position. Run npm test in backend, then send a valid fictional title containing an apostrophe through the actual local API and compare the returned text.',
    hints: [
      'Find every interpolated value in the SQL string.',
      'Bind explicit false rather than using a truthy default.',
      'Keep an empty result separate from a connection error.',
    ],
    mistake:
      'Hand-escaping a title and pasting it into SQL mixes user input with statement structure. Bind the value through the driver.',
    takeaway: 'Keep the statement fixed and send user data through parameters.',
    extension:
      'Optional: review a local repository diff for unsafe query construction and overly detailed error logging. Record the smallest corrective changes.',
  },
  {
    minutes: '40–55',
    goals: [
      'Run helper and HTTP tests and explain their limits.',
      'Verify the connected test database and run isolated real PostgreSQL tests.',
    ],
    heading: 'Check what each test actually runs',
    explanation: [
      'In backend, npm test runs validation, repository tests with a fake pool and HTTP tests with an injected repository. They can check parameters, mappings and statuses without a running PostgreSQL process. They cannot prove the SQL executes against your schema. The untouched starter reports 17 passing and 4 failing tests. The failures point to unfinished repository operations.',
      'npm run test:db uses TEST_DATABASE_URL. Check that it ends in a distinct _test database name and verify both names before running it. The suite also queries current_database() before any schema change. It creates a unique test-owned schema, applies the migration there, uses separate pools and deletes only its own temporary table and schema. It does not need a pre-migrated public table.',
      'Read the cleanup before executing the suite. The separate test database remains mandatory even with an isolated schema. The test reconnects to prove the row survived connection closure. Your capstone will separately restart the actual Express process while PostgreSQL stays available.',
    ],
    predict:
      'Fake-pool tests pass but PostgreSQL reports a missing column during the real integration test. Which evidence is stronger for schema compatibility?',
    example:
      'npm test\n# After verifying the separate _test connection and reading its cleanup:\nnpm run test:db',
    result:
      'The real integration test exercises SQL against a real migrated schema. The fake verified selected call arguments and return values. Inspect the migration and actual query rather than weakening the assertions.',
    exercise:
      'Verify both database names and inspect backend/tests/db.test.mjs. Run both test commands. Record the real observed pass/fail totals. If setup blocks the DB test, fix the connection first and rerun it before claiming the checkpoint.',
    hints: [
      'Look at the npm scripts for the test entry points.',
      'Inspect the guard and cleanup using the source file.',
      'Check pool reconnection and actual Express restart separately.',
    ],
    mistake:
      'Changing the test URL to point at development to work around setup defeats the isolation for this exercise.',
    takeaway:
      'Use a test’s actual dependencies and operations to decide what its result proves.',
    extension:
      'Optional: sketch how a migration version log could track a second schema change. Try it only in a fresh disposable database.',
  },
  {
    minutes: '80–120',
    goals: [
      'Trace one fictional task through real PostgreSQL and React CRUD.',
      'Prove persistence across an API restart and document an independent repair.',
    ],
    heading: 'Verify the same task after restarting Express',
    explanation: [
      'Run the migrated backend and the provided frontend in separate terminals. On /tasks create one fictional title, inspect POST 201 and Location, and look up the returned ID in PostgreSQL. Toggle true then false, rename the task and confirm the SQL row and API response. Stop only Express. Start it again with the same development configuration and issue a fresh GET for that same ID. Reload the browser and confirm it displays the returned row.',
      'Delete the row through React. Observe 204 with zero body bytes and verify that it is absent in both systems. Run backend npm test and npm run test:db, and frontend npm test and npm run build. Reproduce a small failure in a disposable copy, such as a missing title mapping or a false update treated as absent. Fix and repeat the same observed check without copying a generated patch.',
      'This milestone stores tasks durably on a local machine. The task table does not yet have account ownership or sessions. Keep the app on loopback with fictional data. Review git status and diffs before making a checkpoint, and confirm that the real .env is ignored.',
    ],
    predict:
      'A task still appears in an already open browser after you stop Express. What observation would actually prove persistence?',
    example:
      'POST → record returned ID → read matching SQL row\nStop and restart only the Express process → fresh GET by that same ID\nDELETE → observe 204 and verify no row at that ID',
    result:
      'A new server process returns the same ID, title and timestamp from PostgreSQL. The UI snapshot alone is insufficient. After deletion the next read reports absence.',
    exercise:
      'Complete the local demo and readiness quiz. Record actual commands, result counts, one diagnosis and the redacted before/after outcome. Use the same API and database target throughout the restart verification.',
    hints: [
      'Write down the returned ID before restarting.',
      'Read fresh status and JSON in Network after the restart.',
      'Confirm both source and test URLs are absent from the diff.',
    ],
    mistake:
      'Restarting Vite or refreshing the tab does not restart Express. Verify the backend process was replaced before taking the second reading.',
    takeaway:
      'A fresh request from a new Express process proves the storage boundary you added.',
  },
]

export const weekNine = Object.fromEntries(
  lessons.map((lesson, index) => [
    'p1-w09-l' + String(index + 1).padStart(2, '0'),
    lesson,
  ]),
)
