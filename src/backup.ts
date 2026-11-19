import { labFor, projects, activeQuizzes as quizzes } from './content/catalog'
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
  requireValue(
    value.schemaVersion === 1 &&
      value.courseId === defaults.courseId &&
      (value.contentVersion === defaults.contentVersion ||
        value.contentVersion === 'w11.1' ||
        value.contentVersion === 'w10.1' ||
        value.contentVersion === 'w09.1' ||
        value.contentVersion === 'w08.1' ||
        value.contentVersion === 'w07.1' ||
        value.contentVersion === 'w06.1' ||
        value.contentVersion === 'w05.1' ||
        value.contentVersion === 'w04.1' ||
        value.contentVersion === 'w03.1' ||
        value.contentVersion === 'w02.1' ||
        value.contentVersion === 'w01.2' ||
        value.contentVersion === 'w01.1' ||
        value.contentVersion === 'd2.1'),
    'Unsupported schema, course or content version.',
  )
  const legacy = value.contentVersion === 'd2.1'
  const hasPracticals = [
    'w01.2',
    'w02.1',
    'w03.1',
    'w04.1',
    'w05.1',
    'w06.1',
    'w07.1',
    'w08.1',
    'w09.1',
    'w10.1',
    'w11.1',
    'w12.1',
  ].includes(String(value.contentVersion))
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
        (value.contentVersion === 'w12.1' && /^p1-w(?:0[1-9]|1[0-2])-/.test(item.id)) ||
          (value.contentVersion === 'w11.1' && /^p1-w(?:0[1-9]|1[01])-/.test(item.id)) ||
          (value.contentVersion === 'w10.1' && /^p1-w(?:0[1-9]|10)-/.test(item.id)) ||
          (value.contentVersion === 'w09.1' && /^p1-w0[1-9]-/.test(item.id)) ||
          (value.contentVersion === 'w08.1' && /^p1-w0[1-8]-/.test(item.id)) ||
          (value.contentVersion === 'w07.1' && /^p1-w0[1-7]-/.test(item.id)) ||
          (value.contentVersion === 'w06.1' && /^p1-w0[1-6]-/.test(item.id)) ||
          (value.contentVersion === 'w05.1' && /^p1-w0[1-5]-/.test(item.id)) ||
          (value.contentVersion === 'w04.1' && /^p1-w0[1234]-/.test(item.id)) ||
          (value.contentVersion === 'w03.1' && /^p1-w0[123]-/.test(item.id)) ||
          (value.contentVersion === 'w02.1' && item.id.startsWith('p1-w02-')) ||
          item.id.startsWith('p1-w01-'),
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
      const quiz = quizzes.find((q) => q.checkpoint === item.id)
      requireValue(
        item.method === 'quiz-auto' &&
          quiz &&
          item.scored === quiz.questions.length &&
          item.essentials === quiz.questions.filter((q) => q.essential).length,
        'This checkpoint has no active assessment matching that evidence.',
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
    if (value.quizDrafts !== undefined) {
      object(value.quizDrafts)
      record.quizDrafts = {}
      for (const [id, choices] of Object.entries(value.quizDrafts)) {
        const quiz = quizzes.find((q) => q.checkpoint === id)
        requireValue(
          quiz && !state.blocked.has(id.slice(0, -4)),
          'Unknown or locked quiz draft.',
        )
        object(choices)
        const answers: Record<string, number> = {}
        for (const [question, choice] of Object.entries(choices)) {
          requireValue(
            quiz.questions.some((q) => q.id === question),
            'Unknown draft question.',
          )
          answers[question] = count(choice, 2)
        }
        record.quizDrafts[id] = answers
      }
    }
    object(value.attempts)
    for (const [id, summary] of Object.entries(value.attempts)) {
      const quiz = quizzes.find((q) => q.checkpoint === id)
      requireValue(
        quiz && !state.blocked.has(id.slice(0, -4)),
        'Unknown or locked quiz attempt.',
      )
      object(summary)
      fields(summary, ['count', 'lastCorrect', 'at'])
      requireValue(timestamp(summary.at), 'Invalid attempt timestamp.')
      record.attempts[id] = {
        count: count(summary.count, Number.MAX_SAFE_INTEGER, 1),
        lastCorrect: count(summary.lastCorrect, quiz.questions.length),
        at: summary.at,
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
