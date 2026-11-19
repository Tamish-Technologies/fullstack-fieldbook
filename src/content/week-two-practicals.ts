import type { Lab, LocalCheck } from './practicals'

export const weekTwoLabs: Record<string, Lab> = {}
function lab(
  lesson: string,
  title: string,
  task: string,
  starter: string,
  checks: string[],
) {
  weekTwoLabs['p1-w02-l' + lesson + (lesson === '01' ? '-c02' : '-c01')] = {
    title,
    task,
    starter,
    checks,
  }
}
lab(
  '01',
  'Give tasks stable IDs',
  'Return two task records from makeTasks. Return the remaining records from afterFirst(tasks), preserving their IDs. Implement secondTitle and size for any supplied list of at least two records. Each record needs an id, title and completed flag.',
  'function makeTasks() {\n  return [];\n}\nfunction afterFirst(tasks) {\n  // Return the list without its first record.\n}\nfunction secondTitle(tasks) {\n  // Read position 1.\n}\nfunction size(tasks) {\n  // Return the collection length.\n}',
  [
    'Return two valid task records.',
    'Choose distinct positive IDs.',
    'Keep the surviving record’s ID after filtering.',
    'Read the second title and the original length.',
    'Distinguish a property update from reassigning a const binding.',
  ],
)
lab(
  '02',
  'Use return values and callbacks',
  'Implement the four functions below. countActive returns the number of unfinished tasks. visitTitles calls visit once with each title, in order.',
  'function normalizeTitle(text) {\n}\nfunction isNonEmptyTitle(text) {\n}\nfunction countActive(tasks) {\n}\nfunction visitTitles(tasks, visit) {\n}',
  [
    'Trim padded titles.',
    'Clean and reject empty titles.',
    'Return true for a nonempty title.',
    'Count active tasks without changing the list.',
    'Visit each title exactly once in order.',
  ],
)
lab(
  '03',
  'Transform a collection',
  'Return active records, ordered titles, a list with one ID toggled, a record by ID (undefined if missing), and the next numeric ID. Preserve the input.',
  'function active(tasks) {\n}\nfunction titles(tasks) {\n}\nfunction toggle(tasks,id) {\n}\nfunction lookup(tasks,id) {\n}\nfunction nextId(tasks) {\n}',
  [
    'Select only active records.',
    'Return ordered titles.',
    'Toggle one ID, preserving the rest.',
    'Find an existing or missing ID.',
    'Find the next ID for empty and sparse lists.',
    'Preserve all source records.',
  ],
)
lab(
  '05',
  'Draw the current model',
  'Implement render(tasks). Call clearRows() and appendRow(id,title,checked,completedStyle). The fixture builds one list item per append, displays the supplied title literally and takes two booleans for its checkbox and completed appearance.',
  'function render(tasks) {\n  // Clear once, then visit the records.\n}',
  [
    'Draw each record in order.',
    'Render twice without duplicates.',
    'Reflect a changed list.',
    'Keep bracketed titles literal.',
    'Match checkbox and completed appearance.',
    'Clear stale rows when there are no tasks.',
  ],
)
lab(
  '06',
  'Update the task model',
  'The fixture sends update(tasks, action, value) from its form and row controls. Return the next array in its existing order, appending new tasks at the end. For "add", value is raw text. Call warn(message) for blank input. For "toggle" and "delete", value is the numeric ID.',
  'function update(tasks, action, value) {\n  return tasks;\n}',
  [
    'Add a trimmed, unfinished task with a fresh ID.',
    'Reject spaces and give feedback.',
    'Toggle the target in both directions.',
    'Delete by ID after its position changes.',
    'Preserve other records and render once per row.',
    'Submit once through the form and delete without submitting.',
  ],
)
lab(
  '07',
  'Connect accessible controls',
  'Implement configure(task) using titleText(text), checkbox(label,event,id), deleteControl(type,id), submitOn(event), feedback(role,message) and focusField(). Supply the title, a task-specific label, native event names, the button type, the task ID and a useful blank-title warning. The fixture tests the controls you configure.',
  'function configure(task) {\n  // Set up the title, controls, feedback and return focus.\n}',
  [
    'Show a bracketed title literally.',
    'Preserve quotes and ampersands.',
    'Label the checkbox and toggle its own ID on change.',
    'Use the form submit event for Add.',
    'Delete the target without submitting.',
    'Provide accessible feedback and focus the input.',
  ],
)
lab(
  '08',
  'Save and recover tasks',
  'Return true from save(tasks,storage) after a successful write and false on failure. Return a safe array from load(storage). For nextId(tasks), start at 1 when empty and choose a safe integer above the largest restored ID. Use the key "study-tasks-week2". isTask(record) is supplied. The storage adapter uses getItem/setItem and can throw.',
  'function save(tasks, storage) {\n}\nfunction load(storage) {\n}\nfunction nextId(tasks) {\n}',
  [
    'Round-trip records as JSON.',
    'Recover a missing key.',
    'Recover malformed JSON.',
    'Handle a non-array and invalid records.',
    'Recover denied reads and report failed writes without losing the model.',
    'Choose IDs after recovery and from empty storage.',
  ],
)
lab(
  '09',
  'Display a filtered view',
  'Implement present(tasks,mode) for "all", "active" or "completed". Call showRows(visible), remaining(globalCount), emptyMessage(text) and pressed(mode). Use an empty string for a nonempty view. For the two empty cases use "No tasks yet" and "No tasks match this filter". Filter changes must leave storage and the model alone.',
  'function present(tasks, mode) {\n  // Compute the view and update the four outputs.\n}',
  [
    'Show the three correct subsets.',
    'Restore hidden tasks in All.',
    'Count unfinished tasks globally.',
    'Distinguish an empty project from an empty view.',
    'Mark only the selected filter as pressed.',
    'Reflect toggle and delete while filtered.',
    'Keep source and storage untouched.',
  ],
)

