import { expect, it } from 'vitest'
import { weeks } from '../src/course'
import { weekTwelve } from '../src/content/week-twelve'
import { weekTwelveQuizzes } from '../src/content/week-twelve-quizzes'
import {
  weekTwelveLabs,
  weekTwelveProjects,
} from '../src/content/week-twelve-practicals'
import { answersValid } from '../src/labs/progress'
import { passes } from '../src/learning'
import { score } from '../src/lessons/assessment'

it('matches the approved Week 12 lesson IDs, required checks and optional work', () => {
  const lessons = weeks[11]!.lessons
  const checks = lessons.flatMap((lesson) => lesson.checks)
  expect(Object.keys(weekTwelve)).toEqual(lessons.map((lesson) => lesson.id))
  expect(
    [
      ...Object.keys(weekTwelveLabs),
      ...Object.keys(weekTwelveProjects),
      ...weekTwelveQuizzes.map((quiz) => quiz.checkpoint),
    ].sort(),
  ).toEqual(
    checks
      .filter((check) => check.required)
      .map((check) => check.id)
      .sort(),
  )
  expect(Object.keys(weekTwelveProjects)).toHaveLength(11)
  expect(Object.keys(weekTwelveLabs)).toHaveLength(2)
  expect(weekTwelveQuizzes).toHaveLength(11)
  expect(weekTwelveQuizzes.flatMap((quiz) => quiz.questions)).toHaveLength(66)
  expect(checks.filter((check) => !check.required)).toHaveLength(3)
  for (const lesson of lessons.filter((l) => l.checks.some((c) => !c.required)))
    expect(weekTwelve[lesson.id]?.extension).toBeTruthy()
})

for (const quiz of weekTwelveQuizzes) {
  it(
    'enforces the threshold, essentials and alternative prompts in ' +
      quiz.checkpoint,
    () => {
      const correct = Object.fromEntries(quiz.questions.map((q) => [q.id, 0]))
      const essentials = [[5], [6], [5], [5], [5], [5], [6], [6], [5], [5], [5]]
      const index = weekTwelveQuizzes.indexOf(quiz)
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


it('allows Hold as a draft but rejects it as capstone completion evidence', () => {
  const id = 'p1-w12-l11-c02'
  const work = {
    item0: 'yes', item1: 'yes', item2: 'yes',
    note0: 'Redacted A01–A10 evidence.', note1: 'Self-assessed points.',
  }
  expect(answersValid(id, { ...work, choice: 'Hold' })).toBe(true)
  expect(answersValid(id, { ...work, choice: 'Hold' }, true)).toBe(false)
  expect(answersValid(id, work, true)).toBe(false)
  expect(answersValid(id, { ...work, choice: 'Ready for local demo' }, true)).toBe(true)
})
