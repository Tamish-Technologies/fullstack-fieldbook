import { expect, it } from 'vitest'
import { weeks } from '../src/course'
import { weekSeven } from '../src/content/week-seven'
import { weekSevenQuizzes } from '../src/content/week-seven-quizzes'
import {
  weekSevenLabs,
  weekSevenProjects,
} from '../src/content/week-seven-practicals'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('matches the approved Week 7 lesson IDs, required checks and optional work', () => {
  const lessons = weeks[6]!.lessons
  const checks = lessons.flatMap((lesson) => lesson.checks)
  expect(Object.keys(weekSeven)).toEqual(lessons.map((lesson) => lesson.id))
  expect(
    [
      ...Object.keys(weekSevenLabs),
      ...Object.keys(weekSevenProjects),
      ...weekSevenQuizzes.map((quiz) => quiz.checkpoint),
    ].sort(),
  ).toEqual(
    checks
      .filter((check) => check.required)
      .map((check) => check.id)
      .sort(),
  )
  expect(Object.keys(weekSevenProjects)).toHaveLength(10)
  expect(Object.keys(weekSevenLabs)).toHaveLength(2)
  expect(weekSevenQuizzes).toHaveLength(12)
  expect(weekSevenQuizzes.flatMap((quiz) => quiz.questions)).toHaveLength(66)
  expect(checks.filter((check) => !check.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekSeven[lesson.id]?.extension).toBeTruthy()
})

for (const quiz of weekSevenQuizzes) {
  it(
    'enforces the threshold, essentials and alternative prompts in ' +
      quiz.checkpoint,
    () => {
      const correct = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
      const essentials: Record<string, number[]> = {
        'p1-w07-l05-c01': [6],
        'p1-w07-l07-c02': [1, 4],
        'p1-w07-l09-c01': [3],
        'p1-w07-l12-c02': [3, 5],
      }
      expect(
        quiz.questions.flatMap((q, i) => (q.essential ? [i + 1] : [])),
      ).toEqual(essentials[quiz.checkpoint] ?? [])
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
