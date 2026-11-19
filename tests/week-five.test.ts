import { it, expect } from 'vitest'
import { weeks } from '../src/course'
import { weekFive } from '../src/content/week-five'
import { weekFiveQuizzes } from '../src/content/week-five-quizzes'
import {
  weekFiveLabs,
  weekFiveProjects,
} from '../src/content/week-five-practicals'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('covers all Week 5 lessons, checkpoint types and optional work', () => {
  const lessons = weeks[4]!.lessons
  const checks = lessons.flatMap((l) => l.checks)
  expect(Object.keys(weekFive)).toEqual(lessons.map((l) => l.id))
  const implemented = [
    ...Object.keys(weekFiveLabs),
    ...Object.keys(weekFiveProjects),
    ...weekFiveQuizzes.map((q) => q.checkpoint),
  ]
  expect(implemented.sort()).toEqual(
    checks
      .filter((c) => c.required)
      .map((c) => c.id)
      .sort(),
  )
  expect(Object.values(weekFiveProjects)).toHaveLength(9)
  expect(checks.filter((c) => !c.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekFive[lesson.id]?.extension).toBeTruthy()
  expect(weekFiveQuizzes.flatMap((q) => q.questions)).toHaveLength(57)
})

const essentials = [[3], [1], [6], [4], [2], [2], [3], [3], [3], [2, 6]]
for (const [i, quiz] of weekFiveQuizzes.entries())
  it(
    'enforces the published essentials and retry bank for ' + quiz.checkpoint,
    () => {
      const answers = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
      expect(
        quiz.questions.flatMap((q, j) => (q.essential ? [j + 1] : [])),
      ).toEqual(essentials[i])
      for (const [j, q] of quiz.questions.entries()) {
        expect(q.variants[0][0]).not.toEqual(q.variants[1][0])
        for (const variant of q.variants)
          expect(new Set(variant.slice(1)).size).toBe(3)
        expect(
          passes(
            score(quiz, { ...answers, [q.id]: 1 }, '2026-11-18T00:00:00Z'),
          ),
        ).toBe(
          quiz.questions.length - 1 >= Math.ceil(quiz.questions.length * 0.8) &&
            !essentials[i]!.includes(j + 1),
        )
      }
    },
  )
