import { useRef, useState } from 'react'
import { Download, Upload, RotateCcw } from 'lucide-react'
import { entry, lessons, weeks } from './course'
import { MAX_FILE, exportBackup, inspectBackup } from './backup'
import {
  evaluate,
  resetPlan,
  type Progress,
  type ResetScope,
  type Theme,
} from './learning'
import type { ProgressStore } from './store'
import { Dialog } from './components/Dialog'
import { OfflineCourse } from './components/OfflineCourse'

function download(text: string, name: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: 'application/json' }),
  )
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
function backup(p: Progress) {
  download(
    exportBackup(p),
    'fullstack-fieldbook-progress-backup-' +
      new Date().toISOString().slice(0, 10) +
      '.json',
  )
}
function quantity(n: number, name: string) {
  return n + ' ' + name + (n === 1 ? '' : 's')
}
function summary(p: Progress) {
  return [
    quantity(evaluate(p).complete.size, 'completed lesson'),
    quantity(p.evidence.length, 'checkpoint'),
    quantity(Object.keys(p.notes).length, 'field note'),
    quantity(Object.keys(p.attempts).length, 'quiz attempt summary'),
    quantity(Object.keys(p.noteDrafts ?? {}).length, 'note draft'),
    quantity(Object.keys(p.practicalDrafts ?? {}).length, 'practical draft'),
    quantity(Object.keys(p.quizDrafts ?? {}).length, 'quiz draft'),
  ].join(', ')
}
type NoticeArea = 'backup' | 'reset' | 'appearance'
type Preview = {
  area: 'backup' | 'reset'
  before: Progress
  next: Progress
  title: string
  summary: string
  full: boolean
  recover: boolean
  sessionOnlyAllowed?: boolean
}
export function Settings({
  store,
  record,
}: {
  store: ProgressStore
  record: Progress
}) {
  const [kind, setKind] = useState<ResetScope['kind']>('lesson')
  const [lesson, setLesson] = useState(record.lastLessonId ?? entry.id)
  const [week, setWeek] = useState('01')
  const [clearNotes, setClearNotes] = useState(false)
  const [keepTheme, setKeepTheme] = useState(false)
  const [preview, setPreview] = useState<Preview | null>(null)
  const [second, setSecond] = useState(false)
  const [busy, setBusy] = useState(false)
  const [pendingTheme, setPendingTheme] = useState<Theme | null>(null)
  const [message, setMessage] = useState<{ area: NoticeArea; text: string } | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const fileSequence = useRef(0)
  const recovery = store.recovery()
  function show(p: Preview, from: HTMLElement | null) {
    trigger.current = from
    setMessage(null)
    setSecond(false)
    setPreview({
      ...p,
      sessionOnlyAllowed: store.getSnapshot().phase === 'session',
    })
  }
  function prepareReset(from: HTMLElement) {
    fileSequence.current++
    const scope: ResetScope =
      kind === 'course'
        ? { kind }
        : { kind, id: kind === 'week' ? week : lesson }
    const plan = resetPlan(record, scope, clearNotes, keepTheme)
    const name =
      kind === 'course'
        ? 'the entire course'
        : kind === 'week'
          ? 'Week ' + week
          : lessons.find((l) => l.id === lesson)!.title
    show(
      {
        area: 'reset',
        before: record,
        next: plan.next,
        title: 'Reset ' + name + '?',
        full: kind === 'course',
        recover: kind === 'course',
        summary:
          quantity(plan.affected.size, 'lesson slot') +
          ' in scope, including dependents. Clears ' +
          quantity(plan.completed, 'completed lesson') +
          ', ' +
          quantity(plan.removed, 'checkpoint record') +
          ' and ' +
          quantity(plan.notes, 'field note') +
          '. ' +
          (kind === 'course' && !keepTheme
            ? 'Theme returns to System.'
            : 'Your theme is retained.') +
          ' Removes ' +
          quantity(
            Object.keys(record.attempts).length -
              Object.keys(plan.next.attempts).length,
            'quiz attempt summary',
          ) +
          ', ' +
          quantity(
            Object.keys(record.quizDrafts ?? {}).length -
              Object.keys(plan.next.quizDrafts ?? {}).length,
            'quiz draft',
          ) +
          ', ' +
          quantity(
            Object.keys(record.practicalDrafts ?? {}).length -
              Object.keys(plan.next.practicalDrafts ?? {}).length,
            'practical draft',
          ) +
          ' and ' +
          quantity(
            Object.keys(record.noteDrafts ?? {}).length -
              Object.keys(plan.next.noteDrafts ?? {}).length,
            'note draft',
          ) +
          '.',
      },
      from,
    )
  }
  async function prepareImport(file: File) {
    const sequence = ++fileSequence.current
    setMessage(null)
    try {
      if (file.size > MAX_FILE)
        throw Error('Backup exceeds the 512 KiB file limit.')
      const { progress: next, exportedAt, sourceVersion } = inspectBackup(await file.text())
      if (sequence !== fileSequence.current) return
      const before = store.getSnapshot().record
      const date = new Date(exportedAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
      const upgradeNote =
        sourceVersion === 'd2.1'
          ? ' This foundation backup carries forward notes and preferences only. Demo passes are excluded.'
          : sourceVersion !== next.contentVersion
            ? ' Earned quiz credit carries forward. Review any unfinished quiz where questions have changed.'
            : ''
      show(
        {
          area: 'backup',
          before,
          next,
          title: 'Replace local progress?',
          full: false,
          recover: true,
          summary:
            'Current: ' +
            summary(before) +
            '. Backup: ' +
            summary(next) +
            '. Exported ' + date +
            '. Restoring also replaces this browser’s theme, resume location, notes, and drafts.' +
            upgradeNote,
        },
        fileInput.current,
      )
    } catch (e) {
      if (sequence === fileSequence.current)
        setMessage({
          area: 'backup',
          text: 'Backup could not be opened. Your progress is unchanged. ' +
            (e instanceof Error ? e.message : 'Try a FullStack Fieldbook backup.'),
        })
    }
  }
  async function confirm() {
    if (!preview || busy) return
    if (preview.full && !second) {
      setSecond(true)
      return
    }
    setBusy(true)
    try {
      await store.update(
        () => preview.next,
        preview.before,
        preview.recover,
        preview.sessionOnlyAllowed,
      )
      setMessage({
        area: preview.area,
        text: store.getSnapshot().phase === 'session'
          ? 'Progress updated in this tab only. Export to keep it.'
          : preview.area === 'backup'
            ? 'Progress updated. Your backup was restored.'
            : 'Progress updated. Resume and prerequisites have been recalculated.',
      })
    } catch (e) {
      setMessage({
        area: preview.area,
        text: e instanceof Error ? e.message : 'Could not update progress.',
      })
    } finally {
      setPreview(null)
      setBusy(false)
    }
  }
  function changeTheme(theme: Theme) {
    setPendingTheme(theme)
    void store
      .update((p) => ({ ...p, theme }))
      .catch((e) => setMessage({ area: 'appearance', text: e.message }))
      .finally(() =>
        setPendingTheme((current) => (current === theme ? null : current)),
      )
  }
  return (
    <>
      <p className="eyebrow">Learning space / Preferences</p>
      <h1>Settings</h1>
      <p className="lead">
        Manage this browser’s reading preferences and learning record.
      </p>
      <section className="panel">
        <h2>Appearance</h2>
        <fieldset className="choices">
          <legend>Reading theme</legend>
          {(['system', 'light', 'dark'] as const).map((t) => (
            <label key={t}>
              <input
                type="radio"
                name="theme"
                checked={(pendingTheme ?? record.theme) === t}
                onChange={() => changeTheme(t)}
              />{' '}
              {t}
            </label>
          ))}
        </fieldset>
        {message?.area === 'appearance' && <p role="status" className="notice">{message.text}</p>}
      </section>
      <OfflineCourse />
      <section className="panel" aria-labelledby="backup-heading">
        <h2 id="backup-heading">Backup & restore</h2>
        <p>
          Progress lives on this browser and site address. Clearing site data
          can erase it. Backups include your field notes and drafts. Save the
          JSON file somewhere private, and import it to move progress to
          another browser.
        </p>
        <div className="actions">
          <button onClick={() => backup(record)}>
            <Download /> Export backup
          </button>
          <label className="secondary file">
            <Upload /> Import backup
            <input
              aria-label="Import backup"
              aria-describedby="backup-file-help"
              type="file"
              accept=".json,application/json"
              ref={fileInput}
              onChange={(e) => {
                const file = e.target.files?.[0]
                e.target.value = ''
                if (file) void prepareImport(file)
              }}
            />
          </label>
        </div>
        <p className="small" id="backup-file-help">
          Choose a Fieldbook backup up to 512 KiB. You’ll see a preview before
          it replaces this browser’s progress.
        </p>
        {message?.area === 'backup' && <p role="status" className="notice">{message.text}</p>}
        {recovery !== null && (
          <>
            <p>The recovery copy contains the unreadable record. Choose a valid
              backup to restore saved progress.</p>
            <button
              className="secondary"
              onClick={() =>
                download(recovery, 'fullstack-fieldbook-recovery.json')
              }
            >
              Download original recovery copy
            </button>
          </>
        )}
      </section>
      <section className="panel">
        <h2>Reset progress</h2>
        <p>
          Review and retry preserve earned mastery. A reset clears the selected
          scope and its dependent completions.
        </p>
        <div className="form-row">
          <label>
            Reset scope
            <select
              value={kind}
              onChange={(e) => {
                const k = e.target.value as ResetScope['kind']
                setKind(k)
                setClearNotes(k === 'course')
              }}
            >
              <option value="lesson">Lesson</option>
              <option value="week">Week</option>
              <option value="course">Entire course</option>
            </select>
          </label>
          {kind === 'lesson' && (
            <label>
              Lesson to reset
              <select
                aria-label="Lesson to reset"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
              >
                {lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.week}.{l.id.slice(-2)} · {l.title}
                  </option>
                ))}
              </select>
            </label>
          )}
          {kind === 'week' && (
            <label>
              Week to reset
              <select
                aria-label="Week to reset"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
              >
                {weeks.map((w) => (
                  <option key={w.number} value={w.number}>
                    {w.number} · {w.title}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <label className="check">
          <input
            type="checkbox"
            checked={clearNotes}
            onChange={(e) => setClearNotes(e.target.checked)}
          />{' '}
          Also delete field notes and note drafts in this scope
        </label>
        {kind === 'course' && (
          <label className="check">
            <input
              type="checkbox"
              checked={keepTheme}
              onChange={(e) => setKeepTheme(e.target.checked)}
            />{' '}
            Keep my theme preference
          </label>
        )}
        <button
          className="secondary"
          onClick={(e) => prepareReset(e.currentTarget)}
        >
          <RotateCcw /> Preview reset
        </button>
        {message?.area === 'reset' && <p role="status" className="notice">{message.text}</p>}
      </section>
      <section className="panel" aria-labelledby="privacy-heading">
        <h2 id="privacy-heading">Privacy</h2>
        <p>
          Fieldbook keeps your learning record in this browser. It has no
          account or analytics and sends no progress to a server. A static
          host may log ordinary requests for the site’s files.
        </p>
      </section>
      {preview && (
        <Dialog
          key={second ? 'final' : 'preview'}
          title={second ? 'Confirm full course reset' : preview.title}
          description={
            preview.summary +
            (preview.sessionOnlyAllowed
              ? ' If saving is unavailable, this change applies in this tab only. Export afterward to keep it.'
              : '')
          }
          returnTo={trigger.current}
          onClose={() => {
            if (!busy) setPreview(null)
          }}
        >
          <div className="actions">
            <button
              className="secondary"
              onClick={() => backup(store.getSnapshot().record)}
            >
              Export current backup
            </button>
            <button disabled={busy} onClick={() => void confirm()}>
              {busy
                ? 'Updating…'
                : second
                  ? 'Reset entire course'
                  : preview.full
                    ? 'Continue to confirmation'
                    : 'Confirm replacement'}
            </button>
          </div>
        </Dialog>
      )}
    </>
  )
}
