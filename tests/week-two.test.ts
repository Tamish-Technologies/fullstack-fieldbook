import { describe, it, expect } from 'vitest'
import { weekTwo } from '../src/content/week-two'
import { weekTwoQuizzes } from '../src/content/week-two-quizzes'
import { labFor, projects } from '../src/content/catalog'
import { weeks } from '../src/course'
import { score } from '../src/lessons/assessment'
import { emptyProgress, passes } from '../src/learning'
import { recordPractical } from '../src/labs/progress'
import { validate } from '../src/backup'

describe('Week 2 curriculum and progress', () => {
  it('covers the approved checks and marks enrichment as optional', () => {
    const lessons = weeks[1]!.lessons
    expect(Object.keys(weekTwo)).toEqual(lessons.map((l) => l.id))
    const required = lessons.flatMap((l) => l.checks.filter((c) => c.required))
    expect(required).toHaveLength(19)
    for (const c of required) {
      if (c.method === 'quiz-auto')
        expect(weekTwoQuizzes.some((q) => q.checkpoint === c.id)).toBe(true)
      if (c.method === 'browser-code-auto')
        expect(labFor(c.id)?.starter.length).toBeGreaterThan(20)
      if (c.method === 'local-project-self-verified')
        expect(projects[c.id]!.fields.length).toBeGreaterThan(0)
    }
    for (const l of lessons.filter((l) => l.checks.some((c) => !c.required)))
      expect(weekTwo[l.id]?.extension).toBeTruthy()
    expect(weekTwoQuizzes.flatMap((q) => q.questions)).toHaveLength(45)
  })
  it('retains the D4 record and denies premature Week 2 submissions', () => {
    const old = {
      ...emptyProgress(),
      contentVersion: 'w01.2',
      notes: { 'p1-w01-l02': 'Sample note' },
    }
    expect(validate(old)).toEqual({ ...old, contentVersion: 'w12.2' })
    expect(() => recordPractical(emptyProgress(), 'p1-w02-l01-c02')).toThrow(
      /eligible lesson/,
    )
  })
  const essentials = [[], [4], [3], [2], [3], [2], [], [4, 7]]
  for (const [i, quiz] of weekTwoQuizzes.entries())
    it(
      'enforces score and essential requirements for ' + quiz.checkpoint,
      () => {
        const must = essentials[i]!
        const answers = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
        expect(
          quiz.questions.flatMap((q, i) => (q.essential ? [i + 1] : [])),
        ).toEqual(must)
        for (const [j, q] of quiz.questions.entries()) {
          expect(q.variants[0][0]).not.toEqual(q.variants[1][0])
          for (const variant of q.variants)
            expect(new Set(variant.slice(1)).size).toBe(3)
          expect(
            passes(
              score(quiz, { ...answers, [q.id]: 1 }, '2026-11-18T00:00:00Z'),
            ),
          ).toBe(!must.includes(j + 1))
        }
        expect(
          passes(
            score(
              quiz,
              Object.fromEntries(quiz.questions.map((q) => [q.id, 1])),
              '2026-11-18T00:00:00Z',
            ),
          ),
        ).toBe(false)
      },
    )
})
