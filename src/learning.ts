import { byId, entry, lessons, weeks, type Lesson } from './course'

interface Stamp {
  id: string
  at: string
}
export type Evidence = Stamp &
  (
    | {
        method: 'quiz-auto'
        correct: number
        scored: number
        essentialsCorrect: number
        essentials: number
      }
    | { method: 'browser-code-auto'; passed: number; mandatory: number }
    | {
        method: 'local-project-self-verified'
        confirmed: number
        responses?: Record<string, string>
        required: number
      }
    | { method: 'optional-enrichment' }
  )
export type Theme = 'system' | 'light' | 'dark'
export interface Progress {
  schemaVersion: 1
  contentVersion: 'w12.1'
  courseId: 'phase-1-full-stack'
  updatedAt: string
  theme: Theme
  lastLessonId: string | null
  attempts: Record<string, { count: number; lastCorrect: number; at: string }>
  evidence: Evidence[]
  notes: Record<string, string>
  practicalDrafts?: Record<string, Record<string, string>>
  noteDrafts?: Record<string, string>
  quizDrafts?: Record<string, Record<string, number>>
}
export function emptyProgress(): Progress {
  return {
    schemaVersion: 1,
    contentVersion: 'w12.1',
    courseId: 'phase-1-full-stack',
    updatedAt: new Date().toISOString(),
    theme: 'system',
    lastLessonId: null,
    attempts: {},
    evidence: [],
    notes: {},
  }
}

export function passes(item: Evidence) {
  switch (item.method) {
    case 'quiz-auto':
      return (
        item.correct >= Math.ceil(item.scored * 0.8) &&
        item.essentialsCorrect === item.essentials
      )
    case 'browser-code-auto':
      return item.passed === item.mandatory
    case 'local-project-self-verified':
      return item.confirmed === item.required
    case 'optional-enrichment':
      return true
  }
}

// The approved inventory is topologically ordered; a cross-week edge covers every required lesson.
export function dependencies(lesson: Lesson) {
  if (lesson.previous) return [byId.get(lesson.previous)!]
  if (lesson.previousWeek)
    return weeks
      .find((w) => w.number === lesson.previousWeek)!
      .lessons.filter((l) => l.required)
  return []
}
export function evaluate(progress: Progress) {
  const earned = new Set(progress.evidence.filter(passes).map((e) => e.id))
  const complete = new Set<string>()
  const blocked = new Map<string, Lesson>()
  for (const lesson of lessons) {
    const missing = dependencies(lesson).find((l) => !complete.has(l.id))
    if (missing) {
      blocked.set(lesson.id, blocked.get(missing.id) ?? missing)
      continue
    }
    const required = lesson.checks.filter((c) => c.required)
    const done = required.length
      ? required.every((c) => earned.has(c.id))
      : lesson.checks.some((c) => earned.has(c.id))
    if (done) complete.add(lesson.id)
  }
  const last = byId.get(progress.lastLessonId ?? '')
  const resume =
    last && !blocked.has(last.id)
      ? last
      : (lessons.find(
          (l) => l.required && !complete.has(l.id) && !blocked.has(l.id),
        ) ?? entry)
  const phaseComplete = lessons.every((lesson) => !lesson.required || complete.has(lesson.id))
  return { earned, complete, blocked, resume, phaseComplete }
}
export type LearningState = ReturnType<typeof evaluate>
export type ResetScope =
  { kind: 'lesson' | 'week'; id: string } | { kind: 'course' }
export function resetPlan(
  progress: Progress,
  scope: ResetScope,
  clearNotes: boolean,
  keepTheme: boolean,
) {
  const affected = new Set<string>()
  for (const lesson of lessons) {
    if (
      scope.kind === 'course' ||
      (scope.kind === 'week' && lesson.week >= scope.id) ||
      (scope.kind === 'lesson' &&
        (lesson.id === scope.id ||
          dependencies(lesson).some((l) => affected.has(l.id))))
    )
      affected.add(lesson.id)
  }
  const removed = progress.evidence.filter((e) =>
    affected.has(e.id.slice(0, -4)),
  )
  const notes = Object.entries(progress.notes).filter(
    ([id]) => clearNotes && affected.has(id),
  )
  const next = {
    ...progress,
    attempts: Object.fromEntries(
      Object.entries(progress.attempts).filter(
        ([id]) => !affected.has(id.slice(0, -4)),
      ),
    ),
    evidence: progress.evidence.filter((e) => !affected.has(e.id.slice(0, -4))),
    notes: Object.fromEntries(
      Object.entries(progress.notes).filter(
        ([id]) => !clearNotes || !affected.has(id),
      ),
    ),
    lastLessonId: affected.has(progress.lastLessonId ?? '')
      ? null
      : progress.lastLessonId,
    theme:
      scope.kind === 'course' && !keepTheme
        ? ('system' as const)
        : progress.theme,
  }
  if (progress.practicalDrafts)
    next.practicalDrafts = Object.fromEntries(
      Object.entries(progress.practicalDrafts).filter(
        ([id]) => !affected.has(id.slice(0, -4)),
      ),
    )
  if (progress.quizDrafts)
    next.quizDrafts = Object.fromEntries(
      Object.entries(progress.quizDrafts).filter(
        ([id]) => !affected.has(id.slice(0, -4)),
      ),
    )
  if (clearNotes && progress.noteDrafts)
    next.noteDrafts = Object.fromEntries(
      Object.entries(progress.noteDrafts).filter(([id]) => !affected.has(id)),
    )
  return {
    next,
    affected,
    removed: removed.length,
    notes: notes.length,
    completed: [...evaluate(progress).complete].filter((id) => affected.has(id))
      .length,
  }
}
