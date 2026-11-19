import { describe, expect, it } from 'vitest'
import {
  byId,
  checkpoints,
  entry,
  lessons,
  weeks,
  type Checkpoint,
} from '../src/course'
import {
  emptyProgress,
  evaluate,
  passes,
  resetPlan,
  type Evidence,
} from '../src/learning'
import {
  exportBackup,
  MAX_FILE,
  readBackup,
  readStored,
  validate,
} from '../src/backup'
import { createStore } from '../src/store'
import { activeQuizzes } from '../src/content/catalog'
import { quizForm, retryScenarios } from '../src/content/retry-scenarios'

function evidence(c: Checkpoint): Evidence {
  const common = { id: c.id, at: '2026-11-18T00:00:00.000Z' }
  switch (c.method) {
    case 'quiz-auto':
      return {
        ...common,
        method: c.method,
        scored: 5,
        correct: 4,
        essentials: 0,
        essentialsCorrect: 0,
      }
    case 'browser-code-auto':
      return { ...common, method: c.method, mandatory: 4, passed: 4 }
    case 'local-project-self-verified':
      return { ...common, method: c.method, required: 3, confirmed: 3 }
    case 'optional-enrichment':
      return { ...common, method: c.method }
  }
}
const fixture = () => ({
  ...emptyProgress(),
  evidence: lessons.flatMap((l) =>
    l.checks.filter((c) => c.required).map(evidence),
  ),
})
describe('approved Phase 1 graph', () => {
  it('has unique, topologically ordered IDs and a required project and readiness check each week', () => {
    expect(weeks).toHaveLength(12)
    expect(lessons).toHaveLength(138)
    expect(byId.size).toBe(lessons.length)
    expect(checkpoints.size).toBe(304)
    expect(lessons.filter((l) => l.required)).toHaveLength(137)
    for (const w of weeks) {
      const last = w.lessons.at(-1)!
      expect(
        last.checks.some((c) => c.required && c.method === 'quiz-auto'),
      ).toBe(true)
      expect(
        w.lessons.some((l) =>
          l.checks.some(
            (c) => c.required && c.method === 'local-project-self-verified',
          ),
        ),
      ).toBe(true)
    }
    const seen = new Set<string>()
    for (const l of lessons) {
      if (l.previous) expect(seen.has(l.previous)).toBe(true)
      if (l.previousWeek)
        expect(Number(l.previousWeek)).toBe(Number(l.week) - 1)
      expect(l.chapters).toMatch(/C\d+/)
      seen.add(l.id)
    }
  })
  it('opens all of Week 1 for reading and ignores navigation as evidence', () => {
    const p = { ...emptyProgress(), lastLessonId: lessons.at(-1)!.id }
    const s = evaluate(p)
    expect(s.resume).toBe(entry)
    expect(lessons.filter((l) => !s.blocked.has(l.id))).toEqual(
      weeks[0]!.lessons,
    )
    expect(s.complete.size).toBe(0)
    expect(validate(p).lastLessonId).toBe(entry.id)
  })
  it('uses the rounded threshold, essentials and every mandatory test or attestation', () => {
    const check = {
      id: entry.checks[0]!.id,
      at: emptyProgress().updatedAt,
      method: 'quiz-auto' as const,
      scored: 6,
      correct: 4,
      essentials: 1,
      essentialsCorrect: 1,
    }
    expect(passes(check)).toBe(false)
    expect(passes({ ...check, correct: 5 })).toBe(true)
    expect(passes({ ...check, correct: 5, essentialsCorrect: 0 })).toBe(false)
    expect(
      passes({
        ...check,
        method: 'browser-code-auto',
        mandatory: 3,
        passed: 2,
      }),
    ).toBe(false)
    expect(
      passes({
        ...check,
        method: 'local-project-self-verified',
        required: 3,
        confirmed: 2,
      }),
    ).toBe(false)
  })
  it('requires the complete prior week including project and readiness evidence', () => {
    const p = fixture()
    expect(evaluate(p).complete.size).toBe(137)
    expect(evaluate(p).blocked.has('p1-w02-l01')).toBe(false)
    for (const { id } of weeks[0]!.lessons.flatMap((l) =>
      l.checks.filter((c) => c.required),
    )) {
      expect(
        evaluate({
          ...p,
          evidence: p.evidence.filter((e) => e.id !== id),
        }).blocked.has('p1-w02-l01'),
      ).toBe(true)
    }
    expect(
      evaluate({
        ...p,
        evidence: p.evidence.filter((e) => e.id !== 'p1-w12-l11-c01'),
      }).complete.has('p1-w12-l11'),
    ).toBe(false)
  })
  it('bypasses optional W04 L10 in both unlocking and reset cascades', () => {
    const p = fixture()
    expect(p.evidence).toHaveLength(268)
    const optional = resetPlan(
      p,
      { kind: 'lesson', id: 'p1-w04-l10' },
      true,
      false,
    )
    expect([...optional.affected]).toEqual(['p1-w04-l10'])
    expect(evaluate(optional.next).complete.has('p1-w05-l01')).toBe(true)
    const prior = resetPlan(
      p,
      { kind: 'lesson', id: 'p1-w04-l09' },
      false,
      false,
    )
    for (const id of ['p1-w04-l10', 'p1-w04-l11', 'p1-w05-l01', 'p1-w12-l11'])
      expect(prior.affected.has(id)).toBe(true)
    expect(prior.next.evidence.length).toBe(268 - prior.removed)
  })
  it('previews reset without mutation and retains only selected data', () => {
    const p = {
      ...fixture(),
      theme: 'dark' as const,
      notes: { [entry.id]: 'Keep', 'p1-w09-l01': 'Delete' },
    }
    const week = resetPlan(p, { kind: 'week', id: '09' }, true, false)
    expect(week.notes).toBe(1)
    expect(week.next.notes).toEqual({ [entry.id]: 'Keep' })
    expect(week.next.theme).toBe('dark')
    expect(week.affected.has('p1-w08-l11')).toBe(false)
    const all = resetPlan(p, { kind: 'course' }, true, true)
    expect(all.removed).toBe(268)
    expect(all.completed).toBe(137)
    expect(all.next.evidence).toEqual([])
    expect(all.next.theme).toBe('dark')
    expect(all.next.notes).toEqual({})
    expect(p.evidence).toHaveLength(268)
    expect(resetPlan(p, { kind: 'course' }, false, false).next.theme).toBe(
      'system',
    )
  })
})
const earnedOrientation = () => ({
  ...emptyProgress(),
  evidence: [evidence(entry.checks[0]!)],
})
describe('bounded learner-owned backups', () => {
  it('round trips an earned quiz and literal text', () => {
    const p = {
      ...earnedOrientation(),
      notes: { [entry.id]: '<b>plain text</b>' },
    }
    expect(readBackup(exportBackup(p))).toEqual(p)
  })
  it('keeps an earned pass and its original score after the quiz scale changes', async () => {
    const checkpoint = entry.checks[0]!.id
    const quiz = activeQuizzes.find((q) => q.checkpoint === checkpoint)!
    const before = quiz.questions
    const old = {
      ...earnedOrientation(),
      contentVersion: 'w12.1',
      notes: { [entry.id]: 'Keep this note.' },
      attempts: { [checkpoint]: { count: 1, lastCorrect: before.length, at: p.updatedAt } },
    }
    const raw = JSON.stringify(old)
    try {
      quiz.questions = [...before, { ...before[0]!, id: 'p1-w01-l01-q99', essential: true }]
      const record = readStored(raw)
      expect(record.notes).toEqual(old.notes)
      expect(record.evidence).toEqual(old.evidence)
      expect(evaluate(record).earned).toContain(checkpoint)
      expect(readBackup(exportBackup(record))).toEqual(record)
      const memory = { getItem: () => raw, setItem: () => {} }
      const store = createStore(() => memory)
      await store.update((current) => ({ ...current, theme: 'dark' }))
      expect(store.getSnapshot().record.evidence).toEqual(old.evidence)
    } finally {
      quiz.questions = before
    }
  })
  it('clears only changed or retired selections from an earlier quiz draft', () => {
    const quiz = activeQuizzes.find((q) => q.checkpoint === 'p1-w01-l12-c02')!
    const changed = quiz.questions.find((q) => retryScenarios.has(q.id))!
    const unchanged = quiz.questions.find((q) => !retryScenarios.has(q.id))!
    const old = {
      ...emptyProgress(),
      contentVersion: 'w12.1',
      attempts: { [quiz.checkpoint]: { count: 1, lastCorrect: 3, at: p.updatedAt } },
      quizDrafts: { [quiz.checkpoint]: { [changed.id]: 1, [unchanged.id]: 2, 'p1-w01-l12-q99': 1 } },
    }
    const migrated = readStored(JSON.stringify(old))
    expect(migrated.quizDrafts).toEqual({ [quiz.checkpoint]: { [unchanged.id]: 2 } })
    expect(migrated.attempts).toEqual(old.attempts)
  })
  const p = emptyProgress()
  const first = evidence(entry.checks[0]!)
  it.each([
    { ...p, schemaVersion: 99 },
    { ...p, courseId: 'other' },
    { ...p, contentVersion: 'future' },
    { ...p, unlocked: true },
    { ...p, notes: { unknown: 'hello' } },
    { ...p, notes: { [entry.id]: 'x'.repeat(2001) } },
    { ...p, updatedAt: 'not a date' },
    { ...p, lastLessonId: 'missing' },
    { ...p, evidence: [first, first] },
    { ...p, evidence: [{ ...first, correct: 1 }] },
    { ...p, evidence: [{ ...first, id: 'missing' }] },
    { ...p, evidence: [{ ...first, method: 'browser-code-auto' }] },
    { ...p, evidence: [{ ...first, scored: 0 }] },
    { ...p, evidence: [evidence(lessons[1]!.checks[0]!)] },
  ])('rejects an incompatible or inconsistent record %#', (value) =>
    expect(() => validate(value)).toThrow(),
  )
  it('rejects invalid or oversized input before accepting a replacement', () => {
    expect(() => readStored('{')).toThrow(/Malformed/)
    expect(() => readBackup(' '.repeat(MAX_FILE + 1))).toThrow(/limit/)
    expect(() => readBackup(JSON.stringify(p))).toThrow()
  })
})
it('gives every weekly readiness essential a distinct retry scenario and feedback', () => {
  const readinessIds = new Set(weeks.map((w) => w.lessons.at(-1)!.id))
  const essentials = activeQuizzes
    .filter((q) => readinessIds.has(q.checkpoint.slice(0, -4)))
    .flatMap((q) => q.questions.filter((question) => question.essential))
  expect(essentials).toHaveLength(23)
  expect(retryScenarios.size).toBe(essentials.length)
  for (const question of essentials) {
    const initial = quizForm(question, false)
    const retry = quizForm(question, true)
    expect(retry.variant[0]).not.toBe(initial.variant[0])
    expect(new Set(retry.variant.slice(1)).size).toBe(3)
    expect(retry.variant[1]).not.toBe(initial.variant[1])
    expect(new Set(retry.feedback).size).toBe(3)
  }
})
describe('storage lifecycle', () => {
  function memory(initial: string | null = null) {
    let raw = initial
    return {
      getItem: () => raw,
      setItem: (_k: string, value: string) => {
        raw = value
      },
    }
  }
  it('persists across a fresh store and preserves earned mastery on revisit', async () => {
    const db = memory(JSON.stringify(earnedOrientation()))
    const s = createStore(() => db)
    await s.update((p) => ({ ...p, lastLessonId: entry.id }))
    expect(createStore(() => db).getSnapshot().record.evidence).toHaveLength(1)
  })
  it('preserves corrupt data until a confirmed recovery', async () => {
    const db = memory('{')
    const s = createStore(() => db)
    await s.update((p) => ({ ...p, theme: 'dark' }))
    expect(s.recovery()).toBe('{')
    expect(db.getItem()).toBe('{')
    await s.update(() => emptyProgress(), s.getSnapshot().record, true)
    expect(readStored(db.getItem()!).theme).toBe('system')
  })
  it('keeps volatile edits exportable when storage is denied', async () => {
    const s = createStore(() => {
      throw Error('denied')
    })
    await s.update((p) => ({ ...p, theme: 'dark' }))
    expect(s.getSnapshot().phase).toBe('session')
    expect(readBackup(exportBackup(s.getSnapshot().record)).theme).toBe('dark')
  })
  it('keeps an unreadable existing record safe even when writes are possible', async () => {
    let writes = 0
    const s = createStore(() => ({
      getItem: () => {
        throw Error('read denied')
      },
      setItem: () => {
        writes++
      },
    }))
    await s.update((p) => ({ ...p, theme: 'dark' }))
    expect(writes).toBe(0)
    expect(s.getSnapshot().phase).toBe('session')
  })
  it('preserves previous progress on a failed replacement', async () => {
    const db = memory(JSON.stringify(earnedOrientation()))
    const s = createStore(() => ({
      ...db,
      setItem: () => {
        throw Error('quota')
      },
    }))
    await expect(
      s.update(() => emptyProgress(), s.getSnapshot().record),
    ).rejects.toThrow()
    expect(s.getSnapshot().record.evidence).toHaveLength(1)
    expect(readStored(db.getItem()!).evidence).toHaveLength(1)
  })
  it('rejects stale replacement previews after another tab writes', async () => {
    const db = memory()
    const s = createStore(() => db)
    const other = createStore(() => db)
    const original = s.getSnapshot().record
    await other.update((p) => ({ ...p, theme: 'dark' }))
    await expect(s.update(() => emptyProgress(), original)).rejects.toThrow(
      /another tab/,
    )
    expect(s.getSnapshot().record.theme).toBe('dark')
    await expect(s.update(() => emptyProgress(), original)).rejects.toThrow(
      /preview/,
    )
  })
})
