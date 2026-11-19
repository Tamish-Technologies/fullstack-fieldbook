# Local Progress, Persistence, Backup and Reset — Design Specification

**Scope:** this is a *data contract design*, not app code. No server calls, remote accounts or sync.

## Storage choices

- Browser `localStorage` for v1 progress metadata, quiz scores, attempt summaries, last visited lesson, theme, bookmarks and *small* notes/drafts.
- Lesson/content files remain bundled static app resources, not copied into progress storage.
- Do not store entire source ZIPs or huge editor sessions in `localStorage`.
- Preserve operation when storage access is denied/disabled/full: show an explicit **not-saving** warning and suggest exporting work while possible; do not falsely show “Saved.”
- Site origin matters; progress on `localhost` or a custom hostname is separate from the hosted site. `file://` localStorage behavior is undefined across browsers. Use a local dev server or HTTPS static hosting.

## Suggested logical record shape (illustrative only)

```
progressRecord
  schemaVersion: 1
  courseId: "phase-1-full-stack"
  contentVersion: "1.0.0"  (course-data version, not app version)
  createdAt: ISO timestamp
  updatedAt: ISO timestamp
  lastLessonId: "p1-w01-l03"
  lessons: {
    "p1-w01-l01": {
      status: "completed-auto" | "completed-self-verified" | "in-progress",
      completedAt: ISO timestamp or null,
      checkpoints: {
        "p1-w01-l01-c01": {
          status: "passed-auto" | "self-verified",
          score: number|null,
          completedAt: ISO timestamp,
          evidenceType: "quiz" | "code" | "manual-tests" | "acknowledged"
        }
      }
    }
  }
  attempts: { "question-or-assessment-id": { count, lastScore, lastAt } }
  bookmarks: [stableLessonId]
  notes: { stableLessonId: smallPlainText }
  smallDrafts: { stableExerciseId: boundedText }
  preferences: { theme, readingSize, reduceMotion }
```

The real implementation should enforce precise types, length caps and allowed IDs. Avoid storing redundant `weekUnlocked` booleans as authoritative state; **derive unlocking from passed requirements**. Serialized record must have a strict maximum size defined during D2.

## Identity and stable IDs

- Source lesson IDs do not change after release without a migration.
- Checkpoint IDs uniquely identify an outcome, not merely screen order.
- If lesson names change, existing earned mastery should remain attached to unchanged IDs.
- Never trust imported IDs that are not in the current course manifest.

## Write and recover behavior

1. Load default empty record or parse stored record.
2. Validate schema and course ID; migrate known older versions.
3. Drop/reject unknown unsafe data according to defined migration policy, showing warnings instead of silently losing progress.
4. Compute unlocked lessons from verified checkpoint data and prerequisite graph.
5. Save atomically by serializing one coherent record; handle exceptions.
6. Debounce large notes/drafts if introduced, but persist assessment completion promptly.
7. When browser tabs both modify progress, detect possible stale data; avoid silent clobber where feasible and document same-browser limitations.

## Export format

Download a UTF-8 JSON file containing **only learner-owned local state**, with: format identifier, schema version, course/content version, export timestamp, the validated progress record. No passwords, tokens, browser history, actual identity or secrets. Filename example: `fullstack-fieldbook-phase1-progress-YYYY-MM-DD.json`.

Import flow:

1. Show privacy/storage explanation and select local file.
2. Enforce file size cap before parsing.
3. Parse and validate schema, course ID, known lesson/checkpoint IDs, and timestamps/data bounds.
4. Preview current and imported completion counts + whether overwrite is required.
5. Offer export of current progress first.
6. Require explicit confirm; replace record in one operation.
7. Recompute gates, verify current/last lesson, show import outcome and any safe migration notes.

Do not run scripts or render markup from imported notes; treat as plain text. Import can be manipulated by user because no server trust anchor is present.

## Reset flows

- **Retry:** clears current attempt/draft if chosen, leaves mastery intact.
- **Lesson reset:** compute transitive dependents and show affected lesson count. Clears those mastery records on confirm.
- **Week reset:** resets selected week and all later weeks; warns about affected notes/drafts if the user chooses to delete them too.
- **Course reset:** defaults to deleting all learning data; preferences may be retained only with clear user choice. Advise export first and require second confirmation for full reset.

## Realistic limitations explained in product UI

- Clearing site data, private windows, changing the browser, site URL or device may erase/separate local progress.
- Export/import is a backup, not continuous synchronization.
- Course progress is self-reported and locally editable; no official independent certification.
- Offline cached content is separate from the progress record; resetting progress should not silently delete the installed PWA assets.

## Tests needed in D2

Corrupt JSON; incompatible schema; blocked storage; quota errors; unknown IDs; malformed scores; direct unlocked-route URL; browser refresh; reset cascade; settings retention; validated import; duplicate checkpoints; renamed lessons; missing lessons; concurrent tab changes (at least warn); and attempt retry without losing earned mastery.


## Week 1 quiz and field-note drafts (D3)

The current local record accepts two optional fields. Earlier Week 1 backups omit them. A quiz draft maps a known active quiz and question ID to a selected choice for its current attempt. The editable field-note draft and the explicitly saved note are separate, each with the same per-note length limit. Reading and storing drafts award no evidence. The development-only content review keeps choices in memory for the open quiz.

Export and import preserve validated drafts. Submitting a quiz consumes its draft when the attempt is recorded. A scoped reset clears affected quiz drafts. The field-note deletion option also controls note drafts. Save commits the note and clears its draft. Discard restores the saved text, including an empty note for a first draft. The existing storage-denied and quota fallback keeps session data exportable.
