import type { Reading } from './week-one'

const readings: Reading[] = [
  {
    minutes: '20–25',
    goals: [
      'Represent one task with three typed properties.',
      'Follow the same task after its array index changes.',
    ],
    heading: 'Give each task an identity that survives a move',
    explanation: [
      'Start with your working Week 1 task list, or download the student starter below. Add two tasks and reload. Both rows disappear because the only copy was on the page. This week you will build a list of records that can outlive a particular rendering. Keep the old project in its own folder so you can compare behavior.',
      'Use an array for the collection and an object for each task. Store a positive numeric id, a nonempty title string and a completed boolean. Two tasks can share a title. An array index answers “where is it now?” A stored id answers “which task is it?” Read a property after selecting a record, for example tasks[1].title. The array length counts all records.',
    ],
    followUp: {
      title: 'Start a data model next to your working page',
      example:
        'const first = {id: 3, title: "Read", completed: false};\nconst second = {id: 8, title: "Read", completed: true};\nconsole.table([first, second]);',
      reasoning:
        'In a copy of app.js, put this experiment before the form listener. Inspect the two rows in the console. Check which columns distinguish them. The existing form still draws its own rows. You will connect these pieces in Lesson 5.',
    },
    predict:
      'After the first task is removed, which number still identifies Sketch?',
    example:
      'const tasks = [{id: 4, title: "Read", completed: false},\n               {id: 9, title: "Sketch", completed: false}];\nconst remaining = tasks.slice(1);\nremaining[0].completed = true;',
    result:
      'Sketch moves from position 1 to position 0. Its ID stays 9. slice(1) makes a new array starting at the second record. Both arrays refer to the same Sketch object, so tasks[1].completed is now true. const fixes a binding and still permits property updates.',
    exercise:
      'Create two records with different IDs and the same title. Log the second title, the length and the ID before and after selecting a shorter list.',
    hints: [
      'Use brackets to pick an element before reading .title.',
      'Print both the index and the ID of the surviving record.',
    ],
    mistake:
      'Using an index as a permanent ID makes a Delete button point at a different task after another row disappears.',
    takeaway:
      'Give identity to the data when the task is created. Carry that ID into every later view.',
  },
  {
    minutes: '20–30',
    goals: [
      'Return a result that another function can use.',
      'Pass a callback for later invocation.',
    ],
    heading: 'Hand a function to another function',
    explanation: [
      'A parameter names the value supplied by the caller. Use return when the caller needs a result. Logging a trimmed title can help you inspect it, but a function with no return gives its caller undefined. Build a small cleaner before adding validation or page updates.',
      'A callback is an ordinary function passed as a value. A list can call it once per element. Passing visit gives the caller the function. Writing visit() runs it immediately and hands over its result. A callback can inspect a record without modifying it.',
    ],
    followUp: {
      title: 'Return a value to the next step',
      example:
        'function cleanedLength(raw) {\n  const cleaned = raw.trim();\n  return cleaned.length;\n}\nconsole.log(cleanedLength(" Jo "), cleanedLength("   "));',
      reasoning:
        'Expect 2 then 0. A validator can compare that number with zero. To count active records, start a counter at zero, visit each record and use count += 1 only when completed is false. Try an empty array first.',
    },
    predict: 'What does visit receive and how often does it run?',
    example:
      'function eachName(names, visit) {\n  names.forEach(visit);\n}\nconst seen = [];\neachName([" Jo ", "May"], name => seen.push(name.trim()));',
    result:
      'The callback receives each name in order. seen contains "Jo" and "May". The original strings still have their original spacing.',
    exercise:
      'Write a cleaner, a boolean validator and a function that counts unfinished records. Use a callback to visit two titles in order. Try an empty collection too.',
    hints: [
      'Return a boolean expression such as cleaned.length > 0.',
      'An empty array has no elements to visit and its unfinished count is zero.',
    ],
    mistake:
      'Calling a callback while registering it can change the page before the first real event happens.',
    takeaway:
      'Separate the value a function returns from the moment a caller asks it to run.',
    extension:
      'Rewrite one arrow callback as a named function and compare the two outputs.',
  },
  {
    minutes: '30–40',
    goals: [
      'Choose an array operation by the result you need.',
      'Update one record without discarding hidden tasks.',
    ],
    heading: 'Trace one collection through five operations',
    explanation: [
      'Use forEach for an action per element. It returns undefined. map returns one transformed value per element. filter returns the matching elements and leaves the source array intact. find returns the first match, or undefined. reduce carries a result from one element to the next. Supply an initial value so an empty collection has a defined result.',
      'A filtered collection still shares its record objects with the source. For a change that should produce new data, map the full array and copy the record with the matching id. Use the full set of IDs when allocating a new one. The largest live ID plus one works for this local exercise.',
    ],
    followUp: {
      title: 'Copy one record without changing its neighbor',
      example:
        'const books = [{id: 5, read: false}, {id: 8, read: true}];\nconst revised = books.map(book =>\n  book.id === 5 ? {...book, read: true} : book\n);\nconsole.log(books[0].read, revised[0].read);',
      reasoning:
        'The three dots copy existing properties into a fresh object. The later read property supplies its new value. The output is false, true. To find a record you can pass a predicate to find, such as book => book.id === 8.',
    },
    predict: 'What remains in books after selecting the unfinished titles?',
    example:
      'const books = [{id: 4, title: "Ink", completed: true},\n               {id: 9, title: "Salt", completed: false}];\nconst titles = books.filter(b => !b.completed).map(b => b.title);\nconst next = books.reduce((max,b) => Math.max(max,b.id), 0) + 1;',
    result:
      'titles contains only Salt. books still has two records. The accumulator visits 4 and then 9, so next is 10. With no books the initial zero gives 1.',
    exercise:
      'Find a missing ID. Toggle one existing ID using a copied record such as {...task, completed: !task.completed}. Compare all the original records after the call.',
    hints: [
      'Ask whether your output should be one value, an array of the same length, or a subset.',
      'Build temporary views from the source and assign them to a different name.',
    ],
    mistake:
      'Replacing the stored collection with the Active subset loses completed tasks as soon as the user changes views.',
    takeaway:
      'A selection answers a question about the data. A deletion deliberately changes the data.',
  },
  {
    minutes: '20–25',
    goals: [
      'Trace an interaction from event through state to DOM.',
      'Identify which changes need saving.',
    ],
    heading: 'Decide where the truth lives',
    explanation: [
      'Imagine that the array still contains the task you just removed from the screen. The next render reads that array and builds the row again. You changed only the drawing. Treat the tasks array as the source of truth. The list, count and checkbox states are outputs you can reconstruct.',
      'For an edit, read the event, identify the record, update the model, save changed task data when persistence is enabled, then render. Saving an old array before updating it makes the current screen and the next reload disagree. Switching filters can rerender without any change to the stored tasks.',
    ],
    followUp: {
      title: 'Trace the Week 1 starter',
      example:
        'submit → clean title → addTask(title) → append one row\ncheckbox change → change a CSS class\nDelete click → remove one row',
      reasoning:
        'Find these three event paths in app.js. On paper, insert the model update each path would need before drawing. Mark where a save belongs once persistence is introduced. Changing a filter calls for drawing the current model again.',
    },
    predict: 'Which action will cause the row for ID 4 to return?',
    example:
      '// The array contains IDs 4 and 9.\nlist.firstElementChild.remove();\nrender(tasks);',
    result:
      'Rendering the unchanged array brings ID 4 back. To delete the task, remove that ID from the model first, then save and render the new collection.',
    exercise:
      'Trace a checkbox click on paper. Write the checkbox value, the record value, the saved value and the value after rerender. Repeat for switching to Completed.',
    hints: [
      'Inspect the array before looking at the generated rows.',
      'Plain JavaScript needs an explicit render call after a model change.',
    ],
    mistake:
      'Changing a CSS class can make a task look completed while its stored completed value remains false.',
    takeaway:
      'If a fresh render undoes an action, check which copy the action changed.',
  },
  {
    minutes: '25–35',
    goals: [
      'Rebuild a list from records without duplicates.',
      'Render literal titles and synchronize completion cues.',
    ],
    heading: 'Make a second render produce the same list',
    explanation: [
      'One render owns the task list. Clear its previous children first, then visit the current records. For each task build a fresh li, assign its title as text, set the checkbox checked property and apply the completed class from the same boolean. Append the row to the list.',
      'In this guided lab clearRows() clears the fixture list. appendRow(id, title, checked, completedStyle) creates one row using the supplied values. The fixture inserts title as text. Your function decides when to clear and which values reach each row. In your own project you build the nodes yourself.',
    ],
    followUp: {
      title: 'Separate creating a row from adding a task',
      example:
        'function drawList(records, list, makeRow) {\n  list.replaceChildren();\n  for (const record of records) {\n    list.append(makeRow(record));\n  }\n}',
      reasoning:
        'In your copy of app.js, extract the node-building part of addTask into a function that takes a record and returns an li. Use record.title and record.completed when setting its text, checkbox and class. Run the drawing function twice with the same two sample records before replacing the old submit handler.',
    },
    predict: 'What happens on the second render if the first line is missing?',
    example:
      'function drawLabels(labels, list) {\n  list.replaceChildren();\n  labels.forEach(label => {\n    const li = document.createElement("li");\n    li.textContent = label;\n    list.append(li);\n  });\n}',
    result:
      'A complete render with two labels produces two rows each time. Removing replaceChildren makes a second call append two more. The data did not double.',
    exercise:
      'Render two tasks twice, then render a one-task array. Use a title containing <b>Read</b>. Look for one checkbox and literal bracket characters in the remaining row.',
    hints: [
      'Clear once before the loop. Clearing inside the loop leaves only the last task.',
      'Read checked and the completed appearance from the same record property.',
    ],
    mistake:
      'Reading rows back into the model can revive a deleted row on the next render.',
    takeaway:
      'A render can start with an empty list because the model already contains everything it needs.',
  },
  {
    minutes: '30–40',
    goals: [
      'Add clean records with unused numeric IDs.',
      'Toggle or remove one task after its position changes.',
    ],
    heading: 'Translate Add, Toggle and Delete into model updates',
    explanation: [
      'A submit handler receives both button and Enter submissions. Cancel its default navigation. Trim the field before creating anything. If the cleaned string is empty, return the same tasks and show a helpful message. Otherwise allocate an ID, set completed to false and append the new record.',
      'Use the clicked task’s ID in the event handler. Toggle by mapping the whole collection and changing only the match. Delete by keeping every record whose ID differs. The lab wires native controls to your update function and renders its returned array. Use warn(text) for invalid input.',
    ],
    followUp: {
      title: 'Connect the native controls in the starter',
      example:
        '// Inside the handler for this particular row:\ncheckbox.addEventListener("change", () => {\n  tasks = update(tasks, "toggle", task.id);\n  render(tasks);\n});',
      reasoning:
        'Keep the array in a let binding if update returns a replacement. Replace item.remove() in the delete listener with a model update followed by rendering. In the form submit listener keep preventDefault, clear the field after success, and focus it again. Avoid attaching another submit listener each time you render.',
    },
    predict: 'Which record remains after this handler receives 9?',
    example:
      'const items = [{id: 9, title: "North"}, {id: 4, title: "South"}];\nfunction without(items, id) {\n  return items.filter(item => item.id !== id);\n}\nconst remaining = without(items, 9);',
    result:
      'South remains. Removing array position 9 would leave both records. If the user sees a filtered list, the ID still names the same record.',
    exercise:
      'Create two tasks with the same title. Toggle the second twice and delete the first. Compare IDs and completed flags before and after each operation.',
    hints: [
      'Calculate the new ID from all live IDs, including hidden records.',
      'For each action return the complete updated collection.',
    ],
    mistake:
      'A Delete button inside a form defaults to submit unless you give it type="button". That can accidentally create a task as well as removing one.',
    takeaway:
      'An action carries the ID. The model update decides which record changes.',
  },
  {
    minutes: '25–35',
    goals: [
      'Preserve user titles as literal text.',
      'Connect keyboard, form and checkbox behavior to the right records.',
    ],
    heading: 'Choose an event and a safe destination for each value',
    explanation: [
      'Use the form submit event for Add and a checkbox change event for toggling. Click suits a Delete button. An input event can clear a stale warning as the user types. Give every control a visible label or an accessible name specific to its task. Read checkbox.checked for its current state.',
      'A string like <b>Plan</b> is a title, not a formatting instruction. Assign it with textContent. After a valid addition clear and focus the input. Announce validation errors through a live status message. In the lab configure the row and form using the named fixture functions listed below.',
    ],
    followUp: {
      title: 'Give a checkbox its task name',
      example:
        'const label = document.createElement("label");\nconst box = document.createElement("input");\nbox.type = "checkbox";\nlabel.append(box, document.createTextNode(task.title));',
      reasoning:
        'A wrapping label associates its text with the control. Alternatively connect label.htmlFor to a unique input ID. Tab to the checkbox and press Space. Its checked state and just that task’s model value should change together.',
    },
    predict: 'What text and accessible name does this row produce?',
    example:
      'const title = "A & B";\nspan.textContent = title;\ncheckbox.setAttribute("aria-label", "Complete " + title);\nremove.type = "button";\ncheckbox.addEventListener("change", () => toggle(task.id));',
    result:
      'The text includes an ampersand. The checkbox is named Complete A & B and its change handler carries that row’s ID. Delete can sit inside the form without submitting it.',
    exercise:
      'Try two identical titles. Toggle just one by keyboard. Try Enter, spaces-only input, quotes and markup-like text; examine the text and focus after each action.',
    hints: [
      'Listen on the form to cover both Add and Enter.',
      'Choose a status or alert region for feedback and return focus to the field.',
    ],
    mistake:
      'A label such as “checkbox” identifies the control type but gives no clue which task it changes.',
    takeaway:
      'A task stays usable when its text, accessible names and events all describe the same record.',
  },
  {
    minutes: '35–45',
    goals: [
      'Round-trip task records through JSON.',
      'Recover when storage is missing, malformed or unavailable.',
    ],
    heading: 'Make reload a predictable operation',
    explanation: [
      'Storage keeps strings per browser origin. Serialize task records with JSON.stringify. On startup call getItem with the same key. A missing key returns null. Parse inside try/catch because malformed JSON throws. Valid JSON can also be a number or object. Confirm an array and check each record before rendering it.',
      'A learning-level task validator checks a positive safe integer ID, a nonempty string title and a boolean completed flag. If saving fails, keep the current model usable and tell the learner their edits may disappear on reload. The exercise injects an in-memory storage adapter. Your own project uses study-tasks-week2 on its own local origin.',
    ],
    followUp: {
      title: 'Try a save and a reload in your own project',
      example:
        '// In the console for your local Study Tasks page\nconst key = "study-tasks-demo";\ntry {\n  localStorage.setItem(key, JSON.stringify([{id: 8, title: "Trace", completed: false}]));\n} catch {\n  console.log("Could not save. Keep your work in memory.");\n}\n// Reload the page, then run this block on its own.\ntry {\n  const text = localStorage.getItem("study-tasks-demo");\n  console.log(text === null ? [] : JSON.parse(text));\n} catch {\n  console.log("Could not restore tasks. Start with an empty list.");\n}',
      reasoning:
        'After a successful save, expect one record with ID 8 on reload. The demo uses a separate key. In the lab, call the same methods on the supplied storage parameter. In app.js load the initial array before the first render. In each edit handler save after updating tasks. Put the setItem call inside try/catch. If it throws, show a visible status message and continue rendering the in-memory collection. To test reload use the same browser, host and port each time.',
    },
    predict: 'What needs checking after this parse succeeds?',
    example:
      'const decoded = JSON.parse(\'{"id":8}\');\nconst list = Array.isArray(decoded) ? decoded : [];\nconst next = list.reduce((n,t) => Math.max(n,t.id), 0) + 1;',
    result:
      'An object is valid JSON but is not a task list. list is empty and next is 1. If restored records have IDs 2 and 8, start at 9.',
    exercise:
      'Try missing data, bad JSON, a non-array and a record with completed set to the string "false". In your project test reload on one consistent local origin with fictional tasks.',
    hints: [
      'Wrap both reading and parsing in a recovery path; a missing value is a normal first visit.',
      'Catch setItem failure separately so an in-memory task remains usable.',
    ],
    mistake:
      'JSON.parse checks syntax. It cannot tell whether the result has the shape your render function expects.',
    takeaway:
      'Save after data mutations. Validate on load and keep a useful in-memory path if persistence fails.',
  },
  {
    minutes: '25–35',
    goals: [
      'Derive views without losing the underlying records.',
      'Keep the remaining count global across all filters.',
    ],
    heading: 'Show a subset without shrinking the source',
    explanation: [
      'Keep two pieces of information: the full tasks array and a view name such as active. Derive visibleTasks from the pair each time you render. Switching to Completed should hide active tasks while preserving them for the next view. A filter click alone never changes the saved task records.',
      'Count unfinished tasks from the full collection, even when no unfinished row is visible. Distinguish an empty source (“No tasks yet”) from a nonempty source with zero matches (“No tasks match this filter”). Use type="button" and aria-pressed on filter controls so the current selection can be read with a keyboard or screen reader.',
    ],
    followUp: {
      title: 'Add filter controls to your project',
      example:
        '<button type="button" data-filter="active" aria-pressed="false">Active</button>\n<p role="status" id="remaining"></p>',
      reasoning:
        'Add All and Completed alongside Active. In each click listener set the current filter from the clicked button and refresh the display. Draw the derived rows, set each button’s pressed state and write the global count to the status element. Run the same view with zero tasks, then with two completed tasks.',
    },
    predict:
      'Two tasks are active and one is complete. What does Completed show?',
    example:
      'const completedView = tasks.filter(t => t.completed);\nconst remaining = tasks.filter(t => !t.completed).length;',
    result:
      'One row is visible while the remaining count is two. Switching to All restores three rows without reading storage again.',
    exercise:
      'With Active selected, complete one visible task. Predict its disappearance, then verify the record in All. Delete the other active task and check that the completed one survives.',
    hints: [
      'Give the derived list a different name from the source.',
      'Choose the empty message by checking the source length before the visible length.',
    ],
    mistake:
      'Counting visible rows gives the wrong remaining count in Completed view.',
    takeaway:
      'The filter changes what you can see. Your next data mutation still targets the full model.',
  },
  {
    minutes: '30–40',
    goals: [
      'Find the first point where state and DOM disagree.',
      'Verify a focused repair using the original and a neighboring case.',
    ],
    heading: 'Catch the first wrong value',
    explanation: [
      'Start in an expendable project copy. Write down the initial records, the action, the expected result and what actually appeared. Inspect tasks.length and the list child count immediately before and after render. If the model has two records and the page has four rows, adding a guard to the Add button targets the wrong layer.',
      'A stack trace identifies where a failure surfaced. Use a breakpoint to inspect the value that arrived there. For storage bugs compare the saved string, parsed value and validated records. Apply one change and rerun the original reproduction plus a related regression. A reviewer or optional AI tool may suggest a hypothesis; verify the prediction yourself.',
    ],
    followUp: {
      title: 'Write a bug report you can replay',
      example:
        'Start: two records; one is completed.\nAction: select Active, then All.\nExpected: both records in All. Actual: only one.\nInspect: log source IDs before and after the first click.',
      reasoning:
        'If an ID disappears before rendering, inspect the filter handler. If the IDs remain in memory, inspect the renderer. Make one repair, repeat both clicks, then delete a visible row to check a neighboring operation.',
    },
    predict: 'Which observation narrows a duplicate-row bug most directly?',
    example:
      '// At a breakpoint just after a second render\nconsole.log(tasks.length, list.children.length);\n// Result: 2, 4',
    result:
      'The model count stayed at two. Inspect how render clears and appends rows. If the model count had doubled, the event or update path would need attention first.',
    exercise:
      'Introduce one reversible bug in a copy: omit a clear, remove a DOM row only, or overwrite the source on filter. Record the smallest reproduction, repair and retest. Review the diff before making a local commit.',
    hints: [
      'One action and two records are often enough.',
      'Repeat a neighboring case such as rendering after a delete.',
    ],
    mistake:
      'A visually correct screen after one click can still fail after the next render or reload.',
    takeaway:
      'A debugging record connects one observed failure to a specific cause and a repeatable test.',
    extension:
      'Ask for one diagnostic question about a small fictional snippet. Verify the suggestion and record what you kept.',
  },
  {
    minutes: '75–120',
    goals: [
      'Demonstrate a persistent Study Tasks v2 project.',
      'Explain a fresh change using evidence from three tasks.',
    ],
    heading: 'Prove that the same records survive a reload',
    explanation: [
      'Use your project and a consistent local address. Add three fictional tasks with distinct IDs, complete one and note the rows, count and active filter. Reload, toggle back, delete and reload again. Check the saved string as well as the screen. A deleted task should stay gone and a new ID should avoid every live ID.',
      'Run boundary cases too: Enter and button submission, whitespace, literal angle brackets, denied storage and distinct empty messages. In disposable test data only, save the old value of study-tasks-week2, replace it with invalid JSON, reload and verify recovery. Restore your test data. Use a copy of your local project for a denied-write test. Inside its save function’s try block, temporarily put throw new Error("Test write failure") immediately before setItem. Add a task. Check that it appears with a warning, then remove the test line and verify a normal save and reload.',
    ],
    followUp: {
      title: 'Prepare evidence for your independent change',
      example:
        'Fixture: ID 2 active, ID 8 completed, ID 11 active.\nAction: switch from All to Completed.\nExpected visible IDs: [8]. Expected remaining: 2.\nNow delete 8 and predict All before you switch back.',
      reasoning:
        'Record your prediction and the actual outcome in your own README. Name the file and function you changed. Use fictional titles and a disposable storage key for corruption tests. The final checklist asks you to confirm your work after you actually run it.',
    },
    predict:
      'Which observations would distinguish a temporary filter from lost data?',
    example:
      'Start with IDs 2, 8 and 11; only 8 is completed.\nSwitch to Completed, reload your task data, then switch to All.\nCompare record IDs and the global remaining count.',
    result:
      'Completed displays ID 8. All can show all three IDs again. The remaining count stays two. Deleting ID 8 changes the model and the next reload should contain only 2 and 11.',
    exercise:
      'On a copy, independently add a global completed count or repair a destructive filter. Use documentation and your own reasoning for this transfer task, without AI. Record the initial fixture, exact change, expected and observed result, and a regression test.',
    hints: [
      'Change the view while watching whether the count follows the whole model.',
      'Test a second operation after your fix; a single screenshot cannot demonstrate persistence.',
    ],
    mistake:
      'A local checklist records what you personally verified. Passing a browser fixture alone cannot verify the files on your computer.',
    takeaway:
      'The project is ready to show when a fresh run, a reload and a fresh change all agree with the same model.',
    extension:
      'Choose one optional README improvement or display enhancement after the required behaviors work.',
  },
]
export const weekTwo = Object.fromEntries(
  readings.map((r, i) => ['p1-w02-l' + String(i + 1).padStart(2, '0'), r]),
)
