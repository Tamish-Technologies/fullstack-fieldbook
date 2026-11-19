import type { Lab, LocalCheck } from './practicals'
export const weekFiveLabs: Record<string, Lab> = {
  'p1-w05-l07-c01': {
    title: 'Validate the draft before submitting',
    task: 'Write validateTitle(raw). For an accepted string return {ok:true,title:cleanedTitle}. For a nonstring, a blank title or more than 100 characters after trimming, return {ok:false,error:"…"} with a helpful message. This runs your JavaScript helper. Try the actual form in your local React project next.',
    starter:
      'function validateTitle(raw) {\n  // Check the type before calling trim().\n}',
    checks: [
      'Return a trimmed title on success.',
      'Reject blank and nonstring inputs with a message.',
      'Accept 100 characters and reject 101 after trimming.',
    ],
  },
  'p1-w05-l08-c02': {
    title: 'Update frozen task records by ID',
    task: 'Implement add(tasks,id,raw), toggle(tasks,id) and remove(tasks,id). Each returns the next array. Add one incomplete task with a trimmed 1–100 character title and a unique positive safe integer ID. Return the unchanged data for invalid input or an unknown target. Change only the matching record, preserve other record references, and keep the original array intact. In your local project addTaskToList wraps the result in an object with ok and tasks.',
    starter:
      'function add(tasks, id, raw) {\n  return tasks;\n}\nfunction toggle(tasks, id) {\n  return tasks;\n}\nfunction remove(tasks, id) {\n  return tasks;\n}',
    checks: [
      'Append a valid, trimmed task without changing existing records.',
      'Reject duplicate or invalid IDs and invalid titles.',
      'Toggle one stable ID in either direction.',
      'Delete by ID after a reorder and preserve unknown IDs.',
    ],
  },
  'p1-w05-l09-c02': {
    title: 'Derive the view and the remaining count',
    task: 'Write visible(tasks,filter,query,sort) and remaining(tasks). filter is "all", "active" or "completed". Trim and lowercase the query for substring matching. Order by numeric ID ("oldest" ascending, "newest" descending). Count every unfinished source task, including hidden rows. Keep the input order and fields intact.',
    starter:
      'function visible(tasks, filter, query, sort) {\n  return tasks;\n}\nfunction remaining(tasks) {\n  return 0;\n}',
    checks: [
      'Combine status with a case-insensitive search.',
      'Order both ways without mutating the source.',
      'Handle no matches, an empty query and an empty collection.',
      'Count unfinished records across the full collection.',
    ],
  },
}
const note = (label: string) => ({ label, max: 450 })
export const weekFiveProjects: Record<string, LocalCheck> = {
  'p1-w05-l02-c01': {
    title: 'Self-verify the local Vite project',
    items: [
      'I checked Node and npm in the extracted folder containing package.json, installed dependencies and opened the printed Vite address.',
      'Changing the heading updated the browser. I introduced a wrong import in my copy, observed the error and repaired it.',
    ],
    fields: [
      note(
        'Node and npm versions, visible heading, and one import error and repair',
      ),
    ],
  },
  'p1-w05-l04-c02': {
    title: 'Render a component tree locally',
    items: [
      'TaskList renders two TaskItem rows using task.id as each key.',
      'I tried a view with no matches and an empty source list, then restored the fixture.',
    ],
    fields: [
      note('What each empty message meant and which component selected it'),
    ],
  },
  'p1-w05-l05-c02': {
    title: 'Trace a row callback to its owner',
    items: [
      'I triggered Delete on a reordered row and observed the ID received by App.',
      'I passed a function to the child, kept the incoming task unchanged and updated the parent’s state.',
    ],
    fields: [note('Row ID, callback path and observed parent update')],
  },
  'p1-w05-l06-c02': {
    title: 'Compare two queued updates locally',
    items: [
      'I compared two captured count updates with two functional updates from the same starting count.',
      'A separate Help button toggles visible content without reloading.',
    ],
    fields: [note('Starting count, both ending counts and the state owner')],
  },
  'p1-w05-l07-c02': {
    title: 'Submit a controlled React form',
    items: [
      'The field follows its draft state. Enter and the Add button call the form submit handler without reloading.',
      'Whitespace and 101 characters produce visible feedback and preserve the draft. A valid padded title reaches the parent once and clears after acceptance.',
    ],
    fields: [
      note('Rejected input and message, then the observed accepted title'),
    ],
  },
  'p1-w05-l08-c03': {
    title: 'Exercise immutable updates in React',
    items: [
      'I added, checked and unchecked a task, then deleted a row from a filtered or reordered view.',
      'I checked the surviving IDs, stable JSX keys and an unchanged previous task array.',
    ],
    fields: [note('Chosen ID, action and surviving IDs in the full list')],
  },
  'p1-w05-l10-c02': {
    title: 'Test persistence on the React origin',
    items: [
      'I added, toggled and deleted tasks, then reloaded the same address and verified the result.',
      'I compared a different port and returned to the first address.',
      'In a disposable project origin I tried malformed and denied storage, checked the warning and verified that the unreadable data survived.',
    ],
    fields: [
      note('Observed reload result, port difference and failure recovery'),
    ],
  },
  'p1-w05-l11-c01': {
    title: 'Demonstrate Study Tasks v5 locally',
    items: [
      'The local React form, toggle, delete, filter, search, sort and global remaining count work together.',
      'A new and a completed task survived a same-origin reload.',
      'I ran npm test and npm run build and inspected git diff before committing my project.',
    ],
    fields: [
      note('Actual test and build results and one change reviewed in Git'),
      note(
        'One event traced from the form or row to App and back to the rendered list',
      ),
    ],
  },
  'p1-w05-l11-c03': {
    title: 'Independent React debugging transfer',
    choices: [
      'Delete fires before a click',
      'After sorting, a row acts on the wrong task',
      'Typing fails to update a controlled field',
      'Reload opens an unexpectedly empty list',
    ],
    items: [
      'I reproduced a new variant independently without AI.',
      'I recorded the smallest fix and repeated the same local regression.',
    ],
    fields: [
      note('Starting fixture, observed symptom and root cause'),
      note('Changed component or helper and before/after result'),
    ],
  },
}