export const weekTwoProjects: Record<string, LocalCheck> = {
  'p1-w02-l10-c01': {
    title: 'Debug a data or rendering fault',
    items: [
      'I reproduced a fault in an expendable copy.',
      'I compared the model and the DOM or stored value.',
      'I changed one cause and repeated the original and a neighboring test.',
    ],
    fields: [
      { label: 'Initial tasks, steps, expected and observed result', max: 400 },
      { label: 'Cause, repair and retest outcome', max: 400 },
    ],
  },
  'p1-w02-l11-c01': {
    title: 'Study Tasks v2 project',
    items: [
      'Two added tasks survive reload.',
      'Completion and undo both survive reload.',
      'All, Active and Completed preserve hidden records.',
      'Remaining count is global.',
      'The next ID avoids existing IDs after reload and delete.',
      'Deleted records stay gone after reload.',
      'Spaces are rejected, Enter adds once and Delete does not submit.',
      'Bracketed task titles display literally.',
      'Empty project and empty view have different messages.',
      'I tested malformed disposable project data and restored it.',
      'Denied storage shows a warning and the app stays usable.',
      'I tested keyboard use, narrow layout and reviewed a local commit.',
    ],
    fields: [
      { label: 'Local test outcome and one thing you understood', max: 400 },
      { label: 'One bug you fixed and how you retested it', max: 360 },
    ],
  },
  'p1-w02-l11-c03': {
    title: 'Independent transfer task',
    choices: [
      'Add a global completed count',
      'Repair a filter that loses hidden records',
    ],
    items: [
      'I made this change independently without AI.',
      'I tested three fictional tasks and a second operation.',
    ],
    fields: [
      { label: 'Three starting tasks, expected and observed result', max: 400 },
      {
        label: 'Changed file and function, explanation and regression check',
        max: 400,
      },
    ],
  },
}
