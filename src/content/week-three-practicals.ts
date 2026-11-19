import type { Lab, LocalCheck } from './practicals'
export const weekThreeLabs: Record<string, Lab> = {
  'p1-w03-l01-c02': {
    title: 'Count without changing tasks',
    task: 'Return the number of unfinished records from countRemaining(tasks). Repeated calls must preserve the original records and order.',
    starter:
      'function countRemaining(tasks) {\n  // Count the records whose completed flag is false.\n}',
    checks: [
      'Count mixed, empty and completed lists.',
      'Return the same count on a second call.',
      'Preserve every source record and its order.',
    ],
  },
  'p1-w03-l02-c01': {
    title: 'Rename one record safely',
    task: 'Implement rename(tasks,id,raw). Return the next array. Reject a nonstring, a blank or a cleaned title longer than 100 characters, or an unknown ID, by returning the unchanged collection. Preserve the original records on success too.',
    starter: 'function rename(tasks, id, raw) {\n  return tasks;\n}',
    checks: [
      'Trim the new title and target one stable ID.',
      'Reject blank, nonstring and overlong input.',
      'Accept a cleaned title of exactly 100 characters.',
      'Keep unknown IDs and source records unchanged.',
    ],
  },
  'p1-w03-l03-c01': {
    title: 'Sort a view by numeric ID',
    task: 'Return ordered(tasks,mode) for "oldest" or "newest". Copy the list first. The lab supports slice(), spread and sort with a numeric comparator.',
    starter: 'function ordered(tasks, mode) {\n  return tasks;\n}',
    checks: [
      'Order oldest and newest numerically.',
      'Keep identity with duplicate titles and support an empty list.',
      'Preserve original order across both views.',
    ],
  },
  'p1-w03-l05-c01': {
    title: 'Delegate actions to the stable list',
    task: 'In install() call listenList(eventName) once for each needed event. The fixture then invokes route(kind). Inside route, nearestAction() returns "edit", "delete", "toggle", an unknown action or null. nearestId() reads its numeric ID. Call dispatchAction(action,id) only for the matching event. The fixture supplies the list and closest lookup.',
    starter:
      'function install() {\n  // Register click and change on the persistent list.\n}\nfunction route(kind) {\n  const action = nearestAction();\n}',
    checks: [
      'Route Edit and Delete from nested button content by ID.',
      'Handle a checkbox change exactly once.',
      'Ignore unsupported actions, whitespace and outside clicks.',
      'Continue routing once after replacing and reordering rows.',
    ],
  },
  'p1-w03-l06-c01': {
    title: 'Save or discard an inline edit',
    task: 'The form calls handle(action,id,value). For "edit", use openEditor(id). For "save", trim the draft. Call showError(message) for invalid input, or commitTitle(id,title) followed by closeEditor() on success. For "cancel", close without committing. Return a boolean from cancels(key) so Escape cancels and other keys keep working. Opening focuses the field; closing focuses the row’s Edit button.',
    starter:
      'function handle(action, id, value) {\n  // Decide when to open, validate, commit and close.\n}\nfunction cancels(key) {\n  return false;\n}',
    checks: [
      'Open the selected title in a labeled, focused field.',
      'Keep typing and failed saves out of the model.',
      'Save trimmed valid text to the sorted row’s ID.',
      'Accept 100 characters and reject 101.',
      'Cancel and Escape discard drafts, and other keys preserve editing.',
      'Return focus to the correct Edit button.',
    ],
  },
  'p1-w03-l07-c01': {
    title: 'Build a combined view',
    task: 'Return visible(tasks,status,query,mode) for status "all", "active" or "completed" and order "oldest" or "newest". Implement remaining(tasks) for the global count. message(tasks,rows) returns "empty" for an empty project, "no-match" for an empty view, or "" when rows exist.',
    starter:
      'function visible(tasks, status, query, mode) {\n  return tasks;\n}\nfunction remaining(tasks) {\n}\nfunction message(tasks, rows) {\n}',
    checks: [
      'Combine status and normalized substring search.',
      'Order matches numerically in both directions.',
      'Count all unfinished records across different models.',
      'Distinguish an empty project from an empty view.',
      'Preserve the full collection and recover hidden rows.',
    ],
  },
  'p1-w03-l08-c01': {
    title: 'Recover valid unique records',
    task: 'Implement restore(raw) for a stored string or null. Return [] for missing, malformed or non-array data. isTask(record) is supplied and checks the Week 3 title, ID and boolean rules. Keep only the first valid occurrence of each ID in input order. No real browser storage is involved.',
    starter:
      'function restore(raw) {\n  // Parse, validate, then deduplicate.\n  return [];\n}',
    checks: [
      'Handle missing data, bad JSON and wrong top-level shapes.',
      'Keep valid neighbors and reject invalid fields.',
      'Keep the first valid occurrence of each ID in input order.',
    ],
  },
  'p1-w03-l09-c01': {
    title: 'Test an ordering regression',
    task: 'Write verify(tasks). Snapshot the original input, call orderUnderTest(tasks) once, and return true only if it returns all records in ascending numeric order and leaves the source intact. The fixture supplies both broken and correct implementations. Compare record contents as well as their IDs. Then select the cause of the source-order bug.',
    starter:
      'function verify(tasks) {\n  const before = JSON.stringify(tasks);\n  const result = orderUnderTest(tasks);\n  // Check the result and compare the source with before.\n}',
    checks: [
      'Accept the correct helper on multiple inputs.',
      'Catch a helper that sorts the source in place.',
      'Catch a helper that returns incorrect or incomplete records.',
      'Identify the cause of the source-order regression.',
    ],
  },
}
const notes = (...labels: string[]) =>
  labels.map((label) => ({ label, max: 400 }))
