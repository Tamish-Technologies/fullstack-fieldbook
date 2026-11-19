# Week 6 Assessment Item, Feedback and Retry Plan — D0 Structure Approved A-007; Items Not Yet Authored

**Status:** **61 question slots**, **11 required quiz groups**, plus **2 proposed plain-JS browser suites** and **10 local React attestations**. Item wording, essential-item decisions, runnable sandbox tests and local environment verification are *not complete*.

## A. Scoring method (approved DEC-12/DEC-21)

- `quiz-auto` requires **ceil(0.8 × scored required items)** AND every separately designated **essential** item correct.
- 5 questions → 4 correct; 6 → 5 correct; 10 → 8 correct, in each case with all essential flags satisfied.
- Unlimited retries. Review wrong-answer misconception, offer progressively stronger hints, and provide equivalent variant problems to avoid click memorization.
- Non-essential examples, reference docs, optional AI use and enrichment never change mandatory pass status. Do not save actual learner task titles or private logs to assessment evidence.

## B. Question-slot matrix (all proposals; author during D6)

| Quiz checkpoint | Planned items | Minimum score | Coverage and required reasoning | Suggested essential target |
|---|---:|---:|---|---|
| `p1-w06-l01-c01` | 5 | 4/5 plus essential | response.ok vs transport failure; JSON parse/shape; normalized IDs/title; why local tasks are separate | Never treat raw unvalidated network data as trusted task records |
| `p1-w06-l02-c01` | 5 | 4/5 plus essential | render/event/Effect categorization; reactive dependencies; Strict Mode; redundant derived state | Do not perform a new fetch on every render |
| `p1-w06-l03-c01` | 6 | 5/6 plus essential | async outer callback problem; cleanup; AbortError; stale response ordering; dependency changes | Obsolete request results must not overwrite current UI |
| `p1-w06-l04-c01` | 5 | 4/5 plus essential | loading/success/empty/error distinct; roles/status; recovery options; valid-empty vs malformed | HTTP/parsing errors are not successful empty results |
| `p1-w06-l05-c01` | 5 | 4/5 plus essential | Retry signal; offline data; local copy callback; distinct remote/local IDs; no POST | Never upload student task list to external sample API |
| `p1-w06-l06-c01` | 5 | 4/5 plus essential | BrowserRouter; Routes; Route; client vs server; wildcard | A client route is not an Express API endpoint |
| `p1-w06-l07-c01` | 5 | 4/5 plus essential | Link vs NavLink; root end; active aria-current; keyboard; host fallback | A host HTTP 404 differs from React NotFound route |
| `p1-w06-l08-c01` | 5 | 4/5 plus essential | App state ownership; page unmount; functional updater; dashboard derived counts; local page state | Shared tasks cannot be owned by an unmounting page |
| `p1-w06-l09-c01` | 5 | 4/5 plus essential | same origin/storage key; reload vs navigation; malformed storage; independent Academy storage | Do not overwrite unreadable saved tasks without warning |
| `p1-w06-l11-c01` | 5 | 4/5 plus essential | bounded AI task; Git diff review; false claims; secret safety; evidence | Review actual diff and tests instead of trusting tool assertions |
| `p1-w06-l12-c02` | 10 | 8/10 plus essential | complete async + route + local storage data flow, security and debugging transfer | Correctness of shared task ownership, data boundary and cleanup |

**Note:** Essential targets are **recommendations only**. Their exact question IDs and answer rationales are not yet finalized or individually approved. Do not silently turn every question into an essential item. Write at least one applied “what happens next?” or “what would you debug?” item per group rather than exclusively term definitions.

## C. Detailed item-writing plan

### Quiz `p1-w06-l01-c01` — 5 proposed item concepts

