import { expect, it } from 'vitest'
import { weeks } from '../src/course'
import { weekNine } from '../src/content/week-nine'
import { weekNineQuizzes } from '../src/content/week-nine-quizzes'
import {
  weekNineLabs,
  weekNineProjects,
} from '../src/content/week-nine-practicals'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('matches the approved Week 9 lesson IDs, required checks and optional work', () => {
  const lessons = weeks[8]!.lessons
  const checks = lessons.flatMap((lesson) => lesson.checks)
  expect(Object.keys(weekNine)).toEqual(lessons.map((lesson) => lesson.id))
  expect(
    [
      ...Object.keys(weekNineLabs),
      ...Object.keys(weekNineProjects),
      ...weekNineQuizzes.map((quiz) => quiz.checkpoint),
    ].sort(),
  ).toEqual(
    checks
      .filter((check) => check.required)
      .map((check) => check.id)
      .sort(),
  )
  expect(Object.keys(weekNineProjects)).toHaveLength(10)
  expect(Object.keys(weekNineLabs)).toHaveLength(2)
  expect(weekNineQuizzes).toHaveLength(12)
  expect(weekNineQuizzes.flatMap((quiz) => quiz.questions)).toHaveLength(72)
  expect(checks.filter((check) => !check.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekNine[lesson.id]?.extension).toBeTruthy()
})

for (const quiz of weekNineQuizzes) {
  it(
    'enforces the threshold, essentials and alternative prompts in ' +
      quiz.checkpoint,
    () => {
      const correct = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
      const essentials = [[], [5], [], [], [], [6], [], [2], [], [1], [3], [2, 5]]
      const index = weekNineQuizzes.indexOf(quiz)
      expect(
        quiz.questions.flatMap((q, i) => (q.essential ? [i + 1] : [])),
      ).toEqual(essentials[index])
      for (const question of quiz.questions) {
        expect(question.variants[0][0]).not.toBe(question.variants[1][0])
        for (const variant of question.variants)
          expect(new Set(variant.slice(1)).size).toBe(3)
        const result = score(
          quiz,
          { ...correct, [question.id]: 1 },
          '2026-11-18T00:00:00Z',
        )
        expect(passes(result)).toBe(!question.essential)
      }
    },
  )
}
