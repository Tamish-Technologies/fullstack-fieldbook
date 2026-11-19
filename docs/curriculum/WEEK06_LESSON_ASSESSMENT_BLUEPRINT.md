# Phase 1 / Week 6 — Lesson and Assessment Blueprint

**Product:** FullStack Fieldbook · **Curriculum:** Phase 1, Week 06 · **Status:** SOURCE-INSPECTED **D0 STRUCTURE OWNER APPROVED (A-007)**; lesson content and tests remain pending. No student course content, browser test suite, real React app build or learner pilot was executed for this document.  
**Student project:** Study Tasks v6: Week 5 React task manager + read-only public Study Idea Inbox + Dashboard, Tasks, Ideas and 404 routes.  
**Private source:** `../fullstack-fieldbook-source-materials/phase1/week-06/` (**26 instructor C## chapters; 41 code archive entries: 19 starter, 22 instructor-reference**).  
**Decisions:** DEC-01–17, DEC-21, DEC-23, DEC-24; Week 1–6 structures accepted A-001/A-003/A-004/A-005/A-006/A-007.  
**Development stage:** Week 6 learner content and pilot belong to **D6** (Weeks 5–6). This planning document does **not** authorize D2 or D6 implementation.

## 1. Week 6 educational promise and hard scope boundary

Week 5 rebuilt local Study Tasks in React; Week 4 introduced `fetch()` and an external sample API without sending the learner's tasks to that service. Week 6 combines them, then introduces client-side page routing. Every learner must be able to explain **render versus event handler versus Effect**, request lifecycle/cleanup, **four truthful network UI states**, routing, shared state and persistence. Genuine engineering evidence matters more than screenshots.

**Required outcome:** a locally working React/JSX **Study Tasks v6** with `/`, `/tasks`, `/ideas`, a wildcard 404 page, a safe API client, a Retry button, deliberate bundled offline sample data, copying an idea into local tasks, and correct task persistence. The live practice endpoint is read-only; **no POST of student tasks, no Node/Express backend, no PostgreSQL or auth this week**.

**Optional stretch:** custom `useIdeas` hook, route params, refined UI and additional component tests. **Not required:** paid AI agent, active public API connection, a separately deployed site, TanStack Query, TypeScript migration or server endpoints. Later Week 7 builds the first Express API.

**Data invariants:** local task entries retain `{ id: number, title: string, completed: boolean }` and the Week 5 **100-character title validation**; existing `study-tasks-week2` storage key stays in the learner's separate app. Remote examples have prefixed string keys such as `api-17` and bundled examples `offline-1`; clicking Copy creates a **new unique local numeric ID** via `App.addTask`. Two intentional Copy clicks may create two tasks. The Academy's own progress storage must be isolated from all student exercise state. **Same-origin storage** explains why a changed Vite port may show a different task list.

**Grading honesty:** Fieldbook may auto-grade only **pure JavaScript** normalization and fake-fetch client behavior in the D4-approved isolated runner. It must **not** claim to compile JSX, mount React components, test Router navigation, run `npm`, access a student's local repository, or inspect browser storage from a separate origin. React effects, UI, routing, local storage and builds are explicitly **`local-project-self-verified`** with real learner-run steps. A failed live public API must not block mastery: assessed server responses are bundled fake responses or offline samples.

## 2. Required progression and allocation

- Preserve existing **12 stable lesson IDs** `p1-w06-l01` to `p1-w06-l12`, **all required**. Week 6 L01 unlocks only after **Week 5 graduation**, including the Week 5 project/readiness gate. Proceed linearly L01 → ... → L12.
- **26 proposed checkpoint IDs:** **23 required** = **11 quizzes (61 planned question slots)** + **2 isolated browser-code suites** + **10 real local-project self-verifications**, plus **3 optional enrichment** checkpoints. The question slots are *not yet written or validated*.
- Each required lesson finishes only when all its required checkpoints pass. Optional enrichment never blocks and never enters the completion denominator. Weekly graduation requires L12 integrated project `c01`, Week 6 readiness quiz `c02`, and independent transfer/debug `c03`, as well as L01–L11 required checkpoints.
- Quiz threshold `ceil(0.8 × scored required items)` plus **all essential questions correct**; browser suites need **all mandatory functional tests**; local evidence requires the learner to run actual project checks and attest honestly. Unlimited retries, progressive hints and equivalent alternate questions wherever feasible.
- Completion label for Week 6: **Includes self-verified work**. This is a locally editable learning record, **not** a verified technical credential. Reset previews and downstream invalidation follow `MASTERY_RULES.md`.

### Overview

| Lesson | Name | Mandatory checkpoints | Suggested effort |
|---|---|---|---|
| `p1-w06-l01` | React API-client boundaries and untrusted JSON | C01, C02 | 20–35 min |
| `p1-w06-l02` | Effect versus render versus event handlers | C01 | 15–25 min |
| `p1-w06-l03` | Async Effects, dependencies, cancellation and stale results | C01, C02 | 25–45 min |
| `p1-w06-l04` | Four honest API UI states | C01, C02 | 20–35 min |
| `p1-w06-l05` | Retry, offline samples and safe idea copying | C01, C02 | 20–40 min |
| `p1-w06-l06` | React Router and client-side route mapping | C01, C02 | 25–40 min |
| `p1-w06-l07` | Accessible links, active navigation and deep links | C01, C02 | 20–35 min |
| `p1-w06-l08` | Share task state above route boundaries | C01, C02 | 20–35 min |
| `p1-w06-l09` | Persist tasks across navigation and browser refresh | C01, C02 | 20–35 min |
| `p1-w06-l10` | Fake-fetch tests and systematic asynchronous debugging | C01, C02 | 25–45 min |
| `p1-w06-l11` | Review AI-generated React changes without surrendering understanding | C01 | 15–30 min |
| `p1-w06-l12` | Study Tasks v6 project, transfer debug and Week 7 readiness | C01, C02, C03 | 60–120 project practice; readiness assessment separately min |

All effort estimates are planning aids, **not minimum-time gates**. Local tool setup, package downloads and project labs can require additional time.

## 3. Lesson-by-lesson authoring specifications

The following are **approved-policy-aligned authoring contracts**, not complete student lessons. During D6 implementation, author: first-principles explanation, approachable example, practice, feedback with three levels of hints, alternative retry scenarios, safe code examples, accessibility review, official docs where useful, and tests/repro steps. Only private teacher reference files may contain completed end-to-end solutions.

### L01 — React API-client boundaries and untrusted JSON (`p1-w06-l01`)

**Source chapters:** C01,C03,C04,C05,C06,C21. **Prerequisite:** Week 5 graduation. **Suggested effort:** 20–35 minutes (not an access timer).

**Observable learning outcomes:**
- Distinguish browser HTTP client, React page and local task model.
- Normalize remote JSON without mutating inputs or trusting unexpected fields.
- Explain why `fetch()` HTTP errors and invalid JSON are different failures.

**Mental model to teach:** The API client fetches and normalizes data; a component renders the result. Treat the network response as untrusted input rather than UI-ready objects.

**Worked example for the eventual lesson:** Follow `fetchIdeas` → `response.ok` → `response.json()` → `normalizeIdeas` → React; trace `{id:17,title:"  Read React docs  ",completed:false}` → `{id:"api-17",title:"Read React docs",completed:false}`. The local task is assigned a separate numeric ID only after copying.

**Practice / project lab:** Predict normalized output for duplicate ID, string ID, non-array response, empty array, 101-character title and HTML-looking text. Implement a pure normalizer in a sandbox with the same public contract, without copying the reference source.

**Common wrong idea and feedback direction:** Confusing HTTP 200 with a validated payload, using raw API IDs as local IDs, or inserting untrusted strings as HTML.

**Progressive hint seeds:**
1. Which layer owns the HTTP request?
2. What must happen before raw network data reaches JSX?
3. Inspect the array shape, valid ID, title boundary, duplicate handling and resulting object.

**DEC-21 checkpoints:**
- `p1-w06-l01-c01` — **quiz-auto**, Required: API-client contract, HTTP response and untrusted JSON (5 questions).
- `p1-w06-l01-c02` — **browser-code-auto**, Required: Normalize remote ideas with safe IDs/title validation/deduplication.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L02 — Effect versus render versus event handlers (`p1-w06-l02`)

**Source chapters:** C03,C07. **Prerequisite:** p1-w06-l01. **Suggested effort:** 15–25 minutes (not an access timer).

**Observable learning outcomes:**
- Classify an operation as render-time derivation, event handling or external synchronization.
- Predict `useEffect` with no dependencies, an empty list and reactive dependencies.
- Explain why setting derived remaining-task count in an Effect is unnecessary.

**Mental model to teach:** Render answers “what should the UI look like?”; handlers respond to user actions; Effects synchronize with systems outside the render calculation.

**Worked example for the eventual lesson:** Compare direct `remaining = tasks.filter(...).length`, a Retry button handler and an Effect that loads remote ideas when the page is mounted. Predict Strict Mode extra setup/cleanup.

**Practice / project lab:** Sort eight snippets into render, handler or Effect; find and correct a fetch placed directly in render; explain the correct dependency list.

**Common wrong idea and feedback direction:** Using Effects as generic callbacks or omitting dependencies until the console becomes quiet.

**Progressive hint seeds:**
1. What external system is involved?
2. Does the work happen because the user clicked something?
3. If it can be derived from props/state during render, no Effect is usually needed.

**DEC-21 checkpoints:**
- `p1-w06-l02-c01` — **quiz-auto**, Required: Render versus events versus external synchronization (5).

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L03 — Async Effects, dependencies, cancellation and stale results (`p1-w06-l03`)

**Source chapters:** C07,C08,C09,C20. **Prerequisite:** p1-w06-l02. **Suggested effort:** 25–45 minutes (not an access timer).

**Observable learning outcomes:**
- Explain Effect setup, cleanup and dependencies.
- Distinguish obsolete-response cancellation from a user-visible request failure.
- Implement and locally verify an `AbortController` and stale-result guard.

**Mental model to teach:** Every Effect setup owns its request and cleanup. A later render or unmount invalidates the old request; an old response must never become the current UI.

**Worked example for the eventual lesson:** Trace request A slow → Retry request B fast → B displayed → A returns late. Compare an `active` guard with a controller `signal` and explain why `AbortError` is not shown as failure.

**Practice / project lab:** Complete the `IdeasPage` request effect in the local React starter; intentionally simulate a slow response, navigate away, Retry, and record whether stale data/error appeared. Keep Strict Mode enabled.

**Common wrong idea and feedback direction:** Writing `useEffect(async () => ...)`, ignoring cleanup, disabling Strict Mode to hide an issue, or treating deliberate abort as HTTP failure.

**Progressive hint seeds:**
1. Which request does the current page still care about?
2. What should cleanup do before the old async task finishes?
3. Use both abort signal and a guard in the reference pattern, then test out-of-order responses.

**DEC-21 checkpoints:**
- `p1-w06-l03-c01` — **quiz-auto**, Required: Effect dependencies, cleanup and Strict Mode (6).
- `p1-w06-l03-c02` — **local-project-self-verified**, Required: Real React Effect, cancellation and late-response handling.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L04 — Four honest API UI states (`p1-w06-l04`)

**Source chapters:** C10,C20. **Prerequisite:** p1-w06-l03. **Suggested effort:** 20–35 minutes (not an access timer).

**Observable learning outcomes:**
- Distinguish loading, nonempty success, valid empty and error.
- Render useful accessible feedback for each request state.
- Avoid reporting empty success during pending requests or HTTP failures.

**Mental model to teach:** The network result is a small state machine; each state has an honest meaning and a recovery path.

**Worked example for the eventual lesson:** Display `loading` via status announcement, `success` with idea cards, `empty` with no-results guidance, `error` with Retry and offline choice.

**Practice / project lab:** Force each of four states using a fake response/local dev setup; record the exact visible message and action. Check keyboard focus and status announcements.

**Common wrong idea and feedback direction:** Conflating an empty list with failed parsing/HTTP 503, hiding Retry after errors, or using unstable React list keys.

**Progressive hint seeds:**
1. What do we know about the request at this instant?
2. Did we receive a valid array?
3. Map each request outcome to one UI status, message and available action.

**DEC-21 checkpoints:**
- `p1-w06-l04-c01` — **quiz-auto**, Required: Loading/success/empty/error status distinctions (5).
- `p1-w06-l04-c02` — **local-project-self-verified**, Required: Local React four-state accessible UI and recovery actions.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L05 — Retry, offline samples and safe idea copying (`p1-w06-l05`)

**Source chapters:** C11,C20. **Prerequisite:** p1-w06-l04. **Suggested effort:** 20–40 minutes (not an access timer).

**Observable learning outcomes:**
- Implement a deliberate Retry that creates a fresh request.
- Switch to bundled offline idea data without network access.
- Copy a remote/offline idea into the local task collection with a new ID.

**Mental model to teach:** Remote ideas are read-only examples. Student tasks remain in `App`/browser storage; clicking Add locally creates a new task, never POSTs it to the public service.

**Worked example for the eventual lesson:** Trace `source=remote/offline`, `retryKey`, `SAMPLE_IDEAS`, `onAddIdea` → `App.addTask()`; remote `api-17` is not a local task ID.

**Practice / project lab:** Force offline, display bundled cards, copy one twice, verify two distinct local IDs, navigate to Tasks and reload; observe zero API POSTs.

**Common wrong idea and feedback direction:** Overwriting student tasks with fetched ideas, reusing remote IDs for new tasks, or requiring a live public API to pass.

**Progressive hint seeds:**
1. What is the source of truth for students’ own tasks?
2. Which event should trigger Retry?
3. Use the existing local addTask callback and allocate the ID there.

**DEC-21 checkpoints:**
- `p1-w06-l05-c01` — **quiz-auto**, Required: Retry, offline samples and separation of task data (5).
- `p1-w06-l05-c02` — **local-project-self-verified**, Required: Local offline Retry/Copy flow and new local IDs.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L06 — React Router and client-side route mapping (`p1-w06-l06`)

**Source chapters:** C12,C24. **Prerequisite:** p1-w06-l05. **Suggested effort:** 25–40 minutes (not an access timer).

**Observable learning outcomes:**
- Explain browser URL/history vs backend API routes.
- Configure `BrowserRouter`, `Routes`, `Route` for the Week 6 pages.
- Predict rendered page for `/`, `/tasks`, `/ideas` and unmatched paths.

**Mental model to teach:** React Router uses the URL to decide which UI page to render; it does not create a backend server or a database.

**Worked example for the eventual lesson:** Wrap `App` in `BrowserRouter`, map three intended URLs to pages, and provide an explicit `*` not-found element using the source package import style.

**Practice / project lab:** Add route components with a small heading; open each URL and an unknown URL. Record React page behavior vs an HTTP server 404.

**Common wrong idea and feedback direction:** Treating a React route as an Express endpoint or forgetting the wildcard fallback.

**Progressive hint seeds:**
1. What changes in browser address bar?
2. Which file provides route matching?
3. Use the actual version-compatible `react-router` imports from the supplied package and confirm direct loads.

**DEC-21 checkpoints:**
- `p1-w06-l06-c01` — **quiz-auto**, Required: BrowserRouter/Routes and route versus server concepts (5).
- `p1-w06-l06-c02` — **local-project-self-verified**, Required: Local React `/`, `/tasks`, `/ideas`, `*` routes.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L07 — Accessible links, active navigation and deep links (`p1-w06-l07`)

**Source chapters:** C13,C20. **Prerequisite:** p1-w06-l06. **Suggested effort:** 20–35 minutes (not an access timer).

**Observable learning outcomes:**
- Choose `Link` or `NavLink` appropriately.
- Implement correct active-nav indication and keyboard use.
- Explain host SPA fallback on refreshed deep links.

**Mental model to teach:** Navigation is an accessible link connected to browser history. The router’s not-found page is different from an HTTP 404 returned before the app loads.

**Worked example for the eventual lesson:** `<NavLink to="/" end>Dashboard</NavLink>` and other route links, then observe `aria-current="page"` and Tab/Enter.

**Practice / project lab:** Keyboard-test Dashboard/Tasks/Ideas nav, Back/Forward, direct `/ideas` refresh, and `/not-a-page`. Document any host rewrite requirement rather than calling it a React bug.

**Common wrong idea and feedback direction:** `<a href>` full-reload used for internal routes, clickable `div` without semantics, or root nav item active on all paths.

**Progressive hint seeds:**
1. Is this internal client-side navigation?
2. What indicates the selected route?
3. Check `end` for root, keyboard activation, and difference between host fallback and React wildcard.

**DEC-21 checkpoints:**
- `p1-w06-l07-c01` — **quiz-auto**, Required: NavLink, active states, keyboard and SPA deep-link semantics (5).
- `p1-w06-l07-c02` — **local-project-self-verified**, Required: Local navigation, direct URL/refresh/404 and keyboard use.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L08 — Share task state above route boundaries (`p1-w06-l08`)

**Source chapters:** C03,C14. **Prerequisite:** p1-w06-l07. **Suggested effort:** 20–35 minutes (not an access timer).

**Observable learning outcomes:**
- Explain unmounting and its effect on page-local state.
- Move shared tasks and callbacks to `App` above the route elements.
- Use functional updates to avoid duplicate IDs during rapid additions.

**Mental model to teach:** The state owner must outlive pages that need the same data. Route pages can mount/unmount; `App` stays as the shared owner.

**Worked example for the eventual lesson:** Trace `/ideas` Add → IdeasPage callback → App state updater → `/tasks` sees newly added task; dashboard `remaining` is derived from passed task props.

**Practice / project lab:** Temporarily put tasks inside TasksPage and show the loss on navigation; revert. Add two ideas quickly and verify distinct IDs; explain what state properly remains page-local.

**Common wrong idea and feedback direction:** Copying tasks into separate page state, maintaining duplicate counts, or calculating new IDs from stale closure values.

**Progressive hint seeds:**
1. Which component stays mounted as pages change?
2. Which pages need the same task array?
3. Lift it above Routes and pass callbacks; use `setTasks(previous => ...)`.

**DEC-21 checkpoints:**
- `p1-w06-l08-c01` — **quiz-auto**, Required: State ownership, page unmount and functional updates (5).
- `p1-w06-l08-c02` — **local-project-self-verified**, Required: Local shared task array survives route change and rapid adds.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L09 — Persist tasks across navigation and browser refresh (`p1-w06-l09`)

**Source chapters:** C15,C20. **Prerequisite:** p1-w06-l08. **Suggested effort:** 20–35 minutes (not an access timer).

**Observable learning outcomes:**
- Differentiate navigation state from browser-reload persistence.
- Reuse the Week 5 storage helper and `study-tasks-week2` key.
- Explain browser origin boundaries and how corrupted storage must be handled.

**Mental model to teach:** Route navigation keeps App state; a browser refresh reloads it from `localStorage` for that same origin. Academy progress is a separate store.

**Worked example for the eventual lesson:** Add task on `/ideas`, verify on `/tasks`, refresh `/tasks`, inspect the key and explain why changing Vite port may show another localStorage area.

**Practice / project lab:** Perform before/after reload trace, simulate an unreadable storage item in a disposable browser/profile, verify no silent overwrite and restore from safe sample data.

**Common wrong idea and feedback direction:** Changing storage key, overwriting corrupted data with `[]`, assuming data crosses ports, or touching Fieldbook course progress.

**Progressive hint seeds:**
1. Was the page unmounted or the entire document reloaded?
2. What origin owns this storage entry?
3. Check storage helper error result and prevent automatic overwrite on corruption.

**DEC-21 checkpoints:**
- `p1-w06-l09-c01` — **quiz-auto**, Required: Persistence, same origin, storage warning and reload (5).
- `p1-w06-l09-c02` — **local-project-self-verified**, Required: Local storage retention and corrupted data recovery.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L10 — Fake-fetch tests and systematic asynchronous debugging (`p1-w06-l10`)

**Source chapters:** C20,C21. **Prerequisite:** p1-w06-l09. **Suggested effort:** 25–45 minutes (not an access timer).

**Observable learning outcomes:**
- Use dependency-injected fake fetch to test status and payload cases.
- Read failures in Console/Network and identify cause before changing code.
- Distinguish pure API-client verification from React UI and routing checks.

**Mental model to teach:** A deterministic fake response lets the same failure recur without depending on a public API. It tests the HTTP client, not the mounted React app.

**Worked example for the eventual lesson:** Inject a fake response that resolves `{ok:false,status:503}`; assert client rejects. Simulate malformed shape, network rejection and AbortError.

**Practice / project lab:** Complete isolated `fetchIdeas` tests against injected fake fetch; then locally run starter tests and debug an error/empty case with Network DevTools.

**Common wrong idea and feedback direction:** Using actual internet for mandatory grading, treating successful `fetch()` as HTTP success, or calling pure-unit-test success proof that React rendered correctly.

**Progressive hint seeds:**
1. Did fetch reject or did response have a non-OK status?
2. Was `json()` valid but wrong shape?
3. Inject controlled response, inspect client result, then inspect actual component separately.

**DEC-21 checkpoints:**
- `p1-w06-l10-c01` — **browser-code-auto**, Required: Fake-fetch response, failures, malformed body and AbortSignal.
- `p1-w06-l10-c02` — **local-project-self-verified**, Required: Local test/Network DevTools diagnosis and bug reproduction.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L11 — Review AI-generated React changes without surrendering understanding (`p1-w06-l11`)

**Source chapters:** C16,C24. **Prerequisite:** p1-w06-l10. **Suggested effort:** 15–30 minutes (not an access timer).

**Observable learning outcomes:**
- Write narrow acceptance criteria for a proposed change.
- Review a Git diff for data ownership, network, side effects and accessibility risks.
- Explain how to verify a patch without requiring an AI subscription.

**Mental model to teach:** AI is an optional collaborator. The student owns the acceptance criteria, review and test evidence.

**Worked example for the eventual lesson:** Review a prepared hypothetical patch that moves fetch into render, drops `response.ok`, or removes cleanup. Identify the regression without running an external AI agent.

**Practice / project lab:** Answer code-review scenario questions; optionally ask an available agent for a single small improvement and critique every meaningful change.

**Common wrong idea and feedback direction:** Letting an agent rewrite pages and styles wholesale, assuming tests are executed because an agent claims so, or sharing private data in prompts.

**Progressive hint seeds:**
1. Which behavior must remain unchanged?
2. What does the Git diff actually modify?
3. Check network state, task ownership, request cleanup, accessibility and real tests.

**DEC-21 checkpoints:**
- `p1-w06-l11-c01` — **quiz-auto**, Required: Agent code-review safety and acceptance evidence (5).
- `p1-w06-l11-c02` — **optional-enrichment**, Optional / non-gating: Optional one-file AI-assisted bounded patch and reviewed diff.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

### L12 — Study Tasks v6 project, transfer debug and Week 7 readiness (`p1-w06-l12`)

**Source chapters:** C01,C02,C17,C18,C19,C22,C23,C24,C25,C26. **Prerequisite:** p1-w06-l11. **Suggested effort:** 60–120 project practice; readiness assessment separately minutes (not an access timer).

**Observable learning outcomes:**
- Demonstrate a multi-page React app with trustworthy API states and offline fallback.
- Show local task integrity across pages and reloads.
- Run local tests/build, explain one unknown bug independently, and describe the Week 7 backend handoff.

**Mental model to teach:** A completed feature is a chain of verifiable behaviors from browser request to page state and local task storage—not a screenshot or generated code dump.

**Worked example for the eventual lesson:** Narrate full flow: open `/ideas` → Effect → fake/live read → normalize → success/empty/error → copy title → App state → `/tasks` → storage → refresh.

**Practice / project lab:** Run integrated acceptance matrix: `/`, `/tasks`, `/ideas`, wildcard; success or simulated success, error and offline; two rapid adds; persistence; cleanup; keyboard; narrow display. Independently solve one new bug without AI-generated solution.

**Common wrong idea and feedback direction:** Passing a quiz while the local project does not work; claiming public API uptime or npm tests are verified by Fieldbook itself.

**Progressive hint seeds:**
1. Trace one API request through the files.
2. Locate state owners and test each expected transition.
3. Use one isolated failure reproduction and repeat the regression test after fixing.

**DEC-21 checkpoints:**
- `p1-w06-l12-c01` — **local-project-self-verified**, Required: Integrated Study Tasks v6 local demo, tests and build.
- `p1-w06-l12-c02` — **quiz-auto**, Required: 10-item Week 6 readiness assessment.
- `p1-w06-l12-c03` — **local-project-self-verified**, Required: Independent no-AI unfamiliar async/routing bug repair.
- `p1-w06-l12-c04` — **optional-enrichment**, Optional / non-gating: Optional custom useIdeas hook extraction and review.
- `p1-w06-l12-c05` — **optional-enrichment**, Optional / non-gating: Optional route params or responsive/keyboard polish.

**Assessment quality reminder:** auto-grading is valid only for real verified sandbox cases; all local React/npm/router results are **learner self-attestations** unless an instructor separately observes them.

## 4. Architecture and workflow to preserve

```text
BrowserRouter
   └─ App  [shared tasks + localStorage side effect]
       ├─ /        DashboardPage (derived counts)
       ├─ /tasks   TasksPage (form, search/filter/sort, TaskList)
       ├─ /ideas   IdeasPage (page-local remote request UI)
       │           ├─ fetchIdeas  → GET remote practice API (read only)
       │           ├─ normalizeIdeas (pure JS, validated IDs/titles)
       │           ├─ SAMPLE_IDEAS bundled offline
       │           └─ onAddIdea → App.addTask → local task ID
       └─ *        NotFoundPage
```

**Source of truth:** tasks stay in App, not duplicated in each page. Page-local request state belongs to the Ideas page; route changes unmount that page, which cleans up pending requests. Count dashboard values from tasks during render; don't synchronize duplicate derived counts in an Effect. HTTP `fetch()` may resolve for `503`, so validate `response.ok`. Invalid array payload is a validation error, not an empty success. Render external text through ordinary JSX escaping; never use raw HTML for remote titles.

**Local-only Academy boundary:** FullStack Fieldbook is itself a static frontend/PWA product with no server database; a student's Week 6 local React project is a *separate* Vite app. Its `localStorage` and the Academy's `localStorage` must never cross-write. The practice API is an optional live demonstration, not a prerequisite for pass/fail. All graded HTTP fixtures must be bundled locally.

## 5. Practical local project acceptance contract

The learner should receive the **starter**, not the instructor's complete `reference-solution/` tree, plus concrete commands and examples. Actual package versions must be checked at D6 authoring time; this blueprint intentionally does not promise an install or build result.

**Required expected behaviors (attested locally):**

1. Week 5 task add/toggle/delete, filters, search, sort/count and persisted data still work.
2. Opening `/ideas` shows **loading**, then **success** (real or fake response), **valid empty**, or **error**; errors retain a useful Retry/offline action. Abort is not shown as a user-facing API failure.
3. `normalizeIdeas` checks input array, unique positive integer source IDs, safe trimmed titles ≤100, duplicates/invalid entries and prefixed keys. HTTP status and invalid JSON shapes are handled before React receives data.
4. **Retry** makes a fresh request; **offline samples** work when network is unavailable; the student can choose offline deliberately.
5. **Copy** produces a newly numbered local task without POSTing tasks to JSONPlaceholder or other public services, with no collision between `api-*`, `offline-*` and local numeric task IDs.
6. Navigation among `/`, `/tasks`, `/ideas` changes the displayed route; an unknown route renders an accessible 404 view with a link home. Back/Forward and direct links behave correctly in local Vite; explain production SPA fallback where applicable.
7. Shared task array survives changing pages and refresh at the same browser origin, using the Week 5 `study-tasks-week2` storage contract. Malformed storage is not silently overwritten.
8. Simulated slow-request/race or unmount demonstrates clean-up; no stale remote response becomes the current page state after Retry or navigation.
9. Actual locally run `npm test` and `npm run build` (when dependencies are installed) are **reported as observed**, including failures; they do not certify mounted React behavior by themselves.
10. Keyboard navigation, visible focus, accessible loading/error messages and a narrow-screen view have been checked manually.
11. Student can explain **HTTP request → API validation → IdeasPage state → App callback → task state → local storage** and correct an unfamiliar bug without AI-generated code.

**Acceptance with no live API:** use deterministic fake responses for success, empty, HTTP 503, malformed payload and network rejection, together with the bundled offline list. A network outage is not an automatic failure.

## 6. Two realistic teaching sessions and independent practice

The original Week 6 guide uses two **90-minute mentor-led sessions** plus **4–6 hours of independent work**. The self-paced Academy must preserve equivalent depth while making guidance self-contained.

### Guided session 1 analogue — effects and API reliability (90 minutes)

| Minutes | Learning activity | Evidence |
|---|---|---|
| 0–10 | Diagnose Week 5 task state and `fetch` knowledge | Explain who owns tasks and why 503 needs `.ok` |
| 10–30 | Read/normalize payload and implement fake-fetch API client | Browser `normalizeIdeas` and HTTP status checks |
| 30–45 | Effect setup/dependencies, no fetch in render | Annotated effect flow |
| 45–65 | Cleanup, aborted requests, stale response race | Local React reproduction and fix |
| 65–80 | Four UI statuses, Retry and offline data | Demonstrated distinct states |
| 80–90 | Code review, recap, next practice | One explained failure and one test result |

### Guided session 2 analogue — routing and state ownership (90 minutes)

| Minutes | Learning activity | Evidence |
|---|---|---|
| 0–10 | Review request lifecycle and cleanup | Short oral trace |
| 10–30 | Configure Router and route pages | `/`, `/tasks`, `/ideas`, `*` work |
| 30–45 | Link/NavLink, keyboard and direct URLs | Navigation and deep-link observation |
| 45–65 | Lift task state above Routes; copy idea locally | Correct shared IDs, no lost tasks |
| 65–78 | Refresh, failure and responsive scenarios | Local acceptance matrix |
| 78–90 | Independent debugging + optional agent review | Failure explanation and next steps |

### Independent 4–6 hour exercise plan

- **60–90 min:** finish API client and mock failure cases; record HTTP 503 vs network rejection vs invalid JSON.
- **60–90 min:** finish effect, four states, Retry and offline switch; practice a slow request and cancellation.
- **60–90 min:** implement Router and lift task ownership; test Copy → Tasks → reload.
- **45–60 min:** run actual local unit tests/build, manual accessibility checks and an unseen no-AI debug scenario.
- **Optional, never gating:** extract `useIdeas`, add a route parameter or review a small agent-generated patch. Do not let the stretch feature replace required evidence.

## 7. Knowledge, debugging and assessment authoring requirements

- Use **11 required quiz groups / 61 planned scored questions**; author actual reviewed items, answer rationales, credible distractors, essential flags and equivalent retry variants in D6. Quiz scoring is **ceil(80%) plus all essential** per DEC-21. Avoid superficial syntax memorization.
- The **two browser-code** suites cover only pure JS `normalizeIdeas` and fake-fetch `fetchIdeas` with controlled fixtures. The sandbox must have **no live network** and no access to Fieldbook progress keys. All mandatory functional assertions pass before auto-unlocking.
- The **ten local self-verification** gates involve genuine React setup, Effects, routing, shared state, storage, manual tests and integrated project proof. They require concrete commands/actions and concise results, not a generic Done button. Do not auto-grade React through text matching.
- Essential checks should target trustworthy data handling, abort/cleanup semantics and **never sending private local tasks to public sample APIs**. Essential flags and precise question wording are **proposed**, not approved item-by-item until D6 authoring review.
- Example bug variants: fetch inside render; missing `.ok`; non-array JSON treated as empty; stale A overwrites B; AbortError shown as a failure; `/` nav permanently active; tasks stored inside a page that unmounts; localStorage port mismatch; unknown route blank; 404 returned by static host before React runs.

## 8. Completion, prerequisite and reset integration

- Required chain: Week 5 graduation → L01 → L02 → … → L12. Prerequisites are stored by **stable IDs**, not inferred from titles.
- Weekly pass requires all **23 mandatory Week 6 checkpoints**, including project `l12-c01`, readiness quiz `l12-c02`, no-AI transfer `l12-c03`. Optional `l11-c02`, `l12-c04` and `l12-c05` never affect scores, unlocks or progress percentages.
- L12 quiz has **10 scored questions → minimum 8 correct + all essential**; each 5-question quiz needs 4 correct, L03 6-question quiz needs 5. Unlimited retries and remedial links; do not revoke previously earned mastery on ordinary retries.
- Course state captures bounded evidence: scored quiz summary, deterministic browser-suite results, and user-recorded local test/build and short explanation. Never store personal file paths, secrets, raw private logs or tokens.
- Formal reset of Week 6 or any prerequisite lesson previews affected Week 6/Week 7+ completions. Import/export must validate IDs and recompute prerequisite eligibility. **Week 7 remains locked** until all Week 6 gates pass.

## 9. D6 implementation and quality-review checklist (NOT executed by this blueprint)

- [ ] Convert every L01–L12 contract to a complete student lesson with reliable code, explanations, hint ladder, examples and misconception feedback.
- [ ] Review each of 61 draft question slots for correctness, ability to explain an answer, essential flags and equivalent retries.
- [ ] Implement **2** pure JS runner suites in the approved sandbox; verify invalid data, 503, malformed JSON, duplicate IDs and abort without external network.
- [ ] Write **10** local project checklists with reproducible commands and non-sensitive evidence; distinguish these clearly from auto-checked work.
- [ ] Independently install, build, run and test the project in an appropriate local environment; cite actual versions/results and do not claim success until observed.
- [ ] Verify routed page mount/unmount, direct-link host fallback, request cleanup, offline fallback, double-copy IDs and corrupted storage warning.
- [ ] Check mobile/keyboard/screen-reader/focus, reduced motion and friendly nontechnical error feedback.
- [ ] Run actual D6 Week 6 learner pilot and record misunderstandings, time/effort observations, retries and defects; don't claim an educational win without observations.
- [ ] Review starter `starter/` for publication/licensing (DEC-18) and exclude all teacher-only C22/C26 and `reference-solution/` from public assets.
- [ ] Obtain a **separate** owner content/release approval after pilot; D0 structural approval alone does not publish lessons or authorize D6.

## 10. Owner D0 structural review questions (structure accepted A-007; content QA pending)

1. Does the **12-lesson, 26-checkpoint** proposal cover each Week 6 learning objective without requiring a paid tool or live public API?
2. Are the boundaries honest: **2 pure-JS automatic checks**, **10 real React local attestations**, **11 quiz sets** and **3 optional challenges**?
3. Is `AbortController` + stale-response protection required as in the Week 6 instructor guide, while custom hooks and route params remain optional?
4. Do `Study Tasks v5` tasks remain safe with the original key and separate remote sample IDs?
5. Is Week 7 backend development clearly separate from this React API-consumption week?
6. Is the Week 6 student-facing experience plausible for two sessions plus 4–6 hours independent practice, allowing extra time for setup?

**Owner-approved A-007:** accepted as a **D0 authoring structure** only; exact future quiz text, test implementation, learner pilot, final total course lesson count, D0, D1 and D2 remain pending.
