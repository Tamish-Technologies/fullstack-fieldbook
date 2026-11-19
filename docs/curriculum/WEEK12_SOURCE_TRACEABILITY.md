# Week 12 Source Traceability — C01–C45 and 165 Original Code Archive Entries

> **CURRENT AUTHORITATIVE PLANNING STATUS — 2026-11-17:** All 12 weekly educational BLUEPRINT STRUCTURES have owner approval (Week 12 = **A-013**). The D0 **cross-week audit is prepared**, but the owner has **not yet signed off D0**. All learner-ready content, question banks, code runners and pilots remain future work. D1 visual approval and explicit D2 coding authorization are also pending. Historical status notices in this document describe prior snapshots and are superseded by `docs/product/D0_OWNER_SIGNOFF.md` and `docs/product/D0_APPROVAL_LOG.md`.


**Original source:** `fullstack-fieldbook-source-materials/phase1/week-12/instructor-guide-source.md` + `code-starter-and-reference.zip` and PDF. **D0 structural owner approval A-013 recorded 2026-11-17.** The 45 chapter headings and 165 ZIP entries below are actual source inventory, not statements that code ran. Week 11 is structurally approved A-012; Week 12 structural approval A-013 recorded; no code or learner pilot executed.

## 1. Chapter-by-chapter disposition

| Chapter | Original heading | Student lesson mapping / privacy disposition |
|---|---|---|
| C01 | The mission: prove independent, AI-assisted full-stack ability | L01 |
| C02 | Entry check: establish that the Week 11 baseline works | L01 |
| C03 | Capstone brief: Task Planning v12 | L01 |
| C04 | Scope control: minimum, recommended and stretch | L01 |
| C05 | Definition of done: observable acceptance criteria | L01 |
| C06 | Deliverables: what your cousin hands in | L01 |
| C07 | Follow one request through the stack | L02 |
| C08 | Work safely: branch, commit, diff and rollback | L02 |
| C09 | How AI is used during the capstone | L02 |
| C10 | Write real user stories, not implementation checklists | L03 |
| C11 | Break work into reviewable engineering tasks | L03 |
| C12 | Database migration: additive changes, not destructive resets | L04 |
| C13 | Calendar dates, timestamps and time zones | L04 |
| C14 | Define the API contract before writing the form | L05 |
| C15 | Backend validation: never trust the React form | L05 |
| C16 | Repository: parameterized SQL and ownership every time | L06 |
| C17 | The API client: check both status and data shape | L06 |
| C18 | React: controlled forms and accessible labels | L07 |
| C19 | React state after mutations: server remains the authority | L07 |
| C20 | Pure date functions and dashboard summaries | L08 |
| C21 | Design the tests before implementing everything | L09 |
| C22 | Backend validation tests: arrange, act, assert | L09 |
| C23 | Repository tests: inspect the SQL contract | L09 |
| C24 | HTTP and two-account authorization checks | L09 |
| C25 | Real PostgreSQL tests and safe migration verification | L09 |
| C26 | Browser smoke testing: complete human workflow | L09 |
| C27 | Debugging lab: use hypotheses, not random edits | L10 |
| C28 | Security review and AI-generated code risks | L10 |
| C29 | Accessibility, UX and the edge cases users notice | L10 |
| C30 | Release readiness: “tests pass” is not the whole story | L10 |
| C31 | AI agent prompts: good scopes and evaluation | L10 |
| C32 | Mentoring session A: full 90-minute run of show | L11 — convert mentor session schedules and instructor prompts to self-paced guidance |
| C33 | Session A: teach-from dialogue and misconception checks | L11 — convert mentor session schedules and instructor prompts to self-paced guidance |
| C34 | Mentoring session B: full 90-minute run of show | L11 — convert mentor session schedules and instructor prompts to self-paced guidance |
| C35 | Session B: teach-from dialogue and live assessment | L11 — convert mentor session schedules and instructor prompts to self-paced guidance |
| C36 | Independent practice: four to six hours, with checkpoints | L11 — convert mentor session schedules and instructor prompts to self-paced guidance |
| C37 | Ten debugging labs: symptom, task, acceptance criteria | L11 |
| C38 | Oral knowledge check: 20 questions | L11 — disclose self-assessment limitations; never certify or auto-score oral exam |
| C39 | Instructor answer key: tests, labs and misconceptions | L11 — **INSTRUCTOR ANSWER KEY: never ship, rewrite misconception feedback independently** |
| C40 | Phase 1 final assessment rubric: 100 points | L11 — disclose self-assessment limitations; never certify or auto-score oral exam |
| C41 | Final demo and release report template | L11 — disclose self-assessment limitations; never certify or auto-score oral exam |
| C42 | Phase 1 exit interview and Phase 2 readiness | L11 — disclose self-assessment limitations; never certify or auto-score oral exam |
| C43 | Transition plan: Phase 2 should test genuine autonomy | L11 — disclose self-assessment limitations; never certify or auto-score oral exam |
| C44 | Instructor solution guide: where the key code lives | L11 — **PRIVATE REFERENCE CODE: never ship answer source to students** |
| C45 | Instructor command reference, troubleshooting and resources | L11 — check actual CLI commands before release; no credentials |

