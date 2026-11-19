import { describe, expect, it } from 'vitest'
import { weekOne } from '../src/content/week-one'
import { quizzes } from '../src/content/quizzes'
import { starterFiles } from '../src/content/starter'
import { entry, weeks } from '../src/course'
import { score, recordQuiz } from '../src/lessons/assessment'
import { emptyProgress, evaluate, passes, resetPlan } from '../src/learning'
import { exportBackup, readBackup, validate } from '../src/backup'
import { createStore, STORAGE_KEY } from '../src/store'

const blueprint = [
  ['01', '01', 5, []],
  ['03', '02', 5, [1]],
  ['06', '01', 5, []],
  ['08', '02', 5, [3]],
  ['10', '01', 5, []],
  ['11', '02', 5, []],
  ['12', '02', 10, [3, 7]],
] as const
const stamp = '2026-11-18T00:00:00.000Z'
describe('Week 1 authored content', () => {
  it('maps every authored reading and quiz to the approved manifest', () => {
    expect(Object.keys(weekOne)).toEqual(weeks[0]!.lessons.map((l) => l.id))
    expect(quizzes.map((q) => q.checkpoint)).toEqual(
      weeks[0]!.lessons.flatMap((l) =>
        l.checks.filter((c) => c.method === 'quiz-auto').map((c) => c.id),
      ),
    )
    for (const lesson of weeks[0]!.lessons) {
      const r = weekOne[lesson.id]!
      expect(lesson.chapters).toMatch(/C\d+/)
      expect(r.goals.length).toBe(2)
      expect(r.explanation.join(' ').length).toBeGreaterThan(350)
      for (const block of [
        r.example,
        r.result,
        r.exercise,
        r.mistake,
        r.takeaway,
        ...r.hints,
      ])
        expect(block.trim().length).toBeGreaterThan(20)
    }
    expect(Object.keys(starterFiles).sort()).toEqual([
      'README.md',
      'app.js',
      'index.html',
      'styles.css',
    ])
  })
  for (const [
    index,
    [lesson, checkpoint, total, essential],
  ] of blueprint.entries()) {
    it(
      'checks both forms and every essential condition for lesson ' + lesson,
      () => {
        const quiz = quizzes[index]!
        expect(quiz.checkpoint).toBe('p1-w01-l' + lesson + '-c' + checkpoint)
        expect(quiz.questions).toHaveLength(total)
        expect(
          quiz.questions.flatMap((q, i) => (q.essential ? [i + 1] : [])),
        ).toEqual(essential)
        const correct = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
        for (const [i, q] of quiz.questions.entries()) {
          expect(q.id).toBe(
            'p1-w01-l' + lesson + '-q' + String(i + 1).padStart(2, '0'),
          )
          expect(q.variants[0][0]).not.toBe(q.variants[1][0])
          for (const v of q.variants) expect(new Set(v.slice(1)).size).toBe(3)
          expect(new Set(q.feedback).size).toBe(3)
          expect(passes(score(quiz, { ...correct, [q.id]: 1 }, stamp))).toBe(
            !q.essential,
          )
        }
        expect(() => score(quiz, {}, stamp)).toThrow()
        for (let mask = 0; mask < 2 ** total; mask++) {
          const answers = Object.fromEntries(
            quiz.questions.map((q, i) => [q.id, (mask >> i) & 1]),
          )
          const incorrect = Object.values(answers).filter(Boolean).length
          const expected =
            incorrect <= Math.floor(total / 5) &&
            essential.every((i) => !(mask & (1 << (i - 1))))
          expect(passes(score(quiz, answers, stamp))).toBe(expected)
        }
      },
    )
  }
  it('retains earned mastery on retry and accepts independent Week 1 quiz passes', () => {
    const quiz = quizzes[0]!
    const answers = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
    const pass = score(quiz, answers, stamp)
    const p = recordQuiz(emptyProgress(), pass)
    expect(validate(p)).toEqual(p)
    expect(recordQuiz(p, pass).evidence).toHaveLength(1)
    const retry = recordQuiz(p, { ...pass, correct: 1 })
    expect(retry.evidence).toEqual(p.evidence)
    expect(retry.attempts[pass.id]?.count).toBe(2)
    expect(evaluate(p).blocked.has('p1-w01-l02')).toBe(false)
    const laterQuiz = quizzes[1]!
    const laterPass = score(
      laterQuiz,
      Object.fromEntries(laterQuiz.questions.map((q) => [q.id, 0])),
      stamp,
    )
    const laterOnly = recordQuiz(emptyProgress(), laterPass)
    expect(readBackup(exportBackup(laterOnly))).toEqual(laterOnly)
    const both = recordQuiz(p, laterPass)
    expect(
      resetPlan(both, { kind: 'lesson', id: entry.id }, false, true).next
        .evidence,
    ).toEqual([laterPass])
    expect(() =>
      validate({
        ...p,
        evidence: [
          pass,
          {
            id: 'p1-w01-l02-c01',
            method: 'browser-code-auto',
            at: stamp,
            passed: 1,
            mandatory: 1,
          },
        ],
      }),
    ).toThrow(/active assessment/)
    expect(() =>
      validate({ ...p, evidence: [{ ...pass, scored: 1, correct: 1 }] }),
    ).toThrow(/active assessment/)
  })
  it('restores D2 personal data without converting demonstration evidence into a real pass', () => {
    const legacy = {
      ...emptyProgress(),
      contentVersion: 'd2.1',
      lastLessonId: 'p1-w01-l02',
      theme: 'dark',
      notes: { [entry.id]: 'My note' },
      evidence: [
        {
          id: quizzes[0]!.checkpoint,
          at: stamp,
          method: 'quiz-auto',
          scored: 5,
          correct: 5,
          essentials: 0,
          essentialsCorrect: 0,
        },
      ],
    }
    const { attempts: _unused, ...v1 } = legacy
    const old = JSON.stringify(v1)
    const db = new Map([['fullstack-fieldbook.phase1.v1', old]])
    const store = createStore(() => ({
      getItem: (key) => db.get(key) ?? null,
      setItem: (k, v) => {
        db.set(k, v)
      },
    }))
    const migrated = store.getSnapshot().record
    expect(migrated).toMatchObject({
      theme: 'dark',
      notes: legacy.notes,
      evidence: [],
      lastLessonId: legacy.lastLessonId,
      contentVersion: 'w12.1',
    })
    expect(db.get('fullstack-fieldbook.phase1.v1')).toBe(old)
    expect(db.has(STORAGE_KEY)).toBe(false)
    const envelope = JSON.parse(exportBackup(emptyProgress()))
    envelope.progress = v1
    expect(readBackup(JSON.stringify(envelope))).toEqual(migrated)
  })
})

