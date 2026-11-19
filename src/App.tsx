import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import {
  ArrowDownToLine,
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronRight,
  Code2,
  Compass,
  FileText,
  Layers3,
  LockKeyhole,
  Menu,
  Monitor,
  Moon,
  PanelLeft,
  Route,
  Settings2,
  ShieldCheck,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import {
  byId,
  checkpoints,
  entry,
  lessonPath,
  lessons,
  methodLabel,
  weeks,
  type Lesson,
} from './course'
import { evaluate, type LearningState, type Progress } from './learning'
import { MAX_NOTE } from './backup'
import { useLocation } from './router'
import type { ProgressStore } from './store'
import { Practical } from './components/Practical'
import { projects, labFor, activeQuizzes } from './content/catalog'
import { LabPreview } from './components/LabPreview'
import { Dialog } from './components/Dialog'
import { quizzes } from './content/quizzes'
import { QuizForm } from './lessons/QuizForm'
import { Settings } from './Settings'

const Article = lazy(() => import('./lessons/Article'))
const published = (week: string) =>
  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].includes(week)

const navItems: [string, string, LucideIcon][] = [
  ['/', 'Dashboard', Compass],
  ['/course', 'Course roadmap', Route],
  ['/progress', 'Progress & review', BookMarked],
  ['/settings', 'Settings', Settings2],
]
const weekPath = (n: string) => '/course/week/' + n
const completedRequired = (state: LearningState) =>
  lessons.filter((l) => l.required && state.complete.has(l.id)).length
