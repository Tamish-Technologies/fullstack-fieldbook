# Week 2 Original-Source Traceability and Disposition — D0 Proposal

**Status:** source-inspected Week 2 chapter disposition **owner-approved as D0 structure (A-003)**; student content/test review remains pending.  
**Original private materials:** `../fullstack-fieldbook-source-materials/phase1/week-02/`.  
**Scope:** original **20 numbered instructor chapters**, source Markdown and 8-entry student starter/instructor reference ZIP. Original PDF (39 pages) is a companion artifact; this review used the complete source Markdown and the individual code files, not a new PDF visual audit.

## 1. Actual source artifacts inspected

| Source | Internal path/name | Observed |
|---|---|---|
| Instructor Markdown | `instructor-guide-source.md` | 20 chapters C01–C20; detailed concepts, two 90-minute scripts, 4–6 hour homework, manual QA and quiz/rubric |
| Instructor PDF | `instructor-guide.pdf` | 39 pages according to original verified inventory; not newly visually re-audited |
| Code archive | `code-starter-and-reference.zip` | Eight file entries: student starter and instructor reference each have `index.html`, `styles.css`, `app.js`, `README.md` |
| Student starter | `starter/app.js`, `starter/index.html`, `starter/styles.css`, `starter/README.md` | Week 1 DOM-only baseline; adds/toggles/deletes tasks without persistent data |
| Instructor reference | `reference-solution/app.js`, `reference-solution/index.html`, `reference-solution/styles.css`, `reference-solution/README.md` | Task-object state, render cycle, filters/counts, `localStorage`, malformed-data fallback; **PRIVATE**, do not ship in public student assets |

**SHA-256 of original Week 2 sources:**

```text
instructor-guide-source.md  afbb3ebe4b2473c957caae277cf313ddb89104ae217d99e3927b58a75c12d305
instructor-guide.pdf        4ca3257bfa646f6c93057a1f66c8784fdc7f14f53856ae5f8ef36e3037675d70
code-starter-and-reference.zip d2ea5699334ce82c752bdd77522f8ffbdc5f110d49d8824aecb541f8f7adc0f7
```

Private-source copy verification is limited to these files; paths/checksums do not authorize publishing the original instructor materials.

## 2. Explicit dispositions for all C01–C20

| Chapter | Original focus | Final *proposed* disposition | Student destination / justification |
|---|---|---|---|
| **C01** | Instructor brief, mission, five outcomes, week boundary | **Adapt learner essentials**; keep instructor talk track private | L01 orientation and L11 outcomes; make DOM→state shift explicit |
| **C02** | Setup from Week 1, baseline demonstration, Git checkpoint | **Convert practical onboarding**; omit mentor-preparation prose | L01 prerequisite and L11 starter instructions, L10 local debugging setup |
| **C03** | Arrays, objects, state, `let`/`const`, IDs | **Convert thoroughly** | L01 objects/IDs and L04 source state |
| **C04** | Functions, returns, callbacks, pure helpers | **Convert thoroughly** | L02 functions/validation; L03 reuses pure calculations |
| **C05** | `forEach`, `filter`, `map`, `find`, `reduce`, equality | **Convert thoroughly** | L03; L09 filter/derive counts reinforces |
| **C06** | One source of truth and `render()` | **Convert thoroughly** | L04 architecture, L05 DOM rendering |
| **C07** | Add/toggle/delete by stable ID and form behavior | **Convert thoroughly** | L01, L05, L06; L11 project acceptance |
| **C08** | DOM events, selectors, safe text, focus | **Convert thoroughly** | L07; reinforce L05/L06 |
| **C09** | JSON, `localStorage`, loading/recovery, ID restore | **Convert thoroughly with environment caveats** | L08 sandbox storage mock and L11 actual local reload/storage checks |
| **C10** | All/Active/Completed, remaining count, empty states | **Convert thoroughly** | L09; L11 integration |
| **C11** | Structured debugging and DevTools | **Convert thoroughly** | L10 local debugging lab; L11 regression checks |
| **C12** | AI tutor/reviewer/agent workflow | **Adapt into essential judgement + non-gating enrichment** | L10 reasoning quiz; optional L10-c03 AI exploration |
| **C13** | Mentor Session 1 schedule | **Extract learner activities only** | L01–L06 practice stages; timing/instructor-only coaching stays private |
| **C14** | Mentor Session 2 schedule | **Extract learner activities only** | L08–L11 hands-on labs; timing/instructor-only coaching stays private |
| **C15** | Independent work 4–6 hours, exercises and extension | **Convert applicable exercises** | L03 array drills, L10 debug, L11 project/optional extension |
| **C16** | Student acceptance checklist and test data | **Convert acceptance criteria** | L11-c01 and L11-c03; real local tests are self-reported |
| **C17** | Knowledge checks, instructor answer key, rubric, transfer | **Use to author assessments**; keep complete answer key private | L03/L10/L11 quiz intentions, independent L11 transfer; coach-only grading key not exposed |
| **C18** | Instructor reference architecture walkthrough | **Private reference for authoring/verifying behavior** | L04/L05/L11 source trace; no completed reference code public |
| **C19** | Complete instructor reference code appendix | **Private instructor-only**; extract behavior contracts, not finished solution | L05–L11 checkpoint design; archive/code remains private |
| **C20** | Week 2 handoff and Week 3 transition/resources | **Adapt troubleshooting and short transition** | L11 summary/next week, optional references; mentor script excluded |