it('round trips bounded drafts and clears only the drafts included in a reset', () => {
  const quiz = quizzes[0]!
  const q = quiz.questions[0]!
  const p = {
    ...emptyProgress(),
    noteDrafts: { [entry.id]: 'Work in progress' },
    quizDrafts: { [quiz.checkpoint]: { [q.id]: 1 } },
  }
  expect(readBackup(exportBackup(p))).toEqual(p)
  expect(evaluate(p).earned.size).toBe(0)
  expect(() =>
    validate({ ...p, quizDrafts: { [quiz.checkpoint]: { [q.id]: 3 } } }),
  ).toThrow()
  expect(() =>
    validate({ ...p, quizDrafts: { [quiz.checkpoint]: { unknown: 1 } } }),
  ).toThrow()
  expect(() =>
    validate({ ...p, noteDrafts: { [entry.id]: 'x'.repeat(2001) } }),
  ).toThrow()
  const scope = { kind: 'lesson', id: entry.id } as const
  expect(resetPlan(p, scope, false, true).next).toMatchObject({
    quizDrafts: {},
    noteDrafts: p.noteDrafts,
  })
  expect(resetPlan(p, scope, true, true).next).toMatchObject({
    quizDrafts: {},
    noteDrafts: {},
  })
})

describe('Week 1 practical evidence', () => {
  it('carries D3 quizzes and drafts forward while rejecting premature lab evidence in an old record', () => {
    const quiz = quizzes[0]!
    const passed = recordQuiz(
      emptyProgress(),
      score(
        quiz,
        Object.fromEntries(quiz.questions.map((q) => [q.id, 0])),
        stamp,
      ),
    )
    const old = {
      ...passed,
      contentVersion: 'w01.1',
      noteDrafts: { [entry.id]: 'My draft' },
    }
    expect(validate(old)).toMatchObject({
      contentVersion: 'w12.1',
      evidence: passed.evidence,
      noteDrafts: old.noteDrafts,
    })
    const lab = {
      id: 'p1-w01-l07-c01',
      at: stamp,
      method: 'browser-code-auto',
      mandatory: 8,
      passed: 8,
    }
    expect(() => validate({ ...old, evidence: [lab] })).toThrow()
    expect(validate({ ...passed, evidence: [lab] }).evidence).toEqual([lab])
  })
  it('rejects incomplete or oversized local evidence, disabled labs and unknown draft fields', () => {
    const project = {
      id: 'p1-w01-l10-c02',
      at: stamp,
      method: 'local-project-self-verified',
      required: 6,
      confirmed: 6,
    }
    const responses = {
      ...Object.fromEntries(
        Array.from({ length: 6 }, (_, i) => ['item' + i, 'yes']),
      ),
      note0: 'Symptom',
      note1: 'Observed',
      note2: 'Verified',
    }
    const p = emptyProgress()
    for (const fields of [
      {},
      { ...responses, note0: ' ' },
      { ...responses, note1: 'x'.repeat(241) },
      { ...responses, item5: 'no' },
    ])
      expect(() =>
        validate({ ...p, evidence: [{ ...project, responses: fields }] }),
      ).toThrow()
    expect(
      validate({ ...p, evidence: [{ ...project, responses }] }).evidence,
    ).toHaveLength(1)
    for (const draft of [
      { 'p1-w01-l02-c01': { wide: 'x' } },
      { 'p1-w02-l01-c01': { code: 'x' } },
      { 'p1-w01-l09-c01': { code: 'x'.repeat(4001) } },
    ])
      expect(() => validate({ ...p, practicalDrafts: draft })).toThrow()
  })
})
