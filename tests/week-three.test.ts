import { it, expect } from 'vitest'
import { weeks } from '../src/course'
import { weekThree } from '../src/content/week-three'
import { weekThreeQuizzes } from '../src/content/week-three-quizzes'
import {
  weekThreeLabs,
  weekThreeProjects,
} from '../src/content/week-three-practicals'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('covers all Week 3 lessons, checkpoint types and optional work', () => {
  const lessons = weeks[2]!.lessons
  const checks = lessons.flatMap((l) => l.checks)
  expect(Object.keys(weekThree)).toEqual(lessons.map((l) => l.id))
  const implemented = [
    ...Object.keys(weekThreeLabs),
    ...Object.keys(weekThreeProjects),
    ...weekThreeQuizzes.map((q) => q.checkpoint),
  ]
  expect(implemented.sort()).toEqual(
    checks
      .filter((c) => c.required)
      .map((c) => c.id)
      .sort(),
  )
  expect(Object.values(weekThreeProjects)).toHaveLength(5)
  expect(checks.filter((c) => !c.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekThree[lesson.id]?.extension).toBeTruthy()
  expect(weekThreeQuizzes.flatMap((q) => q.questions)).toHaveLength(45)
})

const essentials = [[4], [3], [3], [], [3], [3], [], [2, 7]]
for (const [i, quiz] of weekThreeQuizzes.entries())
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
        ).toBe(!essentials[i]!.includes(j + 1))
      }
    },
  )
