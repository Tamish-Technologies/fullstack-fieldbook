// Titles, prerequisites and chapter references come from the approved course manifest.
export interface Reading {
  minutes: string
  goals: [string, string]
  heading: string
  explanation: string[]
  predict: string
  example: string
  result: string
  exercise: string
  exerciseExample?: string
  hints: [string, string, ...string[]]
  mistake: string
  takeaway: string
  followUp?: { title: string; example: string; reasoning: string }
  localChecks?: string[]
  extension?: string
}
export const weekOne: Record<string, Reading> = {
  'p1-w01-l01': {
    minutes: '15–20',
    goals: [
      'Match a change in a page to HTML, CSS or JavaScript.',
      'Trace what the browser rebuilds when you reload a local page.',
    ],
    heading: 'How a task gets onto the page',
    explanation: [
      'Start here even if you have never written code. This week you’ll build a list where you can add a task, check it off and remove it. In this first lesson, try adding a sample task and see what survives a reload. After the walkthrough and practice, you can start a five-question check.',
      'Imagine adding a task called “Read one page”. HTML gives the page a heading, a list and a button labeled Add. CSS sets the button’s appearance, including its color and spacing. JavaScript responds when you press it and puts the new task on screen. These jobs live in index.html, styles.css and app.js. The fourth file, README.md, is where you’ll keep your project notes.',
      'When the browser opens the HTML file, it builds a live copy of the document called the DOM. JavaScript can add an item to that live list. The saved file still contains the original list, so reopening it starts from the original contents. Fieldbook saves your lesson progress separately.',
    ],
    predict:
      'Open index.html in a text editor. Find the line containing “My study tasks” between <h1> and </h1>. These tags mark the main heading. Replace that line with the example, save the file and refresh the browser. What words do you expect to see?',
    example: '<h1 id="page-title">Reading queue</h1>',
    result:
      'The page now says “Reading queue”. The saved HTML supplied the words. Right-click the heading and choose Inspect. The Elements panel (called Inspector in some browsers) highlights the same heading in the live document.',
    exercise:
      'In the Elements panel, double-click the words “Reading queue”, change them to “Today’s reading” and press Enter. Look at the page, then refresh. Which heading came back? Explain why before you open the knowledge check.',
    hints: [
      'Right-click the heading and choose Inspect to find it in the live document. Compare its words with the line in your editor.',
      'Reload rereads index.html. If the wrong heading appears, check the file path in the address bar.',
    ],
    mistake:
      'In your local project, right-click “Reading queue” and choose Inspect. In Elements (or Inspector), find id="page-title". An ID names one element. Open the Console tab in the same tools and type document.querySelector("#page-title"). The # tells the browser to look for that exact ID. You should see the heading. Now try document.querySelector("#page-titles") with an extra s. You’ll see null, meaning nothing matched. When a visible element seems to be missing, compare its ID in Elements with the name the script looked for.',
    followUp: {
      title: 'How to ask for a useful hint',
      example:
        'My saved heading says “Reading queue”. I changed the words in the browser. Give me one hint about what to look for when I reload.',
      reasoning:
        'Try the change yourself first. If you get stuck, ask a classmate or an AI tool for one hint. Predict what will happen, test it, and explain the result in your own words. You can use the same routine on your own. An AI or GitHub account is optional.',
    },
    takeaway:
      'You can locate a change by asking whether it affects structure, presentation or behavior. You can test a prediction with the browser before changing another file.',
    extension:
      'Optional: write a one-sentence debugging question that asks for a hint. Predict the result of the suggested change and verify it yourself. A classmate or your own written checklist works too.',
  },
  'p1-w01-l02': {
    minutes: '15–20',
    goals: [
      'Build a document with a meaningful title, language and main landmark.',
      'Connect a local stylesheet and script and verify their paths.',
    ],
    heading: 'Give the document a readable outline',
    explanation: [
      'A reader sees the page layout, but a browser also exposes a structural outline. A main landmark identifies the central task. A descriptive h1 names it. A screen-reader user can jump to that heading even if the CSS never loads. The title in the head labels the browser tab, useful when several pages look alike.',
      'The doctype selects standards mode. The language helps speech software pronounce text. UTF-8 tells the browser how to decode characters, and the viewport setting lets the layout follow a narrow device. Relative paths such as ./app.js start from the HTML file’s directory. A deferred external script runs after the document has been parsed, so the nodes it selects are available.',
    ],
    predict:
      'Before opening this page, predict what appears in the tab and what appears inside the window.',
    example:
      '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My reading queue</title>\n  <link rel="stylesheet" href="./styles.css">\n  <script src="./app.js" defer></script>\n</head>\n<body><main><h1>Today’s reading</h1></main></body>\n</html>',
    result:
      'The tab shows “My reading queue”. The page shows “Today’s reading”. Changing the title alone leaves the main heading intact. Both labels help people orient themselves.',
    exercise:
      'Give the starter a title and main heading that distinguish it from a second open tab. In Elements, locate main and its h1. In Network, refresh and check both local asset filenames.',
    hints: [
      'Look in head for metadata and body for the visible document.',
      'If styles or behavior are missing, compare spelling and case in the folder with href and src.',
    ],
    mistake:
      'Making a div large and bold can mimic a headline visually. It still lacks a heading’s place in the document outline. Choose the heading element first and style it afterward.',
    takeaway:
      'Document structure is useful before any styling or interaction. A working local asset path is as important as the code in that asset.',
  },
  'p1-w01-l03': {
    minutes: '20–25',
    goals: [
      'Associate a visible label with one specific input.',
      'Predict what native form validation accepts and how Enter submits.',
    ],
    heading: 'Let the form do the first part of the work',
    explanation: [
      'A form groups controls around one action. A submit button and pressing Enter in a text field can both initiate the form’s submit event. A listener on the form can later handle either path. A visible label gives the field a name even after the user has typed over a placeholder.',
      'The label’s for value must match one unique input id. Clicking the label should move focus to that field. required asks the browser to block an empty value before submission. A string containing three spaces has characters, so JavaScript must later decide whether the title has meaningful text.',
      'Give Add the type "submit". An unrelated button inside the same form, such as Help, needs type="button" so it does not submit. Below the form, an h2 names the task section, a ul groups the tasks as an unordered list, and each li represents one task. A screen reader can use that structure to announce the list and its items.',
    ],
    predict:
      'Click the label, try submitting an empty field, then enter only spaces. Which case does required catch?',
    example:
      '<form>\n  <label for="topic">Reading topic</label>\n  <input id="topic" name="topic" required>\n  <button type="submit">Add topic</button>\n</form>\n<section><h2>Reading list</h2><ul></ul></section>',
    result:
      'The empty field triggers native validation. Spaces satisfy the presence check. With no submit handler the browser can navigate, which is expected at this step.',
    exercise:
      'Build a labeled task form and an empty list inside your starter. Use Tab to reach the input. Submit with Enter and by button. If you add an unrelated action inside the form, give it type="button".',
    hints: [
      'Click the label and watch the focus outline.',
      'Read the characters inside for and id side by side, including any hyphen.',
    ],
    mistake:
      'A placeholder disappears as you type. Keeping a visible label also gives a mouse or touch user a larger target for focusing the field.',
    takeaway:
      'Semantic form controls supply keyboard behavior, names and a first validation step. Trimming titles is a separate rule you will implement in JavaScript.',
  },
  'p1-w01-l04': {
    minutes: '20–25',
    goals: [
      'Distinguish content, padding, border and margin on a real element.',
      'Identify the rule that wins when two selectors set the same property.',
    ],
    heading: 'Measure the card before adding more CSS',
    explanation: [
      'A CSS declaration affects elements matched by its selector. A class selector such as .app matches class="app". If competing declarations have the same origin, layer, importance and specificity, the later declaration wins. DevTools shows an overridden declaration crossed out. Inspect that evidence before making a selector more specific.',
      'The box model works outward from content to padding, border and margin. Padding gives text breathing room inside the edge. Margin separates this box from its neighbors. With border-box, a declared width includes padding and border. A max-width lets a card stop growing while fitting a smaller parent.',
    ],
    predict:
      'With enough space, how wide is this card from border to border? How wide is its content area?',
    example:
      '.app {\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 360px;\n  padding: 16px;\n  border: 2px solid #526071;\n  margin: 24px auto;\n}',
    result:
      'At the 360px cap, subtract 32px of horizontal padding and 4px of border to get 324px of content. On a 375px viewport the browser’s default 8px body margin on each side leaves 359px for the card, so its content is 323px wide. Auto horizontal margins share any remaining room.',
    exercise:
      'Give main the app class. In Elements, find the box-model diagram, then increase padding to 24px. Predict the content width before checking. Use Tab to verify controls retain a visible focus outline.',
    hints: [
      'If no property takes effect, inspect the element’s class and the stylesheet link.',
      'At the 360px cap, subtract the padding twice and the border twice.',
    ],
    mistake:
      'Adding margin to a child can move the entire row without increasing space between the card border and its text. Inspect the highlighted padding area on the card itself.',
    takeaway:
      'Measure the visible edge and the content separately. The browser can show which rule won and exactly where each pixel of spacing went.',
  },
  'p1-w01-l05': {
    minutes: '20–30',
    goals: [
      'Choose a flex direction for wide and narrow form layouts.',
      'Test both keyboard reachability and overflow at two viewport widths.',
    ],
    heading: 'Make the Add button survive a narrow screen',
    explanation: [
      'Flexbox arranges a container’s direct children along a main axis. In a row the children share horizontal space. A flexible input can take the remaining room beside a button. Inputs often have an intrinsic minimum width, so min-width: 0 allows a flexible input to shrink.',
      'Wrap the input and button in a div with class controls and keep the visible label above it. At a narrow width, both actions need enough room for text and focus rings. A media query can switch the axis to a column without moving elements in the document or changing the keyboard order.',
    ],
    predict:
      'Which direction does the main axis take at 375px? What happens at 768px?',
    example:
      '.controls { display: flex; gap: 0.75rem; }\n.controls input { flex: 1; min-width: 0; }\n@media (max-width: 36rem) {\n  .controls { flex-direction: column; }\n}',
    result:
      'With a 16px default font the breakpoint is 576px. At 375px the button sits below the input. At 768px they share a row. The input still precedes the button when you press Tab.',
    exercise:
      'In responsive mode inspect your form at 375px and 768px. Use a long button label, zoom in, and tab through both controls. Check for horizontal scrolling and clipped focus rings.',
    hints: [
      'Flex properties on grandchildren do not make them direct flex items.',
      'Inspect computed flex-direction at each width before changing widths or hiding overflow.',
    ],
    mistake:
      'Hiding horizontal overflow can conceal half a button. Make the control fit or change the layout so a keyboard user can reach and see it.',
    takeaway:
      'A layout passes your manual check when text, controls and focus stay usable at both widths. Use the practice lab below to measure both widths, then check the focus order yourself.',
  },
  'p1-w01-l06': {
    minutes: '15–20',
    goals: [
      'Predict string, boolean and strict comparison results.',
      'Distinguish changing array contents from rebinding a variable.',
    ],
    heading: 'Give a task title the right kind of value',
    explanation: [
      'An input’s value is text, even when you type digits. A string has characters and a length. A boolean represents true or false. Strict equality compares types as well as values, so the string "3" differs from the number 3. Use these distinctions when you decide whether a title is valid.',
      'trim() returns a new string with whitespace removed from the two ends. It keeps spaces between words. An empty string is falsy in a condition, while a string containing a space is truthy. A task object groups one title with its done flag. An array can hold several such objects in order.',
      'Array positions start at zero. If queue holds two tasks, queue[0] selects the first task and queue[1] selects the second. Use queue[0].title to read the title stored on the first task. Try that expression in the Console after running the example below.',
    ],
    predict:
      'Predict the two lengths, the comparison and the number of entries after push.',
    example:
      'const raw = "  Map CSS  ";\nconst title = raw.trim();\nconst queue = [];\nqueue.push({ title, done: false });\nconsole.log(raw.length, title.length, title.length === "7", queue.length);',
    result:
      'The console prints 11, 7, false, 1. raw still includes four edge spaces. queue still points to the same array after push; const prevents assigning a different array to that binding.',
    exercise:
      'Run the whole block below in the Console of your practice page. Change only the string on the first line. Try "", then "   ", then "Read docs". Before each run, predict the length and whether the cleaned title counts as true. The braces let you repeat the block in the same Console.',
    exerciseExample:
      '{\n  const raw = "Read docs";\n  const title = raw.trim();\n  console.log(title.length, Boolean(title));\n}',
    hints: [
      'Compare your results: the empty string and the spaces-only string both give 0 and false. “Read docs” gives 9 and true, including the space between the words.',
      'Track the binding and the object it points to separately. Use let when a binding must change.',
    ],
    mistake:
      'Testing raw.length before trimming accepts an all-space title. Clean the value first and use the cleaned value for both validation and display.',
    takeaway:
      'Type and value both matter. Clean a title once, then base the next decision on the cleaned string.',
  },
  'p1-w01-l07': {
    minutes: '20–25',
    goals: [
      'Write a text-cleaning function with an explicit return value.',
      'Use an early return to reject invalid input before changing the page.',
    ],
    heading: 'Separate a decision from a side effect',
    explanation: [
      'A function takes inputs through parameters and can give its caller a value with return. A helper that only transforms its input is easy to check without a browser page. A function that appends a task changes the document, so it belongs after validation.',
      'An early return ends the current call immediately. Put the smallest rejection case near the top. Good helper names let the event handler read like a sequence: clean the input, check it, then add the task.',
    ],
    predict:
      'Which calls reach the final return? What exact value does each call give back?',
    example:
      'function displayName(raw) {\n  const name = raw.trim();\n  if (name.length === 0) return "(unnamed)";\n  return name;\n}\nconsole.log(displayName("  Ada  "), displayName("   "));',
    result:
      'The first call returns "Ada". The second returns "(unnamed)" immediately. Logging inside a function can display a value even when the caller receives undefined; test the returned value itself.',
    exercise:
      'Write cleanTitle(rawTitle) to return trimmed text. Write isValidTitle(title) to return a boolean for a title with at least one non-space character. Try "  read  ", "", "   " and "read now". Leave the caller’s original string intact.',
    hints: [
      'Start with a single input and its exact expected output.',
      'Compare the cleaned length with zero. Return the boolean itself, rather than the strings "true" or "false".',
    ],
    mistake:
      'A missing return silently gives the caller undefined. Assign the function call to a variable and inspect that variable before wiring the helper to a form.',
    takeaway:
      'Small helpers let you establish the behavior for empty and ordinary inputs before a click or a DOM change complicates debugging.',
  },
  'p1-w01-l08': {
    minutes: '20–25',
    goals: [
      'Select an existing element and recognize a missing match.',
      'Append distinct list items that display user text literally.',
    ],
    heading: 'Turn a title into a text node',
    explanation: [
      'querySelector returns the first element matching a CSS selector, or null when none matches. A node created with createElement already exists in memory but has no parent on the page. Append it to attach it to the live tree.',
      'Treat a task title as plain text. The textContent property creates text inside a node. A title containing angle brackets should show those characters. Parsing a user’s string as HTML changes its meaning and is unsafe. Read text typed into an input through its value property.',
    ],
    predict:
      'Given <ul id="queue"></ul>, what exact characters should appear in the first row?',
    example:
      'const queue = document.querySelector("#queue");\nconst row = document.createElement("li");\nrow.textContent = "<em>Plan</em>";\nqueue.append(row);',
    result:
      'One row displays the literal title <em>Plan</em>, including the brackets. Elements shows an li containing text. No em element was created.',
    exercise:
      'Create two fresh li nodes with the same title. Append both. Change only the second title using textContent. Confirm the first row is still present and unchanged.',
    hints: [
      'Check that the list exists before calling append.',
      'Create the second li inside the operation that adds one item. Appending the same node again moves that one node.',
    ],
    mistake:
      'Assigning textContent on the entire list replaces its children. Set the text on the new row or title span, then append the row to the list.',
    takeaway:
      'Selection, creation and insertion are three distinct steps. Keep user text as text throughout them.',
  },
  'p1-w01-l09': {
    minutes: '20–30',
    goals: [
      'Handle both Enter and the Add button through form submission.',
      'Update only the selected task and derive the empty state from the list.',
    ],
    heading: 'One submission, one new row',
    explanation: [
      'The browser dispatches a submit event on a valid form. Its default action can navigate away and discard your in-memory list. Call preventDefault at the start of the submit handler, then read the field. Trim it and return early with a visible explanation when only whitespace remains.',
      'Give each row its own checkbox, title span and Delete button. In the checkbox change handler, use row.classList.toggle("completed", checkbox.checked) so the visual state follows the actual control. Apply the completed style to the title. In that row’s Delete handler, remove that row, then update the empty-state message. Duplicate titles are valid and should remain independent.',
    ],
    predict:
      'After you call this helper on an empty list, will the empty message be visible?',
    example:
      'function updateEmptyMessage(list, message) {\n  message.hidden = list.children.length > 0;\n}\n// Call after initial setup and after every add or removal.',
    result:
      'With zero children the comparison is false, so hidden becomes false and the message appears. Adding a row makes hidden true. Deleting the last row must run the helper again.',
    followUp: {
      title: 'Trace the submit boundary',
      example:
        '// Given the form, input and a paragraph named message:\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const title = input.value.trim();\n  if (!title) {\n    message.textContent = "Enter a task title.";\n    return;\n  }\n  message.textContent = "Ready to add: " + title;\n});',
      reasoning:
        'This small handler stops navigation, rejects spaces and reports the clean title. On the success path, use your row-building code from the previous lesson, clear the input and return focus. In each row’s change listener, read its checkbox; in its Delete listener, remove the row captured when that listener was created.',
    },
    exercise:
      'Register one submit listener on the form. Add a trimmed row, clear the input and return focus after success. Test one click, one Enter, whitespace, duplicate titles, a toggle in each direction, and deleting the middle of three items. Give each control a meaningful accessible name.',
    hints: [
      'Put a breakpoint at the first line of the submit handler. One user action should hit it once.',
      'Read checkbox.checked at the time of change. The checkbox value property does not tell you whether it is checked.',
    ],
    mistake:
      'A click listener plus a submit listener can add twice. Use the form as the single entry point. Keep each row reference in the scope where its controls are created.',
    takeaway:
      'An action has an event, a value, a decision and a specific DOM change. Check each step when the result differs from your prediction.',
  },
  'p1-w01-l10': {
    minutes: '20–30',
    goals: [
      'Reproduce a failure with a short sequence of steps.',
      'Use a browser observation to choose and verify one fix.',
    ],
    heading: 'Find the first place reality differs from your prediction',
    explanation: [
      'Start with one symptom you can repeat. If Add does nothing, open the Console and find the first error after reload. Elements shows the actual nodes and IDs the browser parsed. Network shows whether an asset loaded. Sources lets you pause at a breakpoint and inspect values at the moment of failure.',
      'Make one change per hypothesis. A selector returning null could mean the spelling differs, the node is missing, or the script ran too soon. Check the live DOM and script loading order before editing the event handler. Retest with exactly the input and action that exposed the bug.',
    ],
    predict:
      'The page contains <ul id="reading-list">. What will the Console show, and where would you look next?',
    example:
      'const list = document.querySelector("#reading-items");\nconsole.log(list);',
    result:
      'The result is null. Find the ul in Elements and compare its id with the selector. Changing the selector to match the existing element makes the same observation return a node.',
    exercise:
      'On a copy of your local project, introduce one mismatched selector. Reproduce the failure, inspect the error and pause before the affected operation. Write five lines in README: symptom, reproduction, evidence, fix and verification.',
    hints: [
      'Read the earliest error after a clean reload.',
      'A log captures a value; a breakpoint lets you inspect local variables and step to the next operation.',
    ],
    mistake:
      'A disappearing task may mean navigation occurred. Watch the address bar or Network and verify preventDefault runs before the list changes.',
    takeaway:
      'A fix is stronger when you can reproduce the original failure and show the same steps succeeding after one targeted change.',
    localChecks: [
      'Reproduce the failure locally and write its symptom.',
      'Capture the relevant Console or Elements observation in your own words.',
      'Identify the cause, make the fix, repeat the original steps and explain the outcome.',
    ],
  },
  'p1-w01-l11': {
    minutes: '25–40',
    goals: [
      'Make a local commit containing only an intended change.',
      'Review a proposed edit using a diff and an observed behavior.',
    ],
    heading: 'Know exactly what a checkpoint contains',
    explanation: [
      'Your working tree contains the files you edit. The staging area collects the snapshot you intend to commit. A commit records staged contents in local history. Editing a staged file again can leave one version staged and newer changes unstaged. git status describes both areas; git diff shows unstaged changes and git diff --staged shows the staged patch.',
      'Open a terminal inside your own project folder. If the folder has no Git repository, initialize it with git init. Stage only the intended file. Review the staged diff before creating a meaningful local commit. A push is a separate transfer to a configured remote; this exercise can be completed entirely on your computer.',
    ],
    predict:
      'After staging only README.md, which edit is recorded if styles.css also has unstaged changes?',
    example:
      'git status\ngit diff\ngit add README.md\ngit diff --staged\ngit commit -m "Document manual form checks"\ngit log --oneline -3',
    result:
      'Only the staged README change enters that commit, assuming the index was otherwise empty. The stylesheet remains modified in the working tree. The short log shows a local history entry.',
    exercise:
      'Review a proposed change that improves spacing but also removes a visible focus outline. Keep the spacing change, retain the accessible focus state, test with Tab, and explain the decision in your own words.',
    hints: [
      'Compare the requested change with each changed file.',
      'Check git status again after the commit. Keep credentials and unrelated personal files out of the index.',
    ],
    mistake:
      'An AI-generated diff can look plausible while breaking keyboard access. Verify the behavior yourself before accepting an edit. No external AI service is required.',
    takeaway:
      'A local commit preserves a reviewed snapshot. A useful review pairs a specific change with evidence that the requested behavior still works.',
    localChecks: [
      'Check the project directory and inspect status and both diffs.',
      'Stage only intended files, check for sensitive data, and make a meaningful local commit.',
      'Inspect the local history and explain which additional action would publish a commit.',
      'Make a second small, useful change, such as documenting a keyboard check you actually ran. Review and commit it separately, then find both commits in the log for your final project walkthrough.',
    ],
    extension:
      'Optional: ask a reviewer to critique one small diff. Record one suggestion you kept or declined and the test that informed your decision.',
  },
  'p1-w01-l12': {
    minutes: '90–150',
    goals: [
      'Verify an integrated four-file task list with repeatable manual checks.',
      'Explain a fresh change from the input event through the visible result.',
    ],
    heading: 'Demonstrate the behavior with a fresh task',
    explanation: [
      'Bring index.html, styles.css, app.js and README.md together in your project. Open index.html in a desktop browser. Start with an empty list and choose three different tasks. Predict the visible change before each action. A check is repeatable when someone else can start from the same state, perform the same action and compare the result with a concrete expectation.',
      'Check boundaries in addition to the happy path. A blank title, a spaces-only title and a title containing harmless markup-like text exercise different decisions. Add duplicate titles so you can tell whether Delete targets a row or just the first matching string. Reload at the end. The disappearance of the tasks is the expected Week 1 behavior.',
    ],
    predict:
      'Read this manual test. Which failure could it reveal that testing one row alone would miss?',
    example:
      'Start: three rows named A, B and C.\nAction: delete B, then check C.\nExpect: A and C remain; only C is completed.\nAction: delete both remaining rows.\nExpect: the empty-list message returns.',
    result:
      'The test distinguishes the clicked row from its neighbors. It also checks that the empty-state update runs after the final removal. Passing this example alone leaves keyboard submission, validation and literal text rendering to test.',
    exercise:
      'In a copy of the project, work independently for 20–30 minutes. Rebuild the submit-and-trim path, add a checkbox toggle to a fresh row, or diagnose a new selector mismatch. Use documentation if necessary. Explain the event, input value, DOM change and one test without AI assistance.',
    hints: [
      'When the list changes unexpectedly, log its child count before and after a single action.',
      'For your explanation, pick one concrete title and follow it from the input to the text node.',
    ],
    mistake:
      'A screenshot of three tasks cannot show that Enter works, invalid input is rejected, or the correct row is removed. Record what you did and how the page responded.',
    takeaway:
      'Your local project demonstration and readiness quiz measure different skills. Week 2 requires all mandatory Week 1 evidence, including the seven browser labs.',
    localChecks: [
      'Open the four files locally; check one main heading, visible label, form, list and named controls.',
      'Add by click and Enter. Reject empty input and spaces. Show <b>Test</b> literally.',
      'Toggle a specific task twice, remove the middle of three, then remove all and verify the empty state.',
      'Use keyboard only and check desktop and 375px layouts. Refresh and explain the lost task list.',
      'Document setup, three manual tests, the reload limitation, one takeaway and the five-line debugging record.',
      'Inspect at least two meaningful local commits. Explain submit, trim, safe insertion and your independent transfer result.',
    ],
  },
}