1. **Q01-01:** Explain why a resolved `fetch` response may still be HTTP 503.
2. **Q01-02:** Predict normalization for trimmed title and prefixed ID.
3. **Q01-03:** Classify valid `[]` versus malformed `{items:[]}`.
4. **Q01-04:** Identify why duplicate remote IDs need deduplication.
5. **Q01-05:** Identify safe JSX text rendering versus HTML injection.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l02-c01` — 5 proposed item concepts

1. **Q02-01:** Classify event handler, Effect and derived render calculation.
2. **Q02-02:** Predict dependencies when `source` changes.
3. **Q02-03:** Explain no dependency list versus `[]`.
4. **Q02-04:** Identify repeated fetch in render.
5. **Q02-05:** Explain Strict Mode extra setup+cleanup.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l03-c01` — 6 proposed item concepts

1. **Q03-01:** Explain why Effect callback must not be async.
2. **Q03-02:** Trace request A slow / request B fast.
3. **Q03-03:** Interpret deliberate AbortError.
4. **Q03-04:** Identify cleanup timing.
5. **Q03-05:** Choose correct reactive dependencies.
6. **Q03-06:** Distinguish cancellation from ignored results.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l04-c01` — 5 proposed item concepts

1. **Q04-01:** Distinguish loading from empty before response.
2. **Q04-02:** Map success nonempty.
3. **Q04-03:** Map valid empty array.
4. **Q04-04:** Map HTTP 503 and malformed JSON as error.
5. **Q04-05:** Choose accessible recovery UI.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l05-c01` — 5 proposed item concepts

1. **Q05-01:** Predict `retryKey` change.
2. **Q05-02:** Explain bundled offline fallback.
3. **Q05-03:** Trace add idea → App → local task.
4. **Q05-04:** Identify unsafe POST of local tasks.
5. **Q05-05:** Predict two copies make two unique IDs.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l06-c01` — 5 proposed item concepts

1. **Q06-01:** Map `/` to Dashboard.
2. **Q06-02:** Map `/tasks` to TasksPage.
3. **Q06-03:** Map `/ideas` to IdeasPage.
4. **Q06-04:** Explain `*` route.
5. **Q06-05:** Differentiate client route from backend endpoint.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l07-c01` — 5 proposed item concepts

1. **Q07-01:** Compare Link to NavLink.
2. **Q07-02:** Explain root route end matching.
3. **Q07-03:** Identify keyboard link semantics.
4. **Q07-04:** Interpret refresh deep link host HTTP 404.
5. **Q07-05:** Trace Back/Forward.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l08-c01` — 5 proposed item concepts

1. **Q08-01:** Predict state lost when TasksPage unmounts.
2. **Q08-02:** Select App as shared state owner.
3. **Q08-03:** Explain functional updater for quick adds.
4. **Q08-04:** Choose page-local loading state.
5. **Q08-05:** Avoid duplicate remainingCount state.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l09-c01` — 5 proposed item concepts