export const weekThreeProjects: Record<string, LocalCheck> = {
  'p1-w03-l04-c01': {
    title: 'Run and repair a local module import',
    items: [
      'I exported and imported a pure helper.',
      'I loaded app.js as a module from a local HTTP server.',
      'I observed a missing import request, corrected the path and reloaded successfully.',
    ],
    fields: notes('Requested file, observed status or error, and repair'),
  },
  'p1-w03-l08-c02': {
    title: 'Check keyboard use and storage origins',
    items: [
      'Markup-like titles displayed as literal text.',
      'Labels and focus were clear while using Tab, Enter and Escape.',
      'Focus returned to a useful control after editing.',
      'I compared the same project on two ports and returned to the original origin.',
    ],
    fields: notes(
      'One keyboard observation and what happened to the saved tasks on each origin',
    ),
  },
  'p1-w03-l10-c02': {
    title: 'Review an actual Git change',
    items: [
      'I inspected git status and the relevant unstaged or staged diff.',
      'I explained one risk and exercised a regression case.',
      'I reviewed the result and chose to keep, revise or discard the change.',
    ],
    fields: notes(
      'Changed file, intended behavior and decision',
      'Test performed and observed outcome',
    ),
  },
  'p1-w03-l11-c01': {
    title: 'Study Tasks v3 acceptance checks',
    items: [
      'Existing Week 2 records reloaded on the same origin and storage key.',
      'Add, toggle, delete and the three status views still work.',
      'Renaming targets an ID and handles blank, unknown, 100- and 101-character cases.',
      'Save, Cancel, Enter, Escape, labels, focus and literal text behave correctly.',
      'Search combines with status and both sort orders without losing tasks.',
      'The global count and both empty messages are correct.',
      'Modules load over HTTP with pure logic separated from UI code.',
      'Valid unique records survive recovery and accepted edits survive reload.',
      'I observed a failing regression and reran my local tests after the repair.',
      'My README describes three investigated bugs and my local commits record reviewed changes.',
    ],
    fields: notes(
      'Local test result and the failure you repaired',
      'One behavior you traced from event to saved record',
    ),
  },
  'p1-w03-l11-c03': {
    title: 'Independent Week 3 transfer',
    choices: [
      'Test Edit then Cancel after a sort',
      'Repair a nested delegated click',
    ],
    items: [
      'I worked independently without AI for this task.',
      'I demonstrated the failure and the corrected behavior.',
    ],
    fields: notes(
      'Fixture, expected result and observed result',
      'Changed file or function, root cause and regression test',
    ),
  },
}
