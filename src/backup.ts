import { labFor, projects, activeQuizzes as quizzes } from './content/catalog'
import { publishedQuizScales } from './content/published-quiz-scales'
import { retryScenarios } from './content/retry-scenarios'
import { answersValid, type Answers } from './labs/progress'
import { byId, checkpoints } from './course'
import {
  emptyProgress,
  evaluate,
  passes,
  type Evidence,
  type Progress,
} from './learning'

export const MAX_FILE = 512 * 1024
export const MAX_RECORD = 448 * 1024
export const MAX_NOTE = 2000
const FORMAT = 'fullstack-fieldbook-progress'
const quizById = new Map(quizzes.map((q) => [q.checkpoint, q]))
const bytes = (raw: string) => new TextEncoder().encode(raw).length
function requireValue(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}
function object(value: unknown): asserts value is Record<string, unknown> {
  requireValue(
    typeof value === 'object' && value !== null && !Array.isArray(value),
    'Expected a JSON object.',
  )
}
function fields(value: Record<string, unknown>, names: string[]) {
  requireValue(
    Object.keys(value).length === names.length &&
      names.every((k) => Object.hasOwn(value, k)),
    'Unrecognized or missing record fields.',
  )
}
function timestamp(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString() === value
  )
}
function count(value: unknown, max: number, min = 0): number {
  requireValue(
    typeof value === 'number' &&
      Number.isInteger(value) &&
      value >= min &&
      value <= max,
    'Invalid checkpoint counts.',
  )
  return value
}
function readEvidence(value: unknown): Evidence {
  object(value)
  const { id, at, method } = value
  requireValue(
    typeof id === 'string' &&
      checkpoints.has(id) &&
      checkpoints.get(id)!.method === method,
    'Unknown checkpoint or incorrect verification method.',
  )
  requireValue(timestamp(at), 'Invalid checkpoint timestamp.')
  const base = ['id', 'at', 'method']
  switch (method) {
    case 'quiz-auto': {
      fields(value, [
        ...base,
        'correct',
        'scored',
        'essentials',
        'essentialsCorrect',
      ])
      const scored = count(value.scored, 1000, 1)
      const correct = count(value.correct, scored)
      const essentials = count(value.essentials, scored)
      const essentialsCorrect = count(
        value.essentialsCorrect,
        Math.min(correct, essentials),
      )
      requireValue(
        essentials - essentialsCorrect <= scored - correct,
        'Inconsistent essential-question counts.',
      )
      return { id, at, method, scored, correct, essentials, essentialsCorrect }
    }
    case 'browser-code-auto': {
      fields(value, [...base, 'mandatory', 'passed'])
      const mandatory = count(value.mandatory, 1000, 1)
      return {
        id,
        at,
        method,
        mandatory,
        passed: count(value.passed, mandatory),
      }
    }
    case 'local-project-self-verified': {
      fields(value, [
        ...base,
        'required',
        'confirmed',
        ...(value.responses !== undefined ? ['responses'] : []),
      ])
      if (value.responses !== undefined) {
        object(value.responses)
        requireValue(
          answersValid(id, value.responses as Answers, true),
          'Incomplete local project evidence.',
        )
      }
      const required = count(value.required, 1000, 1)
      return {
        id,
        at,
        method,
        required,
        confirmed: count(value.confirmed, required),
        ...(value.responses !== undefined && {
          responses: value.responses as Answers,
        }),
      }
    }
    case 'optional-enrichment':
      fields(value, base)
      return { id, at, method }
    default:
      throw new Error('Unsupported method.')
  }
}
export function validate(value: unknown): Progress {
  object(value)
  const defaults = emptyProgress()
  const { contentVersion } = value
  const version =
    typeof contentVersion === 'string'
      ? /^w(0[1-9]|1[0-2])\.1$/.exec(contentVersion)
      : null
  const legacy = contentVersion === 'd2.1'
  requireValue(
    value.schemaVersion === 1 &&
      value.courseId === defaults.courseId &&
      (contentVersion === defaults.contentVersion ||
        version !== null || contentVersion === 'w01.2' || legacy),
    'Unsupported schema, course or content version.',
  )
  const hasPracticals = !legacy && contentVersion !== 'w01.1'
  const authoredThrough = contentVersion === defaults.contentVersion
    ? defaults.contentVersion.slice(1, 3)
    : (version?.[1] ?? '01')
  fields(value, [
    ...Object.keys(defaults).filter((key) => !legacy || key !== 'attempts'),
    ...(hasPracticals && Object.hasOwn(value, 'practicalDrafts')
      ? ['practicalDrafts']
      : []),
    ...['noteDrafts', 'quizDrafts'].filter(
      (key) => !legacy && Object.hasOwn(value, key),
    ),
  ])
  requireValue(
    bytes(JSON.stringify(value)) <= MAX_RECORD,
    'Progress exceeds the record size limit.',
  )
  const { theme, lastLessonId, updatedAt } = value
  requireValue(
    theme === 'light' || theme === 'dark' || theme === 'system',
    'Unknown theme.',
  )
  requireValue(
    lastLessonId === null ||
      (typeof lastLessonId === 'string' && byId.has(lastLessonId)),
    'Unknown resume lesson.',
  )
  requireValue(timestamp(updatedAt), 'Invalid progress timestamp.')
  object(value.notes)
  const notes: Record<string, string> = {}
  for (const [id, note] of Object.entries(value.notes)) {
    requireValue(
      byId.has(id) && typeof note === 'string' && note.length <= MAX_NOTE,
      'Unknown lesson or oversized field note.',
    )
    notes[id] = note
  }
  requireValue(
    Array.isArray(value.evidence) && value.evidence.length <= checkpoints.size,
    'Invalid checkpoint list.',
  )
  const evidence = value.evidence.map(readEvidence)
  requireValue(
    new Set(evidence.map((e) => e.id)).size === evidence.length,
    'Duplicate checkpoint evidence.',
  )
  requireValue(
    evidence.every(passes),
    'A checkpoint record is missing passing evidence.',
  )
  const record: Progress = {
    ...defaults,
    updatedAt,
    theme,
    notes,
    lastLessonId,
    evidence,
  }
  const originalState = evaluate(record)
  requireValue(
    evidence.every((e) => !originalState.blocked.has(e.id.slice(0, -4))),
    'Evidence has an unmet prerequisite.',
  )
  if (value.contentVersion === 'd2.1') {
    // Foundation records could contain synthetic demonstrations only.
    record.evidence = []
  } else {
    for (const item of evidence) {
      requireValue(
        item.id.slice(4, 6) <= authoredThrough,
        'This assessment was unavailable in the saved content version.',
      )
      if (hasPracticals && item.method === 'browser-code-auto') {
        requireValue(
          answersValid(item.id, {}) &&
            item.mandatory === labFor(item.id)?.checks.length,
          'No active assessment matches these lab counts.',
        )
        continue
      }
      if (hasPracticals && item.method === 'local-project-self-verified') {
        requireValue(
          projects[item.id]?.items.length === item.required &&
            !!item.responses &&
            answersValid(item.id, item.responses, true),
          'Incomplete local project evidence.',
        )
        continue
      }
      const quiz = quizById.get(item.id)
      requireValue(
        item.method === 'quiz-auto' && quiz && (
          (item.scored === quiz.questions.length &&
            item.essentials === quiz.questions.filter((q) => q.essential).length) ||
          publishedQuizScales.get(item.id)?.some(
            ([scored, essentials]) => item.scored === scored && item.essentials === essentials,
          )
        ),
        'This checkpoint has no active assessment or published score scale matching that evidence.',
      )
    }
  }
  const state = evaluate(record)
  if (value.practicalDrafts !== undefined) {
    object(value.practicalDrafts)
    record.practicalDrafts = {}
    for (const [id, draft] of Object.entries(value.practicalDrafts)) {
      object(draft)
      requireValue(
        !state.blocked.has(id.slice(0, -4)) &&
          answersValid(id, draft as Answers),
        'Invalid practical draft.',
      )
      record.practicalDrafts[id] = draft as Answers
    }
  }
  if (!legacy) {
    if (value.noteDrafts !== undefined) {
      object(value.noteDrafts)
      record.noteDrafts = {}
      for (const [id, draft] of Object.entries(value.noteDrafts)) {
        requireValue(
          byId.has(id) && typeof draft === 'string' && draft.length <= MAX_NOTE,
          'Invalid field note draft.',
        )
        record.noteDrafts[id] = draft
      }
    }
    object(value.attempts)
    for (const [id, summary] of Object.entries(value.attempts)) {
      const quiz = quizById.get(id)
      requireValue(
        quiz && !state.blocked.has(id.slice(0, -4)),
        'Unknown or locked quiz attempt.',
      )
      object(summary)
      const hasScored = Object.hasOwn(summary, 'scored')
      fields(summary, ['count', 'lastCorrect', 'at', ...(hasScored ? ['scored'] : [])])
      requireValue(timestamp(summary.at), 'Invalid attempt timestamp.')
      const scored = hasScored ? count(summary.scored, 1000, 1) : undefined
      const totals = [quiz.questions.length, ...(publishedQuizScales.get(id) ?? []).map(([total]) => total)]
      requireValue(scored === undefined || totals.includes(scored), 'Unknown quiz attempt score scale.')
      record.attempts[id] = {
        count: count(summary.count, Number.MAX_SAFE_INTEGER, 1),
        lastCorrect: count(summary.lastCorrect, scored ?? Math.max(...totals)),
        ...(scored !== undefined && { scored }),
        at: summary.at,
      }
    }
    if (value.quizDrafts !== undefined) {
      object(value.quizDrafts)
      record.quizDrafts = {}
      for (const [id, choices] of Object.entries(value.quizDrafts)) {
        const quiz = quizById.get(id)
        requireValue(
          quiz && !state.blocked.has(id.slice(0, -4)),
          'Unknown or locked quiz draft.',
        )
        object(choices)
        const answers: Record<string, number> = {}
        const older = contentVersion !== defaults.contentVersion
        const wasRetry = (record.attempts[id]?.count ?? 0) % 2 === 1
        for (const [question, choice] of Object.entries(choices)) {
          const answer = count(choice, 2)
          const current = quiz.questions.some((q) => q.id === question)
          if (older && !current && /^p1-w\d{2}-l\d{2}-q\d{2}$/.test(question) &&
            question.slice(0, -4) === id.slice(0, -4)) continue
          requireValue(
            current,
            'Unknown draft question.',
          )
          if (older && wasRetry && retryScenarios.has(question)) continue
          answers[question] = answer
        }
        if (Object.keys(answers).length) record.quizDrafts[id] = answers
      }
    }
  }
  if (lastLessonId && state.blocked.has(lastLessonId))
    record.lastLessonId = state.resume.id
  return record
}
function parse(raw: string, limit: number): unknown {
  requireValue(
    raw.length <= limit && bytes(raw) <= limit,
    'File exceeds the size limit.',
  )
  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('Malformed JSON.')
  }
}
export const readStored = (raw: string) => validate(parse(raw, MAX_RECORD))
export function exportBackup(record: Progress) {
  return JSON.stringify({
    format: FORMAT,
    exportedAt: new Date().toISOString(),
    progress: validate(record),
  })
}
export function inspectBackup(raw: string) {
  const data = parse(raw, MAX_FILE)
  object(data)
  fields(data, ['format', 'exportedAt', 'progress'])
  requireValue(
    data.format === FORMAT && timestamp(data.exportedAt),
    'Unrecognized backup format or timestamp.',
  )
  object(data.progress)
  const progress = validate(data.progress)
  return {
    progress,
    exportedAt: data.exportedAt,
    sourceVersion: data.progress.contentVersion,
  }
}
export const readBackup = (raw: string) => inspectBackup(raw).progress
