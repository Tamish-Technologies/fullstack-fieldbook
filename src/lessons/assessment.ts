import type { Quiz } from '../content/quizzes'
import { evaluate, passes, type Evidence, type Progress } from '../learning'

export function score(quiz: Quiz, answers: Record<string, number>, at: string) {
  const essential = quiz.questions.filter((q) => q.essential)
  if (quiz.questions.some((q) => ![0, 1, 2].includes(answers[q.id] ?? -1)))
    throw Error('Choose an answer for every question.')
  return {
    id: quiz.checkpoint,
    method: 'quiz-auto' as const,
    at,
    scored: quiz.questions.length,
    correct: quiz.questions.filter((q) => answers[q.id] === 0).length,
    essentials: essential.length,
    essentialsCorrect: essential.filter((q) => answers[q.id] === 0).length,
  }
}
export function recordQuiz(
  p: Progress,
  result: Extract<Evidence, { method: 'quiz-auto' }>,
) {
  if (evaluate(p).blocked.has(result.id.slice(0, -4)))
    throw Error(
      'Progress changed. Reopen the eligible lesson before submitting.',
    )
  const count = (p.attempts[result.id]?.count ?? 0) + 1
  const attempts = {
    ...p.attempts,
    [result.id]: { count, lastCorrect: result.correct, scored: result.scored, at: result.at },
  }
  const firstPass =
    passes(result) && !p.evidence.some((e) => e.id === result.id)
  const quizDrafts = { ...p.quizDrafts }
  delete quizDrafts[result.id]
  return {
    ...p,
    ...(p.quizDrafts && { quizDrafts }),
    attempts,
    evidence: firstPass ? [...p.evidence, result] : p.evidence,
  }
}
