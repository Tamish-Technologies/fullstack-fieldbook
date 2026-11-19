import { expect, type Page } from '@playwright/test'
import { activeQuizzes } from '../src/content/catalog'
import { quizForm } from '../src/content/retry-scenarios'

export async function answerQuizRetry(page: Page, lesson: string) {
  const quiz = activeQuizzes.find((q) => q.checkpoint.startsWith(lesson + '-'))
  if (!quiz) throw Error('Missing quiz for ' + lesson)
  const questions = page.locator('.question')
  await expect(questions).toHaveCount(quiz.questions.length)
  for (const [index, question] of quiz.questions.entries()) {
    const { variant } = quizForm(question, true)
    const fieldset = questions.nth(index)
    await expect(fieldset.locator('legend')).toContainText(variant[0])
    await fieldset.getByRole('radio', { name: variant[1], exact: true }).check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}
