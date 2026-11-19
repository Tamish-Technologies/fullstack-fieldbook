# Week 4 student starter - Study Tasks v4

This is your finished Week 3 task manager plus a **new API lab panel**.
The existing task features (Add/Edit/Delete/Complete/Search/Sort/Filter) are functional.
The new Load/Offline/Cancel buttons deliberately do nothing until you implement
and wire them up; `api-client.js` contains TODO stubs.

## Run

1. Reuse your Week 3 server address and port if you want your saved tasks. For a new project, run `python3 -m http.server 5500 --bind 127.0.0.1` from this folder, or use your editor’s local preview server.
2. Open that address in your browser. For the Python command above, use `http://127.0.0.1:5500/`. The names `localhost` and `127.0.0.1` have separate browser storage.
3. Open DevTools > Console and Network. Avoid `file://` because ES modules need HTTP.
4. Run existing 22 baseline tests by opening `tests.html` on that same address.
5. Start a Git branch for Week 4 before editing.

## Build and check the inbox

1. On paper, draw Browser -> HTTP request -> API -> JSON response -> UI.
2. Implement `normalizeIdeas()` with valid input, invalid input and limit cases.
3. Implement `fetchStudyIdeas()` with `response.ok` and `await response.json()`.
4. Add a `Load from API` click handler in `app.js` with loading/success/error states.
5. Render external idea titles using `textContent` and delegated click handlers.
6. Implement `Copy to my tasks` with `addTaskToList()` and a **new local ID**.
7. Wire offline sample data through the same normalization function.
8. Bonus: add Cancel via `AbortController` and ignore outdated responses.
9. Write at least five tests that do NOT access the real internet; mock `fetch`.
10. Verify no previously saved tasks are erased when you load or fail to load ideas.

External service: https://jsonplaceholder.typicode.com/todos
This endpoint is a fake API. **Do not assume POST/PUT are persistent**.

In Fieldbook, Lesson 8 covers local HTTP diagnostics and Lesson 12 lists the acceptance checks. The bundled sample and fake responses are sufficient for every required exercise.
