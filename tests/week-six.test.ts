import { expect, it } from 'vitest'
import { weeks } from '../src/course'
import { weekSix } from '../src/content/week-six'
import { weekSixQuizzes } from '../src/content/week-six-quizzes'
import {
  weekSixLabs,
  weekSixProjects,
} from '../src/content/week-six-practicals'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('matches the approved Week 6 lesson IDs, required checks and optional work', () => {
  const lessons = weeks[5]!.lessons
  const checks = lessons.flatMap((lesson) => lesson.checks)
  expect(Object.keys(weekSix)).toEqual(lessons.map((lesson) => lesson.id))
  expect(
    [
      ...Object.keys(weekSixLabs),
      ...Object.keys(weekSixProjects),
      ...weekSixQuizzes.map((quiz) => quiz.checkpoint),
    ].sort(),
  ).toEqual(
    checks
      .filter((check) => check.required)
      .map((check) => check.id)
      .sort(),
  )
  expect(Object.keys(weekSixProjects)).toHaveLength(10)
  expect(Object.keys(weekSixLabs)).toHaveLength(2)
  expect(weekSixQuizzes).toHaveLength(11)
  expect(weekSixQuizzes.flatMap((quiz) => quiz.questions)).toHaveLength(61)
  expect(checks.filter((check) => !check.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekSix[lesson.id]?.extension).toBeTruthy()
})

for (const quiz of weekSixQuizzes) {
  it(
    'enforces the threshold, essentials and alternative prompts in ' +
      quiz.checkpoint,
    () => {
      const correct = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
      expect(quiz.questions.some((q) => q.essential)).toBe(true)
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
