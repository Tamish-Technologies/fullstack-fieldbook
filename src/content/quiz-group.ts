import type { Quiz, Question } from './quizzes'

// Each retry presents a different observation that tests the same decision.
type Item = [string, string, string, string, string, string, string, string]
export function quizGroup(
  week: string,
  lesson: string,
  check: string,
  essential: Record<number, string>,
  items: Item[],
): Quiz {
  const prefix = 'p1-w' + week + '-l' + lesson
  return {
    checkpoint: prefix + '-c' + check,
    questions: items.map(
      ([first, again, right, a, b, why, whyA, whyB], i): Question => ({
        id: prefix + '-q' + String(i + 1).padStart(2, '0'),
        essential: Object.hasOwn(essential, i + 1),
        topic: essential[i + 1],
        variants: [
          [first, right, a, b],
          [again, right, a, b],
        ],
        feedback: [why, whyA, whyB],
      }),
    ),
  }
}
