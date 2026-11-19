import { expect, type Page } from '@playwright/test'
import { weekElevenQuizzes } from '../src/content/week-eleven-quizzes'
import { tryLab } from './week-four-journey'

export const logProgram = `function buildRequestLog(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  if (!isRequestId(input.requestId) || !isHttpMethod(input.method)) return null;
  if (!Number.isSafeInteger(input.status) || input.status < 100 || input.status > 599) return null;
  if (!Number.isSafeInteger(input.elapsedMs) || input.elapsedMs < 0) return null;
  const route = isRouteTemplate(input.route) ? input.route : "unmatched";
  return {event: "http_request", requestId: input.requestId, method: input.method,
    route: route, status: input.status, elapsedMs: input.elapsedMs};
}`

export const errorProgram = `function classifyPublicError(error) {
  if (error && typeof error === "object") {
    if (error.type === "entity.parse.failed")
      return { status: 400, code: "INVALID_JSON", message: "Use valid JSON." };
    if (error.type === "entity.too.large")
      return { status: 413, code: "PAYLOAD_TOO_LARGE", message: "The body is too large." };
    const code = error.code;
    if (["ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "57P01"].some((value) => value === code) || hasDbClassPrefix(code))
      return { status: 503, code: "DB_UNAVAILABLE", message: "Try again when storage recovers." };
  }
  return { status: 500, code: "INTERNAL_ERROR", message: "Unexpected error." };
}`

export const labPrograms: Record<string, string> = {
  '04-c02': logProgram,
  '05-c02': errorProgram,
}

export async function finishWeekElevenQuiz(page: Page, checkpoint: string, miss?: number) {
  const quiz = weekElevenQuizzes.find((entry) => entry.checkpoint === checkpoint)!
  for (const [index, question] of quiz.questions.entries()) {
    await page.locator('.question').nth(index).getByRole('radio', {
      name: question.variants[0][index === miss ? 2 : 1],
      exact: true,
    }).check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}

export async function walkWeekEleven(page: Page) {
  await page.goto('/course/week/12/lesson/01')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/11/lesson/01')
  for (let n = 1; n <= 11; n++) {
    const id = String(n).padStart(2, '0')
    const prefix = 'p1-w11-l' + id
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()

    const key = id + '-c02'
    if (labPrograms[key]) {
      const lab = page.locator('#p1-w11-l' + key)
      await tryLab(lab, labPrograms[key])
      await expect(lab.locator('.practical-status')).toHaveText('Browser checkpoint passed.')
    }
    for (const form of await page.locator('form.local-project').all()) {
      for (const box of await form.getByRole('checkbox').all()) await box.check()
      for (const field of await form.getByRole('textbox').all()) {
        await field.fill('Synthetic evidence for the engineering navigation test.')
      }
      await form.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(form.getByRole('checkbox').first()).toBeDisabled()
    }
    if (n === 11) {
      await expect(page.getByRole('navigation', { name: 'Remaining lesson checks' }))
        .toContainText('1 check left to complete Week 11')
      await expect(page.getByRole('link', { name: 'Open Week 12' })).toHaveCount(0)
    }
    await page.getByRole('button', { name: 'Start knowledge check' }).click()
    if (n === 5) {
      await finishWeekElevenQuiz(page, prefix + '-c01', 2)
      await expect(page.getByRole('heading', { name: /Try again · 5\/6/ })).toBeVisible()
      await page.getByRole('button', { name: 'Retry with another example' }).click()
    }
    await finishWeekElevenQuiz(page, prefix + '-c01')
    await expect(page.getByRole('heading', { name: /Quiz passed/ })).toBeVisible()
    if (n < 11) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText('Week 11 complete · includes self-verified local work')
  await page.getByRole('link', { name: 'Open Week 12' }).click()
  await expect(page).toHaveURL(/\/course\/week\/12$/)
  await expect(page.locator('h1')).toHaveText('Full-stack capstone')
}
