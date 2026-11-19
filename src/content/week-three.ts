import type { Reading } from './week-one'

const chapters: Reading[] = [
  {
    minutes: '15–25',
    goals: [
      'Trace an edit from a user action to a saved record.',
      'Count unfinished tasks without changing them.',
    ],
    heading: 'Follow a task through one change',
    explanation: [
      'Start with Study Tasks v2. Add two fictional tasks, finish one, then select Completed. The list shrinks to one row. The source still holds two records. A view answers a question about those records. Adding, renaming and deleting change the records themselves.',
      'Think through an edit in order. The event supplies an intent and a stable ID. Validate the input, update that record, save the accepted collection, then draw the current view. Searching or sorting only changes how you draw it. A pure helper returns a value from its inputs without writing storage, updating the DOM or modifying the records.',
    ],
    followUp: {
      title: 'Trace one action in your starter',
      example:
        'Before: ID 7 is active; ID 9 is complete.\nAction: show Completed.\nVisible IDs: [9]. Saved IDs: [7, 9]. Remaining: 1.',
      reasoning:
        'Open DevTools on the student project. Inspect study-tasks-week2 in browser storage before and after switching views. Then toggle a checkbox and compare the changed record. Keep this baseline for testing after your edits.',
    },
    predict: 'What will the second call return?',
    example:
      'const cards = [{done: true}, {done: false}];\nconst finished = rows => rows.filter(r => r.done).length;\nfinished(cards);\nfinished(cards);',
    result:
      'Both calls return 1. filter selects matching records into a new array. Reading its length leaves the input and its flags alone.',
    exercise:
      'Open the student starter or a copy of Week 2. Compare the saved records before and after changing the status filter. Write a count helper in the lab using completed as the flag.',
    hints: [
      'Count the full input, including records hidden by a filter.',
      'Try an empty array and repeat the call on the same nonempty array.',
    ],
    mistake:
      'A helper that flips a flag while counting makes the next call depend on the previous one.',
    takeaway:
      'Keep data changes in the event path. A view or count can then be recomputed whenever it is needed.',
  },
  {
    minutes: '20–30',
    goals: [
      'Validate a title before saving an edit.',
      'Rename one stable ID while preserving earlier data.',
    ],
    heading: 'Validate first, then replace one record',
    explanation: [
      'An edit begins as untrusted input from a text field. Check that it is a string before trimming. Count the cleaned string’s length. Accept 1 through 100 inclusive. A blank value, a longer value or an unknown ID leaves the existing tasks intact. Show what the learner can correct.',
      'Use map to make a new list. For the matching ID, spread the record into a fresh object and replace its title. Preserve every other field, including completed. A local helper can return {ok, tasks, error} so its caller can distinguish a rejected edit from a successful save. The lab asks for just the resulting array.',
    ],
    followUp: {
      title: 'Keep the other records intact',
      example:
        'const notes = [{id: 2, text: "Ink"}, {id: 8, text: "Pen"}];\nconst revised = notes.map(n => n.id === 8 ? {...n, text: "Pencil"} : n);\nconsole.log(notes[1].text, revised[1].text);',
      reasoning:
        'Expect Pen and Pencil. Adapt this pattern after validating the proposed task title. In the local form, keep the editor open when validation fails and show a message beside its field.',
    },
    predict: 'Which title will the original still hold?',
    example:
      'const old = {id: 8, title: "Draft", completed: true};\nconst revised = {...old, title: "Publish"};\nconsole.log(old.title, revised.completed);',
    result:
      'Draft and true. The new object takes its initial properties from old. Writing a new title on that copy leaves the first object intact.',
    exercise:
      'Try a padded title, a number, exactly 100 characters and one more. Rename the middle record of a reordered collection. Check both the returned list and the original.',
    hints: [
      'Use typeof raw === "string" before raw.trim().',
      'Compare record.id to the requested ID inside map.',
    ],
    mistake:
      'Copying only the outer array and then changing a shared record also changes the original.',
    takeaway:
      'Validate before the first write and copy the record that changes.',
  },
  {
    minutes: '15–25',
    goals: [
      'Sort a derived list numerically in either direction.',
      'Carry record identity across changes of position.',
    ],
    heading: 'Create the sorted view on a copy',
    explanation: [
      'Array.sort rearranges the array on which it runs. A second variable pointing at that same array gives you another name for the same data. Start with a shallow copy using slice() or spread. Supply a numeric comparator. A negative result places the left item first. Default string order puts 12 before 4.',
      'In this project IDs are allocated in increasing order. Oldest means smaller ID first and newest means larger first. IDs indicate creation order here, but they do not encode calendar times. A row action still uses its record ID even if it becomes the first visible row.',
    ],
    followUp: {
      title: 'Make a test distinguish sorting from mutation',
      example:
        'const ids = [20, 3, 11];\nconst descending = [...ids].sort((a,b) => b - a);\nconsole.log(descending, ids);',
      reasoning:
        'The results are [20, 11, 3] and [20, 3, 11]. Compare both arrays. Testing just the first one would also pass for an in-place sort.',
    },
    predict: 'What are the first IDs in tickets and byNumber?',
    example:
      'const tickets = [{id: 20}, {id: 3}];\nconst byNumber = tickets.slice().sort((a,b) => a.id - b.id);',
    result:
      'tickets still starts with 20. byNumber starts with 3. Reverse the subtraction for descending order.',
    exercise:
      'Predict both orders for 12, 4 and 19. Call both sorts on the same input and recheck its original order. Repeat with two identical titles.',
    hints: [
      'Copy before invoking sort.',
      'Compare numeric IDs even when the titles match.',
    ],
    mistake:
      'The first row in the newest view can refer to the last-created record. Deleting source index zero removes a different task.',
    takeaway: 'Sort a copy for display and attach actions to record IDs.',
  },
  {
    minutes: '20–35',
    goals: [
      'Load an ES module from a local HTTP server.',
      'Use browser evidence to repair a broken import.',
    ],
    heading: 'Give the data helpers their own module',
    explanation: [
      'Keep task-logic.js for pure functions and app.js for events, rendering and persistence. An export names a value other files can import. The relative path starts at the importing file. Use ./ and the actual .js extension. Set type="module" on the script that loads app.js.',
      'Serve the project folder locally. If Python 3 is installed, run python3 -m http.server 5500 --bind 127.0.0.1 there and open http://127.0.0.1:5500/. An editor’s local preview server also works. A static server delivers files. All task logic still runs in the browser. Keep the same protocol, hostname and port as your Week 2 HTTP project when checking saved tasks.',
    ],
    followUp: {
      title: 'Connect the entry script in index.html',
      example: '<script type="module" src="./app.js"></script>',
      reasoning:
        'Replace the existing app.js script tag with this tag. Keep one entry script. Put the export in task-logic.js and the import in app.js, alongside index.html. From that folder start the server and look for Trace in the console.',
    },
    predict:
      'Put each part in the named JavaScript file. What appears after the module loads?',
    example:
      '// task-logic.js\nexport const labelFor = task => task.title;\n// app.js\nimport {labelFor} from "./task-logic.js";\nconsole.log(labelFor({title: "Trace"}));',
    result:
      'The console shows Trace. A file opened directly from disk can encounter module-origin restrictions. Use the HTTP address printed by the server.',
    exercise:
      'On a copy, change the import to a nonexistent filename. Reload, inspect the requested URL and status in Network, then correct the path and reload. Stop a terminal server with Ctrl+C when finished.',
    hints: [
      'A 404 identifies the missing requested resource.',
      'A successful fetch followed by a missing export error points to the exported name.',
    ],
    mistake:
      'A different port is a different storage origin. An empty list there does not establish that the old origin lost its tasks.',
    takeaway: 'Check URL, request status, then exported name, in that order.',
  },
  {
    minutes: '20–30',
    goals: [
      'Route actions from controls inside a changing list.',
      'Handle nested click targets and ignore unrelated clicks.',
    ],
    heading: 'Listen on the list that survives a redraw',
    explanation: [
      'A click on a span inside a button bubbles through the button to the list. event.target is the original node. event.currentTarget is the list where the listener runs. Attach one listener per event type to the list during setup. Replacing list children then leaves the listener in place.',
      'Find the nearest action control with closest("[data-action]"). Check that it belongs to your list and has a supported action. Read the numeric ID from that control. Use click for Edit and Delete, change for a checkbox and submit for saving a form. Ignore the checkbox click so the following change performs exactly one update.',
    ],
    followUp: {
      title: 'Move listeners out of row creation',
      example:
        'list.addEventListener("click", onListClick);\nlist.addEventListener("change", onListChange);\n// Call render after installing these listeners once.',
      reasoning:
        'In your local app, put data-action and data-id on each control during row creation. Remove the old per-row listener when moving its behavior to the list. Otherwise one click can reach both. In the lab install() registers events and route(kind) decides what they mean.',
    },
    predict: 'What if the user clicks the icon inside the button?',
    example:
      'const control = event.target.closest("[data-action]");\nif (control && list.contains(control)) {\n  const id = Number(control.dataset.id);\n  // Route the supported action with this ID.\n}',
    result:
      'closest walks up from the icon to the button. Clicking list whitespace finds no action control. A guard handles that case before reading a dataset.',
    exercise:
      'Put a span inside Delete in your own project. Rerender twice, then click the span. Compare the ID from the control to its current position. In the lab, nearestAction() and nearestId() perform the checked lookup during the event.',
    hints: [
      'Register click and change once during setup.',
      'Call the action helper only when its event and action names agree.',
    ],
    mistake:
      'Installing listeners inside render can run the same action twice. Reading dataset only on the icon can miss it entirely.',
    takeaway:
      'One stable listener can serve new rows when the action comes from the nearest matching control.',
  },
  {
    minutes: '25–40',
    goals: [
      'Keep a draft separate from the saved title.',
      'Support Save, Cancel, Enter and Escape with useful focus.',
    ],
    heading: 'Give editing a beginning and an end',
    explanation: [
      'Opening an edit records the selected ID, fills a labeled field with its current title and focuses the field. While the learner types, only the draft changes. Submitting validates its trimmed value. An error keeps the editor open. A valid save updates that ID and persists once. Cancel discards the draft.',
      'Use the native form submit path for Save and Enter. Escape can invoke Cancel from the edit field. Other keys should retain their usual behavior. After closing, return focus to the Edit control for the same ID. If the row was deleted during editing, discard the stale draft.',
    ],
    followUp: {
      title: 'Keep the active ID when choosing where to return focus',
      example:
        'let editingId = null;\nfunction beginEdit(task) {\n  editingId = task.id;\n  field.value = task.title;\n  field.focus();\n}',
      reasoning:
        'Use a labeled field in a form with a submit button for Save and type="button" for Cancel. In the submit handler call preventDefault before validating. Capture the edit ID before closing, redraw, and focus the surviving Edit button or another useful control if the row has gone.',
    },
    predict: 'What remains after a canceled edit?',
    example:
      'const saved = {id: 9, title: "Read"};\nlet draft = saved.title;\ndraft = "Read chapter two";\ndraft = ""; // cancel without saving',
    result:
      'The saved title is still Read. Changing a draft string never touched the record.',
    exercise:
      'In a copy of the app, edit the first row after sorting. Type a new title, cancel, then repeat and save. Check the record ID and focus after each path. Try 100 and 101 characters.',
    hints: [
      'The supplied editor helpers manage focus when you open or close the field.',
      'Reject invalid input before calling the commit helper.',
    ],
    mistake:
      'Updating task.title on every keystroke leaves nothing for Cancel to discard.',
    takeaway:
      'Only an accepted save crosses the boundary between the draft and the model.',
    extension:
      'After a deletion, place focus on a surviving row or the Add field and test the next keyboard action.',
  },
  {
    minutes: '20–35',
    goals: [
      'Combine status, search and order in one derived view.',
      'Distinguish a global count from a visible result.',
    ],
    heading: 'Compose a view without losing hidden records',
    explanation: [
      'Start from every saved record. Select by status, then compare each title with the trimmed, lowercased query. includes finds a substring. An empty query matches all titles. Sort the result by numeric ID. Changing a control recomputes the view without writing task storage.',
      'Count unfinished records from the full input. Separately count visible rows. When the source is empty, invite the learner to add a task. If the source contains records but the view is empty, suggest changing the search or filter.',
    ],
    followUp: {
      title: 'Check the view with names you can recognize',
      example:
        'ID 7  Read JS      active\nID 9  Practice CSS complete\nID 12 Debug JS     active\nQuery " js ", status Active, Newest → visible [12, 7]',
      reasoning:
        'Switch to Completed with the same query. Expect zero visible and two remaining. Clear the query. Practice CSS should reappear with its original ID.',
    },
    predict: 'Which titles survive this query?',
    example:
      'const term = " CSS ".trim().toLowerCase();\nconst titles = ["CSS grid", "Read HTML", "Practice css"];\nconst matches = titles.filter(t => t.toLowerCase().includes(term));',
    result:
      'CSS grid and Practice css both match. With an additional Completed filter, only completed matches survive.',
    exercise:
      'Make two active JavaScript tasks and a completed CSS task. Search with mixed case and outer spaces. Switch the sort order and status, then clear the query to recover all rows.',
    hints: [
      'Normalize the query and each candidate title.',
      'Choose the empty message by checking source length before visible length.',
    ],
    mistake:
      'Using the length of the visible list as the remaining count makes the count jump when only the query changes.',
    takeaway:
      'Search, filter and sort derive a display. They must preserve the source collection.',
  },
  {
    minutes: '25–35',
    goals: [
      'Restore valid unique records from stored JSON.',
      'Verify literal titles, keyboard operation and storage origin locally.',
    ],
    heading: 'Validate the parsed value before rendering it',
    explanation: [
      'A missing key returns null. Malformed JSON throws. Even valid JSON can contain a number, a single object or malformed records. Restore an array only. Keep the first valid occurrence of each positive safe-integer ID. Check for a nonblank string title of at most 100 characters and a boolean completed flag. Preserve the order of the surviving records.',
      'The Week 3 app still uses study-tasks-week2 on the same origin. Use disposable data to check recovery. When rendering recovered titles, assign textContent. Verify visible focus, an associated field label, Enter to save and Escape to cancel. A successful JSON parse says nothing about whether text is intended as markup.',
    ],
    followUp: {
      title: 'Separate parsing from accepting records',
      example:
        'try {\n  const rows = JSON.parse(raw);\n  if (!Array.isArray(rows)) return [];\n  // Validate each row before keeping its ID.\n} catch {\n  return [];\n}',
      reasoning:
        'Use this inside your restore function. The lab supplies isTask. In your project write the predicate using Number.isSafeInteger, typeof checks and the title length limit. Try a bad record followed by a valid one with the same ID.',
    },
    predict: 'Which of these two records should reserve ID 5?',
    example:
      '[{"id":5,"title":" ","completed":false},\n {"id":5,"title":"A & B","completed":true}]',
    result:
      'Only the second record is valid. Marking an ID as seen before validating its record would discard a good task.',
    exercise:
      'Pass missing, malformed and duplicate data to the lab. In your project use fictional titles, reload, then try a different server port and return to the original origin. Record what appears at each address.',
    hints: [
      'Use try/catch around parsing and Array.isArray before iteration.',
      'In the lab isTask validates a single record. Use some or find on records already accepted to detect duplicate IDs.',
    ],
    mistake:
      'A single invalid row need not discard every valid neighbor. Replacing the whole store while investigating can erase evidence of the problem.',
    takeaway:
      'Parsing restores structure. Validation decides which records the application can use.',
  },
  {
    minutes: '25–40',
    goals: [
      'Write a regression test that fails on the reported defect.',
      'Distinguish the cause from its visible symptom.',
    ],
    heading: 'Test the result and what should stay unchanged',
    explanation: [
      'Start with a small reproduction. Write down the records, action, expected result and actual result. For a sort bug, an apparently correct screen can hide mutation. Snapshot the source order before calling the helper. Check the returned order and the source order independently.',
      'In a local tests.html page, load a test module that imports your pure helpers. Run a failing case first, repair the implementation, then rerun that case and a neighbor. A useful assertion must fail for a broken implementation and pass for a correct one.',
    ],
    followUp: {
      title: 'Run one small test from a browser page',
      example:
        '// tests.js, beside task-logic.js\nimport {labelFor} from "./task-logic.js";\nconst actual = labelFor({title: "Trace"});\ndocument.querySelector("output").textContent =\n  actual === "Trace" ? "Passed" : "Failed: expected Trace";',
      reasoning:
        'Using the Lesson 4 example, make tests.html with an output element and a script tag loading tests.js as a module. Serve the folder and open /tests.html. Change the expected title in a copy, observe Failed, then restore it. Add a case that compares source order before and after sorting.',
    },
    predict: 'Why can this test pass even when sorting changed the source?',
    example:
      'const result = sortOldest(tasks);\nconsole.assert(result[0].id === 4);',
    result:
      'The first result can be correct even if sortOldest sorted tasks in place. Capture the input IDs before the call and compare afterward too.',
    exercise:
      'In the lab implement verify(tasks). Return true only if orderUnderTest gives ascending IDs and the original array keeps its order. Select the cause of the mutation. Locally record one failure and one passing rerun.',
    hints: [
      'An array reference is not a snapshot. JSON.stringify(tasks) captures its original content.',
      'To test order use every with the callback index, comparing each ID to the one before it.',
    ],
    mistake:
      'A test that always fails can catch a broken helper but also rejects the repair. Try both implementations.',
    takeaway:
      'A regression test distinguishes a specific defect from a working implementation.',
  },
  {
    minutes: '20–30',
    goals: [
      'Review the exact changes in a working copy.',
      'Decide whether a suggestion preserves an invariant.',
    ],
    heading: 'Read the diff before accepting a change',
    explanation: [
      'Use git status to see which files changed. git diff shows unstaged edits to tracked files. git diff --staged shows changes already staged. Inspect new files directly. Review a focused patch and name the behavior at risk. A short diff can still replace a copied sort with a destructive sort.',
      'Before using an unfamiliar command, understand what it reads, writes or sends and why the task needs it. A suggestion from another person or an optional AI tool is a hypothesis. Ask for one bounded change with an observable test. Keep private task data and credentials out of examples.',
    ],
    followUp: {
      title: 'Read exactly what will be reviewed',
      example: 'git status\ngit diff\ngit diff --staged',
      reasoning:
        'Before staging, inspect the working change. After staging, inspect the staged version. Record one concrete prediction the patch makes and reproduce the action that could disprove it. A manual review meets this lesson’s requirement.',
    },
    predict: 'Which behavior needs a regression test for this edit?',
    example:
      '- return tasks.slice().sort(compare);\n+ return tasks.sort(compare);',
    result:
      'Both return sorted rows. The added line also changes the input. Compare source IDs before and after the call.',
    exercise:
      'Inspect a manual edit in your own project. Record the relevant file, the intended change, one risk and your test result. Keep, revise or discard the change based on that evidence.',
    hints: [
      'A diff shows text changes. Runtime behavior needs a test.',
      'Try a second case that the original bug would have affected.',
    ],
    mistake:
      'A clean git status can mean everything is committed. It does not establish that the committed code works.',
    takeaway: 'Review the actual patch and test the behavior it could change.',
    extension:
      'Compare an optional reviewer’s suggestion with your original plan and explain which change you kept.',
  },
  {
    minutes: '90–180',
    goals: [
      'Demonstrate a working Study Tasks v3 project.',
      'Transfer one behavior to a fresh regression case independently.',
    ],
    heading: 'Run a complete edit, reload and review cycle',
    explanation: [
      'Begin on the same origin as Week 2 with three fictional tasks. Record their IDs and completion flags. Search, sort and click inside an Edit control. Cancel once, then save a valid change and reload. Check that the intended ID changed, hidden records survived and completion still belongs to the same task.',
      'Run the local tests page. Keep one failing observation, the repair and a passing rerun. Test the old Add, Toggle and Delete paths as well. Record keyboard behavior, empty messages, validation boundaries and how you handled malformed data. Keep the evidence short enough for someone else to replay.',
    ],
    followUp: {
      title: 'Organize the project check into short passes',
      example:
        'Pass 1: load existing records and try the old controls.\nPass 2: sort, edit, cancel, save and reload.\nPass 3: combine search and status; run tests.html.\nPass 4: make and explain the independent change.',
      reasoning:
        'Use the project checklist below for the exact acceptance cases. Record the expected and actual behavior while the project is open. You can return in another session to complete the remaining local evidence.',
    },
    predict: 'Which state should a canceled edit leave after refresh?',
    example:
      'Start with IDs 4 and 12. Switch to Newest.\nEdit the first visible row, type a new title, press Escape.\nReload and compare both IDs and titles to the original pair.',
    result:
      'ID 12 was the visible target. Both saved titles should remain unchanged. A changed title indicates that the draft crossed into the model too early.',
    exercise:
      'Independently add an Edit→Cancel regression after a sort, or repair a delegated click that fails on a nested target. Use your own reasoning and documentation without AI for this transfer task. Record how the failure and correction differ.',
    hints: [
      'Pick a fixture where the visible index and stable ID differ.',
      'Name the exact action that made the previous code fail.',
    ],
    mistake:
      'Counting green assertions cannot establish that a test would detect your defect. Introduce the original mistake in a copy and observe which assertion fails.',
    takeaway:
      'Your evidence should connect one observed action to the correct saved record across a reload.',
    extension:
      'Add a second regression for an empty result or for focus after a deletion.',
  },
]
export const weekThree = Object.fromEntries(
  chapters.map((chapter, index) => [
    'p1-w03-l' + String(index + 1).padStart(2, '0'),
    chapter,
  ]),
)
