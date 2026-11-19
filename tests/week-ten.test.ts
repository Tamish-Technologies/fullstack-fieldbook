import { expect, it } from 'vitest'
import { weeks } from '../src/course'
import { weekTen } from '../src/content/week-ten'
import { weekTenQuizzes } from '../src/content/week-ten-quizzes'
import {
  weekTenLabs,
  weekTenProjects,
} from '../src/content/week-ten-practicals'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('matches the approved Week 10 lesson IDs, required checks and optional work', () => {
  const lessons = weeks[9]!.lessons
  const checks = lessons.flatMap((lesson) => lesson.checks)
  expect(Object.keys(weekTen)).toEqual(lessons.map((lesson) => lesson.id))
  expect(
    [
      ...Object.keys(weekTenLabs),
      ...Object.keys(weekTenProjects),
      ...weekTenQuizzes.map((quiz) => quiz.checkpoint),
    ].sort(),
  ).toEqual(
    checks
      .filter((check) => check.required)
      .map((check) => check.id)
      .sort(),
  )
  expect(Object.keys(weekTenProjects)).toHaveLength(10)
  expect(Object.keys(weekTenLabs)).toHaveLength(2)
  expect(weekTenQuizzes).toHaveLength(12)
  expect(weekTenQuizzes.flatMap((quiz) => quiz.questions)).toHaveLength(72)
  expect(checks.filter((check) => !check.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekTen[lesson.id]?.extension).toBeTruthy()
})

for (const quiz of weekTenQuizzes) {
  it(
    'enforces the threshold, essentials and alternative prompts in ' +
      quiz.checkpoint,
    () => {
      const correct = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
      const essentials = [[4], [], [4], [4], [5], [4], [3], [2], [4], [3], [4], [4]]
      const index = weekTenQuizzes.indexOf(quiz)
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