1. **Q09-01:** Predict what reload changes.
2. **Q09-02:** Explain same-origin storage across ports.
3. **Q09-03:** Handle unreadable JSON without silent overwrite.
4. **Q09-04:** Preserve `study-tasks-week2`.
5. **Q09-05:** Distinguish Fieldbook progress storage from student task app.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l11-c01` — 5 proposed item concepts

1. **Q11-01:** Find unsafe fetch in render in proposed agent diff.
2. **Q11-02:** Find dropped response.ok check.
3. **Q11-03:** Explain why agent test claim needs observation.
4. **Q11-04:** Choose minimal bounded patch scope.
5. **Q11-05:** Avoid sharing credentials/private files.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

### Quiz `p1-w06-l12-c02` — 10 proposed item concepts

1. **Q12-01:** Walk through opening Ideas and request Effect.
2. **Q12-02:** Explain status/normalize/errors.
3. **Q12-03:** Explain Retry and abort.
4. **Q12-04:** Explain offline fallback.
5. **Q12-05:** Trace Copy to new numeric local ID.
6. **Q12-06:** Explain App shared task ownership.
7. **Q12-07:** Explain navigation and wildcard.
8. **Q12-08:** Explain persistence and origin.
9. **Q12-09:** Distinguish mock tests vs mounted React test.
10. **Q12-10:** Identify first debugging step on unseen failure.

**Review rule:** create a correct-answer explanation, at least two credible wrong-answer rationales, prerequisite link, source C## citation, and alternate scenario for retries.

## D. Browser-code fixtures (write actual tests during D6)

- `p1-w06-l01-c02`: `normalizeIdeas` with array/non-array, positive safe integer and prefixed ID, duplicate/blank/invalid/101-char, exactly 100-char, completed strict boolean, read-only input and HTML-looking data. All mandatory behavior assertions pass. **No React runtime**.
- `p1-w06-l10-c01`: injected fake `fetchIdeas` with success, HTTP 503, wrong JSON shape, rejected network request, `AbortError`, injected signal and URL. All mandatory behavior assertions pass in a **network-disabled isolated** harness. No request to a live public endpoint.

Do not distribute reference implementation as test fixture; use private test-owned cases and bounded learner-friendly feedback. Verify sandbox permissions/isolation before enabling the runner.

## E. Locally observed/self-attested checks (10; actual project, not browser auto-tests)

- L03-c02: running Effect with cleanup, local race/cancel test.
- L04-c02: four honest API UI states and accessible status messages.
- L05-c02: Retry, bundled offline data, Copy to new local task IDs with no POST.
- L06-c02: Router with dashboard/tasks/ideas/not-found views.
- L07-c02: NavLink active state, keyboard and deep-link/refresh behavior.
- L08-c02: tasks persist across route unmount and quick multiple additions.
- L09-c02: same-origin task persistence, storage error safety.
- L10-c02: real local API-client tests, network diagnostics and fail/fix notes.
- L12-c01: full project acceptance, `npm test` and `npm run build` observed.
- L12-c03: unseen bug reproduction/root cause/fix/regression **without AI-generated solution**.

Each local record says **Self-verified locally**, not verified by FullStack Fieldbook. A development agent must not invent passing build/test output for the learner.

## F. Misconception feedback matrix

| Wrong reasoning | Feedback should explain | Remediation |
|---|---|---|
| `fetch` rejects on 503 automatically | fetch Promise generally resolves with non-OK Response | Inspect `response.ok` and status |
| Non-array JSON is equivalent to empty array | valid JSON may violate the expected schema | Normalize/validate before rendering |
| Fetch in component render is fine | render repeats, creating repeated network requests | Move external synchronization to Effect |
| Abort is a server failure | cleanup intentionally retires obsolete work | Ignore `AbortError` in UI |
| First response to arrive is always current | older requests can resolve after newer results | Abort/guard stale results |
| `remaining` needs its own Effect and state | derived value can be calculated during render | Recompute from `tasks` |
| Route `/ideas` is a backend route | it selects frontend page UI | Compare route to HTTP endpoint |
| New task ID should be `api-17` | remote example ID is not learner-owned task ID | Generate new numeric local ID |
| Saved tasks appear on every localhost port | localStorage is origin-specific | Inspect scheme/host/port and key |
| All 36 reference tests prove UI works | helper tests are not mounted React/browser tests | Real local manual UI/build evidence |
| AI says “tested”, so it passed | a claim isn't an observed result | Run commands yourself, inspect diff |

## G. Future authoring/verification signoff

- [ ] Write/review 61 scored questions, essential flags, equivalent retry variants and rationales.
- [ ] Validate all network-specific scenarios with offline/controlled fixtures; never require public uptime.
- [ ] Execute pure-JS sandbox suites and negative cases; independently test no network or Academy storage access.
- [ ] Check 10 project worksheets can be performed from the exact student starter and supported local tooling.
- [ ] Verify no private C22/C26 answer appendix or `reference-solution/` content in student downloads.
- [ ] Run D6 learner pilot and record outcomes before advertising Week 6 as validated.

**No actual quiz bank, runner, build, network test or pilot is included in this planning document.**