function courseStatus(l: Lesson, state: LearningState) {
  if (state.blocked.has(l.id)) return 'Locked'
  if (state.complete.has(l.id))
    return l.checks.some(
      (c) => c.required && c.method === 'local-project-self-verified',
    )
      ? 'Includes self-verified work'
      : 'Completed'
  return published(l.week) ? 'Ready to study' : 'Available for preview'
}
function Brand() {
  return (
    <a className="brand" href="/">
      <span className="mark" aria-hidden="true">
        F<i>/</i>S
      </span>
      <span>
        <b>FullStack Fieldbook</b>
        <small>A practical learning guide</small>
      </span>
    </a>
  )
}
function Rail({
  path,
  state,
  onNavigate,
}: {
  path: string
  state: LearningState
  onNavigate?: () => void
}) {
  return (
    <div
      className="rail-inner"
      onClick={(e) => {
        if (e.target instanceof Element && e.target.closest('a')) onNavigate?.()
      }}
    >
      <Brand />
      <nav aria-label="Main navigation" className="nav">
        <p className="rail-label">Learning space</p>
        {navItems.map(([href, label, Icon]) => (
          <a
            key={href}
            href={href}
            aria-current={path === href ? 'page' : undefined}
          >
            <Icon />
            {label}
          </a>
        ))}
      </nav>
      <nav aria-label="Week outline" className="outline">
        <p className="rail-label">
          Course outline <span>12 weeks</span>
        </p>
        {weeks.map((w) => (
          <a
            key={w.number}
            href={weekPath(w.number)}
            aria-current={path === weekPath(w.number) ? 'page' : undefined}
          >
            <span className="ordinal">{w.number}</span>
            <span>{w.title}</span>
            {state.blocked.has(w.lessons[0]!.id) ? (
              <LockKeyhole aria-label="Locked" />
            ) : (
              <ChevronRight />
            )}
          </a>
        ))}
      </nav>
      <div className="rail-foot">
        <ShieldCheck />
        <span>
          <b>Browser-local progress</b>
          <small>No account required</small>
        </span>
      </div>
    </div>
  )
}
function Roadmap({
  state,
  compact = false,
}: {
  state: LearningState
  compact?: boolean
}) {
  return (
    <section className="roadmap">
      <div className="section-heading">
        <div>
          {compact && <p className="eyebrow">Phase 1 syllabus</p>}
          {compact ? <h2>Course roadmap</h2> : <h1>Course roadmap</h1>}
        </div>
        {compact && (
          <a className="text-action" href="/course">
            View all weeks <ArrowRight />
          </a>
        )}
      </div>
      <div className="week-grid">
        {(compact ? weeks.slice(0, 3) : weeks).map((w) => {
          const locked = state.blocked.has(w.lessons[0]!.id)
          const required = w.lessons.flatMap((l) =>
            l.checks.filter((c) => c.required),
          )
          const earned = required.filter((c) => state.earned.has(c.id)).length
          return (
            <a
              className={'week-card ' + (locked ? '' : 'available')}
              key={w.number}
              href={weekPath(w.number)}
            >
              <div className="week-meta">
                <span>Week {w.number}</span>
                {locked ? <LockKeyhole /> : <BookOpen />}
              </div>
              <h3>{w.title}</h3>
              <p>
                {w.lessons.length}{' '}
                {published(w.number) ? 'lessons' : 'lesson slots'} · {earned}/
                {required.length} checks
              </p>
              <div className="week-state">
                {locked
                  ? 'Locked'
                  : earned === required.length
                    ? 'Completed'
                    : published(w.number)
                      ? 'Ready to study'
                      : 'Available for preview'}
                <ArrowRight />
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
function Cover() {
  return (
    <div className="cover-plate" aria-hidden="true">
      <div className="book">
        <div className="book-face">
          <div className="book-top">
            <span>F/S</span>
            <span>PHASE 01</span>
          </div>
          <div className="book-title">
            FullStack
            <br />
            <i>Fieldbook</i>
          </div>
          <div className="book-line" />
          <div className="strata">
            <i />
            <i />
            <i />
          </div>
          <div className="book-bottom">A PRACTICAL LEARNING GUIDE</div>
        </div>
      </div>
    </div>
  )
}
function Dashboard({
  record,
  state,
}: {
  record: Progress
  state: LearningState
}) {
  const returning = record.lastLessonId !== null
  return (
    <>
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="short-rule" />
            Phase 1 · Full-stack development
          </p>
          <h1>
            {returning ? (
              <>
                Welcome back to
                <br />
                your fieldbook.
              </>
            ) : (
              <>
                Learn the web.
                <br />
                <em>Understand every layer.</em>
              </>
            )}
          </h1>
          <p className="lead">
            {returning
              ? 'Resume your last eligible lesson or revisit the course roadmap.'
              : 'Explore a twelve-week path from your first HTML page to a full-stack application with React, Express, and PostgreSQL.'}
          </p>
          <div className="actions">
            <a className="primary" href={lessonPath(state.resume)}>
              {returning ? 'Resume lesson' : 'Begin Week 01'}
              <ArrowRight />
            </a>
            <a className="secondary" href="/course">
              Explore syllabus
            </a>
          </div>
        </div>
        <Cover />
      </div>
      <div className="facts">
        {(
          [
            [BookOpen, '12 weeks', 'Phase 1 curriculum'],
            [Code2, 'Local projects', 'Learner self-verification'],
            [ShieldCheck, 'Private progress', 'Exportable backup'],
          ] as const
        ).map(([Icon, title, sub]) => (
          <div key={title}>
            <Icon />
            <span>
              <b>{title}</b>
              <small>{sub}</small>
            </span>
          </div>
        ))}
      </div>
      <Roadmap state={state} compact />
      <div className="footnote">
        <FileText />
        <p>
          <strong>Week 1 is open.</strong> Start with the orientation and its
          sample task. Read all 12 lessons at your own pace. You can return to
          their checks before starting Week 2.
        </p>
      </div>
    </>
  )
}
function WeekTwoLock({ state }: { state: LearningState }) {
  const required = weeks[0]!.lessons.flatMap((l) =>
    l.checks.filter((c) => c.required),
  )
  const counts = (method: string) =>
    required.filter((c) => c.method === method && !state.earned.has(c.id))
      .length
  const outstanding = quizzes.filter((q) => !state.earned.has(q.checkpoint))
  const remaining = outstanding[0]
  const nextCheck = required.find((c) => !state.earned.has(c.id))
  const lesson = byId.get(
    (remaining?.checkpoint ?? nextCheck?.id ?? '').slice(0, -4),
  )
  return (
    <section className="panel lock-panel">
      <LockKeyhole />
      <h1>This section is locked</h1>
      <h2>
        {quizzes.length - outstanding.length} of {quizzes.length} Week 1 quizzes
        passed
      </h2>
      <p>
        Week 2 opens after all 18 required checks. You have{' '}
        {counts('browser-code-auto')} browser coding checks and{' '}
        {counts('local-project-self-verified')} local project checks remaining.
      </p>
      {lesson && (
        <a
          className="primary"
          href={lessonPath(lesson) + (remaining ? '' : '#' + nextCheck!.id)}
        >
          Open {lesson.title}
          <ArrowRight />
        </a>
      )}
      <details>
        <summary>See every unfinished check</summary>
        <ul>
          {required
            .filter((c) => !state.earned.has(c.id))
            .map((c) => {
              const l = byId.get(c.id.slice(0, -4))!
              return (
                <li key={c.id}>
                  <a
                    href={
                      lessonPath(l) +
                      (c.method === 'quiz-auto' ? '' : '#' + c.id)
                    }
                  >
                    Lesson {l.id.slice(-2)} ·{' '}
                    {projects[c.id]?.title ??
                      (c.method === 'browser-code-auto'
                        ? labFor(c.id)!.title
                        : l.title + ' quiz')}
                  </a>
                </li>
              )
            })}
        </ul>
      </details>
      <div className="actions">
        <a href={weekPath('01')}>Review Week 1 lessons</a>
        <a href="/settings">Export progress in Settings</a>
      </div>
    </section>
  )
}
function Locked({ missing }: { missing: Lesson }) {
  return (
    <section className="panel lock-panel">
      <LockKeyhole />
      <p className="eyebrow">Prerequisite required</p>
      <h1>This section is locked</h1>
      <p>
        Your earliest unmet requirement is Week {missing.week}, Lesson{' '}
        {missing.id.slice(-2)}. Complete its required checkpoints to advance.
      </p>
      <a className="primary" href={lessonPath(missing)}>
        Open {missing.title}
        <ArrowRight />
      </a>
    </section>
  )
}
function FieldNote({
  lesson,
  record,
  store,
}: {
  lesson: Lesson
  record: Progress
  store: ProgressStore
}) {
  const id = lesson.id
  const saved = record.notes[id] ?? ''
  const stored = record.noteDrafts?.[id] ?? saved
  const [editing, setEditing] = useState<string | null>(null)
  const revision = useRef(0)
  const [msg, setMsg] = useState('')
  const draft = editing ?? stored
  const changed = draft !== saved
  async function change(text: string, action: 'edit' | 'save' | 'discard') {
    const version = ++revision.current
    const previous = draft
    setEditing(text)
    setMsg('')
    try {
      await store.update((p) => {
        const current = p.notes[id] ?? ''
        const working = p.noteDrafts?.[id] ?? current
        if (action === 'discard' && working !== previous) return p
        if (action !== 'discard' && (working !== previous || current !== saved))
          throw Error(
            'This note changed elsewhere. Copy your edit before discarding the draft.',
          )
        const noteDrafts = { ...p.noteDrafts }
        if (action === 'edit' && text !== current) noteDrafts[id] = text
        else delete noteDrafts[id]
        if (action !== 'save') return { ...p, noteDrafts }
        const notes = { ...p.notes }
        if (text) notes[id] = text
        else delete notes[id]
        return { ...p, notes, noteDrafts }
      })
      if (version !== revision.current) return
      setEditing(null)
      if (action === 'save')
        setMsg(
          store.getSnapshot().phase === 'ready'
            ? 'Field note saved.'
            : 'Field note held in this tab. Export to keep it.',
        )
      if (action === 'discard') setMsg('Draft discarded.')
    } catch (e) {
      if (version === revision.current)
        setMsg(e instanceof Error ? e.message : 'Could not save your edit.')
    }
  }
  return (
    <section className="panel">
      <h2>Field note</h2>
      <label htmlFor="note">Your private note for this lesson</label>
      <textarea
        id="note"
        maxLength={MAX_NOTE}
        value={draft}
        onChange={(e) => void change(e.target.value, 'edit')}
      />
      <p role="status" className="small">
        {msg ||
          (changed
            ? editing !== null
              ? 'Keeping your draft…'
              : 'Unsaved changes · draft retained. Save to replace your field note.'
            : '')}
      </p>
      <div className="actions">
        <button
          className="secondary"
          disabled={!changed}
          onClick={() => void change(draft, 'save')}
        >
          Save field note
        </button>
        {changed && (
          <button
            className="secondary"
            onClick={() => void change(saved, 'discard')}
          >
            Discard draft
          </button>
        )}
      </div>
    </section>
  )
}
function Reader({
  lesson,
  record,
  state,
  store,
  review = false,
}: {
  lesson: Lesson
  record: Progress
  state: LearningState
  store: ProgressStore
  review?: boolean
}) {
  const reading = published(lesson.week)
  const quiz = activeQuizzes.find((q) =>
    lesson.checks.some((c) => c.id === q.checkpoint),
  )
  const adjacent = lessons[lessons.indexOf(lesson) + 1]
  const optionalDetour =
    !review && adjacent && !adjacent.required ? adjacent : undefined
  const next = optionalDetour
    ? lessons[lessons.indexOf(optionalDetour) + 1]
    : adjacent
  const outstanding = lesson.checks.filter(
    (c) => c.required && !state.earned.has(c.id),
  )
  const reviewPath = (l: Lesson) =>
    '/review/week/' + l.week + '/lesson/' + l.id.slice(-2)
  const heading = (
    <>
      <p className="eyebrow">
        Week {lesson.week} / Lesson {lesson.id.slice(-2)}
      </p>
      <h1>{lesson.title}</h1>
    </>
  )
  return (
    <>
      {heading}
      {!review && lesson.id === 'p1-w02-l01' && (
        <p>You unlocked Week 2 by completing Week 1.</p>
      )}
      {!lesson.required && next && (
        <p className="notice">
          This lesson is optional.{' '}
          <a href={review ? reviewPath(next) : lessonPath(next)}>
            Go to required Lesson {Number(next.id.slice(-2))}
          </a>
          .
        </p>
      )}
      {review && (
        <section className="notice">
          <strong>Content review · practice only</strong>
          <p>
            Follow the lessons in order with “Review next lesson”, or use the
            numbers to revisit a lesson. This view records no progress.
          </p>
          <nav
            id="review-lessons"
            aria-label="Review lessons"
            className="review-links"
          >
            {weeks
              .find((w) => w.number === lesson.week)!
              .lessons.map((l) => (
                <a
                  key={l.id}
                  aria-current={lesson.id === l.id ? 'page' : undefined}
                  href={reviewPath(l)}
                  aria-label={
                    'Review lesson ' + l.id.slice(-2) + ': ' + l.title
                  }
                >
                  {l.id.slice(-2)}
                </a>
              ))}
          </nav>
        </section>
      )}
      <div className="reader-layout">
        <div>
          {reading ? (
            <Suspense fallback={<p role="status">Loading lesson…</p>}>
              <Article lesson={lesson} />
            </Suspense>
          ) : (
            <section className="panel">
              <h2>Lesson preview</h2>
              <p>This lesson’s material is coming later.</p>
            </section>
          )}
          <section className="panel">
            <h2>Checkpoint requirements</h2>
            {!review && lesson.week === '01' && next?.week === lesson.week && (
              <p>
                Ready to keep reading?{' '}
                <a href={lessonPath(next)}>
                  Read Lesson {Number(next.id.slice(-2))} next
                </a>{' '}
                and return to these checks before Week 2.
              </p>
            )}
            <ul className="check-list">
              {lesson.checks.map((c) => (
                <li key={c.id}>
                  <div>
                    <strong>
                      {reading && c.required ? (
                        <a href={'#' + c.id}>
                          {projects[c.id]?.title ??
                            labFor(c.id)?.title ??
                            methodLabel[c.method]}
                        </a>
                      ) : (
                        methodLabel[c.method]
                      )}
                    </strong>
                    <small>
                      {c.required
                        ? lesson.week === '01'
                          ? 'Required for Week 2'
                          : 'Required'
                        : 'Optional'}
                    </small>
                  </div>
                  <span>
                    {!review && state.earned.has(c.id)
                      ? 'Earned'
                      : c.method === 'browser-code-auto'
                        ? reading
                          ? 'Try the browser lab below'
                          : 'Content coming later'
                        : c.method === 'local-project-self-verified'
                          ? reading
                            ? 'Complete the local checklist below'
                            : 'Content coming later'
                          : c.method === 'optional-enrichment'
                            ? 'Optional practice'
                            : quiz
                              ? 'End-of-lesson quiz'
                              : 'Content coming later'}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          {reading
            ? lesson.checks
                .filter(
                  (c) =>
                    c.method === 'browser-code-auto' ||
                    c.method === 'local-project-self-verified',
                )
                .map((c) => (
                  <Practical
                    key={c.id}
                    id={c.id}
                    store={review ? undefined : store}
                  />
                ))
            : lesson.checks.some((c) => c.method === 'browser-code-auto') && (
                <LabPreview />
              )}
          {!review && (
            <FieldNote key={lesson.id} {...{ lesson, record, store }} />
          )}
          {quiz && (
            <QuizForm
              quiz={quiz}
              continueHref={
                next?.week === lesson.week &&
                (review || !state.blocked.has(next.id))
                  ? review
                    ? reviewPath(next)
                    : lessonPath(next)
                  : review
                    ? '#review-lessons'
                    : weekPath(lesson.week)
              }
              continueLabel={
                next?.week === lesson.week &&
                (review || !state.blocked.has(next.id))
                  ? 'Continue reading'
                  : review
                    ? 'Choose a review lesson'
                    : 'Return to week outline'
              }
              store={review ? undefined : store}
              earned={!review && state.earned.has(quiz.checkpoint)}
              reviewHref={
                lesson.id === 'p1-w01-l01'
                  ? '#orientation-topics'
                  : '#worked-example'
              }
            />
          )}
          {!review &&
            next &&
            (next.week === lesson.week || lesson.week === '01') &&
            !state.blocked.has(next.id) && (
              <a
                className="primary"
                href={
                  next.week === lesson.week
                    ? lessonPath(next)
                    : weekPath(next.week)
                }
              >
                {next.week !== lesson.week
                  ? 'Week 1 complete · Open Week 2'
                  : 'Continue to ' + next.title}{' '}
                <ArrowRight />
              </a>
            )}
          {!review &&
            next &&
            (lesson.week === '01' || !published(lesson.week)) &&
            next.week !== lesson.week &&
            state.blocked.has(next.id) && (
              <a className="primary" href={weekPath(lesson.week)}>
                Review Week {lesson.week} requirements <ArrowRight />
              </a>
            )}
          {!review &&
            lesson.week !== '01' &&
            published(lesson.week) &&
            outstanding.length > 0 && (
              <nav className="notice" aria-label="Remaining lesson checks">
                <p>
                  {outstanding.length}{' '}
                  {outstanding.length === 1 ? 'check' : 'checks'} left to{' '}
                  {next?.week === lesson.week
                    ? 'open Lesson ' + Number(next.id.slice(-2))
                    : 'complete Week ' + Number(lesson.week)}
                  .
                </p>
                <ul>
                  {outstanding.map((c) => (
                    <li key={c.id}>
                      <a href={'#' + c.id}>
                        {projects[c.id]?.title ??
                          labFor(c.id)?.title ??
                          'End-of-lesson knowledge check'}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          {!review &&
            [
              'p1-w02-l11',
              'p1-w03-l11',
              'p1-w04-l12',
              'p1-w05-l11',
              'p1-w06-l12',
              'p1-w07-l12',
              'p1-w08-l11',
              'p1-w09-l12',
              'p1-w10-l12',
              'p1-w11-l11',
            ].includes(lesson.id) &&
            next &&
            !state.blocked.has(next.id) && (
              <p className="notice">
                Week {Number(lesson.week)} complete · includes self-verified
                local work.{' '}
                {published(next.week) ? (
                  <a href={weekPath(next.week)}>
                    Open Week {Number(next.week)}
                  </a>
                ) : (
                  <a href={weekPath(next.week)}>
                    Preview the Week {Number(next.week)} outline
                  </a>
                )}
              </p>
            )}
          {!review && lesson.id === 'p1-w12-l11' && state.phaseComplete && (
            <section className="notice" aria-label="Phase 1 completion">
              <p><strong>Phase 1 complete</strong> · All required checks recorded, including self-verified capstone work.</p>
              <a href="/progress">View your learning record</a>
            </section>
          )}
          {optionalDetour && !state.blocked.has(optionalDetour.id) && (
            <p>
              <a href={lessonPath(optionalDetour)}>
                Optional detour · {optionalDetour.title}
              </a>
            </p>
          )}
          {review && next?.week === lesson.week && (
            <a className="primary" href={reviewPath(next)}>
              Review next lesson <ArrowRight />
            </a>
          )}
        </div>
        <aside className="reader-side" aria-labelledby="reader-week-heading">
          <BookOpen />
          <h2 id="reader-week-heading">In this week</h2>
          <a href={review ? '#review-lessons' : weekPath(lesson.week)}>
            {review ? 'Choose a review lesson' : 'View week outline'}{' '}
            <ArrowRight />
          </a>
          <p>Read on mobile. Use a desktop or laptop for local project work.</p>
        </aside>
      </div>
    </>
  )
}
export function App({ store }: { store: ProgressStore }) {
  const { record, warning } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
  )
  const state = useMemo(() => evaluate(record), [record])
  const { path, fragment } = useLocation()
  const [drawer, setDrawer] = useState(false)
  const [error, setError] = useState('')
  const menu = useRef<HTMLButtonElement>(null)
  const main = useRef<HTMLElement>(null)
  const initialPath = useRef(path)
  const match = /^\/course\/week\/(\d{2})(?:\/lesson\/(\d{2}))?$/.exec(path)
  const week = weeks.find((w) => w.number === match?.[1])
  const followingWeek = week && weeks[Number(week.number)]
  const lesson = match?.[2]
    ? byId.get('p1-w' + week?.number + '-l' + match[2])
    : undefined
  const reviewMatch =
    import.meta.env.DEV &&
    /^\/review\/week\/(01|02|03|04|05|06|07|08|09|10|11|12)\/lesson\/(\d{2})$/.exec(path)
  const reviewLesson = reviewMatch
    ? byId.get('p1-w' + reviewMatch[1] + '-l' + reviewMatch[2])
    : undefined
  const target = match?.[2] ? lesson : week?.lessons[0]
  const missing = target && state.blocked.get(target.id)
  const title = missing
    ? 'Prerequisite required'
    : (reviewLesson?.title ??
      lesson?.title ??
      week?.title ??
      navItems.find((n) => n[0] === path)?.[1] ??
      'Page not found')
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = record.theme
  }, [record.theme])
  useEffect(() => {
    document.title = title + ' · FullStack Fieldbook'
    const changedPath = initialPath.current !== path
    if (changedPath) {
      initialPath.current = path
      setDrawer(false)
      setError('')
    }
    const anchor = fragment && document.getElementById(fragment)
    if (anchor) {
      anchor.tabIndex = -1
      anchor.focus({ preventScroll: true })
      anchor.scrollIntoView()
    } else if (changedPath) {
      window.scrollTo(0, 0)
      main.current?.querySelector('h1')?.setAttribute('tabindex', '-1')
      main.current?.querySelector('h1')?.focus()
    }
  }, [path, fragment, title])
  const eligibleLessonId = missing ? undefined : lesson?.id
  useEffect(() => {
    if (!eligibleLessonId) return
    let here = true
    void store
      .update((p) =>
        !here ||
        p.lastLessonId === eligibleLessonId ||
        evaluate(p).blocked.has(eligibleLessonId)
          ? p
          : { ...p, lastLessonId: eligibleLessonId },
      )
      .catch((e) => {
        if (here) setError(e.message)
      })
    return () => {
      here = false
    }
  }, [eligibleLessonId, store])
  let view
  if (path === '/') view = <Dashboard {...{ record, state }} />
  else if (path === '/course')
    view = (
      <>
        <p className="eyebrow">Phase 1 / Syllabus</p>
        <Roadmap state={state} />
      </>
    )
  else if (path === '/settings') view = <Settings {...{ store, record }} />
  else if (path === '/progress')
    view = (
      <>
        <p className="eyebrow">Phase 1 / Learning record</p>
        <h1>Progress & review</h1>
        <p className="lead">Your checkpoint history on this device.</p>
        {state.phaseComplete && (
          <p className="notice"><strong>Phase 1 complete</strong> · Includes self-verified capstone work.</p>
        )}
        <div className="panel">
          <h2>
            {completedRequired(state)} /{' '}
            {lessons.filter((l) => l.required).length} required lessons
          </h2>
          <p>
            {
              record.evidence.filter((e) => checkpoints.get(e.id)?.required)
                .length
            }{' '}
            of{' '}
            {Array.from(checkpoints.values()).filter((c) => c.required).length}{' '}
            required checkpoints recorded.
          </p>
          <p>
            {record.evidence.some(
              (e) => e.method === 'local-project-self-verified',
            )
              ? 'Includes self-verified work.'
              : 'Local project work is recorded separately as learner self-verification.'}
          </p>
          <a className="primary" href={lessonPath(state.resume)}>
            Resume lesson <ArrowRight />
          </a>
        </div>
        <section className="panel">
          <h2>Checkpoint history</h2>
          {record.evidence.length ? (
            <ul>
              {record.evidence.map((e) => (
                <li key={e.id}>
                  <a
                    href={lessonPath(byId.get(e.id.slice(0, -4))!) + '#' + e.id}
                  >
                    {projects[e.id]?.title ??
                      (e.method === 'browser-code-auto'
                        ? labFor(e.id)?.title
                        : byId.get(e.id.slice(0, -4))?.title) ??
                      e.id}
                  </a>{' '}
                  · {methodLabel[e.method]}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No checkpoints recorded. Previewing lessons leaves mastery at
              zero.
            </p>
          )}
          {Object.entries(record.attempts).length > 0 && (
            <>
              <h3>Recent quiz attempts</h3>
              <ul>
                {Object.entries(record.attempts)
                  .sort(([, a], [, b]) => b.at.localeCompare(a.at))
                  .map(([id, attempt]) => {
                    const lesson = byId.get(id.slice(0, -4))!
                    return (
                      <li key={id}>
                        <a href={lessonPath(lesson)}>{lesson.title}</a> · Last
                        score {attempt.lastCorrect}
                        {attempt.scored ? '/' + attempt.scored : ' correct'} ·{' '}
                        {attempt.count}{' '}
                        {attempt.count === 1 ? 'attempt' : 'attempts'}
                      </li>
                    )
                  })}
              </ul>
            </>
          )}
          <a href="/settings" className="text-action">
            <ArrowDownToLine /> Manage backups
          </a>
        </section>
      </>
    )
  else if (reviewLesson)
    view = (
      <Reader
        key={path}
        lesson={reviewLesson}
        {...{ record, state, store }}
        review
      />
    )
  else if (missing)
    view =
      week?.number === '02' && missing.week === '01' ? (
        <WeekTwoLock state={state} />
      ) : (
        <Locked missing={missing} />
      )
  else if (lesson)
    view = <Reader key={path} {...{ lesson, record, state, store }} />
  else if (week && !match?.[2])
    view = (
      <>
        <p className="eyebrow">Phase 1 / Week {week.number}</p>
        <h1>{week.title}</h1>
        <p className="lead">
          Lesson outline · {week.lessons.length}{' '}
          {published(week.number) ? 'lessons' : 'planned lesson slots'}
        </p>
        <div className="panel">
          <h2>Week requirements</h2>
          {published(week.number) && (
            <p>
              <strong>
                {
                  week.lessons
                    .flatMap((l) => l.checks)
                    .filter((c) => c.required && state.earned.has(c.id)).length
                }{' '}
                of{' '}
                {
                  week.lessons
                    .flatMap((l) => l.checks)
                    .filter((c) => c.required).length
                }{' '}
                required checks passed
              </strong>
            </p>
          )}
          {week.number === '12' && state.phaseComplete && (
            <a className="primary" href="/progress">Phase 1 complete · View learning record <ArrowRight /></a>
          )}
          {published(week.number) &&
            followingWeek &&
            !state.blocked.has(followingWeek.lessons[0]!.id) && (
              <a className="primary" href={weekPath(followingWeek.number)}>
                Week {Number(week.number)} complete ·{' '}
                {published(followingWeek.number)
                  ? 'Open Week ' + Number(followingWeek.number)
                  : 'Preview the Week ' +
                    Number(followingWeek.number) +
                    ' outline'}{' '}
                <ArrowRight />
              </a>
            )}
          <p>
            {week.number === '01'
              ? 'All 12 lessons are open. Read them in order and try the quizzes after each reading, or come back to them later. Week 2 opens once you pass every required Week 1 check, including the project and readiness assessment. Your progress includes 7 quizzes, 7 browser labs and 4 self-verified local checks.'
              : week.number === '02'
                ? 'You unlocked Week 2. Build Study Tasks v2 across 11 lessons. Complete each lesson’s required checks to open the next. Week 2 includes 8 quizzes, 8 browser labs and 3 self-verified local checks.'
                : week.number === '03'
                  ? 'Build Study Tasks v3 across 11 lessons. Complete each lesson’s required checks to open the next. Week 3 includes 8 quizzes, 8 browser labs and 5 self-verified local checks.'
                  : week.number === '04'
                    ? 'Extend Study Tasks with an offline-ready idea inbox. Pass 9 quizzes, 8 browser labs and 4 self-verified project checks. Lesson 10 is optional. From Lesson 9 you can continue directly to Lesson 11.'
                    : week.number === '05'
                      ? 'Rebuild Study Tasks in React across 11 lessons. Complete 10 quizzes, 3 pure JavaScript labs and 9 locally verified React project checks. The project runs with Node, npm and Vite on your own computer.'
                      : week.number === '06'
                        ? 'Add an Ideas inbox and routing to Study Tasks. Complete 11 quizzes, 2 isolated JavaScript labs and 10 locally verified React project checks. Bundled fixtures cover every required request scenario.'
                        : week.number === '07'
                          ? 'Build a local Node and Express API and connect a read-only React view. Complete 12 quizzes, 2 isolated JavaScript labs and 10 locally verified project checks.'
                          : week.number === '08'
                            ? 'Connect React task reads and writes to your local Express API. Complete 11 quizzes, 3 isolated JavaScript labs and 10 locally verified project checks.'
                            : week.number === '09'
                              ? 'Add durable storage to your local task API. Complete 12 quizzes, 2 isolated JavaScript labs and 10 locally verified PostgreSQL project checks.'
                              : week.number === '10'
                                ? 'Build a local sign-in flow and verify task ownership for two accounts. Complete 12 quizzes, 2 isolated JavaScript labs and 10 locally verified project checks.'
                                : week.number === '11'
                                  ? 'Test, diagnose and rehearse a release of Study Tasks. Complete 11 quizzes, 2 isolated JavaScript labs and 11 locally verified project checks. The built preview runs on your computer.'
                                  : week.number === '12'
                                    ? 'Finish one planning feature across React, Express and PostgreSQL. Complete 11 quizzes, 2 isolated JavaScript labs and 11 locally verified capstone checks.'
                                    : 'Complete each required lesson, the practical project, and the readiness assessment. Optional practice is available for review.'}
          </p>
        </div>
        {import.meta.env.DEV && published(week.number) && (
          <p>
            <a href={'/review/week/' + week.number + '/lesson/01'}>
              Open Week {Number(week.number)} content review (practice only)
            </a>
          </p>
        )}
        <div className="lesson-list">
          {week.lessons.map((l) => (
            <a href={lessonPath(l)} key={l.id}>
              <span className="ordinal">{l.id.slice(-2)}</span>
              <span>
                <strong>{l.title}</strong>
                <small>
                  {l.required ? 'Required lesson' : 'Optional lesson'} ·{' '}
                  {courseStatus(l, state)}
                  {published(l.week) &&
                    ' · ' +
                      l.checks.filter(
                        (c) => c.required && state.earned.has(c.id),
                      ).length +
                      '/' +
                      l.checks.filter((c) => c.required).length +
                      ' required checks passed'}
                </small>
              </span>
              <ChevronRight />
            </a>
          ))}
        </div>
      </>
    )
  else
    view = (
      <>
        <p className="eyebrow">404 / Navigation</p>
        <h1>Page not found</h1>
        <a href="/course" className="primary">
          Open course roadmap <ArrowRight />
        </a>
      </>
    )
  const ThemeIcon =
    record.theme === 'system' ? Monitor : record.theme === 'light' ? Sun : Moon
  return (
    <>
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <aside className="rail">
        <Rail {...{ path, state }} />
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button
            className="menu secondary"
            aria-haspopup="dialog"
            ref={menu}
            onClick={() => setDrawer(true)}
          >
            <Menu /> Course menu
          </button>
          <div className="crumb">
            <PanelLeft />
            <span>Learning space</span>
            <ChevronRight />
            <b>{title}</b>
          </div>
          <button
            className="theme-button"
            aria-label={'Change theme, currently ' + record.theme}
            onClick={() => {
              const next =
                record.theme === 'system'
                  ? 'light'
                  : record.theme === 'light'
                    ? 'dark'
                    : 'system'
              void store
                .update((p) => ({ ...p, theme: next }))
                .catch((e) => setError(e.message))
            }}
          >
            <ThemeIcon />
            <span>{record.theme}</span>
          </button>
        </header>
        <main id="main" ref={main} tabIndex={-1}>
          {(warning || error) && (
            <div className="notice" role="status">
              {warning} {error} <a href="/settings">Manage local data</a>
            </div>
          )}
          {view}
        </main>
        <footer>
          <Layers3 /> FullStack Fieldbook{' '}
          <span>Phase 1 · Learning foundation</span>
          <a href="https://github.com/Tamish-Technologies/fullstack-fieldbook">
            View source on GitHub
          </a>
        </footer>
      </div>
      {drawer && (
        <Dialog
          drawer
          title="Course navigation"
          description="Choose a section or week."
          closeLabel="Close menu"
          returnTo={menu.current}
          onClose={() => setDrawer(false)}
        >
          <Rail {...{ path, state }} onNavigate={() => setDrawer(false)} />
        </Dialog>
      )}
    </>
  )
}