**Coverage summary:** all 20 original top-level chapter headings now have explicit proposed dispositions. That does **not** prove every subsection or technical example has been fully authored, executed or learner-tested.

## 3. Reference implementation details that must not be lost

1. **Week 1→2 continuity:** `starter/app.js` is DOM-owned, reload clears tasks. `reference-solution/app.js` uses `let tasks = loadTasks()`, `activeFilter`, `nextId`, data mutations, `saveTasks()` and `render()`. Never describe the starter as already persistent.
2. **Canonical task fields:** `{id:number, title:string, completed:boolean}`; `id` is positive and unique in expected student data. Don't confuse ID with array index.
3. **Storage key (student project):** `study-tasks-week2`. Save task changes with `JSON.stringify()`. Filter choice is UI state and **does not** invoke saving.
4. **Recovery:** guarded `JSON.parse`, top-level `Array.isArray`, filter invalid records, return `[]` on malformed data. Save failure displays a notice rather than crashing interactions.
5. **ID recovery:** `max(valid stored numeric id)+1`, not `tasks.length+1` or reset to 1 after reload. Source README explicitly notes reference **does not** deduplicate duplicate IDs or comprehensively validate hostile data; this is not a production data layer.
6. **Rendering:** `replaceChildren()` then append one item per selected record, title with `.textContent`; state-driven checkbox/label/Delete event wiring.
7. **Filters/count:** `activeFilter` values `all`, `active`, `completed`; filters never destroy `tasks`. Remaining count comes from **all unfinished tasks**, not visible list rows. Two distinct empty messages.
8. **Accessibility:** `type="button"` for filters and Delete, `aria-pressed` on filter buttons, labeled input and checkbox controls, useful form error and storage warning.
9. **Known limits:** no editing/search/sorting, async API, React, backend, SQL, account sync; those appear in later weeks.
10. **Testing origin:** the HTML app may open as a file, but real `localStorage` behavior for `file://` is inconsistent. Provide a localhost fallback. Sandbox storage mocks must remain separate from trusted Fieldbook course-progress data.

## 4. Auditing instruction for future agents

When converting Week 2 into student-facing lessons, cross-check every C## disposition above against the private Markdown/ZIP. Treat instructor code and answers as **private authoring references**, not default student downloads. Run sample code in an appropriate local browser context when implementing D5. Do not use this trace as proof of any executed testing. Maintain Week 1 stable IDs and approved Week 1 educational structure.

**A-003 approves the Week 2 blueprint and checkpoint mapping as a structural baseline only. Actual student content, runnable tests and learner pilot are pending. DEC-19 (final lesson count) remains OPEN.**