## 2. Source archive clusters and publication rules

| Archive group | Source purpose | Public app policy |
|---|---|---|
| `student-starter/CAPSTONE_BRIEF.md`, `EVIDENCE_LOG.md`, `AI_WORK_LOG.md`, `RELEASE_REPORT.md` | Independent planning and bounded evidence templates | Rewrite as safe student-facing downloadable templates; never bundle secrets |
| `student-starter/STUDENT_EXERCISES.md` | A01–A10, milestone instructions | Adapt into self-paced steps with honesty labels |
| `student-starter/backend/migrations/003_add_planning_fields.sql` | Unfinished safe-migration exercise | Provide TODO-only starter where publication rights allow; never include private answer |
| `student-starter/backend/src/validation.js`, `task-repository.js`, `tests/planning.test.mjs` | Priority/date contract and security verification | Local project exercise/test plan, not browser-graded API security |
| `student-starter/frontend/src/lib/planning.js`, `src/components/TaskForm.jsx`, `TaskItem.jsx`, `tests/planning.test.mjs` | Pure date helpers and React form implementation | Synthetic pure-JS cases may be separately rewritten for isolated browser checks; React remains local |
| `student-starter/backend/.env.example` | Environment shape only | Replace connection strings/secret values with neutral placeholders; never ingest actual secrets |
| `reference-solution/**` | Instructor correctness baseline | **PRIVATE; never serve as app assets or default student downloads** |
| Original instructor source chapters C39/C44 | Answers and complete reference code | **PRIVATE; student-facing text must not reveal answers upfront** |

The overall learning platform runs in a static browser; *students'* app still has backend, database and session tests. Do not mislabel those local tests as automated verification by the academy.

## 3. Cross-week technical and security boundaries

- Inherited auth/session ownership from Week 10 remains enforced in all new repository operations; changing task metadata must not break separation between fictional users.
- Preserve Week 11 reliability/reporting and safe `_test` database rules. Do not run destructive SQL against an uncertain target.
- Build an additive `user_tasks` migration with priority default medium and optional DATE; do not drop users, sessions or tasks.
- `dueDate` omitted versus explicit null on PATCH is an essential negative-test pair; use true date validation including leap-day behavior.
- Optional dashboard counters must not cause lesson locks or require new DB columns.
- Original reference test counts are historical authoring notes, **not** proof that Fieldbook has executed Week 12 code or verified a learner's deployment.

## 4. Remaining review work

- [ ] Compare source Markdown/PDF if an ambiguity arises.
- [ ] Produce/review 66 questions, distractors and equivalent retries and flag essential items.
- [ ] Implement/review isolated runner and synthetic date tests later after D4 authorization.
- [ ] Test commands, migration, privacy and reporting against actual student starter locally at curriculum implementation time.
- [ ] Run a novice self-paced pilot, review rubric honesty and non-compensatory safety gates.
- [ ] Resolve cross-week D0 final coverage, DEC-19 eventual lesson count and publication rights DEC-18 before release.

**Trace result:** all **45/45** numbered original chapters and **165/165** ZIP paths inventoried; trace != lesson content or executed test evidence.

## 5. Complete private source archive path inventory

