export type Method =
  | 'quiz-auto'
  | 'browser-code-auto'
  | 'local-project-self-verified'
  | 'optional-enrichment'
export interface Checkpoint {
  id: string
  method: Method
  required: boolean
}
export interface Lesson {
  id: string
  title: string
  chapters: string
  week: string
  required: boolean
  previous: string
  previousWeek: string
  checks: Checkpoint[]
}
declare const __LESSONS__: Lesson[]
export const lessons = __LESSONS__
export const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]))
export const checkpoints = new Map(
  lessons.flatMap((lesson) =>
    lesson.checks.map((check) => [check.id, check] as const),
  ),
)
export const weeks = [
  'Web foundations',
  'JavaScript state',
  'DOM & testing',
  'Async JavaScript & APIs',
  'React fundamentals',
  'Hooks & routing',
  'Node & Express',
  'Full-stack integration',
  'SQL & persistence',
  'Authentication & sessions',
  'Testing & release',
  'Full-stack capstone',
].map((title, i) => {
  const number = String(i + 1).padStart(2, '0')
  return {
    title,
    number,
    lessons: lessons.filter((lesson) => lesson.week === number),
  }
})
export const entry = lessons[0]!
export const methodLabel: Record<Method, string> = {
  'quiz-auto': 'Quiz',
  'browser-code-auto': 'Browser behavior check',
  'local-project-self-verified': 'Self-verified locally',
  'optional-enrichment': 'Optional practice',
}
export const lessonPath = (lesson: Lesson) =>
  '/course/week/' + lesson.week + '/lesson/' + lesson.id.slice(-2)
