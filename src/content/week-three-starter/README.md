# Study Tasks | Week 3 starter

This is the **completed Week 2 app**, reused as the Week 3 starting point. It stores tasks at `study-tasks-week2` in your browser's localStorage.

## Start
Serve this folder over local HTTP. If Python is installed, run `python3 -m http.server 5500 --bind 127.0.0.1` from this folder and open `http://127.0.0.1:5500/`. If you already have Week 2 tasks, use the same server address and port you used then. Add, complete, delete and filter a few fictional tasks. Reload to check your baseline before splitting the code into modules.

## Week 3 mission
1. Make a Git checkpoint and branch named `week3-edit-search-tests`.
2. Move testable task logic into an ES module (`task-logic.js`). Change `index.html` to load `app.js` using `type="module"`; use a local web server for modules.
3. Add Edit / Save / Cancel to task rows. Trim and validate titles; Escape cancels; Enter saves.
4. Add live search and Newest / Oldest sorting, without deleting or mutating underlying task data.
5. Use delegated events on the task list, and correctly target task **IDs**, never array indexes.
6. Add automated, browser-based tests to `tests.html` and `tests.js`.
7. Review keyboard, focus, empty states, storage persistence, and DevTools debugging.

## Check your work
Use the project checklist in Fieldbook, Week 3 Lesson 11. Follow the module setup in Lesson 4.