All paths below remain private source references, except any explicitly reviewed student starter materials chosen for public adaptation.

```text
START_HERE.md
INSTRUCTOR_NOTES.md
student-starter/AI_WORK_LOG.md
student-starter/INSTRUCTOR_NOTES.md
student-starter/START_HERE.md
student-starter/CAPSTONE_BRIEF.md
student-starter/EVIDENCE_LOG.md
student-starter/RELEASE_REPORT.md
student-starter/.gitignore
student-starter/STUDENT_EXERCISES.md
student-starter/frontend/README.md
student-starter/frontend/package.json
student-starter/frontend/vite.config.js
student-starter/frontend/index.html
student-starter/frontend/.gitignore
student-starter/backend/README.md
student-starter/backend/.env.example
student-starter/backend/package.json
student-starter/backend/API_REQUESTS.http
student-starter/backend/.gitignore
student-starter/backend/tests/public-errors.test.mjs
student-starter/backend/tests/preview-api.test.mjs
student-starter/backend/tests/validation.test.mjs
student-starter/backend/tests/csrf.test.mjs
student-starter/backend/tests/planning.test.mjs
student-starter/backend/tests/request-log.test.mjs
student-starter/backend/tests/auth-api.test.mjs
student-starter/backend/tests/db.test.mjs
student-starter/backend/tests/ownership.test.mjs
student-starter/backend/tests/spa-policy.test.mjs
student-starter/backend/tests/repository.test.mjs
student-starter/backend/tests/api.test.mjs
student-starter/backend/tests/config.test.mjs
student-starter/backend/tests/auth-validation.test.mjs
student-starter/backend/migrations/003_add_planning_fields.sql
student-starter/backend/migrations/002_create_users_sessions_and_user_tasks.sql
student-starter/backend/migrations/001_create_tasks.sql
student-starter/backend/src/config.js
student-starter/backend/src/auth-validation.js
student-starter/backend/src/passwords.js
student-starter/backend/src/db.js
student-starter/backend/src/app.js
student-starter/backend/src/validation.js
student-starter/backend/src/auth-repository.js
student-starter/backend/src/session.js
student-starter/backend/src/task-repository.js
student-starter/backend/src/request-log.js
student-starter/backend/src/static-web.js
student-starter/backend/src/csrf.js
student-starter/backend/src/public-errors.js
student-starter/backend/src/spa-policy.js
student-starter/backend/src/server.js
student-starter/backend/sql/sql-lab.sql
student-starter/backend/scripts/migrate.js
student-starter/backend/tests/helpers/memory-repository.js
student-starter/backend/tests/helpers/fake-auth-state.mjs
student-starter/frontend/tests/task-logic.test.mjs
student-starter/frontend/tests/task-api.test.mjs
student-starter/frontend/tests/friendly-error.test.mjs
student-starter/frontend/tests/planning.test.mjs
student-starter/frontend/tests/auth-api.test.mjs
student-starter/frontend/tests/ideas-api.test.mjs
student-starter/frontend/src/App.jsx
student-starter/frontend/src/main.jsx
student-starter/frontend/src/styles.css
student-starter/frontend/src/hooks/useAuth.js
student-starter/frontend/src/hooks/useServerTasks.js
student-starter/frontend/src/components/TaskList.jsx
student-starter/frontend/src/components/TaskToolbar.jsx
student-starter/frontend/src/components/TaskForm.jsx
student-starter/frontend/src/components/TaskItem.jsx
student-starter/frontend/src/pages/DashboardPage.jsx
student-starter/frontend/src/pages/TasksPage.jsx
student-starter/frontend/src/pages/AuthPage.jsx
student-starter/frontend/src/pages/NotFoundPage.jsx
student-starter/frontend/src/pages/ServerPage.jsx
student-starter/frontend/src/pages/IdeasPage.jsx
student-starter/frontend/src/lib/auth-api.js
student-starter/frontend/src/lib/storage.js
student-starter/frontend/src/lib/friendly-error.js
student-starter/frontend/src/lib/ideas-api.js
student-starter/frontend/src/lib/sample-ideas.js
student-starter/frontend/src/lib/task-logic.js
student-starter/frontend/src/lib/task-api.js
student-starter/frontend/src/lib/planning.js
reference-solution/INSTRUCTOR_NOTES.md
reference-solution/INSTRUCTOR_REFERENCE.md
reference-solution/START_HERE.md
reference-solution/EXAMPLE_EVIDENCE_NOT_ACTUAL.md
reference-solution/.gitignore
reference-solution/frontend/README.md
reference-solution/frontend/package.json
reference-solution/frontend/vite.config.js
reference-solution/frontend/index.html
reference-solution/frontend/.gitignore
reference-solution/backend/README.md
reference-solution/backend/.env.example
reference-solution/backend/package.json
reference-solution/backend/API_REQUESTS.http
reference-solution/backend/.gitignore
reference-solution/backend/tests/public-errors.test.mjs
reference-solution/backend/tests/preview-api.test.mjs
reference-solution/backend/tests/validation.test.mjs
reference-solution/backend/tests/csrf.test.mjs
reference-solution/backend/tests/planning.test.mjs
reference-solution/backend/tests/request-log.test.mjs
reference-solution/backend/tests/auth-api.test.mjs
reference-solution/backend/tests/db.test.mjs
reference-solution/backend/tests/ownership.test.mjs
reference-solution/backend/tests/spa-policy.test.mjs
reference-solution/backend/tests/repository.test.mjs
reference-solution/backend/tests/api.test.mjs
reference-solution/backend/tests/config.test.mjs
reference-solution/backend/tests/auth-validation.test.mjs
reference-solution/backend/migrations/003_add_planning_fields.sql
reference-solution/backend/migrations/002_create_users_sessions_and_user_tasks.sql
reference-solution/backend/migrations/001_create_tasks.sql
reference-solution/backend/src/config.js
reference-solution/backend/src/auth-validation.js
reference-solution/backend/src/passwords.js
reference-solution/backend/src/db.js
reference-solution/backend/src/app.js
reference-solution/backend/src/validation.js
reference-solution/backend/src/auth-repository.js
reference-solution/backend/src/session.js
reference-solution/backend/src/task-repository.js
reference-solution/backend/src/request-log.js
reference-solution/backend/src/static-web.js
reference-solution/backend/src/csrf.js
reference-solution/backend/src/public-errors.js
reference-solution/backend/src/spa-policy.js
reference-solution/backend/src/server.js
reference-solution/backend/sql/sql-lab.sql
reference-solution/backend/scripts/migrate.js
reference-solution/backend/tests/helpers/memory-repository.js
reference-solution/backend/tests/helpers/fake-auth-state.mjs
reference-solution/frontend/tests/task-logic.test.mjs
reference-solution/frontend/tests/task-api.test.mjs
reference-solution/frontend/tests/friendly-error.test.mjs
reference-solution/frontend/tests/planning.test.mjs
reference-solution/frontend/tests/auth-api.test.mjs
reference-solution/frontend/tests/ideas-api.test.mjs
reference-solution/frontend/src/App.jsx
reference-solution/frontend/src/main.jsx
reference-solution/frontend/src/styles.css
reference-solution/frontend/src/hooks/useAuth.js
reference-solution/frontend/src/hooks/useServerTasks.js
reference-solution/frontend/src/components/TaskList.jsx
reference-solution/frontend/src/components/TaskToolbar.jsx
reference-solution/frontend/src/components/TaskForm.jsx
reference-solution/frontend/src/components/TaskItem.jsx
reference-solution/frontend/src/pages/DashboardPage.jsx
reference-solution/frontend/src/pages/TasksPage.jsx
reference-solution/frontend/src/pages/AuthPage.jsx
reference-solution/frontend/src/pages/NotFoundPage.jsx
reference-solution/frontend/src/pages/ServerPage.jsx
reference-solution/frontend/src/pages/IdeasPage.jsx
reference-solution/frontend/src/lib/auth-api.js
reference-solution/frontend/src/lib/storage.js
reference-solution/frontend/src/lib/friendly-error.js
reference-solution/frontend/src/lib/ideas-api.js
reference-solution/frontend/src/lib/sample-ideas.js
reference-solution/frontend/src/lib/task-logic.js
reference-solution/frontend/src/lib/task-api.js
reference-solution/frontend/src/lib/planning.js
```
