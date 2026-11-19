import type { Question, Variant } from './quizzes'

interface Scenario {
  variant: Variant
  feedback: Question['feedback']
}

// Each readiness retry applies the same essential outcome to a new situation.
export const retryScenarios = new Map<string, Scenario>([
  ['p1-w01-l12-q03', {
    variant: [
      'A recipe form receives "\\t   ". The debugger shows raw.length === 4. Which guard still rejects it?',
      'Return early when raw.trim() is empty',
      'Return early only when raw.length is zero',
      'Accept it because the input uses required',
    ],
    feedback: [
      'Trimming removes the tab and spaces, so the result is empty.',
      'The raw length counts whitespace even though it supplies no title.',
      'The required attribute checks that a value exists. The submit handler still needs the whitespace rule.',
    ],
  }],
  ['p1-w01-l12-q07', {
    variant: [
      'A shopping list receives Milk & <oats> as the title. Which row update displays exactly what the learner typed?',
      'Set label.textContent = title',
      'Set label.innerHTML = title',
      'Strip everything between angle brackets first',
    ],
    feedback: [
      'textContent displays the characters as text, including the ampersand and brackets.',
      'innerHTML gives the browser markup to parse.',
      'Removing angle-bracket text changes the learner’s title.',
    ],
  }],
  ['p1-w02-l11-q04', {
    variant: [
      'A checkbox changes on screen, then resets after refresh. The click handler only updates the element. What belongs in the handler?',
      'Update the matching record, save the collection, then draw the row from that data',
      'Set the checkbox again after drawing the old collection',
      'Save the selected filter so the checkbox will be restored',
    ],
    feedback: [
      'Update the model first. Persist that model and render from it so the screen and reload agree.',
      'Changing the element alone leaves the stored record unchanged.',
      'A saved filter gives the app a view preference. It cannot restore a task’s completion flag.',
    ],
  }],
  ['p1-w02-l11-q07', {
    variant: [
      'Four tasks are still open. Switching to Completed shows one finished row. The badge is labeled Open tasks across the whole list. What should it display?',
      '4 open tasks',
      '1 open task',
      '0 open tasks',
    ],
    feedback: [
      'Count open tasks from the full collection, including rows hidden by the filter.',
      'The one visible row is complete and is excluded from the open-task count.',
      'Hiding every open row does not complete any task.',
    ],
  }],
  ['p1-w03-l11-q02', {
    variant: [
      'Two tasks are both called Review. Sorting moves ID 19 to the first row. A click inside its remove button bubbles up to the list. Which value should reach removeTask?',
      '19, read from the clicked button’s data attribute',
      '0, the current visible row position',
      'Review, the text shared by the two tasks',
    ],
    feedback: [
      'The button can supply the stable ID after locating it from the nested event target.',
      'The array position can change when the list is sorted or filtered.',
      'Duplicate titles cannot identify a unique task.',
    ],
  }],
  ['p1-w03-l11-q07', {
    variant: [
      'After renaming a task to Prepare <slides>, the preview shows only Prepare. Which change fixes the rendering and keeps the saved title intact?',
      'Put the saved title in the row’s textContent',
      'Parse the title as part of a row template with innerHTML',
      'Strip <slides> when persisting the rename',
    ],
    feedback: [
      'Rendering text literally preserves the saved title and prevents accidental markup.',
      'An HTML template still parses angle brackets as markup.',
      'Cleaning the model this way deletes part of the user’s title.',
    ],
  }],
  ['p1-w04-l12-q03', {
    variant: [
      'A mock API returns valid JSON: [{id: 8, title: false}, {id: 9, title: "Stretch"}]. What can the Ideas panel safely show?',
      'Show Stretch after validating the records and skipping the invalid title',
      'Show both records because JSON decoding succeeded',
      'Save the response as the current task collection',
    ],
    feedback: [
      'JSON syntax allows Boolean values. The idea model requires a valid title string.',
      'Parsing JSON confirms syntax, not the shape each card needs.',
      'Remote suggestions are separate from the learner’s saved tasks.',
    ],
  }],
  ['p1-w04-l12-q07', {
    variant: [
      'The learner copies a remote idea with ID 4 into a local list that already has task 4, then copies the same idea again. What should the two buttons create?',
      'Two independent local tasks with unused IDs',
      'Two local tasks that share the source ID 4',
      'One overwrite of local task 4 followed by another overwrite',
    ],
    feedback: [
      'Each copy is a new local task and needs its own stable ID.',
      'Reusing the source ID collides with an existing task and with the second copy.',
      'Copying an idea does not grant permission to replace an existing task.',
    ],
  }],
  ['p1-w05-l11-q02', {
    variant: [
      'A TaskItem renders checked={task.completed}. Its click handler logs task.id, but the check mark never stays. Where should you connect the update?',
      'Have TaskItem call onToggle(id) and let App update its task state',
      'Assign task.completed inside TaskItem without updating App',
      'Change the label text so the row looks complete',
    ],
    feedback: [
      'App owns the task collection. Updating that state supplies the new checked prop.',
      'Mutating a received prop bypasses the owner’s state update.',
      'A text change does not change the value that controls the checkbox.',
    ],
  }],
  ['p1-w05-l11-q06', {
    variant: [
      'The list contains IDs 5 and 9. A toggle targets 9. What should the state updater return so React can see the change and task 5 keeps its identity?',
      'A new list with a new task 9, reusing the unchanged task 5',
      'The old list with the existing task 9 mutated in place',
      'A fresh copy of task 9 in both positions',
    ],
    feedback: [
      'Replace the collection and the one changed record. Reuse the unchanged objects.',
      'Mutating the previous state can hide the update and changes snapshots that still reference it.',
      'Replacing both positions loses task 5 and duplicates task 9.',
    ],
  }],
  ['p1-w06-l12-q03', {
    variant: [
      'The learner opens Ideas, visits Tasks, then opens Ideas again. The first request completes after the second. Which response may update the visible Ideas list?',
      'Only the response from the current Ideas effect',
      'Both responses, in the order they arrive',
      'Only the first request since it started first',
    ],
    feedback: [
      'Cleanup can abort obsolete work. A current-request guard also handles a source that ignores abort.',
      'The older response could replace newer results.',
      'Start order does not decide whether the requesting screen is still current.',
    ],
  }],
  ['p1-w06-l12-q05', {
    variant: [
      'A suggestion card says Read docs and has key api-12. The learner clicks Copy. What belongs in the saved task collection?',
      'A new open task with title Read docs and a local ID',
      'The original API record with key api-12 and its external metadata',
      'The old task list inside a new request to the remote API',
    ],
    feedback: [
      'A copy transfers the intended title. The local task model supplies status and identity.',
      'A remote suggestion is not a local task record.',
      'Copy is a local action and does not send progress or tasks to the public sample API.',
    ],
  }],
  ['p1-w06-l12-q06', {
    variant: [
      'Ideas can add a task and Tasks can delete it. Moving between the pages destroys their individual components. Which component can keep both edits?',
      'A shared state owner that stays mounted above both routes',
      'A copy of the array inside each page',
      'State held only in the Ideas card that created the task',
    ],
    feedback: [
      'A mounted common owner keeps the source array and gives each page its current value.',
      'Independent arrays can disagree after an edit.',
      'The card can unmount and is not shared by the two pages.',
    ],
  }],
  ['p1-w07-l12-q03', {
    variant: [
      'The create endpoint accepts only title. A request supplies a valid title and completed: true. What should a test observe after it sends the request?',
      '400 and the task count unchanged',
      '201 and a new task marked completed',
      '400 but one extra task stored',
    ],
    feedback: [
      'Reject fields outside the allowed contract before changing the store.',
      'A valid title does not authorize changing a field outside the contract.',
      'Returning an error after a write still mutates state.',
    ],
  }],
  ['p1-w07-l12-q05', {
    variant: [
      'A test receives 204 after deleting ID 7. Its assertion still tries JSON.parse(responseText). What should it assert instead?',
      'The response text is empty and a follow-up lookup reports the task missing',
      'The response text parses into an empty object',
      'The response text contains a message naming ID 7',
    ],
    feedback: [
      'A successful delete returns an empty 204 body. A lookup can verify the change separately.',
      'An empty object still requires a response body.',
      'A confirmation message still takes body bytes.',
    ],
  }],
  ['p1-w08-l11-q02', {
    variant: [
      'The server list has tasks 1 and 4. A browser cache from an earlier week also contains task 9. After a successful GET, which confirmed tasks should React render?',
      'Tasks 1 and 4 from the current server response',
      'Tasks 1, 4 and 9 merged as equally current',
      'Only task 9 from the persistent browser cache',
    ],
    feedback: [
      'The Express store is the source for confirmed server tasks.',
      'Merging an older record can bring back a task the server no longer has.',
      'The presence of an old local record does not override a successful server response.',
    ],
  }],
  ['p1-w08-l11-q05', {
    variant: [
      'The server deletes a task and responds 204, but React leaves the row visible after a JSON parse error. What should change?',
      'Handle the successful empty response before parsing JSON, then update the list',
      'Require the server to send the full row in the 204 response',
      'Keep the row and retry JSON parsing after a delay',
    ],
    feedback: [
      'Keep the 204 contract and remove the row only after the successful server result.',
      'A 204 response cannot contain a row body.',
      'Waiting does not turn an empty response into JSON.',
    ],
  }],
  ['p1-w08-l11-q08', {
    variant: [
      'Refreshing the React tab keeps a created task. Stopping and restarting only Express makes the list empty. What did that experiment show?',
      'The task lived in the previous Express process memory',
      'The browser refresh deleted the database',
      'The React page stores the task permanently in its component',
    ],
    feedback: [
      'Browser refresh leaves the server process running. Restarting the in-memory server replaces its store.',
      'The experiment changed the Express process. This exercise has no task database yet.',
      'A component would lose its in-memory state when the page refreshed.',
    ],
  }],
  ['p1-w09-l12-q02', {
    variant: [
      'Task 42 was completed before Node restarted. PostgreSQL stayed online. Which GET result demonstrates persistence?',
      'Task 42 still exists and its completed flag is true',
      'A task with the same title has a new ID and an unchecked flag',
      'The task list is empty until a new write',
    ],
    feedback: [
      'Matching both the ID and the saved update shows the same persisted record came back.',
      'A newly seeded task with a matching title does not demonstrate persistence.',
      'An empty response would hide or lose the saved record.',
    ],
  }],
  ['p1-w09-l12-q05', {
    variant: [
      'A database keeps tasks after restart, but the list query returns everyone’s rows. What does the next project need to add?',
      'Identify the signed-in user and scope each task operation to that owner',
      'Add more digits to the task ID',
      'Sort the results by title before returning them',
    ],
    feedback: [
      'Persistence keeps the data. Authorization determines which stored rows each user may access.',
      'An ID is an identifier, not proof that a user may read the row.',
      'Ordering the rows does not restrict who sees them.',
    ],
  }],
  ['p1-w10-l12-q04', {
    variant: [
      'Patching another account’s task returns 404. How do you check that the server rejected the change before writing it?',
      'Read the task as its owner and compare its saved fields with the original',
      'Record 404 and finish without reading the task',
      'Try the same request until a different status appears',
    ],
    feedback: [
      'Check the response and the data. The owner should see the same record, unchanged.',
      'A server could return an error even after an incorrect write.',
      'Repeating the response check still leaves the owner’s data unverified.',
    ],
  }],
  ['p1-w11-l11-q03', {
    variant: [
      'Request-validation tests pass against a fake repository. The team could not start PostgreSQL. Which release-note sentence is supported?',
      'The validation tests passed. Database integration remains unverified.',
      'The database rejected all invalid production requests.',
      'The skipped database cases can be included in the pass count.',
    ],
    feedback: [
      'Claim the behavior you observed and report the untested layer explicitly.',
      'The fake repository did not exercise the real database.',
      'A test needs to run and pass before it counts as evidence.',
    ],
  }],
  ['p1-w12-l11-q05', {
    variant: [
      'The capstone gets 97 points, but the ownership retest shows a different account can read a private task. What should the release report say?',
      'Hold, with the failed ownership check and a retest plan',
      'Ready, because 97 points exceeds the threshold',
      'Ready if the missing check is marked as optional',
    ],
    feedback: [
      'A failed critical authorization check holds the release, regardless of aggregate score.',
      'A high total does not compensate for a privacy failure.',
      'Reclassifying a required safety check does not fix the failed behavior.',
    ],
  }],
])

export function quizForm(question: Question, retry: boolean): Scenario {
  return (retry && retryScenarios.get(question.id)) || {
    variant: question.variants[retry ? 1 : 0],
    feedback: question.feedback,
  }
}
