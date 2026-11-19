import { expect, it } from 'vitest'
import { weeks } from '../src/course'
import { weekEleven } from '../src/content/week-eleven'
import { weekElevenQuizzes } from '../src/content/week-eleven-quizzes'
import {
  weekElevenLabs,
  weekElevenProjects,
} from '../src/content/week-eleven-practicals'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('matches the approved Week 11 lesson IDs, required checks and optional work', () => {
  const lessons = weeks[10]!.lessons
  const checks = lessons.flatMap((lesson) => lesson.checks)
  expect(Object.keys(weekEleven)).toEqual(lessons.map((lesson) => lesson.id))
  expect(
    [
      ...Object.keys(weekElevenLabs),
      ...Object.keys(weekElevenProjects),
      ...weekElevenQuizzes.map((quiz) => quiz.checkpoint),
    ].sort(),
  ).toEqual(
    checks
      .filter((check) => check.required)
      .map((check) => check.id)
      .sort(),
  )
  expect(Object.keys(weekElevenProjects)).toHaveLength(11)
  expect(Object.keys(weekElevenLabs)).toHaveLength(2)
  expect(weekElevenQuizzes).toHaveLength(11)
  expect(weekElevenQuizzes.flatMap((quiz) => quiz.questions)).toHaveLength(66)
  expect(checks.filter((check) => !check.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekEleven[lesson.id]?.extension).toBeTruthy()
})

for (const quiz of weekElevenQuizzes) {
  it(
    'enforces the threshold, essentials and alternative prompts in ' +
      quiz.checkpoint,
    () => {
      const correct = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
      const essentials = [[5], [4], [2], [4], [3], [2], [4], [3], [4], [2], [3]]
      const index = weekElevenQuizzes.indexOf(quiz)
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
