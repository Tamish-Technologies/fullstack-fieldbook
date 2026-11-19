import type { Lab, LocalCheck } from './practicals'

export const weekTwelveLabs: Record<string, Lab> = {
  'p1-w12-l05-c02': {
    title: 'Validate a calendar date',
    task: 'Write isValidDateOnly(value). The supplied dateParts(value) returns [year, month, day] as numbers for the exact YYYY-MM-DD shape, or null for other inputs. Check year 0001–9999, month 1–12 and the day within its real month. February has 29 days in a year divisible by 4, unless it is divisible by 100 and not by 400. Use the supplied divisibleBy(year, divisor) with 4, 100 or 400. Return a boolean and use no clock.',
    starter: 'function isValidDateOnly(value) {\n  const parts = dateParts(value);\n  // Check the year, month and actual last day.\n}',
    checks: [
      'Require exact four-digit year and two-digit month and day.',
      'Check month lengths and reject zero or out-of-range values.',
      'Apply Gregorian leap-year and century rules.',
      'Accept ordinary valid dates including the supported year boundaries.',
    ],
  },
  'p1-w12-l08-c02': {
    title: 'Classify due dates with a supplied today',
    task: 'Write classifyDue(task, today). Use the supplied isCalendarDate(value) and addCalendarDays(value, days) helpers. Return "invalid" for a bad today, a non-boolean completed value, or a due date other than null or a valid date. Return "none" for completed tasks or null dueDate. For an unfinished dated task, return "overdue", "today", "soon" (tomorrow through day seven), or "later". The supplied arithmetic is deterministic and adds up to 366 UTC calendar days.',
    starter: 'function classifyDue(task, today) {\n  // Validate the inputs, then compare canonical calendar dates.\n}',
    checks: [
      'Reject invalid dates and invalid task inputs.',
      'Exclude completed tasks and tasks with no due date.',
      'Distinguish overdue and due today.',
      'Include exactly seven days and exclude eight, across calendar boundaries.',
    ],
  },
}

const field = (label: string) => ({ label, max: 450 })
export const weekTwelveProjects: Record<string, LocalCheck> = {
  'p1-w12-l01-c02': {
    title: 'Record your baseline evidence',
    items: ['I ran or inspected the inherited app with fictional accounts and recorded the results.', 'I recorded the local baseline commit and the initial planning test failures separately from inherited checks.'],
    fields: [field('Baseline commit, actual commands, and initial outcomes')],
  },
  'p1-w12-l02-c02': {
    title: 'Trace the request and set up a local branch',
    items: ['I created my branch from the recorded baseline and checked the staged files for private data.', 'I saved a redacted request trace and a reviewed change plan or independent review log.'],
    fields: [field('Branch, baseline commit, and one request or review example')],
  },
  'p1-w12-l03-c02': {
    title: 'Review the capstone brief',
    items: ['I wrote observable user stories and sequenced the migration, API, and UI work.', 'I mapped A01–A10 to planned evidence and recorded one scope cut or blocker.'],
    fields: [field('One user story, its evidence, and the deferred work')],
  },
  'p1-w12-l04-c02': {
    title: 'Verify the additive migration',
    items: ['I ran the migration on the confirmed local development database and verified existing IDs and owners.', 'I observed the new default and DATE column and separately confirmed the disposable test target.'],
    fields: [field('Confirmed targets and redacted before-and-after row')],
  },
  'p1-w12-l05-c03': {
    title: 'Verify the planning input contract',
    items: ['I ran the local validation tests and observed title-only creation and rejection of an impossible date and invalid priority.', 'I verified omission preserves the stored date and explicit null clears it.'],
    fields: [field('Observed statuses and the different PATCH results')],
  },
  'p1-w12-l06-c02': {
    title: 'Verify the repository and response',
    items: ['I ran the repository and HTTP tests and verified consistent priority and date fields in successful responses.', 'I checked scoped owner/ID parameters and verified that a foreign request did not change the original row.'],
    fields: [field('Test names, safe JSON fields, and one boundary result')],
  },
  'p1-w12-l07-c02': {
    title: 'Verify create, edit, clear, and recover in React',
    items: ['I used the labeled fields to create, edit, clear and reload a dated task.', 'I reproduced a failed save that kept the draft and did not claim success, using safe Network observations.'],
    fields: [field('Browser sequence, statuses, and failed-save recovery')],
  },
  'p1-w12-l08-c03': {
    title: 'Verify pure date rules locally',
    items: ['I documented the UTC today policy and ran the pure planning helper tests.', 'I checked a leap day, day seven, day eight, and completed or undated exclusions.'],
    fields: [field('Command and observed boundary cases')],
  },
  'p1-w12-l09-c02': {
    title: 'Complete the A01–A10 evidence matrix',
    items: ['I recorded actual unit, HTTP, live PostgreSQL, and browser actions and outcomes.', 'I verified persistence after an Express restart and all three foreign denials against an existing owner row.'],
    fields: [field('Test results, restart evidence, and unchanged-row outcome')],
  },
  'p1-w12-l10-c02': {
    title: 'Review three debugging records and the release decision',
    items: ['I completed three debugging records, including an omitted/null PATCH or ownership case.', 'I reviewed the diff, migration, access controls, and files for private information and recorded my release decision.'],
    fields: [field('Three issues, one regression result, and next action')],
  },
  'p1-w12-l11-c02': {
    title: 'Record the final capstone decision',
    choiceLabel: 'Local demo decision',
    choices: ['Hold', 'Ready for local demo'],
    passingChoice: 'Ready for local demo',
    items: [
      'I demonstrated A01–A10, and the real ownership, migration, and privacy checks passed.',
      'I completed at least three debugging records and answered ten oral prompts independently across the required layers.',
      'I saved the self-assessed rubric, reviewed commit, and redacted release and AI or independent-review logs.',
    ],
    fields: [
      field('Redacted evidence summary, or the next check needed while on Hold'),
      field('Self-assessed score and what you can now explain independently'),
    ],
  },
}
