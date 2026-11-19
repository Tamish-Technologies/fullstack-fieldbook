import type { Reading } from './week-one'
const lessons: Reading[] = [
  {
    minutes: '15–25',
    goals: [
      'Trace one click from a child to the state owner and back to the screen.',
      'Identify the task data React needs to draw one row.',
    ],
    heading: 'Follow a checkbox through a render',
    explanation: [
      'In Week 4 you handled an event, changed a task record and called render to rebuild the list. React lets you describe the checkbox you want for the current record. When the state owner calls its setter with an updated collection, React runs the relevant components again. It compares the new descriptions with the previous output and updates the DOM where needed. A render need not replace every node.',
      'Think of App as the component holding the shared tasks. It gives TaskList the records to display. TaskList creates one TaskItem per record. A row receives a task and a function it can call to report a click. The function in App changes state, then the updated task travels down as a prop. React runs this interface in the browser. Your project still uses local browser storage when you add persistence in Lesson 10.',
    ],
    predict:
      'A row receives task 7 with completed set to false. Which line asks for a change, and which value lets the next render show it?',
    example:
      '<input type="checkbox" checked={task.completed}\n  onChange={() => onToggle(task.id)} />',
    result:
      'The change event calls onToggle with 7. Once the owner updates that record and passes it down, checked reflects the new flag. A callback that only logs the ID leaves the original state and controlled checkbox unchanged.',
    exercise:
      'Use “Download the Week 5 React starter” in the project section. Before running it, open src/App.jsx and find TaskForm, TaskToolbar and TaskList. On paper, trace task 7 from its row to the owner and back. Lesson 2 gets the project running.',
    hints: [
      'Read checked as a description of the current screen.',
      'Trace the callback up one component at a time.',
    ],
    mistake:
      'Directly flipping a DOM property can leave the saved record unchanged. A later render will describe the UI from that record again.',
    takeaway:
      'Props describe a render. Events reach the owner that can request the next one.',
  },
  {
    minutes: '25–40',
    goals: [
      'Run the extracted starter and observe hot reload.',
      'Distinguish installation, development, helper tests and production build.',
    ],
    heading: 'Start the React project from the right folder',
    explanation: [
      'Extract the whole ZIP. Open a terminal in the folder containing package.json, index.html, src and tests. Node runs development tools and the helper tests. npm installs the dependencies declared in package.json and runs its scripts. Vite serves the development page and transforms JSX. React mounts the interface in the browser. This setup requires no application backend or login.',
      'Run the commands below. The starter includes package-lock.json. npm ci installs the exact dependency tree in that file, so your setup matches the tested starter. The first install needs the registry or a populated npm cache. Leave the dev terminal running, open its printed Local address and use a second terminal in the same folder for tests or build. The 25 starter tests cover the helper functions. They can pass while the React task buttons still need wiring.',
    ],
    predict:
      'Which command leaves a local server running, and which one creates the production files?',
    example:
      'node --version\nnpm --version\nnpm ci\nnpm run dev\n\n# In a second terminal, in the same project folder\nnpm test\nnpm run build',
    result:
      'npm run dev keeps serving until you press Ctrl+C. npm run build exits after writing dist. The starter’s Vite 7 requires a compatible Node installation. Node 24 was used for this review.',
    followUp: {
      title: 'Trace the first heading',
      example: 'index.html → src/main.jsx → <App /> → src/App.jsx',
      reasoning:
        'index.html supplies the root element. main.jsx imports App and mounts it with createRoot. Change the h1 in App.jsx, save it and watch the heading change without restarting the server. Two demo tasks should appear. Filtering and sorting already work. Toggle or Delete a row to see its ID arrive in App. The row stays in place until you wire its state update.',
    },
    exercise:
      'In a disposable copy, change one import filename in App.jsx to a missing file. Read the first error, compare the path and capitalization with the file tree, and restore the import. Confirm the heading returns. If npm cannot find package.json, move into the extracted project folder. To track your own changes from the start, run git init in this new project folder, then git add . and git commit -m "Start Week 5 React project". The supplied .gitignore excludes node_modules and dist.',
    hints: [
      'Use the port printed by Vite even if it differs from 5173.',
      'If node --version fails, fix the Node installation or terminal PATH before troubleshooting React.',
    ],
    mistake:
      'Opening index.html as a file skips the Vite transform and local development origin.',
    takeaway:
      'Use the development URL to test the UI and the helper suite to test data logic.',
  },
  {
    minutes: '20–30',
    goals: [
      'Read JSX attributes, expressions and component names.',
      'Display a learner-entered title as literal text.',
    ],
    heading: 'Read JSX as a description of this screen',
    explanation: [
      'A component returns one JSX expression. Wrap sibling elements in a fragment using <> and </> when you do not need an extra DOM container. Close tags including input. className sets a CSS class and htmlFor associates a label with an input ID. A lowercase tag such as section names a DOM element. A capitalized TaskItem names a component in scope.',
      'Braces enter a JavaScript expression. {task.title} displays a changing value, while title="task.title" supplies literal characters. A boolean condition can select content with && or a ternary. React escapes ordinary text children, so angle brackets inside the title remain visible text. Keep user titles in this text position.',
    ],
    predict:
      'How many extra bold elements will appear, and what makes the label focus the field?',
    example:
      'const title = "<b>Outline</b>";\nreturn (<>\n  <label htmlFor="draft">Task</label>\n  <input id="draft" className="draft" />\n  <p>{title}</p>\n</>);',
    result:
      'There are no bold elements. The paragraph contains the literal title. htmlFor and id agree, so activating the label focuses the input. The fragment groups the siblings without adding a wrapper.',
    exercise:
      'In src/App.jsx place a fragment containing a heading and a paragraph in the header. Insert a local string using braces. Try a conditional help paragraph and compare the Elements panel with the JSX.',
    hints: [
      'Use a single enclosing expression after return.',
      'Write {showHelp && <p>…</p>} with a boolean showHelp.',
    ],
    mistake:
      'A lowercase custom tag is treated as an element name. Import the component and capitalize its JSX tag.',
    takeaway: 'Use JSX for structure and ordinary expression slots for data.',
  },
  {
    minutes: '20–35',
    goals: [
      'Divide a task list into a list and a reusable row.',
      'Distinguish an empty collection from an empty filtered view.',
    ],
    heading: 'Give the list and the row different jobs',
    explanation: [
      'App owns the full collection and toolbar controls. TaskList receives the visible rows and the total source count. It decides whether to show a list or an empty message. TaskItem describes one row and its controls. The same component can render many tasks because each instance receives its own props.',
      'When mapping rows to components, set key on the element returned by map. Use a stable task ID across renders. React uses keys among siblings to preserve row identity when order changes. key is special to React. Pass the task or ID separately when the row needs its identity in a handler.',
    ],
    predict:
      'With two saved tasks and a search that matches neither, which empty message would you show?',
    example:
      'function Results({rows, total}) {\n  if (!rows.length) return <p>{total ? "No matches." : "No tasks yet."}</p>;\n  return <ul>{rows.map(task =>\n    <TaskItem key={task.id} task={task} />\n  )}</ul>;\n}',
    result:
      'No matches. Clearing the search should reveal both saved rows. With total equal to zero, an invitation to add the first task makes sense.',
    exercise:
      'Run the starter. Inspect TaskList.jsx and TaskItem.jsx, change a row label and observe both instances. Try a search with no matches. Temporarily pass an empty source and total of zero in a project copy, then restore both demo rows.',
    hints: [
      'Map the visible collection in the parent list.',
      'Choose empty copy from the source total.',
    ],
    mistake:
      'An array index changes when a preceding row is removed. It cannot reliably identify a task across that edit.',
    takeaway:
      'A list owns collection-level decisions. A row describes the task it receives.',
  },
  {
    minutes: '20–35',
    goals: [
      'Pass a callback without firing it during render.',
      'Change the correct parent record when a child reports an ID.',
    ],
    heading: 'Let the row report the click',
    explanation: [
      'Props are the inputs for this render. Treat a task received from the parent as read-only. To remove a task, the row calls a function prop with its ID. The parent, which holds the complete list, supplies that function. Filtering the parent’s previous collection by ID returns the next collection, including any rows hidden by the current view.',
      'Putting onClick={onDelete(task.id)} invokes the function while React is rendering. Instead supply a function React can call later. For a toolbar action that needs no arguments, passing the named function itself is enough. Keep event names consistent across App, TaskList and TaskItem so a callback is never undefined at click time.',
    ],
    predict:
      'When does removeOne run here, and which record disappears after sorting?',
    example:
      'const removeOne = id => setTasks(previous =>\n  previous.filter(task => task.id !== id));\n// App passes removeOne down as onDelete. Inside a row:\n<button onClick={() => onDelete(task.id)}>Delete</button>',
    result:
      'Rendering creates the click handler. A later click supplies the clicked row’s ID. Sorting changes its position, while the ID still selects the same record in App.',
    exercise:
      'Replace the starter’s Delete status callback in App with a parent state update. Keep the existing TaskList and TaskItem forwarding path. Reverse the sort order, delete the first visible row and compare its ID with the remaining source. Reload to recover the demo rows at this stage.',
    hints: [
      'Follow the prop name from the JSX parent into the child parameters.',
      'Update from the previous source array, including hidden tasks.',
    ],
    mistake:
      'Deleting source[0] after clicking the first visible row can affect a different record.',
    takeaway: 'Pass data down and report actions up with stable IDs.',
  },
  {
    minutes: '25–35',
    goals: [
      'Predict queued updates from a single state snapshot.',
      'Keep hooks and side effects in the right places.',
    ],
    heading: 'Compare two clicks with two updates inside one click',
    explanation: [
      'State belongs to a component instance. A render sees one snapshot. Calling its setter queues another render. Reading the captured count later in the same event handler still reads that render’s value. Passing a function to the setter instead gives React a way to apply the update to the latest queued value.',
      'Call useState at the top level of a component or custom Hook, in the same order on every render. Put conditions inside the handler or returned JSX. Keep rendering and updater functions pure. Saving data, logging an actual user action or changing another component during render can repeat when React checks your component in development.',
    ],
    predict:
      'Starting from 3, what does each separate button click show if you reset to 3 before each trial?',
    example:
      '// First button handler\nsetCount(count + 1);\nsetCount(count + 1);\n\n// Second button handler\nsetCount(n => n + 1);\nsetCount(n => n + 1);',
    result:
      'The first ends at 4 because both calls request the same captured 3 + 1. The second ends at 5 because the second updater receives the first updater’s 4. The click handler still sees its original snapshot.',
    exercise:
      'Add a small Counter to App with useState(3), the two buttons and a reset button. In the same component add a separate boolean help state and a toggle using setShowHelp(open => !open). Reset to 3 between trials. Observe the count and Help without reloading.',
    hints: [
      'Use button type="button" when the control is not a submit action.',
      'Keep useState calls above conditional returns.',
    ],
    mistake:
      'Logging count directly after setCount does not measure the value rendered by the next update.',
    takeaway:
      'When the next state depends on previous state, calculate it in an updater.',
  },
  {
    minutes: '30–45',
    goals: [
      'Keep input, draft and validation feedback in sync.',
      'Handle Enter and clicking Add with one submit path.',
    ],
    heading: 'Keep a rejected draft available to fix',
    explanation: [
      'TaskForm owns the text being edited. A controlled input takes value={draft} and an onChange handler that copies event.target.value into draft state. A form submit handler calls preventDefault so Enter and clicking its submit button share one path without a page reload. Validate before requesting an add. Clear the draft only after acceptance.',
      'A usable title is a string whose trimmed length is 1 to 100 inclusive. Return {ok:true,title} for success or {ok:false,error} for a rejected value. Keep a useful message near the field and announce it using role="alert". A limit on the input alone cannot validate values coming from a test or another caller.',
    ],
    predict:
      'The user enters three spaces and presses Enter. Which steps should happen?',
    example:
      'const result = validateTitle(draft);\nif (!result.ok) {\n  setError(result.error);\n  return;\n}\n// Only a valid title can reach the parent callback.',
    result:
      'The handler prevents the default submit, keeps the draft, shows the error and skips the parent callback. With a valid padded title, send the cleaned title once.',
    followUp: {
      title: 'Test the form before wiring the full list',
      example:
        '<TaskForm onAdd={title => {\n  console.log("Accepted title", title);\n  return {ok: true};\n}} />',
      reasoning:
        'Use this temporary parent callback to verify accepted submissions in Lesson 7. It lets you observe a clean title and cleared field. Restore the starter callback afterward. Lesson 8 connects the form to real task state.',
    },
    exercise:
      'Run the pure helper lab, then try the local form with whitespace, a 100-character title, 101 characters and a padded valid title. Try Enter and click on separate submissions. Confirm that a rejected draft remains editable.',
    hints: [
      'Check typeof raw before trimming.',
      'Return on failure before calling onAdd or clearing the draft.',
    ],
    mistake:
      'Calling a state setter with an empty string before checking the input forces learners to retype their correction.',
    takeaway: 'Validate the value at the boundary and preserve rejected input.',
    extension:
      'Try the error and correction using only the keyboard. Improve the field description or focus treatment in your copy.',
  },
  {
    minutes: '35–50',
    goals: [
      'Add, toggle and delete by stable ID without mutating previous state.',
      'Verify row identity after a filter or sort.',
    ],
    heading: 'Build the next collection from the previous one',
    explanation: [
      'Treat the previous tasks array and its records as read-only. Append using a fresh array, toggle using map and a new object for the matching ID, and delete by filtering out that ID. Reuse unaffected records. Copying only the array leaves the same record objects inside it. Changing a shared record would still alter an earlier snapshot.',
      'Choose a unique positive safe integer ID when adding, never during render. With the starter’s numeric IDs, compute the largest present ID and add one, then let the helper reject collisions or an invalid ID. A new task starts incomplete. Keep task.id as the JSX key when filtering and reordering. Pure helpers can be tested with frozen inputs before connecting them to React.',
    ],
    predict:
      'What changes when you toggle ID 7 after sorting IDs 12, 7 and 31?',
    example:
      'const next = rows.map(row => row.id === 7\n  ? {...row, completed: !row.completed}\n  : row);',
    result:
      'The new array has the same order as rows. Only ID 7 is a new record. The old record and the other two task identities survive unchanged.',
    followUp: {
      title: 'Connect the starter helpers',
      example:
        'setTasks(previous => {\n  const nextId = previous.reduce((max, t) => Math.max(max, t.id), 0) + 1;\n  return addTaskToList(previous, nextId, title).tasks;\n});',
      reasoning:
        'Import the helper from src/lib/task-logic.js. Replace the entire temporary Add callback, including its starter failure return. Use the supplied toggleTaskInList and deleteTaskFromList inside similar functional setters. Record side effects outside the updater.',
    },
    exercise:
      'Implement the pure lab functions, then connect the local callbacks. Add two tasks, toggle one twice, filter to Active, reverse their order and delete one by ID. Clear filters to verify the other task survived.',
    hints: [
      'Return a new record only for the matching ID.',
      'Spread the full previous array when appending.',
    ],
    mistake:
      'tasks.length + 1 can collide after deletion. A row index can point at a different record after sorting.',
    takeaway:
      'An immutable update changes the intended identity and leaves the prior snapshot intact.',
  },
  {
    minutes: '25–40',
    goals: [
      'Choose a common owner for tasks and toolbar controls.',
      'Derive the shown rows independently of the remaining count.',
    ],
    heading: 'Show fewer rows without losing saved tasks',
    explanation: [
      'Form actions, the list and the toolbar all need a consistent task collection, so App is their nearest common owner. Keep tasks, filter, query and sort as source state. A visible list can be computed from those values on every render. Keeping a second visibleTasks state invites stale results when one of four inputs changes. The form draft can stay in TaskForm because other components do not need each keystroke.',
      'Compose the status predicate with a trimmed, case-insensitive title search. Sort a copy of the matching rows by numeric ID. For newest, higher IDs come first. Compute remaining from every source record whose completed flag is false. Shown and remaining answer different questions.',
    ],
    predict:
      'Two tasks are active. Only one active title contains React. What should the counts read with Active and a search for react?',
    example:
      'const all = [{id:1,title:"Read React",completed:true},\n  {id:2,title:"Practice JS",completed:false},\n  {id:3,title:"Build React app",completed:false}];',
    result:
      'ID 3 is the sole visible row. One is shown, two remain unfinished and three still exist. Clearing search can reveal ID 2 again.',
    exercise:
      'Use the toolbar on your local app. Change one control at a time. Watch the shown count and remaining count while changing search, status and sort. Trace the existing getVisibleTasks call back to all four inputs in App.',
    hints: [
      'Use includes on lowercase titles and a lowercase trimmed query.',
      'sort changes its receiver. Sort a filtered array or make a copy.',
    ],
    mistake:
      'Saving a filtered list as tasks loses the hidden rows on the next render or save.',
    takeaway:
      'Store the source and the controls. Derive the view and count separately.',
  },
  {
    minutes: '35–50',
    goals: [
      'Initialize from storage once per mount and persist accepted updates.',
      'Recover from unreadable storage without overwriting it.',
    ],
    heading: 'Read once, then synchronize changes',
    explanation: [
      'Keep the Week 2 key study-tasks-week2 and the fields id, title and completed. localStorage also belongs to an origin comprising scheme, host and port. A Vite tab on port 5173 cannot see task data saved on port 5500 even with the same key. Start a new list on the React origin and reopen that exact address when checking persistence.',
      'useState(initialRead) passes an initializer function. useState(initialRead()) calls it during every render even though React only needs the first result. Keep the initializer free of writes. After React commits, an effect depending on tasks and the read-success flag can synchronize accepted state with storage. Development Strict Mode can repeat initialization or effect setup to reveal impure logic. The same write should be safe to repeat.',
    ],
    predict:
      'A stored value contains broken JSON. What happens if the first effect blindly saves the empty fallback?',
    example:
      'const [initial] = useState(initialRead);\nconst [tasks, setTasks] = useState(initial.tasks);\nuseEffect(() => {\n  if (!initial.ok) return;\n  // Save tasks and display any write failure.\n}, [tasks, initial.ok]);',
    result:
      'An unconditional write would replace the unreadable original. Preserve the raw value, explain the problem and allow use in memory. A missing key on a new origin is an ordinary empty start.',
    followUp: {
      title: 'Use the existing storage adapter',
      example:
        'function initialRead() {\n  try { return readStoredTasks(window.localStorage); }\n  catch { return {ok:false,tasks:[],error:"Storage unavailable"}; }\n}',
      reasoning:
        'Import readStoredTasks and writeStoredTasks from src/lib/storage.js. Accessing localStorage itself can throw. Guard that access on write too. Display the initial error or write error near the list so the learner knows whether changes will survive a reload.',
    },
    exercise:
      'Add the initializer and save effect to App. Add two tasks, toggle one, delete the other and refresh. On a disposable origin set malformed data, reload and check the original value survives. Call the storage adapter with a fake whose setItem throws to exercise denied writes without touching your real list.',
    hints: [
      'Use the printed Vite origin for every reload test.',
      'Keep an unreadable initial record protected until an explicit recovery action.',
    ],
    mistake:
      'Switching between localhost and 127.0.0.1 can make a working list look empty because those are different hosts.',
    takeaway:
      'Storage errors and origin changes deserve a visible explanation.',
    extension:
      'On disposable origins, export a copy of your old data, validate it and deliberately import into an empty React project. Keep the original backup.',
  },
  {
    minutes: '90–150',
    goals: [
      'Demonstrate the integrated local React workflow.',
      'Diagnose an unfamiliar failure and verify the fix independently.',
    ],
    heading: 'Trace a regression through the whole app',
    explanation: [
      'Set up three fictional tasks with distinct IDs and at least one completed record. From a sorted, filtered view toggle or delete one. Clear the controls and inspect the remaining source IDs, then reload. Repeat a valid and invalid form submission by keyboard. Compare what reaches the handler, what the state helper returns and what the next render receives. This sequence connects events, state ownership, derived data and persistence.',
      'Run npm test and npm run build from the local project. The source suite has 25 pure helper and storage checks. Compilation catches bad imports and invalid JSX, while the real browser path checks the component wiring. Review git diff and explain which component owns each change before committing your local work. Editing and remote suggestions are outside the required v5 demo.',
    ],
    predict:
      'All helper tests pass, but pressing Delete while sorted removes the wrong task. Where would you look first?',
    example:
      'TaskItem click → onDelete(argument) → App updater\n  → deleteTaskFromList(previous, id) → next rendered rows',
    result:
      'Inspect the argument at the click boundary. A correct helper given a visible index can faithfully delete the wrong ID. Check the row key and repeat the same sort and click after fixing the argument.',
    exercise:
      'Complete the local project checklist and readiness quiz. In a separate copy choose an unfamiliar transfer case. Work without AI, reproduce the symptom, change one thing and rerun the same sequence. Record the before/after observation, test count and build result.',
    hints: [
      'Isolate a small input with two different IDs and change their displayed order.',
      'If reload alone breaks behavior, compare the origin, key, initial read and effect.',
    ],
    mistake:
      'A successful build shows the project bundles. It cannot verify which row a click affects.',
    takeaway:
      'Use the helper suite, production build and a repeatable browser journey as three different kinds of evidence.',
    extension:
      'Add edit, save and cancel in a project copy. Keep the draft out of saved state until the user saves.',
  },
]
export const weekFive = Object.fromEntries(
  lessons.map((lesson, i) => [
    'p1-w05-l' + String(i + 1).padStart(2, '0'),
    lesson,
  ]),
)
