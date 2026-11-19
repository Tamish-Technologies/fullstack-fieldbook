// Each variant lists the stem, the expected answer and two misconception-based alternatives.
// The renderer rotates their display order independently of the scoring key.
export type Variant = readonly [string, string, string, string]
export interface Question {
  id: string
  essential: boolean
  topic?: string
  variants: [Variant, Variant]
  feedback: [string, string, string]
}
export interface Quiz {
  checkpoint: string
  questions: Question[]
}

type Slot = [Variant, Variant, string, string, string]
function bank(
  lesson: string,
  check: string,
  essentialTopics: Record<number, string>,
  slots: Slot[],
): Quiz {
  const prefix = 'p1-w01-l' + lesson
  return {
    checkpoint: prefix + '-c' + check,
    questions: slots.map(
      ([first, retry, explanation, wrongA, wrongB], index) => ({
        id: prefix + '-q' + String(index + 1).padStart(2, '0'),
        essential: Object.hasOwn(essentialTopics, index + 1),
        topic: essentialTopics[index + 1],
        variants: [first, retry],
        feedback: [explanation, wrongA, wrongB],
      }),
    ),
  }
}
export const quizzes: Quiz[] = [
  bank('01', '01', {}, [
    [
      [
        'You want to rename a heading, change a button’s color, then make the button add a task. Which file types do those jobs in order?',
        'HTML, CSS, JavaScript',
        'CSS, HTML, JavaScript',
        'HTML, JavaScript, CSS',
      ],
      [
        'Which layers supply a button’s words, its spacing, then what happens when someone presses it?',
        'HTML, CSS, JavaScript',
        'CSS, HTML, JavaScript',
        'HTML, JavaScript, CSS',
      ],
      'HTML supplies meaning, CSS styles the element, and JavaScript responds to the event.',
      'CSS can style a label or heading; its meaningful text belongs in HTML.',
      'Spacing and focus outlines are presentation. The custom submit action belongs in the event handler.',
    ],
    [
      [
        'Elements shows a new list item after you press Add in the example. What changed?',
        'The live document tree',
        'The saved HTML file',
        'A database row',
      ],
      [
        'You change a heading in Elements. Where does that change live?',
        'In the current DOM',
        'In index.html on disk',
        'In a persistent task table',
      ],
      'The DOM is the browser’s current tree of objects. Elements inspects that tree.',
      'Elements can change the live page without writing your local file.',
      'The browser can hold an element in memory without any database.',
    ],
    [
      [
        'You add a task to the live list without changing the saved file. What happens when you refresh?',
        'The original list is rebuilt from the file',
        'The added task is written back to HTML',
        'The note in Fieldbook is also erased',
      ],
      [
        'You reopen the same Week 1 project tomorrow. Which items appear?',
        'Items present in the saved HTML',
        'Every row previously added by clicking',
        'Only items stored as Fieldbook notes',
      ],
      'Reload starts the Week 1 task page from its saved files.',
      'Appending to the DOM does not edit the source file.',
      'Fieldbook’s local learning record is separate from the practice page.',
    ],
    [
      [
        'Your script looks for a heading named #task but finds nothing. Where should you start?',
        'Inspect the element ID and query the selector',
        'Change the button color',
        'Reinstall the editor',
      ],
      [
        'An input is visible but your script reads null. Which check narrows the cause?',
        'Compare the live ID and the selector in Console',
        'Increase the input padding',
        'Replace the text editor',
      ],
      'Elements and Console let you compare the actual tree with what the script requests.',
      'Changing CSS cannot repair a selector mismatch.',
      'The page is already loaded. Inspect its live state before changing tools.',
    ],
    [
      [
        'You cannot explain a suggested fix. What is a useful next step?',
        'Ask for one hint, predict a result and test it',
        'Paste the full replacement and move on',
        'Count the tool’s approval as a test',
      ],
      [
        'A classmate proposes rewriting the whole form. How can you learn from it?',
        'Isolate one change and verify your prediction',
        'Apply every edit without inspecting it',
        'Save their confidence as proof',
      ],
      'A small prediction ties the proposed change to an observable effect.',
      'A large unexplained edit makes the cause of success or failure harder to identify.',
      'Confidence does not show how the page behaves.',
    ],
  ]),
  bank('03', '02', { 1: 'Matching a label to its input' }, [
    [
      [
        'An input has id="topic". Which label focuses it when clicked?',
        '<label for="topic">Topic</label>',
        '<label for="reading">Topic</label>',
        'A placeholder reading Topic',
      ],
      [
        'An input has id="new-task". Which association survives typing?',
        '<label for="new-task">Task title</label>',
        '<label for="title">Task title</label>',
        'placeholder="Task title"',
      ],
      'The visible label’s for value matches the unique input ID.',
      'An unmatched for value names a different target. Compare the exact characters.',
      'A placeholder disappears while typing and does not create that label association.',
    ],
    [
      [
        'Where should one handler process Add by mouse and Enter in the input?',
        'The form’s submit event',
        'Only the button’s mouseup event',
        'The input’s change event',
      ],
      [
        'Which event covers keyboard submission and activating the submit control?',
        'submit on the form',
        'pointerdown on the button',
        'change on the input',
      ],
      'Both activation paths use form submission.',
      'A pointer-specific event misses keyboard-only use.',
      'Editing a field is separate from submitting the form.',
    ],
    [
      [
        'Inside a form, what types suit Add and an unrelated Delete?',
        'submit and button',
        'button and submit',
        'submit and submit',
      ],
      [
        'Choose types for Save and a separate Help action inside the form.',
        'Save: submit; Help: button',
        'Save: button; Help: submit',
        'Both: submit',
      ],
      'Use submit for the form action and button for independent controls.',
      'This reverses which control submits.',
      'A secondary action that submits can unexpectedly trigger validation or navigation.',
    ],
    [
      [
        'What does required do for a text field containing three spaces?',
        'Accepts it as nonempty',
        'Trims and rejects it',
        'Converts it to an empty string',
      ],
      [
        'Compare an empty required title with a title containing one space.',
        'Only the empty value fails native presence validation',
        'Both are trimmed and rejected',
        'The space is automatically removed from value',
      ],
      'Native presence checks count the space. Apply a trimmed-content rule in JavaScript.',
      'required checks whether the value is empty. It does not trim.',
      'Reading value returns the typed string, including spaces.',
    ],
    [
      [
        'Which elements express a task section containing an unordered collection?',
        'h2, ul and li',
        'Three styled paragraphs',
        'A list of buttons without a heading',
      ],
      [
        'A screen-reader user wants to find the reading list and hear its items. Which structure helps?',
        'A heading followed by ul with li children',
        'Bold text followed by separate divs',
        'A row of buttons with no list',
      ],
      'A heading names the section and the list announces the grouping.',
      'Visual styling alone does not supply list semantics.',
      'Buttons describe available actions, not a collection of items.',
    ],
  ]),
  bank('06', '01', {}, [
    [
      ['What is "  Read CSS  ".trim().length?', '8', '12', '7'],
      ['What is " Map JS ".trim().length?', '6', '8', '5'],
      'Trim removes edge whitespace and preserves the space between words.',
      'That counts the original edge spaces as well.',
      'The internal space is still one character.',
    ],
    [
      ['Predict 3 === "3".', 'false', 'true', 'A type error'],
      ['Predict 0 === "0".', 'false', 'true', 'A type error'],
      'Strict equality compares types. A number and a string have different types.',
      'Identical printed characters can represent different types.',
      'Comparing different types using strict equality returns a boolean.',
    ],
    [
      [
        'With const tasks = [], which operation is allowed?',
        'tasks.push("Read")',
        'tasks = ["Read"]',
        'Neither operation',
      ],
      [
        'With const names = ["A"], which operation is allowed?',
        'names.push("B")',
        'names = ["A", "B"]',
        'Neither operation',
      ],
      'push changes the existing array through the same binding.',
      'Assigning a new array rebinds the name declared with const.',
      'const restricts rebinding; an array’s contents can still change.',
    ],
    [
      [
        'Which expression reads the first title in [{title:"Map", done:false}] assigned to tasks?',
        'tasks[0].title',
        'tasks.title',
        'tasks[1].title',
      ],
      [
        'With cards = [{title:"Plan"},{title:"Test"}], how do you read Plan?',
        'cards[0].title',
        'cards.title',
        'cards[1].title',
      ],
      'Index zero selects the first object; its title property supplies the text.',
      'The title belongs to an individual object inside the array.',
      'Index one selects the second entry when present.',
    ],
    [
      ['Which value is falsy in a condition?', '""', '"false"', '"0"'],
      [
        'Which expression has a falsy result?',
        '"   ".trim()',
        '"  a ".trim()',
        '"0".trim()',
      ],
      'An empty string is falsy. Every nonempty string is truthy.',
      'This alternative is still a nonempty string.',
      'A string containing a zero is different from numeric zero.',
    ],
  ]),
  bank('08', '02', { 3: 'Displaying typed text literally' }, [
    [
      [
        'What does document.querySelector("#missing") return when no element matches?',
        'null',
        'An empty li',
        'An empty array',
      ],
      [
        'No element has class chosen. What is the value of document.querySelector(".chosen")?',
        'null',
        'A new blank element',
        'An empty list of nodes',
      ],
      'querySelector returns one matching element or null.',
      'A query searches existing nodes. It does not create one.',
      'This API returns a single match, unlike a collection query.',
    ],
    [
      [
        'How should you read typed text and display it in a new span?',
        'Read input.value; set span.textContent',
        'Read input.textContent; set span.value',
        'Read input.id; set span.className',
      ],
      [
        'A learner edits the field after loading. Which pair copies the live text into an li?',
        'field.value → row.textContent',
        'field.textContent → row.value',
        'field.id → row.className',
      ],
      'value is the current field contents; textContent sets the visible text node.',
      'An input’s child text does not track the user’s edit.',
      'An identifier and class names describe the element, not the title to display.',
    ],
    [
      [
        'How should the title <b>Read</b> appear literally in a row?',
        'Set the title span’s textContent',
        'Set the span’s innerHTML to the title',
        'Remove all angle brackets',
      ],
      [
        'A learner types <em>Plan</em>. Which operation preserves every character visibly?',
        'Assign it to row.textContent',
        'Assign it to row.innerHTML',
        'Strip out the bracketed text',
      ],
      'textContent preserves the title as text, including the brackets.',
      'An HTML parser interprets markup instead of preserving literal user text.',
      'Deleting characters changes the title the learner supplied.',
    ],
    [
      [
        'After const row = document.createElement("li"), where is the row?',
        'In memory, unattached',
        'At the end of every ul',
        'Automatically visible in main',
      ],
      [
        'You create a span but never attach it. Why is the page unchanged?',
        'The node has no parent in the document',
        'Every list received an empty span',
        'The browser has already displayed it in main',
      ],
      'Creation allocates a node. Appending to a connected parent makes it visible.',
      'The browser cannot infer which list should own a new node.',
      'main does not automatically collect new elements.',
    ],
    [
      [
        'You want two independent task rows. Which operation achieves that?',
        'Create and append a new li for each title',
        'Append the same li twice',
        'Set list.textContent to each new title',
      ],
      [
        'Two tasks have the same name. How can both remain visible and editable?',
        'Use separate nodes with the same text',
        'Reuse one node for both tasks',
        'Replace the whole list text on each add',
      ],
      'Distinct nodes retain their own identity even when they have identical text.',
      'Appending an existing node moves it; it does not clone it.',
      'Replacing the parent’s text removes its existing children.',
    ],
  ]),
  bank('10', '01', {}, [
    [
      [
        'Console reports that addEventListener was read on null. What should you inspect first?',
        'Selector spelling, actual element and script timing',
        'The element’s border radius',
        'The Git remote URL',
      ],
      [
        'Your handler tries to call append on null. What evidence narrows the issue?',
        'Compare the selector with the parsed list and loading order',
        'Compare button colors across tabs',
        'Compare commit authors',
      ],
      'Investigate how the variable got its value before changing the failing call.',
      'Presentation cannot supply a missing DOM reference.',
      'Repository metadata does not determine the current DOM.',
    ],
    [
      [
        'No styles appear. Which two observations distinguish a missing file from an overridden rule?',
        'Network load result and Styles or Computed pane',
        'Console text color and browser zoom',
        'Git log and commit count',
      ],
      [
        'The stylesheet loaded but padding is wrong. Where can you see which declaration won?',
        'Elements Styles and Computed after checking the request',
        'The zoom percentage alone',
        'The repository history alone',
      ],
      'Confirm the file loaded, then inspect the declarations actually applied.',
      'Zoom affects scale but does not identify which rule supplied a property.',
      'A commit records source history, not the cascade in this page.',
    ],
    [
      [
        'A new task flashes and vanishes after Enter. Which hypothesis should you test first?',
        'Default form navigation still occurs',
        'The font took too long to load',
        'Git removed the row',
      ],
      [
        'Clicking Add reloads the same URL. What do you check in the handler?',
        'Whether submit reaches preventDefault',
        'Whether the input has enough padding',
        'Whether the commit was pushed',
      ],
      'Navigation rebuilds the document and removes temporary rows.',
      'Style changes do not stop the form’s default navigation.',
      'Git operations are separate from a browser submit event.',
    ],
    [
      [
        'Why pause just before a row is appended?',
        'Inspect local values and step through that call',
        'Make the fix permanent automatically',
        'Pause only the CSS cascade',
      ],
      [
        'You need the actual title on the second submission. What can a breakpoint provide?',
        'The live call state before insertion',
        'A saved correction to the source',
        'Changes only to stylesheet values',
      ],
      'A breakpoint pauses script execution at the chosen line with current variables available.',
      'Stopping execution does not edit or save a fix.',
      'A script breakpoint inspects JavaScript execution.',
    ],
    [
      [
        'Which bug note lets someone repeat and verify the issue?',
        'Enter spaces, click Add: blank row appears; expected no row',
        'The app looks odd sometimes',
        'Fixed by trying things',
      ],
      [
        'Which note gives a tester a usable starting point?',
        'Add A and B, delete B: A disappears; expected B alone removed',
        'Delete is weird',
        'It works on my machine',
      ],
      'State the starting point, action, observed result and expected result.',
      'A vague symptom leaves the tester guessing which steps matter.',
      'A conclusion by itself does not provide reproducible evidence.',
    ],
  ]),
  bank('11', '02', {}, [
    [
      [
        'git status reports modified: styles.css under changes not staged. What is true?',
        'The working file differs from the staged version',
        'The change is already committed',
        'The change is already on a remote',
      ],
      [
        'After editing README, status lists it as unstaged. Where is the new edit?',
        'In the working tree',
        'In the latest commit',
        'On the remote host',
      ],
      'status distinguishes working-tree edits from staged changes.',
      'Editing a file does not create a commit.',
      'status reporting an edit says nothing about a remote copy.',
    ],
    [
      [
        'What does git add README.md do?',
        'Stages the current contents for a future commit',
        'Creates a named commit',
        'Uploads the file',
      ],
      [
        'You stage styles.css and then edit it again. What will a plain git commit record for this file?',
        'The version that was staged',
        'Every later unstaged edit',
        'The remote version',
      ],
      'The index holds the snapshot selected for the next commit.',
      'Staging and committing are separate actions; later edits need staging again.',
      'The index works locally without a remote.',
    ],
    [
      [
        'You have a new local commit. What extra step sends it to a configured remote?',
        'git push',
        'git status',
        'git log --oneline',
      ],
      [
        'A teammate cannot see your new commit remotely. Which operation transfers it?',
        'Push the committed history',
        'Inspect the working tree',
        'Read the local log',
      ],
      'Push transfers commits to a configured remote with access.',
      'Inspecting status does not transfer history.',
      'The log displays local history without publishing it.',
    ],
    [
      [
        'A suggested CSS spacing fix also removes keyboard focus. How should you review it?',
        'Inspect the diff and keep the change within scope',
        'Accept all edits because the screenshot looks tidy',
        'Delete unrelated files to simplify the diff',
      ],
      [
        'A helper changes validation while adjusting a heading. What is the appropriate response?',
        'Review the unrelated edit separately and preserve required behavior',
        'Trust the new screenshot alone',
        'Remove the old checks to match the suggestion',
      ],
      'Match each change to the requested behavior and check its effects.',
      'A screenshot cannot establish keyboard or validation behavior.',
      'Removing safeguards hides regressions rather than explaining them.',
    ],
    [
      [
        'What evidence supports accepting an AI suggestion about Enter submission?',
        'Inspect the patch and repeat Enter and button tests',
        'The tool describes its own code as correct',
        'The diff contains many lines',
      ],
      [
        'A generated edit claims to fix Delete. What is a useful acceptance check?',
        'Review the patch and delete the middle of three local rows',
        'Accept the assistant’s confidence',
        'Approve the largest patch',
      ],
      'Use a focused test that could reveal the original bug and a regression.',
      'A description of a fix is not an observed result.',
      'Patch length cannot establish correctness.',
    ],
  ]),
  bank(
    '12',
    '02',
    {
      3: 'Rejecting whitespace-only titles',
      7: 'Inserting a task title as plain text',
    },
    [
      [
        [
          'A reading-list page needs an accessible Add field and a collection of entries. Which design fits?',
          'A form with matching label/id and a ul of li rows',
          'A placeholder and several styled divs',
          'One button holding every title',
        ],
        [
          'Which design gives a grocery list native submission and recognizable list structure?',
          'A labeled input in a form plus ul/li items',
          'An unlabeled text box and headings for every item',
          'A single button containing the list text',
        ],
        'Associate the field, group its submit action, and mark up list items as a collection.',
        'Visual text by itself does not associate a control with its label.',
        'A button represents an action and cannot stand in for the entire collection.',
      ],
      [
        [
          'A valid entry appears then the document reloads. Which missing step explains the lost row?',
          'Preventing the form’s default submission',
          'Setting the input placeholder',
          'Setting a box width',
        ],
        [
          'A handler appends an li but the browser immediately navigates. Which change addresses that cause?',
          'Call event.preventDefault() in the submit listener',
          'Rename the placeholder',
          'Set a larger max-width',
        ],
        'Default navigation reconstructs the document after the handler runs.',
        'Placeholder text has no effect on navigation.',
        'Width changes presentation, not submit behavior.',
      ],
      [
        [
          'How should you reject a title consisting of spaces and a tab?',
          'Trim the value and check the resulting length',
          'Test only that raw.length is positive',
          'Rely only on required',
        ],
        [
          'The input contains four spaces. Which rule prevents an empty-looking task?',
          'Append only when the trimmed string is nonempty',
          'Append when the raw string is truthy',
          'Assume required removed the spaces',
        ],
        'Trim edge whitespace first. Empty cleaned text must stop before insertion.',
        'Whitespace has nonzero length and makes a raw string truthy.',
        'Native required accepts a nonempty sequence of spaces.',
      ],
      [
        [
          'function label(s) { if (!s.trim()) return "skip"; return s.trim(); } What is label("   ")?',
          '"skip"',
          '""',
          'undefined',
        ],
        [
          'function title(s) { if (!s.trim()) return "empty"; return s.trim(); } What is title("  ")?',
          '"empty"',
          '""',
          'undefined',
        ],
        'The early branch returns its literal value and ends the current call.',
        'The final trim expression is never reached for whitespace-only input.',
        'There is an explicit return on this branch.',
      ],
      [
        [
          'Which line keeps a row’s completed class in step with a checkbox?',
          'row.classList.toggle("completed", box.checked)',
          'row.classList.add("completed") on every change',
          'Set completed from box.value',
        ],
        [
          'What should happen when a learner unchecks a completed row?',
          'Remove its completed class using the current checked state',
          'Keep adding the class on every event',
          'Use the value attribute to decide the checked state',
        ],
        'checked is a live boolean. Use it to add or remove the class on this row.',
        'Adding a class on every change cannot reverse completion.',
        'The value property can stay the same when checked changes.',
      ],
      [
        [
          'After removing the last task, which condition should show the empty message?',
          'list.children.length === 0',
          'The field currently contains no text',
          'The last checkbox was unchecked',
        ],
        [
          'Two rows remain after deletion but the title field is empty. What determines whether the empty-list hint appears?',
          'The remaining child count',
          'Only the text field length',
          'The last deleted row’s checked state',
        ],
        'Compute empty state from remaining rows after every change.',
        'A blank input can coexist with many existing tasks.',
        'Completion and list membership are independent.',
      ],
      [
        [
          'A learner wants to save the literal title <strong>Math</strong>. Which insertion is appropriate?',
          'Set a fresh span’s textContent to the title',
          'Build an HTML string containing the title',
          'Remove the brackets and keep the rest',
        ],
        [
          'How do you display the literal title <i>Rest</i> with every character preserved?',
          'Assign the string to a title node’s textContent',
          'Parse the string as markup',
          'Discard its bracket characters',
        ],
        'A text node represents the learner’s original characters literally.',
        'Interpreting input as markup changes its meaning.',
        'Stripping characters fails the stated requirement to preserve the title.',
      ],
      [
        [
          'The HTML uses id="new-topic" but the script selects "#topic". What result explains the failure?',
          'The selector returns null',
          'The browser inserts a missing input',
          'The browser renames the ID',
        ],
        [
          'A visible list is named tasks-list; a script selects #task-list. What would the Console show?',
          'null when no ID matches',
          'A newly created ul',
          'An automatically corrected selector',
        ],
        'An ID selector must match the actual element identifier.',
        'Searching never creates a replacement element.',
        'Browsers do not correct near matches in selectors.',
      ],
      [
        [
          'At a default 16px font, when does @media (max-width: 36rem) stack the controls?',
          'At 375px, not at 768px',
          'Only at 768px',
          'At both widths',
        ],
        [
          'A form uses a row normally and a column at widths up to 600px. Predict its layout at 390px and 800px.',
          'Column, then row',
          'Row, then column',
          'Column at both widths',
        ],
        'The maximum-width condition applies at or below the breakpoint.',
        'This reverses the condition. Compare each viewport with the threshold.',
        'The wider viewport falls outside the rule.',
      ],
      [
        [
          'You reviewed a diff and committed a tested fix locally. Which statement is supported?',
          'The local history records it; sharing needs a separate transfer',
          'Every remote already contains it',
          'The commit proves every behavior works',
        ],
        [
          'A local commit message says “Fix keyboard”. What does that establish on its own?',
          'A local snapshot exists; verify keyboard behavior separately',
          'A remote reviewer has approved it',
          'All keyboard checks passed',
        ],
        'History, publication and evidence of behavior answer three separate questions.',
        'A local commit carries no automatic remote action or approval.',
        'A commit message records a claim. Run the interaction to verify it.',
      ],
    ],
  ),
]
