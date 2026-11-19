import { expect, it } from 'vitest'
import { weeks } from '../src/course'
import { weekEight } from '../src/content/week-eight'
import { weekEightQuizzes } from '../src/content/week-eight-quizzes'
import {
  weekEightLabs,
  weekEightProjects,
} from '../src/content/week-eight-practicals'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('matches the approved Week 8 lesson IDs, required checks and optional work', () => {
  const lessons = weeks[7]!.lessons
  const checks = lessons.flatMap((lesson) => lesson.checks)
  expect(Object.keys(weekEight)).toEqual(lessons.map((lesson) => lesson.id))
  expect(
    [
      ...Object.keys(weekEightLabs),
      ...Object.keys(weekEightProjects),
      ...weekEightQuizzes.map((quiz) => quiz.checkpoint),
    ].sort(),
  ).toEqual(
    checks
      .filter((check) => check.required)
      .map((check) => check.id)
      .sort(),
  )
  expect(Object.keys(weekEightProjects)).toHaveLength(10)
  expect(Object.keys(weekEightLabs)).toHaveLength(3)
  expect(weekEightQuizzes).toHaveLength(11)
  expect(weekEightQuizzes.flatMap((quiz) => quiz.questions)).toHaveLength(66)
  expect(checks.filter((check) => !check.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekEight[lesson.id]?.extension).toBeTruthy()
})

for (const quiz of weekEightQuizzes) {
  it(
    'enforces the threshold, essentials and alternative prompts in ' +
      quiz.checkpoint,
    () => {
      const correct = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
      const essentials = [
        [1],
        [3],
        [1],
        [3],
        [4],
        [1],
        [1],
        [2],
        [6],
        [3],
        [2, 5, 8],
      ]
      const index = weekEightQuizzes.indexOf(quiz)
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
