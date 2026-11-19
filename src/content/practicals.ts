export interface Lab {
  title: string
  task: string
  starter: string
  checks: string[]
}

export const labs: Record<string, Lab> = {
  '02': {
    title: 'Build a semantic page',
    task: 'Repair this document using the worked example. The two files next to index.html are styles.css and app.js. Give the page a tab title and a visible main heading of your own.',
    starter:
      '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title></title>\n</head>\n<body>\n  <main></main>\n</body>\n</html>',
    checks: [
      'Use a standards-mode document.',
      'Give the English document a tab title.',
      'Place one visible, nonempty h1 in main.',
      'Set UTF-8 and a device-width viewport.',
      'Link styles.css and defer app.js from the same folder.',
    ],
  },
  '03': {
    title: 'Make a usable task form',
    task: 'Complete the form and the empty list below it. Give the text field a visible label, require a value, and make Add submit the form. Add a heading to the list section.',
    starter:
      '<form>\n  <label>Task title</label>\n  <input type="text" id="task">\n  <button type="button">Add</button>\n</form>\n<section>\n  <ul></ul>\n</section>',
    checks: [
      'The visible label activates a focusable text field.',
      'The label points to one unique input ID.',
      'A valid entry submits the form through Add.',
      'An empty entry is stopped by native validation.',
      'A headed section contains an empty task list.',
      'Any Delete button is a non-submit control.',
    ],
  },
  '04': {
    title: 'Size and center the task card',
    task: 'Edit the .app rule for the card. Give it a width limit, auto side margins, vertical space, padding and a border. Make the declared width include its padding and border. The button uses the browser’s focus outline.',
    starter:
      '.app {\n  width: 100%;\n  padding: 16px;\n  border: 2px solid #526071;\n}',
    checks: [
      'The .app rule changes the card.',
      'The card is narrower than its container and centered.',
      'The measured border box matches the specified width.',
      'Padding and vertical margin both create space.',
      'The button keeps a visible focus indicator.',
    ],
  },
  '05': {
    title: 'Arrange a responsive form',
    task: '',
    starter: '',
    checks: [
      'The form fits at 768px with standard and enlarged text.',
      'The form fits at 375px with standard and enlarged text.',
    ],
  },
  '07': {
    title: 'Clean and validate a task title',
    task: 'Complete the two functions. Return the trimmed text from cleanTitle and a boolean from isValidTitle. Try normal, empty and whitespace-only titles.',
    starter:
      'function cleanTitle(rawTitle) {\n  return rawTitle;\n}\n\nfunction isValidTitle(title) {\n  return true;\n}',
    checks: [
      'Trim both ends of a padded title.',
      'Keep an empty title empty.',
      'Clean tabs and spaces to an empty title.',
      'Preserve an unchanged title.',
      'Accept a normal title.',
      'Reject spaces alone.',
      'Reject the empty string.',
      'Accept a padded, nonempty title.',
    ],
  },
  '08': {
    title: 'Add literal text to the list',
    task: 'Finish addTask(title). Select the supplied ul#queue, create a fresh li on each call, put the title into it as text, then append it to the list.',
    starter:
      'function addTask(title) {\n  const queue = document.querySelector("#queue");\n  const row = document.createElement("li");\n  // Put the title in the row and attach it.\n}',
    checks: [
      'Find the supplied task list.',
      'Append an li under that list.',
      'Keep two separate rows in entry order.',
      'Show angle brackets literally.',
      'Preserve quotes and ampersands.',
    ],
  },
  '09': {
    title: 'Handle a form submission',
    task: 'The fixture connects handleSubmit(event) to the form. It supplies input, message and addTask(title). Prevent navigation, trim the value, explain spaces-only input, and add exactly one valid title. Clear and refocus the input after success.',
    starter:
      'function handleSubmit(event) {\n  event.preventDefault();\n  const title = input.value.trim();\n  // Reject a blank title before adding it.\n  addTask(title);\n}',
    checks: [
      'Clicking Add inserts once and cancels navigation.',
      'A form submission from the input adds one task.',
      'Trim leading and trailing spaces.',
      'Reject blank input without navigating and explain spaces-only input.',
      'Two valid submissions produce two rows.',
      'Clear and refocus the input after adding.',
    ],
  },
}
export interface LocalCheck {
  title: string
  items: string[]
  fields: { label: string; max: number; optional?: boolean }[]
  choices?: string[]
  choiceLabel?: string
  passingChoice?: string
}
export const projects: Record<string, LocalCheck> = {
  'p1-w01-l10-c02': {
    title: 'Debugging record',
    items: [
      'I reproduced the failure locally.',
      'I inspected Console or Elements evidence.',
      'I identified the cause.',
      'I changed the code.',
      'I repeated the original test.',
      'I can explain why the fix worked.',
    ],
    fields: [
      { label: 'What went wrong?', max: 240 },
      { label: 'What did DevTools show?', max: 240 },
      { label: 'What fixed it, and how did you verify it?', max: 360 },
    ],
  },
  'p1-w01-l11-c01': {
    title: 'Local Git history',
    items: [
      'I opened or initialized the project repository.',
      'I reviewed git status and git diff.',
      'I staged the intended files.',
      'I made a meaningful commit.',
      'I inspected git log --oneline.',
      'I can explain a commit and a push.',
      'I checked that the staged files contained no secrets.',
    ],
    fields: [{ label: 'Commit summary', max: 160, optional: true }],
  },
  'p1-w01-l12-c01': {
    title: 'Study Tasks project',
    items: [
      'My four project files open locally without npm.',
      'My page has a main heading, labeled form, submit button, headed list and named controls.',
      'Click and Enter each add one task without navigation.',
      'Empty and spaces-only values add nothing, and spaces receive feedback.',
      'Checking and unchecking one task updates its appearance.',
      'Deleting the middle of three removes only that task.',
      'Deleting all tasks restores the empty message.',
      'The title <b>Test</b> appears as literal text.',
      'Controls fit at desktop and 375px and work with the keyboard.',
      'I refreshed and can explain why tasks disappeared.',
      'My README covers setup, features, three manual tests, reload and one takeaway.',
      'I reviewed two meaningful local commits and checked for secrets.',
      'My project contains a five-line debugging record.',
      'I explained submit, trim, DOM insertion and the purpose of textContent.',
    ],
    fields: ['Test note', 'Bug explanation', 'Code explanation'].map(
      (label) => ({ label, max: 360, optional: true }),
    ),
  },
  'p1-w01-l12-c03': {
    title: 'Independent micro-challenge',
    choices: [
      'Rebuild trimmed submission',
      'Toggle completion on a new row',
      'Diagnose a mismatched selector',
    ],
    items: [
      'I used a copy of my project.',
      'I completed my selected task independently, using documentation as needed and without AI assistance.',
      'I tested the change and explained its behavior.',
    ],
    fields: [
      'What changed?',
      'How did you test it?',
      'Explain the event, data and DOM change.',
    ].map((label) => ({ label, max: 360 })),
  },
}
