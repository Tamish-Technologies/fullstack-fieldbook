# Study Tasks - Phase 1, Week 2 Starter (Week 1 baseline)

A dependency-free HTML/CSS/JavaScript practice app.

## Run
Open `index.html` in a modern browser, or preview it in VS Code.
No npm, framework, account, or paid tool is required.

## Features
- Add a non-empty task using the form / Enter key.
- Mark tasks as complete, and undo completion.
- Remove a task.
- See an empty state when no tasks remain.
- Use a responsive layout on narrow screens.
- User-provided text is inserted with `textContent`.

## Known limitation
Tasks live in the current page only. Reloading clears them by design.
Persistence using `localStorage` is introduced during Weeks 2-3.

## Try these test cases
1. Add a normal task.
2. Try blank text and only spaces.
3. Add two tasks; complete one, then uncomplete it.
4. Remove all tasks; check the empty message returns.
5. Test Enter key, Tab key, and a narrow screen.
6. Enter `<b>test</b>` and confirm it displays as plain text.
